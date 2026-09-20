import { useState, useEffect } from 'react';
import { Ticket, TicketStatus, TicketPriority, CreateTicketPayload } from './types/ticket';
import { ticketApi } from './api/ticketApi';
import { Header } from './components/Header';
import { TicketList } from './components/TicketList';
import { TicketDetail } from './components/TicketDetail';
import { TicketFormModal } from './components/TicketFormModal';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ticketApi.getTickets();
      setTickets(data);
      if (data.length > 0 && !selectedTicketId) {
        setSelectedTicketId(data[0].id);
      }
    } catch (err: unknown) {
      const eObj = err as Error;
      setError(eObj.message || 'Failed to fetch tickets. Please check server connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || null;

  const handleCreateTicket = async (payload: CreateTicketPayload) => {
    const newTicket = await ticketApi.createTicket(payload);
    setTickets((prev) => [newTicket, ...prev]);
    setSelectedTicketId(newTicket.id);
  };

  const handleUpdateTicket = async (
    id: string,
    updates: { status?: TicketStatus; priority?: TicketPriority }
  ) => {
    const updatedTicket = await ticketApi.updateTicket(id, updates);
    setTickets((prev) => prev.map((t) => (t.id === id ? updatedTicket : t)));
  };

  const handleDeleteTicket = async (id: string) => {
    await ticketApi.deleteTicket(id);
    const updatedList = tickets.filter((t) => t.id !== id);
    setTickets(updatedList);

    if (selectedTicketId === id) {
      setSelectedTicketId(updatedList.length > 0 ? updatedList[0].id : null);
    }
  };

  return (
    <div className="app-container">
      <Header tickets={tickets} onOpenCreateModal={() => setIsModalOpen(true)} />

      {error && (
        <div className="global-error-banner glass-panel">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button className="btn btn-secondary btn-sm" onClick={fetchTickets}>
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      <main className="split-pane-layout">
        <TicketList
          tickets={tickets}
          selectedTicketId={selectedTicketId}
          onSelectTicket={(id) => setSelectedTicketId(id)}
          isLoading={isLoading}
        />

        <TicketDetail
          ticket={selectedTicket}
          onUpdateTicket={handleUpdateTicket}
          onDeleteTicket={handleDeleteTicket}
        />
      </main>

      <TicketFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}

export default App;
