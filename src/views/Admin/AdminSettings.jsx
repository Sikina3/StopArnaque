import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Switch,
    Button,
    Divider,
    FormControlLabel,
} from '@mui/material';
import {
    Save as SaveIcon,
} from '@mui/icons-material';

function AdminSettings() {
    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#1A1A1A' }}>
                    Paramètres
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                    Configuration de la plateforme
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* General Settings */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Paramètres généraux
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                Configuration de base de la plateforme
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    label="Nom de la plateforme"
                                    defaultValue="Stop Arnaque"
                                    fullWidth
                                />
                                <TextField
                                    label="Email de contact"
                                    defaultValue="contact@stoparnaque.com"
                                    type="email"
                                    fullWidth
                                />
                                <TextField
                                    label="Description"
                                    defaultValue="Plateforme de signalement d'arnaques"
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Moderation Settings */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Modération
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                Paramètres de modération des signalements
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Validation automatique"
                                />
                                <Divider />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Notifications aux utilisateurs"
                                />
                                <Divider />
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Modération stricte"
                                />
                                <Divider />
                                <TextField
                                    label="Délai de traitement (jours)"
                                    type="number"
                                    defaultValue="3"
                                    fullWidth
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Notification Settings */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Notifications
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                Paramètres des notifications
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Notifications email"
                                />
                                <Divider />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Notifications navigateur"
                                />
                                <Divider />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Alertes nouveaux signalements"
                                />
                                <Divider />
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Rapport hebdomadaire"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Security Settings */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Sécurité
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                Paramètres de sécurité de la plateforme
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Authentification à deux facteurs"
                                />
                                <Divider />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Vérification email obligatoire"
                                />
                                <Divider />
                                <TextField
                                    label="Durée session (minutes)"
                                    type="number"
                                    defaultValue="120"
                                    fullWidth
                                />
                                <Divider />
                                <TextField
                                    label="Tentatives de connexion max"
                                    type="number"
                                    defaultValue="5"
                                    fullWidth
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Save Button */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ borderRadius: 2, px: 4 }}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            sx={{
                                borderRadius: 2,
                                px: 4,
                                background: 'linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)',
                            }}
                        >
                            Enregistrer les modifications
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminSettings;
