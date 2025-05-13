/** @format */

import { CustomImage } from "@/components/common/image/image";
const googleRedirect = import.meta.env.VITE_GOOGLE_REDIRECT;

const GoogleSignin = () => {
  const googleLogin = () => {
    window.location.href = googleRedirect;
  };

  return (
    <>
      <button
        onClick={googleLogin}
        className="flex pl-[23px] cursor-pointer items-center border-[2px] text-[#5d5d5d] w-[500px] h-[70px] border-[#C6C6C6]"
      >
        <CustomImage className="size-[38px]" src="/google.svg"></CustomImage>
        <span className="flex ml-[113px] text-[22px] font-roboto font-[500] leading-[150%]">
          구글로 시작하기
        </span>
      </button>
    </>
  );
};

export default GoogleSignin;
