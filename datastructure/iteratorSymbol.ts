interface Object {
  [Symbol.iterator]: any;
}

Object.prototype[Symbol.iterator] = function* () {
  let values = Object.values(this);

  for (let val of values) {
    yield val;
  }
  return;
};

let test = { name: "Eduardo", age: 20 };

let it = test[Symbol.iterator]();

for (let val of test) {
  console.log("====================================");
  console.log(val);
  console.log("====================================");
}

// function* makeIterator() {
//     yield 1;
//     yield 2;
// }

// const it2= makeIterator();

// for (const itItem of it2) {
//     console.log(itItem);
// }
