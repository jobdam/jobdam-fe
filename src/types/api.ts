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
  email: string;
  role: "ME" | "USER";
  teamId: string;
  bio: string;
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};
