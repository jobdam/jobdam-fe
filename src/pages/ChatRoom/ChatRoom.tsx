/** @format */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  ///채팅방 설정///
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { sendChat, sendReady } = useChatPublisher();
  ///유저 설정//
  const [userList, setUserList] = useState<ChatUserInfo[]>([]);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
      return;
    }
    if (!myUserId) {
      navigate("/"); // JWT 없거나 파싱 실패 → 메인으로 이동
      return;
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
          //입장한 본인이면 기존인원들의 userInfoList를 받고
          //본인이 아닌인원들은 입장한사람의 userInfo를 받는다.
          if (data.userId === myUserId) {
            getChatUserInfoList(roomId!).then((list) => {
              setUserList(list);
              //채팅방에 입장메세지 표시하고
              setMessages((prev) => [
                ...prev,
                {
                  id: uuidv4(),
                  type: "SYSTEM",
                  content: `${data.userName}님이 입장했습니다.`,
                },
              ]);
            });
          } else {
            getChatUserInfo(roomId!, data.userId).then((userInfo) => {
              setUserList((prev) => [...prev, userInfo]);
              //채팅방에 입장메세지 표시하고
              setMessages((prev) => [
                ...prev,
                {
                  id: uuidv4(),
                  type: "SYSTEM",
                  content: `${data.userName}님이 입장했습니다.`,
                },
              ]);
            });
          }
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
    [myUserId]
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
      <div className="flex flex-col flex-1">
        <ChatPanel messages={messages} onSend={handleSend} />
      </div>
    </div>
  );
};
export default ChatRoom;
