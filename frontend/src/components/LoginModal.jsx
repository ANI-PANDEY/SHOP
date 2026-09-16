import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, ArrowRight, AlertCircle, Smartphone, Trash2, CheckCircle2 } from 'lucide-react';

const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, register, forgotPassword, resetAllAccounts } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [contactType, setContactType] = useState('phone'); // 'phone' | 'email'
  
  // Form fields
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');
    setLoading(true);

    try {
      if (isForgotMode) {
        await forgotPassword(emailOrPhone);
        setIsForgotMode(false);
      } else if (isRegistering) {
        await register(name || 'Customer', emailOrPhone, password, 'customer');
      } else {
        await login(emailOrPhone, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWipeAccounts = async () => {
    if (window.confirm('Are you sure you want to clear all old account details and start fresh?')) {
      await resetAllAccounts();
      setError('');
      setInfoMsg('All old accounts cleared! You can now register brand new accounts.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold">
            {isForgotMode ? 'Reset Password' : isRegistering ? 'Create New Account' : 'Welcome Back'}
          </h2>
          <p className="text-emerald-100 text-sm mt-1">
            {isForgotMode
              ? 'Reset your account password via SMS OTP'
              : isRegistering
              ? 'Register with your mobile number or email'
              : 'Sign in to access Grocery Point online store'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Tab buttons for Login / Register */}
          {!isForgotMode && (
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => { setIsRegistering(false); setError(''); setInfoMsg(''); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  !isRegistering
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setIsRegistering(true); setError(''); setInfoMsg(''); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  isRegistering
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Register
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 rounded-xl text-sm flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {infoMsg && (
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 p-3 rounded-xl text-sm font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{infoMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Contact Type Toggle */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Sign in using:</span>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={() => setContactType('phone')}
                  className={`font-semibold transition-colors ${contactType === 'phone' ? 'text-emerald-600 font-bold underline' : 'hover:text-slate-700'}`}
                >
                  📱 Mobile Phone
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setContactType('email')}
                  className={`font-semibold transition-colors ${contactType === 'email' ? 'text-emerald-600 font-bold underline' : 'hover:text-slate-700'}`}
                >
                  ✉️ Email
                </button>
              </div>
            </div>

            {/* Full Name for Registration */}
            {isRegistering && !isForgotMode && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Email / Phone Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {contactType === 'phone' ? 'Mobile Phone Number' : 'Email Address'}
              </label>
              <div className="relative">
                {contactType === 'phone' ? (
                  <Smartphone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                ) : (
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                )}
                <input
                  type={contactType === 'phone' ? 'tel' : 'email'}
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder={contactType === 'phone' ? 'e.g. 6203130623' : 'name@example.com'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Password Input */}
            {!isForgotMode && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                  {!isRegistering && (
                    <button
                      type="button"
                      onClick={() => { setIsForgotMode(true); setError(''); setInfoMsg(''); }}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Back Button for Forgot Mode */}
            {isForgotMode && (
              <button
                type="button"
                onClick={() => setIsForgotMode(false)}
                className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-center py-1"
              >
                ← Back to Login
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 disabled:opacity-50 cursor-pointer"
            >
              <span>
                {loading
                  ? 'Processing...'
                  : isForgotMode
                  ? 'Send Reset OTP 📱'
                  : isRegistering
                  ? 'Register & Send OTP 📱'
                  : 'Sign In to Store'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Clean Reset All Old Accounts Option */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={handleWipeAccounts}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 inline-flex items-center space-x-1 transition-colors"
            >
              <Trash2 size={13} />
              <span>Clear All Old Accounts & Start Fresh</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginModal;
