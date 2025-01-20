const express = require('express');
const router = express.Router();

const { loginController, registerController } = require('../controllers/user.controller');
const authMiddleware = require("../middleware/auth.middleware");

//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController)
module.exports = router;