console.log(undefined); // unintentionally missing values
console.log(null); // intentionally missing values
console.log(true); // user for logical operations
console.log(100); // user for mathematical operations
console.log(BigInt); // user for math or big numbers (uncommon)
console.log("String"); // used for text
console.log(Symbol.iterator); // used to perform rituals and hide secrets
console.log({}); // used to group related data and code
console.log([]); // used to group related data and code
console.log((x: number) => x * 2); // used to refer to code

console.log(typeof {}); // "object"
console.log(typeof NaN); // "number"
console.log(typeof []); // "object"
console.log(typeof ((x: number) => x * 22)); // "function"
console.log(typeof Object); // "function"
console.log(typeof 2); // "number"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"

// Expressions are questions that JavaScript can answer. JavaScript answers expressions in the only way it knows how—with values.

let value = new Date();

// if (typeof value === "date") {
//   console.log("This is a date, indeed!");
// }

Number.isNaN(NaN); //true
// isNaN("Tee"); // NaN

console.log("typeof", typeof typeof 10);

/**
 *
 *
 * @param {string} name - Name of the book
 */
const book = (name: string) => {};

let reaction = "string";

reaction[0] = 10;
