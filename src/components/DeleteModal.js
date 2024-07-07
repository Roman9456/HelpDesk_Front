import React from 'react';

function DeleteModal({ onConfirm, onClose }) {
  return (
    <div className="modal">
      <p>Вы уверены, что хотите удалить этот тикет?</p>
      <button onClick={onConfirm}>Да</button>
      <button onClick={onClose}>Нет</button>
    </div>
  );
}

export default DeleteModal;
