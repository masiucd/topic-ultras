import {config} from "dotenv";
import {expand} from "dotenv-expand";
import {ZodError, z} from "zod";

let stringBoolean = z.coerce
  .string()
  .transform((v) => v === "true")
  .default("false");

let envSchema = z.object({
  // biome-ignore lint/style/useNamingConvention: <explanation>
  NODE_ENV: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_HOST: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_USER: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_PASSWORD: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_NAME: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_PORT: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_URL: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_MIGRATION: stringBoolean,
  // biome-ignore lint/style/useNamingConvention: <explanation>
  DB_SEED: stringBoolean,
  // biome-ignore lint/style/useNamingConvention: <explanation>
  JWT_SECRET: z.string(),
  // biome-ignore lint/style/useNamingConvention: <explanation>
  REDIS_PORT: z.string(),
});

export type Env = z.infer<typeof envSchema>;

// Load environment variables
expand(config());

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Invalid environment variables:\n";
    for (let issue of error.issues) {
      message += `  - ${issue.message}\n`;
    }

    let e = new Error(message); // Create a new error
    e.stack = ""; // Remove stack trace
    throw e;
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export default envSchema.parse(process.env);
