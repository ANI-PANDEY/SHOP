import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { SAMPLE_PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: { 
        en: t('botGreeting'), 
        hi: t('botGreeting') // Note: In bilingual mode, it combines them
      },
      isUser: false,
      products: []
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { id: Date.now(), text: { en: userText, hi: userText }, isUser: true, products: [] }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI Processing delay
    setTimeout(() => {
      processBotResponse(userText.toLowerCase(), newMessages);
    }, 600);
  };

  const processBotResponse = (query, currentMessages) => {
    let responseText = { 
      en: "I couldn't find exactly that, but we have great options.", 
      hi: "मुझे बिल्कुल वही नहीं मिला, लेकिन हमारे पास बेहतरीन विकल्प हैं।" 
    };
    let responseProducts = [];
    
    // 0. Greetings
    if (query === 'hi' || query === 'hello' || query === 'hey' || query === 'namaste') {
      responseText = { 
        en: "Hello! I am Groco. 👋 What would you like to order today?", 
        hi: "नमस्ते! मैं ग्रोको हूँ। 👋 आज क्या मंगाना है?" 
      };
      setMessages([...currentMessages, { id: Date.now(), text: responseText, isUser: false, products: [] }]);
      return;
    }

    // 1. Navigation & Direct Ordering Commands
    if (query.includes('checkout') || query.includes('pay') || query.includes('bill') || query.includes('order')) {
      const cartItems = useCartStore.getState().cartItems;
      if (cartItems.length === 0) {
        responseText = {
          en: "Your cart is empty! Please add items first.",
          hi: "आपका कार्ट खाली है! कृपया पहले आइटम जोड़ें।"
        };
      } else {
        responseText = {
          en: "Taking you to the checkout page!",
          hi: "आपको चेकआउट पेज पर ले जा रहे हैं!"
        };
        setTimeout(() => {
          setIsOpen(false);
          navigate('/checkout');
        }, 2000);
      }
      setMessages([...currentMessages, { id: Date.now(), text: responseText, isUser: false, products: [] }]);
      return;
    }

    if (query.includes('cart')) {
      responseText = {
        en: "Your cart is in the top right corner.",
        hi: "आपका कार्ट ऊपर दाईं ओर है।"
      };
      setMessages([...currentMessages, { id: Date.now(), text: responseText, isUser: false, products: [] }]);
      return;
    }

    // 2. Product Searching
    let foundProducts = [];
    const queryWords = query.split(' ').filter(w => w.length > 2); // Extract meaningful words

    for (const product of SAMPLE_PRODUCTS) {
      const searchString = `${product.name} ${product.category} ${product.subcategory}`.toLowerCase();
      
      // Match if the product's searchString contains any of the user's meaningful query words
      if (queryWords.length > 0 && queryWords.some(word => searchString.includes(word))) {
        // Prevent duplicates
        if (!foundProducts.some(p => p._id === product._id)) {
          foundProducts.push(product);
        }
      }
    }

    // Return the top 3 best matches
    if (foundProducts.length > 0) {
      responseProducts = foundProducts.slice(0, 3);
      responseText = {
        en: "I found these best options for you!",
        hi: "मुझे आपके लिए ये बेहतरीन विकल्प मिले हैं:"
      };
    } else if (query.includes('add') || query.includes('buy') || query.includes('chahiye') || query.includes('want')) {
      responseText = {
        en: "Please specify a product name!",
        hi: "कृपया किसी उत्पाद का नाम बताएं!"
      };
    }

    setMessages([...currentMessages, { 
      id: Date.now(), 
      text: responseText, 
      isUser: false, 
      products: responseProducts 
    }]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 h-14 w-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Groco - AI Assistant</h3>
                  <p className="text-[10px] text-white/80">{language === 'en' ? 'Online & Ready to help' : 'ऑनलाइन और सहायता के लिए तैयार'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="px-2 py-1 mr-2 text-xs font-bold bg-white/20 hover:bg-white/30 rounded transition-colors"
                >
                  {language === 'en' ? 'अ (HI)' : 'A (EN)'}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'} gap-2`}
                >
                  <div className={`flex items-end gap-2 max-w-[90%]`}>
                    {!msg.isUser && (
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-primary" />
                      </div>
                    )}
                    
                    <div 
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.isUser 
                          ? 'bg-primary text-white rounded-br-sm' 
                          : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'
                      }`}
                    >
                      {msg.text[language] || msg.text['en']}
                    </div>
                    
                    {msg.isUser && (
                      <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-slate-600" />
                      </div>
                    )}
                  </div>

                  {/* Render Product Cards inside Chat */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="flex flex-col gap-2 w-full pl-8 pr-2 mt-1">
                      {msg.products.map(product => (
                        <div key={product._id} className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-3 shadow-sm hover:border-primary/30 transition-colors">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-14 h-14 object-cover rounded-lg bg-slate-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 truncate">{product.name}</h4>
                            <div className="text-[10px] text-slate-400 mt-0.5">{product.weightOptions[0]}</div>
                            <div className="font-extrabold text-primary text-sm mt-0.5">₹{product.discountPrice || product.price}</div>
                          </div>
                          <button 
                            onClick={() => {
                              addToCart(product, 1, product.weightOptions[0]);
                              setMessages(prev => [...prev, {
                                id: Date.now(),
                                text: {
                                  en: `Added ${product.name} to your cart! 🛒`,
                                  hi: `आपके कार्ट में ${product.name} जोड़ दिया गया है! 🛒`
                                },
                                isUser: false,
                                products: []
                              }]);
                            }}
                            className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                          >
                            {language === 'en' ? 'ADD' : 'जोड़ें'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? "Ask Groco for a product..." : "ग्रोको से उत्पाद के लिए पूछें..."}
                className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                <Send size={18} className="ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
