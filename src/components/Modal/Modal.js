import React from 'react';
import './Modal.css'; // Add the CSS styles for the modal

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {children}
      </div>
    </div>
  );
};

export default Modal;
