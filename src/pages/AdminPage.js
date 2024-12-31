import React, { useState, useEffect, useContext } from 'react';
import './AdminPage.css';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const AdminPage = () => {
  const { user } = useContext(AuthContext); // Access authenticated user
  const [companies, setCompanies] = useState([]);
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

  useEffect(() => {
    fetchCompanies(); // Fetch companies when the page loads
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data } = await api.get('/admin/company'); // GET request
      setCompanies(data);
    } catch (err) {
      setError('Failed to fetch companies. Please try again later.');
      console.error('Error fetching companies:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    try {
      const response = isEditingCompany
        ? await api.put(`/admin/company/${formData.id}`, formData) // PUT request
        : await api.post('/admin/company', formData); // POST request
      const newData = response.data;

      setCompanies((prev) =>
        isEditingCompany
          ? prev.map((company) => (company._id === newData._id ? newData : company))
          : [...prev, newData]
      );
      resetForm();
    } catch (err) {
      setError('Error adding/updating company. Please try again.');
      console.error('Error adding/updating company:', err);
    }
  };

  const handleDeleteCompany = async (id) => {
    try {
      await api.delete(`/admin/company/${id}`); // DELETE request
      setCompanies((prev) => prev.filter((company) => company._id !== id));
    } catch (err) {
      setError('Error deleting company. Please try again.');
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
    return <p>Please log in to access the admin page.</p>;
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Page</h1>
      <p>Welcome, {user?.name || 'Admin'}!</p>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Company Form */}
      <div className="section">
        <h2>{isEditingCompany ? 'Edit Company' : 'Add Company'}</h2>
        <form className="admin-form" onSubmit={handleSubmitCompany}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Location"
            onChange={handleInputChange}
            required
          />
          <input
            type="url"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            placeholder="LinkedIn Profile"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="emails"
            value={formData.emails}
            placeholder="Emails (comma-separated)"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            placeholder="Phone Numbers (comma-separated)"
            onChange={handleInputChange}
          />
          <textarea
            name="comments"
            value={formData.comments}
            placeholder="Comments"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="communicationPeriodicity"
            value={formData.communicationPeriodicity}
            placeholder="Communication Periodicity (e.g., 2 weeks)"
            onChange={handleInputChange}
          />
          <button type="submit">
            {isEditingCompany ? 'Update Company' : 'Add Company'}
          </button>
          {isEditingCompany && <button onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      {/* Company List */}
      <div className="section">
        <h2>Company List</h2>
        <div className="table-container">
          <table className="company-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>LinkedIn Profile</th>
                <th>Emails</th>
                <th>Phone Numbers</th>
                <th>Comments</th>
                <th>Communication Periodicity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>{company.name}</td>
                  <td>{company.location}</td>
                  <td>{company.linkedinProfile}</td>
                  <td>{company.emails}</td>
                  <td>{company.phoneNumbers}</td>
                  <td>{company.comments}</td>
                  <td>{company.communicationPeriodicity}</td>
                  <td>
                    <button
                      onClick={() => {
                        setFormData({ ...company, id: company._id });
                        setIsEditingCompany(true);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCompany(company._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
