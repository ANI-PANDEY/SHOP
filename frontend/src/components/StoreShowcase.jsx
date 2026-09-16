import { MapPin, Navigation, PhoneCall, Clock, Store, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const STORE_HIGHLIGHTS = [
  { icon: Sparkles, title: 'Wholesale Rates', desc: 'Direct farm-to-store savings' },
  { icon: ShieldCheck, title: '100% Organic', desc: 'Certified fresh produce daily' },
  { icon: Clock, title: '15-Min Express', desc: 'Fastest doorstep fulfillment' },
  { icon: Store, title: 'Offline Superstore', desc: 'Visit us in Patna City anytime' },
];

const StoreShowcase = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-emerald-500/30">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text & Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Store size={16} className="text-emerald-400" />
              <span>OFFLINE MEGA SUPERSTORE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {t('storeShowcaseTitle')}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              {t('storeShowcaseSub')}
            </p>

            {/* Address Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-start gap-3 text-left">
                <div className="bg-emerald-500 text-slate-900 p-2.5 rounded-xl shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Grocery Point Mega Superstore</h4>
                  <p className="text-slate-300 text-sm">{t('storeAddress')}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-semibold">
                  <Clock size={14} />
                  <span>{t('storeHours')}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-300 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>4.9★ (2,400+ Local Reviews)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="https://maps.google.com/?q=Gulzarbagh+station+road+Patna+City+800007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/30 text-sm"
              >
                <Navigation size={18} />
                <span>{t('getDirections')}</span>
              </a>

              <a
                href="https://wa.me/918877002297?text=Hi!%20I%20want%20to%20place%20an%20order%20at%20Grocery%20Point%20Patna%20City."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3.5 rounded-2xl transition-all shadow-lg text-sm"
              >
                <PhoneCall size={18} className="text-white" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Images & Highlight Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58"
                alt="Grocery Point Physical Store"
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-3">
                  {STORE_HIGHLIGHTS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-0.5">
                          <Icon size={14} />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreShowcase;
