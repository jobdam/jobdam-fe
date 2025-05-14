/** @format */
import { Button } from "@/components/ui/button";

const VerifyExpired = ({ refetch }) => {
  //재발급할때는 기존토큰으로 다시 넣어서 재발급 받는다.
  //재발급도 같은걸로 한다.

  //이메일 재인증 token post로 넣고 onSuccess를 이용

  //재 인증 절차.

  // 다시 보내는 경우 iserror 발생,
  return (
    <>
      <div className="w-[100%] h-[100vh] relative- ">
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <h2 className="text-[24px] font-bold text-center leading-[150%] text-[#f17474]">
            회원가입 이메일 인증 실패
          </h2>
          <div className="mt-[70px] text-center text-[18px]">
            안녕하세요, 회원님<br></br>
            모의면접 서비스 '잡담'에 오신것을 환영합니다.<br></br>
            현재 이메일로 인증 메일을 발송하였나, 인증이 만료 되었거나
            실패하였습니다.<br></br>
            다시 이메일을 보내 인증을 해주십시오
          </div>
          <div className="flex mt-[40px]  justify-center items-center text-white ">
            <Button
              onClick={refetch}
              className="text-center text-[18px] text-semibold flex justify-center items-center  h-[60px] w-[160px]"
            >
              이메일 재인증
            </Button>
          </div>
          <footer className="text-center mt-[50px] text-[#A1A1A1] text-[14px] font-medium">
            메일은 잡담 회원가입을 위한 인증 요청으로 발송되었습니다.<br></br>
            Copyrightⓒjobdam. All rights reserved. 
          </footer>
        </div>
      </div>
    </>
  );
};

export default VerifyExpired;
