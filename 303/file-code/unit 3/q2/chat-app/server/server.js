const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
require("dotenv").config();

const Message = require("./models/Message");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Error:", err);
    });

// Socket.io
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // Join Room
    socket.on("joinRoom", (data) => {

        const { username, room } = data;

        socket.join(room);

        console.log(`${username} joined ${room}`);

        // Get previous messages of the selected room
        Message.find({ room })
            .then((messages) => {
                socket.emit("previousMessages", messages);
            })
            .catch((err) => {
                console.log("Error loading messages:", err);
            });

    });

    // Send Message
    socket.on("sendMessage", async (data) => {

        try {

            const { username, message, room } = data;

            const newMessage = new Message({
                username,
                message,
                room
            });

            await newMessage.save();

            // Send message only to the selected room
            io.to(room).emit("receiveMessage", newMessage);

        } catch (err) {

            console.log("Message Error:", err);

        }

    });

    // Disconnect
    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);

    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});