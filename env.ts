import {config} from "dotenv";
import {expand} from "dotenv-expand";
import {z, ZodError} from "zod";

let stringBoolean = z.coerce
  .string()
  .transform((value) => value === "true")
  .default("false");

let envSchema = z.object({
  NODE_ENV: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string(),
  DB_URL: z.string(),
  DB_MIGRATION: stringBoolean,
  DB_SEED: stringBoolean,
});

export type EnvSchema = z.infer<typeof envSchema>;

expand(config()); // Load .env file

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Invalid environment variables:\n";
    error.issues.forEach((issue) => {
      message += `  - ${issue.message}\n`;
    });

    let e = new Error(message); // Create a new error
    e.stack = ""; // Remove stack trace
    throw e;
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export default envSchema.parse(process.env);
