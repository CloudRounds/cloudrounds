import { Button, Card } from 'antd';
import { Schedule } from '@/types';

interface ScheduleCardProps {
  schedule: Schedule;
  onEditEvents: (scheduleId: string) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, onEditEvents }) => {
  return (
    <Card
      title={schedule.name}
      style={{ minWidth: '300px', maxWidth: '400px' }}
      extra={<Button onClick={() => onEditEvents(schedule.id)}>Manage Events</Button>}>
      <p className='italic mb-4'>{schedule.description}</p>
      <p className='text-gray-500'>Events: {schedule.events.length}</p>
    </Card>
  );
};

export default ScheduleCard;
