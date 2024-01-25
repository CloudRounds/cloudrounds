import { Prisma } from '@prisma/client';
import { db } from "../../lib/db";
import { fetchAllArticlesWithDetails } from '../services/articles';

const ArticleResolver = {
  Query: {
    async articles() {
      return await fetchAllArticlesWithDetails();
    },
  },
  Mutation: {
    async createArticle(_: any, { articleInput }: { articleInput: Prisma.ArticleCreateInput }) {
      return await db.article.create({
        data: articleInput,
        include: {
          organizer: true,
          calendar: true
        }
      });
    },
    async updateArticle(_: any, { id, articleInput }: { id: string; articleInput: Prisma.ArticleCreateInput }) {
      return await db.article.update({
        where: { id },
        data: articleInput,
        include: {
          organizer: true,
          calendar: true
        }
      });
    },
    async deleteArticle(_: any, { id }: { id: string }) {
      await db.article.delete({
        where: { id }
      });
      return { message: 'Article deleted' };
    },
  },
};

export default ArticleResolver;