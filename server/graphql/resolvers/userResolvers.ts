import { db } from '../../lib/db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../middleware/mailer';
import { User } from '@prisma/client';
import { getUserById, getUserByUsername, getUsers } from '../helpers/users';
import { fromGlobalId, toGlobalId } from '../helpers/utils';
import { LoginUserInput, RegisterUserInput, UpdateUserInput } from '../generated/types';

const URL_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cloudrounds.com';

const generateToken = (user: { username: string, isAdmin: boolean }) => {
  return jwt.sign(
    { username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: '72h' }
  );
};

interface Context {
  req: Express.Request & { headers: { authorization?: string } };
  res: Express.Response;
}

const UserResolver = {
  Query: {
    async users(_: any, { first, after }: { first?: number; after?: string }) {
      console.log('RESOLVER FOR FETCHING USERS CALLED')
      try {
        const users = await getUsers(first, after);
        console.log('From resolver: ', users);
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
    async userById(_: any, { id }: { id: string }) {
      const { id: localId } = fromGlobalId(id);
      const user = await getUserById(localId);
      return { ...user, id: toGlobalId('User', user.id) };
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
    async loginUser(_: any, { input }: { input: LoginUserInput }) {
      const { username, password, clientMutationId } = input;

      const isEmail = (input: string): boolean => /\S+@\S+\.\S+/.test(input);

      let user;
      if (isEmail(username)) {
        user = await db.user.findUnique({ where: { email: username } });
      } else {
        user = await db.user.findFirst({ where: { username: username } });
      }

      if (!user || !user.emailValidated) {
        throw new Error('Invalid credentials or email not validated');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const token = generateToken(user);
      return {
        token,
        user: { ...user, id: toGlobalId('User', user.id) },
        clientMutationId
      };
    },
    async registerUser(_: any, { input }: { input: RegisterUserInput }) {
      const { userData, clientMutationId } = input;

      const existingUserByEmail = await db.user.findUnique({ where: { email: userData.email } });
      const existingUserByUsername = await db.user.findFirst({ where: { username: userData.username } });

      if (existingUserByEmail || existingUserByUsername) {
        throw new Error('Username or Email already exists');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const registerToken = crypto.randomBytes(20).toString('hex');

      const createUserInput = {
        ...userData,
        password: hashedPassword,
        emailValidated: false,
        registerToken: crypto.randomBytes(20).toString('hex'),
        registerTokenExpiry: Date.now() + 3600000,
        isAdmin: userData.isAdmin ?? false,
      };

      const newUser = await db.user.create({
        data: createUserInput,
      });

      const verificationUrl = `${URL_HOST}/verify-email/${registerToken}`;
      const emailText = `Please verify your email by clicking here: ${verificationUrl}`;

      await sendEmail('Validate Email', emailText, newUser.email);

      return {
        user: { ...newUser, id: toGlobalId('User', newUser.id) },
        clientMutationId
      };
    },
    async updateUser(_: any, { input }: { input: UpdateUserInput }) {
      const { id, updates, clientMutationId } = input;
      const localId = fromGlobalId(id).id;

      if (typeof updates.username === 'string') {
        const existingUserByUsername = await db.user.findFirst({ where: { username: updates.username } });
        if (existingUserByUsername && existingUserByUsername.id !== id) {
          throw new Error('Username already taken');
        }
      }

      if (typeof updates.email === 'string') {
        const existingUserByEmail = await db.user.findFirst({
          where: { email: updates.email }
        });
        if (existingUserByEmail && existingUserByEmail.id !== id) {
          throw new Error('Email already in use');
        }
      }

      try {
        const updatedUser = await db.user.update({
          where: { id: localId },
          data: {
            ...updates,
            isAdmin: updates.isAdmin ?? false,
          },
        });
        return {
          user: { ...updatedUser, id: toGlobalId('User', updatedUser.id) },
          clientMutationId,
        };
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
        await db.user.update({
          where: { id: userId },
          data: {
            attended: {
              connect: { id: articleId },
            },
          },
        });
      } else {
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
        await db.user.update({
          where: { id: userId },
          data: {
            favorites: {
              connect: { id: articleId },
            },
          },
        });
      } else {
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