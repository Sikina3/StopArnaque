import { Box, Typography } from "@mui/material";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

function Logo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <GppGoodOutlinedIcon 
        sx={{ 
          display: { xs: "none", md: "flex" },
          mr: 1,
          fontSize: 28,
          color: "#1F9EF9"
        }} 
      />

      <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "Lato",
          color: "#1F9EF9",
          textDecoration: "none"
        }}
      >
        Signaleo
      </Typography>

      <GppGoodOutlinedIcon 
        sx={{ 
          display: { xs: "flex", md: "none" },
          mr: 1,
          fontSize: 30,
          color: "#1F9EF9"
        }}
      />
{/* 
      <Typography
        noWrap
        component="a"
        sx={{
          display: { xs: "flex", md: "none" },
          fontFamily: "Lato",
          color: "#1F9EF9",
          textDecoration: "none",
          flexGrow: 1,
          fontSize: {xs: "1rem"}
        }}
      >
        Signaleo
      </Typography> */}
    </Box>
  );
}

export default Logo;
