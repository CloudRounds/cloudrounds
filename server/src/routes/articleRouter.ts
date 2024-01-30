import express, { Request, Response } from 'express';
import { db } from '../lib/db';
import { jwtMiddleware } from '../middleware/permissions';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await db.article.findMany({
      include: {
        organizer: true,
        calendar: true,
      },
    });

    res.json(articles);
  } catch (err) {
    console.error('There was an error fetching articles:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/new', jwtMiddleware, async (req: Request, res: Response) => {
  try {
    const newArticle = await db.article.create({
      data: req.body,
      include: {
        organizer: true,
        calendar: true,
      },
    });

    res.json(newArticle);
  } catch (err) {
    console.error('Error creating article:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', jwtMiddleware, async (req: Request, res: Response) => {
  const { title, calendarId, speaker, date, duration, meetingType, meetingId, passcode, eventLink, additionalDetails } = req.body;

  const updatedArticleData = {
    title,
    speaker,
    calendarId,
    date,
    duration,
    meetingType,
    meetingId,
    passcode,
    eventLink,
    additionalDetails
  };

  try {
    const updatedArticle = await db.article.update({
      where: { id: req.params.id },
      data: updatedArticleData,
      include: {
        organizer: true,
        calendar: true,
      },
    });

    res.json(updatedArticle);
  } catch (err) {
    console.error('Error updating article:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', jwtMiddleware, async (req: Request, res: Response) => {
  try {
    await db.article.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export const articleRouter = router;