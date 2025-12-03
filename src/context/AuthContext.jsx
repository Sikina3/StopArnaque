import React, { createContext, useState, useEffect, useContext } from "react";

// Créer le contexte
const AuthContext = createContext();

// Provider du contexte
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("user");

        if (data) {
            const parsed = JSON.parse(data);
            console.log("Les données: ", parsed.pseudo);
            setUser(parsed);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
