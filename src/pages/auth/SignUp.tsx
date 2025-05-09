/** @format */

import { Button } from "@/components/ui/button";
import { Checkbox, Form, Input, Label } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";
import { registerInputSchema, useRegister } from "@/lib/auth";
import { Check } from "lucide-react";
import * as React from "react";
import { useCheckEmail } from "./api/get-checkemail";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { useVerifyEmail } from "../emailverify/api/get-emailverify";
import { zodResolver } from "@hookform/resolvers/zod";

type RegisterFormProps = {
  onSuccess: () => void;
};

const SignUp = ({ onSuccess }: RegisterFormProps) => {
  const form = useForm({
    resolver: zodResolver(registerInputSchema),

    defaultValues: {
      email: "",
      password: "",
      agreeAll: false,
      agreeTerms: false,
      agreePrivacy: false,
      agreeAge: false,
      agreeJobDam: false,
    },
  });

  //email verify하기

  const email = form.watch("email");

  const agreeAll = form.watch("agreeAll");
  const agreeTerms = form.watch("agreeTerms");
  const agreePrivacy = form.watch("agreePrivacy");
  const agreeAge = form.watch("agreeAge");
  const agreeJobDam = form.watch("agreeJobDam");

  React.useEffect(() => {
    if (agreeTerms && agreePrivacy && agreeAge) {
      form.setValue("agreeAll", true, { shouldValidate: true }); // 전체동의 체크
    } else {
      form.setValue("agreeAll", false); // 하나라도 체크되지 않으면 전체동의 해제
    }
  }, [agreeTerms, agreePrivacy, agreeAge]);

  const {
    refetch,
    data,
    isError: checkError,
    isFetching,
    isFetched,
  } = useCheckEmail({ email: email, queryConfig: { enabled: false } });
  console.log(data?.data.isDuplicate, checkError, isFetched);

  const registering = useRegister({ onSuccess });
  const { refetch: verifyRefetch, isError } = useVerifyEmail({});

  return (
    <Form
      onSubmit={(values) => {
        //회원가입 db에 넣기
        console.log(email);
        values.email, values.password;

        //agreeTerms,agreePrivacy,agreeAgre
        //회원가입 완료는 모든 것이 체크되어있어야하며, 중복확인이 완료된 상태여야한다.
        if (agreeAll && data?.data.isDuplicate) {
          console.log("실행되면안돼");
          registering.mutate({
            email: values.email,
            password: values.password,
          });
          //이메일 인증을 가입할때 곱바로 시행한다.

          // verifyRefetch();
        }
      }}
      form={form}
      // schema={
      // options={{
      //   shouldUnregister: true,
      // }}
    >
      {({ register, formState, watch }) => {
        // 여기에 axios or react-query mutation으로 중복 확인 요청
        // console.log(watch("email"));

        console.log(agreeAll, "agreeall");
        return (
          <>
            <div className="flex flex-col mb-[10px] text-left">
              <div className="flex items-center ">
                <Input
                  type="email"
                  label="이메일"
                  className="font-medium min-w-[400px] h-[70px] text-left border px-[24px] border-[rgba(0,0,0,0.3)] text-black"
                  placeholder="jodbdam0415@gmail.com"
                  error={formState.errors["email"]}
                  registration={register("email")}
                />
                <div className="mt-[23px] ">
                  {/* gap-y-[10px] */}
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="whitespace-nowrap underline px-4 shadow-none bg-white cursor-pointer"
                  >
                    중복확인
                  </button>
                </div>
                {/* //ifetched가 true일때만 보이도록 */}
                {isFetched &&
                  (!data?.data.isDuplicate ? (
                    <div className="flex min-w-[100px]  relative right-50">
                      <Check className="mt-[2px]" strokeWidth="1"></Check>
                      <span className=" text-[16px] text-[rgba(0,0,0,0.50)] leading-[30px] font-medium ">
                        사용 가능
                      </span>
                    </div>
                  ) : (
                    <div className="flex min-w-[100px] relative right-50">
                      <Check
                        className="mt-[2px] text-[red]"
                        strokeWidth="1"
                      ></Check>
                      <span className=" text-[16px] text-[red] leading-[30px] font-medium ">
                        사용 불가
                      </span>
                    </div>
                  ))}
              </div>

              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요."
                className="font-medium text-left border border-[rgba(0,0,0,0.3)] text-black"
                error={formState.errors["password"]}
                registration={register("password")}
              />
              <Input
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호를 입력하세요."
                className="font-medium text-left border border-[rgba(0,0,0,0.3)] text-black"
                error={formState.errors["passwordConfirm"]}
                registration={register("passwordConfirm")}
              />
              <div className="flex  mt-[40px] gap-[15px] flex-col">
                <div className="flex flex-row">
                  <Checkbox
                    label="전체동의"
                    error={formState.errors["agreeAll"]}
                    checked={agreeAll}
                    onCheckedChange={(checked) => {
                      const value = Boolean(checked);

                      // form.setValue("agreeAll", value, {
                      //   shouldValidate: true,
                      // }); // ✅ 이거 빠지면 에러 안 사라짐

                      form.setValue("agreeTerms", value, {
                        shouldValidate: true,
                      });
                      form.setValue("agreePrivacy", value, {
                        shouldValidate: true,
                      });
                      form.setValue("agreeAge", value, {
                        shouldValidate: true,
                      });
                      form.setValue("agreeJobDam", value); // 선택 항목은 검증 X
                    }}
                    className=" rounded-[5px] border-[1px] bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.30)]"
                  ></Checkbox>
                  {/* <div className="flex flex-col">
                   
                    <span className="text-[#B2B2B2] text-[14px] font-normal">
                      위치기반 서비스 이용약관(선택), 마케팅 정보 수신
                      동의(이메일,SMS/MMS)(선택) 동의를 포함합니다.
                    </span>
                  </div> */}
                </div>
                <div className="flex flex-row">
                  <Checkbox
                    checked={agreeAge}
                    onCheckedChange={(checked) =>
                      form.setValue("agreeAge", Boolean(checked), {
                        shouldValidate: true,
                      })
                    }
                    className=" rounded-[5px] border-[1px] bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.30)]"
                  ></Checkbox>
                  <Label className="text-[14px] text-[black] font-medium">
                    [필수] 만 14세 이상입니다.{" "}
                  </Label>
                </div>
                <div className="flex flex-row">
                  <Checkbox
                    checked={agreeTerms}
                    onCheckedChange={(checked) =>
                      form.setValue("agreeTerms", Boolean(checked), {
                        shouldValidate: true,
                      })
                    }
                    className=" rounded-[5px] border-[1px] bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.30)]"
                  ></Checkbox>
                  <Label className="text-[14px] text-[black] font-medium">
                    [필수]
                    <span className="text-[#0063FF]">서비스 이용약관 </span>
                    동의
                  </Label>
                </div>

                <div className="flex flex-row">
                  <Checkbox
                    checked={agreePrivacy}
                    onCheckedChange={(checked) =>
                      form.setValue("agreePrivacy", Boolean(checked), {
                        shouldValidate: true,
                      })
                    }
                    className=" rounded-[5px] border-[1px] bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.30)]"
                  ></Checkbox>
                  <Label className="text-[14px] text-[black] font-medium">
                    [필수]
                    <span className="text-[#0063FF]">
                      개인정보 수집 및 이용
                    </span>
                    동의
                  </Label>
                </div>
                <div className="flex flex-row">
                  <Checkbox
                    checked={agreeJobDam}
                    onCheckedChange={(checked) =>
                      form.setValue("agreeJobDam", Boolean(checked))
                    }
                    className=" rounded-[5px] border-[1px] bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.30)]"
                  ></Checkbox>
                  <Label className="text-[14px] text-[black] font-medium">
                    [선택] 잡담 프로그램 개설 소식을 가장 먼저 받아볼래요!
                  </Label>
                </div>
              </div>
              {/* <div className=" flex justify-center items-center"> */}
              <button className=" flex  mt-[68px] text-[32px] bg[##D0D0D0] items-center justify-center cursor-pointer">
                회원가입 완료
              </button>
              {/* </div> */}
            </div>

            {/* <div className="flex justify-center items-center mb-[30px]">
              <Button type="submit" size="lg" className="w-full text-2xl">
                회원가입
              </Button>
            </div> */}
          </>
        );
      }}
    </Form>
  );
};

export default SignUp;
