var express = require('express')
var userController = require('../controller/User')
var router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.post('/check', authenticateToken, userController.check);

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
