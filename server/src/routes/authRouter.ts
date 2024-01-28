import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express, { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { sendEmail } from '../middleware/mailer';
import { db } from '../lib/db';

const URL_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cloudrounds.com';

const router = express.Router();

router.post('/forgot-password', async (req: Request, res: Response) => {
  const email = req.body.email;
  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 3600000);

  try {
    const user = await db.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const subject = 'Password Reset';
    const text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
        ${URL_HOST}/reset-password/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`;
    const to = user.email;
    await sendEmail(subject, text, user.email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error during password reset process:', error);
    res.status(500).json({ error: 'Error during password reset process' });
  }
});

router.post('/reset-password/:resetToken', async (req: Request, res: Response) => {
  const resetToken = req.params.resetToken;
  const newPassword = req.body.newPassword;

  if (typeof newPassword !== 'string') {
    return res.status(400).json({ error: 'New password is required' });
  }

  try {
    const user = await db.user.findFirst({
      where: {
        resetToken,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
    });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Error resetting password' });
  }
});


router.get('/verify-email/:token', async (req: Request, res: Response) => {
  const token = req.params.token;

  try {
    const user = await db.user.findFirst({
      where: {
        registerToken: token,
        registerTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    await db.user.update({
      where: { id: user.id },
      data: { emailValidated: true, registerToken: null, registerTokenExpiry: null }
    });

    res.status(200).json({ message: 'Email successfully validated' });
  } catch (error) {
    console.error('Error during signup verification process:', error);
    res.status(500).json({ error: 'Error during signup verification process' });
  }
});

// Assuming you have the logic for verifying JWT tokens
router.get('/session-check', (req: Request, res: Response) => {
  const token = req.cookies['CloudRoundsToken'];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: 'Token is not valid' });
  }
});

export const authRouter = router;