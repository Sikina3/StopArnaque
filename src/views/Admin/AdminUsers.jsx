import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    Divider,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
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
    FormControlLabel,
    Switch,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Block as BlockIcon,
    CheckCircle as CheckCircleIcon,
    Delete as DeleteIcon,
    Chat as ChatIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState('');
    const [newUser, setNewUser] = useState({
        name: '',
        pseudo: '',
        email: '',
        phone: '',
        password: '',
        admin: true
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            const formattedUsers = response.data.map(user => ({
                id: user.id,
                name: user.name || user.pseudo || 'Utilisateur',
                email: user.email,
                role: user.admin ? 'Admin' : 'Utilisateur',
                phone: user.phone,
                signalements: user.signalements_count || 0,
                joined: new Date(user.created_at).toLocaleDateString('fr-FR'),
                avatar: (user.name || user.pseudo || 'U').substring(0, 2).toUpperCase(),
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
        }
    };


    const handleMenuOpen = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        console.log('Modifier:', selectedUser);
        handleMenuClose();
    };

    const handleBlock = () => {
        console.log('Bloquer:', selectedUser);
        handleMenuClose();
    };

    const handleActivate = () => {
        console.log('Activer:', selectedUser);
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${selectedUser.name} ?`)) {
            try {
                await api.delete(`/users/${selectedUser.id}`);
                setUsers(users.filter(u => u.id !== selectedUser.id));
                handleMenuClose();
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
                alert("Erreur lors de la suppression de l'utilisateur.");
            }
        }
    };

    const handleMessage = () => {
        if (!selectedUser) return;
        navigate(`/admin/messages?userId=${selectedUser.id}`);
        handleMenuClose();
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        setCreateError('');

        try {
            const res = await api.post('/users', newUser);
            // Recharger la liste
            fetchUsers();
            setCreateDialogOpen(false);
            setNewUser({
                name: '',
                phone: '',
                password: '',
                admin: true
            });
        } catch (error) {
            console.error("Erreur création utilisateur:", error);
            setCreateError(error.response?.data?.message || "Erreur lors de la création du compte.");
        } finally {
            setCreateLoading(false);
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin': return '#8b5cf6';
            case 'Modérateur': return '#3b82f6';
            case 'Utilisateur': return '#6b7280';
            default: return '#6b7280';
        }
    };

    const filteredUsers = users.filter(user =>
        String(user.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(user.email).toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#1A1A1A' }}>
                    Gestion des utilisateurs
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                    Gérez les comptes utilisateurs et leurs permissions
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                {[
                    { label: 'Total Utilisateurs', value: users.length, color: '#1F9EF9' },
                    { label: 'Bloqués', value: '0', color: '#ef4444' },
                ].map((stat, index) => (
                    <Card
                        key={index}
                        sx={{
                            flex: 1,
                            minWidth: 200,
                            borderRadius: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            borderLeft: `4px solid ${stat.color}`,
                        }}
                    >
                        <CardContent>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                                {stat.label}
                            </Typography>
                            <Typography variant="h4" fontWeight={800} sx={{ color: stat.color }}>
                                {stat.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Search and Actions */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Rechercher un utilisateur..."
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
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setCreateDialogOpen(true)}
                            sx={{
                                borderRadius: 2,
                                background: 'linear-gradient(45deg, #1F9EF9 30%, #21CBF3 90%)',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3
                            }}
                        >
                            Ajouter un admin
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f9fafb' }}>
                                    <TableCell sx={{ fontWeight: 700 }}>Utilisateur</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Rôle</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Numero de Tel.</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Signalements</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Date d'inscription</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            '&:hover': { bgcolor: '#f9fafb' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: '#1F9EF9' }}>
                                                    {user.avatar}
                                                </Avatar>
                                                <Typography variant="body2" fontWeight={600}>
                                                    {user.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role}
                                                size="small"
                                                sx={{
                                                    bgcolor: `${getRoleColor(user.role)}15`,
                                                    color: getRoleColor(user.role),
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.phone}
                                                size="small"
                                                color={"red"}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600}>
                                                {user.signalements}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{user.joined}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleMenuOpen(e, user)}
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
                <MenuItem onClick={handleMessage}>
                    <ChatIcon sx={{ mr: 1, fontSize: 20, color: '#1F9EF9' }} />
                    Envoyer un message
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Modifier
                </MenuItem>
                <MenuItem onClick={handleActivate}>
                    <CheckCircleIcon sx={{ mr: 1, fontSize: 20, color: '#10b981' }} />
                    Activer
                </MenuItem>
                <MenuItem onClick={handleBlock}>
                    <BlockIcon sx={{ mr: 1, fontSize: 20, color: '#ef4444' }} />
                    Bloquer
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDelete} sx={{ color: '#ef4444' }}>
                    <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
                    Supprimer le compte
                </MenuItem>
            </Menu>

            {/* Create User Dialog */}
            <Dialog
                open={createDialogOpen}
                onClose={() => !createLoading && setCreateDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 800 }}>Créer un nouveau compte</DialogTitle>
                <form onSubmit={handleCreateUser}>
                    <DialogContent dividers>
                        {createError && (
                            <Alert severity="error" sx={{ mb: 2 }}>{createError}</Alert>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Nom"
                                required
                                fullWidth
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                            <TextField
                                label="Numéro de téléphone"
                                required
                                fullWidth
                                value={newUser.phone}
                                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                            />
                            <TextField
                                label="Mot de passe"
                                type="password"
                                required
                                fullWidth
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={newUser.admin}
                                        onChange={(e) => setNewUser({ ...newUser, admin: e.target.checked })}
                                        color="primary"
                                    />
                                }
                                label="Droits d'administrateur"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2.5 }}>
                        <Button
                            onClick={() => setCreateDialogOpen(false)}
                            disabled={createLoading}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={createLoading}
                            sx={{ borderRadius: 2, px: 4 }}
                        >
                            {createLoading ? <CircularProgress size={24} color="inherit" /> : "Créer le compte"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}

export default AdminUsers;
