/** @format */

import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react"; // lucide 아이콘 또는 이미지로 대체 가능
import { cn } from "@/utils/cn";

import { FieldWrapperPassThroughProps } from "./field-wrapper";

interface Option {
  value: string | number; // 예시: value는 문자열
  label: string | number; // 예시: label은 문자열
} //어떤 구조든 상관이 없음

interface SelectFieldProps extends FieldWrapperPassThroughProps {
  options: Option[];
  labelkey?: string | number;
  value?: string | number; // 👈 이걸 추가

  valuekey?: string | number;
  defaultValue?: string | number;
  className?: string;
  onChange?: (value: string | number) => void;
  edit?: boolean;

  registration?: Partial<UseFormRegisterReturn>;
}

//여기서 선택된게 다른 select에도 영향을 준다.
export const Select = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      value,
      edit,
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
      options.find((option) => option[valuekey] === value)?.[labelkey] ?? value;

    return (
      // <FieldWrapper label={label} error={error}>
      <div
        className={cn("w-[200px] flex items-center relative", className)}
        ref={ref}
      >
        <div
          className={cn(
            "flex items-center justify-between w-full h-[60px] px-4 rounded-[10px] bg-white border border-gray-300 cursor-pointer",
            edit && "border-[#488fff]"
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={cn("text-[18px] text-gray-700", edit && "text-[18px]")}
          >
            {selectedLabel}
          </span>
          <ChevronDown className="w-4 h-4 text-black" />
        </div>

        {isOpen && (
          <div
            className="absolute left-0 top-full mt-1 overflow-y-auto w-full
           max-h-[200px] rounded-md bg-white border border-gray-300 shadow-md z-10"
          >
            {options.map((option, index) => (
              <div
                defaultValue={value}
                key={option[valuekey] ?? index}
                className="px-4 py-2 text-[14px] hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option[valuekey])}
              >
                {option[labelkey]}
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
