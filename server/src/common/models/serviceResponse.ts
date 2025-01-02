import {z} from "zod";

export const ServiceResponseSchema = z.object({
    message: z.string(),
    responseObject: z.any().optional(),
});

export type ServiceResponse = z.infer<typeof ServiceResponseSchema>