/** @format */

import { useNotifications } from "@/components/ui/notification";
import { paths } from "@/config/paths";
import { getAccessToken, refreshAccessToken } from "@/lib/authSerivices";
import { store } from "@/store";
import { addNotification } from "@/store/slices/notifications";
import Axios, { InternalAxiosRequestConfig } from "axios";
import { useDispatch } from "react-redux";

const apiUrl = import.meta.env.VITE_API_URL;
// api 요청을 할때 interceptor 요청을 가로채기하여 이과정을 먼저 수행해서 통과되어야 한다.
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  //요청 가로채기할때 항상 토큰을 사용, 로그인이 필요 없는 영역도 존재

  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  //쿠키 자동포함
  // console.log(config.headers.Authorization);

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
    console.log(response);
    //데이터는 바로 반환해준다.
    return response;
  },

  //에러 반환
  async (error) => {
    const message = error.response?.data?.message || error.message;
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    store.dispatch(
      addNotification({
        type: "error",
        title: "Error",
        message,
      })
    );

    //인증 되지 않은 사용자는 로그인으로 되돌려 보내기.

    //401에러 일때도 re
    console.log(error);

    // if (error.response?.status === 404 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   try {
    //     //액세스토큰 재발급 전에 401 에러 발생하면
    //     const newAccessToken = await refreshAccessToken();

    //     //새 토큰으로 authorization 헤더 갱신하기
    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    //     //원래 요청 재시도
    //     return api(originalRequest);
    //     //   c
    //   } catch (error) {
    //     // refresh 실패하면 로그인 페이지로 이동 , 401에러인데 아직 로그인을
    //     //401에러 가 발생시

    //     const searchParams = new URLSearchParams();
    //     const redirectTo =
    //       searchParams.get("redirectTo") || window.location.pathname;
    //     window.location.href = paths.auth.login.getHref(redirectTo);

    //     return Promise.reject(error);
    //   }
    // }
    return Promise.reject(error);
  }
);
