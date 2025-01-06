import {defineConfig} from "drizzle-kit";
import {env} from "./env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/.server/db/schema/index.ts",
  out: "./src/app/.server/db/migrations",
  dbCredentials: {
    url: env.DB_URL,
  },
  breakpoints: true,
  verbose: env.NODE_ENV === "development", // Log all queries in development
  strict: true, // Enable strict mode
});
