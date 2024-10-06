import {relations} from "drizzle-orm";
import {integer, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";
import {users} from "./users";

export let userInfos = pgTable("user_infos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  age: integer("age"),
  gender: text("gender"),
  height: integer("height"),
  weight: integer("weight"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at", {mode: "string"})
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export let userInfosRelations = relations(userInfos, ({one}) => ({
  // user info belongs to a user
  user: one(users, {
    fields: [userInfos.userId],
    references: [users.id],
  }),
}));
