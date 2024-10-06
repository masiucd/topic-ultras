DROP INDEX IF EXISTS "food_name_index";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "food_name_index" ON "food_items" USING btree ("name");--> statement-breakpoint
ALTER TABLE "food_items" ADD CONSTRAINT "food_items_name_unique" UNIQUE("name");