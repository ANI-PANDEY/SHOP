import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pandey_store_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('pandey_store_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'hi' : 'en'));
  };

  const t = (key, isCategory = false) => {
    if (isCategory) {
      return (translations[language] && translations[language].categories && translations[language].categories[key]) || 
             (translations['en'].categories && translations['en'].categories[key]) || key;
    }
    
    return (translations[language] && translations[language][key]) || 
           (translations['en'] && translations['en'][key]) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
