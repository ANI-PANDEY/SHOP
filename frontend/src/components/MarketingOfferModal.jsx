import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, X, Check, Copy, PartyPopper, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PRIZES = [
  { code: 'PATNA20', label: '20% OFF', desc: '20% OFF (Up to ₹150)', color: '#10b981', textColor: '#ffffff' },
  { code: 'FREEDEL', label: 'FREE DEL', desc: 'FREE Express Delivery', color: '#f59e0b', textColor: '#0f172a' },
  { code: 'CASH100', label: '₹100 OFF', desc: 'Flat ₹100 Discount', color: '#6366f1', textColor: '#ffffff' },
  { code: 'FRUIT15', label: '15% FRUIT', desc: '15% OFF Fruits & Veggies', color: '#ec4899', textColor: '#ffffff' },
  { code: 'SPECIAL5', label: 'EXTRA 5%', desc: 'Extra 5% OFF Order', color: '#06b6d4', textColor: '#0f172a' },
  { code: 'SUPER50', label: '₹50 OFF', desc: '₹50 OFF on ₹300+', color: '#8b5cf6', textColor: '#ffffff' },
];

const MarketingOfferModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [copied, setCopied] = useState(false);

  const numSlices = PRIZES.length;
  const sliceAngle = 360 / numSlices;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonPrize(null);
    setCopied(false);

    // Random target slice (0 to 5)
    const targetIdx = Math.floor(Math.random() * numSlices);
    
    // Slice center relative to top: targetIdx * sliceAngle + sliceAngle / 2
    const targetCenter = targetIdx * sliceAngle + sliceAngle / 2;
    // Clockwise degrees needed to bring target center to top (0 deg)
    const offsetToTop = (360 - targetCenter) % 360;

    // Add 5 full rotations (1800 deg) for dramatic spin
    const nextRotation = rotation + 1800 + offsetToTop + (360 - (rotation % 360));

    setRotation(nextRotation);

    // Announce winner after spin completes
    setTimeout(() => {
      setSpinning(false);
      setWonPrize(PRIZES[targetIdx]);
    }, 4000);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
          >
            <X size={20} />
          </button>

          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center relative z-10 space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold tracking-wide">
              <Sparkles size={14} className="text-amber-400 animate-spin" />
              <span>SUPERSTORE REWARD WHEEL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t('spinTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('spinSub')}
            </p>
          </div>

          {/* Wheel Showcase Container */}
          <div className="relative z-10 flex flex-col items-center justify-center my-4">
            
            {/* Top Pointer Arrow */}
            <div className="absolute -top-3 z-30 flex flex-col items-center drop-shadow-xl">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400" />
            </div>

            {/* Outer Rim Frame with LED Bulbs effect */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-amber-400/90 p-2 shadow-2xl bg-slate-950 relative flex items-center justify-center glow-box-amber">
              
              {/* Rotating SVG Wheel */}
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: [0.12, 0.8, 0.15, 1] }}
                className="w-full h-full rounded-full overflow-hidden shadow-inner"
              >
                <svg viewBox="0 0 300 300" className="w-full h-full transform -rotate-90">
                  {PRIZES.map((prize, idx) => {
                    const startAngle = idx * sliceAngle;
                    const endAngle = (idx + 1) * sliceAngle;
                    
                    const radStart = (startAngle * Math.PI) / 180;
                    const radEnd = (endAngle * Math.PI) / 180;

                    const x1 = 150 + 150 * Math.cos(radStart);
                    const y1 = 150 + 150 * Math.sin(radStart);
                    const x2 = 150 + 150 * Math.cos(radEnd);
                    const y2 = 150 + 150 * Math.sin(radEnd);

                    const pathData = `M 150 150 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`;

                    // Text orientation
                    const midAngle = startAngle + sliceAngle / 2;
                    const radMid = (midAngle * Math.PI) / 180;
                    const textX = 150 + 95 * Math.cos(radMid);
                    const textY = 150 + 95 * Math.sin(radMid);

                    return (
                      <g key={idx}>
                        <path
                          d={pathData}
                          fill={prize.color}
                          stroke="#0f172a"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill={prize.textColor}
                          fontSize="13"
                          fontWeight="900"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                        >
                          {prize.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>

              {/* Center Hub SPIN Button */}
              <button
                onClick={handleSpin}
                disabled={spinning}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base flex flex-col items-center justify-center shadow-2xl border-4 border-slate-900 transition-all transform active:scale-95 disabled:opacity-85 cursor-pointer z-20"
              >
                <Gift size={20} className="mb-0.5" />
                <span>{spinning ? '...' : 'SPIN!'}</span>
              </button>
            </div>
          </div>

          {/* Winner Result Card */}
          <AnimatePresence>
            {wonPrize && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-emerald-950/90 border border-emerald-500/50 rounded-2xl p-4 text-center relative z-10 mt-4 backdrop-blur-md shadow-2xl space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-amber-300 font-black text-lg">
                  <PartyPopper size={22} className="animate-bounce" />
                  <span>YOU WON!</span>
                </div>
                <p className="text-white font-extrabold text-sm">{wonPrize.desc}</p>

                <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-white/10 max-w-sm mx-auto">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Coupon Code</span>
                    <code className="text-emerald-400 font-mono font-black text-base tracking-wider">
                      {wonPrize.code}
                    </code>
                  </div>

                  <button
                    onClick={() => handleCopy(wonPrize.code)}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-md active:scale-95"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="pt-1">
                  <button
                    onClick={handleSpin}
                    disabled={spinning}
                    className="text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                  >
                    <RefreshCw size={12} />
                    <span>Spin Again for another chance</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MarketingOfferModal;
