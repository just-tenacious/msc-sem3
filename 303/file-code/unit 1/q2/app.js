const express = require("express");

const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Shraddha"
    },
    {
        id: 2,
        name: "Shrusti"
    }
];

// GET
app.get("/users", (req, res) => {
    res.json(users);
});

// POST
app.post("/users", (req, res) => {

    const newUser = req.body;

    users.push(newUser);

    res.json({
        message: "User Added",
        user: newUser
    });

});

// PUT
app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    user.name = req.body.name;

    res.json({
        message: "User Updated",
        user
    });

});

// DELETE
app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    users = users.filter(user => user.id !== id);

    res.json({
        message: "User Deleted"
    });

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});