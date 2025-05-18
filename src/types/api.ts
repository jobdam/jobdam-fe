/** @format */

//typescript의 api 타입들을 정의한다.
export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  id: number;
  email?: string;
  name?: string;
  birthday?: string;
  profileImageUrl?: string;
  jobCode?: string;
  targetCompanySize?: string;
  educationLevel?: string;
  educationStatus?: string;
  experienceType?: string;
  jobDetailCode?: string;
}>;

export type AuthResponse = {
  headers: any;
  jwt: string;
  data: User;
  user: User;
};

type CompanySizeCode = "LARGE" | "MEDIUM" | "SMALL" | "STARTUP";

export const companySizeMap: Record<CompanySizeCode, string> = {
  LARGE: "대기업",
  MEDIUM: "중견기업",
  SMALL: "중소기업",
  STARTUP: "스타트업",
};

type educationCode =
  | "HIGH_SCHOOL"
  | "COLLEGE"
  | "UNIVERSITY"
  | "GRADUATE_SCHOOL";

export const educationMap: Record<educationCode, string> = {
  UNIVERSITY: "대학교(4년제)",
  COLLEGE: "대학교(2,3년제)",
  GRADUATE_SCHOOL: "대학원",
  HIGH_SCHOOL: "고등학교",
};

//유저 정보부분
export type ExperienceType = "NEW" | "EXPERIENCED";
export const ExperienceTypeLabel: Record<ExperienceType, string> = {
  NEW: "신입",
  EXPERIENCED: "경력",
};

export type InterviewType = "PERSONALITY" | "JOB" | "TECHNICAL";

export const InterviewTypeLabel: Record<InterviewType, string> = {
  PERSONALITY: "인성 면접",
  JOB: "직무 면접",
  TECHNICAL: "기술 면접",
};
