const merge = (temp, a, b) => {
  let index = 0;
  let l = 0;
  let r = 0;
  let lmax = a.length - 1;
  let rmax = b.length - 1;

  //   keep both arr balanced
  while (l <= lmax && r <= rmax) {
    if (a[l] < b[r]) {
      temp[index] = a[l];
      l++;
    } else {
      temp[index] = b[r];
      r++;
    }
    index++;
  }
  while (l <= lmax) {
    temp[index] = a[l];
    index++;
    l++;
  }
  while (r <= rmax) {
    temp[index] = b[r];
    index++;
    r++;
  }
  return temp;
};

const mergesort = (arr = []) => {
  if (arr.length <= 1) {
    return;
  }

  let middle = Math.floor(arr.length / 2);
  let l = arr.slice(0, middle);
  let r = arr.slice(middle);
  mergesort(l);
  mergesort(r);
  let res = merge(arr, l, r);
  return res;
};
// let temp = [];
// let sorted = mergesort([10, 9, 8, 7, 6, 4, 3, 2]);

const mergeindex = (arr, left_start, right_end) => {
  let size = right_end - left_start + 1;
  let temp = Array(size);

  let left_end = Math.floor((left_start + right_end) / 2);
  let right_start = left_end + 1;

  let l = left_start;
  let r = right_start;
  let index = 0;

  while (l <= left_end && r <= right_end) {
    if (arr[l] <= arr[r]) {
      temp[index] = arr[l];
      l++;
      index++;
    } else {
      temp[index] = arr[r];
      r++;
      index++;
    }
  }

  while (l <= left_end) {
    temp[index] = arr[l];
    index++;
    l++;
  }
  while (r <= right_end) {
    temp[index] = arr[r];
    index++;
    r++;
  }
  for (let i = left_start; i <= right_end; i++) {
    arr[i] = temp[i - left_start];
  }
};

const mergesortindex = (arr, left, right) => {
  if (left >= right) {
    return;
  }

  let middle = Math.floor((left + right) / 2);
  mergesortindex(arr, left, middle);
  mergesortindex(arr, middle + 1, right);
  mergeindex(arr, left, right);
};

let temparr = [10, 9, 8, 7, 6, 4, 3, 2];
let samplearr = [10, 9, 8, 7, 6, 4, 3, 2];

mergesortindex(samplearr, 0, 7);

console.log(samplearr);
