// Sample data for the trash collection app
export const sampleUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  avatar: '/api/placeholder/40/40'
};

export const collections = [
  {
    id: 1,
    address: '123 Main St',
    scheduledDate: '2025-06-15',
    status: 'pending',
    type: 'regular',
    priority: 'normal',
    notes: 'Regular weekly pickup'
  },
  {
    id: 2,
    address: '456 Oak Ave',
    scheduledDate: '2025-06-14',
    status: 'completed',
    type: 'recycling',
    priority: 'normal',
    notes: 'Recycling collection'
  },
  {
    id: 3,
    address: '789 Pine Rd',
    scheduledDate: '2025-06-16',
    status: 'in-progress',
    type: 'bulk',
    priority: 'high',
    notes: 'Large furniture items'
  },
  {
    id: 4,
    address: '321 Elm St',
    scheduledDate: '2025-06-13',
    status: 'missed',
    type: 'regular',
    priority: 'normal',
    notes: 'Customer not available'
  }
];

export const payments = [
  {
    id: 1,
    customerName: 'John Smith',
    address: '123 Main St',
    amount: 25.00,
    dueDate: '2025-06-20',
    status: 'paid',
    paymentDate: '2025-06-18',
    method: 'credit_card'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    address: '456 Oak Ave',
    amount: 30.00,
    dueDate: '2025-06-22',
    status: 'pending',
    paymentDate: null,
    method: null
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    address: '789 Pine Rd',
    amount: 45.00,
    dueDate: '2025-06-15',
    status: 'overdue',
    paymentDate: null,
    method: null
  }
];