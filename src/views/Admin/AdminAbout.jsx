import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Chip,
    Divider,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
    Engineering as EngineeringIcon,
} from '@mui/icons-material';

function AdminAbout() {
    const features = [
        {
            icon: <DashboardIcon sx={{ fontSize: 40 }} />,
            title: 'Dashboard Moderne',
            description: 'Interface intuitive avec statistiques en temps réel',
            color: '#1F9EF9',
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: 'Sécurité Renforcée',
            description: 'Authentification et protection des données',
            color: '#10b981',
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40 }} />,
            title: 'Performances Optimales',
            description: 'Chargement rapide et interface réactive',
            color: '#f59e0b',
        },
        {
            icon: <EngineeringIcon sx={{ fontSize: 40 }} />,
            title: 'Maintenance Facile',
            description: 'Code modulaire et bien documenté',
            color: '#8b5cf6',
        },
    ];

    const technologies = [
        { name: 'React', version: '18.x', type: 'Framework' },
        { name: 'Material-UI', version: '5.x', type: 'UI Library' },
        { name: 'React Router', version: '6.x', type: 'Routing' },
        { name: 'Vite', version: '7.x', type: 'Build Tool' },
    ];

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#1A1A1A' }}>
                    À propos de l'administration
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                    Informations sur la plateforme d'administration
                </Typography>
            </Box>

            {/* Platform Info */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', mb: 4 }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            margin: '0 auto',
                            mb: 3,
                            background: 'linear-gradient(135deg, #1F9EF9 0%, #21CBF3 100%)',
                            fontSize: '3rem',
                        }}
                    >
                        🛡️
                    </Avatar>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        Stop Arnaque Admin
                    </Typography>
                    <Chip label="Version 1.0.0" color="primary" sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ color: '#6b7280', maxWidth: 600, margin: '0 auto', mb: 3 }}>
                        Interface d'administration moderne et complète pour la gestion de la plateforme Stop Arnaque.
                        Conçue avec les meilleures pratiques de développement web.
                    </Typography>
                </CardContent>
            </Card>

            {/* Features */}
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Fonctionnalités principales
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        margin: '0 auto',
                                        mb: 2,
                                        bgcolor: `${feature.color}15`,
                                        color: feature.color,
                                    }}
                                >
                                    {feature.icon}
                                </Avatar>
                                <Typography variant="h6" fontWeight={700} gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Technologies */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Technologies utilisées
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                Stack technologique moderne et performant
                            </Typography>

                            {technologies.map((tech, index) => (
                                <Box key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 2,
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body1" fontWeight={600}>
                                                {tech.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                                {tech.type}
                                            </Typography>
                                        </Box>
                                        <Chip label={tech.version} size="small" />
                                    </Box>
                                    {index < technologies.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Statistiques de la plateforme
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                Vue d'ensemble des performances
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {[
                                    { label: 'Pages disponibles', value: '5', color: '#1F9EF9' },
                                    { label: 'Composants créés', value: '7', color: '#10b981' },
                                    { label: 'Fonctionnalités', value: '20+', color: '#8b5cf6' },
                                    { label: 'Temps de chargement', value: '< 1s', color: '#f59e0b' },
                                ].map((stat, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                {stat.label}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                sx={{ color: stat.color }}
                                            >
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                        {index < 3 && <Divider />}
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Credits */}
                <Grid item xs={12}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            background: 'linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)',
                            color: 'white',
                        }}
                    >
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Développé avec ❤️ pour Stop Arnaque
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                © 2025 Stop Arnaque. Tous droits réservés.
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 2 }}>
                                Interface d'administration - Version 1.0.0
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminAbout;
