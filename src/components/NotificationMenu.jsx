import React, { useState } from 'react';
import { Dropdown, MenuButton, Menu, MenuItem, Badge, Typography, ListDivider, Box } from '@mui/joy';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';

export default function NotificationMenu() {
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Nouveau signalement', message: 'Un nouveau signalement a été ajouté près de chez vous.', time: 'Il y a 5 min', read: false },
        { id: 2, title: 'Mise à jour', message: 'Votre signalement a été validé par un administrateur.', time: 'Il y a 1 heure', read: false },
        { id: 3, title: 'Bienvenue', message: 'Bienvenue sur Stop Arnaque ! Commencez par signaler une arnaque.', time: 'Il y a 1 jour', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: 'div' }} // To avoid button inside button issues if any, but MenuButton is usually a button.
                variant="plain"
                sx={{
                    borderRadius: "50%",
                    p: 1,
                    "&:hover": { backgroundColor: "rgba(31, 158, 249, 0.1)" },
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                }}
            >
                <Badge badgeContent={unreadCount} color="danger" size="sm" invisible={unreadCount === 0}>
                    <NotificationsIcon sx={{ color: "#1F9EF9", fontSize: "1.8rem" }} />
                </Badge>
            </MenuButton>
            <Menu
                placement="bottom-end"
                sx={{
                    minWidth: 300,
                    maxWidth: 350,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    borderRadius: 12,
                    p: 2,
                    maxHeight: 400,
                    overflowY: 'auto',
                    zIndex: 1300
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 1 }}>
                    <Typography level="title-md" sx={{ fontFamily: "Lato", color: "#1F9EF9", fontWeight: 700 }}>
                        Notifications
                    </Typography>
                    {unreadCount > 0 && (
                        <Typography
                            level="body-xs"
                            sx={{ cursor: 'pointer', color: 'text.secondary', '&:hover': { color: '#1F9EF9' } }}
                            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        >
                            Tout marquer comme lu
                        </Typography>
                    )}
                </Box>
                <ListDivider sx={{ mb: 1 }} />

                {notifications.length === 0 ? (
                    <MenuItem disabled sx={{ justifyContent: 'center', py: 3 }}>
                        <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>Aucune notification</Typography>
                    </MenuItem>
                ) : (
                    notifications.map((notif) => (
                        <MenuItem
                            key={notif.id}
                            onClick={() => handleRead(notif.id)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                whiteSpace: 'normal',
                                borderRadius: 8,
                                mb: 0.5,
                                p: 1.5,
                                bgcolor: notif.read ? 'transparent' : 'rgba(31, 158, 249, 0.04)',
                                borderLeft: notif.read ? '3px solid transparent' : '3px solid #1F9EF9',
                                '&:hover': { bgcolor: 'rgba(31, 158, 249, 0.08)' }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', mb: 0.5 }}>
                                <Typography level="title-sm" sx={{ fontWeight: notif.read ? 500 : 700, color: notif.read ? 'text.primary' : '#1F9EF9' }}>
                                    {notif.title}
                                </Typography>
                                <Typography level="body-xs" sx={{ color: 'text.tertiary', fontSize: '0.7rem' }}>
                                    {notif.time}
                                </Typography>
                            </Box>
                            <Typography level="body-sm" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                                {notif.message}
                            </Typography>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </Dropdown>
    );
}
