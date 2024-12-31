import {relations} from "drizzle-orm";
import {integer, pgEnum, pgTable, varchar} from "drizzle-orm/pg-core";
import {users} from "./users";

export let genderEnum = pgEnum("gender", ["male", "female"]);

export type Gender = (typeof genderEnum.enumValues)[number];

export let userInfos = pgTable("user_infos", {
  id: integer("id")
    .primaryKey()
    .references(() => users.id)
    .notNull(), // A user info belongs to a user. Users id is the reference and the primary key for user_infos
  height: integer("height"),
  weight: integer("weight"),
  firstName: varchar("first_name", {length: 100}),
  lastName: varchar("last_name", {length: 100}),
  age: integer("age"),
  gender: genderEnum(),
});

export let userInfosRelations = relations(userInfos, ({one}) => ({
  // A user info belongs to a user - one to one relationship
  users: one(users, {fields: [userInfos.id], references: [users.id]}),
}));
