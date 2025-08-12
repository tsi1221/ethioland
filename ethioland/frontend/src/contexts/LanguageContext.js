import React, { createContext, useContext, useState, useEffect } from 'react';

// Language translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    properties: 'Properties',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    profile: 'Profile',
    logout: 'Logout',
    
    // Common
    welcome: 'Welcome',
    search: 'Search',
    filter: 'Filter',
    price: 'Price',
    location: 'Location',
    type: 'Type',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    submit: 'Submit',
    
    // Property related
    propertyType: 'Property Type',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    size: 'Size',
    forSale: 'For Sale',
    forRent: 'For Rent',
    featured: 'Featured',
    newListing: 'New Listing',
    
    // Forms
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    
    // Hero section
    heroTitle: 'Find Your Dream Home in Ethiopia',
    heroSubtitle: 'Discover the perfect property with our trusted real estate platform',
    searchPlaceholder: 'Search by location, property type, or price...',
    
    // Footer
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  
  am: {
    // Navigation (Amharic)
    home: 'መነሻ',
    properties: 'ንብረቶች',
    login: 'ግባ',
    register: 'ተመዝገብ',
    dashboard: 'ዳሽቦርድ',
    profile: 'መገለጫ',
    logout: 'ውጣ',
    
    // Common
    welcome: 'እንኳን ደህና መጡ',
    search: 'ፈልግ',
    filter: 'ማጣሪያ',
    price: 'ዋጋ',
    location: 'አካባቢ',
    type: 'አይነት',
    loading: 'በመጫን ላይ...',
    error: 'ስህተት',
    success: 'ተሳክቷል',
    cancel: 'ሰርዝ',
    save: 'ለውጦች ያስቀምጡ',
    delete: 'ሰርዝ',
    edit: 'ያርትዑ',
    view: 'ይመልከቱ',
    submit: 'ላክ',
    
    // Property related
    propertyType: 'የንብረት አይነት',
    bedrooms: 'የመኝታ ክፍሎች',
    bathrooms: 'መታጠቢያ ቤቶች',
    size: 'መጠን',
    forSale: 'ለሽያጭ',
    forRent: 'ለኪራይ',
    featured: 'ተመረጡ',
    newListing: 'አዲስ ዝርዝር',
    
    // Forms
    name: 'ስም',
    email: 'ኢሜይል',
    phone: 'ስልክ',
    password: 'የይለፍ ቃል',
    confirmPassword: 'የይለፍ ቃል አረጋግጥ',
    
    // Hero section
    heroTitle: 'በኢትዮጵያ የሕልም ቤትዎን ያግኙ',
    heroSubtitle: 'በእኛ የታመነ የሪያል እስቴት መድረክ ፍጹም ንብረት ያግኙ',
    searchPlaceholder: 'በአካባቢ፣ በንብረት አይነት ወይም በዋጋ ይፈልጉ...',
    
    // Footer
    aboutUs: 'ስለ እኛ',
    contactUs: 'አግኙን',
    privacyPolicy: 'የግላዊነት ፖሊሲ',
    termsOfService: 'የአገልግሎት ውሎች',
  },
  
  om: {
    // Navigation (Oromo)
    home: 'Mana',
    properties: 'Qabeenyawwan',
    login: 'Seeni',
    register: 'Galmaaʼi',
    dashboard: 'Gabatee',
    profile: 'Seensa',
    logout: 'Baʼi',
    
    // Common
    welcome: 'Baga nagaan dhuftan',
    search: 'Barbaadi',
    filter: 'Calaluu',
    price: 'Gatii',
    location: 'Bakka',
    type: 'Gosa',
    loading: 'Feʼaa jira...',
    error: 'Dogongora',
    success: 'Milkaaʼe',
    cancel: 'Dhiisi',
    save: 'Olkaaʼi',
    delete: 'Haqi',
    edit: 'Foyyessi',
    view: 'Ilaali',
    submit: 'Ergi',
    
    // Property related
    propertyType: 'Gosa Qabeenyaa',
    bedrooms: 'Kutaa Rafaa',
    bathrooms: 'Mana Dhiqannaa',
    size: 'Guddina',
    forSale: 'Gurgurtaaf',
    forRent: 'Kiraa',
    featured: 'Filatamaa',
    newListing: 'Tarree Haaraa',
    
    // Forms
    name: 'Maqaa',
    email: 'Imeelii',
    phone: 'Bilbilaa',
    password: 'Jecha Icciitii',
    confirmPassword: 'Jecha Icciitii Mirkaneessi',
    
    // Hero section
    heroTitle: 'Mana Abjuu Keessan Itoophiyaa Keessatti Argadhaa',
    heroSubtitle: 'Waltajjii riayaa isteettii amanamaa keenya waliin qabeenyaa gaarii argadhaa',
    searchPlaceholder: 'Bakka, gosa qabeenyaa ykn gatiidhaan barbaadi...',
    
    // Footer
    aboutUs: 'Waaʼee Keenya',
    contactUs: 'Nu Qunnamaa',
    privacyPolicy: 'Imaammata Dhuunfaa',
    termsOfService: 'Haala Tajaajilaa',
  },
  
  ti: {
    // Navigation (Tigrigna)
    home: 'ቤት',
    properties: 'ንብረታት',
    login: 'እቶ',
    register: 'ተመዝገብ',
    dashboard: 'ዳሽቦርድ',
    profile: 'መለለዪ',
    logout: 'ወጽእ',
    
    // Common
    welcome: 'እንቋዕ ብድሓን መጻእኩም',
    search: 'ደሊ',
    filter: 'ማጽሪ',
    price: 'ዋጋ',
    location: 'ቦታ',
    type: 'ዓይነት',
    loading: 'ይጽዕን ኣሎ...',
    error: 'ጌጋ',
    success: 'ተዓወተ',
    cancel: 'ሰርዝ',
    save: 'ዓቅብ',
    delete: 'ድምሰስ',
    edit: 'ኣርም',
    view: 'ርአይ',
    submit: 'ሰደድ',
    
    // Property related
    propertyType: 'ዓይነት ንብረት',
    bedrooms: 'ክፍሊ ምድቃስ',
    bathrooms: 'ምሕጻብ',
    size: 'ዓቐን',
    forSale: 'ንሽያጥ',
    forRent: 'ንኪራይ',
    featured: 'ዝተመረጸ',
    newListing: 'ሓዲሽ ዝርዝር',
    
    // Forms
    name: 'ስም',
    email: 'ኢሜይል',
    phone: 'ተሌፎን',
    password: 'መሕለፊ ቃል',
    confirmPassword: 'መሕለፊ ቃል ኣረጋግጽ',
    
    // Hero section
    heroTitle: 'ናይ ሕልምኹም ገዛ ኣብ ኢትዮጵያ ረኽቡ',
    heroSubtitle: 'ብእማነተኛ ንብረት ፕላትፎርምና ፍጹም ንብረት ረኽቡ',
    searchPlaceholder: 'ብቦታ፡ ዓይነት ንብረት ወይ ዋጋ ደልዩ...',
    
    // Footer
    aboutUs: 'ብዛዕባና',
    contactUs: 'ረኸቡና',
    privacyPolicy: 'ፖሊሲ ስውር',
    termsOfService: 'ኩነታት ኣገልግሎት',
  },
};

