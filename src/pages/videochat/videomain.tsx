/** @format */

import { useSignalPublisher } from "@/services/webSockect/signal/useSignalPublisher";
import {
  SignalMessage,
  useSignalSubscription,
} from "@/services/webSockect/signal/useSignalSubscrpition";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";

const Videomain = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  //peer정보맵관리
  const peerMapRef = useRef<Map<number, RTCPeerConnection>>(new Map());

  const createPeerConnection = (targetUserId: number) => {
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
    // ICE 후보 수집
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({
          type: "CANDIDATE",
          receiverId: targetUserId,
          roomId: roomId as string,
          signal: {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid!,
            sdpMLineIndex: event.candidate.sdpMLineIndex!,
          },
        });
      }
    };

    // 연결 상태 체크 및 종료 처리 등도 여기에
    pc.onconnectionstatechange = () => {
      if (["disconnected", "failed", "closed"].includes(pc.connectionState)) {
        console.log("연결 종료", targetUserId);
        pc.close();
        peerMapRef.current.delete(targetUserId);
      }
    };

    peerMapRef.current.set(targetUserId, pc);
    return pc;
  };

  useEffect(() => {
    if (!roomId) {
      navigate(-1);
      return;
    }
  }, [roomId, navigate]);

  const { sendSignal } = useSignalPublisher();

  //구독시 시그널서버로 peer정보주고 받는곳
  const handleSignal = useCallback(async (data: SignalMessage) => {
    switch (data.signalType) {
      case "JOIN_LIST":
        for (const userId of data.userIdList) {
          const pc = createPeerConnection(userId);
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);

          sendSignal({
            type: "OFFER",
            receiverId: userId,
            roomId: roomId as string,
            signal: { sdp: offer.sdp },
          });
        }
        break;
      case "JOIN_ONE":
        const pc = createPeerConnection(data.userId);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        sendSignal({
          type: "OFFER",
          receiverId: data.userId,
          roomId: roomId as string,
          signal: { sdp: offer.sdp },
        });
        break;
      case "OFFER":
        const pc = createPeerConnection(data.senderId);
        await pc.setRemoteDescription(
          new RTCSessionDescription({ type: "offer", sdp: data.sdp })
        );
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        sendSignal({
          type: "ANSWER",
          receiverId: data.senderId,
          roomId: roomId as string,
          signal: { sdp: answer.sdp },
        });

        break;
      case "ANSWER":
        const offerPc = peerMapRef.current.get(data.senderId);
        if (offerPc) {
          await offerPc.setRemoteDescription(
            new RTCSessionDescription({ type: "answer", sdp: data.sdp })
          );
        }
        break;
      case "CANDIDATE":
        const candidatePc = peerMapRef.current.get(data.senderId);
        if (candidatePc) {
          const ice = new RTCIceCandidate({
            candidate: data.candidate,
            sdpMid: data.sdpMid,
            sdpMLineIndex: data.sdpMLineIndex,
          });
          await candidatePc.addIceCandidate(ice);
        }
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
