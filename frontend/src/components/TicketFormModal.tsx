import React, { useState } from 'react';
import { CreateTicketPayload, TicketStatus, TicketPriority } from '../types/ticket';
import { X, Plus, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateTicketPayload) => Promise<void>;
}

export const TicketFormModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TicketStatus>('open');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and Description are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
      });
      // Reset form
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('medium');
      onClose();
    } catch (err: unknown) {
      const eObj = err as Error;
      setError(eObj.message || 'Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <div className="modal-title-group">
            <Plus className="modal-icon" size={20} />
            <h2>Create Support Ticket</h2>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="ticket-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              id="ticket-title"
              type="text"
              className="input-field"
              placeholder="e.g., Cannot access dashboard settings"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ticket-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="ticket-description"
              className="textarea-field"
              rows={4}
              placeholder="Provide a detailed explanation of the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="modal-status" className="form-label">
                Initial Status
              </label>
              <select
                id="modal-status"
                className="select-field"
                value={status}
                onChange={(e) => setStatus(e.target.value as TicketStatus)}
                disabled={isSubmitting}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="modal-priority" className="form-label">
                Priority
              </label>
              <select
                id="modal-priority"
                className="select-field"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                disabled={isSubmitting}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="spinner-icon" size={16} /> Creating...
                </>
              ) : (
                'Submit Ticket'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
