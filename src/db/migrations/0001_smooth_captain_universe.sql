ALTER TABLE "sessions" ADD COLUMN "expires" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN IF EXISTS "expires_at";