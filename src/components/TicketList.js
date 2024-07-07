import React from 'react';

const TicketList = ({ tickets, onEdit, onDelete, onView }) => {
  return (
    <ul>
      {tickets.map(ticket => (
        <li key={ticket.id}>
          <div>{ticket.name}</div>
          <div>{ticket.description}</div>
          <div>Status: {ticket.status}</div>
          <div>Created: {new Date(ticket.created).toLocaleString()}</div>
          <button onClick={() => onEdit(ticket)}>Edit</button>
          <button onClick={() => onDelete(ticket.id)}>Delete</button>
          <button onClick={() => onView(ticket)}>View</button>
        </li>
      ))}
    </ul>
  );
};

export default TicketList;
