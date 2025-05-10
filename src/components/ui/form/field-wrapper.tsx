/** @format */

//*form input 요소에 공통적으로 필요한 UI 요소 (레이블, 에러 메시지 등)**를 래핑(wrapping)하는 컴포넌트

import * as React from "react";
import { type FieldError } from "react-hook-form";

import { Error } from "./error";
import { Label } from "./label";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/cn";

export type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  showLink?: boolean; // ✅ 이거 추가
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children, showLink } = props;
  return (
    <div>
      <Label>
        {label}
        <div className="mt-2 ">{children}</div>
      </Label>
      {(error?.message || showLink) && (
        <div
          className={cn(
            "flex min-h-[30px] justify-start ",
            showLink && "text-right justify-end"
          )}
        >
          {error?.message && <Error errorMessage={error.message} />}
          {showLink && (
            <Link
              className="pt-[5px] text-[12px]  underline"
              to="forgot-password"
            >
              비밀번호 찾기
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
