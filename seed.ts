import * as dotenv from 'dotenv';
dotenv.config();
import { db } from './src/db';
import { posts } from './src/db/schema';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

async function seed() {
  const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');
  const files = await fs.readdir(contentDir);
  
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    
    const filePath = path.join(contentDir, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(content);
    
    const slug = file.replace(/\.mdx?$/, '');
    
    await db.insert(posts).values({
      id: slug,
      title: parsed.data.title || 'Untitled',
      description: parsed.data.description || '',
      pubDate: parsed.data.pubDate ? new Date(parsed.data.pubDate) : new Date(),
      updatedDate: parsed.data.updatedDate ? new Date(parsed.data.updatedDate) : null,
      heroImage: parsed.data.heroImage || null,
      speaker: parsed.data.speaker || null,
      churchName: parsed.data.churchName || null,
      date: parsed.data.date || null,
      themes: parsed.data.themes || [],
      body: parsed.content,
    }).onConflictDoNothing();
    
    console.log(`Inserted ${slug}`);
  }
  
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);
