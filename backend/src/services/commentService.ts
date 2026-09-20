import { commentRepository, CreateCommentData } from '../repositories/commentRepository';
import { ticketService } from './ticketService';

export class CommentService {
  async getCommentsByTicketId(ticketId: string) {
    // Verify ticket exists
    await ticketService.getTicketById(ticketId);
    return commentRepository.findByTicketId(ticketId);
  }

  async addComment(data: CreateCommentData) {
    // Verify ticket exists
    await ticketService.getTicketById(data.ticketId);
    return commentRepository.create(data);
  }
}

export const commentService = new CommentService();
