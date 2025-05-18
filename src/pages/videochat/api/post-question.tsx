/** @format */

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const postQuestion = async (
  interviewId: number,
  payload: { context: string }
): Promise<void> => {
  await api.post(`/user/interviews/${interviewId}/question`, payload);
};
type PostQuestionParams = {
  interviewId: number;
  payload: { context: string };
};

type UsePostQuestionOptions = {
  mutationConfig?: MutationConfig<
    (params: PostQuestionParams) => Promise<void>
  >;
};

export const usePostQuestionMutation = ({
  mutationConfig,
}: UsePostQuestionOptions = {}) => {
  return useMutation<void, Error, PostQuestionParams>({
    mutationFn: ({ interviewId, payload }) =>
      postQuestion(interviewId, payload),
    ...mutationConfig,
  });
};
