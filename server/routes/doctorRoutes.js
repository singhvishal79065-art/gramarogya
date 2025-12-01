const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// @route   GET /api/doctors
// @desc    Get all doctors (with optional specialization filter)
// @access  Public (or Patient)
router.get('/', async (req, res) => {
    try {
        const { specialization } = req.query;
        let query = { role: 'doctor', isApproved: true };
        
        if (specialization) {
            query.specialization = specialization;
        }

        const doctors = await User.find(query).select('-password');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/doctors/:id
// @desc    Get doctor profile
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id).select('-password');
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/doctors/profile
// @desc    Update doctor profile
// @access  Private (Doctor only)
router.put('/profile', protect, authorize('doctor'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (user) {
            user.name = req.body.name || user.name;
            user.specialization = req.body.specialization || user.specialization;
            user.experience = req.body.experience || user.experience;
            user.fees = req.body.fees || user.fees;
            user.address = req.body.address || user.address;
            user.phone = req.body.phone || user.phone;
            
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                specialization: updatedUser.specialization,
                experience: updatedUser.experience,
                fees: updatedUser.fees
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/doctors/appointments
// @desc    Get appointments for logged in doctor
// @access  Private (Doctor only)
router.get('/appointments', protect, authorize('doctor'), async (req, res) => {
    try {
        const fs = require('fs');
        const logData = `\n[${new Date().toISOString()}] Fetching appointments for Doctor ID: ${req.user._id}\n`;
        fs.appendFileSync('debug_log.txt', logData);

        const appointments = await Appointment.find({ doctor: req.user._id })
            .populate('patient', 'name email')
            .sort({ createdAt: -1 });
            
        fs.appendFileSync('debug_log.txt', `Found ${appointments.length} appointments\n`);
        if (appointments.length > 0) {
             fs.appendFileSync('debug_log.txt', `First Appointment: ${JSON.stringify(appointments[0])}\n`);
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/doctors/appointments/:id
// @desc    Update appointment status
// @access  Private (Doctor only)
router.put('/appointments/:id', protect, authorize('doctor'), async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.doctor.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        appointment.status = status;
        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
