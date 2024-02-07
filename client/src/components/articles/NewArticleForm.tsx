import { articlesState, calendarsState, canWriteCalendarsState } from '@/appState';
import { INITIAL_ARTICLE_DATA } from '@/appState/initialStates';
import { useUser } from '@/hooks/useUser';
import { createArticle } from '@/services/ArticleService';
import { createCalendar } from '@/services/CalendarService';
import { Article, TimeRange } from '@/types';
import { Form, Modal, message } from 'antd';
import dayjs, { Dayjs, isDayjs } from 'dayjs';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import NewCalendarDialog, { NewCalendar } from './actions/NewCalendarDialog';
import ArticleFormFields from './form/ArticleFormFields';

interface NewArticleFormProps {
  open: boolean;
  onClose: () => void;
  onCreateArticle: (newArticle: Article) => Promise<void>;
}

const NewArticleForm = ({ open, onClose, onCreateArticle }: NewArticleFormProps) => {
  const { user } = useUser();
  const setArticles = useSetRecoilState(articlesState);
  const setCalendars = useSetRecoilState(calendarsState);
  const allowedCalendars = useRecoilValue(canWriteCalendarsState);

  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false);
  const [newCalendar, setNewCalendar] = useState<NewCalendar>({ name: '', description: '' });
  const [newArticle, setNewArticle] = useState<Partial<Article>>(INITIAL_ARTICLE_DATA);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [timeRange, setTimeRange] = useState<TimeRange>([null, null]);

  // SUBMIT NEW ARTICLE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const [start, end] = timeRange;
    const startTimeFormatted = isDayjs(start) && start.format('h:mm A');
    const endTimeFormatted = isDayjs(end) && end.format('h:mm A');

    if (!start || !end) {
      message.error('Both start and end times are required');
      return;
    }

    if (!date) {
      message.error('Date is required');
      return;
    }

    if (!newArticle.title || newArticle.title.trim() === '') {
      message.error('Title cannot be empty');
      return;
    }

    const payload = {
      ...newArticle,
      duration: `${startTimeFormatted} - ${endTimeFormatted}`,
      organizerId: user?.id,
      calendarId: newArticle.calendarId,
      eventLink: newArticle.eventLink
    };

    console.log(payload);

    try {
      const newArticle = await createArticle(payload);
      setArticles(prev => [...prev, newArticle]);
      onCreateArticle(newArticle);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCalendar = async () => {
    const calendar = {
      name: newCalendar.name,
      description: newCalendar.description,
      creatorId: user.id
    };
    const createdCalendar = await createCalendar(calendar);
    setCalendars(prevCalendars => [...prevCalendars, createdCalendar]);
    setNewCalendar({ name: '', description: '' });
    setShowAddCalendarModal(false);
  };

  if (!user || !allowedCalendars) {
    return null;
  }

  const onModalClose = () => {
    setNewArticle(INITIAL_ARTICLE_DATA);
    setTimeRange([null, null]);
    setDate(dayjs());
    onClose();
  };

  return (
    <Modal open={open} onCancel={onModalClose} footer={null} className='new-article-form'>
      {allowedCalendars.length > 0 ? (
        <Form onFinish={handleSubmit} className='compact-form'>
          <ArticleFormFields<Partial<Article>>
            article={newArticle}
            setArticle={setNewArticle}
            date={date}
            setDate={setDate}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </Form>
      ) : (
        <div className='disabled-option'>
          No calendars yet. Click the{' '}
          <a href='https://cloudrounds.com/manage' style={{ color: '#333', textDecoration: 'underline' }}>
            Manage tab
          </a>{' '}
          to create a calendar.
        </div>
      )}

      <NewCalendarDialog
        showAddCalendarModal={showAddCalendarModal}
        setShowAddCalendarModal={setShowAddCalendarModal}
        setNewCalendar={setNewCalendar}
        newCalendar={newCalendar}
        handleAddCalendar={handleAddCalendar}
      />
    </Modal>
  );
};

export default NewArticleForm;
