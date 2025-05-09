/** @format */
import { useRef, useCallback } from "react";

export const usePeerMap = (
  addRemoteStream: (id: number, stream: MediaStream) => void,
  removeRemoteStream: (id: number) => void
) => {
  const peerMapRef = useRef<Map<number, RTCPeerConnection>>(new Map());

  // peerConnection 생성 및 저장
  const createPeerConnection = useCallback(
    (
      targetUserId: number,
      onIceCandidate?: (event: RTCPeerConnectionIceEvent) => void,
      onConnectionStateChange?: (state: RTCPeerConnectionState) => void
    ) => {
      //연결 객체생성!(환경설정값 많은데 default로하고 stun/turn서버만 설정)
      const pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:turn.jobdam.site:3478",
          },
          {
            urls: "turns:turn.jobdam.site:5349?transport=tcp",
            username: "user",
            credential: "1234",
          },
        ],
        iceTransportPolicy: "all",
      });
      //ICE 후보수집 접속가능한 경로를 수집할떄마다 호출됨
      pc.onicecandidate = (event) => {
        if (onIceCandidate) {
          console.log("[ICE Candidate]", event.candidate);
          onIceCandidate(event);
        }
      };
      //연결 상태변화 추적해서 관리해줌(끊어졋을떄)
      //"new": 연결 초기 상태
      //"connecting": ICE 수집 중, 연결 시도 중
      //"connected": 연결 성공
      //"disconnected": 일시적 연결 끊김
      //"failed": ICE 연결 실패
      //"closed": 명시적으로 연결 종료됨
      //가장큰 문제는 이이벤트는 3~5초뒤 실행시킨다는점이다. 새로고침시 1초안에 되는데
      //그럼 서버는 이미 웹소켓을 끊엇다 연결해서 새로운 pc stream을 생성한다.
      //그래서 새로고침시 pc생성단계에서 기존정보를지우고 새정보를입력한다.
      pc.onconnectionstatechange = () => {
        if (onConnectionStateChange)
          onConnectionStateChange(pc.connectionState);

        if (["disconnected", "failed", "closed"].includes(pc.connectionState)) {
          const currentPc = peerMapRef.current.get(targetUserId); //새로갱신한 pc
          if (currentPc !== pc) return; //같지않으면 제거안한다! 이미 offer단계에서했음
          pc.close();
          peerMapRef.current.delete(targetUserId);
          removeRemoteStream(targetUserId);
        }
      };

      //화면송출을 위한 트랙설정.(훅에저장) a가offer받을떄, answer를b가받을때실행
      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (remoteStream) {
          addRemoteStream(targetUserId, remoteStream);
        }
      };

      peerMapRef.current.set(targetUserId, pc);
      return pc;
    },
    []
  );

  const getPeer = useCallback((userId: number) => {
    return peerMapRef.current.get(userId) || null;
  }, []);

  const getAll = useCallback(() => {
    return peerMapRef.current;
  }, []);

  const removePeer = useCallback((userId: number) => {
    const pc = peerMapRef.current.get(userId);
    if (pc) {
      pc.close();
      peerMapRef.current.delete(userId);
    }
  }, []);

  const clearAll = useCallback(() => {
    peerMapRef.current.forEach((pc) => pc.close());
    peerMapRef.current.clear();
  }, []);

  return {
    getPeer,
    getAll,
    createPeerConnection,
    removePeer,
    clearAll,
  };
};
