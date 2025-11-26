const User = require('../model/userModel');
const Consultation = require('../model/consultationModel');

exports.getDoctors = async (req, res) => {
    try {
        const { specialization } = req.query;
        let query = { role: 'doctor' };
        if (specialization) {
            query.specialization = specialization;
        }
        const doctors = await User.find(query).select('-password');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConsultations = async (req, res) => {
    try {
        const { patientId } = req.params;
        const consultations = await Consultation.find({ patientId }).populate('doctorId', 'name specialization');
        res.json(consultations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addConsultation = async (req, res) => {
    try {
        const { doctorId, patientId, diagnosis, prescription } = req.body;
        const consultation = new Consultation({
            doctorId,
            patientId,
            diagnosis,
            prescription
        });
        await consultation.save();
        res.status(201).json({ message: "Consultation added successfully", consultation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
