/** @format */
import { useCallback } from "react";
import { Send } from "lucide-react";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { useWebSocketSubscribe } from "@/services/webSockect/useWebSocketSubscribe";
import { IMessage } from "@stomp/stompjs";

const ChatRoom = () => {
  const messages = [
    {
      id: 1,
      name: "상대방",
      avatar: "https://i.pravatar.cc/150?img=3",
      message: "안녕하세요!",
      isMe: false,
    },
    {
      id: 2,
      name: "나",
      avatar: "https://i.pravatar.cc/150?img=1",
      message: "반갑습니다 😊",
      isMe: true,
    },
  ];

  const navigate = useNavigate();

  const enterSignalRoom = (roomId: number) => {
    navigate(paths.videochat.main.getHref(roomId));
  };

  const handleMessage = useCallback((msg: IMessage) => {
    const data = JSON.parse(msg.body);
    console.log("📩 수신된 채팅 메시지:", data);

    // TODO: 상태로 추가하거나 Redux dispatch 가능
  }, []);

  useWebSocketSubscribe({
    destination: `/topic/chat/1`,
    onMessage: handleMessage,
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => enterSignalRoom(i)}
          >
            방 {i} 입장
          </button>
        ))}
      </div>
      {/* 헤더 */}
      <header className="h-16 bg-gray-800 text-white flex items-center px-4 shadow-md">
        <h1 className="text-lg font-semibold">채팅방</h1>
      </header>

      {/* 메시지 리스트 */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.isMe ? "justify-end" : "justify-start"
            }`}
          >
            {!msg.isMe && (
              <img
                src={msg.avatar}
                alt={msg.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className={`space-y-1 max-w-xs`}>
              {!msg.isMe && (
                <div className="text-sm text-gray-600 font-semibold">
                  {msg.name}
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg shadow text-sm ${
                  msg.isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            </div>
            {msg.isMe && (
              <img
                src={msg.avatar}
                alt={msg.name}
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        ))}
      </main>

      {/* 입력창 */}
      <footer className="h-28 bg-white border-t px-4 py-3 flex items-center gap-2">
        <textarea
          placeholder="메시지를 입력하세요"
          className="flex-1 resize-none bg-gray-200 rounded-lg p-3 h-full outline-none placeholder:text-gray-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full">
          <Send className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};
export default ChatRoom;
