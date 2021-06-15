class GroupIterator {
  constructor(group) {
    this.current = 0;
    this.group = group;
  }
  next() {
    if (this.current >= this.group.values.length) {
      return { done: true };
    }
    let value = { value: this.group.values[this.current], done: false };
    this.current++;
    return value;
  }
}

class Group {
  constructor() {
    this.values = [];
  }

  _alreadyExist(val) {
    return this.values.includes(val);
  }

  add(val) {
    !this._alreadyExist(val) && this.values.push(val);
  }

  delete(val) {
    if (this._alreadyExist(val)) {
      let valInx = this.values.indexOf(val);
      this.values = [
        ...this.values.slice(0, valInx),
        ...this.values.slice(valInx + 1),
      ];
    }
  }

  has(val) {
    return this._alreadyExist(val);
  }

  static from(arr = []) {
    let newGroup = new Group();
    arr.map((i) => newGroup.add(i));
    return newGroup;
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

let group = Group.from([10, 20]);

console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
