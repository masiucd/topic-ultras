DROP INDEX IF EXISTS "name_index";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "food_category_name_index" ON "food_categories" USING btree ("name");--> statement-breakpoint
ALTER TABLE "food_categories" ADD CONSTRAINT "food_categories_name_unique" UNIQUE("name");