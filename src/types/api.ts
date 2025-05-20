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

type CompanySizeCode = "large" | "small" | "start-up";

export const companySizeMap: Record<CompanySizeCode, string> = {
  large: "대기업",
  small: "중소기업",
  "start-up": "스타트업",
};

type educationCode =
  | "university"
  | "college"
  | "graduate-school"
  | "high-school";

export const educationMap: Record<educationCode, string> = {
  university: "대학교(4년제)",
  college: "대학교(2,3년제)",
  "graduate-school": "대학원",
  "high-school": "고등학교",
};
