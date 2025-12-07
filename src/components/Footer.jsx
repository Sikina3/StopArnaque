import { Box, Typography } from "@mui/material";
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import Logo from "./Logo";

function Footer() {
  return (
    <Box p={3} sx={{
      width: "100%",
      borderTop: 1,
      borderColor: "#E1E1E1",
      display: "flex",
      justifyContent: "space-between",
      paddingX: { xs: 5, md: 30 }
    }}>

      {/* Box 1 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Logo />
        <Typography sx={{ color: "#5F5F5F", fontSize: { md: "0.8rem", xs: "0.6rem" } }}>© 2025 StopArnaque. Tous droits réservés.</Typography>
      </Box>

      {/* Box 2 */}
      <Box>
        <Typography sx={{ color: "#1A1A1A", fontSize: { md: "0.8rem", xs: "0.6rem" } }}>Mentions Légales</Typography>
        <Typography sx={{ color: "#1A1A1A", fontSize: { md: "0.8rem", xs: "0.6rem", marginTop: 3, marginBottom: 3 } }}>Politique de Confidentialité</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
