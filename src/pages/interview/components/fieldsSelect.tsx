/** @format */

import * as React from "react";
import ContentsBox from "@/components/layout/contentsBox";
import { Radio, Select } from "@/components/ui/form";

import { useJobCategory } from "../../Mypage/api/get-jobcategory";

import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { experienceOptions } from "@/constants";
type FieldsSelectProps = {
  control: any;
  form: any;
  profile: {
    jobCode?: string;
    jobDetailCode?: string;
    experienceType?: string;
  };
};

const FieldsSelect = ({ control, form, profile }: FieldsSelectProps) => {
  const { data } = useJobCategory({});
  const jobGroups = data?.data ?? []; //여러직무과 그룹안에 세부직무그룹이있음.

  //선택한 직무안에 세부직무들
  const [jobDetails, setJobDetails] = React.useState<any[]>([]);

  //초기값 설정
  React.useEffect(() => {
    if (!profile || jobGroups.length === 0) return;

    const initGroup =
      jobGroups.find((g) => g.jobCode === profile.jobCode) ?? jobGroups[0];
    const initDetail =
      initGroup.details.find(
        (d) => d.jobDetailCode === profile.jobDetailCode
      ) ?? initGroup.details[0];

    setJobDetails(initGroup.details);

    form.setValue("jobCode", initGroup.jobCode);
    form.setValue("jobDetailCode", initDetail?.jobDetailCode ?? "");
    form.setValue("experienceType", profile.experienceType || "NEW");
  }, [profile, jobGroups]);

  //직무가 바뀌면 세부직무를 바꿔주는핸들러러
  const handleJobCodeChange = (newJobCode: string | number) => {
    form.setValue("jobCode", newJobCode);
    //해당 group 찾기
    const selectedGroup = jobGroups.find((g) => g.jobCode === newJobCode);
    setJobDetails(selectedGroup.details);

    //기본값은 0번
    const firstDetail = selectedGroup.details[0];
    if (firstDetail) {
      form.setValue("jobDetailCode", firstDetail.jobDetailCode);
    }
  };

  return (
    <>
      <ContentsBox title="직무 분야를 선택해주세요.">
        <Controller
          control={control}
          name="experienceType"
          render={({ field }) => (
            <Radio
              edit={true}
              className="mr-[30px] flex justify-center pb-[9px] items-end"
              options={experienceOptions}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        <div className=" flex justify flex-row gap-[8px] items-center">
          <div className="relative">
            <Controller
              control={control}
              name="jobCode"
              render={({ field }) => (
                <Select
                  className="w-[227px]  "
                  labelkey="jobGroup"
                  valuekey="jobCode"
                  options={jobGroups}
                  value={field.value}
                  onChange={(val) => handleJobCodeChange(val)}
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
                  className="w-[227px]"
                  labelkey="jobDetail"
                  valuekey="jobDetailCode"
                  options={jobDetails}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <p className="pl-[15px] font-bold text-[16px]">
            다른 분야여도 상관없어요
          </p>
        </div>
      </ContentsBox>
      <div className="mt-[50px]">
        <ContentsBox title="함께 하고 싶은 인원수를 선택해주세요.">
          <Controller
            control={control}
            name="matchType"
            render={({ field }) => (
              <div className="gap-[20px] flex w-full flex-row">
                <Button
                  type="button"
                  className="text-black focus:text-[#488fff]  text-[18px]"
                  size="register"
                  variant={
                    field.value === "ONE_TO_ONE" ? "outline" : "register"
                  }
                  onClick={() => field.onChange("ONE_TO_ONE")}
                >
                  <img src="/matchingIcon/1;1.svg" alt="1:1" />
                  1:1
                </Button>
                <Button
                  type="button"
                  size="register"
                  className="text-black text-[18px] focus:text-[#488fff] "
                  variant={field.value === "GROUP" ? "outline" : "register"}
                  onClick={() => field.onChange("GROUP")}
                >
                  <img src="/matchingIcon/3-6.svg" alt="1:1" />
                  3~6명
                </Button>
                <Button
                  type="button"
                  size="register"
                  className="text-blac k text-[18px]"
                  variant={field.value === "NONE" ? "outline" : "register"}
                  onClick={() => field.onChange("NONE")}
                >
                  <img src="/matchingIcon/상관없어요.svg" alt="1:1" />
                  상관없어요
                </Button>
              </div>
            )}
          />
        </ContentsBox>
      </div>
    </>
  );
};

export default FieldsSelect;
