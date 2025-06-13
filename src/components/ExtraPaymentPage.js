import React, { useState } from 'react';

const ExtraPaymentPage = ({ translations }) => {
  const t = translations;
  const [extraPayments, setExtraPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    amount: '',
    dueDate: '',
    description: '',
    type: 'extra_service'
  });

  const paymentTypes = [
    { value: 'extra_service', label: 'Extra Service' },
    { value: 'late_fee', label: 'Late Fee' },
    { value: 'special_pickup', label: 'Special Pickup' },
    { value: 'damage_fee', label: 'Damage Fee' },
    { value: 'other', label: 'Other' }
  ];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPayment = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      status: 'pending',
      paymentDate: null,
      method: null,
      createdAt: new Date().toISOString()
    };

    setExtraPayments(prev => [newPayment, ...prev]);
    setFormData({
      customerName: '',
      address: '',
      amount: '',
      dueDate: '',
      description: '',
      type: 'extra_service'
    });
    setShowForm(false);
  };

  const handleStatusUpdate = (paymentId, newStatus) => {
    setExtraPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { 
              ...payment, 
              status: newStatus,
              paymentDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : null,
              method: newStatus === 'paid' ? 'credit_card' : null
            }
          : payment
      )
    );
  };

  const handleDelete = (paymentId) => {
    if (window.confirm(t.deleteConfirm)) {
      setExtraPayments(prev => 
        prev.filter(payment => payment.id !== paymentId)
      );
    }
  };

  const totalAmount = extraPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = extraPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = extraPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>{t.extraPayments}</span>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? t.cancel : 'Add Extra Payment'}
          </button>
        </div>
        
        <div className="card-body">
          
          {/* Add New Payment Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                Add New Extra Payment
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    
                    <div className="form-group">
                      <label className="form-label">{t.customerName} *</label>
                      <input
                        type="text"
                        name="customerName"
                        className="form-control"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter customer name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.address} *</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter customer address"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.amount} *</label>
                      <input
                        type="number"
                        name="amount"
                        className="form-control"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.dueDate} *</label>
                      <input
                        type="date"
                        name="dueDate"
                        className="form-control"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Payment Type *</label>
                      <select
                        name="type"
                        className="form-control"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        {paymentTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description of the extra payment"
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
              <div className="stat-number">{formatCurrency(totalAmount)}</div>
              <div className="stat-label">Total Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(paidAmount)}</div>
              <div className="stat-label">Paid Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(pendingAmount)}</div>
              <div className="stat-label">Pending Amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{extraPayments.length}</div>
              <div className="stat-label">Total Extra Payments</div>
            </div>
          </div>

          {/* Payments Table */}
          {extraPayments.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t.customerName}</th>
                    <th>{t.address}</th>
                    <th>Type</th>
                    <th>{t.amount}</th>
                    <th>{t.dueDate}</th>
                    <th>{t.status}</th>
                    <th>{t.paymentDate}</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {extraPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.customerName}</td>
                      <td>{payment.address}</td>
                      <td style={{ textTransform: 'capitalize' }}>
                        {payment.type.replace('_', ' ')}
                      </td>
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
                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {payment.description || '-'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {payment.status === 'pending' && (
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
                          <button
                            onClick={() => handleDelete(payment.id)}
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
                No extra payments created. Click "Add Extra Payment" to create one.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ExtraPaymentPage;