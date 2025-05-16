/** @format */

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { InterviewQuestion } from "@/types/interview";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getInterviewQuestions = async (
  interviewId: number
): Promise<InterviewQuestion[]> => {
  const res = await api.get(`/user/interviews/${interviewId}/questions`);
  return res.data;
};

export const getInterviewQuestionsQueryOptions = (interviewId: number) =>
  queryOptions({
    queryKey: ["interview-questions", interviewId],
    queryFn: () => getInterviewQuestions(interviewId),
    enabled: !!interviewId, // ID가 있을 때만 실행
  });

export const useInterviewQuestions = (
  interviewId: number,
  queryConfig?: QueryConfig<typeof getInterviewQuestions>
) => {
  return useQuery({
    ...getInterviewQuestionsQueryOptions(interviewId),
    ...queryConfig,
  });
};
