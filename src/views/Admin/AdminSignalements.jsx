import { useEffect, useState } from 'react';
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
    CircularProgress
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Visibility as VisibilityIcon,
    FilterList as FilterListIcon,
} from '@mui/icons-material';
import api from '../../services/api';

function AdminSignalements() {
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [signalements, setSignalements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSignalement, setSelectedSignalement] = useState(null);

    useEffect(() => {
        fetchSignalements();
    }, []);

    const fetchSignalements = async () => {
        try {
            setLoading(true);
            const response = await api.get('/signalements');
            if (Array.isArray(response.data)) {
                setSignalements(response.data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des signalements:", error);
        } finally {
            setLoading(false);
        }
    };

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

    const updateStatus = async (newStatus) => {
        if (!selectedSignalement) return;

        try {
            // Appel API pour mettre à jour le statut
            await api.put(`/signalements/${selectedSignalement.id}`, {
                status: newStatus
            });

            // Mettre à jour l'état local
            setSignalements(prevSignalements =>
                prevSignalements.map(sig =>
                    sig.id === selectedSignalement.id
                        ? { ...sig, status: newStatus }
                        : sig
                )
            );

            // Fermer le menu/dialogue
            handleMenuClose();
            setDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut:", error);
            alert("Erreur lors de la mise à jour du statut");
        }
    };

    const handleApprove = () => {
        updateStatus('Validé');
    };

    const handleReject = () => {
        updateStatus('Rejeté');
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'validé': return 'success';
            case 'en attente': return 'warning';
            case 'en cours': return 'info';
            case 'rejeté': return 'error';
            default: return 'default';
        }
    };

    const filteredSignalements = signalements.filter(sig => {
        const matchesSearch =
            (sig.titre?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (sig.utilisateur?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        const matchesTab =
            (tabValue === 0) || // Tous
            (tabValue === 1 && sig.status === 'En Attente') ||
            (tabValue === 2 && sig.status === 'Validé') ||
            (tabValue === 3 && sig.status === 'Rejeté');

        return matchesSearch && matchesTab;
    });

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

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
                                    <TableCell sx={{ fontWeight: 700 }}>Statut</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                            <CircularProgress size={30} />
                                        </TableCell>
                                    </TableRow>
                                ) : filteredSignalements.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                            Aucun signalement trouvé
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredSignalements.map((row) => (
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
                                                    {row.titre}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box>
                                                    <Typography variant="body2">
                                                        {row.utilisateur?.name || 'Anonyme'}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {row.utilisateur?.email || ''}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.type}
                                                    size="small"
                                                    sx={{ bgcolor: 'rgba(31, 158, 249, 0.1)', color: '#1F9EF9' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    size="small"
                                                    color={getStatusColor(row.status)}
                                                />
                                            </TableCell>
                                            <TableCell>{formatDate(row.created_at)}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleMenuOpen(e, row)}
                                                >
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
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
                                {selectedSignalement.titre}
                            </Typography>

                            <Box sx={{ my: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label={selectedSignalement.type} size="small" color="primary" />
                                <Chip label={selectedSignalement.status} size="small" color={getStatusColor(selectedSignalement.status)} />
                            </Box>

                            <Box sx={{ my: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Soumis par
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {selectedSignalement.utilisateur?.name || 'Anonyme'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedSignalement.utilisateur?.email || ''}
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
                                    {formatDate(selectedSignalement.created_at)}
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
