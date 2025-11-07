import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CardSignalement from "../../components/CardSignalement";
import image from "../../assets/Soya.png";
import image2 from "../../assets/animals.png";

function LastSignalement() {
  return (
    <Box
      sx={{
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

      <Grid
        container
        spacing={{ md: 2}}
        sx={{ width: "100%", p: 5, justifyContent: "center" }}
      >
        <CardSignalement
          titre={"Signalement de pishing de page facebook"}
          categorie={"Phishing"}
          date={"2 jours"}
          LikeNumber={"2"}
          ChatNumber={5}
          image={image}
        />

        <CardSignalement
          titre={"Vendeur en ligne qui falsifie les livraison"}
          categorie={"falsification de produis"}
          date={"1 jours"}
          LikeNumber={"0"}
          ChatNumber={0}
          image={image2}
        />
      </Grid>

      <Button
        variant="outlined"
        sx={{
          color: "#171a1f",
          textTransform: "none",
          borderColor: "#bdc1ca",
          paddingX: 5,
          marginTop: {md: 6},
          fontSize: {xs: "0.7rem"}
        }}
      >
        Voir tout les signalements
      </Button>
    </Box>
  );
}

export default LastSignalement;
