import { gql } from '@apollo/client';

export const CREATE_INVITE_MUTATION = gql`
  mutation CreateInvite($inviteInput: InviteInput!) {
    createInvite(inviteInput: $inviteInput) {
      id
      email
      calendarId
      calendarName
      token
      expirationTime
      createdAt
      creator
    }
  }
`;
