import { Purpose } from './Purpose';
import { User } from './User';

export interface Article {
  _id: string;
  title: string;
  event_link?: string;
  date: Date;
  duration?: string;
  organizer?: string | User;
  purpose: string | Purpose;
  meetingType?: string;
  meeting_id?: string;
  passcode?: string;
  speaker?: string;
  location?: string;
  additional_details?: string;
}

