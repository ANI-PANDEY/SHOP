import { useState } from 'react';
import { Tag, MapPin, PhoneCall, X, Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-slate-900 text-white text-xs py-2.5 px-4 relative z-50 border-b border-amber-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Ticker Content */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-medium">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 p-1 rounded-full"><Sparkles size={12} /></span>
              <span className="font-bold text-amber-200">Pandey Store Wholesale & Retail</span>
              <span className="text-slate-300">— Direct Kirana Orders via WhatsApp</span>
            </div>
            <span className="text-amber-500/40">•</span>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 p-1 rounded-full"><Tag size={12} /></span>
              <span>Bulk Wholesale Combos & Festival Specials Available Now!</span>
            </div>
            <span className="text-amber-500/40">•</span>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 p-1 rounded-full"><MapPin size={12} /></span>
              <span>Gulzarbagh Station Road, Patna City 800007</span>
            </div>
            <span className="text-amber-500/40">•</span>

            {/* Duplicate for seamless infinite loop */}
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 p-1 rounded-full"><Sparkles size={12} /></span>
              <span className="font-bold text-amber-200">Pandey Store Wholesale & Retail</span>
              <span className="text-slate-300">— Direct Kirana Orders via WhatsApp</span>
            </div>
            <span className="text-amber-500/40">•</span>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 p-1 rounded-full"><Tag size={12} /></span>
              <span>Bulk Wholesale Combos & Festival Specials Available Now!</span>
            </div>
            <span className="text-amber-500/40">•</span>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 p-1 rounded-full"><MapPin size={12} /></span>
              <span>Gulzarbagh Station Road, Patna City 800007</span>
            </div>
          </div>
        </div>

        {/* Store Open Pill & WhatsApp Direct */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Store Open (7 AM - 10 PM)</span>
          </div>

          <a 
            href="https://wa.me/918877002297?text=Hi%20Pandey%20Store,%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-md shadow-emerald-950"
          >
            <PhoneCall size={11} />
            <span>Order via WhatsApp</span>
          </a>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white transition-colors shrink-0"
          aria-label="Close Announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
