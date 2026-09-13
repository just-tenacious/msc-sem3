const express = require("express");
const mongoose = require("mongoose");
const { createClient } = require("redis");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Redis connection
const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (error) => {
    console.log("Redis error:", error);
});

redisClient
    .connect()
    .then(() => {
        console.log("Redis connected");
    })
    .catch((error) => {
        console.log("Redis connection error:", error);
    });

// Message Schema
const messageSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// User Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        lastSeen: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);
const User = mongoose.model("User", userSchema);

// Home route
app.get("/", (req, res) => {
    res.send("Chat API Server is running");
});

// GET /messages
app.get("/messages", async (req, res) => {

    try {

        // Check Redis first
        const cachedMessages =
            await redisClient.get("messages");

        if (cachedMessages) {

            console.log("Messages fetched from Redis");

            return res.json({
                source: "Redis Cache",
                messages: JSON.parse(cachedMessages)
            });
        }

        // If Redis does not contain data
        console.log("Redis cache miss");

        const messages = await Message
            .find()
            .sort({ timestamp: -1 })
            .limit(20);

        // Store result in Redis using SET
        await redisClient.set(
            "messages",
            JSON.stringify(messages),
            {
                EX: 60
            }
        );

        res.json({
            source: "MongoDB",
            messages: messages
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to fetch messages"
        });
    }
});

// GET /users
app.get("/users", async (req, res) => {

    try {

        // Check Redis first
        const cachedUsers =
            await redisClient.get("users");

        if (cachedUsers) {

            console.log("Users fetched from Redis");

            return res.json({
                source: "Redis Cache",
                users: JSON.parse(cachedUsers)
            });
        }

        // Fetch active users from MongoDB
        console.log("User cache miss");

        const users = await User
            .find({ active: true })
            .sort({ lastSeen: -1 });

        // Store users in Redis
        await redisClient.set(
            "users",
            JSON.stringify(users),
            {
                EX: 60
            }
        );

        res.json({
            source: "MongoDB",
            users: users
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to fetch users"
        });
    }
});

// POST /messages
app.post("/messages", async (req, res) => {

    try {

        const { username, message } = req.body;

        if (!username || !message) {

            return res.status(400).json({
                error: "Username and message are required"
            });
        }

        // Save permanently in MongoDB
        const newMessage = await Message.create({
            username: username,
            message: message
        });

        // Add recent message to Redis using LPUSH
        await redisClient.lPush(
            "recentMessages",
            JSON.stringify(newMessage)
        );

        // Keep only latest 20 messages
        await redisClient.lTrim(
            "recentMessages",
            0,
            19
        );

        // Remove old cached /messages data
        await redisClient.del("messages");

        res.status(201).json({
            message: "Message stored successfully",
            data: newMessage
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to save message"
        });
    }
});

// GET recent messages from Redis
app.get("/messages/recent", async (req, res) => {

    try {

        // LRANGE gets recent messages
        const recentMessages =
            await redisClient.lRange(
                "recentMessages",
                0,
                19
            );

        const messages = recentMessages.map(
            (item) => JSON.parse(item)
        );

        res.json({
            source: "Redis",
            messages: messages
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to fetch recent messages"
        });
    }
});

// POST /users
app.post("/users", async (req, res) => {

    try {

        const { username } = req.body;

        if (!username) {

            return res.status(400).json({
                error: "Username is required"
            });
        }

        const user = await User.create({
            username: username,
            active: true,
            lastSeen: new Date()
        });

        // Clear cached users
        await redisClient.del("users");

        res.status(201).json({
            message: "User stored successfully",
            data: user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to save user"
        });
    }
});

// Start server
app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );
});