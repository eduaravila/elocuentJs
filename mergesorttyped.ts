const compare = (
  arr: Array<number>,
  l: Array<number>,
  r: Array<number>
): Array<number> => {
  let index: number = 0;
  let ls: number = 0;
  let rs: number = 0;

  while (ls < l.length && rs < r.length) {
    if (l[ls] < r[rs]) {
      arr[index] = l[ls];
      index++;
      ls++;
    } else {
      arr[index] = r[rs];
      index++;
      rs++;
    }
  }

  while (ls < l.length) {
    arr[index] = l[ls];
    ls++;
    index++;
  }

  while (rs < r.length) {
    arr[index] = r[rs];
    rs++;
    index++;
  }
  return arr;
};

const mergesort = (arr: Array<number>): Array<number> => {
  if (arr.length <= 1) {
    return arr;
  }

  let middle: number = Math.floor(arr.length / 2);
  let l: Array<number> = arr.slice(0, middle);
  let r: Array<number> = arr.slice(middle);

  mergesort(l);
  mergesort(r);
  return compare(arr, l, r);
};

let sample = [10, 8, 43, 5, 6, 1];

let res = mergesort(sample);

console.log(res);
