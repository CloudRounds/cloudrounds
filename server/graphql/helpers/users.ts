import { db } from '../../lib/db';

const USER_FIELDS = {
  id: true,
  username: true,
  firstName: true,
  lastName: true,
  email: true,
  university: true,
  isAdmin: true,
  attended: true,
  favorites: true,
  createdCalendars: true,
  canReadCalendars: true,
  canWriteCalendars: true,
  organizedArticles: true,
  emailValidated: true,
  feedbacks: true,
  requests: true
}
export async function getUsers(first?: number, after?: string) {
  let cursor = after ? { id: after } : undefined;
  let users = await db.user.findMany({
    take: first,
    cursor,
    orderBy: { createdAt: 'asc' },
    select: USER_FIELDS
  });

  return users;
}

export async function getUserById(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: USER_FIELDS
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function getUserByUsername(username: string) {
  const user = await db.user.findFirst({
    where: { username },
    select: USER_FIELDS
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}