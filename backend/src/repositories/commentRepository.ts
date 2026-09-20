import { prisma } from '../prisma';

export interface CreateCommentData {
  ticketId: string;
  message: string;
}

export class CommentRepository {
  async findByTicketId(ticketId: string) {
    return prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(data: CreateCommentData) {
    return prisma.comment.create({
      data: {
        ticketId: data.ticketId,
        message: data.message,
      },
    });
  }
}

export const commentRepository = new CommentRepository();
