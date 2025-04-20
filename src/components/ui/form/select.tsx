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

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
};
export const Select = ({
  label,
  options = [],
  defaultValue,
  error,
  showLink,
  className,
  registration,
}: {
  options: string[];
  defaultValue?: string;
}) => {
  //   const { label, options, error, className, defaultValue, registration } =
  //     props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(
    defaultValue ?? (options.length > 0 ? String(options[0]) : "")
  );
  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);

    // 폼 등록 이벤트 수동 호출
    registration?.onChange?.({ target: { value, name: registration?.name } });
  };
  return (
    <FieldWrapper label={label} error={error}>
      <div className="relative w-[200px]">
        <div
          className="flex items-center justify-between w-full h-[50px] px-4 rounded-md bg-white border border-gray-300 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-sm text-gray-700">{selected}</span>
          <ChevronDown className="w-4 h-4 text-black" />
          {/* 이미지 사용 시 <img src="/arrow.png" className="w-4 h-4" /> */}
        </div>

        {isOpen && (
          <div className="absolute left-0 top-full mt-1 w-full rounded-md bg-white border border-gray-300 shadow-md z-10">
            {options.map((option) => (
              <div
                key={option}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(String(option))}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};
