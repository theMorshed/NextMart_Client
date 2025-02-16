import { z } from "zod";

export const loginValidationSchema = z.object({
    email: z.string({required_error: 'Email is required'}).email(),
    password: z
        .string({required_error: 'Password is required'})
        .min(1, 'Password must be at least 1 characters'),
})