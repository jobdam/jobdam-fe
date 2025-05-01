/** @format */

import { Input, Radio, Select, Form } from "@/components/ui/form";
import {
  experienceOptions,
  jobCategoryOptions,
} from "@/constants/mainContents";
import { Camera } from "lucide-react";

const ProfilePost = () => {
  //이미지 클릭하면 넣을수 있게 urldb

  return (
    <Form
      onSubmit={(value) => {
        console.log(value);
      }}
    >
      {({ register, formState }) => (
        <>
          <div>
            <div className="relative w-[170px] rounded-full h-[170px] bg-[#D9D9D9]"></div>
            <Camera className="absolute text-black right-0" />
          </div>

          <div>
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

          <div>
            <div>
              <span>직무</span>
            </div>
            job
            <Select options={jobCategoryOptions}></Select>
            <Select></Select>
          </div>

          <div>
            <Radio options={experienceOptions}></Radio>
          </div>
          <div>
            <Select></Select>
            <Select></Select>
          </div>

          <div>
            <Select></Select>
          </div>
        </>
      )}
    </Form>
  );
};

export default ProfilePost;
