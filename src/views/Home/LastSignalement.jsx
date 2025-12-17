import { Box, Button, Grid, Typography, Container } from "@mui/material";
import CardSignalement from "../../components/CardSignalement";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function LastSignalement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signalements, setSignalements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!user) return;
    const fetchSignalements = async () => {
      try {
        setLoading(true);
        const response = await api.get('/signalements', {
          params: { utilisateur_id: user.id }
        });

        if (Array.isArray(response.data)) {
          setSignalements(response.data);
          setError(null);
        } else {
          setError('Format de données invalide recu du serveur.');
        }
      } catch (err) {
        setError('Impossible de charger les signalements. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      };
    }
    fetchSignalements();
  }, [user]);

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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 10,
        background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            gutterBottom
            sx={{ fontFamily: "Lato", color: "#1A1A1A", fontSize: { xs: "1.6rem", md: "2rem" } }}
          >
            Derniers signalements validés
          </Typography>
          <Box
            sx={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #1F9EF9 0%, #21CBF3 100%)",
              margin: "0 auto",
              borderRadius: 2
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "#5F5F5F",
              mt: 2,
              fontFamily: "Lato",
              maxWidth: "600px",
              mx: "auto"
            }}
          >
            Consultez les arnaques récemment validées par notre équipe
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          sx={{ justifyContent: "center", mb: 6 }}
        >
          {loading ? (
            <Typography>Chargement...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            signalements
              .filter(s => s.status === 'Validé')
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 3)
              .map((signal) => {
                let imageUrl = 'https://via.placeholder.com/400x300?text=Aucune+image';
                if (signal.preuves && signal.preuves.length > 0 && signal.preuves[0].image) {
                  const imagePath = signal.preuves[0].image;
                  if (imagePath.startsWith('http')) {
                    imageUrl = imagePath;
                  } else {
                    imageUrl = `https://signaleo-backend-1.onrender.com/storage/${imagePath}`;
                  }
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
              })
          )}
        </Grid>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/signalements")}
            sx={{
              textTransform: "none",
              px: 5,
              py: 1.5,
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 700,
              borderRadius: 3,
              background: "linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)",
              boxShadow: "0 4px 14px 0 rgba(31, 158, 249, 0.4)",
              fontFamily: "Lato",
              "&:hover": {
                background: "linear-gradient(45deg, #008ae6 30%, #00b4d8 90%)",
                boxShadow: "0 6px 20px 0 rgba(31, 158, 249, 0.6)",
                transform: "translateY(-2px)"
              },
              transition: "all 0.3s ease"
            }}
          >
            Voir tous les signalements
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default LastSignalement;
