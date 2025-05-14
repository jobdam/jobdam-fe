/** @format */

const VerifyPending = () => {
  return (
    <>
      <div className="w-[100%] h-[100vh] relative- ">
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <h2 className="text-[24px] font-bold text-center leading-[150%] text-[#488FFF]">
            회원가입 이메일 인증 요청
          </h2>
          <div className="mt-[70px] text-center text-[18px]">
            안녕하세요, 회원님<br></br>
            모의면접 서비스 '잡담'에 오신것을 환영합니다.<br></br>
            현재 이메일로 인증 메일을 발송했으니 이메일 인증을 완료해 주세요.
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

export default VerifyPending;
