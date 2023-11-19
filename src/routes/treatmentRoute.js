const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');

router.get('/treatListperPatient/:id', treatmentController.treatListperPatient);
router.get('/treatment/:id', treatmentController.treatmentDetail);


module.exports = router;