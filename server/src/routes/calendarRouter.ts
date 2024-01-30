import express, { Request, Response } from 'express';
import { db } from '../lib/db';
import { jwtMiddleware } from '../middleware/permissions';

import jwt from 'jsonwebtoken';
const router = express.Router();

interface JwtPayload {
  userId: string;
}

// Fetch all calendars
router.get('/', async (req: Request, res: Response) => {
  try {
    const calendars = await db.calendar.findMany({
      include: {
        creator: true,
        canReadMembers: true,
        canWriteMembers: true,
      },
    });
    res.status(200).json(calendars);
  } catch (err) {
    console.error('There was an error fetching calendars:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Fetch calendars by userId
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const calendars = await db.calendar.findMany({
      where: {
        OR: [
          { canReadMembers: { some: { id: userId } } },
          { canWriteMembers: { some: { id: userId } } },
        ],
      },
      include: {
        creator: true,
        canReadMembers: true,
        canWriteMembers: true,
      },
    });
    res.status(200).json(calendars);
  } catch (err) {
    console.error('There was an error fetching calendars:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/:calendarId', async (req: Request, res: Response) => {
  try {
    const calendar = await db.calendar.findUnique({
      where: {
        id: req.params.calendarId,
      },
    });;

    res.status(200).json(calendar);
  } catch (err) {
    console.error('There was an error fetching the calendar:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/new', jwtMiddleware, async (req: Request, res: Response) => {
  const calendarData = req.body;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  if (!calendarData) {
    return res.status(400).send('Calendar data is missing');
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const creatorId = decoded.userId;


    const newCalendar = await db.calendar.create({
      data: {
        ...calendarData,
        creatorId: creatorId,
        canReadMembers: {
          connect: [{ id: creatorId }],
        },
        canWriteMembers: {
          connect: [{ id: creatorId }],
        },
      },
      include: {
        creator: true,
        canReadMembers: true,
        canWriteMembers: true,
      }
    });

    res.status(201).json(newCalendar);
  } catch (err) {
    console.error('Error creating calendar:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/remove-user', jwtMiddleware, async (req: Request, res: Response) => {
  const { calendarId, userId } = req.body;

  try {
    db.calendar.update({
      where: { id: calendarId },
      data: {
        canReadMembers: {
          disconnect: { id: userId },
        },
        canWriteMembers: {
          disconnect: { id: userId },
        },
      },
    })

    res.status(200).json({ message: 'User removed successfully from calendar' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.put('/update/:id', jwtMiddleware, async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const calendarId = req.params.id;
    const updatedCalendar = await db.calendar.update({
      where: { id: calendarId },
      data: {
        name,
        description,
      },
      include: {
        creator: true,
        canReadMembers: true,
        canWriteMembers: true,
      }
    });

    res.status(200).json(updatedCalendar);
  } catch (err) {
    console.error('Error updating calendar:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/calendar/:calendarId/user/:userId', jwtMiddleware, async (req: Request, res: Response) => {
  try {
    const { calendarId, userId } = req.params;
    const calendar = await db.calendar.findUnique({
      where: { id: calendarId }, include: {
        creator: true,
        canReadMembers: true,
        canWriteMembers: true,
      }
    });

    if (!calendar) {
      return res.status(404).send('Calendar not found');
    }

    // delete all requests associated with user and calendar
    await db.request.deleteMany({
      where: {
        calendarId: calendarId,
        userId: userId
      }
    });

    // temporary fix for migration
    // disconnect user from canReadMembers and canWriteMembers
    await db.calendar.update({
      where: { id: calendarId },
      data: {
        canReadMembers: {
          disconnect: [{ id: userId }]
        },
        canWriteMembers: {
          disconnect: [{ id: userId }]
        }
      }
    });

    res.status(200).json(calendar);
  } catch (err) {
    console.error('Error deleting user from calendar:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/calendar/:calendarId', jwtMiddleware, async (req: Request, res: Response) => {
  try {
    const { calendarId } = req.params;

    await db.request.deleteMany({
      where: { calendarId: calendarId }
    });

    await db.calendar.delete({
      where: { id: calendarId }
    });

    res.status(200).json({ message: 'Calendar deleted successfully' });
  } catch (err) {
    console.error('Error deleting the calendar:', err);
    res.status(500).send('Internal Server Error');
  }
});



export const calendarRouter = router;
