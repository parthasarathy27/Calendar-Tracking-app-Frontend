import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import CalendarPage from './pages/CalendarPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <AuthProvider>
            <Router>
                <div className={darkMode ? 'app dark-mode' : 'app light-mode'}>
                    <header className="app-header">
                        <h1>Communication Tracker</h1>
                        <button onClick={toggleDarkMode} className="dark-mode-toggle">
                            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </button>
                        <nav className="app-nav">
                            <Link to="/">Dashboard</Link>
                            <Link to="/admin">Admin</Link>
                            <Link to="/users">Users</Link>
                            <Link to="/calendar">Calendar</Link>
                        </nav>
                    </header>
                    <main className="app-main">
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/users" element={<UserPage />} />
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;