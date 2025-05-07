/** @format */

import * as React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

import { Checkbox as CheckBoxPrimitive } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { CheckedState, CheckboxProps } from "@radix-ui/react-checkbox";
import { Label } from "./label";
// export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> &
//   FieldWrapperPassThroughProps & {
//     onCheckedChange?: (checked: boolean) => void;
//     checked?:
//     className?: string;
//   };
// export interface CheckboxProps
//   extends React.ComponentPropsWithoutRef<typeof CheckBoxPrimitive.Root> {
//   label?: string;
//   registration?: Partial<UseFormRegisterReturn>;
//   onCheckedChange?(checked: CheckedState): void;

// }

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
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CombinedCheckboxProps
>(
  (
    {
      className,
      label,
      variant = "default",

      checked,
      onCheckedChange,
      error,
      registration,
      ...props
    },
    ref
  ) => {
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

    return (
      <FieldWrapper error={error}>
        <div className={wrapperClass}>
          <CheckBoxPrimitive.Root
            className={rootClass}
            disabled={isDisabled}
            onCheckedChange={onCheckedChange}
            checked={checked}
            {...props}
            {...registration}
          >
            {/* <div className="w-[1px] bg-black h-[80px]"></div> */}

            <CheckBoxPrimitive.Indicator className="text-violet11">
              <Check className={cn(variant !== "default" && "text-white")} />
            </CheckBoxPrimitive.Indicator>
          </CheckBoxPrimitive.Root>
          <Label>{label}</Label>
        </div>
      </FieldWrapper>
    );
  }
);

Checkbox.displayName = "Checkbox";
