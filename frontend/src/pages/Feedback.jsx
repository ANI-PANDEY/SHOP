import { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Lightbulb, Send, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppFeedback } from '../utils/whatsapp';

const Feedback = () => {
  const [formData, setFormData] = useState({
    liked: '',
    improve: '',
    addProducts: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Redirect to WhatsApp with the formatted feedback
    generateWhatsAppFeedback(formData);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ liked: '', improve: '', addProducts: '' });
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-accent/20">
          <MessageSquare size={40} className="text-accent" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Customer Feedback</h1>
        <p className="text-slate-500 mt-2">Help us serve you better. Tell us what you loved and what we can improve!</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {isSubmitted ? (
          <div className="py-16 flex flex-col items-center justify-center text-center animate-slide-in relative z-10">
            <CheckCircle2 size={64} className="text-primary mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h2>
            <p className="text-slate-500 max-w-md">Your feedback is incredibly valuable to us. We will use it to make Grocery Point even better for you!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* What did you like? */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <ThumbsUp size={16} className="text-primary" /> What did you like the most? (Pros)
              </label>
              <textarea 
                name="liked"
                rows="3"
                required
                value={formData.liked}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="E.g. Fast delivery, fresh vegetables..."
              ></textarea>
            </div>

            {/* What should improve? */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <ThumbsDown size={16} className="text-red-500" /> What should improve or be removed? (Cons)
              </label>
              <textarea 
                name="improve"
                rows="3"
                value={formData.improve}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="E.g. Navigation is a bit confusing, remove this feature..."
              ></textarea>
            </div>

            {/* Suggestions */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Lightbulb size={16} className="text-accent" /> Which products should we add?
              </label>
              <textarea 
                name="addProducts"
                rows="2"
                value={formData.addProducts}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="E.g. Please add gluten-free bread, more pet food..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full btn-primary text-lg py-4 flex justify-center items-center gap-2"
            >
              <Send size={20} /> Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
