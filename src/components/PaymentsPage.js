import React, { useState } from 'react';
import './PaymentsPage.css';

// Import the entire sampleData object, not named export
import sampleData from '../data/sampleData';

const PaymentsPage = ({ translations, payments: propsPayments, setPayments, addNotification }) => {
  const t = translations || {};
  
  // Use payments from props if available, otherwise use sample data
  const initialPayments = propsPayments || sampleData?.payments || [];
  const [paymentList, setPaymentList] = useState(initialPayments);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'overdue': return '#e74c3c';
      case 'processing': return '#3498db';
      default: return '#7f8c8d';
    }
  };

  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    return (
      <span 
        className="payment-status"
        style={{ 
          backgroundColor: color,
          color: 'white',
          padding: '5px 12px',
          borderRadius: '15px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {t[status] || status}
      </span>
    );
  };

  const filteredPayments = paymentList.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch = payment.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoice?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const paidAmount = filteredPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const pendingAmount = filteredPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const overdueAmount = filteredPayments
    .filter(payment => payment.status === 'overdue')
    .reduce((sum, payment) => sum + (payment.amount || 0), 0);

  const handleStatusUpdate = (paymentId, newStatus) => {
    const updatedPayments = paymentList.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: newStatus,
            date: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : payment.date,
            method: newStatus === 'paid' ? (payment.method || 'Credit Card') : payment.method
          }
        : payment
    );
    
    setPaymentList(updatedPayments);
    
    if (setPayments) {
      setPayments(updatedPayments);
    }
    
    if (addNotification) {
      addNotification('success', 'Payment Updated', `Payment status changed to ${newStatus}`);
    }
  };

  return (
    <div className="payments-page">
      <div className="payments-header">
        <h1 className="payments-title">{t.paymentsTitle || 'Payments Management'}</h1>
        
        <div className="payments-summary">
          <div className="summary-item">
            <div className="summary-amount total">{formatCurrency(totalAmount)}</div>
            <div className="summary-label">Total Amount</div>
          </div>
          <div className="summary-item">
            <div className="summary-amount paid">{formatCurrency(paidAmount)}</div>
            <div className="summary-label">Paid Amount</div>
          </div>
          <div className="summary-item">
            <div className="summary-amount pending">{formatCurrency(pendingAmount)}</div>
            <div className="summary-label">Pending Amount</div>
          </div>
          <div className="summary-item">
            <div className="summary-amount overdue">{formatCurrency(overdueAmount)}</div>
            <div className="summary-label">Overdue Amount</div>
          </div>
        </div>
      </div>

      <div className="payments-filters">
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Search:</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Search by customer, invoice, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Status:</label>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="payments-table-container">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  <strong>{payment.invoice || `INV-${payment.id.toString().padStart(3, '0')}`}</strong>
                </td>
                <td>{payment.customer}</td>
                <td>
                  <span className="payment-amount">{formatCurrency(payment.amount)}</span>
                </td>
                <td>
                  <span style={{
                    color: new Date(payment.date) < new Date() && payment.status !== 'paid' 
                      ? '#e74c3c' : '#2c3e50'
                  }}>
                    {new Date(payment.date).toLocaleDateString()}
                  </span>
                </td>
                <td>
                  {payment.method ? (
                    <span style={{ textTransform: 'capitalize' }}>
                      {payment.method.replace('_', ' ')}
                    </span>
                  ) : '-'}
                </td>
                <td>{getStatusBadge(payment.status)}</td>
                <td>{payment.description || '-'}</td>
                <td>
                  <div className="payment-actions">
                    {payment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(payment.id, 'paid')}
                          className="action-btn-small view"
                        >
                          Mark Paid
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(payment.id, 'overdue')}
                          className="action-btn-small delete"
                        >
                          Mark Overdue
                        </button>
                      </>
                    )}
                    {payment.status === 'overdue' && (
                      <button
                        onClick={() => handleStatusUpdate(payment.id, 'paid')}
                        className="action-btn-small view"
                      >
                        Mark Paid
                      </button>
                    )}
                    {payment.status === 'paid' && (
                      <button
                        onClick={() => handleStatusUpdate(payment.id, 'pending')}
                        className="action-btn-small edit"
                      >
                        Mark Pending
                      </button>
                    )}
                    {payment.status === 'processing' && (
                      <button
                        onClick={() => handleStatusUpdate(payment.id, 'paid')}
                        className="action-btn-small view"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPayments.length === 0 && (
        <div className="no-payments">
          <h3>No payments found</h3>
          <p>No payments match your current filter criteria.</p>
        </div>
      )}

      <div className="payments-pagination">
        <button className="pagination-btn" disabled>Previous</button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default PaymentsPage;