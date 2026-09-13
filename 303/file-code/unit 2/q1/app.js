// Import functions from mathUtils.js
import { add, subtract, multiply, divide } from "./mathUtils.js";

// Using let for values
let num1 = 20;
let num2 = 10;

// Perform calculations
const addition = add(num1, num2);
const subtraction = subtract(num1, num2);
const multiplication = multiply(num1, num2);
const division = divide(num1, num2);

// Display results
console.log("Addition:", addition);
console.log("Subtraction:", subtraction);
console.log("Multiplication:", multiplication);
console.log("Division:", division);