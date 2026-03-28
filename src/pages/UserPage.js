import React, { useEffect, useState } from "react";
import { getDashboard, logCommunication } from "../utils/api";
import Modal from "../components/Modal";
import Skeleton from "../components/Loading/Skeleton";
import { MdHistory, MdSchedule, MdAddBox, MdBusiness } from "react-icons/md";
import "./UserPage.css";

const UserPage = () => {
  const [dashboardData, setDashboardData] = useState({ companies: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [communicationData, setCommunicationData] = useState({
    type: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      setDashboardData(response || { companies: [] });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setErrorMessage("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogCommunication = async () => {
    if (!selectedCompany) return;
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
      setCommunicationData({ type: "", date: new Date().toISOString().split('T')[0], notes: "" });
      fetchDashboardData();
    } catch (error) {
      console.error("Error logging communication:", error);
      alert("Error logging communication.");
    }
  };

  return (
    <div className="user-page">
      <header className="page-header">
        <div>
          <h1>User Dashboard</h1>
          <p className="text-muted">Manage your communications and outreach</p>
        </div>
      </header>

      {errorMessage && <div className="error-badge">{errorMessage}</div>}

      <div className="company-grid">
        {loading ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i} type="card" />)
        ) : dashboardData.companies && dashboardData.companies.length > 0 ? (
          dashboardData.companies.map((company) => (
            <div className="company-card glass" key={company._id}>
              <div className="card-header">
                <div className="company-icon"><MdBusiness /></div>
                <h3>{company.name}</h3>
              </div>
              
              <div className="card-body">
                <div className="info-row">
                    <MdHistory className="icon" />
                    <div>
                        <p className="label">Last 5 Activities</p>
                        <ul className="comm-list">
                            {company.lastCommunications?.slice(0, 5).map((comm, index) => (
                                <li key={index} title={comm.notes}>
                                    <span className="dot"></span>
                                    {comm.type} - {new Date(comm.date).toLocaleDateString()}
                                </li>
                            ))}
                            {(!company.lastCommunications || company.lastCommunications.length === 0) && (
                                <li className="text-muted">No history yet</li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="info-row highlight">
                    <MdSchedule className="icon" />
                    <div>
                        <p className="label">Next Scheduled</p>
                        <p className="value">
                            {company.nextScheduledCommunication
                                ? new Date(company.nextScheduledCommunication).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                    className="btn-primary full-width"
                    onClick={() => {
                        setShowModal(true);
                        setSelectedCompany(company);
                    }}
                >
                    <MdAddBox size={18} />
                    <span>Log Activity</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state glass">
             <p>No companies available to track.</p>
          </div>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modern-modal">
            <h3>Log New Activity for {selectedCompany?.name}</h3>
            <form className="modern-form">
              <div className="form-group">
                <label>Communication Type</label>
                <input
                  type="text"
                  placeholder="e.g. LinkedIn Message"
                  value={communicationData.type}
                  onChange={(e) =>
                    setCommunicationData({ ...communicationData, type: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={communicationData.date}
                  onChange={(e) =>
                    setCommunicationData({ ...communicationData, date: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Detailed Notes</label>
                <textarea
                  placeholder="What was discussed?"
                  rows={4}
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
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserPage;
