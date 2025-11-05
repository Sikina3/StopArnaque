import { Box, Typography } from "@mui/material";

function CardProcessus({ titre, icon, contenu }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 4px 14px rgba(0,0,0,0.15)",
        },
        width: {xs: "90%", sm: "70%", md: "25%"},
        marginX: {xs: 0, md: 2},
        marginBottom: {xs: 4, md: 0},
      }}
    >
      <Box sx={{ color: "#007bff", mb: 2 }}>{icon}</Box>

      <Typography
        fontWeight={700}
        sx={{ mb: 1, fontFamily: "Lato", fontSize: {xs: "1rem", md: "1.25rem"} }}
      >
        {titre}
      </Typography>

      <Typography sx={{ color: "#555", fontFamily: "Lato", fontSize: {xs: "0.8rem", md: "1rem"}, marginTop: {xs: 0, md: 2} }}>
        {contenu}
      </Typography>
    </Box>
  );
}

export default CardProcessus;
