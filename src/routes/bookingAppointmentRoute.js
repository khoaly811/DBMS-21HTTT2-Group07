const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');

router.get("/", requestController.processBooking);
router.get("/bookDentist", requestController.showDentist)

module.exports = router;