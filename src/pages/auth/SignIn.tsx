/** @format */

import { useSearchParams } from "react-router";

// import { Button } from '@/components/ui/button';
import { Form, Input } from "@/components/ui/form";
import { paths } from "@/config/paths";

import { useLogin } from "@/lib/auth";
import { Link } from "@/components/ui/link";
import { loginInputSchema } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "./SignUp";
export type LoginFormProps = {
  onSuccess: () => void;
};

export const SignIn = ({ onSuccess }: LoginFormProps) => {
  const form = useForm({
    resolver: zodResolver(loginInputSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useLogin({
    onSuccess,

    onError: (error: any) => {
      //비밀번호가 틀렸을경우
      //이메일이 틀렷을경우
      //비밀 번호를 우선시

      form.setError("password", {
        type: "server",

        message: error?.response?.data?.message,
      });
    },
  });

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <>
      <Form
        form={form}
        onSubmit={(values) => {
          login.mutateAsync(values);
        }}
      >
        {({ register, formState }) => (
          <>
            {/* <h2 className="m-[80px] text-center text-3xl font-semibold ">
              회원 로그인
            </h2> */}

            {/* <Text text={"이메일 "}></Text> */}
            <div className=" mb-[10px] space-y-[30px]   text-left">
              <Input
                type="email"
                autoComplete="username"
                label="이메일"
                className=" font-medium text-left border-[1px] border-[#488FFF] text-black"
                placeholder="jodbdam0415@gmail.com"
                error={getFieldError(formState.errors["email"])}
                registration={register("email")}
              />

              <Input
                type="password"
                autoComplete="current-password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요."
                className=" font-medium text-left  border-[1px] border-[#488FFF] text-black"
                error={getFieldError(formState.errors["password"])}
                registration={register("password")}
              />

              {/* 에러 메시지가 이미 Input 컴포넌트 안에 있다면 여기선 빈 공간만 차지하도록 */}
            </div>

            <div className=" flex justify-center items-center mt-[50px] mb-[70.5px]">
              <Button
                isLoading={login.isPending}
                type="submit"
                size="lg"
                className=" w-full cursor-pointer h-[65px] flex justify-center items-center text-white bg-[#488fff] text-[24px]
              "
              >
                로그인하기
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-center flex-col">
        <div className="text-[14px] font-medium text-[#00000080]">
          <span>계정이 없으신가요?</span>
        </div>
        <div>
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="underline font-medium text-[14px]  text-[#00000080]"
          >
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
};
