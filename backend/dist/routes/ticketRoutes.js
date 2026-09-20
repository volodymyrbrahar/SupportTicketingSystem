"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
const commentController_1 = require("../controllers/commentController");
const router = (0, express_1.Router)();
// Ticket routes
router.get('/', (req, res, next) => ticketController_1.ticketController.getAll(req, res, next));
router.post('/', (req, res, next) => ticketController_1.ticketController.create(req, res, next));
router.get('/:id', (req, res, next) => ticketController_1.ticketController.getById(req, res, next));
router.patch('/:id', (req, res, next) => ticketController_1.ticketController.update(req, res, next));
router.delete('/:id', (req, res, next) => ticketController_1.ticketController.delete(req, res, next));
// Comment routes for a ticket
router.get('/:ticketId/comments', (req, res, next) => commentController_1.commentController.getByTicketId(req, res, next));
router.post('/:ticketId/comments', (req, res, next) => commentController_1.commentController.create(req, res, next));
exports.default = router;
