/** @format */

// import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
// import { paths } from "@/config/paths";
// import { SignIn } from "@/pages/auth/SignIn";
import { AuthEntry } from "@/pages/auth/AuthEntry";

const AuthEntryRoute = () => {
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout entry={true}>
      {/* <AuthEntry onSuccess={() => {}} /> */}
      <AuthEntry></AuthEntry>
    </AuthLayout>
  );
};

export default AuthEntryRoute;
