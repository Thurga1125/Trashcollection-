import React, { useState } from 'react';
import { collections } from '../data/sampleData';

const CollectionsPage = ({ translations }) => {
  const t = translations || {};
  const [collectionList] = useState(collections || []);

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          {t.collectionsTitle || 'Collections'}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>{t.address || 'Address'}</th>
                  <th>{t.scheduledDate || 'Scheduled Date'}</th>
                  <th>{t.status || 'Status'}</th>
                  <th>{t.notes || 'Notes'}</th>
                </tr>
              </thead>
              <tbody>
                {collectionList.map((collection) => (
                  <tr key={collection.id}>
                    <td>{collection.address}</td>
                    <td>{new Date(collection.scheduledDate).toLocaleDateString()}</td>
                    <td>
                      <span style={{ 
                        backgroundColor: collection.status === 'completed' ? '#27ae60' : '#f39c12',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {collection.status}
                      </span>
                    </td>
                    <td>{collection.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;