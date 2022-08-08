const ws = require("ws")
const PORT = 8080
const wss = new ws.WebSocketServer({ port: PORT })

// some connected user did send a message. DateTime, UserID, message.
// clients are a user with a UserID. OnMessageSent the client send a ws packet with messageData

function init() {
  wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
      let parsedObject = JSON.parse(data)
      let stringyfiedObject = JSON.stringify(parsedObject)
      console.log("received: %s", data)
      ws.send(stringyfiedObject)
    })
    const msg = { message: "Hello client!", messageType: 2 }
    ws.send(JSON.stringify(msg))
    console.log("send: " + msg.message)
  })
  console.log("server initialized")
}

init()
