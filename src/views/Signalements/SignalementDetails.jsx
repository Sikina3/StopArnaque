import { Box, Container, Typography, Chip, Grid, Paper, Avatar, Divider, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';
import imageDefault from "../../assets/Soya.png";
import api from "../../services/api";

function SignalementDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [signalement, setSignalement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSignalementDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/signalements/${id}`);
                console.log("Détails signalement:", response.data);
                setSignalement(response.data);
                setError(null);
            } catch (err) {
                console.error("Erreur récupération détails:", err);
                setError("Impossible de charger les détails du signalement.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSignalementDetails();
        }
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return "Date inconnue";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const getImageUrl = (imageData) => {
        if (!imageData) return null;
        if (imageData.startsWith('data:') || imageData.startsWith('http')) return imageData;
        // Assuming it's a storage path
        return `https://verlie-nonprosperous-pearl.ngrok-free.dev/storage/${imageData}`;
    };

    if (loading) {
        return (
            <>
                <TopNav />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', pt: "64px" }}>
                    <CircularProgress size={60} sx={{ color: '#1F9EF9' }} />
                </Box>
                <Footer />
            </>
        );
    }

    if (error || !signalement) {
        return (
            <>
                <TopNav />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', pt: "64px" }}>
                    <Typography variant="h5" color="error" gutterBottom>{error || "Signalement introuvable"}</Typography>
                    <Button variant="contained" onClick={() => navigate('/signalements')}>Retour à la liste</Button>
                </Box>
                <Footer />
            </>
        );
    }

    return (
        <>
            <TopNav />
            <Box sx={{ width: "100%", marginTop: "64px", minHeight: "100vh", backgroundColor: "#f8f9fa", pb: 6 }}>
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        sx={{
                            mb: 4,
                            textTransform: "none",
                            color: "#1F9EF9",
                            fontWeight: 600,
                            "&:hover": { backgroundColor: "rgba(31, 158, 249, 0.1)" }
                        }}
                    >
                        Retour aux signalements
                    </Button>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ p: 4, borderRadius: 3, mb: 4, border: "1px solid #f0f0f0" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                                    <Chip
                                        label={signalement.type}
                                        sx={{ backgroundColor: "rgba(31, 158, 249, 0.1)", color: "#1F9EF9", fontWeight: 600, fontSize: "0.9rem" }}
                                    />
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label={signalement.status}
                                        color={signalement.status === 'Validé' ? "success" : "warning"}
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>

                                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ fontFamily: "Lato", color: "#1A1A1A" }}>
                                    {signalement.titre}
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#999", mb: 3 }}>
                                    <CalendarTodayIcon fontSize="small" />
                                    <Typography variant="body2">Publié le {formatDate(signalement.created_at)}</Typography>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "Lato", mb: 2 }}>
                                    Description de l'arnaque
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#333", fontFamily: "Lato", whiteSpace: 'pre-line' }}>
                                    {signalement.description}
                                </Typography>
                            </Paper>

                            <Paper sx={{ p: 4, borderRadius: 3, mb: 4, border: "1px solid #f0f0f0", backgroundColor: "#fff9f0" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                                    <WarningAmberIcon sx={{ color: "#ff9800", fontSize: "2rem" }} />
                                    <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "Lato", color: "#ff9800" }}>
                                        Informations sur l'arnaqueur
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                            <PersonIcon sx={{ color: "#666" }} />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Nom / Entité</Typography>
                                                <Typography variant="body1" fontWeight={600}>{signalement.signal?.nom || "Non spécifié"}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                            <PhoneIcon sx={{ color: "#666" }} />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Contact (Tél/Email)</Typography>
                                                <Typography variant="body1" fontWeight={600}>{signalement.signal?.contact || "Non spécifié"}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>

                            {signalement.preuves && signalement.preuves.length > 0 && (
                                <Paper sx={{ p: 4, borderRadius: 3, mb: 4, border: "1px solid #f0f0f0" }}>
                                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "Lato", mb: 3 }}>
                                        <ImageIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                                        Preuves soumises ({signalement.preuves.length})
                                    </Typography>

                                    <Grid container spacing={3}>
                                        {signalement.preuves.map((preuve, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Paper sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #e0e0e0", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" } }}>
                                                    <Box
                                                        component="img"
                                                        src={getImageUrl(preuve.image) || imageDefault}
                                                        alt={`Preuve ${index + 1}`}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.style.display = 'none';
                                                            e.target.parentNode.style.backgroundColor = '#f0f0f0';
                                                            e.target.parentNode.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;color:#999;padding:20px;text-align:center;font-size:0.8rem">Image non disponible</div>';
                                                        }}
                                                        sx={{ width: "100%", height: "200px", objectFit: "cover" }}
                                                    />
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                            )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 3, borderRadius: 3, mb: 3, border: "1px solid #f0f0f0" }}>
                                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "Lato", mb: 2 }}>
                                    Publié par
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                    <Avatar sx={{ bgcolor: "#1F9EF9", width: 50, height: 50 }}>
                                        {signalement.utilisateur?.name ? signalement.utilisateur.name[0].toUpperCase() : "A"}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>
                                            {signalement.utilisateur?.name || "Anonyme"}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Membre de la communauté
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>

                            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #f0f0f0" }}>
                                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "Lato", mb: 3 }}>
                                    Interactions
                                </Typography>

                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Button
                                        variant={liked ? "contained" : "outlined"}
                                        startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        onClick={() => setLiked(!liked)}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            py: 1.5,
                                            ...(liked ? {
                                                background: "linear-gradient(45deg, #e74c3c 30%, #c0392b 90%)",
                                                "&:hover": { background: "linear-gradient(45deg, #c0392b 30%, #a93226 90%)" }
                                            } : {
                                                borderColor: "#e74c3c",
                                                color: "#e74c3c",
                                                "&:hover": { borderColor: "#c0392b", backgroundColor: "rgba(231, 76, 60, 0.1)" }
                                            })
                                        }}
                                    >
                                        {liked ? "Aimé" : "J'aime"} (0)
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        startIcon={<ChatBubbleOutlineIcon />}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            py: 1.5,
                                            borderColor: "#1F9EF9",
                                            color: "#1F9EF9",
                                            "&:hover": { borderColor: "#008ae6", backgroundColor: "rgba(31, 158, 249, 0.1)" }
                                        }}
                                    >
                                        Commenter (0)
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default SignalementDetails;
