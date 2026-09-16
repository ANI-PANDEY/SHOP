import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import Admin from './pages/Admin';
import WishlistModal from './components/WishlistModal';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { MapPin, PhoneCall, Heart, Store } from 'lucide-react';

function App() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950 w-full overflow-x-hidden">
            
            <Navbar 
              onOpenWishlistModal={() => setIsWishlistOpen(true)}
            />

            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>

            {/* Mobile Responsive Marketing Footer */}
            <footer className="py-12 sm:py-16 mt-auto border-t border-slate-500/20 relative overflow-hidden bg-slate-950 text-slate-300">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
                
                {/* Col 1: Store Marketing */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
                      <Store className="text-amber-400" size={20} />
                    </div>
                    <span className="font-black text-xl sm:text-2xl text-white tracking-tight">
                      Pandey <span className="gradient-gold-text">Store</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Patna City’s premier wholesale & retail kirana store. Pure Sudha Ghee, authentic spices, grains, dry fruits, and everyday household essentials delivered directly to your doorstep.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <MapPin size={15} />
                    <span>Gulzarbagh Station Road, Patna City 800007</span>
                  </div>
                </div>

                {/* Col 2: Quick Links */}
                <div>
                  <h3 className="text-white font-bold text-sm mb-3 sm:mb-4 border-b border-slate-800 pb-2">Store Categories</h3>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li><Link to="/" className="hover:text-amber-400 transition">Store Home</Link></li>
                    <li><Link to="/category/staples" className="hover:text-amber-400 transition">Atta, Rice & Spices</Link></li>
                    <li><Link to="/category/dairy" className="hover:text-amber-400 transition">Sudha Ghee & Dairy</Link></li>
                    <li><Link to="/category/snacks" className="hover:text-amber-400 transition">Dry Fruits & Chocolates</Link></li>
                    <li><Link to="/category/household" className="hover:text-amber-400 transition">Cleaning & Laundry</Link></li>
                  </ul>
                </div>

                {/* Col 3: Customer Care */}
                <div>
                  <h3 className="text-white font-bold text-sm mb-3 sm:mb-4 border-b border-slate-800 pb-2">Customer Service</h3>
                  <ul className="space-y-2.5 text-xs text-slate-400">
                    <li className="flex items-center gap-2 text-amber-400 font-bold">
                      <Heart size={14} />
                      <button onClick={() => setIsWishlistOpen(true)} className="hover:underline">Saved Wishlist Items</button>
                    </li>
                    <li><Link to="/cart" className="hover:text-amber-400 transition">WhatsApp Order List</Link></li>
                    <li><Link to="/feedback" className="hover:text-amber-400 transition">Customer Reviews & Feedback</Link></li>
                  </ul>
                </div>

                {/* Col 4: Direct WhatsApp Manager */}
                <div>
                  <h3 className="text-white font-bold text-sm mb-3 sm:mb-4 border-b border-slate-800 pb-2">Direct Order Support</h3>
                  <p className="text-xs text-slate-400 mb-3">Place orders directly or inquire about bulk wholesale rates:</p>
                  <a 
                    href="https://wa.me/918877002297?text=Hi%20Pandey%20Store,%20I%20want%20to%20place%20an%20order." 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-whatsapp inline-flex items-center gap-2 font-bold px-4 py-2.5 text-xs shadow-lg"
                  >
                    <PhoneCall size={15} />
                    <span>WhatsApp: +91 8877002297</span>
                  </a>
                </div>

              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                <p>© {new Date().getFullYear()} Pandey Store (Wholesale & Retail Kirana). All rights reserved.</p>
              </div>
            </footer>

            {/* Floating WhatsApp Order Widget */}
            <a
              href="https://wa.me/918877002297?text=Hi%20Pandey%20Store,%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all hover:scale-110 border-2 border-emerald-400 animate-bounce text-xs"
              title="Order on WhatsApp"
            >
              <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
              </svg>
              <span className="font-black tracking-wide hidden sm:inline">Order via WhatsApp</span>
            </a>

            {/* Wishlist Overlay Modal */}
            <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
