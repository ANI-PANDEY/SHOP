import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

const RECENT_ORDERS = [
  { name: 'Amit Sharma', location: 'Patna City', item: 'Farm-Fresh Alphonso Mangoes (1kg)', time: '2 mins ago' },
  { name: 'Priya Verma', location: 'Gulzarbagh', item: 'Restaurant-Style Paneer Kit', time: '5 mins ago' },
  { name: 'Rohan Kumar', location: 'Patna City', item: 'Fresh Sudha Milk 2L & Eggs', time: '7 mins ago' },
  { name: 'Sneha Singh', location: 'Kankarbagh', item: 'Organic Spices Combo', time: '12 mins ago' },
];

const SocialProofToast = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show toast initial delay
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % RECENT_ORDERS.length);
        setVisible(true);
      }, 1000);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const order = RECENT_ORDERS[currentIdx];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-none hidden sm:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto bg-slate-900/90 text-white backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-3"
          >
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 p-2.5 rounded-xl shrink-0">
              <ShoppingBag size={18} />
            </div>

            <div className="text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
                <span>{order.name}</span>
                <span className="text-slate-400 font-normal">({order.location})</span>
                <CheckCircle2 size={12} className="text-emerald-400 ml-auto" />
              </div>
              <p className="text-slate-300 font-medium truncate max-w-[200px]">
                Ordered: {order.item}
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold">{order.time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofToast;
