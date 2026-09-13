const url = "https://jsonplaceholder.typicode.com/users";

fetch(url)
    .then((res) => {

        if (!res.ok) {

            if (res.status === 404) {
                throw new Error("Error 404: Data Not Found");
            }

            if (res.status === 500) {
                throw new Error("Error 500: Internal Server Error");
            }

            throw new Error("Something went wrong");
        }

        return res.json();
    })

    .then((data) => {
        console.log(data);
    })

    .catch((err) => {
        console.log(err.message);
    });