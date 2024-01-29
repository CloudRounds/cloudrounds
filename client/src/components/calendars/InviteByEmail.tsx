import { useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { createInvite } from '@/services/InviteService';
import { fetchUsers } from '@/services/UserService';

import { calendarsState } from '@/appState';
import { addEmailMemberToCalendar } from '@/services/CalendarService';
import { Calendar, User } from '@/types';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

interface InviteByEmailProps {
  selectedCalendar: Calendar | null;
  isEmailModalOpen: boolean;
  setEmailModalOpen: (isEmailModalOpen: boolean) => void;
  createRequestMutation: any;
}

const InviteByEmail = ({
  selectedCalendar,
  isEmailModalOpen,
  setEmailModalOpen,
  createRequestMutation
}: InviteByEmailProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [form] = Form.useForm();

  const { data: users, isLoading: isLoadingUsers } = useQuery('users', fetchUsers);
  const setCalendars = useSetRecoilState(calendarsState);

  const [isSending, setIsSending] = useState(false);

  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
    setEmailInput('');
  };

  const handleExistingUser = async (existingUserId: string) => {
    const request = {
      calendarId: selectedCalendar?.id,
      userId: existingUserId
    };
    await createRequestMutation.mutateAsync(request);

    setIsSending(false);
  };

  const updateCalendarWithEmailMember = (calendarId: string, email: string) => {
    const newMember = {
      id: `${email}-calendar-${calendarId}`,
      calendarId,
      email
    };
    setCalendars(prevCalendars =>
      prevCalendars.map(calendar => {
        if (calendar.id === calendarId) {
          return {
            ...calendar,
            emailMembers: [...calendar.emailMembers, newMember]
          };
        }
        return calendar;
      })
    );
  };

  const handleSubmit = async () => {
    setIsSending(true);

    const existingUser = users.find((user: User) => user.email === emailInput);

    if (existingUser) {
      await handleExistingUser(existingUser.id);
    } else {
      const token = uuidv4();
      // expires 72 hours from now
      const expirationTime = new Date(Date.now() + 72 * 60 * 60 * 1000);

      if (!selectedCalendar) {
        return;
      }
      const fullName = `${selectedCalendar.creator?.firstName} ${selectedCalendar.creator?.lastName}`;
      const inviteData = {
        email: emailInput,
        creator: fullName,
        calendarName: selectedCalendar.name,
        calendarId: selectedCalendar.id,
        token,
        expirationTime
      };

      try {
        await createInvite(inviteData);
        await addEmailMemberToCalendar(selectedCalendar.id, emailInput);
        updateCalendarWithEmailMember(selectedCalendar.id, emailInput);
        toast.success('Invite sent successfully!');
      } catch (error) {
        toast.error('Error sending invite. Please try again.');
      }
    }

    handleCloseEmailModal();
    setIsSending(false);
  };

  const handleOk = () => {
    form.submit();
  };

  if (isLoadingUsers) {
    return <Spin />;
  }

  return (
    <div className='mt-auto'>
      <Button onClick={() => setEmailModalOpen(true)}>Invite by email</Button>

      <Modal title='Invite by Email' open={isEmailModalOpen} onCancel={handleCloseEmailModal} onOk={handleOk}>
        <Form form={form} onFinish={handleSubmit}>
          {isSending ? (
            <Spin />
          ) : (
            <Form.Item
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid email.'
                },
                {
                  required: true,
                  message: 'Please input your email!'
                }
              ]}>
              <Input
                placeholder='Enter email address'
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default InviteByEmail;
