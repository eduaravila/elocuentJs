const SCRIPTS = require("./scripts");

const countBy = (arr = [], groupName) => {
  return arr.reduce((a = [], b) => {
    let name = groupName(b);
    let index = a.findIndex((val) => val.name == name);

    if (index > -1) {
      a[index].times += 1;
    } else {
      a.push({ name, times: 1 });
    }
    return a;
  }, []);
};

// gets the script name of the character
const characterScript = (character) =>
  SCRIPTS.find((i) =>
    i.ranges.find(([start, end]) => character >= start && character < end)
  ) || {};

const dominantDirection = (text) => {
  let scripts = countBy(text.split(""), (val) => {
    let { direction = "none" } = characterScript(val.codePointAt(0));
    return direction;
  });

  return scripts.reduce((a, b) => (b.times > a.times ? (a = b) : a), {
    times: 0,
  });
};

console.log(dominantDirection("Hello!"));
// // → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
