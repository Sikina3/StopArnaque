import { Input } from "@mui/joy";
import { Box, Button, Typography, Snackbar, Alert, CircularProgress, Paper } from "@mui/material";
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
import { useAuth } from "../../context/AuthContext";

function Signin() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSignIn = async () => {
        if (!phone || !password) {
            setSnackbar({ open: true, message: "Veuillez remplir toutes les informations.", severity: "warning" });
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/login", {
                phone,
                password,
            });

            console.log("Connexion Okay: ", res.data);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setSnackbar({ open: true, message: "Connexion réussie ! Redirection...", severity: "success" });

            setTimeout(() => {
                setUser(res.data.user);
                navigate("/");
            }, 1500);

        } catch (err) {
            console.log(err);
            setSnackbar({ open: true, message: "Erreur lors de la connexion ! Vérifiez vos identifiants.", severity: "error" });
            setLoading(false);
        }
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async (TokenRounded) => {
            try {
                const userInfo = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${TokenRounded.access_token}`
                );

                const googleUser = userInfo.data;
                console.log("User Google: ", googleUser);

                // 1. Récupérer tous les utilisateurs pour vérifier si l'email existe
                const usersRes = await api.get("/users");
                const allUsers = Array.isArray(usersRes.data) ? usersRes.data : [];

                console.log("Nombre d'utilisateurs en base: ", allUsers.length);

                const existingUser = allUsers.find(u =>
                    u.email && u.email.toLowerCase() === googleUser.email.toLowerCase()
                );

                if (existingUser) {
                    console.log("Utilisateur existant trouvé: ", existingUser);
                    // Si l'utilisateur existe, on le connecte directement
                    localStorage.setItem("user", JSON.stringify(existingUser));
                    setSnackbar({ open: true, message: "Connexion Google réussie !", severity: "success" });
                    setTimeout(() => {
                        setUser(existingUser);
                        navigate("/");
                    }, 1500);
                } else {
                    console.log("Nouvel utilisateur Google, création en cours...");
                    // Si l'utilisateur n'existe pas, on le crée
                    const pwdAuto = Math.random().toString(36).slice(-10);
                    const res = await api.post("/users", {
                        name: googleUser.name,
                        pseudo: googleUser.given_name || googleUser.name,
                        email: googleUser.email,
                        password: pwdAuto,
                    });

                    console.log("Compte créé via Google: ", res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    setSnackbar({ open: true, message: "Compte créé et connecté via Google !", severity: "success" });

                    setTimeout(() => {
                        setUser(res.data);
                        navigate("/");
                    }, 1500);
                }
            } catch (error) {
                console.error("Erreur Google Login: ", error);
                setSnackbar({ open: true, message: "Erreur lors de la connexion Google.", severity: "error" });
            }
        },
        onError: () => {
            setSnackbar({ open: true, message: "Erreur de connexion Google", severity: "error" });
        }
    });

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: 2 }}>
            <Typography sx={{
                fontWeight: 800,
                fontSize: { md: "1.8rem", xs: "1.4rem" },
                marginBottom: 6,
                fontFamily: "Lato",
                background: "linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>Connexion</Typography>

            <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Numéro de téléphone"
                sx={{
                    fontSize: { md: "0.9rem", xs: "0.8rem" },
                    width: "70%",
                    marginBottom: 3,
                    fontFamily: "Lato",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    "&:focus-within": {
                        boxShadow: "0 4px 12px rgba(31, 158, 249, 0.2)"
                    }
                }}
                endDecorator={<PhoneIcon fontSize="small" sx={{ color: "#1F9EF9" }} />}
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Mot de passe"
                sx={{
                    fontSize: { md: "0.9rem", xs: "0.8rem" },
                    width: "70%",
                    marginBottom: 2,
                    fontFamily: "Lato",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    "&:focus-within": {
                        boxShadow: "0 4px 12px rgba(31, 158, 249, 0.2)"
                    }
                }}
                endDecorator={<HttpsIcon fontSize="small" sx={{ color: "#1F9EF9" }} />}
            />

            <Typography sx={{
                color: "#1F9EF9",
                fontSize: { md: "0.75rem", xs: "0.65rem" },
                marginBottom: 3,
                fontFamily: "Lato",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" }
            }}>
                Mot de passe oublié ?
            </Typography>

            <Button
                onClick={handleSignIn}
                variant="contained"
                disabled={loading}
                sx={{
                    width: "70%",
                    marginBottom: 3,
                    fontSize: { md: "0.95rem", xs: "0.85rem" },
                    fontFamily: "Lato",
                    height: "44px",
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    background: "linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)",
                    boxShadow: "0 4px 14px 0 rgba(31, 158, 249, 0.4)",
                    "&:hover": {
                        background: "linear-gradient(45deg, #008ae6 30%, #00b4d8 90%)",
                        boxShadow: "0 6px 20px 0 rgba(31, 158, 249, 0.6)"
                    }
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Se connecter"}
            </Button>

            <Box sx={{ display: "flex", width: "70%", alignItems: "center", marginBottom: 3 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography sx={{ mx: 2, fontSize: { md: "0.75rem", xs: "0.65rem" }, fontFamily: "Lato", color: "#999" }}>Ou</Typography>
                <Divider sx={{ flex: 1 }} />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={loginGoogle}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        borderColor: "#e0e0e0",
                        color: "#DB4437",
                        "&:hover": {
                            borderColor: "#DB4437",
                            backgroundColor: "rgba(219, 68, 55, 0.05)"
                        }
                    }}
                >
                    <GoogleIcon sx={{ fontSize: { md: "1.5rem", xs: "1.2rem" } }} />
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        borderColor: "#e0e0e0",
                        color: "#4267B2",
                        "&:hover": {
                            borderColor: "#4267B2",
                            backgroundColor: "rgba(66, 103, 178, 0.05)"
                        }
                    }}
                >
                    <FacebookOutlinedIcon sx={{ fontSize: { md: "1.5rem", xs: "1.2rem" } }} />
                </Button>
            </Box>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Signin;