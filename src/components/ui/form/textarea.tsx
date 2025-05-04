/** @format */

import { cn } from "@/utils/cn";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, registration, ...props }, ref) => {
    return (
      // <FieldWrapper label={label} error={error}>
      <textarea
        className={cn(
          "flex min-h-[80px] placeholder:text-[18px] bg-white w-full rounded-md border border-[#BCBCBC] px-[25px] py-[22px] text-sm placeholder:text-[rgba(0,0,0,0.30)] focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...registration}
        {...props}
      />
      // </FieldWrapper>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
