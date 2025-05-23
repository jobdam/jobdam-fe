/** @format */
interface ChatMessageProps {
  isMe: boolean;
  userName?: string;
  profileImageUrl?: string;
  content: string;
  time: string;
}

const ChatMessage = ({
  isMe,
  userName,
  profileImageUrl,
  content,
  time,
}: ChatMessageProps) => {
  if (isMe) {
    // 내 메시지
    return (
      <div className="flex justify-end mb-6">
        <div className="flex flex-row justify-end max-w-[70%]">
          <div className="text-xs self-end text-right w-[100px] mr-[12px]">
            {time}
          </div>
          <div
            className="bg-white px-4 py-2 rounded-2xl rounded-br-none shadow-lg
           text-sm text-gray-900 max-w-[70%] break-words"
          >
            {content}
          </div>
        </div>
      </div>
    );
  }

  // 상대 메시지
  return (
    <div className="flex justify-start mb-6">
      <img
        src={profileImageUrl}
        alt={userName}
        className="w-10 h-10 rounded-full mr-3 self-start"
      />
      <div className="flex flex-col max-w-[55%]">
        <div className="text-sm font-semibold text-gray-800 mb-1">
          {userName}
        </div>
        <div
          className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow-lg
         text-sm text-gray-900 break-words"
        >
          {content}
        </div>
      </div>
      <div className="text-xs ml-[12px] text-right self-end">{time}</div>
    </div>
  );
};
export default ChatMessage;
