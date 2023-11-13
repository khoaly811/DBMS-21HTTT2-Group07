const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');



router.get('/patientList', patientController.listPatient);

module.exports = router;