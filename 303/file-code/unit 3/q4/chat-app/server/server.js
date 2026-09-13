const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Message Acknowledgment Server is running");
});

// Socket.io
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins
    socket.on("join", (username) => {
        socket.username = username;

        console.log(`${username} joined the chat`);

        socket.emit("joinSuccess", {
            message: `Welcome ${username}!`
        });
    });

    // Send Message with Acknowledgment
    socket.on("sendMessage", (data, callback) => {
        console.log("Message received:", data.message);

        const messageData = {
            username: data.username,
            message: data.message,
            time: new Date().toLocaleTimeString()
        };

        // Send message to all OTHER users
        socket.broadcast.emit("receiveMessage", messageData);

        // Send acknowledgment to the sender
        if (callback) {
            callback({
                status: "delivered",
                message: "Message delivered successfully"
            });
        }
    });

    // User disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start Server
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});