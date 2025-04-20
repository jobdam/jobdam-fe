/** @format */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//예시
//<div className={`btn ${isActive ? 'btn-primary' : ''}`} />

// <div className={cn('btn', isActive && 'btn-primary')} />
