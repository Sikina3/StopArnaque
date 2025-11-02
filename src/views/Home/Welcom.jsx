import { Box, Button, Input, InputAdornment, Typography } from "@mui/material";
import "../../styles/Welcom.css"
import image from "../../assets/bouclier.png"

function Welcom(){
    return (
        <Box sx={{ height: "90vh", width: "100%", display: "flex",}} p={15}>
            <Box sx={{flex: 2}} p={10}>
                <Typography
                    variant="h4"
                    fontFamily={"Lato"}
                    fontWeight={700}
                >
                    Protégez-vous des arnaques en ligne. Signalez, Informez, Agissez.
                </Typography>

                <p color="#565d6d" style={{ fontFamily: "Lato"}}>
                StopArnaque est votre plateforme communautaire pour signaler et consulter des signalements d'arnaques vérifiés, renforçant la confiance et la transparence en ligne.
                </p>

                <Button variant="outlined" sx={{ marginTop: 10, color: "#171a1f", textTransform: "none", borderColor: "#bdc1ca", paddingX: 5}}>Signaler une Arnaque</Button>

            </Box>
            
            <Box 
                sx={{flex: 1}}
                component="img"
                src={image}
                paddingX={5}
            />
        </Box>
    );
}

export default Welcom;