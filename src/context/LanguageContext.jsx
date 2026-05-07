import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    dashboard: 'Dashboard',
    courses: 'My Courses',
    browse: 'Browse Courses',
    resources: 'Resources',
    quizzes: 'Quizzes',
    logbook: 'Flight Logbook',
    leaderboard: 'Leaderboard',
    roadmap: 'Certification Path',
    idcard: 'Digital Pilot ID',
    jobs: 'Pilot Jobs',
    radar: 'Live Radar',
    maintenance: 'Fleet Health',
    community: 'Community',
    certificates: 'Certificates',
    profile: 'Profile',
    notifications: 'Notifications',
    welcome: 'Welcome back, Pilot',
    search: 'Search anything...',
    logout: 'Logout',
    due: 'Due',
    min: 'min',
    start: 'Start',
    // Dashboard specific
    active_courses: 'Active Courses',
    flight_hours: 'Flight Hours',
    avg_score: 'Avg Quiz Score',
    rank: 'Academy Rank',
    upcoming_sessions: 'Upcoming Live Sessions',
    announcements: 'Announcements',
    view_all: 'View All',
    join_now: 'Join Now',
    no_courses_in_progress: 'You have no courses in progress. Explore',
    browse_courses: 'Browse Courses',
    to_start_learning: 'to start learning!',
    upcoming_quizzes: 'Upcoming Quizzes'
  },
  te: {
    dashboard: 'డ్యాష్‌బోర్డ్',
    courses: 'నా కోర్సులు',
    browse: 'కోర్సులు వెతకండి',
    resources: 'వనరులు',
    quizzes: 'క్విజ్‌లు',
    logbook: 'ఫ్లైట్ లాగ్‌బుక్',
    leaderboard: 'లీడర్‌బోర్డ్',
    roadmap: 'సర్టిఫికేషన్ మార్గం',
    idcard: 'డిజిటల్ పైలట్ ID',
    jobs: 'పైలట్ ఉద్యోగాలు',
    radar: 'లైవ్ రాడార్',
    maintenance: 'ఫ్లీట్ ఆరోగ్యం',
    community: 'కమ్యూనిటీ',
    certificates: 'సర్టిఫికెట్లు',
    profile: 'ప్రొఫైల్',
    notifications: 'నోటిఫికేషన్లు',
    welcome: 'తిరిగి స్వాగతం, పైలట్',
    search: 'ఏదైనా వెతకండి...',
    logout: 'లాగ్ అవుట్',
    due: 'గడువు',
    min: 'నిమి',
    start: 'ప్రారంభించు',
    // Dashboard specific
    active_courses: 'అందుబాటులో ఉన్న కోర్సులు',
    flight_hours: 'ఫ్లైట్ గంటలు',
    avg_score: 'సగటు క్విజ్ స్కోరు',
    rank: 'అకాడమీ ర్యాంక్',
    upcoming_sessions: 'రాబోయే లైవ్ సెషన్లు',
    announcements: 'ప్రకటనలు',
    view_all: 'అన్నీ చూడండి',
    join_now: 'ఇప్పుడే చేరండి',
    no_courses_in_progress: 'మీరు ప్రస్తుతం ఏ కోర్సులు చేయడం లేదు.',
    browse_courses: 'కోర్సులు వెతకండి',
    to_start_learning: 'నేర్చుకోవడం ప్రారంభించడానికి!',
    upcoming_quizzes: 'రాబోయే క్విజ్‌లు'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('ada_lang') || 'en')

  useEffect(() => {
    localStorage.setItem('ada_lang', lang)
  }, [lang])

  const t = (key) => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
