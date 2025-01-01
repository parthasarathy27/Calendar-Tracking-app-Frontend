// src/pages/CalendarPage.js
import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';
import './CalendarPage.css';

const CalendarPage = () => {
  const [viewMode, setViewMode] = useState('month');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const toggleView = () => {
    setViewMode(viewMode === 'month' ? 'week' : 'month');
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  return (
    <div className="calendar-page">
      <Navbar />
      <div className="calendar-content">
        <div className="calendar-header">
          <h2>Communication Calendar</h2>
          <div className="calendar-nav">
            <button className="nav-btn" onClick={handlePrevYear}>Prev Year</button>
            <button className="nav-btn" onClick={handlePrevMonth}>Prev Month</button>
            <h3>{`${currentMonth + 1}/${currentYear}`}</h3>
            <button className="nav-btn" onClick={handleNextMonth}>Next Month</button>
            <button className="nav-btn" onClick={handleNextYear}>Next Year</button>
          </div>
          <button className="toggle-view-btn" onClick={toggleView}>
            Toggle View ({viewMode})
          </button>
        </div>
        <Calendar 
          viewMode={viewMode} 
          currentYear={currentYear} 
          currentMonth={currentMonth} 
        />
      </div>
    </div>
  );
};

export default CalendarPage;
