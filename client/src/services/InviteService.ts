import { CreateInviteInput, CreateUserInput } from '@/types';
import apiClient from '@/utils/apiClient';

export const createInvite = async (inviteData: CreateInviteInput) => {
  try {
    const response = await apiClient.post('/invite', inviteData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const registerWithToken = async (registrationData: CreateUserInput) => {
  try {
    const response = await apiClient.post('/invite/register-with-token', registrationData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const getAllInvites = async () => {
  try {
    const response = await apiClient.get('/invite');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const getInviteByToken = async (token: string) => {
  try {
    const response = await apiClient.get(`/invite/${token}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};


export const deleteInviteByToken = async (token: string) => {
  try {
    const response = await apiClient.delete(`/invite/${token}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};