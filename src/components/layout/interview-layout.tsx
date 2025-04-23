/** @format */

import React, { Children } from "react";

import { Check } from "lucide-react";
export type LayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  showIcon?: boolean;
};

export const InterviewLayout = ({
  children,
  title,
  showIcon = false,
}: LayoutProps) => {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex gap-[5px] flex-col justify-center items-start min-w-[1200px]  ">
          {/* <div className=" flex max-h-[300px] flex-col min-w-full items-start justify-center bg-[#F5F5F5]  "> */}
          <div className=" flex-row flex justify-between w-full  ">
            <h2 className="flex text-left mb-[40px] text-[32px] font-semibold text-gray-900">
              {title}
            </h2>
            <div>
              <span className="text-[32px] font-semibold text-gray-900 ">
                488명 모의 면접 이용중
              </span>
            </div>
          </div>

          {showIcon ? (
            <div className="flex items-start mb-[10px]">
              <Check></Check>
              <span className=" text-[16px] pl-3 font-[600] leading-7">
                프로필 설정 불러오기
              </span>
            </div>
          ) : (
            ""
          )}
          {children}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
