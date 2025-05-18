/** @format */

import { ExperienceType, InterviewType } from "./api";

//채팅 메세지부분
export interface ChatUserMessage {
  id: string;
  type?: "USER";
  content: string;
  time?: string;
  userName?: string;
  profileImageUrl?: string;
  isMe: boolean;
}

export interface ChatSystemMessage {
  id: string;
  type: "SYSTEM";
  content: string;
}

export type ChatMessageType = ChatUserMessage | ChatSystemMessage;

export interface ChatUserInfo {
  userId: number;
  name: string;
  targetCompanySize: string;
  profileImgUrl: string;
  educationLevel: string;
  educationStatus: string;

  jobCode: string;
  jobGroup: string;
  jobDetailCode: string;
  jobDetail: string;
  experienceType: ExperienceType;
  introduce: string;
  interviewType: InterviewType;

  ready: boolean;
}
