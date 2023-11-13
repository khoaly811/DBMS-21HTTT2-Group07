const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

router.get("/", appointmentController.listAppointment);
module.exports=router;