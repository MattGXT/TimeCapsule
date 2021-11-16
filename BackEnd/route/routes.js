var express = require('express')
var userController = require('../controller/User')
var capsuleController = require('../controller/Capsule')
var requestController = require('../controller/Request')
var router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.get('/check', authenticateToken, userController.check);
router.get('/verify', userController.verify);
router.get('/remove-mate', authenticateToken, userController.removeMate);
router.post('/create-capsule', authenticateToken, capsuleController.create);
router.post('/read-capsule', authenticateToken, capsuleController.read);
router.get('/get-capsule', authenticateToken, capsuleController.find);
router.get('/get-capsule-own', authenticateToken, capsuleController.findOwn);
router.get('/get-capsule-today', authenticateToken, capsuleController.findToday);
router.post('/create-request', authenticateToken, requestController.create);
router.post('/approve-request', authenticateToken, requestController.approve);
router.get('/get-request', authenticateToken, requestController.get);


function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(401)
        req.user = user
        next()
    })

}
module.exports = router;
