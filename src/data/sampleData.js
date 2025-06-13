// src/data/sampleData.js
const sampleData = {
  collections: [
    {
      id: 1,
      customer: 'John Smith',
      address: '123 Main St, Galle',
      wasteType: 'Household Waste',
      date: '2025-06-15',
      time: '09:00',
      status: 'scheduled',
      amount: 2500,
      notes: 'Regular weekly collection'
    },
    {
      id: 2,
      customer: 'Maria Garcia',
      address: '456 Oak Ave, Galle',
      wasteType: 'Recyclable Waste',
      date: '2025-06-14',
      time: '10:30',
      status: 'completed',
      amount: 1800,
      notes: 'Separated recyclables'
    },
    {
      id: 3,
      customer: 'David Johnson',
      address: '789 Pine Rd, Galle',
      wasteType: 'Organic Waste',
      date: '2025-06-16',
      time: '08:15',
      status: 'pending',
      amount: 2200,
      notes: 'Garden waste included'
    },
    {
      id: 4,
      customer: 'Sarah Wilson',
      address: '321 Elm St, Galle',
      wasteType: 'Bulky Waste',
      date: '2025-06-13',
      time: '14:00',
      status: 'completed',
      amount: 4500,
      notes: 'Furniture disposal'
    },
    {
      id: 5,
      customer: 'Mike Brown',
      address: '654 Cedar Ln, Galle',
      wasteType: 'Household Waste',
      date: '2025-06-17',
      time: '11:00',
      status: 'scheduled',
      amount: 2800,
      notes: 'Extra bags this week'
    }
  ],
  
  payments: [
    {
      id: 1,
      customer: 'John Smith',
      amount: 2500,
      date: '2025-06-10',
      method: 'Credit Card',
      status: 'paid',
      invoice: 'INV-001',
      description: 'Weekly waste collection'
    },
    {
      id: 2,
      customer: 'Maria Garcia',
      amount: 1800,
      date: '2025-06-12',
      method: 'Bank Transfer',
      status: 'paid',
      invoice: 'INV-002',
      description: 'Recyclable waste collection'
    },
    {
      id: 3,
      customer: 'David Johnson',
      amount: 2200,
      date: '2025-06-08',
      method: 'Cash',
      status: 'pending',
      invoice: 'INV-003',
      description: 'Organic waste collection'
    },
    {
      id: 4,
      customer: 'Sarah Wilson',
      amount: 4500,
      date: '2025-06-05',
      method: 'Credit Card',
      status: 'paid',
      invoice: 'INV-004',
      description: 'Bulky waste disposal'
    },
    {
      id: 5,
      customer: 'Mike Brown',
      amount: 2800,
      date: '2025-06-15',
      method: 'Debit Card',
      status: 'overdue',
      invoice: 'INV-005',
      description: 'Household waste collection'
    },
    {
      id: 6,
      customer: 'Lisa Anderson',
      amount: 3200,
      date: '2025-06-11',
      method: 'Bank Transfer',
      status: 'processing',
      invoice: 'INV-006',
      description: 'Commercial waste collection'
    }
  ],

  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      phone: '+94 77 123 4567',
      address: '100 Admin St, Galle'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'collector',
      phone: '+94 77 234 5678',
      address: '200 Collector Ave, Galle'
    }
  ],

  routes: [
    {
      id: 1,
      name: 'Route A - Central Galle',
      driver: 'Kamal Perera',
      vehicle: 'TR-001',
      collections: [1, 2, 3],
      status: 'active',
      estimatedTime: '4 hours',
      distance: '25 km'
    },
    {
      id: 2,
      name: 'Route B - Coastal Area',
      driver: 'Nimal Silva',
      vehicle: 'TR-002',
      collections: [4, 5],
      status: 'completed',
      estimatedTime: '3 hours',
      distance: '18 km'
    }
  ],

  vehicles: [
    {
      id: 1,
      registration: 'TR-001',
      type: 'Garbage Truck',
      capacity: '10 tons',
      driver: 'Kamal Perera',
      status: 'active',
      lastMaintenance: '2025-05-15',
      nextMaintenance: '2025-07-15'
    },
    {
      id: 2,
      registration: 'TR-002',
      type: 'Recycling Truck',
      capacity: '8 tons',
      driver: 'Nimal Silva',
      status: 'maintenance',
      lastMaintenance: '2025-06-01',
      nextMaintenance: '2025-08-01'
    }
  ],

  wasteTypes: [
    {
      id: 1,
      name: 'Household Waste',
      price: 2500,
      description: 'Regular household garbage',
      color: '#e74c3c'
    },
    {
      id: 2,
      name: 'Recyclable Waste',
      price: 1800,
      description: 'Paper, plastic, glass, metal',
      color: '#27ae60'
    },
    {
      id: 3,
      name: 'Organic Waste',
      price: 2200,
      description: 'Food scraps, garden waste',
      color: '#f39c12'
    },
    {
      id: 4,
      name: 'Hazardous Waste',
      price: 5000,
      description: 'Chemicals, batteries, paint',
      color: '#8e44ad'
    },
    {
      id: 5,
      name: 'Bulky Waste',
      price: 4500,
      description: 'Furniture, appliances',
      color: '#34495e'
    },
    {
      id: 6,
      name: 'Electronic Waste',
      price: 3500,
      description: 'Computers, phones, TVs',
      color: '#3498db'
    }
  ],

  statistics: {
    totalCollections: 156,
    completedCollections: 142,
    pendingCollections: 14,
    totalRevenue: 487500,
    monthlyRevenue: 125000,
    activeCustomers: 89,
    totalCustomers: 95,
    averageRating: 4.7,
    onTimeRate: 98.5
  }
};

export default sampleData;