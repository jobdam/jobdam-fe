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

interface CombinedCheckboxProps
  extends CheckboxProps,
    FieldWrapperPassThroughProps {
  interview?: boolean;
  terms?: boolean;
  interview2?: boolean;
  progress?: boolean;
  // onSubmit: () => void;
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CombinedCheckboxProps
>(
  (
    {
      className,
      interview = false,
      label,
      progress = false,
      checked,
      interview2 = false,
      onCheckedChange,
      error,
      terms = false,
      registration,
      ...props
    },
    ref
  ) => {
    return (
      <FieldWrapper error={error}>
        <div
          className={cn(
            "flex gap-2 items-start ",
            interview && "flex w-[150px] items-center justify-center ",
            progress && "flex w-[150px] items-center justify-start "
          )}
        >
          <CheckBoxPrimitive.Root
            className={cn(
              "flex size-[25px] transition-color appearance-none items-center justify-center  bg-[#D9D9D9] rounded-full shadow-blackA4 outline-none",
              interview &&
                "flex size-[25px] transition-color appearance-none items-center justify-center rounded-none  bg-black outline-none  ",
              className
            )}
            disabled={interview2}
            // disabled={interview}
            onCheckedChange={onCheckedChange}
            checked={checked}
            required
          >
            {/* <div className="w-[1px] bg-black h-[80px]"></div> */}

            <CheckBoxPrimitive.Indicator className="text-violet11">
              <Check className={cn(interview || (progress && "text-white"))} />
            </CheckBoxPrimitive.Indicator>
          </CheckBoxPrimitive.Root>
          <Label>{label}</Label>
        </div>
      </FieldWrapper>
    );
  }
);

Checkbox.displayName = "Checkbox";
