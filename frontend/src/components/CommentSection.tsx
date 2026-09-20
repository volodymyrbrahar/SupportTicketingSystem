import React, { useState, useEffect } from 'react';
import { Comment } from '../types/ticket';
import { ticketApi } from '../api/ticketApi';
import { Send, MessageSquare, Loader2 } from 'lucide-react';

interface Props {
  ticketId: string;
}

export const CommentSection: React.FC<Props> = ({ ticketId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    ticketApi
      .getComments(ticketId)
      .then((data) => {
        if (isMounted) {
          setComments(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load comments');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [ticketId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment = await ticketApi.createComment(ticketId, message.trim());
      setComments((prev) => [...prev, newComment]);
      setMessage('');
    } catch (err: unknown) {
      const eObj = err as Error;
      setError(eObj.message || 'Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-header">
        <MessageSquare size={18} />
        <h3>Comments ({comments.length})</h3>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="comment-list">
        {isLoading ? (
          <div className="loading-state small">
            <Loader2 className="spinner-icon" size={20} />
            <span>Fetching comments...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="empty-state small">
            <p>No comments yet. Start the conversation!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const formattedDate = new Date(comment.createdAt).toLocaleString(undefined, {
              dateStyle: 'short',
              timeStyle: 'short',
            });
            return (
              <div key={comment.id} className="comment-card animate-fade-in">
                <div className="comment-avatar">Support</div>
                <div className="comment-content">
                  <div className="comment-meta">
                    <span className="comment-author">User / Support Agent</span>
                    <span className="comment-time">{formattedDate}</span>
                  </div>
                  <p className="comment-message">{comment.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field comment-input"
          placeholder="Write a comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="btn btn-primary comment-submit-btn"
          disabled={isSubmitting || !message.trim()}
        >
          {isSubmitting ? <Loader2 className="spinner-icon" size={16} /> : <Send size={16} />}
        </button>
      </form>
    </div>
  );
};
