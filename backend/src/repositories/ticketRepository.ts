import { prisma } from '../prisma';
import { TicketStatus, TicketPriority } from '@prisma/client';

export interface CreateTicketData {
  title: string;
  description: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

export interface UpdateTicketData {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

export class TicketRepository {
  async findAll() {
    return prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.ticket.findUnique({
      where: { id },
    });
  }

  async create(data: CreateTicketData) {
    return prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status ?? 'open',
        priority: data.priority ?? 'medium',
      },
    });
  }

  async update(id: string, data: UpdateTicketData) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.ticket.delete({
      where: { id },
    });
  }
}

export const ticketRepository = new TicketRepository();
