import { Box, Typography } from "@mui/material";
import CardProcessus from "../../components/CardProcessus";
import CampaignSharpIcon from '@mui/icons-material/CampaignSharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

function HowItWorks(){
    return (
        <Box sx={{ backgroundColor: "#fafafa", width: "100%" }}>
            <Box sx={{ height: "60vh", display: {xs: "none", md: "flex"},flexDirection: "column", p: 3, alignItems: "center"}}>
                <Typography variant="h4" fontFamily={"Lato"}> Comment ca marche ?</Typography>

                <Box sx={{ display: "flex", flexDirection: "row", height: "80%", width: "100%", justifyContent: "center", marginTop: 5 }}>
                    <CardProcessus 
                        titre={"Signaler une Arnaque"} 
                        icon={<CampaignSharpIcon />} 
                        contenu={"Remplissez notre formulaire sécurisé pour soumettre les détails de l'incident et joindre les preuves nécessaires. C'est rapide et confidentiel."}/>

                    <CardProcessus 
                        titre={"Verification Rigoureuse"} 
                        icon={<TaskAltSharpIcon />} 
                        contenu={"Notre équipe d'experts examine chaque signalement et toutes les preuves fournies pour en assurer l'authenticité et la validité avant publication."}/>

                    <CardProcessus 
                        titre={"Publication et Consultation"} 
                        icon={<AutoStoriesOutlinedIcon />} 
                        contenu={"Une fois vérifié, le signalement est publié anonymement sur la plateforme, permettant à la communauté de le consulter et d'en tirer des leçons."}/>

                </Box>
            </Box>

            <Box sx={{ display: {xs: "flex", md: "none"},flexDirection: "column", p: 3, alignItems: "center"}}>
                <Typography variant="h6" fontFamily={"Lato"}> Comment ca marche ?</Typography>

                <Box sx={{ display: "flex", flexDirection: "column", height: "80%", width: "100%", alignItems: "center", marginTop: 5 }}>
                    <CardProcessus 
                        titre={"Signaler une Arnaque"} 
                        icon={<CampaignSharpIcon />} 
                        contenu={"Remplissez notre formulaire sécurisé pour soumettre les détails de l'incident et joindre les preuves nécessaires. C'est rapide et confidentiel."}/>

                    <CardProcessus 
                        titre={"Verification Rigoureuse"} 
                        icon={<TaskAltSharpIcon />} 
                        contenu={"Notre équipe d'experts examine chaque signalement et toutes les preuves fournies pour en assurer l'authenticité et la validité avant publication."}/>

                    <CardProcessus 
                        titre={"Publication et Consultation"} 
                        icon={<AutoStoriesOutlinedIcon />} 
                        contenu={"Une fois vérifié, le signalement est publié anonymement sur la plateforme, permettant à la communauté de le consulter et d'en tirer des leçons."}/>

                </Box>
            </Box>
        </Box>
    )
}

export default HowItWorks;