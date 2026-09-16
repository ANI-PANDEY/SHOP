import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { generateWhatsAppBill } from '../utils/whatsapp';
import { MapPin, PhoneCall, ShieldCheck, Zap } from 'lucide-react';

const Checkout = () => {
  const { cartItems, deliveryType, getCartTotal, clearCart } = useCartStore();
  const totals = getCartTotal();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: 'Gulzarbagh Station Road, Patna City',
    landmark: 'Near Railway Crossing',
    pincode: '800007',
    paymentMethod: 'Cash / Pay on Delivery',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderDetails = {
      deliveryType: deliveryType || 'Standard Local Delivery',
      paymentMethod: formData.paymentMethod,
    };

    generateWhatsAppBill(orderDetails, formData, cartItems, totals);
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">PANDEY STORE WHATSAPP ORDER</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Direct WhatsApp Order Dispatch</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
          No online payment gateway needed. Confirm your details to open a pre-filled order message in WhatsApp.
        </p>
      </div>

      <div className="card-dark p-6 sm:p-10 border-slate-800 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <MapPin size={18} className="text-amber-400" />
              <span>Customer Delivery Information</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="e.g. Ramesh Singh"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">Delivery Address (Patna City) *</label>
                <textarea 
                  name="address"
                  required
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="House / Shop address in Patna City"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between font-black text-sm text-white">
              <span>Total Order Value:</span>
              <span className="text-amber-400">₹{totals.totalPrice}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Items: {cartItems.reduce((a, c) => a + c.qty, 0)} • Pay on Delivery via Cash or UPI
            </p>
          </div>

          <button 
            type="submit"
            className="btn-whatsapp w-full py-4 text-xs font-bold flex justify-center items-center gap-2.5 shadow-xl"
          >
            <PhoneCall size={16} />
            <span>Send Pre-filled Order to WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
