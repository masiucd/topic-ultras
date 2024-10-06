import {relations} from "drizzle-orm";
import {integer, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";
import {users} from "./users";

export let userAddresses = pgTable("user_addresses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {onDelete: "cascade"}),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at", {mode: "string"})
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export let userAddressesRelations = relations(userAddresses, ({one}) => ({
  // user address belongs to a user
  user: one(users, {
    fields: [userAddresses.userId],
    references: [users.id],
  }),
}));
