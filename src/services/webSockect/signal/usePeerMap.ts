/** @format */
import { useRef, useCallback } from "react";

export const usePeerMap = () => {
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
          { urls: "stun:52.78.46.117:3478" },
          {
            urls: "turn:52.78.46.117:3478",
            username: "user",
            credential: "1234",
          },
        ],
      });
      //ICE 후보수집 접속가능한 경로를 수집할떄마다 호출됨
      pc.onicecandidate = (event) => {
        if (onIceCandidate) {
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
      pc.onconnectionstatechange = () => {
        if (onConnectionStateChange)
          onConnectionStateChange(pc.connectionState);

        if (["disconnected", "failed", "closed"].includes(pc.connectionState)) {
          pc.close();
          peerMapRef.current.delete(targetUserId);
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
    createPeerConnection,
    removePeer,
    clearAll,
  };
};
