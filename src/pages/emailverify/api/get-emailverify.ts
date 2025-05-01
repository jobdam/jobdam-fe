/** @format */
import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

//이메일 인증하기 get을통해 불러오고 인증을통해 넘어가게끔.
export const getVerifyEmail = async () => {
  const response = await api.get("/verify");

  return response;
};

type UseVerifyEmailOptions = {
  queryConfig?: QueryConfig<typeof getVerifyEmail>;
};

export const getVerifyEmailQuery = () => {
  return queryOptions({
    queryKey: ["verify"],
    queryFn: () => getVerifyEmail(),
    // 바로바로 요청
    enabled: false,
  });
};

export const useVerifyEmail = ({ queryConfig }: UseVerifyEmailOptions) => {
  return useQuery({
    ...getVerifyEmailQuery(),
    ...queryConfig,
  });
};
