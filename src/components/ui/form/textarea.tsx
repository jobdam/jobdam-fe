/** @format */

import { cn } from "@/utils/cn";

import { FieldWrapperPassThroughProps } from "./field-wrapper";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration?: Partial<UseFormRegisterReturn>;
  };
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, registration, ...props }, ref) => {
    return (
      // <FieldWrapper label={label} error={error}>
      <textarea
        className={cn(
          "flex min-h-[129px] placeholder:text-[18px] bg-white w-full rounded-[10px] border border-[#BCBCBC] px-[25px] py-[22px] text-[16px] placeholder:text-[#B3B3B3] focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed",
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
