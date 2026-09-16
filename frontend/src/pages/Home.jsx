import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Truck, 
  PackageCheck,
  ChevronRight,
  ExternalLink,
  Percent,
  FileText,
  Send,
  Home as HomeIcon,
  Camera,
  Mic,
  Image,
  BadgePercent
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PATNA_LOCALITIES = [
  { nameEn: 'Gulzarbagh', nameHi: 'गुलज़ारबाग' },
  { nameEn: 'Patna City Chowk', nameHi: 'पटना सिटी चौक' },
  { nameEn: 'Kankarbagh', nameHi: 'कंकड़बाग' },
  { nameEn: 'Begumganj', nameHi: 'बेगमगंज' },
  { nameEn: 'Jhauganj', nameHi: 'झाऊगंज' },
  { nameEn: 'Marufganj', nameHi: 'मारूफगंज' },
  { nameEn: 'Meena Bazaar', nameHi: 'मीना बाज़ार' },
  { nameEn: 'Sadikpur', nameHi: 'सादिकपुर' },
  { nameEn: 'Ranipur', nameHi: 'रानीपुर' },
  { nameEn: 'Simli', nameHi: 'सिमली' }
];

const STORE_PHOTOS = [
  {
    titleEn: 'Pandey Store Main Counter & Stock',
    titleHi: 'पांडे स्टोर मुख्य काउंटर और स्टॉक',
    subEn: 'Fresh Pramod Raita Boondi, Laxmi Namkeen & Packaged Dry Fruits',
    subHi: 'ताज़ा प्रमोद रायता बूंदी, लक्ष्मी नमकीन और पैकेज्ड ड्राई फ्रूट्स',
    src: '/store-photos/counter_snacks.jpg'
  },
  {
    titleEn: 'Pandey Store Interior & Glass Cabinets',
    titleHi: 'पांडे स्टोर इंटीरियर और ग्लास कैबिनेट्स',
    subEn: 'Complete range of everyday kirana staples & branded groceries',
    subHi: 'दैनिक किराना सामान और ब्रांडेड ग्रोसरी की पूरी रेंज',
    src: '/store-photos/store_interior.jpg'
  },
  {
    titleEn: 'Beverage Cooler & Shelf Display',
    titleHi: 'बेवरेज कूलर और शेल्फ डिस्प्ले',
    subEn: 'Voltas beverage fridge, Cadbury chocolates & daily essentials',
    subHi: 'वोल्टास बेवरेज फ्रिज, कैडबरी चॉकलेट्स और दैनिक उपयोग का सामान',
    src: '/store-photos/store_fridge_shelves.jpg'
  },
  {
    titleEn: 'Packed Sweets & Health Drinks Counter',
    titleHi: 'पैक्ड मिठाई और हेल्थ ड्रिंक्स काउंटर',
    subEn: 'Bikaji Elaichi Soan Papdi, NutriChoice & Glucon-D stock',
    subHi: 'बीकाजी इलायची सोहन पापड़ी, न्यूट्रीचॉइस और ग्लूकॉन-डी स्टॉक',
    src: '/store-photos/glass_display_counter.jpg'
  }
];

const FESTIVAL_DEALS = [
  {
    _id: 'fest-1',
    name: 'Sudha Pure Cow Ghee 1L Tin + Fortune Mustard Oil 1L Combo',
    retailPrice: 785,
    wholesalePrice: 699,
    discount: 'SAVE ₹86',
    tag: 'FESTIVAL SPECIAL',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80',
    unit: 'Combo Pack (1L + 1L)'
  },
  {
    _id: 'fest-2',
    name: 'Premium Dry Fruit Festive Gift Pack (Badam + Kaju + Khajur)',
    retailPrice: 2150,
    wholesalePrice: 1790,
    discount: '17% OFF',
    tag: 'FESTIVAL COMBO',
    image: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=800&q=80',
    unit: '1.5kg Total Pack'
  },
  {
    _id: 'fest-3',
    name: 'Everest Complete Puja & Kitchen Masala Kit (10 Pouches)',
    retailPrice: 450,
    wholesalePrice: 380,
    discount: 'SAVE ₹70',
    tag: 'WHOLESALE BUNDLE',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    unit: 'Complete Box'
  },
  {
    _id: 'fest-4',
    name: 'Bulk Fortune Arhar Dal (10kg Bag) Wholesale Rate',
    retailPrice: 1650,
    wholesalePrice: 1420,
    discount: 'BULK RATE',
    tag: 'WHOLESALE SAVER',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
    unit: '10kg Sack'
  }
];

