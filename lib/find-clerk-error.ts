import { clerkErrorsMap } from "@/maps";

export function findClerkError(key: string) {
  if (clerkErrorsMap.hasOwnProperty(key)) {
    return clerkErrorsMap[key];
  } else {
    return "Wystąpił błąd";
  }
}
