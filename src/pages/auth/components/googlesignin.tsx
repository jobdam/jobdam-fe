/** @format */

import { CustomImage } from "@/components/common/image/image";
import { googleOauth } from "@/utils/Oauth";

const GoogleSignin = () => {
  const googleLogin = () => {
    window.location.href = googleOauth;
  };

  return (
    <>
      <CustomImage
        onClick={googleLogin}
        className="cursor-pointer"
        src="/카카오 시작하기.png"
      ></CustomImage>
    </>
  );
};

export default GoogleSignin;
