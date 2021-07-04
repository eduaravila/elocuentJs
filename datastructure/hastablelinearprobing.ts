interface Tuple<Type> {
  key: string;
  val: Type;
}

class HashtableFullError extends Error {}

class HashtableLinear {
  data: Tuple<string>[];
  size: number;
  constructor(size: number) {
    this.data = [];
    this.size = size;
  }

  _gethash(key: string): number {
    return (
      key.split("").reduce((a: number, b: string) => a + b.charCodeAt(0), 0) %
      this.size
    );
  }

  add(key: string, val: string) {
    let inx = this._gethash(key);
    if (!this.data[inx]) {
      this.data[inx] = { key, val };
      return;
    }
    let index = 0;
    while ((inx + index) % this.size < this.size && !!this.data[inx + index]) {
      index++;
    }
    if (index < this.size) {
      let newinx = (inx + index) % this.size;
      this.data[newinx] = { val, key };
      return;
    }
    throw new HashtableFullError("Full hashtable");
  }

  get(key: string): Tuple<string> | undefined {
    let inx = this._gethash(key);
    if (!!this.data[inx] && this.data[inx].key == key) {
      return this.data[inx];
    }
    let index = 0;
    while (index < this.size) {

      if (this.data[(index + inx) % this.size]?.key == key) break;
      index++;
    }

    if (index < this.size) {
      let newinx = (index + inx) % this.size;

      return this.data[newinx].key == key ? this.data[newinx] : undefined;
    }

    return undefined;
  }
}

let hash = new HashtableLinear(5);
hash.add("test", "test");
hash.add("test1", "test1");
hash.add("test2", "test2");
hash.add("test3", "test3");

console.log(hash.get("test3"));
console.log(hash.get("test5"));
