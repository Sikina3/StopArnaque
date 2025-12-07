import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Button,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Visibility as VisibilityIcon,
    FilterList as FilterListIcon,
} from '@mui/icons-material';

function AdminSignalements() {
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSignalement, setSelectedSignalement] = useState(null);

    // Données de démonstration
    const signalements = [
        {
            id: 1,
            title: 'Arnaque WhatsApp - Faux support technique',
            user: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            category: 'Phishing',
            status: 'En attente',
            date: '2025-12-07',
            priority: 'Haute',
            description: 'Un numéro inconnu prétend être du support technique Microsoft...',
        },
        {
            id: 2,
            title: 'Faux site bancaire BNP',
            user: 'Marie Martin',
            email: 'marie.martin@email.com',
            category: 'Faux site',
            status: 'Validé',
            date: '2025-12-06',
            priority: 'Critique',
            description: 'Site web frauduleux imitant le site officiel de la BNP...',
        },
        {
            id: 3,
            title: 'Email phishing Amazon',
            user: 'Pierre Durant',
            email: 'pierre.durant@email.com',
            category: 'Phishing',
            status: 'En cours',
            date: '2025-12-06',
            priority: 'Moyenne',
            description: 'Email frauduleux demandant de mettre à jour les informations de paiement...',
        },
        {
            id: 4,
            title: 'Appel frauduleux - Impôts',
            user: 'Sophie Bernard',
            email: 'sophie.bernard@email.com',
            category: 'Appel téléphonique',
            status: 'Validé',
            date: '2025-12-05',
            priority: 'Haute',
            description: 'Appel téléphonique prétendant provenir des impôts...',
        },
        {
            id: 5,
            title: 'SMS suspect - Livraison Colissimo',
            user: 'Luc Petit',
            email: 'luc.petit@email.com',
            category: 'SMS',
            status: 'En attente',
            date: '2025-12-05',
            priority: 'Basse',
            description: 'SMS frauduleux concernant une prétendue livraison...',
        },
        {
            id: 6,
            title: 'Fausse offre d\'emploi Indeed',
            user: 'Emma Rousseau',
            email: 'emma.rousseau@email.com',
            category: 'Arnaque emploi',
            status: 'Rejeté',
            date: '2025-12-04',
            priority: 'Moyenne',
            description: 'Offre d\'emploi frauduleuse demandant des frais d\'inscription...',
        },
    ];

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleMenuOpen = (event, signalement) => {
        setAnchorEl(event.currentTarget);
        setSelectedSignalement(signalement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewDetails = () => {
        setDialogOpen(true);
        handleMenuClose();
    };

    const handleApprove = () => {
        console.log('Approuver:', selectedSignalement);
        handleMenuClose();
    };

    const handleReject = () => {
        console.log('Rejeter:', selectedSignalement);
        handleMenuClose();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Validé': return 'success';
            case 'En attente': return 'warning';
            case 'En cours': return 'info';
            case 'Rejeté': return 'error';
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

    const filteredSignalements = signalements.filter(sig => {
        const matchesSearch = sig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sig.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab =
            (tabValue === 0) || // Tous
            (tabValue === 1 && sig.status === 'En attente') ||
            (tabValue === 2 && sig.status === 'Validé') ||
            (tabValue === 3 && sig.status === 'Rejeté');

        return matchesSearch && matchesTab;
    });

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#1A1A1A' }}>
                    Gestion des signalements
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                    Modérez et validez les signalements soumis par les utilisateurs
                </Typography>
            </Box>

            {/* Filter Section */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                        <TextField
                            placeholder="Rechercher un signalement..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ flexGrow: 1, minWidth: 300 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#6b7280' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ borderRadius: 2 }}
                        >
                            Filtres
                        </Button>
                    </Box>

                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{ mt: 3 }}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Tous" />
                        <Tab label="En attente" />
                        <Tab label="Validés" />
                        <Tab label="Rejetés" />
                    </Tabs>
                </CardContent>
            </Card>

            {/* Signalements Table */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f9fafb' }}>
                                    <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Titre</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Utilisateur</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Catégorie</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Priorité</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Statut</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredSignalements.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:hover': { bgcolor: '#f9fafb' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 600 }}>#{row.id}</TableCell>
                                        <TableCell sx={{ maxWidth: 300 }}>
                                            <Typography variant="body2" fontWeight={600} noWrap>
                                                {row.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{row.user}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.category}
                                                size="small"
                                                sx={{ bgcolor: 'rgba(31, 158, 249, 0.1)', color: '#1F9EF9' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.priority}
                                                size="small"
                                                sx={{
                                                    bgcolor: `${getPriorityColor(row.priority)}15`,
                                                    color: getPriorityColor(row.priority),
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                size="small"
                                                color={getStatusColor(row.status)}
                                            />
                                        </TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleMenuOpen(e, row)}
                                            >
                                                <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleViewDetails}>
                    <VisibilityIcon sx={{ mr: 1, fontSize: 20 }} />
                    Voir les détails
                </MenuItem>
                <MenuItem onClick={handleApprove}>
                    <CheckCircleIcon sx={{ mr: 1, fontSize: 20, color: '#10b981' }} />
                    Valider
                </MenuItem>
                <MenuItem onClick={handleReject}>
                    <CancelIcon sx={{ mr: 1, fontSize: 20, color: '#ef4444' }} />
                    Rejeter
                </MenuItem>
            </Menu>

            {/* Details Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 700 }}>
                    Détails du signalement #{selectedSignalement?.id}
                </DialogTitle>
                <DialogContent dividers>
                    {selectedSignalement && (
                        <Box>
                            <Typography variant="h6" gutterBottom fontWeight={600}>
                                {selectedSignalement.title}
                            </Typography>

                            <Box sx={{ my: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label={selectedSignalement.category} size="small" color="primary" />
                                <Chip label={selectedSignalement.priority} size="small" />
                                <Chip label={selectedSignalement.status} size="small" color={getStatusColor(selectedSignalement.status)} />
                            </Box>

                            <Box sx={{ my: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Soumis par
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {selectedSignalement.user}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedSignalement.email}
                                </Typography>
                            </Box>

                            <Box sx={{ my: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Description
                                </Typography>
                                <Typography variant="body1">
                                    {selectedSignalement.description}
                                </Typography>
                            </Box>

                            <Box sx={{ my: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Date de soumission
                                </Typography>
                                <Typography variant="body1">
                                    {selectedSignalement.date}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setDialogOpen(false)}>Fermer</Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => {
                            handleReject();
                            setDialogOpen(false);
                        }}
                    >
                        Rejeter
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => {
                            handleApprove();
                            setDialogOpen(false);
                        }}
                    >
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AdminSignalements;
