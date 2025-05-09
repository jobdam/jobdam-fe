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
  email: string;
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
  user: User;
};

export type InterviewData = {
  jobCode: string;
  jobDetailCode: string;
  introduce: string;
  interviewType: string;
  peopleCount: number;
};
