const swap = (arr, start, end) => {
  let temp = arr[end];
  arr[end] = arr[start];
  arr[start] = temp;
};

const permute = (arr, left, right, pivot) => {
  let l = left;
  let r = right;

  while (l < r) {
    while (arr[l] < pivot) {
      l++;
    }
    while (arr[r] > pivot) {
      r--;
    }
    if (l < r) {
      swap(arr, l, r);
      l++;
      r--;
    }
  }
  return l;
};

const quicksort = (arr, left, right) => {
  if (left >= right) {
    return;
  }

  let pivot = Math.floor((left + right) / 2);

  let index = permute(arr, left, right, arr[pivot]);
  quicksort(arr, left, index);
  quicksort(arr, index + 1, right);
  return
};

let sample = [10, 9, 8, 2, 5];

quicksort(sample, 0, sample.length - 1);

console.log(sample);
