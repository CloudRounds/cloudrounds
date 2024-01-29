import { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, Typography, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { loginUser } from '@/services/UserService';
import { MailOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { AuthField } from '../fields/authFields';
import { forgotPassword, resendVerificationEmail } from '@/services/AuthService';
import { favoritesState, userState } from '@/appState';
import { useSetRecoilState } from 'recoil';

interface LoginFormProps {
  fields: AuthField[];
  appName: string;
  isForgotPassword: boolean;
  setIsForgotPassword: (isForgotPassword: boolean) => void;
}

interface Credentials {
  username: string;
  password: string;
}

const LoginForm = ({ fields, appName, isForgotPassword, setIsForgotPassword }: LoginFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(userState);
  const setFavorites = useSetRecoilState(favoritesState);

  const initialCredentials: Credentials = {
    username: '',
    password: ''
  };

  const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
  const [fieldErrors, setFieldErrors] = useState(initialCredentials);
  const [emailResetField, setEmailResetField] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resendEmailInput, setResendEmailInput] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const emailValidated = query.get('emailValidated');
    if (emailValidated === 'true') {
      toast.success('Success, your email has been validated. Please login.', {
        autoClose: 5000,
        pauseOnFocusLoss: false
      });
    }
  }, [location]);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!credentials.username || !credentials.password) {
      toast.error('Invalid or empty fields. Please enter a valid username and password.', {
        autoClose: 2500,
        pauseOnFocusLoss: false
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(credentials.username, credentials.password);
      if (response && response.user) {
        setUser(response.user);
        setFavorites(response.user.favorites);
        localStorage.setItem('CloudRoundsToken', response.token);
        localStorage.setItem('CloudRoundsUser', JSON.stringify(response.user));
        setTimeout(() => {
          setIsLoading(false);
          navigate('/calendar');
        }, 1000);
      } else {
        toast.error('Unexpected error. Please try again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 403) {
        toast.error('Your account has not been validated. Please check your email.', {
          autoClose: 2500,
          pauseOnFocusLoss: false
        });
        setShowResendEmail(true);
        return;
      }
      toast.error('Login failed. Please check your credentials and try again.', {
        autoClose: 2500,
        pauseOnFocusLoss: false
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const emailToReset = emailResetField;

    if (!emailToReset) {
      toast.error('Please enter your email address.', { autoClose: 1500, pauseOnFocusLoss: false });
      return;
    }

    setIsSendingEmail(true);

    try {
      await forgotPassword(emailToReset);
      toast.success('Password reset email sent. Please check your inbox.', {
        autoClose: 1500,
        pauseOnFocusLoss: false
      });
    } catch (error) {
      console.error('Error sending forgot password email:', error);
      toast.error('Error sending forgot password email. Please try again later.', {
        autoClose: 1500,
        pauseOnFocusLoss: false
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsSendingEmail(true);
      await resendVerificationEmail(resendEmailInput);
      toast.success('Verification email resent. Please check your email.', {
        autoClose: 2500,
        pauseOnFocusLoss: false
      });
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error('Error resending verification email. Please try again later.', {
        autoClose: 2500,
        pauseOnFocusLoss: false
      });
    } finally {
      setIsSendingEmail(false);
      setIsModalVisible(false);
    }
  };

  function isCredentialKey(key: string): key is keyof Credentials {
    return key === 'username' || key === 'password';
  }

  return (
    <>
      {isForgotPassword ? (
        <Form layout='vertical' onFinish={handleForgotPassword}>
          <div className={isSendingEmail || isLoading ? '' : `scrollable-area`}>
            <div className='px-8 w-full mx-auto'>
              <Form.Item>
                <p className='requiredLabel'>Email</p>
                <Input
                  prefix={<MailOutlined style={{ color: 'rgb(128,128,128)' }} />}
                  placeholder='Email'
                  disabled={isSendingEmail}
                  value={emailResetField}
                  onChange={e => setEmailResetField(e.target.value)}
                />
              </Form.Item>
              <div>
                {isSendingEmail ? (
                  <div className='flex justify-center'>
                    <Spin />
                  </div>
                ) : (
                  <>
                    <div className='flex justify-center mt-8'>
                      <Button type='primary' htmlType='submit' className='login-button'>
                        Send Password Reset Email
                      </Button>
                    </div>
                    <div className='flex justify-center mt-5 cursor-pointer' onClick={() => setIsForgotPassword(false)}>
                      <Typography.Text className='text-gray-500 underline hover:text-blue-500'>
                        Back to login
                      </Typography.Text>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Form>
      ) : (
        <Form onFinish={handleSubmit}>
          <div className={isSendingEmail || isLoading ? 'overflow-hidden' : `scrollable-area`}>
            <div className='px-8 w-full mx-auto'>
              <div id='login-form' style={{ marginBottom: '30px' }}>
                {fields.map((field, index) => (
                  <div key={index}>
                    {field.name === 'password' ? (
                      <>
                        <div className='flex justify-between'>
                          <p className='requiredLabel'>{field.label}</p>
                          <Typography.Text
                            className='text-gray-500 underline hover:text-blue-500 cursor-pointer'
                            onClick={() => setIsForgotPassword(true)}>
                            Forgot?
                          </Typography.Text>
                        </div>
                        <Form.Item
                          name={field.name}
                          rules={[{ required: field.required, message: fieldErrors[field.name] }]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}>
                          <Input
                            disabled={isLoading}
                            type={field.type}
                            value={credentials[field.name]}
                            onChange={e => setCredentials({ ...credentials, [field.name]: e.target.value })}
                          />
                        </Form.Item>
                      </>
                    ) : (
                      <>
                        {/* ERROR HERE */}
                        <p className='requiredLabel'>{field.label}</p>
                        <Form.Item
                          name={field.name}
                          rules={[
                            {
                              required: field.required,
                              message: (isCredentialKey(field.name) && fieldErrors[field.name]) || ''
                            }
                          ]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}>
                          <Input
                            disabled={isLoading}
                            type={field.type}
                            value={isCredentialKey(field.name) ? credentials[field.name] : ''}
                            onChange={e => setCredentials({ ...credentials, [field.name]: e.target.value })}
                          />
                        </Form.Item>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {isLoading ? (
                <div className='flex w-full justify-center text-center'>
                  <Spin />
                </div>
              ) : (
                <div className='pb-4 sm:pb-8 w-full text-center'>
                  {showResendEmail && (
                    <div className='justify-center mt-5'>
                      <div>
                        <Typography.Text type='secondary'>
                          Email not verified. Check your inbox and spam folder or click below to resend verification.
                        </Typography.Text>
                      </div>
                      <div>
                        <Button onClick={() => setIsModalVisible(true)} loading={isSendingEmail} className='mt-4'>
                          Resend Verification Email
                        </Button>
                      </div>
                    </div>
                  )}
                  <Modal
                    title='Resend Verification Email'
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}>
                    <Form onFinish={handleResendEmail}>
                      <Form.Item
                        name='email'
                        rules={[
                          { required: true, message: 'Please input your email!' },
                          { type: 'email', message: 'Please enter a valid email!' }
                        ]}>
                        <Input
                          value={resendEmailInput}
                          onChange={e => setResendEmailInput(e.target.value)}
                          placeholder='Enter your email'
                          className='px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50'
                        />
                      </Form.Item>
                      <Form.Item className='flex w-full justify-center'>
                        <Button type='primary' htmlType='submit' loading={isSendingEmail} className='login-button'>
                          Resend Email
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                  <div className='flex justify-center mt-8'>
                    <Button type='primary' htmlType='submit' className='login-button'>
                      Login
                    </Button>
                  </div>
                  <div className='flex justify-center mt-5 cursor-pointer' onClick={() => navigate('/register')}>
                    <Typography.Text className='text-gray-500 underline hover:text-blue-500'>
                      New to {appName}? Create account
                    </Typography.Text>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
