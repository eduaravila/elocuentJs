const every = (array, test) => {
  for (let val of array) {
    if (!test(val)) return false;
  }
  return true;
};

const everySome = (array = [], test) => {
  if (array.some((val) => !test(val))) return false;
  return true;
};

console.log(every([1, 3, 5], (n) => n < 10));
// → true
console.log(every([2, 4, 16], (n) => n < 10));
// → false
console.log(every([], (n) => n < 10));
// → true

console.log(everySome([1, 3, 5], (n) => n < 10));
// → true
console.log(everySome([2, 4, 16], (n) => n < 10));
// → false
console.log(everySome([], (n) => n < 10));
// → true
