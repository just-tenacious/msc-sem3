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

app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        users: users
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});