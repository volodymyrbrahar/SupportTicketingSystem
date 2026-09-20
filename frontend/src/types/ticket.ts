export type TicketStatus = 'open' | 'in_progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
}

export interface Comment {
  id: string;
  ticketId: string;
  message: string;
  createdAt: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

export interface UpdateTicketPayload {
  status?: TicketStatus;
  priority?: TicketPriority;
  title?: string;
  description?: string;
}
