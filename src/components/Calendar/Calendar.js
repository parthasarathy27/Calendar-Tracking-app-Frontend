import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateCalendar = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="calendar">
      <h3>Calendar</h3>
      <div className="calendar-grid">
        {generateCalendar().map((day) => (
          <div
            key={day}
            className={`calendar-day ${selectedDate === day ? 'selected' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
      {selectedDate && <div className="selected-date">Selected Date: {selectedDate}</div>}
    </div>
  );
};

export default Calendar;