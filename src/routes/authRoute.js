const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get('/me', authController.Me);
router.post('/login', authController.Login);
router.delete('/logout', authController.Logout);

module.exports = router;
