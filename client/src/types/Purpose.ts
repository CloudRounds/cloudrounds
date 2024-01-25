import { User } from './User';

export interface Purpose {
  _id?: string;
  name: string;
  description?: string;
  creator?: string;
  canReadMembers: string[] | User[];
  canWriteMembers: string[] | User[];
  emailMemberList?: string[];
}

export interface NewPurpose {
  name: string;
  description?: string;
}

