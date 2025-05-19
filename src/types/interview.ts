/** @format */

import { InterviewType } from "./api";

export interface InterviewRequest {
  interviewType: InterviewType;
  jobCode: string;
}

export interface VideoChatInterviewResponse {
  resumeUrl: string | null;
  interviewId: number;
  interviewQuestions: InterviewQuestion[] | null;
}

export interface InterviewQuestion {
  interviewQuestionId: number;
  context: string;
}

export interface FeedBackRequest {
  targetUserId: number;
  content: string;
}
