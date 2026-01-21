
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import { mockUsers } from './constants';
import AuthContext from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PracticeArena from './pages/PracticeArena';
import CompanyZones from './pages/CompanyZones';
import InterviewExperiences from './pages/InterviewExperiences';
import ResumeATSScorer from './pages/ResumeATSScorer';
import DriveManagement from './pages/DriveManagement';
import ContentManagement from './pages/ContentManagement';
import ExperienceSubmission from './pages/ExperienceSubmission';
import ResumeBuilder from './pages/ResumeBuilder';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, role: UserRole) => {
    const user = mockUsers.find(u => u.email === email && u.role === role);
    setCurrentUser(user || mockUsers[0]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const authContextValue = useMemo(() => ({
    user: currentUser,
    login,
    logout,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <HashRouter>
        <Routes>
          {!currentUser ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {currentUser.role === UserRole.Student && (
                <>
                  <Route path="/practice" element={<PracticeArena />} />
                  <Route path="/companies" element={<CompanyZones />} />
                  <Route path="/experiences" element={<InterviewExperiences />} />
                  <Route path="/resume-builder" element={<ResumeBuilder />} />
                  <Route path="/resume-scorer" element={<ResumeATSScorer />} />
                </>
              )}
              {currentUser.role === UserRole.Admin && (
                <>
                  <Route path="/drives" element={<DriveManagement />} />
                  <Route path="/content" element={<ContentManagement />} />
                </>
              )}
              {currentUser.role === UserRole.Alumni && (
                <Route path="/submit-experience" element={<ExperienceSubmission />} />
              )}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          )}
          <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
