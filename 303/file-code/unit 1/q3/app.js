const EventEmitter = require("events");

const emitter = new EventEmitter();

// Event Listener
emitter.on("userLogin", (username) => {
    console.log(`User: ${username}`);
    console.log(`Login Time: ${new Date()}`);
});

// Emit Event
emitter.emit("userLogin", "Shraddha");