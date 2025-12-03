import { Box, Typography, Grid, Card, Button, Container, Stack } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from "react-router-dom";

function WelcomConnect() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const stats = [
        { label: "Signalements soumis", value: 12, icon: <SecurityIcon fontSize="large" color="primary" /> },
        { label: "Signalements Validés", value: 12, icon: <ChecklistIcon fontSize="large" color="success" /> },
        { label: "Favoris", value: 12, icon: <FavoriteBorderIcon fontSize="large" color="error" /> },
    ];

    return (
        <Box sx={{ width: "100%", marginTop: "64px", minHeight: "80vh", bgcolor: "#f8f9fa", paddingBottom: 8 }}>
            {/* Hero Section */}
            <Box sx={{
                background: "linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)",
                color: "white",
                py: 8,
                px: 2,
                textAlign: "center",
                borderBottomLeftRadius: "50% 20%",
                borderBottomRightRadius: "50% 20%",
                mb: 6,
                boxShadow: 3
            }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom sx={{ fontFamily: 'Lato, sans-serif' }}>
                        Bonjour, {user.pseudo} !
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, fontFamily: 'Lato, sans-serif' }}>
                        Heureux de vous revoir. Ensemble, rendons internet plus sûr.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Stats Grid */}
                <Grid container spacing={4} sx={{ mb: 8 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                p: 3,
                                borderRadius: 4,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <Box sx={{ mr: 3, p: 2, borderRadius: '50%', bgcolor: 'rgba(31, 158, 249, 0.1)' }}>
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" fontWeight="medium">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Actions Section */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4, fontFamily: 'Lato, sans-serif' }}>
                        Que souhaitez-vous faire aujourd'hui ?
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center">
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/signaler")}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 3,
                                fontSize: '1rem',
                                textTransform: 'none',
                                boxShadow: '0 4px 14px 0 rgba(31, 158, 249, 0.4)',
                                background: "linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)",
                                fontWeight: 'bold'
                            }}
                        >
                            Nouveau signalement
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<ChecklistIcon />}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 3,
                                fontSize: '1rem',
                                textTransform: 'none',
                                borderWidth: 2,
                                borderColor: '#e0e0e0',
                                color: '#555',
                                '&:hover': { borderWidth: 2, borderColor: '#1F9EF9', color: '#1F9EF9', bgcolor: 'transparent' },
                                fontWeight: 'bold'
                            }}
                        >
                            Mes signalements
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<FavoriteBorderIcon />}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 3,
                                fontSize: '1rem',
                                textTransform: 'none',
                                borderWidth: 2,
                                borderColor: '#e0e0e0',
                                color: '#555',
                                '&:hover': { borderWidth: 2, borderColor: '#1F9EF9', color: '#1F9EF9', bgcolor: 'transparent' },
                                fontWeight: 'bold'
                            }}
                        >
                            Mes Favoris
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

export default WelcomConnect;