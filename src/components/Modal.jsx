import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div id="modal-overlay" onClick={onClose}>
      <div id="modal-content" className="modal" onClick={(e) => e.stopPropagation()}>
        <button id="close-modal" className="close-btn" onClick={onClose}>&times;</button>
        <div id="modal-body">
          {title && <h2>{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
