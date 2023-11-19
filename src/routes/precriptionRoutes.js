const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

router.get('/precriptionList/:id', prescriptionController.prescriptionList);
router.get('/prescription/:id', prescriptionController.prescriptionDetail);



module.exports = router;