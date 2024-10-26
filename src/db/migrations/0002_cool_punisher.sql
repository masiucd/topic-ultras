CREATE TABLE IF NOT EXISTS "slugs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"object_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "slugs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "slug_index" ON "slugs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_object_id_index" ON "slugs" USING btree ("object_id");