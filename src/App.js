import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import CalendarPage from './pages/CalendarPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const AppContent = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={theme === 'dark' ? 'app dark-mode' : 'app'}>
            <Navbar theme={theme} toggleTheme={toggleTheme} toggleMobileMenu={toggleMobileMenu} />
            <Layout isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;