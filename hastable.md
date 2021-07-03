## Notes to myself

Typescript hashtable
```typescript 
// KEY => VALUE
// a => value the value can be of any type
// b => value the value can be of any type
// c => value the value can be of any type
// d => value the value can be of any type
// e => value the value can be of any type

// class hashtable {
// LinkedList[] list
// gethascode(key){
// generates hashcode
// }
// add(key,val){

// hashcode =gethascode(key)
// index = converttoindex(hashcode)

// newdata = list[index]
// newdata.add(key,val)
// }
// }

class LNode {
  val: any;
  key: string;
  next: LNode | null;
  constructor(val: string, key: any) {
    this.val = val;
    this.key = key;
    this.next = null;
  }
}

class LinkedList {
  head: LNode;
  tail: LNode;

  constructor(key: string, val: any) {
    this.head = new LNode(key, val);
    this.tail = this.head;
  }

  append(key: string, val: any) {
    // first node is empty
    let node: LNode = this.head;
    if (node == null) {
      this.head = new LNode(val, key);
      return;
    }
    let current: LNode = node;

    while (current.next) {
      current = current.next;
    }
    current.next = new LNode(val, key);
    this.tail = current.next;
  }

  get_value(key: string): LNode | undefined {
    if (this.head.key == key) {
      return this.head.val;
    }
    let current: LNode = this.head;
    while (current.next && current.key != key) {
      current = current.next;
    }
    if (current.key == key) {
      return current.val;
    } else {
      return undefined;
    }
  }
}

class HashTable {
  data: LinkedList[];
  maxsize: number;

  constructor(maxsize: number) {
    this.data = [];
    this.maxsize = maxsize;
  }

  get_item(key: string) {
    let inx = this._get_hash(key);
    if (!this.data || !this.data[inx]) return undefined;
    return this.data[inx].get_value(key);
  }

  _get_hash(key: string): number {
    let sum = key.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    return sum % this.maxsize;
  }

  _set_value(key: string, val: any) {
    let inx = this._get_hash(key);

    if (this.data[inx]) {
      this.data[inx].append(key, val);
    } else {
      this.data[inx] = new LinkedList(val, key);
    }
  }
}

let myhashtable = new HashTable(5);
myhashtable._set_value("music", "1");
myhashtable._set_value("second", "2");
myhashtable._set_value("third", "3");
myhashtable._set_value("march 17", "5");
myhashtable._set_value("march 8", "6");
myhashtable._set_value("new", "4");
myhashtable._set_value("march 9", "7");
myhashtable._set_value("march 6", "8");

console.log(myhashtable.get_item("march 9"));
console.log(myhashtable.get_item("new"));
console.log(myhashtable.get_item("third"));
console.log(myhashtable.get_item("music"));

```