const express = require('express');
const accountController = require("../controllers/accountController");
const Auth = require("../middleware/authentication");
const router = express.Router();

router.get('/accounts', Auth.verifyAccount, Auth.adminOnly, accountController.getAccounts);
router.get('/accounts/:id', Auth.verifyAccount, Auth.adminOnly, accountController.getAccountById);
router.post('/accounts', Auth.verifyAccount, Auth.adminOnly, accountController.createAccount);
router.patch('/accounts/:id', Auth.verifyAccount, Auth.adminOnly, accountController.updateAccount);
router.delete('/accounts/:id', Auth.verifyAccount, Auth.adminOnly, accountController.deleteAccount);

router.get('/accounts', Auth.verifyAccount, Auth.dentistOnly, accountController.getAccounts);
router.get('/accounts/:id', Auth.verifyAccount, Auth.dentistOnly, accountController.getAccountById);
router.post('/accounts', Auth.verifyAccount, Auth.dentistOnly, accountController.createAccount);
router.patch('/accounts/:id', Auth.verifyAccount, Auth.dentistOnly, accountController.updateAccount);
router.delete('/accounts/:id', Auth.verifyAccount, Auth.dentistOnly, accountController.deleteAccount);

router.get('/accounts', Auth.verifyAccount, Auth.staffOnly, accountController.getAccounts);
router.get('/accounts/:id', Auth.verifyAccount, Auth.staffOnly, accountController.getAccountById);
router.post('/accounts', Auth.verifyAccount, Auth.staffOnly, accountController.createAccount);
router.patch('/accounts/:id', Auth.verifyAccount, Auth.staffOnly, accountController.updateAccount);
router.delete('/accounts/:id', Auth.verifyAccount, Auth.staffOnly, accountController.deleteAccount);

router.get('/accounts', Auth.verifyAccount, Auth.patientOnly, accountController.getAccounts);
router.get('/accounts/:id', Auth.verifyAccount, Auth.patientOnly, accountController.getAccountById);
router.post('/accounts', Auth.verifyAccount, Auth.patientOnly, accountController.createAccount);
router.patch('/accounts/:id', Auth.verifyAccount, Auth.patientOnly, accountController.updateAccount);


module.exports =  router;