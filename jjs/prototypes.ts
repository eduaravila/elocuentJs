interface HumanObject {
  teeth?: number;
  age?: number;
  __proto__?: HumanObject;
  tail?: boolean;
}

let human: HumanObject = {
  teeth: 32,
};

let gwen: HumanObject = {
  __proto__: human,
  age: 19,
};

console.log(human.age); // undefined
console.log(gwen.age); // 19

console.log(human.teeth); // 32
console.log(gwen.teeth); // 32

console.log(human.tail); // undefined
console.log(gwen.tail); // undefined

let goose = { location: "heaven" };

let cheese = { __proto__: goose };

// >>> Diagram this moment! <<<

console.log(cheese === goose); // false
console.log(cheese.location); // "heaven"

goose.location = "hell";
console.log(cheese.location); // "hell"
