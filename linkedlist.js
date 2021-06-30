class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = this.head;
  }

  getmiddle(list) {
    // single element
    if (!list || !list.next) return list;

    let a = list;
    let b = list.next;

    while (!!a && b && b.next) {
      a = a.next;
      b = b.next.next;
    }
    return a;
  }

  _quicksortpartition(leftnode, pivot) {
    let templinked = new LinkedList(null);
    while (!!leftnode && !!leftnode.val && leftnode.val != pivot.val) {
      while (leftnode.val < pivot.val) {
        leftnode = leftnode.next;
      }

      if (leftnode.val > pivot.val) {
        templinked.append(pivot.val);
        leftnode = leftnode.next;
      }
    }
    return leftnode;
  }

  _merge(a, b) {
    if (!a) {
      return b;
    }
    if (!b) {
      return a;
    }

    let result = null;

    if (a.val <= b.val) {
      result = a;
      result.next = this._merge(a.next, b);
    }
    else{
      result = b;
      result.next = this._merge(b.next, a);
    }

    return result;
  }

  _quicksort(h) {
    if (!h || !h.next) {
      return h;
    }

    let pivot = this.getmiddle(h);
    let nexttomiddle = pivot.next;
    pivot.next = null;

    let left = this._quicksort(h);
    let right = this._quicksort(nexttomiddle);
    console.log("Left-->",left);
    console.log("right-->",right);
    return this._merge(left, right);
  }

  order() {
    this.head = this._quicksort(this.head);
  }

  getNode(position) {
    if (this.head.val == null) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < position; i++) {
      if (current.val == null) return null;
      current = current.next;
    }
    return current;
  }

  append(val) {
    if (this.head.val == null) {
      this.head = new Node(val);
      this.tail = this.head;
      return;
    }
    let current = this.head;

    while (current.next != null) {
      current = current.next;
    }
    let newNode = new Node(val);
    current.next = newNode;
    this.tail = newNode;
  }
}

let my = new LinkedList();
my.append(50);
my.append(20);
my.append(2);
my.append(1);
my.append(10);

my.order();
console.log("ordered list", my.head);
