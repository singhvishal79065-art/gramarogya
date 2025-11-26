const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.post('/', consultationController.addConsultation);
router.get('/', consultationController.getConsultations);

module.exports = router;
