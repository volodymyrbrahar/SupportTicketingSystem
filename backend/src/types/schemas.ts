import { z } from 'zod';

export const TicketStatusEnum = z.enum(['open', 'in_progress', 'resolved']);
export const TicketPriorityEnum = z.enum(['low', 'medium', 'high']);

export const CreateTicketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z.string().min(1, 'Description is required'),
  status: TicketStatusEnum.optional().default('open'),
  priority: TicketPriorityEnum.optional().default('medium'),
});

export const UpdateTicketSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').optional(),
  description: z.string().min(1, 'Description cannot be empty').optional(),
  status: TicketStatusEnum.optional(),
  priority: TicketPriorityEnum.optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

export const CreateCommentSchema = z.object({
  message: z.string().min(1, 'Comment message cannot be empty'),
});

export type CreateTicketDTO = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketDTO = z.infer<typeof UpdateTicketSchema>;
export type CreateCommentDTO = z.infer<typeof CreateCommentSchema>;
