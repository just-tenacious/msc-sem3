const url = "https://jsonplaceholder.typicode.com/users";

fetch(url)
    .then((res) => {
        // Check HTTP status
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Error 404: Data Not Found");
            }

            if (res.status === 500) {
                throw new Error("Error 500: Internal Server Error");
            }

            throw new Error(`HTTP Error: ${res.status}`);
        }

        return res.json();
    })
    .then((data) => {
        // Display only first 2 users
        const users = data.slice(0, 2);

        console.log("Data fetched successfully:");
        console.log(users);
    })
    .catch((err) => {
        console.log("Error:", err.message);
    });