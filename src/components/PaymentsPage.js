import React, { useState } from 'react';
import { payments } from '../data/sampleData';

const PaymentsPage = ({ translations }) => {
  const t = translations;
  const [paymentList, setPaymentList] = useState(payments);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'overdue': return '#e74c3c';
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

  const filteredPayments = paymentList.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = filteredPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const overdueAmount = filteredPayments
    .filter(payment => payment.status === 'overdue')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const handleStatusUpdate = (paymentId, newStatus) => {
    setPaymentList(paymentList.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: newStatus,
            paymentDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : null,
            method: newStatus === 'paid' ? 'credit_card' : null
          }
        : payment
    ));
  };

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          {t.paymentsTitle}
        </div>
        <div className="card-body">
          
          {/* Summary Stats */}
          <div className="stats-grid mb-4">
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(totalAmount)}</div>
              <div className="stat-label">Total Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(paidAmount)}</div>
              <div className="stat-label">Paid Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(overdueAmount)}</div>
              <div className="stat-label">Overdue Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{filteredPayments.length}</div>
              <div className="stat-label">Total Payments</div>
            </div>
          </div>

          {/* Filters */}
          <div className="d-flex mb-4" style={{ gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ marginBottom: 0, minWidth: '200px' }}>
              <input
                type="text"
                className="form-control"
                placeholder={`${t.search}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <select
                className="form-control"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">{t.paid}</option>
                <option value="pending">{t.pending}</option>
                <option value="overdue">{t.overdue}</option>
              </select>
            </div>
          </div>

          {/* Payments Table */}
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>{t.customerName}</th>
                  <th>{t.address}</th>
                  <th>{t.amount}</th>
                  <th>{t.dueDate}</th>
                  <th>{t.paymentStatus}</th>
                  <th>{t.paymentDate}</th>
                  <th>{t.paymentMethod}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.customerName}</td>
                    <td>{payment.address}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>
                      <span style={{
                        color: new Date(payment.dueDate) < new Date() && payment.status !== 'paid' 
                          ? '#e74c3c' : '#2c3e50'
                      }}>
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td>{getStatusBadge(payment.status)}</td>
                    <td>
                      {payment.paymentDate 
                        ? new Date(payment.paymentDate).toLocaleDateString() 
                        : '-'
                      }
                    </td>
                    <td>
                      {payment.method ? (
                        <span style={{ textTransform: 'capitalize' }}>
                          {payment.method.replace('_', ' ')}
                        </span>
                      ) : '-'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {payment.status === 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(payment.id, 'paid')}
                            className="btn btn-success"
                            style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                          >
                            Mark Paid
                          </button>
                        )}
                        {payment.status === 'overdue' && (
                          <button
                            onClick={() => handleStatusUpdate(payment.id, 'paid')}
                            className="btn btn-success"
                            style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                          >
                            Mark Paid
                          </button>
                        )}
                        {payment.status === 'paid' && (
                          <button
                            onClick={() => handleStatusUpdate(payment.id, 'pending')}
                            className="btn btn-warning"
                            style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                          >
                            Mark Pending
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
            <div className="text-center mt-4">
              <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
                {t.noData}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;