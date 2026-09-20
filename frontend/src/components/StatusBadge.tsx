import React from 'react';
import { TicketStatus } from '../types/ticket';

interface Props {
  status: TicketStatus;
}

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'status-badge-open' },
  in_progress: { label: 'In Progress', className: 'status-badge-progress' },
  resolved: { label: 'Resolved', className: 'status-badge-resolved' },
};

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const config = statusConfig[status] || { label: status, className: '' };

  return (
    <span className={`badge ${config.className}`}>
      <span className="dot" />
      {config.label}
    </span>
  );
};
