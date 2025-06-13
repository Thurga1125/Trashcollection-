import React from 'react';
import { CreditCard, Phone, DollarSign } from 'lucide-react';

const PaymentsPage = ({ user, showNotificationMessage, t }) => {
  const handlePayment = () => {
    showNotificationMessage('Payment successful! SMS and email confirmations have been sent.');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.payments}</h2>
      
      {/* Outstanding Payment */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Outstanding Payment</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-orange-100 mb-2">Amount Due</p>
            <p className="text-3xl font-bold">Rs. {user?.nextPayment.amount}</p>
            <p className="text-orange-100 mt-2">Due Date: {user?.nextPayment.dueDate}</p>
          </div>
          <div className="flex items-end justify-end">
            <button
              onClick={handlePayment}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 cursor-pointer transition-colors">
            <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Credit/Debit Card</p>
            <p className="text-sm text-gray-600 mt-1">Visa, MasterCard, Amex</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 cursor-pointer transition-colors">
            <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium">Mobile Banking</p>
            <p className="text-sm text-gray-600 mt-1">Dialog, Mobitel, Hutch</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 cursor-pointer transition-colors">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-medium">LankaQR</p>
            <p className="text-sm text-gray-600 mt-1">Scan & Pay</p>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">{t.paymentHistory}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Type</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3">2024-11-20</td>
                <td className="py-3">Extra Collection</td>
                <td className="py-3">Rs. 800</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Paid</span>
                </td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3">2024-11-15</td>
                <td className="py-3">Monthly Fee</td>
                <td className="py-3">Rs. 2,500</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Paid</span>
                </td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3">2024-10-15</td>
                <td className="py-3">Monthly Fee</td>
                <td className="py-3">Rs. 2,500</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Paid</span>
                </td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
          <h4 className="font-semibold mb-2">This Month</h4>
          <p className="text-2xl font-bold text-blue-600">Rs. 2,500</p>
          <p className="text-sm text-gray-600">Regular payment</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
          <h4 className="font-semibold mb-2">Extra Services</h4>
          <p className="text-2xl font-bold text-green-600">Rs. 800</p>
          <p className="text-sm text-gray-600">Additional collections</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
          <h4 className="font-semibold mb-2">Total Paid</h4>
          <p className="text-2xl font-bold text-purple-600">Rs. 3,300</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;