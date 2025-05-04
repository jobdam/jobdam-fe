/** @format */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const checkEmail = async (email: string) => {
  const response = await axios.get("/users/check-email", {
    params: { email },
  });
  return response.data.exists;
};

export const useCheckEmail = (email: string) => {
  return useQuery({
    queryKey: ["check-email", email],
    queryFn: () => checkEmail(email),
    enabled: !!email, // email 있을 때만 실행
  });
};
