/** @format */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { IMessage } from "@stomp/stompjs";
import { useChatSubscribe } from "@/services/webSockect/chat/useChatSubscribe";
import { v4 as uuidv4 } from "uuid";
import { useChatPublisher } from "@/services/webSockect/chat/useChatPublisher";
import { getUserIdFromJwt } from "@/utils/tokenUtils";
import UserPanel from "./components/user/UserPanel";
import ChatPanel from "./components/chat/ChatPanel";
import { ChatMessageType, ChatUserInfo } from "@/types/chat";
import { getChatUserInfoList } from "./api/get-chatUserInfoList";
import { getChatUserInfo } from "./api/get-chatUserInfo";
import { paths } from "@/config/paths";
import { useLeaveRoomMutation } from "./api/delete-leaveRoom";
import { useInitInterviewMutation } from "./api/post-initInterview";
import ConfirmModal from "../../components/ui/confirm/ConfirmModal";
import { queryClient } from "@/lib/react-query";
import { useDispatch } from "react-redux";
import { resetInterviewData } from "@/store/slices/videoChatInterview";

const ChatRoom = () => {
  //공통 설정//
  const { roomId } = useParams();
  const myUserId = useMemo(() => getUserIdFromJwt(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstJoinRef = useRef(location.state?.firstJoin ?? false); //매칭때 처음참여 추가입장 구분
  const createdRef = useRef(location.state?.created /*?? Date()*/);
  const dispatch = useDispatch();
  ///채팅방 설정///
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { sendChat, sendReady } = useChatPublisher();
  ///유저 설정//
  const [userList, setUserList] = useState<ChatUserInfo[]>([]);
  const myUserInfo = userList.find((u) => u.userId === myUserId); //채팅방에 보여질 제목
  const [userCount, setUserCount] = useState<number>(0); //화상채팅진입전 유저수
  /// 나가기 모달 설정///
  const [isModalOpen, setIsModalOpen] = useState(false);
  //덮어쓰기 말고 병합으로 userList업데이트(비동기로 여러명이 set하면 가끔이상해짐..)
  const mergeUserList = useCallback((incoming: ChatUserInfo[]) => {
    setUserList((prev) => {
      const existingIds = new Set(prev.map((u) => u.userId));
      const newUsers = incoming.filter((u) => !existingIds.has(u.userId));
      return [...prev, ...newUsers];
    });
  }, []);
  //초기값설정
  useEffect(() => {
    if (!roomId || !myUserId) {
      navigate("/");
      return;
    }

    getChatUserInfoList(roomId).then((list) => {
      mergeUserList(list); //유저리스트 상태추가
      if (isFirstJoinRef.current) {
        //처음입장한사람이면
        const joinMessages = list.map((user) => ({
          id: uuidv4(),
          type: "SYSTEM" as const,
          content: `${user.name}님이 입장했습니다.`,
        }));

        setMessages((prev) => [...prev, ...joinMessages]);
      }
    });
  }, [roomId, myUserId]);
  useEffect(() => {
    setTimeout(() => {
      isFirstJoinRef.current = false;
      if (location.state?.firstJoin) {
        navigate(location.pathname, { replace: true });
      }
    }, 2000);
  }, []);
  // 시간 설정
  useEffect(() => {
    const createdFromState = location.state?.created;

    if (createdFromState) {
      localStorage.setItem("created", createdFromState);
      createdRef.current = createdFromState;
    } else {
      // 새로고침 후: localStorage에서 복구
      const restored = localStorage.getItem("created");
      if (restored) {
        createdRef.current = restored;
      } else {
        // 해당 경우는 임의로 로컬 스토리지 값을 제거한 경우임.
        // fallback (아예 없을 경우 방금 시간으로 초기화)
        const now = "";
        localStorage.setItem("created", now);
        createdRef.current = now;
      }
    }
  }, [location.state?.created, roomId]);

  //서버에서 오는 메세지 핸들러
  const handleMessage = useCallback(
    (msg: IMessage) => {
      const data = JSON.parse(msg.body);

      switch (data.chatMessageType) {
        case "CHAT":
          setMessages((prev) => [
            ...prev,
            {
              id: uuidv4(),
              type: "USER",
              isMe: data.userId === myUserId, // 본인 판단
              userName: data.userName,
              profileImageUrl: data.profileImageUrl,
              content: data.content,
              time: data.time,
            },
          ]);
          break;

        case "LEAVE":
          //목록제거
          setUserList((prev) =>
            prev.filter((user) => user.userId !== data.userId)
          );
          setMessages((prev) => [
            ...prev,
            {
              id: uuidv4(),
              type: "SYSTEM",
              content: `${data.userName}님이 나가셨습니다.`,
            },
          ]);
          break;

        case "JOIN":
          if (isFirstJoinRef.current) return; //초기화 이후에는 보여줌
          console.log("join오나??", isFirstJoinRef.current);
          setMessages((prev) => [
            ...prev,
            {
              id: uuidv4(),
              type: "SYSTEM",
              content: `${data.userName}님이 입장했습니다.`,
            },
          ]);
          getChatUserInfo(roomId!, data.userId).then((userInfo) => {
            mergeUserList([userInfo]);
          });

          break;
        //화상채팅 준비상태
        case "READY":
          handleReadyUpdate(data.userId, data.ready);
          if (data.allReady) {
            setUserCount(data.userCount);
            initInterview({
              jobCode: myUserInfo?.jobCode!,
              interviewType: myUserInfo?.interviewType!,
            });
          }
          break;

        default:
          console.warn("잘못된 메세지 형식", data.chatMessageType);
      }
    },
    [myUserId, mergeUserList, roomId, myUserInfo]
  );

  //작성한 메세지 보내기(publisher)
  const handleSend = (content: string) => {
    if (!content.trim()) return;
    sendChat({ roomId: roomId!, content });
  };

  //준비상태 보내기(publisher)
  const handleReadyStatus = (ready: boolean) => {
    sendReady({ roomId: roomId!, ready });
  };

  //화상채팅 시작하기버튼 핸들러
  const handleReadyUpdate = (userId: number, ready: boolean) => {
    setUserList((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, ready } : u))
    );
  };

  //나가기 핸들러
  const handleLeave = () => {
    setIsModalOpen(true); // 모달 열기
  };
  const confirmLeave = () => {
    navigate("/", { replace: true }); // 메인 페이지로 이동
  };

  //화상채팅 진입전 인터뷰테이블/ai질문 복사 초기화작업
  const { mutate: initInterview } = useInitInterviewMutation({
    mutationConfig: {
      onSuccess: () => {
        console.log("인터뷰 초기화 성공");
        queryClient.invalidateQueries({ queryKey: ["interview-groups"] });
        queryClient.invalidateQueries({ queryKey: ["feedback"] });
        queryClient.invalidateQueries({ queryKey: ["interview-fullData"] });
        dispatch(resetInterviewData());
        leaveRoom(roomId!);
      },
      onError: (err) => {
        console.error("인터뷰 초기화 실패", err);
      },
    },
  });
  //allReady일떄 화상채팅으로 이동하기(방에서 나가기)
  const { mutate: leaveRoom } = useLeaveRoomMutation({
    mutationConfig: {
      onSuccess: () => {
        console.log("방 나가기 성공");
        navigate(paths.videochat.main.getHref(roomId), {
          state: { firstJoin: true, enterUserCount: userCount },
          replace: true,
        });
      },
      onError: (err) => {
        console.error("방 나가기 실패", err);
      },
    },
  });

  //채팅구독하기
  useChatSubscribe({
    destination: `/topic/chat/${roomId}`,
    onMessage: handleMessage,
  });

  return (
    <div className="w-full h-[90vh] max-h-[1000px] flex justify-center">
      <div className="flex justify-center gap-5 mt-[20px] w-full">
        <UserPanel
          userList={userList}
          myUserId={myUserId!}
          created={new Date(createdRef.current!)}
          onReady={handleReadyStatus}
          onLeave={handleLeave}
        />
        <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={confirmLeave}
          onCancel={() => setIsModalOpen(false)}
        />
        <ChatPanel
          messages={messages}
          onSend={handleSend}
          jobGroup={myUserInfo?.jobGroup ?? ""}
          jobDetail={myUserInfo?.jobDetail ?? ""}
          interviewType={myUserInfo?.interviewType ?? ""}
        />
      </div>
    </div>
  );
};
export default ChatRoom;
