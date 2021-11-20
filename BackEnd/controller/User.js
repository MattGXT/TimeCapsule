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
        return res.status(400).send("Email existed")
    }
    const query2 = await db.collection("verify").findOne({ "info.email": email })
    if (query2) {
        return res.status(403).send("Email existed")
    }
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { "email": email, "name": req.body.name, "password": hashedPassword, "gender": req.body.gender, "mateId": "" }
        const code = crypto.randomBytes(20).toString('hex')
        const createdAt = new Date()
        const expired = new Date(createdAt.setDate(createdAt.getDate() + 1))
        db.collection("verify").insertOne({ info: user, verify: code, expired: expired.getTime() }, function (err, id) {
            if (err) return res.sendStatus(500)
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
        return res.status(400).send("请重新获取验证邮件")
    }
    if (query.expired < time) {
        const code = crypto.randomBytes(20).toString('hex')
        const createdAt = new Date()
        const expired = new Date(createdAt.setDate(createdAt.getDate() + 1))
        const result = await db.collection("verify").updateOne({ "verify": verify }, { $set: { "verify": code, "expired": expired.getTime() } })
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
        } catch(error) {
            console.log(error)
            return res.status(500).send("Create failed")
        } finally {
            await session.endSession();
            return res.send("Create Successful")
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
                return res.sendStatus(400)
            }
        } catch {
            return res.sendStatus(500)
        }
    } else {
        const query2 = await db.collection("verify").findOne({ "info.email": email })
        if(query2){
            try {
                if (await bcrypt.compare(password, query2.info.password)) {
                    return res.sendStatus(403)
                } else {
                    return res.sendStatus(400)
                }
            } catch {
                return res.sendStatus(500)
            }
        }else{
            return res.sendStatus(400)
        }
        
    }
}

module.exports.resend = async function (req, res) {
    try {
        const email = req.body.email
        const query = await db.collection("verify").findOne({ "info.email": email })
        if (!query) return res.status(400).send("No verify exist")
        const code = crypto.randomBytes(20).toString('hex')
        const createdAt = new Date()
        const expired = new Date(createdAt.setDate(createdAt.getDate() + 1))
        const result = await db.collection("verify").updateOne({ "_id": query._id }, { $set: { "verify": code, "expired": expired.getTime() } })
        if (result) {
            mail.sendMail(query.info.email, code)
        }
    } catch {
        return res.sendStatus(500)
    } finally {
        return res.send("Successful")
    }


}

module.exports.edit = async function (req, res) {
    const user = req.user.email
    const newUser = { $set: { "email": user, "name": req.body.name, "gender": req.body.gender } }
    const result = await db.collection("users").updateOne(user, newUser)
    if (result) {
        return res.send("successful")
    } else {
        return res.sendStatus(500)
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
            return res.status(500).send("Remove failed")
        } finally {
            await session.endSession();
            return res.send("Remove Successful")
        }

    }
}

module.exports.check = async function (req, res) {
    const id = new ObjectId(req.user._id)
    const query = await db.collection("users").findOne({ "_id": id })
    return res.send({ "mateId": query.mateId })
}

