import { articlesState, calendarsState, canWriteCalendarsState } from '@/appState';
import { useUser } from '@/hooks/useUser';
import { updateArticle } from '@/services/ArticleService';
import { createCalendar } from '@/services/CalendarService';
import { Article, TimeRange } from '@/types';
import { extractTimesFromDuration } from '@/utils/dates';
import { Form, Modal, message } from 'antd';
import dayjs, { Dayjs, isDayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import NewCalendarDialog, { NewCalendar } from './actions/NewCalendarDialog';
import ArticleFormFields from './form/ArticleFormFields';

interface EditArticleFormProps {
  open: boolean;
  article: Article | null;
  setArticle: React.Dispatch<React.SetStateAction<Article | null>>;
  onDelete: (articleId: string) => Promise<void>;
  onArticleUpdate: (updatedArticle: Article) => Promise<void>;
}

const EditArticleForm = ({ open, article, setArticle, onDelete, onArticleUpdate }: EditArticleFormProps) => {
  const { user } = useUser();
  const setArticles = useSetRecoilState(articlesState);
  const setCalendars = useSetRecoilState(calendarsState);

  const [editedArticle, setEditedArticle] = useState<Article | null>(article);
  const [date, setDate] = useState<Dayjs | null>(article ? dayjs(article.date) : null);
  const [timeRange, setTimeRange] = useState<TimeRange>([null, null]);

  useEffect(() => {
    if (article) {
      setEditedArticle(article);
      setDate(dayjs(article.date));
      const [startTime, endTime] = extractTimesFromDuration(article.duration || '');
      setTimeRange([startTime, endTime]);
    }
  }, [article]);

  const allowedCalendars = useRecoilValue(canWriteCalendarsState);
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false);
  const [newCalendar, setNewCalendar] = useState<NewCalendar>({ name: '', description: '' });

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!editedArticle) return;

    const [start, end] = extractTimesFromDuration(editedArticle.duration);
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
    if (!editedArticle.title || editedArticle.title.trim() === '') {
      message.error('Title cannot be empty');
      return;
    }

    const payload: Article = {
      ...editedArticle,
      date: date.toDate(),
      duration: `${startTimeFormatted} - ${endTimeFormatted}`
    };

    if (!payload.title || payload.title.trim() === '') {
      message.error('Title cannot be empty');
      return;
    }

    try {
      const updatedArticle = await updateArticle(payload);
      setArticles(prev => prev.map(a => (a.id === updatedArticle.id ? updatedArticle : a)));
      onArticleUpdate(updatedArticle);
      onModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCalendar = async () => {
    const calendar = {
      name: newCalendar.name,
      description: newCalendar.description,
      canReadMembers: [],
      canWriteMembers: [],
      creatorId: user?.id || '',
      articles: [],
      emailMembers: [],
      invites: [],
      requests: []
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
    setEditedArticle(null);
    setArticle(null);
  };

  return (
    <Modal open={open} onCancel={onModalClose} footer={null} className='new-article-form'>
      {allowedCalendars.length > 0 ? (
        <Form onFinish={handleSave} className='compact-form'>
          {editedArticle && (
            <ArticleFormFields<Article>
              article={editedArticle}
              setArticle={setArticle}
              date={date}
              setDate={setDate}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              onDelete={onDelete}
            />
          )}
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

export default EditArticleForm;
