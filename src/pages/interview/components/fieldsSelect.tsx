/** @format */

import * as React from "react";
import ContentsBox from "@/components/layout/contentsBox";
import { Checkbox, Form, Radio, Select } from "@/components/ui/form";
import { Controller } from "react-hook-form";

const FieldsSelect = ({ control }) => {
  const [fieldsCheck, setFieldsCheck] = React.useState(false);
  return (
    <>
      <ContentsBox title="직무 분야를 선택해주세요.">
        <Controller
          control={control}
          name="jobType"
          defaultValue="신입"
          render={({ field }) => (
            <Radio
              className="mr-[30px] flex justify-center pb-[9px] items-end"
              options={[
                { label: "신입", value: "신입" },
                { label: "경력", value: "경력" },
              ]}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        <div className=" flex justify flex-row gap-[8px]">
          <div className="relative">
            <Controller
              control={control}
              name="jobType1"
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { label: "개발", value: "dev" },
                    { label: "디자인", value: "design" },
                    { label: "기획", value: "planning" },
                  ]}
                />
              )}
            />
          </div>
          <div className="relative">
            <Controller
              control={control}
              name="jobType2"
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { label: "개발", value: "dev" },
                    { label: "디자인", value: "design" },
                    { label: "기획", value: "planning" },
                  ]}
                />
              )}
            />
          </div>
          <div className=" flex flex-row items-center justify-center">
            <span>다른 분야여도 상관없어요</span>
            <Controller
              control={control}
              name="otherField"
              render={({ field }) => (
                <Checkbox
                  {...field} // Checkbox에 value와 onChange를 전달
                  checked={field.value} // Checkbox의 상태 관리
                  onCheckedChange={(checked) => field.onChange(checked)} // Checkbox 상태 변경 시 값 변경
                  interview={true} // interview prop 전달
                />
              )}
            />
          </div>
        </div>
      </ContentsBox>
    </>
  );
};

export default FieldsSelect;
