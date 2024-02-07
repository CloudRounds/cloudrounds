import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useUser } from '@/hooks/useUser';
import { fetchUserEvents } from '@/services/ScheduleEventService';
import { Spin } from 'antd';
import { useQuery } from 'react-query';
import rrulePlugin from '@fullcalendar/rrule';
import { EventContentArg } from '@fullcalendar/core/index.js';
import { calculateRecurrenceRule } from './rruleHelpers';

const CalendarView: React.FC = () => {
  const { user } = useUser();
  const {
    data: events,
    isLoading,
    isError
  } = useQuery(['fetchUserEvents', user?.id], () => (user?.id ? fetchUserEvents(user.id) : Promise.resolve([])), {
    enabled: !!user?.id
  });

  if (isLoading) {
    return <Spin size='large' />;
  }

  if (isError || !events) {
    return <div>Failed to load events.</div>;
  }

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <div className='fc-event-title'>
          <div>
            <span
              className='w-[10px] h-[10px] border rounded-md inline-block mr-[5px]'
              style={{ backgroundColor: eventInfo.event.backgroundColor }}></span>
            {eventInfo.timeText}
          </div>
          <div>{eventInfo.event.title}</div>
        </div>
      </>
    );
  };

  const calendarEvents = events.map(event => {
    let rrule;
    if (event.repeat) {
      rrule = calculateRecurrenceRule({
        repeat: event.repeat,
        frequency: event.frequency || 1,
        startDate: event.startTime,
        endDate: new Date(event.endDate || '').toISOString() || event.endTime
      });
    }

    console.log(rrule);
    return {
      id: event.id,
      title: event.title,
      start: event.startTime,
      end: event.endTime,
      allDay: event.isAllDay,
      rrule: rrule,
      backgroundColor: '#33ffcb'
    };
  });

  return (
    <div className='w-[80%] mx-auto'>
      <FullCalendar
        timeZone='local'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
        initialView='dayGridMonth'
        events={calendarEvents}
        eventContent={renderEventContent}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />
    </div>
  );
};

export default CalendarView;
