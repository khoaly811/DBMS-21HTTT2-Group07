const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');

router.get("/", requestController.getAllClinic);
router.get("/treatments", requestController.getALlTreatment);
router.get("/dentists", requestController.getAllDentist);
router.get("/finish", requestController.writeDownTreatment);

module.exports = router;