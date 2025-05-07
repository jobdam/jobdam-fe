/** @format */

import * as React from "react";
import ContentsBox from "@/components/layout/contentsBox";
import { Checkbox, Radio, Select } from "@/components/ui/form";

import { useJobCategory } from "../../Mypage/api/get-jobcategory";

import { Control, Controller, UseFormReturn } from "react-hook-form";

type FormValues = {
  expType: "신입" | "경력";
  jobCode: string;
  jobDetailCode: string;
  otherField: boolean;
};

type FieldsSelectProps = {
  control: Control<FormValues>;
  form: UseFormReturn<FormValues>;
};

const FieldsSelect = ({ control, form }: FieldsSelectProps) => {
  React.useEffect(() => {
    form.setValue("expType", "신입");
  }, []);
  const { data } = useJobCategory({});
  const jobGroups = data?.data ?? [];

  const jobCode = form.watch("jobCode");
  const jobDetailCode = form.watch("jobDetailCode");

  console.log(jobCode, jobDetailCode);

  React.useEffect(() => {
    if (jobGroups.length > 0) {
      form.reset({
        jobCode: jobGroups[0].jobGroup,
        jobDetailCode: jobGroups[0].details?.[0]?.jobDetailCode ?? "",
        // 다른 필드도 필요 시 설정
      });
    }
  }, [jobGroups]);

  React.useEffect(() => {
    if (!jobCode) return;

    const selectedGroup = jobGroups.find((group) => group.jobGroup === jobCode);
    const firstDetailCode = selectedGroup?.details[0].jobDetail;
    console.log(firstDetailCode);

    form.setValue("jobDetailCode", firstDetailCode ?? "");
  }, [jobCode, jobGroups]);

  console.log(jobCode);
  const jobGroup = jobGroups.find((group) => group.jobGroup === jobCode);
  const jobDetails = jobGroup?.details ?? [];

  console.log(jobCode);
  const s = form.watch("expType");

  console.log(s);
  return (
    <>
      <ContentsBox title="직무 분야를 선택해주세요.">
        <Controller
          control={control}
          name="expType"
          render={({ field }) => (
            <Radio
              // defaultValue="신입"

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
              name="jobCode"
              render={({ field }) => (
                <Select
                  labelkey="jobCode"
                  valuekey="jobGroup"
                  {...field}
                  options={jobGroups}
                  value={field.value}
                />
              )}
            />
          </div>
          <div className="relative">
            <Controller
              control={control}
              name="jobDetailCode"
              render={({ field }) => (
                <Select
                  labelkey="jobDetailCode"
                  valuekey="jobDetail"
                  value={field.value}
                  {...field}
                  options={jobDetails}
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
                  variant="interview"
                  {...field} // Checkbox에 value와 onChange를 전달
                  checked={field.value ?? false} // Checkbox의 상태 관리
                  onCheckedChange={(checked) => field.onChange(checked)} // Checkbox 상태 변경 시 값 변경
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
