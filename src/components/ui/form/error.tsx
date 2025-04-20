/** @format */

import { Link } from "../link";

export type ErrorProps = {
  errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div className=" flex justify-between">
      <div
        role="alert"
        aria-label={errorMessage}
        className="pl-[15px] leading-7 max-w-[300px] text-sm font-light text-red-500"
      >
        {errorMessage}
      </div>
    </div>
  );
};
