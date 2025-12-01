const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Report = require('../models/Report');

// @route   GET /api/admin/users
// @desc    Get all users (filter by role/approval)
// @access  Private (Admin only)
router.get('/users', protect, authorize('admin'), async (req, res) => {
    try {
        const { role, isApproved } = req.query;
        let query = {};
        
        if (role) query.role = role;
        if (isApproved !== undefined) query.isApproved = isApproved;

        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/admin/users/:id/approve
// @desc    Approve a user (doctor/shopkeeper)
// @access  Private (Admin only)
router.put('/users/:id/approve', protect, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isApproved = true;
        await user.save();
        res.json({ message: 'User approved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/admin/reports
// @desc    Get all reports
// @access  Private (Admin only)
router.get('/reports', protect, authorize('admin'), async (req, res) => {
    try {
        const reports = await Report.find({})
            .populate('reporter', 'name role')
            .populate('reportedUser', 'name role');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/admin/reports/:id
// @desc    Resolve a report
// @access  Private (Admin only)
router.put('/reports/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        report.status = 'resolved';
        await report.save();
        res.json({ message: 'Report resolved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
