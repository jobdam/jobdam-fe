/** @format */

import { Link as RouterLink, LinkProps } from "react-router";

import { cn } from "@/utils/cn";

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={cn("text-slate-600 text-sm", className)} {...props}>
      {children}
    </RouterLink>
  );
};
