// src/routes/scheduleEventscheduleEventRouter.ts
import express from 'express';
import { db } from '../lib/db';

const scheduleEventRouter = express.Router();

// Get all events for a specific schedule
scheduleEventRouter.get('/schedule/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const events = await db.scheduleEvent.findMany({
      where: { scheduleId },
    });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all events for a specific user
scheduleEventRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const events = await db.scheduleEvent.findMany({
      where: { userId },
    });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new event to a schedule
scheduleEventRouter.post('/', async (req, res) => {
  const eventData = req.body;
  console.log("EventData: ", eventData)
  try {
    const event = await db.scheduleEvent.create({
      data: eventData
    });
    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing event
scheduleEventRouter.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { eventData } = req.body;

  try {
    const event = await db.scheduleEvent.update({
      where: { id },
      data: eventData,
    });
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an event
scheduleEventRouter.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.scheduleEvent.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default scheduleEventRouter;