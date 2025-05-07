/** @format */

import { useLocalMediaStream } from "@/services/webSockect/videoChat/useLocalMediaStream";
import { usePeerMap } from "@/services/webSockect/videoChat/usePeerMap";
import { useRemoteStreamMap } from "@/services/webSockect/videoChat/useRemoteStreamMap";
import { useSignalHandler } from "@/services/webSockect/videoChat/useSignalHandler";
import { useSignalPublisher } from "@/services/webSockect/videoChat/useSignalPublisher";
import {
  SignalMessage,
  useSignalSubscription,
} from "@/services/webSockect/videoChat/useSignalSubscrpition";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Videomain = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  //내 미디어관련
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  //다른사람 스트림정보
  const { remoteStreams, addRemoteStream, removeRemoteStream } =
    useRemoteStreamMap();
  //peer관리 훅
  const peerMap = usePeerMap(addRemoteStream, removeRemoteStream);
  //미디어 관련 훅
  const {
    stream,
    micTrack,
    cameraTrack,
    screenTrack,
    isMicOn,
    isCameraOn,
    isScreenSharing,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
  } = useLocalMediaStream();

  //시그널 전송 훅
  const { sendSignal } = useSignalPublisher();
  //시그널 받을때 핸들
  const { handleOffer, handleAnswer, handleCandidate } = useSignalHandler(
    peerMap,
    (to: number, answer: RTCSessionDescriptionInit) => {
      sendSignal({
        //offer를 받았을때만 answer콜백으로 응답한다.
        signalType: "ANSWER",
        receiverId: to,
        roomId: roomId!,
        signal: { sdp: answer.sdp! },
      });
    }
  );

  useEffect(() => {
    if (!roomId) {
      navigate(-1);
      return;
    }

    return () => {
      peerMap.clearAll(); //언마운트시 전부제거
    };
  }, [roomId, navigate]);
  /////////////////////////////

  // 로컬 스트림을 비디오에 연결
  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  // 화면 공유 또는 카메라 트랙 변경 시 replaceTrack
  useEffect(() => {
    const newTrack = isScreenSharing ? screenTrack : cameraTrack;
    if (!newTrack) return;

    peerMap.getAll().forEach((pc, userId) => {
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");
      if (sender) {
        sender
          .replaceTrack(newTrack)
          .then(() => {
            console.log(`[replaceTrack][${userId}] 화면 전환 완료`);
          })
          .catch((err) => {
            console.error(`[replaceTrack][${userId}] 실패`, err);
          });
      }
    });
  }, [cameraTrack, screenTrack, isScreenSharing]);

  //peerConnect를 만들고 상대방에게 offer를 보내는 함수
  const createPeerAndSendOffer = async (targetUserId: number) => {
    // 1. peer 연결 생성
    const pc = peerMap.createPeerConnection(
      targetUserId,
      (event: RTCPeerConnectionIceEvent) => {
        // ICE 후보 생기면 전송(콜백)
        if (event.candidate) {
          sendSignal({
            signalType: "CANDIDATE",
            receiverId: targetUserId,
            roomId: roomId!,
            signal: {
              candidate: event.candidate.candidate,
              sdpMid: event.candidate.sdpMid!,
              sdpMLineIndex: event.candidate.sdpMLineIndex!,
            },
          });
        }
      },
      (state: RTCPeerConnectionState) => {
        // 연결감지시 콜백(누가누가 나갔습니다 알려줄때)
        console.log(`[ConnectionState][${targetUserId}]:`, state);
      }
    );
    // 무조건 offer전에 스트림을 넣어줘야 sdp에 적용된다.
    stream?.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    // 2. offer 생성
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // 3. offer 전송
    sendSignal({
      signalType: "OFFER",
      receiverId: targetUserId,
      roomId: roomId!,
      signal: {
        sdp: offer.sdp!,
      },
    });
  };
  //////////////////////////////////
  //구독시 시그널서버로 peer정보주고 받는곳
  const handleSignal = useCallback(
    async (data: SignalMessage) => {
      switch (data.signalType) {
        case "JOIN_LIST": //여긴offer를보내는곳
          for (const userId of data.userIdList) {
            await createPeerAndSendOffer(userId);
          }
          break;
        case "OFFER": //offer를받는다면
          await handleOffer(
            { sdp: data.sdp, type: "offer" },
            data.senderId,
            stream!
          );
          break;
        case "ANSWER": //answer를받는다면
          await handleAnswer({ sdp: data.sdp, type: "answer" }, data.senderId);
          break;
        case "CANDIDATE": //candidate를받는다면
          await handleCandidate(
            {
              candidate: data.candidate,
              sdpMLineIndex: data.sdpMLineIndex,
              sdpMid: data.sdpMid,
            },
            data.senderId
          );
          break;
      }
    },
    [stream]
  );

  //구독하기

  useSignalSubscription({
    roomId: roomId as string,
    onSignal: handleSignal,
    enabled: !!stream,
  });
  //////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  ///////////////시그널 완료/////////////////////////////////////

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "320px",
            height: "240px",
            backgroundColor: "black",
            borderRadius: "12px",
          }}
        />
        {Object.entries(remoteStreams).map(([userId, stream]) => (
          <video
            key={userId}
            autoPlay
            playsInline
            style={{
              width: "320px",
              height: "240px",
              backgroundColor: "black",
              borderRadius: "12px",
            }}
            ref={(el: HTMLVideoElement | null) => {
              if (el && stream) {
                el.srcObject = stream;
              }
            }}
          />
        ))}
      </div>
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
    </div>
  );
};

export default Videomain;
