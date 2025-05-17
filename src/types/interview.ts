/** @format */

export type InterviewType = "PERSONALITY" | "JOB" | "TECHNICAL";

export const InterviewTypeLabel: Record<InterviewType, string> = {
  PERSONALITY: "인성 면접",
  JOB: "직무 면접",
  TECHNICAL: "기술 면접",
};

export interface InterviewRequest {
  interviewType: InterviewType;
  jobCode: string;
}

export interface VideoChatInterviewResponse {
  resumeUrl: string | null;
  interviewQuestions: InterviewQuestion[] | null;
}

export interface InterviewQuestion {
  interviewQuestionId: number;
  context: string;
}
