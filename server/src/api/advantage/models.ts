import {z} from "zod";

const AvantageRequirementType = z.enum([
    "stat",
    "skill",
    "tier",
    "power_pool",
    "race",
    "advantage",
    "power"
]);


export const Skill = z.union([
    z.literal("athletics"),
    z.literal("powers"),
    z.literal("combat"),
    z.literal("interaction"),
    z.literal("profession"),
    z.literal("lore"),
    z.literal("observation"),
    z.literal("appraise"),
    z.literal("insight"),
    z.literal("navigate"),
    z.literal("perception"),
    z.literal("arcana"),
    z.literal("nature"),
    z.literal("history"),
    z.literal("social"),
    z.literal("technology"),
    z.literal("chicanery"),
    z.literal("command"),
    z.literal("diplomacy"),
    z.literal("fast_talking"),
    z.literal("axes_and_picks"),
    z.literal("blade"),
    z.literal("bludgeoning"),
    z.literal("natural"),
    z.literal("projectile"),
    z.literal("shield"),
    z.literal("staff_weapons"),
    z.literal("divination"),
    z.literal("energy"),
    z.literal("life"),
    z.literal("mind"),
    z.literal("planar"),
    z.literal("acrobatics"),
    z.literal("dodge"),
    z.literal("pilot"),
    z.literal("stealth"),
]);

export const Power = z.union([
    z.literal("divination"),
    z.literal("energy"),
    z.literal("life"),
    z.literal("mind"),
    z.literal("planar"),
]);

export const StatName = z.union([
    z.literal("str"),
    z.literal("con"),
    z.literal("siz"),
    z.literal("int"),
    z.literal("pow"),
    z.literal("dex"),
    z.literal("chr"),
]);

const AdvantageRequirement = z.object({
    type: AvantageRequirementType,
    skill: Skill.optional(),
    power: Power.optional(),
    stat: StatName.optional(),
    raceId: z.string().optional(),
    advantageId: z.string().optional(),
    value: z.number().optional()
});

const AdvantageCategory = z.union([
    z.literal("Ally_Framework"),
    z.literal("Archetype"),
    z.literal("Armor"),
    z.literal("Body"),
    z.literal("Divine_Pacts"),
    z.literal("Epic_Archetypes"),
    z.literal("Golden_Path"),
    z.literal("Melee_Combat"),
    z.literal("Mind"),
    z.literal("Power"),
    z.literal("Ranged_Combat"),
    z.literal("Tactical"),
]);

export const CreateAdvantageSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        category: AdvantageCategory,
        raceIds: z.array(z.string()).optional(),
        requirements: z.array(AdvantageRequirement),
        cost: z.number(),
        special: z.string().optional(),
    })
});

export const UpdateAdvantageSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        category: AdvantageCategory,
        raceIds: z.array(z.string()).optional(),
        requirements: z.array(AdvantageRequirement),
        cost: z.number(),
        special: z.string().optional(),
    })
});