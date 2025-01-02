import z from "zod";

const minLengthErrorMessage = "Password must be at least 8 characters";
const maxLengthErrorMessage = "Password must be at maximum 20 characters";
const uppercaseErrorMessage = "Password must contain one uppercase character";
const lowercaseErrorMessage = "Password must contain one lowercase character";
const numberErrorMessage = "Password must contain one number";
const specialCharacterErrorMessage = "Password must contain one of the following characters: !@#$%^&*";

export const passwordSchema = z
    .string()
    .min(8, {message: minLengthErrorMessage})
    .max(20, {message: maxLengthErrorMessage})
    .refine((password) => /[A-Z]/.test(password), {
        message: uppercaseErrorMessage,
    })
    .refine((password) => /[a-z]/.test(password), {
        message: lowercaseErrorMessage,
    })
    .refine((password) => /[0-9]/.test(password), {message: numberErrorMessage})
    .refine((password) => /[!@#$%^&*]/.test(password), {
        message: specialCharacterErrorMessage,
    });