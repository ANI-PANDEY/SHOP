import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SMSPushNotification = () => {
  const { smsNotification, setSmsNotification } = useAuth();
  const [copied, setCopied] = React.useState(false);

  if (!smsNotification) return null;

  const handleCopyAndFill = () => {
    if (smsNotification.otp) {
      navigator.clipboard.writeText(smsNotification.otp);
      setCopied(true);

      // Dispatch global auto-fill event for VerificationModal
      window.dispatchEvent(new CustomEvent('autofill_otp', { detail: smsNotification.otp }));

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -80, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
      >
        <div className="bg-slate-900/95 text-white backdrop-blur-xl border border-slate-700/80 p-4 rounded-2xl shadow-2xl flex items-start space-x-3 relative">
          
          <button
            onClick={() => setSmsNotification(null)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X size={14} />
          </button>

          <div className="bg-emerald-500/20 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/30 flex-shrink-0 mt-0.5">
            <MessageSquare size={20} />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[11px] font-extrabold text-emerald-400 tracking-wider uppercase">
                MESSAGES • GROCERY POINT
              </span>
              <span className="text-[10px] text-slate-400">{smsNotification.timestamp || '11:03 AM'}</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3">
              Your SMS OTP code for mobile <strong className="text-white font-bold">{smsNotification.phone}</strong> is:{' '}
              <strong className="text-amber-300 font-mono tracking-widest text-sm bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
                {smsNotification.otp}
              </strong>
            </p>

            <button
              onClick={handleCopyAndFill}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copied & Auto-Filled!' : 'Tap to Copy Code'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SMSPushNotification;
