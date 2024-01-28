import express, { Request, Response } from 'express';
import { sendEmail, sendRegistrationLink } from '../middleware/mailer';
import { db } from '../lib/db';
import bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken'

const router = express.Router();

// Create a new invite
router.post('/', async (req, res) => {
  try {
    const invite = await db.invite.create({ data: req.body });

    // Send email with registration link
    const registrationLink = `http://cloudrounds.com/register?token=${invite.token}`;
    const emailContent = `
      <h2>Invitation to join CloudRounds</h2>
      <p>${invite.creator} invited you to join "${invite.calendarName}" on our platform. Please use the registration link below to sign up and access the calendar.</p>
      <a href="${registrationLink}">Register Now</a>
    `;

    await sendRegistrationLink({
      to: invite.email,
      subject: 'You have been invited to join our platform!',
      html: emailContent
    });

    res.status(201).send(invite);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/register-with-token', async (req: Request, res: Response) => {
  const { token, username, email, password, university, firstName, lastName } = req.body;

  if (!token || !username || !email || !password || !university || !firstName || !lastName) {
    return res.status(400).send('All fields are required');
  }

  const invite = await db.invite.findFirst({ where: { token } });

  if (!invite) {
    return res.status(400).send('Invalid or expired token');
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
        emailValidated: true
      }
    });

    if (invite.calendarId) {
      await db.calendar.update({
        where: { id: invite.calendarId },
        data: {
          canReadMembers: {
            connect: { id: newUser.id }
          },
        }
      });
    }

    const userToken = jwt.sign({ username: newUser.username, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET as string, {
      expiresIn: '72h'
    });

    res.status(200).json({
      message: 'User successfully registered',
      token: userToken,
      user: newUser
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// Get all invites route
router.get('/', async (req: Request, res: Response) => {
  try {
    const invites = await db.invite.findMany();
    res.status(200).json(invites);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific invite by token route
router.get('/:token', async (req: Request, res: Response) => {
  const token = req.params.token;

  try {
    const invite = await db.invite.findUnique({ where: { token } });
    if (!invite) {
      return res.status(404).json({ error: 'Invite not found' });
    }
    res.status(200).json(invite);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an invite by token
router.delete('/:token', async (req: Request, res: Response) => {
  const token = req.params.token;

  try {
    const deletedInvite = await db.invite.delete({ where: { token } });
    res.status(200).json(deletedInvite);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const inviteRouter = router;