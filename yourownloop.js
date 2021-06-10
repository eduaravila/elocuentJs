const loop = (max, testF, updateF, bodyF) => {
  for (let i = max; i > 0; i--) {
    if (!testF(i)) return;
    bodyF(i);
    updateF(i);
  }
};

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);
// → 3
// → 2
// → 1
