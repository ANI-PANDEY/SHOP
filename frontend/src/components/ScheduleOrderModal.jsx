import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, X, CheckCircle } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const DATES = [
  { label: 'Today', sub: 'Aug 04' },
  { label: 'Tomorrow', sub: 'Aug 05' },
  { label: 'Day After', sub: 'Aug 06' }
];

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning Slot', time: '08:00 AM - 11:00 AM', desc: 'Best for fresh breakfast & milk' },
  { id: 'afternoon', label: 'Afternoon Slot', time: '01:00 PM - 04:00 PM', desc: 'Ideal for lunch prep' },
  { id: 'evening', label: 'Evening Slot', time: '06:00 PM - 09:00 PM', desc: 'Fresh dinner & snacks arrival' }
];

const ScheduleOrderModal = ({ isOpen, onClose }) => {
  const { setDeliveryType, setSchedule, scheduledDate, scheduledSlot } = useCartStore();
  
  const [selectedDate, setSelectedDate] = useState(scheduledDate || 'Today (Aug 04)');
  const [selectedSlot, setSelectedSlot] = useState(scheduledSlot || 'Morning (08:00 AM - 11:00 AM)');

  const handleConfirm = () => {
    setDeliveryType('Scheduled Delivery');
    setSchedule(selectedDate, selectedSlot);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden text-slate-900"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-slate-900">Schedule Delivery Slot</h3>
              <p className="text-xs text-slate-500">Pick when you want your groceries delivered to your door.</p>
            </div>
          </div>

          {/* Date Selector */}
          <div className="space-y-3 mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">1. Select Delivery Date</label>
            <div className="grid grid-cols-3 gap-3">
              {DATES.map((d) => {
                const fullStr = `${d.label} (${d.sub})`;
                const isSelected = selectedDate === fullStr;
                return (
                  <button
                    key={d.label}
                    onClick={() => setSelectedDate(fullStr)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-extrabold text-sm">{d.label}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{d.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div className="space-y-3 mb-8">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">2. Select Preferred Time Slot</label>
            <div className="space-y-2.5">
              {TIME_SLOTS.map((slot) => {
                const slotStr = `${slot.label} (${slot.time})`;
                const isSelected = selectedSlot === slotStr;
                return (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slotStr)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 shadow-md'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={20} className={isSelected ? 'text-emerald-600' : 'text-slate-400'} />
                      <div>
                        <p className="font-extrabold text-sm">{slot.label} — {slot.time}</p>
                        <p className="text-xs text-slate-500">{slot.desc}</p>
                      </div>
                    </div>

                    {isSelected && <CheckCircle size={20} className="text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-extrabold py-4 rounded-2xl transition-all shadow-xl text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            <span>Confirm Delivery Slot</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScheduleOrderModal;
