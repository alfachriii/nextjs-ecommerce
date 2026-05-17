import { clsx, type ClassValue } from "clsx"
import { minify } from "next/dist/build/swc";
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

export const generateImageUrl = (url: string, width: number) => {
  return `${url}?w=${width}&auto=format`
}


export const getMinMaxPrice = (selectedPrice: string) => {
  const [min, max] = selectedPrice.split("-").map(Number);
  return [min, max]
}
