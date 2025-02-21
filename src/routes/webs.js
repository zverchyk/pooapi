const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8070 });
const clients = new Map(); // Store WebSocket connections by userId

// Handle WebSocket connections
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.type === "register") {
            clients.set(data.userId, ws); // Store client connection
        }
    });

    ws.on("close", () => {
        for (let [userId, client] of clients.entries()) {
            if (client === ws) {
                clients.delete(userId); // Remove client when disconnected
            }
        }
    });
});


const connectUser = function(req, res, next){
    const {body} = req;
    
    if (clients.has(body.userId)) {
        const client = clients.get(body.userId);
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({"day":body.day, "time": body.time, "iconSize": body.size})); // Send real-time update
        }
    }
    next()
}

module.exports = {
    connectUser

}