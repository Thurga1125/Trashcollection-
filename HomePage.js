import React, { useState } from 'react';
import { Trash2, User, Home, Calendar, CreditCard, Bell, MapPin } from 'lucide-react';

const HomePage = ({ language, setLanguage, onLogin, t }) => {
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    nic: '',
    houseNumber: '',
    street: '',
    city: '',
    district: '',
    phone: '',
    email: '',
    password: ''
  });

  const [loginForm, setLoginForm] = useState({
    fullName: '',
    password: ''
  });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Trash2 className="w-16 h-16 text-cyan-300 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">{t.title}</h1>
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded ${language === 'en' ? 'bg-cyan-500 text-white' : 'bg-white/20 text-white'}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('si')}
              className={`px-4 py-2 rounded ${language === 'si' ? 'bg-cyan-500 text-white' : 'bg-white/20 text-white'}`}
            >
              සිංහල
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Sign Up Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-2" />
              {t.signIn}
            </h2>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t.fullName}
                value={signUpForm.fullName}
                onChange={(e) => setSignUpForm({...signUpForm, fullName: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                required
              />
              <input
                type="text"
                placeholder={t.nic}
                value={signUpForm.nic}
                onChange={(e) => setSignUpForm({...signUpForm, nic: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.houseNumber}
                  value={signUpForm.houseNumber}
                  onChange={(e) => setSignUpForm({...signUpForm, houseNumber: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                  required
                />
                <input
                  type="text"
                  placeholder={t.street}
                  value={signUpForm.street}
                  onChange={(e) => setSignUpForm({...signUpForm, street: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.city}
                  value={signUpForm.city}
                  onChange={(e) => setSignUpForm({...signUpForm, city: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                  required
                />
                <select 
                  value={signUpForm.district}
                  onChange={(e) => setSignUpForm({...signUpForm, district: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white"
                  required
                >
                  <option value="">{t.district}</option>
                  <option value="colombo">Colombo</option>
                  <option value="gampaha">Gampaha</option>
                  <option value="kalutara">Kalutara</option>
                  <option value="kandy">Kandy</option>
                  <option value="matale">Matale</option>
                  <option value="nuwara-eliya">Nuwara Eliya</option>
                  <option value="galle">Galle</option>
                  <option value="matara">Matara</option>
                  <option value="hambantota">Hambantota</option>
                </select>
              </div>
              <input
                type="tel"
                placeholder={t.phone}
                value={signUpForm.phone}
                onChange={(e) => setSignUpForm({...signUpForm, phone: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                required
              />
              <input
                type="email"
                placeholder={t.email}
                value={signUpForm.email}
                onChange={(e) => setSignUpForm({...signUpForm, email: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                required
              />
              <input
                type="password"
                placeholder={t.password}
                value={signUpForm.password}
                onChange={(e) => setSignUpForm({...signUpForm, password: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                {t.submit}
              </button>
            </form>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Home className="w-6 h-6 mr-2" />
              {t.login}
            </h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t.fullName}
                value={loginForm.fullName}
                onChange={(e) => setLoginForm({...loginForm, fullName: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                required
              />
              <input
                type="password"
                placeholder={t.password}
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
              >
                {t.submit}
              </button>
            </form>

            {/* Features Preview */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-white">Features:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Tracking
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Online Payments
                </div>
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  SMS & Email Alerts
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location Services
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;