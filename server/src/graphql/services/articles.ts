import { db } from '../../lib/db';

export async function fetchAllArticlesWithDetails() {
  return await db.article.findMany({
    include: {
      organizer: true,
      calendar: true,
      feedbacks: {
        include: {
          user: true
        }
      },
      favorites: {
        include: {
          user: true
        }
      },
      attendees: true
    }
  });
}