/** @format */

import * as React from "react";
import * as RadioPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
const RadioGroup = ({ options, className }) => {
  const [value, setValue] = React.useState(() => options[0]?.value || "");
  const variance = cva(
    "h-[45px] w-[120px] border-[1px] border-[#000] shrink-0 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 transition"
  );

  return (
    <>
      <RadioPrimitive.Root
        className="flex flex-col gap-2.5"
        // defaultValue={value}
        value={value}
        onValueChange={(val) => setValue(val)}
        aria-label="View density"
      >
        <div className="flex items-center">
          {options.map((option) => (
            <div className="flex items-center" key={option.value}>
              <RadioPrimitive.Item
                className={cn(variance(), className)}
                value={option.value}
                id={option.value}
              >
                <label htmlFor={option.value} className="text-gray-800">
                  {option.label}
                </label>
              </RadioPrimitive.Item>
            </div>
          ))}
        </div>
      </RadioPrimitive.Root>
    </>
  );
};

export { RadioGroup };
