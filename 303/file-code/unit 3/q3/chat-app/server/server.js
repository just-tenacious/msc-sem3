const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Message = require("./models/Message");
const Location = require("./models/Location");

dotenv.config();

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

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Test Route
app.get("/", (req, res) => {
    res.send("Location Chat Server is running");
});

// Get Previous Messages
app.get("/messages", async (req, res) => {

    try {

        const messages = await Message.find()
            .sort({ createdAt: 1 })
            .limit(100);

        res.json(messages);

    } catch (error) {

        console.error("Error fetching messages:", error);

        res.status(500).json({
            error: "Failed to fetch messages"
        });

    }

});

// Get Previous Locations
app.get("/locations", async (req, res) => {

    try {

        const locations = await Location.find()
            .sort({ createdAt: 1 })
            .limit(100);

        res.json(locations);

    } catch (error) {

        console.error("Error fetching locations:", error);

        res.status(500).json({
            error: "Failed to fetch locations"
        });

    }

});

// Socket.io
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // User joins
    socket.on("join", (username) => {

        socket.username = username;

        console.log(`${username} joined the chat`);

    });

    // Send Message
    socket.on("sendMessage", async (data) => {

        try {

            const newMessage = new Message({
                username: data.username,
                message: data.message
            });

            const savedMessage = await newMessage.save();

            io.emit("receiveMessage", savedMessage);

        } catch (error) {

            console.error("Error saving message:", error);

        }

    });

    // Send Location
    socket.on("sendLocation", async (data) => {

        try {

            const newLocation = new Location({
                username: data.username,
                lat: data.lat,
                lng: data.lng
            });

            const savedLocation = await newLocation.save();

            // Broadcast location to all users
            io.emit("receiveLocation", savedLocation);

        } catch (error) {

            console.error("Error saving location:", error);

        }

    });

    // User disconnects
    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);

    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});