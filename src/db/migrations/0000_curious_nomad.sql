CREATE TABLE IF NOT EXISTS "favorite_foods" (
	"user_id" integer NOT NULL,
	"food_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "food_nutrients" (
	"food_id" integer PRIMARY KEY NOT NULL,
	"calories" numeric(12, 2) NOT NULL,
	"fat" numeric(12, 2) NOT NULL,
	"protein" numeric(12, 2) NOT NULL,
	"carbs" numeric(12, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "food_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "foods" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"slug" varchar(100) NOT NULL,
	"type_id" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "languages" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"language" varchar(100),
	"code" varchar(10)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(250) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_infos" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"about" text,
	"location" text,
	"phone" varchar(30),
	"city" varchar(100),
	"country" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(200) NOT NULL,
	"password" varchar(200) NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "food_nutrients" ADD CONSTRAINT "food_nutrients_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "foods" ADD CONSTRAINT "foods_type_id_food_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."food_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "languages" ADD CONSTRAINT "languages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_infos" ADD CONSTRAINT "user_infos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_index" ON "favorite_foods" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "food_index" ON "favorite_foods" USING btree ("food_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "food_type_name_index" ON "food_types" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "food_type_slug_index" ON "food_types" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "food_name_index" ON "foods" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_index" ON "foods" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "language_index" ON "languages" USING btree ("language");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "code_index" ON "languages" USING btree ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "users" USING btree ("email");