const { ObjectId } = require('bson');
var connection = require('../db/initDB')
const dbName = 'TimeCapsule';
require('dotenv').config();
const db = connection.client.db(dbName);


module.exports.create = function (req, res) {
    const ownerId = new ObjectId(req.body.ownerId.$oid)
    const receiverId = new ObjectId(req.body.receiverId.$oid)
    const content = req.body.content
    const createdAt = new Date(req.body.createdAt.$date)
    const availableAt = req.body.availableAt
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
    const receiverId = new ObjectId(req.body.receiverId.$oid)
    const cursor = db.collection("capsules").find({"receiverId":receiverId})
    const result = await cursor.toArray()
    res.send(result)
}

module.exports.findToday = async function (req, res) {
    const dateText = req.body.time
    const receiverId = new ObjectId(req.body.receiverId.$oid)
    const cursor = db.collection("capsules").find({"receiverId":receiverId,"availableAt":dateText})
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