/**
 * @param  {Type} a
 * @param  {Type} b
 * @returns boolean
 */
const strictEquals = <Type>(a: Type, b: Type): boolean => {
  // same values

  if (Object.is(a, b)) {
    if (Object.is(a, NaN) && Object.is(b, NaN)) {
      return true;
    }

    if (
      (Object.is(a, -0) && Object.is(b, 0)) ||
      (Object.is(a, 0) && Object.is(b, -0))
    ) {
      return false;
    }
    return true;
  }
  return false;
};

console.log(strictEquals(0, -0));
console.log(strictEquals(-0, -0));
console.log(strictEquals(0, 0));
console.log(strictEquals(-0, 0));
console.log(strictEquals(NaN, NaN));
console.log(strictEquals("S", "S"));
