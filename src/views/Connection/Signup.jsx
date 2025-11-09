import { Input } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';

function Signup(){
    return (
        <Box sx={{ height: "100%", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Typography sx={{
                fontWeight: 700,
                fontSize: {md: "1.4rem", xs: "1.2rem"},
                marginBottom: 4,
                fontFamily: "Lato"
            }}> Crée un compte </Typography>

            <Input placeholder="Pseudo" sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 1}} endDecorator={<PersonIcon fontSize="8"/>}/>
            <Input placeholder="numero tel" sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 1}} endDecorator={<PhoneIcon fontSize="8"/>}/>
            <Input placeholder="Mot de passe" sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 1}} endDecorator={<HttpsIcon fontSize="8"/>}/>
            <Input placeholder="Confirmation Mot de passe" sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 3}} endDecorator={<HttpsIcon fontSize="8"/>}/>

            <Button variant="contained" sx={{ width: "60%", marginBottom: 1, fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" }}> S'inscrire </Button>

            <Box sx={{ display: "flex", width: "100%", alignItems: "center", paddingX: 10, marginBottom: 1}}>
                <Divider sx={{ flex: 1}}/>
                <Typography sx={{ mx: 2, fontSize: {md: "0.7rem", xs: "0.6rem"},  fontFamily: "Lato" }}> Ou </Typography>
                <Divider sx={{ flex: 1}}/>
            </Box>

            <Box>
                <Button variant="outlined" sx={{ marginRight: 2 }}> <GoogleIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}} /> </Button>
                <Button variant="outlined"> <FacebookOutlinedIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}} /> </Button>
            </Box>
        </Box>
    )
}

export default Signup;