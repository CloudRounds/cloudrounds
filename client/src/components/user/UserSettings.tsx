import { deleteUser, updateUser } from '@/services/UserService';
import { CreateUserInput, TempUserValues, User, UserStringValues } from '@/types';
import { UNIVERSITY_CHOICES } from '@/utils/constants';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Layout, List, Modal, Select, Space, Spin, Typography } from 'antd';

import { canReadCalendarsState, canWriteCalendarsState, userState } from '@/appState';
import { isUser } from '@/types/isSomeType';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import AttendedArticles from './AttendedArticles';
import PasswordChange from './PasswordChange';

type EditingField = keyof User | keyof TempUserValues | keyof CreateUserInput | 'pasword';

const UserSettings = () => {
  const [user, setUser] = useRecoilState(userState);
  const canReadCalendars = useRecoilValue(canReadCalendarsState);
  const canWriteCalendars = useRecoilValue(canWriteCalendarsState);

  const [open, setOpen] = useState(false);
  const [isAttendedModalOpen, setIsAttendedModalOpen] = useState(false);

  const [editingField, setEditingField] = useState<EditingField | null>(null);
  const [tempValues, setTempValues] = useState<TempUserValues>({
    username: user?.username || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    canReadCalendars: canReadCalendars.map(calendar => calendar.name),
    canWriteCalendars: canWriteCalendars.map(calendar => calendar.name),
    university: user?.university || ''
  });

  const [, setShowPasswordChange] = useState(false);

  const mutation = useMutation(updateUser, {
    onSuccess: data => {
      if (data && data.user) {
        setUser(data.user);
        setTempValues({ ...tempValues, ...data.user });
        toast.success('Field updated successfully!', { autoClose: 2000, pauseOnFocusLoss: false });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error updating field. Please try again.', {
        autoClose: 2000,
        pauseOnFocusLoss: false
      });
    }
  });

  useEffect(() => {
    if (user) {
      setTempValues({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        canReadCalendars: canReadCalendars.map(calendar => calendar.name),
        canWriteCalendars: canWriteCalendars.map(calendar => calendar.name),
        university: user.university
      });
    }
  }, [user, canReadCalendars, canWriteCalendars]);

  const handleFieldUpdate = async (
    field: keyof TempUserValues | keyof UserStringValues,
    newValue: string | string[] | undefined
  ) => {
    const updatedUser: Partial<User> = { ...user, [field]: newValue };
    mutation.mutate(updatedUser as User);
  };

  const handleEditToggle = (field: keyof TempUserValues | 'password') => {
    if (user && isUser(user)) {
      setEditingField(field);
      setTempValues(prevValues => ({ ...prevValues, [field]: user[field as keyof User] }));
    }
  };

  const areFieldsValid = () => {
    return ['username', 'firstName', 'lastName', 'email', 'university'].every(
      field => !!tempValues[field as keyof TempUserValues]
    );
  };

  const handleSaveAll = async (field: keyof TempUserValues | keyof UserStringValues) => {
    if (field in tempValues) {
      if (areFieldsValid()) {
        await handleFieldUpdate(field, tempValues[field as keyof TempUserValues]);
      } else {
        toast.error(`Invalid or empty fields.`, { autoClose: 2000, pauseOnFocusLoss: false });
      }
    } else {
      console.error('Invalid field: ', field);
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleChange = (field: keyof TempUserValues | keyof UserStringValues, value: string | string[]) => {
    setTempValues(prevValues => ({ ...prevValues, [field]: value }));
  };

  const handleDeleteAccount = async () => {
    try {
      if (user && isUser(user)) {
        await deleteUser(user.id);
        toast.success('Account deleted successfully!', { autoClose: 2000, pauseOnFocusLoss: false });
      }
    } catch (error) {
      toast.error('Error deleting account. Please try again.', { autoClose: 2000, pauseOnFocusLoss: false });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return <Spin />;
  }

  const renderField = (label: string, field: keyof TempUserValues | 'password', choices: any[] | null = null) => (
    <div style={{ width: editingField === field ? '70%' : '100%', marginBottom: '1rem' }}>
      <Typography.Text>{label}</Typography.Text>
      <div style={{ backgroundColor: '#F9FAFC', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
        {editingField === field ? (
          <>
            {choices ? (
              <Select autoFocus value={tempValues[field]} onChange={value => handleChange(field, value)}>
                {choices.map((choice, index) => (
                  <Select.Option key={index} value={choice.label}>
                    {choice.label}
                  </Select.Option>
                ))}
              </Select>
            ) : editingField === 'password' ? (
              <PasswordChange
                userId={user?.id}
                onSuccess={() => {
                  setShowPasswordChange(false);
                  setEditingField(null);
                }}
                onCancel={handleCancel}
              />
            ) : (
              <Input autoFocus value={tempValues[field]} onChange={e => handleChange(field, e.target.value)} />
            )}
            {field !== 'password' && (
              <Space>
                <Button icon={<CheckOutlined />} onClick={() => handleSaveAll(field)} />
                <Button icon={<CloseOutlined />} onClick={handleCancel} />
              </Space>
            )}
          </>
        ) : (
          <div style={{ position: 'relative', padding: '0.6rem', width: '100%' }}>
            {field === 'password' ? (
              <Typography.Text>••••••••</Typography.Text>
            ) : (
              <Typography.Text>{user[field] ? user[field].toString() : "••••••••"}</Typography.Text>
            )}
            <Button
              icon={<EditOutlined />}
              type='text'
              onClick={() => handleEditToggle(field)}
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout className='p-4 bg-indigo-100	 rounded-lg text-left mb-4'>
      <div className='p-4 bg-gray-100 rounded-lg text-left mb-4'>
        <div
          className='flex items-center justify-center'
          style={{ paddingInline: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <Typography.Title level={2} className='mt-3'>
            Account Settings
          </Typography.Title>
        </div>
        <div>
          <Space direction='vertical' style={{ width: '100%' }}>
            <div className='mx-auto max-w-[600px] p-6'>
              <Divider className='text-lg font-semibold'>LOGIN INFORMATION</Divider>
              <div className='mt-4'>
                <div className='mb-3'>
                  <Typography.Text>Username</Typography.Text>
                  <Input disabled value={tempValues['username']} style={{ cursor: 'default' }} />
                </div>
                {renderField('Password', 'password')}
              </div>

              <Divider className='text-lg font-semibold'>PROFILE DETAILS</Divider>
              <div className='mt-4'>
                {renderField('First Name', 'firstName')}
                {renderField('Last Name', 'lastName')}
                {renderField('Email', 'email')}
                {renderField('University', 'university', UNIVERSITY_CHOICES.slice(1))}
              </div>

              <Divider>ATTENDED EVENTS</Divider>
              <List>
                {user.attended.length > 0 ? (
                  <div className='p-4 bg-gray-100 rounded-lg text-left mb-4'>
                    <div className='flex items-center space-x-2'>
                      <p className='text-md font-semibold flex-grow'>
                        You have attended {user.attended.length} events.
                      </p>
                      <button
                        className='text-blue-500 hover:text-blue-600 hover:underline font-medium'
                        onClick={() => setIsAttendedModalOpen(true)}>
                        View Details
                      </button>
                    </div>
                    <AttendedArticles isOpen={isAttendedModalOpen} onClose={() => setIsAttendedModalOpen(false)} />
                  </div>
                ) : (
                  <List.Item>No articles attended.</List.Item>
                )}
              </List>

              <div className='p-4 bg-gray-100 rounded-lg text-left mb-4'>
                <Divider>PERMISSIONS </Divider>

                {user && (
                  <div className='mt-2'>
                    <div className='flex items-center'>
                      <p className='font-medium mr-2'>Calendars:</p>
                      <span className='text-gray-600 text-sm'>
                        {canWriteCalendars && canWriteCalendars.map(p => p.name).join(', ')}
                      </span>
                    </div>
                    <div className='flex items-center mb-2'>
                      <p className='font-medium mr-2'>Subscribed:</p>
                      <span className='text-gray-600 text-sm'>
                        {canReadCalendars && canReadCalendars.map(p => p.name).join(', ')}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Divider className='text-lg font-semibold text-red-600'>DANGER ZONE</Divider>
              <div className='p-4 bg-red-100 rounded-lg text-left mb-4'>
                <button
                  className='text-red-600 hover:text-red-700 hover:underline font-medium'
                  onClick={handleClickOpen}>
                  Delete Account
                </button>
              </div>

              <Modal
                title='Confirm Deletion'
                open={open}
                onCancel={handleClose}
                footer={[
                  <Button key='back' onClick={handleClose}>
                    Cancel
                  </Button>,
                  <Button
                    key='submit'
                    ghost
                    className='submit-blue-button'
                    type='primary'
                    onClick={handleDeleteAccount}>
                    Confirm
                  </Button>
                ]}>
                Are you sure you want to delete your account? This action cannot be undone.
              </Modal>
            </div>
          </Space>
        </div>
      </div>
    </Layout>
  );
};

export default UserSettings;
