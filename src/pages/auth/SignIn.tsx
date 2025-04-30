/** @format */

import { useSearchParams } from "react-router";

// import { Button } from '@/components/ui/button';
import { Form, Input } from "@/components/ui/form";
import { paths } from "@/config/paths";

import { useLogin } from "@/lib/auth";
import { Link } from "@/components/ui/link";
import { loginInputSchema } from "@/lib/auth";
import { Button } from "@/components/ui/button";
type LoginFormProps = {
  onSuccess: () => void;
};

export const SignIn = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <>
      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <>
            {/* <h2 className="m-[80px] text-center text-3xl font-semibold ">
              회원 로그인
            </h2> */}

            {/* <Text text={"이메일 "}></Text> */}
            <div className=" mb-[10px] text-left">
              <Input
                type="email"
                label="이메일"
                className=" font-medium text-left text-black"
                placeholder="jodbdam0415@gmail.com"
                error={formState.errors["email"]}
                registration={register("email")}
              />

              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요."
                className=" font-medium text-left text-black"
                error={formState.errors["password"]}
                registration={register("password")}
              />

              {/* 에러 메시지가 이미 Input 컴포넌트 안에 있다면 여기선 빈 공간만 차지하도록 */}
            </div>

            <div className=" flex justify-center items-center mb-[30px]">
              <Button
                isLoading={login.isPending}
                type="submit"
                size="lg"
                className=" w-full text-2xl
              "
              >
                로그인
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
            className="underline font-medium text-[14px] text-[#00000080]"
          >
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
};
