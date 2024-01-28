import apiClient from '@/utils/apiClient';

export const forgotPassword = async (email: string) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    throw error;
  }
};

export const resetPassword = async (resetToken: string, newPassword: string) => {
  try {
    const response = await apiClient.post(`/auth/reset-password/${resetToken}`, { newPassword });
    return response.data;
  } catch (error) {
    console.error('Error in resetPassword:', error);
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await apiClient.get(`/auth/verify-email/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error in verifyEmail:', error);
    throw error;
  }
};

export const sessionCheck = async () => {
  try {
    const response = await apiClient.get('/auth/session-check');
    return response.data;
  } catch (error) {
    console.error('Error in sessionCheck:', error);
    throw error;
  }
};