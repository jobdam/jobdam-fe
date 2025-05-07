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

  return (
    <>
      <Checkbox
        label="신청 완료"
        variant="progress"
        checked={progressStep >= 1}
        className="flex size-[25px] transition-color appearance-none items-center justify-center rounded-none  bg-black outline-none "
      ></Checkbox>
      <div className="w-[1px] ml-[12.5px] bg-black h-[186.5px]"></div>

      <Checkbox
        className=" flex size-[25px] transition-color appearance-none items-center justify-center rounded-none  bg-black outline-none "
        label="면접자 매칭 중"
        variant="progress"
        checked={progressStep >= 2}
      ></Checkbox>
      <div className="w-[1px] ml-[12.5px] bg-black h-[186.5px]"></div>

      <Checkbox
        checked={progressStep >= 3}
        variant="progress"
        className=" flex size-[25px] transition-color appearance-none items-center justify-center rounded-none  bg-black outline-none "
        label="대기방 입장"
      ></Checkbox>
    </>
  );
};

export default InterviewSidebar;
