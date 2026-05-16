import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const limitString = (str: string, limit: number) => {
  if (str.length > limit) {
    return str.slice(0, limit) + '..';
  }
  return str;
}
