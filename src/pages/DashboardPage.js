import React, { useEffect, useState } from "react";
import { getCompanies, logCommunication } from "../utils/api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../components/Modal";
import Skeleton from "../components/Loading/Skeleton";
import { MdAdd, MdBusiness, MdLocationOn, MdEvent } from "react-icons/md";
import "./DashboardPage.css";

const localizer = momentLocalizer(moment);

const DashboardPage = () => {
  const [companies, setCompanies] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [communicationData, setCommunicationData] = useState({
    type: "",
    notes: "",
  });

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const companiesData = await getCompanies();
      setCompanies(companiesData || []);

      const eventList = (companiesData || [])
        .map((company) => ({
          title: company.name,
          start: company.nextScheduledCommunication
            ? new Date(company.nextScheduledCommunication)
            : null,
          end: company.nextScheduledCommunication
            ? new Date(company.nextScheduledCommunication)
            : null,
          companyId: company._id,
        }))
        .filter((event) => event.start && event.end);

      setEvents(eventList);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setShowModal(true);
  };

  const handleLogCommunication = async () => {
    if (!selectedCompany || !communicationData.type || !communicationData.notes) {
      alert("Please select a company and fill in all fields.");
      return;
    }

    try {
      await logCommunication({
        companyId: selectedCompany,
        type: communicationData.type,
        date: selectedDate,
        notes: communicationData.notes,
      });

      setShowModal(false);
      setCommunicationData({ type: "", notes: "" });
      setSelectedCompany("");
      fetchCompanies();
    } catch (error) {
      console.error("Error logging communication:", error);
      alert("Failed to log communication. Please try again.");
    }
  };

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted">Overview of your company communications</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <MdAdd size={20} />
          <span>Log Communication</span>
        </button>
      </header>

      <section className="dashboard-grid">
        <div className="stats-container">
            {loading ? (
                Array(3).fill(0).map((_, i) => <Skeleton key={i} type="card" />)
            ) : (
                <>
                    <div className="stat-card glass">
                        <div className="stat-icon"><MdBusiness /></div>
                        <div className="stat-info">
                            <h3>{companies.length}</h3>
                            <p>Total Companies</p>
                        </div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-icon"><MdEvent /></div>
                        <div className="stat-info">
                            <h3>{events.length}</h3>
                            <p>Scheduled Tasks</p>
                        </div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-icon"><MdLocationOn /></div>
                        <div className="stat-info">
                            <h3>{new Set(companies.map(c => c.location)).size}</h3>
                            <p>Global Locations</p>
                        </div>
                    </div>
                </>
            )}
        </div>

        <div className="content-card glass">
          <h2>Recent Communications</h2>
          {loading ? (
            <div className="skeleton-table">
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} type="text" />)}
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Last Activity</th>
                    <th>Next Scheduled</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">No companies available.</td></tr>
                  ) : (
                    companies.map((company) => (
                      <tr key={company._id}>
                        <td>
                          <div className="company-name-cell">
                            <strong>{company.name}</strong>
                          </div>
                        </td>
                        <td>{company.location || "N/A"}</td>
                        <td>
                          <span className="badge">
                            {Array.isArray(company.lastCommunications) && company.lastCommunications.length > 0
                              ? company.lastCommunications.slice(-1)[0].type
                              : "No activity"}
                          </span>
                        </td>
                        <td>
                          {company.nextScheduledCommunication
                            ? new Date(company.nextScheduledCommunication).toLocaleDateString()
                            : "Not scheduled"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="calendar-card glass">
          <h2>Communication Calendar</h2>
          <div className="calendar-wrapper">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable
              onSelectSlot={handleSelectSlot}
              views={["month", "week", "day"]}
              toolbar
            />
          </div>
        </div>
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modern-modal">
            <h3>Log Communication</h3>
            <form className="modern-form">
              <div className="form-group">
                <label>Company</label>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  placeholder="e.g. Email, Call"
                  value={communicationData.type}
                  onChange={(e) =>
                    setCommunicationData({ ...communicationData, type: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  placeholder="Additional details..."
                  value={communicationData.notes}
                  onChange={(e) =>
                    setCommunicationData({ ...communicationData, notes: e.target.value })
                  }
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn-primary" onClick={handleLogCommunication}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
