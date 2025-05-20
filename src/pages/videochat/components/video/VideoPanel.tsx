/** @format */

import {
  MediaControlState,
  UtilityState,
  VideoChatUserMessage,
} from "@/types/videoChat";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getUserIdFromJwt } from "@/utils/tokenUtils";
import { IMessage } from "@stomp/stompjs";
import { useChatSubscribe } from "@/services/webSockect/chat/useChatSubscribe";
import { useChatPublisher } from "@/services/webSockect/chat/useChatPublisher";
import ChatOverlay from "./ChatOverLay";
import Utility from "./Utility";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserId } from "@/store/slices/videoChatInterview";
import { RootState } from "@/store";
import { useNavigate } from "react-router";
import { useSpeakingDetection } from "@/services/webSockect/videoChat/useSpeakingDetection";
import { SpeakingIndicator } from "./SpeakingIndicator";

interface VideoPanelProps {
  //비디오 스트림
  localStream: MediaStream | null;
  remoteStreams: Record<number, MediaStream>;
  mediaControl: MediaControlState;
  roomId: string;
}

const VideoPanel = ({
  localStream,
  remoteStreams,
  mediaControl,
  roomId,
}: VideoPanelProps) => {
  //공통
  const myUserId = useMemo(() => getUserIdFromJwt(), []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //내화면 보기위해서 필요한것
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  //메인화면 전환용
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  const selectedUserId = useSelector(
    (state: RootState) => state.videoChatInterview.selectedUserId
  );

  //채팅
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isChatOpenRef = useRef(isChatOpen);
  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen((prev) => {
      const next = !prev;
      if (next) setUnreadCount(0); // 채팅창 열면 카운트 0으로
      return next;
    });
  };
  //채팅 토글까지 추가한 최종유틸
  const utility: UtilityState = {
    mediaControl,
    toggleChat,
  };
  const { sendChatInVideo } = useChatPublisher();
  //채팅 메세지
  const [messages, setMessages] = useState<VideoChatUserMessage[]>([]);
  //채팅 안읽은메세지 카운트트
  const [unreadCount, setUnreadCount] = useState(0);

  //서버에서 오는 채팅처리
  const handleChatMessage = useCallback(
    (msg: IMessage) => {
      const data = JSON.parse(msg.body);

      const chat: VideoChatUserMessage = {
        userId: data.userId,
        userName: data.userName ?? "알수없음",
        content: data.content,
        isMe: data.userId === myUserId,
      };
      setMessages((prev) => [...prev, chat]);
      //채팅방 닫혀있으면 카운트늘려줌
      if (!isChatOpenRef.current) {
        if (myUserId !== data.userId) setUnreadCount((count) => count + 1);
      }
    },
    [myUserId]
  );

  // 채팅 메시지 전송
  const sendMessage = (content: string) => {
    sendChatInVideo({ roomId, content });
  };

  //채팅 구독하기
  useChatSubscribe({
    destination: `/topic/videoChat/${roomId}`,
    onMessage: handleChatMessage,
  });
  //내화면 초기셋팅
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // 메인 비디오 전환
  useEffect(() => {
    if (!mainVideoRef.current) return; //돔할당 기다리는거임
    if (!localStream) return; //로컬스트림 할당안됬으면
    if (!myUserId) return;

    let mainVideo: MediaStream | null = null;
    //처음입장이거나 나를클릭하면
    if (!selectedUserId || selectedUserId === myUserId) {
      mainVideo = localStream;
    } else {
      //다른사람클릭하면
      mainVideo = remoteStreams[selectedUserId] || null;
    }

    if (mainVideo) {
      mainVideoRef.current.srcObject = mainVideo;
      mainVideoRef.current.play().catch(() => {});
    } else {
      mainVideoRef.current.srcObject = null;
    }
  }, [selectedUserId, localStream, remoteStreams, myUserId]);

  const handleExit = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="flex flex-col justify-between h-[90%] w-[75%] p-4 bg-white border border-[#d9d9d9] rounded-[20px] shadow-custom">
      {/* 메인 비디오 */}
      <div className="relative flex items-center justify-center w-full h-[75%]">
        <div className="absolute left-6 top-6 z-10">
          <button
            onClick={handleExit}
            className="px-4 py-1 bg-[#434343] text-white rounded-md shadow-md text-sm
                        font-bold transition hover:bg-neutral-900 focus:outline-none cursor-pointers"
          >
            종료
          </button>
        </div>
        <video
          ref={mainVideoRef}
          autoPlay
          playsInline
          muted
          className="w-[95%] h-[95%] object-cover"
        />
        {/* 유틸 */}
        <div className="absolute left-6 bottom-6 z-10">
          <Utility utility={utility} unreadCount={unreadCount} />
        </div>
        {/* 채팅창 */}
        {isChatOpen && <ChatOverlay messages={messages} onSend={sendMessage} />}
      </div>
      {/* 하단 썸네일들 */}
      <div className="flex flex-wrap w-full h-[25%] justify-center gap-2 max-w-[960px] mx-auto mt-2">
        {/* 내 비디오 (내비디오 상대방비디오는 하나로 합치기X 차후 기능추가시 별도로 해야 편함)*/}
        <div className="relative w-[25%] h-[85%] ">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`bg-black object-cover cursor-pointer
            ${
              selectedUserId === myUserId
                ? "border-4 border-blue-500 shadow-lg"
                : ""
            }
            `}
            onClick={() => {
              dispatch(setSelectedUserId(myUserId));
            }}
          />
          <SpeakingIndicator stream={localStream} />
        </div>
        {/* 상대방 비디오 */}
        {Object.entries(remoteStreams).map(([userId, stream]) => (
          <div key={userId} className="w-[25%] h-[85%]">
            <video
              data-userid={userId}
              autoPlay
              playsInline
              className={`bg-black object-cover cursor-pointer
               ${
                 selectedUserId === Number(userId)
                   ? "border-4 border-blue-500 shadow-lg"
                   : ""
               }
            `}
              onClick={() => {
                dispatch(setSelectedUserId(Number(userId)));
              }}
              ref={(el: HTMLVideoElement | null) => {
                if (el && stream) {
                  el.srcObject = stream;
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPanel;
