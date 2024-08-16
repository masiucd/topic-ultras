import {relations} from "drizzle-orm";
import {index, integer, pgTable, varchar} from "drizzle-orm/pg-core";

import {users} from "./users";

export let languages = pgTable(
  "languages",
  {
    userId: integer("user_id")
      .primaryKey()
      .notNull()
      .references(() => users.id),
    language: varchar("language", {length: 100}),
    code: varchar("code", {length: 10}),
  },
  (table) => ({
    languageIndex: index("language_index").on(table.language),
    codeIndex: index("code_index").on(table.code),
  })
);

export let languageRelations = relations(languages, ({many}) => ({
  user: many(users),
}));
