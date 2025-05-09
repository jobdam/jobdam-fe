/** @format */

import { useVerifyEmail } from "../api/get-emailverify";
import { Button } from "@/components/ui/button";

//실패하는 경우는 링크가 만료된경우나, 이메일을 중복인증한경우

//이메일을 중복인증한경우
//링크가 만료된경우.

const VerifyFailed = () => {
  //이메일을 중복인증한경우(이미했다고 나와야함.), 링크가 만료된경우 둘다 실
  const { refetch } = useVerifyEmail({});

  //인증 실패한경우 인증 메일 다시보내는 절차 필요
  //인증 실패한경우. 인증 메일 다시 보내는게 필요하다.
  //인증 실패의경우 중복인증한경우와 링크가 만료된경우 등등 둘다 필요하다.

  //중복인증의 경우 인증 메일을 다시 보낼필요가없다.
  //중복인증을
  return (
    <div>
      ❌ 이메일 인증에 실패했습니다.
      <br />
      <Button onClick={async () => refetch()}>인증 메일 다시 보내기</Button>
    </div>
  );
};

export default VerifyFailed;
