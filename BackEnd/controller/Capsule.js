const { ObjectId } = require('bson');
var connection = require('../db/initDB')
const dbName = 'TimeCapsule';
require('dotenv').config();
const db = connection.client.db(dbName);


module.exports.create = async function (req, res) {
    const ownerId = new ObjectId(req.user._id)
    const query = await db.collection("users").findOne({ "_id": ownerId })
    if (!query){
        res.status(406).send("Something wrong")
        return
    }
    const receiverId = new ObjectId(query.mateId)
    const content = req.body.content
    const createdAt = new Date()
    const period = req.body.availableAt
    let availableTime
    if (period === 0){
        availableTime  = new Date(createdAt.setMonth(createdAt.getMonth()+6))
    }else{
        availableTime  = new Date(createdAt.setFullYear(createdAt.getFullYear()+period))
    }
    const availableAt = availableTime.getFullYear().toString()+availableTime.getMonth().toString()+availableTime.getDate().toString()
    const capsule = { ownerId, receiverId, content, createdAt, availableAt}
    db.collection("capsules").insertOne(capsule, function (err, id) {
        if (err) {
            console.log(capsule)
            console.log(err)
            return res.sendStatus(406)
        }
        return res.send("Capsule added")
    })
}

module.exports.find = async function (req, res) {
    const receiverId = new ObjectId(req.user._id)
    const cursor = db.collection("capsules").find({"receiverId":receiverId})
    const result = await cursor.toArray()
    res.send(result)
}

module.exports.findToday = async function (req, res) {
    const time = new Date()
    const availableAt = time.getFullYear().toString()+time.getMonth().toString()+time.getDate().toString()
    const receiverId = new ObjectId(req.user._id)
    const cursor = db.collection("capsules").find({"receiverId":receiverId,"availableAt":availableAt})
    const result = await cursor.toArray()
    res.send(result)
}

module.exports.check = function () {
    const date = new Date()
    let day = date.getDate()<10?'0'+date.getDate():date.getDate()
    const dateText = date.getFullYear().toString()+(date.getMonth()+1).toString()+day
    db.collection("capsules").find({"availableAt":dateText }, function (err, id) {
        if (err) {
            console.log(capsule)
            console.log(err)
            return res.sendStatus(406)
        }
        return res.send("Capsule added")
    })
}