import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    Report as ReportIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    MoreVert as MoreVertIcon,
    ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';

function Dashboard() {
    // Données de démonstration
    const stats = [
        {
            title: 'Total Signalements',
            value: '1,234',
            change: '+12%',
            trend: 'up',
            icon: <ReportIcon sx={{ fontSize: 40 }} />,
            color: '#1F9EF9',
            bgColor: 'rgba(31, 158, 249, 0.1)',
        },
        {
            title: 'En Attente',
            value: '47',
            change: '-5%',
            trend: 'down',
            icon: <WarningIcon sx={{ fontSize: 40 }} />,
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
        },
        {
            title: 'Validés',
            value: '892',
            change: '+18%',
            trend: 'up',
            icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Validé': return 'success';
            case 'En attente': return 'warning';
            case 'En cours': return 'info';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critique': return '#ef4444';
            case 'Haute': return '#f59e0b';
            case 'Moyenne': return '#3b82f6';
            case 'Basse': return '#6b7280';
            default: return '#6b7280';
        }
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#1A1A1A' }}>
                    Tableau de bord
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                    Vue d'ensemble de l'activité de la plateforme
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#6b7280', mb: 1, fontWeight: 500 }}>
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h4" fontWeight={800} sx={{ color: '#1A1A1A', mb: 1 }}>
                                            {stat.value}
                                        </Typography>
                                        <Chip
                                            label={stat.change}
                                            size="small"
                                            icon={<ArrowUpwardIcon sx={{ fontSize: 16 }} />}
                                            sx={{
                                                bgcolor: stat.trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                                                fontWeight: 600,
                                                height: 24,
                                            }}
                                        />
                                    </Box>
                                    <Avatar sx={{ bgcolor: stat.bgColor, color: stat.color, width: 56, height: 56 }}>
                                        {stat.icon}
                                    </Avatar>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Charts and Recent Activity */}
            <Grid container spacing={3}>
                {/* Activity Chart */}
                <Grid item xs={12} lg={8}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6" fontWeight={700} gutterBottom>
                                        Activité mensuelle
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                        Évolution des signalements par mois
                                    </Typography>
                                </Box>
                                <IconButton size="small">
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>

                            {/* Graphique simplifié avec barres de progression */}
                            <Box sx={{ mt: 4 }}>
                                {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'].map((month, index) => (
                                    <Box key={month} sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" fontWeight={500}>{month}</Typography>
                                            <Typography variant="body2" fontWeight={600} sx={{ color: '#1F9EF9' }}>
                                                {Math.floor(Math.random() * 200) + 50}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={Math.random() * 100}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: 'rgba(31, 158, 249, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 4,
                                                    background: 'linear-gradient(90deg, #1F9EF9 0%, #21CBF3 100%)',
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Categories */}
                <Grid item xs={12} lg={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Catégories populaires
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                Types d'arnaques les plus signalés
                            </Typography>

                            <Box>
                                {[
                                    { name: 'Phishing', count: 342, percent: 85 },
                                    { name: 'Faux sites', count: 256, percent: 70 },
                                    { name: 'Appels frauduleux', count: 198, percent: 55 },
                                    { name: 'SMS suspects', count: 145, percent: 40 },
                                    { name: 'Réseaux sociaux', count: 89, percent: 25 },
                                ].map((category, index) => (
                                    <Box key={index} sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" fontWeight={500}>{category.name}</Typography>
                                            <Typography variant="body2" fontWeight={600} sx={{ color: '#1F9EF9' }}>
                                                {category.count}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={category.percent}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: 'rgba(31, 158, 249, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 3,
                                                    bgcolor: '#1F9EF9',
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Dashboard;
