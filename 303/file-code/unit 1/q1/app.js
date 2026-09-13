const fs = require("fs");

const fileName = "users.json";

function readUsers() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(fileName, JSON.stringify(users, null, 2));
}

function addUser(id, name) {
    const users = readUsers();

    users.push({
        id,
        name
    });

    saveUsers(users);

    console.log("User Added Successfully");
}

function displayUsers() {
    const users = readUsers();

    console.log(users);
}

function deleteUser(id) {
    const users = readUsers();
    const updatedUsers = users.filter(user => user.id !== id);
    saveUsers(updatedUsers);
    console.log("User Deleted");
}

addUser(1, "Rahul");
addUser(2, "Amit");

displayUsers();

deleteUser(1);

displayUsers();