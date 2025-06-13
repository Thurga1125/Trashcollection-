export const sampleUser = {
  id: 1,
  fullName: 'Saman Perera',
  nic: '912345678V',
  address: {
    houseNumber: '25/A',
    street: 'Galle Road',
    city: 'Colombo',
    district: 'Colombo',
    province: 'Western'
  },
  phone: '+94771234567',
  email: 'saman.perera@email.com',
  lastPayment: {
    amount: 2500,
    date: '2024-11-15',
    type: 'monthly'
  },
  nextPayment: {
    amount: 2500,
    dueDate: '2024-12-15',
    remainingDays: 10
  },
  extraCollections: [
    {
      id: 1,
      date: '2024-11-20',
      amount: 800,
      location: 'Front gate',
      status: 'completed',
      trashAmount: '3 bags'
    },
    {
      id: 2,
      date: '2024-10-28',
      amount: 1200,
      location: 'Back yard',
      status: 'completed',
      trashAmount: '6 bags'
    }
  ],
  collectionSchedule: {
    regularDay: 'Monday & Thursday',
    nextCollection: '2024-12-05',
    timeSlot: '8:00 AM - 10:00 AM'
  },
  paymentHistory: [
    {
      id: 1,
      date: '2024-11-20',
      type: 'Extra Collection',
      amount: 800,
      status: 'paid',
      method: 'Card Payment'
    },
    {
      id: 2,
      date: '2024-11-15',
      type: 'Monthly Fee',
      amount: 2500,
      status: 'paid',
      method: 'Mobile Banking'
    },
    {
      id: 3,
      date: '2024-10-28',
      type: 'Extra Collection',
      amount: 1200,
      status: 'paid',
      method: 'LankaQR'
    },
    {
      id: 4,
      date: '2024-10-15',
      type: 'Monthly Fee',
      amount: 2500,
      status: 'paid',
      method: 'Bank Transfer'
    }
  ],
  notifications: [
    {
      id: 1,
      title: 'Collection Reminder',
      message: 'Your next waste collection is scheduled for tomorrow at 8:00 AM',
      date: '2024-12-04',
      read: false,
      type: 'reminder'
    },
    {
      id: 2,
      title: 'Payment Successful',
      message: 'Your monthly payment of Rs. 2,500 has been processed successfully',
      date: '2024-11-15',
      read: true,
      type: 'payment'
    },
    {
      id: 3,
      title: 'Schedule Change',
      message: 'Collection schedule for your area has been updated. Check new timings.',
      date: '2024-11-10',
      read: true,
      type: 'update'
    }
  ]
};