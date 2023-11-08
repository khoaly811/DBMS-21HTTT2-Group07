const {Router} = require('express')
const patientProfileController = require('../controllers/patientProfileController');


const router = Router()

router.get('/patientProfile', patientProfileController.patientProfile);

module.exports = router;