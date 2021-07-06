class Heap {
  data: Array<number>;

  _get_parent_index(inx: number) {
    return (inx - 2) / 2;
  }
  _get_left_index(inx: number) {
    return inx * 2 + 1;
  }
  _get_right_index(inx: number) {
    return inx * 2 + 2;
  }
}
