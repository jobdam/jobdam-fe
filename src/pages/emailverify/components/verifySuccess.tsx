/** @format */

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { useNavigate, useSearchParams } from "react-router-dom";

import * as React from "react";
import { paths } from "@/config/paths";

const VerifySuccess = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/login"); // 원하는 경로로 이동
    }, 3000); // 3초 후 이동

    return () => clearTimeout(timeout); // cleanup
  }, []);

  const handleClick = () => {
    navigate("/login");
  };

  //success 에 도착하면  버튼을 클릭했을때

  return (
    <div className="text-center mt-24">
      <h1 className="text-2xl font-bold">
        이메일 인증이 완료되었습니다 3초후 이동합니다. 🎉
      </h1>
      <p className="mt-2 text-gray-600">이제 로그인하실 수 있습니다.</p>
      <Button onClick={handleClick}>로그인 이동</Button>
    </div>
  );
};

export default VerifySuccess;
