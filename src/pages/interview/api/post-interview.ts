/** @format */

import { api } from "@/lib/api-client";

const PostInterview = (data) => {
  return api.post("/match", data);
};
