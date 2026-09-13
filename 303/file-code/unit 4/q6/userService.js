const emailService = require("./emailService");
function registerUser(name, email) {
    const user = { name: name,email: email};
    emailService.sendEmail(
        email, 
        "Welcome to our application!"
    );
    return user;
}
module.exports = {registerUser};