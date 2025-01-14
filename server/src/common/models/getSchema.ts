  import {z} from "zod";

const GetSchema = z.object({
    limit: z.number().optional(),
    page: z.number().optional(),
    fields: z.string().optional(),
    include: z.string().optional(),
    orderBy: z.array(z.string()).optional(),
});

export type GetQuery = z.infer<typeof GetSchema>

export default GetSchema;
