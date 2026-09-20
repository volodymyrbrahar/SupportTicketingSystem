"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketController = exports.TicketController = void 0;
const ticketService_1 = require("../services/ticketService");
const schemas_1 = require("../types/schemas");
class TicketController {
    async getAll(req, res, next) {
        try {
            const tickets = await ticketService_1.ticketService.getAllTickets();
            res.json(tickets);
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = String(req.params.id);
            const ticket = await ticketService_1.ticketService.getTicketById(id);
            res.json(ticket);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const validatedData = schemas_1.CreateTicketSchema.parse(req.body);
            const newTicket = await ticketService_1.ticketService.createTicket(validatedData);
            res.status(201).json(newTicket);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const id = String(req.params.id);
            const validatedData = schemas_1.UpdateTicketSchema.parse(req.body);
            const updatedTicket = await ticketService_1.ticketService.updateTicket(id, validatedData);
            res.json(updatedTicket);
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            const id = String(req.params.id);
            await ticketService_1.ticketService.deleteTicket(id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.TicketController = TicketController;
exports.ticketController = new TicketController();
