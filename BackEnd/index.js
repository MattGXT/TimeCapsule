var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./route/routes')
var cors = require('cors')
var db = require('./db/initDB')
const schedule = require('node-schedule')

const localPort = 3000
var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.init()

app.use('/', routes)


app.listen(localPort)
console.log("Server start")

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated')
    })
})
