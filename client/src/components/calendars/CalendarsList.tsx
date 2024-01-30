import { calendarsState, canReadCalendarsState, userState } from '@/appState';
import { INITIAL_CALENDAR_DATA } from '@/appState/initialStates';
import { deleteCalendar, updateCalendar } from '@/services/CalendarService';
import { Calendar } from '@/types';
import { Button, Input, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FcCalendar } from 'react-icons/fc';
import { UseMutationResult, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { removeUserFromCalendar } from '../../services/CalendarService';
import EditMemberList from './EditMemberList';
import NewCalendar from './NewCalendar';
import { getColumns, getMemberColumns } from './components/columns';

const CalendarsList = () => {
  const user = useRecoilValue(userState);
  const [calendars, setCalendars] = useRecoilState(calendarsState);
  const canReadCalendars = useRecoilValue(canReadCalendarsState);

  const [open, setOpen] = useState<boolean>(false);
  const [openMemberList, setOpenMemberList] = useState<boolean>(false);
  const [editField, setEditField] = useState<string | null>(null);

  const [openNewCalendar, setOpenNewCalendar] = useState<boolean>(false);

  const [newCalendar, setNewCalendar] = useState<Partial<Calendar>>(INITIAL_CALENDAR_DATA);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(null);

  const [memberCalendars, setMemberCalendars] = useState<Calendar[]>([]);

  useEffect(() => {
    const canRead = canReadCalendars?.filter(calendar => calendar.creator && calendar.creator.id !== user?.id) || [];
    setMemberCalendars(canRead);
  }, [canReadCalendars]);

  const handleSave = async () => {
    if (!selectedCalendar) {
      console.error('No selected calendar');
      return;
    }

    try {
      const updatedCalendar = await updateCalendar(selectedCalendar.id, newCalendar);
      setCalendars(prevCalendars => prevCalendars.map(cal => (cal.id === updatedCalendar.id ? updatedCalendar : cal)));
      handleClose();
      toast.success(`Calendar ${selectedCalendar.name} updated.`);
    } catch (error) {
      toast.error(`Error updating ${selectedCalendar.name}.`);
      console.error('Error updating calendar:', error);
    }
  };

  const deleteCalendarMutation: UseMutationResult<void, Error, string> = useMutation(deleteCalendar, {
    onSuccess: (_, calendarId) => {
      setCalendars(prevCalendars => prevCalendars.filter(calendar => calendar.id !== calendarId));
    }
  });

  const handleLeave = async (calendar: Calendar) => {
    Modal.confirm({
      title: 'Are you sure you want to leave this calendar?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          if (!user) return;
          await removeUserFromCalendar(calendar.name, user.id);
          setMemberCalendars(prevCalendars => prevCalendars.filter(p => p.id !== calendar.id));
          toast.success(`Successfully left calendar.`, {
            autoClose: 1500,
            pauseOnFocusLoss: false
          });
        } catch (error) {
          toast.error(`Error leaving calendar.`, {
            autoClose: 1500,
            pauseOnFocusLoss: false
          });
          console.error('Error leaving calendar:', error);
        }
      },
      onCancel() {
        return;
      }
    });
  };

  const handleOpen = (passedCalendar: Calendar | null = null, field: string | null = null) => {
    if (!passedCalendar) return;
    const calendar = passedCalendar as Calendar;
    setSelectedCalendar(calendar);
    console.log(calendar);
    setNewCalendar({ ...calendar, name: calendar.name, description: calendar.description, creatorId: user?.id || '' });
    setEditField(field);
    setOpen(true);
  };

  const handleOpenMemberList = (calendar: Calendar) => {
    setSelectedCalendar(calendar);
    setOpenMemberList(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewCalendar(INITIAL_CALENDAR_DATA);
    setSelectedCalendar(null);
  };

  const handleDelete = (calendarId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this calendar?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          await deleteCalendarMutation.mutateAsync(calendarId);
          setCalendars(prevCalendars => prevCalendars.filter(calendar => calendar.id !== calendarId));

          console.log(`Calendar deleted`);
        } catch (error) {
          console.error('Error deleting calendar:', error);
        }
      },
      onCancel() {
        return;
      }
    });
  };

  const createdCalendars = calendars?.filter(calendar => calendar.creator && calendar.creator.id === user?.id) || [];
  const columns = getColumns(handleOpen, handleOpenMemberList, handleDelete);
  const memberColumns = getMemberColumns(handleLeave);

  return (
    <div className='px-0 md:px-10'>
      <h1 className='my-4 text-xl'>Your Calendars</h1>
      <Button
        className='flex items-center basic-btn purple-light-full new-calendar-button'
        onClick={() => setOpenNewCalendar(true)}>
        <span style={{ marginRight: '8px' }}>
          <FcCalendar />
        </span>
        <span style={{ fontWeight: 'bold' }}>New Calendar </span>{' '}
      </Button>
      <Table
        dataSource={createdCalendars}
        columns={columns}
        rowKey='id'
        scroll={{ x: true }}
        className='full-width-mobile overflow-x-auto'
      />

      <h1 className='my-4 text-xl'>Member Of</h1>
      <Table
        dataSource={memberCalendars}
        columns={memberColumns}
        rowKey='id'
        scroll={{ x: 'max-content' }}
        className='full-width-mobile overflow-x-auto'
      />

      <Modal title='Edit Calendar' open={open} onCancel={handleClose} onOk={handleSave}>
        {editField === 'name' && (
          <Input
            autoFocus
            placeholder='Calendar Name'
            value={newCalendar.name}
            onChange={e => setNewCalendar({ ...newCalendar, name: e.target.value })}
          />
        )}
        {editField === 'description' && (
          <Input
            placeholder='Calendar Description'
            value={newCalendar.description || ''}
            onChange={e => setNewCalendar({ ...newCalendar, description: e.target.value })}
          />
        )}
      </Modal>

      <NewCalendar open={openNewCalendar} handleClose={() => setOpenNewCalendar(false)} />
      <EditMemberList
        open={openMemberList}
        handleClose={() => setOpenMemberList(false)}
        selectedCalendar={selectedCalendar}
      />
    </div>
  );
};

export default CalendarsList;
