/** @format */

import { Input, Radio, Select, Form, Label } from "@/components/ui/form";

import * as React from "react";
import { Camera } from "lucide-react";
import {
  educationOptions,
  stateOptions,
  experienceOptions,
  targetCompany,
} from "../../constants/mainContents";
import { Button } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useJobCategory } from "./api/get-jobcategory";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const ProfilePost = () => {
  //이미지 클릭하면 넣을수 있게 urldb
  const code = useSelector((state: RootState) => state.selects.selected); // Redux에서 selected 값 가져오기
  const { data } = useJobCategory({});
  const jobGroups = data?.data ?? [];
  const form = useForm({
    resolver: zodResolver({}),
    defaultValues: {
      jobCode: "",
      jobDetailCode: "",
      edu: "대학교(4년제)",
      state: "졸업",
      company: "대기업",
      experience: "신입",
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

  console.log(jobCode);
  const jobGroup = jobGroups.find((group) => group.jobGroup === jobCode);
  const jobDetails = jobGroup?.details ?? [];

  console.log(jobDetails, jobGroups);

  //데이터정리 jobGroup에서 시작하고 jobgroup에 해당하는 디테일이
  //옆 select에 뜨도록
  return (
    <Form form={form} onSubmit={(value) => {}}>
      {({ register, formState, control }) => (
        <>
          <div>
            <div className="relative w-[170px] rounded-full h-[170px] bg-[#D9D9D9]"></div>
            <Camera className="absolute text-black right-0" />
          </div>

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
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <Radio
                  options={experienceOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
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
                  value={field.value}
                  onChange={field.onChange}
                  options={targetCompany}
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
