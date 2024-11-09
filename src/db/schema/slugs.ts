import {relations} from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	serial,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import {foodCategories} from "./food-categories";
import {foodItems} from "./food-items";

export let slugs = pgTable(
	"slugs",
	{
		id: serial("id").primaryKey().notNull(),
		slug: varchar("slug", {length: 100}).unique().notNull(),
		objectId: integer("object_id").notNull(),
		createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
		updatedAt: timestamp("updated_at", {mode: "string"})
			.defaultNow()
			.$onUpdate(() => new Date().toISOString()),
	},
	(table) => ({
		slugIndex: uniqueIndex("slug_index").on(table.slug),
		objectIdIndex: index("slug_object_id_index").on(table.objectId),
	}),
);

export let slugsRelations = relations(slugs, ({one}) => ({
	foodItem: one(foodItems, {
		fields: [slugs.objectId],
		references: [foodItems.id],
	}),
	foodCategory: one(foodCategories, {
		fields: [slugs.objectId],
		references: [foodCategories.id],
	}),
}));
