/** @format */
import { parseJwt } from "./parseJwt";

/**
 * 로컬스토리지에서 userId만 추출
 */
export function getUserIdFromJwt(): number | null {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const payload = parseJwt(token);
  return payload?.userId ?? null;
}
