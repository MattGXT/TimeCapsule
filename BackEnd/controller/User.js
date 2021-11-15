var connection = require('../db/initDB')
const dbName = 'TimeCapsule';
require('dotenv').config();
const { ObjectId } = require('bson');
const db = connection.client.db(dbName);
const jwt = require('jsonwebtoken')
var mail = require('./Email')
var crypto = require("crypto");
const bcrypt = require('bcrypt')




module.exports.signUp = async function (req, res) {
    const email = req.body.email
    const query = await db.collection("users").findOne({ "email": email })
    if (query) {
        return res.send("Email existed")
    }
    const query2 = await db.collection("verify").findOne({ "info.email": email })
    if (query2) {
        return res.send("Email existed")
    }
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { "email": email, "name": req.body.name, "password": hashedPassword, "gender": req.body.gender, "mateId": null }
        const code = crypto.randomBytes(20).toString('hex')
        const createdAt = new Date()
        const expired = new Date(createdAt.setDate(createdAt.getDate() + 5))
        db.collection("verify").insertOne({ info: user, verify: code, expired: expired.getTime() }, function (err, id) {
            if (err) return res.sendStatus(406)
            mail.sendMail(email, code)
            return res.sendStatus(200)
        })
    } catch {
        res.status(500).send()
    }

}

module.exports.verify = async function (req, res) {
    const time = new Date().getTime()
    const verify = req.query.code
    if (verify == undefined) {
        return res.sendStatus(400)
    }
    const query = await db.collection("verify").findOne({ "verify": verify })
    if (!query) {
        return res.status(406).send("Please send it again")
    }
    if (query.expired < time) {
        const code = crypto.randomBytes(20).toString('hex')
        const createdAt = new Date()
        const expired = new Date(createdAt.setDate(createdAt.getDate() + 5))
        const result = await db.collection("verify").updateOne({ "verify": verify }, { $set: { "verify": id, "expired": expired.getTime() } })
        if (result) {
            mail.sendMail(query.info.email, code)
        }
    } else {
        const user = query.info
        const session = connection.client.startSession();
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        }
        try {
            await session.withTransaction(async () => {
                await db.collection("users").insertOne(user)
                await db.collection("verify").deleteOne({ "verify": verify })
            }, transactionOptions)
        } catch {
            res.send("Create failed")
        } finally {
            await session.endSession();
            res.send("Create Successful")
        }
    }
}

module.exports.login = async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const query = await db.collection("users").findOne({ email })
    if (query) {
        try {
            if (await bcrypt.compare(password, query.password)) {
                const accessToken = jwt.sign({ email: email, _id: query._id }, process.env.ACCESS_TOKEN_SECRET)
                return res.send({ "accessToken": accessToken, "mateId": query.mateId, "name": query.name, "email": query.email })
            } else {
                res.sendStatus(400)
            }
        } catch {
            res.sendStatus(500)
        }
    } else {
        const query2 = await db.collection("verify").findOne({ email })
        if(query2){
            return res.status(401).send("please check your email to confirm the register")
        }else{
            return res.sendStatus(400)
        }
    }
}

module.exports.edit = async function (req, res) {
    const user = req.user.email
    const newUser = { $set: { "email": user, "name": req.body.name, "gender": req.body.gender } }
    const result = await db.collection("users").updateOne(user, newUser)
    if (result) {
        return res.send("successful")
    } else {
        return res.sendStatus(401)
    }
}

module.exports.removeMate = async function (req, res) {
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
                await db.collection("users").updateOne({ "_id": query.mateId }, { $set: { "mateId": null } })
                await db.collection("users").updateOne({ "_id": query._id }, { $set: { "mateId": null } })
            }, transactionOptions)
        } catch {
            res.send("Remove failed")
        } finally {
            await session.endSession();
            res.send("Remove Successful")
        }

    }
}

module.exports.check = async function (req, res) {
    const id = new ObjectId(req.user._id)
    const query = await db.collection("users").findOne({ "_id": id })
    return res.send({ "mateId": query.mateId })
}

