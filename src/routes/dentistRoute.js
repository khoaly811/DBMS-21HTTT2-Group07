const express = require('express');
const router = express.Router();
const dentistController = require('../controllers/dentistController');

    router.get('/dentistList', dentistController.dentistList);
    router.get('/staffList', dentistController.staffList);
    router.get('/staffDetail/:id', dentistController.staffDetail);

    router.get('/navSystemMag', dentistController.navSystemMag);
 



module.exports = router;