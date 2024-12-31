import {relations} from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import {favoriteFoods} from "./favorite-foods";
import {foodItems} from "./food-items";
import {sessions} from "./sessions";

export let users = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    email: varchar("email", {length: 120}).notNull(),
    password: varchar("password", {length: 200}).notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "string"})
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (t) => [uniqueIndex("user_email_index").on(t.email)]
);

export let usersRelations = relations(users, ({many}) => ({
  // A user has many sessions - one to many relationship
  sessions: many(sessions),
  // A user has can have many food items - many to many relationship
  foodItems: many(foodItems),
  // A user can have many favorite foods - many to many relationship
  favoriteFoods: many(favoriteFoods),
}));
