import {z} from "zod";

export const LoginSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string(),
    })
});

export const RegisterSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string(),
        name: z.string().optional(),
        confirmPassword: z.string()
    })
});