const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');

router.get("/", requestController.getAllDateAppointment);
router.get("/dentists", requestController.getAllDentist);
router.post("/finish", requestController.writeDownTreatment);

module.exports = router;