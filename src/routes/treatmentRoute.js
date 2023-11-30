const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');

router.get('/treatListperPatient/:id', treatmentController.treatListperPatient);
router.get('/treatment/:id', treatmentController.treatmentDetail);
router.get('/unPaidTreatment/:id', treatmentController.unPaidTreatment);


module.exports = router;