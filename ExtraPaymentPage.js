import React, { useState } from 'react';
import { CreditCard, Phone, DollarSign, QrCode, CheckCircle } from 'lucide-react';

const ExtraPaymentPage = ({ showNotificationMessage, setCurrentPage, t }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    mobileNumber: ''
  });

  const handlePayment = (e) => {
    e.preventDefault();
    showNotificationMessage('Payment successful! Extra collection scheduled. SMS and email confirmations sent to your registered contact details.');
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Extra Collection Payment</h2>
      
      {/* Order Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
          <div className="flex justify-between">
            <span>Extra collection service</span>
            <span>Rs. 800</span>
          </div>
          <div className="flex justify-between">
            <span>Service charge</span>
            <span>Rs. 50</span>
          </div>
          <div className="flex justify-between">
            <span>Platform fee</span>
            <span>Rs. 25</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>Rs. 875</span>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-green-800 text-sm">
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Collection scheduled for tomorrow between 2:00 PM - 4:00 PM
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <label className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPaymentMethod === 'card'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="sr-only"
            />
            <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-center font-medium">Card Payment</p>
            <p className="text-center text-xs text-gray-600">Visa, MasterCard</p>
          </label>

          <label className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPaymentMethod === 'mobile' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
            <input
              type="radio"
              name="payment"
              value="mobile"
              checked={selectedPaymentMethod === 'mobile'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="sr-only"
            />
            <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-center font-medium">Mobile Banking</p>
            <p className="text-center text-xs text-gray-600">Dialog, Mobitel</p>
          </label>

          <label className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPaymentMethod === 'lankaQR' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
            <input
              type="radio"
              name="payment"
              value="lankaQR"
              checked={selectedPaymentMethod === 'lankaQR'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="sr-only"
            />
            <QrCode className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-center font-medium">LankaQR</p>
            <p className="text-center text-xs text-gray-600">Scan & Pay</p>
          </label>

          <label className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPaymentMethod === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={selectedPaymentMethod === 'bank'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="sr-only"
            />
            <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-center font-medium">Bank Transfer</p>
            <p className="text-center text-xs text-gray-600">Online Banking</p>
          </label>
        </div>

        {/* Payment Forms */}
        <form onSubmit={handlePayment}>
          {selectedPaymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentForm.cardNumber}
                  onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentForm.expiryDate}
                    onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentForm.cvv}
                    onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={paymentForm.cardName}
                  onChange={(e) => setPaymentForm({...paymentForm, cardName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {selectedPaymentMethod === 'mobile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="077 123 4567"
                  value={paymentForm.mobileNumber}
                  onChange={(e) => setPaymentForm({...paymentForm, mobileNumber: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  You will receive an SMS with payment instructions on your mobile number.
                </p>
              </div>
            </div>
          )}

          {selectedPaymentMethod === 'lankaQR' && (
            <div className="text-center py-8">
              <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-gray-600">Scan this QR code with your banking app</p>
              <p className="text-sm text-gray-500 mt-2">Amount: Rs. 875</p>
            </div>
          )}

          {selectedPaymentMethod === 'bank' && (
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Bank Transfer Details</h4>
                <div className="text-sm text-orange-700 space-y-1">
                  <p><strong>Bank:</strong> Bank of Ceylon</p>
                  <p><strong>Account Name:</strong> Municipal Council Waste Management</p>
                  <p><strong>Account Number:</strong> 12345678901</p>
                  <p><strong>Branch:</strong> Colombo Main</p>
                  <p><strong>Reference:</strong> Use your NIC number</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Reference</label>
                <input
                  type="text"
                  placeholder="Enter transaction reference number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setCurrentPage('extraCollection')}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!selectedPaymentMethod}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Payment
            </button>
          </div>
        </form>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <CheckCircle className="w-4 h-4 inline mr-1" />
          Your payment is secured with 256-bit SSL encryption. We do not store your payment information.
        </p>
      </div>
    </div>
  );
};

export default ExtraPaymentPage;