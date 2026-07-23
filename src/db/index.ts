import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For Vite/Astro environments we use import.meta.env, but fallback to process.env
const connectionString = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.DATABASE_URL : process.env.DATABASE_URL) || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in environment variables. Please check your .env file.");
}

// Disable prefetch as it is often not supported for "Transaction" pool mode (used in serverless PostgreSQL like Supabase/Neon)
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle({ client, schema });
