import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tags_category" AS ENUM('speciality', 'tool', 'aesthetic');
  CREATE TABLE "project_blocks_insight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "project_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_text" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "project_blocks_visual" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visual_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "project" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"blurb" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "project_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_tags_category",
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "project_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "project_blocks_insight" ADD CONSTRAINT "project_blocks_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_blocks_link" ADD CONSTRAINT "project_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_blocks_visual" ADD CONSTRAINT "project_blocks_visual_visual_id_media_id_fk" FOREIGN KEY ("visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "project_blocks_visual" ADD CONSTRAINT "project_blocks_visual_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_rels" ADD CONSTRAINT "project_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_rels" ADD CONSTRAINT "project_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "project_blocks_insight_order_idx" ON "project_blocks_insight" USING btree ("_order");
  CREATE INDEX "project_blocks_insight_parent_id_idx" ON "project_blocks_insight" USING btree ("_parent_id");
  CREATE INDEX "project_blocks_insight_path_idx" ON "project_blocks_insight" USING btree ("_path");
  CREATE INDEX "project_blocks_link_order_idx" ON "project_blocks_link" USING btree ("_order");
  CREATE INDEX "project_blocks_link_parent_id_idx" ON "project_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "project_blocks_link_path_idx" ON "project_blocks_link" USING btree ("_path");
  CREATE INDEX "project_blocks_visual_order_idx" ON "project_blocks_visual" USING btree ("_order");
  CREATE INDEX "project_blocks_visual_parent_id_idx" ON "project_blocks_visual" USING btree ("_parent_id");
  CREATE INDEX "project_blocks_visual_path_idx" ON "project_blocks_visual" USING btree ("_path");
  CREATE INDEX "project_blocks_visual_visual_idx" ON "project_blocks_visual" USING btree ("visual_id");
  CREATE INDEX "project_updated_at_idx" ON "project" USING btree ("updated_at");
  CREATE INDEX "project_created_at_idx" ON "project" USING btree ("created_at");
  CREATE INDEX "project_rels_order_idx" ON "project_rels" USING btree ("order");
  CREATE INDEX "project_rels_parent_idx" ON "project_rels" USING btree ("parent_id");
  CREATE INDEX "project_rels_path_idx" ON "project_rels" USING btree ("path");
  CREATE INDEX "project_rels_tags_id_idx" ON "project_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "tags_name_idx" ON "tags" USING btree ("name");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_project_id_idx" ON "payload_locked_documents_rels" USING btree ("project_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "project_blocks_insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "project_blocks_link" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "project_blocks_visual" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "project" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "project_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tags" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "project_blocks_insight" CASCADE;
  DROP TABLE "project_blocks_link" CASCADE;
  DROP TABLE "project_blocks_visual" CASCADE;
  DROP TABLE "project" CASCADE;
  DROP TABLE "project_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_project_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tags_fk";
  
  DROP INDEX "payload_locked_documents_rels_project_id_idx";
  DROP INDEX "payload_locked_documents_rels_tags_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "project_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tags_id";
  DROP TYPE "public"."enum_tags_category";`)
}
