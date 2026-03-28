import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getCompanies } from '../utils/api';
import Skeleton from '../components/Loading/Skeleton';
import './CalendarPage.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const companiesData = await getCompanies();
        const eventList = (companiesData || [])
          .map((company) => ({
            title: `${company.name} - Outreach`,
            start: company.nextScheduledCommunication
              ? new Date(company.nextScheduledCommunication)
              : null,
            end: company.nextScheduledCommunication
              ? new Date(company.nextScheduledCommunication)
              : null,
            allDay: true,
            resource: company
          }))
          .filter((event) => event.start);
        
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="calendar-page">
      <header className="page-header">
        <div>
          <h1>Communication Calendar</h1>
          <p className="text-muted">Visual schedule of upcoming company engagements</p>
        </div>
      </header>

      <div className="calendar-container glass">
        {loading ? (
            <div style={{ padding: '2rem' }}>
                <Skeleton type="card" />
                <div style={{ marginTop: '1rem' }}>
                    {Array(3).fill(0).map((_, i) => <Skeleton key={i} type="text" />)}
                </div>
            </div>
        ) : (
            <div className="calendar-wrapper">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}
                    views={['month', 'week', 'day', 'agenda']}
                    popup
                    selectable
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
