"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = exports.CommentRepository = void 0;
const prisma_1 = require("../prisma");
class CommentRepository {
    async findByTicketId(ticketId) {
        return prisma_1.prisma.comment.findMany({
            where: { ticketId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async create(data) {
        return prisma_1.prisma.comment.create({
            data: {
                ticketId: data.ticketId,
                message: data.message,
            },
        });
    }
}
exports.CommentRepository = CommentRepository;
exports.commentRepository = new CommentRepository();
