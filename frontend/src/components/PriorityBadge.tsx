import React from 'react';
import { TicketPriority } from '../types/ticket';

interface Props {
  priority: TicketPriority;
}

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  low: { label: 'Low Priority', className: 'priority-badge-low' },
  medium: { label: 'Medium Priority', className: 'priority-badge-medium' },
  high: { label: 'High Priority', className: 'priority-badge-high' },
};

export const PriorityBadge: React.FC<Props> = ({ priority }) => {
  const config = priorityConfig[priority] || { label: priority, className: '' };

  return (
    <span className={`badge ${config.className}`}>
      {config.label}
    </span>
  );
};
