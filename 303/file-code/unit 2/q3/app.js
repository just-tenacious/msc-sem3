const express = require("express");

const app = express();

app.get("/user", (req, res) => {

    const name = req.query.name;
    const age = parseInt(req.query.age);

    // Validate input
    if (!name || isNaN(age)) {
        return res.status(400).json({
            message: "Please provide valid name and age"
        });
    }

    // Validate age
    if (age <= 18) {
        return res.status(400).json({
            message: "Age must be greater than 18"
        });
    }

    // Valid user
    res.json({
        message: `Welcome ${name}`,
        age: age
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});