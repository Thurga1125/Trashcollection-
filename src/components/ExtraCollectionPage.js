import React, { useState } from 'react';
import { collections } from '../data/sampleData';

const ExtraCollectionPage = ({ translations }) => {
  const t = translations;
  const [extraCollections, setExtraCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    scheduledDate: '',
    type: 'bulk',
    priority: 'normal',
    notes: ''
  });

  const collectionTypes = [
    { value: 'bulk', label: t.bulk },
    { value: 'hazardous', label: t.hazardous },
    { value: 'recycling', label: t.recycling },
    { value: 'regular', label: t.regular }
  ];

  const priorityLevels = [
    { value: 'normal', label: t.normal },
    { value: 'high', label: t.high },
    { value: 'urgent', label: t.urgent }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#f39c12';
      case 'pending': return '#3498db';
      case 'missed': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    return (
      <span 
        style={{ 
          backgroundColor: color, 
          color: 'white', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '4px', 
          fontSize: '0.8rem' 
        }}
      >
        {t[status] || status}
      </span>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCollection = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setExtraCollections(prev => [newCollection, ...prev]);
    setFormData({
      address: '',
      scheduledDate: '',
      type: 'bulk',
      priority: 'normal',
      notes: ''
    });
    setShowForm(false);
  };

  const handleStatusUpdate = (collectionId, newStatus) => {
    setExtraCollections(prev => 
      prev.map(collection => 
        collection.id === collectionId 
          ? { ...collection, status: newStatus }
          : collection
      )
    );
  };

  const handleDelete = (collectionId) => {
    if (window.confirm(t.deleteConfirm)) {
      setExtraCollections(prev => 
        prev.filter(collection => collection.id !== collectionId)
      );
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>{t.extraCollections}</span>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? t.cancel : t.newCollection}
          </button>
        </div>
        
        <div className="card-body">
          
          {/* Add New Collection Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                {t.newCollection}
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    
                    <div className="form-group">
                      <label className="form-label">{t.address} *</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter collection address"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.scheduledDate} *</label>
                      <input
                        type="date"
                        name="scheduledDate"
                        className="form-control"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.collectionType} *</label>
                      <select
                        name="type"
                        className="form-control"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        {collectionTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.priority}</label>
                      <select
                        name="priority"
                        className="form-control"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        {priorityLevels.map(priority => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="form-group">
                    <label className="form-label">{t.notes}</label>
                    <textarea
                      name="notes"
                      className="form-control"
                      rows="3"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Additional notes or special instructions"
                    />
                  </div>

                  <div className="d-flex justify-content-end" style={{ gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn btn-secondary"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="stats-grid mb-4">
            <div className="stat-card">
              <div className="stat-number">{extraCollections.length}</div>
              <div className="stat-label">Total Extra Collections</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {extraCollections.filter(c => c.status === 'pending').length}
              </div>
              <div className="stat-label">{t.pending}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {extraCollections.filter(c => c.status === 'completed').length}
              </div>
              <div className="stat-label">{t.completed}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {extraCollections.filter(c => c.priority === 'high' || c.priority === 'urgent').length}
              </div>
              <div className="stat-label">High Priority</div>
            </div>
          </div>

          {/* Collections Table */}
          {extraCollections.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t.address}</th>
                    <th>{t.scheduledDate}</th>
                    <th>{t.collectionType}</th>
                    <th>{t.priority}</th>
                    <th>{t.status}</th>
                    <th>{t.notes}</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {extraCollections.map((collection) => (
                    <tr key={collection.id}>
                      <td>{collection.address}</td>
                      <td>{new Date(collection.scheduledDate).toLocaleDateString()}</td>
                      <td>{t[collection.type] || collection.type}</td>
                      <td>
                        <span style={{ 
                          color: collection.priority === 'high' ? '#e74c3c' : 
                                 collection.priority === 'urgent' ? '#c0392b' : '#7f8c8d' 
                        }}>
                          {t[collection.priority] || collection.priority}
                        </span>
                      </td>
                      <td>{getStatusBadge(collection.status)}</td>
                      <td>
                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {collection.notes || '-'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {collection.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(collection.id, 'in-progress')}
                                className="btn btn-warning"
                                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                              >
                                Start
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(collection.id, 'completed')}
                                className="btn btn-success"
                                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                              >
                                Complete
                              </button>
                            </>
                          )}
                          {collection.status === 'in-progress' && (
                            <button
                              onClick={() => handleStatusUpdate(collection.id, 'completed')}
                              className="btn btn-success"
                              style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(collection.id)}
                            className="btn btn-danger"
                            style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                          >
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center mt-4">
              <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
                No extra collections scheduled. Click "{t.newCollection}" to add one.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ExtraCollectionPage;