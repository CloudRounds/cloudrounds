import { db } from '../../lib/db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../middleware/mailer';
import { Prisma, User } from '@prisma/client';
import { getUserById, getUserByUsername, getUsers } from '../services/users';

const URL_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cloudrounds.com';

const generateToken = (user: { username: string, isAdmin: boolean }) => {
  return jwt.sign(
    { username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: '72h' }
  );
};

// interface with password since it's not in Prisma.UserCreateInput
interface UserData extends Prisma.UserCreateInput {
  password: string;
}

interface Context {
  req: Express.Request & { headers: { authorization?: string } };
  res: Express.Response;
}

const UserResolver = {
  Query: {
    async users() {
      console.log('RESOLVER CALLED!')
      try {
        const users = await getUsers();
        console.log('From resolver: ', users);
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
    async userById(_: any, { userId }: { userId: string }) {
      const user = await getUserById(userId);
      return user;
    },
    async userByUsername(_: any, { username }: { username: string }) {
      const user = await getUserByUsername(username);
      return user
    },
    async userByToken(_: unknown, args: unknown, context: Context): Promise<User> {
      const authHeader = context.req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) {
        throw new Error('No token provided');
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const userId = decoded.sub as string;

        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (err) {
        throw new Error('Invalid token');
      }
    },
    async favorites(_: any, { userId }: { userId: string }) {
      const user = await getUserById(userId);
      return user.favorites;
    }
  },
  Mutation: {
    async loginUser(_: any, { credential, password }: { credential: string; password: string }) {
      const isEmail = (input: string): boolean => /\S+@\S+\.\S+/.test(input);

      let user;
      if (isEmail(credential)) {
        user = await db.user.findUnique({ where: { email: credential } });
      } else {
        user = await db.user.findFirst({ where: { username: credential } });
      }

      if (!user || !user.emailValidated) {
        throw new Error('Invalid credentials or email not validated');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const token = generateToken(user);
      return { token, user };
    },
    async registerUser(_: any, { userData }: { userData: UserData }) {
      const existingUserByEmail = await db.user.findUnique({ where: { email: userData.email } });
      const existingUserByUsername = await db.user.findFirst({ where: { username: userData.username } });

      if (existingUserByEmail || existingUserByUsername) {
        throw new Error('Username or Email already exists');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const registerToken = crypto.randomBytes(20).toString('hex');

      const newUser = await db.user.create({
        data: {
          ...userData,
          password: hashedPassword,
          emailValidated: false,
          registerToken,
          registerTokenExpiry: Date.now() + 3600000,
        }
      });

      const verificationUrl = `${URL_HOST}/verify-email/${registerToken}`;
      const emailText = `Please verify your email by clicking here: ${verificationUrl}`;

      await sendEmail('Validate Email', emailText, newUser.email);

      return newUser;
    },
    async updateUser(_: any, { id, updates }: { id: string; updates: Prisma.UserUpdateInput }) {
      if (updates.password) {
        throw new Error('Password updates not allowed here.');
      }

      if (typeof updates.username === 'string') {
        const existingUserByUsername = await db.user.findFirst({ where: { username: updates.username } });
        if (existingUserByUsername && existingUserByUsername.id !== id) {
          throw new Error('Username already taken');
        }
      }

      // Check if the email is already in use
      if (typeof updates.email === 'string') {
        const existingUserByEmail = await db.user.findFirst({
          where: { email: updates.email }
        });
        if (existingUserByEmail && existingUserByEmail.id !== id) {
          throw new Error('Email already in use');
        }
      }
      // Perform the update
      try {
        const updatedUser = await db.user.update({
          where: { id },
          data: updates,
        });
        return updatedUser;
      } catch (error) {
        throw new Error('An error occurred while updating the user');
      }
    },

    async changePassword(_: any, { userId, currentPassword, newPassword }: { userId: string; currentPassword: string; newPassword: string }) {
      const user = await db.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        throw new Error('Invalid current password');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return { message: 'Password changed successfully' };
    },
    async toggleAttendance(_: any, { userId, articleId, isAttending }: { userId: string; articleId: string; isAttending: boolean }) {
      let user = await getUserById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      if (isAttending) {
        // connect the article to user's attended list
        await db.user.update({
          where: { id: userId },
          data: {
            attended: {
              connect: { id: articleId },
            },
          },
        });
      } else {
        // disconnect the article from user's attended list
        await db.user.update({
          where: { id: userId },
          data: {
            attended: {
              disconnect: { id: articleId },
            },
          },
        });
      }

      return { message: 'Attendance updated', attended: user.attended };
    },


    async toggleFavorite(_: any, { userId, articleId, isFavorite }: { userId: string; articleId: string; isFavorite: boolean }) {
      let user = await getUserById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      if (isFavorite) {
        // connect the article to user's favorites list
        await db.user.update({
          where: { id: userId },
          data: {
            favorites: {
              connect: { id: articleId },
            },
          },
        });
      } else {
        // disconnect the article from user's favorites list
        await db.user.update({
          where: { id: userId },
          data: {
            favorites: {
              disconnect: { id: articleId },
            },
          },
        });
      }

      return { message: 'Favorites updated', favorites: user.favorites };
    },


    async deleteUser(_: any, { id }: { id: string }): Promise<{ message: string }> {
      await db.user.delete({ where: { id } });
      return { message: 'User deleted' };
    },
  },
};

export default UserResolver;