/** @format */

import { usePeerMap } from "@/services/webSockect/signal/usePeerMap";
import { useSignalHandler } from "@/services/webSockect/signal/useSignalHandler";
import { useSignalPublisher } from "@/services/webSockect/signal/useSignalPublisher";
import {
  SignalMessage,
  useSignalSubscription,
} from "@/services/webSockect/signal/useSignalSubscrpition";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Videomain = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  //peer관리 훅
  const { createPeerConnection, clearAll } = usePeerMap();
  //시그널 전송 훅훅
  const { sendSignal } = useSignalPublisher();
  //시그널 받을때 핸들
  const { handleOffer, handleAnswer, handleCandidate } = useSignalHandler(
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
      clearAll(); //언마운트시 전부제거
    };
  }, [roomId, navigate]);

  //peerConnect를 만들고 상대방에게 offer를 보내는 함수
  const createPeerAndSendOffer = async (targetUserId: number) => {
    // 1. peer 연결 생성
    const pc = createPeerConnection(
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
  const handleSignal = useCallback(async (data: SignalMessage) => {
    switch (data.signalType) {
      case "JOIN_LIST": //여긴offer를보내는곳
        console.log("Adfadfad");
        for (const userId of data.userIdList) {
          await createPeerAndSendOffer(userId);
        }
        break;
      case "OFFER": //offer를받는다면
        await handleOffer({ sdp: data.sdp, type: "offer" }, data.senderId);
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
  }, []);

  //구독하기
  useSignalSubscription({
    roomId: roomId as string,
    onSignal: handleSignal,
  });

  return <div>여기는 비디오 메인입니다.</div>;
};

export default Videomain;
