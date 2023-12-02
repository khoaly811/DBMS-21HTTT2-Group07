const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');

router.get("/", requestController.processBooking)
router.post("/bookDentist", requestController.showDentist);
router.post("/bookOK", function(req, res, next) {
    const message = 'Your dentist ID is ' + req.body.dentist;
    res.send(message)
})

module.exports = router;