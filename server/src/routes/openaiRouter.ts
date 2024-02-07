import express, { Request, Response } from 'express';
import { db } from '../lib/db';
import OpenAI from 'openai';
import { parseISO, addDays, addWeeks, addMonths } from 'date-fns'; // Ensure you've installed date-fns for date manipulation

const openaiRouter = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GPT_MODEL = "gpt-4-1106-preview";

function addTimeToDate(date: Date, hours: number, minutes: number) {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

openaiRouter.post('/parse-task', async (req: Request, res: Response) => {
  const { description } = req.body;

  try {
    const response: OpenAI.Chat.Completions.ChatCompletion = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content: `
            You are a helpful assistant. When provided with a task description, output the task details as JSON,
            including the following attributes: title, description, taskType, goal,
            duration (per session, e.g., "1h"),
            frequency (as an integer representing the number of events per day, per week, per month, or null if it's a one time event),
            repeat (such as "daily", "weekly", "monthly", or null if no repeat),
            taskLength (e.g., "3 weeks", "5 days", "6 months"),
            status, progress, customAttributes,
            startDate (only include this if a specific start date was mentioned),
            endDate (only if an end date is specifically mentioned, e.g. "till March 4th"), and also suggest
            appropriate startTime and endTime for each event based on the duration, ensuring all values are in the correct format.
            Use a 24-hour clock and assume a default start time of 09:00 if not specified. Here's an example task description:
          `
        },
        { role: "user", content: description },
      ],
    });

    let messageContent = response.choices[0].message.content
    console.log("rae messageContent: ", messageContent)

    if (typeof messageContent === 'string' && messageContent.startsWith('```json') && messageContent.endsWith('```')) {
      messageContent = messageContent.substring(7, messageContent.length - 3).trim();
    }

    let taskDetails;
    if (typeof messageContent === 'string') {
      taskDetails = JSON.parse(messageContent);
    } else {
      res.status(400).send("Task details from OpenAI API are not in the expected format.");
      return;
    }

    const startDate = taskDetails.startDate ? parseISO(taskDetails.startDate) : new Date();
    let endDate;
    switch (taskDetails.taskLength.toLowerCase().match(/weeks?|months?|days?/)[0]) {
      case 'day':
      case 'days':
        endDate = addDays(startDate, parseInt(taskDetails.taskLength));
        break;
      case 'week':
      case 'weeks':
        endDate = addWeeks(startDate, parseInt(taskDetails.taskLength));
        break;
      case 'month':
      case 'months':
        endDate = addMonths(startDate, parseInt(taskDetails.taskLength));
        break;
      default:
        console.error('Unhandled taskLength unit:', taskDetails.taskLength);
        endDate = startDate;
    }

    const defaultStartTime = taskDetails.startTime || "09:00";
    const durationInHours = parseInt(taskDetails.duration.replace(/\D/g, ''), 10);


    const [hours, minutes] = defaultStartTime.split(':').map((str: string) => parseInt(str, 10));
    startDate.setHours(hours, minutes, 0, 0);

    const firstSessionEndTime = new Date(startDate.getTime() + durationInHours * 3600 * 1000);


    const task = await db.task.create({
      data: {
        ...taskDetails,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        startTime: startDate.toISOString(),
        endTime: firstSessionEndTime.toISOString(),
      }
    });

    res.json(task);
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
});

export default openaiRouter;

/*
I want to learn French 3 hours a week, 1 hour at a time, for 3 months.
*/