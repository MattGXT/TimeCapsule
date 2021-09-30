var connection = require('../db/initDB')
const dbName = 'TimeCapsule';
require('dotenv').config();
const db = connection.client.db(dbName);
const jwt = require('jsonwebtoken')


module.exports.signUp = async function (req, res) {
    const email = req.body.email
    const query = await db.collection("users").findOne({"email":email})
    if (query){
        return res.sendStatus(406)
    }
    const user = {"email":email,"name":req.body.name,"password":req.body.password,"gender":req.body.gender}
    db.collection("users").insertOne(user,function(err,id){
        if (err) return res.sendStatus(406)
        return res.sendStatus(200)
    })
}

module.exports.login = async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const user = {email,password}
    const query = await db.collection("users").findOne(user)
    if (query){
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
        return res.json({"accessToken":accessToken})
    }else{
        return res.sendStatus(401)
    }
}

module.exports.check = function (req, res) {
    res.send("HELLLLLLLLLO")
}