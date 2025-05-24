/** @format */

//*form input 요소에 공통적으로 필요한 UI 요소 (레이블, 에러 메시지 등)**를 래핑(wrapping)하는 컴포넌트

import * as React from "react";
import { type FieldError } from "react-hook-form";

import { Error } from "./error";
import { Label } from "./label";
import { cn } from "@/utils/cn";

export type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  profile?: boolean;
  showLink?: boolean; // ✅ 이거 추가
  isAbsoluteErrorPosition?: boolean; // ➕ 조건적 포지셔닝을 위한 prop
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    label,
    error,
    children,
    profile = false,
    showLink,
    isAbsoluteErrorPosition = false, // 기본값 true (기존 방식 유지)
  } = props;

  return (
    <div>
      <Label>
        {label}
        <div
          className={cn(
            "mt-2 relative ",

            profile && "mt-0"
          )}
        >
          {children}
        </div>
      </Label>

      {(error?.message || showLink) && (
        <div
          className={cn(
            "flex absolute w-[510px] justify-between  ",
            isAbsoluteErrorPosition && "pl-[20px]"
            // showLink && "text-right justify-end"
          )}
        >
          {/* 에러 메세지가 있다면 없어지고 에러 메세지가 없으면 나오도록 */}
          {error?.message && <Error errorMessage={error.message} />}
          <div></div>
          {/* {showLink && (
            <Link
              className=" relative text-[16px] mt-[6px]  underline"
              to="forgot-password"
            >
              비밀번호 찾기
            </Link>
          )} */}
        </div>
      )}
    </div>
  );
};
