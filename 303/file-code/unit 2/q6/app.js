import express from "express";

const app = express();

app.set("view engine", "ejs");

const users = [
    {
        id: 1,
        name: "Riya",
        email: "riya@gmail.com",
        age: 21
    },
    {
        id: 2,
        name: "Amit",
        email: "amit@gmail.com",
        age: 22
    },
    {
        id: 3,
        name: "Shraddha",
        email: "shraddha@gmail.com",
        age: 21
    }
];

// REST API
app.get("/api/users", (req, res) => {

    if (!users || users.length === 0) {
        return res.status(404).json({
            message: "No users found"
        });
    }

    res.json(users);
});

// Dashboard
app.get("/dashboard", async (req, res) => {

    try {

        const response = await fetch(
            "http://localhost:3000/api/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        res.render("dashboard", {
            users: data
        });

    } catch (error) {

        console.log("Error:", error.message);

        res.status(500).send(
            "Error loading dashboard"
        );
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});