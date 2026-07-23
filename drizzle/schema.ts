import { pgTable, pgSchema, varchar, text, timestamp, jsonb, unique, serial, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const staging = pgSchema("staging");
export const production = pgSchema("production");


export const postsInStaging = staging.table("posts", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	title: text().default('Untitled').notNull(),
	description: text().default(').notNull(),
	pubDate: timestamp("pub_date", { mode: 'string' }).defaultNow().notNull(),
	updatedDate: timestamp("updated_date", { mode: 'string' }),
	heroImage: text("hero_image"),
	speaker: text(),
	date: text(),
	themes: jsonb(),
	body: text().notNull(),
	churchName: text("church_name"),
	fileName: text("file_name"),
});

export const sermonsInStaging = staging.table("sermons", {
	id: serial().primaryKey().notNull(),
	fileName: text("file_name"),
	title: text(),
	speaker: text(),
	date: date(),
	sections: jsonb(),
	theme: jsonb().array(),
	pubDate: timestamp("pub_date", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	church: text(),
}, (table) => [
	unique("sermons_file_name_key").on(table.fileName),
]);

export const sermonsInProduction = production.table("sermons", {
	id: serial().primaryKey().notNull(),
	fileName: text("file_name"),
	title: text(),
	speaker: text(),
	date: date(),
	sections: jsonb(),
	theme: jsonb().array(),
	pubDate: timestamp("pub_date", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	church: text(),
}, (table) => [
	unique("sermons_file_name_key").on(table.fileName),
]);
