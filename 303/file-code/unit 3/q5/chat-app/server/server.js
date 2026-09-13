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

// Store online users
let onlineUsers = [];

// Home route
app.get("/", (req, res) => {
    res.send("Real-Time User Tracking Server is running");
});

// Socket connection
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // User joins
    socket.on("join", (username) => {

        socket.username = username;

        onlineUsers.push({
            id: socket.id,
            username: username
        });

        console.log(`${username} joined the application`);

        // Send updated user list to all users
        io.emit("onlineUsers", onlineUsers);

        // Notify users about new user
        io.emit("userJoined", {
            username: username
        });
    });

    // User disconnects
    socket.on("disconnect", () => {

        if (socket.username) {

            console.log(`${socket.username} left the application`);

            // Remove user from online list
            onlineUsers = onlineUsers.filter(
                (user) => user.id !== socket.id
            );

            // Send updated list
            io.emit("onlineUsers", onlineUsers);

            // Notify users about leaving user
            io.emit("userLeft", {
                username: socket.username
            });
        }
    });
});

// Start server
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});