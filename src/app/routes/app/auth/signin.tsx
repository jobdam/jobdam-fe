/** @format */

import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import { SignIn } from "@/pages/auth/SignIn";

const SignInRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout title="회원 로그인">
      <SignIn
      // onSuccess={() => {
      //   navigate(`${redirectTo ? `${redirectTo}` : paths.home.getHref()}`, {
      //     replace: true,
      //   });
      // }}
      />
    </AuthLayout>
  );
};

export default SignInRoute;
