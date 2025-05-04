import { usePeerMap } from "./usePeerMap";

//offer를 받을때
export const useSignalHandler = (
  sendAnswer: (to: number, answer: RTCSessionDescriptionInit) => void
) => {
  const { createPeerConnection, getPeer } = usePeerMap();

  const handleOffer = async (
    offer: RTCSessionDescriptionInit, //내부에 sdp정보랑, type이있음
    senderId: number
  ) => {
    const pc = createPeerConnection(senderId); //peer생성
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    sendAnswer(senderId, answer);
  };

  const handleAnswer = async (
    answer: RTCSessionDescriptionInit,
    senderId: number
  ) => {
    const pc = getPeer(senderId);
    if (!pc) return;
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = async (
    candidate: RTCIceCandidateInit,
    senderId: number
  ) => {
    const pc = getPeer(senderId);
    if (!pc) return;
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  };

  return {
    handleOffer,
    handleAnswer,
    handleCandidate,
  };
};
