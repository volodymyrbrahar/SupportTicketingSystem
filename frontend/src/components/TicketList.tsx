import React, { useState } from 'react';
import { Ticket, TicketStatus, TicketPriority } from '../types/ticket';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { Search, Filter, MessageSquare, Tag } from 'lucide-react';

interface Props {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (id: string) => void;
  isLoading: boolean;
}

export const TicketList: React.FC<Props> = ({
  tickets,
  selectedTicketId,
  onSelectTicket,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="ticket-list-panel glass-panel">
      <div className="panel-header">
        <h2>Tickets ({filteredTickets.length})</h2>
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="input-field search-input"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <Filter size={14} className="filter-icon" />
            <select
              className="select-field filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="filter-group">
            <Tag size={14} className="filter-icon" />
            <select
              className="select-field filter-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>


      <div className="ticket-items-container">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading tickets...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="empty-state">
            <MessageSquare size={36} className="empty-icon" />
            <p>No tickets found</p>
            <span className="empty-sub">Try changing your filters or create a new ticket</span>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isSelected = ticket.id === selectedTicketId;
            const formattedDate = new Date(ticket.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={ticket.id}
                className={`ticket-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectTicket(ticket.id)}
              >
                <div className="ticket-card-header">
                  <h3 className="ticket-card-title">{ticket.title}</h3>
                  <StatusBadge status={ticket.status as TicketStatus} />
                </div>
                <p className="ticket-card-snippet">{ticket.description}</p>
                <div className="ticket-card-footer">
                  <PriorityBadge priority={ticket.priority as TicketPriority} />
                  <span className="ticket-date">{formattedDate}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
