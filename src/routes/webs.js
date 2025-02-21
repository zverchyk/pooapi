const path = require('path');
require('dotenv').config()

const WebSocket = require("ws");

const PORT = process.env.SOCKETPORT || 8080; // Use Render's assigned port or 8080 for local testing
const wss = new WebSocket.Server({ port: PORT });
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