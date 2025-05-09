/** @format */

import { useLocalMediaStream } from "@/services/webSockect/videoChat/useLocalMediaStream";

const Video = () => {
  //미디어 관련 훅
  const {
    isMicOn,
    isCameraOn,
    isScreenSharing,
    toggleMic,
    toggleCamera,

    toggleScreenShare,
  } = useLocalMediaStream();

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <button onClick={toggleMic}>
        {isMicOn ? "🔇 마이크 끄기" : "🎙 마이크 켜기"}
      </button>
      <button onClick={toggleCamera}>
        {isCameraOn ? "📷 카메라 끄기" : "📸 카메라 켜기"}
      </button>
      <button onClick={toggleScreenShare}>
        {isScreenSharing ? "🛑 화면 공유 중지" : "🖥 화면 공유 시작"}
      </button>
    </div>
  );
};
export default Video;
