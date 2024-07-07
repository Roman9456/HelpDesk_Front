import React from 'react';

function TicketList({ tickets, onEdit, onDelete, onView }) {
  return (
    <ul>
      {tickets.map(ticket => (
        <li key={ticket.id} className={ticket.completed ? 'completed' : ''}>
          <span onClick={() => onView(ticket)}>{ticket.title}</span>
          <div>
            <button onClick={() => onEdit(ticket)}>✎</button>
            <button onClick={() => onDelete(ticket.id)}>x</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TicketList;