const FEATURED_CATEGORIES = [
  { id: 'staples', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80' },
  { id: 'dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&q=80' },
  { id: 'snacks', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80' },
  { id: 'drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80' },
  { id: 'household', image: 'https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?w=600&q=80' },
  { id: 'personal-care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80' }
];

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: 'Rakesh Kumar',
    location: 'Chowk, Patna City',
    rating: 5,
    date: 'Verified Buyer',
    textEn: 'Pandey Store has been our family’s go-to kirana shop for over 15 years. Sending list on WhatsApp and getting doorstep delivery in Patna City is super fast!',
    textHi: 'पांडे स्टोर 15 साल से हमारे परिवार की पसंदीदा किराना दुकान है। व्हाट्सएप पर सामान की लिस्ट भेजकर पटना सिटी में डिलीवरी पाना बहुत आसान और तेज़ है!'
  },
  {
    id: 2,
    name: 'Anita Sharma',
    location: 'Gulzarbagh, Patna',
    rating: 5,
    date: 'Verified Buyer',
    textEn: 'I uploaded our festive dry fruit list via WhatsApp. Received exact items at home with genuine quality and fair wholesale prices.',
    textHi: 'मैंने व्हाट्सएप पर अपने ड्राई फ्रूट्स की लिस्ट भेजी। थोक कीमतों पर बिल्कुल सही सामान सीधे घर पर मिला।'
  },
  {
    id: 3,
    name: 'Sunil Prasad',
    location: 'Kankarbagh, Patna',
    rating: 5,
    date: 'Wholesale Client',
    textEn: 'We buy monthly bulk ration for our shop from Pandey Store. Genuine rates and polite service in Patna City.',
    textHi: 'हम अपनी दुकान के लिए हर महीने थोक राशन लेते हैं। पटना सिटी में सही रेट और बेहतरीन सेवा मिलती है।'
  }
];

