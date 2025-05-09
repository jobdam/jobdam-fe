import { usePeerMap } from "./usePeerMap";
import { useSignalPublisher } from "./useSignalPublisher";

export const useSignalHandler = (
  peerMap: ReturnType<typeof usePeerMap>,
  sendAnswer: (to: number, answer: RTCSessionDescriptionInit) => void
) => {
  const { createPeerConnection, getPeer } = peerMap;
  const { sendSignal } = useSignalPublisher();

  //offer를 받을때 + 화면상태도 받아야함. 그러고 offer를보내야 화면이나옴
  const handleOffer = async (
    offer: RTCSessionDescriptionInit, //내부에 sdp정보랑, type이있음
    senderId: number,
    roomId: string | number,
    localStream: MediaStream
  ) => {
    const pc = createPeerConnection(
      senderId, //peer생성(저장할거)
      (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          sendSignal({
            signalType: "CANDIDATE",
            receiverId: senderId,
            roomId: roomId!,
            signal: {
              candidate: event.candidate.candidate,
              sdpMid: event.candidate.sdpMid!,
              sdpMLineIndex: event.candidate.sdpMLineIndex!,
            },
          });
        }
      }
    );

    //스트림을 추가한다(화면송출용)
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    //상대방에게서 온 정보를수락한다.(연결방식을 저장!)
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    //수락을 했으니 응답객체를 만든다(sdp정보 상대방도 받아야하니까)
    const answer = await pc.createAnswer();
    //내sdp도 저장 ice도 생성되기시작함 상대방에게 응답준비완료
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
