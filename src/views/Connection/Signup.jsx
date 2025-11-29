import { Input } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import api from "../../services/api";

function Signup(){
  const [pseudo, setPseudo] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirm] = useState("");

  const handleSignup = async () => {
    if (!pseudo || !phone || !password || !passwordConfirm){
      alert("Remplis toutes les informations.");
      return;
    }

    if (password !== passwordConfirm){
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await api.post("/users", {
        pseudo,
        phone,
        password,
      });

      console.log("Inscription reussi : ", res.data);
      alert("Compte crée !");
    } catch (err){
      console.log(err);
      alert("Erreur lors de l'inscription");
    }
  };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          try {
            const userInfo = await axios.get(
              `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`
            );
            const googleUser = userInfo.data;
      
            console.log("USER GOOGLE :", googleUser);

            const pwdAuto = Math.random().toString(36).slice(-10);

            const res = await api.post("/users", {
              pseudo: googleUser.given_name,
              email: googleUser.email,
              password: pwdAuto,
            });

            console.log("Inscription google ok: ", res.data);
            alert("Inscription via google reussie");
          } catch (err) {
            console.log(err);
            alert("Erreur google login");
          }
        },
        onError: () => {
          console.log("Erreur Google login");
        }
      });

    return (
        <Box sx={{ height: "100%", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Typography sx={{
                fontWeight: 700,
                fontSize: {md: "1.4rem", xs: "1.2rem"},
                marginBottom: 4,
                fontFamily: "Lato"
            }}> Crée un compte </Typography>

            <Input placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 1}} endDecorator={<PersonIcon fontSize="8"/>}/>
            <Input placeholder="numero tel" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 1}} endDecorator={<PhoneIcon fontSize="8"/>}/>
            <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 1}} endDecorator={<HttpsIcon fontSize="8"/>}/>
            <Input type="password" placeholder="Confirmation Mot de passe" value={passwordConfirm} onChange={(e) => setConfirm(e.target.value)} sx={{ fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" , width: "60%", marginBottom: 3}} endDecorator={<HttpsIcon fontSize="8"/>}/>

            <Button variant="contained" sx={{ width: "60%", marginBottom: 1, fontSize: {md: "0.9rem", xs: "0.8rem"}, fontFamily: "Lato" }} onClick={handleSignup}> S'inscrire </Button>

            <Box sx={{ display: "flex", width: "100%", alignItems: "center", paddingX: 10, marginBottom: 1}}>
                <Divider sx={{ flex: 1}}/>
                <Typography sx={{ mx: 2, fontSize: {md: "0.7rem", xs: "0.6rem"},  fontFamily: "Lato" }}> Ou </Typography>
                <Divider sx={{ flex: 1}}/>
            </Box>

            <Box>
                <Button variant="outlined" sx={{ marginRight: 2 }} onClick={loginWithGoogle}> <GoogleIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}} /> </Button>
                <Button variant="outlined"> <FacebookOutlinedIcon sx={{ fontSize: {md: "1.5rem", xs: "1rem"}}} /> </Button>
            </Box>
        </Box>
    )
}

export default Signup;