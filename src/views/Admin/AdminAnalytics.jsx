import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

function AdminAnalytics() {
    const monthlyData = [
        { month: 'Janvier', signalements: 145, users: 89, validates: 120 },
        { month: 'Février', signalements: 168, users: 102, validates: 142 },
        { month: 'Mars', signalements: 192, users: 125, validates: 165 },
        { month: 'Avril', signalements: 156, users: 98, validates: 138 },
        { month: 'Mai', signalements: 203, users: 147, validates: 178 },
        { month: 'Juin', signalements: 234, users: 168, validates: 201 },
    ];

    const categoryStats = [
        { name: 'Phishing', count: 342, percent: 28, trend: 'up', change: '+12%' },
        { name: 'Faux sites web', count: 256, percent: 21, trend: 'up', change: '+8%' },
        { name: 'Appels frauduleux', count: 198, percent: 16, trend: 'down', change: '-3%' },
        { name: 'SMS suspects', count: 145, percent: 12, trend: 'up', change: '+15%' },
        { name: 'Réseaux sociaux', count: 134, percent: 11, trend: 'up', change: '+5%' },
        { name: 'Arnaques emploi', count: 89, percent: 7, trend: 'down', change: '-2%' },
        { name: 'Autres', count: 56, percent: 5, trend: 'up', change: '+4%' },
    ];

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#1A1A1A' }}>
                    Statistiques avancées
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                    Analyses détaillées et tendances de la plateforme
                </Typography>
            </Box>

            {/* Monthly Evolution */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Évolution mensuelle
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 4 }}>
                        Progression des signalements et utilisateurs
                    </Typography>

                    <Grid container spacing={3}>
                        {monthlyData.map((data, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Box sx={{
                                    p: 3,
                                    bgcolor: '#f9fafb',
                                    borderRadius: 2,
                                    border: '1px solid #e5e7eb',
                                }}>
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                        {data.month} 2025
                                    </Typography>

                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Signalements
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600} sx={{ color: '#1F9EF9' }}>
                                                {data.signalements}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(data.signalements / 250) * 100}
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

                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Nouveaux utilisateurs
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981' }}>
                                                {data.users}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(data.users / 200) * 100}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: 'rgba(16, 185, 129, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 3,
                                                    bgcolor: '#10b981',
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Validés
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600} sx={{ color: '#8b5cf6' }}>
                                                {data.validates}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(data.validates / 250) * 100}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: 'rgba(139, 92, 246, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 3,
                                                    bgcolor: '#8b5cf6',
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            {/* Category Statistics */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Statistiques par catégorie
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 4 }}>
                        Répartition des types d'arnaques signalées
                    </Typography>

                    <Grid container spacing={3}>
                        {categoryStats.map((category, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box sx={{
                                    p: 3,
                                    bgcolor: '#f9fafb',
                                    borderRadius: 2,
                                    border: '1px solid #e5e7eb',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transform: 'translateY(-2px)',
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {category.name}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            color: category.trend === 'up' ? '#10b981' : '#ef4444'
                                        }}>
                                            {category.trend === 'up' ?
                                                <TrendingUpIcon fontSize="small" /> :
                                                <TrendingDownIcon fontSize="small" />
                                            }
                                            <Typography variant="caption" fontWeight={600}>
                                                {category.change}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="h4" fontWeight={800} sx={{ color: '#1F9EF9', mb: 2 }}>
                                        {category.count}
                                    </Typography>

                                    <LinearProgress
                                        variant="determinate"
                                        value={category.percent * 3.33}
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
                                    <Typography variant="caption" sx={{ color: '#6b7280', mt: 1, display: 'block' }}>
                                        {category.percent}% du total
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default AdminAnalytics;
