import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const buildCloudinaryUrl = (publidId: string) => {
  const cloudname = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME!;
  const baseUrl = `https://res.cloudinary.com/${cloudname}/image/upload/`;
  return baseUrl + publidId;
};

export const delay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatMins = (minutes: number) => {
  if (typeof minutes !== "number" || isNaN(minutes)) {
    return "NaN";
  }

  if (minutes < 0) {
    return "NaN";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  } else {
    return `${hours}g ${remainingMinutes}min`;
  }
};
