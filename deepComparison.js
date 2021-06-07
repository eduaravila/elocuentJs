const obj = { here: { is: "an" }, object: 2 };
const obj2 = { here: { is: "an" }, object: 3 };

const deepComparison = (obj1, obj2) => {
  let keysObj1 = Object.keys(obj1);
  let keysObj2 = Object.keys(obj2);
  console.log(keysObj1);
  // same keys
  if (keysObj1.length == keysObj2.length) {
    for (const key1 of keysObj1) {
      if (
        typeof obj1[key1] == "object" &&
        obj1[key1] !== null &&
        typeof obj2[key1] == "object" &&
        obj2[key1] !== null
      ) {
        deepComparison(obj1[key1], obj2[key1]);
      } else if (obj1[key1] !== obj2[key1]) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
};

let res = deepComparison(obj, {here: {is: "an"}, object: 2})
console.log(res);
