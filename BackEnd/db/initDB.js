const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'TimeCapsule';

async function init() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected to database');
    const db = client.db(dbName);
    db.listCollections({ name: "users" }).next(function (err, colinfo) {
        if (!colinfo) {
            createUsers(db)
        }else{
            console.log("users exist")
        }
    })

    db.listCollections({ name: "capsules" }).next(function (err, colinfo) {
        if (!colinfo) {
            createCapsules(db,client)
        }else{
            console.log("capsules exist")
        }
    })

    db.listCollections({ name: "requests" }).next(function (err, colinfo) {
        if (!colinfo) {
            createRequests(db,client)
        }else{
            console.log("requests exist")
        }
    })

    db.listCollections({ name: "verify" }).next(function (err, colinfo) {
        if (!colinfo) {
            createVerify(db,client)
        }else{
            console.log("verify exist")
        }
    })
}

async function createUsers(db) {
    await db.createCollection('users',
        {
            validator: {
                $jsonSchema: {
                    required: ["email","name", "password", "gender"],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        gender: {
                            bsonType: "int",
                            minimum: 0,
                            maximum: 1,
                            description: "must be an integer in [0,1] and is required"
                        }
                    }
                }
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("Created users successful")
        })
    await db.collection("users").createIndex({"email":1},{unique:true},function(err, res){
        if (err) throw err;
            console.log("Created index")
    })
}

async function createCapsules(db) {
    await db.createCollection('capsules',
        {
            validator: {
                $jsonSchema: {
                    required: ["ownerId", "receiverId", "content", "createdAt", "availableAt", "isRead"],
                    properties: {
                        ownerId: {
                            bsonType: "objectId",
                            description: "must be an objectId and is required"
                        },
                        receiverId: {
                            bsonType: "objectId",
                            description: "must be an objectId and is required"
                        },
                        createdAt: {
                            bsonType: "date",
                            description: "must be a date and is required"
                        },
                        availableAt: {
                            bsonType: "date",
                            description: "must be a date and is required"
                        },
                        isRead:{
                            bsonType: "bool",
                            description: "must be an boolean and is required"
                        }
                    }
                }
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("Created capsules successful")
        })
}

async function createRequests(db) {
    await db.createCollection('requests',
        {
            validator: {
                $jsonSchema: {
                    required: ["Id","targetId"],
                    properties: {
                        Id: {
                            bsonType: "objectId",
                            description: "must be a objectId and is required"
                        },
                        targetEmail: {
                            bsonType: "objectId",
                            description: "must be a objectId and is required"
                        }
                    }
                }
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("Created requests successful")
        })
}

async function createVerify(db) {
    await db.createCollection('verify',
        {
            validator: {
                $jsonSchema: {
                    required: ["info","verify"]
                }
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("Created verify successful")
        })
}


module.exports = {init,client}