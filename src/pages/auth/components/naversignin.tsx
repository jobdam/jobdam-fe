/** @format */

import { CustomImage } from "@/components/common/image/image";
const naverRedirect = import.meta.env.VITE_NAVER_REDIRECT;
const NaverSignin = () => {
  const naverLogin = async () => {
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
