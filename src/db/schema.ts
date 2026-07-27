import { pgSchema, text, timestamp, varchar, jsonb, serial, date, unique } from "drizzle-orm/pg-core";

// Detect environment, fallback to 'staging'
// Astro client uses import.meta.env, Node uses process.env
const getEnv = () => {
  if (typeof process !== 'undefined' && process.env && process.env.ENVIRONMENT) {
    return process.env.ENVIRONMENT;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.ENVIRONMENT) {
    return import.meta.env.ENVIRONMENT;
  }
  return 'staging';
};

const env = getEnv();
const schemaName = env === 'production' ? 'production' : 'staging';

export const appSchema = pgSchema(schemaName);

export const posts = appSchema.table("posts", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  title: text("title").notNull().default("Untitled"),
  description: text("description").notNull().default(""),
  pubDate: timestamp("pub_date", { mode: "date" }).notNull().defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date" }),
  heroImage: text("hero_image"),
  speaker: text("speaker"),
  date: text("date"),
  themes: jsonb("themes").$type<string[]>(),
  body: text("body").notNull(),
  churchName: text("church_name"),
  fileName: text("file_name"),
});

export interface Judgement {
  model: string;
  score: number;
  content: string;
  summary?: string;
  strengths?: string[];
  detailed_evaluation?: string;
  areas_for_improvement?: string[];
  [key: string]: any;
}

export const sermons = appSchema.table("sermons", {
  id: serial("id").primaryKey().notNull(),
  fileName: text("file_name"),
  title: text("title"),
  speaker: text("speaker"),
  date: date("date"),
  sections: jsonb("sections"),
  theme: jsonb("theme").array(),
  pubDate: timestamp("pub_date", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  church: text("church"),
  judgements: jsonb("judgements").$type<Judgement[]>(),
}, (table) => [
  unique("sermons_file_name_key").on(table.fileName),
]);
