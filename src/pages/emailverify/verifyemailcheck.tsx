/** @format */

import VerifySuccess from "./components/verifySuccess";
import { useVerifyEmail } from "./api/get-emailverify";

import VerifyPending from "./components/verifypending";
import { useNavigate, useSearchParams } from "react-router";
import React from "react";

//여기서 받아서 성공 실패를 가른다.성공한경우는

//

const VerifyEmailCheck = () => {
  //성공할때와 대기할때, 실패할때를 나누기
  const navigate = useNavigate();

  const [URLsearchParams] = useSearchParams();

  const token = URLsearchParams.get("token") ?? "";
  console.log(token, "token");

  //여기서 보낸다.
  const { isError, error, data } = useVerifyEmail({
    token,
    enabled: !!token,
  });
  console.log(data?.data?.isSetup, error);
  //useVerifyEmail을 보내면 pending을 해야한다.
  //실패할경우 2가지 , 링크가 만료된경우, 인증이 이미 완료된경우
  //링크가 만료된경우라면 다시보낼 필요가있고, 인증이 이미 완료된경우라면 그냥 메인으로 가면된다.

  // console.log(isSuccess, isError, isSuccess, data);
  //백엔드에서 isSetup을 보내줌.

  //    throw new AuthException(EXPIRED_TOKEN); 기간 만료 401에러

  // throw new AuthException(INVALID_USER); 이미 존쟇는경우404에러

  //isSetup이 false인경우 인증완료

  React.useEffect(() => {
    if (isError) {
      navigate(`/verify/error?token=${token}`);
      //error인경우 error페이지로 error페이지에서 다시
      // return <VerifyError />; // 인증 링크 만료 등
    }
  }, [isError, navigate]);

  if (data?.data?.isSetup === false) return <VerifySuccess />;

  return <VerifyPending />;
};

export default VerifyEmailCheck;
