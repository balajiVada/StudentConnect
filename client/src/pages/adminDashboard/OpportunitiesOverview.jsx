import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './OpportunitiesOverview.css';

const OpportunitiesOverview = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    company: '',
    description: '',
    type: 'full time',
    link: '',
    applicationDeadline: '',
    skills: '',
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const res = await api.get('/opportunities/opportunity');
      setOpportunities(res.data);
    } catch (err) {
      console.error('Error fetching opportunities:', err);
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingId(null);
    setNewOpportunity({
      title: '',
      company: '',
      description: '',
      type: 'full time',
      link: '',
      applicationDeadline: '',
      skills: '',
    });
  };

  const handleSaveOpportunity = async () => {
    const payload = {
      ...newOpportunity,
      // Split skills string into an array, trim whitespace from each skill
      skills: newOpportunity.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
    };

    try {
      if (isEditMode) {
        await api.put(`/opportunities/opportunity/${editingId}`, payload);
        fetchOpportunities(); // Refresh the list after update
      } else {
        const res = await api.post('/opportunities/opportunity', payload);
        setOpportunities([...opportunities, res.data]);
      }
      resetModal();
    } catch (err) {
      console.error('Error saving opportunity:', err.response?.data || err.message);
      // Use a custom modal/message box for errors instead of alert()
      console.log(err.response?.data?.error || 'Failed to save opportunity.');
    }
  };

  const handleEditClick = (opportunity) => {
    setIsEditMode(true);
    setEditingId(opportunity._id);
    setNewOpportunity({
      title: opportunity.title,
      company: opportunity.company,
      description: opportunity.description,
      type: opportunity.type,
      link: opportunity.link,
      applicationDeadline: opportunity.applicationDeadline,
      skills: opportunity.skills.join(', '),
    });
    setShowModal(true);
  };

  const handleDeleteOpportunity = async (id) => {
    console.log('Confirm deletion of opportunity ID:', id);
    if (!window.confirm('Are you sure you want to delete this opportunity?')) return; // Placeholder for custom modal

    try {
      await api.delete(`/opportunities/opportunity/${id}`);
      setOpportunities(opportunities.filter(job => job._id !== id));
    } catch (err) {
      console.error('Error deleting opportunity:', err);
    }
  };

  const filteredAndSorted = opportunities
    .filter(job =>
      // Filter by type
      (!typeFilter || job.type === typeFilter) &&
      // Filter by search term in title or company name
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      // Sort by newest or oldest creation date
      return sortBy === 'Newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="op-opportunities-container">
      <div className="op-opportunities-header">
        <h2 className="op-opportunities-title">Opportunities Management</h2>
        <button className="op-add-opportunity-button" onClick={() => setShowModal(true)}>+ Add Opportunity</button>
      </div>

      <div className="op-filters-container">
        <div className="op-filters">
          <select className="op-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">Type ▼</option>
            <option value="internship">internship</option>
            <option value="full time">full time</option>
            <option value="part time">part time</option>
          </select>
          {/* <select className="op-filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Newest">Sort: Newest</option>
            <option value="Oldest">Sort: Oldest</option>
          </select> */}
        </div>
        <div className="op-search-bar">
          <input
            type="text"
            placeholder="🔍 Search by Title or Company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="op-opportunity-grid">
        {filteredAndSorted.map((job) => (
          <div key={job._id} className="op-opportunity-card">
            <div className="op-opportunity-card-header">
              <h3 className="op-opportunity-card-title">{job.title}</h3>
              <div className="op-card-actions">
                <button className="op-edit-btn" onClick={() => handleEditClick(job)}>Edit</button>
                <button className="op-delete-btn" onClick={() => handleDeleteOpportunity(job._id)}>Delete</button>
              </div>
            </div>
            <p className="op-opportunity-detail">Type: {job.type}</p>
            <p className="op-opportunity-detail">Company: {job.company}</p>
            <p className="op-opportunity-detail">Description: {job.description}</p>
            <p className="op-opportunity-detail">Application Deadline: {job.applicationDeadline}</p>
            <p className="op-opportunity-detail">Skills: {job.skills.join(', ')}</p>
            <p className="op-opportunity-detail">
              <a href={job.link} target="_blank" rel="noopener noreferrer">Open Opportunity</a>
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="op-modal-container">
          <div className="op-modal">
            <h2>{isEditMode ? 'Edit Opportunity' : 'Add New Opportunity'}</h2>
            <input
              type="text"
              placeholder="Title"
              value={newOpportunity.title}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company"
              value={newOpportunity.company}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, company: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newOpportunity.description}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
            />
            <select
              value={newOpportunity.type}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, type: e.target.value })}
            >
              <option value="internship">internship</option>
              <option value="full time">full time</option>
              <option value="part time">part time</option>
            </select>
            <input
              type="text"
              placeholder="Application Deadline"
              value={newOpportunity.applicationDeadline}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, applicationDeadline: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={newOpportunity.skills}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, skills: e.target.value })}
            />
            <input
              type="text"
              placeholder="Link"
              value={newOpportunity.link}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, link: e.target.value })}
            />
            <div className="op-modal-actions">
              <button className="op-save-btn" onClick={handleSaveOpportunity}>Save</button>
              <button className="op-cancel-btn" onClick={resetModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesOverview;

