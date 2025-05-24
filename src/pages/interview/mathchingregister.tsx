/** @format */
import * as React from "react";
import { useLocation, useNavigate } from "react-router";

import { Form, Textarea } from "@/components/ui/form";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldsSelect from "./components/fieldsSelect";
import { useMatchingProfile } from "./api/get-matchingProfile";
import { interviewSchema } from "./schemas/interviewSchema";
import ContentsBox from "@/components/layout/contentsBox";
import { Button } from "@/components/ui/button";
import { setProgressStep } from "@/store/slices/uistate";
import { paths } from "@/config/paths";

const InterviewRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      matchType: undefined,
      experienceType: "NEW",
      jobCode: "",
      jobDetailCode: "",
    },
  });
  const { data: matchingProfile } = useMatchingProfile();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const stepParam = params.get("step");
  console.log(stepParam);

  React.useEffect(() => {
    dispatch(setProgressStep(1));
  }, [location.search, stepParam, dispatch]);

  const matchType = useWatch({
    control: form.control,
    name: "matchType",
  });

  const introduce = useWatch({
    control: form.control,
    name: "introduce",
  });

  const interviewType = useWatch({
    control: form.control,
    name: "interviewType",
  });

  return (
    <Form
      form={form}
      onSubmit={(values: any) => {
        navigate(`${paths.interview.matching.path}`, {
          state: values,
        });
      }}
    >
      {({ control }) => {
        return (
          <>
            {/* 직무+인원선택 */}
            <FieldsSelect
              form={form}
              control={control}
              profile={matchingProfile}
            />
            {/* 인원수 입력되면 자기소개 */}
            {matchType && (
              <div className="mt-[50px]">
                <ContentsBox title="면접에서 말할 자기소개를 간단히 작성해주세요.">
                  <Controller
                    control={control}
                    name="introduce"
                    render={({ field }) => (
                      <Textarea
                        placeholder="ex) 문제를 구조적으로 정리하고 해결하는 걸 좋아하는 UX 디자이너 지망생입니다."
                        {...field}
                        maxLength={300}
                      />
                    )}
                  />
                </ContentsBox>
              </div>
            )}

            {/* 자기소개 입력되면 면접유형 */}
            {introduce && introduce.trim().length > 0 && (
              <div className="relative mt-[50px]">
                <ContentsBox title="어떤 종류의 면접을 준비하시나요?">
                  <p className="absolute top-1 left-65 text-gray-400">
                    *선택한 유형은 매칭 참고용으로만 사용돼요.
                  </p>
                  <Controller
                    control={form.control}
                    name="interviewType"
                    render={({ field }) => (
                      <div className="w-fll flex flex-row gap-[20px]">
                        <Button
                          type="button"
                          size="register"
                          className="text-black text-[18px]"
                          variant={
                            field.value === "PERSONALITY"
                              ? "outline"
                              : "register"
                          }
                          onClick={() => field.onChange("PERSONALITY")}
                        >
                          <img src="/matchingIcon/인성.svg" alt="1:1" />
                          인성
                        </Button>
                        <Button
                          type="button"
                          size="register"
                          className="text-black text-[18px]"
                          variant={
                            field.value === "JOB" ? "outline" : "register"
                          }
                          onClick={() => field.onChange("JOB")}
                        >
                          <img src="/matchingIcon/직무.svg" alt="1:1" />
                          직무
                        </Button>
                        <Button
                          type="button"
                          size="register"
                          className="text-black text-[18px]"
                          variant={
                            field.value === "TECHNICAL" ? "outline" : "register"
                          }
                          onClick={() => field.onChange("TECHNICAL")}
                        >
                          <img src="/matchingIcon/기술.svg" alt="1:1" />
                          기술
                        </Button>
                      </div>
                    )}
                  />
                </ContentsBox>
              </div>
            )}
            {/* 인터뷰타입 + 자기소개 입력되면 면접유형 */}
            {interviewType && introduce && introduce.trim().length > 0 && (
              <div className="relative top-[15%] left-0 flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-[#488fff] h-[65px] w-[40%] text-[white] text-[24px] cursor-pointer rounded-[10px]"
                >
                  입력 완료
                </button>
              </div>
            )}
          </>
        );
      }}
    </Form>
  );
};

export default InterviewRegister;
