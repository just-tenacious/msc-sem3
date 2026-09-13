const express = require("express");
const app = express();
app.use(express.json());
// Authentication Middleware
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer secret123") {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    next();
}
// Protected Profile Route
app.get("/profile", authenticate, (req, res) => {
    res.json({
        id: 1,
        name: "Shraddha",
        role: "Student"
    });
});
module.exports = app;