const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/invoiceList/:id', invoiceController.invoiceList);
router.get('/invoiceDetail/:id', invoiceController.invoiceDetail);



module.exports = router;