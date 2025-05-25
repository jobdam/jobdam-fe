/** @format */
import { api } from "@/lib/api-client";

export const getHasResume = async () => {
  const res = await api.get("/user/resume");
  if (res.data.resumeUrl) return true;
  else return false;
};
