import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

// Créer le contexte
const AuthContext = createContext();

// Provider du contexte
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const data = localStorage.getItem("user");

            if (data) {
                const parsed = JSON.parse(data);
                setUser(parsed);

                try {
                    const response = await api.get(`/users/${parsed.id}`);
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                } catch (error) {
                    console.error("Erreur de vérification de l'utilisateur:", error);
                    if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                        localStorage.removeItem("user");
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };

        verifyUser();
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
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
