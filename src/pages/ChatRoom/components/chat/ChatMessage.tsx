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
        <div className="flex flex-col items-end max-w-xs">
          <div className="bg-white px-4 py-2 rounded-2xl rounded-br-none shadow-lg text-sm text-gray-900">
            {content}
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-2">{time}</div>
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
        className="w-10 h-10 rounded-full mr-3 self-end"
      />
      <div className="flex flex-col max-w-xs">
        <div className="text-sm font-semibold text-gray-800 mb-1">
          {userName}
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow-lg text-sm text-gray-900">
          {content}
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right mr-1">{time}</div>
      </div>
    </div>
  );
};
export default ChatMessage;
