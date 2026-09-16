import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ShoppingBag, CheckCircle, Sparkles, IndianRupee, ArrowRight } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { useLanguage } from '../context/LanguageContext';

const BUNDLES = [
  {
    id: 'bundle-paneer',
    title: 'Restaurant-Style Paneer Butter Masala Kit',
    subtitle: 'Everything you need to cook a 4-person delicious Paneer Butter Masala at home!',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7',
    originalPrice: 280,
    bundlePrice: 230,
    items: [
      { _id: 'b-p1', name: 'Fresh Amul Malai Paneer 200g', price: 100, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da' },
      { _id: 'b-p2', name: 'Amul Butter 100g', price: 60, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d' },
      { _id: 'b-p3', name: 'Fresh Red Tomatoes 500g', price: 40, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea' },
      { _id: 'b-p4', name: 'Fresh Garlic & Ginger Paste Pack', price: 35, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5' },
      { _id: 'b-p5', name: 'Everest Shahi Paneer Masala 50g', price: 45, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d' }
    ]
  },
  {
    id: 'bundle-breakfast',
    title: 'Power-Packed Morning Breakfast Box',
    subtitle: 'Kickstart your morning with fresh milk, eggs, bread & butter!',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
    originalPrice: 210,
    bundlePrice: 175,
    items: [
      { _id: 'b-b1', name: 'Sudha Gold Milk 1L', price: 66, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b' },
      { _id: 'b-b2', name: 'Farm Fresh Brown Eggs (6 Pcs)', price: 54, image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441' },
      { _id: 'b-b3', name: 'Britannia Whole Wheat Bread', price: 45, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
      { _id: 'b-b4', name: 'Amul Butter Salted 50g', price: 35, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d' }
    ]
  },
  {
    id: 'bundle-mango',
    title: 'Refreshing Summer Fruit & Shake Kit',
    subtitle: 'Juicy Alphonso Mangoes, Sweet Bananas & Creamy Milk for healthy shakes!',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
    originalPrice: 310,
    bundlePrice: 249,
    items: [
      { _id: 'b-m1', name: 'Premium Alphonso Mangoes 1kg', price: 180, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078' },
      { _id: 'b-m2', name: 'Fresh Bananas (1 Dozen)', price: 60, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e' },
      { _id: 'b-m3', name: 'Amul Taaza Toned Milk 1L', price: 54, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b' },
      { _id: 'b-m4', name: 'Hershey Vanilla Syrup 200g', price: 16, image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69' }
    ]
  }
];

const MealBundles = () => {
  const { t } = useLanguage();
  const { addToCart } = useCartStore();
  const [addedBundles, setAddedBundles] = useState({});

  const handleAddBundle = (bundle) => {
    bundle.items.forEach(item => {
      addToCart(item, 1);
    });

    setAddedBundles(prev => ({ ...prev, [bundle.id]: true }));
    setTimeout(() => {
      setAddedBundles(prev => ({ ...prev, [bundle.id]: false }));
    }, 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-3">
            <ChefHat size={16} className="text-emerald-600" />
            <span>SMART GROCERY MARKETING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('smartBundlesTitle')}
          </h2>
          <p className="text-slate-500 mt-1 max-w-2xl">
            {t('smartBundlesSub')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {BUNDLES.map((bundle) => {
          const isAdded = addedBundles[bundle.id];
          const discountAmt = bundle.originalPrice - bundle.bundlePrice;

          return (
            <motion.div
              key={bundle.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Header Banner Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={bundle.image} 
                    alt={bundle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>SAVE ₹{discountAmt}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-extrabold text-lg leading-snug drop-shadow-sm">{bundle.title}</h3>
                  </div>
                </div>

                {/* Subtitle & Included Items */}
                <div className="p-6">
                  <p className="text-xs text-slate-500 mb-4">{bundle.subtitle}</p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bundle Package Includes:</p>
                    <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl p-3">
                      {bundle.items.map((item) => (
                        <div key={item._id} className="py-1.5 flex items-center justify-between text-xs font-medium text-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-bold text-slate-500">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Add Button */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 line-through">₹{bundle.originalPrice}</span>
                  <div className="flex items-center text-slate-900 font-extrabold text-2xl">
                    <IndianRupee size={20} className="-mr-0.5" />
                    <span>{bundle.bundlePrice}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918877002297?text=${encodeURIComponent(`Hi Grocery Point, I want to order the ${bundle.title} for ₹${bundle.bundlePrice}. Please confirm.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all shadow-emerald-600/20 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
                  </svg>
                  <span>Order Bundle on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MealBundles;
