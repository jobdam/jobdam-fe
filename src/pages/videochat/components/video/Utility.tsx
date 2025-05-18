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
  return (
    <div className="flex flex-col gap-6 items-center pt-4">
      {/* 마이크 */}
      <button
        onClick={toggleMic}
        className="flex flex-col items-center text-white"
      >
        {isMicOn ? <Mic size={32} /> : <MicOff size={32} />}
        <span className="text-sm mt-1">오디오</span>
      </button>

      {/* 카메라 */}
      <button
        onClick={toggleCamera}
        className="flex flex-col items-center text-white"
      >
        {isCameraOn ? <Video size={32} /> : <VideoOff size={32} />}
        <span className="text-sm mt-1">비디오</span>
      </button>

      {/* 화면공유 */}
      <button
        onClick={toggleScreenShare}
        className="flex flex-col items-center text-white"
      >
        {isScreenSharing ? <MonitorOff size={32} /> : <Monitor size={32} />}
        <span className="text-sm mt-1">공유</span>
      </button>

      {/* 채팅 */}
      <button
        onClick={toggleChat}
        className="flex flex-col items-center text-white"
      >
        <MessageSquare size={32} />
        <span className="text-sm mt-1">채팅</span>
      </button>
    </div>
  );
};
export default Utility;
