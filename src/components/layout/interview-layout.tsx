/** @format */

import React, { Children } from "react";

import { Check } from "lucide-react";
import { Checkbox } from "../ui/form";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/utils/cn";
export type LayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  showIcon?: boolean;
  className?: string;
  matching?: boolean;
};

export const InterviewLayout = ({
  children,
  title,
  className,
  matching,
  showIcon = false,
}: LayoutProps) => {
  const progressStep = useSelector((state: RootState) => state.progress.step);
  // const [progressStep, setProgressStep] = useState(1);

  return (
    <>
      {/* 전체 레이아웃 영역 */}
      <div className="flex min-h-[100vh] flex-row justify-center w-full p-[50px] ">
        {/* progress와 가운데 이미지 제목 을 포함하는부분 */}
        <div className="flex flex-1 justify-start">
          {/* 왼쪽 Progress 영역 */}
          <div
            className={cn(
              // "flex w-[300px] justify-center items-start flex-col"

              "flex flex-1 min-w-[232px] justify-center flex-col"
            )}
          >
            <Checkbox
              label="신청 완료"
              progress={true}
              checked={progressStep >= 1}
              className="flex size-[25px] transition-color appearance-none items-center justify-center rounded-none  bg-black outline-none "
            ></Checkbox>
            <div className="w-[1px] ml-[12.5px] bg-black h-[186.5px]"></div>

            <Checkbox
              className=" flex size-[25px] transition-color appearance-none items-center justify-center rounded-none  bg-black outline-none "
              label="면접자 매칭 중"
              progress={true}
              checked={progressStep >= 2}
            ></Checkbox>
            <div className="w-[1px] ml-[12.5px] bg-black h-[186.5px]"></div>

            <Checkbox
              checked={progressStep >= 3}
              interview={true}
              progress={true}
              className=" flex size-[25px] transition-color appearance-none items-center justify-center rounded-none  bg-black outline-none "
              label="대기방 입장"
            ></Checkbox>
          </div>
          {/* 메인 영역 */}
          <div
            className={cn(
              matching
                ? "flex flex-1 flex-shrink-0 justify-center items-center "
                : "flex flex-1 items-start flex-col w-full max-w-[1200px] min-w-[800px]"
            )}
          >
            <div className=" flex-row items-center flex-shrink-0 flex ">
              <h2 className="flex text-left mb-[40px] text-[32px] font-semibold text-gray-900">
                {title}
              </h2>
              {/* <div>
              <span className="text-[32px] font-semibold text-gray-900 ">
                488명 모의 면접 이용중
              </span>
            </div> */}
            </div>
            <div
              className={cn(
                "flex gap-[5px] flex-shrink-0 w-full flex-col justify-center  bg-[#F5F5F5] ",
                matching && "bg-[white]"
              )}
            >
              {/* <div className=" flex max-h-[300px] flex-col min-w-full items-start justify-center bg-[#F5F5F5]  "> */}

              {children}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
