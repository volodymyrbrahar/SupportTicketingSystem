import { Ticket, Comment, CreateTicketPayload, UpdateTicketPayload } from '../types/ticket';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMsg = `HTTP ${response.status} ${response.statusText}`;
    try {
      const errData = await response.json();
      if (errData.error) {
        errorMsg = typeof errData.error === 'string' ? errData.error : JSON.stringify(errData.error);
        if (errData.details && Array.isArray(errData.details)) {
          errorMsg += `: ${errData.details.map((d: { message: string }) => d.message).join(', ')}`;
        }
      }
    } catch {
      // Fallback to generic message
    }
    throw new Error(errorMsg);
  }
  if (response.status === 204) {
    return {} as T;
  }
  return response.json();
}

export const ticketApi = {
  async getTickets(): Promise<Ticket[]> {
    const res = await fetch(`${API_BASE_URL}/tickets`);
    return handleResponse<Ticket[]>(res);
  },

  async getTicketById(id: string): Promise<Ticket> {
    const res = await fetch(`${API_BASE_URL}/tickets/${id}`);
    return handleResponse<Ticket>(res);
  },

  async createTicket(payload: CreateTicketPayload): Promise<Ticket> {
    const res = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<Ticket>(res);
  },

  async updateTicket(id: string, payload: UpdateTicketPayload): Promise<Ticket> {
    const res = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<Ticket>(res);
  },

  async deleteTicket(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(res);
  },

  async getComments(ticketId: string): Promise<Comment[]> {
    const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`);
    return handleResponse<Comment[]>(res);
  },

  async createComment(ticketId: string, message: string): Promise<Comment> {
    const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    return handleResponse<Comment>(res);
  },
};
