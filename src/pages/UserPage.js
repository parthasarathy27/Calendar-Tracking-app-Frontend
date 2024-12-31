import React, { useEffect, useState } from "react";
import { getDashboard, logCommunication } from "../utils/api";
import Modal from "../components/Modal";
import "./UserPage.css";

const UserPage = () => {
  const [dashboardData, setDashboardData] = useState({ companies: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [communicationData, setCommunicationData] = useState({
    type: "",
    date: "",
    notes: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboard();
      setDashboardData(response.data || { companies: [] });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setErrorMessage("Failed to load dashboard data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogCommunication = async () => {
    if (!selectedCompany) {
      alert("No company selected.");
      return;
    }
    if (!communicationData.type || !communicationData.date || !communicationData.notes) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await logCommunication({
        companyId: selectedCompany._id,
        type: communicationData.type,
        date: communicationData.date,
        notes: communicationData.notes,
      });
      setShowModal(false);
      setCommunicationData({ type: "", date: "", notes: "" });
      fetchDashboardData(); // Refresh dashboard data
    } catch (error) {
      console.error("Error logging communication:", error);
      alert("Error logging communication. Please try again.");
    }
  };

  return (
    <div className="user-page">
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="dashboard">
        {dashboardData.companies.length > 0 ? (
          dashboardData.companies.map((company) => (
            <div className="company-row" key={company._id}>
              <h3>{company.name}</h3>
              <div className="communications">
                <h4>Last 5 Communications:</h4>
                <ul>
                  {company.lastCommunications?.slice(0, 5).map((comm, index) => (
                    <li key={index}>
                      {comm.type} on {new Date(comm.date).toLocaleDateString()}: {comm.notes}
                    </li>
                  ))}
                </ul>
                <h4>Next Scheduled Communication:</h4>
                <p>
                  {company.nextScheduledCommunication
                    ? new Date(company.nextScheduledCommunication).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setSelectedCompany(company);
                }}
              >
                Log Communication
              </button>
            </div>
          ))
        ) : (
          <p>No companies available</p>
        )}
      </div>

      {showModal && (
        <Modal>
          <div className="modal-content">
            <h3>Log New Communication for {selectedCompany.name}</h3>
            <form>
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
                Date:
                <input
                  type="date"
                  value={communicationData.date}
                  onChange={(e) =>
                    setCommunicationData({ ...communicationData, date: e.target.value })
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

export default UserPage;
