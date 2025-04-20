/** @format */

import * as React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/utils/cn";

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
  // onSubmit: () => void;
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CombinedCheckboxProps
>(
  (
    {
      className,
      label,
      checked,
      onCheckedChange,
      error,
      registration,
      ...props
    },
    ref
  ) => {
    return (
      <div className=" flex gap-2 items-start mb-[10px]">
        <CheckBoxPrimitive.Root
          className={cn(
            "flex size-[25px] transition-color appearance-none items-center justify-center  bg-[#D9D9D9] rounded-full shadow-blackA4 outline-none hover:bg-violet3 ",
            className
          )}
          onCheckedChange={onCheckedChange}
          checked={checked}
          required
        >
          <CheckBoxPrimitive.Indicator className="text-violet11">
            <CheckIcon />
          </CheckBoxPrimitive.Indicator>
        </CheckBoxPrimitive.Root>
        <Label>
          <div>{label}</div>
        </Label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
