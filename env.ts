import {config} from "dotenv";
import {expand} from "dotenv-expand";
import {z} from "zod";

let stringBoolean = z.coerce
  .string()
  .transform((v) => v === "true")
  .default("false");

let envSchema = z.object({
  NODE_ENV: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string(),
  REDIS_PORT: z.string(),
  DB_URL: z.string(),
  JWT_SECRET: z.string(),
  SERVER_PORT: z.string(),
  DB_MIGRATION: stringBoolean,
  DB_SEED: stringBoolean,
});

// Load environment variables
expand(config());

export type Env = z.infer<typeof envSchema>;

let {success, data, error} = envSchema.safeParse(process.env);
if (!success) {
  console.error(error?.errors);
  process.exit(1);
}

export const env = data as Env;
