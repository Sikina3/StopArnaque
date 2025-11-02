import { Input } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchSection(){
    return(
        <Box sx={{ height: "50vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <Typography
                variant="h4"
                fontWeight={500}
            >
                Recherchez un signalement
            </Typography>
            <p color="#5F5F5F">Entrez le nom d'une personne, d'une entreprise ou un numéro de téléphone pour vérifier si un signalement existe déjà.</p>

            <Box display={"flex"} flexDirection={"row"} sx={{width: "80%", justifyContent: "center"}} padding={5}>
                <Input
                    startDecorator={<SearchIcon />}
                    sx={{width: "40%"}}
                />
                <Button variant="contained" sx={{textTransform: "none", marginLeft: 2}}> Rechercher </Button>
            </Box>
        
        </Box>
    );
}

export default SearchSection;