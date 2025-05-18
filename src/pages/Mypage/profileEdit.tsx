/** @format */

import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/auth";
import { useJobCategory } from "./api/get-jobcategory";
import { useForm } from "react-hook-form";
import { Form, Radio } from "@/components/ui/form";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/form";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Select } from "@/components/ui/form";
import { experienceOptions, targetCompany } from "@/constants/mainContents";
import { educationOptions } from "../../constants/mainContents";
import { stateOptions } from "../../constants/mainContents";
import { fetchAndLogImage } from "@/utils/format";
import { useEditProfile } from "./api/patch-editprofile";
import { formatBirthday } from "../../utils/format";

const ProfileEdit = ({ selectedFile }: any) => {
  //profileEidt에서 이름 ,  패스워드, 이메일 인풋 ->placeholder로 내가 가지고있는 정보들
  // 이메일은 바꿀수없음,
  // 직무 학교 희망기업

  const form = useForm<any>({
    defaultValues: {
      name: "",
      jobCode: "",
      jobDetailCode: "",
      birthday: "",
      experienceType: "",
      educationLevel: "대학교(4년제)",
      educationStatus: "졸업",
      targetCompanySize: "대기업",
    },
  });
  const { data: userData } = useUser();
  const { data: jobData } = useJobCategory({});

  const jobGroups = jobData?.data ?? [];
  //선택된 jobgroups에서
  const userJobCode = userData?.jobCode;
  const userJobDetailCode = userData?.jobDetailCode;

  const selectedJobGroup = jobGroups.find(
    (group) => group.jobCode === userJobCode
  );

  const selectedJobDetail = selectedJobGroup?.details.find(
    (detail) => detail.jobDetailCode === userJobDetailCode
  );
  const jobCode = form.watch("jobCode");
  const jobDetailCode = form.watch("jobDetailCode");
  console.log(jobDetailCode, "profielEidt");

  //jobCode 코드
  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        email: userData.email,
        experienceType: userData?.experienceType,
        educationLevel: userData?.educationLevel,
        educationStatus: userData?.educationStatus,
        targetCompanySize: userData?.targetCompanySize,
        birthday: userData?.birthday,
        jobCode: selectedJobGroup?.jobCode,
        jobDetailCode: selectedJobDetail?.jobDetailCode,
      });
    }
  }, [userData, form, selectedJobGroup, selectedJobDetail]);
  useEffect(() => {
    if (!jobCode) return;

    const selectedGroup = jobGroups.find((group) => group.jobCode === jobCode);
    const firstDetailCode = selectedGroup?.details[0]?.jobDetailCode ?? "";

    form.setValue("jobDetailCode", firstDetailCode); // ✅ 항상 설정
  }, [jobCode, jobGroups, form]);

  const jobGroup = jobGroups.find((group) => group.jobCode === jobCode);
  const jobDetails = jobGroup?.details ?? [];

  const patchProfile = useEditProfile({});

  return (
    <div className="border-[1px] rounded-[20px] border-[#488FFF] bg-[white] pt-[38px] pb-[84px] px-[60px] max-h-[626px] w-[915px]">
      <Form
        className="spacey-y-0"
        form={form}
        onSubmit={async (value) => {
          console.log(userData);

          const formData = new FormData();
          let imageFile: File | null | undefined = selectedFile;
          if (!imageFile) {
            try {
              imageFile = await fetchAndLogImage(); // ✅ Promise 처리
            } catch (error) {
              console.error("이미지 파일 변환 실패:", error);
              return; // 요청 중단
            }
          }

          if (imageFile) {
            formData.append("image", imageFile); // ✅ 실제 File 추가
          }

          // 데이터 추가
          formData.append(
            "data",
            new Blob([JSON.stringify(value)], { type: "application/json" })
          );

          patchProfile.mutate({ updateData: formData });
        }}
      >
        {({ register, control }) => (
          <div className="flex flex-col">
            <div className="flex justify-end ">
              <Button
                isLoading={patchProfile.isPending}
                variant="secondary"
                className=" cursor-pointer border-[1px] flex rounded-[10px] justify-center 
          items-center text-[#488fff] w-[74px] h-[30px] text-[16px]  font-semibold"
              >
                저장
              </Button>
            </div>

            <div className="flex flex-row w-full items-center">
              <Label className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                이름
              </Label>
              <div className="flex-1">
                <Input
                  type="text"
                  registration={register("name")}
                  //   value={form.getValues("name")}
                  className="h-[66px]  border-[#488fff]"
                ></Input>
              </div>
            </div>
            {/* 이메일 */}
            <div className="flex flex-row w-full items-center">
              <Label className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                이메일
              </Label>
              <div className="flex-1">
                <Input
                  type="email"
                  disabled
                  registration={register("email")}
                  //   value={form.getValues("name")}
                  className="h-[66px]  border-[#488fff]"
                ></Input>
              </div>
            </div>
            {/* 생년월일 */}
            <div className="flex flex-row w-full items-center">
              <Label className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                생년월일
              </Label>
              <div className="flex-1">
                <Input
                  type="text"
                  registration={register("birthday")}
                  onChange={(e) => {
                    const formatted = formatBirthday(e.target.value);
                    form.setValue("birthday", formatted);
                  }}
                  className="h-[66px]  border-[#488fff]"
                ></Input>
              </div>
            </div>
            {/* 직무 */}
            <div className="flex flex-row w-full items-center">
              <Label className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                직무
              </Label>
              <div className="flex flex-1 flex-row gap-x-[8px] mt-[8px]">
                <Controller
                  name="jobCode"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      edit={true}
                      value={field.value}
                      labelkey="jobGroup"
                      valuekey="jobCode"
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
                      edit={true}
                      className="w-full"
                      value={field.value}
                      labelkey="jobDetail"
                      valuekey="jobDetailCode"
                      onChange={field.onChange}
                      options={jobDetails}
                    />
                  )}
                />
              </div>
            </div>
            {/* 경력 */}
            <div className="flex flex-row flex-1 items-center justify-between mt-[8px] pr-[160px]">
              <Label className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                경력
              </Label>
              <Controller
                name="experienceType"
                control={control}
                render={({ field }) => (
                  <Radio
                    edit={true}
                    value={field.value}
                    options={experienceOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
            {/* 학교 전공 */}
            <div className="flex flex-row w-full items-center">
              <Label className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                학교(전공)
              </Label>
              <div className="flex flex-1 flex-row gap-x-[8px] mt-[8px]">
                <Controller
                  name="educationLevel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      edit={true}
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                      options={educationOptions}
                    />
                  )}
                />
                <Controller
                  name="educationStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      edit={true}
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                      options={stateOptions}
                    />
                  )}
                />
                {/* <Input className="w-[142px]  "></Input>
            <Input className="w-[142px] "></Input> */}
              </div>
            </div>

            {/* 목표기업 */}
            <div className="flex flex-row w-full items-center">
              <Label className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                희망기업
              </Label>
              <div className="flex flex-1 flex-row gap-x-[8px] mt-[8px]">
                <Controller
                  name="targetCompanySize"
                  control={control}
                  render={({ field }) => (
                    <Select
                      edit={true}
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                      options={targetCompany}
                    />
                  )}
                />
                {/* <Input className="w-[142px]  "></Input>
            <Input className="w-[142px] "></Input> */}
              </div>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ProfileEdit;
