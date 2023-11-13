const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

router.get("/appointment", appointmentController.listAppointment);
module.exports=router;