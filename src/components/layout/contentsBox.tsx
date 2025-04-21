/** @format */

import React from "react";
import { LayoutProps } from "./interview-layout";
import { Label } from "../ui/form";
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
};
const ContentsBox = ({ children, label }: BoxProps) => {
  return (
    <div className=" flex max-h-[400px] flex-col min-w-full p-6 items-start justify-center bg-[#F5F5F5]  ">
      <Label className="pl-2">{label}</Label>
      {children}
    </div>
  );
};

export default ContentsBox;
