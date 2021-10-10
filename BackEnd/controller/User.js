var connection = require('../db/initDB')
const dbName = 'TimeCapsule';
require('dotenv').config();
const { ObjectId } = require('bson');
const db = connection.client.db(dbName);
const jwt = require('jsonwebtoken')


module.exports.signUp = async function (req, res) {
    const email = req.body.email
    const query = await db.collection("users").findOne({"email":email})
    if (query){
        return res.Status(406).send("Email existed")
    }
    const user = {"email":email,"name":req.body.name,"password":req.body.password,"gender":req.body.gender,"mateId":null}
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
        const accessToken = jwt.sign({email:email,_id:query._id},process.env.ACCESS_TOKEN_SECRET)
        return res.json({"accessToken":accessToken,"mateId":query.mateId,"name":query.name,"email":query.email})
    }else{
        return res.sendStatus(401)
    }
}

module.exports.edit = async function (req, res) {
    const user = req.user.email
    const newUser = {$set: {"email":user,"name":req.body.name,"gender":req.body.gender}}
    const result = await db.collection("users").updateOne(user,newUser)
    if (result){
        return res.send("successful")
    }else{
        return res.sendStatus(401)
    }
}

module.exports.removeMate = async function(req,res){
    const id = new ObjectId(req.user._id)
    const query = await db.collection("users").findOne({ "_id": id })
    if (query) {
        const session = connection.client.startSession();
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };
        try {
            await session.withTransaction(async () => {
                await db.collection("users").updateOne({"_id":query.mateId},{$set: {"mateId":null}})
                await db.collection("users").updateOne({"_id":query._id},{$set: {"mateId":null}})
            }, transactionOptions)
        } catch{
            res.send("Remove failed")
        }finally {
            await session.endSession();
            res.send("Remove Successful")
        }

    }
}

module.exports.check = async function(req,res){
    const id = new ObjectId(req.user._id)
    const query = await db.collection("users").findOne({ "_id": id })
    return res.send({"mateId":query.mateId})
}