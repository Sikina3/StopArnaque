import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SubmissionStatus = ({ isSuccess }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate('/signalements');
            }, 20000); // 20 seconds

            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                p: 3
            }}
        >
            {!isSuccess ? (
                <>
                    <CircularProgress size={60} sx={{ mb: 4, color: '#1F9EF9' }} />
                    <Typography variant="h6" color="text.secondary">
                        Envoi de votre signalement en cours...
                    </Typography>
                </>
            ) : (
                <>
                    <CheckCircle sx={{ fontSize: 100, color: '#2e7d32', mb: 3 }} />
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Signalement envoyé avec succès !
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
                        Votre signalement est bien envoyé à l'admin, il s'affichera dès que ce sera examiné.
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        Vous serez redirigé vers la liste des signalements dans quelques instants...
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default SubmissionStatus;
