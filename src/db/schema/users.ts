// import {relations} from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export let users = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    firstName: varchar("first_name", {length: 100}).notNull(),
    lastName: varchar("last_name", {length: 100}).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", {length: 200}).notNull().unique(),
    password: varchar("password", {length: 200}).notNull(),
    admin: boolean("admin").notNull().default(false),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
    // updatedAt: timestamp("updated_at", {mode: "string"})
    //   .defaultNow()
    //   .$onUpdate(() => new Date().toISOString()),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  })
);
