/** @format */

import * as React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/utils/cn";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

// input 컴포넌트 아이디 패스워드 등의 입력창
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };
//className -> 스타일, showLink -> Link 컴포넌트 보여주기 여부
//type 은 input의 타입 type=password 같은것 label은 label 컴포넌트에 들어갈 요소
// error는 error 컴포넌트에 들어갈요소 error 컴포넌트는 유효성검사 에러 메세지를 내보낸다
//...props 적혀있지않은 나머지 속성들
//registration register("password")를 통해 react-hook-form이 input 상태를 관리함

//다음과 같은 속성을 반환하였다.
// type UseFormRegisterReturn = {
//   name: string;
//   onChange: (...event: any[]) => void;
//   onBlur: (...event: any[]) => void;
//   ref: (instance: HTMLInputElement | null) => void;
// };

//registration의 기능들
// 값 관리	useState로 따로 상태 안 만들어도 RHF가 formState.values.email로 관리함
// ✅ 이벤트 관리	onChange, onBlur 등을 수동으로 작성할 필요 없음
// ✅ 유효성 검사	register("email", { required: "이메일은 필수입니다" })로 validation도 가능
// ✅ 초기값 설정	useForm({ defaultValues: { email: "..." } })로 가능
// ✅ 폼 제출 시 값 자동 수집	handleSubmit((data) => console.log(data))로 전체 데이터 수집 가능

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, showLink, type, label, error, registration, ...props },
    ref
  ) => {
    return (
      <FieldWrapper showLink={showLink} label={label} error={error}>
        <input
          type={type}
          className={cn(
            "placeholder:text-grayplaceholder:font-[400] flex mt-2 h-[50px] font-[500] bg-white w-full rounded-md  text-[14px]  border-none px-4 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50",

            className
          )}
          ref={ref}
          {...registration}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Input.displayName = "Input";
