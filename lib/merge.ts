import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export default function merge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}