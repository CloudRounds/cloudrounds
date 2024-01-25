import { InviteInput } from '@/types';
import { CREATE_INVITE_MUTATION } from './mutations/CreateInvite';
import { client } from '@/utils/apolloClient';
import { REGISTER_WITH_TOKEN_MUTATION } from './mutations/RegisterWithToken';
import { FETCH_ALL_INVITES_QUERY } from './queries/Invites';
import { FETCH_INVITE_BY_TOKEN_QUERY } from './queries/InviteByToken';
import { DELETE_INVITE_BY_TOKEN_MUTATION } from './mutations/DeleteInviteByToken';


export const createInvite = async (inviteData: InviteInput) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_INVITE_MUTATION,
      variables: { inviteInput: inviteData },
    });
    return data.createInvite;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerWithToken = async (data: {
  token: string;
  username: string;
  email: string;
  password: string;
  university: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const { data: responseData } = await client.mutate({
      mutation: REGISTER_WITH_TOKEN_MUTATION,
      variables: data,
    });
    return responseData.registerWithToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllInvites = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_ALL_INVITES_QUERY,
    });
    return data.invites;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getInviteByToken = async (token: string) => {
  try {
    const { data } = await client.query({
      query: FETCH_INVITE_BY_TOKEN_QUERY,
      variables: { token },
    });
    return data.invite;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteInviteByToken = async (token: string) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_INVITE_BY_TOKEN_MUTATION,
      variables: { token },
    });
    return data.deleteInvite;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
