/** @format */
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import {
  InterviewRequest,
  VideoChatInterviewResponse,
} from "@/types/interview";

//화상매칭 진입시 인터뷰데이터,질문등 post초기화 작업을하고
//그 결과를 가져온다.
export const postInitInterview = async (
  payload: InterviewRequest
): Promise<VideoChatInterviewResponse> => {
  const res = await api.post("/user/interviews/init", payload);
  return res.data;
};

type UseInitInterviewOptions = {
  mutationConfig?: MutationConfig<typeof postInitInterview>;
};

export const useInitInterviewMutation = ({
  mutationConfig,
}: UseInitInterviewOptions = {}) => {
  return useMutation<VideoChatInterviewResponse, Error, InterviewRequest>({
    mutationFn: postInitInterview,
    ...mutationConfig,
  });
};
