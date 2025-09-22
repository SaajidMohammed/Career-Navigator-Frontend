import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import HeroPage from './pages/HeroPage/HeroPage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import ChatPage from './pages/ChatPage/ChatPage.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import PredictCareerPage from './pages/PredictCareer/PredictCareer.jsx';
import AboutPage from './pages/About/About.jsx';
import SkillGapPage from './pages/SkillGapPage/SkillGapPage.jsx';
import CareerRoadmapPage from './pages/CareerRoadMapPage/CareerRoadMapPage.jsx';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HeroPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/predict-career" element={<PredictCareerPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skill-gap/:id" element={<SkillGapPage />} />
              <Route path="/career-roadmap/:id" element={<CareerRoadmapPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;