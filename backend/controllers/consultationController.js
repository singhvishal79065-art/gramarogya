const Consultation = require('../model/consultationModel');

exports.addConsultation = async (req, res) => {
    try {
        const { doctor, patient, appointment, prescription, suggestedMedicines } = req.body;
        const consultation = new Consultation({ doctor, patient, appointment, prescription, suggestedMedicines });
        await consultation.save();
        res.status(201).json({ message: "Consultation added successfully", consultation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getConsultations = async (req, res) => {
    try {
        const { userId, role } = req.query;
        let query = {};
        if (role === 'patient') {
            query = { patient: userId };
        } else if (role === 'doctor') {
            query = { doctor: userId };
        }
        const consultations = await Consultation.find(query).populate('doctor', 'name').populate('patient', 'name');
        res.json(consultations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
