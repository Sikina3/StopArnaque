import React, { createContext, useState, useEffect, useContext } from "react";

// Créer le contexte admin
const AdminAuthContext = createContext();

// Provider du contexte admin
export function AdminAuthProvider({ children }) {
    const [adminUser, setAdminUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem("adminUser");

        if (data) {
            try {
                const parsed = JSON.parse(data);
                // Vérifier que l'utilisateur a bien le statut admin
                if (parsed.isAdmin === true) {
                    setAdminUser(parsed);
                }
            } catch (error) {
                console.error("Erreur lors de la lecture des données admin:", error);
                localStorage.removeItem("adminUser");
            }
        }
        setLoading(false);
    }, []);

    const loginAdmin = (adminData) => {
        // S'assurer que l'utilisateur est bien admin
        const adminWithFlag = { ...adminData, isAdmin: true };
        localStorage.setItem("adminUser", JSON.stringify(adminWithFlag));
        setAdminUser(adminWithFlag);
    };

    const logoutAdmin = () => {
        localStorage.removeItem("adminUser");
        setAdminUser(null);
    };

    return (
        <AdminAuthContext.Provider value={{ adminUser, loginAdmin, logoutAdmin, loading }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte admin
export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider");
    }
    return context;
}
