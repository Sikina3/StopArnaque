import { Box, Container, Typography, Chip, Grid, Paper, Avatar, Divider, Button, CircularProgress, TextField, Dialog, DialogContent, IconButton } from "@mui/material";
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
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import imageDefault from "../../assets/Soya.png";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function SignalementDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [signalement, setSignalement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {

        const fetchSignalementDetails = async () => {
            try {
                setLoading(true);

                // 1. Récupérer les détails (pour les commentaires, etc.)
                const response = await api.get(`/signalements/${id}`, {
                    params: { utilisateur_id: user?.id }
                });
                setSignalement(response.data);
                setComments(response.data.commentaires || []);

                const responseList = await api.get('/signalements', {
                    params: { utilisateur_id: user?.id }
                });
                const currentFromList = responseList.data.find(s => s.id === parseInt(id));

                if (currentFromList) {
                    setLikes(currentFromList.likes_count || 0);
                    setCommentCount(currentFromList.commentaires_count || 0);
                    setLiked(currentFromList.isLiked || false);
                } else {
                    // Fallback si non trouvé dans la liste (peu probable)
                    setCommentCount(0);
                    setLikes(0);
                    setLiked(false);
                }

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
    }, [id, user]);

    const handleLike = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const newLiked = !liked;
        setLiked(newLiked);
        setLikes(prev => newLiked ? prev + 1 : prev - 1);

        try {
            await api.post('/reactions/toggle', { signalement_id: id });
        } catch (error) {
            console.error("Erreur like:", error);
            setLiked(!newLiked);
            setLikes(prev => newLiked ? prev - 1 : prev + 1);
        }
    };

    const handleCommentSubmit = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!newComment.trim()) return;

        try {
            const response = await api.post('/commentaires', {
                contenue: newComment,
                signalement_id: id,
                utilisateur_id: user.id
            });

            const createdComment = {
                ...response.data,
                utilisateur: user
            };

            setComments([createdComment, ...comments]);
            setNewComment("");
        } catch (error) {
            console.error("Erreur commentaire:", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Date inconnue";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const getImageUrl = (imageData) => {
        if (!imageData) return null;
        if (imageData.startsWith('data:') || imageData.startsWith('http')) return imageData;
        return `https://signaleo-backend-1.onrender.com/storage/${imageData}`;
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

                    <Box sx={{ maxWidth: "800px", mx: "auto" }}>
                        {/* Carte Principale */}
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: "1px solid #f0f0f0", backgroundColor: "#fff", mb: 4 }}>
                            {/* En-tête : Tags & Statut */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                                <Chip
                                    label={signalement.type}
                                    sx={{ backgroundColor: "rgba(31, 158, 249, 0.1)", color: "#1F9EF9", fontWeight: 700, borderRadius: 2 }}
                                />
                                <Chip
                                    icon={<CheckCircleIcon sx={{ fontSize: "1.1rem !important" }} />}
                                    label={signalement.status}
                                    color={signalement.status === 'Validé' ? "success" : "warning"}
                                    sx={{ fontWeight: 700, borderRadius: 2 }}
                                />
                            </Box>

                            {/* Titre */}
                            <Typography variant="h3" fontWeight={800} sx={{ fontFamily: "Lato", color: "#1A1A1A", mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
                                {signalement.titre}
                            </Typography>

                            {/* Métadonnées */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 3, color: "#999", mb: 4, flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="body2" fontWeight={500}>{formatDate(signalement.created_at)}</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 4 }} />

                            {/* Informations sur l'arnaqueur (Placées plus haut) */}
                            <Box sx={{ mb: 5, p: 3, borderRadius: 3, backgroundColor: "#fff9f0", border: "1px solid #ffeaa7" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                                    <WarningAmberIcon sx={{ color: "#ff9800" }} />
                                    <Typography variant="h6" fontWeight={700} sx={{ color: "#d35400" }}>
                                        Détails de l'arnaqueur
                                    </Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" sx={{ color: "#a0522d", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5 }}>
                                            Nom / Entité
                                        </Typography>
                                        <Typography variant="body1" fontWeight={700} sx={{ color: "#1A1A1A" }}>
                                            {signalement.signal?.nom || "Non spécifié"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" sx={{ color: "#a0522d", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5 }}>
                                            Contact
                                        </Typography>
                                        <Typography variant="body1" fontWeight={700} sx={{ color: "#1A1A1A" }}>
                                            {signalement.signal?.contact || "Non spécifié"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Description */}
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1A1A1A" }}>
                                Description des faits
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#444", mb: 5, whiteSpace: 'pre-line' }}>
                                {signalement.description}
                            </Typography>

                            {/* Preuves */}
                            {signalement.preuves && signalement.preuves.length > 0 && (
                                <Box sx={{ mb: 5 }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                                        <ImageIcon sx={{ color: "#1F9EF9" }} />
                                        Preuves jointes ({signalement.preuves.length})
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            overflowX: "auto",
                                            pb: 2,
                                            "&::-webkit-scrollbar": { height: 8 },
                                            "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1", borderRadius: 10 },
                                            "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: 10, "&:hover": { backgroundColor: "#bbb" } }
                                        }}
                                    >
                                        {signalement.preuves.map((preuve, index) => (
                                            <Box
                                                key={index}
                                                onClick={() => setSelectedImage(getImageUrl(preuve.image) || imageDefault)}
                                                sx={{
                                                    flexShrink: 0,
                                                    width: { xs: 240, md: 320 },
                                                    height: 200,
                                                    borderRadius: 3,
                                                    overflow: "hidden",
                                                    border: "1px solid #eee",
                                                    cursor: "pointer",
                                                    transition: "transform 0.2s",
                                                    "&:hover": { transform: "scale(1.02)" }
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={getImageUrl(preuve.image) || imageDefault}
                                                    alt={`Preuve ${index + 1}`}
                                                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* Interactions */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 4, pt: 3, borderTop: "1px solid #f0f0f0" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={handleLike}>
                                    {liked ? <FavoriteIcon sx={{ color: "#e74c3c", fontSize: 28 }} /> : <FavoriteBorderOutlinedIcon sx={{ color: "#999", fontSize: 28 }} />}
                                    <Typography variant="h6" fontWeight={700} sx={{ color: liked ? "#e74c3c" : "#666" }}>{likes}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <ChatBubbleOutlineIcon sx={{ color: "#999", fontSize: 28 }} />
                                    <Typography variant="h6" fontWeight={700} sx={{ color: "#666" }}>{commentCount}</Typography>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Section Commentaires */}
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" fontWeight={800} sx={{ mb: 4, color: "#1A1A1A" }}>
                                Discussion ({commentCount})
                            </Typography>

                            {/* Zone de saisie */}
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #f0f0f0", mb: 5 }}>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Avatar sx={{ bgcolor: "#1F9EF9", width: 48, height: 48 }}>
                                        {user?.name ? user.name[0].toUpperCase() : <PersonIcon />}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={3}
                                            placeholder={user ? "Partagez votre avis ou votre expérience..." : "Connectez-vous pour participer à la discussion"}
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            disabled={!user}
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ p: 1, fontSize: "1.1rem" }}
                                        />
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleCommentSubmit}
                                                disabled={!newComment.trim() || !user}
                                                sx={{
                                                    borderRadius: 3,
                                                    px: 4,
                                                    py: 1,
                                                    textTransform: "none",
                                                    fontWeight: 700,
                                                    backgroundColor: "#1F9EF9",
                                                    boxShadow: "none",
                                                    "&:hover": { backgroundColor: "#1A8ED9", boxShadow: "none" }
                                                }}
                                            >
                                                Publier le commentaire
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>

                            {/* Liste des commentaires */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                {comments.map((comment) => (
                                    <Box key={comment.id} sx={{ display: "flex", gap: 2 }}>
                                        <Avatar sx={{ bgcolor: `hsl(${(comment.utilisateur?.id * 137) % 360}, 65%, 50%)`, width: 44, height: 44 }}>
                                            {comment.utilisateur?.name ? comment.utilisateur.name[0].toUpperCase() : "U"}
                                        </Avatar>
                                        <Box sx={{ flex: 1, p: 2.5, borderRadius: 3, backgroundColor: "#fff", border: "1px solid #f0f0f0" }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight={700}>{comment.utilisateur?.name || "Utilisateur"}</Typography>
                                                <Typography variant="caption" sx={{ color: "#999" }}>{formatDate(comment.created_at)}</Typography>
                                            </Box>
                                            <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.6 }}>
                                                {comment.contenue}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Footer />

            {/* Modal de Zoom pour les Preuves */}
            <Dialog
                open={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: { backgroundColor: "transparent", boxShadow: "none", overflow: "hidden" }
                }}
            >
                <DialogContent sx={{ p: 0, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
                    <IconButton
                        onClick={() => setSelectedImage(null)}
                        sx={{ position: "absolute", top: 10, right: 10, color: "#fff", backgroundColor: "rgba(0,0,0,0.5)", "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }, zIndex: 1 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        component="img"
                        src={selectedImage}
                        sx={{
                            maxWidth: "100%",
                            maxHeight: "90vh",
                            objectFit: "contain",
                            borderRadius: 2,
                            boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SignalementDetails;
