/** @format */

import { Input, Radio, Select, Form, Label } from "@/components/ui/form";

import * as React from "react";
import {
  educationOptions,
  stateOptions,
  targetCompany,
  experienceOptions,
} from "../../constants/mainContents";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useJobCategory } from "./api/get-jobcategory";
import { Controller } from "react-hook-form";
import ProfileUpload from "./components/profilupload";

// type FormData = {
//   jobCode: string;
//   jobDetailCode: string;
//   edu: string;
//   state: string;
//   company: string;
// };

const ProfilePost = () => {
  const { data } = useJobCategory({});
  const jobGroups = data?.data ?? [];
  const form = useForm<any>({
    defaultValues: {
      jobCode: "",
      jobDetailCode: "",
      edu: "대학교(4년제)",
      state: "졸업",
      company: "대기업",
    },
  });
  const jobCode = form.watch("jobCode");
  const jobDetailCode = form.watch("jobDetailCode");

  React.useEffect(() => {
    if (jobGroups.length > 0) {
      form.reset({
        jobCode: jobGroups[0].jobGroup,
        jobDetailCode: jobGroups[0].details?.[0]?.jobDetailCode ?? "",
        // 다른 필드도 필요 시 설정
      });
    }
  }, [jobGroups]);

  // jobcode를 선택햇을때 jobdetail의 1번째 요소를 자동으로 지정해준다.
  React.useEffect(() => {
    if (!jobCode) return;

    const selectedGroup = jobGroups.find((group) => group.jobGroup === jobCode);
    const firstDetailCode = selectedGroup?.details[0].jobDetail;
    console.log(firstDetailCode);

    form.setValue("jobDetailCode", firstDetailCode ?? "");
  }, [jobCode, jobGroups]);

  console.log(jobCode, jobDetailCode);
  const jobGroup = jobGroups.find((group) => group.jobGroup === jobCode);
  const jobDetails = jobGroup?.details ?? [];

  //mutation에서

  //데이터정리 jobGroup에서 시작하고 jobgroup에 해당하는 디테일이
  //옆 select에 뜨도록
  return (
    <Form
      form={form}
      onSubmit={(value) => {
        console.log(value);
      }}
    >
      {({ register, control }) => (
        <>
          <ProfileUpload></ProfileUpload>
          <div className="flex flex-row items-center gap-x-[10px]">
            <div>
              <span>이름</span>
            </div>
            <Input {...register("name")} />
          </div>
          <div className="flex flex-row items-center gap-[10px]">
            <div>생년월일</div>
            <Input
              {...register("birthday")}
              placeholder="2025 / 04 /25"
            ></Input>
          </div>

          <div className="flex flex-row items-center gap-x-[10px]">
            <div>직무</div>
            <Controller
              name="jobCode"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  labelkey="jobCode"
                  valuekey="jobGroup"
                  onChange={field.onChange}
                  options={jobGroups}
                />
              )}
            />
            <Controller
              control={control}
              name="jobDetailCode"
              render={({ field }) => (
                <Select
                  value={field.value}
                  labelkey="jobDetailCode"
                  valuekey="jobDetail"
                  onChange={field.onChange}
                  options={jobDetails}
                />
              )}
            />{" "}
          </div>

          <div className="flex flex-row items-center gap-x-[10px]">
            <Label>경력</Label>
            <Radio options={experienceOptions}></Radio>
          </div>

          <div className="flex items-center flex-row gap-x-[10px]">
            <Label className="w-[143px]">학력</Label>
            <Controller
              name="edu"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-[169px]"
                  value={field.value}
                  onChange={field.onChange}
                  options={educationOptions}
                />
              )}
            />

            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={stateOptions}
                />
              )}
            />
            <Input className="w-[142px]  "></Input>
            <Input className="w-[142px] "></Input>
          </div>

          <div className=" items-baseline mt-[140px] flex flex-row ">
            <Label className="w-[143px]">희망기업</Label>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <Select
                  options={targetCompany}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Button></Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default ProfilePost;
