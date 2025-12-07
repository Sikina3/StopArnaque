import { Box, Button, Grid, Typography, Container } from "@mui/material";
import CardSignalement from "../../components/CardSignalement";
import image from "../../assets/Soya.png";
import image2 from "../../assets/animals.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

function LastSignalement() {
  const navigate = useNavigate();

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
            sx={{ fontFamily: "Lato", color: "#1A1A1A", fontSize: {xs: "1.6rem", md: "2rem"} }}
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
          <CardSignalement
            id={1}
            titre={"Signalement de phishing de page facebook"}
            categorie={"Phishing"}
            date={"2 jours"}
            LikeNumber={"2"}
            ChatNumber={5}
            image={image}
          />

          <CardSignalement
            id={2}
            titre={"Vendeur en ligne qui falsifie les livraisons"}
            categorie={"Falsification de produits"}
            date={"1 jour"}
            LikeNumber={"0"}
            ChatNumber={0}
            image={image2}
          />
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
