import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fromFileSizeToReadable(size: number) {
  const units = ["B", "KB", "MB", "GB", "TB"]

  let unitIndex = 0
  while (size >= 1024) {
    size /= 1024
    unitIndex++
  }

  const hasDot = size.toString().includes(".")

  return `${size.toFixed(hasDot ? 2 : 0)} ${units[unitIndex]}`
}

export const formatCurrency = (value: number = 0) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })
}
