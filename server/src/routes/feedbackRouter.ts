import express, { Request, Response } from 'express';
import { db } from '../lib/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const feedbacks = await db.feedback.findMany();
    res.status(200).json(feedbacks);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { articleId, userId, feedback } = req.body;

  try {
    const newFeedback = await db.feedback.create({
      data: { articleId, userId, feedback }
    });
    res.status(200).json({ message: 'Feedback successfully saved', feedback: newFeedback });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const feedbacks = await db.feedback.findMany({ where: { userId } });
    res.status(200).json(feedbacks);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.put('/:feedbackId', async (req: Request, res: Response) => {
  const { feedbackId } = req.params;
  const { feedback } = req.body;

  try {
    const updatedFeedback = await db.feedback.update({
      where: { id: feedbackId },
      data: { feedback }
    });
    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.delete('/:feedbackId', async (req: Request, res: Response) => {
  const { feedbackId } = req.params;

  try {
    await db.feedback.delete({
      where: { id: feedbackId }
    });
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export const feedbackRouter = router;
