const url = "https://jsonplaceholder.typicode.com/users";

async function getUsers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        data.forEach(user => {
            console.log("Name:", user.name);
            console.log("Email:", user.email);
            console.log("----------------");
        });

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getUsers();