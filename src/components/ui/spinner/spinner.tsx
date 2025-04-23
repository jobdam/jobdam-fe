/** @format */

import styles from "./spinner.module.css";
import { cn } from "@/utils/cn"; // className 병합 유틸

export type SpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "primary";
  className?: string;
};

export const InterviewSpinner = () => {
  return (
    <img
      style={{ animationDuration: "5s" }}
      src="/Layer_1.svg"
      alt="loading spinner"
      width={100}
      height={100}
      className="w-24 h-24 animate-spin"
    />
  );
};
export const Spinner = ({
  size = "md",
  variant = "primary",
  className = "",
}: SpinnerProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          styles.spinner,
          styles[`size-${size}`],
          styles[`variant-${variant}`],
          className
        )}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  );
};
