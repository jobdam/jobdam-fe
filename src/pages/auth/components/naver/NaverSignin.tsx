/** @format */

import { CustomImage } from "@/components/common/image/image";
import { api } from "@/lib/api-client";
import { googleOauth, naverOauth } from "@/utils/Oauth";
import axios from "axios";

const NaverSignin = () => {
  const naverLogin = async () => {
    console.log("시작");
    const res = await axios.get(
      "http://localhost:8080/oauth2/authorization/naver"
    );
    // window.location.href = naverOauth;
    console.log(res);
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
