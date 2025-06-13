import React, { useState } from 'react';
import { Home, CreditCard, Trash2, Bell, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ user, currentPage, setCurrentPage, onLogout, language, setLanguage, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'payments', label: t.payments, icon: CreditCard },
    { id: 'extraCollection', label: t.extraCollection, icon: Trash2 },
    { id: 'notifications', label: t.notifications, icon: Bell }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Trash2 className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-800">WasteMS</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs rounded ${
                  language === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('si')}
                className={`px-2 py-1 text-xs rounded ${
                  language === 'si' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                සි
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">{user?.fullName}</p>
                <p className="text-gray-500 text-xs">{user?.address?.city}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile User Info */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user?.fullName}</p>
                  <p className="text-gray-500 text-sm">{user?.address?.city}</p>
                </div>
              </div>

              {/* Language Toggle Mobile */}
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-sm rounded ${
                    language === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('si')}
                  className={`px-3 py-1 text-sm rounded ${
                    language === 'si' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  සිංහල
                </button>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;