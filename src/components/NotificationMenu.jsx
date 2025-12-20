import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, MenuButton, Menu, MenuItem, Badge, Typography, ListDivider, Box } from '@mui/joy';
import NotificationsIcon from '@mui/icons-material/Notifications';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NotificationMenu() {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchNotifications = useCallback(async () => {
        if (!user) return;

        try {
            // 1. Récupérer les données
            const [sigRes, comRes, reactRes] = await Promise.all([
                api.get('/signalements'),
                api.get('/commentaires'),
                api.get('/reactions')
            ]);

            const allSignalements = sigRes.data || [];
            const allComments = comRes.data || [];
            const allReactions = reactRes.data || [];

            const newNotifs = [];
            const readIds = JSON.parse(localStorage.getItem(`read_notifs_${user.id}`) || '[]');

            // --- Règle 1 : Signalement dans la même ville ---
            // On considère les signalements des dernières 48h
            const threshold = new Date();
            threshold.setHours(threshold.getHours() - 48);

            allSignalements.forEach(sig => {
                // Si le signalement est dans la même ville que l'utilisateur 
                // et qu'il n'est pas l'auteur
                if (sig.utilisateur && sig.utilisateur.ville === user.ville && sig.utilisateur_id !== user.id) {
                    const sigDate = new Date(sig.created_at);
                    if (sigDate > threshold) {
                        const id = `sig_${sig.id}`;
                        newNotifs.push({
                            id,
                            title: 'Nouveau signalement',
                            message: `Un nouveau signalement "${sig.titre}" a été publié à ${user.ville}.`,
                            time: formatTime(sig.created_at),
                            date: sigDate,
                            read: readIds.includes(id),
                            link: `/signalement/${sig.id}`
                        });
                    }
                }
            });

            // --- Règle 2 : Quelqu'un a aimé votre publication ---
            allReactions.forEach(react => {
                const sig = allSignalements.find(s => s.id === react.signalement_id);
                if (sig && sig.utilisateur_id === user.id && react.utilisateur_id !== user.id) {
                    const id = `react_${react.id}`;
                    newNotifs.push({
                        id,
                        title: 'Nouveau Like',
                        message: `${react.utilisateur?.pseudo || 'Quelqu\'un'} a aimé votre signalement "${sig.titre}".`,
                        time: formatTime(react.created_at),
                        date: new Date(react.created_at),
                        read: readIds.includes(id),
                        link: `/signalement/${sig.id}`
                    });
                }
            });

            // --- Règle 3 : Quelqu'un a commenté votre publication ---
            allComments.forEach(com => {
                const sig = allSignalements.find(s => s.id === com.signalement_id);
                if (sig && sig.utilisateur_id === user.id && com.utilisateur_id !== user.id) {
                    const id = `com_${com.id}`;
                    newNotifs.push({
                        id,
                        title: 'Nouveau Commentaire',
                        message: `${com.utilisateur?.pseudo || 'Quelqu\'un'} a commenté votre signalement "${sig.titre}".`,
                        time: formatTime(com.created_at),
                        date: new Date(com.created_at),
                        read: readIds.includes(id),
                        link: `/signalement/${sig.id}`
                    });
                }
            });

            // Trier par date décroissante
            newNotifs.sort((a, b) => b.date - a.date);

            setNotifications(newNotifs);
        } catch (error) {
            console.error("Erreur lors de la récupération des notifications:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchNotifications();
        // Rafraîchir toutes les 2 minutes
        const interval = setInterval(fetchNotifications, 120000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleRead = (notif) => {
        const readIds = JSON.parse(localStorage.getItem(`read_notifs_${user.id}`) || '[]');
        if (!readIds.includes(notif.id)) {
            readIds.push(notif.id);
            localStorage.setItem(`read_notifs_${user.id}`, JSON.stringify(readIds));
        }

        setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));

        if (notif.link) {
            navigate(notif.link);
        }
    };

    const markAllAsRead = () => {
        const readIds = notifications.map(n => n.id);
        localStorage.setItem(`read_notifs_${user.id}`, JSON.stringify(readIds));
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMins < 60) return `Il y a ${diffInMins} min`;
        if (diffInHours < 24) return `Il y a ${diffInHours} h`;
        return `Il y a ${diffInDays} j`;
    };

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: 'div' }}
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
                    <NotificationsIcon sx={{ color: "#acababff", fontSize: { md: "1.8rem" } }} />
                </Badge>
            </MenuButton>
            <Menu
                placement="bottom-end"
                sx={{
                    minWidth: 320,
                    maxWidth: 380,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    borderRadius: 16,
                    p: 2,
                    maxHeight: 500,
                    overflowY: 'auto',
                    zIndex: 1300,
                    border: '1px solid rgba(31, 158, 249, 0.1)'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 1 }}>
                    <Typography level="title-md" sx={{ fontFamily: "Lato", color: "#1F9EF9", fontWeight: 700 }}>
                        Notifications
                    </Typography>
                    {unreadCount > 0 && (
                        <Typography
                            level="body-xs"
                            sx={{ cursor: 'pointer', color: 'text.secondary', '&:hover': { color: '#1F9EF9' }, fontWeight: 600 }}
                            onClick={markAllAsRead}
                        >
                            Tout marquer comme lu
                        </Typography>
                    )}
                </Box>
                <ListDivider sx={{ mb: 1 }} />

                {notifications.length === 0 ? (
                    <Box sx={{ py: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <NotificationsIcon sx={{ color: 'rgba(0,0,0,0.1)', fontSize: '3rem' }} />
                        <Typography level="body-sm" sx={{ color: 'text.tertiary', fontFamily: 'Lato' }}>
                            Aucune notification pour le moment
                        </Typography>
                    </Box>
                ) : (
                    notifications.map((notif) => (
                        <MenuItem
                            key={notif.id}
                            onClick={() => handleRead(notif)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                whiteSpace: 'normal',
                                borderRadius: 12,
                                mb: 1,
                                p: 1.5,
                                bgcolor: notif.read ? 'transparent' : 'rgba(31, 158, 249, 0.05)',
                                borderLeft: notif.read ? '4px solid transparent' : '4px solid #1F9EF9',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: 'rgba(31, 158, 249, 0.1)',
                                    transform: 'translateX(4px)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', mb: 0.5 }}>
                                <Typography level="title-sm" sx={{
                                    fontWeight: notif.read ? 600 : 800,
                                    color: notif.read ? 'text.primary' : '#1F9EF9',
                                    fontFamily: 'Lato'
                                }}>
                                    {notif.title}
                                </Typography>
                                <Typography level="body-xs" sx={{ color: 'text.tertiary', fontSize: '0.65rem', fontWeight: 500 }}>
                                    {notif.time}
                                </Typography>
                            </Box>
                            <Typography level="body-sm" sx={{
                                color: 'text.secondary',
                                lineHeight: 1.4,
                                fontFamily: 'Lato',
                                fontSize: '0.85rem'
                            }}>
                                {notif.message}
                            </Typography>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </Dropdown>
    );
}
