/** @format */

import { api } from "@/lib/api-client";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { User } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";
export const getcheckemail = async (email): Promise<User> => {
  return api.get("/email-check", { params: { email } });
};

export const getCheckEmailQuery = (email: string) => {
  return queryOptions({
    queryKey: ["check", email],
    queryFn: () => getcheckemail({ email }),
    staleTime: 0, // 바로바로 요청
    enabled: false,
    gcTime: 0, // 캐시 유지 안 함
  });
};

type useCheckOptions = {
  email: string;
  queryConfig?: QueryConfig<typeof getCheckEmailQuery>;
};

export const useCheckEmail = ({ email, queryConfig }: useCheckOptions) => {
  return useQuery({
    ...getCheckEmailQuery(email),
    ...queryConfig,
  });
};
