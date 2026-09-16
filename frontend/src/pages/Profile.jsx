import { useState } from 'react';
import useUserStore from '../store/useUserStore';
import { User, MapPin, Phone, Save, CheckCircle2, Mail } from 'lucide-react';

const Profile = () => {
  const { profile, setProfile } = useUserStore();
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-primary/20">
          <User size={40} className="text-primary" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Your Profile</h1>
        <p className="text-slate-500 mt-2">Save your details for a seamless, 1-click checkout experience.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <User size={16} className="text-primary" /> Full Name
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Mail size={16} className="text-primary" /> Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Phone size={16} className="text-primary" /> Phone Number
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="9876543210"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <MapPin size={16} className="text-primary" /> Delivery Address
              </label>
              <textarea 
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="House No, Building, Street Area"
              ></textarea>
            </div>

            {/* Landmark & Pincode */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Landmark</label>
              <input 
                type="text" 
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="Near Post Office"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Pincode</label>
              <input 
                type="text" 
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="800007"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {isSaved ? (
              <div className="flex items-center gap-2 text-primary font-bold animate-pulse">
                <CheckCircle2 size={20} /> Profile Saved!
              </div>
            ) : (
              <div className="text-sm text-slate-400">Information is saved locally on your device.</div>
            )}
            
            <button 
              type="submit"
              className="btn-primary flex items-center gap-2 px-8"
            >
              <Save size={18} /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
