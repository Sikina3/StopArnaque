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
    Avatar,
    Chip,
    IconButton,
    Button,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Block as BlockIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Données de démonstration
    const users = [
        {
            id: 1,
            name: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            role: 'Utilisateur',
            status: 'Actif',
            signalements: 5,
            joined: '2025-10-15',
            avatar: 'JD',
        },
        {
            id: 2,
            name: 'Marie Martin',
            email: 'marie.martin@email.com',
            role: 'Utilisateur',
            status: 'Actif',
            signalements: 12,
            joined: '2025-09-22',
            avatar: 'MM',
        },
        {
            id: 3,
            name: 'Pierre Durant',
            email: 'pierre.durant@email.com',
            role: 'Modérateur',
            status: 'Actif',
            signalements: 8,
            joined: '2025-08-10',
            avatar: 'PD',
        },
        {
            id: 4,
            name: 'Sophie Bernard',
            email: 'sophie.bernard@email.com',
            role: 'Utilisateur',
            status: 'Inactif',
            signalements: 3,
            joined: '2025-11-05',
            avatar: 'SB',
        },
        {
            id: 5,
            name: 'Luc Petit',
            email: 'luc.petit@email.com',
            role: 'Utilisateur',
            status: 'Actif',
            signalements: 15,
            joined: '2025-07-18',
            avatar: 'LP',
        },
        {
            id: 6,
            name: 'Emma Rousseau',
            email: 'emma.rousseau@email.com',
            role: 'Utilisateur',
            status: 'Bloqué',
            signalements: 1,
            joined: '2025-11-28',
            avatar: 'ER',
        },
    ];

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Actif': return 'success';
            case 'Inactif': return 'warning';
            case 'Bloqué': return 'error';
            default: return 'default';
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
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                    { label: 'Total Utilisateurs', value: '856', color: '#1F9EF9' },
                    { label: 'Actifs', value: '742', color: '#10b981' },
                    { label: 'Inactifs', value: '98', color: '#f59e0b' },
                    { label: 'Bloqués', value: '16', color: '#ef4444' },
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
                            sx={{ borderRadius: 2 }}
                        >
                            Exporter
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
                                    <TableCell sx={{ fontWeight: 700 }}>Statut</TableCell>
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
                                                label={user.status}
                                                size="small"
                                                color={getStatusColor(user.status)}
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
            </Menu>
        </Box>
    );
}

export default AdminUsers;
