import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "project_blocks_insight" RENAME TO "projects_blocks_insight";
  ALTER TABLE "project_blocks_link" RENAME TO "projects_blocks_link";
  ALTER TABLE "project_blocks_visual" RENAME TO "projects_blocks_visual";
  ALTER TABLE "project" RENAME TO "projects";
  ALTER TABLE "project_rels" RENAME TO "projects_rels";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "project_id" TO "projects_id";
  ALTER TABLE "projects_blocks_insight" DROP CONSTRAINT "project_blocks_insight_parent_id_fk";
  
  ALTER TABLE "projects_blocks_link" DROP CONSTRAINT "project_blocks_link_parent_id_fk";
  
  ALTER TABLE "projects_blocks_visual" DROP CONSTRAINT "project_blocks_visual_visual_id_media_id_fk";
  
  ALTER TABLE "projects_blocks_visual" DROP CONSTRAINT "project_blocks_visual_parent_id_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "project_rels_parent_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "project_rels_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_project_fk";
  
  DROP INDEX "project_blocks_insight_order_idx";
  DROP INDEX "project_blocks_insight_parent_id_idx";
  DROP INDEX "project_blocks_insight_path_idx";
  DROP INDEX "project_blocks_link_order_idx";
  DROP INDEX "project_blocks_link_parent_id_idx";
  DROP INDEX "project_blocks_link_path_idx";
  DROP INDEX "project_blocks_visual_order_idx";
  DROP INDEX "project_blocks_visual_parent_id_idx";
  DROP INDEX "project_blocks_visual_path_idx";
  DROP INDEX "project_blocks_visual_visual_idx";
  DROP INDEX "project_updated_at_idx";
  DROP INDEX "project_created_at_idx";
  DROP INDEX "project_rels_order_idx";
  DROP INDEX "project_rels_parent_idx";
  DROP INDEX "project_rels_path_idx";
  DROP INDEX "project_rels_tags_id_idx";
  DROP INDEX "payload_locked_documents_rels_project_id_idx";
  ALTER TABLE "projects_blocks_insight" ADD CONSTRAINT "projects_blocks_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_link" ADD CONSTRAINT "projects_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_visual" ADD CONSTRAINT "projects_blocks_visual_visual_id_media_id_fk" FOREIGN KEY ("visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_visual" ADD CONSTRAINT "projects_blocks_visual_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_blocks_insight_order_idx" ON "projects_blocks_insight" USING btree ("_order");
  CREATE INDEX "projects_blocks_insight_parent_id_idx" ON "projects_blocks_insight" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_insight_path_idx" ON "projects_blocks_insight" USING btree ("_path");
  CREATE INDEX "projects_blocks_link_order_idx" ON "projects_blocks_link" USING btree ("_order");
  CREATE INDEX "projects_blocks_link_parent_id_idx" ON "projects_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_link_path_idx" ON "projects_blocks_link" USING btree ("_path");
  CREATE INDEX "projects_blocks_visual_order_idx" ON "projects_blocks_visual" USING btree ("_order");
  CREATE INDEX "projects_blocks_visual_parent_id_idx" ON "projects_blocks_visual" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_visual_path_idx" ON "projects_blocks_visual" USING btree ("_path");
  CREATE INDEX "projects_blocks_visual_visual_idx" ON "projects_blocks_visual" USING btree ("visual_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_tags_id_idx" ON "projects_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_blocks_insight" RENAME TO "project_blocks_insight";
  ALTER TABLE "projects_blocks_link" RENAME TO "project_blocks_link";
  ALTER TABLE "projects_blocks_visual" RENAME TO "project_blocks_visual";
  ALTER TABLE "projects" RENAME TO "project";
  ALTER TABLE "projects_rels" RENAME TO "project_rels";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "projects_id" TO "project_id";
  ALTER TABLE "project_blocks_insight" DROP CONSTRAINT "projects_blocks_insight_parent_id_fk";
  
  ALTER TABLE "project_blocks_link" DROP CONSTRAINT "projects_blocks_link_parent_id_fk";
  
  ALTER TABLE "project_blocks_visual" DROP CONSTRAINT "projects_blocks_visual_visual_id_media_id_fk";
  
  ALTER TABLE "project_blocks_visual" DROP CONSTRAINT "projects_blocks_visual_parent_id_fk";
  
  ALTER TABLE "project_rels" DROP CONSTRAINT "projects_rels_parent_fk";
  
  ALTER TABLE "project_rels" DROP CONSTRAINT "projects_rels_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_projects_fk";
  
  DROP INDEX "projects_blocks_insight_order_idx";
  DROP INDEX "projects_blocks_insight_parent_id_idx";
  DROP INDEX "projects_blocks_insight_path_idx";
  DROP INDEX "projects_blocks_link_order_idx";
  DROP INDEX "projects_blocks_link_parent_id_idx";
  DROP INDEX "projects_blocks_link_path_idx";
  DROP INDEX "projects_blocks_visual_order_idx";
  DROP INDEX "projects_blocks_visual_parent_id_idx";
  DROP INDEX "projects_blocks_visual_path_idx";
  DROP INDEX "projects_blocks_visual_visual_idx";
  DROP INDEX "projects_updated_at_idx";
  DROP INDEX "projects_created_at_idx";
  DROP INDEX "projects_rels_order_idx";
  DROP INDEX "projects_rels_parent_idx";
  DROP INDEX "projects_rels_path_idx";
  DROP INDEX "projects_rels_tags_id_idx";
  DROP INDEX "payload_locked_documents_rels_projects_id_idx";
  ALTER TABLE "project_blocks_insight" ADD CONSTRAINT "project_blocks_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_blocks_link" ADD CONSTRAINT "project_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_blocks_visual" ADD CONSTRAINT "project_blocks_visual_visual_id_media_id_fk" FOREIGN KEY ("visual_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "project_blocks_visual" ADD CONSTRAINT "project_blocks_visual_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_rels" ADD CONSTRAINT "project_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_rels" ADD CONSTRAINT "project_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "payload_locked_documents_rels_project_id_idx" ON "payload_locked_documents_rels" USING btree ("project_id");`)
}
