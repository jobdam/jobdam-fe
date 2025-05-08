/** @format */

import * as React from "react";

type LayoutProps = {
  children: React.ReactNode;
  title: string | React.ReactNode;
};

export const TermsAgreementLayout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col justify-center items-center min-w-[1200px] pt-[150px] pb-[120px] bg-[#F5F5F5] ">
          <div className=" flex min-h-[600px] flex-col items-start justify-center min-w-[530px] w-[540px]  ">
            <h2 className="text-left mb-[40px] text-[32px] font-semibold text-gray-900">
              {title}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
