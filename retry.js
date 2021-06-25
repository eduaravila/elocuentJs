// 08
"use strict";

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (error instanceof MultiplicatorUnitFailure) {
        console.log("Probability error");
      } else {
        throw e;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
