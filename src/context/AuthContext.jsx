import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

// Créer le contexte
const AuthContext = createContext();

// Provider du contexte
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            const data = localStorage.getItem("user");

            if (data) {
                const parsed = JSON.parse(data);
                console.log("Les données: ", parsed.pseudo);
                setUser(parsed);

                try {
                    // Vérifier si l'utilisateur existe toujours en base de données
                    await api.get(`/users/${parsed.id}`);
                } catch (error) {
                    console.error("Erreur de vérification de l'utilisateur:", error);
                    // Si l'utilisateur n'existe pas (404) ou non autorisé (401), on déconnecte
                    if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                        localStorage.removeItem("user");
                        setUser(null);
                    }
                }
            }
        };

        verifyUser();
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
