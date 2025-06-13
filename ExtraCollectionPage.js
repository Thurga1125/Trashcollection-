import React, { useState } from 'react';
import { Package, MapPin, Clock, Trash2 } from 'lucide-react';

const ExtraCollectionPage = ({ setCurrentPage, t }) => {
  const [collectionForm, setCollectionForm] = useState({
    location: '',
    date: '',
    time: '',
    trashAmount: '',
    trashType: '',
    additionalInfo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage('extraPayment');
  };

  const calculateEstimatedCost = () => {
    switch (collectionForm.trashAmount) {
      case '1-2-bags':
        return 'Rs. 500';
      case '3-5-bags':
        return 'Rs. 800';
      case '6-10-bags':
        return 'Rs. 1,200';
      case 'bulk':
        return 'Rs. 1,500+';
      default:
        return 'Rs. 800 - Rs. 1,200';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.extraCollection}</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Request Extra Collection</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Collection Location
              </label>
              <select
                value={collectionForm.location}
                onChange={(e) => setCollectionForm({...collectionForm, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select location</option>
                <option value="front-gate">Front Gate</option>
                <option value="back-yard">Back Yard</option>
                <option value="side-entrance">Side Entrance</option>
                <option value="garage">Garage Area</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Preferred Date
              </label>
              <input
                type="date"
                value={collectionForm.date}
                onChange={(e) => setCollectionForm({...collectionForm, date: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
              <select
                value={collectionForm.time}
                onChange={(e) => setCollectionForm({...collectionForm, time: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select time</option>
                <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="evening">Evening (4:00 PM - 6:00 PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Approximate Amount</label>
              <select
                value={collectionForm.trashAmount}
                onChange={(e) => setCollectionForm({...collectionForm, trashAmount: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select amount</option>
                <option value="1-2-bags">1-2 bags</option>
                <option value="3-5-bags">3-5 bags</option>
                <option value="6-10-bags">6-10 bags</option>
                <option value="bulk">Bulk collection</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type of Waste</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['General', 'Organic', 'Recyclable', 'Garden Waste'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCollectionForm({...collectionForm, trashType: collectionForm.trashType + type + ', '});
                      }
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
            <textarea
              value={collectionForm.additionalInfo}
              onChange={(e) => setCollectionForm({...collectionForm, additionalInfo: e.target.value})}
              placeholder="Any special instructions or additional details..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Estimated Cost</h4>
            <p className="text-blue-700">
              Based on your selection: <span className="font-bold">{calculateEstimatedCost()}</span>
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Final cost will be determined based on actual amount collected
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Pricing Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Pricing Information</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold">1-2 Bags</p>
            <p className="text-blue-600 font-bold">Rs. 500</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-semibold">3-5 Bags</p>
            <p className="text-green-600 font-bold">Rs. 800</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="font-semibold">6-10 Bags</p>
            <p className="text-orange-600 font-bold">Rs. 1,200</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="font-semibold">Bulk</p>
            <p className="text-red-600 font-bold">Rs. 1,500+</p>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Collection Guidelines</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Please separate organic and non-organic waste
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Ensure bags are securely tied and not overweight
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Place collection at specified location 30 minutes before scheduled time
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Hazardous materials require special handling (additional charges apply)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExtraCollectionPage;