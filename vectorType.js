class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(_Vector) {
    return new Vector(this.x + _Vector.x, this.y + _Vector.y);
  }

  minus(_Vector) {
    return new Vector(this.x - _Vector.x, this.y - _Vector.y);
  }

  get length() {
    // √(x2 + y2)
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}


console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);