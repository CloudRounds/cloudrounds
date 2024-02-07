import useArticlePermissions from '@/hooks/useArticlePermissions';
import { sortArticlesDescending } from '@/services/ArticleService';
import { createFeedback, deleteFeedback, updateFeedback } from '@/services/FeedbackService';
import { toggleAttending } from '@/services/UserService';
import { formatDate } from '@/utils/dates';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Input, Layout, Modal, Pagination, Spin, Table, Typography } from 'antd';

import { attendedState, feedbacksState } from '@/appState';
import { useUser } from '@/hooks/useUser';
import { Article, Feedback } from '@/types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import calendarIcons from '../ui/CalendarIcons';

const { TextArea } = Input;

const OlderArticles = () => {
  const { user } = useUser();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [attended, setAttended] = useRecoilState(attendedState);
  const [feedbacks, setFeedbacks] = useRecoilState(feedbacksState);

  const [isEditOperation, setIsEditOperation] = useState(false);

  const { allowedArticles, isArticlesLoading, isCalendarsLoading } = useArticlePermissions();

  const sortedArticles = sortArticlesDescending(allowedArticles);

  const currentDate = new Date();
  const filteredArticles = sortedArticles.filter(article => new Date(article.date) <= currentDate);

  useEffect(() => {
    if (user && user.feedbacks && !feedbacks) {
      setFeedbacks(feedbacks);
    }
  }, [feedbacks]);

  useEffect(() => {
    if (user && user.attended && !attended) {
      setAttended(user.attended);
    }
  }, [user, attended]);

  const handleFeedbackSubmit = async (currentArticle: Article | null) => {
    if (!currentArticle) {
      console.error('There was an error submitting the feedback: no article selected');
      return;
    }
    try {
      if (!currentFeedback) return;
      const updatedFeedback = await createFeedback(user.id, currentFeedback.feedback, currentArticle.id);
      const temp = feedbacks.filter(f => f.id !== updatedFeedback.id);
      setFeedbacks([...temp, updatedFeedback]);
      handleClose();
    } catch (error) {
      console.error('There was an error submitting the feedback:', error);
    }
  };

  const handleEditFeedbackAction = async () => {
    if (currentFeedback?.feedback === '') {
      try {
        await deleteFeedback(currentFeedback.id);
        const temp = feedbacks.filter(f => f.id !== currentFeedback.id);
        setFeedbacks(temp);
        handleClose();
      } catch (error) {
        console.error('There was an error deleting the feedback:', error);
      }
    } else {
      try {
        if (!currentArticle || !currentFeedback) return;
        const updatedFeedback = await updateFeedback(currentFeedback?.feedback, currentArticle?.id);
        const temp = feedbacks.filter(f => f.id !== updatedFeedback.id);
        setFeedbacks([...temp, updatedFeedback]);
        handleClose();
      } catch (error) {
        console.error('There was an error updating the feedback:', error);
      }
    }
  };

  const getFeedback = (articleId: string) => {
    const feedbackObj = feedbacks.find(f => f.articleId && f.articleId === articleId);
    return feedbackObj ? feedbackObj : null;
  };

  const handleToggleAttending = async (articleId: string, isAttending: boolean) => {
    try {
      const response = await toggleAttending(user.id, articleId, isAttending);
      const attendedArticles = allowedArticles.filter(a => response.attended.includes(a.id));
      setAttended(attendedArticles);
    } catch (error) {
      console.error('There was an error updating attendance:', error);
    }
  };

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page - 1);
  };

  const handleChangeRowsPerPage = (current: number, size: number) => {
    setRowsPerPage(size);

    setPage(1);
  };

  const handleOpen = (article: Article, feedback: Feedback | null, isEdit: boolean) => {
    setCurrentArticle(article);
    setCurrentFeedback(feedback);
    setIsEditOperation(isEdit);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentFeedback(prev => {
      return prev ? { ...prev, feedback: e.target.value } : null;
    });
  };

  if (isArticlesLoading || isCalendarsLoading) return <Spin />;

  const renderFeedback = (article: Article) => {
    const feedbackObj = getFeedback(article.id);
    return feedbackObj ? (
      <div style={{ fontSize: '12px' }}>
        <span>{feedbackObj.feedback}</span>
        <button
          onClick={() => handleOpen(article, feedbackObj, true)}
          className='ml-[6px] hover:text-[#5161ce] border rounded-md px-1'>
          <EditOutlined style={{ fontSize: '12px' }} />
        </button>
      </div>
    ) : (
      <button
        onClick={() => handleOpen(article, feedbackObj, false)}
        className='flex items-center justify-center  hover:text-[#5161ce] border rounded-md px-[5px] py-1'>
        <PlusCircleOutlined style={{ fontSize: '16px' }} />
      </button>
    );
  };

  const titleStyle: React.CSSProperties = {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  };

  return (
    <Layout>
      <Card bordered={false} className='w-full text-center'>
        <Typography.Title level={2} className='mt-4'>
          Previous Events
        </Typography.Title>
        <Table
          className='mt-8 w-full overflow-x-auto'
          dataSource={filteredArticles.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
          pagination={false}
          rowKey={record => record.id}>
          <Table.Column
            title='Calendar'
            dataIndex='calendar'
            key='calendar'
            render={calendar => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {calendarIcons[calendar?.name] || calendarIcons.DEFAULT}
                {calendar && calendar.name && <span style={{ marginLeft: '8px' }}>{calendar.name}</span>}
              </div>
            )}
            width='20%'
          />
          <Table.Column
            title='Article Title'
            dataIndex='title'
            key='title'
            render={title => <div style={titleStyle}>{title}</div>}
            width='30%' // Initial width for larger screens
          />
          <Table.Column
            title='Date'
            dataIndex='date'
            key='date'
            render={date => formatDate(date)}
            width='15%' // Initial width for larger screens
          />
          <Table.Column
            title='Attended'
            dataIndex='attended'
            key='attended'
            render={(text, article: Article) => (
              <Checkbox
                checked={attended?.map(a => a.id).includes(article.id)}
                onChange={e => handleToggleAttending(article.id, e.target.checked)}
              />
            )}
            width='15%' // Initial width for larger screens
          />
          <Table.Column
            title='Feedback'
            dataIndex='feedback'
            key='feedback'
            render={(text, article: Article) => renderFeedback(article)}
            width='20%' // Initial width for larger screens
          />
        </Table>
        <Pagination
          total={filteredArticles.length}
          pageSize={rowsPerPage}
          current={page + 1}
          onChange={(page, pageSize) => handleChangePage(page, pageSize)}
          onShowSizeChange={(current, size) => handleChangeRowsPerPage(current, size)}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={['5', '10', '25']}
          style={{ marginTop: '20px', textAlign: 'right' }}
        />
      </Card>
      <Modal
        title={isEditOperation ? 'Edit Feedback' : 'New Feedback'}
        open={open}
        onCancel={handleClose}
        footer={[
          <Button
            key='submit'
            onClick={() => (isEditOperation ? handleEditFeedbackAction() : handleFeedbackSubmit(currentArticle))}>
            Submit
          </Button>
        ]}>
        <h5 style={{ fontStyle: 'italic' }}>{currentArticle ? currentArticle.title : ''}</h5>
        <TextArea
          id='feedback-edit'
          placeholder='This feature is being worked on!'
          value={(currentFeedback && currentFeedback.feedback) || ''}
          onChange={handleFeedbackChange}
          rows={4}
        />
      </Modal>
    </Layout>
  );
};

export default OlderArticles;
