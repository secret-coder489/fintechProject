 import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(6, 'Please enter a valid password with at least 8 characters').regex(/[A-Z]/, 'Must include an uppercase letter'),
})