/** @format */

import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import { SignIn } from "@/pages/auth/SignIn";
// import { useUser } from "@/lib/auth";

const SignInRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  // const user = useUser();

  return (
    <AuthLayout
      className="w-[640px] max-h-[800px]"
      login={true}
      title="회원 로그인"
    >
      <SignIn
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : paths.home.getHref()}`, {
            replace: true,
          });

          window.location.reload();
        }}
      />
    </AuthLayout>
  );
};

export default SignInRoute;
