import { Box, Grid, Paper, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { HideImage } from "@mui/icons-material";

function CardSignalement({ titre, categorie, date, LikeNumber, ChatNumber, image }) {
  return (
    <Grid item xs={12} sm={4} sx={{ height: "25rem", width: {md:"25%"} }}>
      <Paper
        sx={{
          height: {md:"100%", xs: "90%"},
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50%",
            borderRadius: 2,
            border: 1,
            borderColor: "#f3f4f6",
            overflow: "hidden"
          }}
        >
          <img
            src={image}
            style={{ width: "100%", height: "100%", objectFit: "cover"}}
          />
        </Box>

        <Typography
          sx={{
            fontSize: {md:"1rem", xs: "0.8rem"},
            marginTop: 2,
            color: "#1A1A1A",
            fontFamily: "Lato",
            fontWeight: 500,
          }}
        >
          {titre}
        </Typography>
        <Box
          sx={{
            display: "inline-flex",
            // width: "auto",
            backgroundColor: "rgba(31, 158, 249, 0.1)",
            borderRadius: 10,
            padding: "4px 20px",
            marginTop: 1,
            alignSelf: "flex-start"
          }}
        >
          <Typography
            sx={{
              fontSize: {md: "0.75rem", xs: "0.6rem"},
              color: "#1F9EF9",
              fontWeight: 500,
              fontFamily: "Lato",
            }}
          >
            {categorie}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: {md: "0.8rem", xs: "0.6rem"}, color: "#5F5F5F", marginTop: {md:2, xs: 1}, fontFamily: "Lato"}}>Il y a {date}</Typography>

        <Divider sx={{ marginTop: {md: 4, xs: 1}}} />

        <Box sx={{width: "100%", display:"flex", alignItems: "center", paddingY: {md: 2, xs: 1}}}>
          <FavoriteBorderOutlinedIcon sx={{ color: "#5F5F5F", fontSize: {xs: 18, md: 25}, marginRight: {xs: 0.5} }} />
          <Typography sx={{color: "#5F5F5F", marginRight: 5, fontSize: { xs: "0.7rem", md: "0.9rem"} }}> {LikeNumber} </Typography>

          <ChatBubbleOutlineOutlinedIcon sx={{ color: "#5F5F5F", fontSize: {xs: 18, md: 25}, marginRight: {xs: 0.5} }} />
          <Typography sx={{color: "#5F5F5F", fontSize: { xs: "0.7rem", md: "0.9rem"} }}> {ChatNumber} </Typography>

          <Typography sx={{ color: "#1F9EF9", fontSize: {md: "0.8rem", xs: "0.7rem"}, marginLeft: 14}}> Voir détails </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default CardSignalement;
