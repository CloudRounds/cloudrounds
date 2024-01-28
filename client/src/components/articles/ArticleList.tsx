import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useArticlePermissions from '@/hooks/useArticlePermissions';
import { deleteArticle, sortArticles } from '@/services/ArticleService';
import { toggleFavorite, getFavorites } from '@/services/UserService';
import {
  getEmptyCalendars,
  getCalendarsAfterCreate,
  getCalendarsAfterDelete,
  getCalendarsAfterUpdate,
  filterArticlesForList,
  getArticlesForPage
} from '@/utils/articleHelpers';
import { Col, Modal, Pagination, Row } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import ActionBar from './actions/ActionBar';
import ArticleCalendar from './calendar/ArticleCalendar';
import NewArticleForm from './form/NewArticleForm';
import ArticleCard from './ArticleCard';
import { Badge } from 'antd';
import { Article, User } from '@/types';

const ArticleList = observer(() => {
  const localUser = localStorage.getItem('CloudRoundsUser');
  const user = JSON.parse(localUser || '{}') as User;

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [selectedOrganizers, setSelectedOrganizers] = useState<string[]>([]);
  const [organizerFilter, setOrganizerFilter] = useState<string[]>([]);

  const [openNewArticleModal, setOpenNewArticleModal] = useState(false);
  const [localArticles, setLocalArticles] = useState<Article[]>([]);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[] | null>(null);

  const { userCalendars, allowedArticles, canReadCalendars, isLoading } = useArticlePermissions();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const { data: favoritesData, isLoading: isFavoritesLoading } = useQuery(['favorites', user.id], () =>
    getFavorites(user.id)
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isLoading) return;

    const sortedArticles = sortArticles(allowedArticles);
    setLocalArticles(sortedArticles);

    const organizers: string[] = [
      ...new Set(
        sortedArticles.map((article: Article) => {
          if (typeof article.organizer === 'object' && article.organizer !== null) {
            return article.organizer.username;
          }
          return typeof article.organizer === 'string' ? article.organizer : null;
        })
      )
    ].filter((organizer): organizer is string => organizer !== null);

    setSelectedOrganizers(organizers);
  }, [isLoading, allowedArticles]);

  useEffect(() => {
    if (canReadCalendars.length > 0 && selectedCalendars.length === 0) {
      setSelectedCalendars(canReadCalendars.map(p => p.name));
    }
  }, [canReadCalendars]);

  useEffect(() => {
    if (isFavoritesLoading) return;
    setFavorites(favoritesData);
  }, [isFavoritesLoading]);

  const deleteMutation = useMutation(deleteArticle, {
    onSuccess: (data, variables) => {
      const updatedArticles = localArticles.filter(article => article.id !== variables);
      setLocalArticles(updatedArticles);

      if (!selectedArticle) return;

      const newSelectedCalendars = getCalendarsAfterDelete(updatedArticles, selectedArticle, selectedCalendars);
      setSelectedCalendars(newSelectedCalendars);
      setSelectedArticle(null);
    }
  });

  const handleDelete = async (articleId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this article?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMutation.mutate(articleId);
      },
      onCancel() {
        return;
      }
    });
  };

  const toggleNewArticleModal = () => {
    if (selectedArticle) {
      setSelectedArticle(null);
    } else {
      setOpenNewArticleModal(!openNewArticleModal);
    }
  };

  const handleArticleUpdate = async (updatedArticle: Article) => {
    setIsUpdateLoading(true);

    const updatedArticles = localArticles.map(article => (article.id === updatedArticle.id ? updatedArticle : article));
    setLocalArticles(sortArticles(updatedArticles));

    const newSelectedCalendars = getCalendarsAfterUpdate(
      localArticles,
      userCalendars || [],
      updatedArticle,
      updatedArticles,
      selectedCalendars
    );

    setSelectedCalendars(newSelectedCalendars);
    setIsUpdateLoading(false);
  };

  const handleCreateArticle = async (newArticle: Article) => {
    setIsUpdateLoading(true);

    const allArticles = [...localArticles, newArticle];
    setLocalArticles(sortArticles(allArticles));

    const newSelectedCalendars = getCalendarsAfterCreate(userCalendars || [], newArticle, selectedCalendars);

    setSelectedCalendars(newSelectedCalendars);
    setIsUpdateLoading(false);
  };

  const handleEdit = (articleId: string) => {
    setSelectedArticle(localArticles.find(article => article.id === articleId) || null);
  };

  const handleFavorite = async (articleId: string) => {
    try {
      const isCurrentlyFavorite = favorites ? favorites.includes(articleId) : false;
      const isFavorite = !isCurrentlyFavorite;

      const data = await toggleFavorite(user.id, articleId, isFavorite);

      setFavorites(data);
    } catch (error) {
      console.error('There was an error updating favorite:', error);
    }
  };

  if (isLoading || isUpdateLoading || isFavoritesLoading) {
    return (
      <div className='text-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  const filteredArticles = filterArticlesForList(localArticles, organizerFilter, selectedCalendars);
  const currentArticles = getArticlesForPage(currentPage, articlesPerPage, filteredArticles);
  const calendarsWithoutArticles = userCalendars ? getEmptyCalendars(localArticles, userCalendars) : [];

  return (
    <div style={{ background: '#e0e7ff' }}>
      <ActionBar
        selectedCalendars={selectedCalendars}
        setSelectedCalendars={setSelectedCalendars}
        toggleNewArticleModal={toggleNewArticleModal}
        selectedOrganizers={selectedOrganizers}
        organizerFilter={organizerFilter}
        setOrganizerFilter={setOrganizerFilter}
        userCalendars={userCalendars || []}
        emptyCalendars={calendarsWithoutArticles}
      />
      <div style={{ padding: '0 16px' }} className='content-container'>
        <Row gutter={16} className='custom-flex'>
          <Col xs={24} lg={12} className='calendar-col'>
            <div className='max-w-full overflow-x-auto'>
              <ArticleCalendar articles={filteredArticles} />
            </div>
          </Col>

          <Col
            xs={24}
            lg={12}
            className='article-list-col order-list mt-5'
            style={{ background: '#e0e7ff', borderRadius: '10px' }}>
            <Badge
              status='warning'
              text={filteredArticles.length > 0 ? 'Upcoming Events' : 'You have no upcoming events.'}
              style={{
                marginBottom: '10px',
                border: '0px solid #0a0a0a',
                borderRadius: '10px',
                padding: '10px',
                color: 'white',
                background: '#5161CE',
                fontWeight: '900em',
                width: '100%',
                display: 'block'
              }}
            />

            {currentArticles.map((article, index) => (
              <ArticleCard
                key={index}
                article={article}
                isOrganizer={article.organizer?.username === user.username}
                onFavorite={() => handleFavorite(article.id)}
                onEdit={() => handleEdit(article.id)}
                isFavorite={(favorites && favorites.includes(article.id)) || false}
              />
            ))}
            {filteredArticles.length > 4 && (
              <Pagination
                current={currentPage}
                total={filteredArticles.length}
                pageSize={articlesPerPage}
                onChange={handlePageChange}
              />
            )}
          </Col>
        </Row>
      </div>
      <NewArticleForm
        open={openNewArticleModal || !!selectedArticle}
        onClose={toggleNewArticleModal}
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
        onDelete={handleDelete}
        onCreateArticle={handleCreateArticle}
        onArticleUpdate={handleArticleUpdate}
      />
    </div>
  );
});

export default ArticleList;
