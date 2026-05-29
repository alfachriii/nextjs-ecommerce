import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type UserData = {
   email: string;
   profileUrl?: string;
} | null;

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const limitString = (str: string, limit: number) => {
   if (str.length > limit) {
      return str.slice(0, limit) + "..";
   }
   return str;
};

export const generateImageUrl = (url: string, width: number) => {
   return `${url}?w=${width}&auto=format`;
};

export const getMinMaxPrice = (selectedPrice: string) => {
   const [min, max] = selectedPrice.split("-").map(Number);
   return [min, max];
};

export const dateFormatter = (dateStr: string) => {
   const date = new Date(dateStr);

   return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "2-digit",
   }).format(date);
};
