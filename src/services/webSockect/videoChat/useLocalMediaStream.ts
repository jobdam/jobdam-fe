/** @format */

import { useEffect, useState, useCallback, useRef } from "react";

export const useLocalMediaStream = () => {
  //트랙은 단일 스트림은 종합
  const [micTrack, setMicTrack] = useState<MediaStreamTrack | null>(null); //마이크 전용트랙
  const [cameraTrack, setCameraTrack] = useState<MediaStreamTrack | null>(null); // 카메라 트랙
  const [screenTrack, setScreenTrack] = useState<MediaStreamTrack | null>(null); // 화면공유 트랙

  const [isScreenSharing, setIsScreenSharing] = useState(false); //화면공유상태
  const [isMicOn, setIsMicOn] = useState(true); //마이크토글
  const [isCameraOn, setIsCameraOn] = useState(true); //카메라토글

  const combinedStreamRef = useRef<MediaStream>(new MediaStream()); //audio+화면 단일스트림

  //마이크없는사람이면 fake넣어두기
  const createSilentAudioTrack = () => {
    const ctx = new AudioContext();
    const destination = ctx.createMediaStreamDestination();
    const oscillator = ctx.createOscillator();
    oscillator.connect(destination);
    oscillator.start();
    const track = destination.stream.getAudioTracks()[0];
    return track;
  };
  //카메라없는사람 fake넣어두기
  const createBlackVideoTrack = () => {
    const canvas = Object.assign(document.createElement("canvas"), {
      width: 320,
      height: 240,
    });
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];
    return track;
  };

  //초기값 셋팅하기
  useEffect(() => {
    const init = async () => {
      await initMic();
      await initCamera();
    };
    init();

    return () => {
      combinedStreamRef.current.getTracks().forEach((track) => track.stop());
    };
  }, []);

  //마이크 초기값 셋팅
  const initMic = useCallback(async () => {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      const track = micStream.getAudioTracks()[0];
      track.enabled = true; //track을 전송가능하게 만들기

      // 기존 마이크 트랙 정리(초기설정이지만 언마운트등 혹시모를상황대비해서 지움움)
      if (micTrack) {
        combinedStreamRef.current.removeTrack(micTrack);
        micTrack.stop();
      }

      setMicTrack(track);
      combinedStreamRef.current.addTrack(track); //스트림에 마이크트랙 넣기
      setIsMicOn(true); //마이크 토글기본값
    } catch (err) {
      console.error("사용 가능한 마이크가 없습니다.", err);
      const fakeAudio = createSilentAudioTrack();
      setMicTrack(fakeAudio);
      combinedStreamRef.current.addTrack(fakeAudio);
      setIsMicOn(false);
    }
  }, [micTrack]);

  //카메라 초기값셋팅
  const initCamera = useCallback(async () => {
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      const track = camStream.getVideoTracks()[0];
      track.enabled = true;
      // 기존 비디오 트랙 정리
      if (cameraTrack) {
        combinedStreamRef.current.removeTrack(cameraTrack);
        cameraTrack.stop();
      }
      setCameraTrack(track);
      combinedStreamRef.current.addTrack(track);
      setIsCameraOn(true);
      setIsScreenSharing(false);
    } catch (err) {
      console.error("사용 가능한 카메라가 없습니다.", err);
      const fakeVideo = createBlackVideoTrack();
      setCameraTrack(fakeVideo);
      combinedStreamRef.current.addTrack(fakeVideo);
      setIsCameraOn(false);
      setIsScreenSharing(false);
    }
  }, [cameraTrack]);

  // 마이크 토글
  const toggleMic = useCallback(() => {
    if (micTrack) {
      micTrack.enabled = !micTrack.enabled; //상태동기화
      setIsMicOn(micTrack.enabled); //토글 반영
    }
  }, [micTrack]);

  //카메라 토글
  const toggleCamera = useCallback(() => {
    if (cameraTrack && !isScreenSharing) {
      //화면공유상태에선 무시
      cameraTrack.enabled = !cameraTrack.enabled;
      setIsCameraOn(cameraTrack.enabled);
    }
  }, [cameraTrack, isScreenSharing]);

  //화면공유 토글
  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      //화면공유 상태라면
      if (screenTrack) {
        combinedStreamRef.current.removeTrack(screenTrack);
        screenTrack.stop();
        setScreenTrack(null);
      }
      if (cameraTrack) {
        combinedStreamRef.current.addTrack(cameraTrack);
        setIsCameraOn(cameraTrack.enabled);
      }
      setIsScreenSharing(false);
    } else {
      //아니라면 화면공유트랙만들기.
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screen = displayStream.getVideoTracks()[0];
        screen.enabled = true;

        if (cameraTrack) {
          //기존트랙은지우고
          combinedStreamRef.current.removeTrack(cameraTrack); //카메라 활성종료
        }

        setScreenTrack(screen);
        combinedStreamRef.current.addTrack(screen);
        setIsScreenSharing(true);
        setIsCameraOn(false);
      } catch (err) {
        console.error("화면 공유 실패", err);
      }
    }
  }, [cameraTrack, screenTrack, isScreenSharing]);

  return {
    stream: combinedStreamRef.current,
    micTrack,
    cameraTrack,
    screenTrack,
    isMicOn,
    isCameraOn,
    isScreenSharing,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
  };
};
