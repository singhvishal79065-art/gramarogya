const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getDoctors);
router.get('/consultations/:patientId', doctorController.getConsultations);
router.post('/consultations', doctorController.addConsultation);

module.exports = router;
