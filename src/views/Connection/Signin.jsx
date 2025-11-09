import { Input } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';

function Signin(){
    return (
        <Box sx={{ height: "100%", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
            <Typography sx={{
                fontWeight: 700,
                fontSize: {md: "1.4rem", xs: "1.2rem"},
                marginBottom: 6,
                fontFamily: "Lato"
            }}> Connexion </Typography>

            <Input placeholder="E-mail" sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, width: "60%", marginBottom: 3,  fontFamily: "Lato"}} endDecorator={<PhoneIcon fontSize="8"/>}/>
            <Input placeholder="Mot de passe" sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, width: "60%", marginBottom: 3,  fontFamily: "Lato"}} endDecorator={<HttpsIcon fontSize="8"/>}/>

            <Typography sx={{ color: "#5F5F5F", fontSize: {md: "0.7rem", xs: "0.6rem"}, marginBottom: 2,  fontFamily: "Lato"}}> Mot de passe oublié? </Typography>

            <Button variant="contained" sx={{ width: "60%", marginBottom: 2, fontSize: {md: "0.9rem", xs: "0.8rem"},  fontFamily: "Lato"}}> Se connecter </Button>

            <Box sx={{ display: "flex", width: "100%", alignItems: "center", paddingX: 10, marginBottom: 2}}>
                <Divider sx={{ flex: 1}}/>
                <Typography sx={{ mx: 2 , fontSize: {md: "0.7rem", xs: "0.6rem"},  fontFamily: "Lato"}}> Ou </Typography>
                <Divider sx={{ flex: 1}}/>
            </Box>

            <Box>
                <Button variant="outlined" sx={{ marginRight: 2 }}> <GoogleIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}}/> </Button>
                <Button variant="outlined"> <FacebookOutlinedIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}}/> </Button>
            </Box>
        </Box>
    )
}

export default Signin;