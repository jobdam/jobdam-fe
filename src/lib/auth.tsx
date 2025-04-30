/** @format */
import { AuthResponse, User } from "@/types/api";
import { configureAuth } from "react-query-auth";
import { Navigate, useLocation } from "react-router";
import { z } from "zod";
//react-query-auth useAuth 훅을 통해 전역에서 로그인/로그아웃을관리
//react-query를 사용해서 api '유저' 데이터 관리
//로그인 후 사용자 데이터 전역 유지, 자동 refetch도 가능
//자동 refetch란  쿼리를 자동으로 다시 실행해서 최신 데이터를 가져오는것을 말한다.

// import { paths } from '@/config/paths';
// import { AuthResponse, User } from '@/types/api';

import { api } from "./api-client";

const getUser = async (): Promise<User> => {
  const response = await api.get("/auth/me");

  return response.data;
};

//로그아웃
const logout = (): Promise<void> => {
  return api.post("/auth/logout");
};
//로그인
export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post("/auth/login", data);
};

//회원가입할때 핸드폰 번호, 이메일, 핸드폰번호
export const registerInputSchema = z
  .object({
    email: z
      .string()
      .min(1, "잘못된 이메일 형식이에요")
      .email("잘못된 이메일 형식이에요"),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.") // ✅ 먼저 입력 여부 체크
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(15, "비밀번호는 최대 15자까지 가능합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).*$/,
        "영문자와 특수문자를 모두 포함해야 합니다."
      ),
    passwordConfirm: z.string().nonempty("비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput
): Promise<AuthResponse> => {
  return api.post("/auth/register", data);
};

export const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

// export { useUser, useLogin, useLogout, useRegister, AuthLoader };

// 아이디 비밀번호 유효성검사
export const loginInputSchema = z.object({
  email: z
    .string()
    .min(1, "잘못된 이메일 형식이에요")
    .email("잘못된 이메일 형식이에요"),
  password: z
    .string()
    .nonempty("비밀번호를 입력해주세요.") // ✅ 먼저 입력 여부 체크
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(15, "비밀번호는 최대 15자까지 가능합니다.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).*$/,
      "영문자와 특수문자를 모두 포함해야 합니다."
    ),
});

//Oauth 유효성검사
export const oauthLoginSchema = z.object({
  provider: z.enum(["kakao", "naver", "google"]), // 혹은 z.literal("kakao") 등
  accessToken: z.string().min(1, "토큰이 유효하지 않습니다."),
});

//이용약관 유효성검사
export const termsSchema = z.object({
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "이용약관에 동의해주세요." }),
  }),
  agreePrivacy: z.literal(true, {
    errorMap: () => ({ message: "개인정보 처리방침에 동의해주세요." }),
  }),
  AllCheck: z.boolean().optional(), // UI용 (검사 대상 아님)
});
