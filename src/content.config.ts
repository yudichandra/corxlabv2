import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

// News collection: simple articles similar to blog
const news = defineCollection({
    loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
        }),
});

// Games collection: showcase entries with gallery and store links
const games = defineCollection({
    loader: glob({ base: './src/content/games', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            coverImage: image().optional(),
            gallery: z.array(image()).default([]),
            platforms: z
                .array(
                    z.object({
                        name: z.enum(['Steam', 'Google Play', 'App Store', 'itch.io', 'Epic Games', 'Other']).default('Other'),
                        url: z.string().url(),
                    })
                )
                .default([]),
            tags: z.array(z.string()).default([]),
        }),
});

export const collections = { blog, news, games };
