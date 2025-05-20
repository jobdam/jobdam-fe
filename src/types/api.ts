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
  profileImgUrl?: string;
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

type CompanySizeCode = "LARGE" | "SMALL" | "START-UP";

export const companySizeMap: Record<CompanySizeCode, string> = {
  LARGE: "대기업",
  SMALL: "중소기업",
  "START-UP": "스타트업",
};

type educationCode =
  | "UNIVERSITY"
  | "COLLEGE"
  | "GRADUATE-SCHOOL"
  | "HIGH-SCHOOL";

export const educationMap: Record<educationCode, string> = {
  UNIVERSITY: "대학교(4년제)",
  COLLEGE: "대학교(2,3년제)",
  "GRADUATE-SCHOOL": "대학원",
  "HIGH-SCHOOL": "고등학교",
};

type expCode = "NEW" | "EXPERIENCED";

export const expMap: Record<expCode, string> = {
  NEW: "신입",
  EXPERIENCED: "경력",
};
