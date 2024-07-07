const API_URL = 'http://localhost:3000/api/tickets';

export async function fetchTickets() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function addTicket(ticket) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    });
    return response.json();
}

export async function updateTicket(ticket) {
    const response = await fetch(`${API_URL}/${ticket.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    });
    return response.json();
}

export async function deleteTicket(ticketId) {
    const response = await fetch(`${API_URL}/${ticketId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Ошибка удаления тикета с ID ${ticketId}`);
    }
}