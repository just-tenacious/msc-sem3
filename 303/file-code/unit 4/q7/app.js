const express = require("express");
const app = express();
app.use(express.json());
let tasks = [];
// POST /tasks
app.post("/tasks", (req, res) => {
    const { title, completed } = req.body;
    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }
    const task = {
        id: tasks.length + 1,
        title: title,
        completed: completed || false
    };
    tasks.push(task);
    res.status(201).json(task);
});
// GET /tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});
// Clear tasks for testing
function clearTasks() {
    tasks = [];
}
app.clearTasks = clearTasks;
module.exports = app;