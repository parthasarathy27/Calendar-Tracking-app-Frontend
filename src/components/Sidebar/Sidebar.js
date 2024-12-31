import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Correct relative path
import './Sidebar.css';

const Sidebar = () => {
    const { user } = useContext(AuthContext);

    // Define menu items based on the user's role
    const menuItems = [
        { label: "Dashboard", path: "/" },
        ...(user.role === "admin" ? [
            { label: "Admin Panel", path: "/admin" },
            { label: "User Management", path: "/users" }
        ] : []),
        { label: "Calendar", path: "/calendar" }
    ];

    return (
        <aside className="sidebar">
            <p>Welcome, {user.name || "Guest"}</p>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.path}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
