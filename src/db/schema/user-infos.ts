import {relations} from "drizzle-orm";
import {integer, pgTable, text, varchar} from "drizzle-orm/pg-core";

import {users} from "./users";

export let userInfos = pgTable("user_infos", {
  userId: integer("user_id")
    .primaryKey()
    .notNull()
    .references(() => users.id),
  about: text("about"),
  location: text("location"),
  phone: varchar("phone", {length: 30}),
  city: varchar("city", {length: 100}),
  country: varchar("country", {length: 100}),
});

export let userInfosRelations = relations(userInfos, ({one}) => ({
  user: one(users, {
    fields: [userInfos.userId],
    references: [users.id],
  }),
}));
