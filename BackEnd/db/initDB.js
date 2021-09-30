const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'TimeCapsule';

async function init() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to database');
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
                    required: ["ownerId", "receiverId", "content", "createdAt", "availableAt"],
                    properties: {
                        ownerId: {
                            bsonType: "int",
                            description: "must be a integer and is required"
                        },
                        receiverId: {
                            bsonType: "int",
                            description: "must be an integer and is required"
                        },
                        createdAt: {
                            bsonType: "date",
                            description: "must be an date and is required"
                        },
                        availableAt: {
                            bsonType: "date",
                            description: "must be an date and is required"
                        },
                    }
                }
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("Created capsules successful")
        })
}


module.exports = {init,client}