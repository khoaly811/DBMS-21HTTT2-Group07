const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

    router.get('/appointmentList/:id', appointmentController.appointList);
    router.get('/appointmentDetail/:treatment_id/:appointment_id', appointmentController.appointmentDetail);



module.exports = router;