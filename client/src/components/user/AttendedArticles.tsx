import { useQuery } from 'react-query';
import { Modal, List, Progress } from 'antd';
import { formatDate } from '@/utils/dates';
import { fetchCurrentUser } from '@/services/UserService';
import { Article } from '@/types';

interface AttendedArticlesProps {
  isOpen: boolean;
  onClose: () => void;
}

const AttendedArticles = ({ isOpen, onClose }: AttendedArticlesProps) => {
  const { data: user, isLoading } = useQuery('userData', fetchCurrentUser);

  if (isLoading) {
    return <Progress type='circle' />;
  }

  return (
    <Modal
      title='Attended Events'
      open={isOpen}
      onCancel={onClose}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: '' } }}>
      <List>
        {user?.attended?.length > 0 ? (
          user?.attended?.map((article: Article, index: number) => (
            <List.Item key={index}>
              {article.title}
              <span style={{ marginLeft: '6px', color: 'gray', fontSize: '0.85rem' }}>
                ({formatDate(article.date.toISOString().split('T')[0])})
              </span>
            </List.Item>
          ))
        ) : (
          <List.Item>No articles attended.</List.Item>
        )}
      </List>
    </Modal>
  );
};

export default AttendedArticles;
