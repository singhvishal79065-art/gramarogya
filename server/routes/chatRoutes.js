const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Chat = require('../models/Chat');
const User = require('../models/User');

// @route   POST /api/chat
// @desc    Send a message
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { receiverId, message } = req.body;

        const chat = await Chat.create({
            sender: req.user._id,
            receiver: receiverId,
            message
        });

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/chat/conversations
// @desc    Get list of users the current user has chatted with
// @access  Private
router.get('/conversations', protect, async (req, res) => {
    try {
        // Find all chats where user is sender or receiver
        const chats = await Chat.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }]
        }).sort({ createdAt: -1 });

        const userIds = new Set();
        chats.forEach(chat => {
            if (chat.sender.toString() !== req.user._id.toString()) {
                userIds.add(chat.sender.toString());
            }
            if (chat.receiver.toString() !== req.user._id.toString()) {
                userIds.add(chat.receiver.toString());
            }
        });

        const users = await User.find({ _id: { $in: Array.from(userIds) } })
            .select('name role email specialization shopName');

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/chat/:userId
// @desc    Get messages with a specific user
// @access  Private
router.get('/:userId', protect, async (req, res) => {
    try {
        const messages = await Chat.find({
            $or: [
                { sender: req.user._id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user._id }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
