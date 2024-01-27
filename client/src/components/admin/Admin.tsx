import useSuperAdmin from '@/hooks/useSuperAdmin';
import { updateCalendar, fetchCalendars } from '@/services/calendars/CalendarService';
import { Button, Modal, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import MemberList from './MemberList';
import AccessDenied from './AccessDenied';
import { Calendar } from '@/types';
import { User } from '@/types';
import { ColumnType } from 'antd/es/table';
import { fetchUserById } from '@/services/users/UserService';

const Admin = () => {
  const localUser = localStorage.getItem('CloudRoundsUser');
  const user = localUser ? (JSON.parse(localUser) as User) : null;

  const { data, isLoading: isLoadingCalendars } = useQuery<Calendar[]>(
    ['calendars', user?.id],
    () => fetchCalendars(user?.id || ''),
    {
      enabled: !!user
    }
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(null);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const { isSuperAdmin, isLoading: isSuperAdminCheckLoading, isError } = useSuperAdmin();

  useEffect(() => {
    if (!isLoadingCalendars) {
      setCalendars(data || []);
    }
  }, [isLoadingCalendars]);

  const mutation = useMutation(updateCalendar, {
    onSuccess: (updatedCalendar: Calendar) => {
      setCalendars(prevCalendars => prevCalendars.map(p => (p.id === updatedCalendar.id ? updatedCalendar : p)));
      console.log('Calendars/permissions updated successfully');
      setOpenModal(false);
    },
    onError: (error: Error) => {
      console.error('Error updating calendars/permissions:', error);
    }
  });

  const handleSavePermissions = () => {
    if (selectedCalendar) {
      mutation.mutate({ calendarId: selectedCalendar.id, editedCalendar: selectedCalendar });
    }
  };

  const updateUserPermissions = async (memberId: string, type: string) => {
    const user = await fetchUserById(memberId);
    if (user) {
      setCalendars(prevCalendars => {
        return prevCalendars.map(calendar => {
          if (calendar.id === selectedCalendar?.id) {
            const updatedCalendar = { ...calendar };
            const memberArray = type === 'canRead' ? updatedCalendar.canReadMembers : updatedCalendar.canWriteMembers;
            updatedCalendar[type === 'canRead' ? 'canReadMembers' : 'canWriteMembers'] = [...memberArray, user];
            return updatedCalendar;
          }
          return calendar;
        });
      });
    }
  };

  const handlePermissionChange = (memberId: string, type: string) => {
    setCalendars(prevCalendars => {
      return prevCalendars.map(calendar => {
        if (calendar.id === selectedCalendar?.id) {
          const updatedCalendar = { ...calendar };
          const memberArray = type === 'canRead' ? updatedCalendar.canReadMembers : updatedCalendar.canWriteMembers;
          const memberIds = memberArray.map(member => member.id);

          if (memberIds.includes(memberId)) {
            updatedCalendar[type === 'canRead' ? 'canReadMembers' : 'canWriteMembers'] = memberArray.filter(
              member => member.id !== memberId
            );
          } else {
            updateUserPermissions(memberId, type);
          }
          return updatedCalendar;
        }
        return calendar;
      });
    });
  };

  if (mutation.isLoading) {
    return <Spin />;
  }

  const renderMemberCount = (members: User[]) => members?.length || 0;

  const columns: ColumnType<Calendar>[] = [
    {
      title: 'Calendar',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Can View',
      dataIndex: 'canReadMembers',
      key: 'canReadMembers',
      render: renderMemberCount
    },
    {
      title: 'Can Write',
      dataIndex: 'canWriteMembers',
      key: 'canWriteMembers',
      render: renderMemberCount
    },
    {
      title: 'Creator',
      dataIndex: ['creator', 'username'],
      key: 'creator'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => {
            setSelectedCalendar(record);
            setOpenModal(true);
          }}>
          Edit Permissions
        </Button>
      )
    }
  ];

  const handleCloseModal = () => {
    setSelectedCalendar(null);
    setOpenModal(false);
  };

  if (isLoadingCalendars || isSuperAdminCheckLoading) {
    return <Spin />;
  }

  if (isError || !isSuperAdmin) {
    return <AccessDenied />;
  }

  return (
    <div>
      <Table dataSource={calendars} columns={columns} rowKey='_id' />
      {selectedCalendar && (
        <Modal
          title={`Edit Permissions for ${selectedCalendar.name}`}
          open={openModal}
          onOk={handleSavePermissions}
          onCancel={handleCloseModal}
          footer={[
            <Button key='back' onClick={handleCloseModal}>
              Cancel
            </Button>,
            <Button key='submit' type='primary' onClick={handleSavePermissions}>
              Save
            </Button>
          ]}>
          <div>
            <Typography.Text>Can Read Members ({renderMemberCount(selectedCalendar.canReadMembers)})</Typography.Text>
            <MemberList
              members={selectedCalendar.canReadMembers || []}
              type='canRead'
              handlePermissionChange={handlePermissionChange}
            />
          </div>
          <div>
            <Typography.Text>Can Write Members ({renderMemberCount(selectedCalendar.canWriteMembers)})</Typography.Text>
            <MemberList
              members={selectedCalendar.canWriteMembers || []}
              type='canWrite'
              handlePermissionChange={handlePermissionChange}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Admin;
