import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
import { commentController } from '../controllers/commentController';

const router = Router();

// Ticket routes
router.get('/', (req, res, next) => ticketController.getAll(req, res, next));
router.post('/', (req, res, next) => ticketController.create(req, res, next));
router.get('/:id', (req, res, next) => ticketController.getById(req, res, next));
router.patch('/:id', (req, res, next) => ticketController.update(req, res, next));
router.delete('/:id', (req, res, next) => ticketController.delete(req, res, next));

// Comment routes for a ticket
router.get('/:ticketId/comments', (req, res, next) => commentController.getByTicketId(req, res, next));
router.post('/:ticketId/comments', (req, res, next) => commentController.create(req, res, next));

export default router;
