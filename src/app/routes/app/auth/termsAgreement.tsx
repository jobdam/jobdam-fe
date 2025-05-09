/** @format */

import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import { SignIn } from "@/pages/auth/SignIn";
import { TermsAgreementLayout } from "@/components/layout/termsAgreement-layout";
import TermsAgreement from "@/pages/auth/TermsAgreement";

const TermsAgreementRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <TermsAgreementLayout
      title={
        <>
          가입을 위해
          <br />
          약관에 동의해주세요
        </>
      }
    >
      <TermsAgreement onSuccess={() => {}} />
    </TermsAgreementLayout>
  );
};

export default TermsAgreementRoute;
