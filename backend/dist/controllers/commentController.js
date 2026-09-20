"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = exports.CommentController = void 0;
const commentService_1 = require("../services/commentService");
const schemas_1 = require("../types/schemas");
class CommentController {
    async getByTicketId(req, res, next) {
        try {
            const ticketId = String(req.params.ticketId);
            const comments = await commentService_1.commentService.getCommentsByTicketId(ticketId);
            res.json(comments);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const ticketId = String(req.params.ticketId);
            const validatedData = schemas_1.CreateCommentSchema.parse(req.body);
            const newComment = await commentService_1.commentService.addComment({
                ticketId,
                message: validatedData.message,
            });
            res.status(201).json(newComment);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CommentController = CommentController;
exports.commentController = new CommentController();
