let clients = new Map();

const userConnection = function (req, res) {
   
    const userId = req.params.userId; // Get userId from params

    if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Store client connection in a Map using userId as the key
    clients.set(userId, res);
    // console.log(`Client connected: ${userId}`);

    // Remove client when they disconnect
    req.on("close", () => {
        clients.delete(userId);
        // console.log(`Client disconnected: ${userId}`);
    });
};

module.exports ={
    clients,
    userConnection
}
