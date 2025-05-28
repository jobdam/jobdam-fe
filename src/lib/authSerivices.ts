/** @format */

import { api } from "./api-client";

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken"); // 저장된 accessToken을 반환
}

// 2. accessToken과 refreshToken을 localStorage에 저장하는 함수
export function saveTokens(accessToken: string) {
  localStorage.setItem("accessToken", accessToken); // accessToken 저장
} // 3. localStorage에서 저장된 토큰을 모두 삭제하는 함수
export function clearTokens() {
  localStorage.removeItem("accessToken"); // accessToken 삭제
  // window.dispatchEvent(new Event("tokenChanged")); // 🔥 리렌더 유도

  // localStorage.removeItem('refreshToken');  // 위험하므로 주석 처리
}

//refresh로 access 재발급 하는 코드
export const refreshAccessToken = async (): Promise<string | void> => {
  try {
    const response = await api.post("/reissue", {});

    const token = response.headers["authorization"].replace("Bearer ", "");
    // token을 다시 local에 저장
    saveTokens(token);

    return token;
  } catch {
    //refreshToken이 만료된경우라면 로그아웃 처리한다.
    //useLogout(); 훅이라서 컴포넌트에서사용필요!

    throw new Error("Refresh token has expired or is invalid");
  }
};
