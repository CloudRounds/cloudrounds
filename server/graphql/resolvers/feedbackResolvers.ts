import { db } from '../../lib/db';

interface FeedbackInput {
  articleId: string;
  userId: string;
  feedback: string;
}

interface UpdateFeedbackInput extends FeedbackInput {
  feedbackId: string;
}

const FeedbackResolver = {
  Query: {
    async feedbacks() {
      return await db.feedback.findMany();
    },
    async deleteFeedback(_: any, { userId }: { userId: string }) {
      return await db.feedback.findMany({
        where: { userId }
      });
    },
  },
  Mutation: {
    async createFeedback(_: any, { feedbackInput }: { feedbackInput: FeedbackInput }) {
      return await db.feedback.create({
        data: feedbackInput
      });
    },
    async updateFeedback(_: any, { feedbackId, feedback }: UpdateFeedbackInput) {
      const existingFeedback = await db.feedback.findUnique({
        where: { id: feedbackId }
      });

      if (!existingFeedback) {
        throw new Error('Feedback not found');
      }

      return await db.feedback.update({
        where: { id: feedbackId },
        data: { feedback }
      });
    },
    async deleteFeedback(_: any, { feedbackId }: { feedbackId: string }) {
      await db.feedback.delete({
        where: { id: feedbackId }
      });

      return { message: 'Feedback deleted successfully' };
    },
  }
};

export default FeedbackResolver;
