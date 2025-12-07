import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Box, CircularProgress } from '@mui/material';

function ProtectedAdminRoute({ children }) {
    const { adminUser, loading } = useAdminAuth();

    // Afficher un loader pendant la vérification
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)',
                }}
            >
                <CircularProgress sx={{ color: '#fff' }} size={60} />
            </Box>
        );
    }

    // Rediriger vers la page de login admin si pas authentifié
    if (!adminUser || !adminUser.isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    // Afficher le contenu protégé
    return children;
}

export default ProtectedAdminRoute;
