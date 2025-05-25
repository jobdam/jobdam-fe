/** @format */

import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export const getResume = () => {
  return api.get("/user/resume", {
    headers: { "Content-Type": "application/pdf" },
  });
};
//
export const getResumeQuery = () => {
  return queryOptions({
    queryKey: ["resumeURL"],
    queryFn: () => getResume(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 32,
  });
};

type useResumeOptions = {
  queryConfig?: QueryConfig<typeof getResumeQuery>;
};

export const useResume = ({ queryConfig }: useResumeOptions) => {
  return useQuery({
    ...queryConfig,
    ...getResumeQuery(),
  });
};
