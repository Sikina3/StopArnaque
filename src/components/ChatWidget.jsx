import React, { useEffect, useState, useRef } from 'react';
import { Box, Paper, Typography, IconButton, TextField, Avatar, Fab, Badge } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from "../services/api";
import { useAuth } from '../context/AuthContext';

const ChatWidget = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    const [messages, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [adminId, setAdminId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isExpanded]);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await api.get('/admin-contact');
                setAdminId(res.data.id);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'admin:", error);
            }
        };
        fetchAdmin();
    }, []);

    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchMessage = async () => {
            try {
                const res = await api.get('/messages', { params: { user_id: user.id } });
                const sortedMessage = res.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                setMessage(sortedMessage);
            } catch (error) {
                console.log("Error fetching messages:", error.response?.data || error.message);
            }
        };
        fetchMessage();
    }, [isOpen, user]);

    const handleSend = async () => {
        console.log("adminId: ", adminId, "message: ", newMessage);

        if (!newMessage.trim() || !adminId) return;
        console.log("Eto??")

        try {
            const res = await api.post('/messages', {
                from_id: user.id,
                to_id: adminId,
                contenue: newMessage
            });
            setMessage([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.error("Erreur d'envoie de message: ", err);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setIsExpanded(true);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
            {/* Chat Window */}
            {isOpen && (
                <Paper
                    elevation={12}
                    sx={{
                        width: 340,
                        height: isExpanded ? 480 : 56,
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: '16px 16px 4px 4px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 1.5,
                            bgcolor: 'white',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            height: 56,
                            '&:hover': { bgcolor: '#fafafa' }
                        }}
                        onClick={toggleExpand}
                    >
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                sx={{ '& .MuiBadge-badge': { backgroundColor: '#44b700', color: '#44b700', boxShadow: '0 0 0 2px white' } }}
                            >
                                <Avatar
                                    src="/broken-image.jpg"
                                    sx={{ width: 32, height: 32, bgcolor: '#1F9EF9', fontSize: '0.9rem' }}
                                >
                                    A
                                </Avatar>
                            </Badge>
                            <Box>
                                <Typography variant="subtitle2" fontWeight="700" lineHeight={1.2}>
                                    Messagerie
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#44b700', display: 'inline-block' }} />
                                    En ligne
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleExpand(); }}>
                                {isExpanded ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
                            </IconButton>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleChat(); }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Content - Only visible if expanded */}
                    {isExpanded && (
                        <>
                            <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#f8f9fa', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {messages.map((msg) => {
                                    const isMe = msg.from_id === user?.id;
                                    return (
                                        <Box key={msg.id} sx={{ display: 'flex', gap: 1, maxWidth: '85%', alignSelf: isMe ? 'flex-end' : 'flex-start', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                                            {!isMe && <Avatar sx={{ width: 28, height: 28, bgcolor: '#1F9EF9', fontSize: '0.8rem' }}>A</Avatar>}
                                            <Box sx={{
                                                bgcolor: isMe ? '#1F9EF9' : 'white',
                                                color: isMe ? 'white' : 'text.primary',
                                                p: 1.5,
                                                borderRadius: isMe ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                            }}>
                                                <Typography variant="body2">
                                                    {msg.contenue}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </Box>

                            {/* Input Area */}
                            <Box sx={{ p: 1.5, bgcolor: 'white', borderTop: '1px solid #eee' }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    bgcolor: '#f0f2f5',
                                    borderRadius: 6,
                                    px: 2,
                                    py: 0.5
                                }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Écrire un message..."
                                        value={newMessage}
                                        variant="standard"
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        InputProps={{ disableUnderline: true }}
                                        size="small"
                                        sx={{ py: 1 }}
                                    />
                                    <IconButton size="small" color="primary" onClick={handleSend}>
                                        <SendIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </>
                    )}
                </Paper>
            )}

            {/* FAB Button */}
            {!isOpen && (
                <Fab
                    color="primary"
                    aria-label="chat"
                    onClick={toggleChat}
                    sx={{
                        bgcolor: '#1F9EF9',
                        '&:hover': { bgcolor: '#187dc2' },
                        width: 56,
                        height: 56,
                        boxShadow: '0 4px 20px rgba(31, 158, 249, 0.4)'
                    }}
                >
                    <Badge badgeContent={1} color="error">
                        <ChatIcon sx={{ fontSize: 26 }} />
                    </Badge>
                </Fab>
            )}
        </Box>
    );
};

export default ChatWidget;
