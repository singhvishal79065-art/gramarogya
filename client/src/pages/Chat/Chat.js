import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [userRole, setUserRole] = useState('');
    const messagesEndRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role);
        fetchConversations();
        
        // If navigated with a specific user to chat with
        if (location.state && location.state.chatWith) {
            handleUserSelect(location.state.chatWith);
        }
    }, [location.state]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get('http://localhost:5000/api/chat/conversations', config);
            setConversations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`http://localhost:5000/api/chat/${userId}`, config);
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        fetchMessages(user._id);
        
        // Add to conversations if not already there
        if (!conversations.find(c => c._id === user._id)) {
            setConversations(prev => [user, ...prev]);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            const res = await axios.post('http://localhost:5000/api/chat', {
                receiverId: selectedUser._id,
                message: newMessage
            }, config);

            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar role={userRole} />
            <div className="container" style={{ flex: 1, display: 'flex', gap: '2rem', padding: '2rem', height: 'calc(100vh - 80px)' }}>
                {/* Conversations List */}
                <div style={{ width: '300px', borderRight: '1px solid #eee', overflowY: 'auto' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Messages</h3>
                    {conversations.map(user => (
                        <div 
                            key={user._id}
                            onClick={() => handleUserSelect(user)}
                            style={{
                                padding: '1rem',
                                cursor: 'pointer',
                                background: selectedUser?._id === user._id ? '#f0fdf4' : 'transparent',
                                borderRadius: '8px',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#ddd',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}>
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', margin: 0 }}>{user.name}</h4>
                                <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>{user.role}</p>
                            </div>
                        </div>
                    ))}
                    {conversations.length === 0 && <p style={{ color: '#999' }}>No conversations yet.</p>}
                </div>

                {/* Chat Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {selectedUser ? (
                        <>
                            <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                                <h3>{selectedUser.name}</h3>
                            </div>
                            
                            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {messages.map((msg, index) => {
                                    const isMe = msg.sender !== selectedUser._id;
                                    return (
                                        <div 
                                            key={index}
                                            style={{
                                                alignSelf: isMe ? 'flex-end' : 'flex-start',
                                                maxWidth: '70%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '12px',
                                                background: isMe ? '#166534' : '#f3f4f6',
                                                color: isMe ? 'white' : 'black',
                                                borderBottomRightRadius: isMe ? '4px' : '12px',
                                                borderBottomLeftRadius: isMe ? '12px' : '4px'
                                            }}
                                        >
                                            {msg.message}
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid #eee', display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        outline: 'none'
                                    }}
                                />
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={!newMessage.trim()}
                                >
                                    Send
                                </button>
                            </form>
                        </>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                            Select a conversation to start chatting
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
