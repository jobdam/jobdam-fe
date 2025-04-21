/** @format */

import ContentsBox from "@/components/layout/contentsBox";
import { Select } from "@/components/ui/form";
import React from "react";
const Interview = () => {
  return (
    <>
      <ContentsBox showIcon={true} label="같은 직무">
        <Select
          options={["개발", "디자인", "기획"]}
          defaultValue="개발"
        ></Select>
        <div>
          <span>다른 직무도 상관없요</span>
        </div>
      </ContentsBox>
    </>
  );
};

export default Interview;
