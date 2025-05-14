/** @format */

export interface JwtPayload {
  userId: number;
  category?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Payload = token.split(".")[1];
    const decodedPayload = atob(base64Payload); // base64 디코딩
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error("JWT 파싱 실패:", e);
    return null;
  }
}
