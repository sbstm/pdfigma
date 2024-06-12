import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    tanggal_lahir: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    jk: type === 'sign-in' ? z.string().optional() : z.enum(['Laki-laki', 'Perempuan']),
    // both
    email: z.string().email(),
    password: z.string().min(8),
  })
