import { useState } from 'react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { calculateQuantityFromRupees } from '../utils/kiranaCalculator';
import { useLanguage } from '../context/LanguageContext';
import useCartStore from '../store/useCartStore';
import { Scale, Calculator, Check, ShoppingBag, X, Sparkles, AlertCircle } from 'lucide-react';

const QUICK_AMOUNTS = [10, 20, 40, 50, 60, 100, 200, 500];

const KiranaQuantityCalculatorModal = ({ isOpen, onClose, defaultProduct = null }) => {
  const { language } = useLanguage();
  const addToCart = useCartStore(state => state.addToCart);

  const [selectedProductId, setSelectedProductId] = useState(defaultProduct?._id || SAMPLE_PRODUCTS[0]._id);
  const [rupeeAmount, setRupeeAmount] = useState('60');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!isOpen) return null;

  const currentProduct = SAMPLE_PRODUCTS.find(p => p._id === selectedProductId) || defaultProduct || SAMPLE_PRODUCTS[0];
  const calculation = calculateQuantityFromRupees(currentProduct, rupeeAmount);

  const handleAddToCart = () => {
    if (!calculation) return;

    const customWeightOption = `₹${rupeeAmount} (${language === 'hi' ? calculation.displayHi : calculation.displayEn})`;
    
    // Add item with custom price & calculated weight option to cart
    addToCart({
      _id: `${currentProduct._id}-custom-${rupeeAmount}`,
      name: currentProduct.name,
      image: currentProduct.image,
      discountPrice: parseFloat(rupeeAmount),
      price: parseFloat(rupeeAmount),
    }, 1, customWeightOption);

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="card-theme max-w-lg w-full p-6 space-y-5 relative border-2 border-amber-500/40 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Scale size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-wider uppercase text-amber-500 flex items-center gap-1">
                <Sparkles size={12} />
                {language === 'hi' ? 'सटीक किराना तौल कैलकुलेटर' : 'ACCURATE KIRANA SCALE CALCULATOR'}
              </span>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                {language === 'hi' ? 'रुपये से वज़न/मात्रा निकालें' : 'Calculate Exact Weight for ₹ Amount'}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-500/10 text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold opacity-80 block">
            {language === 'hi' ? 'सामान चुनें (Select Item):' : 'Select Kirana Item:'}
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full bg-slate-500/10 border border-slate-500/30 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-500"
          >
            {SAMPLE_PRODUCTS.map((p) => (
              <option key={p._id} value={p._id} className="bg-slate-900 text-white">
                {p.name} (₹{p.discountPrice || p.price} / base unit)
              </option>
            ))}
          </select>
        </div>

        {/* Rupee Amount Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold opacity-80">
              {language === 'hi' ? 'कितने रुपये का चाहिए? (Enter ₹ Amount):' : 'Enter Custom Rupee Amount (₹):'}
            </label>
            <span className="text-[11px] text-amber-500 font-bold">Default: ₹60</span>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-amber-500 font-black text-sm">₹</span>
            <input
              type="number"
              min="1"
              value={rupeeAmount}
              onChange={(e) => setRupeeAmount(e.target.value)}
              placeholder="e.g. 60"
              className="w-full bg-slate-500/10 border border-amber-500/50 rounded-xl pl-8 pr-4 py-2.5 text-sm font-black text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Quick Amount Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setRupeeAmount(amt.toString())}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                  rupeeAmount === amt.toString()
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                    : 'bg-slate-500/10 border-slate-500/20 hover:border-amber-500/40'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Calculation Result Display Card */}
        {calculation ? (
          <div className="p-4 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator size={14} />
                {language === 'hi' ? 'सटीक तौल परिणाम (Exact Measurement)' : 'EXACT SCALE MEASUREMENT'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 font-black text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                100% ACCURATE
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-amber-400">
                {language === 'hi' ? calculation.displayHi : calculation.displayEn}
              </p>
              <p className="text-xs text-slate-300 font-medium">
                ₹{rupeeAmount} में <span className="font-bold text-white">{currentProduct.name}</span> का सटीक वज़न
              </p>
            </div>

            {/* Shopkeeper Digital Scale Reading Note */}
            <div className="p-3 rounded-xl border border-slate-500/20 bg-slate-950/80 text-xs space-y-1">
              <p className="font-bold text-amber-500 flex items-center gap-1.5 text-[11px]">
                <Scale size={13} />
                {language === 'hi' ? 'दुकानदार के लिए डिजिटल तराजू माप गाइड:' : 'Shopkeeper Digital Scale Guide:'}
              </p>
              <p className="text-[11px] font-extrabold text-white leading-snug">
                {language === 'hi' ? calculation.scaleGuideHi : calculation.scaleGuideEn}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5 text-center text-xs opacity-70 flex items-center justify-center gap-2">
            <AlertCircle size={16} className="text-amber-500" />
            <span>{language === 'hi' ? 'कृपया सही रुपये (₹) की राशि दर्ज करें' : 'Please enter a valid rupee amount'}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={!calculation}
            className="btn-whatsapp flex-1 py-3 px-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <ShoppingBag size={16} />
            <span>
              {addedNotice 
                ? (language === 'hi' ? '✓ ऑर्डर लिस्ट में जोड़ा गया!' : '✓ Added to Order List!')
                : (language === 'hi' ? `₹${rupeeAmount} का सामान ऑर्डर लिस्ट में जोड़ें` : `Add ₹${rupeeAmount} Item to WhatsApp List`)}
            </span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-2xl border border-slate-500/30 hover:border-slate-500/60 font-bold text-xs bg-slate-500/10"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default KiranaQuantityCalculatorModal;
