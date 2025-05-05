/** @format */

import { CustomImage } from "@/components/common/image/image";
import { googleOauth, naverOauth } from "@/utils/Oauth";

const NaverSignin = () => {
  const naverLogin = () => {
    console.log("눌럿는지ㅗ학인ㄴ");
    window.location.href = naverOauth;
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
