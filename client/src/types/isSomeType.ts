import { Calendar, CreateUserInput, TempUserValues, User } from '.';

export type EditingField = keyof User | keyof TempUserValues | string | 'pasword';

export function isUser(user: User | CreateUserInput): user is User {
  return (user as User).id !== undefined;
}

export const isCalendarArray = (value: any): value is Calendar[] => {
  return Array.isArray(value) && value.every(item => 'id' in item && typeof item.id === 'string');
}

export const isEditingField = (field: string, values: any): field is EditingField => {
  return field === 'password' || Object.keys(values).includes(field);
}