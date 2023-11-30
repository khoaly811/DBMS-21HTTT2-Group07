const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');

router.get("/", requestController.processBooking);

module.exports = router;