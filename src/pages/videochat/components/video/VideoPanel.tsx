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
  //내화면 보기위해서 필요한것
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  //메인화면 전환용
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  const selectedUserId = useSelector(
    (state: RootState) => state.videoChatInterview.selectedUserId
  );

  //채팅
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);
  //채팅 토글까지 추가한 최종유틸
  const utility: UtilityState = {
    mediaControl,
    toggleChat,
  };
  const { sendChatInVideo } = useChatPublisher();
  //채팅 메세지
  const [messages, setMessages] = useState<VideoChatUserMessage[]>([]);

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

    //같은화면이 2개이상되면 버그나서 복사본으로해결
    if (mainVideo) {
      const clone = new MediaStream(mainVideo.getTracks());
      mainVideoRef.current.srcObject = clone;
    } else {
      mainVideoRef.current.srcObject = null;
    }
  }, [selectedUserId, localStream, remoteStreams, myUserId]);

  return (
    <div className="flex flex-col justify-between h-[90%] w-[75%] p-4 bg-white border border-[#d9d9d9] rounded-[20px] shadow-custom">
      <div className="flex flex-col gap-4">
        {/* 메인 비디오 */}
        <div className="relative w-full h-[637px] bg-gray-300 rounded-lg">
          <div className="flex items-center justify-center w-full h-full">
            <video
              ref={mainVideoRef}
              autoPlay
              playsInline
              muted
              className="w-[90%] h-[90%] object-cover rounded-lg"
            />
          </div>
          {/* 유틸 */}
          <div className="absolute left-4 left-4 bottom-4 z-10">
            <Utility utility={utility} />
          </div>
          {/* 채팅창 */}
          {isChatOpen && (
            <ChatOverlay messages={messages} onSend={sendMessage} />
          )}
        </div>
        {/* 하단 썸네일들 */}
        <div className="flex flex-wrap justify-center gap-2 max-w-[960px] mx-auto mt-4">
          {/* 내 비디오 (내비디오 상대방비디오는 하나로 합치기X 차후 기능추가시 별도로 해야 편함)*/}
          <div className="flex gap-2 justify-center">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-[200px] h-[150px] bg-black rounded-md object-cover cursor-pointer"
              onClick={() => {
                dispatch(setSelectedUserId(myUserId));
              }}
            />
          </div>
          {/* 상대방 비디오 */}
          {Object.entries(remoteStreams).map(([userId, stream]) => (
            <div key={userId} className="flex gap-2 justify-center">
              <video
                data-userid={userId}
                autoPlay
                playsInline
                className="w-[200px] h-[150px] bg-black rounded-md object-cover cursor-pointer"
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
    </div>
  );
};

export default VideoPanel;
