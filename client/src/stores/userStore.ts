import { Article, Calendar, User, Request, Feedback } from '@/types';
import { makeAutoObservable } from 'mobx';

class UserStore {
  user: User | null = null;
  articles: Article[] = [];
  submittedRequests: Request[] = [];
  feedbacks: Feedback[] = [];
  calendars: Calendar[] = [];
  canRead: Article[] = [];
  canWrite: Article[] = [];
  attended: Article[] = [];


  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user;
  }

  setAttended(attended: Article[]) {
    this.attended = attended;
  }

  setCalendars(calendars: Calendar[]) {
    this.calendars = calendars;
  }

  setArticles(articles: Article[]) {
    this.articles = articles;
  }

  setSubmittedRequests(submittedRequests: Request[]) {
    this.submittedRequests = submittedRequests;
  }

  setFeedbacks(feedbacks: Feedback[]) {
    this.feedbacks = feedbacks;
  }

  setCanRead(canRead: Article[]) {
    this.canRead = canRead;
  }

  setCanWrite(canWrite: Article[]) {
    this.canWrite = canWrite;
  }
}

const userStore = new UserStore();
export default userStore;
