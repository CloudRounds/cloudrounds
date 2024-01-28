import { useState } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import { createCalendar } from '@/services/CalendarService';
import { useMutation } from 'react-query';
import userStore from '@/stores/userStore';
import { Calendar, CreateCalendarInput } from '@/types';
import { INITIAL_CALENDAR_DATA } from '@/utils/constants';

interface NewCalendarProps {
  open: boolean;
  handleClose: () => void;
  calendars: Calendar[];
  setCalendars: (calendars: Calendar[]) => void;
  refetchCalendars: () => void;
}

const NewCalendar = ({ open, handleClose, calendars, setCalendars, refetchCalendars }: NewCalendarProps) => {
  const [loading, setLoading] = useState(false);
  const [newCalendar, setNewCalendar] = useState<CreateCalendarInput>(INITIAL_CALENDAR_DATA);

  const createCalendarMutation = useMutation(createCalendar, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async (newCalendar: Calendar) => {
      refetchCalendars();
      const newCalendars = [...calendars, newCalendar];
      userStore.setCalendars(newCalendars);
      setCalendars(newCalendars);
      setLoading(false);
      handleClose();
    },
    onError: () => {
      setLoading(false);
    }
  });

  const handleSave = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await createCalendarMutation.mutateAsync(newCalendar);
      } catch (error) {
        console.error('Error while saving:', error);
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      title='Create New Calendar'
      open={open}
      onCancel={handleClose}
      footer={[
        <Button key='back' onClick={handleClose}>
          Cancel
        </Button>,
        <Button
          key='submit'
          ghost
          type='primary'
          loading={loading}
          onClick={handleSave}
          className='new-calendar-button'>
          Save
        </Button>
      ]}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Input
            placeholder='Name/Acronym (e.g. UofT OMR)'
            onChange={e => setNewCalendar({ ...newCalendar, name: e.target.value })}
          />
          <Input
            placeholder='Description (e.g. Weekly Divisional Cardiology Rounds)'
            style={{ marginTop: '10px' }}
            onChange={e => setNewCalendar({ ...newCalendar, description: e.target.value })}
          />
        </>
      )}
    </Modal>
  );
};

export default NewCalendar;
