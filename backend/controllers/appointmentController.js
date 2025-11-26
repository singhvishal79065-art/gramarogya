const Appointment = require('../model/appointmentModel');

exports.bookAppointment = async (req, res) => {
    try {
        const { doctor, patient, date } = req.body;
        const appointment = new Appointment({ doctor, patient, date });
        await appointment.save();
        res.status(201).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const { userId, role } = req.query;
        let query = {};
        if (role === 'doctor') {
            query = { doctor: userId };
        } else if (role === 'patient') {
            query = { patient: userId };
        }
        const appointments = await Appointment.find(query).populate('doctor', 'name').populate('patient', 'name');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
