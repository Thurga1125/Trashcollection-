import React from 'react';
import { Calendar, CreditCard, Trash2, Clock, CheckCircle } from 'lucide-react';

const Dashboard = ({ user, setCurrentPage, t }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{t.welcome}, {user?.fullName}!</h2>
        <p className="opacity-90">Manage your waste collection services efficiently</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Collection Schedule */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Next Collection</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-2">{user?.collectionSchedule.nextCollection}</p>
          <p className="text-gray-600">Regular: {user?.collectionSchedule.regularDay}</p>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold">Payment Due</h3>
          </div>
          <p className="text-2xl font-bold text-orange-600 mb-2">Rs. {user?.nextPayment.amount}</p>
          <p className="text-gray-600">Due in {user?.nextPayment.remainingDays} days</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <Trash2 className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setCurrentPage('payments')}
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              {t.payNow}
            </button>
            <button
              onClick={() => setCurrentPage('extraCollection')}
              className="w-full bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              {t.requestCollection}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {user?.extraCollections.map((collection) => (
            <div key={collection.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="font-medium">Extra collection completed</p>
                  <p className="text-sm text-gray-600">{collection.date} - {collection.trashAmount}</p>
                </div>
              </div>
              <span className="text-green-600 font-semibold">Rs. {collection.amount}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="font-medium">Monthly payment received</p>
                <p className="text-sm text-gray-600">{user?.lastPayment.date}</p>
              </div>
            </div>
            <span className="text-blue-600 font-semibold">Rs. {user?.lastPayment.amount}</span>
          </div>
        </div>
      </div>

      {/* User Information Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="font-medium">{user?.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">NIC</p>
            <p className="font-medium">{user?.nic}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium">
              {user?.address.houseNumber}, {user?.address.street}, {user?.address.city}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">District</p>
            <p className="font-medium">{user?.address.district}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">{user?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;