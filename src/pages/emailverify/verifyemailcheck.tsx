/** @format */

import VerifySuccess from "./components/verifySuccess";
import VerifyFailed from "./components/verifyfailed";
import { useVerifyEmail } from "./api/get-emailverify";

//여기서 받아서 성공 실패를 가른다.성공한경우는

//

const VerifyEmailCheck = () => {
  //성공할때와 실패할때를 나누기
  const { isSuccess, isError, isPending } = useVerifyEmail({});

  //실패할경우 2가지 , 링크가 만료된경우,

  if (isSuccess) return <VerifySuccess />;
  if (isError) return <VerifyFailed />;
  if (isPending)
    return (
      <>
        <div>이메일 인증 상태를 확인 중입니다...</div>
      </>
    );

  return <></>;
};

export default VerifyEmailCheck;
