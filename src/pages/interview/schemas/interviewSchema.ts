import { z } from "zod";

export const interviewSchema = z.object({
  experienceType: z.enum(["NEW", "EXPERIENCED"], {
    required_error: "경력 유형을 선택해주세요.",
  }),
  jobCode: z.string().min(1, "직무를 선택해주세요"), // 기본값을 설정
  jobDetailCode: z.string().min(1, "세부 직무를 선택해주세요"), // 기본값을 설정
  matchType: z.enum(["ONE_TO_ONE", "GROUP", "NONE"], {
    required_error: "면접 인원수를 선택해주세요.",
  }),
  introduce: z.string().min(1, "자기소개를 입력해주세요."),
  interviewType: z.enum(["PERSONALITY", "JOB", "TECHNICAL"], {
    required_error: "면접 유형을 선택해주세요.",
  }),
});
//위에 기반으로 타입만들어줌
export type InterviewFormData = z.infer<typeof interviewSchema>;
