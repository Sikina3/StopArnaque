import { Box, Button, Typography, Container, Stack } from "@mui/material";
import "../../styles/Welcom.css";
import image from "../../assets/bouclier.png";
import { useNavigate } from "react-router-dom";
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';

function Welcom() {
  const navigate = useNavigate();

  const features = [
    { icon: <SecurityIcon fontSize="large" />, text: "Signalements vérifiés" },
    { icon: <VerifiedUserIcon fontSize="large" />, text: "100% anonyme" },
    { icon: <GroupsIcon fontSize="large" />, text: "Communauté active" }
  ];

  return (
    <Box
      sx={{
        width: "100%",
        // marginTop: "64px",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        py: { md: 0, xs: 10 }
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(31, 158, 249, 0.1) 0%, rgba(33, 203, 243, 0.05) 100%)",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(31, 158, 249, 0.08) 0%, rgba(33, 203, 243, 0.03) 100%)",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            py: { xs: 6, md: 10 }
          }}
        >
          {/* Left content */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h2"
              fontFamily={"Lato"}
              fontWeight={800}
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                background: "linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2
              }}
            >
              Protégez-vous des arnaques en ligne
            </Typography>

            <Typography
              variant="h5"
              fontFamily={"Lato"}
              fontWeight={600}
              sx={{
                color: "#1A1A1A",
                mb: 3,
                fontSize: { xs: "1.2rem", md: "1.5rem" }
              }}
            >
              Signalez, Informez, Agissez.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#565d6d",
                fontFamily: "Lato",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
                mb: 4,
                maxWidth: { xs: "100%", md: "500px" },
                mx: { xs: "auto", md: 0 }
              }}
            >
              StopArnaque est votre plateforme communautaire pour signaler et
              consulter des signalements d'arnaques vérifiés, renforçant la
              confiance et la transparence en ligne.
            </Typography>

            {/* Features */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{
                mb: 4,
                justifyContent: { xs: "center", md: "flex-start" }
              }}
            >
              {features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#1F9EF9"
                  }}
                >
                  {feature.icon}
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: "#1A1A1A" }}
                  >
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                px: 5,
                py: 2,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: "bold",
                borderRadius: 3,
                background: "linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)",
                boxShadow: "0 6px 20px 0 rgba(31, 158, 249, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(45deg, #008ae6 30%, #00b4d8 90%)",
                  boxShadow: "0 8px 25px 0 rgba(31, 158, 249, 0.6)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              Signaler une Arnaque
            </Button>
          </Box>

          {/* Right image */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Box
              component="img"
              src={image}
              alt="Protection contre les arnaques"
              sx={{
                width: { xs: "80%", sm: "70%", md: "100%" },
                maxWidth: "500px",
                height: "auto",
                filter: "drop-shadow(0 10px 30px rgba(31, 158, 249, 0.2))",
                animation: "float 3s ease-in-out infinite",
                "@keyframes float": {
                  "0%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-20px)" },
                  "100%": { transform: "translateY(0px)" }
                }
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Welcom;