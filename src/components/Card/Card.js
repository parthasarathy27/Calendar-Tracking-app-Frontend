import React from 'react';
import './Card.css';

const Card = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-header">
        <img src={icon} alt="icon" className="card-icon" />
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Card;
