import {
  decimal,
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export let food = pgTable("foods", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", {length: 100}).notNull(),
  createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
});
