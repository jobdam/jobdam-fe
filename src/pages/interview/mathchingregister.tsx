/** @format */
import * as React from "react";
import { useLocation, useNavigate } from "react-router";

import { Form, Textarea } from "@/components/ui/form";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldsSelect from "./components/fieldsSelect";
import { useMatchingProfile } from "./api/get-matchingProfile";
import { interviewSchema } from "./schemas/interviewSchema";
import ContentsBox from "@/components/layout/contentsBox";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { setProgressStep } from "@/store/slices/uistate";

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
        navigate("/interview/matching", {
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
              <>
                <ContentsBox title="자신을 소개해주세요">
                  <Controller
                    control={control}
                    name="introduce"
                    render={({ field }) => (
                      <Textarea
                        placeholder="ex) 데이터보다 사람 마음을 읽는 마케터를 꿈꿔요"
                        {...field}
                      />
                    )}
                  />
                </ContentsBox>
              </>
            )}

            {/* 자기소개 입력되면 면접유형 */}
            {introduce && introduce.trim().length > 0 && (
              <ContentsBox title="어떤 종류의 면접을 준비하시나요?">
                <Controller
                  control={form.control}
                  name="interviewType"
                  render={({ field }) => (
                    <div className="w-fll flex flex-row gap-[20px]">
                      <Button
                        type="button"
                        size="register"
                        className="text-black"
                        variant={
                          field.value === "PERSONALITY" ? "outline" : "register"
                        }
                        onClick={() => field.onChange("PERSONALITY")}
                      >
                        인성
                      </Button>
                      <Button
                        type="button"
                        size="register"
                        className="text-black"
                        variant={field.value === "JOB" ? "outline" : "register"}
                        onClick={() => field.onChange("JOB")}
                      >
                        직무
                      </Button>
                      <Button
                        type="button"
                        size="register"
                        className="text-black"
                        variant={
                          field.value === "TECHNICAL" ? "outline" : "register"
                        }
                        onClick={() => field.onChange("TECHNICAL")}
                      >
                        기술
                      </Button>
                    </div>
                  )}
                />
              </ContentsBox>
            )}
            {/* 인터뷰타입 + 자기소개 입력되면 면접유형 */}
            {interviewType && introduce && introduce.trim().length > 0 && (
              <div className="relative bottom-[-150px] left-[100px] flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-[#E4E4E4] h-[70px] w-[480px] cursor-pointer rounded-[10px]"
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
