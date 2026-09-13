const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Message = require("./models/Message");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Chat server is running");
});

// Get previous messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      error: "Failed to fetch messages",
    });
  }
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins
  socket.on("join", (username) => {
    socket.username = username;
    console.log(`${username} joined the chat`);
  });

  // Receive and save message
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = new Message({
        username: data.username,
        message: data.message,
      });

      const savedMessage = await newMessage.save();

      // Send message to all connected users
      io.emit("receiveMessage", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
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