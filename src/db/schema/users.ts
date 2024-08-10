import {relations} from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {favoriteFoods} from "./favorite-foods";

export let users = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    firstName: varchar("first_name", {length: 100}).notNull(),
    lastName: varchar("last_name", {length: 100}).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", {length: 200}).notNull().unique(),
    password: varchar("password", {length: 200}).notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  })
);

export let userRelations = relations(users, ({many}) => ({
  favoriteFoods: many(favoriteFoods),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
