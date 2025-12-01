const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');
const Order = require('../models/Order');

// @route   POST /api/patients/appointments
// @desc    Book an appointment
// @access  Private (Patient only)
router.post('/appointments', protect, authorize('patient'), async (req, res) => {
    try {
        const { doctorId, date, notes } = req.body;

        const appointment = await Appointment.create({
            patient: req.user._id,
            doctor: doctorId,
            date,
            notes
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/patients/appointments
// @desc    Get patient appointments
// @access  Private (Patient only)
router.get('/appointments', protect, authorize('patient'), async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id })
            .populate('doctor', 'name specialization address')
            .sort({ date: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/patients/history
// @desc    Get medical history (completed appointments)
// @access  Private (Patient only)
router.get('/history', protect, authorize('patient'), async (req, res) => {
    try {
        const history = await Appointment.find({ 
            patient: req.user._id, 
            status: 'completed' 
        })
        .populate('doctor', 'name specialization')
        .sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
