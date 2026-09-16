import { Link } from 'react-router-dom';
import { Store, MapPin, Heart, ShoppingBag, PhoneCall, Sun, Moon, Globe } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import AnnouncementBar from './AnnouncementBar';

const Navbar = ({ onOpenWishlistModal }) => {
  const { cartItems } = useCartStore();
  const { wishlistItems } = useWishlistStore();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <AnnouncementBar />
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="glass-nav-theme sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center py-3 sm:py-0 sm:h-20 gap-3">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="bg-amber-500/10 p-2 sm:p-2.5 rounded-xl border border-amber-500/20 group-hover:border-amber-500/50 group-hover:bg-amber-500/20 transition-all">
                <Store className="text-amber-500" size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl sm:text-2xl tracking-tight group-hover:text-amber-500 transition-colors">
                  {t('brandName')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-500 font-bold uppercase tracking-wider -mt-1">
                  {t('brandSubtitle')}
                </span>
              </div>
            </Link>

            {/* Patna City Serving Badge */}
            <div className="hidden md:flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 text-amber-500 font-bold text-xs">
              <MapPin size={14} />
              <span>{t('patnaNotice')}</span>
            </div>

            {/* Right Controls & Toggles */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto sm:ml-0">
              
              {/* Language Toggle Button (English / हिंदी) */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold text-xs transition-all"
                title="Switch Language / भाषा बदलें"
              >
                <Globe size={14} />
                <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
              </button>

              {/* Theme Toggle Button (Light / Dark) */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold text-xs transition-all"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={15} />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={15} />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>

              {/* Direct Order via WhatsApp */}
              <a
                href="https://wa.me/918877002297?text=Hi%20Pandey%20Store,%20I%20want%20to%20place%20an%20order."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 sm:py-2.5 sm:px-4 shadow-lg"
              >
                <PhoneCall size={14} />
                <span className="hidden sm:inline">{t('whatsappOrderBtn')}</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>

              {/* Wishlist Button */}
              {onOpenWishlistModal && (
                <button
                  onClick={onOpenWishlistModal}
                  className="relative p-2 sm:p-2.5 bg-slate-500/10 hover:bg-slate-500/20 rounded-xl transition-colors border border-slate-500/20"
                  title="Saved Items"
                >
                  <Heart size={16} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              )}

              {/* Cart / Order Builder Link */}
              <Link 
                to="/cart"
                className="relative p-2 sm:p-2.5 bg-slate-500/10 hover:bg-slate-500/20 rounded-xl transition-colors border border-slate-500/20 flex items-center gap-1.5"
                title="Order List"
              >
                <ShoppingBag size={16} />
                <span className="text-xs font-bold hidden md:inline">{t('orderListBtn')}</span>
                {cartCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>

          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
