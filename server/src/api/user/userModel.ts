import {z} from "zod";
import {withObjectIdValidation} from "@/common/utils/validators";

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = withObjectIdValidation(z.object({
    params: z.object({id: z.string()}),
}));
