import { Box, Typography, Container, Grid } from "@mui/material";
import CardProcessus from "../../components/CardProcessus";
import CampaignSharpIcon from '@mui/icons-material/CampaignSharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

function HowItWorks() {
    const steps = [
        {
            title: "1. Signaler",
            icon: <CampaignSharpIcon fontSize="inherit" />,
            content: "Remplissez notre formulaire sécurisé pour soumettre les détails de l'incident et joindre les preuves nécessaires.",
            color: "#1F9EF9"
        },
        {
            title: "2. Vérification",
            icon: <TaskAltSharpIcon fontSize="inherit" />,
            content: "Notre équipe d'experts examine chaque signalement et toutes les preuves fournies pour en assurer l'authenticité.",
            color: "#00C853"
        },
        {
            title: "3. Publication",
            icon: <AutoStoriesOutlinedIcon fontSize="inherit" />,
            content: "Une fois vérifié, le signalement est publié anonymement, permettant à la communauté de le consulter.",
            color: "#FFAB00"
        }
    ];

    return (
        <Box sx={{ backgroundColor: "#fff", width: "100%", py: 10 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography variant="h4" fontWeight={800} fontFamily={"Lato"} gutterBottom sx={{ fontSize: {md: "2rem", xs: "1.6rem"} }}>
                        Comment ça marche ?
                    </Typography>
                    <Typography variant="h6" color="text.secondary" fontFamily={"Lato"} sx={{ fontSize: {md: "1.4rem", xs: "1rem"} }}>
                        Un processus simple et transparent en 3 étapes
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                    {steps.map((step, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <CardProcessus
                                titre={step.title}
                                icon={step.icon}
                                contenu={step.content}
                                color={step.color}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default HowItWorks;