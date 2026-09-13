// ES6 Arrow Function
const greet = (name = "Student") => {
    return `Hello, ${name}!`;
};

// ES6 let
let number = 10;

// ES6 const
const square = (n = 1) => {
    return n * n;
};

console.log(greet("Shraddha"));
console.log("Number:", number);
console.log("Square:", square(number));