const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

router.get('/precriptionList/:id', prescriptionController.prescriptionList);


module.exports = router;