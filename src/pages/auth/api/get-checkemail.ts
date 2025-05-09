/** @format */

import { api } from "@/lib/api-client";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { User } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getcheckemail = (email: string) => {
  return api.get("/check-email", { params: { email } });
};

export const getCheckEmailQuery = (email: string) => {
  return queryOptions({
    queryKey: ["check-email", email],
    queryFn: () => getcheckemail(email),
    enabled: false,
    staleTime: 0, // 바로바로 요청
    gcTime: 0, // 캐시 유지 안 함
  });
};

type useCheckOptions = {
  email: string;
  queryConfig?: QueryConfig<typeof getCheckEmailQuery>;
};

export const useCheckEmail = ({ email, queryConfig }: useCheckOptions) => {
  return useQuery({
    ...queryConfig,

    ...getCheckEmailQuery(email),
  });
};
