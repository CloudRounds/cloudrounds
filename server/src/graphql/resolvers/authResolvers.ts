import { db } from '../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../../middleware/mailer';

const URL_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cloudrounds.com';

const AuthResolver = {
  Query: {
    async sessionCheck(_: any, __: any, context: any) {
      const token = context.req.cookies['CloudRoundsToken'];

      if (!token) {
        return { valid: false, user: null };
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded === 'object' && 'id' in decoded) {
          const user = await db.user.findUnique({ where: { id: decoded.id } });
          return { valid: true, user };
        } else {
          throw new Error('Invalid token structure');
        }
      } catch (err) {
        return { valid: false, user: null };
      }
    }
  },
  Mutation: {
    async forgotPassword(_: any, { email }: { email: string }) {
      if (typeof email !== 'string') {
        throw new Error('Email is required');
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour

      const user = await db.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      await db.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry
        }
      });

      const subject = 'Password Reset';
      const text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
        ${URL_HOST}/reset-password/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`;
      await sendEmail(subject, text, email);

      return { message: 'Password reset email sent' };
    },

    async resetPassword(_: any, { resetToken, newPassword }: { resetToken: string; newPassword: string }) {
      if (typeof newPassword !== 'string') {
        throw new Error('New password is required');
      }

      const user = await db.user.findFirst({
        where: {
          resetToken,
          resetTokenExpiry: {
            gt: Date.now()
          }
        }
      });

      if (!user) {
        throw new Error('Invalid or expired reset token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

      return { message: 'Password has been reset successfully' };
    },

    async verifyEmail(_: any, { token }: { token: string }) {
      const user = await db.user.findFirst({
        where: {
          registerToken: token,
          registerTokenExpiry: {
            gt: Date.now()
          }
        }
      });

      if (!user) {
        throw new Error('Invalid or expired token');
      }

      await db.user.update({
        where: { id: user.id },
        data: {
          emailValidated: true,
          registerToken: null,
          registerTokenExpiry: null
        }
      });

      return { message: 'Email successfully validated' };
    }
  }
};

export default AuthResolver;
