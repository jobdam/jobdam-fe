/** @format */
import { AuthResponse, User } from "@/types/api";
import { configureAuth } from "react-query-auth";
import { z } from "zod";
//react-query-auth useAuth 훅을 통해 전역에서 로그인/로그아웃을관리
//react-query를 사용해서 api '유저' 데이터 관리
//로그인 후 사용자 데이터 전역 유지, 자동 refetch도 가능
//자동 refetch란  쿼리를 자동으로 다시 실행해서 최신 데이터를 가져오는것을 말한다.

// import { paths } from '@/config/paths';
// import { AuthResponse, User } from '@/types/api';

import { api } from "./api-client";
import { paths } from "@/config/paths";

//데이터를 가져올땐 userId를 가져온다.
const getUser = async (userId: number): Promise<User> => {
  console.log(userId, "userId");
  const response = await api.get(`/users/${userId}`);

  return response.data;
};

//로그아웃
const logout = (): Promise<void> => {
  return api.post("/logout");
};
//로그인
export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post("/login", data);
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
  return api.post("/sign-up", data);
};

//로그인을 하면 jwttoken을 가져온다.
export const authConfig = {
  userFn: async (data: User) => {
    //userId를 가져오는 방법
    const response = await getUser(data.id);
    console.log(data);
    return response;
  },
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    const token = response.headers["authorization"].replace("Bearer ", "");
    console.log(token);
    //localstorage에 로그인
    localStorage.setItem("accessToken", JSON.stringify(token));

    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    //로그인에 성공했을때. 이메일 인증 보내기
    const response = await registerWithEmailAndPassword(data);
    await api.post("/email-verification", { email: data.email });

    return response.user;
  },
  logoutFn: logout,
};

//로그인에 성공했을때 이메일 인증을 보낸다.
//  const verify = api.post("/email-verification", { email: data.email });
//이메일 인증을 보내는것에 성공하면, 이메일 인증 페이지로 이동한다.

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
      /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).*$/,
      "영문자와 특수문자를 모두 포함해야 합니다."
    ),
});

//Oauth 유효성검사
export const oauthLoginSchema = z.object({
  provider: z.enum(["kakao", "google"]), // 혹은 z.literal("kakao") 등
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
// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const user = useUser();
//   const location = useLocation();

//   if (!user.data) {
//     return (
//       <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
//     );
//   }

//   return children;
// };
