import { Article } from './Article';
import { Purpose } from './Purpose';

export interface User {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  university: string;
  isAdmin: boolean;
  purposes: string[] | Purpose[];
  attended: string[] | Article[];
  favorites: string[];
  resetToken?: string;
  resetTokenExpiry?: number;
  registerToken?: string;
  registerTokenExpiry?: number;
  emailValidated: boolean;
}

export function isUser(user: string | User | undefined): user is User {
  return (user as User).username !== undefined;
}