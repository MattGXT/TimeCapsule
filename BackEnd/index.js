var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var init = require('./db/initDB');

const localPort = 3000
var app = express()


async function main(){
    await init()
    console.log(1)
}

main()
