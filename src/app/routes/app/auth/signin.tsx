/** @format */

import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import { SignIn } from "@/pages/auth/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { queryClient } from "@/lib/react-query";

const SignInRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const user = useSelector((state: RootState) => state.ui.isLogin);

  const key: any = ["authenticated-user"];
  return (
    <AuthLayout
      className="w-[640px] max-h-[800px]"
      login={true}
      title="회원 로그인"
    >
      <SignIn
        onSuccess={() => {
          queryClient.invalidateQueries(key);

          if (!user) {
            navigate(`${paths.mypage.postdata.path}`, { replace: true });
            return;
          } else {
            navigate(`${redirectTo ? `${redirectTo}` : paths.home.getHref()}`, {
              replace: true,
            });
          }
        }}
      />
    </AuthLayout>
  );
};
export default SignInRoute;
