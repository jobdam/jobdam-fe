/** @format */
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { InterviewRequest } from "@/types/interview";

//화상매칭 진입시 인터뷰데이터,질문등 post초기화 작업을한다다
export const postInitInterview = async (
  payload: InterviewRequest
): Promise<void> => {
  await api.post("/user/interviews/init", payload);
};

type UseInitInterviewOptions = {
  mutationConfig?: MutationConfig<typeof postInitInterview>;
};

export const useInitInterviewMutation = ({
  mutationConfig,
}: UseInitInterviewOptions = {}) => {
  return useMutation<void, Error, InterviewRequest>({
    mutationFn: postInitInterview,
    ...mutationConfig,
  });
};
