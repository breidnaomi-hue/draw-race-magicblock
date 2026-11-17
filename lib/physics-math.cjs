'use strict';
// Pin transcendental implementations for authoritative simulation. This object
// is private to the solver and its geometry; the global Math object is untouched.
const sin = require('@stdlib/math-base-special-sin');
const cos = require('@stdlib/math-base-special-cos');
const atan2 = require('@stdlib/math-base-special-atan2');
const acos = require('@stdlib/math-base-special-acos');
const pow = require('@stdlib/math-base-special-pow');
const hypot2 = require('@stdlib/math-base-special-hypot');
const math = Object.create(Math);
function hypot(...values) {
  // The simulation uses pairs. Preserve the standard variadic surface as well.
  if (values.some(value => Math.abs(value) === Infinity)) return Infinity;
  if (values.some(Number.isNaN)) return NaN;
  let result = 0;
  for (const value of values) result = hypot2(result, value);
  return result;
}
Object.defineProperties(math, Object.fromEntries(Object.entries({sin,cos,atan2,acos,pow,hypot}).map(([name,value])=>[name,{value,enumerable:true}])));
module.exports = Object.freeze(math);
