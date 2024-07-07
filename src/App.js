import React, { useState, useEffect } from 'react';
import TicketList from './components/TicketList';
import TicketModal from './components/TicketModal';
import DeleteModal from './components/DeleteModal';
import { fetchTickets, addTicket, updateTicket, deleteTicket } from './api';

function App() {
  const [tickets, setTickets] = useState([]);
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const tickets = await fetchTickets();
    setTickets(tickets);
  };

  const handleAddTicket = () => {
    setCurrentTicket(null);
    setTicketModalOpen(true);
  };

  const handleEditTicket = (ticket) => {
    setCurrentTicket(ticket);
    setTicketModalOpen(true);
  };

  const handleDeleteTicket = (ticketId) => {
    setTicketToDelete(ticketId);
    setDeleteModalOpen(true);
  };

  const handleSaveTicket = async (ticket) => {
    if (ticket.id) {
      await updateTicket(ticket);
    } else {
      await addTicket(ticket);
    }
    setTicketModalOpen(false);
    loadTickets();
  };

  const handleConfirmDelete = async () => {
    await deleteTicket(ticketToDelete);
    setDeleteModalOpen(false);
    loadTickets();
  };

  return (
    <div className="container">
      <header>
        <h1>HelpDesk</h1>
        <button onClick={handleAddTicket}>Добавить тикет</button>
      </header>
      <main>
        <TicketList
          tickets={tickets}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
          onView={(ticket) => alert(`Описание: ${ticket.description}`)}
        />
      </main>
      {isTicketModalOpen && (
        <TicketModal
          ticket={currentTicket}
          onSubmit={handleSaveTicket} 
          onClose={() => setTicketModalOpen(false)}
          isOpen={isTicketModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

