/** @format */

import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import { SignIn } from "@/pages/auth/SignIn";
import { useQueryClient } from "@tanstack/react-query";

const SignInRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const queryClient = useQueryClient();

  return (
    <AuthLayout
      className="w-[640px] max-h-[800px]"
      login={true}
      title="회원 로그인"
    >
      <SignIn
        onSuccess={() => {
          const key: any = ["authenticated-user"];

          queryClient.invalidateQueries(key);
          navigate(`${redirectTo ? `${redirectTo}` : paths.home.getHref()}`, {
            replace: true,
          });
        }}
      />
    </AuthLayout>
  );
};

export default SignInRoute;
