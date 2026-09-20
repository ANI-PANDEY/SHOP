import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, PhoneCall, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { generateWhatsAppBill } from '../utils/whatsapp';

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, deliveryType, setDeliveryType, getCartTotal } = useCartStore();
  const totals = getCartTotal();

  const [customerInfo, setCustomerInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('pandey_customer_saved_info');
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        address: 'Gulzarbagh Station Road Area, Patna City',
        landmark: 'Near Station Road',
        pincode: '800007'
      };
    } catch (e) {
      return {
        name: '',
        phone: '',
        address: 'Gulzarbagh Station Road Area, Patna City',
        landmark: 'Near Station Road',
        pincode: '800007'
      };
    }
  });

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => {
      const updated = { ...prev, [field]: value };
      try {
        localStorage.setItem('pandey_customer_saved_info', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleInstantWhatsAppOrder = (e) => {
    e.preventDefault();
    const customer = {
      name: customerInfo.name || 'Local Customer',
      phone: customerInfo.phone || 'WhatsApp Order',
      address: customerInfo.address,
      landmark: customerInfo.landmark,
      pincode: customerInfo.pincode
    };

    // Save last order summary for 1-Click WhatsApp Repeat
    try {
      const lastOrderData = {
        date: new Date().toLocaleDateString(),
        itemsCount: cartItems.length,
        total: totals.totalPrice,
        items: cartItems
      };
      localStorage.setItem('pandey_last_whatsapp_order', JSON.stringify(lastOrderData));
    } catch (e) {}

    const orderDetails = {
      deliveryType: deliveryType || 'Standard Local Delivery',
      paymentMethod: 'Pay on Delivery / UPI'
    };

    generateWhatsAppBill(orderDetails, customer, cartItems, totals);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#0b0f19] flex items-center justify-center px-4 py-16 text-center">
        <div className="card-dark max-w-md w-full p-8 space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
            <PhoneCall size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Your Order List is Empty</h2>
            <p className="text-slate-400 text-xs mt-2">Add retail staples, festival bundles, or spices to build your WhatsApp order list.</p>
          </div>
          <Link to="/" className="btn-gold block text-sm">
            Browse Pandey Store Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">WHATSAPP ORDER BUILDER</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
          Review Your <span className="gradient-gold-text">Pandey Store Order List</span>
        </h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.product}-${item.weightOption}`} className="card-dark p-4 flex items-center gap-4 border-slate-800">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-slate-700 bg-slate-900" />
              
              <div className="flex-1">
                <h3 className="font-bold text-white text-sm sm:text-base">{item.name}</h3>
                {item.weightOption && <p className="text-xs text-slate-400 mt-0.5">{item.weightOption}</p>}
                <p className="font-black text-amber-400 mt-1 text-base">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-1.5 border border-slate-800">
                <button onClick={() => updateQty(item.product, item.weightOption, item.qty - 1)} className="p-1 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-bold text-sm text-white">{item.qty}</span>
                <button onClick={() => updateQty(item.product, item.weightOption, item.qty + 1)} className="p-1 hover:bg-slate-800 text-amber-400 rounded-lg transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              <button 
                onClick={() => removeFromCart(item.product, item.weightOption)}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Remove Item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* Customer Details Optional Input */}
          <div className="card-dark p-6 space-y-4 border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <MapPin size={16} className="text-amber-400" />
              <span>Optional Delivery Address Note (For WhatsApp Message)</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name (Saved automatically)"
                value={customerInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-slate-900 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Phone Number (Saved automatically)"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-slate-900 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Order Summary & WhatsApp Action */}
        <div className="lg:w-1/3">
          <div className="card-dark p-6 sticky top-24 space-y-6 border-slate-800">
            <h2 className="text-xl font-extrabold text-white border-b border-slate-800 pb-3">Order Summary</h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</span>
                <span className="font-bold text-white">₹{totals.itemsPrice}</span>
              </div>
              
              <div className="flex justify-between text-slate-300">
                <span>Estimated Local Delivery</span>
                <span className="font-bold text-emerald-400">{totals.itemsPrice >= 500 ? 'FREE' : '₹20'}</span>
              </div>

              <div className="flex justify-between font-black text-lg text-white border-t border-slate-800 pt-3">
                <span>Total Order Value</span>
                <span className="text-amber-400">₹{totals.totalPrice}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                onClick={handleInstantWhatsAppOrder}
                className="btn-whatsapp w-full py-3.5 px-4 text-xs font-bold flex justify-center items-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
                </svg>
                <span>Send Order to Pandey Store via WhatsApp</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Clicking opens WhatsApp with your complete pre-filled item list to send directly to Pandey Store manager.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
