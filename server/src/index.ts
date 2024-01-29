import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import { authRouter } from './routes/authRouter';
import { articleRouter } from './routes/articleRouter';
import { calendarRouter } from './routes/calendarRouter';
import { feedbackRouter } from './routes/feedbackRouter';
import { inviteRouter } from './routes/inviteRouter';
import { requestRouter } from './routes/requestRouter';
import { userRouter } from './routes/userRouter';

dotenv.config();
const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.use('/api/users', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/requests', requestRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/calendars', calendarRouter);
app.use('/api/invites', inviteRouter);
app.use('/api/auth', authRouter);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid or missing token');
  }
});

if (process.env.NODE_ENV !== 'development') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`🚀 Express ready at http://localhost:${port}`);
});

