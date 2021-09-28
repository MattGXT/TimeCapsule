var express = require('express')
var userController = require('../controller/User')
var router = express.Router();

router.get('/login', userController.login);
router.get('/signup', userController.signUp);
module.exports = router;
