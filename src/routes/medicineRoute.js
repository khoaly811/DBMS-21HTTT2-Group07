const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const { checkPatientRole } = require('../middleware/authentication');

router.get('/medicineList/', checkPatientRole, medicineController.medicineList);
router.get('/medicineDetail/:id', checkPatientRole, medicineController.medicineDetail);





module.exports = router;