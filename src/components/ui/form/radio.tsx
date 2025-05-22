/** @format */

import * as React from "react";
import * as RadioPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { Label } from "./label";

type Option = {
  label: string;
  value: string;
  id?: number;
};

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root> {
  options: Option[];
  className?: string;
  edit?: boolean;
}

// 글자 진하게, 테두리 있는 버튼 스타일
const variance = cva(
  "h-[60px] w-[150px] text-[rgba(0,0,0,0.50)] border-[1px] border-[rgba(0,0,0,0.30)] shrink-0 data-[state=checked]:border-[#000] data-[state=checked]:font-semibold  data-[state=checked]:text-[black] transition"
);

const Radio = React.forwardRef<
  React.ComponentRef<typeof RadioPrimitive.Root>,
  RadioGroupProps
>(({ options, edit, className, ...props }, ref) => {
  const [value, setValue] = React.useState(() => options[0]?.value || "");

  return (
    <RadioPrimitive.Root
      className={cn("flex flex-col", className)}
      value={value}
      onValueChange={(val) => setValue(val)}
      ref={ref}
      {...props}
    >
      <div className="flex items-center">
        {options.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === options.length - 1;

          return (
            <RadioPrimitive.Item
              key={option.id}
              className={cn(
                variance(),
                edit &&
                  "data-[state=checked]:border-[#488fff] data-[state=checked]:font-semibold  data-[state=checked]:text-[black]",
                isFirst && "rounded-l-[10px]",
                isLast && "rounded-r-[10px]"
              )}
              value={option.value}
              id={option.value}
            >
              <Label className={cn("", edit && "text-[18px]")}>
                {option.label}
              </Label>
            </RadioPrimitive.Item>
          );
        })}
      </div>
    </RadioPrimitive.Root>
  );
});

Radio.displayName = "Radio";

export { Radio };
