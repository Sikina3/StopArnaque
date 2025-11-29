import { Input } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Signin(){
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!phone || !password){
            alert("Remplis toutes les informations.");
            return;
        }

        try {
            const res = await api.post("/login", {
                phone,
                password,
            });

            console.log("Connexion Okay: ", res.data);
            alert("Connexion reussie !");
            localStorage.setItem("user", JSON.stringify(res.data.user));
            
            navigate("/");
        } catch (err){
            console.log(err);
            alert("Erreur lors de la connexion !");
        }
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async (TokenRounded) => {
            try {
                const userInfo = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${TokenRounded.access_token}`
                );

                console.log("User Google: ", userInfo.data);
            } catch (error) {
                console.error("Erreur lors de la récuperation du profile google: ", error)
            }
        },
        onError: () => {
            console.log("Erreur de connexion Google");
        }
    });

    return (
        <Box sx={{ height: "100%", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
            <Typography sx={{
                fontWeight: 700,
                fontSize: {md: "1.4rem", xs: "1.2rem"},
                marginBottom: 6,
                fontFamily: "Lato"
            }}> Connexion </Typography>

            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numero de Tel." sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, width: "60%", marginBottom: 3,  fontFamily: "Lato"}} endDecorator={<PhoneIcon fontSize="8"/>}/>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mot de passe" sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, width: "60%", marginBottom: 3,  fontFamily: "Lato"}} endDecorator={<HttpsIcon fontSize="8"/>}/>

            <Typography sx={{ color: "#5F5F5F", fontSize: {md: "0.7rem", xs: "0.6rem"}, marginBottom: 2,  fontFamily: "Lato"}}> Mot de passe oublié? </Typography>

            <Button onClick={handleSignIn} variant="contained" sx={{ width: "60%", marginBottom: 2, fontSize: {md: "0.9rem", xs: "0.8rem"},  fontFamily: "Lato"}}> Se connecter </Button>

            <Box sx={{ display: "flex", width: "100%", alignItems: "center", paddingX: 10, marginBottom: 2}}>
                <Divider sx={{ flex: 1}}/>
                <Typography sx={{ mx: 2 , fontSize: {md: "0.7rem", xs: "0.6rem"},  fontFamily: "Lato"}}> Ou </Typography>
                <Divider sx={{ flex: 1}}/>
            </Box>

            <Box>
                <Button variant="outlined" sx={{ marginRight: 2 }} onClick={loginGoogle}> <GoogleIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}}/> </Button>
                <Button variant="outlined"> <FacebookOutlinedIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}}/> </Button>
            </Box>
        </Box>
    )
}

export default Signin;