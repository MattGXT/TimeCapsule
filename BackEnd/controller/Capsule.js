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
    const isRead = false
    let availableTime = new Date(createdAt.getFullYear(),createdAt.getMonth(),createdAt.getDate())
    if (period === 0){
        availableTime.setMonth(availableTime.getMonth()+6)
    }else{
        availableTime.setFullYear(availableTime.getFullYear()+period)
    }
    availableTime.setDate(availableTime.getDate()+1)
    const capsule = { ownerId, receiverId, content, createdAt, "availableAt":availableTime, isRead}
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
    const time = new Date()
    const receiverId = new ObjectId(req.user._id)
    const cursor = db.collection("capsules").find({"receiverId":receiverId,"availableAt":{$lte:time}})
    const result = await cursor.toArray()
    res.send(result)
}

module.exports.findToday = async function (req, res) {
    const time = new Date()
    const today = new Date(time.getFullYear(),time.getMonth(),time.getDate())
    const receiverId = new ObjectId(req.user._id)
    const cursor = db.collection("capsules").find({"receiverId":receiverId,"availableAt":today})
    const result = await cursor.toArray()
    res.send(result)
}

module.exports.findOwn = async function (req, res) {
    const ownerId = new ObjectId(req.user._id)
    const cursor = db.collection("capsules").find({"ownerId":ownerId})
    const result = await cursor.toArray()
    res.send(result)
}

module.exports.read = async function (req, res) {
    const id = req.body._id
    const receiverId = new ObjectId(req.user._id)
    const result = await db.collection("capsules").updateOne({"_id":id,"receiverId":receiverId},{isRead:true})
    if(result){
        res.send("Change read state successful")
    }else{
        res.sendStatus(403)
    }
}