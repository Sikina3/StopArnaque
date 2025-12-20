import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Container,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post("/login", {
                phone: email, // On utilise le champ email pour le phone
                password,
            });

            const userData = res.data.user;

            if (userData.admin === true || userData.admin === 1 || userData.admin === "1") {
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                navigate('/admin/dashboard');
            } else {
                setError("Accès refusé : Vous n'avez pas les droits d'administrateur.");
            }
        } catch (err) {
            console.error(err);
            setError("Identifiants incorrects ou erreur serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background decoration */}
            <Box sx={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                top: '-200px',
                right: '-200px',
            }} />
            <Box sx={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                bottom: '-150px',
                left: '-150px',
            }} />

            <Container maxWidth="sm">
                <Card sx={{
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <CardContent sx={{ p: 5 }}>
                        {/* Logo/Icon */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1F9EF9 0%, #21CBF3 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                mb: 2,
                            }}>
                                <AdminIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </Box>
                            <Typography variant="h4" fontWeight={800} gutterBottom>
                                Administration
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#6b7280' }}>
                                Connectez-vous pour accéder au panneau d'administration
                            </Typography>
                        </Box>

                        {/* Login Form */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <form onSubmit={handleLogin}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    label="Email administrateur"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                />

                                <TextField
                                    label="Mot de passe"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        background: 'linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)',
                                        boxShadow: '0 4px 14px 0 rgba(31, 158, 249, 0.4)',
                                        '&:hover': {
                                            boxShadow: '0 6px 20px 0 rgba(31, 158, 249, 0.5)',
                                        }
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Se connecter"}
                                </Button>
                            </Box>
                        </form>

                        {/* Back to home */}
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Button
                                onClick={() => navigate('/')}
                                sx={{
                                    textTransform: 'none',
                                    color: '#6b7280',
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        color: '#1F9EF9',
                                    }
                                }}
                            >
                                ← Retour à l'accueil
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default AdminLogin;
