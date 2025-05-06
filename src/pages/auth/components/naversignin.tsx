/** @format */

import { CustomImage } from "@/components/common/image/image";
import { api } from "@/lib/api-client";
import { googleOauth, naverOauth } from "@/utils/Oauth";
import axios from "axios";
const naverRedirect = import.meta.env.VITE_NAVER_REDIRECT;
const NaverSignin = () => {
  const naverLogin = async () => {
    console.log("시작");

    window.location.href = naverRedirect;
  };

  return (
    <>
      <CustomImage
        onClick={naverLogin}
        className="cursor-pointer"
        src="/네이버 시작하기.png"
      ></CustomImage>
    </>
  );
};

export default NaverSignin;
