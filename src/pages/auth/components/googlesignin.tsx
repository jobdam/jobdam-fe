/** @format */

import { CustomImage } from "@/components/common/image/image";
import { googleOauth } from "@/utils/Oauth";
const googleRedirect = import.meta.env.VITE_GOOGLE_REDIRECT;

const GoogleSignin = () => {
  const googleLogin = () => {
    window.location.href = googleRedirect;
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
