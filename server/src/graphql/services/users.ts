import { db } from '../../lib/db';

export async function getUserById(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      university: true,
      isAdmin: true,
      attended: true,
      favorites: true,
      createdCalendars: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function getUserByUsername(username: string) {
  const user = await db.user.findFirst({
    where: { username },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      university: true,
      isAdmin: true,
      attended: true,
      favorites: true,
      createdCalendars: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}