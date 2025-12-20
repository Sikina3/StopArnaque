import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
    TextField,
    IconButton,
    Badge,
    CircularProgress,
    InputAdornment
} from '@mui/material';
import {
    Send as SendIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    AttachFile as AttachFileIcon,
    EmojiEmotions as EmojiIcon
} from '@mui/icons-material';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

function AdminMessages() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const targetUserId = searchParams.get('userId');

    const [conversations, setConversations] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (user?.id) {
            fetchConversations();
        }
    }, [user]);

    useEffect(() => {
        if (targetUserId && conversations.length > 0) {
            const conv = conversations.find(c => c.id === parseInt(targetUserId));
            if (conv) {
                setSelectedConv(conv);
            }
        }
    }, [targetUserId, conversations]);

    useEffect(() => {
        if (selectedConv) {
            fetchMessages(selectedConv.id);
        }
    }, [selectedConv]);

    const fetchConversations = async () => {
        if (!user?.id) return;
        console.log("DATA:", user)
        try {
            setLoading(true);
            console.log('🔍 Fetching conversations for admin...', user);
            console.log('📤 Making request with params:', { admin_id: user.id });
            const res = await api.get('/messages', { params: { admin_id: user.id } });
            console.log('📨 Messages received:', res.data);
            console.log('📊 Response status:', res.status);
            console.log('📋 Response headers:', res.headers);

            // Comptons tous les messages dans la DB pour debug
            const totalCount = res.data.length;
            console.log(`📈 Total messages in response: ${totalCount}`);

            if (totalCount > 0) {
                console.log('🔍 First message sample:', res.data[0]);
                console.log('🔍 Checking from_id and to_id:', {
                    from_ids: [...new Set(res.data.map(m => m.from_id))],
                    to_ids: [...new Set(res.data.map(m => m.to_id))],
                    current_user_id: user.id
                });
            }

            const allMessages = res.data;

            const userMap = {};
            allMessages.forEach(msg => {
                const otherUser = msg.from_id === user.id ? msg.to : msg.from;
                console.log('👤 Processing message:', msg.id, 'Other user:', otherUser);
                if (otherUser && otherUser.id !== user.id) {
                    if (!userMap[otherUser.id] || new Date(msg.created_at) > new Date(userMap[otherUser.id].lastMessageDate)) {
                        userMap[otherUser.id] = {
                            ...otherUser,
                            lastMessage: msg.contenue,
                            lastMessageDate: msg.created_at,
                            unread: !msg.lu && msg.to_id === user.id
                        };
                    }
                }
            });

            const convList = Object.values(userMap).sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));
            console.log('💬 Conversations found:', convList.length, convList);
            setConversations(convList);

            if (convList.length > 0 && !selectedConv && !targetUserId) {
                setSelectedConv(convList[0]);
            }
        } catch (error) {
            console.error("❌ Erreur chargement conversations:", error);
            console.error("Error details:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            setLoadingMessages(true);
            const res = await api.get('/messages', { params: { user_id: userId, admin_id: user.id } });
            setMessages(res.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));

            const unread = res.data.filter(m => !m.lu && m.to_id === user.id);
            for (const m of unread) {
                await api.post(`/messages/${m.id}/read`);
            }
        } catch (error) {
            console.error("Erreur chargement messages:", error);
        } finally {
            setLoadingMessages(false);
        }
    };

    const handleSend = async () => {
        if (!newMessage.trim() || !selectedConv) return;

        try {
            const res = await api.post('/messages', {
                from_id: user.id,
                to_id: selectedConv.id,
                contenue: newMessage
            });
            setMessages([...messages, res.data]);
            setNewMessage('');

            setConversations(prev => prev.map(c =>
                c.id === selectedConv.id
                    ? { ...c, lastMessage: newMessage, lastMessageDate: new Date().toISOString() }
                    : c
            ).sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)));

        } catch (error) {
            console.error("Erreur envoi message:", error);
        }
    };

    const filteredConversations = conversations.filter(c =>
        (c.name || c.pseudo || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', mt: -2 }}>
            <Grid container sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Grid item xs={12} md={4} lg={3} sx={{ bgcolor: 'white', borderRight: '1px solid #eee' }}>
                    <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Messages</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" sx={{ color: '#999' }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 2, bgcolor: '#f5f7fa' }
                            }}
                        />
                    </Box>
                    <List sx={{ overflowY: 'auto', height: 'calc(100% - 110px)', p: 0 }}>
                        {filteredConversations.length === 0 ? (
                            <Box sx={{ p: 4, textAlign: 'center', color: '#999' }}>
                                <Typography variant="body2">
                                    {searchTerm ? 'Aucun utilisateur trouvé' : 'Aucune conversation pour le moment'}
                                </Typography>
                                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                                    {!searchTerm && 'Les utilisateurs qui vous envoient des messages apparaîtront ici'}
                                </Typography>
                            </Box>
                        ) : (
                            filteredConversations.map((conv) => (
                                <React.Fragment key={conv.id}>
                                    <ListItem
                                        button
                                        selected={selectedConv?.id === conv.id}
                                        onClick={() => setSelectedConv(conv)}
                                        sx={{
                                            py: 2,
                                            '&.Mui-selected': {
                                                bgcolor: 'rgba(31, 158, 249, 0.08)',
                                                borderRight: '3px solid #1F9EF9',
                                                '&:hover': { bgcolor: 'rgba(31, 158, 249, 0.12)' }
                                            }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Badge color="error" variant="dot" invisible={!conv.unread}>
                                                <Avatar sx={{ bgcolor: '#1F9EF9' }}>
                                                    {(conv.name || conv.pseudo || 'U').substring(0, 1).toUpperCase()}
                                                </Avatar>
                                            </Badge>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="subtitle2" fontWeight={conv.unread ? 800 : 600}>
                                                        {conv.name || conv.pseudo}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {new Date(conv.lastMessageDate).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    noWrap
                                                    sx={{ fontWeight: conv.unread ? 600 : 400 }}
                                                >
                                                    {conv.lastMessage}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Grid>

                <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: '#ecf0f3ff', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {selectedConv ? (
                        <>
                            <Box sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: '#1F9EF9' }}>
                                        {(selectedConv.name || selectedConv.pseudo || 'U').substring(0, 1).toUpperCase()}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={700}>
                                            {selectedConv.name || selectedConv.pseudo}
                                        </Typography>
                                        <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                                            Utilisateur
                                        </Typography>
                                    </Box>
                                </Box>
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>

                            <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {loadingMessages ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress size={24} /></Box>
                                ) : (
                                    messages.map((msg) => {
                                        const isMe = msg.from_id === user.id;
                                        return (
                                            <Box
                                                key={msg.id}
                                                sx={{
                                                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                                                    maxWidth: '70%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: isMe ? 'flex-end' : 'flex-start'
                                                }}
                                            >
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 2,
                                                        bgcolor: isMe ? '#1F9EF9' : 'white',
                                                        color: isMe ? 'white' : 'text.primary',
                                                        borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                                    }}
                                                >
                                                    <Typography variant="body2">{msg.contenue}</Typography>
                                                </Paper>
                                                <Typography variant="caption" sx={{ mt: 0.5, color: '#999', px: 1 }}>
                                                    {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                </Typography>
                                            </Box>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </Box>

                            <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #eee' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f0f2f5', borderRadius: 4, px: 2, py: 1 }}>
                                    <IconButton size="small"><EmojiIcon sx={{ color: '#666' }} /></IconButton>
                                    <IconButton size="small"><AttachFileIcon sx={{ color: '#666' }} /></IconButton>
                                    <TextField
                                        fullWidth
                                        placeholder="Votre message..."
                                        variant="standard"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                    <IconButton
                                        color="primary"
                                        disabled={!newMessage.trim()}
                                        onClick={handleSend}
                                        sx={{ bgcolor: newMessage.trim() ? '#1F9EF9' : 'transparent', color: newMessage.trim() ? 'white' : '#ccc', '&:hover': { bgcolor: '#187dc2' } }}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#999', gap: 2 }}>
                            <Avatar sx={{ width: 80, height: 80, bgcolor: '#f0f2f5', color: '#ccc' }}>
                                <SendIcon sx={{ fontSize: 40 }} />
                            </Avatar>
                            <Typography variant="h6">Sélectionnez une conversation</Typography>
                            <Typography variant="body2">Choisissez un utilisateur pour commencer à discuter</Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminMessages;
