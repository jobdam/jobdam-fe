/** @format */

import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import React from "react";
import { useNavigate } from "react-router-dom";

// import { paths } from "@/config/paths";

const VerifySuccess = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // 3초 후 리다이렉트 하는데 post-profile로 리다이렉트한다.
    const timer = setTimeout(() => {
      navigate(`${paths.auth.login.path}`, { replace: true }); //이동할 곳
    }, 3000); // 5초 지연

    // 컴포넌트가 언마운트될 때 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleClick = () => {
    navigate(`${paths.auth.login.path}`, { replace: true });
  };

  //success 에 도착하면  버튼을 클릭했을때

  return (
    <div className="w-[100%] h-[100vh] relative- ">
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h2 className="text-[24px] font-bold text-center leading-[150%] text-[#488FFF]">
          이메일 인증이 완료되었습니다 3초후 프로필 설정 페이지로 이동합니다. 🎉
        </h2>
        <div className="mt-[70px] text-center text-[18px]">
          안녕하세요, 회원님<br></br>
          모의면접 서비스 '잡담'에 오신것을 환영합니다.<br></br>
          현재 이메일로 인증 완료가 되었습니다. 프로필 설정 페이지로 잠시후
          이동하겠습니다.
        </div>
        <div className="flex mt-[40px]  justify-center items-center text-white ">
          <Button
            onClick={handleClick}
            className="text-center text-[18px] text-semibold flex justify-center items-center  h-[60px] w-[160px]"
          >
            메인 으로 이동
          </Button>
        </div>

        <footer className="text-center mt-[50px] text-[#A1A1A1] text-[14px] font-medium">
          메일은 잡담 회원가입을 위한 인증 요청으로 발송되었습니다.<br></br>
          Copyrightⓒjobdam. All rights reserved. 
        </footer>
      </div>
    </div>
  );
};

export default VerifySuccess;
