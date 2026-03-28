import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import Skeleton from '../components/Loading/Skeleton';
import { MdEdit, MdDelete, MdAdd, MdBusiness } from 'react-icons/md';
import './AdminPage.css';

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    location: '',
    linkedinProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: '',
  });
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [error, setError] = useState('');

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/company');
      setCompanies(data || []);
    } catch (err) {
      setError('Failed to fetch companies.');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    try {
      const response = isEditingCompany
        ? await api.put(`/admin/company/${formData.id}`, formData)
        : await api.post('/admin/company', formData);
      
      const newData = response.data;
      setCompanies((prev) =>
        isEditingCompany
          ? prev.map((company) => (company._id === newData._id ? newData : company))
          : [...prev, newData]
      );
      resetForm();
    } catch (err) {
      setError('Error adding/updating company.');
      console.error('Error adding/updating company:', err);
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      await api.delete(`/admin/company/${id}`);
      setCompanies((prev) => prev.filter((company) => company._id !== id));
    } catch (err) {
      setError('Error deleting company.');
      console.error('Error deleting company:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      location: '',
      linkedinProfile: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      communicationPeriodicity: '',
    });
    setIsEditingCompany(false);
    setError('');
  };

  if (!user) {
    return (
        <div className="admin-page glass text-center" style={{ padding: '4rem' }}>
            <p>Please log in to access the admin page.</p>
        </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="page-header">
        <div>
          <h1>Admin Management</h1>
          <p className="text-muted">Manage companies and system configuration</p>
        </div>
      </header>

      <div className="admin-content-grid">
        <section className="form-section glass">
          <div className="section-header">
            <MdAdd size={24} />
            <h2>{isEditingCompany ? 'Edit Company' : 'Add New Company'}</h2>
          </div>
          {error && <div className="error-badge">{error}</div>}
          <form className="modern-form" onSubmit={handleSubmitCompany}>
            <div className="form-group">
                <label>Company Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="e.g. Acme Corp"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-grid">
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        placeholder="e.g. New York"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Periodicity</label>
                    <input
                        type="text"
                        name="communicationPeriodicity"
                        value={formData.communicationPeriodicity}
                        placeholder="e.g. 2 weeks"
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>LinkedIn Profile</label>
                <input
                    type="url"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    placeholder="https://linkedin.com/company/..."
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Emails</label>
                <input
                    type="text"
                    name="emails"
                    value={formData.emails}
                    placeholder="comma-separated list"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Comments</label>
                <textarea
                    name="comments"
                    value={formData.comments}
                    placeholder="Internal notes..."
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-actions">
                {isEditingCompany && (
                    <button type="button" className="btn-ghost" onClick={resetForm}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn-primary">
                    {isEditingCompany ? 'Update' : 'Create'} Company
                </button>
            </div>
          </form>
        </section>

        <section className="list-section glass">
          <div className="section-header">
            <MdBusiness size={24} />
            <h2>Registered Companies</h2>
          </div>
          <div className="scrollable-table-wrapper">
            {loading ? (
                Array(5).fill(0).map((_, i) => <Skeleton key={i} type="text" />)
            ) : (
                <table className="modern-table">
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.length === 0 ? (
                        <tr><td colSpan="3" className="text-center">No companies found.</td></tr>
                    ) : (
                        companies.map((company) => (
                        <tr key={company._id}>
                            <td><strong>{company.name}</strong></td>
                            <td>{company.location}</td>
                            <td>
                            <div className="action-buttons">
                                <button
                                    className="icon-btn edit"
                                    onClick={() => {
                                        setFormData({ ...company, id: company._id });
                                        setIsEditingCompany(true);
                                    }}
                                >
                                    <MdEdit />
                                </button>
                                <button className="icon-btn delete" onClick={() => handleDeleteCompany(company._id)}>
                                    <MdDelete />
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
