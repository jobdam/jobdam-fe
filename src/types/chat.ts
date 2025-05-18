/** @format */
//채팅 메세지부분
export interface ChatUserMessage {
  id: string;
  type: "USER";
  content: string;
  time: string;
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

//유저 정보부분
export type ExperienceType = "NEW" | "EXPERIENCED";
export type InterviewType = "PERSONALITY" | "JOB" | "TECHNICAL";

export const InterviewTypeLabel: Record<InterviewType, string> = {
  PERSONALITY: "인성 면접",
  JOB: "직무 면접",
  TECHNICAL: "기술 면접",
};

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
