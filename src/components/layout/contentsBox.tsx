/** @format */

import React from "react";

// type FieldWrapperProps = {
//   label?: string;
//   className?: string;
//   children: React.ReactNode;

// };

// export type LayoutProps = {
//   children: React.ReactNode;
//   title?: string | React.ReactNode;
// };

type BoxProps = {
  label?: string;
  children: React.ReactNode;
  title?: string;
};
const ContentsBox = ({ children, title }: BoxProps) => {
  return (
    <div className=" flex max-h-[1000px] flex-col min-w-full items-start justify-start   ">
      <div className="flex items-start mb-[28px]">
        <span className=" text-[18px] font-[600] leading-[150%]">{title}</span>
      </div>

      {children}
    </div>
  );
};

export default ContentsBox;
