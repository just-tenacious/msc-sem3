function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Shraddha"
            });
        }, 1000);
    });
}

module.exports = getUser;