/** @format */

import { useEffect, useState, useCallback } from "react";

export const useLocalMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null); //미디어스트림(마이크,카메라등 그자체)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null); // 화면공유 스트림
  const [isScreenSharing, setIsScreenSharing] = useState(false); //화면공유상태
  const [isMicOn, setIsMicOn] = useState(true); //마이크토글
  const [isCameraOn, setIsCameraOn] = useState(true); //카메라토글

  useEffect(() => {
    const initMedia = async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        setStream(media);
      } catch (err) {
        console.error("미디어 장치접근 에러", err);
      }
    };

    initMedia();

    return () => {
      stream?.getTracks().forEach((track) => track.stop()); //마이크,카메라끄기
      screenStream?.getTracks().forEach((track) => track.stop()); //화면 공유끄기
      setStream(null);
      setScreenStream(null);
    };
  }, []);

  const toggleMic = useCallback(() => {
    stream?.getAudioTracks().forEach((track) => {
      //여러마이크활성화 가능성..
      track.enabled = !track.enabled;
    });
    setIsMicOn((prev) => !prev);
  }, [stream]);

  const toggleCamera = useCallback(() => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraOn((prev) => !prev);
  }, [stream]);

  //화면공유 토글
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStream?.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
    } else {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        const audioTrack = stream?.getAudioTracks()[0];
        if (audioTrack) {
          displayStream.addTrack(audioTrack);
        }

        setScreenStream(displayStream);
        setIsScreenSharing(true);
      } catch (err) {
        console.error("화면공유 실패", err);
      }
    }
  };

  return {
    stream,
    screenStream,
    isMicOn,
    isCameraOn,
    isScreenSharing,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
  };
};