const Home = () => {
  const { t, language } = useLanguage();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  return (
    <div className="animate-page-entry min-h-screen space-y-12 sm:space-y-16 pb-20">
      
      {/* Patna City Serving Announcement Banner */}
      <div className="bg-amber-500 text-slate-950 py-2.5 px-4 text-center font-black text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2">
        <MapPin size={16} className="shrink-0" />
        <span>{t('patnaCityBannerText')}</span>
      </div>

      {/* 1. HERO SECTION WITH AUTHENTIC PANDEY STORE PHOTO */}
      <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 border-b border-slate-500/20">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            
            {/* Left Content Column */}
            <div className="w-full lg:w-7/12 space-y-6 sm:space-y-7 animate-hero-reveal text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold tracking-wide">
                <Sparkles size={14} className="text-amber-500" />
                <span>{t('heroBadge')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                {t('heroTitle')} <br className="hidden sm:block" />
                <span className="gradient-gold-text">{t('heroTitleGold')}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base leading-relaxed opacity-90 font-normal max-w-2xl mx-auto lg:mx-0">
                {t('heroSubtitle')}
              </p>

              {/* 3 EASY STEPS TO ORDER VIA WHATSAPP BOX */}
              <div className="card-theme p-4 sm:p-5 space-y-3 text-left">
                <h3 className="font-bold text-xs text-amber-500 uppercase tracking-wider flex items-center gap-2">
                  <Send size={15} />
                  <span>{t('easyStepsTitle')}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl border border-slate-500/20 bg-slate-500/5 space-y-1">
                    <p className="font-bold text-amber-500 flex items-center gap-1.5">
                      <FileText size={14} /> {t('step1Title')}
                    </p>
                    <p className="text-[11px] opacity-75 leading-snug">{t('step1Desc')}</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-500/20 bg-slate-500/5 space-y-1">
                    <p className="font-bold text-amber-500 flex items-center gap-1.5">
                      <Send size={14} /> {t('step2Title')}
                    </p>
                    <p className="text-[11px] opacity-75 leading-snug">{t('step2Desc')}</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-500/20 bg-slate-500/5 space-y-1">
                    <p className="font-bold text-emerald-500 flex items-center gap-1.5">
                      <HomeIcon size={14} /> {t('step3Title')}
                    </p>
                    <p className="text-[11px] opacity-75 leading-snug">{t('step3Desc')}</p>
                  </div>
                </div>
              </div>

              {/* Value Points */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-[11px] sm:text-xs font-medium">
                <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl border border-slate-500/20 bg-slate-500/5">
                  <CheckCircle2 size={15} className="text-amber-500 shrink-0" />
                  <span className="truncate">{t('wholesaleRates')}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl border border-slate-500/20 bg-slate-500/5">
                  <ShieldCheck size={15} className="text-amber-500 shrink-0" />
                  <span className="truncate">{t('genuineProducts')}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl border border-slate-500/20 bg-slate-500/5">
                  <Truck size={15} className="text-amber-500 shrink-0" />
                  <span className="truncate">{t('fastLocalDelivery')}</span>
                </div>
              </div>

              {/* Hero Call To Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 justify-center lg:justify-start">
                <a
                  href={`https://wa.me/918877002297?text=${encodeURIComponent(language === 'hi' ? 'नमस्ते पांडे स्टोर, मैं अपना सामान का लिस्ट भेजना चाहता/चाहती हूँ।' : 'Hi Pandey Store, I want to send my product list for order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full sm:w-auto py-3.5 px-6 sm:py-4 sm:px-8 text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl"
                >
                  <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
                  </svg>
                  <span>{t('sendListWhatsApp')}</span>
                  <ChevronRight size={18} />
                </a>

                <a
                  href="tel:+918877002297"
                  className="w-full sm:w-auto border border-slate-500/30 hover:border-amber-500/50 bg-slate-500/10 font-bold text-xs py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall size={16} className="text-amber-500" />
                  <span>{t('callStoreBtn')}</span>
                </a>
              </div>

            </div>

            {/* Right Card / Authentic Store Image Showcase */}
            <div className="w-full lg:w-5/12">
              <div className="card-theme p-4 sm:p-6 space-y-4 sm:space-y-6">
                
                <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 border border-slate-500/20">
                  <img 
                    src="/store-photos/store_interior.jpg" 
                    alt="Pandey Store Authentic Shop Interior Patna City" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                    <div>
                      <p className="text-xs text-amber-400 font-bold">REAL PANDEY STORE PHOTO</p>
                      <p className="font-extrabold text-xs sm:text-sm text-white">Gulzarbagh Station Road, Patna City</p>
                    </div>
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-1 rounded-full">
                      WHOLESALE
                    </span>
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold">
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span>STORE OPEN NOW</span>
                    </span>
                    <span className="text-[11px] opacity-90">{t('storeStatusOpen')}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-500/20 bg-slate-500/5">
                    <span className="opacity-80 font-medium">{t('storeHoursLabel')}</span>
                    <span className="text-amber-500 font-bold flex items-center gap-1">
                      <Clock size={14} /> {t('storeHoursVal')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-500/20 bg-slate-500/5">
                    <span className="opacity-80 font-medium">{t('paymentModeLabel')}</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <PackageCheck size={14} /> {t('paymentModeVal')}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW FEATURE 1: PAPER LIST PHOTO & VOICE NOTE EXPRESS ORDER CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-theme p-6 sm:p-8 relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-slate-950">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-black tracking-wider uppercase border border-amber-500/40">
                <Sparkles size={14} />
                <span>{t('paperListBadge')}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight">
                {t('paperListTitle')} <br className="hidden sm:block" />
                <span className="gradient-gold-text">{t('paperListTitleGold')}</span>
              </h2>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                {t('paperListDesc')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <a
                href={`https://wa.me/918877002297?text=${encodeURIComponent(language === 'hi' ? 'नमस्ते पांडे स्टोर, मैं अपने कागज़ पर लिखी राशन लिस्ट की फोटो भेज रहा/रही हूँ।' : 'Hi Pandey Store, I am sending a photo of my handwritten grocery list.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp py-3.5 px-5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Camera size={18} />
                <span>{t('sendPhotoBtn')}</span>
              </a>

              <a
                href={`https://wa.me/918877002297?text=${encodeURIComponent(language === 'hi' ? 'नमस्ते पांडे स्टोर, मैं अपने ऑर्डर का वॉइस नोट भेज रहा/रही हूँ।' : 'Hi Pandey Store, I am sending a voice note for my grocery order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all border border-emerald-400/30 hover:scale-105"
              >
                <Mic size={18} />
                <span>{t('sendVoiceBtn')}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* NEW FEATURE 2: PATNA CITY DELIVERY LOCALITY COVERAGE BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-500/20 pb-3 gap-2">
          <div>
            <p className="text-xs font-bold text-amber-500 tracking-wider uppercase flex items-center gap-1.5 mb-0.5">
              <MapPin size={14} />
              <span>{t('deliveryLocBadge')}</span>
            </p>
            <h3 className="text-lg sm:text-2xl font-black">
              {t('deliveryLocTitle')} <span className="gradient-gold-text">{t('deliveryLocTitleGold')}</span>
            </h3>
          </div>
          <p className="text-xs opacity-75 sm:text-right">
            {t('deliveryLocSub')}
          </p>
        </div>

        {/* Locality Chips Grid */}
        <div className="flex flex-wrap gap-2 pt-1">
          {PATNA_LOCALITIES.map((loc, i) => (
            <div 
              key={i} 
              className="card-theme px-3.5 py-2 rounded-xl border border-slate-500/20 bg-slate-500/5 hover:border-amber-500/40 transition-all flex items-center gap-2 text-xs font-bold"
            >
              <MapPin size={13} className="text-amber-500 shrink-0" />
              <span>{language === 'hi' ? loc.nameHi : loc.nameEn}</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">FREE DELIVERY</span>
            </div>
          ))}
        </div>
      </section>

      {/* REAL PANDEY STORE PHOTO GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-500/20 pb-4 gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 tracking-wider uppercase mb-1">
              <Camera size={15} />
              <span>REAL STORE PHOTOS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Inside <span className="gradient-gold-text">Pandey Store Patna City</span>
            </h2>
          </div>
          <p className="text-xs opacity-75 sm:text-right">
            {language === 'hi' ? 'गुलज़ारबाग स्टेशन रोड पर हमारे असली किराना स्टोर और स्टॉक की झलकियां देखें' : 'Authentic photos of our physical shop counter, shelves & grocery stock'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {STORE_PHOTOS.map((photo, idx) => (
            <div 
              key={idx} 
              onClick={() => setActivePhotoIdx(idx)}
              className={`card-theme p-2.5 sm:p-3 cursor-pointer group transition-all duration-300 ${activePhotoIdx === idx ? 'ring-2 ring-amber-500 border-amber-500' : 'hover:border-amber-500/40'}`}
            >
              <div className="relative rounded-xl overflow-hidden h-36 sm:h-48 border border-slate-500/20 bg-slate-900">
                <img 
                  src={photo.src} 
                  alt={photo.titleEn} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <span className="absolute top-2 left-2 bg-slate-950/80 text-amber-400 border border-amber-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  PHOTO {idx + 1}
                </span>
              </div>

              <div className="pt-2 sm:pt-3 space-y-0.5">
                <h4 className="font-bold text-xs line-clamp-1 group-hover:text-amber-500 transition-colors">
                  {language === 'hi' ? photo.titleHi : photo.titleEn}
                </h4>
                <p className="text-[10px] sm:text-[11px] opacity-70 line-clamp-1">
                  {language === 'hi' ? photo.subHi : photo.subEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ABOUT PANDEY STORE SECTION WITH AUTHENTIC STORE SHELVES PHOTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-theme p-6 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 tracking-wider uppercase">
                <ShieldCheck size={16} />
                <span>{t('aboutBadge')}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {t('aboutTitle')} <br className="hidden sm:block" />
                <span className="gradient-gold-text">{t('aboutTitleGold')}</span>
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {t('aboutDesc1')}
              </p>

              <p className="text-xs leading-relaxed opacity-75">
                {t('aboutDesc2')}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 text-xs">
                <div className="p-3 sm:p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5">
                  <p className="text-lg sm:text-xl font-black text-amber-500">{t('yearsServing')}</p>
                  <p className="opacity-70 mt-0.5 font-medium text-[11px] sm:text-xs">{t('yearsServingSub')}</p>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5">
                  <p className="text-lg sm:text-xl font-black text-amber-500">{t('pureStaples')}</p>
                  <p className="opacity-70 mt-0.5 font-medium text-[11px] sm:text-xs">{t('pureStaplesSub')}</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-500/20 h-64 sm:h-80">
              <img 
                src="/store-photos/store_fridge_shelves.jpg" 
                alt="Pandey Store Authentic Stock Shelves Patna City"
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs text-amber-400 font-bold uppercase">{t('wholesaleGuarantee')}</p>
                <p className="text-xs sm:text-sm font-bold">{t('wholesaleGuaranteeText')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURRENT FESTIVAL OFFERS & WHOLESALE COMBOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-500/20 pb-4 gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 tracking-wider uppercase mb-1">
              <Percent size={14} />
              <span>{t('festivalBadge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('festivalTitle')} <span className="gradient-gold-text">{t('festivalTitleGold')}</span>
            </h2>
          </div>
          
          <a 
            href="https://wa.me/918877002297?text=Hi%20Pandey%20Store,%20please%20send%20me%20the%20latest%20festival%20offers%20list."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1 transition-colors"
          >
            <span>{t('requestCatalog')}</span>
            <ChevronRight size={14} />
          </a>
        </div>

        {/* Festival Deals Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FESTIVAL_DEALS.map((deal) => (
            <div key={deal._id} className="card-theme flex flex-col justify-between group">
              
              <div className="relative h-44 sm:h-48 overflow-hidden border-b border-slate-500/20 bg-white">
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md z-10">
                  {deal.tag}
                </span>

                <span className="absolute bottom-3 right-3 bg-slate-950/80 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2 py-0.5 rounded-lg z-10">
                  {deal.discount}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-[11px] font-semibold opacity-60 mb-1">{deal.unit}</p>
                  <h3 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-amber-500 transition-colors">
                    {deal.name}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black text-amber-500">₹{deal.wholesalePrice}</span>
                    <span className="text-xs opacity-50 line-through">₹{deal.retailPrice}</span>
                  </div>

                  <a
                    href={`https://wa.me/918877002297?text=Hi%20Pandey%20Store,%20I%20want%20to%20order%20the%20festival%20deal:%20${encodeURIComponent(deal.name)}%20(₹${deal.wholesalePrice})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full py-2.5 px-3 text-xs flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
                    </svg>
                    <span>{t('orderDealWhatsApp')}</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        <div className="border-b border-slate-500/20 pb-4">
          <p className="text-xs font-bold text-amber-500 tracking-wider uppercase mb-1">DISCOVER OUR STOCK</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('categoriesTitle')} <span className="gradient-gold-text">{t('categoriesTitleGold')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="card-theme p-3.5 sm:p-4 flex flex-col items-center text-center group hover:border-amber-500/50 transition-all"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden mb-2.5 border border-slate-500/20 group-hover:scale-105 transition-transform bg-white">
                <img src={cat.image} alt={cat.id} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-xs group-hover:text-amber-500 transition-colors line-clamp-1">
                {t(cat.id, true)}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. REAL CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <Star size={14} className="fill-amber-500 text-amber-500" />
            <span>{t('reviewsBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('reviewsTitle')} <span className="gradient-gold-text">{t('reviewsTitleGold')}</span>
          </h2>
          <p className="opacity-70 text-xs">
            {t('reviewsSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div key={rev.id} className="card-theme p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs italic leading-relaxed opacity-90">
                  "{language === 'hi' ? rev.textHi : rev.textEn}"
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-500/20 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs">{rev.name}</h4>
                  <p className="text-[11px] opacity-60">{rev.location}</p>
                </div>
                <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-md">
                  {rev.date}
                </span>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 6. QUICK CONTACT & STORE DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-theme p-6 sm:p-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Store Information Column */}
            <div className="lg:col-span-7 space-y-5">
              
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{t('contactBadge')}</span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  {t('contactTitle')} <span className="gradient-gold-text">{t('contactTitleGold')}</span>
                </h2>
                <p className="text-xs opacity-80 mt-2">
                  {t('contactDesc')}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                
                <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-500/20 bg-slate-500/5">
                  <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">{t('storeAddressLabel')}</h4>
                    <p className="opacity-80 mt-0.5">{t('storeAddressVal')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-500/20 bg-slate-500/5">
                  <Clock size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">{t('opHoursLabel')}</h4>
                    <p className="opacity-80 mt-0.5">{t('opHoursVal')}</p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <a
                  href="https://wa.me/918877002297?text=Hi%20Pandey%20Store,%20I%20want%20to%20inquire%20about%20store%20items."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full sm:w-auto py-3.5 px-6 text-xs flex items-center justify-center gap-2.5"
                >
                  <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
                  </svg>
                  <span>{t('chatWhatsAppBtn')}</span>
                </a>

                <a
                  href="tel:+918877002297"
                  className="w-full sm:w-auto border border-slate-500/30 hover:border-amber-500/50 bg-slate-500/10 font-bold text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall size={16} className="text-amber-500" />
                  <span>{t('callDirectlyBtn')}</span>
                </a>
              </div>

            </div>

            {/* Embedded Google Maps Column */}
            <div className="lg:col-span-5 w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-500/20 relative">
              <iframe
                title="Pandey Store Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.348234857416!2d85.1843!3d25.6031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58ef3bb8d21d%3A0x6b86e06b3e77f09a!2sGulzarbagh%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/?q=Gulzarbagh+Patna+City"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-slate-950/90 text-amber-400 text-[11px] font-bold py-1.5 px-3 rounded-lg border border-amber-500/30 flex items-center gap-1.5 shadow-lg backdrop-blur-md"
              >
                <span>{t('openGoogleMaps')}</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