// Language context
const LanguageContext = createContext();

// Language provider
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('ethioland_language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('ethioland_language', currentLanguage);
    
    // Set document direction for RTL languages (if needed in future)
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Function to change language
  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  // Function to get translation
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Fallback to English if translation not found
    if (!value) {
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
      }
    }
    
    return value || key;
  };

  // Function to check if current language is RTL
  const isRTL = () => {
    return ['ar', 'he'].includes(currentLanguage);
  };

  // Function to get language info
  const getLanguageInfo = (langCode = currentLanguage) => {
    const languages = {
      en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
      am: { name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
      om: { name: 'Oromo', nativeName: 'Afaan Oromoo', flag: '🇪🇹' },
      ti: { name: 'Tigrigna', nativeName: 'ትግርኛ', flag: '🇪🇹' },
    };
    
    return languages[langCode] || languages.en;
  };

  // Function to get available languages
  const getAvailableLanguages = () => {
    return Object.keys(translations).map(code => ({
      code,
      ...getLanguageInfo(code),
    }));
  };

  // Function to format numbers according to locale
  const formatNumber = (number, options = {}) => {
    const locale = currentLanguage === 'am' ? 'am-ET' : 
                  currentLanguage === 'om' ? 'om-ET' :
                  currentLanguage === 'ti' ? 'ti-ET' : 'en-US';
    
    return new Intl.NumberFormat(locale, options).format(number);
  };

  // Function to format currency
  const formatCurrency = (amount, currency = 'ETB') => {
    return formatNumber(amount, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  // Function to format date
  const formatDate = (date, options = {}) => {
    const locale = currentLanguage === 'am' ? 'am-ET' : 
                  currentLanguage === 'om' ? 'om-ET' :
                  currentLanguage === 'ti' ? 'ti-ET' : 'en-US';
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    }).format(new Date(date));
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    isRTL,
    getLanguageInfo,
    getAvailableLanguages,
    formatNumber,
    formatCurrency,
    formatDate,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;