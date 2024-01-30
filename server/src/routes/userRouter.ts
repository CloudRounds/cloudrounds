import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';
import { sendEmail } from '../middleware/mailer';
import { jwtMiddleware } from '../middleware/permissions';

const URL_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cloudrounds.com';
const router = express.Router();

interface JwtPayload {
  username: string;
}

// fetch all users
router.get('/', jwtMiddleware, async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: {
        password: false,
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        university: true,
        isAdmin: true,
        emailValidated: true,
        calendars: true,
        canReadCalendars: true,
        canWriteCalendars: true,
        organizedArticles: true,
        attended: true,
        favorites: true,
        requests: true,
        feedbacks: true
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// fetch user by token
router.get('/me', jwtMiddleware, async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const username = decoded.username;

    const user = await db.user.findFirst({
      where: { username },
      select: {
        password: false,
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        university: true,
        isAdmin: true,
        emailValidated: true,
        calendars: true,
        canReadCalendars: true,
        canWriteCalendars: true,
        organizedArticles: true,
        attended: true,
        favorites: true,
        requests: true,
        feedbacks: true
      },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get user info by username
router.get('/:username', jwtMiddleware, async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await db.user.findFirst({
      where: { username },
      select: {
        password: false,
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        university: true,
        isAdmin: true,
        emailValidated: true,
        calendars: true,
        canReadCalendars: true,
        canWriteCalendars: true,
        organizedArticles: true,
        attended: true,
        favorites: true,
        requests: true,
        feedbacks: true
      },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await db.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        university: true,
        isAdmin: true,
        password: true,
        emailValidated: true,
        calendars: true,
        canReadCalendars: true,
        canWriteCalendars: true,
        organizedArticles: true,
        attended: true,
        favorites: true,
        requests: true,
        feedbacks: true
      },
    });

    if (!user) {
      return res.status(404).send('User not found');
    }


    if (!user.emailValidated) {
      return res.status(403).send('Email not validated. Please check your email to validate your account.');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '72h'
      }
    );

    res.cookie('CloudRoundsToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 72 * 3600000
    });

    const { password: _, ...userResponse } = user;

    res.status(200).json({ message: 'Successfully logged in', token: token, user: userResponse });
  } catch (err) {
    res.status(500).send(err);
  }
});

// sign up - create a new user
router.post('/register', async (req: Request, res: Response) => {

  const { username, email, password, university, firstName, lastName } = req.body;

  const registerToken = crypto.randomBytes(20).toString('hex');
  const registerTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

  if (!username || !email || !password || !university || !firstName || !lastName) {
    return res.status(400).send('All fields are required');
  }

  const existingUserByUsername = await db.user.findFirst({ where: { username } });
  const existingUserByEmail = await db.user.findFirst({ where: { email } });

  if (existingUserByUsername) {
    return res.status(400).send('Username already exists');
  }

  if (existingUserByEmail) {
    return res.status(400).send('Email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        university,
        firstName,
        lastName,
        emailValidated: false,
        registerToken,
        registerTokenExpiry
      }
    });

    const subject = 'Validate Email';
    const text = `You are receiving this email because you signed up to CloudRounds.\n\n
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
        ${URL_HOST}/verify-email/${registerToken}\n\n`;

    const to = newUser.email;

    try {
      await sendEmail(subject, text, to);
    } catch (error) {
      console.error('Error while sending validation email:', error);
      return res.status(500).send('Error while sending validation email');
    }

    res.status(200).json({ message: 'User registered. Please check your email to validate your account.' });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// change user password (from user settings)
router.put('/change-password', jwtMiddleware, async (req: Request, res: Response) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(401).send('Invalid current password');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await db.user.update({ where: { id: userId }, data: { password: user.password } });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// toggle attend for a given article
router.put('/toggle-attend', jwtMiddleware, async (req: Request, res: Response) => {
  const { userId, articleId, isAttending } = req.body;

  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).send('User not found');
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

    res.status(200).json({ message: 'Successfully updated attendance' });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/favorites/:userId', jwtMiddleware, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.put('/toggle-favorite', jwtMiddleware, async (req: Request, res: Response) => {
  const { userId, articleId, isFavorite } = req.body;

  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).send('User not found');
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

    res.status(200).json({ message: 'Successfully updated favorites' });
  } catch (err) {
    res.status(500).send(err);
  }
});


// Update user details (from user settings)
router.put('/:id', jwtMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body

  if (updates.password) {
    delete updates.password;
  }

  if (updates.username) {
    const existingUserByUsername = await db.user.findFirst({ where: { username: updates.username } });
    if (existingUserByUsername && existingUserByUsername.id !== id) {
      return res.status(400).send('Username already taken');
    }
  }

  if (updates.email) {
    const existingUserByEmail = await db.user.findFirst({ where: { email: updates.email } });
    if (existingUserByEmail && existingUserByEmail.id !== id) {
      return res.status(400).send('Email already in use');
    }
  }

  try {
    const updatedUser = await db.user.update({
      where: { id },
      data: updates,
    });

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.user.delete({
      where: { id }
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the user', error });
  }
});

export const userRouter = router;