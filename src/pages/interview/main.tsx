/** @format */
import * as React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import ContentsBox from "@/components/layout/contentsBox";
import { Checkbox, Form, Radio, Select, Textarea } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import FieldsSelect from "./components/fieldsSelect";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setStep } from "@/store/slices/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const apiUrl = import.meta.env.VITE_API_URL;

const interviewSchema = z.object({
    jobType: z.string().min(1, "직무를 선택해주세요."),
    introduce: z.string().min(1, "자기소개를 입력해주세요."),
    interviewType: z.string().min(1, "면접 유형을 선택해주세요."),
    peopleCount: z.coerce.number().min(1, "인원수를 선택해주세요."),
});

const Interview = () => {
    const form = useForm({
        resolver: zodResolver(interviewSchema),
        defaultValues: {
            jobType: "",
            introduce: "",
            interviewType: "",
            peopleCount: 1,
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(setStep(1));
    }, [dispatch]);

    return (
        <Form
            form={form}
            onSubmit={async (values) => {
                try {
                    const accessToken = localStorage.getItem("accessToken");

                    await axios.post(`${apiUrl}/api/matching/info`, values, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    console.log("매칭 정보 등록 완료:", values);
                } catch (error) {
                    console.error("매칭 정보 등록 실패", error);
                } finally {
                    navigate("/interview/matching");
                }
            }}
        >
            {({ control, watch }) => {
                const jobTypeValue = watch("jobType");
                console.log("선택된 직무:", jobTypeValue);

                return (
                    <>
                        <FieldsSelect control={control} />

                        <ContentsBox title="면접 인원수">
                            <Controller
                                control={control}
                                name="peopleCount"
                                render={({ field }) => (
                                    <input
                                        type="number"
                                        min="1"
                                        {...field}
                                        className="border p-2 w-full"
                                        placeholder="면접 인원수를 입력하세요"
                                    />
                                )}
                            />
                        </ContentsBox>

                        <ContentsBox title="자신을 소개해주세요">
                            <Controller
                                control={control}
                                name="introduce"
                                render={({ field }) => (
                                    <Textarea
                                        placeholder="ex) 데이터보다 사람 마음을 읽는 마케터를 꿈꿔요"
                                        {...field}
                                    />
                                )}
                            />
                        </ContentsBox>

                        <ContentsBox title="어떤 종류의 면접을 준비하시나요?">
                            <Controller
                                control={control}
                                name="interviewType"
                                render={({ field }) => (
                                    <>
                                        <Button
                                            type="button"
                                            onClick={() => field.onChange("인성")}
                                        >
                                            인성
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => field.onChange("직무")}
                                        >
                                            직무
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => field.onChange("기술")}
                                        >
                                            기술
                                        </Button>
                                    </>
                                )}
                            />
                        </ContentsBox>

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

export default Interview;
