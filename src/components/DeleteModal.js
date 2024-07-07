import React from 'react';

function DeleteModal({ onConfirm, onClose }) {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this ticket?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
}

export default DeleteModal;
