import { canWriteCalendarsState } from '@/appState';
import { Article, TimeRange } from '@/types';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useRecoilValue } from 'recoil';
import TimeRangePicker from './TimeRangePicker';

const { Option } = Select;

interface ArticleFormFieldsProps<T extends Article | Partial<Article>> {
  article: T;
  setArticle: React.Dispatch<T>;
  date: Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  timeRange: TimeRange;
  setTimeRange: React.Dispatch<React.SetStateAction<TimeRange>>;
  onDelete?: (articleId: string) => void;
}

const ArticleFormFields = <T extends Article | Partial<Article>>({
  article,
  setArticle,
  date,
  setDate,
  timeRange,
  setTimeRange,
  onDelete
}: ArticleFormFieldsProps<T>) => {
  const allowedCalendars = useRecoilValue(canWriteCalendarsState);

  return (
    <>
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
            <Select value={article.calendarId} onChange={value => setArticle({ ...article, calendarId: value })}>
              <Option value='' disabled>
                <span className='disabled-option'>Select Calendar</span>
              </Option>
              {allowedCalendars.map(calendar => (
                <Option key={calendar.id} value={calendar.id}>
                  {calendar.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Speaker' labelCol={{ span: 24 }} colon={false} className='newArticleForm'>
            <Input
              placeholder='Speaker'
              value={article.speaker || ''}
              onChange={e => setArticle({ ...article, speaker: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Date & Time Picker */}
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
                setArticle({
                  ...article,
                  date: date ? (date instanceof Date ? date : date.toDate()) : article.date
                });
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
            <TimeRangePicker value={timeRange} onChange={setTimeRange} isNewArticle={!!article.id} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label='Meeting Type' labelCol={{ span: 24 }} colon={false} className='newArticleForm'>
            <Select value={article.meetingType} onChange={value => setArticle({ ...article, meetingType: value })}>
              <Select.Option value='Virtual'>Virtual</Select.Option>
              <Select.Option value='In-Person'>In-Person</Select.Option>
              <Select.Option value='Hybrid'>Hybrid</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        {article.meetingType !== 'In-Person' && (
          <Col span={12}>
            <Form.Item label='Meeting Details' labelCol={{ span: 24 }} colon={false} className='newArticleForm'>
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
      <Form.Item label='Notes' labelCol={{ span: 24 }} colon={false} className='newArticleForm'>
        <Input.TextArea
          placeholder='Additional Details (e.g. required readings, preparation material)'
          value={article.additionalDetails || ''}
          onChange={e => setArticle({ ...article, additionalDetails: e.target.value || '' })}
        />
      </Form.Item>
      <Form.Item>
        <Row gutter={24}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}></Col>
          <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='primary' ghost className='submit-blue-button' htmlType='submit'>
              Submit
            </Button>
          </Col>
          {article && onDelete && (
            <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className='delete-button'
                icon={<DeleteOutlined />}
                onClick={() => onDelete((article as Article).id)}
              />
            </Col>
          )}
        </Row>
      </Form.Item>
    </>
  );
};

export default ArticleFormFields;
