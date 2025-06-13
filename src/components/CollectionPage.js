import React, { useState } from 'react';
import './CollectionPage.css';

// Import the entire sampleData object, not named export
import sampleData from '../data/sampleData';

const CollectionPage = ({ translations, collections: propsCollections, setCollections, addNotification }) => {
  const t = translations || {};
  
  // Use collections from props if available, otherwise use sample data
  const initialCollections = propsCollections || sampleData?.collections || [];
  const [collectionList, setCollectionList] = useState(initialCollections);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter collections based on status and search term
  const filteredCollections = collectionList.filter(collection => {
    const matchesFilter = filter === 'all' || collection.status === filter;
    const matchesSearch = collection.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle status update
  const updateCollectionStatus = (id, newStatus) => {
    const updatedCollections = collectionList.map(collection =>
      collection.id === id ? { ...collection, status: newStatus } : collection
    );
    setCollectionList(updatedCollections);
    
    if (setCollections) {
      setCollections(updatedCollections);
    }
    
    if (addNotification) {
      addNotification('success', 'Status Updated', `Collection status changed to ${newStatus}`);
    }
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    const styles = {
      completed: { backgroundColor: '#27ae60', color: 'white' },
      scheduled: { backgroundColor: '#3498db', color: 'white' },
      pending: { backgroundColor: '#f39c12', color: 'white' },
      cancelled: { backgroundColor: '#e74c3c', color: 'white' }
    };
    return styles[status] || { backgroundColor: '#95a5a6', color: 'white' };
  };

  return (
    <div className="collection-page">
      <div className="collection-header">
        <h1 className="collection-title">{t.collectionsTitle || 'Collections Management'}</h1>
        <p className="collection-subtitle">Manage and track all waste collections</p>
      </div>

      {/* Filters and Search */}
      <div className="collection-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Status Filter:</label>
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Search:</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Search by address or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="collection-grid">
        {filteredCollections.length > 0 ? (
          filteredCollections.map((collection) => (
            <div key={collection.id} className="collection-card">
              <div 
                className="collection-status"
                style={getStatusStyle(collection.status)}
              >
                {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
              </div>
              
              <div className="collection-info">
                <h3>{collection.customer}</h3>
                <p><strong>📍 Address:</strong> {collection.address}</p>
                <p><strong>📅 Date:</strong> {new Date(collection.date).toLocaleDateString()}</p>
                <p><strong>⏰ Time:</strong> {collection.time}</p>
                <p><strong>🗑️ Waste Type:</strong> {collection.wasteType}</p>
                <p><strong>💰 Amount:</strong> LKR {collection.amount?.toLocaleString()}</p>
                {collection.notes && (
                  <p><strong>📝 Notes:</strong> {collection.notes}</p>
                )}
              </div>

              <div className="collection-actions">
                {collection.status === 'scheduled' && (
                  <>
                    <button 
                      className="btn btn-primary"
                      onClick={() => updateCollectionStatus(collection.id, 'completed')}
                    >
                      Mark Complete
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => updateCollectionStatus(collection.id, 'pending')}
                    >
                      Mark Pending
                    </button>
                  </>
                )}
                
                {collection.status === 'pending' && (
                  <>
                    <button 
                      className="btn btn-primary"
                      onClick={() => updateCollectionStatus(collection.id, 'completed')}
                    >
                      Mark Complete
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => updateCollectionStatus(collection.id, 'scheduled')}
                    >
                      Reschedule
                    </button>
                  </>
                )}

                {collection.status === 'completed' && (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => updateCollectionStatus(collection.id, 'scheduled')}
                  >
                    Reopen
                  </button>
                )}

                <button className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-collections">
            <h3>No collections found</h3>
            <p>No collections match your current filter criteria.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="collection-summary">
        <div className="summary-card">
          <h4>Total Collections</h4>
          <span className="summary-number">{collectionList.length}</span>
        </div>
        <div className="summary-card">
          <h4>Completed</h4>
          <span className="summary-number">
            {collectionList.filter(c => c.status === 'completed').length}
          </span>
        </div>
        <div className="summary-card">
          <h4>Scheduled</h4>
          <span className="summary-number">
            {collectionList.filter(c => c.status === 'scheduled').length}
          </span>
        </div>
        <div className="summary-card">
          <h4>Pending</h4>
          <span className="summary-number">
            {collectionList.filter(c => c.status === 'pending').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;