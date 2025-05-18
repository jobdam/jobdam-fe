/** @format */

import { api } from "@/lib/api-client";
import { queryClient, QueryConfig } from "@/lib/react-query";
import { VideoChatInterviewResponse } from "@/types/interview";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getInterviewFullData = async (
  userId: number
): Promise<VideoChatInterviewResponse> => {
  const res = await api.get(`/user/interviews/data/${userId}`);
  return res.data;
};

export const getInterviewFullDataQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ["interview-fullData", userId],
    queryFn: () => getInterviewFullData(userId),
    enabled: !!userId, // ID가 있을 때만 실행
  });

export const useInterviewQuestions = (
  userId: number,
  queryConfig?: QueryConfig<typeof getInterviewFullData>
) => {
  return useQuery({
    ...getInterviewFullDataQueryOptions(userId),
    ...queryConfig,
  });
};

export const fetchUserInterviewData = async (userId: number) => {
  return await queryClient.fetchQuery(getInterviewFullDataQueryOptions(userId));
};
