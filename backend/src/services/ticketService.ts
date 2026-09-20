import { ticketRepository, CreateTicketData, UpdateTicketData } from '../repositories/ticketRepository';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class TicketService {
  async getAllTickets() {
    return ticketRepository.findAll();
  }

  async getTicketById(id: string) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async createTicket(data: CreateTicketData) {
    return ticketRepository.create(data);
  }

  async updateTicket(id: string, data: UpdateTicketData) {
    await this.getTicketById(id);
    return ticketRepository.update(id, data);
  }

  async deleteTicket(id: string) {
    await this.getTicketById(id);
    return ticketRepository.delete(id);
  }
}

export const ticketService = new TicketService();
