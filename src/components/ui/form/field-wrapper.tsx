/** @format */

//*form input 요소에 공통적으로 필요한 UI 요소 (레이블, 에러 메시지 등)**를 래핑(wrapping)하는 컴포넌트

import * as React from "react";
import { type FieldError } from "react-hook-form";

import { Error } from "./error";
import { Label } from "./label";
import { Link } from "@/components/ui/link";

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
        <div className="mt-1 ">{children}</div>
      </Label>
      <div className="flex min-h-[30px] justify-between">
        {error?.message ? (
          <Error errorMessage={error?.message || "⠀"} />
        ) : (
          <div /> // 또는 <span />로 공간 차지하지 않게
        )}
        {showLink && (
          <Link className="pt-[5px] text-[10px] underline" to="forgot-password">
            비밀번호 찾기
          </Link>
        )}
      </div>
    </div>
  );
};
