const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/invoiceList/:id', invoiceController.invoiceList);


module.exports = router;