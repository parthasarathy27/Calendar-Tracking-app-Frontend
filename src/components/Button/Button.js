import React from 'react';
import './Button.css';

const Button = ({ label, onClick, color }) => {
  return (
    <button className={`btn ${color}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
