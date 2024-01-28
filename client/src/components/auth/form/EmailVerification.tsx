import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { verifyEmail } from '@/services/AuthService';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function validateRegisterToken() {
    try {
      await verifyEmail(token as string);
      setLoading(false);
      navigate('/login?emailValidated=true');
    } catch (error: any) {
      setLoading(false);
      setError(error.message || 'Failed to verify email.');
    }
  }

  useEffect(() => {
    if (token) {
      validateRegisterToken();
    }
  }, [token]);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message={error} type='error' />;
  }

  return null;
};

export default EmailVerification;
