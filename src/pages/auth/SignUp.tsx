/** @format */

import { Checkbox, Form, Input, Label } from "@/components/ui/form";
import { type FieldError } from "react-hook-form";

import { registerInputSchema, useRegister } from "@/lib/auth";
import { Check } from "lucide-react";
import * as React from "react";
import { useCheckEmail } from "./api/get-checkemail";
import { useForm } from "react-hook-form";
import { useVerifyEmail } from "../emailverify/api/get-emailverify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setCheckDuplicate } from "@/store/slices/signup";
import { RootState } from "@/store";

export const getFieldError = (error: any): FieldError | undefined => {
  if (error && typeof error === "object" && "type" in error) {
    return error as FieldError;
  }
  return undefined;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

const SignUp = ({ onSuccess }: RegisterFormProps) => {
  //회원가입 실패 메시지
  const checkDuplicate = useSelector(
    (state: RootState) => state.signup.checkDuplicate
  );

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(registerInputSchema(checkDuplicate)),

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
  const password = form.watch("password");

  const agreeAll = form.watch("agreeAll");
  const agreeTerms = form.watch("agreeTerms");
  const agreePrivacy = form.watch("agreePrivacy");
  const agreeAge = form.watch("agreeAge");
  const agreeJobDam = form.watch("agreeJobDam");
  //이메일 에리거 없을때, email이 존재할때
  React.useEffect(() => {
    if (agreeTerms && agreePrivacy && agreeAge) {
      form.setValue("agreeAll", true, { shouldValidate: true }); // 전체동의 체크
    } else {
      form.setValue("agreeAll", false); // 하나라도 체크되지 않으면 전체동의 해제
    }
  }, [agreeTerms, agreePrivacy, agreeAge]);

  const { refetch, data, isFetched, isSuccess } = useCheckEmail({
    email: email,
    queryConfig: { enabled: false },
  });

  // console.log(data?.data?.isDuplicate);
  React.useEffect(() => {
    if (isSuccess) {
      dispatch(setCheckDuplicate(true));
      form.clearErrors("email");
    }
  }, [isSuccess, data, dispatch]);
  const registering = useRegister({ onSuccess });

  return (
    <Form
      onSubmit={(values) => {
        //회원가입 db에 넣기

        console.log(
          values,
          email,
          password,
          agreeAll,
          !data?.data?.isDuplicate
        );
        //agreeTerms,agreePrivacy,agreeAgre
        //회원가입 완료는 모든 것이 체크되어있어야하며, 중복확인이 완료된 상태여야한다.
        if (agreeAll && !data?.data?.isDuplicate) {
          registering.mutate({
            email: email,
            password: password,
          } as any);
        }
        //이메일은 조건이 갖춰진 상태에서 중복확인이 안된경우

        //버튼을클릭햇을 checkduplicate

        //조건에는 부합하나 로그인이 실패하는 경우
      }}
      form={form}
    >
      {({ register, formState }) => {
        // console.log(formState.errors.email?.message);

        return (
          <>
            <div className="flex flex-col mb-[10px] space-y-[30px]  text-left">
              <div className="flex items-center ">
                <Input
                  type="email"
                  label="이메일"
                  className="font-medium min-w-[400px] h-[70px] text-left border px-[24px] border-[rgba(0,0,0,0.3)] text-black"
                  placeholder="jodbdam0415@gmail.com"
                  error={getFieldError(formState.errors.email)}
                  registration={register("email")}
                ></Input>
                {/* {form.formState.errors.email && (
                  <span>{form.formState.errors.email.message}</span>
                )} */}
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
                  (!data?.data.isDuplicate === true ? (
                    <div className="flex min-w-[100px]  relative top-3 right-50">
                      <Check className="mt-[2px]" strokeWidth="1"></Check>
                      <span className=" text-[16px] text-[rgba(0,0,0,0.50)] leading-[30px] font-medium ">
                        사용 가능
                      </span>
                    </div>
                  ) : (
                    <div className="flex min-w-[100px] relative top-3 right-50">
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
                error={getFieldError(form.formState.errors["password"])}
                registration={register("password")}
              />
              <Input
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호를 입력하세요."
                className="font-medium text-left border border-[rgba(0,0,0,0.3)] text-black"
                error={getFieldError(form.formState.errors["passwordConfirm"])}
                registration={register("passwordConfirm")}
              />
              <div className="flex  mt-[40px] gap-[20px] flex-col">
                <div className="flex flex-col">
                  <Checkbox
                    label="전체동의"
                    isAbsoluteErrorPosition={true}
                    error={getFieldError(form.formState.errors["agreeAll"])}
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

                  <div className="flex mt-[30px] pl-[35px]">
                    <span className="text-[#B2B2B2] text-[14px] font-normal">
                      위치기반 서비스 이용약관(선택), 마케팅 정보 수신
                      동의(이메일,SMS/MMS)(선택) 동의를 포함합니다.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center">
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
                <div className="flex flex-row items-center">
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

                <div className="flex flex-row items-center">
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
                <div className="flex flex-row items-center">
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
              <div className=" pointer-cursor flex justify-center items-center mt-[70px] mb-[78px]">
                <Button isLoading={registering.isPending}>회원가입</Button>
              </div>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default SignUp;
