import React, { useEffect, useState } from "react";
import { getCompanies, logCommunication } from "../utils/api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../components/Modal";
import "./DashboardPage.css";

const localizer = momentLocalizer(moment);

const DashboardPage = () => {
  const [companies, setCompanies] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [communicationData, setCommunicationData] = useState({
    type: "",
    notes: "",
  });

  // Fetch companies and populate events
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData || []); // Ensure companies is always an array

        const eventList = companiesData
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
      }
    };

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

      // Refresh data
      const response = await getCompanies();
      setCompanies(response || []);
      const eventList = response
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
      console.error("Error logging communication:", error);
      alert("Failed to log communication. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Track and schedule company communications effectively</p>
      </div>

      <div className="dashboard-content">
        {companies.length === 0 ? (
          <p>No companies available.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Location</th>
                  <th>Last Five Communications</th>
                  <th>Next Scheduled Communication</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company._id}>
                    <td>{company.name}</td>
                    <td>{company.location || "N/A"}</td>
                    <td>
                      {Array.isArray(company.lastCommunications) &&
                      company.lastCommunications.length > 0
                        ? company.lastCommunications
                            .slice(-5)
                            .map((comm) => comm.type)
                            .join(", ")
                        : "No communications available"}
                    </td>
                    <td>
                      {company.nextScheduledCommunication
                        ? new Date(company.nextScheduledCommunication).toDateString()
                        : "Not scheduled"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <h2>Calendar</h2>
        </div>
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

      {showModal && (
        <Modal>
          <div className="modal-content">
            <h3>Schedule Communication</h3>
            <form>
              <label>
                Company:
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
              </label>
              <label>
                Type:
                <input
                  type="text"
                  value={communicationData.type}
                  onChange={(e) =>
                    setCommunicationData({ ...communicationData, type: e.target.value })
                  }
                />
              </label>
              <label>
                Notes:
                <textarea
                  value={communicationData.notes}
                  onChange={(e) =>
                    setCommunicationData({ ...communicationData, notes: e.target.value })
                  }
                />
              </label>
              <button type="button" onClick={handleLogCommunication}>
                Submit
              </button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
