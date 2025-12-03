import { Box, Container, Typography, Chip, Grid, Paper, Avatar, Divider, Button } from "@mui/material";
import { useState } from "react";
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
import image from "../../assets/Soya.png";

function SignalementDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);

    // Données fictives - à remplacer par un appel API avec l'ID
    const signalement = {
        id: id,
        titre: "Faux support technique Microsoft",
        categorie: "Phishing",
        statut: "Validé",
        datePublication: "26 octobre 2023",
        description: "J'ai reçu un appel d'une personne se faisant passer pour le support technique de Microsoft. Cette personne m'a informé que mon ordinateur était infecté par un virus et qu'elle devait y accéder à distance pour le nettoyer. Heureusement, j'ai reconnu qu'il s'agissait d'une arnaque avant de donner accès à mon ordinateur.",
        arnaqueur: {
            nom: "Jean Dupont (faux nom)",
            telephone: "+33 1 23 45 67 89",
            email: "support@micros0ft-help.com",
            autresInfos: "Se fait passer pour un technicien Microsoft certifié"
        },
        preuves: [
            { type: "image", url: image, description: "Capture d'écran de l'email frauduleux" },
            { type: "image", url: image, description: "Numéro de téléphone utilisé" },
            { type: "image", url: image, description: "Site web frauduleux" }
        ],
        publicateur: {
            pseudo: "Marie84",
            dateInscription: "Janvier 2023",
            signalements: 3
        },
        likes: 12,
        comments: 8
    };

    return (
        <>
            <TopNav />
            <Box sx={{ width: "100%", marginTop: "64px", minHeight: "100vh", backgroundColor: "#f8f9fa", pb: 6 }}>
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    {/* Bouton retour */}
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
                        {/* Colonne principale */}
                        <Grid item xs={12} md={8}>
                            {/* En-tête du signalement */}
                            <Paper
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    mb: 4,
                                    border: "1px solid #f0f0f0"
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                                    <Chip
                                        label={signalement.categorie}
                                        sx={{
                                            backgroundColor: "rgba(31, 158, 249, 0.1)",
                                            color: "#1F9EF9",
                                            fontWeight: 600,
                                            fontSize: "0.9rem"
                                        }}
                                    />
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label={signalement.statut}
                                        color="success"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>

                                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ fontFamily: "Lato", color: "#1A1A1A" }}>
                                    {signalement.titre}
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#999", mb: 3 }}>
                                    <CalendarTodayIcon fontSize="small" />
                                    <Typography variant="body2">Publié le {signalement.datePublication}</Typography>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "Lato", mb: 2 }}>
                                    Description de l'arnaque
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#333", fontFamily: "Lato" }}>
                                    {signalement.description}
                                </Typography>
                            </Paper>

                            {/* Informations sur l'arnaqueur */}
                            <Paper
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    mb: 4,
                                    border: "1px solid #f0f0f0",
                                    backgroundColor: "#fff9f0"
                                }}
                            >
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
                                                <Typography variant="caption" color="text.secondary">Nom</Typography>
                                                <Typography variant="body1" fontWeight={600}>{signalement.arnaqueur.nom}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                            <PhoneIcon sx={{ color: "#666" }} />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Téléphone</Typography>
                                                <Typography variant="body1" fontWeight={600}>{signalement.arnaqueur.telephone}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                            <EmailIcon sx={{ color: "#666" }} />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Email</Typography>
                                                <Typography variant="body1" fontWeight={600}>{signalement.arnaqueur.email}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="caption" color="text.secondary">Informations supplémentaires</Typography>
                                        <Typography variant="body2" sx={{ mt: 0.5 }}>{signalement.arnaqueur.autresInfos}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* Preuves */}
                            <Paper
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    mb: 4,
                                    border: "1px solid #f0f0f0"
                                }}
                            >
                                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "Lato", mb: 3 }}>
                                    <ImageIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                                    Preuves soumises ({signalement.preuves.length})
                                </Typography>

                                <Grid container spacing={3}>
                                    {signalement.preuves.map((preuve, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Paper
                                                sx={{
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                    border: "1px solid #e0e0e0",
                                                    transition: "transform 0.3s ease",
                                                    "&:hover": {
                                                        transform: "scale(1.05)",
                                                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                                                    }
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={preuve.url}
                                                    alt={preuve.description}
                                                    sx={{
                                                        width: "100%",
                                                        height: "200px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                                <Box sx={{ p: 2 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {preuve.description}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Sidebar */}
                        <Grid item xs={12} md={4}>
                            {/* Publicateur */}
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    mb: 3,
                                    border: "1px solid #f0f0f0"
                                }}
                            >
                                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "Lato", mb: 2 }}>
                                    Publié par
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                    <Avatar sx={{ bgcolor: "#1F9EF9", width: 50, height: 50 }}>
                                        {signalement.publicateur.pseudo[0]}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>{signalement.publicateur.pseudo}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Membre depuis {signalement.publicateur.dateInscription}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="body2" color="text.secondary">
                                    {signalement.publicateur.signalements} signalements publiés
                                </Typography>
                            </Paper>

                            {/* Actions */}
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    border: "1px solid #f0f0f0"
                                }}
                            >
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
                                                "&:hover": {
                                                    background: "linear-gradient(45deg, #c0392b 30%, #a93226 90%)"
                                                }
                                            } : {
                                                borderColor: "#e74c3c",
                                                color: "#e74c3c",
                                                "&:hover": {
                                                    borderColor: "#c0392b",
                                                    backgroundColor: "rgba(231, 76, 60, 0.1)"
                                                }
                                            })
                                        }}
                                    >
                                        {liked ? "Aimé" : "J'aime"} ({signalement.likes + (liked ? 1 : 0)})
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
                                            "&:hover": {
                                                borderColor: "#008ae6",
                                                backgroundColor: "rgba(31, 158, 249, 0.1)"
                                            }
                                        }}
                                    >
                                        Commenter ({signalement.comments})
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
