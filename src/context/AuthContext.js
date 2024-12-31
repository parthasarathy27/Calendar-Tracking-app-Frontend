import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'Guest' }); // Default user

    const login = (name) => setUser({ name });
    const logout = () => setUser({ name: 'Guest' });

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};