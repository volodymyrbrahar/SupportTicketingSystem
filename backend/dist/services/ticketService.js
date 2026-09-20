"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketService = exports.TicketService = exports.NotFoundError = void 0;
const ticketRepository_1 = require("../repositories/ticketRepository");
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class TicketService {
    async getAllTickets() {
        return ticketRepository_1.ticketRepository.findAll();
    }
    async getTicketById(id) {
        const ticket = await ticketRepository_1.ticketRepository.findById(id);
        if (!ticket) {
            throw new NotFoundError(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }
    async createTicket(data) {
        return ticketRepository_1.ticketRepository.create(data);
    }
    async updateTicket(id, data) {
        await this.getTicketById(id);
        return ticketRepository_1.ticketRepository.update(id, data);
    }
    async deleteTicket(id) {
        await this.getTicketById(id);
        return ticketRepository_1.ticketRepository.delete(id);
    }
}
exports.TicketService = TicketService;
exports.ticketService = new TicketService();
