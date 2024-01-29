import { useState } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import { createCalendar } from '@/services/CalendarService';
import { useMutation } from 'react-query';
import { Calendar, CreateCalendarInput } from '@/types';
import { calendarsState } from '@/appState';
import { useSetRecoilState } from 'recoil';
import { INITIAL_CALENDAR_DATA } from '@/appState/initialStates';

interface NewCalendarProps {
  open: boolean;
  handleClose: () => void;
}

const NewCalendar = ({ open, handleClose }: NewCalendarProps) => {
  const [loading, setLoading] = useState(false);
  const [newCalendar, setNewCalendar] = useState<CreateCalendarInput>(INITIAL_CALENDAR_DATA);
  const setCalendars = useSetRecoilState(calendarsState);

  const createCalendarMutation = useMutation(createCalendar, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (newCalendar: Calendar) => {
      setCalendars(prevCalendars => [...prevCalendars, newCalendar]);
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
