/** @format */

import { useLocalMediaStream } from "@/services/webSockect/videoChat/useLocalMediaStream";
import { usePeerMap } from "@/services/webSockect/videoChat/usePeerMap";
import { useRemoteStreamMap } from "@/services/webSockect/videoChat/useRemoteStreamMap";
import { useSignalHandler } from "@/services/webSockect/videoChat/useSignalHandler";
import { useSignalPublisher } from "@/services/webSockect/videoChat/useSignalPublisher";
import {
  SignalMessage,
  useBroadcastSignalSubscribe,
  usePrivateSignalSubscribe,
} from "@/services/webSockect/videoChat/useSignalSubscribe";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import InterviewPanel from "./components/interview/InterviewPanel";
import { fetchUserInterviewData } from "./api/get-interviewFullData";
import VideoPanel from "./components/video/VideoPanel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setInterviewData } from "@/store/slices/videoChatInterview";
import { getUserIdFromJwt } from "@/utils/tokenUtils";
import LoadingModal from "@/components/ui/loading/loadingModal";

const Videomain = () => {
  ////공통////
  const { roomId } = useParams();
  const navigate = useNavigate();
  const myUserId = useMemo(() => getUserIdFromJwt(), []);
  const location = useLocation();
  const isFirstJoin = location.state?.firstJoin;
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(true);
  ////video////
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
  const { sendJoin, sendSignal } = useSignalPublisher();
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
  const dispatch = useDispatch();
  const interviewDataMap = useSelector(
    (state: RootState) => state.videoChatInterview.interviewDataMap
  );
  //초기설정
  useEffect(() => {
    if (!roomId) {
      navigate("/");
      return;
    }
    if (!myUserId) {
      navigate("/");
      return;
    }
    return () => {
      peerMap.clearAll(); //언마운트시 전부제거
    };
  }, [roomId]);
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
    console.log("sendOffer:", stream);
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
  ///구독 핸들러
  //join List를 처리하는곳
  const handleJoin = useCallback(async (data: SignalMessage) => {
    if (data.signalType === "JOIN_LIST") {
      for (const userId of data.userIdList) {
        // 최초 입장일 경우 중복 방지용으로 큰 ID에게만 offer
        if (peerMap.getPeer(userId)) return;
        if (myUserId! < userId) {
          await createPeerAndSendOffer(userId);
        }
      }
    }
  }, []);
  //구독시 시그널서버로 peer정보주고 받는곳
  const handleSignal = useCallback(
    async (data: SignalMessage) => {
      switch (data.signalType) {
        case "JOIN_ONE": //새로고침,인터넷끊김등으로 재입장
          for (const userId of data.userIdList) {
            console.log(data.userIdList);
            await createPeerAndSendOffer(userId);
          }
          break;
        case "OFFER": //offer를받는다면
          //기존에 존재하는 peer삭제(있다면)
          if (peerMap.getPeer(data.senderId)) {
            peerMap.removePeer(data.senderId);
          }
          await handleOffer(
            { sdp: data.sdp, type: "offer" },
            data.senderId,
            roomId!,
            stream!
          );
          await ensureInterviewData(data.senderId);
          break;
        case "ANSWER": //answer를받는다면
          await handleAnswer({ sdp: data.sdp, type: "answer" }, data.senderId);
          await ensureInterviewData(data.senderId);
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
  //인터뷰초기데이터를 가져와 리덕스에저장
  const ensureInterviewData = async (userId: number) => {
    if (!interviewDataMap[userId]) {
      const userData = await fetchUserInterviewData(userId);
      dispatch(setInterviewData({ userId, data: userData }));
    }
    //초기화 완료시점이니 처음접근한기록없앤다(새로고침,팅김방지)
    if (location.state?.firstJoin) {
      navigate(location.pathname, { replace: true });
    }
  };

  //구독하기
  const [isPrivateSubscribed, setIsPrivateSubscribed] = useState(false);
  const [isBroadcastSubscribed, setIsBroadcastSubscribed] = useState(false);
  //1:1시그널용(joinOne,offer,answer,candidate)
  usePrivateSignalSubscribe({
    roomId: roomId as string,
    onSignal: handleSignal,
    enabled: !!micTrack && !!cameraTrack,
    onSubscribed: () => setIsPrivateSubscribed(true),
  });

  //전체용(동기화방지 joinList를 broadcast)
  useBroadcastSignalSubscribe({
    roomId: roomId as string,
    onSignal: handleJoin,
    enabled: isPrivateSubscribed,
    onSubscribed: () => setIsBroadcastSubscribed(true),
  });
  //구독이 전부 완료되면 시그널 전송시작!
  useEffect(() => {
    if (isBroadcastSubscribed) {
      //처음입장이면 아이디 비교해서 순차적으로offer 아니면 전부다한테 offer
      if (isFirstJoin) {
        console.log("여긴 처음입장했을때만!!");
        sendJoin(roomId!, `/app/signal/join/${roomId!}`);
      } else {
        console.log("여긴새로고침했을떄만나와야해!!");
        sendJoin(roomId!, `/app/signal/joinOne/${roomId!}`);
      }
    }
  }, [isBroadcastSubscribed]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex mt-[45px] w-[80vw] h-[90vh] gap-x-6">
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
          myUserId={myUserId!}
          micTrack={micTrack}
        />
        {/* 오른쪽: 인터뷰 패널 */}
        <InterviewPanel />
      </div>
      {isFirstJoin &&
        isLoadingModalOpen &&
        location.state?.enterUserCount !== peerMap.getAll().size && (
          <LoadingModal
            children={
              <>
                <div>
                  연결 대기 현황 ({peerMap.getAll().size} /{" "}
                  {location.state?.enterUserCount}명)
                </div>
                <div className="mt-2">잠시만 기다려주세요.</div>
              </>
            }
            onClose={() => setIsLoadingModalOpen(false)}
          />
        )}
    </div>
  );
};

export default Videomain;
