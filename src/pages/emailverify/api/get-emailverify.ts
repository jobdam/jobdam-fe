/** @format */
import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

//이메일 인증하기 get을통해 불러오고 인증을통해 넘어가게끔.
export const getVerifyEmail = (token: string) => {
  const response = api.get("/verify", { params: { token } });
  console.log(response);
  return response;
};

type UseVerifyEmailOptions = {
  token: string;
  enabled?: boolean;
  queryConfig?: QueryConfig<typeof getVerifyEmail>;
};

export const getVerifyEmailQuery = (token: string) => {
  return queryOptions({
    queryKey: ["verify", token],
    queryFn: () => getVerifyEmail(token),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 32,
    // 바로바로 요청
    // enabled: false,
  });
};

export const useVerifyEmail = ({
  token,
  enabled,
  queryConfig,
}: UseVerifyEmailOptions) => {
  return useQuery({
    ...queryConfig,
    ...getVerifyEmailQuery(token),

    enabled,
  });
};
