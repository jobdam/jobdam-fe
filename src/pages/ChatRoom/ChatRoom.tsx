/** @format */
import { useCallback, useEffect, useRef, useState } from "react";
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

const ChatRoom = () => {
  //공통 설정//
  const { roomId } = useParams();
  const myUserId = getUserIdFromJwt();
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstJoinRef = useRef(location.state?.firstJoin ?? false);
  ///채팅방 설정///
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { sendChat, sendReady } = useChatPublisher();
  ///유저 설정//
  const [userList, setUserList] = useState<ChatUserInfo[]>([]);
  const myUserInfo = userList.find((u) => u.userId === myUserId); //채팅방에 보여질 제목
  //덮어쓰기 말고 병합으로 userList업데이트(비동기로 여러명이 set하면 가끔이상해짐..)
  const mergeUserList = useCallback((incoming: ChatUserInfo[]) => {
    setUserList((prev) => {
      const existingIds = new Set(prev.map((u) => u.userId));
      const newUsers = incoming.filter((u) => !existingIds.has(u.userId));
      return [...prev, ...newUsers];
    });
  }, []);

  useEffect(() => {
    if (!roomId || !myUserId) {
      navigate("/");
      return;
    }
  }, [roomId, myUserId]);
  console.log("isfj", isFirstJoinRef.current);
  //초기값설정
  useEffect(() => {
    if (roomId && myUserId) {
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
        isFirstJoinRef.current = false;
        if (location.state?.firstJoin) {
          navigate(location.pathname, { replace: true }); // 클로저 내부도 최신 상태로 반영
        }
      });
    }
  }, [roomId, myUserId]);

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
            console.log("모두 준비완료 되었음!");
          }
          break;

        default:
          console.warn("잘못된 메세지 형식", data.chatMessageType);
      }
    },
    [myUserId, mergeUserList, roomId]
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

  //화상채팅 시작하기 핸들러
  const handleReadyUpdate = (userId: number, ready: boolean) => {
    setUserList((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, ready } : u))
    );
  };
  const handleLeave = () => {
    if (confirm("정말 나가시겠습니까?")) navigate("/"); // 메인 페이지로 이동
  };
  //채팅구독하기
  useChatSubscribe({
    destination: `/topic/chat/${roomId}`,
    onMessage: handleMessage,
  });

  return (
    <div className="flex h-screen">
      <div className="w-[800px] min-w-[800px]">
        <UserPanel
          userList={userList}
          myUserId={myUserId!}
          onReady={handleReadyStatus}
        />
      </div>
      <button onClick={handleLeave}>나가기</button>
      <div className="flex flex-col flex-1">
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
