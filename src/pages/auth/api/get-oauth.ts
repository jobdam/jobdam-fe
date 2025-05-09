/** @format */

import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

// import { api } from "@/lib/api-client";

// export const oauth;

export const getOauth = () => {
  return api.get("/oauth-redirect");
};
//소셜 로그인은 바로바로 요청
export const getOauthQuery = () => {
  return queryOptions({
    queryKey: ["oauth"],
    queryFn: () => getOauth(),
    staleTime: 0,
    gcTime: 0,
  });
};

type useOauthQueryOptions = {
  //   email: string;
  queryConfig?: QueryConfig<typeof getOauthQuery>;
};

export const useGetOauth = ({ queryConfig }: useOauthQueryOptions) => {
  return useQuery({
    ...queryConfig,
    ...getOauthQuery(),
  });
};
