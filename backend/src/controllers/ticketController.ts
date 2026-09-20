import { Request, Response, NextFunction } from 'express';
import { ticketService } from '../services/ticketService';
import { CreateTicketSchema, UpdateTicketSchema } from '../types/schemas';

export class TicketController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const ticket = await ticketService.getTicketById(id);
      res.json(ticket);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = CreateTicketSchema.parse(req.body);
      const newTicket = await ticketService.createTicket(validatedData);
      res.status(201).json(newTicket);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const validatedData = UpdateTicketSchema.parse(req.body);
      const updatedTicket = await ticketService.updateTicket(id, validatedData);
      res.json(updatedTicket);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      await ticketService.deleteTicket(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const ticketController = new TicketController();
