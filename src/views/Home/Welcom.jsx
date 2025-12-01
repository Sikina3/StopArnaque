import { Box, Button, Input, InputAdornment, Typography } from "@mui/material";
import "../../styles/Welcom.css";
import image from "../../assets/bouclier.png";
import { useNavigate } from "react-router-dom";

function Welcom() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        marginTop: "64px",
      }}
    >
      <Box p={5} sx={{ display: { md: "flex", xs: "none" }, height: "90vh", }}>
        <Box sx={{ flex: 2, display: { xs: "none", md: "block" } }} p={20}>
          <Typography variant="h4" fontFamily={"Lato"} fontWeight={700}>
            Protégez-vous des arnaques en ligne. Signalez, Informez, Agissez.
          </Typography>

          <p color="#565d6d" style={{ fontFamily: "Lato" }}>
            StopArnaque est votre plateforme communautaire pour signaler et
            consulter des signalements d'arnaques vérifiés, renforçant la
            confiance et la transparence en ligne.
          </p>

          <Button
            variant="outlined"
            sx={{
              marginTop: 10,
              color: "#171a1f",
              textTransform: "none",
              borderColor: "#bdc1ca",
              paddingX: 5,
              fontSize: {md: "1rem", xs: "0.6rem"}
            }}
            onClick={() => navigate("/signaler")}
          >
            Signaler une Arnaque
          </Button>
        </Box>

        <Box
          sx={{ flex: 1, display: { md: "block", xs: "none" } }}
          component="img"
          src={image}
          paddingX={5}
        />
      </Box>

      <Box p={2} sx={{display: {md: "none", xs: "flex" }, flexDirection: "column"}}>
        <Box
          sx={{
            flex: 1,
            display: { xs: "block", md: "none" },
          }}
          p={{xs: 2, md: 10}}
        >
          <Typography variant="h6" fontFamily={"Lato"} fontWeight={700}>
            Protégez-vous des arnaques en ligne. Signalez, Informez, Agissez.
          </Typography>

          <p color="#565d6d" style={{ fontFamily: "Lato" }}>
            StopArnaque est votre plateforme communautaire pour signaler et
            consulter des signalements d'arnaques vérifiés, renforçant la
            confiance et la transparence en ligne.
          </p>

          <Button
            variant="outlined"
            sx={{
              marginTop: 4,
              color: "#171a1f",
              textTransform: "none",
              borderColor: "#bdc1ca",
              paddingX: 5,
            }}
          >
            Signaler une Arnaque
          </Button>
        </Box>

        <Box
          sx={{ flex: 1, display: { md: "none", xs: "flex" }, width: "80%", maxWidth: "80%", height: "auto"}}
          component="img"
          src={image}
          paddingX={6}
        />
      </Box>
    </Box>
  );
}

export default Welcom;