/** @format */

import footerLogo from "@/assets/logo.svg";
import { CustomImage } from "@/components/common/image/image";
const Footer = () => {
  return (
    //    레이아웃 배경색과 컨텐츠 위치
    <div
      className="bg-[#D9D9D9] 
    
     w-full min-w-[1280px] max-w-[1980px] mx-auto
    
    h-[300px] py-[45px] px-[361px]"
    >
      {/* 레이아웃 안쪽의 요소들 */}
      <section className="flex flex-row w-[900px]">
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

        <div className="flex flex-col justify-between">
          <div className="flex flex-row gap-[50px] ">
            <div className="flex flex-col">
              <span>이인행 프론트엔드</span>
            </div>
            <div>
              <span> 손세영 디자인</span>
            </div>
          </div>
          <div className="space-x-[80px]">
            <span>이영수 백엔드</span>
            <span> 이성훈 백엔드</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
