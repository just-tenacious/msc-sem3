const express = require("express");

const app = express();

app.set("view engine", "ejs");

const user = {
    name: "Shraddha",
    age: 21,
    city: "Valsad"
};

app.get("/", (req, res) => {

    res.render("index", {
        user: user
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});