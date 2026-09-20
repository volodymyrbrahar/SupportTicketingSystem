import React, { useState } from 'react';
import { Ticket, TicketStatus, TicketPriority } from '../types/ticket';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { CommentSection } from './CommentSection';
import { Trash2, Calendar, Tag, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  ticket: Ticket | null;
  onUpdateTicket: (id: string, updates: { status?: TicketStatus; priority?: TicketPriority }) => Promise<void>;
  onDeleteTicket: (id: string) => Promise<void>;
}

export const TicketDetail: React.FC<Props> = ({
  ticket,
  onUpdateTicket,
  onDeleteTicket,
}) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingPriority, setIsUpdatingPriority] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!ticket) {
    return (
      <div className="ticket-detail-panel glass-panel empty-selection">
        <div className="empty-selection-content">
          <ShieldAlert size={48} className="empty-icon" />
          <h3>No Ticket Selected</h3>
          <p>Select a ticket from the sidebar to view details, update status, or add comments.</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TicketStatus;
    setIsUpdatingStatus(true);
    try {
      await onUpdateTicket(ticket.id, { status: newStatus });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value as TicketPriority;
    setIsUpdatingPriority(true);
    try {
      await onUpdateTicket(ticket.id, { priority: newPriority });
    } finally {
      setIsUpdatingPriority(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    try {
      await onDeleteTicket(ticket.id);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  const formattedDate = new Date(ticket.createdAt).toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <div className="ticket-detail-panel glass-panel animate-fade-in">
      <div className="detail-header">
        <div className="detail-title-group">
          <h2 className="detail-title">{ticket.title}</h2>
          <div className="detail-badges">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>

        <div className="detail-actions">
          {confirmDelete ? (
            <div className="delete-confirm-group">
              <span className="confirm-text">Confirm Delete?</span>
              <button className="btn btn-danger" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button className="btn btn-secondary" onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-danger" onClick={handleDelete}>
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>

      <div className="detail-controls">
        <div className="control-item">
          <label htmlFor="status-select" className="control-label">
            <CheckCircle2 size={14} /> Change Status
          </label>
          <select
            id="status-select"
            className="select-field"
            value={ticket.status}
            onChange={handleStatusChange}
            disabled={isUpdatingStatus}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="control-item">
          <label htmlFor="priority-select" className="control-label">
            <Tag size={14} /> Change Priority
          </label>
          <select
            id="priority-select"
            className="select-field"
            value={ticket.priority}
            onChange={handlePriorityChange}
            disabled={isUpdatingPriority}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="control-item date-info">
          <span className="control-label">
            <Calendar size={14} /> Created At
          </span>
          <span className="date-value">{formattedDate}</span>
        </div>
      </div>

      <div className="detail-description-section">
        <h3>Description</h3>
        <div className="description-box">
          <p>{ticket.description}</p>
        </div>
      </div>

      <CommentSection ticketId={ticket.id} />
    </div>
  );
};
