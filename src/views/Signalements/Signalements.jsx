import { Box, Container, Typography, Button, Grid, Select, MenuItem, FormControl } from "@mui/material";
import { Input } from "@mui/joy";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import CardSignalement from "../../components/CardSignalement";
import image from "../../assets/Soya.png";
import image2 from "../../assets/animals.png";

function Signalements() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");

    // Données fictives pour l'exemple
    const signalements = [
        {
            id: 1,
            titre: "Faux support technique Microsoft",
            categorie: "Phishing",
            statut: "Validé",
            date: "2023-10-26",
            dateAffichage: "2 jours",
            likes: 2,
            comments: 5,
            image: image
        },
        {
            id: 2,
            titre: "Offre d'emploi frauduleuse LinkedIn",
            categorie: "Faux emplois",
            statut: "En attente",
            date: "2023-11-01",
            dateAffichage: "1 jour",
            likes: 0,
            comments: 3,
            image: image2
        },
        {
            id: 3,
            titre: "Investissement crypto miracle",
            categorie: "Faux investissements",
            statut: "Validé",
            date: "2023-11-15",
            dateAffichage: "3 jours",
            likes: 8,
            comments: 12,
            image: image
        },
        {
            id: 4,
            titre: "Livraison colis UPS non réclamé",
            categorie: "Smishing",
            statut: "Validé",
            date: "2023-11-20",
            dateAffichage: "5 jours",
            likes: 4,
            comments: 2,
            image: image2
        },
        {
            id: 5,
            titre: "Appel bancaire frauduleux",
            categorie: "Usurpation d'identité",
            statut: "En attente",
            date: "2023-11-28",
            dateAffichage: "1 semaine",
            likes: 1,
            comments: 0,
            image: image
        },
        {
            id: 6,
            titre: "Vente de véhicule d'occasion inexistante",
            categorie: "Fraude à la vente",
            statut: "Validé",
            date: "2023-12-05",
            dateAffichage: "2 semaines",
            likes: 6,
            comments: 8,
            image: image2
        }
    ];

    const handleApplyFilters = () => {
        console.log("Filtres appliqués:", { searchTerm, typeFilter, statusFilter, dateFilter });
    };

    return (
        <>
            <TopNav />
            <Box sx={{ width: "100%", marginTop: "64px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    {/* Header */}
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{ fontFamily: "Lato", color: "#1A1A1A", mb: 1, fontSize: {xs: "1.8rem", md: "2.4rem"} }}
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
                    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                        {signalements.map((signal, index) => (
                            <CardSignalement
                                key={index}
                                id={signal.id}
                                titre={signal.titre}
                                categorie={signal.categorie}
                                date={signal.dateAffichage}
                                LikeNumber={signal.likes.toString()}
                                ChatNumber={signal.comments}
                                image={signal.image}
                            />
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default Signalements;
