"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = exports.CommentService = void 0;
const commentRepository_1 = require("../repositories/commentRepository");
const ticketService_1 = require("./ticketService");
class CommentService {
    async getCommentsByTicketId(ticketId) {
        // Verify ticket exists
        await ticketService_1.ticketService.getTicketById(ticketId);
        return commentRepository_1.commentRepository.findByTicketId(ticketId);
    }
    async addComment(data) {
        // Verify ticket exists
        await ticketService_1.ticketService.getTicketById(data.ticketId);
        return commentRepository_1.commentRepository.create(data);
    }
}
exports.CommentService = CommentService;
exports.commentService = new CommentService();
