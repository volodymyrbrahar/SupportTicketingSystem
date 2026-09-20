"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentSchema = exports.UpdateTicketSchema = exports.CreateTicketSchema = exports.TicketPriorityEnum = exports.TicketStatusEnum = void 0;
const zod_1 = require("zod");
exports.TicketStatusEnum = zod_1.z.enum(['open', 'in_progress', 'resolved']);
exports.TicketPriorityEnum = zod_1.z.enum(['low', 'medium', 'high']);
exports.CreateTicketSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(255, 'Title is too long'),
    description: zod_1.z.string().min(1, 'Description is required'),
    status: exports.TicketStatusEnum.optional().default('open'),
    priority: exports.TicketPriorityEnum.optional().default('medium'),
});
exports.UpdateTicketSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title cannot be empty').optional(),
    description: zod_1.z.string().min(1, 'Description cannot be empty').optional(),
    status: exports.TicketStatusEnum.optional(),
    priority: exports.TicketPriorityEnum.optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
exports.CreateCommentSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, 'Comment message cannot be empty'),
});
