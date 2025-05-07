/** @format */
import * as React from "react";
import { useNavigate } from "react-router";

import ContentsBox from "@/components/layout/contentsBox";
import { Form, Textarea } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FieldsSelect from "./components/fieldsSelect";
import People from "./components/people";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setStep } from "@/store/slices/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  expType: z.string().default("신입"), // 기본값을 설정
  jobCode: z.string().default(""), // 기본값을 설정
  jobDetailCode: z.string().default(""), // 기본값을 설정
  otherField: z.boolean().default(false), // 기본값을 설정
  introduce: z.string().default(""),
});
const Interview = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expType: "신입",
      jobCode: "",
      jobDetailCode: "",
      otherField: false,
      introduce: "소개",
    },
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setStep(1));
  }, []);

  const navigate = useNavigate();
  const handleOnSubmit = () => {
    navigate("/interview/matching");
  };

  return (
    <Form
      form={form}
      onSubmit={(values) => {
        console.log("매칭정보를 등록한다.:", values);
      }}
    >
      {({ control, register }) => {
        return (
          <>
            <FieldsSelect form={form} control={control}></FieldsSelect>
            <People control={control}></People>
            <ContentsBox title="자신을 소개해주세요">
              <Textarea
                registration={register("introduce")}
                placeholder="ex) 데이터보다 사람 마음을 읽는 마케터를 꿈꿔요"
              ></Textarea>
            </ContentsBox>
            <ContentsBox title="어떤종류이 면접을 준비하시나요?">
              <Button>인성</Button>
              <Button>직무</Button>

              <Button>기술</Button>
            </ContentsBox>
            <div className=" relative bottom-[-150px] left-[100px] flex justify-center items-center">
              <button
                onClick={handleOnSubmit}
                className="bg-[#E4E4E4] h-[70px] w-[480px] cursor-pointer rounded-[10px] "
                type="submit"
              >
                입력 완료
              </button>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default Interview;
