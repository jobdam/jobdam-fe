/** @format */

import { api } from "@/lib/api-client";
import { z } from "zod";
import { MutationConfig } from "@/lib/react-query";
import { InterviewData } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

//zod까지

//fieldselect에 직무와 세부직무를 선택하는게 존재해서 jobCode  , jobDetailcode가 필요.

export const interviewSchema = z.object({
  jobCode: z.string().min(1, "직무를 선택해주세요"), // 기본값을 설정
  jobDetailCode: z.string().min(1, "세부 직무를 선택해주세요"), // 기본값을 설정
  introduce: z.string().min(1, "자기소개를 입력해주세요."),
  interviewType: z.string().min(1, "면접 유형을 선택해주세요."),
  peopleCount: z.coerce.number().min(1, "인원수를 선택해주세요."),
});

export type CreateInterview = z.infer<typeof interviewSchema>;

export const postInterview = ({
  data,
}: {
  data: CreateInterview;
}): Promise<InterviewData> => {
  console.log(data);
  return api.post("/api/matching/info", data);
};

type usePostInterviewOptions = {
  mutationConfig?: MutationConfig<typeof postInterview>;
};
//에러 일때 에러 메시지
//성공하면 페이지 옮기기
export const usePostInterview = ({
  mutationConfig,
}: usePostInterviewOptions = {}) => {
  const { ...restConfig } = mutationConfig || {};
  //성공했을때
  return useMutation({
    onError: (error) => {
      console.log(error, "에러 발생");
    },

    mutationFn: postInterview,

    ...restConfig,
  });
};
