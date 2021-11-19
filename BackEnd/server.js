const WebSocket = require('ws')
const jwt = require('jsonwebtoken')
const localPort = 3000


let WSServer = WebSocket.Server;
let server = require('http').createServer();
let app = require('./index');
let url = require('url');
var clientList = require('./ws/client')
const heartbeat = (ws) => {
    ws.isAlive = true
  }

let wss = new WSServer({
    server: server,
    perMessageDeflate: false
})

wss.on('connection', function connection(ws, req) {
    const token = url.parse(req.url, true).query.token
        if (token == null) return ws.close();
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return ws.close();
            ws.id = user._id
            heartbeat(ws)
            clientList.set(ws.id,ws)
        })
    ws.on('message', function message(data) {
        if(data.toString() === 'ping'){
            heartbeat(ws)
            clientList.set(ws.id,ws)
        }
    });
});

setInterval(() => {
    wss.clients.forEach((ws)=>{
        if(!ws.isAlive){
            clientList.delete(ws.id)
            return ws.terminate()
        }
        ws.isAlive = false
    })
}, 30000);

server.on('request', app);

server.listen(localPort, function () {
    console.log(`Server listening on port ${localPort}`);
});

module.exports=clientList