import { db } from "../../lib/db";
import { fetchAllArticlesWithDetails } from '../helpers/articles';
import { toGlobalId, fromGlobalId } from "../helpers/utils";
import { CreateArticleInput, UpdateArticleInput } from '../generated/types';

const ArticleResolver = {
  Query: {
    async articles(_: any, { first, after }: { first?: number; after?: string }) {
      const articles = await fetchAllArticlesWithDetails(first, after);
      return {
        edges: articles.map(article => ({
          node: { ...article, id: toGlobalId('Article', article.id) },
          cursor: toGlobalId('Article', article.id),
        })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: articles.length > 0 ? toGlobalId('Article', articles[0].id) : null,
          endCursor: articles.length > 0 ? toGlobalId('Article', articles[articles.length - 1].id) : null,
        },
      };
    },
  },
  Mutation: {
    async createArticle(_: any, { input }: { input: CreateArticleInput & { clientMutationId?: string } }) {
      const article = await db.article.create({
        data: {
          ...input,
        },
        include: {
          organizer: true,
          calendar: true
        }
      });
      return {
        article: { ...article, id: toGlobalId('Article', article.id) },
        clientMutationId: input.clientMutationId,
      };
    },
    async updateArticle(_: any, { input }: { input: UpdateArticleInput }) {
      const { id, articleInput, clientMutationId } = input;
      const localId = fromGlobalId(id).id;

      const updateData = {
        ...articleInput,
        organizerId: fromGlobalId(articleInput.organizerId).id,
        calendarId: fromGlobalId(articleInput.calendarId).id,
      };

      const article = await db.article.update({
        where: { id: localId },
        data: updateData,
        include: {
          organizer: true,
          calendar: true
        }
      });

      return {
        article: { ...article, id: toGlobalId('Article', article.id) },
        clientMutationId,
      };
    },
    async deleteArticle(_: any, { input }: { input: { id: string, clientMutationId?: string } }) {
      const localId = fromGlobalId(input.id).id;
      await db.article.delete({
        where: { id: localId }
      });
      return {
        deletedArticleId: input.id,
        clientMutationId: input.clientMutationId,
      };
    },
  },
};

export default ArticleResolver;
