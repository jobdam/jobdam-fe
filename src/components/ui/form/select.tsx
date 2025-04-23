/** @format */

import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react"; // lucide 아이콘 또는 이미지로 대체 가능
import { cn } from "@/utils/cn";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

type Option = {
  label: React.ReactNode;
  value: string | number;
};

interface SelectFieldProps extends FieldWrapperPassThroughProps {
  options: Option[];
  defaultValue?: string | number;
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

export const Select = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    { label, options = [], defaultValue, error, className, registration },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | number>(
      defaultValue ?? options[0]?.value ?? ""
    );

    const handleSelect = (value: string | number) => {
      setSelected(value);
      setIsOpen(false);

      // react-hook-form onChange 수동 호출
      registration?.onChange?.({ target: { value, name: registration?.name } });
    };

    const selectedLabel =
      options.find((option) => option.value === selected)?.label ?? selected;

    return (
      <FieldWrapper label={label} error={error}>
        <div className={cn("relative w-[200px]", className)} ref={ref}>
          <div
            className="flex items-center justify-between w-full h-[50px] px-4 rounded-md bg-white border border-gray-300 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="text-sm text-gray-700">{selectedLabel}</span>
            <ChevronDown className="w-4 h-4 text-black" />
          </div>

          {isOpen && (
            <div className="absolute left-0 top-full mt-1 w-full rounded-md bg-white border border-gray-300 shadow-md z-10">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </FieldWrapper>
    );
  }
);

Select.displayName = "Select";
