export interface User {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  university: string;
  isAdmin: boolean;
  purposes: string[];
  attended: string[];
  favorites: string[];
  resetToken?: string;
  resetTokenExpiry?: number;
  registerToken?: string;
  registerTokenExpiry?: number;
  emailValidated: boolean;
}
