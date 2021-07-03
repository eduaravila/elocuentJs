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
  constructor(val: string, key: any, next: LNode) {
    this.val = val;
    this.key = key;
    this.next = next;
  }
}

class LinkedList {
  head: LNode;
  tail: LNode;

  constructor(key: string, val: any) {
    this.head = new LNode(key, val, null);
    this.tail = this.head;
  }

  append(val: any, key: string) {
    // first node is empty
    let node = this.head;
    if (node == null) {
      this.head = new LNode(val, key, null);
      return;
    }
    let current = node;

    while (current.next) {
      current = current.next;
    }
    current.next = new LNode(val, key, null);
    this.tail = node.next;
  }
}

class HashTable {
  data: LinkedList[];
  maxsize: number;

  constructor(maxsize: number) {
    this.data = [];
    this.maxsize = maxsize;
  }

  _get_item(key: string) {
    let inx = this._get_hash(key);
    return this.data[inx];
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

let myhashtable = new HashTable(10);
myhashtable._set_value("music", "IDK");
console.log(myhashtable);
