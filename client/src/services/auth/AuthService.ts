import { FORGOT_PASSWORD_MUTATION } from './mutations/ForgotPassword';
import { RESET_PASSWORD_MUTATION } from './mutations/ResetPassword';
import { VERIFY_EMAIL_MUTATION } from './mutations/VerifyEmail';
import { SESSION_CHECK_QUERY } from './queries/SessionCheck';
import { client } from '@/utils/apolloClient';

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await client.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: { email },
    });
    return data.forgotPassword;
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    throw error;
  }
};

export const resetPassword = async (resetToken: string, newPassword: string) => {
  try {
    const { data } = await client.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: { resetToken, newPassword },
    });
    return data.resetPassword;
  } catch (error) {
    console.error('Error in resetPassword:', error);
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const { data } = await client.mutate({
      mutation: VERIFY_EMAIL_MUTATION,
      variables: { token },
    });
    return data.verifyEmail;
  } catch (error) {
    console.error('Error in verifyEmail:', error);
    throw error;
  }
};

export const sessionCheck = async () => {
  try {
    const { data } = await client.query({
      query: SESSION_CHECK_QUERY,
    });
    return data.sessionCheck;
  } catch (error) {
    console.error('Error in sessionCheck:', error);
    throw error;
  }
};
