import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export const authFormSchema = () =>
  z.object({
    firstName: z.string().optional() , 
    lastName: z.string().optional() , 
    tanggal_lahir: z.string().optional() , 
    jk: z.enum(['Laki-laki', 'Perempuan']).optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })

export const mapelFormSchema = () => z.object({
  name: z.string().min(3),
  kelas: z.string(),
  deskripsi: z.string().min(3),
  image_url: z.string().optional(),
})

export const submateriFormSchema = () => z.object({
  name: z.string().min(3),
  link_buku: z.string().url(),
  link_figma: z.string().url(),
  embed_code: z.string().optional(),
})

export const nilaiFormSchema = () => z.object({
  value: z.array(z.number()),
  persentase: z.array(z.number()),
  name: z.array(z.string()),
  guru: z.string(),
  kelas: z.string(),
  final: z.number(),
  user: z.string(),
  matapelajaran: z.string(),
})