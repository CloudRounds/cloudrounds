// src/routes/scheduleRouter.ts
import express, { Request, Response } from 'express';
import { db } from '../lib/db';

const scheduleRouter = express.Router();

// Fetch all schedules
scheduleRouter.get('/', async (req: Request, res: Response) => {
  try {
    const schedules = await db.schedule.findMany({
      include: { events: true },
    });
    res.json(schedules);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
  }
});

// Create a new schedule
scheduleRouter.post('/', async (req: Request, res: Response) => {
  const { name, description, userId, startDate, endDate } = req.body;
  try {
    const newSchedule = await db.schedule.create({
      data: {
        name,
        description,
        userId,
        startDate,
        endDate
      },
    });
    res.status(201).json(newSchedule);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create schedule', error: error.message });
  }
});

// Update an existing schedule
scheduleRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedSchedule = await db.schedule.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
    res.json(updatedSchedule);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update schedule', error: error.message });
  }
});

// Delete a schedule
scheduleRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.schedule.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete schedule', error: error.message });
  }
});


export default scheduleRouter;
