var connection = require('../db/initDB')
const dbName = 'TimeCapsule'
const { ObjectId } = require('bson');
const db = connection.client.db(dbName)

module.exports.create = async function (req, res) {
    const Id = new ObjectId(req.user._id)
    const user = await db.collection("users").findOne({ "_id": Id })
    const email = req.body.targetEmail
    const query = await db.collection("users").findOne({ "email": email })
    if (query) {
        const request = { Id, targetId:query._id,name:user.name,email:user.email }
        // check if request existed
        const query2 = await db.collection("requests").findOne(request)
        if(!query2){
            db.collection("requests").insertOne(request, function (err, id) {
                if (err) return res.status(406).send("Insert failed")
                return res.send("Create request successful")
            })
        }else{
            res.status(406).send("Request existed")
        }
    }else{
        res.status(406).send("User not existed")
    }
}

module.exports.approve = async function (req, res) {
    const id = new ObjectId(req.body._id.$oid)
    const query = await db.collection("requests").findOne({ "_id": id })
    if (query) {
        const session = connection.client.startSession();
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };
        try {
            await session.withTransaction(async () => {
                await db.collection("users").updateOne({"_id":query.Id},{$set: {"mateId":query.targetId}})
                await db.collection("users").updateOne({"_id":query.targetId},{$set: {"mateId":query.Id}})
                await db.collection("requests").deleteOne({ "_id": id })
            }, transactionOptions)
        } catch{
            res.status(406).send("Update failed")
        }finally {
            await session.endSession();
            res.send("Update Successful")
        }
    }else{
        res.status(406).send("request not existed")
    }
}

module.exports.get = async function (req, res) {
    const id = new ObjectId(req.user._id)
    const cursor = db.collection("requests").find({ "targetId": id })
    const result = await cursor.toArray()
    res.send(result)
}