/** @format */

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const postQuestion = async (
  interviewId: number,
  payload: { context: string }
): Promise<number> => {
  const res = await api.post(
    `/user/interviews/${interviewId}/question`,
    payload
  );
  return res.data;
};
type PostQuestionParams = {
  interviewId: number;
  payload: { context: string };
};

type UsePostQuestionOptions = {
  mutationConfig?: MutationConfig<
    (params: PostQuestionParams) => Promise<number>
  >;
};

export const usePostQuestionMutation = ({
  mutationConfig,
}: UsePostQuestionOptions = {}) => {
  return useMutation<number, Error, PostQuestionParams>({
    mutationFn: ({ interviewId, payload }) =>
      postQuestion(interviewId, payload),
    ...mutationConfig,
  });
};
