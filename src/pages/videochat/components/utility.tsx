/** @format */

import { useLocalMediaStream } from "@/services/webSockect/videoChat/useLocalMediaStream";

const Utility = () => {
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
    <>
      <button onClick={toggleMic}>
        {isMicOn ? "🔇 마이크 끄기" : "🎙 마이크 켜기"}
      </button>
      <button onClick={toggleCamera}>
        {isCameraOn ? "📷 카메라 끄기" : "📸 카메라 켜기"}
      </button>
      <button onClick={toggleScreenShare}>
        {isScreenSharing ? "🛑 화면 공유 중지" : "🖥 화면 공유 시작"}
      </button>
    </>
  );
};
export default Utility;
