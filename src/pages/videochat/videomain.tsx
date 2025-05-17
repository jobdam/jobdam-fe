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
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import InterviewPanel from "./components/interview/InterviewPanel";
import VideoPanel from "./components/video/videoPanel";
import { fetchUserInterviewData } from "./api/get-interviewFullData";

const Videomain = () => {
  ////공통////
  const { roomId } = useParams();
  const navigate = useNavigate();

  ////video////
  //다른사람 스트림정보
  const { remoteStreams, addRemoteStream, removeRemoteStream } =
    useRemoteStreamMap();
  //peer관리 훅
  const peerMap = usePeerMap(addRemoteStream, removeRemoteStream);
  //미디어 관련 훅
  const {
    stream,
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

  ///인터뷰 관련/////

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
            roomId!,
            stream!
          );
          const offerUserInfo = await fetchUserInterviewData(data.senderId);
          console.log("상대방 OFFER 정보:", offerUserInfo);
          break;
        case "ANSWER": //answer를받는다면
          await handleAnswer({ sdp: data.sdp, type: "answer" }, data.senderId);
          const answerUserInfo = await fetchUserInterviewData(data.senderId);
          console.log("상대방 OFFER 정보:", answerUserInfo);
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

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-videochat">
      <div className="flex w-[80vw] h-[90vh] gap-x-6">
        <VideoPanel
          localStream={stream}
          remoteStreams={remoteStreams}
          mediaControl={{
            isMicOn,
            isCameraOn,
            isScreenSharing,
            toggleMic,
            toggleCamera,
            toggleScreenShare,
          }}
          roomId={roomId!}
        />
        {/* 오른쪽: 인터뷰 패널 */}
        <InterviewPanel />
      </div>
    </div>
  );
};

export default Videomain;
