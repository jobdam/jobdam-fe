/** @format */
import { UtilityState } from "@/types/videoChat";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  MessageSquare,
} from "lucide-react";
interface UtilityProps {
  utility: UtilityState;
}

const Utility = ({ utility }: UtilityProps) => {
  const {
    mediaControl: {
      isMicOn,
      isCameraOn,
      isScreenSharing,
      toggleMic,
      toggleCamera,
      toggleScreenShare,
    },
    toggleChat,
  } = utility;

  const iconSize = 20;
  return (
    <div
      className="flex flex-col gap-6 items-center w-[55px] py-5
        rounded-2xl
        bg-black/20
        shadow-lg
        backdrop-blur-[4px]"
    >
      {/* 마이크 */}
      <button
        onClick={toggleMic}
        className="flex flex-col items-center text-white"
      >
        {isMicOn ? <Mic size={iconSize} /> : <MicOff size={iconSize} />}
        <span className="text-sm mt-1">오디오</span>
      </button>

      {/* 카메라 */}
      <button
        onClick={toggleCamera}
        className="flex flex-col items-center text-white"
      >
        {isCameraOn ? <Video size={iconSize} /> : <VideoOff size={iconSize} />}
        <span className="text-sm mt-1">비디오</span>
      </button>

      {/* 화면공유 */}
      <button
        onClick={toggleScreenShare}
        className="flex flex-col items-center text-white"
      >
        {isScreenSharing ? (
          <Monitor size={iconSize} />
        ) : (
          <MonitorOff size={iconSize} />
        )}
        <span className="text-sm mt-1">공유</span>
      </button>

      {/* 채팅 */}
      <button
        onClick={toggleChat}
        className="flex flex-col items-center text-white"
      >
        <MessageSquare size={iconSize} />
        <span className="text-sm mt-1">채팅</span>
      </button>
    </div>
  );
};
export default Utility;
