/** @format */

import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import { SignIn } from "@/pages/auth/SignIn";
import { InterviewLayout } from "@/components/layout/interview-layout";
import Interview from "@/pages/interview/main";

const InterviewRegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <InterviewLayout
      title={
        <>
          가입을 위해
          <br />
          약관에 동의해주세요
        </>
      }
      showIcon={true}
    >
      <Interview></Interview>
    </InterviewLayout>
  );
};

export default InterviewRegisterRoute;
