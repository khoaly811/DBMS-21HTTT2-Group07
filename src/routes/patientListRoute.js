const {Router} = require('express')
const patientListController = require('../controllers/patientListController');


const router = Router()

router.get('/patientList', patientListController.patientList);

module.exports = router;