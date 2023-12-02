const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');


// router.get("/", requestController.getAllDate);
router.get("/dentists", requestController.getAllDentist);
router.post("/finish", requestController.writeDownTreatment);


module.exports = router;