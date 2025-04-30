/** @format */

import { Button } from "@/components/ui/button";
import { Checkbox, Form, Input, Label } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";
import { registerInputSchema, useRegister } from "@/lib/auth";
import { Check } from "lucide-react";
import * as React from "react";

type RegisterFormProps = {
  onSuccess: () => void;
};

const SignUp = ({ onSuccess }: RegisterFormProps) => {
  const [allChecked, setAllChecked] = React.useState(false);

  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [agreePrivacy, setAgreePrivacy] = React.useState(false);
  const [agreeAge, setAgreeAge] = React.useState(false);
  const [agreeJobDam, setAgreeJobDam] = React.useState(false);

  React.useEffect(() => {
    if (allChecked) {
      setAgreeTerms(true);
      setAgreePrivacy(true);
      setAgreeAge(true);
      setAgreeJobDam(true);
    } else {
      setAgreeTerms(false);
      setAgreePrivacy(false);
      setAgreeAge(false);
      setAgreeJobDam(false);
    }
  }, [allChecked]);

  const registering = useRegister({ onSuccess });

  const onSubmit = (data) => {
    console.log(data.email); // 입력된 email 값
  };
  console.log(registering);
  return (
    <Form
      onSubmit={(values) => {
        console.log("Submit:", values);
        registering.mutate(values);
      }}
      schema={registerInputSchema}
    >
      {({ register, formState, watch, getValues }) => {
        const email = watch("email");
        console.log(email);

        const handleCheckEmail = () => {
          const emailValue = getValues("email");
          console.log("중복확인 이메일:", emailValue);
          // 여기에 axios or react-query mutation으로 중복 확인 요청
        };

        return (
          <>
            <div className="flex flex-col mb-[10px] text-left">
              <div className="flex items-center">
                <Input
                  type="email"
                  label="이메일"
                  className="font-medium min-w-[400px] h-[70px] text-left border px-[24px] border-[rgba(0,0,0,0.3)] text-black"
                  placeholder="jodbdam0415@gmail.com"
                  error={formState.errors["email"]}
                  registration={register("email")}
                />
                <div
                  onClick={handleCheckEmail}
                  className="whitespace-nowrap underline px-4 shadow-none bg-white cursor-pointer"
                >
                  중복확인
                </div>
                <div className="flex min-w-[100px] relative right-50">
                  <Check className="mt-[2px]" strokeWidth="1"></Check>
                  <span className=" text-[16px] text-[rgba(0,0,0,0.50)] leading-[30px] font-medium ">
                    사용 가능
                  </span>
                </div>
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
                    checked={allChecked}
                    onCheckedChange={(checked) =>
                      setAllChecked(Boolean(checked))
                    }
                    className=" rounded-[5px] border-[1px] bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.30)]"
                  ></Checkbox>
                  <div className="flex flex-col gap-[5px]">
                    <Label className="text-[16px] text-[black] font-medium">
                      전체 동의
                    </Label>
                    <span className="text-[#B2B2B2] text-[14px] font-normal">
                      위치기반 서비스 이용약관(선택), 마케팅 정보 수신
                      동의(이메일,SMS/MMS)(선택) 동의를 포함합니다.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <Checkbox
                    checked={agreeAge}
                    onCheckedChange={(checked) => setAgreeAge(Boolean(checked))}
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
                      setAgreeTerms(Boolean(checked))
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
                      setAgreePrivacy(Boolean(checked))
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
                      setAgreeJobDam(Boolean(checked))
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
