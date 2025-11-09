import { Input } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

function Signup(){
    return (
        <Box sx={{ height: "100%", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Typography sx={{
                fontWeight: 700,
                fontSize: "1.4rem",
                marginBottom: 6
            }}> Crée un compte </Typography>

            <Input placeholder="E-mail" sx={{ fontSize: "0.9rem", width: "60%", marginBottom: 3}}/>
            <Input placeholder="Mot de passe" sx={{ fontSize: "0.9rem", width: "60%", marginBottom: 3}}/>

            <Button variant="contained" sx={{ width: "60%", marginBottom: 2}}> S'inscrire </Button>

            <Box sx={{ display: "flex", width: "100%", alignItems: "center", paddingX: 10, marginBottom: 2}}>
                <Divider sx={{ flex: 1}}/>
                <Typography sx={{ mx: 2 }}> Ou </Typography>
                <Divider sx={{ flex: 1}}/>
            </Box>

            <Box>
                <Button variant="outlined" sx={{ marginRight: 2 }}> <GoogleIcon /> </Button>
                <Button variant="outlined"> <FacebookOutlinedIcon /> </Button>
            </Box>
        </Box>
    )
}

export default Signup;