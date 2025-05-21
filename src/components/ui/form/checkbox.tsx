/** @format */

import * as React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

import { Checkbox as CheckBoxPrimitive } from "radix-ui";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "./label";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export type Variant = "default" | "interview" | "progress";

interface CombinedCheckboxProps
  extends FieldWrapperPassThroughProps,
    Omit<
      React.ComponentPropsWithoutRef<typeof CheckBoxPrimitive.Root>,
      "onCheckedChange"
    > {
  label?: string;
  registration?: Partial<UseFormRegisterReturn>;
  onCheckedChange?: (checked: CheckedState) => void;
  variant?: Variant;
  step?: any;
}

export const Checkbox = React.forwardRef<
  HTMLButtonElement,
  CombinedCheckboxProps
>(
  (
    {
      className,
      step,
      label,
      variant = "default",
      isAbsoluteErrorPosition,
      checked,
      onCheckedChange,
      error,
      registration,
      ...props
    },
    ref
  ) => {
    const progressStep = useSelector(
      (state: RootState) => state?.ui.progressStep
    );

    //checkbox는 다양하게 쓰인다 1. interview sidebar에 쓰인다. -> interview
    // 2. 그냥 checkbox 그자체로의 역할
    //checkbox의 크기나 모양을 변하기 쉽게 만들자.
    const rootClass = cn(
      "flex size-[25px] appearance-none items-center justify-center rounded-full bg-[#D9D9D9] outline-none shadow-blackA4 transition-colors",
      variant === "interview" && "rounded-none bg-black",
      className
    );
    const isDisabled = props.disabled;

    const wrapperClass = cn(
      "flex items-start gap-2",
      variant === "interview" && "w-[75px] justify-center",
      variant === "progress" && "w-[150px] justify-start"
    );

    console.log(progressStep, step);
    // ✅ step에 따른 label 처리
    const labelClassName = cn(
      "text-base ", // 기본 폰트 스타일
      variant === "progress" && [progressStep >= step && "text-[#488FFF]"]
    );
    return (
      <FieldWrapper
        isAbsoluteErrorPosition={isAbsoluteErrorPosition}
        error={error}
      >
        <div className={wrapperClass}>
          <CheckBoxPrimitive.Root
            className={rootClass}
            disabled={isDisabled}
            onCheckedChange={onCheckedChange}
            checked={checked}
            ref={ref}
            {...props}
            {...registration}
          >
            {/* <div className="w-[1px] bg-black h-[80px]"></div> */}

            <CheckBoxPrimitive.Indicator className="text-violet11">
              <Check className={cn(variant !== "default" && "text-white")} />
            </CheckBoxPrimitive.Indicator>
          </CheckBoxPrimitive.Root>

          <Label className={labelClassName}>{label}</Label>
        </div>
      </FieldWrapper>
    );
  }
);

Checkbox.displayName = "Checkbox";
