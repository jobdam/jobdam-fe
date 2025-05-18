/** @format */

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { FeedBackRequest } from "@/types/interview";

export const postFeedBack = async (
  questionId: number,
  payload: FeedBackRequest
): Promise<void> => {
  await api.post(`/user/interviews/questions/${questionId}/feedBack`, payload);
};
type PostFeedBackParams = {
  questionId: number;
  payload: FeedBackRequest;
};

type UsePostFeedBackOptions = {
  mutationConfig?: MutationConfig<
    (params: PostFeedBackParams) => Promise<void>
  >;
};

export const usePostFeedBackMutation = ({
  mutationConfig,
}: UsePostFeedBackOptions = {}) => {
  return useMutation<void, Error, PostFeedBackParams>({
    mutationFn: ({ questionId, payload }) => postFeedBack(questionId, payload),
    ...mutationConfig,
  });
};
