const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

    router.get('/appointmentList/:id', appointmentController.appointList);
    router.get('/appointmentDetail/:treatment_id/:appointment_id', appointmentController.appointmentDetail);
    router.get('/appointListAll', appointmentController.appointListAll);
    router.get('/navAppointmentMag', appointmentController.navAppointmentMag);
    router.get('/requestList', appointmentController.requestList);
    // router.post('/appointmentDetail/:treatment_id/:appointment_id', appointmentController.updateAppoint);





module.exports = router;