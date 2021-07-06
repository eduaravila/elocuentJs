class Heap {
  data: Array<number>;

  _get_parent_index(inx: number): number {
    return (inx - 2) / 2;
  }
  _get_left_index(inx: number): number {
    return inx * 2 + 1;
  }
  _get_right_index(inx: number): number {
    return inx * 2 + 2;
  }

  _has_parent(inx: number): boolean {
    return this._get_parent_index(inx) >= 0;
  }

  _has_left(inx: number): boolean {
    return this._get_left_index(inx) < this.data.length;
  }

  _has_right(inx: number): boolean {
    return this._get_right_index(inx) < this.data.length;
  }

  _swap(a: number, b: number) {
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  add(val: number) {
    this.data.push(val);
    this._heapifyup();
  }

  remove(val: number) {
    if (this.data.length <= 0) return undefined;

    this._swap(0, this.data.length - 1);
    this.data = this.data.slice(0, this.data.length - 1);
    this._heapifydown();
  }

  _heapifyup() {
    let index = this.data.length - 1;
    if (!this._has_parent(index)) return undefined;
    let parent_index = this._get_parent_index(index);

    // still has parent and the parent value is bigger than the current index val
    while (
      this._has_parent(index) &&
      this.data[parent_index] > this.data[index]
    ) {
      this._swap(index, parent_index);
      index = parent_index;
    }
  }

  _heapifydown() {
    //   starts at the top
    let index = 0;
    if (!this._has_left(index)) return undefined;

    while (this._has_left(index)) {
      let smallest_index = this._get_left_index(index);

      //  is the right less than the left
      if (
        this._has_right(index) &&
        this.data[smallest_index] > this.data[this._get_right_index(index)]
      ) {
        smallest_index = this._get_right_index(index);
      }

      if (this.data[smallest_index] > this.data[index]) {
        break;
      } else {
        this._swap(smallest_index, index);
      }
      
      index = smallest_index;
    }
  }
}
