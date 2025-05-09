/** @format */

import { Input, Radio, Select, Form, Label } from "@/components/ui/form";

import { Camera } from "lucide-react";
import {
  educationOptions,
  stateOptions,
  experienceOptions,
} from "../../constants/mainContents";
import { Button } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ProfilePost = () => {
  //이미지 클릭하면 넣을수 있게 urldb

  const form = useForm({
    resolver: zodResolver({}),

    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form
      form={form}
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
            <Select></Select>
            <Select></Select>
          </div>

          <div className="flex flex-row items-center gap-x-[10px]">
            <Label>경력</Label>
            <Radio options={experienceOptions}></Radio>
          </div>

          <div className="flex items-center flex-row gap-x-[10px]">
            <Label className="w-[143px]">학력</Label>
            <Select
              className="w-[169px]"
              registration={register("edu")}
              options={educationOptions}
            ></Select>
            <Select
              options={stateOptions}
              registration={register("state")}
            ></Select>
            <Input className="w-[142px]  "></Input>
            <Input className="w-[142px] "></Input>
          </div>

          <div className=" items-baseline mt-[140px] flex flex-row ">
            <Label className="w-[143px]">희망기업</Label>
            <Input></Input>
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
