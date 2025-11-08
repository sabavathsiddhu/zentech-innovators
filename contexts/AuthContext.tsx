
import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

// Fix: Provide content for AuthContext.tsx, which was a placeholder file.
// This file sets up a simple authentication context for managing user state.

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FIX: Use PropsWithChildren to correctly type the component that accepts children.
// This resolves the error in App.tsx where TypeScript couldn't infer the 'children' prop.
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        // In a real app, you'd perform validation or an API call here
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};