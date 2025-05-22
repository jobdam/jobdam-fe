/** @format */

import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import SignUp from "@/pages/auth/SignUp";

const SignUpRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  console.log(redirectTo);

  //회원가입 할때 이메일도 같이 넘긴다.
  return (
    <AuthLayout
      title="회원 가입"
      className="bg-white min-h-[100vh] min-w-[550px] pl-[5px] pr-[33px]"
      subtitle="잡담 가입하고 모의면접 연습해서 최종합격률 높여봐요!"
    >
      <SignUp
        onSuccess={() => {
          //회원가입하면 verify로 넘어가도록
          navigate(
            `${redirectTo ? `${redirectTo}` : paths.emailverify.verifycheck.path}`,
            {
              replace: true,
            }
          );
        }}
      />
    </AuthLayout>
  );
};

export default SignUpRoute;
