import React from 'react';
import { Ticket } from '../types/ticket';
import { Plus, LifeBuoy } from 'lucide-react';

interface Props {
  tickets: Ticket[];
  onOpenCreateModal: () => void;
}

export const Header: React.FC<Props> = ({ tickets, onOpenCreateModal }) => {
  const openCount = tickets.filter((t) => t.status === 'open').length;
  const progressCount = tickets.filter((t) => t.status === 'in_progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'resolved').length;

  return (
    <header className="app-header glass-panel">
      <div className="header-brand">
        <div className="brand-logo">
          <LifeBuoy className="brand-icon" size={24} />
        </div>
        <div>
          <h1 className="brand-title">Support Hub</h1>
          <p className="brand-subtitle">Ticket Management System</p>
        </div>
      </div>

      <div className="header-stats">
        <div className="stat-pill stat-open">
          <span className="stat-label">Open</span>
          <span className="stat-value">{openCount}</span>
        </div>
        <div className="stat-pill stat-progress">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{progressCount}</span>
        </div>
        <div className="stat-pill stat-resolved">
          <span className="stat-label">Resolved</span>
          <span className="stat-value">{resolvedCount}</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onOpenCreateModal}>
        <Plus size={18} />
        <span>New Ticket</span>
      </button>
    </header>
  );
};
