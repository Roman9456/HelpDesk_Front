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
    try {
      const ticketsData = await fetchTickets();
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error loading tickets:', error.message);
    }
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
    try {
      if (ticket.id) {
        await updateTicket(ticket);
      } else {
        const newTicket = await addTicket(ticket);
        setTickets([...tickets, newTicket]);
      }
      setTicketModalOpen(false);
      loadTickets();
    } catch (error) {
      console.error('Error saving ticket:', error.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTicket(ticketToDelete);
      setDeleteModalOpen(false);
      loadTickets();
    } catch (error) {
      console.error(`Error deleting ticket with ID ${ticketToDelete}:`, error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>HelpDesk</h1>
        <button onClick={handleAddTicket}>Add Ticket</button>
      </header>
      <main>
        <TicketList
          tickets={tickets}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
          onView={(ticket) => alert(`Description: ${ticket.description}`)}
        />
      </main>
      {isTicketModalOpen && (
        <TicketModal
          ticket={currentTicket}
          onSubmit={handleSaveTicket}
          onClose={() => setTicketModalOpen(false)}
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
