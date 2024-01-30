import { db } from '../../lib/db';
import { fromGlobalId } from "../helpers/utils";

const CommonQueryResolver = {
  Query: {
    async node(_: any, { id }: { id: string }) {
      const { type, id: localId } = fromGlobalId(id);
      switch (type) {
        case 'Calendar':
          return await db.calendar.findUnique({ where: { id: localId } });
        case 'Article':
          return await db.article.findUnique({ where: { id: localId } });
        case 'User':
          return await db.user.findUnique({ where: { id: localId } });
        case 'Request':
          return await db.request.findUnique({ where: { id: localId } });
        case 'Feedback':
          return await db.feedback.findUnique({ where: { id: localId } });
        case 'Invite':
          return await db.invite.findUnique({ where: { id: localId } });
        case 'EmailMember':
          return await db.emailMember.findUnique({ where: { id: localId } });
        case 'Favorite':
          return await db.favorite.findUnique({ where: { id: localId } });
        default:
          throw new Error(`Unknown type ${type}`);
      }
    },
  },
};

export default CommonQueryResolver;
