import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind sınıflarını birleştirmek ve çakışmaları önlemek için yardımcı fonksiyon.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}