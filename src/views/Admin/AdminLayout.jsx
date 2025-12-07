import { useState } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    Badge,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Report as ReportIcon,
    Analytics as AnalyticsIcon,
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    Logout as LogoutIcon,
    ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Signalements', icon: <ReportIcon />, path: '/admin/signalements' },
    { text: 'Utilisateurs', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Statistiques', icon: <AnalyticsIcon />, path: '/admin/analytics' },
    { text: 'Paramètres', icon: <SettingsIcon />, path: '/admin/settings' },
];

function AdminLayout() {
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
                    ml: { sm: open ? `${drawerWidth}px` : 0 },
                    transition: 'all 0.3s',
                    bgcolor: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>

                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#1A1A1A', fontWeight: 700 }}>
                        Administration
                    </Typography>

                    <IconButton color="primary" sx={{ mr: 2 }}>
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: '#1F9EF9' }}>A</Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Déconnexion
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: '#1A1A2E',
                        color: '#fff',
                        borderRight: 'none',
                    },
                }}
            >
                <Toolbar sx={{
                    background: 'linear-gradient(135deg, #1F9EF9 0%, #0056b3 100%)',
                    minHeight: '64px !important',
                }}>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                        🛡️ STOP ARNAQUE
                    </Typography>
                </Toolbar>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

                <List sx={{ px: 1, pt: 2 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: isActive ? 'rgba(31, 158, 249, 0.15)' : 'transparent',
                                        '&:hover': {
                                            bgcolor: isActive ? 'rgba(31, 158, 249, 0.25)' : 'rgba(255,255,255,0.05)',
                                        },
                                        color: isActive ? '#1F9EF9' : 'rgba(255,255,255,0.7)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: isActive ? 600 : 400,
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', m: 2, borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Version 1.0.0
                    </Typography>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
                    ml: { sm: open ? 0 : `-${drawerWidth}px` },
                    transition: 'all 0.3s',
                    mt: 8,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default AdminLayout;
