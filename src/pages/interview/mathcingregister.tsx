/** @format */
import * as React from "react";
import { useNavigate } from "react-router";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setStep } from "@/store/slices/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldsSelect from "./components/fieldsSelect";
import { useMatchingProfile } from "./api/get-matchingProfile";
import { interviewSchema } from "./schemas/interviewSchema";

const InterviewRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {},
  });
  const { data: matchingProfile } = useMatchingProfile();

  React.useEffect(() => {
    dispatch(setStep(1));
  }, []);

  React.useEffect(() => {
    if (matchingProfile) {
      form.reset({
        jobCode: matchingProfile.jobCode,
        jobDetailCode: matchingProfile.jobDetailCode,
        experienceType: matchingProfile.experienceType,
      });
    }
  }, [matchingProfile]);

  return (
    <Form
      form={form}
      onSubmit={(values: any) => {
        navigate("/interview/matching", { state: values });
      }}
    >
      {({ control }) => {
        return (
          <>
            <FieldsSelect
              form={form}
              control={control}
              profile={matchingProfile}
            />

            <div className="relative bottom-[-150px] left-[100px] flex justify-center items-center">
              <button
                type="submit"
                className="bg-[#E4E4E4] h-[70px] w-[480px] cursor-pointer rounded-[10px]"
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

export default InterviewRegister;
