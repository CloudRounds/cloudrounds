import express, { Request, Response } from 'express';
import { sendEmail } from '../middleware/mailer';
import { db } from '../lib/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const requests = await db.request.findMany({
      include: {
        user: { select: { username: true } },
        calendar: true
      }
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching requests', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const request = await db.request.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            calendars: true,
            canReadCalendars: true,
            canWriteCalendars: true
          }
        },
        calendar: true,
      }
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the request', error });
  }
});

router.post('/bulk-new', async (req, res) => {
  const { calendarId, userIds } = req.body;

  try {
    const requestsData = userIds.map((userId: string) => ({ calendarId, userId }));
    await db.request.createMany({ data: requestsData });


    const users = await db.user.findMany({ where: { id: { in: userIds } } });
    for (let user of users) {
      await sendEmail('New Request Submitted', 'A new request has been submitted.', user.email);
    }

    const requests = await db.request.findMany({
      where: { calendarId, userId: { in: userIds } },
      include: { user: true, calendar: true }
    });

    res.status(201).json({ message: 'Requests created successfully', requests });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the requests', error });
  }
});

router.post('/new', async (req: Request, res: Response) => {
  const { calendarId, userId } = req.body;

  try {
    const request = await db.request.create({
      data: { calendarId, userId },
      include: { user: true, calendar: true }
    });

    const user = await db.user.findUnique({ where: { id: userId } });

    if (user) {
      await sendEmail('New Request Submitted', 'A new request has been submitted.', user.email);
    }

    res.status(201).json({ message: 'Request created successfully', request });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the request', error });
  }
});


router.put('/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message, email, calendarId } = req.body;

  try {
    const request = await db.request.update({
      where: { id },
      data: { status, message },
      include: { user: true, calendar: true }
    });

    console.log("STATUS: ", status)

    if (status === 'Approved') {
      const updatedCalendar = await db.calendar.update({
        where: { id: calendarId },
        data: {
          canReadMembers: {
            connect: { id: request.userId }
          },
        }
      });

      console.log(updatedCalendar);
    }

    await sendEmail('Request Status Updated', `The status of your request has been updated to ${status}.`, email);

    const updatedRequest = await db.request.findUnique({
      where: { id },
      include: { user: true, calendar: true }
    });

    res.status(200).json({ message: 'Status updated successfully', request: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the status', error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.request.delete({ where: { id } });
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the request', error });
  }
});


export const requestRouter = router;