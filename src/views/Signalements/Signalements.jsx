import { Box, Container, Typography, Button, Grid, Select, MenuItem, FormControl, CircularProgress } from "@mui/material";
import { Input } from "@mui/joy";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import CardSignalement from "../../components/CardSignalement";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Signalements() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");
    const [signalements, setSignalements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les signalements depuis l'API
    useEffect(() => {
        const fetchSignalements = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const response = await api.get('/signalements', {
                    params: { utilisateur_id: user.id }
                });

                // Vérifier que la réponse est bien un tableau
                if (Array.isArray(response.data)) {
                    setSignalements(response.data);
                    setError(null);
                } else {
                    console.error('Format de données invalide:', response.data);
                    setError('Format de données invalide reçu du serveur.');
                }
            } catch (err) {
                console.error('Erreur lors de la récupération des signalements:', err);
                setError('Impossible de charger les signalements. Veuillez réessayer plus tard.');
            } finally {
                setLoading(false);
            }
        };

        fetchSignalements();
    }, [user]);

    // Fonction pour calculer le temps écoulé depuis la création
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} secondes`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} heures`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} jours`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} semaines`;
        return `${Math.floor(diffInSeconds / 2592000)} mois`;
    };

    // Filtrer les signalements
    const filteredSignalements = signalements
        .filter(s => s.status === 'Validé')
        .filter((signal) => {
            const matchesSearch = searchTerm === "" ||
                signal.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                signal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (signal.signal?.nom && signal.signal.nom.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesType = typeFilter === "all" || signal.type.toLowerCase() === typeFilter.toLowerCase();
            const matchesStatus = statusFilter === "all" || signal.status.toLowerCase().includes(statusFilter.toLowerCase());

            return matchesSearch && matchesType && matchesStatus;
        });

    const handleApplyFilters = () => {
        console.log("Filtres appliqués:", { searchTerm, typeFilter, statusFilter, dateFilter });
    };

    return (
        <>
            <TopNav />
            <Box sx={{ width: "100%", pt: { xs: "70px", md: "90px" }, minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    {/* Header */}
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{ fontFamily: "Lato", color: "#1A1A1A", mb: 1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}
                        >
                            Liste des signalements
                        </Typography>
                        <Box
                            sx={{
                                width: "100px",
                                height: "4px",
                                background: "linear-gradient(90deg, #1F9EF9 0%, #21CBF3 100%)",
                                borderRadius: 2
                            }}
                        />
                    </Box>

                    {/* Filtres */}
                    <Box
                        sx={{
                            backgroundColor: "white",
                            p: 4,
                            borderRadius: 4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            mb: 6
                        }}
                    >
                        <Grid container spacing={3} alignItems="flex-end">
                            <Grid item xs={12} md={3}>
                                <Typography variant="body2" fontWeight={600} sx={{ mb: 1, fontFamily: "Lato", color: "#565d6d" }}>
                                    Rechercher par mot-clé
                                </Typography>
                                <Input
                                    placeholder="Nom, entreprise, numéro..."
                                    startDecorator={<SearchIcon sx={{ color: "#1F9EF9" }} />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    sx={{
                                        width: "100%",
                                        height: "40px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        "&:focus-within": {
                                            boxShadow: "0 4px 12px rgba(31, 158, 249, 0.2)"
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={2.5}>
                                <Typography variant="body2" fontWeight={600} sx={{ mb: 1, fontFamily: "Lato", color: "#565d6d" }}>
                                    Type de signalement
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        sx={{
                                            borderRadius: 2,
                                            height: "40px",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                            fontFamily: "Lato"
                                        }}
                                    >
                                        <MenuItem value="all">Tous les types</MenuItem>
                                        <MenuItem value="phishing">Phishing</MenuItem>
                                        <MenuItem value="emploi">Faux emplois</MenuItem>
                                        <MenuItem value="investissement">Faux investissements</MenuItem>
                                        <MenuItem value="smishing">Smishing</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={2.5}>
                                <Typography variant="body2" fontWeight={600} sx={{ mb: 1, fontFamily: "Lato", color: "#565d6d" }}>
                                    Statut
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        sx={{
                                            borderRadius: 2,
                                            height: "40px",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                            fontFamily: "Lato"
                                        }}
                                    >
                                        <MenuItem value="all">Tous les statuts</MenuItem>
                                        <MenuItem value="valide">Validé</MenuItem>
                                        <MenuItem value="attente">En attente</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={2.5}>
                                <Typography variant="body2" fontWeight={600} sx={{ mb: 1, fontFamily: "Lato", color: "#565d6d" }}>
                                    Date de publication
                                </Typography>
                                <Input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    sx={{
                                        width: "100%",
                                        height: "40px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        "&:focus-within": {
                                            boxShadow: "0 4px 12px rgba(31, 158, 249, 0.2)"
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={1.5}>
                                <Button
                                    variant="contained"
                                    onClick={handleApplyFilters}
                                    sx={{
                                        width: "100%",
                                        height: "40px",
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        background: "linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)",
                                        boxShadow: "0 4px 14px 0 rgba(31, 158, 249, 0.4)",
                                        fontFamily: "Lato",
                                        "&:hover": {
                                            background: "linear-gradient(45deg, #008ae6 30%, #00b4d8 90%)",
                                            boxShadow: "0 6px 20px 0 rgba(31, 158, 249, 0.6)"
                                        }
                                    }}
                                >
                                    Appliquer
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Liste des signalements */}
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                            <CircularProgress size={60} sx={{ color: '#1F9EF9' }} />
                        </Box>
                    ) : error ? (
                        <Box sx={{
                            textAlign: 'center',
                            py: 8,
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }}>
                            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => window.location.reload()}
                                sx={{
                                    background: 'linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)',
                                    textTransform: 'none',
                                    fontWeight: 600
                                }}
                            >
                                Réessayer
                            </Button>
                        </Box>
                    ) : filteredSignalements.length === 0 ? (
                        <Box sx={{
                            textAlign: 'center',
                            py: 8,
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }}>
                            <Typography variant="h6" sx={{ color: '#999', fontFamily: 'Lato' }}>
                                Aucun signalement trouvé
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#ccc', mt: 1 }}>
                                Essayez de modifier vos filtres ou ajoutez un nouveau signalement
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                            {filteredSignalements.map((signal) => {
                                // Récupérer la première image de preuve
                                let imageUrl = 'https://via.placeholder.com/400x300?text=Aucune+image';

                                if (signal.preuves && signal.preuves.length > 0 && signal.preuves[0].image) {
                                    const imagePath = signal.preuves[0].image;
                                    imageUrl = `https://verlie-nonprosperous-pearl.ngrok-free.dev/storage/${imagePath}`;
                                    console.log("Image Url:", imageUrl);

                                }

                                return (
                                    <CardSignalement
                                        key={signal.id}
                                        id={signal.id}
                                        titre={signal.titre}
                                        categorie={signal.type}
                                        date={getTimeAgo(signal.created_at)}
                                        LikeNumber={signal.likes_count}
                                        ChatNumber={signal.commentaires_count}
                                        image={imageUrl}
                                        isLiked={signal.isLiked}
                                    />
                                );
                            })}
                        </Grid>
                    )}
                </Container >
            </Box >
            <Footer />
        </>
    );
}

export default Signalements;
