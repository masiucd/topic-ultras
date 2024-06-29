import {z} from "zod";

export let unitSchema = z.union([z.literal("g"), z.literal("oz")]);

export type Unit = z.infer<typeof unitSchema>;
