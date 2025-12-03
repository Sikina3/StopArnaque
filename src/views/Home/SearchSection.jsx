import { Input } from "@mui/joy";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchSection() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 8,
        background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)"
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            mb: 6
          }}
        >
          <Typography variant="h4" fontWeight={800} gutterBottom sx={{ fontFamily: 'Lato, sans-serif', color: '#1A1A1A' }}>
            Recherchez un signalement
          </Typography>
          <Typography variant="body1" sx={{ color: "#5F5F5F", maxWidth: "600px", fontFamily: 'Lato, sans-serif', fontSize: '1.1rem' }}>
            Entrez le nom d'une personne, d'une entreprise ou un numéro de
            téléphone pour vérifier si un signalement existe déjà dans notre base de données sécurisée.
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '50px',
            width: '100%',
            maxWidth: '700px',
            mx: 'auto',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
          }}
        >
          <Input
            startDecorator={<SearchIcon sx={{ color: '#1F9EF9' }} />}
            placeholder="Rechercher (ex: 06 12 34 56 78, Entreprise X...)"
            variant="plain"
            sx={{
              flex: 1,
              ml: 1,
              '--Input-focusedHighlight': 'transparent',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              py: 1.5
            }}
          />
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: '30px',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              background: "linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)",
              boxShadow: '0 4px 14px 0 rgba(31, 158, 249, 0.4)',
              '&:hover': {
                background: "linear-gradient(45deg, #008ae6 30%, #00b4d8 90%)",
                boxShadow: '0 6px 20px 0 rgba(31, 158, 249, 0.6)'
              }
            }}
          >
            Rechercher
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default SearchSection;
