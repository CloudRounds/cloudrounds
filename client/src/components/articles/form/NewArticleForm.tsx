import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { createArticle, updateArticle } from '@/services/articles/ArticleService';
import { createCalendar, fetchCalendars } from '@/services/calendars/CalendarService';
import { initialArticleData } from '@/utils/constants';
import { extractTimesFromDuration } from '@/utils/dates';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, message } from 'antd';
import dayjs, { Dayjs, isDayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import NewCalendarDialog, { NewCalendar } from '../actions/NewCalendarDialog';
import './NewArticleForm.css';
import TimeRangePicker from './TimeRangePicker';
import { User, Article, Calendar, ArticleCreateInput, CalendarCreateInput } from '@/types';

const { Option } = Select;

interface NewArticleFormProps {
  open: boolean;
  onClose: () => void;
  selectedArticle: Article | null;
  setSelectedArticle: React.Dispatch<React.SetStateAction<Article | null>>;
  onDelete: (articleId: string) => Promise<void>;
  onCreateArticle: (newArticle: Article) => Promise<void>;
  onArticleUpdate: (updatedArticle: Article) => Promise<void>;
}

type TimeRange = [string, string] | [Dayjs, Dayjs];

const NewArticleForm = ({
  open,
  onClose,
  selectedArticle,
  setSelectedArticle,
  onDelete,
  onArticleUpdate,
  onCreateArticle
}: NewArticleFormProps) => {
  const localUser = localStorage.getItem('CloudRoundsUser');
  const user = localUser ? (JSON.parse(localUser) as User) : null;

  const [allowedCalendars, setAllowedCalendars] = useState<Calendar[] | null>(null);
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false);
  const [newCalendar, setNewCalendar] = useState<NewCalendar>({ name: '', description: '' });
  const [article, setArticle] = useState<Article | ArticleCreateInput>(initialArticleData);

  const [date, setDate] = useState(dayjs());
  const [timeRange, setTimeRange] = useState<TimeRange>(() => {
    if (selectedArticle) {
      const [startTime, endTime] = extractTimesFromDuration(selectedArticle.duration);
      return [startTime, endTime];
    } else {
      return ['', ''];
    }
  });

  const [articleCalendar, setArticleCalendar] = useState<Calendar | null | CalendarCreateInput>(
    (selectedArticle && selectedArticle.calendar) || null
  );

  // Fetch calendars
  const {
    data: calendars,
    isLoading: loadingCalendars,
    refetch: refetchCalendars
  } = useQuery<Calendar[], Error>(['userCalendars', user?.id], () => fetchCalendars(user?.id || ''), {
    enabled: !!user
  });

  const filterCalendarsForUser = () => {
    const canWriteCalendars = calendars?.filter(calendar => {
      const canWriteMemberIds = calendar.canWriteMembers.map(member => member.id);
      return canWriteMemberIds.includes(user?.id || '');
    });

    return canWriteCalendars;
  };

  useEffect(() => {
    if (loadingCalendars) {
      return;
    }
    const canWrite = filterCalendarsForUser();

    if (canWrite) {
      setAllowedCalendars(canWrite || []);
      if (canWrite.length > 0) {
        setArticle(prevArticle => ({ ...prevArticle, calendar: canWrite[0].id.toString() }));
      }
    }
  }, [loadingCalendars]);

  useEffect(() => {
    if (selectedArticle) {
      setArticle(selectedArticle);
      setArticleCalendar(selectedArticle.calendar);
      const [startTime, endTime] = extractTimesFromDuration(selectedArticle.duration);
      setTimeRange([startTime, endTime]);
      setDate(dayjs(selectedArticle.date));
    } else {
      setArticleCalendar(null);
      setArticle(initialArticleData);
      setTimeRange(['', '']);
      setDate(dayjs());
    }
  }, [selectedArticle]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const [start, end] = timeRange;
    const startTimeFormatted = isDayjs(start) && start.format('h:mm A');
    const endTimeFormatted = isDayjs(end) && end.format('h:mm A');

    if (!timeRange[0] || !timeRange[1]) {
      message.error('Both start and end times are required');
      return;
    }

    const calendarId = (articleCalendar as Calendar).id;

    const payload: Article = {
      ...(article as Article),
      id: (article as Article).id,
      date: date ? date.format() : article.date,
      duration: `${startTimeFormatted} - ${endTimeFormatted}`,
      organizerId: user?.id || '',
      calendarId: calendarId,
      eventLink: article.eventLink,
      attendees: []
    };

    if (!payload.title || payload.title.trim() === '') {
      message.error('Title cannot be empty');
      return;
    }

    try {
      const updatedArticle = await updateArticle(payload);
      onArticleUpdate(updatedArticle);
      setSelectedArticle(null);
    } catch (error) {
      console.error(error);
      setSelectedArticle(null);
    }

    if (!payload.title || payload.title.trim() === '') {
      message.error('Title cannot be empty');
      return;
    }

    try {
      const updatedArticle = await updateArticle(payload);
      onArticleUpdate(updatedArticle);
      setSelectedArticle(null);
    } catch (error) {
      console.error(error);
      setSelectedArticle(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const [start, end] = timeRange;

    if (!timeRange[0] || !timeRange[1]) {
      message.error('Both start and end times are required');
      return;
    }

    const startTimeFormatted = isDayjs(start) && start.format('h:mm A');
    const endTimeFormatted = isDayjs(end) && end.format('h:mm A');

    const calendarId = (articleCalendar as Calendar).id;

    const payload = {
      ...article,
      date: date ? date : article.date,
      duration: `${startTimeFormatted} - ${endTimeFormatted}`,
      organizer: user?.id,
      calendar: calendarId,
      event_link: article.eventLink
    };

    if (!payload.title || payload.title.trim() === '') {
      message.error('Title cannot be empty');
      return;
    }

    try {
      const newArticle = await createArticle(payload);
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
      canReadMembers: [] as string[],
      canWriteMembers: [] as string[],
      creatorId: user?.id || ''
    };
    const createdCalendar = await createCalendar(calendar);
    setAllowedCalendars([...(allowedCalendars || []), createdCalendar]);
    setNewCalendar({ name: '', description: '' });
    refetchCalendars();
    setShowAddCalendarModal(false);
  };

  if (!user || !allowedCalendars) {
    return <LoadingSpinner />;
  }

  const onModalClose = () => {
    setSelectedArticle(null);
    setArticleCalendar(null);
    setTimeRange(['', '']);
    setDate(dayjs());
    setArticle(initialArticleData);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onModalClose}
      footer={null}
      className='new-article-form'>
      {allowedCalendars.length > 0 ? (
        <Form
          onFinish={selectedArticle ? handleSave : handleSubmit}
          className='compact-form'>
          <Form.Item
            label='Title*'
            labelCol={{ span: 24 }}
            colon={false}
            className='newArticleForm'
            rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input
              placeholder='Title'
              value={article.title}
              onChange={e => setArticle({ ...article, title: e.target.value })}
            />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label='Calendar*'
                labelCol={{ span: 24 }}
                colon={false}
                className='newArticleForm'
                rules={[{ required: true, message: 'Please select a calendar!' }]}>
                <Select
                  value={(articleCalendar as Calendar).id}
                  onChange={value => setArticleCalendar({ ...(articleCalendar as Calendar), id: value })}>
                  <Option
                    value=''
                    disabled>
                    <span className='disabled-option'>Select Calendar</span>
                  </Option>
                  {allowedCalendars.map(calendar => (
                    <Option
                      key={calendar.id}
                      value={calendar.id}>
                      {calendar.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Speaker'
                labelCol={{ span: 24 }}
                colon={false}
                className='newArticleForm'>
                <Input
                  placeholder='Speaker'
                  value={article.speaker || ''}
                  onChange={e => setArticle({ ...article, speaker: e.target.value })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label='Date*'
                labelCol={{ span: 24 }}
                colon={false}
                className='newArticleForm'
                rules={[{ required: true, message: 'Please select a date!' }]}>
                <DatePicker
                  className='w-full'
                  value={date ? dayjs(date) : null}
                  onChange={dateValue => {
                    setDate(dateValue ? dayjs(dateValue) : dayjs(new Date()));
                    setArticle({ ...article, date: dayjs(dateValue) });
                  }}
                  disabledDate={current => current && current.isBefore(dayjs(), 'day')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Time*'
                labelCol={{ span: 24 }}
                colon={false}
                className='newArticleForm'
                rules={[{ required: true, message: 'Please select a start/end time!' }]}>
                <TimeRangePicker
                  value={timeRange}
                  onChange={(newRange: TimeRange) => setTimeRange(newRange)}
                  isNewArticleModalOpen={open}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label='Meeting Type'
                labelCol={{ span: 24 }}
                colon={false}
                className='newArticleForm'>
                <Select
                  value={article.meetingType}
                  onChange={value => setArticle({ ...article, meetingType: value })}>
                  <Select.Option value='Virtual'>Virtual</Select.Option>
                  <Select.Option value='In-Person'>In-Person</Select.Option>
                  <Select.Option value='Hybrid'>Hybrid</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {article.meetingType !== 'In-Person' && (
              <Col span={12}>
                <Form.Item
                  label='Meeting Details'
                  labelCol={{ span: 24 }}
                  colon={false}
                  className='newArticleForm'>
                  <Row gutter={16}>
                    <Col span={9}>
                      <Input
                        placeholder='ID'
                        value={article.meetingId || ''}
                        onChange={e => setArticle({ ...article, meetingId: e.target.value })}
                      />
                    </Col>
                    <Col span={15}>
                      <Input
                        placeholder='Passcode'
                        value={article.passcode || ''}
                        onChange={e => setArticle({ ...article, passcode: e.target.value })}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            )}
          </Row>

          {/* EVENT LINK */}
          <Form.Item
            label={article.meetingType === 'In-Person' ? 'Location' : 'Event Link'}
            className='newArticleForm'
            labelCol={{ span: 24 }}
            colon={false}>
            <Input
              placeholder={
                article.meetingType !== 'In-Person' ? 'Event Link (Virtual Meeting)' : 'Location (In-Person Meeting)'
              }
              value={article.meetingType !== 'In-Person' ? article.eventLink || '' : article.location || ''}
              onChange={e =>
                setArticle({
                  ...article,
                  [article.meetingType !== 'In-Person' ? 'event_link' : 'location']: e.target.value
                })
              }
            />
          </Form.Item>

          <Form.Item
            label='Notes'
            labelCol={{ span: 24 }}
            colon={false}
            className='newArticleForm'>
            <Input.TextArea
              placeholder='Additional Details (e.g. required readings, preparation material)'
              value={article.additionalDetails || ''}
              onChange={e => setArticle({ ...article, additionalDetails: e.target.value || '' })}
            />
          </Form.Item>
          <Form.Item>
            <Row gutter={24}>
              <Col
                span={8}
                style={{ display: 'flex', justifyContent: 'center' }}></Col>
              <Col
                span={8}
                style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type='primary'
                  ghost
                  className='submit-blue-button'
                  htmlType='submit'>
                  Submit
                </Button>
              </Col>
              {selectedArticle && (
                <Col
                  span={8}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    className='delete-button'
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete((article as Article).id)}
                  />
                </Col>
              )}
            </Row>
          </Form.Item>
        </Form>
      ) : (
        <div className='disabled-option'>
          No calendars yet. Click the{' '}
          <a
            href='https://cloudrounds.com/manage'
            style={{ color: '#333', textDecoration: 'underline' }}>
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
