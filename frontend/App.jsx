import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import InstallPrompt from './components/InstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import CursorGlow from './components/CursorGlow';
import FloatingParticles from './components/FloatingParticles';
import PlanetBackground from './components/PlanetBackground';
import Ripple from './components/Ripple';
import PageTransition from './components/PageTransition';
import { ToastProvider } from './components/Toast';
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
import Pomodoro from './pages/app/Pomodoro';
import Flashcards from './pages/app/Flashcards';
import DailyQuiz from './pages/app/DailyQuiz';
import Notes from './pages/app/Notes';
import Formulas from './pages/app/Formulas';
import FocusMusic from './pages/app/FocusMusic';
import Refer from './pages/app/Refer';
import PhotoDoubt from './pages/app/PhotoDoubt';
import VoiceChat from './pages/app/VoiceChat';
import NoteSummarizer from './pages/app/NoteSummarizer';
import QuestionGenerator from './pages/app/QuestionGenerator';
import Roadmap from './pages/app/Roadmap';
import SRS from './pages/app/SRS';
import Highlighter from './pages/app/Highlighter';
import MindMap from './pages/app/MindMap';
import Cheatsheet from './pages/app/Cheatsheet';
import WeaknessHeatmap from './pages/app/WeaknessHeatmap';
import AdaptivePractice from './pages/app/AdaptivePractice';
import { I18nProvider } from './i18n';
import { XPProvider } from './xp';
import Leaderboard from './pages/app/Leaderboard';
import Challenges from './pages/app/Challenges';
import Tournament from './pages/app/Tournament';
import LootBox from './pages/app/LootBox';
import Pet from './pages/app/Pet';
import SkillTree from './pages/app/SkillTree';
import Calculator from './pages/app/Calculator';
import PeriodicTable from './pages/app/PeriodicTable';
import Whiteboard from './pages/app/Whiteboard';
import ExamChecklist from './pages/app/ExamChecklist';
import LastMinute from './pages/app/LastMinute';
import CalmMode from './pages/app/CalmMode';
import Meditation from './pages/app/Meditation';
import MoodTracker from './pages/app/MoodTracker';
import Hydration from './pages/app/Hydration';
import PerformanceDash from './pages/app/PerformanceDash';
import ScorePredictor from './pages/app/ScorePredictor';
import MistakeAnalysis from './pages/app/MistakeAnalysis';
import CareerExplorer from './pages/app/CareerExplorer';
import MockInterview from './pages/app/MockInterview';
import SOPWriter from './pages/app/SOPWriter';
import CollegeCompare from './pages/app/CollegeCompare';
import ScoreCard from './pages/app/ScoreCard';
import Certificate from './pages/app/Certificate';
import Wrapped from './pages/app/Wrapped';
import StudyBuddy from './pages/app/StudyBuddy';
import StudyRooms from './pages/app/StudyRooms';
import Messages from './pages/app/Messages';
import AskSenior from './pages/app/AskSenior';
import Announcements from './pages/app/Announcements';
import PYQ from './pages/app/PYQ';
import NCERT from './pages/app/NCERT';
import BioDiagrams from './pages/app/BioDiagrams';
import Premium from './pages/app/Premium';
import Mentorship from './pages/app/Mentorship';
import BooksStore from './pages/app/BooksStore';
import ExamCenter from './pages/app/ExamCenter';
import StoryGen from './pages/app/StoryGen';
import Discussions from './pages/app/Discussions';
import Internships from './pages/app/Internships';
import Workshops from './pages/app/Workshops';
import Podcast from './pages/app/Podcast';
import Molecule3D from './pages/app/Molecule3D';
import ThemeCustomizer from './pages/app/ThemeCustomizer';
import CounsellingBook from './pages/app/CounsellingBook';
import GroupChallenges from './pages/app/GroupChallenges';
import AlumniNet from './pages/app/AlumniNet';
import BadgePage from './pages/app/Achievements';
import Wallpapers from './pages/app/Wallpapers';
import ConceptArticles from './pages/app/ConceptArticles';
import Shortcuts from './pages/app/Shortcuts';
import GlobalSearch from './components/GlobalSearch';
import Mascot from './components/Mascot';
import OnboardingTour from './components/OnboardingTour';

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
    <I18nProvider>
    <ToastProvider>
    <XPProvider>
    <ScrollProgress />
    <InstallPrompt />
    <OfflineIndicator />
    <CursorGlow />
    <PlanetBackground />
    <FloatingParticles />
    <Ripple />
    <GlobalSearch />
    <Mascot />
    <OnboardingTour />
    <PageTransition>
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
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="flashcards" element={<Flashcards />} />
        <Route path="quiz" element={<DailyQuiz />} />
        <Route path="notes" element={<Notes />} />
        <Route path="formulas" element={<Formulas />} />
        <Route path="music" element={<FocusMusic />} />
        <Route path="refer" element={<Refer />} />
        <Route path="photo-doubt" element={<PhotoDoubt />} />
        <Route path="voice-chat" element={<VoiceChat />} />
        <Route path="summarize" element={<NoteSummarizer />} />
        <Route path="qgen" element={<QuestionGenerator />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="srs" element={<SRS />} />
        <Route path="highlighter" element={<Highlighter />} />
        <Route path="mindmap" element={<MindMap />} />
        <Route path="cheatsheet" element={<Cheatsheet />} />
        <Route path="heatmap" element={<WeaknessHeatmap />} />
        <Route path="adaptive" element={<AdaptivePractice />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="tournament" element={<Tournament />} />
        <Route path="lootbox" element={<LootBox />} />
        <Route path="pet" element={<Pet />} />
        <Route path="skilltree" element={<SkillTree />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="periodic" element={<PeriodicTable />} />
        <Route path="whiteboard" element={<Whiteboard />} />
        <Route path="examchecklist" element={<ExamChecklist />} />
        <Route path="lastminute" element={<LastMinute />} />
        <Route path="calm" element={<CalmMode />} />
        <Route path="meditation" element={<Meditation />} />
        <Route path="mood" element={<MoodTracker />} />
        <Route path="hydration" element={<Hydration />} />
        <Route path="performance" element={<PerformanceDash />} />
        <Route path="scorepredict" element={<ScorePredictor />} />
        <Route path="mistakes" element={<MistakeAnalysis />} />
        <Route path="career" element={<CareerExplorer />} />
        <Route path="interview" element={<MockInterview />} />
        <Route path="sop" element={<SOPWriter />} />
        <Route path="compare" element={<CollegeCompare />} />
        <Route path="scorecard" element={<ScoreCard />} />
        <Route path="certificate" element={<Certificate />} />
        <Route path="wrapped" element={<Wrapped />} />
        <Route path="buddy" element={<StudyBuddy />} />
        <Route path="rooms" element={<StudyRooms />} />
        <Route path="messages" element={<Messages />} />
        <Route path="senior" element={<AskSenior />} />
        <Route path="news" element={<Announcements />} />
        <Route path="pyq" element={<PYQ />} />
        <Route path="ncert" element={<NCERT />} />
        <Route path="biodiagrams" element={<BioDiagrams />} />
        <Route path="premium" element={<Premium />} />
        <Route path="mentorship" element={<Mentorship />} />
        <Route path="books" element={<BooksStore />} />
        <Route path="examcenter" element={<ExamCenter />} />
        <Route path="story" element={<StoryGen />} />
        <Route path="discussions" element={<Discussions />} />
        <Route path="internships" element={<Internships />} />
        <Route path="workshops" element={<Workshops />} />
        <Route path="podcast" element={<Podcast />} />
        <Route path="molecule" element={<Molecule3D />} />
        <Route path="theme" element={<ThemeCustomizer />} />
        <Route path="counselling" element={<CounsellingBook />} />
        <Route path="groups" element={<GroupChallenges />} />
        <Route path="alumni" element={<AlumniNet />} />
        <Route path="badges" element={<BadgePage />} />
        <Route path="wallpapers" element={<Wallpapers />} />
        <Route path="articles" element={<ConceptArticles />} />
        <Route path="shortcuts" element={<Shortcuts />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </PageTransition>
    </XPProvider>
    </ToastProvider>
    </I18nProvider>
  );
}
