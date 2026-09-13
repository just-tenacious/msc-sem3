const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Store messages
let messages = [];

// Store users
let users = [];

// Home route
app.get("/", (req, res) => {
    res.send("Timestamp Chat Server is running");
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // User joins
    socket.on("join", (username) => {

        socket.username = username;

        users.push({
            id: socket.id,
            username: username,
            lastSeen: new Date()
        });

        console.log(`${username} joined the chat`);

        // Send previous messages
        socket.emit("messageHistory", messages);

        // Send active users
        io.emit("activeUsers", users);
    });

    // Receive message
    socket.on("sendMessage", (data) => {

        const messageData = {
            id: Date.now(),
            username: data.username,
            message: data.message,
            timestamp: new Date()
        };

        // Store message
        messages.push(messageData);

        // Sort messages by timestamp
        messages.sort(
            (a, b) =>
                new Date(a.timestamp) - new Date(b.timestamp)
        );

        // Send updated messages
        io.emit("receiveMessage", messageData);
    });

    // User disconnects
    socket.on("disconnect", () => {

        if (socket.username) {

            const user = users.find(
                (u) => u.id === socket.id
            );

            if (user) {
                user.lastSeen = new Date();
            }

            console.log(`${socket.username} disconnected`);

            // Remove from active users
            users = users.filter(
                (u) => u.id !== socket.id
            );

            io.emit("activeUsers", users);

            // Send last seen information
            io.emit("userLastSeen", {
                username: socket.username,
                lastSeen: new Date()
            });
        }
    });
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});