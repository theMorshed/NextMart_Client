import { z } from "zod";

export const registerValidationSchema = z.object({
    name: z
        .string({required_error: 'Name is required'})
        .min(2, 'Name must be between 2 to 50 characters')
        .max(50, 'Name must be between 2 to 50 characters'),
    email: z
        .string({required_error: 'Email is required'})
        .email('Invalid email address'),
    password: z
        .string({required_error: 'Password is required'})
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
        .string({required_error: 'Confirm Password is required'})
})