import { Request, Response, NextFunction } from 'express';
import { commentService } from '../services/commentService';
import { CreateCommentSchema } from '../types/schemas';

export class CommentController {
  async getByTicketId(req: Request<{ ticketId: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const ticketId = String(req.params.ticketId);
      const comments = await commentService.getCommentsByTicketId(ticketId);
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request<{ ticketId: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const ticketId = String(req.params.ticketId);
      const validatedData = CreateCommentSchema.parse(req.body);
      const newComment = await commentService.addComment({
        ticketId,
        message: validatedData.message,
      });
      res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
}

export const commentController = new CommentController();
