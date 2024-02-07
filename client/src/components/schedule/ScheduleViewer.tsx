// ScheduleViewer.tsx
import { schedulesRefetchTrigger } from '@/appState';
import { useSchedule } from '@/contexts/ScheduleContext';
import { fetchSchedules } from '@/services/ScheduleService';
import { Spin } from 'antd';
import { useState } from 'react';
import { GrSchedules } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import CmdKInput from './CmdKInput';
import EventManagementModal from './EventManagementModal';
import ScheduleCard from './ScheduleCard';
import ScheduleModal from './ScheduleModal';
import { Schedule } from '@/types';
import CalendarView from './CalendarView';

const ScheduleViewer: React.FC = () => {
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState<string | null>(null);
  const refetchTrigger = useRecoilValue(schedulesRefetchTrigger);

  const { data: schedules, isLoading } = useQuery(['schedules', refetchTrigger], fetchSchedules, {
    keepPreviousData: true
  });
  const { setScheduleModalOpen } = useSchedule();

  const handleCreateSchedule = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setScheduleModalOpen(true);
  };

  if (!schedules || isLoading) {
    return <Spin />;
  }

  const handleEditEvents = (scheduleId: string) => {
    setCurrentScheduleId(scheduleId);
    setEventModalVisible(true);
  };

  return (
    <>
      <div className='scheduleViewerContainer'>
        <div className='add-schedule-container'>
          <button onClick={handleCreateSchedule} className='flex items-center basic-btn purple-light-full'>
            <span style={{ marginRight: '8px' }}>
              <GrSchedules style={{ color: 'lightgray' }} />
            </span>
            <span style={{ fontWeight: 'bold' }}>Add New Schedule</span>{' '}
          </button>
        </div>
        {schedules.length === 0 ? (
          <p className='py-2'>No schedules found. Please create one!</p>
        ) : (
          <div className='grid-container'>
            {schedules.map((schedule: Schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} onEditEvents={handleEditEvents} />
            ))}
          </div>
        )}
        <EventManagementModal
          isVisible={eventModalVisible}
          onClose={() => setEventModalVisible(false)}
          scheduleId={currentScheduleId || ''}
        />
        <ScheduleModal />
        <CmdKInput />
      </div>
      <CalendarView />
    </>
  );
};

export default ScheduleViewer;
