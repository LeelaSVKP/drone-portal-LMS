import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CourseProvider } from './context/CourseContext'
import { QuizProvider } from './context/QuizContext'
import { ThemeProvider } from './context/ThemeContext'
import TopNav from './components/layout/TopNav'
import Sidebar from './components/layout/Sidebar'
import Login from './pages/Login'
import {
  LayoutDashboard,
  BookOpen,
  Search,
  FileQuestion,
  Award,
  TrendingUp,
  Bell,
  User,
  Users,
  PieChart,
  Upload,
  Calendar,
  Check,
  Trophy,
  Rocket,
  Plane,
  Briefcase,
  Radio,
  Activity,
  Monitor,
  MessageSquare
} from 'lucide-react'

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard'
import MyCourses from './pages/student/MyCourses'
import BrowseCourses from './pages/student/BrowseCourses'
import Quizzes from './pages/student/Quizzes'
import Certificates from './pages/student/Certificates'
import MyProgress from './pages/student/MyProgress'
import Notifications from './pages/student/Notifications'
import Profile from './pages/student/Profile'
import FlightLogbook from './pages/student/FlightLogbook'
import Leaderboard from './pages/student/Leaderboard'
import CertificationRoadmap from './pages/student/CertificationRoadmap'
import DigitalIDCard from './pages/student/DigitalIDCard'
import JobBoard from './pages/student/JobBoard'
import FlightRadar from './pages/student/FlightRadar'
import MaintenanceTracker from './pages/student/MaintenanceTracker'
import CommunityForum from './pages/student/CommunityForum'
import SessionRecordingHub from './pages/student/SessionRecordingHub'

// Trainer Pages
import TrainerDashboard from './pages/trainer/TrainerDashboard'
import MyStudents from './pages/trainer/MyStudents'
import ManageCourses from './pages/trainer/ManageCourses'
import TrainerQuizzes from './pages/trainer/TrainerQuizzes'
import Analytics from './pages/trainer/Analytics'
import UploadContent from './pages/trainer/UploadContent'
import IssueCertificates from './pages/trainer/IssueCertificates'
import LiveSessions from './pages/trainer/LiveSessions'
import Attendance from './pages/trainer/Attendance'
import Announcements from './pages/trainer/Announcements'
import ResourceLibrary from './pages/shared/ResourceLibrary'
import BulkCertificates from './pages/trainer/BulkCertificates'
import AIFlightAssistant from './components/shared/AIFlightAssistant'

import './App.css'

function AppLayout() {
  const { user, logout } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')

  // Reset page when user logs in/out or changes role
  useEffect(() => {
    setActivePage('dashboard')
  }, [user?.role])

  if (!user) {
    return <Login />
  }

  const isStudent = user.role === 'student'

  const sidebarItems = isStudent
    ? [
      {
        section: 'Main',
        links: [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { id: 'resources', label: 'Resources', icon: <BookOpen size={20} /> },
          { id: 'courses', label: 'My Courses', icon: <Search size={20} /> },
          { id: 'browse', label: 'Browse Courses', icon: <Rocket size={20} /> },
        ],
      },
      {
        section: 'Learn',
        links: [
          { id: 'quiz', label: 'Quizzes', icon: <FileQuestion size={20} /> },
          { id: 'logbook', label: 'Flight Logbook', icon: <Plane size={20} /> },
          { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={20} /> },
          { id: 'roadmap', label: 'Certification Path', icon: <TrendingUp size={20} /> },
          { id: 'idcard', label: 'Digital Pilot ID', icon: <User size={20} /> },
          { id: 'jobs', label: 'Pilot Jobs', icon: <Briefcase size={20} /> },
          { id: 'radar', label: 'Live Radar', icon: <Radio size={20} /> },
          { id: 'maintenance', label: 'Fleet Health', icon: <Activity size={20} /> },
          { id: 'recordings', label: 'Live Recordings', icon: <Monitor size={20} /> },
          { id: 'forum', label: 'Community', icon: <MessageSquare size={20} /> },
          { id: 'certs', label: 'Certificates', icon: <Award size={20} /> },
        ],
      },
      {
        section: 'Account',
        links: [
          { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
          { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        ],
      },
    ]
    : [
      {
        section: 'Trainer',
        links: [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { id: 'students', label: 'My Students', icon: <Users size={20} /> },
          { id: 'attendance', label: 'Attendance', icon: <Check size={20} /> },
          { id: 'announcements', label: 'Announcements', icon: <Bell size={20} /> },
          { id: 'courses', label: 'Manage Courses', icon: <BookOpen size={20} /> },
          { id: 'quizzes', label: 'Quizzes & Tests', icon: <FileQuestion size={20} /> },
          { id: 'analytics', label: 'Analytics', icon: <PieChart size={20} /> },
        ],
      },
      {
        section: 'Tools',
        links: [
          { id: 'resources', label: 'Resource Library', icon: <BookOpen size={20} /> },
          { id: 'bulk-certs', label: 'Bulk Certificates', icon: <Award size={20} /> },
          { id: 'upload', label: 'Upload Content', icon: <Upload size={20} /> },
          { id: 'certs', label: 'Issue Certificates', icon: <Award size={20} /> },
          { id: 'schedule', label: 'Live Sessions', icon: <Calendar size={20} /> },
        ],
      },
    ]

  const renderPage = () => {
    if (isStudent) {
      switch (activePage) {
        case 'dashboard': return <StudentDashboard onNavigate={setActivePage} />
        case 'resources': return <ResourceLibrary />
        case 'courses': return <MyCourses />
        case 'browse': return <BrowseCourses />
        case 'quiz': return <Quizzes />
        case 'logbook': return <FlightLogbook />
        case 'leaderboard': return <Leaderboard />
        case 'roadmap': return <CertificationRoadmap />
        case 'idcard': return <DigitalIDCard />
        case 'jobs': return <JobBoard />
        case 'radar': return <FlightRadar />
        case 'maintenance': return <MaintenanceTracker />
        case 'recordings': return <SessionRecordingHub />
        case 'forum': return <CommunityForum />
        case 'certs': return <Certificates onNavigate={setActivePage} />
        case 'progress': return <MyProgress />
        case 'notifications': return <Notifications />
        case 'profile': return <Profile />
        default: return <StudentDashboard onNavigate={setActivePage} />
      }
    } else {
      switch (activePage) {
        case 'dashboard': return <TrainerDashboard />
        case 'students': return <MyStudents />
        case 'courses': return <ManageCourses />
        case 'quizzes': return <TrainerQuizzes />
        case 'analytics': return <Analytics />
        case 'upload': return <UploadContent />
        case 'certs': return <IssueCertificates />
        case 'schedule': return <LiveSessions />
        case 'attendance': return <Attendance />
        case 'announcements': return <Announcements />
        case 'resources': return <ResourceLibrary />
        case 'bulk-certs': return <BulkCertificates />
        case 'notifications': return <Notifications />
        case 'profile': return <Profile />
        default: return <TrainerDashboard />
      }
    }
  }

  return (
    <div className="app-container">
      <TopNav onLogout={logout} onNavigate={setActivePage} />
      <div className="main-layout">
        <Sidebar items={sidebarItems} activePage={activePage} onNavigate={setActivePage} />
        <main className="content-area">
          {renderPage()}
        </main>
      </div>
      <AIFlightAssistant />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CourseProvider>
          <QuizProvider>
            <AppLayout />
          </QuizProvider>
        </CourseProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
