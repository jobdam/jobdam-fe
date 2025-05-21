/** @format */

import { Checkbox, Variant } from "@/components/ui/form";
import { RootState } from "@/store";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";

export type LayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  showIcon?: boolean;
  className?: string;
  matching?: boolean;
  variant: Variant;
};

const InterviewSidebar = () => {
  const progressStep = useSelector(
    (state: RootState) => state?.ui.progressStep
  );

  //progress진행도에따라 변한다.
  return (
    <>
      <Checkbox
        label="신청완료"
        step={1}
        variant="progress"
        checked={progressStep >= 1}
        className={cn(
          "flex size-[25px] mb-[6px] transition-color appearance-none items-center justify-center rounded-[4px] bg-[white] border-[#BEBEBE] border-[3px] outline-none ",
          progressStep >= 1 && "bg-[#488FFF] border-none"
        )}
      ></Checkbox>

      <div className={cn("w-[3px] ml-[12.5px] bg-[#488FFF] h-[186.5px]")}></div>

      <Checkbox
        step={2}
        className={cn(
          "flex size-[25px] mb-[6px] transition-color appearance-none items-center justify-center rounded-[4px] bg-[white] border-[#BEBEBE] border-[3px] outline-none ",
          progressStep >= 2 && "bg-[#488FFF] border-none"
        )}
        label="면접자 매칭 중"
        variant="progress"
        checked={progressStep >= 2}
      ></Checkbox>
      <div
        className={cn(
          "w-[3px] ml-[12.5px] bg-[#BEBEBE] h-[186.5px]",

          progressStep >= 3 && "bg-[#488FFF]"
        )}
      ></div>

      <Checkbox
        step={3}
        checked={progressStep >= 3}
        variant="progress"
        className={cn(
          "flex size-[25px] mb-[6px] transition-color appearance-none items-center justify-center rounded-[4px] bg-[white] border-[#BEBEBE] border-[3px] outline-none ",
          progressStep >= 3 && "bg-[#488FFF] border-none"
        )}
        label="대기방 입장"
      ></Checkbox>
    </>
  );
};

export default InterviewSidebar;
