import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import InstallPrompt from './components/InstallPrompt';
import Home from './pages/Home';
import NEETPrep from './pages/NEETPrep';
import JEEPrep from './pages/JEEPrep';
import CollegesPage from './pages/CollegesPage';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import AppLayout from './pages/app/AppLayout';
import Dashboard from './pages/app/Dashboard';
import AITutor from './pages/app/AITutor';
import MockTest from './pages/app/MockTest';
import RankPredictor from './pages/app/RankPredictor';
import CollegeFinder from './pages/app/CollegeFinder';
import BranchGuide from './pages/app/BranchGuide';
import StudyPlanner from './pages/app/StudyPlanner';
import Forum from './pages/app/Forum';
import Videos from './pages/app/Videos';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
    <ScrollProgress />
    <InstallPrompt />
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/neet" element={<PublicLayout><NEETPrep /></PublicLayout>} />
      <Route path="/jee" element={<PublicLayout><JEEPrep /></PublicLayout>} />
      <Route path="/colleges-info" element={<PublicLayout><CollegesPage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
      <Route path="/login" element={<Login />} />

      {/* App routes (logged-in) */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tutor" element={<AITutor />} />
        <Route path="mocktest" element={<MockTest />} />
        <Route path="rank" element={<RankPredictor />} />
        <Route path="colleges" element={<CollegeFinder />} />
        <Route path="branch" element={<BranchGuide />} />
        <Route path="planner" element={<StudyPlanner />} />
        <Route path="forum" element={<Forum />} />
        <Route path="videos" element={<Videos />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}
