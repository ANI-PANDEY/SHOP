import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, X, AlertCircle, Lock, Smartphone, RefreshCw, CheckCircle2 } from 'lucide-react';

const VerificationModal = () => {
  const { isVerifyModalOpen, setIsVerifyModalOpen, pendingVerification, verifyOtp, resetPasswordWithOtp, resendOtp } = useAuth();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  // Reset local state & auto-fill suggested OTP when modal opens
  useEffect(() => {
    if (isVerifyModalOpen) {
      if (pendingVerification.suggestedOtp) {
        setOtp(pendingVerification.suggestedOtp);
      } else {
        setOtp('');
      }
      setError('');
      setSuccessMsg('');
    }
  }, [isVerifyModalOpen, pendingVerification.emailOrPhone, pendingVerification.suggestedOtp]);

  // Listen for 'autofill_otp' custom event from top notification banner
  useEffect(() => {
    const handleAutoFill = (e) => {
      if (e.detail) {
        setOtp(e.detail);
      }
    };
    window.addEventListener('autofill_otp', handleAutoFill);
    return () => window.removeEventListener('autofill_otp', handleAutoFill);
  }, []);

  // Countdown timer for Resend SMS OTP
  useEffect(() => {
    let interval = null;
    if (isVerifyModalOpen && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVerifyModalOpen, resendTimer]);

  if (!isVerifyModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (pendingVerification.isResetMode) {
        await resetPasswordWithOtp(pendingVerification.emailOrPhone, otp, newPassword);
        setSuccessMsg('Password reset successful! Logging you in...');
        setTimeout(() => {
          setIsVerifyModalOpen(false);
        }, 1200);
      } else {
        await verifyOtp(pendingVerification.emailOrPhone, otp);
        setSuccessMsg('Account verified successfully! Logging you in...');
        setTimeout(() => {
          setIsVerifyModalOpen(false);
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendSMS = async () => {
    setError('');
    setOtp('');
    setResendLoading(true);
    try {
      const data = await resendOtp(pendingVerification.emailOrPhone);
      if (data && data.verificationCode) {
        setOtp(data.verificationCode);
      }
      setSuccessMsg('A fresh verification code has been dispatched via SMS!');
      setResendTimer(30);
    } catch (err) {
      setError('Failed to resend SMS OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-800 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={() => setIsVerifyModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {pendingVerification.isResetMode ? 'Reset Password' : 'Verify Mobile Phone'}
              </h2>
              <p className="text-emerald-100 text-sm">
                {pendingVerification.isResetMode ? 'Enter SMS OTP & choose a new password' : 'Enter 6-digit verification code received via SMS'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* SMS Code Dispatched Box */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex items-start space-x-3">
            <Smartphone className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white text-sm block mb-1">
                SMS Code Dispatched 📱
              </span>
              We sent a 6-digit verification code via SMS to <strong className="text-emerald-400 font-semibold">{pendingVerification.emailOrPhone}</strong>. Check your phone's SMS inbox.
            </div>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-300 p-3 rounded-xl text-sm flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-200 p-3 rounded-xl text-sm font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2 text-center">
                ENTER 6-DIGIT SMS VERIFICATION CODE
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="w-full text-center text-3xl tracking-[0.6em] font-mono px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/90 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-white"
                required
              />
            </div>

            {pendingVerification.isResetMode && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6 || (pendingVerification.isResetMode && !newPassword)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all text-center text-base"
            >
              {loading ? 'Verifying SMS Code...' : pendingVerification.isResetMode ? 'Reset Password & Login' : 'Verify & Continue'}
            </button>
          </form>

          {/* Resend SMS OTP Button */}
          <div className="pt-2 text-center">
            {resendTimer > 0 ? (
              <span className="text-xs text-slate-400 font-medium">
                Didn't receive SMS? Resend OTP in <strong className="text-slate-200">{resendTimer}s</strong>
              </span>
            ) : (
              <button
                onClick={handleResendSMS}
                disabled={resendLoading}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center justify-center space-x-1 mx-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resendLoading ? 'animate-spin' : ''}`} />
                <span>Resend SMS OTP Code</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
