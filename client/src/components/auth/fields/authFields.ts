import { UNIVERSITY_CHOICES, universityDomainMap, genericDomains } from '@/utils/constants';

export interface FieldChoice {
  value: string;
  label: string;
}

export interface FieldRule {
  required?: boolean;
  pattern?: RegExp;
  message?: string;
  min?: number;
  autofill?: boolean;
}

export interface AuthField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  rules?: FieldRule[];
  choices?: FieldChoice[];
}

export const loginFields: AuthField[] = [
  { name: 'username', label: 'Username or Email', type: 'text', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true }
];

export const signupFields: AuthField[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    rules: [
      { required: true, message: 'Username is required' },
      {
        pattern: /^[A-Za-z][A-Za-z0-9]*$/,
        message: 'Username must start with a letter and contain only alphanumeric characters'
      },
      {
        min: 3,
        message: 'Username must be at least 3 characters long'
      },
      {
        autofill: false
      }
    ]
  },
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'university', label: 'University', type: 'select', required: true, choices: UNIVERSITY_CHOICES },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
  { name: 'passwordConfirmation', label: 'Confirm Password', type: 'password', required: true }
];

export const generateEmailSuggestions = (inputValue: string, domainList: string[]): string[] => {
  if (inputValue.includes('@')) {
    const [localPart, domainPart] = inputValue.split('@');

    if (!domainPart) {
      return domainList.map(domain => `${localPart}@${domain}`);
    }

    return domainList.filter(domain => domain.startsWith(domainPart)).map(domain => `${localPart}@${domain}`);
  }

  return domainList.map(domain => `${inputValue}@${domain}`);
};

export const getDomainSuggestions = (university: string): string[] => {
  const universityDomains = universityDomainMap[university] || [];
  return [...new Set([...genericDomains, ...universityDomains])];
};
