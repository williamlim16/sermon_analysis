import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().default('Untitled'),
			description: z.string().default(''),
			// Transform string to Date object
			pubDate: z.coerce.date().default(new Date()),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Additional fields from MDX
			speaker: z.string().optional(),
			date: z.string().optional(),
			themes: z.array(z.string()).optional(),
		}),
});

export const collections = { blog };
