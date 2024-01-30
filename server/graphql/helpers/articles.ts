import { db } from '../../lib/db';

export async function fetchAllArticlesWithDetails(first?: number, after?: string) {
  let cursor = after ? { id: after } : undefined;
  let articles = await db.article.findMany({
    take: first,
    cursor,
    orderBy: { createdAt: 'asc' },
    include: {
      organizer: true,
      calendar: true,
      feedbacks: { include: { user: true } },
      favorites: { include: { user: true } },
      attendees: true,
    }
  });

  return articles;
}