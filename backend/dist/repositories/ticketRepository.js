"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRepository = exports.TicketRepository = void 0;
const prisma_1 = require("../prisma");
class TicketRepository {
    async findAll() {
        return prisma_1.prisma.ticket.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return prisma_1.prisma.ticket.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return prisma_1.prisma.ticket.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status ?? 'open',
                priority: data.priority ?? 'medium',
            },
        });
    }
    async update(id, data) {
        return prisma_1.prisma.ticket.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.prisma.ticket.delete({
            where: { id },
        });
    }
}
exports.TicketRepository = TicketRepository;
exports.ticketRepository = new TicketRepository();
