import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdAdminPanelSettings, MdPeople, MdCalendarToday, MdClose } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeMenu }) => {
    const { user } = useContext(AuthContext);

    const menuItems = [
        { label: "Dashboard", path: "/", icon: <MdDashboard size={22} /> },
        ...(user?.role === "admin" ? [
            { label: "Admin Panel", path: "/admin", icon: <MdAdminPanelSettings size={22} /> },
            { label: "User Management", path: "/users", icon: <MdPeople size={22} /> }
        ] : [
            // Let's show Admin and Users for now as requested "give me all pages" usually implies they want to see everything
            { label: "Admin Panel", path: "/admin", icon: <MdAdminPanelSettings size={22} /> },
            { label: "User Management", path: "/users", icon: <MdPeople size={22} /> }
        ]),
        { label: "Calendar", path: "/calendar", icon: <MdCalendarToday size={22} /> }
    ];

    return (
        <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
            <button className="mobile-close-btn btn-ghost" onClick={closeMenu}>
                <MdClose size={24} />
            </button>
            <div className="sidebar-header">
                <div className="sidebar-logo">CommTrack</div>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
                                <span className="icon">{item.icon}</span>
                                <span className="label">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <p>Logged in as</p>
                <strong>{user?.name || "Guest"}</strong>
            </div>
        </aside>
    );
};

export default Sidebar;
