/** @format */

import ContentsBox from "@/components/layout/contentsBox";
import { Checkbox, Radio, Select } from "@/components/ui/form";

import React from "react";
const Interview = () => {
  return (
    <>
      <ContentsBox title="직무 분야를 선택해주세요.">
        <Radio
          className="  mr-[30px] flex justify-center pb-[9px] items-end"
          options={[
            { label: "신입", value: "fresh" },
            { label: "경력", value: "experienced" },
          ]}
        ></Radio>
        <div className=" flex items-center justify-center flex-row gap-[8px]">
          <Select
            options={["개발", "디자인", "기획"]}
            defaultValue="개발"
          ></Select>
          <Select
            options={["개발", "디자인", "기획"]}
            defaultValue="개발"
          ></Select>
          <div className=" flex flex-row items-center justify-center">
            <span>다른 분야여도 상관없어요</span>
            <Checkbox checked={true} interview={true}></Checkbox>
          </div>
        </div>
      </ContentsBox>
    </>
  );
};

export default Interview;
