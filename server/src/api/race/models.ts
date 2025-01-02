import {z} from "zod";

export const Stat = z.object({
    min: z.number(),
    max: z.number(),
    current: z.number().optional(),
});

export const StatBlock = z.object({
    str: Stat,
    con: Stat,
    siz: Stat,
    int: Stat,
    pow: Stat,
    dex: Stat,
    chr: Stat,
});

export const CreateRaceSchema = z.object({
    body: z.object({
        name: z.string(),
        stats: StatBlock.optional(),
        advantages: z.array(z.string()).optional(),
        cost: z.number().optional(),
        move: z.number().optional(),
        languageIds: z.array(z.string()).optional(),
        languages: z.any().optional(),
        special: z.any().optional()
    })
});

export const UpdateRaceSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        stats: StatBlock.optional(),
        advantages: z.array(z.string()).optional(),
        cost: z.number().optional(),
        move: z.number().optional(),
        languageIds: z.array(z.string()).optional(),
        special: z.any().optional()
    })
});
