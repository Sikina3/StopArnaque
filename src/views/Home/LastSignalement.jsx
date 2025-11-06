import { Box, Button, Grid, Paper, Typography } from "@mui/material";

function LastSignalement() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 5,
      }}
    >
      <Typography sx={{ fontSize: { md: "1.6rem" } }}>
        Derniers signalements validés
      </Typography>

      <Grid container spacing={2} sx={{ width: "100%", height:"90%", p: 5, justifyContent: "center"}}>
        {[...Array(6)].map((_, i) => (
          <Grid item xs={12} sm={4} key={i} sx={{ height: "50%", width: "25%"}}>
            <Paper
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
            >
              <Typography>Cadre {i + 1}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button
            variant="outlined"
            sx={{
              color: "#171a1f",
              textTransform: "none",
              borderColor: "#bdc1ca",
              paddingX: 5,
              marginTop: 6
            }}
          >
            Voir tout les signalements
          </Button>
    </Box>
  );
}

export default LastSignalement;
