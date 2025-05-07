/** @format */

import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react"; // lucide 아이콘 또는 이미지로 대체 가능
import { cn } from "@/utils/cn";

import { FieldWrapperPassThroughProps } from "./field-wrapper";

type Option = Record<string, string>; //어떤 구조든 상관이 없음

interface SelectFieldProps extends FieldWrapperPassThroughProps {
  options: Option[];
  labelkey?: string | number;
  value?: string | number; // 👈 이걸 추가

  valuekey?: string | number;
  defaultValue?: string | number;
  className?: string;
  onChange?: (value: string | number) => void;

  registration?: Partial<UseFormRegisterReturn>;
}

//여기서 선택된게 다른 select에도 영향을 준다.
export const Select = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      value,
      options = [],
      labelkey = "label",
      valuekey = "value",
      onChange,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    // const [selected, setSelected] = React.useState<string | number>(
    //   defaultValue ?? options[0]?.[labelkey] ?? ""
    // );

    const handleSelect = (value: string | number) => {
      onChange?.(value); // 상태는 바깥에서 관리
      setIsOpen(false);
    };
    const selectedLabel =
      options.find((option) => option[labelkey] === value)?.[valuekey] ?? value;

    console.log(labelkey, options);
    return (
      // <FieldWrapper label={label} error={error}>
      <div
        className={cn("w-[200px] flex items-center relative", className)}
        ref={ref}
      >
        <div
          className="flex items-center justify-between w-full h-[50px] px-4 rounded-md bg-white border border-gray-300 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-sm text-gray-700">{selectedLabel}</span>
          <ChevronDown className="w-4 h-4 text-black" />
        </div>

        {isOpen && (
          <div className="absolute left-0 top-full mt-1 overflow-y-auto w-full max-h-[200px] rounded-md bg-white border border-gray-300 shadow-md z-10">
            {options.map((option) => (
              <div
                defaultValue={value}
                key={Number(option[labelkey])}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option[valuekey])}
              >
                {option[valuekey]}
              </div>
            ))}
          </div>
        )}
      </div>
      // </FieldWrapper>
    );
  }
);

Select.displayName = "Select";
