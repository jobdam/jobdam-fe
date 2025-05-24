/** @format */

import footerLogo from "@/assets/logo.svg";
import { CustomImage } from "@/components/common/image/image";
const Footer = () => {
  return (
    //    레이아웃 배경색과 컨텐츠 위치
    <div
      className="bg-[#1e1e1e]  text-[white]
    
     w-full min-w-[1200px] max-w-[1980px] 
    
    h-[300px] py-[45px] 
    flex justify-center items-center
    "
    >
      {/* 레이아웃 안쪽의 요소들 */}
      <section className="flex flex-row min-w-[1000px] w-[calc(100vw-722px)]">
        {/* 왼쪽 로고 부분 */}

        <div className="flex flex-1 flex-col">
          <CustomImage
            className="w-[145px] h-[32px]"
            src={footerLogo}
          ></CustomImage>
          <span className="block mt-[13px] text-[16px] font-medium leading-normal">
            ai 기반 모의 면접 매칭 서비스
          </span>

          <div className="text-[16px] font-medium leading-normal mt-[102px]">
            @ 2025 Jobdam. All Rights Reserved
          </div>
        </div>
        <div className="flex gap-y-[10px]  flex-col flex-1">
          <span
            className="
          
          text-[16px] font-medium leading-normal"
          >
            고객문의
          </span>
          <span className="text-[16px] font-medium leading-normal">
            jobdam303@gmail.com
          </span>
          <span className="text-[16px] font-medium leading-normal">
            010-2999-2999
          </span>
        </div>

        <div className="flex flex-col gpa-y-[6px] ">
          <div className="flex flex-row justify-center gap-[4px] h-[30px] items-center">
            툴{" "}
            <div className="size-[4px] rounded-full text-white bg-white"> </div>{" "}
            기술스택
          </div>
          <div className="h-[25px]">Figma</div>
          <div className="h-[25px]">JAVA</div>
          <div className="h-[25px]">SpringBoot</div>
          <div className="h-[25px]">Mysql</div>
          <div className="h-[25px]">Typescript</div>
          <div className="h-[25px]">React</div>

          {/* <div className="flex flex-row gap-[50px] ">
            <div className="flex flex-col">
              <span>이인행 프론트엔드</span>
            </div>
            <div>
              <span> 손세영 디자인</span>
            </div>
          </div>
          <div className="space-x-[50px]">
            <span>이영수 백엔드</span>
            <span> 이성훈 백엔드</span>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Footer;
