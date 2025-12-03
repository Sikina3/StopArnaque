import { Box, Typography, Paper } from "@mui/material";

function CardProcessus({ titre, icon, contenu, color = "#1F9EF9" }) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 4,
        height: '100%',
        borderRadius: 4,
        backgroundColor: "#f8f9fa",
        transition: "all 0.3s ease",
        border: "1px solid transparent",
        "&:hover": {
          transform: "translateY(-8px)",
          backgroundColor: "#fff",
          borderColor: color,
          boxShadow: `0 10px 30px -10px ${color}40`, // 40 is for opacity
        },
      }}
    >
      <Box
        sx={{
          color: color,
          mb: 3,
          p: 2,
          borderRadius: '50%',
          backgroundColor: `${color}15`, // 15% opacity background
          fontSize: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mb: 2, fontFamily: "Lato" }}
      >
        {titre}
      </Typography>

      <Typography variant="body2" sx={{ color: "#666", fontFamily: "Lato", lineHeight: 1.6 }}>
        {contenu}
      </Typography>
    </Paper>
  );
}

export default CardProcessus;
