/** @format */

import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";
import mainImage from "@/assets/landingImage/main.png";
import mainIcon from "@/assets/landingImage/mainIcon.svg";
import shadow from "@/assets/landingImage/shadow.png";
const LandingTopImage = () => {
  return (
    <>
      <div className="  z-2 w-[800px] h-[1150px] mt-[36px] ">
        <img className="size-[647px]" src={mainImage}></img>
        <div
          className="
          
          mx-auto left-[36%] bottom-[17%]
          relative w-[147.98px] h-[103.665px] rotate-[6.679] shrink-0"
        >
          <img className="relative z-[4]" src={mainIcon}></img>
          <img
            className="absolute top-[65%] z-[1] left-[12%] "
            src={shadow}
          ></img>
        </div>
        <div
          className="relative 
            flex justify-center items-center
             flex-col bottom-[21%] left-[1%]"
        >
          <div className=" text-[60px]  text-[#202020] font-bold leading-[150%] flex justify-center items-center">
            <span className="text-center">
              지금 나에게 딱 맞는<br></br> 모의 면접자들과 함께 연습해요
            </span>
          </div>
          <Link
            className="
                py-[22px] mt-[68px] px-[40px] text-[28px] rounded-[20px]  text-[white]
                font-semibold bg-[#488EFF] flex justify-center items-center"
            to={paths.interview.register.path}
          >
            면접 매칭하러 가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingTopImage;
