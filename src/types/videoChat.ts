/** @format */

export interface MediaControlState {
  isMicOn?: boolean;
  isCameraOn?: boolean;
  isScreenSharing?: boolean;
  toggleMic?: () => void;
  toggleCamera?: () => void;
  toggleScreenShare?: () => void;
}

export interface UtilityState {
  mediaControl: MediaControlState;
  toggleChat: () => void;
}

export interface VideoChatUserMessage {
  userId: number;
  userName: string;
  content: string;
  isMe: boolean;
}
