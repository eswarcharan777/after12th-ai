// Tiny i18n — switch UI between English & Hindi via React context
import React, { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
  en: {
    'nav.home':     'Home',
    'nav.neet':     'NEET',
    'nav.jee':      'JEE',
    'nav.colleges': 'Colleges',
    'nav.pricing':  'Pricing',
    'nav.about':    'About',
    'nav.login':    'Start Free',
    'nav.dashboard':'Dashboard',
    'nav.logout':   'Logout',
    'hero.title':   'Crack NEET & JEE',
    'hero.subtitle':'with Your Personal AI Tutor',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.tutor':     'AI Tutor',
    'sidebar.mocktest':  'Mock Test',
    'sidebar.flashcards':'Flashcards',
    'sidebar.pomodoro':  'Focus Timer',
    'sidebar.videos':    'Video Lessons',
    'sidebar.forum':     'Doubt Forum',
    'sidebar.rank':      'Rank Predictor',
    'sidebar.colleges':  'College Finder',
    'sidebar.branch':    'Branch Guide',
    'sidebar.planner':   'Study Planner',
    'sidebar.quiz':      'Daily Quiz',
    'sidebar.notes':     'Notes',
    'sidebar.formulas':  'Formulas',
    'sidebar.music':     'Focus Music',
    'sidebar.refer':     'Refer Friends',
    'welcome':           'Welcome back',
    'good_morning':      'Good morning',
    'aspirant':          'Aspirant',
  },
  hi: {
    'nav.home':     'होम',
    'nav.neet':     'नीट',
    'nav.jee':      'जेईई',
    'nav.colleges': 'कॉलेज',
    'nav.pricing':  'मूल्य',
    'nav.about':    'के बारे में',
    'nav.login':    'मुफ्त शुरू करें',
    'nav.dashboard':'डैशबोर्ड',
    'nav.logout':   'लॉगआउट',
    'hero.title':   'नीट और जेईई पास करें',
    'hero.subtitle':'अपने व्यक्तिगत AI ट्यूटर के साथ',
    'sidebar.dashboard': 'डैशबोर्ड',
    'sidebar.tutor':     'AI ट्यूटर',
    'sidebar.mocktest':  'मॉक टेस्ट',
    'sidebar.flashcards':'फ्लैशकार्ड',
    'sidebar.pomodoro':  'फोकस टाइमर',
    'sidebar.videos':    'वीडियो पाठ',
    'sidebar.forum':     'संदेह मंच',
    'sidebar.rank':      'रैंक अनुमान',
    'sidebar.colleges':  'कॉलेज खोज',
    'sidebar.branch':    'शाखा गाइड',
    'sidebar.planner':   'अध्ययन योजना',
    'sidebar.quiz':      'दैनिक क्विज़',
    'sidebar.notes':     'नोट्स',
    'sidebar.formulas':  'सूत्र',
    'sidebar.music':     'फोकस संगीत',
    'sidebar.refer':     'दोस्तों को बुलाएं',
    'welcome':           'वापस स्वागत है',
    'good_morning':      'सुप्रभात',
    'aspirant':          'आकांक्षी',
  },
};

const I18nContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('after12th_lang') || 'en');

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('after12th_lang', l);
    document.documentElement.lang = l === 'hi' ? 'hi-IN' : 'en-IN';
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  }, [lang]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);

export function LanguageToggle({ style }) {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
      title={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid var(--border)',
        color: 'var(--text-mid)',
        borderRadius: 10,
        padding: '7px 14px',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
        ...style,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.color = 'var(--text)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-mid)'; }}
    >🌐 {lang === 'en' ? 'EN' : 'हिं'}</button>
  );
}
