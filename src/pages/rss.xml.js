import rss from '@astrojs/rss';
import { db } from '../db';
import { sermons } from '../db/schema';
import { desc } from 'drizzle-orm';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await db.select().from(sermons).orderBy(desc(sermons.pubDate));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title || post.fileName || 'Untitled',
			pubDate: post.pubDate,
			description: post.speaker ? `Speaker: ${post.speaker}` : '',
			link: `/blog/${post.id}/`,
		})),
	});
}

