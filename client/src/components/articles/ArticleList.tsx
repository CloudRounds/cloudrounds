import { articlesState, favoritesState } from '@/appState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useArticlePermissions from '@/hooks/useArticlePermissions';
import { useUser } from '@/hooks/useUser';
import { deleteArticle, sortArticles } from '@/services/ArticleService';
import { toggleFavorite } from '@/services/UserService';
import { Article } from '@/types';
import {
  filterArticlesForList,
  getArticlesForPage,
  getCalendarsAfterCreate,
  getCalendarsAfterDelete,
  getCalendarsAfterUpdate,
  getEmptyCalendars
} from '@/utils/articleHelpers';
import { Badge, Col, Modal, Pagination, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import ArticleCard from './ArticleCard';
import ActionBar from './actions/ActionBar';
import ArticleCalendar from './calendar/ArticleCalendar';
import NewArticleForm from './NewArticleForm';
import EditArticleForm from './EditArticleForm';

const ArticleList = () => {
  const user = useUser();
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const favoriteArticles = favorites.map(f => f.articleId);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [selectedOrganizers, setSelectedOrganizers] = useState<string[]>([]);
  const [organizerFilter, setOrganizerFilter] = useState<string[]>([]);
  const [openNewArticleModal, setOpenNewArticleModal] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  // Recoil for fetching and setting articles
  const [articles, setArticles] = useRecoilState(articlesState);

  const { userCalendars, allowedArticles, canReadCalendars, isArticlesLoading, isCalendarsLoading } =
    useArticlePermissions();

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isArticlesLoading || isCalendarsLoading) return;
    const organizers: string[] = [
      ...new Set(allowedArticles.map((article: Article) => article.organizer?.username))
    ].filter((organizer): organizer is string => organizer !== null);

    setSelectedOrganizers(organizers);

    if (canReadCalendars.length > 0 && selectedCalendars.length === 0) {
      setSelectedCalendars(canReadCalendars.map(p => p.name));
    }
  }, [isArticlesLoading, isCalendarsLoading]);

  useEffect(() => {
    const filtered = allowedArticles.filter(
      article =>
        selectedCalendars.includes(article.calendar ? article.calendar.name : '') &&
        selectedOrganizers.includes(article.organizer ? article.organizer.username : '')
    );
    setFilteredArticles(filtered);
  }, [selectedCalendars, selectedOrganizers]);

  const deleteMutation = useMutation(deleteArticle, {
    onSuccess: (data, variables) => {
      const updatedArticles = articles.filter(article => article.id !== variables);
      setArticles(updatedArticles);

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

    const updatedArticles = articles.map(article => (article.id === updatedArticle.id ? updatedArticle : article));
    setArticles(updatedArticles);

    const newSelectedCalendars = getCalendarsAfterUpdate(
      articles,
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

    const allArticles = [...articles, newArticle];
    setArticles(sortArticles(allArticles));

    const newSelectedCalendars = getCalendarsAfterCreate(userCalendars || [], newArticle, selectedCalendars);

    setSelectedCalendars(newSelectedCalendars);
    setIsUpdateLoading(false);
  };

  const handleEdit = (articleId: string) => {
    setSelectedArticle(articles.find(article => article.id === articleId) || null);
  };

  const handleFavorite = async (articleId: string) => {
    try {
      const isFavorite = favoriteArticles.includes(articleId);
      const data = await toggleFavorite(user.id, articleId, isFavorite);

      setFavorites(data);
    } catch (error) {
      console.error('There was an error updating favorite:', error);
    }
  };

  if (isArticlesLoading || isArticlesLoading || isUpdateLoading) {
    return (
      <div className='text-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  const currentArticles = getArticlesForPage(currentPage, articlesPerPage, filteredArticles);
  const calendarsWithoutArticles = userCalendars ? getEmptyCalendars(articles, userCalendars) : [];

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
              <ArticleCalendar articles={articles} />
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
                isFavorite={favoriteArticles.includes(article.id)}
              />
            ))}
            {currentArticles.length > 4 && (
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
        open={openNewArticleModal}
        onClose={toggleNewArticleModal}
        onCreateArticle={handleCreateArticle}
      />
      <EditArticleForm
        open={!!selectedArticle}
        article={selectedArticle || null}
        setArticle={setSelectedArticle}
        onDelete={handleDelete}
        onArticleUpdate={handleArticleUpdate}
      />
    </div>
  );
};

export default ArticleList;
