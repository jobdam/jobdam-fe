/** @format */

import * as React from "react";
import * as RadioPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { Label } from "./label";
type Option = {
  label: string;
  value: string;
};

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root> {
  options: Option[];
  className?: string;
}

const Radio = React.forwardRef<
  React.ComponentRef<typeof RadioPrimitive.Root>,
  RadioGroupProps
>(({ options, className, ...props }, ref) => {
  const [value, setValue] = React.useState(() => options[0]?.value || "");

  const variance = cva(
    "h-[45px] w-[120px] text-black border-[1px] border-[#000] shrink-0 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 transition"
  );

  return (
    <RadioPrimitive.Root
      className={cn("flex flex-col gap-2.5", className)}
      value={value}
      onValueChange={(val) => setValue(val)}
      aria-label="View density"
      ref={ref}
      {...props}
    >
      <div className="flex items-center gap-2">
        {options.map((option) => (
          <RadioPrimitive.Item
            key={option.value}
            className={variance()}
            value={option.value}
            id={option.value}
          >
            <Label>{option.label}</Label>
          </RadioPrimitive.Item>
        ))}
      </div>
    </RadioPrimitive.Root>
  );
});
Radio.displayName = "Radio";

export { Radio };
