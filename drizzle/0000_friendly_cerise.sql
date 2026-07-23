-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "staging";
--> statement-breakpoint
CREATE SCHEMA "production";
--> statement-breakpoint
CREATE TABLE "staging"."posts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'Untitled' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"pub_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp,
	"hero_image" text,
	"speaker" text,
	"date" text,
	"themes" jsonb,
	"body" text NOT NULL,
	"church_name" text,
	"file_name" text
);
--> statement-breakpoint
CREATE TABLE "staging"."sermons" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" text,
	"title" text,
	"speaker" text,
	"date" date,
	"sections" jsonb,
	"theme" jsonb[],
	"pub_date" timestamp with time zone DEFAULT now() NOT NULL,
	"church" text,
	CONSTRAINT "sermons_file_name_key" UNIQUE("file_name")
);
--> statement-breakpoint
CREATE TABLE "production"."sermons" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" text,
	"title" text,
	"speaker" text,
	"date" date,
	"sections" jsonb,
	"theme" jsonb[],
	"pub_date" timestamp with time zone DEFAULT now() NOT NULL,
	"church" text,
	CONSTRAINT "sermons_file_name_key" UNIQUE("file_name")
);

*/