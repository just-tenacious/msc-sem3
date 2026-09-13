const express = require("express");
const app = express();
app.use(express.json());
const users = [
    {  id: 1,name: "Shraddha"},
    {id: 2,name: "Shrusti"}
];
app.get("/users", (req, res) => {
    res.json(users);
});
module.exports = app;