/** @format */

import { getAccessToken, refreshAccessToken } from "@/lib/authSerivices";
import { store } from "@/store";
import { addNotification } from "@/store/slices/notifications";
import Axios, { InternalAxiosRequestConfig } from "axios";
import { paths } from "@/config/paths";
let isRefreshing = false; // 토큰 갱신 상태 추적
const apiUrl = import.meta.env.VITE_API_URL;
// api 요청을 할때 i
// nterceptor 요청을 가로채기하여 이과정을 먼저 수행해서 통과되어야 한다.
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  //요청 가로채기할때 항상 토큰을 사용, 로그인이 필요 없는 영역도 존재
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  //파일 들어오고 이미지 업로드를우해선 추가적인 설정이 필요
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  //쿠키 자동포함

  config.withCredentials = true;
  return config;
}
export const api = Axios.create({
  baseURL: apiUrl,
});
//request 요청의 경우 authRI를 사용.
api.interceptors.request.use(authRequestInterceptor);
//respose 요청을 가로챈다.
api.interceptors.response.use(
  (response) => {
    //데이터는 바로 반환해준다.
    return response;
  },

  //에러 반환
  async (error) => {
    const message = error.response?.data?.message || error.message;

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const token = getAccessToken();

    console.log(
      error?.response?.status === 404 &&
        error.response?.data?.message === "토큰이 만료되었습니다." &&
        !originalRequest &&
        !isRefreshing
    );
    //401 에러가 뜨는경우 => 로그인이 안된경우, 와 accesstoken을 재발급 받아야하는겨웅'

    //로그인이 안된경우 protected router 로 강제로 로그인으로 보내기.
    //이메일 검증시엔 이러한 시도가 필요가 없다.

    //로그인을 한 상황에서는 token재발급 과정을 먼저 거치고 refreshtokenㅣ 없을때 로그아웃을하고 메인으로 돌려보낸다.

    // 로그인을 하지 않은 상황에서는 만약 인증을 해야되는곳을 갔을때 redirect를준다 -> 로그인했을때 그쪽으로 다시 리턴

    //404는 토큰이 만료된 상황 토큰이 만료 되엇을경우 재발급을 해야함.
    //재발급을 하려고 했는데 refresh가 만료된 상황이면 로그아웃 진행
    //로그아웃을 진행하려해도 404 에러가뜨면서안됨(토큰이 만료되 로그아웃 못하는 상황)
    //
    if (
      error?.response?.status === 404 &&
      error.response?.data?.message === "토큰이 만료되었습니다." &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      console.log("토큰발급 진입");
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        //액세스토큰 재발급 전에 404 에러 발생하면
        const newAccessToken = await refreshAccessToken();
        //새 토큰으로 authorization 헤더 갱신하기
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        //원래 요청 재시도
        return api(originalRequest);
        //   c
      } catch {
        // refresh가 실패하는 경우는 로그아웃을 진행하낟.

        store.dispatch(
          addNotification({
            type: "error",
            title: "Error",
            message: message + `5초 후에 사라집니다.`,
          })
        );
      } finally {
        isRefreshing = false; // 토큰 갱신 완료
      }
    }

    // 단순히 token이 없거나, 인증이 안된경우 확인하여 로그인으로 강제 이동 한다./
    //현재 authentry가 존재하므로  authentry로 이동하게끔한다. 추후 수정.
    if (error?.response?.status === 401) {
      const pathname = window.location.pathname;

      if (pathname.startsWith("/verify") || pathname === "/verify/*") {
        return Promise.reject(error);
      }

      // store.dispatch(
      //   addNotification({
      //     type: "error",
      //     title: "Error",
      //     message: message + `5초 후에 사라집니다.`,
      //   })
      // );
      console.log(error.response);
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get("redirectTo") || window.location.pathname;
      if (!window.location.pathname.includes("login")) {
        window.location.href = paths.auth.login.getHref(redirectTo);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
