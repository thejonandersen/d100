import {z} from "zod";

export const CreateLanguageSchema = z.object({
    body: z.object({
        name: z.string(),
    })
});
