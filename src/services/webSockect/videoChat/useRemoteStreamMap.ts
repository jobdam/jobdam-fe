/** @format */
import { useState, useCallback } from "react";

export const useRemoteStreamMap = () => {
  //상태감지로 UI적용해야해서 map말고 record쓰라함.
  const [remoteStreams, setRemoteStreams] = useState<
    Record<number, MediaStream>
  >({});

  // 스트림 추가
  const addRemoteStream = useCallback((userId: number, stream: MediaStream) => {
    setRemoteStreams((prev) => {
      // 이미 같은 id의 stream이 등록되어 있다면 무시
      if (prev[userId] && prev[userId].id === stream.id) {
        return prev;
      }
      console.log("remote stream 추가됨", userId, stream.id);
      return {
        ...prev,
        [userId]: stream,
      };
    });
  }, []);

  // 스트림 제거
  const removeRemoteStream = useCallback((userId: number) => {
    setRemoteStreams((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  }, []);

  // 전부 제거 (언마운트 시)
  const clearRemoteStreams = useCallback(() => {
    setRemoteStreams({});
  }, []);

  return {
    remoteStreams,
    addRemoteStream,
    removeRemoteStream,
    clearRemoteStreams,
  };
};
