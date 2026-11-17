var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// ../../node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../node_modules/@stdlib/constants-float64-high-word-abs-mask/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/@stdlib/constants-float64-high-word-abs-mask/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_HIGH_WORD_ABS_MASK = 2147483647 >>> 0;
    module.exports = FLOAT64_HIGH_WORD_ABS_MASK;
  }
});

// ../../node_modules/@stdlib/constants-float64-high-word-exponent-mask/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-high-word-exponent-mask/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_HIGH_WORD_EXPONENT_MASK = 2146435072;
    module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;
  }
});

// ../../node_modules/@stdlib/assert-has-symbol-support/lib/main.js
var require_main = __commonJS({
  "../../node_modules/@stdlib/assert-has-symbol-support/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function hasSymbolSupport() {
      return typeof Symbol === "function" && typeof /* @__PURE__ */ Symbol("foo") === "symbol";
    }
    __name(hasSymbolSupport, "hasSymbolSupport");
    module.exports = hasSymbolSupport;
  }
});

// ../../node_modules/@stdlib/assert-has-symbol-support/lib/index.js
var require_lib3 = __commonJS({
  "../../node_modules/@stdlib/assert-has-symbol-support/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/assert-has-tostringtag-support/lib/main.js
var require_main2 = __commonJS({
  "../../node_modules/@stdlib/assert-has-tostringtag-support/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasSymbols = require_lib3();
    var FLG = hasSymbols();
    function hasToStringTagSupport() {
      return FLG && typeof Symbol.toStringTag === "symbol";
    }
    __name(hasToStringTagSupport, "hasToStringTagSupport");
    module.exports = hasToStringTagSupport;
  }
});

// ../../node_modules/@stdlib/assert-has-tostringtag-support/lib/index.js
var require_lib4 = __commonJS({
  "../../node_modules/@stdlib/assert-has-tostringtag-support/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main2();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/utils-native-class/lib/tostring.js
var require_tostring = __commonJS({
  "../../node_modules/@stdlib/utils-native-class/lib/tostring.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var toStr = Object.prototype.toString;
    module.exports = toStr;
  }
});

// ../../node_modules/@stdlib/utils-native-class/lib/main.js
var require_main3 = __commonJS({
  "../../node_modules/@stdlib/utils-native-class/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var toStr = require_tostring();
    function nativeClass(v) {
      return toStr.call(v);
    }
    __name(nativeClass, "nativeClass");
    module.exports = nativeClass;
  }
});

// ../../node_modules/@stdlib/assert-has-own-property/lib/main.js
var require_main4 = __commonJS({
  "../../node_modules/@stdlib/assert-has-own-property/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var has = Object.prototype.hasOwnProperty;
    function hasOwnProp(value, property) {
      if (value === void 0 || value === null) {
        return false;
      }
      return has.call(value, property);
    }
    __name(hasOwnProp, "hasOwnProp");
    module.exports = hasOwnProp;
  }
});

// ../../node_modules/@stdlib/assert-has-own-property/lib/index.js
var require_lib5 = __commonJS({
  "../../node_modules/@stdlib/assert-has-own-property/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main4();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/symbol-ctor/lib/main.js
var require_main5 = __commonJS({
  "../../node_modules/@stdlib/symbol-ctor/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Sym = typeof Symbol === "function" ? Symbol : void 0;
    module.exports = Sym;
  }
});

// ../../node_modules/@stdlib/symbol-ctor/lib/index.js
var require_lib6 = __commonJS({
  "../../node_modules/@stdlib/symbol-ctor/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main5();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/utils-native-class/lib/tostringtag.js
var require_tostringtag = __commonJS({
  "../../node_modules/@stdlib/utils-native-class/lib/tostringtag.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Symbol2 = require_lib6();
    var toStrTag = typeof Symbol2 === "function" ? Symbol2.toStringTag : "";
    module.exports = toStrTag;
  }
});

// ../../node_modules/@stdlib/utils-native-class/lib/polyfill.js
var require_polyfill = __commonJS({
  "../../node_modules/@stdlib/utils-native-class/lib/polyfill.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasOwnProp = require_lib5();
    var toStringTag = require_tostringtag();
    var toStr = require_tostring();
    function nativeClass(v) {
      var isOwn;
      var tag;
      var out;
      if (v === null || v === void 0) {
        return toStr.call(v);
      }
      tag = v[toStringTag];
      isOwn = hasOwnProp(v, toStringTag);
      try {
        v[toStringTag] = void 0;
      } catch (err) {
        return toStr.call(v);
      }
      out = toStr.call(v);
      if (isOwn) {
        v[toStringTag] = tag;
      } else {
        delete v[toStringTag];
      }
      return out;
    }
    __name(nativeClass, "nativeClass");
    module.exports = nativeClass;
  }
});

// ../../node_modules/@stdlib/utils-native-class/lib/index.js
var require_lib7 = __commonJS({
  "../../node_modules/@stdlib/utils-native-class/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasToStringTag = require_lib4();
    var builtin = require_main3();
    var polyfill = require_polyfill();
    var main;
    if (hasToStringTag()) {
      main = polyfill;
    } else {
      main = builtin;
    }
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/assert-is-uint32array/lib/main.js
var require_main6 = __commonJS({
  "../../node_modules/@stdlib/assert-is-uint32array/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var nativeClass = require_lib7();
    var hasUint32Array = typeof Uint32Array === "function";
    function isUint32Array(value) {
      return hasUint32Array && value instanceof Uint32Array || // eslint-disable-line stdlib/require-globals
      nativeClass(value) === "[object Uint32Array]";
    }
    __name(isUint32Array, "isUint32Array");
    module.exports = isUint32Array;
  }
});

// ../../node_modules/@stdlib/assert-is-uint32array/lib/index.js
var require_lib8 = __commonJS({
  "../../node_modules/@stdlib/assert-is-uint32array/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isUint32Array = require_main6();
    module.exports = isUint32Array;
  }
});

// ../../node_modules/@stdlib/constants-uint32-max/lib/index.js
var require_lib9 = __commonJS({
  "../../node_modules/@stdlib/constants-uint32-max/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var UINT32_MAX = 4294967295;
    module.exports = UINT32_MAX;
  }
});

// ../../node_modules/@stdlib/assert-has-uint32array-support/lib/uint32array.js
var require_uint32array = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint32array-support/lib/uint32array.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = typeof Uint32Array === "function" ? Uint32Array : null;
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/assert-has-uint32array-support/lib/main.js
var require_main7 = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint32array-support/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isUint32Array = require_lib8();
    var UINT32_MAX = require_lib9();
    var GlobalUint32Array = require_uint32array();
    function hasUint32ArraySupport() {
      var bool;
      var arr;
      if (typeof GlobalUint32Array !== "function") {
        return false;
      }
      try {
        arr = [1, 3.14, -3.14, UINT32_MAX + 1, UINT32_MAX + 2];
        arr = new GlobalUint32Array(arr);
        bool = isUint32Array(arr) && arr[0] === 1 && arr[1] === 3 && // truncation
        arr[2] === UINT32_MAX - 2 && // truncation and wrap around
        arr[3] === 0 && // wrap around
        arr[4] === 1;
      } catch (err) {
        bool = false;
      }
      return bool;
    }
    __name(hasUint32ArraySupport, "hasUint32ArraySupport");
    module.exports = hasUint32ArraySupport;
  }
});

// ../../node_modules/@stdlib/assert-has-uint32array-support/lib/index.js
var require_lib10 = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint32array-support/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasUint32ArraySupport = require_main7();
    module.exports = hasUint32ArraySupport;
  }
});

// ../../node_modules/@stdlib/array-uint32/lib/main.js
var require_main8 = __commonJS({
  "../../node_modules/@stdlib/array-uint32/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var ctor = typeof Uint32Array === "function" ? Uint32Array : void 0;
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/array-uint32/lib/polyfill.js
var require_polyfill2 = __commonJS({
  "../../node_modules/@stdlib/array-uint32/lib/polyfill.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function polyfill() {
      throw new Error("not implemented");
    }
    __name(polyfill, "polyfill");
    module.exports = polyfill;
  }
});

// ../../node_modules/@stdlib/array-uint32/lib/index.js
var require_lib11 = __commonJS({
  "../../node_modules/@stdlib/array-uint32/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasUint32ArraySupport = require_lib10();
    var builtin = require_main8();
    var polyfill = require_polyfill2();
    var ctor;
    if (hasUint32ArraySupport()) {
      ctor = builtin;
    } else {
      ctor = polyfill;
    }
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/assert-is-float64array/lib/main.js
var require_main9 = __commonJS({
  "../../node_modules/@stdlib/assert-is-float64array/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var nativeClass = require_lib7();
    var hasFloat64Array = typeof Float64Array === "function";
    function isFloat64Array(value) {
      return hasFloat64Array && value instanceof Float64Array || // eslint-disable-line stdlib/require-globals
      nativeClass(value) === "[object Float64Array]";
    }
    __name(isFloat64Array, "isFloat64Array");
    module.exports = isFloat64Array;
  }
});

// ../../node_modules/@stdlib/assert-is-float64array/lib/index.js
var require_lib12 = __commonJS({
  "../../node_modules/@stdlib/assert-is-float64array/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isFloat64Array = require_main9();
    module.exports = isFloat64Array;
  }
});

// ../../node_modules/@stdlib/assert-has-float64array-support/lib/float64array.js
var require_float64array = __commonJS({
  "../../node_modules/@stdlib/assert-has-float64array-support/lib/float64array.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = typeof Float64Array === "function" ? Float64Array : null;
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/assert-has-float64array-support/lib/main.js
var require_main10 = __commonJS({
  "../../node_modules/@stdlib/assert-has-float64array-support/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isFloat64Array = require_lib12();
    var GlobalFloat64Array = require_float64array();
    function hasFloat64ArraySupport() {
      var bool;
      var arr;
      if (typeof GlobalFloat64Array !== "function") {
        return false;
      }
      try {
        arr = new GlobalFloat64Array([1, 3.14, -3.14, NaN]);
        bool = isFloat64Array(arr) && arr[0] === 1 && arr[1] === 3.14 && arr[2] === -3.14 && arr[3] !== arr[3];
      } catch (err) {
        bool = false;
      }
      return bool;
    }
    __name(hasFloat64ArraySupport, "hasFloat64ArraySupport");
    module.exports = hasFloat64ArraySupport;
  }
});

// ../../node_modules/@stdlib/assert-has-float64array-support/lib/index.js
var require_lib13 = __commonJS({
  "../../node_modules/@stdlib/assert-has-float64array-support/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasFloat64ArraySupport = require_main10();
    module.exports = hasFloat64ArraySupport;
  }
});

// ../../node_modules/@stdlib/array-float64/lib/main.js
var require_main11 = __commonJS({
  "../../node_modules/@stdlib/array-float64/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var ctor = typeof Float64Array === "function" ? Float64Array : void 0;
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/array-float64/lib/polyfill.js
var require_polyfill3 = __commonJS({
  "../../node_modules/@stdlib/array-float64/lib/polyfill.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function polyfill() {
      throw new Error("not implemented");
    }
    __name(polyfill, "polyfill");
    module.exports = polyfill;
  }
});

// ../../node_modules/@stdlib/array-float64/lib/index.js
var require_lib14 = __commonJS({
  "../../node_modules/@stdlib/array-float64/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasFloat64ArraySupport = require_lib13();
    var builtin = require_main11();
    var polyfill = require_polyfill3();
    var ctor;
    if (hasFloat64ArraySupport()) {
      ctor = builtin;
    } else {
      ctor = polyfill;
    }
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/assert-is-uint8array/lib/main.js
var require_main12 = __commonJS({
  "../../node_modules/@stdlib/assert-is-uint8array/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var nativeClass = require_lib7();
    var hasUint8Array = typeof Uint8Array === "function";
    function isUint8Array(value) {
      return hasUint8Array && value instanceof Uint8Array || // eslint-disable-line stdlib/require-globals
      nativeClass(value) === "[object Uint8Array]";
    }
    __name(isUint8Array, "isUint8Array");
    module.exports = isUint8Array;
  }
});

// ../../node_modules/@stdlib/assert-is-uint8array/lib/index.js
var require_lib15 = __commonJS({
  "../../node_modules/@stdlib/assert-is-uint8array/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isUint8Array = require_main12();
    module.exports = isUint8Array;
  }
});

// ../../node_modules/@stdlib/constants-uint8-max/lib/index.js
var require_lib16 = __commonJS({
  "../../node_modules/@stdlib/constants-uint8-max/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var UINT8_MAX = 255 | 0;
    module.exports = UINT8_MAX;
  }
});

// ../../node_modules/@stdlib/assert-has-uint8array-support/lib/uint8array.js
var require_uint8array = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint8array-support/lib/uint8array.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = typeof Uint8Array === "function" ? Uint8Array : null;
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/assert-has-uint8array-support/lib/main.js
var require_main13 = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint8array-support/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isUint8Array = require_lib15();
    var UINT8_MAX = require_lib16();
    var GlobalUint8Array = require_uint8array();
    function hasUint8ArraySupport() {
      var bool;
      var arr;
      if (typeof GlobalUint8Array !== "function") {
        return false;
      }
      try {
        arr = [1, 3.14, -3.14, UINT8_MAX + 1, UINT8_MAX + 2];
        arr = new GlobalUint8Array(arr);
        bool = isUint8Array(arr) && arr[0] === 1 && arr[1] === 3 && // truncation
        arr[2] === UINT8_MAX - 2 && // truncation and wrap around
        arr[3] === 0 && // wrap around
        arr[4] === 1;
      } catch (err) {
        bool = false;
      }
      return bool;
    }
    __name(hasUint8ArraySupport, "hasUint8ArraySupport");
    module.exports = hasUint8ArraySupport;
  }
});

// ../../node_modules/@stdlib/assert-has-uint8array-support/lib/index.js
var require_lib17 = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint8array-support/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasUint8ArraySupport = require_main13();
    module.exports = hasUint8ArraySupport;
  }
});

// ../../node_modules/@stdlib/array-uint8/lib/main.js
var require_main14 = __commonJS({
  "../../node_modules/@stdlib/array-uint8/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var ctor = typeof Uint8Array === "function" ? Uint8Array : void 0;
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/array-uint8/lib/polyfill.js
var require_polyfill4 = __commonJS({
  "../../node_modules/@stdlib/array-uint8/lib/polyfill.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function polyfill() {
      throw new Error("not implemented");
    }
    __name(polyfill, "polyfill");
    module.exports = polyfill;
  }
});

// ../../node_modules/@stdlib/array-uint8/lib/index.js
var require_lib18 = __commonJS({
  "../../node_modules/@stdlib/array-uint8/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasUint8ArraySupport = require_lib17();
    var builtin = require_main14();
    var polyfill = require_polyfill4();
    var ctor;
    if (hasUint8ArraySupport()) {
      ctor = builtin;
    } else {
      ctor = polyfill;
    }
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/assert-is-uint16array/lib/main.js
var require_main15 = __commonJS({
  "../../node_modules/@stdlib/assert-is-uint16array/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var nativeClass = require_lib7();
    var hasUint16Array = typeof Uint16Array === "function";
    function isUint16Array(value) {
      return hasUint16Array && value instanceof Uint16Array || // eslint-disable-line stdlib/require-globals
      nativeClass(value) === "[object Uint16Array]";
    }
    __name(isUint16Array, "isUint16Array");
    module.exports = isUint16Array;
  }
});

// ../../node_modules/@stdlib/assert-is-uint16array/lib/index.js
var require_lib19 = __commonJS({
  "../../node_modules/@stdlib/assert-is-uint16array/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isUint16Array = require_main15();
    module.exports = isUint16Array;
  }
});

// ../../node_modules/@stdlib/constants-uint16-max/lib/index.js
var require_lib20 = __commonJS({
  "../../node_modules/@stdlib/constants-uint16-max/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var UINT16_MAX = 65535 | 0;
    module.exports = UINT16_MAX;
  }
});

// ../../node_modules/@stdlib/assert-has-uint16array-support/lib/uint16array.js
var require_uint16array = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint16array-support/lib/uint16array.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = typeof Uint16Array === "function" ? Uint16Array : null;
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/assert-has-uint16array-support/lib/main.js
var require_main16 = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint16array-support/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isUint16Array = require_lib19();
    var UINT16_MAX = require_lib20();
    var GlobalUint16Array = require_uint16array();
    function hasUint16ArraySupport() {
      var bool;
      var arr;
      if (typeof GlobalUint16Array !== "function") {
        return false;
      }
      try {
        arr = [1, 3.14, -3.14, UINT16_MAX + 1, UINT16_MAX + 2];
        arr = new GlobalUint16Array(arr);
        bool = isUint16Array(arr) && arr[0] === 1 && arr[1] === 3 && // truncation
        arr[2] === UINT16_MAX - 2 && // truncation and wrap around
        arr[3] === 0 && // wrap around
        arr[4] === 1;
      } catch (err) {
        bool = false;
      }
      return bool;
    }
    __name(hasUint16ArraySupport, "hasUint16ArraySupport");
    module.exports = hasUint16ArraySupport;
  }
});

// ../../node_modules/@stdlib/assert-has-uint16array-support/lib/index.js
var require_lib21 = __commonJS({
  "../../node_modules/@stdlib/assert-has-uint16array-support/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasUint16ArraySupport = require_main16();
    module.exports = hasUint16ArraySupport;
  }
});

// ../../node_modules/@stdlib/array-uint16/lib/main.js
var require_main17 = __commonJS({
  "../../node_modules/@stdlib/array-uint16/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var ctor = typeof Uint16Array === "function" ? Uint16Array : void 0;
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/array-uint16/lib/polyfill.js
var require_polyfill5 = __commonJS({
  "../../node_modules/@stdlib/array-uint16/lib/polyfill.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function polyfill() {
      throw new Error("not implemented");
    }
    __name(polyfill, "polyfill");
    module.exports = polyfill;
  }
});

// ../../node_modules/@stdlib/array-uint16/lib/index.js
var require_lib22 = __commonJS({
  "../../node_modules/@stdlib/array-uint16/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasUint16ArraySupport = require_lib21();
    var builtin = require_main17();
    var polyfill = require_polyfill5();
    var ctor;
    if (hasUint16ArraySupport()) {
      ctor = builtin;
    } else {
      ctor = polyfill;
    }
    module.exports = ctor;
  }
});

// ../../node_modules/@stdlib/assert-is-little-endian/lib/ctors.js
var require_ctors = __commonJS({
  "../../node_modules/@stdlib/assert-is-little-endian/lib/ctors.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Uint8Array2 = require_lib18();
    var Uint16Array2 = require_lib22();
    var ctors = {
      "uint16": Uint16Array2,
      "uint8": Uint8Array2
    };
    module.exports = ctors;
  }
});

// ../../node_modules/@stdlib/assert-is-little-endian/lib/main.js
var require_main18 = __commonJS({
  "../../node_modules/@stdlib/assert-is-little-endian/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var ctors = require_ctors();
    var bool;
    function isLittleEndian() {
      var uint16view;
      var uint8view;
      uint16view = new ctors["uint16"](1);
      uint16view[0] = 4660;
      uint8view = new ctors["uint8"](uint16view.buffer);
      return uint8view[0] === 52;
    }
    __name(isLittleEndian, "isLittleEndian");
    bool = isLittleEndian();
    module.exports = bool;
  }
});

// ../../node_modules/@stdlib/assert-is-little-endian/lib/index.js
var require_lib23 = __commonJS({
  "../../node_modules/@stdlib/assert-is-little-endian/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var IS_LITTLE_ENDIAN = require_main18();
    module.exports = IS_LITTLE_ENDIAN;
  }
});

// ../../node_modules/@stdlib/number-float64-base-get-high-word/lib/high.js
var require_high = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-get-high-word/lib/high.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isLittleEndian = require_lib23();
    var HIGH;
    if (isLittleEndian === true) {
      HIGH = 1;
    } else {
      HIGH = 0;
    }
    module.exports = HIGH;
  }
});

// ../../node_modules/@stdlib/number-float64-base-get-high-word/lib/main.js
var require_main19 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-get-high-word/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Uint32Array2 = require_lib11();
    var Float64Array2 = require_lib14();
    var HIGH = require_high();
    var FLOAT64_VIEW = new Float64Array2(1);
    var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
    function getHighWord(x) {
      FLOAT64_VIEW[0] = x;
      return UINT32_VIEW[HIGH];
    }
    __name(getHighWord, "getHighWord");
    module.exports = getHighWord;
  }
});

// ../../node_modules/@stdlib/number-float64-base-get-high-word/lib/index.js
var require_lib24 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-get-high-word/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main19();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-kernel-cos/lib/polyval_c13.js
var require_polyval_c13 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-kernel-cos/lib/polyval_c13.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalpoly(x) {
      if (x === 0) {
        return 0.0416666666666666;
      }
      return 0.0416666666666666 + x * (-0.001388888888887411 + x * 2480158728947673e-20);
    }
    __name(evalpoly, "evalpoly");
    module.exports = evalpoly;
  }
});

// ../../node_modules/@stdlib/math-base-special-kernel-cos/lib/polyval_c46.js
var require_polyval_c46 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-kernel-cos/lib/polyval_c46.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalpoly(x) {
      if (x === 0) {
        return -27557314351390663e-23;
      }
      return -27557314351390663e-23 + x * (2087572321298175e-24 + x * -11359647557788195e-27);
    }
    __name(evalpoly, "evalpoly");
    module.exports = evalpoly;
  }
});

// ../../node_modules/@stdlib/math-base-special-kernel-cos/lib/main.js
var require_main20 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-kernel-cos/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var polyval13 = require_polyval_c13();
    var polyval46 = require_polyval_c46();
    function kernelCos(x, y) {
      var hz;
      var r;
      var w;
      var z;
      z = x * x;
      w = z * z;
      r = z * polyval13(z);
      r += w * w * polyval46(z);
      hz = 0.5 * z;
      w = 1 - hz;
      return w + (1 - w - hz + (z * r - x * y));
    }
    __name(kernelCos, "kernelCos");
    module.exports = kernelCos;
  }
});

// ../../node_modules/@stdlib/math-base-special-kernel-cos/lib/index.js
var require_lib25 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-kernel-cos/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main20();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-kernel-sin/lib/main.js
var require_main21 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-kernel-sin/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var S1 = -0.16666666666666632;
    var S2 = 0.00833333333332249;
    var S3 = -1984126982985795e-19;
    var S4 = 27557313707070068e-22;
    var S5 = -25050760253406863e-24;
    var S6 = 158969099521155e-24;
    function kernelSin(x, y) {
      var r;
      var v;
      var w;
      var z;
      z = x * x;
      w = z * z;
      r = S2 + z * (S3 + z * S4) + z * w * (S5 + z * S6);
      v = z * x;
      if (y === 0) {
        return x + v * (S1 + z * r);
      }
      return x - (z * (0.5 * y - v * r) - y - v * S1);
    }
    __name(kernelSin, "kernelSin");
    module.exports = kernelSin;
  }
});

// ../../node_modules/@stdlib/math-base-special-kernel-sin/lib/index.js
var require_lib26 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-kernel-sin/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main21();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-high-word-significand-mask/lib/index.js
var require_lib27 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-high-word-significand-mask/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = 1048575;
    module.exports = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK;
  }
});

// ../../node_modules/@stdlib/number-float64-base-get-low-word/lib/low.js
var require_low = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-get-low-word/lib/low.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isLittleEndian = require_lib23();
    var LOW;
    if (isLittleEndian === true) {
      LOW = 0;
    } else {
      LOW = 1;
    }
    module.exports = LOW;
  }
});

// ../../node_modules/@stdlib/number-float64-base-get-low-word/lib/main.js
var require_main22 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-get-low-word/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Uint32Array2 = require_lib11();
    var Float64Array2 = require_lib14();
    var LOW = require_low();
    var FLOAT64_VIEW = new Float64Array2(1);
    var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
    function getLowWord(x) {
      FLOAT64_VIEW[0] = x;
      return UINT32_VIEW[LOW];
    }
    __name(getLowWord, "getLowWord");
    module.exports = getLowWord;
  }
});

// ../../node_modules/@stdlib/number-float64-base-get-low-word/lib/index.js
var require_lib28 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-get-low-word/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main22();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/number-float64-base-from-words/lib/indices.js
var require_indices = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-from-words/lib/indices.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isLittleEndian = require_lib23();
    var indices;
    var HIGH;
    var LOW;
    if (isLittleEndian === true) {
      HIGH = 1;
      LOW = 0;
    } else {
      HIGH = 0;
      LOW = 1;
    }
    indices = {
      "HIGH": HIGH,
      "LOW": LOW
    };
    module.exports = indices;
  }
});

// ../../node_modules/@stdlib/number-float64-base-from-words/lib/main.js
var require_main23 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-from-words/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Uint32Array2 = require_lib11();
    var Float64Array2 = require_lib14();
    var indices = require_indices();
    var FLOAT64_VIEW = new Float64Array2(1);
    var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
    var HIGH = indices.HIGH;
    var LOW = indices.LOW;
    function fromWords(high, low) {
      UINT32_VIEW[HIGH] = high;
      UINT32_VIEW[LOW] = low;
      return FLOAT64_VIEW[0];
    }
    __name(fromWords, "fromWords");
    module.exports = fromWords;
  }
});

// ../../node_modules/@stdlib/number-float64-base-from-words/lib/index.js
var require_lib29 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-from-words/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main23();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-floor/lib/main.js
var require_main24 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-floor/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var floor = Math.floor;
    module.exports = floor;
  }
});

// ../../node_modules/@stdlib/math-base-special-floor/lib/index.js
var require_lib30 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-floor/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main24();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-pinf/lib/index.js
var require_lib31 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-pinf/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_PINF = Number.POSITIVE_INFINITY;
    module.exports = FLOAT64_PINF;
  }
});

// ../../node_modules/@stdlib/number-ctor/lib/main.js
var require_main25 = __commonJS({
  "../../node_modules/@stdlib/number-ctor/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    module.exports = Number;
  }
});

// ../../node_modules/@stdlib/number-ctor/lib/index.js
var require_lib32 = __commonJS({
  "../../node_modules/@stdlib/number-ctor/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main25();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-ninf/lib/index.js
var require_lib33 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-ninf/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Number2 = require_lib32();
    var FLOAT64_NINF = Number2.NEGATIVE_INFINITY;
    module.exports = FLOAT64_NINF;
  }
});

// ../../node_modules/@stdlib/constants-float64-exponent-bias/lib/index.js
var require_lib34 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-exponent-bias/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_EXPONENT_BIAS = 1023 | 0;
    module.exports = FLOAT64_EXPONENT_BIAS;
  }
});

// ../../node_modules/@stdlib/constants-float64-max-base2-exponent/lib/index.js
var require_lib35 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-max-base2-exponent/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_MAX_BASE2_EXPONENT = 1023 | 0;
    module.exports = FLOAT64_MAX_BASE2_EXPONENT;
  }
});

// ../../node_modules/@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js
var require_lib36 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023 | 0;
    module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;
  }
});

// ../../node_modules/@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js
var require_lib37 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074 | 0;
    module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-nan/lib/main.js
var require_main26 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-nan/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function isnan(x) {
      return x !== x;
    }
    __name(isnan, "isnan");
    module.exports = isnan;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-nan/lib/index.js
var require_lib38 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-nan/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main26();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-infinite/lib/main.js
var require_main27 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-infinite/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var PINF = require_lib31();
    var NINF = require_lib33();
    function isInfinite(x) {
      return x === PINF || x === NINF;
    }
    __name(isInfinite, "isInfinite");
    module.exports = isInfinite;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-infinite/lib/index.js
var require_lib39 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-infinite/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main27();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-high-word-sign-mask/lib/index.js
var require_lib40 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-high-word-sign-mask/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_HIGH_WORD_SIGN_MASK = 2147483648 >>> 0;
    module.exports = FLOAT64_HIGH_WORD_SIGN_MASK;
  }
});

// ../../node_modules/@stdlib/utils-define-property/lib/define_property.js
var require_define_property = __commonJS({
  "../../node_modules/@stdlib/utils-define-property/lib/define_property.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = typeof Object.defineProperty === "function" ? Object.defineProperty : null;
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/utils-define-property/lib/has_define_property_support.js
var require_has_define_property_support = __commonJS({
  "../../node_modules/@stdlib/utils-define-property/lib/has_define_property_support.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var defineProperty = require_define_property();
    function hasDefinePropertySupport() {
      try {
        defineProperty({}, "x", {});
        return true;
      } catch (err) {
        return false;
      }
    }
    __name(hasDefinePropertySupport, "hasDefinePropertySupport");
    module.exports = hasDefinePropertySupport;
  }
});

// ../../node_modules/@stdlib/utils-define-property/lib/builtin.js
var require_builtin = __commonJS({
  "../../node_modules/@stdlib/utils-define-property/lib/builtin.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var defineProperty = Object.defineProperty;
    module.exports = defineProperty;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/is_number.js
var require_is_number = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/is_number.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function isNumber(value) {
      return typeof value === "number";
    }
    __name(isNumber, "isNumber");
    module.exports = isNumber;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/zero_pad.js
var require_zero_pad = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/zero_pad.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function startsWithMinus(str) {
      return str[0] === "-";
    }
    __name(startsWithMinus, "startsWithMinus");
    function zeros(n) {
      var out = "";
      var i;
      for (i = 0; i < n; i++) {
        out += "0";
      }
      return out;
    }
    __name(zeros, "zeros");
    function zeroPad(str, width, right) {
      var negative = false;
      var pad = width - str.length;
      if (pad < 0) {
        return str;
      }
      if (startsWithMinus(str)) {
        negative = true;
        str = str.substr(1);
      }
      str = right ? str + zeros(pad) : zeros(pad) + str;
      if (negative) {
        str = "-" + str;
      }
      return str;
    }
    __name(zeroPad, "zeroPad");
    module.exports = zeroPad;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/format_integer.js
var require_format_integer = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/format_integer.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isNumber = require_is_number();
    var zeroPad = require_zero_pad();
    var lowercase = String.prototype.toLowerCase;
    var uppercase = String.prototype.toUpperCase;
    function formatInteger(token) {
      var base;
      var out;
      var i;
      switch (token.specifier) {
        case "b":
          base = 2;
          break;
        case "o":
          base = 8;
          break;
        case "x":
        case "X":
          base = 16;
          break;
        case "d":
        case "i":
        case "u":
        default:
          base = 10;
          break;
      }
      out = token.arg;
      i = parseInt(out, 10);
      if (!isFinite(i)) {
        if (!isNumber(out)) {
          throw new Error("invalid integer. Value: " + out);
        }
        i = 0;
      }
      if (i < 0 && (token.specifier === "u" || base !== 10)) {
        i = 4294967295 + i + 1;
      }
      if (i < 0) {
        out = (-i).toString(base);
        if (token.precision) {
          out = zeroPad(out, token.precision, token.padRight);
        }
        out = "-" + out;
      } else {
        out = i.toString(base);
        if (!i && !token.precision) {
          out = "";
        } else if (token.precision) {
          out = zeroPad(out, token.precision, token.padRight);
        }
        if (token.sign) {
          out = token.sign + out;
        }
      }
      if (base === 16) {
        if (token.alternate) {
          out = "0x" + out;
        }
        out = token.specifier === uppercase.call(token.specifier) ? uppercase.call(out) : lowercase.call(out);
      }
      if (base === 8) {
        if (token.alternate && out.charAt(0) !== "0") {
          out = "0" + out;
        }
      }
      return out;
    }
    __name(formatInteger, "formatInteger");
    module.exports = formatInteger;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/is_string.js
var require_is_string = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/is_string.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function isString(value) {
      return typeof value === "string";
    }
    __name(isString, "isString");
    module.exports = isString;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/format_double.js
var require_format_double = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/format_double.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var abs = Math.abs;
    var lowercase = String.prototype.toLowerCase;
    var uppercase = String.prototype.toUpperCase;
    var replace = String.prototype.replace;
    var RE_EXP_POS_DIGITS = /e\+(\d)$/;
    var RE_EXP_NEG_DIGITS = /e-(\d)$/;
    var RE_ONLY_DIGITS = /^(\d+)$/;
    var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
    var RE_TRAILING_PERIOD_ZERO = /\.0$/;
    var RE_PERIOD_ZERO_EXP = /\.0*e/;
    var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;
    function formatDouble(f, token) {
      var digits;
      var out;
      switch (token.specifier) {
        case "e":
        case "E":
          out = f.toExponential(token.precision);
          break;
        case "f":
        case "F":
          out = f.toFixed(token.precision);
          break;
        case "g":
        case "G":
          if (abs(f) < 1e-4) {
            digits = token.precision;
            if (digits > 0) {
              digits -= 1;
            }
            out = f.toExponential(digits);
          } else {
            out = f.toPrecision(token.precision);
          }
          if (!token.alternate) {
            out = replace.call(out, RE_ZERO_BEFORE_EXP, "$1e");
            out = replace.call(out, RE_PERIOD_ZERO_EXP, "e");
            out = replace.call(out, RE_TRAILING_PERIOD_ZERO, "");
          }
          break;
        default:
          throw new Error("invalid double notation. Value: " + token.specifier);
      }
      out = replace.call(out, RE_EXP_POS_DIGITS, "e+0$1");
      out = replace.call(out, RE_EXP_NEG_DIGITS, "e-0$1");
      if (token.alternate) {
        out = replace.call(out, RE_ONLY_DIGITS, "$1.");
        out = replace.call(out, RE_DIGITS_BEFORE_EXP, "$1.e");
      }
      if (f >= 0 && token.sign) {
        out = token.sign + out;
      }
      out = token.specifier === uppercase.call(token.specifier) ? uppercase.call(out) : lowercase.call(out);
      return out;
    }
    __name(formatDouble, "formatDouble");
    module.exports = formatDouble;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/space_pad.js
var require_space_pad = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/space_pad.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function spaces(n) {
      var out = "";
      var i;
      for (i = 0; i < n; i++) {
        out += " ";
      }
      return out;
    }
    __name(spaces, "spaces");
    function spacePad(str, width, right) {
      var pad = width - str.length;
      if (pad < 0) {
        return str;
      }
      str = right ? str + spaces(pad) : spaces(pad) + str;
      return str;
    }
    __name(spacePad, "spacePad");
    module.exports = spacePad;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/main.js
var require_main28 = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var formatInteger = require_format_integer();
    var isString = require_is_string();
    var isNumber = require_is_number();
    var formatDouble = require_format_double();
    var spacePad = require_space_pad();
    var zeroPad = require_zero_pad();
    var fromCharCode = String.fromCharCode;
    var isArray = Array.isArray;
    function isnan(value) {
      return value !== value;
    }
    __name(isnan, "isnan");
    function initialize(token) {
      var out = {};
      out.specifier = token.specifier;
      out.precision = token.precision === void 0 ? 1 : token.precision;
      out.width = token.width;
      out.flags = token.flags || "";
      out.mapping = token.mapping;
      return out;
    }
    __name(initialize, "initialize");
    function formatInterpolate(tokens) {
      var hasPeriod;
      var flags;
      var token;
      var flag;
      var num;
      var out;
      var pos;
      var f;
      var i;
      var j;
      if (!isArray(tokens)) {
        throw new TypeError("invalid argument. First argument must be an array. Value: `" + tokens + "`.");
      }
      out = "";
      pos = 1;
      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        if (isString(token)) {
          out += token;
        } else {
          hasPeriod = token.precision !== void 0;
          token = initialize(token);
          if (!token.specifier) {
            throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `" + i + "`. Value: `" + token + "`.");
          }
          if (token.mapping) {
            pos = token.mapping;
          }
          flags = token.flags;
          for (j = 0; j < flags.length; j++) {
            flag = flags.charAt(j);
            switch (flag) {
              case " ":
                token.sign = " ";
                break;
              case "+":
                token.sign = "+";
                break;
              case "-":
                token.padRight = true;
                token.padZeros = false;
                break;
              case "0":
                token.padZeros = flags.indexOf("-") < 0;
                break;
              case "#":
                token.alternate = true;
                break;
              default:
                throw new Error("invalid flag: " + flag);
            }
          }
          if (token.width === "*") {
            token.width = parseInt(arguments[pos], 10);
            pos += 1;
            if (isnan(token.width)) {
              throw new TypeError("the argument for * width at position " + pos + " is not a number. Value: `" + token.width + "`.");
            }
            if (token.width < 0) {
              token.padRight = true;
              token.width = -token.width;
            }
          }
          if (hasPeriod) {
            if (token.precision === "*") {
              token.precision = parseInt(arguments[pos], 10);
              pos += 1;
              if (isnan(token.precision)) {
                throw new TypeError("the argument for * precision at position " + pos + " is not a number. Value: `" + token.precision + "`.");
              }
              if (token.precision < 0) {
                token.precision = 1;
                hasPeriod = false;
              }
            }
          }
          token.arg = arguments[pos];
          switch (token.specifier) {
            case "b":
            case "o":
            case "x":
            case "X":
            case "d":
            case "i":
            case "u":
              if (hasPeriod) {
                token.padZeros = false;
              }
              token.arg = formatInteger(token);
              break;
            case "s":
              token.maxWidth = hasPeriod ? token.precision : -1;
              token.arg = String(token.arg);
              break;
            case "c":
              if (!isnan(token.arg)) {
                num = parseInt(token.arg, 10);
                if (num < 0 || num > 127) {
                  throw new Error("invalid character code. Value: " + token.arg);
                }
                token.arg = isnan(num) ? String(token.arg) : fromCharCode(num);
              }
              break;
            case "e":
            case "E":
            case "f":
            case "F":
            case "g":
            case "G":
              if (!hasPeriod) {
                token.precision = 6;
              }
              f = parseFloat(token.arg);
              if (!isFinite(f)) {
                if (!isNumber(token.arg)) {
                  throw new Error("invalid floating-point number. Value: " + out);
                }
                f = token.arg;
                token.padZeros = false;
              }
              token.arg = formatDouble(f, token);
              break;
            default:
              throw new Error("invalid specifier: " + token.specifier);
          }
          if (token.maxWidth >= 0 && token.arg.length > token.maxWidth) {
            token.arg = token.arg.substring(0, token.maxWidth);
          }
          if (token.padZeros) {
            token.arg = zeroPad(token.arg, token.width || token.precision, token.padRight);
          } else if (token.width) {
            token.arg = spacePad(token.arg, token.width, token.padRight);
          }
          out += token.arg || "";
          pos += 1;
        }
      }
      return out;
    }
    __name(formatInterpolate, "formatInterpolate");
    module.exports = formatInterpolate;
  }
});

// ../../node_modules/@stdlib/string-base-format-interpolate/lib/index.js
var require_lib41 = __commonJS({
  "../../node_modules/@stdlib/string-base-format-interpolate/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main28();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/string-base-format-tokenize/lib/main.js
var require_main29 = __commonJS({
  "../../node_modules/@stdlib/string-base-format-tokenize/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;
    function parse(match) {
      var token = {
        "mapping": match[1] ? parseInt(match[1], 10) : void 0,
        "flags": match[2],
        "width": match[3],
        "precision": match[5],
        "specifier": match[6]
      };
      if (match[4] === "." && match[5] === void 0) {
        token.precision = "1";
      }
      return token;
    }
    __name(parse, "parse");
    function formatTokenize(str) {
      var content;
      var tokens;
      var match;
      var prev;
      tokens = [];
      prev = 0;
      match = RE.exec(str);
      while (match) {
        content = str.slice(prev, RE.lastIndex - match[0].length);
        if (content.length) {
          tokens.push(content);
        }
        if (match[6] === "%") {
          tokens.push("%");
        } else {
          tokens.push(parse(match));
        }
        prev = RE.lastIndex;
        match = RE.exec(str);
      }
      content = str.slice(prev);
      if (content.length) {
        tokens.push(content);
      }
      return tokens;
    }
    __name(formatTokenize, "formatTokenize");
    module.exports = formatTokenize;
  }
});

// ../../node_modules/@stdlib/string-base-format-tokenize/lib/index.js
var require_lib42 = __commonJS({
  "../../node_modules/@stdlib/string-base-format-tokenize/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main29();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/string-format/lib/is_string.js
var require_is_string2 = __commonJS({
  "../../node_modules/@stdlib/string-format/lib/is_string.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function isString(value) {
      return typeof value === "string";
    }
    __name(isString, "isString");
    module.exports = isString;
  }
});

// ../../node_modules/@stdlib/string-format/lib/main.js
var require_main30 = __commonJS({
  "../../node_modules/@stdlib/string-format/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var interpolate = require_lib41();
    var tokenize = require_lib42();
    var isString = require_is_string2();
    function format(str) {
      var args;
      var i;
      if (!isString(str)) {
        throw new TypeError(format("invalid argument. First argument must be a string. Value: `%s`.", str));
      }
      args = [tokenize(str)];
      for (i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      return interpolate.apply(null, args);
    }
    __name(format, "format");
    module.exports = format;
  }
});

// ../../node_modules/@stdlib/string-format/lib/index.js
var require_lib43 = __commonJS({
  "../../node_modules/@stdlib/string-format/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main30();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/utils-define-property/lib/polyfill.js
var require_polyfill6 = __commonJS({
  "../../node_modules/@stdlib/utils-define-property/lib/polyfill.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var format = require_lib43();
    var objectProtoype = Object.prototype;
    var toStr = objectProtoype.toString;
    var defineGetter = objectProtoype.__defineGetter__;
    var defineSetter = objectProtoype.__defineSetter__;
    var lookupGetter = objectProtoype.__lookupGetter__;
    var lookupSetter = objectProtoype.__lookupSetter__;
    function defineProperty(obj, prop, descriptor) {
      var prototype;
      var hasValue;
      var hasGet;
      var hasSet;
      if (typeof obj !== "object" || obj === null || toStr.call(obj) === "[object Array]") {
        throw new TypeError(format("invalid argument. First argument must be an object. Value: `%s`.", obj));
      }
      if (typeof descriptor !== "object" || descriptor === null || toStr.call(descriptor) === "[object Array]") {
        throw new TypeError(format("invalid argument. Property descriptor must be an object. Value: `%s`.", descriptor));
      }
      hasValue = "value" in descriptor;
      if (hasValue) {
        if (lookupGetter.call(obj, prop) || lookupSetter.call(obj, prop)) {
          prototype = obj.__proto__;
          obj.__proto__ = objectProtoype;
          delete obj[prop];
          obj[prop] = descriptor.value;
          obj.__proto__ = prototype;
        } else {
          obj[prop] = descriptor.value;
        }
      }
      hasGet = "get" in descriptor;
      hasSet = "set" in descriptor;
      if (hasValue && (hasGet || hasSet)) {
        throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");
      }
      if (hasGet && defineGetter) {
        defineGetter.call(obj, prop, descriptor.get);
      }
      if (hasSet && defineSetter) {
        defineSetter.call(obj, prop, descriptor.set);
      }
      return obj;
    }
    __name(defineProperty, "defineProperty");
    module.exports = defineProperty;
  }
});

// ../../node_modules/@stdlib/utils-define-property/lib/index.js
var require_lib44 = __commonJS({
  "../../node_modules/@stdlib/utils-define-property/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var hasDefinePropertySupport = require_has_define_property_support();
    var builtin = require_builtin();
    var polyfill = require_polyfill6();
    var defineProperty;
    if (hasDefinePropertySupport()) {
      defineProperty = builtin;
    } else {
      defineProperty = polyfill;
    }
    module.exports = defineProperty;
  }
});

// ../../node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js
var require_main31 = __commonJS({
  "../../node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var defineProperty = require_lib44();
    function setNonEnumerableReadOnly(obj, prop, value) {
      defineProperty(obj, prop, {
        "configurable": false,
        "enumerable": false,
        "writable": false,
        "value": value
      });
    }
    __name(setNonEnumerableReadOnly, "setNonEnumerableReadOnly");
    module.exports = setNonEnumerableReadOnly;
  }
});

// ../../node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js
var require_lib45 = __commonJS({
  "../../node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main31();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/number-float64-base-to-words/lib/indices.js
var require_indices2 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-to-words/lib/indices.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isLittleEndian = require_lib23();
    var indices;
    var HIGH;
    var LOW;
    if (isLittleEndian === true) {
      HIGH = 1;
      LOW = 0;
    } else {
      HIGH = 0;
      LOW = 1;
    }
    indices = {
      "HIGH": HIGH,
      "LOW": LOW
    };
    module.exports = indices;
  }
});

// ../../node_modules/@stdlib/number-float64-base-to-words/lib/assign.js
var require_assign = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-to-words/lib/assign.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Uint32Array2 = require_lib11();
    var Float64Array2 = require_lib14();
    var indices = require_indices2();
    var FLOAT64_VIEW = new Float64Array2(1);
    var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
    var HIGH = indices.HIGH;
    var LOW = indices.LOW;
    function toWords(x, out, stride, offset) {
      FLOAT64_VIEW[0] = x;
      out[offset] = UINT32_VIEW[HIGH];
      out[offset + stride] = UINT32_VIEW[LOW];
      return out;
    }
    __name(toWords, "toWords");
    module.exports = toWords;
  }
});

// ../../node_modules/@stdlib/number-float64-base-to-words/lib/main.js
var require_main32 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-to-words/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var fcn = require_assign();
    function toWords(x) {
      return fcn(x, [0 >>> 0, 0 >>> 0], 1, 0);
    }
    __name(toWords, "toWords");
    module.exports = toWords;
  }
});

// ../../node_modules/@stdlib/number-float64-base-to-words/lib/index.js
var require_lib46 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-to-words/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var setReadOnly = require_lib45();
    var main = require_main32();
    var assign = require_assign();
    setReadOnly(main, "assign", assign);
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-copysign/lib/main.js
var require_main33 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-copysign/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var SIGN_MASK = require_lib40();
    var ABS_MASK = require_lib();
    var toWords = require_lib46();
    var getHighWord = require_lib24();
    var fromWords = require_lib29();
    var WORDS = [0, 0];
    function copysign(x, y) {
      var hx;
      var hy;
      toWords.assign(x, WORDS, 1, 0);
      hx = WORDS[0];
      hx &= ABS_MASK;
      hy = getHighWord(y);
      hy &= SIGN_MASK;
      hx |= hy;
      return fromWords(hx, WORDS[1]);
    }
    __name(copysign, "copysign");
    module.exports = copysign;
  }
});

// ../../node_modules/@stdlib/math-base-special-copysign/lib/index.js
var require_lib47 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-copysign/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main33();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-smallest-normal/lib/index.js
var require_lib48 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-smallest-normal/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_SMALLEST_NORMAL = 22250738585072014e-324;
    module.exports = FLOAT64_SMALLEST_NORMAL;
  }
});

// ../../node_modules/@stdlib/math-base-special-abs/lib/main.js
var require_main34 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-abs/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function abs(x) {
      return Math.abs(x);
    }
    __name(abs, "abs");
    module.exports = abs;
  }
});

// ../../node_modules/@stdlib/math-base-special-abs/lib/index.js
var require_lib49 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-abs/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main34();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/number-float64-base-normalize/lib/assign.js
var require_assign2 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-normalize/lib/assign.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_SMALLEST_NORMAL = require_lib48();
    var isInfinite = require_lib39();
    var isnan = require_lib38();
    var abs = require_lib49();
    var SCALAR = 4503599627370496;
    function normalize(x, out, stride, offset) {
      if (isnan(x) || isInfinite(x)) {
        out[offset] = x;
        out[offset + stride] = 0;
        return out;
      }
      if (x !== 0 && abs(x) < FLOAT64_SMALLEST_NORMAL) {
        out[offset] = x * SCALAR;
        out[offset + stride] = -52;
        return out;
      }
      out[offset] = x;
      out[offset + stride] = 0;
      return out;
    }
    __name(normalize, "normalize");
    module.exports = normalize;
  }
});

// ../../node_modules/@stdlib/number-float64-base-normalize/lib/main.js
var require_main35 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-normalize/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var fcn = require_assign2();
    function normalize(x) {
      return fcn(x, [0, 0], 1, 0);
    }
    __name(normalize, "normalize");
    module.exports = normalize;
  }
});

// ../../node_modules/@stdlib/number-float64-base-normalize/lib/index.js
var require_lib50 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-normalize/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var setReadOnly = require_lib45();
    var main = require_main35();
    var assign = require_assign2();
    setReadOnly(main, "assign", assign);
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/number-float64-base-exponent/lib/main.js
var require_main36 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-exponent/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var getHighWord = require_lib24();
    var EXP_MASK = require_lib2();
    var BIAS = require_lib34();
    function exponent(x) {
      var high = getHighWord(x);
      high = (high & EXP_MASK) >>> 20;
      return high - BIAS | 0;
    }
    __name(exponent, "exponent");
    module.exports = exponent;
  }
});

// ../../node_modules/@stdlib/number-float64-base-exponent/lib/index.js
var require_lib51 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-exponent/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main36();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-ldexp/lib/main.js
var require_main37 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-ldexp/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var PINF = require_lib31();
    var NINF = require_lib33();
    var BIAS = require_lib34();
    var MAX_EXPONENT = require_lib35();
    var MAX_SUBNORMAL_EXPONENT = require_lib36();
    var MIN_SUBNORMAL_EXPONENT = require_lib37();
    var isnan = require_lib38();
    var isInfinite = require_lib39();
    var copysign = require_lib47();
    var normalize = require_lib50().assign;
    var floatExp = require_lib51();
    var toWords = require_lib46();
    var fromWords = require_lib29();
    var TWO52_INV = 2220446049250313e-31;
    var CLEAR_EXP_MASK = 2148532223 >>> 0;
    var FRAC = [0, 0];
    var WORDS = [0, 0];
    function ldexp(frac, exp) {
      var high;
      var m;
      if (exp === 0 || frac === 0 || // handles +-0
      isnan(frac) || isInfinite(frac)) {
        return frac;
      }
      normalize(frac, FRAC, 1, 0);
      frac = FRAC[0];
      exp += FRAC[1];
      exp += floatExp(frac);
      if (exp < MIN_SUBNORMAL_EXPONENT) {
        return copysign(0, frac);
      }
      if (exp > MAX_EXPONENT) {
        if (frac < 0) {
          return NINF;
        }
        return PINF;
      }
      if (exp <= MAX_SUBNORMAL_EXPONENT) {
        exp += 52;
        m = TWO52_INV;
      } else {
        m = 1;
      }
      toWords.assign(frac, WORDS, 1, 0);
      high = WORDS[0];
      high &= CLEAR_EXP_MASK;
      high |= exp + BIAS << 20;
      return m * fromWords(high, WORDS[1]);
    }
    __name(ldexp, "ldexp");
    module.exports = ldexp;
  }
});

// ../../node_modules/@stdlib/math-base-special-ldexp/lib/index.js
var require_lib52 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-ldexp/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main37();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/array-base-filled/lib/main.js
var require_main38 = __commonJS({
  "../../node_modules/@stdlib/array-base-filled/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function filled(value, len) {
      var arr;
      var i;
      arr = [];
      for (i = 0; i < len; i++) {
        arr.push(value);
      }
      return arr;
    }
    __name(filled, "filled");
    module.exports = filled;
  }
});

// ../../node_modules/@stdlib/array-base-filled/lib/index.js
var require_lib53 = __commonJS({
  "../../node_modules/@stdlib/array-base-filled/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main38();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/array-base-zeros/lib/main.js
var require_main39 = __commonJS({
  "../../node_modules/@stdlib/array-base-zeros/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var filled = require_lib53();
    function zeros(len) {
      return filled(0, len);
    }
    __name(zeros, "zeros");
    module.exports = zeros;
  }
});

// ../../node_modules/@stdlib/array-base-zeros/lib/index.js
var require_lib54 = __commonJS({
  "../../node_modules/@stdlib/array-base-zeros/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main39();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-rempio2/lib/kernel_rempio2.js
var require_kernel_rempio2 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-rempio2/lib/kernel_rempio2.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var floor = require_lib30();
    var ldexp = require_lib52();
    var zeros = require_lib54();
    var IPIO2 = [
      10680707,
      7228996,
      1387004,
      2578385,
      16069853,
      12639074,
      9804092,
      4427841,
      16666979,
      11263675,
      12935607,
      2387514,
      4345298,
      14681673,
      3074569,
      13734428,
      16653803,
      1880361,
      10960616,
      8533493,
      3062596,
      8710556,
      7349940,
      6258241,
      3772886,
      3769171,
      3798172,
      8675211,
      12450088,
      3874808,
      9961438,
      366607,
      15675153,
      9132554,
      7151469,
      3571407,
      2607881,
      12013382,
      4155038,
      6285869,
      7677882,
      13102053,
      15825725,
      473591,
      9065106,
      15363067,
      6271263,
      9264392,
      5636912,
      4652155,
      7056368,
      13614112,
      10155062,
      1944035,
      9527646,
      15080200,
      6658437,
      6231200,
      6832269,
      16767104,
      5075751,
      3212806,
      1398474,
      7579849,
      6349435,
      12618859
    ];
    var PIO2 = [
      1.570796251296997,
      // 0x3FF921FB, 0x40000000
      7549789415861596e-23,
      // 0x3E74442D, 0x00000000
      5390302529957765e-30,
      // 0x3CF84698, 0x80000000
      3282003415807913e-37,
      // 0x3B78CC51, 0x60000000
      1270655753080676e-44,
      // 0x39F01B83, 0x80000000
      12293330898111133e-52,
      // 0x387A2520, 0x40000000
      27337005381646456e-60,
      // 0x36E38222, 0x80000000
      21674168387780482e-67
      // 0x3569F31D, 0x00000000
    ];
    var TWO24 = 16777216;
    var TWON24 = 5960464477539063e-23;
    var F = zeros(20);
    var Q = zeros(20);
    var FQ = zeros(20);
    var IQ = zeros(20);
    function compute(x, y, jz, q, q0, jk, jv, jx, f) {
      var carry;
      var fw;
      var ih;
      var jp;
      var i;
      var k;
      var n;
      var j;
      var z;
      jp = jk;
      z = q[jz];
      j = jz;
      for (i = 0; j > 0; i++) {
        fw = TWON24 * z | 0;
        IQ[i] = z - TWO24 * fw | 0;
        z = q[j - 1] + fw;
        j -= 1;
      }
      z = ldexp(z, q0);
      z -= 8 * floor(z * 0.125);
      n = z | 0;
      z -= n;
      ih = 0;
      if (q0 > 0) {
        i = IQ[jz - 1] >> 24 - q0;
        n += i;
        IQ[jz - 1] -= i << 24 - q0;
        ih = IQ[jz - 1] >> 23 - q0;
      } else if (q0 === 0) {
        ih = IQ[jz - 1] >> 23;
      } else if (z >= 0.5) {
        ih = 2;
      }
      if (ih > 0) {
        n += 1;
        carry = 0;
        for (i = 0; i < jz; i++) {
          j = IQ[i];
          if (carry === 0) {
            if (j !== 0) {
              carry = 1;
              IQ[i] = 16777216 - j;
            }
          } else {
            IQ[i] = 16777215 - j;
          }
        }
        if (q0 > 0) {
          switch (q0) {
            // eslint-disable-line default-case
            case 1:
              IQ[jz - 1] &= 8388607;
              break;
            case 2:
              IQ[jz - 1] &= 4194303;
              break;
          }
        }
        if (ih === 2) {
          z = 1 - z;
          if (carry !== 0) {
            z -= ldexp(1, q0);
          }
        }
      }
      if (z === 0) {
        j = 0;
        for (i = jz - 1; i >= jk; i--) {
          j |= IQ[i];
        }
        if (j === 0) {
          for (k = 1; IQ[jk - k] === 0; k++) {
          }
          for (i = jz + 1; i <= jz + k; i++) {
            f[jx + i] = IPIO2[jv + i];
            fw = 0;
            for (j = 0; j <= jx; j++) {
              fw += x[j] * f[jx + (i - j)];
            }
            q[i] = fw;
          }
          jz += k;
          return compute(x, y, jz, q, q0, jk, jv, jx, f);
        }
        jz -= 1;
        q0 -= 24;
        while (IQ[jz] === 0) {
          jz -= 1;
          q0 -= 24;
        }
      } else {
        z = ldexp(z, -q0);
        if (z >= TWO24) {
          fw = TWON24 * z | 0;
          IQ[jz] = z - TWO24 * fw | 0;
          jz += 1;
          q0 += 24;
          IQ[jz] = fw;
        } else {
          IQ[jz] = z | 0;
        }
      }
      fw = ldexp(1, q0);
      for (i = jz; i >= 0; i--) {
        q[i] = fw * IQ[i];
        fw *= TWON24;
      }
      for (i = jz; i >= 0; i--) {
        fw = 0;
        for (k = 0; k <= jp && k <= jz - i; k++) {
          fw += PIO2[k] * q[i + k];
        }
        FQ[jz - i] = fw;
      }
      fw = 0;
      for (i = jz; i >= 0; i--) {
        fw += FQ[i];
      }
      if (ih === 0) {
        y[0] = fw;
      } else {
        y[0] = -fw;
      }
      fw = FQ[0] - fw;
      for (i = 1; i <= jz; i++) {
        fw += FQ[i];
      }
      if (ih === 0) {
        y[1] = fw;
      } else {
        y[1] = -fw;
      }
      return n & 7;
    }
    __name(compute, "compute");
    function kernelRempio2(x, y, e0, nx) {
      var fw;
      var jk;
      var jv;
      var jx;
      var jz;
      var q0;
      var i;
      var j;
      var m;
      jk = 4;
      jx = nx - 1;
      jv = (e0 - 3) / 24 | 0;
      if (jv < 0) {
        jv = 0;
      }
      q0 = e0 - 24 * (jv + 1);
      j = jv - jx;
      m = jx + jk;
      for (i = 0; i <= m; i++) {
        if (j < 0) {
          F[i] = 0;
        } else {
          F[i] = IPIO2[j];
        }
        j += 1;
      }
      for (i = 0; i <= jk; i++) {
        fw = 0;
        for (j = 0; j <= jx; j++) {
          fw += x[j] * F[jx + (i - j)];
        }
        Q[i] = fw;
      }
      jz = jk;
      return compute(x, y, jz, Q, q0, jk, jv, jx, F);
    }
    __name(kernelRempio2, "kernelRempio2");
    module.exports = kernelRempio2;
  }
});

// ../../node_modules/@stdlib/math-base-special-round/lib/main.js
var require_main40 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-round/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var round = Math.round;
    module.exports = round;
  }
});

// ../../node_modules/@stdlib/math-base-special-round/lib/index.js
var require_lib55 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-round/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main40();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-rempio2/lib/rempio2_medium.js
var require_rempio2_medium = __commonJS({
  "../../node_modules/@stdlib/math-base-special-rempio2/lib/rempio2_medium.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var round = require_lib55();
    var getHighWord = require_lib24();
    var INVPIO2 = 0.6366197723675814;
    var PIO2_1 = 1.5707963267341256;
    var PIO2_1T = 6077100506506192e-26;
    var PIO2_2 = 6077100506303966e-26;
    var PIO2_2T = 20222662487959506e-37;
    var PIO2_3 = 20222662487111665e-37;
    var PIO2_3T = 84784276603689e-45;
    var EXPONENT_MASK = 2047 | 0;
    function rempio2Medium(x, ix, y) {
      var high;
      var n;
      var t;
      var r;
      var w;
      var i;
      var j;
      n = round(x * INVPIO2);
      r = x - n * PIO2_1;
      w = n * PIO2_1T;
      j = ix >> 20 | 0;
      y[0] = r - w;
      high = getHighWord(y[0]);
      i = j - (high >> 20 & EXPONENT_MASK);
      if (i > 16) {
        t = r;
        w = n * PIO2_2;
        r = t - w;
        w = n * PIO2_2T - (t - r - w);
        y[0] = r - w;
        high = getHighWord(y[0]);
        i = j - (high >> 20 & EXPONENT_MASK);
        if (i > 49) {
          t = r;
          w = n * PIO2_3;
          r = t - w;
          w = n * PIO2_3T - (t - r - w);
          y[0] = r - w;
        }
      }
      y[1] = r - y[0] - w;
      return n;
    }
    __name(rempio2Medium, "rempio2Medium");
    module.exports = rempio2Medium;
  }
});

// ../../node_modules/@stdlib/math-base-special-rempio2/lib/main.js
var require_main41 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-rempio2/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var ABS_MASK = require_lib();
    var EXPONENT_MASK = require_lib2();
    var SIGNIFICAND_MASK = require_lib27();
    var getHighWord = require_lib24();
    var getLowWord = require_lib28();
    var fromWords = require_lib29();
    var rempio2Kernel = require_kernel_rempio2();
    var rempio2Medium = require_rempio2_medium();
    var ZERO = 0;
    var TWO24 = 16777216;
    var PIO2_1 = 1.5707963267341256;
    var PIO2_1T = 6077100506506192e-26;
    var TWO_PIO2_1T = 2 * PIO2_1T;
    var THREE_PIO2_1T = 3 * PIO2_1T;
    var FOUR_PIO2_1T = 4 * PIO2_1T;
    var PI_HIGH_WORD_SIGNIFICAND = 598523 | 0;
    var PIO4_HIGH_WORD = 1072243195 | 0;
    var THREE_PIO4_HIGH_WORD = 1073928572 | 0;
    var FIVE_PIO4_HIGH_WORD = 1074752122 | 0;
    var THREE_PIO2_HIGH_WORD = 1074977148 | 0;
    var SEVEN_PIO4_HIGH_WORD = 1075183036 | 0;
    var TWO_PI_HIGH_WORD = 1075388923 | 0;
    var NINE_PIO4_HIGH_WORD = 1075594811 | 0;
    var MEDIUM = 1094263291 | 0;
    var TX = [0, 0, 0];
    var TY = [0, 0];
    function rempio2(x, y) {
      var low;
      var e0;
      var hx;
      var ix;
      var nx;
      var i;
      var n;
      var z;
      hx = getHighWord(x) | 0;
      ix = hx & ABS_MASK | 0;
      if (ix <= PIO4_HIGH_WORD) {
        y[0] = x;
        y[1] = 0;
        return 0;
      }
      if (ix <= FIVE_PIO4_HIGH_WORD) {
        if ((ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND) {
          return rempio2Medium(x, ix, y);
        }
        if (ix <= THREE_PIO4_HIGH_WORD) {
          if (hx > 0) {
            z = x - PIO2_1;
            y[0] = z - PIO2_1T;
            y[1] = z - y[0] - PIO2_1T;
            return 1;
          }
          z = x + PIO2_1;
          y[0] = z + PIO2_1T;
          y[1] = z - y[0] + PIO2_1T;
          return -1;
        }
        if (hx > 0) {
          z = x - 2 * PIO2_1;
          y[0] = z - TWO_PIO2_1T;
          y[1] = z - y[0] - TWO_PIO2_1T;
          return 2;
        }
        z = x + 2 * PIO2_1;
        y[0] = z + TWO_PIO2_1T;
        y[1] = z - y[0] + TWO_PIO2_1T;
        return -2;
      }
      if (ix <= NINE_PIO4_HIGH_WORD) {
        if (ix <= SEVEN_PIO4_HIGH_WORD) {
          if (ix === THREE_PIO2_HIGH_WORD) {
            return rempio2Medium(x, ix, y);
          }
          if (hx > 0) {
            z = x - 3 * PIO2_1;
            y[0] = z - THREE_PIO2_1T;
            y[1] = z - y[0] - THREE_PIO2_1T;
            return 3;
          }
          z = x + 3 * PIO2_1;
          y[0] = z + THREE_PIO2_1T;
          y[1] = z - y[0] + THREE_PIO2_1T;
          return -3;
        }
        if (ix === TWO_PI_HIGH_WORD) {
          return rempio2Medium(x, ix, y);
        }
        if (hx > 0) {
          z = x - 4 * PIO2_1;
          y[0] = z - FOUR_PIO2_1T;
          y[1] = z - y[0] - FOUR_PIO2_1T;
          return 4;
        }
        z = x + 4 * PIO2_1;
        y[0] = z + FOUR_PIO2_1T;
        y[1] = z - y[0] + FOUR_PIO2_1T;
        return -4;
      }
      if (ix < MEDIUM) {
        return rempio2Medium(x, ix, y);
      }
      if (ix >= EXPONENT_MASK) {
        y[0] = NaN;
        y[1] = NaN;
        return 0;
      }
      low = getLowWord(x);
      e0 = (ix >> 20) - 1046;
      z = fromWords(ix - (e0 << 20 | 0), low);
      for (i = 0; i < 2; i++) {
        TX[i] = z | 0;
        z = (z - TX[i]) * TWO24;
      }
      TX[2] = z;
      nx = 3;
      while (TX[nx - 1] === ZERO) {
        nx -= 1;
      }
      n = rempio2Kernel(TX, TY, e0, nx, 1);
      if (hx < 0) {
        y[0] = -TY[0];
        y[1] = -TY[1];
        return -n;
      }
      y[0] = TY[0];
      y[1] = TY[1];
      return n;
    }
    __name(rempio2, "rempio2");
    module.exports = rempio2;
  }
});

// ../../node_modules/@stdlib/math-base-special-rempio2/lib/index.js
var require_lib56 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-rempio2/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var rempio2 = require_main41();
    module.exports = rempio2;
  }
});

// ../../node_modules/@stdlib/math-base-special-sin/lib/main.js
var require_main42 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-sin/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var HIGH_WORD_ABS_MASK = require_lib();
    var HIGH_WORD_EXPONENT_MASK = require_lib2();
    var getHighWord = require_lib24();
    var kernelCos = require_lib25();
    var kernelSin = require_lib26();
    var rempio2 = require_lib56();
    var PIO4_HIGH_WORD = 1072243195 | 0;
    var SMALL_HIGH_WORD = 1045430272 | 0;
    var Y = [0, 0];
    function sin(x) {
      var ix;
      var n;
      ix = getHighWord(x);
      ix &= HIGH_WORD_ABS_MASK;
      if (ix <= PIO4_HIGH_WORD) {
        if (ix < SMALL_HIGH_WORD) {
          return x;
        }
        return kernelSin(x, 0);
      }
      if (ix >= HIGH_WORD_EXPONENT_MASK) {
        return NaN;
      }
      n = rempio2(x, Y);
      switch (n & 3) {
        case 0:
          return kernelSin(Y[0], Y[1]);
        case 1:
          return kernelCos(Y[0], Y[1]);
        case 2:
          return -kernelSin(Y[0], Y[1]);
        default:
          return -kernelCos(Y[0], Y[1]);
      }
    }
    __name(sin, "sin");
    module.exports = sin;
  }
});

// ../../node_modules/@stdlib/math-base-special-sin/lib/index.js
var require_lib57 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-sin/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main42();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-cos/lib/main.js
var require_main43 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-cos/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var getHighWord = require_lib24();
    var kernelCos = require_lib25();
    var kernelSin = require_lib26();
    var rempio2 = require_lib56();
    var ABS_MASK = require_lib();
    var EXPONENT_MASK = require_lib2();
    var buffer = [0, 0];
    var HIGH_WORD_PIO4 = 1072243195 | 0;
    var HIGH_WORD_TWO_NEG_27 = 1044381696 | 0;
    function cos(x) {
      var ix;
      var n;
      ix = getHighWord(x);
      ix &= ABS_MASK;
      if (ix <= HIGH_WORD_PIO4) {
        if (ix < HIGH_WORD_TWO_NEG_27) {
          return 1;
        }
        return kernelCos(x, 0);
      }
      if (ix >= EXPONENT_MASK) {
        return NaN;
      }
      n = rempio2(x, buffer);
      switch (n & 3) {
        case 0:
          return kernelCos(buffer[0], buffer[1]);
        case 1:
          return -kernelSin(buffer[0], buffer[1]);
        case 2:
          return -kernelCos(buffer[0], buffer[1]);
        default:
          return kernelSin(buffer[0], buffer[1]);
      }
    }
    __name(cos, "cos");
    module.exports = cos;
  }
});

// ../../node_modules/@stdlib/math-base-special-cos/lib/index.js
var require_lib58 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-cos/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main43();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/number-float64-base-signbit/lib/main.js
var require_main44 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-signbit/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var getHighWord = require_lib24();
    function signbit(x) {
      var high = getHighWord(x);
      return high >>> 31 ? true : false;
    }
    __name(signbit, "signbit");
    module.exports = signbit;
  }
});

// ../../node_modules/@stdlib/number-float64-base-signbit/lib/index.js
var require_lib59 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-signbit/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main44();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-half-pi/lib/index.js
var require_lib60 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-half-pi/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var HALF_PI = 1.5707963267948966;
    module.exports = HALF_PI;
  }
});

// ../../node_modules/@stdlib/constants-float64-fourth-pi/lib/index.js
var require_lib61 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-fourth-pi/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FOURTH_PI = 0.7853981633974483;
    module.exports = FOURTH_PI;
  }
});

// ../../node_modules/@stdlib/math-base-special-atan/lib/polyval_p.js
var require_polyval_p = __commonJS({
  "../../node_modules/@stdlib/math-base-special-atan/lib/polyval_p.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalpoly(x) {
      if (x === 0) {
        return -64.85021904942025;
      }
      return -64.85021904942025 + x * (-122.88666844901361 + x * (-75.00855792314705 + x * (-16.157537187333652 + x * -0.8750608600031904)));
    }
    __name(evalpoly, "evalpoly");
    module.exports = evalpoly;
  }
});

// ../../node_modules/@stdlib/math-base-special-atan/lib/polyval_q.js
var require_polyval_q = __commonJS({
  "../../node_modules/@stdlib/math-base-special-atan/lib/polyval_q.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalpoly(x) {
      if (x === 0) {
        return 194.5506571482614;
      }
      return 194.5506571482614 + x * (485.3903996359137 + x * (432.88106049129027 + x * (165.02700983169885 + x * (24.858464901423062 + x * 1))));
    }
    __name(evalpoly, "evalpoly");
    module.exports = evalpoly;
  }
});

// ../../node_modules/@stdlib/math-base-special-atan/lib/main.js
var require_main45 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-atan/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isnan = require_lib38();
    var PINF = require_lib31();
    var PIO2 = require_lib60();
    var PIO4 = require_lib61();
    var NINF = require_lib33();
    var polyvalP = require_polyval_p();
    var polyvalQ = require_polyval_q();
    var MOREBITS = 6123233995736766e-32;
    var T3P8 = 2.414213562373095;
    function atan(x) {
      var flg;
      var sgn;
      var y;
      var z;
      if (isnan(x) || x === 0) {
        return x;
      }
      if (x === PINF) {
        return PIO2;
      }
      if (x === NINF) {
        return -PIO2;
      }
      if (x < 0) {
        sgn = true;
        x = -x;
      }
      flg = 0;
      if (x > T3P8) {
        y = PIO2;
        flg = 1;
        x = -(1 / x);
      } else if (x <= 0.66) {
        y = 0;
      } else {
        y = PIO4;
        flg = 2;
        x = (x - 1) / (x + 1);
      }
      z = x * x;
      z = z * polyvalP(z) / polyvalQ(z);
      z = x * z + x;
      if (flg === 2) {
        z += 0.5 * MOREBITS;
      } else if (flg === 1) {
        z += MOREBITS;
      }
      y += z;
      return sgn ? -y : y;
    }
    __name(atan, "atan");
    module.exports = atan;
  }
});

// ../../node_modules/@stdlib/math-base-special-atan/lib/index.js
var require_lib62 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-atan/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main45();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-pi/lib/index.js
var require_lib63 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-pi/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var PI = 3.141592653589793;
    module.exports = PI;
  }
});

// ../../node_modules/@stdlib/math-base-special-atan2/lib/main.js
var require_main46 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-atan2/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isinfinite = require_lib39();
    var copysign = require_lib47();
    var signbit = require_lib59();
    var isnan = require_lib38();
    var atan = require_lib62();
    var PINF = require_lib31();
    var PI = require_lib63();
    function atan2(y, x) {
      var q;
      if (isnan(x) || isnan(y)) {
        return NaN;
      }
      if (isinfinite(x)) {
        if (x === PINF) {
          if (isinfinite(y)) {
            return copysign(PI / 4, y);
          }
          return copysign(0, y);
        }
        if (isinfinite(y)) {
          return copysign(3 * PI / 4, y);
        }
        return copysign(PI, y);
      }
      if (isinfinite(y)) {
        return copysign(PI / 2, y);
      }
      if (y === 0) {
        if (x >= 0 && !signbit(x)) {
          return copysign(0, y);
        }
        return copysign(PI, y);
      }
      if (x === 0) {
        return copysign(PI / 2, y);
      }
      q = atan(y / x);
      if (x < 0) {
        if (q <= 0) {
          return q + PI;
        }
        return q - PI;
      }
      return q;
    }
    __name(atan2, "atan2");
    module.exports = atan2;
  }
});

// ../../node_modules/@stdlib/math-base-special-atan2/lib/index.js
var require_lib64 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-atan2/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var atan2 = require_main46();
    module.exports = atan2;
  }
});

// ../../node_modules/@stdlib/math-base-special-sqrt/lib/main.js
var require_main47 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-sqrt/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var sqrt = Math.sqrt;
    module.exports = sqrt;
  }
});

// ../../node_modules/@stdlib/math-base-special-sqrt/lib/index.js
var require_lib65 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-sqrt/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main47();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-asin/lib/rational_pq.js
var require_rational_pq = __commonJS({
  "../../node_modules/@stdlib/math-base-special-asin/lib/rational_pq.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalrational(x) {
      var ax;
      var s1;
      var s2;
      if (x === 0) {
        return 0.16666666666666713;
      }
      if (x < 0) {
        ax = -x;
      } else {
        ax = x;
      }
      if (ax <= 1) {
        s1 = -8.198089802484825 + x * (19.562619833175948 + x * (-16.262479672107002 + x * (5.444622390564711 + x * (-0.6019598008014124 + x * 0.004253011369004428))));
        s2 = -49.18853881490881 + x * (139.51056146574857 + x * (-147.1791292232726 + x * (70.49610280856842 + x * (-14.740913729888538 + x * 1))));
      } else {
        x = 1 / x;
        s1 = 0.004253011369004428 + x * (-0.6019598008014124 + x * (5.444622390564711 + x * (-16.262479672107002 + x * (19.562619833175948 + x * -8.198089802484825))));
        s2 = 1 + x * (-14.740913729888538 + x * (70.49610280856842 + x * (-147.1791292232726 + x * (139.51056146574857 + x * -49.18853881490881))));
      }
      return s1 / s2;
    }
    __name(evalrational, "evalrational");
    module.exports = evalrational;
  }
});

// ../../node_modules/@stdlib/math-base-special-asin/lib/rational_rs.js
var require_rational_rs = __commonJS({
  "../../node_modules/@stdlib/math-base-special-asin/lib/rational_rs.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalrational(x) {
      var ax;
      var s1;
      var s2;
      if (x === 0) {
        return 0.08333333333333809;
      }
      if (x < 0) {
        ax = -x;
      } else {
        ax = x;
      }
      if (ax <= 1) {
        s1 = 28.536655482610616 + x * (-25.56901049652825 + x * (6.968710824104713 + x * (-0.5634242780008963 + x * 0.002967721961301243)));
        s2 = 342.43986579130785 + x * (-383.8770957603691 + x * (147.0656354026815 + x * (-21.947795316429207 + x * 1)));
      } else {
        x = 1 / x;
        s1 = 0.002967721961301243 + x * (-0.5634242780008963 + x * (6.968710824104713 + x * (-25.56901049652825 + x * 28.536655482610616)));
        s2 = 1 + x * (-21.947795316429207 + x * (147.0656354026815 + x * (-383.8770957603691 + x * 342.43986579130785)));
      }
      return s1 / s2;
    }
    __name(evalrational, "evalrational");
    module.exports = evalrational;
  }
});

// ../../node_modules/@stdlib/math-base-special-asin/lib/main.js
var require_main48 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-asin/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isnan = require_lib38();
    var sqrt = require_lib65();
    var PIO4 = require_lib61();
    var ratevalPQ = require_rational_pq();
    var ratevalRS = require_rational_rs();
    var MOREBITS = 6123233995736766e-32;
    function asin(x) {
      var sgn;
      var zz;
      var a;
      var p;
      var z;
      if (isnan(x)) {
        return NaN;
      }
      if (x > 0) {
        a = x;
      } else {
        sgn = true;
        a = -x;
      }
      if (a > 1) {
        return NaN;
      }
      if (a > 0.625) {
        zz = 1 - a;
        p = zz * ratevalRS(zz);
        zz = sqrt(zz + zz);
        z = PIO4 - zz;
        zz = zz * p - MOREBITS;
        z -= zz;
        z += PIO4;
      } else {
        if (a < 1e-8) {
          return x;
        }
        zz = a * a;
        z = zz * ratevalPQ(zz);
        z = a * z + a;
      }
      return sgn ? -z : z;
    }
    __name(asin, "asin");
    module.exports = asin;
  }
});

// ../../node_modules/@stdlib/math-base-special-asin/lib/index.js
var require_lib66 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-asin/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main48();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-acos/lib/main.js
var require_main49 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-acos/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isnan = require_lib38();
    var asin = require_lib66();
    var sqrt = require_lib65();
    var PIO4 = require_lib61();
    var MOREBITS = 6123233995736766e-32;
    function acos(x) {
      var z;
      if (isnan(x)) {
        return NaN;
      }
      if (x < -1 || x > 1) {
        return NaN;
      }
      if (x > 0.5) {
        return 2 * asin(sqrt(0.5 - 0.5 * x));
      }
      z = PIO4 - asin(x);
      z += MOREBITS;
      z += PIO4;
      return z;
    }
    __name(acos, "acos");
    module.exports = acos;
  }
});

// ../../node_modules/@stdlib/math-base-special-acos/lib/index.js
var require_lib67 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-acos/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main49();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-integer/lib/main.js
var require_main50 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-integer/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var floor = require_lib30();
    function isInteger(x) {
      return floor(x) === x;
    }
    __name(isInteger, "isInteger");
    module.exports = isInteger;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-integer/lib/index.js
var require_lib68 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-integer/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main50();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-even/lib/main.js
var require_main51 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-even/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isInteger = require_lib68();
    function isEven(x) {
      return isInteger(x / 2);
    }
    __name(isEven, "isEven");
    module.exports = isEven;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-even/lib/index.js
var require_lib69 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-even/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main51();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-odd/lib/main.js
var require_main52 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-odd/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isEven = require_lib69();
    function isOdd(x) {
      if (x > 0) {
        return isEven(x - 1);
      }
      return isEven(x + 1);
    }
    __name(isOdd, "isOdd");
    module.exports = isOdd;
  }
});

// ../../node_modules/@stdlib/math-base-assert-is-odd/lib/index.js
var require_lib70 = __commonJS({
  "../../node_modules/@stdlib/math-base-assert-is-odd/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main52();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/number-float64-base-set-low-word/lib/low.js
var require_low2 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-set-low-word/lib/low.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isLittleEndian = require_lib23();
    var LOW;
    if (isLittleEndian === true) {
      LOW = 0;
    } else {
      LOW = 1;
    }
    module.exports = LOW;
  }
});

// ../../node_modules/@stdlib/number-float64-base-set-low-word/lib/main.js
var require_main53 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-set-low-word/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Uint32Array2 = require_lib11();
    var Float64Array2 = require_lib14();
    var LOW = require_low2();
    var FLOAT64_VIEW = new Float64Array2(1);
    var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
    function setLowWord(x, low) {
      FLOAT64_VIEW[0] = x;
      UINT32_VIEW[LOW] = low >>> 0;
      return FLOAT64_VIEW[0];
    }
    __name(setLowWord, "setLowWord");
    module.exports = setLowWord;
  }
});

// ../../node_modules/@stdlib/number-float64-base-set-low-word/lib/index.js
var require_lib71 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-set-low-word/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main53();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/number-uint32-base-to-int32/lib/main.js
var require_main54 = __commonJS({
  "../../node_modules/@stdlib/number-uint32-base-to-int32/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function uint32ToInt32(x) {
      return x | 0;
    }
    __name(uint32ToInt32, "uint32ToInt32");
    module.exports = uint32ToInt32;
  }
});

// ../../node_modules/@stdlib/number-uint32-base-to-int32/lib/index.js
var require_lib72 = __commonJS({
  "../../node_modules/@stdlib/number-uint32-base-to-int32/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var uint32ToInt32 = require_main54();
    module.exports = uint32ToInt32;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/x_is_zero.js
var require_x_is_zero = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/x_is_zero.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isOdd = require_lib70();
    var copysign = require_lib47();
    var NINF = require_lib33();
    var PINF = require_lib31();
    function pow(x, y) {
      if (y === NINF) {
        return PINF;
      }
      if (y === PINF) {
        return 0;
      }
      if (y > 0) {
        if (isOdd(y)) {
          return x;
        }
        return 0;
      }
      if (isOdd(y)) {
        return copysign(PINF, x);
      }
      return PINF;
    }
    __name(pow, "pow");
    module.exports = pow;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/y_is_huge.js
var require_y_is_huge = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/y_is_huge.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var ABS_MASK = require_lib();
    var getHighWord = require_lib24();
    var HIGH_MAX_NEAR_UNITY = 1072693247 | 0;
    var HUGE = 1e300;
    var TINY = 1e-300;
    function pow(x, y) {
      var ahx;
      var hx;
      hx = getHighWord(x);
      ahx = hx & ABS_MASK;
      if (ahx <= HIGH_MAX_NEAR_UNITY) {
        if (y < 0) {
          return HUGE * HUGE;
        }
        return TINY * TINY;
      }
      if (y > 0) {
        return HUGE * HUGE;
      }
      return TINY * TINY;
    }
    __name(pow, "pow");
    module.exports = pow;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/y_is_infinite.js
var require_y_is_infinite = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/y_is_infinite.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var abs = require_lib49();
    var PINF = require_lib31();
    function pow(x, y) {
      if (x === -1) {
        return (x - x) / (x - x);
      }
      if (x === 1) {
        return 1;
      }
      if (abs(x) < 1 === (y === PINF)) {
        return 0;
      }
      return PINF;
    }
    __name(pow, "pow");
    module.exports = pow;
  }
});

// ../../node_modules/@stdlib/number-float64-base-set-high-word/lib/high.js
var require_high2 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-set-high-word/lib/high.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isLittleEndian = require_lib23();
    var HIGH;
    if (isLittleEndian === true) {
      HIGH = 1;
    } else {
      HIGH = 0;
    }
    module.exports = HIGH;
  }
});

// ../../node_modules/@stdlib/number-float64-base-set-high-word/lib/main.js
var require_main55 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-set-high-word/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Uint32Array2 = require_lib11();
    var Float64Array2 = require_lib14();
    var HIGH = require_high2();
    var FLOAT64_VIEW = new Float64Array2(1);
    var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
    function setHighWord(x, high) {
      FLOAT64_VIEW[0] = x;
      UINT32_VIEW[HIGH] = high >>> 0;
      return FLOAT64_VIEW[0];
    }
    __name(setHighWord, "setHighWord");
    module.exports = setHighWord;
  }
});

// ../../node_modules/@stdlib/number-float64-base-set-high-word/lib/index.js
var require_lib73 = __commonJS({
  "../../node_modules/@stdlib/number-float64-base-set-high-word/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main55();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/constants-float64-num-high-word-significand-bits/lib/index.js
var require_lib74 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-num-high-word-significand-bits/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS = 20 | 0;
    module.exports = FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/polyval_l.js
var require_polyval_l = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/polyval_l.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalpoly(x) {
      if (x === 0) {
        return 0.5999999999999946;
      }
      return 0.5999999999999946 + x * (0.4285714285785502 + x * (0.33333332981837743 + x * (0.272728123808534 + x * (0.23066074577556175 + x * 0.20697501780033842))));
    }
    __name(evalpoly, "evalpoly");
    module.exports = evalpoly;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/log2ax.js
var require_log2ax = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/log2ax.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var getHighWord = require_lib24();
    var setLowWord = require_lib71();
    var setHighWord = require_lib73();
    var BIAS = require_lib34();
    var HIGH_NUM_SIGNIFICAND_BITS = require_lib74();
    var polyvalL = require_polyval_l();
    var HIGH_SIGNIFICAND_MASK = 1048575 | 0;
    var HIGH_MIN_NORMAL_EXP = 1048576 | 0;
    var HIGH_BIASED_EXP_0 = 1072693248 | 0;
    var HIGH_BIASED_EXP_NEG_512 = 536870912 | 0;
    var HIGH_SIGNIFICAND_HALF = 524288 | 0;
    var TWO53 = 9007199254740992;
    var CP = 0.9617966939259756;
    var CP_HI = 0.9617967009544373;
    var CP_LO = -7028461650952758e-24;
    var BP = [
      1,
      1.5
    ];
    var DP_HI = [
      0,
      0.5849624872207642
      // 0x3FE2B803, 0x40000000
    ];
    var DP_LO = [
      0,
      1350039202129749e-23
      // 0x3E4CFDEB, 0x43CFD006
    ];
    function log2ax(out, ax, ahx) {
      var tmp;
      var ss;
      var s2;
      var hs;
      var ls;
      var ht;
      var lt;
      var bp;
      var dp;
      var hp;
      var lp;
      var hz;
      var lz;
      var t1;
      var t2;
      var t;
      var r;
      var u;
      var v;
      var n;
      var j;
      var k;
      n = 0 | 0;
      if (ahx < HIGH_MIN_NORMAL_EXP) {
        ax *= TWO53;
        n -= 53 | 0;
        ahx = getHighWord(ax);
      }
      n += (ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS | 0;
      j = ahx & HIGH_SIGNIFICAND_MASK | 0;
      ahx = j | HIGH_BIASED_EXP_0 | 0;
      if (j <= 235662) {
        k = 0;
      } else if (j < 767610) {
        k = 1;
      } else {
        k = 0;
        n += 1 | 0;
        ahx -= HIGH_MIN_NORMAL_EXP;
      }
      ax = setHighWord(ax, ahx);
      bp = BP[k];
      u = ax - bp;
      v = 1 / (ax + bp);
      ss = u * v;
      hs = setLowWord(ss, 0);
      tmp = (ahx >> 1 | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
      tmp += k << 18;
      ht = setHighWord(0, tmp);
      lt = ax - (ht - bp);
      ls = v * (u - hs * ht - hs * lt);
      s2 = ss * ss;
      r = s2 * s2 * polyvalL(s2);
      r += ls * (hs + ss);
      s2 = hs * hs;
      ht = 3 + s2 + r;
      ht = setLowWord(ht, 0);
      lt = r - (ht - 3 - s2);
      u = hs * ht;
      v = ls * ht + lt * ss;
      hp = u + v;
      hp = setLowWord(hp, 0);
      lp = v - (hp - u);
      hz = CP_HI * hp;
      lz = CP_LO * hp + lp * CP + DP_LO[k];
      dp = DP_HI[k];
      t = n;
      t1 = hz + lz + dp + t;
      t1 = setLowWord(t1, 0);
      t2 = lz - (t1 - t - dp - hz);
      out[0] = t1;
      out[1] = t2;
      return out;
    }
    __name(log2ax, "log2ax");
    module.exports = log2ax;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/polyval_w.js
var require_polyval_w = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/polyval_w.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalpoly(x) {
      if (x === 0) {
        return 0.5;
      }
      return 0.5 + x * (-0.3333333333333333 + x * 0.25);
    }
    __name(evalpoly, "evalpoly");
    module.exports = evalpoly;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/logx.js
var require_logx = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/logx.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var setLowWord = require_lib71();
    var polyvalW = require_polyval_w();
    var INV_LN2 = 1.4426950408889634;
    var INV_LN2_HI = 1.4426950216293335;
    var INV_LN2_LO = 19259629911266175e-24;
    function logx(out, ax) {
      var t2;
      var t1;
      var t;
      var w;
      var u;
      var v;
      t = ax - 1;
      w = t * t * polyvalW(t);
      u = INV_LN2_HI * t;
      v = t * INV_LN2_LO - w * INV_LN2;
      t1 = u + v;
      t1 = setLowWord(t1, 0);
      t2 = v - (t1 - u);
      out[0] = t1;
      out[1] = t2;
      return out;
    }
    __name(logx, "logx");
    module.exports = logx;
  }
});

// ../../node_modules/@stdlib/constants-float64-ln-two/lib/index.js
var require_lib75 = __commonJS({
  "../../node_modules/@stdlib/constants-float64-ln-two/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var LN2 = 0.6931471805599453;
    module.exports = LN2;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/polyval_p.js
var require_polyval_p2 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/polyval_p.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function evalpoly(x) {
      if (x === 0) {
        return 0.16666666666666602;
      }
      return 0.16666666666666602 + x * (-0.0027777777777015593 + x * (6613756321437934e-20 + x * (-16533902205465252e-22 + x * 41381367970572385e-24)));
    }
    __name(evalpoly, "evalpoly");
    module.exports = evalpoly;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/pow2.js
var require_pow2 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/pow2.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var getHighWord = require_lib24();
    var setHighWord = require_lib73();
    var setLowWord = require_lib71();
    var uint32ToInt32 = require_lib72();
    var ldexp = require_lib52();
    var LN2 = require_lib75();
    var BIAS = require_lib34();
    var ABS_MASK = require_lib();
    var HIGH_SIGNIFICAND_MASK = require_lib27();
    var HIGH_NUM_SIGNIFICAND_BITS = require_lib74();
    var polyvalP = require_polyval_p2();
    var HIGH_MIN_NORMAL_EXP = 1048576 | 0;
    var HIGH_BIASED_EXP_NEG_1 = 1071644672 | 0;
    var LN2_HI = 0.6931471824645996;
    var LN2_LO = -1904654299957768e-24;
    function pow2(j, hp, lp) {
      var tmp;
      var t1;
      var t;
      var r;
      var u;
      var v;
      var w;
      var z;
      var n;
      var i;
      var k;
      i = j & ABS_MASK | 0;
      k = (i >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS | 0;
      n = 0;
      if (i > HIGH_BIASED_EXP_NEG_1) {
        n = j + (HIGH_MIN_NORMAL_EXP >> k + 1) >>> 0;
        k = ((n & ABS_MASK) >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS | 0;
        tmp = (n & ~(HIGH_SIGNIFICAND_MASK >> k)) >>> 0;
        t = setHighWord(0, tmp);
        n = (n & HIGH_SIGNIFICAND_MASK | HIGH_MIN_NORMAL_EXP) >> HIGH_NUM_SIGNIFICAND_BITS - k >>> 0;
        if (j < 0) {
          n = -n;
        }
        hp -= t;
      }
      t = lp + hp;
      t = setLowWord(t, 0);
      u = t * LN2_HI;
      v = (lp - (t - hp)) * LN2 + t * LN2_LO;
      z = u + v;
      w = v - (z - u);
      t = z * z;
      t1 = z - t * polyvalP(t);
      r = z * t1 / (t1 - 2) - (w + z * w);
      z = 1 - (r - z);
      j = getHighWord(z);
      j = uint32ToInt32(j);
      j += n << HIGH_NUM_SIGNIFICAND_BITS >>> 0;
      if (j >> HIGH_NUM_SIGNIFICAND_BITS <= 0) {
        z = ldexp(z, n);
      } else {
        z = setHighWord(z, j);
      }
      return z;
    }
    __name(pow2, "pow2");
    module.exports = pow2;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/main.js
var require_main56 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isnan = require_lib38();
    var isOdd = require_lib70();
    var isInfinite = require_lib39();
    var isInteger = require_lib68();
    var sqrt = require_lib65();
    var abs = require_lib49();
    var toWords = require_lib46();
    var setLowWord = require_lib71();
    var uint32ToInt32 = require_lib72();
    var NINF = require_lib33();
    var PINF = require_lib31();
    var ABS_MASK = require_lib();
    var xIsZero = require_x_is_zero();
    var yIsHuge = require_y_is_huge();
    var yIsInfinite = require_y_is_infinite();
    var log2ax = require_log2ax();
    var logx = require_logx();
    var pow2 = require_pow2();
    var HIGH_MAX_NEAR_UNITY = 1072693247 | 0;
    var HIGH_BIASED_EXP_31 = 1105199104 | 0;
    var HIGH_BIASED_EXP_64 = 1139802112 | 0;
    var HIGH_BIASED_EXP_10 = 1083179008 | 0;
    var HIGH_BIASED_EXP_0 = 1072693248 | 0;
    var HIGH_1075 = 1083231232 | 0;
    var HIGH_NEG_1075 = 3230714880 >>> 0;
    var HIGH_NUM_NONSIGN_BITS = 31 | 0;
    var HUGE = 1e300;
    var TINY = 1e-300;
    var OVT = 8008566259537294e-32;
    var WORDS = [0 | 0, 0 | 0];
    var LOG_WORKSPACE = [0, 0];
    function pow(x, y) {
      var ahx;
      var ahy;
      var ax;
      var hx;
      var lx;
      var hy;
      var ly;
      var sx;
      var sy;
      var y1;
      var hp;
      var lp;
      var t;
      var z;
      var j;
      var i;
      if (isnan(x) || isnan(y)) {
        return NaN;
      }
      toWords.assign(y, WORDS, 1, 0);
      hy = WORDS[0];
      ly = WORDS[1];
      if (ly === 0) {
        if (y === 0) {
          return 1;
        }
        if (y === 1) {
          return x;
        }
        if (y === -1) {
          return 1 / x;
        }
        if (y === 0.5) {
          return sqrt(x);
        }
        if (y === -0.5) {
          return 1 / sqrt(x);
        }
        if (y === 2) {
          return x * x;
        }
        if (y === 3) {
          return x * x * x;
        }
        if (y === 4) {
          x *= x;
          return x * x;
        }
        if (isInfinite(y)) {
          return yIsInfinite(x, y);
        }
      }
      toWords.assign(x, WORDS, 1, 0);
      hx = WORDS[0];
      lx = WORDS[1];
      if (lx === 0) {
        if (hx === 0) {
          return xIsZero(x, y);
        }
        if (x === 1) {
          return 1;
        }
        if (x === -1 && isOdd(y)) {
          return -1;
        }
        if (isInfinite(x)) {
          if (x === NINF) {
            return pow(-0, -y);
          }
          if (y < 0) {
            return 0;
          }
          return PINF;
        }
      }
      if (x < 0 && isInteger(y) === false) {
        return (x - x) / (x - x);
      }
      ax = abs(x);
      ahx = hx & ABS_MASK | 0;
      ahy = hy & ABS_MASK | 0;
      sx = hx >>> HIGH_NUM_NONSIGN_BITS | 0;
      sy = hy >>> HIGH_NUM_NONSIGN_BITS | 0;
      if (sx && isOdd(y)) {
        sx = -1;
      } else {
        sx = 1;
      }
      if (ahy > HIGH_BIASED_EXP_31) {
        if (ahy > HIGH_BIASED_EXP_64) {
          return yIsHuge(x, y);
        }
        if (ahx < HIGH_MAX_NEAR_UNITY) {
          if (sy === 1) {
            return sx * HUGE * HUGE;
          }
          return sx * TINY * TINY;
        }
        if (ahx > HIGH_BIASED_EXP_0) {
          if (sy === 0) {
            return sx * HUGE * HUGE;
          }
          return sx * TINY * TINY;
        }
        t = logx(LOG_WORKSPACE, ax);
      } else {
        t = log2ax(LOG_WORKSPACE, ax, ahx);
      }
      y1 = setLowWord(y, 0);
      lp = (y - y1) * t[0] + y * t[1];
      hp = y1 * t[0];
      z = lp + hp;
      toWords.assign(z, WORDS, 1, 0);
      j = uint32ToInt32(WORDS[0]);
      i = uint32ToInt32(WORDS[1]);
      if (j >= HIGH_BIASED_EXP_10) {
        if ((j - HIGH_BIASED_EXP_10 | i) !== 0) {
          return sx * HUGE * HUGE;
        }
        if (lp + OVT > z - hp) {
          return sx * HUGE * HUGE;
        }
      } else if ((j & ABS_MASK) >= HIGH_1075) {
        if ((j - HIGH_NEG_1075 | i) !== 0) {
          return sx * TINY * TINY;
        }
        if (lp <= z - hp) {
          return sx * TINY * TINY;
        }
      }
      z = pow2(j, hp, lp);
      return sx * z;
    }
    __name(pow, "pow");
    module.exports = pow;
  }
});

// ../../node_modules/@stdlib/math-base-special-pow/lib/index.js
var require_lib76 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-pow/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main56();
    module.exports = main;
  }
});

// ../../node_modules/@stdlib/math-base-special-hypot/lib/main.js
var require_main57 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-hypot/lib/main.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var isnan = require_lib38();
    var isInfinite = require_lib39();
    var PINF = require_lib31();
    var sqrt = require_lib65();
    function hypot(x, y) {
      var tmp;
      if (isInfinite(x) || isInfinite(y)) {
        return PINF;
      }
      if (isnan(x) || isnan(y)) {
        return NaN;
      }
      if (x < 0) {
        x = -x;
      }
      if (y < 0) {
        y = -y;
      }
      if (x < y) {
        tmp = y;
        y = x;
        x = tmp;
      }
      if (x === 0) {
        return 0;
      }
      y /= x;
      return x * sqrt(1 + y * y);
    }
    __name(hypot, "hypot");
    module.exports = hypot;
  }
});

// ../../node_modules/@stdlib/math-base-special-hypot/lib/index.js
var require_lib77 = __commonJS({
  "../../node_modules/@stdlib/math-base-special-hypot/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var main = require_main57();
    module.exports = main;
  }
});

// ../../lib/physics-math.cjs
var require_physics_math = __commonJS({
  "../../lib/physics-math.cjs"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var sin = require_lib57();
    var cos = require_lib58();
    var atan2 = require_lib64();
    var acos = require_lib67();
    var pow = require_lib76();
    var hypot2 = require_lib77();
    var math = Object.create(Math);
    function hypot(...values) {
      if (values.some((value) => Math.abs(value) === Infinity)) return Infinity;
      if (values.some(Number.isNaN)) return NaN;
      let result = 0;
      for (const value of values) result = hypot2(result, value);
      return result;
    }
    __name(hypot, "hypot");
    Object.defineProperties(math, Object.fromEntries(Object.entries({ sin, cos, atan2, acos, pow, hypot }).map(([name, value]) => [name, { value, enumerable: true }])));
    module.exports = Object.freeze(math);
  }
});

// ../../vendor/matter.cjs
var require_matter = __commonJS({
  "../../vendor/matter.cjs"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Math7 = require_physics_math();
    (/* @__PURE__ */ __name((function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define("Matter", [], factory);
      else if (typeof exports === "object")
        exports["Matter"] = factory();
      else
        root["Matter"] = factory();
    }), "webpackUniversalModuleDefinition"))(exports, function() {
      return (
        /******/
        (function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __name(__webpack_require__, "__webpack_require__");
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1) value = __webpack_require__(value);
            if (mode & 8) return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              /* @__PURE__ */ __name(function getDefault() {
                return module2["default"];
              }, "getDefault")
            ) : (
              /******/
              /* @__PURE__ */ __name(function getModuleExports() {
                return module2;
              }, "getModuleExports")
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 20);
        })([
          /* 0 */
          /***/
          (function(module2, exports2) {
            var Common = {};
            module2.exports = Common;
            (function() {
              Common._baseDelta = 1e3 / 60;
              Common._nextId = 0;
              Common._seed = 0;
              Common._nowStartTime = +/* @__PURE__ */ new Date();
              Common._warnedOnce = {};
              Common._decomp = null;
              Common.extend = function(obj, deep) {
                var argsStart, args, deepClone;
                if (typeof deep === "boolean") {
                  argsStart = 2;
                  deepClone = deep;
                } else {
                  argsStart = 1;
                  deepClone = true;
                }
                for (var i = argsStart; i < arguments.length; i++) {
                  var source = arguments[i];
                  if (source) {
                    for (var prop in source) {
                      if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                          obj[prop] = obj[prop] || {};
                          Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                          obj[prop] = source[prop];
                        }
                      } else {
                        obj[prop] = source[prop];
                      }
                    }
                  }
                }
                return obj;
              };
              Common.clone = function(obj, deep) {
                return Common.extend({}, deep, obj);
              };
              Common.keys = function(obj) {
                if (Object.keys)
                  return Object.keys(obj);
                var keys = [];
                for (var key in obj)
                  keys.push(key);
                return keys;
              };
              Common.values = function(obj) {
                var values = [];
                if (Object.keys) {
                  var keys = Object.keys(obj);
                  for (var i = 0; i < keys.length; i++) {
                    values.push(obj[keys[i]]);
                  }
                  return values;
                }
                for (var key in obj)
                  values.push(obj[key]);
                return values;
              };
              Common.get = function(obj, path, begin, end) {
                path = path.split(".").slice(begin, end);
                for (var i = 0; i < path.length; i += 1) {
                  obj = obj[path[i]];
                }
                return obj;
              };
              Common.set = function(obj, path, val, begin, end) {
                var parts = path.split(".").slice(begin, end);
                Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
                return val;
              };
              Common.shuffle = function(array) {
                for (var i = array.length - 1; i > 0; i--) {
                  var j = Math7.floor(Common.random() * (i + 1));
                  var temp = array[i];
                  array[i] = array[j];
                  array[j] = temp;
                }
                return array;
              };
              Common.choose = function(choices) {
                return choices[Math7.floor(Common.random() * choices.length)];
              };
              Common.isElement = function(obj) {
                if (typeof HTMLElement !== "undefined") {
                  return obj instanceof HTMLElement;
                }
                return !!(obj && obj.nodeType && obj.nodeName);
              };
              Common.isArray = function(obj) {
                return Object.prototype.toString.call(obj) === "[object Array]";
              };
              Common.isFunction = function(obj) {
                return typeof obj === "function";
              };
              Common.isPlainObject = function(obj) {
                return typeof obj === "object" && obj.constructor === Object;
              };
              Common.isString = function(obj) {
                return toString.call(obj) === "[object String]";
              };
              Common.clamp = function(value, min, max) {
                if (value < min)
                  return min;
                if (value > max)
                  return max;
                return value;
              };
              Common.sign = function(value) {
                return value < 0 ? -1 : 1;
              };
              Common.now = function() {
                if (typeof window !== "undefined" && window.performance) {
                  if (window.performance.now) {
                    return window.performance.now();
                  } else if (window.performance.webkitNow) {
                    return window.performance.webkitNow();
                  }
                }
                if (Date.now) {
                  return Date.now();
                }
                return /* @__PURE__ */ new Date() - Common._nowStartTime;
              };
              Common.random = function(min, max) {
                min = typeof min !== "undefined" ? min : 0;
                max = typeof max !== "undefined" ? max : 1;
                return min + _seededRandom() * (max - min);
              };
              var _seededRandom = /* @__PURE__ */ __name(function() {
                Common._seed = (Common._seed * 9301 + 49297) % 233280;
                return Common._seed / 233280;
              }, "_seededRandom");
              Common.colorToNumber = function(colorString) {
                colorString = colorString.replace("#", "");
                if (colorString.length == 3) {
                  colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2);
                }
                return parseInt(colorString, 16);
              };
              Common.logLevel = 1;
              Common.log = function() {
                if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
                  console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
                }
              };
              Common.info = function() {
                if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
                  console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
                }
              };
              Common.warn = function() {
                if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
                  console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)));
                }
              };
              Common.warnOnce = function() {
                var message = Array.prototype.slice.call(arguments).join(" ");
                if (!Common._warnedOnce[message]) {
                  Common.warn(message);
                  Common._warnedOnce[message] = true;
                }
              };
              Common.deprecated = function(obj, prop, warning) {
                obj[prop] = Common.chain(function() {
                  Common.warnOnce("\u{1F505} deprecated \u{1F505}", warning);
                }, obj[prop]);
              };
              Common.nextId = function() {
                return Common._nextId++;
              };
              Common.indexOf = function(haystack, needle) {
                if (haystack.indexOf)
                  return haystack.indexOf(needle);
                for (var i = 0; i < haystack.length; i++) {
                  if (haystack[i] === needle)
                    return i;
                }
                return -1;
              };
              Common.map = function(list, func) {
                if (list.map) {
                  return list.map(func);
                }
                var mapped = [];
                for (var i = 0; i < list.length; i += 1) {
                  mapped.push(func(list[i]));
                }
                return mapped;
              };
              Common.topologicalSort = function(graph) {
                var result = [], visited = [], temp = [];
                for (var node in graph) {
                  if (!visited[node] && !temp[node]) {
                    Common._topologicalSort(node, visited, temp, graph, result);
                  }
                }
                return result;
              };
              Common._topologicalSort = function(node, visited, temp, graph, result) {
                var neighbors = graph[node] || [];
                temp[node] = true;
                for (var i = 0; i < neighbors.length; i += 1) {
                  var neighbor = neighbors[i];
                  if (temp[neighbor]) {
                    continue;
                  }
                  if (!visited[neighbor]) {
                    Common._topologicalSort(neighbor, visited, temp, graph, result);
                  }
                }
                temp[node] = false;
                visited[node] = true;
                result.push(node);
              };
              Common.chain = function() {
                var funcs = [];
                for (var i = 0; i < arguments.length; i += 1) {
                  var func = arguments[i];
                  if (func._chained) {
                    funcs.push.apply(funcs, func._chained);
                  } else {
                    funcs.push(func);
                  }
                }
                var chain = /* @__PURE__ */ __name(function() {
                  var lastResult, args = new Array(arguments.length);
                  for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
                    args[i2] = arguments[i2];
                  }
                  for (i2 = 0; i2 < funcs.length; i2 += 1) {
                    var result = funcs[i2].apply(lastResult, args);
                    if (typeof result !== "undefined") {
                      lastResult = result;
                    }
                  }
                  return lastResult;
                }, "chain");
                chain._chained = funcs;
                return chain;
              };
              Common.chainPathBefore = function(base, path, func) {
                return Common.set(base, path, Common.chain(
                  func,
                  Common.get(base, path)
                ));
              };
              Common.chainPathAfter = function(base, path, func) {
                return Common.set(base, path, Common.chain(
                  Common.get(base, path),
                  func
                ));
              };
              Common.setDecomp = function(decomp) {
                Common._decomp = decomp;
              };
              Common.getDecomp = function() {
                var decomp = Common._decomp;
                try {
                  if (!decomp && typeof window !== "undefined") {
                    decomp = window.decomp;
                  }
                  if (!decomp && typeof global !== "undefined") {
                    decomp = global.decomp;
                  }
                } catch (e) {
                  decomp = null;
                }
                return decomp;
              };
            })();
          }),
          /* 1 */
          /***/
          (function(module2, exports2) {
            var Bounds = {};
            module2.exports = Bounds;
            (function() {
              Bounds.create = function(vertices) {
                var bounds = {
                  min: { x: 0, y: 0 },
                  max: { x: 0, y: 0 }
                };
                if (vertices)
                  Bounds.update(bounds, vertices);
                return bounds;
              };
              Bounds.update = function(bounds, vertices, velocity) {
                bounds.min.x = Infinity;
                bounds.max.x = -Infinity;
                bounds.min.y = Infinity;
                bounds.max.y = -Infinity;
                for (var i = 0; i < vertices.length; i++) {
                  var vertex = vertices[i];
                  if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
                  if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
                  if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
                  if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
                }
                if (velocity) {
                  if (velocity.x > 0) {
                    bounds.max.x += velocity.x;
                  } else {
                    bounds.min.x += velocity.x;
                  }
                  if (velocity.y > 0) {
                    bounds.max.y += velocity.y;
                  } else {
                    bounds.min.y += velocity.y;
                  }
                }
              };
              Bounds.contains = function(bounds, point) {
                return point.x >= bounds.min.x && point.x <= bounds.max.x && point.y >= bounds.min.y && point.y <= bounds.max.y;
              };
              Bounds.overlaps = function(boundsA, boundsB) {
                return boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y;
              };
              Bounds.translate = function(bounds, vector) {
                bounds.min.x += vector.x;
                bounds.max.x += vector.x;
                bounds.min.y += vector.y;
                bounds.max.y += vector.y;
              };
              Bounds.shift = function(bounds, position) {
                var deltaX = bounds.max.x - bounds.min.x, deltaY = bounds.max.y - bounds.min.y;
                bounds.min.x = position.x;
                bounds.max.x = position.x + deltaX;
                bounds.min.y = position.y;
                bounds.max.y = position.y + deltaY;
              };
            })();
          }),
          /* 2 */
          /***/
          (function(module2, exports2) {
            var Vector = {};
            module2.exports = Vector;
            (function() {
              Vector.create = function(x, y) {
                return { x: x || 0, y: y || 0 };
              };
              Vector.clone = function(vector) {
                return { x: vector.x, y: vector.y };
              };
              Vector.magnitude = function(vector) {
                return Math7.sqrt(vector.x * vector.x + vector.y * vector.y);
              };
              Vector.magnitudeSquared = function(vector) {
                return vector.x * vector.x + vector.y * vector.y;
              };
              Vector.rotate = function(vector, angle2, output) {
                var cos = Math7.cos(angle2), sin = Math7.sin(angle2);
                if (!output) output = {};
                var x = vector.x * cos - vector.y * sin;
                output.y = vector.x * sin + vector.y * cos;
                output.x = x;
                return output;
              };
              Vector.rotateAbout = function(vector, angle2, point, output) {
                var cos = Math7.cos(angle2), sin = Math7.sin(angle2);
                if (!output) output = {};
                var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
                output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
                output.x = x;
                return output;
              };
              Vector.normalise = function(vector) {
                var magnitude = Vector.magnitude(vector);
                if (magnitude === 0)
                  return { x: 0, y: 0 };
                return { x: vector.x / magnitude, y: vector.y / magnitude };
              };
              Vector.dot = function(vectorA, vectorB) {
                return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
              };
              Vector.cross = function(vectorA, vectorB) {
                return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
              };
              Vector.cross3 = function(vectorA, vectorB, vectorC) {
                return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
              };
              Vector.add = function(vectorA, vectorB, output) {
                if (!output) output = {};
                output.x = vectorA.x + vectorB.x;
                output.y = vectorA.y + vectorB.y;
                return output;
              };
              Vector.sub = function(vectorA, vectorB, output) {
                if (!output) output = {};
                output.x = vectorA.x - vectorB.x;
                output.y = vectorA.y - vectorB.y;
                return output;
              };
              Vector.mult = function(vector, scalar) {
                return { x: vector.x * scalar, y: vector.y * scalar };
              };
              Vector.div = function(vector, scalar) {
                return { x: vector.x / scalar, y: vector.y / scalar };
              };
              Vector.perp = function(vector, negate) {
                negate = negate === true ? -1 : 1;
                return { x: negate * -vector.y, y: negate * vector.x };
              };
              Vector.neg = function(vector) {
                return { x: -vector.x, y: -vector.y };
              };
              Vector.angle = function(vectorA, vectorB) {
                return Math7.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
              };
              Vector._temp = [
                Vector.create(),
                Vector.create(),
                Vector.create(),
                Vector.create(),
                Vector.create(),
                Vector.create()
              ];
            })();
          }),
          /* 3 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Vertices = {};
            module2.exports = Vertices;
            var Vector = __webpack_require__(2);
            var Common = __webpack_require__(0);
            (function() {
              Vertices.create = function(points, body) {
                var vertices = [];
                for (var i = 0; i < points.length; i++) {
                  var point = points[i], vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body,
                    isInternal: false
                  };
                  vertices.push(vertex);
                }
                return vertices;
              };
              Vertices.fromPath = function(path, body) {
                var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig, points = [];
                path.replace(pathPattern, function(match, x, y) {
                  points.push({ x: parseFloat(x), y: parseFloat(y) });
                });
                return Vertices.create(points, body);
              };
              Vertices.centre = function(vertices) {
                var area = Vertices.area(vertices, true), centre = { x: 0, y: 0 }, cross, temp, j;
                for (var i = 0; i < vertices.length; i++) {
                  j = (i + 1) % vertices.length;
                  cross = Vector.cross(vertices[i], vertices[j]);
                  temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
                  centre = Vector.add(centre, temp);
                }
                return Vector.div(centre, 6 * area);
              };
              Vertices.mean = function(vertices) {
                var average = { x: 0, y: 0 };
                for (var i = 0; i < vertices.length; i++) {
                  average.x += vertices[i].x;
                  average.y += vertices[i].y;
                }
                return Vector.div(average, vertices.length);
              };
              Vertices.area = function(vertices, signed) {
                var area = 0, j = vertices.length - 1;
                for (var i = 0; i < vertices.length; i++) {
                  area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
                  j = i;
                }
                if (signed)
                  return area / 2;
                return Math7.abs(area) / 2;
              };
              Vertices.inertia = function(vertices, mass) {
                var numerator = 0, denominator = 0, v = vertices, cross, j;
                for (var n = 0; n < v.length; n++) {
                  j = (n + 1) % v.length;
                  cross = Math7.abs(Vector.cross(v[j], v[n]));
                  numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
                  denominator += cross;
                }
                return mass / 6 * (numerator / denominator);
              };
              Vertices.translate = function(vertices, vector, scalar) {
                scalar = typeof scalar !== "undefined" ? scalar : 1;
                var verticesLength = vertices.length, translateX = vector.x * scalar, translateY = vector.y * scalar, i;
                for (i = 0; i < verticesLength; i++) {
                  vertices[i].x += translateX;
                  vertices[i].y += translateY;
                }
                return vertices;
              };
              Vertices.rotate = function(vertices, angle2, point) {
                if (angle2 === 0)
                  return;
                var cos = Math7.cos(angle2), sin = Math7.sin(angle2), pointX = point.x, pointY = point.y, verticesLength = vertices.length, vertex, dx, dy, i;
                for (i = 0; i < verticesLength; i++) {
                  vertex = vertices[i];
                  dx = vertex.x - pointX;
                  dy = vertex.y - pointY;
                  vertex.x = pointX + (dx * cos - dy * sin);
                  vertex.y = pointY + (dx * sin + dy * cos);
                }
                return vertices;
              };
              Vertices.contains = function(vertices, point) {
                var pointX = point.x, pointY = point.y, verticesLength = vertices.length, vertex = vertices[verticesLength - 1], nextVertex;
                for (var i = 0; i < verticesLength; i++) {
                  nextVertex = vertices[i];
                  if ((pointX - vertex.x) * (nextVertex.y - vertex.y) + (pointY - vertex.y) * (vertex.x - nextVertex.x) > 0) {
                    return false;
                  }
                  vertex = nextVertex;
                }
                return true;
              };
              Vertices.scale = function(vertices, scaleX, scaleY, point) {
                if (scaleX === 1 && scaleY === 1)
                  return vertices;
                point = point || Vertices.centre(vertices);
                var vertex, delta;
                for (var i = 0; i < vertices.length; i++) {
                  vertex = vertices[i];
                  delta = Vector.sub(vertex, point);
                  vertices[i].x = point.x + delta.x * scaleX;
                  vertices[i].y = point.y + delta.y * scaleY;
                }
                return vertices;
              };
              Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
                if (typeof radius === "number") {
                  radius = [radius];
                } else {
                  radius = radius || [8];
                }
                quality = typeof quality !== "undefined" ? quality : -1;
                qualityMin = qualityMin || 2;
                qualityMax = qualityMax || 14;
                var newVertices = [];
                for (var i = 0; i < vertices.length; i++) {
                  var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1], vertex = vertices[i], nextVertex = vertices[(i + 1) % vertices.length], currentRadius = radius[i < radius.length ? i : radius.length - 1];
                  if (currentRadius === 0) {
                    newVertices.push(vertex);
                    continue;
                  }
                  var prevNormal = Vector.normalise({
                    x: vertex.y - prevVertex.y,
                    y: prevVertex.x - vertex.x
                  });
                  var nextNormal = Vector.normalise({
                    x: nextVertex.y - vertex.y,
                    y: vertex.x - nextVertex.x
                  });
                  var diagonalRadius = Math7.sqrt(2 * Math7.pow(currentRadius, 2)), radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius), midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)), scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));
                  var precision = quality;
                  if (quality === -1) {
                    precision = Math7.pow(currentRadius, 0.32) * 1.75;
                  }
                  precision = Common.clamp(precision, qualityMin, qualityMax);
                  if (precision % 2 === 1)
                    precision += 1;
                  var alpha = Math7.acos(Vector.dot(prevNormal, nextNormal)), theta = alpha / precision;
                  for (var j = 0; j < precision; j++) {
                    newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
                  }
                }
                return newVertices;
              };
              Vertices.clockwiseSort = function(vertices) {
                var centre = Vertices.mean(vertices);
                vertices.sort(function(vertexA, vertexB) {
                  return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
                });
                return vertices;
              };
              Vertices.isConvex = function(vertices) {
                var flag = 0, n = vertices.length, i, j, k, z;
                if (n < 3)
                  return null;
                for (i = 0; i < n; i++) {
                  j = (i + 1) % n;
                  k = (i + 2) % n;
                  z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
                  z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
                  if (z < 0) {
                    flag |= 1;
                  } else if (z > 0) {
                    flag |= 2;
                  }
                  if (flag === 3) {
                    return false;
                  }
                }
                if (flag !== 0) {
                  return true;
                } else {
                  return null;
                }
              };
              Vertices.hull = function(vertices) {
                var upper = [], lower = [], vertex, i;
                vertices = vertices.slice(0);
                vertices.sort(function(vertexA, vertexB) {
                  var dx = vertexA.x - vertexB.x;
                  return dx !== 0 ? dx : vertexA.y - vertexB.y;
                });
                for (i = 0; i < vertices.length; i += 1) {
                  vertex = vertices[i];
                  while (lower.length >= 2 && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                    lower.pop();
                  }
                  lower.push(vertex);
                }
                for (i = vertices.length - 1; i >= 0; i -= 1) {
                  vertex = vertices[i];
                  while (upper.length >= 2 && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                    upper.pop();
                  }
                  upper.push(vertex);
                }
                upper.pop();
                lower.pop();
                return upper.concat(lower);
              };
            })();
          }),
          /* 4 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Body2 = {};
            module2.exports = Body2;
            var Vertices = __webpack_require__(3);
            var Vector = __webpack_require__(2);
            var Sleeping = __webpack_require__(7);
            var Common = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            var Axes = __webpack_require__(11);
            (function() {
              Body2._timeCorrection = true;
              Body2._inertiaScale = 4;
              Body2._nextCollidingGroupId = 1;
              Body2._nextNonCollidingGroupId = -1;
              Body2._nextCategory = 1;
              Body2._baseDelta = 1e3 / 60;
              Body2.create = function(options) {
                var defaults = {
                  id: Common.nextId(),
                  type: "body",
                  label: "Body",
                  parts: [],
                  plugin: {},
                  angle: 0,
                  vertices: Vertices.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
                  position: { x: 0, y: 0 },
                  force: { x: 0, y: 0 },
                  torque: 0,
                  positionImpulse: { x: 0, y: 0 },
                  constraintImpulse: { x: 0, y: 0, angle: 0 },
                  totalContacts: 0,
                  speed: 0,
                  angularSpeed: 0,
                  velocity: { x: 0, y: 0 },
                  angularVelocity: 0,
                  isSensor: false,
                  isStatic: false,
                  isSleeping: false,
                  motion: 0,
                  sleepThreshold: 60,
                  density: 1e-3,
                  restitution: 0,
                  friction: 0.1,
                  frictionStatic: 0.5,
                  frictionAir: 0.01,
                  collisionFilter: {
                    category: 1,
                    mask: 4294967295,
                    group: 0
                  },
                  slop: 0.05,
                  timeScale: 1,
                  render: {
                    visible: true,
                    opacity: 1,
                    strokeStyle: null,
                    fillStyle: null,
                    lineWidth: null,
                    sprite: {
                      xScale: 1,
                      yScale: 1,
                      xOffset: 0,
                      yOffset: 0
                    }
                  },
                  events: null,
                  bounds: null,
                  chamfer: null,
                  circleRadius: 0,
                  positionPrev: null,
                  anglePrev: 0,
                  parent: null,
                  axes: null,
                  area: 0,
                  mass: 0,
                  inertia: 0,
                  deltaTime: 1e3 / 60,
                  _original: null
                };
                var body = Common.extend(defaults, options);
                _initProperties(body, options);
                return body;
              };
              Body2.nextGroup = function(isNonColliding) {
                if (isNonColliding)
                  return Body2._nextNonCollidingGroupId--;
                return Body2._nextCollidingGroupId++;
              };
              Body2.nextCategory = function() {
                Body2._nextCategory = Body2._nextCategory << 1;
                return Body2._nextCategory;
              };
              var _initProperties = /* @__PURE__ */ __name(function(body, options) {
                options = options || {};
                Body2.set(body, {
                  bounds: body.bounds || Bounds.create(body.vertices),
                  positionPrev: body.positionPrev || Vector.clone(body.position),
                  anglePrev: body.anglePrev || body.angle,
                  vertices: body.vertices,
                  parts: body.parts || [body],
                  isStatic: body.isStatic,
                  isSleeping: body.isSleeping,
                  parent: body.parent || body
                });
                Vertices.rotate(body.vertices, body.angle, body.position);
                Axes.rotate(body.axes, body.angle);
                Bounds.update(body.bounds, body.vertices, body.velocity);
                Body2.set(body, {
                  axes: options.axes || body.axes,
                  area: options.area || body.area,
                  mass: options.mass || body.mass,
                  inertia: options.inertia || body.inertia
                });
                var defaultFillStyle = body.isStatic ? "#14151f" : Common.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"]), defaultStrokeStyle = body.isStatic ? "#555" : "#ccc", defaultLineWidth = body.isStatic && body.render.fillStyle === null ? 1 : 0;
                body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
                body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
                body.render.lineWidth = body.render.lineWidth || defaultLineWidth;
                body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
                body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
              }, "_initProperties");
              Body2.set = function(body, settings, value) {
                var property;
                if (typeof settings === "string") {
                  property = settings;
                  settings = {};
                  settings[property] = value;
                }
                for (property in settings) {
                  if (!Object.prototype.hasOwnProperty.call(settings, property))
                    continue;
                  value = settings[property];
                  switch (property) {
                    case "isStatic":
                      Body2.setStatic(body, value);
                      break;
                    case "isSleeping":
                      Sleeping.set(body, value);
                      break;
                    case "mass":
                      Body2.setMass(body, value);
                      break;
                    case "density":
                      Body2.setDensity(body, value);
                      break;
                    case "inertia":
                      Body2.setInertia(body, value);
                      break;
                    case "vertices":
                      Body2.setVertices(body, value);
                      break;
                    case "position":
                      Body2.setPosition(body, value);
                      break;
                    case "angle":
                      Body2.setAngle(body, value);
                      break;
                    case "velocity":
                      Body2.setVelocity(body, value);
                      break;
                    case "angularVelocity":
                      Body2.setAngularVelocity(body, value);
                      break;
                    case "speed":
                      Body2.setSpeed(body, value);
                      break;
                    case "angularSpeed":
                      Body2.setAngularSpeed(body, value);
                      break;
                    case "parts":
                      Body2.setParts(body, value);
                      break;
                    case "centre":
                      Body2.setCentre(body, value);
                      break;
                    default:
                      body[property] = value;
                  }
                }
              };
              Body2.setStatic = function(body, isStatic) {
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  if (isStatic) {
                    if (!part.isStatic) {
                      part._original = {
                        restitution: part.restitution,
                        friction: part.friction,
                        mass: part.mass,
                        inertia: part.inertia,
                        density: part.density,
                        inverseMass: part.inverseMass,
                        inverseInertia: part.inverseInertia
                      };
                    }
                    part.restitution = 0;
                    part.friction = 1;
                    part.mass = part.inertia = part.density = Infinity;
                    part.inverseMass = part.inverseInertia = 0;
                    part.positionPrev.x = part.position.x;
                    part.positionPrev.y = part.position.y;
                    part.anglePrev = part.angle;
                    part.angularVelocity = 0;
                    part.speed = 0;
                    part.angularSpeed = 0;
                    part.motion = 0;
                  } else if (part._original) {
                    part.restitution = part._original.restitution;
                    part.friction = part._original.friction;
                    part.mass = part._original.mass;
                    part.inertia = part._original.inertia;
                    part.density = part._original.density;
                    part.inverseMass = part._original.inverseMass;
                    part.inverseInertia = part._original.inverseInertia;
                    part._original = null;
                  }
                  part.isStatic = isStatic;
                }
              };
              Body2.setMass = function(body, mass) {
                var moment = body.inertia / (body.mass / 6);
                body.inertia = moment * (mass / 6);
                body.inverseInertia = 1 / body.inertia;
                body.mass = mass;
                body.inverseMass = 1 / body.mass;
                body.density = body.mass / body.area;
              };
              Body2.setDensity = function(body, density) {
                Body2.setMass(body, density * body.area);
                body.density = density;
              };
              Body2.setInertia = function(body, inertia) {
                body.inertia = inertia;
                body.inverseInertia = 1 / body.inertia;
              };
              Body2.setVertices = function(body, vertices) {
                if (vertices[0].body === body) {
                  body.vertices = vertices;
                } else {
                  body.vertices = Vertices.create(vertices, body);
                }
                body.axes = Axes.fromVertices(body.vertices);
                body.area = Vertices.area(body.vertices);
                Body2.setMass(body, body.density * body.area);
                var centre = Vertices.centre(body.vertices);
                Vertices.translate(body.vertices, centre, -1);
                Body2.setInertia(body, Body2._inertiaScale * Vertices.inertia(body.vertices, body.mass));
                Vertices.translate(body.vertices, body.position);
                Bounds.update(body.bounds, body.vertices, body.velocity);
              };
              Body2.setParts = function(body, parts, autoHull) {
                var i;
                parts = parts.slice(0);
                body.parts.length = 0;
                body.parts.push(body);
                body.parent = body;
                for (i = 0; i < parts.length; i++) {
                  var part = parts[i];
                  if (part !== body) {
                    part.parent = body;
                    body.parts.push(part);
                  }
                }
                if (body.parts.length === 1)
                  return;
                autoHull = typeof autoHull !== "undefined" ? autoHull : true;
                if (autoHull) {
                  var vertices = [];
                  for (i = 0; i < parts.length; i++) {
                    vertices = vertices.concat(parts[i].vertices);
                  }
                  Vertices.clockwiseSort(vertices);
                  var hull = Vertices.hull(vertices), hullCentre = Vertices.centre(hull);
                  Body2.setVertices(body, hull);
                  Vertices.translate(body.vertices, hullCentre);
                }
                var total = Body2._totalProperties(body);
                body.area = total.area;
                body.parent = body;
                body.position.x = total.centre.x;
                body.position.y = total.centre.y;
                body.positionPrev.x = total.centre.x;
                body.positionPrev.y = total.centre.y;
                Body2.setMass(body, total.mass);
                Body2.setInertia(body, total.inertia);
                Body2.setPosition(body, total.centre);
              };
              Body2.setCentre = function(body, centre, relative) {
                if (!relative) {
                  body.positionPrev.x = centre.x - (body.position.x - body.positionPrev.x);
                  body.positionPrev.y = centre.y - (body.position.y - body.positionPrev.y);
                  body.position.x = centre.x;
                  body.position.y = centre.y;
                } else {
                  body.positionPrev.x += centre.x;
                  body.positionPrev.y += centre.y;
                  body.position.x += centre.x;
                  body.position.y += centre.y;
                }
              };
              Body2.setPosition = function(body, position, updateVelocity) {
                var delta = Vector.sub(position, body.position);
                if (updateVelocity) {
                  body.positionPrev.x = body.position.x;
                  body.positionPrev.y = body.position.y;
                  body.velocity.x = delta.x;
                  body.velocity.y = delta.y;
                  body.speed = Vector.magnitude(delta);
                } else {
                  body.positionPrev.x += delta.x;
                  body.positionPrev.y += delta.y;
                }
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  part.position.x += delta.x;
                  part.position.y += delta.y;
                  Vertices.translate(part.vertices, delta);
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                }
              };
              Body2.setAngle = function(body, angle2, updateVelocity) {
                var delta = angle2 - body.angle;
                if (updateVelocity) {
                  body.anglePrev = body.angle;
                  body.angularVelocity = delta;
                  body.angularSpeed = Math7.abs(delta);
                } else {
                  body.anglePrev += delta;
                }
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  part.angle += delta;
                  Vertices.rotate(part.vertices, delta, body.position);
                  Axes.rotate(part.axes, delta);
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                  if (i > 0) {
                    Vector.rotateAbout(part.position, delta, body.position, part.position);
                  }
                }
              };
              Body2.setVelocity = function(body, velocity) {
                var timeScale = body.deltaTime / Body2._baseDelta;
                body.positionPrev.x = body.position.x - velocity.x * timeScale;
                body.positionPrev.y = body.position.y - velocity.y * timeScale;
                body.velocity.x = (body.position.x - body.positionPrev.x) / timeScale;
                body.velocity.y = (body.position.y - body.positionPrev.y) / timeScale;
                body.speed = Vector.magnitude(body.velocity);
              };
              Body2.getVelocity = function(body) {
                var timeScale = Body2._baseDelta / body.deltaTime;
                return {
                  x: (body.position.x - body.positionPrev.x) * timeScale,
                  y: (body.position.y - body.positionPrev.y) * timeScale
                };
              };
              Body2.getSpeed = function(body) {
                return Vector.magnitude(Body2.getVelocity(body));
              };
              Body2.setSpeed = function(body, speed) {
                Body2.setVelocity(body, Vector.mult(Vector.normalise(Body2.getVelocity(body)), speed));
              };
              Body2.setAngularVelocity = function(body, velocity) {
                var timeScale = body.deltaTime / Body2._baseDelta;
                body.anglePrev = body.angle - velocity * timeScale;
                body.angularVelocity = (body.angle - body.anglePrev) / timeScale;
                body.angularSpeed = Math7.abs(body.angularVelocity);
              };
              Body2.getAngularVelocity = function(body) {
                return (body.angle - body.anglePrev) * Body2._baseDelta / body.deltaTime;
              };
              Body2.getAngularSpeed = function(body) {
                return Math7.abs(Body2.getAngularVelocity(body));
              };
              Body2.setAngularSpeed = function(body, speed) {
                Body2.setAngularVelocity(body, Common.sign(Body2.getAngularVelocity(body)) * speed);
              };
              Body2.translate = function(body, translation, updateVelocity) {
                Body2.setPosition(body, Vector.add(body.position, translation), updateVelocity);
              };
              Body2.rotate = function(body, rotation, point, updateVelocity) {
                if (!point) {
                  Body2.setAngle(body, body.angle + rotation, updateVelocity);
                } else {
                  var cos = Math7.cos(rotation), sin = Math7.sin(rotation), dx = body.position.x - point.x, dy = body.position.y - point.y;
                  Body2.setPosition(body, {
                    x: point.x + (dx * cos - dy * sin),
                    y: point.y + (dx * sin + dy * cos)
                  }, updateVelocity);
                  Body2.setAngle(body, body.angle + rotation, updateVelocity);
                }
              };
              Body2.scale = function(body, scaleX, scaleY, point) {
                var totalArea = 0, totalInertia = 0;
                point = point || body.position;
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  Vertices.scale(part.vertices, scaleX, scaleY, point);
                  part.axes = Axes.fromVertices(part.vertices);
                  part.area = Vertices.area(part.vertices);
                  Body2.setMass(part, body.density * part.area);
                  Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
                  Body2.setInertia(part, Body2._inertiaScale * Vertices.inertia(part.vertices, part.mass));
                  Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });
                  if (i > 0) {
                    totalArea += part.area;
                    totalInertia += part.inertia;
                  }
                  part.position.x = point.x + (part.position.x - point.x) * scaleX;
                  part.position.y = point.y + (part.position.y - point.y) * scaleY;
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                }
                if (body.parts.length > 1) {
                  body.area = totalArea;
                  if (!body.isStatic) {
                    Body2.setMass(body, body.density * totalArea);
                    Body2.setInertia(body, totalInertia);
                  }
                }
                if (body.circleRadius) {
                  if (scaleX === scaleY) {
                    body.circleRadius *= scaleX;
                  } else {
                    body.circleRadius = null;
                  }
                }
              };
              Body2.update = function(body, deltaTime) {
                deltaTime = (typeof deltaTime !== "undefined" ? deltaTime : 1e3 / 60) * body.timeScale;
                var deltaTimeSquared = deltaTime * deltaTime, correction = Body2._timeCorrection ? deltaTime / (body.deltaTime || deltaTime) : 1;
                var frictionAir = 1 - body.frictionAir * (deltaTime / Common._baseDelta), velocityPrevX = (body.position.x - body.positionPrev.x) * correction, velocityPrevY = (body.position.y - body.positionPrev.y) * correction;
                body.velocity.x = velocityPrevX * frictionAir + body.force.x / body.mass * deltaTimeSquared;
                body.velocity.y = velocityPrevY * frictionAir + body.force.y / body.mass * deltaTimeSquared;
                body.positionPrev.x = body.position.x;
                body.positionPrev.y = body.position.y;
                body.position.x += body.velocity.x;
                body.position.y += body.velocity.y;
                body.deltaTime = deltaTime;
                body.angularVelocity = (body.angle - body.anglePrev) * frictionAir * correction + body.torque / body.inertia * deltaTimeSquared;
                body.anglePrev = body.angle;
                body.angle += body.angularVelocity;
                for (var i = 0; i < body.parts.length; i++) {
                  var part = body.parts[i];
                  Vertices.translate(part.vertices, body.velocity);
                  if (i > 0) {
                    part.position.x += body.velocity.x;
                    part.position.y += body.velocity.y;
                  }
                  if (body.angularVelocity !== 0) {
                    Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                    Axes.rotate(part.axes, body.angularVelocity);
                    if (i > 0) {
                      Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                    }
                  }
                  Bounds.update(part.bounds, part.vertices, body.velocity);
                }
              };
              Body2.updateVelocities = function(body) {
                var timeScale = Body2._baseDelta / body.deltaTime, bodyVelocity = body.velocity;
                bodyVelocity.x = (body.position.x - body.positionPrev.x) * timeScale;
                bodyVelocity.y = (body.position.y - body.positionPrev.y) * timeScale;
                body.speed = Math7.sqrt(bodyVelocity.x * bodyVelocity.x + bodyVelocity.y * bodyVelocity.y);
                body.angularVelocity = (body.angle - body.anglePrev) * timeScale;
                body.angularSpeed = Math7.abs(body.angularVelocity);
              };
              Body2.applyForce = function(body, position, force) {
                var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
                body.force.x += force.x;
                body.force.y += force.y;
                body.torque += offset.x * force.y - offset.y * force.x;
              };
              Body2._totalProperties = function(body) {
                var properties = {
                  mass: 0,
                  area: 0,
                  inertia: 0,
                  centre: { x: 0, y: 0 }
                };
                for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
                  var part = body.parts[i], mass = part.mass !== Infinity ? part.mass : 1;
                  properties.mass += mass;
                  properties.area += part.area;
                  properties.inertia += part.inertia;
                  properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
                }
                properties.centre = Vector.div(properties.centre, properties.mass);
                return properties;
              };
            })();
          }),
          /* 5 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Events2 = {};
            module2.exports = Events2;
            var Common = __webpack_require__(0);
            (function() {
              Events2.on = function(object, eventNames, callback) {
                var names = eventNames.split(" "), name;
                for (var i = 0; i < names.length; i++) {
                  name = names[i];
                  object.events = object.events || {};
                  object.events[name] = object.events[name] || [];
                  object.events[name].push(callback);
                }
                return callback;
              };
              Events2.off = function(object, eventNames, callback) {
                if (!eventNames) {
                  object.events = {};
                  return;
                }
                if (typeof eventNames === "function") {
                  callback = eventNames;
                  eventNames = Common.keys(object.events).join(" ");
                }
                var names = eventNames.split(" ");
                for (var i = 0; i < names.length; i++) {
                  var callbacks = object.events[names[i]], newCallbacks = [];
                  if (callback && callbacks) {
                    for (var j = 0; j < callbacks.length; j++) {
                      if (callbacks[j] !== callback)
                        newCallbacks.push(callbacks[j]);
                    }
                  }
                  object.events[names[i]] = newCallbacks;
                }
              };
              Events2.trigger = function(object, eventNames, event) {
                var names, name, callbacks, eventClone;
                var events = object.events;
                if (events && Common.keys(events).length > 0) {
                  if (!event)
                    event = {};
                  names = eventNames.split(" ");
                  for (var i = 0; i < names.length; i++) {
                    name = names[i];
                    callbacks = events[name];
                    if (callbacks) {
                      eventClone = Common.clone(event, false);
                      eventClone.name = name;
                      eventClone.source = object;
                      for (var j = 0; j < callbacks.length; j++) {
                        callbacks[j].apply(object, [eventClone]);
                      }
                    }
                  }
                }
              };
            })();
          }),
          /* 6 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Composite2 = {};
            module2.exports = Composite2;
            var Events2 = __webpack_require__(5);
            var Common = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            var Body2 = __webpack_require__(4);
            (function() {
              Composite2.create = function(options) {
                return Common.extend({
                  id: Common.nextId(),
                  type: "composite",
                  parent: null,
                  isModified: false,
                  bodies: [],
                  constraints: [],
                  composites: [],
                  label: "Composite",
                  plugin: {},
                  cache: {
                    allBodies: null,
                    allConstraints: null,
                    allComposites: null
                  }
                }, options);
              };
              Composite2.setModified = function(composite, isModified, updateParents, updateChildren) {
                composite.isModified = isModified;
                if (isModified && composite.cache) {
                  composite.cache.allBodies = null;
                  composite.cache.allConstraints = null;
                  composite.cache.allComposites = null;
                }
                if (updateParents && composite.parent) {
                  Composite2.setModified(composite.parent, isModified, updateParents, updateChildren);
                }
                if (updateChildren) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    var childComposite = composite.composites[i];
                    Composite2.setModified(childComposite, isModified, updateParents, updateChildren);
                  }
                }
              };
              Composite2.add = function(composite, object) {
                var objects = [].concat(object);
                Events2.trigger(composite, "beforeAdd", { object });
                for (var i = 0; i < objects.length; i++) {
                  var obj = objects[i];
                  switch (obj.type) {
                    case "body":
                      if (obj.parent !== obj) {
                        Common.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                        break;
                      }
                      Composite2.addBody(composite, obj);
                      break;
                    case "constraint":
                      Composite2.addConstraint(composite, obj);
                      break;
                    case "composite":
                      Composite2.addComposite(composite, obj);
                      break;
                    case "mouseConstraint":
                      Composite2.addConstraint(composite, obj.constraint);
                      break;
                  }
                }
                Events2.trigger(composite, "afterAdd", { object });
                return composite;
              };
              Composite2.remove = function(composite, object, deep) {
                var objects = [].concat(object);
                Events2.trigger(composite, "beforeRemove", { object });
                for (var i = 0; i < objects.length; i++) {
                  var obj = objects[i];
                  switch (obj.type) {
                    case "body":
                      Composite2.removeBody(composite, obj, deep);
                      break;
                    case "constraint":
                      Composite2.removeConstraint(composite, obj, deep);
                      break;
                    case "composite":
                      Composite2.removeComposite(composite, obj, deep);
                      break;
                    case "mouseConstraint":
                      Composite2.removeConstraint(composite, obj.constraint);
                      break;
                  }
                }
                Events2.trigger(composite, "afterRemove", { object });
                return composite;
              };
              Composite2.addComposite = function(compositeA, compositeB) {
                compositeA.composites.push(compositeB);
                compositeB.parent = compositeA;
                Composite2.setModified(compositeA, true, true, false);
                return compositeA;
              };
              Composite2.removeComposite = function(compositeA, compositeB, deep) {
                var position = Common.indexOf(compositeA.composites, compositeB);
                if (position !== -1) {
                  var bodies = Composite2.allBodies(compositeB);
                  Composite2.removeCompositeAt(compositeA, position);
                  for (var i = 0; i < bodies.length; i++) {
                    bodies[i].sleepCounter = 0;
                  }
                }
                if (deep) {
                  for (var i = 0; i < compositeA.composites.length; i++) {
                    Composite2.removeComposite(compositeA.composites[i], compositeB, true);
                  }
                }
                return compositeA;
              };
              Composite2.removeCompositeAt = function(composite, position) {
                composite.composites.splice(position, 1);
                Composite2.setModified(composite, true, true, false);
                return composite;
              };
              Composite2.addBody = function(composite, body) {
                composite.bodies.push(body);
                Composite2.setModified(composite, true, true, false);
                return composite;
              };
              Composite2.removeBody = function(composite, body, deep) {
                var position = Common.indexOf(composite.bodies, body);
                if (position !== -1) {
                  Composite2.removeBodyAt(composite, position);
                  body.sleepCounter = 0;
                }
                if (deep) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    Composite2.removeBody(composite.composites[i], body, true);
                  }
                }
                return composite;
              };
              Composite2.removeBodyAt = function(composite, position) {
                composite.bodies.splice(position, 1);
                Composite2.setModified(composite, true, true, false);
                return composite;
              };
              Composite2.addConstraint = function(composite, constraint) {
                composite.constraints.push(constraint);
                Composite2.setModified(composite, true, true, false);
                return composite;
              };
              Composite2.removeConstraint = function(composite, constraint, deep) {
                var position = Common.indexOf(composite.constraints, constraint);
                if (position !== -1) {
                  Composite2.removeConstraintAt(composite, position);
                }
                if (deep) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    Composite2.removeConstraint(composite.composites[i], constraint, true);
                  }
                }
                return composite;
              };
              Composite2.removeConstraintAt = function(composite, position) {
                composite.constraints.splice(position, 1);
                Composite2.setModified(composite, true, true, false);
                return composite;
              };
              Composite2.clear = function(composite, keepStatic, deep) {
                if (deep) {
                  for (var i = 0; i < composite.composites.length; i++) {
                    Composite2.clear(composite.composites[i], keepStatic, true);
                  }
                }
                if (keepStatic) {
                  composite.bodies = composite.bodies.filter(function(body) {
                    return body.isStatic;
                  });
                } else {
                  composite.bodies.length = 0;
                }
                composite.constraints.length = 0;
                composite.composites.length = 0;
                Composite2.setModified(composite, true, true, false);
                return composite;
              };
              Composite2.allBodies = function(composite) {
                if (composite.cache && composite.cache.allBodies) {
                  return composite.cache.allBodies;
                }
                var bodies = [].concat(composite.bodies);
                for (var i = 0; i < composite.composites.length; i++)
                  bodies = bodies.concat(Composite2.allBodies(composite.composites[i]));
                if (composite.cache) {
                  composite.cache.allBodies = bodies;
                }
                return bodies;
              };
              Composite2.allConstraints = function(composite) {
                if (composite.cache && composite.cache.allConstraints) {
                  return composite.cache.allConstraints;
                }
                var constraints = [].concat(composite.constraints);
                for (var i = 0; i < composite.composites.length; i++)
                  constraints = constraints.concat(Composite2.allConstraints(composite.composites[i]));
                if (composite.cache) {
                  composite.cache.allConstraints = constraints;
                }
                return constraints;
              };
              Composite2.allComposites = function(composite) {
                if (composite.cache && composite.cache.allComposites) {
                  return composite.cache.allComposites;
                }
                var composites = [].concat(composite.composites);
                for (var i = 0; i < composite.composites.length; i++)
                  composites = composites.concat(Composite2.allComposites(composite.composites[i]));
                if (composite.cache) {
                  composite.cache.allComposites = composites;
                }
                return composites;
              };
              Composite2.get = function(composite, id, type) {
                var objects, object;
                switch (type) {
                  case "body":
                    objects = Composite2.allBodies(composite);
                    break;
                  case "constraint":
                    objects = Composite2.allConstraints(composite);
                    break;
                  case "composite":
                    objects = Composite2.allComposites(composite).concat(composite);
                    break;
                }
                if (!objects)
                  return null;
                object = objects.filter(function(object2) {
                  return object2.id.toString() === id.toString();
                });
                return object.length === 0 ? null : object[0];
              };
              Composite2.move = function(compositeA, objects, compositeB) {
                Composite2.remove(compositeA, objects);
                Composite2.add(compositeB, objects);
                return compositeA;
              };
              Composite2.rebase = function(composite) {
                var objects = Composite2.allBodies(composite).concat(Composite2.allConstraints(composite)).concat(Composite2.allComposites(composite));
                for (var i = 0; i < objects.length; i++) {
                  objects[i].id = Common.nextId();
                }
                return composite;
              };
              Composite2.translate = function(composite, translation, recursive) {
                var bodies = recursive ? Composite2.allBodies(composite) : composite.bodies;
                for (var i = 0; i < bodies.length; i++) {
                  Body2.translate(bodies[i], translation);
                }
                return composite;
              };
              Composite2.rotate = function(composite, rotation, point, recursive) {
                var cos = Math7.cos(rotation), sin = Math7.sin(rotation), bodies = recursive ? Composite2.allBodies(composite) : composite.bodies;
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
                  Body2.setPosition(body, {
                    x: point.x + (dx * cos - dy * sin),
                    y: point.y + (dx * sin + dy * cos)
                  });
                  Body2.rotate(body, rotation);
                }
                return composite;
              };
              Composite2.scale = function(composite, scaleX, scaleY, point, recursive) {
                var bodies = recursive ? Composite2.allBodies(composite) : composite.bodies;
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], dx = body.position.x - point.x, dy = body.position.y - point.y;
                  Body2.setPosition(body, {
                    x: point.x + dx * scaleX,
                    y: point.y + dy * scaleY
                  });
                  Body2.scale(body, scaleX, scaleY);
                }
                return composite;
              };
              Composite2.bounds = function(composite) {
                var bodies = Composite2.allBodies(composite), vertices = [];
                for (var i = 0; i < bodies.length; i += 1) {
                  var body = bodies[i];
                  vertices.push(body.bounds.min, body.bounds.max);
                }
                return Bounds.create(vertices);
              };
            })();
          }),
          /* 7 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Sleeping = {};
            module2.exports = Sleeping;
            var Body2 = __webpack_require__(4);
            var Events2 = __webpack_require__(5);
            var Common = __webpack_require__(0);
            (function() {
              Sleeping._motionWakeThreshold = 0.18;
              Sleeping._motionSleepThreshold = 0.08;
              Sleeping._minBias = 0.9;
              Sleeping.update = function(bodies, delta) {
                var timeScale = delta / Common._baseDelta, motionSleepThreshold = Sleeping._motionSleepThreshold;
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], speed = Body2.getSpeed(body), angularSpeed = Body2.getAngularSpeed(body), motion = speed * speed + angularSpeed * angularSpeed;
                  if (body.force.x !== 0 || body.force.y !== 0) {
                    Sleeping.set(body, false);
                    continue;
                  }
                  var minMotion = Math7.min(body.motion, motion), maxMotion = Math7.max(body.motion, motion);
                  body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
                  if (body.sleepThreshold > 0 && body.motion < motionSleepThreshold) {
                    body.sleepCounter += 1;
                    if (body.sleepCounter >= body.sleepThreshold / timeScale) {
                      Sleeping.set(body, true);
                    }
                  } else if (body.sleepCounter > 0) {
                    body.sleepCounter -= 1;
                  }
                }
              };
              Sleeping.afterCollisions = function(pairs) {
                var motionSleepThreshold = Sleeping._motionSleepThreshold;
                for (var i = 0; i < pairs.length; i++) {
                  var pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  var collision = pair.collision, bodyA = collision.bodyA.parent, bodyB = collision.bodyB.parent;
                  if (bodyA.isSleeping && bodyB.isSleeping || bodyA.isStatic || bodyB.isStatic)
                    continue;
                  if (bodyA.isSleeping || bodyB.isSleeping) {
                    var sleepingBody = bodyA.isSleeping && !bodyA.isStatic ? bodyA : bodyB, movingBody = sleepingBody === bodyA ? bodyB : bodyA;
                    if (!sleepingBody.isStatic && movingBody.motion > motionSleepThreshold) {
                      Sleeping.set(sleepingBody, false);
                    }
                  }
                }
              };
              Sleeping.set = function(body, isSleeping) {
                var wasSleeping = body.isSleeping;
                if (isSleeping) {
                  body.isSleeping = true;
                  body.sleepCounter = body.sleepThreshold;
                  body.positionImpulse.x = 0;
                  body.positionImpulse.y = 0;
                  body.positionPrev.x = body.position.x;
                  body.positionPrev.y = body.position.y;
                  body.anglePrev = body.angle;
                  body.speed = 0;
                  body.angularSpeed = 0;
                  body.motion = 0;
                  if (!wasSleeping) {
                    Events2.trigger(body, "sleepStart");
                  }
                } else {
                  body.isSleeping = false;
                  body.sleepCounter = 0;
                  if (wasSleeping) {
                    Events2.trigger(body, "sleepEnd");
                  }
                }
              };
            })();
          }),
          /* 8 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Collision = {};
            module2.exports = Collision;
            var Vertices = __webpack_require__(3);
            var Pair = __webpack_require__(9);
            (function() {
              var _supports = [];
              var _overlapAB = {
                overlap: 0,
                axis: null
              };
              var _overlapBA = {
                overlap: 0,
                axis: null
              };
              Collision.create = function(bodyA, bodyB) {
                return {
                  pair: null,
                  collided: false,
                  bodyA,
                  bodyB,
                  parentA: bodyA.parent,
                  parentB: bodyB.parent,
                  depth: 0,
                  normal: { x: 0, y: 0 },
                  tangent: { x: 0, y: 0 },
                  penetration: { x: 0, y: 0 },
                  supports: [null, null],
                  supportCount: 0
                };
              };
              Collision.collides = function(bodyA, bodyB, pairs) {
                Collision._overlapAxes(_overlapAB, bodyA.vertices, bodyB.vertices, bodyA.axes);
                if (_overlapAB.overlap <= 0) {
                  return null;
                }
                Collision._overlapAxes(_overlapBA, bodyB.vertices, bodyA.vertices, bodyB.axes);
                if (_overlapBA.overlap <= 0) {
                  return null;
                }
                var pair = pairs && pairs.table[Pair.id(bodyA, bodyB)], collision;
                if (!pair) {
                  collision = Collision.create(bodyA, bodyB);
                  collision.collided = true;
                  collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
                  collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
                  collision.parentA = collision.bodyA.parent;
                  collision.parentB = collision.bodyB.parent;
                } else {
                  collision = pair.collision;
                }
                bodyA = collision.bodyA;
                bodyB = collision.bodyB;
                var minOverlap;
                if (_overlapAB.overlap < _overlapBA.overlap) {
                  minOverlap = _overlapAB;
                } else {
                  minOverlap = _overlapBA;
                }
                var normal = collision.normal, tangent = collision.tangent, penetration = collision.penetration, supports = collision.supports, depth = minOverlap.overlap, minAxis = minOverlap.axis, normalX = minAxis.x, normalY = minAxis.y, deltaX = bodyB.position.x - bodyA.position.x, deltaY = bodyB.position.y - bodyA.position.y;
                if (normalX * deltaX + normalY * deltaY >= 0) {
                  normalX = -normalX;
                  normalY = -normalY;
                }
                normal.x = normalX;
                normal.y = normalY;
                tangent.x = -normalY;
                tangent.y = normalX;
                penetration.x = normalX * depth;
                penetration.y = normalY * depth;
                collision.depth = depth;
                var supportsB = Collision._findSupports(bodyA, bodyB, normal, 1), supportCount = 0;
                if (Vertices.contains(bodyA.vertices, supportsB[0])) {
                  supports[supportCount++] = supportsB[0];
                }
                if (Vertices.contains(bodyA.vertices, supportsB[1])) {
                  supports[supportCount++] = supportsB[1];
                }
                if (supportCount < 2) {
                  var supportsA = Collision._findSupports(bodyB, bodyA, normal, -1);
                  if (Vertices.contains(bodyB.vertices, supportsA[0])) {
                    supports[supportCount++] = supportsA[0];
                  }
                  if (supportCount < 2 && Vertices.contains(bodyB.vertices, supportsA[1])) {
                    supports[supportCount++] = supportsA[1];
                  }
                }
                if (supportCount === 0) {
                  supports[supportCount++] = supportsB[0];
                }
                collision.supportCount = supportCount;
                return collision;
              };
              Collision._overlapAxes = function(result, verticesA, verticesB, axes) {
                var verticesALength = verticesA.length, verticesBLength = verticesB.length, verticesAX = verticesA[0].x, verticesAY = verticesA[0].y, verticesBX = verticesB[0].x, verticesBY = verticesB[0].y, axesLength = axes.length, overlapMin = Number.MAX_VALUE, overlapAxisNumber = 0, overlap, overlapAB, overlapBA, dot, i, j;
                for (i = 0; i < axesLength; i++) {
                  var axis = axes[i], axisX = axis.x, axisY = axis.y, minA = verticesAX * axisX + verticesAY * axisY, minB = verticesBX * axisX + verticesBY * axisY, maxA = minA, maxB = minB;
                  for (j = 1; j < verticesALength; j += 1) {
                    dot = verticesA[j].x * axisX + verticesA[j].y * axisY;
                    if (dot > maxA) {
                      maxA = dot;
                    } else if (dot < minA) {
                      minA = dot;
                    }
                  }
                  for (j = 1; j < verticesBLength; j += 1) {
                    dot = verticesB[j].x * axisX + verticesB[j].y * axisY;
                    if (dot > maxB) {
                      maxB = dot;
                    } else if (dot < minB) {
                      minB = dot;
                    }
                  }
                  overlapAB = maxA - minB;
                  overlapBA = maxB - minA;
                  overlap = overlapAB < overlapBA ? overlapAB : overlapBA;
                  if (overlap < overlapMin) {
                    overlapMin = overlap;
                    overlapAxisNumber = i;
                    if (overlap <= 0) {
                      break;
                    }
                  }
                }
                result.axis = axes[overlapAxisNumber];
                result.overlap = overlapMin;
              };
              Collision._findSupports = function(bodyA, bodyB, normal, direction) {
                var vertices = bodyB.vertices, verticesLength = vertices.length, bodyAPositionX = bodyA.position.x, bodyAPositionY = bodyA.position.y, normalX = normal.x * direction, normalY = normal.y * direction, vertexA = vertices[0], vertexB = vertexA, nearestDistance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y), vertexC, distance, j;
                for (j = 1; j < verticesLength; j += 1) {
                  vertexB = vertices[j];
                  distance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y);
                  if (distance < nearestDistance) {
                    nearestDistance = distance;
                    vertexA = vertexB;
                  }
                }
                vertexC = vertices[(verticesLength + vertexA.index - 1) % verticesLength];
                nearestDistance = normalX * (bodyAPositionX - vertexC.x) + normalY * (bodyAPositionY - vertexC.y);
                vertexB = vertices[(vertexA.index + 1) % verticesLength];
                if (normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y) < nearestDistance) {
                  _supports[0] = vertexA;
                  _supports[1] = vertexB;
                  return _supports;
                }
                _supports[0] = vertexA;
                _supports[1] = vertexC;
                return _supports;
              };
            })();
          }),
          /* 9 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Pair = {};
            module2.exports = Pair;
            var Contact = __webpack_require__(16);
            (function() {
              Pair.create = function(collision, timestamp) {
                var bodyA = collision.bodyA, bodyB = collision.bodyB;
                var pair = {
                  id: Pair.id(bodyA, bodyB),
                  bodyA,
                  bodyB,
                  collision,
                  contacts: [Contact.create(), Contact.create()],
                  contactCount: 0,
                  separation: 0,
                  isActive: true,
                  isSensor: bodyA.isSensor || bodyB.isSensor,
                  timeCreated: timestamp,
                  timeUpdated: timestamp,
                  inverseMass: 0,
                  friction: 0,
                  frictionStatic: 0,
                  restitution: 0,
                  slop: 0
                };
                Pair.update(pair, collision, timestamp);
                return pair;
              };
              Pair.update = function(pair, collision, timestamp) {
                var supports = collision.supports, supportCount = collision.supportCount, contacts = pair.contacts, parentA = collision.parentA, parentB = collision.parentB;
                pair.isActive = true;
                pair.timeUpdated = timestamp;
                pair.collision = collision;
                pair.separation = collision.depth;
                pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
                pair.friction = parentA.friction < parentB.friction ? parentA.friction : parentB.friction;
                pair.frictionStatic = parentA.frictionStatic > parentB.frictionStatic ? parentA.frictionStatic : parentB.frictionStatic;
                pair.restitution = parentA.restitution > parentB.restitution ? parentA.restitution : parentB.restitution;
                pair.slop = parentA.slop > parentB.slop ? parentA.slop : parentB.slop;
                pair.contactCount = supportCount;
                collision.pair = pair;
                var supportA = supports[0], contactA = contacts[0], supportB = supports[1], contactB = contacts[1];
                if (contactB.vertex === supportA || contactA.vertex === supportB) {
                  contacts[1] = contactA;
                  contacts[0] = contactA = contactB;
                  contactB = contacts[1];
                }
                contactA.vertex = supportA;
                contactB.vertex = supportB;
              };
              Pair.setActive = function(pair, isActive, timestamp) {
                if (isActive) {
                  pair.isActive = true;
                  pair.timeUpdated = timestamp;
                } else {
                  pair.isActive = false;
                  pair.contactCount = 0;
                }
              };
              Pair.id = function(bodyA, bodyB) {
                return bodyA.id < bodyB.id ? bodyA.id.toString(36) + ":" + bodyB.id.toString(36) : bodyB.id.toString(36) + ":" + bodyA.id.toString(36);
              };
            })();
          }),
          /* 10 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Constraint2 = {};
            module2.exports = Constraint2;
            var Vertices = __webpack_require__(3);
            var Vector = __webpack_require__(2);
            var Sleeping = __webpack_require__(7);
            var Bounds = __webpack_require__(1);
            var Axes = __webpack_require__(11);
            var Common = __webpack_require__(0);
            (function() {
              Constraint2._warming = 0.4;
              Constraint2._torqueDampen = 1;
              Constraint2._minLength = 1e-6;
              Constraint2.create = function(options) {
                var constraint = options;
                if (constraint.bodyA && !constraint.pointA)
                  constraint.pointA = { x: 0, y: 0 };
                if (constraint.bodyB && !constraint.pointB)
                  constraint.pointB = { x: 0, y: 0 };
                var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA, initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB, length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));
                constraint.length = typeof constraint.length !== "undefined" ? constraint.length : length;
                constraint.id = constraint.id || Common.nextId();
                constraint.label = constraint.label || "Constraint";
                constraint.type = "constraint";
                constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
                constraint.damping = constraint.damping || 0;
                constraint.angularStiffness = constraint.angularStiffness || 0;
                constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
                constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
                constraint.plugin = {};
                var render = {
                  visible: true,
                  lineWidth: 2,
                  strokeStyle: "#ffffff",
                  type: "line",
                  anchors: true
                };
                if (constraint.length === 0 && constraint.stiffness > 0.1) {
                  render.type = "pin";
                  render.anchors = false;
                } else if (constraint.stiffness < 0.9) {
                  render.type = "spring";
                }
                constraint.render = Common.extend(render, constraint.render);
                return constraint;
              };
              Constraint2.preSolveAll = function(bodies) {
                for (var i = 0; i < bodies.length; i += 1) {
                  var body = bodies[i], impulse = body.constraintImpulse;
                  if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                    continue;
                  }
                  body.position.x += impulse.x;
                  body.position.y += impulse.y;
                  body.angle += impulse.angle;
                }
              };
              Constraint2.solveAll = function(constraints, delta) {
                var timeScale = Common.clamp(delta / Common._baseDelta, 0, 1);
                for (var i = 0; i < constraints.length; i += 1) {
                  var constraint = constraints[i], fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic, fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
                  if (fixedA || fixedB) {
                    Constraint2.solve(constraints[i], timeScale);
                  }
                }
                for (i = 0; i < constraints.length; i += 1) {
                  constraint = constraints[i];
                  fixedA = !constraint.bodyA || constraint.bodyA && constraint.bodyA.isStatic;
                  fixedB = !constraint.bodyB || constraint.bodyB && constraint.bodyB.isStatic;
                  if (!fixedA && !fixedB) {
                    Constraint2.solve(constraints[i], timeScale);
                  }
                }
              };
              Constraint2.solve = function(constraint, timeScale) {
                var bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointA = constraint.pointA, pointB = constraint.pointB;
                if (!bodyA && !bodyB)
                  return;
                if (bodyA && !bodyA.isStatic) {
                  Vector.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
                  constraint.angleA = bodyA.angle;
                }
                if (bodyB && !bodyB.isStatic) {
                  Vector.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
                  constraint.angleB = bodyB.angle;
                }
                var pointAWorld = pointA, pointBWorld = pointB;
                if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);
                if (!pointAWorld || !pointBWorld)
                  return;
                var delta = Vector.sub(pointAWorld, pointBWorld), currentLength = Vector.magnitude(delta);
                if (currentLength < Constraint2._minLength) {
                  currentLength = Constraint2._minLength;
                }
                var difference = (currentLength - constraint.length) / currentLength, isRigid = constraint.stiffness >= 1 || constraint.length === 0, stiffness = isRigid ? constraint.stiffness * timeScale : constraint.stiffness * timeScale * timeScale, damping = constraint.damping * timeScale, force = Vector.mult(delta, difference * stiffness), massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0), inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0), resistanceTotal = massTotal + inertiaTotal, torque, share, normal, normalVelocity, relativeVelocity;
                if (damping > 0) {
                  var zero = Vector.create();
                  normal = Vector.div(delta, currentLength);
                  relativeVelocity = Vector.sub(
                    bodyB && Vector.sub(bodyB.position, bodyB.positionPrev) || zero,
                    bodyA && Vector.sub(bodyA.position, bodyA.positionPrev) || zero
                  );
                  normalVelocity = Vector.dot(normal, relativeVelocity);
                }
                if (bodyA && !bodyA.isStatic) {
                  share = bodyA.inverseMass / massTotal;
                  bodyA.constraintImpulse.x -= force.x * share;
                  bodyA.constraintImpulse.y -= force.y * share;
                  bodyA.position.x -= force.x * share;
                  bodyA.position.y -= force.y * share;
                  if (damping > 0) {
                    bodyA.positionPrev.x -= damping * normal.x * normalVelocity * share;
                    bodyA.positionPrev.y -= damping * normal.y * normalVelocity * share;
                  }
                  torque = Vector.cross(pointA, force) / resistanceTotal * Constraint2._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
                  bodyA.constraintImpulse.angle -= torque;
                  bodyA.angle -= torque;
                }
                if (bodyB && !bodyB.isStatic) {
                  share = bodyB.inverseMass / massTotal;
                  bodyB.constraintImpulse.x += force.x * share;
                  bodyB.constraintImpulse.y += force.y * share;
                  bodyB.position.x += force.x * share;
                  bodyB.position.y += force.y * share;
                  if (damping > 0) {
                    bodyB.positionPrev.x += damping * normal.x * normalVelocity * share;
                    bodyB.positionPrev.y += damping * normal.y * normalVelocity * share;
                  }
                  torque = Vector.cross(pointB, force) / resistanceTotal * Constraint2._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
                  bodyB.constraintImpulse.angle += torque;
                  bodyB.angle += torque;
                }
              };
              Constraint2.postSolveAll = function(bodies) {
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], impulse = body.constraintImpulse;
                  if (body.isStatic || impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                    continue;
                  }
                  Sleeping.set(body, false);
                  for (var j = 0; j < body.parts.length; j++) {
                    var part = body.parts[j];
                    Vertices.translate(part.vertices, impulse);
                    if (j > 0) {
                      part.position.x += impulse.x;
                      part.position.y += impulse.y;
                    }
                    if (impulse.angle !== 0) {
                      Vertices.rotate(part.vertices, impulse.angle, body.position);
                      Axes.rotate(part.axes, impulse.angle);
                      if (j > 0) {
                        Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
                      }
                    }
                    Bounds.update(part.bounds, part.vertices, body.velocity);
                  }
                  impulse.angle *= Constraint2._warming;
                  impulse.x *= Constraint2._warming;
                  impulse.y *= Constraint2._warming;
                }
              };
              Constraint2.pointAWorld = function(constraint) {
                return {
                  x: (constraint.bodyA ? constraint.bodyA.position.x : 0) + (constraint.pointA ? constraint.pointA.x : 0),
                  y: (constraint.bodyA ? constraint.bodyA.position.y : 0) + (constraint.pointA ? constraint.pointA.y : 0)
                };
              };
              Constraint2.pointBWorld = function(constraint) {
                return {
                  x: (constraint.bodyB ? constraint.bodyB.position.x : 0) + (constraint.pointB ? constraint.pointB.x : 0),
                  y: (constraint.bodyB ? constraint.bodyB.position.y : 0) + (constraint.pointB ? constraint.pointB.y : 0)
                };
              };
              Constraint2.currentLength = function(constraint) {
                var pointAX = (constraint.bodyA ? constraint.bodyA.position.x : 0) + (constraint.pointA ? constraint.pointA.x : 0);
                var pointAY = (constraint.bodyA ? constraint.bodyA.position.y : 0) + (constraint.pointA ? constraint.pointA.y : 0);
                var pointBX = (constraint.bodyB ? constraint.bodyB.position.x : 0) + (constraint.pointB ? constraint.pointB.x : 0);
                var pointBY = (constraint.bodyB ? constraint.bodyB.position.y : 0) + (constraint.pointB ? constraint.pointB.y : 0);
                var deltaX = pointAX - pointBX;
                var deltaY = pointAY - pointBY;
                return Math7.sqrt(deltaX * deltaX + deltaY * deltaY);
              };
            })();
          }),
          /* 11 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Axes = {};
            module2.exports = Axes;
            var Vector = __webpack_require__(2);
            var Common = __webpack_require__(0);
            (function() {
              Axes.fromVertices = function(vertices) {
                var axes = {};
                for (var i = 0; i < vertices.length; i++) {
                  var j = (i + 1) % vertices.length, normal = Vector.normalise({
                    x: vertices[j].y - vertices[i].y,
                    y: vertices[i].x - vertices[j].x
                  }), gradient = normal.y === 0 ? Infinity : normal.x / normal.y;
                  gradient = gradient.toFixed(3).toString();
                  axes[gradient] = normal;
                }
                return Common.values(axes);
              };
              Axes.rotate = function(axes, angle2) {
                if (angle2 === 0)
                  return;
                var cos = Math7.cos(angle2), sin = Math7.sin(angle2);
                for (var i = 0; i < axes.length; i++) {
                  var axis = axes[i], xx;
                  xx = axis.x * cos - axis.y * sin;
                  axis.y = axis.x * sin + axis.y * cos;
                  axis.x = xx;
                }
              };
            })();
          }),
          /* 12 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Bodies2 = {};
            module2.exports = Bodies2;
            var Vertices = __webpack_require__(3);
            var Common = __webpack_require__(0);
            var Body2 = __webpack_require__(4);
            var Bounds = __webpack_require__(1);
            var Vector = __webpack_require__(2);
            (function() {
              Bodies2.rectangle = function(x, y, width, height, options) {
                options = options || {};
                var rectangle = {
                  label: "Rectangle Body",
                  position: { x, y },
                  vertices: Vertices.fromPath("L 0 0 L " + width + " 0 L " + width + " " + height + " L 0 " + height)
                };
                if (options.chamfer) {
                  var chamfer = options.chamfer;
                  rectangle.vertices = Vertices.chamfer(
                    rectangle.vertices,
                    chamfer.radius,
                    chamfer.quality,
                    chamfer.qualityMin,
                    chamfer.qualityMax
                  );
                  delete options.chamfer;
                }
                return Body2.create(Common.extend({}, rectangle, options));
              };
              Bodies2.trapezoid = function(x, y, width, height, slope, options) {
                options = options || {};
                if (slope >= 1) {
                  Common.warn("Bodies.trapezoid: slope parameter must be < 1.");
                }
                slope *= 0.5;
                var roof = (1 - slope * 2) * width;
                var x1 = width * slope, x2 = x1 + roof, x3 = x2 + x1, verticesPath;
                if (slope < 0.5) {
                  verticesPath = "L 0 0 L " + x1 + " " + -height + " L " + x2 + " " + -height + " L " + x3 + " 0";
                } else {
                  verticesPath = "L 0 0 L " + x2 + " " + -height + " L " + x3 + " 0";
                }
                var trapezoid = {
                  label: "Trapezoid Body",
                  position: { x, y },
                  vertices: Vertices.fromPath(verticesPath)
                };
                if (options.chamfer) {
                  var chamfer = options.chamfer;
                  trapezoid.vertices = Vertices.chamfer(
                    trapezoid.vertices,
                    chamfer.radius,
                    chamfer.quality,
                    chamfer.qualityMin,
                    chamfer.qualityMax
                  );
                  delete options.chamfer;
                }
                return Body2.create(Common.extend({}, trapezoid, options));
              };
              Bodies2.circle = function(x, y, radius, options, maxSides) {
                options = options || {};
                var circle = {
                  label: "Circle Body",
                  circleRadius: radius
                };
                maxSides = maxSides || 25;
                var sides = Math7.ceil(Math7.max(10, Math7.min(maxSides, radius)));
                if (sides % 2 === 1)
                  sides += 1;
                return Bodies2.polygon(x, y, sides, radius, Common.extend({}, circle, options));
              };
              Bodies2.polygon = function(x, y, sides, radius, options) {
                options = options || {};
                if (sides < 3)
                  return Bodies2.circle(x, y, radius, options);
                var theta = 2 * Math7.PI / sides, path = "", offset = theta * 0.5;
                for (var i = 0; i < sides; i += 1) {
                  var angle2 = offset + i * theta, xx = Math7.cos(angle2) * radius, yy = Math7.sin(angle2) * radius;
                  path += "L " + xx.toFixed(3) + " " + yy.toFixed(3) + " ";
                }
                var polygon = {
                  label: "Polygon Body",
                  position: { x, y },
                  vertices: Vertices.fromPath(path)
                };
                if (options.chamfer) {
                  var chamfer = options.chamfer;
                  polygon.vertices = Vertices.chamfer(
                    polygon.vertices,
                    chamfer.radius,
                    chamfer.quality,
                    chamfer.qualityMin,
                    chamfer.qualityMax
                  );
                  delete options.chamfer;
                }
                return Body2.create(Common.extend({}, polygon, options));
              };
              Bodies2.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea, removeDuplicatePoints) {
                var decomp = Common.getDecomp(), canDecomp, body, parts, isConvex, isConcave, vertices, i, j, k, v, z;
                canDecomp = Boolean(decomp && decomp.quickDecomp);
                options = options || {};
                parts = [];
                flagInternal = typeof flagInternal !== "undefined" ? flagInternal : false;
                removeCollinear = typeof removeCollinear !== "undefined" ? removeCollinear : 0.01;
                minimumArea = typeof minimumArea !== "undefined" ? minimumArea : 10;
                removeDuplicatePoints = typeof removeDuplicatePoints !== "undefined" ? removeDuplicatePoints : 0.01;
                if (!Common.isArray(vertexSets[0])) {
                  vertexSets = [vertexSets];
                }
                for (v = 0; v < vertexSets.length; v += 1) {
                  vertices = vertexSets[v];
                  isConvex = Vertices.isConvex(vertices);
                  isConcave = !isConvex;
                  if (isConcave && !canDecomp) {
                    Common.warnOnce(
                      "Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."
                    );
                  }
                  if (isConvex || !canDecomp) {
                    if (isConvex) {
                      vertices = Vertices.clockwiseSort(vertices);
                    } else {
                      vertices = Vertices.hull(vertices);
                    }
                    parts.push({
                      position: { x, y },
                      vertices
                    });
                  } else {
                    var concave = vertices.map(function(vertex) {
                      return [vertex.x, vertex.y];
                    });
                    decomp.makeCCW(concave);
                    if (removeCollinear !== false)
                      decomp.removeCollinearPoints(concave, removeCollinear);
                    if (removeDuplicatePoints !== false && decomp.removeDuplicatePoints)
                      decomp.removeDuplicatePoints(concave, removeDuplicatePoints);
                    var decomposed = decomp.quickDecomp(concave);
                    for (i = 0; i < decomposed.length; i++) {
                      var chunk = decomposed[i];
                      var chunkVertices = chunk.map(function(vertices2) {
                        return {
                          x: vertices2[0],
                          y: vertices2[1]
                        };
                      });
                      if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                        continue;
                      parts.push({
                        position: Vertices.centre(chunkVertices),
                        vertices: chunkVertices
                      });
                    }
                  }
                }
                for (i = 0; i < parts.length; i++) {
                  parts[i] = Body2.create(Common.extend(parts[i], options));
                }
                if (flagInternal) {
                  var coincident_max_dist = 5;
                  for (i = 0; i < parts.length; i++) {
                    var partA = parts[i];
                    for (j = i + 1; j < parts.length; j++) {
                      var partB = parts[j];
                      if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                        var pav = partA.vertices, pbv = partB.vertices;
                        for (k = 0; k < partA.vertices.length; k++) {
                          for (z = 0; z < partB.vertices.length; z++) {
                            var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])), db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));
                            if (da < coincident_max_dist && db < coincident_max_dist) {
                              pav[k].isInternal = true;
                              pbv[z].isInternal = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (parts.length > 1) {
                  body = Body2.create(Common.extend({ parts: parts.slice(0) }, options));
                  Body2.setPosition(body, { x, y });
                  return body;
                } else {
                  return parts[0];
                }
              };
            })();
          }),
          /* 13 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Detector = {};
            module2.exports = Detector;
            var Common = __webpack_require__(0);
            var Collision = __webpack_require__(8);
            (function() {
              Detector.create = function(options) {
                var defaults = {
                  bodies: [],
                  collisions: [],
                  pairs: null
                };
                return Common.extend(defaults, options);
              };
              Detector.setBodies = function(detector, bodies) {
                detector.bodies = bodies.slice(0);
              };
              Detector.clear = function(detector) {
                detector.bodies = [];
                detector.collisions = [];
              };
              Detector.collisions = function(detector) {
                var pairs = detector.pairs, bodies = detector.bodies, bodiesLength = bodies.length, canCollide = Detector.canCollide, collides = Collision.collides, collisions = detector.collisions, collisionIndex = 0, i, j;
                bodies.sort(Detector._compareBoundsX);
                for (i = 0; i < bodiesLength; i++) {
                  var bodyA = bodies[i], boundsA = bodyA.bounds, boundXMax = bodyA.bounds.max.x, boundYMax = bodyA.bounds.max.y, boundYMin = bodyA.bounds.min.y, bodyAStatic = bodyA.isStatic || bodyA.isSleeping, partsALength = bodyA.parts.length, partsASingle = partsALength === 1;
                  for (j = i + 1; j < bodiesLength; j++) {
                    var bodyB = bodies[j], boundsB = bodyB.bounds;
                    if (boundsB.min.x > boundXMax) {
                      break;
                    }
                    if (boundYMax < boundsB.min.y || boundYMin > boundsB.max.y) {
                      continue;
                    }
                    if (bodyAStatic && (bodyB.isStatic || bodyB.isSleeping)) {
                      continue;
                    }
                    if (!canCollide(bodyA.collisionFilter, bodyB.collisionFilter)) {
                      continue;
                    }
                    var partsBLength = bodyB.parts.length;
                    if (partsASingle && partsBLength === 1) {
                      var collision = collides(bodyA, bodyB, pairs);
                      if (collision) {
                        collisions[collisionIndex++] = collision;
                      }
                    } else {
                      var partsAStart = partsALength > 1 ? 1 : 0, partsBStart = partsBLength > 1 ? 1 : 0;
                      for (var k = partsAStart; k < partsALength; k++) {
                        var partA = bodyA.parts[k], boundsA = partA.bounds;
                        for (var z = partsBStart; z < partsBLength; z++) {
                          var partB = bodyB.parts[z], boundsB = partB.bounds;
                          if (boundsA.min.x > boundsB.max.x || boundsA.max.x < boundsB.min.x || boundsA.max.y < boundsB.min.y || boundsA.min.y > boundsB.max.y) {
                            continue;
                          }
                          var collision = collides(partA, partB, pairs);
                          if (collision) {
                            collisions[collisionIndex++] = collision;
                          }
                        }
                      }
                    }
                  }
                }
                if (collisions.length !== collisionIndex) {
                  collisions.length = collisionIndex;
                }
                return collisions;
              };
              Detector.canCollide = function(filterA, filterB) {
                if (filterA.group === filterB.group && filterA.group !== 0)
                  return filterA.group > 0;
                return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
              };
              Detector._compareBoundsX = function(bodyA, bodyB) {
                return bodyA.bounds.min.x - bodyB.bounds.min.x;
              };
            })();
          }),
          /* 14 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Mouse = {};
            module2.exports = Mouse;
            var Common = __webpack_require__(0);
            (function() {
              Mouse.create = function(element) {
                var mouse = {};
                if (!element) {
                  Common.log("Mouse.create: element was undefined, defaulting to document.body", "warn");
                }
                mouse.element = element || document.body;
                mouse.absolute = { x: 0, y: 0 };
                mouse.position = { x: 0, y: 0 };
                mouse.mousedownPosition = { x: 0, y: 0 };
                mouse.mouseupPosition = { x: 0, y: 0 };
                mouse.offset = { x: 0, y: 0 };
                mouse.scale = { x: 1, y: 1 };
                mouse.wheelDelta = 0;
                mouse.button = -1;
                mouse.pixelRatio = parseInt(mouse.element.getAttribute("data-pixel-ratio"), 10) || 1;
                mouse.sourceEvents = {
                  mousemove: null,
                  mousedown: null,
                  mouseup: null,
                  mousewheel: null
                };
                mouse.mousemove = function(event) {
                  var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
                  if (touches) {
                    mouse.button = 0;
                    event.preventDefault();
                  }
                  mouse.absolute.x = position.x;
                  mouse.absolute.y = position.y;
                  mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                  mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                  mouse.sourceEvents.mousemove = event;
                };
                mouse.mousedown = function(event) {
                  var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
                  if (touches) {
                    mouse.button = 0;
                    event.preventDefault();
                  } else {
                    mouse.button = event.button;
                  }
                  mouse.absolute.x = position.x;
                  mouse.absolute.y = position.y;
                  mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                  mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                  mouse.mousedownPosition.x = mouse.position.x;
                  mouse.mousedownPosition.y = mouse.position.y;
                  mouse.sourceEvents.mousedown = event;
                };
                mouse.mouseup = function(event) {
                  var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio), touches = event.changedTouches;
                  if (touches) {
                    event.preventDefault();
                  }
                  mouse.button = -1;
                  mouse.absolute.x = position.x;
                  mouse.absolute.y = position.y;
                  mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                  mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                  mouse.mouseupPosition.x = mouse.position.x;
                  mouse.mouseupPosition.y = mouse.position.y;
                  mouse.sourceEvents.mouseup = event;
                };
                mouse.mousewheel = function(event) {
                  mouse.wheelDelta = Math7.max(-1, Math7.min(1, event.wheelDelta || -event.detail));
                  event.preventDefault();
                  mouse.sourceEvents.mousewheel = event;
                };
                Mouse.setElement(mouse, mouse.element);
                return mouse;
              };
              Mouse.setElement = function(mouse, element) {
                mouse.element = element;
                element.addEventListener("mousemove", mouse.mousemove, { passive: true });
                element.addEventListener("mousedown", mouse.mousedown, { passive: true });
                element.addEventListener("mouseup", mouse.mouseup, { passive: true });
                element.addEventListener("wheel", mouse.mousewheel, { passive: false });
                element.addEventListener("touchmove", mouse.mousemove, { passive: false });
                element.addEventListener("touchstart", mouse.mousedown, { passive: false });
                element.addEventListener("touchend", mouse.mouseup, { passive: false });
              };
              Mouse.clearSourceEvents = function(mouse) {
                mouse.sourceEvents.mousemove = null;
                mouse.sourceEvents.mousedown = null;
                mouse.sourceEvents.mouseup = null;
                mouse.sourceEvents.mousewheel = null;
                mouse.wheelDelta = 0;
              };
              Mouse.setOffset = function(mouse, offset) {
                mouse.offset.x = offset.x;
                mouse.offset.y = offset.y;
                mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              };
              Mouse.setScale = function(mouse, scale) {
                mouse.scale.x = scale.x;
                mouse.scale.y = scale.y;
                mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
              };
              Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
                var elementBounds = element.getBoundingClientRect(), rootNode = document.documentElement || document.body.parentNode || document.body, scrollX = window.pageXOffset !== void 0 ? window.pageXOffset : rootNode.scrollLeft, scrollY = window.pageYOffset !== void 0 ? window.pageYOffset : rootNode.scrollTop, touches = event.changedTouches, x, y;
                if (touches) {
                  x = touches[0].pageX - elementBounds.left - scrollX;
                  y = touches[0].pageY - elementBounds.top - scrollY;
                } else {
                  x = event.pageX - elementBounds.left - scrollX;
                  y = event.pageY - elementBounds.top - scrollY;
                }
                return {
                  x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
                  y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
                };
              };
            })();
          }),
          /* 15 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Plugin = {};
            module2.exports = Plugin;
            var Common = __webpack_require__(0);
            (function() {
              Plugin._registry = {};
              Plugin.register = function(plugin) {
                if (!Plugin.isPlugin(plugin)) {
                  Common.warn("Plugin.register:", Plugin.toString(plugin), "does not implement all required fields.");
                }
                if (plugin.name in Plugin._registry) {
                  var registered = Plugin._registry[plugin.name], pluginVersion = Plugin.versionParse(plugin.version).number, registeredVersion = Plugin.versionParse(registered.version).number;
                  if (pluginVersion > registeredVersion) {
                    Common.warn("Plugin.register:", Plugin.toString(registered), "was upgraded to", Plugin.toString(plugin));
                    Plugin._registry[plugin.name] = plugin;
                  } else if (pluginVersion < registeredVersion) {
                    Common.warn("Plugin.register:", Plugin.toString(registered), "can not be downgraded to", Plugin.toString(plugin));
                  } else if (plugin !== registered) {
                    Common.warn("Plugin.register:", Plugin.toString(plugin), "is already registered to different plugin object");
                  }
                } else {
                  Plugin._registry[plugin.name] = plugin;
                }
                return plugin;
              };
              Plugin.resolve = function(dependency) {
                return Plugin._registry[Plugin.dependencyParse(dependency).name];
              };
              Plugin.toString = function(plugin) {
                return typeof plugin === "string" ? plugin : (plugin.name || "anonymous") + "@" + (plugin.version || plugin.range || "0.0.0");
              };
              Plugin.isPlugin = function(obj) {
                return obj && obj.name && obj.version && obj.install;
              };
              Plugin.isUsed = function(module3, name) {
                return module3.used.indexOf(name) > -1;
              };
              Plugin.isFor = function(plugin, module3) {
                var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
                return !plugin.for || module3.name === parsed.name && Plugin.versionSatisfies(module3.version, parsed.range);
              };
              Plugin.use = function(module3, plugins) {
                module3.uses = (module3.uses || []).concat(plugins || []);
                if (module3.uses.length === 0) {
                  Common.warn("Plugin.use:", Plugin.toString(module3), "does not specify any dependencies to install.");
                  return;
                }
                var dependencies = Plugin.dependencies(module3), sortedDependencies = Common.topologicalSort(dependencies), status = [];
                for (var i = 0; i < sortedDependencies.length; i += 1) {
                  if (sortedDependencies[i] === module3.name) {
                    continue;
                  }
                  var plugin = Plugin.resolve(sortedDependencies[i]);
                  if (!plugin) {
                    status.push("\u274C " + sortedDependencies[i]);
                    continue;
                  }
                  if (Plugin.isUsed(module3, plugin.name)) {
                    continue;
                  }
                  if (!Plugin.isFor(plugin, module3)) {
                    Common.warn("Plugin.use:", Plugin.toString(plugin), "is for", plugin.for, "but installed on", Plugin.toString(module3) + ".");
                    plugin._warned = true;
                  }
                  if (plugin.install) {
                    plugin.install(module3);
                  } else {
                    Common.warn("Plugin.use:", Plugin.toString(plugin), "does not specify an install function.");
                    plugin._warned = true;
                  }
                  if (plugin._warned) {
                    status.push("\u{1F536} " + Plugin.toString(plugin));
                    delete plugin._warned;
                  } else {
                    status.push("\u2705 " + Plugin.toString(plugin));
                  }
                  module3.used.push(plugin.name);
                }
                if (status.length > 0) {
                  Common.info(status.join("  "));
                }
              };
              Plugin.dependencies = function(module3, tracked) {
                var parsedBase = Plugin.dependencyParse(module3), name = parsedBase.name;
                tracked = tracked || {};
                if (name in tracked) {
                  return;
                }
                module3 = Plugin.resolve(module3) || module3;
                tracked[name] = Common.map(module3.uses || [], function(dependency) {
                  if (Plugin.isPlugin(dependency)) {
                    Plugin.register(dependency);
                  }
                  var parsed = Plugin.dependencyParse(dependency), resolved = Plugin.resolve(dependency);
                  if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                    Common.warn(
                      "Plugin.dependencies:",
                      Plugin.toString(resolved),
                      "does not satisfy",
                      Plugin.toString(parsed),
                      "used by",
                      Plugin.toString(parsedBase) + "."
                    );
                    resolved._warned = true;
                    module3._warned = true;
                  } else if (!resolved) {
                    Common.warn(
                      "Plugin.dependencies:",
                      Plugin.toString(dependency),
                      "used by",
                      Plugin.toString(parsedBase),
                      "could not be resolved."
                    );
                    module3._warned = true;
                  }
                  return parsed.name;
                });
                for (var i = 0; i < tracked[name].length; i += 1) {
                  Plugin.dependencies(tracked[name][i], tracked);
                }
                return tracked;
              };
              Plugin.dependencyParse = function(dependency) {
                if (Common.isString(dependency)) {
                  var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;
                  if (!pattern.test(dependency)) {
                    Common.warn("Plugin.dependencyParse:", dependency, "is not a valid dependency string.");
                  }
                  return {
                    name: dependency.split("@")[0],
                    range: dependency.split("@")[1] || "*"
                  };
                }
                return {
                  name: dependency.name,
                  range: dependency.range || dependency.version
                };
              };
              Plugin.versionParse = function(range) {
                var pattern = /^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;
                if (!pattern.test(range)) {
                  Common.warn("Plugin.versionParse:", range, "is not a valid version or range.");
                }
                var parts = pattern.exec(range);
                var major = Number(parts[4]);
                var minor = Number(parts[5]);
                var patch = Number(parts[6]);
                return {
                  isRange: Boolean(parts[1] || parts[2]),
                  version: parts[3],
                  range,
                  operator: parts[1] || parts[2] || "",
                  major,
                  minor,
                  patch,
                  parts: [major, minor, patch],
                  prerelease: parts[7],
                  number: major * 1e8 + minor * 1e4 + patch
                };
              };
              Plugin.versionSatisfies = function(version, range) {
                range = range || "*";
                var r = Plugin.versionParse(range), v = Plugin.versionParse(version);
                if (r.isRange) {
                  if (r.operator === "*" || version === "*") {
                    return true;
                  }
                  if (r.operator === ">") {
                    return v.number > r.number;
                  }
                  if (r.operator === ">=") {
                    return v.number >= r.number;
                  }
                  if (r.operator === "~") {
                    return v.major === r.major && v.minor === r.minor && v.patch >= r.patch;
                  }
                  if (r.operator === "^") {
                    if (r.major > 0) {
                      return v.major === r.major && v.number >= r.number;
                    }
                    if (r.minor > 0) {
                      return v.minor === r.minor && v.patch >= r.patch;
                    }
                    return v.patch === r.patch;
                  }
                }
                return version === range || version === "*";
              };
            })();
          }),
          /* 16 */
          /***/
          (function(module2, exports2) {
            var Contact = {};
            module2.exports = Contact;
            (function() {
              Contact.create = function(vertex) {
                return {
                  vertex,
                  normalImpulse: 0,
                  tangentImpulse: 0
                };
              };
            })();
          }),
          /* 17 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Engine2 = {};
            module2.exports = Engine2;
            var Sleeping = __webpack_require__(7);
            var Resolver = __webpack_require__(18);
            var Detector = __webpack_require__(13);
            var Pairs = __webpack_require__(19);
            var Events2 = __webpack_require__(5);
            var Composite2 = __webpack_require__(6);
            var Constraint2 = __webpack_require__(10);
            var Common = __webpack_require__(0);
            var Body2 = __webpack_require__(4);
            (function() {
              Engine2._deltaMax = 1e3 / 60;
              Engine2.create = function(options) {
                options = options || {};
                var defaults = {
                  positionIterations: 6,
                  velocityIterations: 4,
                  constraintIterations: 2,
                  enableSleeping: false,
                  events: [],
                  plugin: {},
                  gravity: {
                    x: 0,
                    y: 1,
                    scale: 1e-3
                  },
                  timing: {
                    timestamp: 0,
                    timeScale: 1,
                    lastDelta: 0,
                    lastElapsed: 0,
                    lastUpdatesPerFrame: 0
                  }
                };
                var engine = Common.extend(defaults, options);
                engine.world = options.world || Composite2.create({ label: "World" });
                engine.pairs = options.pairs || Pairs.create();
                engine.detector = options.detector || Detector.create();
                engine.detector.pairs = engine.pairs;
                engine.grid = { buckets: [] };
                engine.world.gravity = engine.gravity;
                engine.broadphase = engine.grid;
                engine.metrics = {};
                return engine;
              };
              Engine2.update = function(engine, delta) {
                var startTime = Common.now();
                var world = engine.world, detector = engine.detector, pairs = engine.pairs, timing = engine.timing, timestamp = timing.timestamp, i;
                if (delta > Engine2._deltaMax) {
                  Common.warnOnce(
                    "Matter.Engine.update: delta argument is recommended to be less than or equal to",
                    Engine2._deltaMax.toFixed(3),
                    "ms."
                  );
                }
                delta = typeof delta !== "undefined" ? delta : Common._baseDelta;
                delta *= timing.timeScale;
                timing.timestamp += delta;
                timing.lastDelta = delta;
                var event = {
                  timestamp: timing.timestamp,
                  delta
                };
                Events2.trigger(engine, "beforeUpdate", event);
                var allBodies = Composite2.allBodies(world), allConstraints = Composite2.allConstraints(world);
                if (world.isModified) {
                  Detector.setBodies(detector, allBodies);
                  Composite2.setModified(world, false, false, true);
                }
                if (engine.enableSleeping)
                  Sleeping.update(allBodies, delta);
                Engine2._bodiesApplyGravity(allBodies, engine.gravity);
                if (delta > 0) {
                  Engine2._bodiesUpdate(allBodies, delta);
                }
                Events2.trigger(engine, "beforeSolve", event);
                Constraint2.preSolveAll(allBodies);
                for (i = 0; i < engine.constraintIterations; i++) {
                  Constraint2.solveAll(allConstraints, delta);
                }
                Constraint2.postSolveAll(allBodies);
                var collisions = Detector.collisions(detector);
                Pairs.update(pairs, collisions, timestamp);
                if (engine.enableSleeping)
                  Sleeping.afterCollisions(pairs.list);
                if (pairs.collisionStart.length > 0) {
                  Events2.trigger(engine, "collisionStart", {
                    pairs: pairs.collisionStart,
                    timestamp: timing.timestamp,
                    delta
                  });
                }
                var positionDamping = Common.clamp(20 / engine.positionIterations, 0, 1);
                Resolver.preSolvePosition(pairs.list);
                for (i = 0; i < engine.positionIterations; i++) {
                  Resolver.solvePosition(pairs.list, delta, positionDamping);
                }
                Resolver.postSolvePosition(allBodies);
                Constraint2.preSolveAll(allBodies);
                for (i = 0; i < engine.constraintIterations; i++) {
                  Constraint2.solveAll(allConstraints, delta);
                }
                Constraint2.postSolveAll(allBodies);
                Resolver.preSolveVelocity(pairs.list);
                for (i = 0; i < engine.velocityIterations; i++) {
                  Resolver.solveVelocity(pairs.list, delta);
                }
                Engine2._bodiesUpdateVelocities(allBodies);
                if (pairs.collisionActive.length > 0) {
                  Events2.trigger(engine, "collisionActive", {
                    pairs: pairs.collisionActive,
                    timestamp: timing.timestamp,
                    delta
                  });
                }
                if (pairs.collisionEnd.length > 0) {
                  Events2.trigger(engine, "collisionEnd", {
                    pairs: pairs.collisionEnd,
                    timestamp: timing.timestamp,
                    delta
                  });
                }
                Engine2._bodiesClearForces(allBodies);
                Events2.trigger(engine, "afterUpdate", event);
                engine.timing.lastElapsed = Common.now() - startTime;
                return engine;
              };
              Engine2.merge = function(engineA, engineB) {
                Common.extend(engineA, engineB);
                if (engineB.world) {
                  engineA.world = engineB.world;
                  Engine2.clear(engineA);
                  var bodies = Composite2.allBodies(engineA.world);
                  for (var i = 0; i < bodies.length; i++) {
                    var body = bodies[i];
                    Sleeping.set(body, false);
                    body.id = Common.nextId();
                  }
                }
              };
              Engine2.clear = function(engine) {
                Pairs.clear(engine.pairs);
                Detector.clear(engine.detector);
              };
              Engine2._bodiesClearForces = function(bodies) {
                var bodiesLength = bodies.length;
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i];
                  body.force.x = 0;
                  body.force.y = 0;
                  body.torque = 0;
                }
              };
              Engine2._bodiesApplyGravity = function(bodies, gravity) {
                var gravityScale = typeof gravity.scale !== "undefined" ? gravity.scale : 1e-3, bodiesLength = bodies.length;
                if (gravity.x === 0 && gravity.y === 0 || gravityScale === 0) {
                  return;
                }
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i];
                  if (body.isStatic || body.isSleeping)
                    continue;
                  body.force.y += body.mass * gravity.y * gravityScale;
                  body.force.x += body.mass * gravity.x * gravityScale;
                }
              };
              Engine2._bodiesUpdate = function(bodies, delta) {
                var bodiesLength = bodies.length;
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i];
                  if (body.isStatic || body.isSleeping)
                    continue;
                  Body2.update(body, delta);
                }
              };
              Engine2._bodiesUpdateVelocities = function(bodies) {
                var bodiesLength = bodies.length;
                for (var i = 0; i < bodiesLength; i++) {
                  Body2.updateVelocities(bodies[i]);
                }
              };
            })();
          }),
          /* 18 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Resolver = {};
            module2.exports = Resolver;
            var Vertices = __webpack_require__(3);
            var Common = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            (function() {
              Resolver._restingThresh = 2;
              Resolver._restingThreshTangent = Math7.sqrt(6);
              Resolver._positionDampen = 0.9;
              Resolver._positionWarming = 0.8;
              Resolver._frictionNormalMultiplier = 5;
              Resolver._frictionMaxStatic = Number.MAX_VALUE;
              Resolver.preSolvePosition = function(pairs) {
                var i, pair, contactCount, pairsLength = pairs.length;
                for (i = 0; i < pairsLength; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  contactCount = pair.contactCount;
                  pair.collision.parentA.totalContacts += contactCount;
                  pair.collision.parentB.totalContacts += contactCount;
                }
              };
              Resolver.solvePosition = function(pairs, delta, damping) {
                var i, pair, collision, bodyA, bodyB, normal, contactShare, positionImpulse, positionDampen = Resolver._positionDampen * (damping || 1), slopDampen = Common.clamp(delta / Common._baseDelta, 0, 1), pairsLength = pairs.length;
                for (i = 0; i < pairsLength; i++) {
                  pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  collision = pair.collision;
                  bodyA = collision.parentA;
                  bodyB = collision.parentB;
                  normal = collision.normal;
                  pair.separation = collision.depth + normal.x * (bodyB.positionImpulse.x - bodyA.positionImpulse.x) + normal.y * (bodyB.positionImpulse.y - bodyA.positionImpulse.y);
                }
                for (i = 0; i < pairsLength; i++) {
                  pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  collision = pair.collision;
                  bodyA = collision.parentA;
                  bodyB = collision.parentB;
                  normal = collision.normal;
                  positionImpulse = pair.separation - pair.slop * slopDampen;
                  if (bodyA.isStatic || bodyB.isStatic)
                    positionImpulse *= 2;
                  if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    contactShare = positionDampen / bodyA.totalContacts;
                    bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                    bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
                  }
                  if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    contactShare = positionDampen / bodyB.totalContacts;
                    bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                    bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
                  }
                }
              };
              Resolver.postSolvePosition = function(bodies) {
                var positionWarming = Resolver._positionWarming, bodiesLength = bodies.length, verticesTranslate = Vertices.translate, boundsUpdate = Bounds.update;
                for (var i = 0; i < bodiesLength; i++) {
                  var body = bodies[i], positionImpulse = body.positionImpulse, positionImpulseX = positionImpulse.x, positionImpulseY = positionImpulse.y, velocity = body.velocity;
                  body.totalContacts = 0;
                  if (positionImpulseX !== 0 || positionImpulseY !== 0) {
                    for (var j = 0; j < body.parts.length; j++) {
                      var part = body.parts[j];
                      verticesTranslate(part.vertices, positionImpulse);
                      boundsUpdate(part.bounds, part.vertices, velocity);
                      part.position.x += positionImpulseX;
                      part.position.y += positionImpulseY;
                    }
                    body.positionPrev.x += positionImpulseX;
                    body.positionPrev.y += positionImpulseY;
                    if (positionImpulseX * velocity.x + positionImpulseY * velocity.y < 0) {
                      positionImpulse.x = 0;
                      positionImpulse.y = 0;
                    } else {
                      positionImpulse.x *= positionWarming;
                      positionImpulse.y *= positionWarming;
                    }
                  }
                }
              };
              Resolver.preSolveVelocity = function(pairs) {
                var pairsLength = pairs.length, i, j;
                for (i = 0; i < pairsLength; i++) {
                  var pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  var contacts = pair.contacts, contactCount = pair.contactCount, collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, normal = collision.normal, tangent = collision.tangent;
                  for (j = 0; j < contactCount; j++) {
                    var contact = contacts[j], contactVertex = contact.vertex, normalImpulse = contact.normalImpulse, tangentImpulse = contact.tangentImpulse;
                    if (normalImpulse !== 0 || tangentImpulse !== 0) {
                      var impulseX = normal.x * normalImpulse + tangent.x * tangentImpulse, impulseY = normal.y * normalImpulse + tangent.y * tangentImpulse;
                      if (!(bodyA.isStatic || bodyA.isSleeping)) {
                        bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                        bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                        bodyA.anglePrev += bodyA.inverseInertia * ((contactVertex.x - bodyA.position.x) * impulseY - (contactVertex.y - bodyA.position.y) * impulseX);
                      }
                      if (!(bodyB.isStatic || bodyB.isSleeping)) {
                        bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                        bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                        bodyB.anglePrev -= bodyB.inverseInertia * ((contactVertex.x - bodyB.position.x) * impulseY - (contactVertex.y - bodyB.position.y) * impulseX);
                      }
                    }
                  }
                }
              };
              Resolver.solveVelocity = function(pairs, delta) {
                var timeScale = delta / Common._baseDelta, timeScaleSquared = timeScale * timeScale, timeScaleCubed = timeScaleSquared * timeScale, restingThresh = -Resolver._restingThresh * timeScale, restingThreshTangent = Resolver._restingThreshTangent, frictionNormalMultiplier = Resolver._frictionNormalMultiplier * timeScale, frictionMaxStatic = Resolver._frictionMaxStatic, pairsLength = pairs.length, tangentImpulse, maxFriction, i, j;
                for (i = 0; i < pairsLength; i++) {
                  var pair = pairs[i];
                  if (!pair.isActive || pair.isSensor)
                    continue;
                  var collision = pair.collision, bodyA = collision.parentA, bodyB = collision.parentB, normalX = collision.normal.x, normalY = collision.normal.y, tangentX = collision.tangent.x, tangentY = collision.tangent.y, inverseMassTotal = pair.inverseMass, friction = pair.friction * pair.frictionStatic * frictionNormalMultiplier, contacts = pair.contacts, contactCount = pair.contactCount, contactShare = 1 / contactCount;
                  var bodyAVelocityX = bodyA.position.x - bodyA.positionPrev.x, bodyAVelocityY = bodyA.position.y - bodyA.positionPrev.y, bodyAAngularVelocity = bodyA.angle - bodyA.anglePrev, bodyBVelocityX = bodyB.position.x - bodyB.positionPrev.x, bodyBVelocityY = bodyB.position.y - bodyB.positionPrev.y, bodyBAngularVelocity = bodyB.angle - bodyB.anglePrev;
                  for (j = 0; j < contactCount; j++) {
                    var contact = contacts[j], contactVertex = contact.vertex;
                    var offsetAX = contactVertex.x - bodyA.position.x, offsetAY = contactVertex.y - bodyA.position.y, offsetBX = contactVertex.x - bodyB.position.x, offsetBY = contactVertex.y - bodyB.position.y;
                    var velocityPointAX = bodyAVelocityX - offsetAY * bodyAAngularVelocity, velocityPointAY = bodyAVelocityY + offsetAX * bodyAAngularVelocity, velocityPointBX = bodyBVelocityX - offsetBY * bodyBAngularVelocity, velocityPointBY = bodyBVelocityY + offsetBX * bodyBAngularVelocity;
                    var relativeVelocityX = velocityPointAX - velocityPointBX, relativeVelocityY = velocityPointAY - velocityPointBY;
                    var normalVelocity = normalX * relativeVelocityX + normalY * relativeVelocityY, tangentVelocity = tangentX * relativeVelocityX + tangentY * relativeVelocityY;
                    var normalOverlap = pair.separation + normalVelocity;
                    var normalForce = Math7.min(normalOverlap, 1);
                    normalForce = normalOverlap < 0 ? 0 : normalForce;
                    var frictionLimit = normalForce * friction;
                    if (tangentVelocity < -frictionLimit || tangentVelocity > frictionLimit) {
                      maxFriction = tangentVelocity > 0 ? tangentVelocity : -tangentVelocity;
                      tangentImpulse = pair.friction * (tangentVelocity > 0 ? 1 : -1) * timeScaleCubed;
                      if (tangentImpulse < -maxFriction) {
                        tangentImpulse = -maxFriction;
                      } else if (tangentImpulse > maxFriction) {
                        tangentImpulse = maxFriction;
                      }
                    } else {
                      tangentImpulse = tangentVelocity;
                      maxFriction = frictionMaxStatic;
                    }
                    var oAcN = offsetAX * normalY - offsetAY * normalX, oBcN = offsetBX * normalY - offsetBY * normalX, share = contactShare / (inverseMassTotal + bodyA.inverseInertia * oAcN * oAcN + bodyB.inverseInertia * oBcN * oBcN);
                    var normalImpulse = (1 + pair.restitution) * normalVelocity * share;
                    tangentImpulse *= share;
                    if (normalVelocity < restingThresh) {
                      contact.normalImpulse = 0;
                    } else {
                      var contactNormalImpulse = contact.normalImpulse;
                      contact.normalImpulse += normalImpulse;
                      if (contact.normalImpulse > 0) contact.normalImpulse = 0;
                      normalImpulse = contact.normalImpulse - contactNormalImpulse;
                    }
                    if (tangentVelocity < -restingThreshTangent || tangentVelocity > restingThreshTangent) {
                      contact.tangentImpulse = 0;
                    } else {
                      var contactTangentImpulse = contact.tangentImpulse;
                      contact.tangentImpulse += tangentImpulse;
                      if (contact.tangentImpulse < -maxFriction) contact.tangentImpulse = -maxFriction;
                      if (contact.tangentImpulse > maxFriction) contact.tangentImpulse = maxFriction;
                      tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                    }
                    var impulseX = normalX * normalImpulse + tangentX * tangentImpulse, impulseY = normalY * normalImpulse + tangentY * tangentImpulse;
                    if (!(bodyA.isStatic || bodyA.isSleeping)) {
                      bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                      bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                      bodyA.anglePrev += (offsetAX * impulseY - offsetAY * impulseX) * bodyA.inverseInertia;
                    }
                    if (!(bodyB.isStatic || bodyB.isSleeping)) {
                      bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                      bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                      bodyB.anglePrev -= (offsetBX * impulseY - offsetBY * impulseX) * bodyB.inverseInertia;
                    }
                  }
                }
              };
            })();
          }),
          /* 19 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Pairs = {};
            module2.exports = Pairs;
            var Pair = __webpack_require__(9);
            var Common = __webpack_require__(0);
            (function() {
              Pairs.create = function(options) {
                return Common.extend({
                  table: {},
                  list: [],
                  collisionStart: [],
                  collisionActive: [],
                  collisionEnd: []
                }, options);
              };
              Pairs.update = function(pairs, collisions, timestamp) {
                var pairUpdate = Pair.update, pairCreate = Pair.create, pairSetActive = Pair.setActive, pairsTable = pairs.table, pairsList = pairs.list, pairsListLength = pairsList.length, pairsListIndex = pairsListLength, collisionStart = pairs.collisionStart, collisionEnd = pairs.collisionEnd, collisionActive = pairs.collisionActive, collisionsLength = collisions.length, collisionStartIndex = 0, collisionEndIndex = 0, collisionActiveIndex = 0, collision, pair, i;
                for (i = 0; i < collisionsLength; i++) {
                  collision = collisions[i];
                  pair = collision.pair;
                  if (pair) {
                    if (pair.isActive) {
                      collisionActive[collisionActiveIndex++] = pair;
                    }
                    pairUpdate(pair, collision, timestamp);
                  } else {
                    pair = pairCreate(collision, timestamp);
                    pairsTable[pair.id] = pair;
                    collisionStart[collisionStartIndex++] = pair;
                    pairsList[pairsListIndex++] = pair;
                  }
                }
                pairsListIndex = 0;
                pairsListLength = pairsList.length;
                for (i = 0; i < pairsListLength; i++) {
                  pair = pairsList[i];
                  if (pair.timeUpdated >= timestamp) {
                    pairsList[pairsListIndex++] = pair;
                  } else {
                    pairSetActive(pair, false, timestamp);
                    if (pair.collision.bodyA.sleepCounter > 0 && pair.collision.bodyB.sleepCounter > 0) {
                      pairsList[pairsListIndex++] = pair;
                    } else {
                      collisionEnd[collisionEndIndex++] = pair;
                      delete pairsTable[pair.id];
                    }
                  }
                }
                if (pairsList.length !== pairsListIndex) {
                  pairsList.length = pairsListIndex;
                }
                if (collisionStart.length !== collisionStartIndex) {
                  collisionStart.length = collisionStartIndex;
                }
                if (collisionEnd.length !== collisionEndIndex) {
                  collisionEnd.length = collisionEndIndex;
                }
                if (collisionActive.length !== collisionActiveIndex) {
                  collisionActive.length = collisionActiveIndex;
                }
              };
              Pairs.clear = function(pairs) {
                pairs.table = {};
                pairs.list.length = 0;
                pairs.collisionStart.length = 0;
                pairs.collisionActive.length = 0;
                pairs.collisionEnd.length = 0;
                return pairs;
              };
            })();
          }),
          /* 20 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Matter2 = module2.exports = __webpack_require__(21);
            Matter2.Axes = __webpack_require__(11);
            Matter2.Bodies = __webpack_require__(12);
            Matter2.Body = __webpack_require__(4);
            Matter2.Bounds = __webpack_require__(1);
            Matter2.Collision = __webpack_require__(8);
            Matter2.Common = __webpack_require__(0);
            Matter2.Composite = __webpack_require__(6);
            Matter2.Composites = __webpack_require__(22);
            Matter2.Constraint = __webpack_require__(10);
            Matter2.Contact = __webpack_require__(16);
            Matter2.Detector = __webpack_require__(13);
            Matter2.Engine = __webpack_require__(17);
            Matter2.Events = __webpack_require__(5);
            Matter2.Grid = __webpack_require__(23);
            Matter2.Mouse = __webpack_require__(14);
            Matter2.MouseConstraint = __webpack_require__(24);
            Matter2.Pair = __webpack_require__(9);
            Matter2.Pairs = __webpack_require__(19);
            Matter2.Plugin = __webpack_require__(15);
            Matter2.Query = __webpack_require__(25);
            Matter2.Render = __webpack_require__(26);
            Matter2.Resolver = __webpack_require__(18);
            Matter2.Runner = __webpack_require__(27);
            Matter2.SAT = __webpack_require__(28);
            Matter2.Sleeping = __webpack_require__(7);
            Matter2.Svg = __webpack_require__(29);
            Matter2.Vector = __webpack_require__(2);
            Matter2.Vertices = __webpack_require__(3);
            Matter2.World = __webpack_require__(30);
            Matter2.Engine.run = Matter2.Runner.run;
            Matter2.Common.deprecated(Matter2.Engine, "run", "Engine.run \u27A4 use Matter.Runner.run(engine) instead");
          }),
          /* 21 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Matter2 = {};
            module2.exports = Matter2;
            var Plugin = __webpack_require__(15);
            var Common = __webpack_require__(0);
            (function() {
              Matter2.name = "matter-js";
              Matter2.version = true ? "0.20.0" : void 0;
              Matter2.uses = [];
              Matter2.used = [];
              Matter2.use = function() {
                Plugin.use(Matter2, Array.prototype.slice.call(arguments));
              };
              Matter2.before = function(path, func) {
                path = path.replace(/^Matter./, "");
                return Common.chainPathBefore(Matter2, path, func);
              };
              Matter2.after = function(path, func) {
                path = path.replace(/^Matter./, "");
                return Common.chainPathAfter(Matter2, path, func);
              };
            })();
          }),
          /* 22 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Composites = {};
            module2.exports = Composites;
            var Composite2 = __webpack_require__(6);
            var Constraint2 = __webpack_require__(10);
            var Common = __webpack_require__(0);
            var Body2 = __webpack_require__(4);
            var Bodies2 = __webpack_require__(12);
            var deprecated = Common.deprecated;
            (function() {
              Composites.stack = function(x, y, columns, rows, columnGap, rowGap, callback) {
                var stack = Composite2.create({ label: "Stack" }), currentX = x, currentY = y, lastBody, i = 0;
                for (var row = 0; row < rows; row++) {
                  var maxHeight = 0;
                  for (var column = 0; column < columns; column++) {
                    var body = callback(currentX, currentY, column, row, lastBody, i);
                    if (body) {
                      var bodyHeight = body.bounds.max.y - body.bounds.min.y, bodyWidth = body.bounds.max.x - body.bounds.min.x;
                      if (bodyHeight > maxHeight)
                        maxHeight = bodyHeight;
                      Body2.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });
                      currentX = body.bounds.max.x + columnGap;
                      Composite2.addBody(stack, body);
                      lastBody = body;
                      i += 1;
                    } else {
                      currentX += columnGap;
                    }
                  }
                  currentY += maxHeight + rowGap;
                  currentX = x;
                }
                return stack;
              };
              Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
                var bodies = composite.bodies;
                for (var i = 1; i < bodies.length; i++) {
                  var bodyA = bodies[i - 1], bodyB = bodies[i], bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y, bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y, bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
                  var defaults = {
                    bodyA,
                    pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                    bodyB,
                    pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
                  };
                  var constraint = Common.extend(defaults, options);
                  Composite2.addConstraint(composite, Constraint2.create(constraint));
                }
                composite.label += " Chain";
                return composite;
              };
              Composites.mesh = function(composite, columns, rows, crossBrace, options) {
                var bodies = composite.bodies, row, col, bodyA, bodyB, bodyC;
                for (row = 0; row < rows; row++) {
                  for (col = 1; col < columns; col++) {
                    bodyA = bodies[col - 1 + row * columns];
                    bodyB = bodies[col + row * columns];
                    Composite2.addConstraint(composite, Constraint2.create(Common.extend({ bodyA, bodyB }, options)));
                  }
                  if (row > 0) {
                    for (col = 0; col < columns; col++) {
                      bodyA = bodies[col + (row - 1) * columns];
                      bodyB = bodies[col + row * columns];
                      Composite2.addConstraint(composite, Constraint2.create(Common.extend({ bodyA, bodyB }, options)));
                      if (crossBrace && col > 0) {
                        bodyC = bodies[col - 1 + (row - 1) * columns];
                        Composite2.addConstraint(composite, Constraint2.create(Common.extend({ bodyA: bodyC, bodyB }, options)));
                      }
                      if (crossBrace && col < columns - 1) {
                        bodyC = bodies[col + 1 + (row - 1) * columns];
                        Composite2.addConstraint(composite, Constraint2.create(Common.extend({ bodyA: bodyC, bodyB }, options)));
                      }
                    }
                  }
                }
                composite.label += " Mesh";
                return composite;
              };
              Composites.pyramid = function(x, y, columns, rows, columnGap, rowGap, callback) {
                return Composites.stack(x, y, columns, rows, columnGap, rowGap, function(stackX, stackY, column, row, lastBody, i) {
                  var actualRows = Math7.min(rows, Math7.ceil(columns / 2)), lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
                  if (row > actualRows)
                    return;
                  row = actualRows - row;
                  var start = row, end = columns - 1 - row;
                  if (column < start || column > end)
                    return;
                  if (i === 1) {
                    Body2.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
                  }
                  var xOffset = lastBody ? column * lastBodyWidth : 0;
                  return callback(x + xOffset + column * columnGap, stackY, column, row, lastBody, i);
                });
              };
              Composites.newtonsCradle = function(x, y, number, size, length) {
                var newtonsCradle = Composite2.create({ label: "Newtons Cradle" });
                for (var i = 0; i < number; i++) {
                  var separation = 1.9, circle = Bodies2.circle(
                    x + i * (size * separation),
                    y + length,
                    size,
                    { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 1e-4, slop: 1 }
                  ), constraint = Constraint2.create({ pointA: { x: x + i * (size * separation), y }, bodyB: circle });
                  Composite2.addBody(newtonsCradle, circle);
                  Composite2.addConstraint(newtonsCradle, constraint);
                }
                return newtonsCradle;
              };
              deprecated(Composites, "newtonsCradle", "Composites.newtonsCradle \u27A4 moved to newtonsCradle example");
              Composites.car = function(x, y, width, height, wheelSize) {
                var group = Body2.nextGroup(true), wheelBase = 20, wheelAOffset = -width * 0.5 + wheelBase, wheelBOffset = width * 0.5 - wheelBase, wheelYOffset = 0;
                var car = Composite2.create({ label: "Car" }), body = Bodies2.rectangle(x, y, width, height, {
                  collisionFilter: {
                    group
                  },
                  chamfer: {
                    radius: height * 0.5
                  },
                  density: 2e-4
                });
                var wheelA = Bodies2.circle(x + wheelAOffset, y + wheelYOffset, wheelSize, {
                  collisionFilter: {
                    group
                  },
                  friction: 0.8
                });
                var wheelB = Bodies2.circle(x + wheelBOffset, y + wheelYOffset, wheelSize, {
                  collisionFilter: {
                    group
                  },
                  friction: 0.8
                });
                var axelA = Constraint2.create({
                  bodyB: body,
                  pointB: { x: wheelAOffset, y: wheelYOffset },
                  bodyA: wheelA,
                  stiffness: 1,
                  length: 0
                });
                var axelB = Constraint2.create({
                  bodyB: body,
                  pointB: { x: wheelBOffset, y: wheelYOffset },
                  bodyA: wheelB,
                  stiffness: 1,
                  length: 0
                });
                Composite2.addBody(car, body);
                Composite2.addBody(car, wheelA);
                Composite2.addBody(car, wheelB);
                Composite2.addConstraint(car, axelA);
                Composite2.addConstraint(car, axelB);
                return car;
              };
              deprecated(Composites, "car", "Composites.car \u27A4 moved to car example");
              Composites.softBody = function(x, y, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
                particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
                constraintOptions = Common.extend({ stiffness: 0.2, render: { type: "line", anchors: false } }, constraintOptions);
                var softBody = Composites.stack(x, y, columns, rows, columnGap, rowGap, function(stackX, stackY) {
                  return Bodies2.circle(stackX, stackY, particleRadius, particleOptions);
                });
                Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
                softBody.label = "Soft Body";
                return softBody;
              };
              deprecated(Composites, "softBody", "Composites.softBody \u27A4 moved to softBody and cloth examples");
            })();
          }),
          /* 23 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Grid = {};
            module2.exports = Grid;
            var Pair = __webpack_require__(9);
            var Common = __webpack_require__(0);
            var deprecated = Common.deprecated;
            (function() {
              Grid.create = function(options) {
                var defaults = {
                  buckets: {},
                  pairs: {},
                  pairsList: [],
                  bucketWidth: 48,
                  bucketHeight: 48
                };
                return Common.extend(defaults, options);
              };
              Grid.update = function(grid, bodies, engine, forceUpdate) {
                var i, col, row, world = engine.world, buckets = grid.buckets, bucket, bucketId, gridChanged = false;
                for (i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (body.isSleeping && !forceUpdate)
                    continue;
                  if (world.bounds && (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y))
                    continue;
                  var newRegion = Grid._getRegion(grid, body);
                  if (!body.region || newRegion.id !== body.region.id || forceUpdate) {
                    if (!body.region || forceUpdate)
                      body.region = newRegion;
                    var union = Grid._regionUnion(newRegion, body.region);
                    for (col = union.startCol; col <= union.endCol; col++) {
                      for (row = union.startRow; row <= union.endRow; row++) {
                        bucketId = Grid._getBucketId(col, row);
                        bucket = buckets[bucketId];
                        var isInsideNewRegion = col >= newRegion.startCol && col <= newRegion.endCol && row >= newRegion.startRow && row <= newRegion.endRow;
                        var isInsideOldRegion = col >= body.region.startCol && col <= body.region.endCol && row >= body.region.startRow && row <= body.region.endRow;
                        if (!isInsideNewRegion && isInsideOldRegion) {
                          if (isInsideOldRegion) {
                            if (bucket)
                              Grid._bucketRemoveBody(grid, bucket, body);
                          }
                        }
                        if (body.region === newRegion || isInsideNewRegion && !isInsideOldRegion || forceUpdate) {
                          if (!bucket)
                            bucket = Grid._createBucket(buckets, bucketId);
                          Grid._bucketAddBody(grid, bucket, body);
                        }
                      }
                    }
                    body.region = newRegion;
                    gridChanged = true;
                  }
                }
                if (gridChanged)
                  grid.pairsList = Grid._createActivePairsList(grid);
              };
              deprecated(Grid, "update", "Grid.update \u27A4 replaced by Matter.Detector");
              Grid.clear = function(grid) {
                grid.buckets = {};
                grid.pairs = {};
                grid.pairsList = [];
              };
              deprecated(Grid, "clear", "Grid.clear \u27A4 replaced by Matter.Detector");
              Grid._regionUnion = function(regionA, regionB) {
                var startCol = Math7.min(regionA.startCol, regionB.startCol), endCol = Math7.max(regionA.endCol, regionB.endCol), startRow = Math7.min(regionA.startRow, regionB.startRow), endRow = Math7.max(regionA.endRow, regionB.endRow);
                return Grid._createRegion(startCol, endCol, startRow, endRow);
              };
              Grid._getRegion = function(grid, body) {
                var bounds = body.bounds, startCol = Math7.floor(bounds.min.x / grid.bucketWidth), endCol = Math7.floor(bounds.max.x / grid.bucketWidth), startRow = Math7.floor(bounds.min.y / grid.bucketHeight), endRow = Math7.floor(bounds.max.y / grid.bucketHeight);
                return Grid._createRegion(startCol, endCol, startRow, endRow);
              };
              Grid._createRegion = function(startCol, endCol, startRow, endRow) {
                return {
                  id: startCol + "," + endCol + "," + startRow + "," + endRow,
                  startCol,
                  endCol,
                  startRow,
                  endRow
                };
              };
              Grid._getBucketId = function(column, row) {
                return "C" + column + "R" + row;
              };
              Grid._createBucket = function(buckets, bucketId) {
                var bucket = buckets[bucketId] = [];
                return bucket;
              };
              Grid._bucketAddBody = function(grid, bucket, body) {
                var gridPairs = grid.pairs, pairId = Pair.id, bucketLength = bucket.length, i;
                for (i = 0; i < bucketLength; i++) {
                  var bodyB = bucket[i];
                  if (body.id === bodyB.id || body.isStatic && bodyB.isStatic)
                    continue;
                  var id = pairId(body, bodyB), pair = gridPairs[id];
                  if (pair) {
                    pair[2] += 1;
                  } else {
                    gridPairs[id] = [body, bodyB, 1];
                  }
                }
                bucket.push(body);
              };
              Grid._bucketRemoveBody = function(grid, bucket, body) {
                var gridPairs = grid.pairs, pairId = Pair.id, i;
                bucket.splice(Common.indexOf(bucket, body), 1);
                var bucketLength = bucket.length;
                for (i = 0; i < bucketLength; i++) {
                  var pair = gridPairs[pairId(body, bucket[i])];
                  if (pair)
                    pair[2] -= 1;
                }
              };
              Grid._createActivePairsList = function(grid) {
                var pair, gridPairs = grid.pairs, pairKeys = Common.keys(gridPairs), pairKeysLength = pairKeys.length, pairs = [], k;
                for (k = 0; k < pairKeysLength; k++) {
                  pair = gridPairs[pairKeys[k]];
                  if (pair[2] > 0) {
                    pairs.push(pair);
                  } else {
                    delete gridPairs[pairKeys[k]];
                  }
                }
                return pairs;
              };
            })();
          }),
          /* 24 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var MouseConstraint = {};
            module2.exports = MouseConstraint;
            var Vertices = __webpack_require__(3);
            var Sleeping = __webpack_require__(7);
            var Mouse = __webpack_require__(14);
            var Events2 = __webpack_require__(5);
            var Detector = __webpack_require__(13);
            var Constraint2 = __webpack_require__(10);
            var Composite2 = __webpack_require__(6);
            var Common = __webpack_require__(0);
            var Bounds = __webpack_require__(1);
            (function() {
              MouseConstraint.create = function(engine, options) {
                var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);
                if (!mouse) {
                  if (engine && engine.render && engine.render.canvas) {
                    mouse = Mouse.create(engine.render.canvas);
                  } else if (options && options.element) {
                    mouse = Mouse.create(options.element);
                  } else {
                    mouse = Mouse.create();
                    Common.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected");
                  }
                }
                var constraint = Constraint2.create({
                  label: "Mouse Constraint",
                  pointA: mouse.position,
                  pointB: { x: 0, y: 0 },
                  length: 0.01,
                  stiffness: 0.1,
                  angularStiffness: 1,
                  render: {
                    strokeStyle: "#90EE90",
                    lineWidth: 3
                  }
                });
                var defaults = {
                  type: "mouseConstraint",
                  mouse,
                  element: null,
                  body: null,
                  constraint,
                  collisionFilter: {
                    category: 1,
                    mask: 4294967295,
                    group: 0
                  }
                };
                var mouseConstraint = Common.extend(defaults, options);
                Events2.on(engine, "beforeUpdate", function() {
                  var allBodies = Composite2.allBodies(engine.world);
                  MouseConstraint.update(mouseConstraint, allBodies);
                  MouseConstraint._triggerEvents(mouseConstraint);
                });
                return mouseConstraint;
              };
              MouseConstraint.update = function(mouseConstraint, bodies) {
                var mouse = mouseConstraint.mouse, constraint = mouseConstraint.constraint, body = mouseConstraint.body;
                if (mouse.button === 0) {
                  if (!constraint.bodyB) {
                    for (var i = 0; i < bodies.length; i++) {
                      body = bodies[i];
                      if (Bounds.contains(body.bounds, mouse.position) && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                        for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                          var part = body.parts[j];
                          if (Vertices.contains(part.vertices, mouse.position)) {
                            constraint.pointA = mouse.position;
                            constraint.bodyB = mouseConstraint.body = body;
                            constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                            constraint.angleB = body.angle;
                            Sleeping.set(body, false);
                            Events2.trigger(mouseConstraint, "startdrag", { mouse, body });
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    Sleeping.set(constraint.bodyB, false);
                    constraint.pointA = mouse.position;
                  }
                } else {
                  constraint.bodyB = mouseConstraint.body = null;
                  constraint.pointB = null;
                  if (body)
                    Events2.trigger(mouseConstraint, "enddrag", { mouse, body });
                }
              };
              MouseConstraint._triggerEvents = function(mouseConstraint) {
                var mouse = mouseConstraint.mouse, mouseEvents = mouse.sourceEvents;
                if (mouseEvents.mousemove)
                  Events2.trigger(mouseConstraint, "mousemove", { mouse });
                if (mouseEvents.mousedown)
                  Events2.trigger(mouseConstraint, "mousedown", { mouse });
                if (mouseEvents.mouseup)
                  Events2.trigger(mouseConstraint, "mouseup", { mouse });
                Mouse.clearSourceEvents(mouse);
              };
            })();
          }),
          /* 25 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Query = {};
            module2.exports = Query;
            var Vector = __webpack_require__(2);
            var Collision = __webpack_require__(8);
            var Bounds = __webpack_require__(1);
            var Bodies2 = __webpack_require__(12);
            var Vertices = __webpack_require__(3);
            (function() {
              Query.collides = function(body, bodies) {
                var collisions = [], bodiesLength = bodies.length, bounds = body.bounds, collides = Collision.collides, overlaps = Bounds.overlaps;
                for (var i = 0; i < bodiesLength; i++) {
                  var bodyA = bodies[i], partsALength = bodyA.parts.length, partsAStart = partsALength === 1 ? 0 : 1;
                  if (overlaps(bodyA.bounds, bounds)) {
                    for (var j = partsAStart; j < partsALength; j++) {
                      var part = bodyA.parts[j];
                      if (overlaps(part.bounds, bounds)) {
                        var collision = collides(part, body);
                        if (collision) {
                          collisions.push(collision);
                          break;
                        }
                      }
                    }
                  }
                }
                return collisions;
              };
              Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
                rayWidth = rayWidth || 1e-100;
                var rayAngle = Vector.angle(startPoint, endPoint), rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)), rayX = (endPoint.x + startPoint.x) * 0.5, rayY = (endPoint.y + startPoint.y) * 0.5, ray = Bodies2.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }), collisions = Query.collides(ray, bodies);
                for (var i = 0; i < collisions.length; i += 1) {
                  var collision = collisions[i];
                  collision.body = collision.bodyB = collision.bodyA;
                }
                return collisions;
              };
              Query.region = function(bodies, bounds, outside) {
                var result = [];
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i], overlaps = Bounds.overlaps(body.bounds, bounds);
                  if (overlaps && !outside || !overlaps && outside)
                    result.push(body);
                }
                return result;
              };
              Query.point = function(bodies, point) {
                var result = [];
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (Bounds.contains(body.bounds, point)) {
                    for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                      var part = body.parts[j];
                      if (Bounds.contains(part.bounds, point) && Vertices.contains(part.vertices, point)) {
                        result.push(body);
                        break;
                      }
                    }
                  }
                }
                return result;
              };
            })();
          }),
          /* 26 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Render = {};
            module2.exports = Render;
            var Body2 = __webpack_require__(4);
            var Common = __webpack_require__(0);
            var Composite2 = __webpack_require__(6);
            var Bounds = __webpack_require__(1);
            var Events2 = __webpack_require__(5);
            var Vector = __webpack_require__(2);
            var Mouse = __webpack_require__(14);
            (function() {
              var _requestAnimationFrame, _cancelAnimationFrame;
              if (typeof window !== "undefined") {
                _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                  window.setTimeout(function() {
                    callback(Common.now());
                  }, 1e3 / 60);
                };
                _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
              }
              Render._goodFps = 30;
              Render._goodDelta = 1e3 / 60;
              Render.create = function(options) {
                var defaults = {
                  engine: null,
                  element: null,
                  canvas: null,
                  mouse: null,
                  frameRequestId: null,
                  timing: {
                    historySize: 60,
                    delta: 0,
                    deltaHistory: [],
                    lastTime: 0,
                    lastTimestamp: 0,
                    lastElapsed: 0,
                    timestampElapsed: 0,
                    timestampElapsedHistory: [],
                    engineDeltaHistory: [],
                    engineElapsedHistory: [],
                    engineUpdatesHistory: [],
                    elapsedHistory: []
                  },
                  options: {
                    width: 800,
                    height: 600,
                    pixelRatio: 1,
                    background: "#14151f",
                    wireframeBackground: "#14151f",
                    wireframeStrokeStyle: "#bbb",
                    hasBounds: !!options.bounds,
                    enabled: true,
                    wireframes: true,
                    showSleeping: true,
                    showDebug: false,
                    showStats: false,
                    showPerformance: false,
                    showBounds: false,
                    showVelocity: false,
                    showCollisions: false,
                    showSeparations: false,
                    showAxes: false,
                    showPositions: false,
                    showAngleIndicator: false,
                    showIds: false,
                    showVertexNumbers: false,
                    showConvexHulls: false,
                    showInternalEdges: false,
                    showMousePosition: false
                  }
                };
                var render = Common.extend(defaults, options);
                if (render.canvas) {
                  render.canvas.width = render.options.width || render.canvas.width;
                  render.canvas.height = render.options.height || render.canvas.height;
                }
                render.mouse = options.mouse;
                render.engine = options.engine;
                render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
                render.context = render.canvas.getContext("2d");
                render.textures = {};
                render.bounds = render.bounds || {
                  min: {
                    x: 0,
                    y: 0
                  },
                  max: {
                    x: render.canvas.width,
                    y: render.canvas.height
                  }
                };
                render.controller = Render;
                render.options.showBroadphase = false;
                if (render.options.pixelRatio !== 1) {
                  Render.setPixelRatio(render, render.options.pixelRatio);
                }
                if (Common.isElement(render.element)) {
                  render.element.appendChild(render.canvas);
                }
                return render;
              };
              Render.run = function(render) {
                (/* @__PURE__ */ __name((function loop(time) {
                  render.frameRequestId = _requestAnimationFrame(loop);
                  _updateTiming(render, time);
                  Render.world(render, time);
                  render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
                  if (render.options.showStats || render.options.showDebug) {
                    Render.stats(render, render.context, time);
                  }
                  if (render.options.showPerformance || render.options.showDebug) {
                    Render.performance(render, render.context, time);
                  }
                  render.context.setTransform(1, 0, 0, 1, 0, 0);
                }), "loop"))();
              };
              Render.stop = function(render) {
                _cancelAnimationFrame(render.frameRequestId);
              };
              Render.setPixelRatio = function(render, pixelRatio) {
                var options = render.options, canvas = render.canvas;
                if (pixelRatio === "auto") {
                  pixelRatio = _getPixelRatio(canvas);
                }
                options.pixelRatio = pixelRatio;
                canvas.setAttribute("data-pixel-ratio", pixelRatio);
                canvas.width = options.width * pixelRatio;
                canvas.height = options.height * pixelRatio;
                canvas.style.width = options.width + "px";
                canvas.style.height = options.height + "px";
              };
              Render.setSize = function(render, width, height) {
                render.options.width = width;
                render.options.height = height;
                render.bounds.max.x = render.bounds.min.x + width;
                render.bounds.max.y = render.bounds.min.y + height;
                if (render.options.pixelRatio !== 1) {
                  Render.setPixelRatio(render, render.options.pixelRatio);
                } else {
                  render.canvas.width = width;
                  render.canvas.height = height;
                }
              };
              Render.lookAt = function(render, objects, padding, center) {
                center = typeof center !== "undefined" ? center : true;
                objects = Common.isArray(objects) ? objects : [objects];
                padding = padding || {
                  x: 0,
                  y: 0
                };
                var bounds = {
                  min: { x: Infinity, y: Infinity },
                  max: { x: -Infinity, y: -Infinity }
                };
                for (var i = 0; i < objects.length; i += 1) {
                  var object = objects[i], min = object.bounds ? object.bounds.min : object.min || object.position || object, max = object.bounds ? object.bounds.max : object.max || object.position || object;
                  if (min && max) {
                    if (min.x < bounds.min.x)
                      bounds.min.x = min.x;
                    if (max.x > bounds.max.x)
                      bounds.max.x = max.x;
                    if (min.y < bounds.min.y)
                      bounds.min.y = min.y;
                    if (max.y > bounds.max.y)
                      bounds.max.y = max.y;
                  }
                }
                var width = bounds.max.x - bounds.min.x + 2 * padding.x, height = bounds.max.y - bounds.min.y + 2 * padding.y, viewHeight = render.canvas.height, viewWidth = render.canvas.width, outerRatio = viewWidth / viewHeight, innerRatio = width / height, scaleX = 1, scaleY = 1;
                if (innerRatio > outerRatio) {
                  scaleY = innerRatio / outerRatio;
                } else {
                  scaleX = outerRatio / innerRatio;
                }
                render.options.hasBounds = true;
                render.bounds.min.x = bounds.min.x;
                render.bounds.max.x = bounds.min.x + width * scaleX;
                render.bounds.min.y = bounds.min.y;
                render.bounds.max.y = bounds.min.y + height * scaleY;
                if (center) {
                  render.bounds.min.x += width * 0.5 - width * scaleX * 0.5;
                  render.bounds.max.x += width * 0.5 - width * scaleX * 0.5;
                  render.bounds.min.y += height * 0.5 - height * scaleY * 0.5;
                  render.bounds.max.y += height * 0.5 - height * scaleY * 0.5;
                }
                render.bounds.min.x -= padding.x;
                render.bounds.max.x -= padding.x;
                render.bounds.min.y -= padding.y;
                render.bounds.max.y -= padding.y;
                if (render.mouse) {
                  Mouse.setScale(render.mouse, {
                    x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                    y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
                  });
                  Mouse.setOffset(render.mouse, render.bounds.min);
                }
              };
              Render.startViewTransform = function(render) {
                var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
                render.context.setTransform(
                  render.options.pixelRatio / boundsScaleX,
                  0,
                  0,
                  render.options.pixelRatio / boundsScaleY,
                  0,
                  0
                );
                render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
              };
              Render.endViewTransform = function(render) {
                render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
              };
              Render.world = function(render, time) {
                var startTime = Common.now(), engine = render.engine, world = engine.world, canvas = render.canvas, context = render.context, options = render.options, timing = render.timing;
                var allBodies = Composite2.allBodies(world), allConstraints = Composite2.allConstraints(world), background = options.wireframes ? options.wireframeBackground : options.background, bodies = [], constraints = [], i;
                var event = {
                  timestamp: engine.timing.timestamp
                };
                Events2.trigger(render, "beforeRender", event);
                if (render.currentBackground !== background)
                  _applyBackground(render, background);
                context.globalCompositeOperation = "source-in";
                context.fillStyle = "transparent";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.globalCompositeOperation = "source-over";
                if (options.hasBounds) {
                  for (i = 0; i < allBodies.length; i++) {
                    var body = allBodies[i];
                    if (Bounds.overlaps(body.bounds, render.bounds))
                      bodies.push(body);
                  }
                  for (i = 0; i < allConstraints.length; i++) {
                    var constraint = allConstraints[i], bodyA = constraint.bodyA, bodyB = constraint.bodyB, pointAWorld = constraint.pointA, pointBWorld = constraint.pointB;
                    if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                    if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);
                    if (!pointAWorld || !pointBWorld)
                      continue;
                    if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                      constraints.push(constraint);
                  }
                  Render.startViewTransform(render);
                  if (render.mouse) {
                    Mouse.setScale(render.mouse, {
                      x: (render.bounds.max.x - render.bounds.min.x) / render.options.width,
                      y: (render.bounds.max.y - render.bounds.min.y) / render.options.height
                    });
                    Mouse.setOffset(render.mouse, render.bounds.min);
                  }
                } else {
                  constraints = allConstraints;
                  bodies = allBodies;
                  if (render.options.pixelRatio !== 1) {
                    render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
                  }
                }
                if (!options.wireframes || engine.enableSleeping && options.showSleeping) {
                  Render.bodies(render, bodies, context);
                } else {
                  if (options.showConvexHulls)
                    Render.bodyConvexHulls(render, bodies, context);
                  Render.bodyWireframes(render, bodies, context);
                }
                if (options.showBounds)
                  Render.bodyBounds(render, bodies, context);
                if (options.showAxes || options.showAngleIndicator)
                  Render.bodyAxes(render, bodies, context);
                if (options.showPositions)
                  Render.bodyPositions(render, bodies, context);
                if (options.showVelocity)
                  Render.bodyVelocity(render, bodies, context);
                if (options.showIds)
                  Render.bodyIds(render, bodies, context);
                if (options.showSeparations)
                  Render.separations(render, engine.pairs.list, context);
                if (options.showCollisions)
                  Render.collisions(render, engine.pairs.list, context);
                if (options.showVertexNumbers)
                  Render.vertexNumbers(render, bodies, context);
                if (options.showMousePosition)
                  Render.mousePosition(render, render.mouse, context);
                Render.constraints(constraints, context);
                if (options.hasBounds) {
                  Render.endViewTransform(render);
                }
                Events2.trigger(render, "afterRender", event);
                timing.lastElapsed = Common.now() - startTime;
              };
              Render.stats = function(render, context, time) {
                var engine = render.engine, world = engine.world, bodies = Composite2.allBodies(world), parts = 0, width = 55, height = 44, x = 0, y = 0;
                for (var i = 0; i < bodies.length; i += 1) {
                  parts += bodies[i].parts.length;
                }
                var sections = {
                  "Part": parts,
                  "Body": bodies.length,
                  "Cons": Composite2.allConstraints(world).length,
                  "Comp": Composite2.allComposites(world).length,
                  "Pair": engine.pairs.list.length
                };
                context.fillStyle = "#0e0f19";
                context.fillRect(x, y, width * 5.5, height);
                context.font = "12px Arial";
                context.textBaseline = "top";
                context.textAlign = "right";
                for (var key in sections) {
                  var section = sections[key];
                  context.fillStyle = "#aaa";
                  context.fillText(key, x + width, y + 8);
                  context.fillStyle = "#eee";
                  context.fillText(section, x + width, y + 26);
                  x += width;
                }
              };
              Render.performance = function(render, context) {
                var engine = render.engine, timing = render.timing, deltaHistory = timing.deltaHistory, elapsedHistory = timing.elapsedHistory, timestampElapsedHistory = timing.timestampElapsedHistory, engineDeltaHistory = timing.engineDeltaHistory, engineUpdatesHistory = timing.engineUpdatesHistory, engineElapsedHistory = timing.engineElapsedHistory, lastEngineUpdatesPerFrame = engine.timing.lastUpdatesPerFrame, lastEngineDelta = engine.timing.lastDelta;
                var deltaMean = _mean(deltaHistory), elapsedMean = _mean(elapsedHistory), engineDeltaMean = _mean(engineDeltaHistory), engineUpdatesMean = _mean(engineUpdatesHistory), engineElapsedMean = _mean(engineElapsedHistory), timestampElapsedMean = _mean(timestampElapsedHistory), rateMean = timestampElapsedMean / deltaMean || 0, neededUpdatesPerFrame = Math7.round(deltaMean / lastEngineDelta), fps = 1e3 / deltaMean || 0;
                var graphHeight = 4, gap = 12, width = 60, height = 34, x = 10, y = 69;
                context.fillStyle = "#0e0f19";
                context.fillRect(0, 50, gap * 5 + width * 6 + 22, height);
                Render.status(
                  context,
                  x,
                  y,
                  width,
                  graphHeight,
                  deltaHistory.length,
                  Math7.round(fps) + " fps",
                  fps / Render._goodFps,
                  function(i) {
                    return deltaHistory[i] / deltaMean - 1;
                  }
                );
                Render.status(
                  context,
                  x + gap + width,
                  y,
                  width,
                  graphHeight,
                  engineDeltaHistory.length,
                  lastEngineDelta.toFixed(2) + " dt",
                  Render._goodDelta / lastEngineDelta,
                  function(i) {
                    return engineDeltaHistory[i] / engineDeltaMean - 1;
                  }
                );
                Render.status(
                  context,
                  x + (gap + width) * 2,
                  y,
                  width,
                  graphHeight,
                  engineUpdatesHistory.length,
                  lastEngineUpdatesPerFrame + " upf",
                  Math7.pow(Common.clamp(engineUpdatesMean / neededUpdatesPerFrame || 1, 0, 1), 4),
                  function(i) {
                    return engineUpdatesHistory[i] / engineUpdatesMean - 1;
                  }
                );
                Render.status(
                  context,
                  x + (gap + width) * 3,
                  y,
                  width,
                  graphHeight,
                  engineElapsedHistory.length,
                  engineElapsedMean.toFixed(2) + " ut",
                  1 - lastEngineUpdatesPerFrame * engineElapsedMean / Render._goodFps,
                  function(i) {
                    return engineElapsedHistory[i] / engineElapsedMean - 1;
                  }
                );
                Render.status(
                  context,
                  x + (gap + width) * 4,
                  y,
                  width,
                  graphHeight,
                  elapsedHistory.length,
                  elapsedMean.toFixed(2) + " rt",
                  1 - elapsedMean / Render._goodFps,
                  function(i) {
                    return elapsedHistory[i] / elapsedMean - 1;
                  }
                );
                Render.status(
                  context,
                  x + (gap + width) * 5,
                  y,
                  width,
                  graphHeight,
                  timestampElapsedHistory.length,
                  rateMean.toFixed(2) + " x",
                  rateMean * rateMean * rateMean,
                  function(i) {
                    return (timestampElapsedHistory[i] / deltaHistory[i] / rateMean || 0) - 1;
                  }
                );
              };
              Render.status = function(context, x, y, width, height, count, label, indicator, plotY) {
                context.strokeStyle = "#888";
                context.fillStyle = "#444";
                context.lineWidth = 1;
                context.fillRect(x, y + 7, width, 1);
                context.beginPath();
                context.moveTo(x, y + 7 - height * Common.clamp(0.4 * plotY(0), -2, 2));
                for (var i = 0; i < width; i += 1) {
                  context.lineTo(x + i, y + 7 - (i < count ? height * Common.clamp(0.4 * plotY(i), -2, 2) : 0));
                }
                context.stroke();
                context.fillStyle = "hsl(" + Common.clamp(25 + 95 * indicator, 0, 120) + ",100%,60%)";
                context.fillRect(x, y - 7, 4, 4);
                context.font = "12px Arial";
                context.textBaseline = "middle";
                context.textAlign = "right";
                context.fillStyle = "#eee";
                context.fillText(label, x + width, y - 5);
              };
              Render.constraints = function(constraints, context) {
                var c = context;
                for (var i = 0; i < constraints.length; i++) {
                  var constraint = constraints[i];
                  if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                    continue;
                  var bodyA = constraint.bodyA, bodyB = constraint.bodyB, start, end;
                  if (bodyA) {
                    start = Vector.add(bodyA.position, constraint.pointA);
                  } else {
                    start = constraint.pointA;
                  }
                  if (constraint.render.type === "pin") {
                    c.beginPath();
                    c.arc(start.x, start.y, 3, 0, 2 * Math7.PI);
                    c.closePath();
                  } else {
                    if (bodyB) {
                      end = Vector.add(bodyB.position, constraint.pointB);
                    } else {
                      end = constraint.pointB;
                    }
                    c.beginPath();
                    c.moveTo(start.x, start.y);
                    if (constraint.render.type === "spring") {
                      var delta = Vector.sub(end, start), normal = Vector.perp(Vector.normalise(delta)), coils = Math7.ceil(Common.clamp(constraint.length / 5, 12, 20)), offset;
                      for (var j = 1; j < coils; j += 1) {
                        offset = j % 2 === 0 ? 1 : -1;
                        c.lineTo(
                          start.x + delta.x * (j / coils) + normal.x * offset * 4,
                          start.y + delta.y * (j / coils) + normal.y * offset * 4
                        );
                      }
                    }
                    c.lineTo(end.x, end.y);
                  }
                  if (constraint.render.lineWidth) {
                    c.lineWidth = constraint.render.lineWidth;
                    c.strokeStyle = constraint.render.strokeStyle;
                    c.stroke();
                  }
                  if (constraint.render.anchors) {
                    c.fillStyle = constraint.render.strokeStyle;
                    c.beginPath();
                    c.arc(start.x, start.y, 3, 0, 2 * Math7.PI);
                    c.arc(end.x, end.y, 3, 0, 2 * Math7.PI);
                    c.closePath();
                    c.fill();
                  }
                }
              };
              Render.bodies = function(render, bodies, context) {
                var c = context, engine = render.engine, options = render.options, showInternalEdges = options.showInternalEdges || !options.wireframes, body, part, i, k;
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                    part = body.parts[k];
                    if (!part.render.visible)
                      continue;
                    if (options.showSleeping && body.isSleeping) {
                      c.globalAlpha = 0.5 * part.render.opacity;
                    } else if (part.render.opacity !== 1) {
                      c.globalAlpha = part.render.opacity;
                    }
                    if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                      var sprite = part.render.sprite, texture = _getTexture(render, sprite.texture);
                      c.translate(part.position.x, part.position.y);
                      c.rotate(part.angle);
                      c.drawImage(
                        texture,
                        texture.width * -sprite.xOffset * sprite.xScale,
                        texture.height * -sprite.yOffset * sprite.yScale,
                        texture.width * sprite.xScale,
                        texture.height * sprite.yScale
                      );
                      c.rotate(-part.angle);
                      c.translate(-part.position.x, -part.position.y);
                    } else {
                      if (part.circleRadius) {
                        c.beginPath();
                        c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math7.PI);
                      } else {
                        c.beginPath();
                        c.moveTo(part.vertices[0].x, part.vertices[0].y);
                        for (var j = 1; j < part.vertices.length; j++) {
                          if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                            c.lineTo(part.vertices[j].x, part.vertices[j].y);
                          } else {
                            c.moveTo(part.vertices[j].x, part.vertices[j].y);
                          }
                          if (part.vertices[j].isInternal && !showInternalEdges) {
                            c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                          }
                        }
                        c.lineTo(part.vertices[0].x, part.vertices[0].y);
                        c.closePath();
                      }
                      if (!options.wireframes) {
                        c.fillStyle = part.render.fillStyle;
                        if (part.render.lineWidth) {
                          c.lineWidth = part.render.lineWidth;
                          c.strokeStyle = part.render.strokeStyle;
                          c.stroke();
                        }
                        c.fill();
                      } else {
                        c.lineWidth = 1;
                        c.strokeStyle = render.options.wireframeStrokeStyle;
                        c.stroke();
                      }
                    }
                    c.globalAlpha = 1;
                  }
                }
              };
              Render.bodyWireframes = function(render, bodies, context) {
                var c = context, showInternalEdges = render.options.showInternalEdges, body, part, i, j, k;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                    part = body.parts[k];
                    c.moveTo(part.vertices[0].x, part.vertices[0].y);
                    for (j = 1; j < part.vertices.length; j++) {
                      if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                      } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                      }
                      if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                      }
                    }
                    c.lineTo(part.vertices[0].x, part.vertices[0].y);
                  }
                }
                c.lineWidth = 1;
                c.strokeStyle = render.options.wireframeStrokeStyle;
                c.stroke();
              };
              Render.bodyConvexHulls = function(render, bodies, context) {
                var c = context, body, part, i, j, k;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible || body.parts.length === 1)
                    continue;
                  c.moveTo(body.vertices[0].x, body.vertices[0].y);
                  for (j = 1; j < body.vertices.length; j++) {
                    c.lineTo(body.vertices[j].x, body.vertices[j].y);
                  }
                  c.lineTo(body.vertices[0].x, body.vertices[0].y);
                }
                c.lineWidth = 1;
                c.strokeStyle = "rgba(255,255,255,0.2)";
                c.stroke();
              };
              Render.vertexNumbers = function(render, bodies, context) {
                var c = context, i, j, k;
                for (i = 0; i < bodies.length; i++) {
                  var parts = bodies[i].parts;
                  for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                    var part = parts[k];
                    for (j = 0; j < part.vertices.length; j++) {
                      c.fillStyle = "rgba(255,255,255,0.2)";
                      c.fillText(i + "_" + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                    }
                  }
                }
              };
              Render.mousePosition = function(render, mouse, context) {
                var c = context;
                c.fillStyle = "rgba(255,255,255,0.8)";
                c.fillText(mouse.position.x + "  " + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
              };
              Render.bodyBounds = function(render, bodies, context) {
                var c = context, engine = render.engine, options = render.options;
                c.beginPath();
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (body.render.visible) {
                    var parts = bodies[i].parts;
                    for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                      var part = parts[j];
                      c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                    }
                  }
                }
                if (options.wireframes) {
                  c.strokeStyle = "rgba(255,255,255,0.08)";
                } else {
                  c.strokeStyle = "rgba(0,0,0,0.1)";
                }
                c.lineWidth = 1;
                c.stroke();
              };
              Render.bodyAxes = function(render, bodies, context) {
                var c = context, engine = render.engine, options = render.options, part, i, j, k;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  var body = bodies[i], parts = body.parts;
                  if (!body.render.visible)
                    continue;
                  if (options.showAxes) {
                    for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                      part = parts[j];
                      for (k = 0; k < part.axes.length; k++) {
                        var axis = part.axes[k];
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                      }
                    }
                  } else {
                    for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                      part = parts[j];
                      for (k = 0; k < part.axes.length; k++) {
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo(
                          (part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2,
                          (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2
                        );
                      }
                    }
                  }
                }
                if (options.wireframes) {
                  c.strokeStyle = "indianred";
                  c.lineWidth = 1;
                } else {
                  c.strokeStyle = "rgba(255, 255, 255, 0.4)";
                  c.globalCompositeOperation = "overlay";
                  c.lineWidth = 2;
                }
                c.stroke();
                c.globalCompositeOperation = "source-over";
              };
              Render.bodyPositions = function(render, bodies, context) {
                var c = context, engine = render.engine, options = render.options, body, part, i, k;
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  for (k = 0; k < body.parts.length; k++) {
                    part = body.parts[k];
                    c.arc(part.position.x, part.position.y, 3, 0, 2 * Math7.PI, false);
                    c.closePath();
                  }
                }
                if (options.wireframes) {
                  c.fillStyle = "indianred";
                } else {
                  c.fillStyle = "rgba(0,0,0,0.5)";
                }
                c.fill();
                c.beginPath();
                for (i = 0; i < bodies.length; i++) {
                  body = bodies[i];
                  if (body.render.visible) {
                    c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math7.PI, false);
                    c.closePath();
                  }
                }
                c.fillStyle = "rgba(255,165,0,0.8)";
                c.fill();
              };
              Render.bodyVelocity = function(render, bodies, context) {
                var c = context;
                c.beginPath();
                for (var i = 0; i < bodies.length; i++) {
                  var body = bodies[i];
                  if (!body.render.visible)
                    continue;
                  var velocity = Body2.getVelocity(body);
                  c.moveTo(body.position.x, body.position.y);
                  c.lineTo(body.position.x + velocity.x, body.position.y + velocity.y);
                }
                c.lineWidth = 3;
                c.strokeStyle = "cornflowerblue";
                c.stroke();
              };
              Render.bodyIds = function(render, bodies, context) {
                var c = context, i, j;
                for (i = 0; i < bodies.length; i++) {
                  if (!bodies[i].render.visible)
                    continue;
                  var parts = bodies[i].parts;
                  for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    var part = parts[j];
                    c.font = "12px Arial";
                    c.fillStyle = "rgba(255,255,255,0.5)";
                    c.fillText(part.id, part.position.x + 10, part.position.y - 10);
                  }
                }
              };
              Render.collisions = function(render, pairs, context) {
                var c = context, options = render.options, pair, collision, corrected, bodyA, bodyB, i, j;
                c.beginPath();
                for (i = 0; i < pairs.length; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  collision = pair.collision;
                  for (j = 0; j < pair.contactCount; j++) {
                    var contact = pair.contacts[j], vertex = contact.vertex;
                    c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
                  }
                }
                if (options.wireframes) {
                  c.fillStyle = "rgba(255,255,255,0.7)";
                } else {
                  c.fillStyle = "orange";
                }
                c.fill();
                c.beginPath();
                for (i = 0; i < pairs.length; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  collision = pair.collision;
                  if (pair.contactCount > 0) {
                    var normalPosX = pair.contacts[0].vertex.x, normalPosY = pair.contacts[0].vertex.y;
                    if (pair.contactCount === 2) {
                      normalPosX = (pair.contacts[0].vertex.x + pair.contacts[1].vertex.x) / 2;
                      normalPosY = (pair.contacts[0].vertex.y + pair.contacts[1].vertex.y) / 2;
                    }
                    if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                      c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                    } else {
                      c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                    }
                    c.lineTo(normalPosX, normalPosY);
                  }
                }
                if (options.wireframes) {
                  c.strokeStyle = "rgba(255,165,0,0.7)";
                } else {
                  c.strokeStyle = "orange";
                }
                c.lineWidth = 1;
                c.stroke();
              };
              Render.separations = function(render, pairs, context) {
                var c = context, options = render.options, pair, collision, corrected, bodyA, bodyB, i, j;
                c.beginPath();
                for (i = 0; i < pairs.length; i++) {
                  pair = pairs[i];
                  if (!pair.isActive)
                    continue;
                  collision = pair.collision;
                  bodyA = collision.bodyA;
                  bodyB = collision.bodyB;
                  var k = 1;
                  if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
                  if (bodyB.isStatic) k = 0;
                  c.moveTo(bodyB.position.x, bodyB.position.y);
                  c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);
                  k = 1;
                  if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
                  if (bodyA.isStatic) k = 0;
                  c.moveTo(bodyA.position.x, bodyA.position.y);
                  c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
                }
                if (options.wireframes) {
                  c.strokeStyle = "rgba(255,165,0,0.5)";
                } else {
                  c.strokeStyle = "orange";
                }
                c.stroke();
              };
              Render.inspector = function(inspector, context) {
                var engine = inspector.engine, selected = inspector.selected, render = inspector.render, options = render.options, bounds;
                if (options.hasBounds) {
                  var boundsWidth = render.bounds.max.x - render.bounds.min.x, boundsHeight = render.bounds.max.y - render.bounds.min.y, boundsScaleX = boundsWidth / render.options.width, boundsScaleY = boundsHeight / render.options.height;
                  context.scale(1 / boundsScaleX, 1 / boundsScaleY);
                  context.translate(-render.bounds.min.x, -render.bounds.min.y);
                }
                for (var i = 0; i < selected.length; i++) {
                  var item = selected[i].data;
                  context.translate(0.5, 0.5);
                  context.lineWidth = 1;
                  context.strokeStyle = "rgba(255,165,0,0.9)";
                  context.setLineDash([1, 2]);
                  switch (item.type) {
                    case "body":
                      bounds = item.bounds;
                      context.beginPath();
                      context.rect(
                        Math7.floor(bounds.min.x - 3),
                        Math7.floor(bounds.min.y - 3),
                        Math7.floor(bounds.max.x - bounds.min.x + 6),
                        Math7.floor(bounds.max.y - bounds.min.y + 6)
                      );
                      context.closePath();
                      context.stroke();
                      break;
                    case "constraint":
                      var point = item.pointA;
                      if (item.bodyA)
                        point = item.pointB;
                      context.beginPath();
                      context.arc(point.x, point.y, 10, 0, 2 * Math7.PI);
                      context.closePath();
                      context.stroke();
                      break;
                  }
                  context.setLineDash([]);
                  context.translate(-0.5, -0.5);
                }
                if (inspector.selectStart !== null) {
                  context.translate(0.5, 0.5);
                  context.lineWidth = 1;
                  context.strokeStyle = "rgba(255,165,0,0.6)";
                  context.fillStyle = "rgba(255,165,0,0.1)";
                  bounds = inspector.selectBounds;
                  context.beginPath();
                  context.rect(
                    Math7.floor(bounds.min.x),
                    Math7.floor(bounds.min.y),
                    Math7.floor(bounds.max.x - bounds.min.x),
                    Math7.floor(bounds.max.y - bounds.min.y)
                  );
                  context.closePath();
                  context.stroke();
                  context.fill();
                  context.translate(-0.5, -0.5);
                }
                if (options.hasBounds)
                  context.setTransform(1, 0, 0, 1, 0, 0);
              };
              var _updateTiming = /* @__PURE__ */ __name(function(render, time) {
                var engine = render.engine, timing = render.timing, historySize = timing.historySize, timestamp = engine.timing.timestamp;
                timing.delta = time - timing.lastTime || Render._goodDelta;
                timing.lastTime = time;
                timing.timestampElapsed = timestamp - timing.lastTimestamp || 0;
                timing.lastTimestamp = timestamp;
                timing.deltaHistory.unshift(timing.delta);
                timing.deltaHistory.length = Math7.min(timing.deltaHistory.length, historySize);
                timing.engineDeltaHistory.unshift(engine.timing.lastDelta);
                timing.engineDeltaHistory.length = Math7.min(timing.engineDeltaHistory.length, historySize);
                timing.timestampElapsedHistory.unshift(timing.timestampElapsed);
                timing.timestampElapsedHistory.length = Math7.min(timing.timestampElapsedHistory.length, historySize);
                timing.engineUpdatesHistory.unshift(engine.timing.lastUpdatesPerFrame);
                timing.engineUpdatesHistory.length = Math7.min(timing.engineUpdatesHistory.length, historySize);
                timing.engineElapsedHistory.unshift(engine.timing.lastElapsed);
                timing.engineElapsedHistory.length = Math7.min(timing.engineElapsedHistory.length, historySize);
                timing.elapsedHistory.unshift(timing.lastElapsed);
                timing.elapsedHistory.length = Math7.min(timing.elapsedHistory.length, historySize);
              }, "_updateTiming");
              var _mean = /* @__PURE__ */ __name(function(values) {
                var result = 0;
                for (var i = 0; i < values.length; i += 1) {
                  result += values[i];
                }
                return result / values.length || 0;
              }, "_mean");
              var _createCanvas = /* @__PURE__ */ __name(function(width, height) {
                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.oncontextmenu = function() {
                  return false;
                };
                canvas.onselectstart = function() {
                  return false;
                };
                return canvas;
              }, "_createCanvas");
              var _getPixelRatio = /* @__PURE__ */ __name(function(canvas) {
                var context = canvas.getContext("2d"), devicePixelRatio = window.devicePixelRatio || 1, backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
                return devicePixelRatio / backingStorePixelRatio;
              }, "_getPixelRatio");
              var _getTexture = /* @__PURE__ */ __name(function(render, imagePath) {
                var image = render.textures[imagePath];
                if (image)
                  return image;
                image = render.textures[imagePath] = new Image();
                image.src = imagePath;
                return image;
              }, "_getTexture");
              var _applyBackground = /* @__PURE__ */ __name(function(render, background) {
                var cssBackground = background;
                if (/(jpg|gif|png)$/.test(background))
                  cssBackground = "url(" + background + ")";
                render.canvas.style.background = cssBackground;
                render.canvas.style.backgroundSize = "contain";
                render.currentBackground = background;
              }, "_applyBackground");
            })();
          }),
          /* 27 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Runner = {};
            module2.exports = Runner;
            var Events2 = __webpack_require__(5);
            var Engine2 = __webpack_require__(17);
            var Common = __webpack_require__(0);
            (function() {
              Runner._maxFrameDelta = 1e3 / 15;
              Runner._frameDeltaFallback = 1e3 / 60;
              Runner._timeBufferMargin = 1.5;
              Runner._elapsedNextEstimate = 1;
              Runner._smoothingLowerBound = 0.1;
              Runner._smoothingUpperBound = 0.9;
              Runner.create = function(options) {
                var defaults = {
                  delta: 1e3 / 60,
                  frameDelta: null,
                  frameDeltaSmoothing: true,
                  frameDeltaSnapping: true,
                  frameDeltaHistory: [],
                  frameDeltaHistorySize: 100,
                  frameRequestId: null,
                  timeBuffer: 0,
                  timeLastTick: null,
                  maxUpdates: null,
                  maxFrameTime: 1e3 / 30,
                  lastUpdatesDeferred: 0,
                  enabled: true
                };
                var runner = Common.extend(defaults, options);
                runner.fps = 0;
                return runner;
              };
              Runner.run = function(runner, engine) {
                runner.timeBuffer = Runner._frameDeltaFallback;
                (/* @__PURE__ */ __name((function onFrame(time) {
                  runner.frameRequestId = Runner._onNextFrame(runner, onFrame);
                  if (time && runner.enabled) {
                    Runner.tick(runner, engine, time);
                  }
                }), "onFrame"))();
                return runner;
              };
              Runner.tick = function(runner, engine, time) {
                var tickStartTime = Common.now(), engineDelta = runner.delta, updateCount = 0;
                var frameDelta = time - runner.timeLastTick;
                if (!frameDelta || !runner.timeLastTick || frameDelta > Math7.max(Runner._maxFrameDelta, runner.maxFrameTime)) {
                  frameDelta = runner.frameDelta || Runner._frameDeltaFallback;
                }
                if (runner.frameDeltaSmoothing) {
                  runner.frameDeltaHistory.push(frameDelta);
                  runner.frameDeltaHistory = runner.frameDeltaHistory.slice(-runner.frameDeltaHistorySize);
                  var deltaHistorySorted = runner.frameDeltaHistory.slice(0).sort();
                  var deltaHistoryWindow = runner.frameDeltaHistory.slice(
                    deltaHistorySorted.length * Runner._smoothingLowerBound,
                    deltaHistorySorted.length * Runner._smoothingUpperBound
                  );
                  var frameDeltaSmoothed = _mean(deltaHistoryWindow);
                  frameDelta = frameDeltaSmoothed || frameDelta;
                }
                if (runner.frameDeltaSnapping) {
                  frameDelta = 1e3 / Math7.round(1e3 / frameDelta);
                }
                runner.frameDelta = frameDelta;
                runner.timeLastTick = time;
                runner.timeBuffer += runner.frameDelta;
                runner.timeBuffer = Common.clamp(
                  runner.timeBuffer,
                  0,
                  runner.frameDelta + engineDelta * Runner._timeBufferMargin
                );
                runner.lastUpdatesDeferred = 0;
                var maxUpdates = runner.maxUpdates || Math7.ceil(runner.maxFrameTime / engineDelta);
                var event = {
                  timestamp: engine.timing.timestamp
                };
                Events2.trigger(runner, "beforeTick", event);
                Events2.trigger(runner, "tick", event);
                var updateStartTime = Common.now();
                while (engineDelta > 0 && runner.timeBuffer >= engineDelta * Runner._timeBufferMargin) {
                  Events2.trigger(runner, "beforeUpdate", event);
                  Engine2.update(engine, engineDelta);
                  Events2.trigger(runner, "afterUpdate", event);
                  runner.timeBuffer -= engineDelta;
                  updateCount += 1;
                  var elapsedTimeTotal = Common.now() - tickStartTime, elapsedTimeUpdates = Common.now() - updateStartTime, elapsedNextEstimate = elapsedTimeTotal + Runner._elapsedNextEstimate * elapsedTimeUpdates / updateCount;
                  if (updateCount >= maxUpdates || elapsedNextEstimate > runner.maxFrameTime) {
                    runner.lastUpdatesDeferred = Math7.round(Math7.max(0, runner.timeBuffer / engineDelta - Runner._timeBufferMargin));
                    break;
                  }
                }
                engine.timing.lastUpdatesPerFrame = updateCount;
                Events2.trigger(runner, "afterTick", event);
                if (runner.frameDeltaHistory.length >= 100) {
                  if (runner.lastUpdatesDeferred && Math7.round(runner.frameDelta / engineDelta) > maxUpdates) {
                    Common.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs.");
                  } else if (runner.lastUpdatesDeferred) {
                    Common.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs.");
                  }
                  if (typeof runner.isFixed !== "undefined") {
                    Common.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs.");
                  }
                  if (runner.deltaMin || runner.deltaMax) {
                    Common.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs.");
                  }
                  if (runner.fps !== 0) {
                    Common.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs.");
                  }
                }
              };
              Runner.stop = function(runner) {
                Runner._cancelNextFrame(runner);
              };
              Runner._onNextFrame = function(runner, callback) {
                if (typeof window !== "undefined" && window.requestAnimationFrame) {
                  runner.frameRequestId = window.requestAnimationFrame(callback);
                } else {
                  throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");
                }
                return runner.frameRequestId;
              };
              Runner._cancelNextFrame = function(runner) {
                if (typeof window !== "undefined" && window.cancelAnimationFrame) {
                  window.cancelAnimationFrame(runner.frameRequestId);
                } else {
                  throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.");
                }
              };
              var _mean = /* @__PURE__ */ __name(function(values) {
                var result = 0, valuesLength = values.length;
                for (var i = 0; i < valuesLength; i += 1) {
                  result += values[i];
                }
                return result / valuesLength || 0;
              }, "_mean");
            })();
          }),
          /* 28 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var SAT = {};
            module2.exports = SAT;
            var Collision = __webpack_require__(8);
            var Common = __webpack_require__(0);
            var deprecated = Common.deprecated;
            (function() {
              SAT.collides = function(bodyA, bodyB) {
                return Collision.collides(bodyA, bodyB);
              };
              deprecated(SAT, "collides", "SAT.collides \u27A4 replaced by Collision.collides");
            })();
          }),
          /* 29 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var Svg = {};
            module2.exports = Svg;
            var Bounds = __webpack_require__(1);
            var Common = __webpack_require__(0);
            (function() {
              Svg.pathToVertices = function(path, sampleLength) {
                if (typeof window !== "undefined" && !("SVGPathSeg" in window)) {
                  Common.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
                }
                var i, il, total, point, segment, segments, segmentsQueue, lastSegment, lastPoint, segmentIndex, points = [], lx, ly, length = 0, x = 0, y = 0;
                sampleLength = sampleLength || 15;
                var addPoint = /* @__PURE__ */ __name(function(px, py, pathSegType) {
                  var isRelative = pathSegType % 2 === 1 && pathSegType > 1;
                  if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                    if (lastPoint && isRelative) {
                      lx = lastPoint.x;
                      ly = lastPoint.y;
                    } else {
                      lx = 0;
                      ly = 0;
                    }
                    var point2 = {
                      x: lx + px,
                      y: ly + py
                    };
                    if (isRelative || !lastPoint) {
                      lastPoint = point2;
                    }
                    points.push(point2);
                    x = lx + px;
                    y = ly + py;
                  }
                }, "addPoint");
                var addSegmentPoint = /* @__PURE__ */ __name(function(segment2) {
                  var segType = segment2.pathSegTypeAsLetter.toUpperCase();
                  if (segType === "Z")
                    return;
                  switch (segType) {
                    case "M":
                    case "L":
                    case "T":
                    case "C":
                    case "S":
                    case "Q":
                      x = segment2.x;
                      y = segment2.y;
                      break;
                    case "H":
                      x = segment2.x;
                      break;
                    case "V":
                      y = segment2.y;
                      break;
                  }
                  addPoint(x, y, segment2.pathSegType);
                }, "addSegmentPoint");
                Svg._svgPathToAbsolute(path);
                total = path.getTotalLength();
                segments = [];
                for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
                  segments.push(path.pathSegList.getItem(i));
                segmentsQueue = segments.concat();
                while (length < total) {
                  segmentIndex = path.getPathSegAtLength(length);
                  segment = segments[segmentIndex];
                  if (segment != lastSegment) {
                    while (segmentsQueue.length && segmentsQueue[0] != segment)
                      addSegmentPoint(segmentsQueue.shift());
                    lastSegment = segment;
                  }
                  switch (segment.pathSegTypeAsLetter.toUpperCase()) {
                    case "C":
                    case "T":
                    case "S":
                    case "Q":
                    case "A":
                      point = path.getPointAtLength(length);
                      addPoint(point.x, point.y, 0);
                      break;
                  }
                  length += sampleLength;
                }
                for (i = 0, il = segmentsQueue.length; i < il; ++i)
                  addSegmentPoint(segmentsQueue[i]);
                return points;
              };
              Svg._svgPathToAbsolute = function(path) {
                var x0, y0, x1, y1, x2, y2, segs = path.pathSegList, x = 0, y = 0, len = segs.numberOfItems;
                for (var i = 0; i < len; ++i) {
                  var seg = segs.getItem(i), segType = seg.pathSegTypeAsLetter;
                  if (/[MLHVCSQTA]/.test(segType)) {
                    if ("x" in seg) x = seg.x;
                    if ("y" in seg) y = seg.y;
                  } else {
                    if ("x1" in seg) x1 = x + seg.x1;
                    if ("x2" in seg) x2 = x + seg.x2;
                    if ("y1" in seg) y1 = y + seg.y1;
                    if ("y2" in seg) y2 = y + seg.y2;
                    if ("x" in seg) x += seg.x;
                    if ("y" in seg) y += seg.y;
                    switch (segType) {
                      case "m":
                        segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                        break;
                      case "l":
                        segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                        break;
                      case "h":
                        segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                        break;
                      case "v":
                        segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                        break;
                      case "c":
                        segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                        break;
                      case "s":
                        segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                        break;
                      case "q":
                        segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                        break;
                      case "t":
                        segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                        break;
                      case "a":
                        segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                        break;
                      case "z":
                      case "Z":
                        x = x0;
                        y = y0;
                        break;
                    }
                  }
                  if (segType == "M" || segType == "m") {
                    x0 = x;
                    y0 = y;
                  }
                }
              };
            })();
          }),
          /* 30 */
          /***/
          (function(module2, exports2, __webpack_require__) {
            var World = {};
            module2.exports = World;
            var Composite2 = __webpack_require__(6);
            var Common = __webpack_require__(0);
            (function() {
              World.create = Composite2.create;
              World.add = Composite2.add;
              World.remove = Composite2.remove;
              World.clear = Composite2.clear;
              World.addComposite = Composite2.addComposite;
              World.addBody = Composite2.addBody;
              World.addConstraint = Composite2.addConstraint;
            })();
          })
          /******/
        ])
      );
    });
  }
});

// .wrangler/tmp/bundle-V4rHTB/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-V4rHTB/middleware-insertion-facade.js
init_modules_watch_stub();

// worker.ts
init_modules_watch_stub();

// ../../lib/physics.ts
init_modules_watch_stub();
var import_matter = __toESM(require_matter(), 1);
var import_physics_math5 = __toESM(require_physics_math(), 1);

// ../../lib/rig.ts
init_modules_watch_stub();

// ../../lib/traits.ts
init_modules_watch_stub();
var import_physics_math = __toESM(require_physics_math(), 1);
function analyze(drawing) {
  const size = 80, grid = new Uint8Array(size * size);
  for (const stroke of drawing) {
    for (let i = 0; i < stroke.points.length; i++) {
      const a = stroke.points[import_physics_math.default.max(0, i - 1)], b = stroke.points[i], steps = import_physics_math.default.max(1, import_physics_math.default.ceil(import_physics_math.default.hypot(a[0] - b[0], a[1] - b[1]) / 4));
      for (let j = 0; j <= steps; j++) {
        const x = (a[0] + (b[0] - a[0]) * j / steps) / 640 * size, y = (a[1] + (b[1] - a[1]) * j / steps) / 400 * size, r = import_physics_math.default.max(0.6, stroke.width / 640 * size / 2);
        for (let yy = import_physics_math.default.floor(y - r); yy <= y + r; yy++) for (let xx = import_physics_math.default.floor(x - r); xx <= x + r; xx++) if (xx >= 0 && yy >= 0 && xx < size && yy < size && (xx - x) ** 2 + (yy - y) ** 2 < r * r + 1) grid[yy * size + xx] = stroke.erase ? 0 : 1;
      }
    }
  }
  let x1 = size, x2 = 0, y1 = size, y2 = 0;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (grid[y * size + x]) {
    x1 = import_physics_math.default.min(x1, x);
    x2 = import_physics_math.default.max(x2, x);
    y1 = import_physics_math.default.min(y1, y);
    y2 = import_physics_math.default.max(y2, y);
  }
  if (x1 >= x2 || y1 >= y2) return { speed: 50, jump: 50, grip: 50, build: "All-rounder", body: 0.5, legs: 0.5, overhang: 0, neck: 0, headRisk: 0 };
  const width = x2 - x1, height = y2 - y1;
  let upper = 0, bottom = 0;
  const columns = new Uint8Array(width + 1);
  for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) if (grid[y * size + x]) {
    if (y < y1 + height * 0.6) upper++;
    else {
      bottom++;
      columns[x - x1] = 1;
    }
  }
  let runs = 0;
  for (let i = 0; i < columns.length; i++) if (columns[i] && (i === 0 || !columns[i - 1])) runs++;
  const density = upper / (width * height * 0.6), aspect = height * 0.625 / width;
  const body = import_physics_math.default.max(0, import_physics_math.default.min(1, 0.5 + (density - 0.16) * 1.2 + (aspect - 0.55) * 0.5));
  const legs = import_physics_math.default.max(0, import_physics_math.default.min(1, (bottom / (upper + bottom) - 0.1) * 1.7 + import_physics_math.default.min(runs, 4) * 0.08));
  let speed = 50 + (0.5 - body) * 32 + (legs - 0.5) * 9, jump = 50 + (0.5 - body) * 22 + (legs - 0.5) * 13;
  let grip = 150 - speed - jump;
  const low = import_physics_math.default.min(speed, jump, grip), high = import_physics_math.default.max(speed, jump, grip), scale = import_physics_math.default.min(1, 25 / import_physics_math.default.max(25, 50 - low, high - 50));
  speed = 50 + (speed - 50) * scale;
  jump = 50 + (jump - 50) * scale;
  grip = 150 - speed - jump;
  let torsoStart = x1 + width * 0.2, torsoEnd = x1 + width * 0.7, torsoY = y1 + height * 0.58, best = 0;
  for (let y = import_physics_math.default.floor(y1 + height * 0.26); y <= y1 + height * 0.77; y++) {
    let start = -1;
    for (let x = x1; x <= x2 + 1; x++) {
      if (x <= x2 && grid[y * size + x]) {
        if (start < 0) start = x;
      } else if (start >= 0) {
        const len = x - start, score = len * (1 + (y - y1) / height * 0.15);
        if (score > best && len > width * 0.18) {
          best = score;
          torsoStart = start;
          torsoEnd = x - 1;
          torsoY = y;
        }
        start = -1;
      }
    }
  }
  const torsoWidth = import_physics_math.default.max(width * 0.25, torsoEnd - torsoStart);
  let headRight = torsoEnd, headTop = torsoY;
  for (let y = y1; y < torsoY - height * 0.12; y++) for (let x = import_physics_math.default.floor(torsoStart + torsoWidth * 0.65); x <= x2; x++) if (grid[y * size + x]) {
    headRight = import_physics_math.default.max(headRight, x);
    headTop = import_physics_math.default.min(headTop, y);
  }
  const overhang = import_physics_math.default.max(0, (headRight - torsoEnd) / torsoWidth), neck = import_physics_math.default.max(0, (torsoY - headTop) * 0.625 / torsoWidth);
  const lever = import_physics_math.default.max(0, overhang - 0.5) * 0.9 + import_physics_math.default.max(0, neck - 0.9) * 0.7;
  const headRisk = lever >= 1.05 ? 1 : import_physics_math.default.min(0.8, import_physics_math.default.max(0, lever * 0.85));
  return { speed, jump, grip, build: body < 0.36 ? "Speedster" : body > 0.64 ? "Tank" : "All-rounder", body, legs, overhang, neck, headRisk };
}
__name(analyze, "analyze");

// ../../lib/rig.ts
var import_physics_math2 = __toESM(require_physics_math(), 1);
var clamp = /* @__PURE__ */ __name((v, a, b) => import_physics_math2.default.max(a, import_physics_math2.default.min(b, v)), "clamp");
function closedTorso(d) {
  let best;
  for (const s of d) {
    if (s.erase || s.points.length < 5 || s.points.length > 6 && s.points.length < 25) continue;
    const first = s.points[0], last = s.points.at(-1);
    if (import_physics_math2.default.hypot(first[0] - last[0], first[1] - last[1]) > 12) continue;
    const xs = s.points.map((p) => p[0]), ys = s.points.map((p) => p[1]), box = { x: import_physics_math2.default.min(...xs), y: import_physics_math2.default.min(...ys), w: import_physics_math2.default.max(...xs) - import_physics_math2.default.min(...xs), h: import_physics_math2.default.max(...ys) - import_physics_math2.default.min(...ys) };
    if (box.w > 70 && box.h > 25 && (!best || box.w * box.h > best.w * best.h)) best = box;
  }
  return best;
}
__name(closedTorso, "closedTorso");
function autoRig(d, custom) {
  const points = d.filter((s) => !s.erase).flatMap((s) => s.points);
  let x = 640, y = 400, right = 0, bottom = 0;
  points.forEach((p) => {
    x = import_physics_math2.default.min(x, p[0]);
    y = import_physics_math2.default.min(y, p[1]);
    right = import_physics_math2.default.max(right, p[0]);
    bottom = import_physics_math2.default.max(bottom, p[1]);
  });
  if (!points.length) {
    x = 120;
    y = 60;
    right = 520;
    bottom = 350;
  }
  const w = import_physics_math2.default.max(40, right - x), h = import_physics_math2.default.max(40, bottom - y), nearest = /* @__PURE__ */ __name((u, v, region) => {
    const target = [x + w * u, y + h * v];
    let result = target, best = Infinity;
    for (const p of points) {
      if (!region(p)) continue;
      const dist = ((p[0] - target[0]) / w) ** 2 + ((p[1] - target[1]) / h) ** 2;
      if (dist < best) {
        best = dist;
        result = [p[0], p[1]];
      }
    }
    return result;
  }, "nearest");
  const marks = { body: [x + w * 0.46, y + h * 0.57], neck: [x + w * 0.66, y + h * 0.48], head: nearest(0.84, 0.22, (p) => p[0] > x + w * 0.6 && p[1] < y + h * 0.48), front: nearest(0.7, 0.96, (p) => p[0] > x + w * 0.5 && p[1] > y + h * 0.65), rear: nearest(0.27, 0.96, (p) => p[0] < x + w * 0.5 && p[1] > y + h * 0.65) };
  const torso = closedTorso(d);
  if (torso) {
    marks.body = [torso.x + torso.w / 2, torso.y + torso.h / 2];
    marks.neck = [torso.x + torso.w * 0.88, torso.y + torso.h * 0.3];
  }
  return { ...custom || marks, bounds: { x, y, w, h }, automatic: !custom };
}
__name(autoRig, "autoRig");
function specFor(d, custom) {
  const t = analyze(d), rig = autoRig(d, custom);
  const torso = closedTorso(d), body = torso ? clamp(0.2 + (torso.h / torso.w - 0.28) * 1.6, 0.15, 0.85) : t.body, legs = torso ? clamp((rig.front[1] - rig.body[1] - torso.h * 0.35) / (rig.bounds.h * 0.45), 0, 1) : t.legs;
  const raw = { speed: 50 + (0.5 - body) * 24 + (legs - 0.5) * 10, acceleration: 50 + (legs - 0.5) * 18 - (body - 0.5) * 18, balance: 50 + (body - 0.5) * 32 - (legs - 0.5) * 8, jump: 50 + (0.5 - body) * 20 + (legs - 0.5) * 16, endurance: 50 + (body - 0.5) * 22 - (legs - 0.5) * 8 };
  const values = Object.values(raw), mean = values.reduce((a, b) => a + b, 0) / 5, scale = import_physics_math2.default.min(1, 25 / import_physics_math2.default.max(25, ...values.map((v) => import_physics_math2.default.abs(v - mean))));
  const attributes = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, import_physics_math2.default.round((50 + (v - mean) * scale) * 100) / 100]));
  const inkScale = 110 / import_physics_math2.default.max(rig.bounds.w, rig.bounds.h * 0.7);
  return { rig, attributes, headRisk: t.headRisk, mass: 2.5 + body, legLength: 32 + (legs - 0.5) * 6, headOffset: [clamp((rig.head[0] - rig.body[0]) * inkScale, 18, 70), clamp((rig.head[1] - rig.body[1]) * inkScale, -58, -14)], inkScale };
}
__name(specFor, "specFor");

// ../../lib/physics-course.ts
init_modules_watch_stub();
var import_physics_math3 = __toESM(require_physics_math(), 1);
function random(seed) {
  let s = parseInt(seed.slice(0, 8), 16) || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}
__name(random, "random");
function physicsCourse(seed, track) {
  const rand = random(seed.slice(16) + seed.slice(0, 16)), length = 1e4;
  const kinds = ["Sunshine", "Rain", "Strong wind", "Fog", "Snow & ice"];
  const weather = [0, 26e3 + rand() * 6e3, 54e3 + rand() * 5e3, 76e3].map((at, i) => {
    const kind = kinds[(import_physics_math3.default.floor(rand() * 5) + (track === 2 ? 4 : 0)) % 5];
    return { at: import_physics_math3.default.round(at), kind, wet: kind === "Rain" ? 0.8 : kind === "Snow & ice" ? 0.25 : 0.05, wind: kind === "Strong wind" ? (rand() > 0.5 ? 1 : -1) * (0.65 + rand() * 0.35) : 0, visibility: kind === "Fog" ? 0.35 : 1, ice: kind === "Snow & ice" ? 0.9 : 0 };
  });
  const types = ["barrier", "puddle", "pit", "mud", "ramp", "barrier", "ice", "mud", "barrier", "puddle", "ramp"];
  const obstacles = types.map((type, id) => ({ id, type, x: 650 + id * 625 + import_physics_math3.default.round(rand() * 90), width: type === "barrier" ? 18 : type === "ramp" ? 110 : 140 + rand() * 70, height: type === "barrier" ? 37 + rand() * 20 : type === "pit" ? 27 : type === "ramp" ? 38 : 0 }));
  const sections = [{ from: 0, to: 1100, type: "straight", curve: 0 }, { from: 1100, to: 2100, type: "sweeper", curve: 0.55 }, { from: 2100, to: 3100, type: "uphill", curve: 0 }, { from: 3100, to: 4050, type: "hairpin", curve: -1 }, { from: 4050, to: 4900, type: "downhill", curve: 0 }, { from: 4900, to: 6300, type: "hazards", curve: 0.2 }, { from: 6300, to: 8e3, type: "sweeper", curve: 0.75 }, { from: 8e3, to: 9400, type: "hazards", curve: -0.55 }, { from: 9400, to: 11e3, type: "finish", curve: 0 }];
  const zones = [];
  const lanes = [0, 1, 2, 3], add = /* @__PURE__ */ __name((kind, x, width, allowed = lanes) => {
    const zone = { id: 20 + zones.length, kind, x, width, lanes: allowed };
    zones.push(zone);
    return zone;
  }, "add");
  const mud = add("MUD TRAP", 4950 + rand() * 180, 280);
  obstacles.push({ id: 20, x: mud.x, width: mud.width, height: 0, type: "mud", zone: mud.kind });
  const wet = add("WET CORNER", 3420 + rand() * 100, 300);
  obstacles.push({ id: 21, x: wet.x, width: wet.width, height: 0, type: "puddle", zone: wet.kind });
  const strip = add("BOOST STRIP", 6100 + rand() * 220, 130, lanes.filter(() => rand() > 0.3));
  if (!strip.lanes.length) strip.lanes = [import_physics_math3.default.floor(rand() * 4)];
  obstacles.push({ id: 22, x: strip.x, width: strip.width, height: 0, type: "boost", zone: strip.kind, lanes: strip.lanes });
  if (rand() > 0.35) {
    const twin = add("DOUBLE JUMP", 7350 + rand() * 150, 215);
    for (let i = 0; i < 2; i++) obstacles.push({ id: 23 + i, x: twin.x + i * 175, width: 18, height: 28 + rand() * 9, type: "barrier", zone: twin.kind });
  }
  if (rand() > 0.3) {
    const shortcut = add("RISKY SHORTCUT", 4200 + rand() * 100, 220, lanes.filter(() => rand() > 0.55));
    if (!shortcut.lanes.length) shortcut.lanes = [import_physics_math3.default.floor(rand() * 4)];
    obstacles.push({ id: 25, x: shortcut.x, width: 110, height: 25, type: "ramp", zone: shortcut.kind, lanes: shortcut.lanes }, { id: 26, x: shortcut.x + 120, width: 110, height: 0, type: "boost", zone: shortcut.kind, lanes: shortcut.lanes });
  }
  const final = add("FINAL CHAOS ZONE", 8750 + rand() * 100, 650);
  obstacles.push({ id: 27, x: final.x, width: 200, height: 0, type: rand() > 0.5 ? "mud" : "ice", zone: final.kind }, { id: 28, x: final.x + 350, width: 18, height: 30 + rand() * 10, type: "barrier", zone: final.kind }, { id: 29, x: final.x + 470, width: 90, height: 0, type: "boost", zone: final.kind, lanes: lanes.filter(() => rand() > 0.45) });
  obstacles.sort((a, b) => a.x - b.x);
  return { length, environment: ["Woodland", "Farmyard", "Snowfield"][track % 3], obstacles, weather, sections, zones };
}
__name(physicsCourse, "physicsCourse");
function weatherAt(course, ms) {
  return [...course.weather].reverse().find((w) => w.at <= ms) || course.weather[0];
}
__name(weatherAt, "weatherAt");
function sectionAt(course, x) {
  return course.sections.find((s) => x >= s.from && x < s.to) || course.sections.at(-1);
}
__name(sectionAt, "sectionAt");
function groundAt(course, x, lane) {
  let y = 0;
  if (x > 1900 && x < 4900) y = -import_physics_math3.default.sin((x - 1900) / 3e3 * import_physics_math3.default.PI) * 55;
  for (const o of course.obstacles) {
    if (o.lanes && (lane === void 0 || !o.lanes.includes(lane))) continue;
    if (o.type === "pit" && x > o.x && x < o.x + o.width) y += import_physics_math3.default.sin((x - o.x) / o.width * import_physics_math3.default.PI) * o.height;
    if (o.type === "ramp" && x > o.x && x < o.x + o.width) y -= (x - o.x) / o.width * o.height;
  }
  return y;
}
__name(groundAt, "groundAt");
function curveAt(course, x) {
  const s = sectionAt(course, x), p = clamp((x - s.from) / (s.to - s.from), 0, 1);
  return s.curve * import_physics_math3.default.sin(p * import_physics_math3.default.PI);
}
__name(curveAt, "curveAt");

// ../../lib/comeback.ts
init_modules_watch_stub();
var import_physics_math4 = __toESM(require_physics_math(), 1);
var COMEBACK_RULESET = "dynamic-comeback-2";
var BOOSTS = {
  "SECOND WIND": { duration: 7200, cooldown: 26e3, limit: 2, speed: 1.48, acceleration: 1.25, restore: 0.28, color: "#83b6a2" },
  "RAGE MODE": { duration: 3600, cooldown: 23e3, limit: 2, speed: 1.95, acceleration: 1.65, restore: 0.04, color: "#e96f61" },
  "ADRENALINE RUSH": { duration: 4400, cooldown: 22e3, limit: 3, speed: 1.65, acceleration: 1.55, restore: 0.13, color: "#f3b767" },
  "PERFECT RHYTHM": { duration: 6800, cooldown: 19e3, limit: 3, speed: 1.34, acceleration: 1.2, restore: 0.06, color: "#78aebe" },
  "LUCKY RECOVERY": { duration: 1500, cooldown: 18e3, limit: 3, speed: 1.08, acceleration: 1.1, restore: 0, color: "#c5a760" },
  "COMEBACK SURGE": { duration: 14200, cooldown: 9e4, limit: 1, speed: 2.25, acceleration: 1.8, restore: 0.32, color: "#ab83d2" }
};
var BOOST_NAMES = Object.keys(BOOSTS);
var isBoost = /* @__PURE__ */ __name((type) => Object.hasOwn(BOOSTS, type), "isBoost");
function comebackPressure(c) {
  const gap = clamp((c.gap - 0.035) / 0.2, 0, 1), late = clamp((35e3 - c.remaining) / 3e4, 0, 1), need = clamp((0.8 - c.energy) / 0.6, 0, 1), risk = 1 - c.traction;
  return clamp(gap * (0.65 + late * 0.2 + need * 0.1 + risk * 0.05), 0, 1);
}
__name(comebackPressure, "comebackPressure");
function softBand(c) {
  if (c.rank === 0 || c.gap < 0.05) return 1;
  return 1 + import_physics_math4.default.min(0.16, comebackPressure(c) * 0.16) * (0.65 + c.endurance / 285);
}
__name(softBand, "softBand");
function chooseOpportunity(c, roll, pick) {
  const pressure = comebackPressure(c), chance = 0.23 + pressure * 0.48 + (c.remaining <= 25e3 ? 0.08 : 0);
  if (c.remaining < 2500 || roll > chance) return null;
  const weights = [["SECOND WIND", 0.32 + (1 - c.energy) * 0.6], ["RAGE MODE", 0.18 + pressure * 0.38], ["PERFECT RHYTHM", 0.35 + c.balance / 300], ["ADRENALINE RUSH", c.recentCrash || c.gap > 0.1 ? 0.18 + pressure * 0.18 : 0], ["COMEBACK SURGE", c.gap > 0.1 && c.remaining < 38e3 || c.gap > 0.16 && c.remaining < 6e4 ? 0.12 + pressure * 0.48 : 0]];
  const sum = weights.reduce((n, [, w]) => n + w, 0);
  let at = pick * sum;
  for (const [type, w] of weights) {
    at -= w;
    if (at <= 0) return type;
  }
  return "PERFECT RHYTHM";
}
__name(chooseOpportunity, "chooseOpportunity");
function boostEffect(type, elapsed, duration) {
  if (!isBoost(type)) return { speed: 1, acceleration: 1 };
  const rule = BOOSTS[type], ramp = type === "PERFECT RHYTHM" ? clamp(elapsed / 1800, 0, 1) : clamp(elapsed / 450, 0, 1), fade = clamp((duration - elapsed) / 700, 0, 1), strength = ramp * fade;
  return { speed: 1 + (rule.speed - 1) * strength, acceleration: 1 + (rule.acceleration - 1) * strength };
}
__name(boostEffect, "boostEffect");
var FROZEN_RULES = { id: COMEBACK_RULESET, shapeWeight: 0.3, variationWeight: 0.7, maxBand: 0.16, finalPushAt: 65e3, maxCombinedSpeed: 2.35, boosts: BOOSTS };

// ../../lib/physics.ts
var { Engine, Bodies, Body, Composite, Constraint, Events } = import_matter.default;
var PHYSICS_VERSION = "matter-0.20-comeback-3-deterministic";
var STEP = 1e3 / 60;
var SAMPLE_HZ = 10;
var STRIDE = 17;
var STATES = ["RUN", "JUMP", "SLIP", "CRASH", "GET UP", "SECOND WIND", "RAGE MODE", "EXHAUSTION", "PANIC", "PERFECT LANDING", "LUCKY JUMP", "ADRENALINE RUSH", "PERFECT RHYTHM", "LUCKY RECOVERY", "COMEBACK SURGE", "OVERHEAT", "BAD LANDING", "SLIPPERY TURN", "OBSTACLE CRASH", "STUMBLE", "BOOST STRIP", "FINAL PUSH"];
var scales = [2, 8, 1e3, 2, 8, 1e3, 100, 100, 1e3, 1e3, 1, 2, 8, 2, 8, 1e4, 8];
var angle = /* @__PURE__ */ __name((x) => import_physics_math5.default.atan2(import_physics_math5.default.sin(x), import_physics_math5.default.cos(x)), "angle");
function randomFor(seed, salt = 0) {
  let s = (parseInt(seed.slice(salt % 48, salt % 48 + 8), 16) ^ import_physics_math5.default.imul(salt + 1, 2654435761)) >>> 0;
  return () => {
    s += 1831565813;
    let t = s;
    t = import_physics_math5.default.imul(t ^ t >>> 15, t | 1);
    t ^= t + import_physics_math5.default.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
__name(randomFor, "randomFor");
function blendAttribute(shape, random2, weight = 0.3) {
  return weight * shape + (1 - weight) * random2;
}
__name(blendAttribute, "blendAttribute");
function encode(values) {
  const bytes = new Uint8Array(values.length * 2), view = new DataView(bytes.buffer);
  values.forEach((v, i) => view.setInt16(i * 2, clamp(import_physics_math5.default.round(v * scales[i % STRIDE]), -32760, 32760), true));
  let result = "";
  for (let i = 0; i < bytes.length; i += 16384) result += String.fromCharCode(...bytes.subarray(i, i + 16384));
  return btoa(result);
}
__name(encode, "encode");
function simulate(seed, drawings, rigs = [], track = 0, options = {}) {
  if (!/^[a-f0-9]{64}$/i.test(seed) || ![2, 4].includes(drawings.length)) throw Error("Invalid physical race input");
  const course = options.course || physicsCourse(seed, track), duration = options.duration || 9e4, n = drawings.length, specs = options.specs || drawings.map((d, i) => specFor(d, rigs[i]));
  const inLane = /* @__PURE__ */ __name((o, lane) => !o.lanes || o.lanes.includes(lane), "inLane");
  const supportAt = /* @__PURE__ */ __name((x, lane = 0) => {
    const o = course.obstacles.find((o2) => o2.type === "barrier" && inLane(o2, lane) && x >= o2.x && x <= o2.x + o2.width);
    return groundAt(course, x, lane) - (o?.height || 0);
  }, "supportAt");
  const events = [], values = [], finishes = Array(n).fill(0), diagnostics = { jumps: 0, barrierContacts: 0, landings: 0, slips: 0, falls: 0, recoveries: 0, maxAir: 0 };
  import_matter.default.Common._nextId = 0;
  import_matter.default.Common._seed = 1;
  const racers = specs.map((spec, lane) => {
    const rand = randomFor(seed, lane * 9 + 3), engine = Engine.create({ positionIterations: 6, velocityIterations: 5, constraintIterations: 3, enableSleeping: false });
    engine.gravity.y = 1;
    engine.gravity.scale = 1e-3;
    const body = Bodies.rectangle(70, groundAt(course, 70) - spec.legLength - 11, 54, 23, { chamfer: { radius: 8 }, mass: spec.mass, friction: 0.2, frictionAir: 7e-3, restitution: 0.08, label: "torso" });
    const head = Bodies.circle(body.position.x + spec.headOffset[0], body.position.y + spec.headOffset[1], 10 + spec.headRisk * 3, { mass: 0.3 + spec.headRisk * 0.65, friction: 0.1, frictionAir: 0.02, restitution: 0.2, label: "head" });
    const group = Body.nextGroup(true);
    body.collisionFilter.group = group;
    head.collisionFilter.group = group;
    const neck = Constraint.create({ bodyA: body, pointA: { x: 20, y: -8 }, bodyB: head, pointB: { x: -6, y: 7 }, length: import_physics_math5.default.max(8, import_physics_math5.default.hypot(spec.headOffset[0] - 26, spec.headOffset[1] + 15)), stiffness: 0.3, damping: 0.13 });
    const terrain = [];
    for (let x = -160; x < course.length + 2200; x += 80) {
      const a = groundAt(course, x, lane), b = groundAt(course, x + 80, lane), dy = b - a;
      terrain.push(Bodies.rectangle(x + 40, (a + b) / 2 + 40, import_physics_math5.default.hypot(80, dy) + 2, 80, { isStatic: true, angle: import_physics_math5.default.atan2(dy, 80), friction: 0.8, label: "ground" }));
    }
    for (const o of course.obstacles) if (o.type === "barrier" && inLane(o, lane)) terrain.push(Bodies.rectangle(o.x + o.width / 2, groundAt(course, o.x, lane) - o.height / 2, o.width, o.height, { isStatic: true, friction: 0.22, restitution: 0.1, label: "barrier:" + o.id }));
    Composite.add(engine.world, [...terrain, body, head, neck]);
    const parameters = Object.fromEntries(Object.entries(spec.attributes).map(([key, v]) => [key, blendAttribute(v, 25 + rand() * 50, options.traitWeight ?? 0.3)]));
    const racer = { engine, body, head, spec, parameters, rand, opRand: randomFor(seed, lane * 13 + 41), lane, phase: rand() * 6.28, feet: Array.from({ length: 4 }, () => ({ x: body.position.x, y: 0, stance: false })), state: 0, mode: 0, modeAt: 0, modeUntil: 0, nextMode: 9e3 + rand() * 4e3, boostUses: {}, boostNext: {}, debuff: 0, debuffUntil: 0, riskAt: 0, riskCooldown: 0, heat: 0, heatCooldown: 0, exhaustCooldown: 0, finalChecked: false, pendingSurge: false, stripUntil: 0, strips: /* @__PURE__ */ new Set(), lastRecovered: -99999, fallenAt: -1, slipUntil: 0, panicUntil: 0, lastJump: -5e3, lastImpact: -5e3, air: false, airAt: 0, energy: 0.95, lastSurface: -1, obstacleTried: /* @__PURE__ */ new Set(), eventCooldown: 0, finished: false, finalPose: [] };
    Events.on(engine, "collisionStart", (e) => {
      for (const pair of e.pairs) {
        const obstacle = [pair.bodyA, pair.bodyB].find((b) => b.label.startsWith("barrier:"));
        const actor = [pair.bodyA, pair.bodyB].find((b) => b === body || b === head);
        if (obstacle && actor && racer.lastImpact < engine.timing.timestamp - 1500) {
          racer.lastImpact = engine.timing.timestamp;
          racer.panicUntil = engine.timing.timestamp + 650;
          racer.debuff = 18;
          racer.debuffUntil = engine.timing.timestamp + 1e3;
          diagnostics.barrierContacts++;
          events.push({ at: import_physics_math5.default.round(engine.timing.timestamp), lane, type: "OBSTACLE CRASH", duration: 1100, obstacle: Number(obstacle.label.split(":")[1]), reason: "physical collider contact" });
          const force = body.mass * 9e-3;
          Body.applyForce(body, { x: body.position.x + 27, y: body.position.y - 8 }, { x: -force * 0.18, y: force });
        }
      }
    });
    return racer;
  });
  const log = /* @__PURE__ */ __name((lane, type, at, len, obstacle) => events.push({ at: import_physics_math5.default.round(at), lane, type, duration: len, ...obstacle === void 0 ? {} : { obstacle } }), "log");
  const startMode = /* @__PURE__ */ __name((r, type, ms, duration2, gap = 0, reason = "seeded opportunity", forced = false) => {
    if (isBoost(type)) {
      const rule = BOOSTS[type];
      if (!forced && ((r.boostNext[type] || 0) > ms || (r.boostUses[type] || 0) >= rule.limit || ms < r.modeUntil)) return false;
      r.boostNext[type] = ms + rule.cooldown;
      r.boostUses[type] = (r.boostUses[type] || 0) + 1;
      r.energy = clamp(r.energy + rule.restore, 0.2, 1);
      duration2 ??= rule.duration;
    }
    r.mode = STATES.indexOf(type);
    r.modeAt = ms;
    r.modeUntil = ms + (duration2 || 3e3);
    events.push({ at: import_physics_math5.default.round(ms), lane: r.lane, type, duration: r.modeUntil - ms, gap, reason });
    return true;
  }, "startMode");
  const steps = import_physics_math5.default.ceil(duration / STEP);
  for (const r of racers) {
    const b = r.body, h = r.head;
    values.push(b.position.x, b.position.y, 0, h.position.x, h.position.y, 0, 0, 0, angle(r.phase), 0, 0, b.position.x + 20, supportAt(b.position.x + 20), b.position.x - 20, supportAt(b.position.x - 20), r.energy, groundAt(course, b.position.x));
  }
  for (let tick = 1; tick <= steps; tick++) {
    const ms = tick * STEP, weather = weatherAt(course, ms), field = racers.map((r) => r.body.position.x), leaderX = import_physics_math5.default.max(...field);
    if (tick === 3900 && !options.disableEvents) log(-1, "FINAL PUSH", 65e3, 2800);
    for (const r of racers) {
      if (r.finished) {
        if (tick % 6 === 0) values.push(...r.finalPose);
        continue;
      }
      const { body: b, head, spec, parameters: a, engine, lane } = r, x = b.position.x, ground = supportAt(x, lane), tilt = angle(b.angle), distance = ground - b.position.y;
      const surfaces = course.obstacles.filter((o) => o.type !== "barrier" && inLane(o, lane) && x > o.x && x < o.x + o.width), surface = surfaces.findLast((o) => o.type !== "boost"), touching = distance < spec.legLength + 25 && b.velocity.y > -0.9;
      const slippery = clamp(weather.ice + (surface?.type === "ice" ? 0.75 : surface?.type === "puddle" ? 0.5 : 0) + weather.wet * 0.35, 0, 0.98), mud = surface?.type === "mud" ? 1 : 0;
      const reserve = STATES[r.mode] === "COMEBACK SURGE" && ms < r.modeUntil;
      const traction = clamp((1 - slippery * (1 - a.balance / 150)) * (reserve ? 1.28 : 1), 0.1, 1) * (ms < r.slipUntil ? 0.65 : 1), turn = import_physics_math5.default.abs(curveAt(course, x));
      const situation = { gap: import_physics_math5.default.max(0, (leaderX - x) / course.length), remaining: duration - ms, energy: r.energy, speed: b.velocity.x, balance: a.balance, endurance: a.endurance, traction, curve: turn, rank: field.filter((v) => v > x + 1).length, recentCrash: ms - r.lastImpact < 6e3 || ms - r.lastRecovered < 4500 };
      if (ms >= 65e3 && !r.finalChecked && !options.disableEvents && options.comeback !== false) {
        r.finalChecked = true;
        r.pendingSurge = situation.gap > 0.08 && r.opRand() < import_physics_math5.default.min(0.7, 0.12 + situation.gap * 1.5 + (1 - r.energy) * 0.1);
      }
      if (r.pendingSurge && r.fallenAt < 0 && ms > r.modeUntil && ms < 79e3) {
        startMode(r, "COMEBACK SURGE", ms, void 0, situation.gap, "final push opportunity");
        r.pendingSurge = false;
      }
      b.friction = slippery > 0.5 ? 0.015 : mud ? 0.65 : 0.18;
      head.friction = b.friction;
      if (!options.disableEvents && ms >= r.nextMode) {
        r.nextMode = ms + 5e3 + r.opRand() * 3300;
        if (r.fallenAt < 0 && ms > r.modeUntil && options.comeback !== false) {
          const type = chooseOpportunity(situation, r.opRand(), r.opRand());
          if (type) startMode(r, type, ms, void 0, situation.gap, situation.gap > 0.1 ? "gap + fatigue + time remaining" : "running opportunity");
        }
      }
      for (const forced of options.forcedDriver || []) if (forced.lane === lane && forced.at <= ms && forced.at > ms - STEP) startMode(r, forced.type, ms, forced.duration, situation.gap, "test driver", true);
      if (ms > r.modeUntil) {
        if ((r.mode === 6 || r.mode === 14) && r.energy < 0.75 && r.heat > 0.45 && ms > r.exhaustCooldown && !options.disableEvents) {
          r.debuff = 7;
          r.debuffUntil = ms + 2700;
          r.exhaustCooldown = ms + 18e3;
          log(lane, "EXHAUSTION", ms, 2700);
        }
        r.mode = 0;
      }
      if (ms > r.debuffUntil) r.debuff = 0;
      const mode = STATES[r.mode], effect = boostEffect(mode, ms - r.modeAt, r.modeUntil - r.modeAt), boosting = isBoost(mode) && effect.speed > 1.2;
      r.energy = clamp(r.energy - (45e-6 + import_physics_math5.default.abs(b.velocity.x) / 5 * 15e-6 + (boosting ? 65e-5 * (effect.speed - 1) : 0)) * (1.4 - a.endurance / 120), 0.2, 1);
      r.heat = clamp(r.heat + (import_physics_math5.default.max(0, b.velocity.x - 2.6) * 1e-3 + (boosting ? 1e-3 : 0) + (mode === "RAGE MODE" ? 17e-4 : 0)) * (reserve ? 0.35 : 1) - (b.velocity.x < 2.7 ? 45e-5 : 1e-4), 0, 1.5);
      if (!options.disableEvents && r.fallenAt < 0) {
        if (r.heat > 0.78 && !reserve && ms > r.heatCooldown) {
          r.debuff = 15;
          r.debuffUntil = ms + 3600;
          r.heatCooldown = ms + 21e3;
          r.heat = 0.35;
          r.energy = import_physics_math5.default.max(0.2, r.energy - 0.09);
          log(lane, "OVERHEAT", ms, 3600);
        }
        if (r.energy < 0.27 && ms > r.exhaustCooldown && b.velocity.x > 1.4) {
          r.debuff = 7;
          r.debuffUntil = ms + 3900;
          r.exhaustCooldown = ms + 18e3;
          r.energy += 0.07;
          log(lane, "EXHAUSTION", ms, 3900);
        }
        if (import_physics_math5.default.abs(tilt) > 0.55 && import_physics_math5.default.abs(tilt) < 1.15 && ms > r.modeUntil && ms - r.lastImpact > 150 && r.opRand() < 0.012 + a.balance * 1e-4) startMode(r, "LUCKY RECOVERY", ms, void 0, situation.gap, "near-fall balance save");
        if (ms > r.riskAt) {
          r.riskAt = ms + 1100;
          if (ms > r.riskCooldown && touching && b.velocity.x > 2.2) {
            const wetRisk = turn * slippery * import_physics_math5.default.max(0, b.velocity.x - 2.2) * (1 - a.balance / 120);
            if (r.opRand() < import_physics_math5.default.min(0.2, wetRisk * 0.11)) {
              r.debuff = 17;
              r.debuffUntil = ms + 1900;
              r.slipUntil = ms + 1500;
              r.riskCooldown = ms + 9500;
              diagnostics.slips++;
              log(lane, "SLIPPERY TURN", ms, 1900);
              Body.applyForce(b, { x: x + 22, y: b.position.y - 7 }, { x: -b.mass * 13e-4, y: b.mass * 16e-4 });
            } else if (r.opRand() < import_physics_math5.default.max(0, b.velocity.x - 3) * 0.015 + (1 - r.energy) * 0.015) {
              r.debuff = 19;
              r.debuffUntil = ms + 1600;
              r.riskCooldown = ms + 1e4;
              log(lane, "STUMBLE", ms, 1600);
              Body.applyForce(b, { x: x + 22, y: b.position.y - 8 }, { x: -b.mass * 12e-4, y: b.mass * 1e-3 });
            }
          }
        }
      }
      b.frictionAir = 7e-3 + mud * 0.014 + (r.mode === 7 ? 6e-3 : 0) + (r.debuff === 15 ? 5e-3 : r.debuff === 16 ? 8e-3 : r.debuff === 7 ? 6e-3 : 0);
      if (import_physics_math5.default.abs(tilt) > (mode === "LUCKY RECOVERY" ? 1.35 : 0.9) && r.fallenAt < 0 && ms > 1e3) {
        r.fallenAt = ms;
        diagnostics.falls++;
        log(lane, "CRASH", ms, 2200);
      }
      const fallen = r.fallenAt >= 0, fallenFor = fallen ? ms - r.fallenAt : 0;
      if (fallen && fallenFor > 1500 && import_physics_math5.default.abs(tilt) < 0.28 && distance > spec.legLength * 0.7) {
        r.fallenAt = -1;
        r.panicUntil = ms + 350;
        r.lastRecovered = ms;
        diagnostics.recoveries++;
        log(lane, "GET UP", ms, 650);
        if (!options.disableEvents && options.comeback !== false && r.opRand() < 0.32 + situation.gap * 0.65) startMode(r, "ADRENALINE RUSH", ms, void 0, situation.gap, "recovered from physical fall");
      }
      let target = (2.25 + a.speed / 100) * (0.6 + 0.4 * r.energy);
      const band = !options.disableEvents && options.comeback !== false ? softBand(situation) : 1;
      target *= import_physics_math5.default.min(FROZEN_RULES.maxCombinedSpeed, effect.speed * band * (ms < r.stripUntil ? 1.22 : 1));
      if (r.mode === 7) target *= 0.58;
      if (r.mode === 8) target *= 0.72;
      if (r.debuff === 15) target *= 0.79;
      if (r.debuff === 16) target *= 0.69;
      if (r.debuff === 17) target *= 0.76;
      if (r.debuff === 19) target *= 0.8;
      if (r.debuff === 7) target *= 0.65;
      target *= 1 - turn * (1 - a.balance / 110) * 0.28;
      target = import_physics_math5.default.min(6.5, target);
      if (fallen) target *= fallenFor < 1300 ? 0.08 : 0.38;
      const motor = clamp((target - b.velocity.x) * (75e-6 + a.acceleration * 12e-7) * effect.acceleration, -8e-4, 12e-4 * effect.acceleration) * (fallen ? 0.2 : traction) * (mud ? 0.33 + a.balance / 300 : 1);
      r.phase += import_physics_math5.default.abs(b.velocity.x) * 0.038 * (boosting ? 1.12 : 1);
      let front, rear;
      for (let leg = 0; leg < 4; leg++) {
        const frontLeg = leg < 2, localX = frontLeg ? 20 : -20, ph = (r.phase + (leg === 0 || leg === 3 ? 0 : import_physics_math5.default.PI)) % (import_physics_math5.default.PI * 2), stance = ph < import_physics_math5.default.PI * 1.2 && distance < spec.legLength + 26;
        const hip = { x: b.position.x + import_physics_math5.default.cos(tilt) * localX - import_physics_math5.default.sin(tilt) * 9, y: b.position.y + import_physics_math5.default.sin(tilt) * localX + import_physics_math5.default.cos(tilt) * 9 };
        const foot = r.feet[leg], stride = 17 + import_physics_math5.default.abs(b.velocity.x) * 3;
        if (stance && !foot.stance) foot.x = hip.x + stride * 0.5;
        if (!stance || fallen) {
          foot.x = hip.x + import_physics_math5.default.cos(ph) * stride * 0.65;
          foot.y = hip.y + spec.legLength - import_physics_math5.default.max(0, -import_physics_math5.default.sin(ph)) * 18;
        } else {
          foot.x += slippery * b.velocity.x * 0.18;
          foot.y = supportAt(foot.x, lane);
        }
        foot.stance = stance;
        const compression = spec.legLength - (foot.y - hip.y);
        if (stance && !fallen && compression > 0 && compression < spec.legLength + 30 && hip.y < foot.y) {
          const lift = clamp(compression * 65e-5 + b.velocity.y * 3e-4, 0, 55e-4) * b.mass / 2;
          Body.applyForce(b, hip, { x: motor * b.mass / 2, y: -lift });
        }
        if (leg === 0) front = foot;
        if (leg === 2) rear = foot;
      }
      if (!touching) Body.applyForce(b, b.position, { x: motor * b.mass * 0.16, y: 0 });
      Body.applyForce(b, b.position, { x: weather.wind * b.mass * 45e-6, y: 0 });
      Body.applyForce(head, head.position, { x: weather.wind * head.mass * 11e-5 * (1 + spec.headRisk), y: 0 });
      if (mud && touching) Body.applyForce(b, b.position, { x: -b.velocity.x * b.mass * 11e-5, y: 0 });
      for (const strip of surfaces.filter((o) => o.type === "boost")) if (!r.strips.has(strip.id) && touching && !fallen) {
        r.strips.add(strip.id);
        r.stripUntil = ms + 2400;
        r.energy = clamp(r.energy + 0.045, 0.2, 1);
        log(lane, "BOOST STRIP", ms, 2400, strip.id);
      }
      if (surface && surface.id !== r.lastSurface && touching) {
        r.lastSurface = surface.id;
        if (slippery > 0.25 && !options.disableEvents && r.rand() < 0.22 + slippery * 0.45 + (1 - a.balance / 100) * 0.2) {
          r.slipUntil = ms + 900;
          diagnostics.slips++;
          log(lane, "SLIP", ms, 1100, surface.id);
          Body.applyForce(b, { x: b.position.x + 22, y: b.position.y - 8 }, { x: b.mass * 12e-4, y: b.mass * 2e-3 * (r.rand() > 0.3 ? 1 : -1) });
        }
      }
      const upcoming = course.obstacles.find((o) => inLane(o, lane) && (o.type === "barrier" || o.type === "ramp") && o.x > x && o.x - x < import_physics_math5.default.max(65, b.velocity.x * 25) * (0.6 + 0.4 * weather.visibility) && !r.obstacleTried.has(o.id));
      if (upcoming && touching && !fallen && ms - r.lastJump > (reserve ? 580 : 700)) {
        r.obstacleTried.add(upcoming.id);
        if (upcoming.type === "barrier" && r.rand() > (reserve ? 0.025 : 0.08) + (100 - a.jump) / (reserve ? 1800 : 900)) {
          const lucky = r.rand() < 0.2;
          Body.applyForce(b, { x: b.position.x + 4, y: b.position.y }, { x: b.mass * 5e-4, y: -b.mass * (0.019 + a.jump * 1e-4) * (lucky ? 1.12 : 1) });
          r.lastJump = ms;
          diagnostics.jumps++;
          log(lane, lucky ? "LUCKY JUMP" : "JUMP", ms, 900, upcoming.id);
        }
      }
      const targetAngle = import_physics_math5.default.atan2(groundAt(course, x + 15, lane) - groundAt(course, x - 15, lane), 30);
      if (!fallen && ms > r.panicUntil || fallenFor > 1e3) {
        const gain = fallen ? 7e-4 : (22e-5 + a.balance * 25e-7) * traction * (1 - spec.headRisk * 0.4) * (mode === "LUCKY RECOVERY" ? 2.2 : reserve ? 1.2 : 1);
        b.torque += (-clamp(angle(b.angle - targetAngle), -0.6, 0.6) * gain - b.angularVelocity * 3e-3) * b.inertia;
      }
      if (fallen && fallenFor > 1400 && distance < spec.legLength + 12) Body.applyForce(b, b.position, { x: b.mass * 7e-4, y: -b.mass * 35e-4 });
      if (!fallen && distance < spec.legLength + 28 && import_physics_math5.default.abs(b.velocity.x) < 0.4 && ms - r.lastJump > 2200 && course.obstacles.some((o) => (o.type === "barrier" || o.type === "ramp" || o.type === "pit") && o.x + o.width > x - 60 && o.x < x + 120)) {
        Body.applyForce(b, b.position, { x: b.mass * 3e-3, y: -b.mass * 0.035 });
        r.lastJump = ms;
        diagnostics.jumps++;
        log(lane, "GET UP", ms, 900);
      }
      const hx = b.position.x + import_physics_math5.default.cos(b.angle) * spec.headOffset[0] - import_physics_math5.default.sin(b.angle) * spec.headOffset[1], hy = b.position.y + import_physics_math5.default.sin(b.angle) * spec.headOffset[0] + import_physics_math5.default.cos(b.angle) * spec.headOffset[1];
      const neckForce = { x: ((hx - head.position.x) * 4e-5 - (head.velocity.x - b.velocity.x) * 3e-4) * head.mass, y: ((hy - head.position.y) * 4e-5 - (head.velocity.y - b.velocity.y) * 3e-4 - (75e-5 - spec.headRisk * 25e-5)) * head.mass };
      Body.applyForce(head, head.position, neckForce);
      Body.applyForce(b, { x: b.position.x + 20, y: b.position.y - 8 }, { x: -neckForce.x, y: -neckForce.y });
      const neckTorque = (-angle(head.angle - b.angle) * 3e-4 - (head.angularVelocity - b.angularVelocity) * 2e-3) * head.inertia;
      head.torque += neckTorque;
      b.torque -= neckTorque;
      const wasAir = r.air;
      Engine.update(engine, STEP);
      r.air = supportAt(b.position.x, lane) - b.position.y > spec.legLength + 20;
      if (r.air && !wasAir) r.airAt = ms;
      if (!r.air && wasAir && ms - r.airAt > 220) {
        diagnostics.landings++;
        const perfect = import_physics_math5.default.abs(angle(b.angle)) < 0.3;
        if (perfect) {
          r.energy = clamp(r.energy + 0.012, 0.2, 1);
          Body.applyForce(b, b.position, { x: b.mass * 4e-4, y: 0 });
          log(lane, "PERFECT LANDING", ms, 650);
        } else {
          if (!options.disableEvents) {
            r.debuff = 16;
            r.debuffUntil = ms + 1500;
            Body.applyForce(b, b.position, { x: -import_physics_math5.default.max(0, b.velocity.x) * b.mass * 8e-4, y: 0 });
            log(lane, "BAD LANDING", ms, 1500);
          }
        }
      }
      diagnostics.maxAir = import_physics_math5.default.max(diagnostics.maxAir, groundAt(course, b.position.x) - b.position.y - spec.legLength);
      if (b.position.x >= course.length && !r.finished) {
        finishes[lane] = import_physics_math5.default.round(ms);
        r.finished = true;
      }
      if (b.position.y > 250 || !Number.isFinite(b.position.x)) throw Error("Physical simulation became unstable " + JSON.stringify({ ms, x: b.position.x, y: b.position.y, angle: b.angle, vx: b.velocity.x, lane }));
      r.state = fallen ? fallenFor < 1300 ? 3 : 4 : r.debuff || (isBoost(STATES[r.mode]) && ms < r.modeUntil ? r.mode : ms < r.slipUntil ? 2 : r.air ? 1 : ms < r.panicUntil ? 8 : ms < r.stripUntil ? 20 : r.mode);
      if (tick % 6 === 0 || r.finished) {
        const f = front, z = rear;
        const frame = [b.position.x, b.position.y, angle(b.angle), head.position.x, head.position.y, angle(head.angle), b.velocity.x, b.velocity.y, angle(r.phase), clamp((spec.legLength - distance) / 30, -0.4, 0.4), r.state, f.x, f.y, z.x, z.y, r.energy, groundAt(course, b.position.x)];
        if (tick % 6 === 0) values.push(...frame);
        if (r.finished) r.finalPose = frame;
      }
    }
  }
  const distances = racers.map((r) => import_physics_math5.default.round(r.body.position.x * 100) / 100), ranking = Array.from({ length: n }, (_, i) => i).sort((a, b) => finishes[a] && finishes[b] ? finishes[a] - finishes[b] : finishes[a] ? -1 : finishes[b] ? 1 : distances[b] - distances[a]);
  racers.forEach((r) => {
    Composite.clear(r.engine.world, false);
    Engine.clear(r.engine);
  });
  return { parameters: racers.map((r) => r.parameters), rules: FROZEN_RULES, version: PHYSICS_VERSION, hz: SAMPLE_HZ, stride: STRIDE, frames: import_physics_math5.default.floor(steps / 6) + 1, lanes: n, duration, data: encode(values), ranking, finishes, distances, events: events.sort((a, b) => a.at - b.at || a.lane - b.lane), course, specs, diagnostics };
}
__name(simulate, "simulate");

// worker.ts
var worker_default = { async fetch(request) {
  const input = await request.json(), race = input.race || input;
  const specs = race.players.map((p) => p.spec);
  const tape = simulate(race.seed, race.players.map((p) => p.drawing), race.players.map((p) => p.rig), race.track, { specs: specs.every(Boolean) ? specs : void 0 });
  return Response.json({ tape });
} };

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-V4rHTB/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-V4rHTB/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*!
 * matter-js 0.20.0 by @liabru
 * http://brm.io/matter-js/
 * License MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/*! Bundled license information:

@stdlib/constants-float64-high-word-abs-mask/lib/index.js:
@stdlib/math-base-special-kernel-cos/lib/polyval_c13.js:
@stdlib/math-base-special-kernel-cos/lib/polyval_c46.js:
@stdlib/constants-float64-high-word-sign-mask/lib/index.js:
@stdlib/string-base-format-interpolate/lib/is_number.js:
@stdlib/string-base-format-interpolate/lib/zero_pad.js:
@stdlib/string-base-format-interpolate/lib/format_integer.js:
@stdlib/string-base-format-interpolate/lib/is_string.js:
@stdlib/string-base-format-interpolate/lib/format_double.js:
@stdlib/string-base-format-interpolate/lib/space_pad.js:
@stdlib/string-base-format-interpolate/lib/main.js:
@stdlib/string-base-format-interpolate/lib/index.js:
@stdlib/string-base-format-tokenize/lib/main.js:
@stdlib/string-base-format-tokenize/lib/index.js:
@stdlib/string-format/lib/is_string.js:
@stdlib/string-format/lib/main.js:
@stdlib/string-format/lib/index.js:
@stdlib/math-base-special-atan/lib/polyval_p.js:
@stdlib/math-base-special-atan/lib/polyval_q.js:
@stdlib/math-base-special-asin/lib/rational_pq.js:
@stdlib/math-base-special-asin/lib/rational_rs.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2022 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/constants-float64-high-word-exponent-mask/lib/index.js:
@stdlib/assert-has-symbol-support/lib/main.js:
@stdlib/assert-has-symbol-support/lib/index.js:
@stdlib/assert-has-tostringtag-support/lib/main.js:
@stdlib/assert-has-tostringtag-support/lib/index.js:
@stdlib/utils-native-class/lib/tostring.js:
@stdlib/utils-native-class/lib/main.js:
@stdlib/assert-has-own-property/lib/main.js:
@stdlib/assert-has-own-property/lib/index.js:
@stdlib/symbol-ctor/lib/main.js:
@stdlib/symbol-ctor/lib/index.js:
@stdlib/utils-native-class/lib/tostringtag.js:
@stdlib/utils-native-class/lib/polyfill.js:
@stdlib/utils-native-class/lib/index.js:
@stdlib/assert-is-uint32array/lib/main.js:
@stdlib/assert-is-uint32array/lib/index.js:
@stdlib/constants-uint32-max/lib/index.js:
@stdlib/assert-has-uint32array-support/lib/uint32array.js:
@stdlib/assert-has-uint32array-support/lib/main.js:
@stdlib/assert-has-uint32array-support/lib/index.js:
@stdlib/array-uint32/lib/main.js:
@stdlib/array-uint32/lib/polyfill.js:
@stdlib/array-uint32/lib/index.js:
@stdlib/assert-is-float64array/lib/main.js:
@stdlib/assert-is-float64array/lib/index.js:
@stdlib/assert-has-float64array-support/lib/float64array.js:
@stdlib/assert-has-float64array-support/lib/main.js:
@stdlib/assert-has-float64array-support/lib/index.js:
@stdlib/array-float64/lib/main.js:
@stdlib/array-float64/lib/polyfill.js:
@stdlib/array-float64/lib/index.js:
@stdlib/assert-is-uint8array/lib/main.js:
@stdlib/assert-is-uint8array/lib/index.js:
@stdlib/constants-uint8-max/lib/index.js:
@stdlib/assert-has-uint8array-support/lib/uint8array.js:
@stdlib/assert-has-uint8array-support/lib/main.js:
@stdlib/assert-has-uint8array-support/lib/index.js:
@stdlib/array-uint8/lib/main.js:
@stdlib/array-uint8/lib/polyfill.js:
@stdlib/array-uint8/lib/index.js:
@stdlib/assert-is-uint16array/lib/main.js:
@stdlib/assert-is-uint16array/lib/index.js:
@stdlib/constants-uint16-max/lib/index.js:
@stdlib/assert-has-uint16array-support/lib/uint16array.js:
@stdlib/assert-has-uint16array-support/lib/main.js:
@stdlib/assert-has-uint16array-support/lib/index.js:
@stdlib/array-uint16/lib/main.js:
@stdlib/array-uint16/lib/polyfill.js:
@stdlib/array-uint16/lib/index.js:
@stdlib/assert-is-little-endian/lib/ctors.js:
@stdlib/assert-is-little-endian/lib/main.js:
@stdlib/assert-is-little-endian/lib/index.js:
@stdlib/number-float64-base-get-high-word/lib/high.js:
@stdlib/number-float64-base-get-high-word/lib/main.js:
@stdlib/number-float64-base-get-high-word/lib/index.js:
@stdlib/math-base-special-kernel-cos/lib/index.js:
@stdlib/math-base-special-kernel-sin/lib/index.js:
@stdlib/constants-float64-high-word-significand-mask/lib/index.js:
@stdlib/number-float64-base-get-low-word/lib/low.js:
@stdlib/number-float64-base-get-low-word/lib/main.js:
@stdlib/number-float64-base-get-low-word/lib/index.js:
@stdlib/number-float64-base-from-words/lib/indices.js:
@stdlib/number-float64-base-from-words/lib/main.js:
@stdlib/number-float64-base-from-words/lib/index.js:
@stdlib/math-base-special-floor/lib/main.js:
@stdlib/math-base-special-floor/lib/index.js:
@stdlib/constants-float64-pinf/lib/index.js:
@stdlib/number-ctor/lib/main.js:
@stdlib/number-ctor/lib/index.js:
@stdlib/constants-float64-ninf/lib/index.js:
@stdlib/constants-float64-exponent-bias/lib/index.js:
@stdlib/constants-float64-max-base2-exponent/lib/index.js:
@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js:
@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js:
@stdlib/math-base-assert-is-nan/lib/main.js:
@stdlib/math-base-assert-is-nan/lib/index.js:
@stdlib/math-base-assert-is-infinite/lib/main.js:
@stdlib/math-base-assert-is-infinite/lib/index.js:
@stdlib/utils-define-property/lib/builtin.js:
@stdlib/utils-define-property/lib/polyfill.js:
@stdlib/utils-define-property/lib/index.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js:
@stdlib/number-float64-base-to-words/lib/indices.js:
@stdlib/number-float64-base-to-words/lib/assign.js:
@stdlib/number-float64-base-to-words/lib/main.js:
@stdlib/number-float64-base-to-words/lib/index.js:
@stdlib/math-base-special-copysign/lib/main.js:
@stdlib/math-base-special-copysign/lib/index.js:
@stdlib/constants-float64-smallest-normal/lib/index.js:
@stdlib/math-base-special-abs/lib/index.js:
@stdlib/number-float64-base-normalize/lib/assign.js:
@stdlib/number-float64-base-normalize/lib/main.js:
@stdlib/number-float64-base-normalize/lib/index.js:
@stdlib/number-float64-base-exponent/lib/main.js:
@stdlib/number-float64-base-exponent/lib/index.js:
@stdlib/math-base-special-ldexp/lib/main.js:
@stdlib/math-base-special-ldexp/lib/index.js:
@stdlib/math-base-special-round/lib/main.js:
@stdlib/math-base-special-round/lib/index.js:
@stdlib/math-base-special-rempio2/lib/index.js:
@stdlib/math-base-special-sin/lib/index.js:
@stdlib/math-base-special-cos/lib/index.js:
@stdlib/number-float64-base-signbit/lib/main.js:
@stdlib/number-float64-base-signbit/lib/index.js:
@stdlib/constants-float64-half-pi/lib/index.js:
@stdlib/constants-float64-fourth-pi/lib/index.js:
@stdlib/math-base-special-atan/lib/index.js:
@stdlib/constants-float64-pi/lib/index.js:
@stdlib/math-base-special-atan2/lib/index.js:
@stdlib/math-base-special-sqrt/lib/main.js:
@stdlib/math-base-special-sqrt/lib/index.js:
@stdlib/math-base-special-asin/lib/index.js:
@stdlib/math-base-special-acos/lib/index.js:
@stdlib/math-base-assert-is-integer/lib/main.js:
@stdlib/math-base-assert-is-integer/lib/index.js:
@stdlib/math-base-assert-is-even/lib/main.js:
@stdlib/math-base-assert-is-even/lib/index.js:
@stdlib/math-base-assert-is-odd/lib/main.js:
@stdlib/math-base-assert-is-odd/lib/index.js:
@stdlib/number-float64-base-set-low-word/lib/low.js:
@stdlib/number-float64-base-set-low-word/lib/main.js:
@stdlib/number-float64-base-set-low-word/lib/index.js:
@stdlib/number-uint32-base-to-int32/lib/main.js:
@stdlib/number-uint32-base-to-int32/lib/index.js:
@stdlib/math-base-special-pow/lib/y_is_infinite.js:
@stdlib/number-float64-base-set-high-word/lib/high.js:
@stdlib/number-float64-base-set-high-word/lib/main.js:
@stdlib/number-float64-base-set-high-word/lib/index.js:
@stdlib/constants-float64-ln-two/lib/index.js:
@stdlib/math-base-special-pow/lib/index.js:
@stdlib/math-base-special-hypot/lib/main.js:
@stdlib/math-base-special-hypot/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/math-base-special-kernel-cos/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/k_cos.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-kernel-sin/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/utils-define-property/lib/define_property.js:
@stdlib/utils-define-property/lib/has_define_property_support.js:
@stdlib/math-base-special-abs/lib/main.js:
@stdlib/array-base-filled/lib/main.js:
@stdlib/array-base-filled/lib/index.js:
@stdlib/array-base-zeros/lib/main.js:
@stdlib/array-base-zeros/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2021 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/math-base-special-rempio2/lib/kernel_rempio2.js:
@stdlib/math-base-special-rempio2/lib/rempio2_medium.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-rempio2/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  *
  * Optimized by Bruce D. Evans.
  * ```
  *)

@stdlib/math-base-special-sin/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-cos/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-atan/lib/main.js:
@stdlib/math-base-special-asin/lib/main.js:
@stdlib/math-base-special-acos/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright 1984, 1995, 2000 by Stephen L. Moshier
  *
  * Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
  *
  * Stephen L. Moshier
  * moshier@na-net.ornl.gov
  * ```
  *)

@stdlib/math-base-special-atan2/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original code, copyright and license are from [Go]{@link https://golang.org/src/math/atan2.go}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (c) 2009 The Go Authors. All rights reserved.
  *
  * Redistribution and use in source and binary forms, with or without
  * modification, are permitted provided that the following conditions are
  * met:
  *
  *    * Redistributions of source code must retain the above copyright
  * notice, this list of conditions and the following disclaimer.
  *    * Redistributions in binary form must reproduce the above
  * copyright notice, this list of conditions and the following disclaimer
  * in the documentation and/or other materials provided with the
  * distribution.
  *    * Neither the name of Google Inc. nor the names of its
  * contributors may be used to endorse or promote products derived from
  * this software without specific prior written permission.
  *
  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  * ```
  *)

@stdlib/math-base-special-pow/lib/x_is_zero.js:
@stdlib/math-base-special-pow/lib/y_is_huge.js:
@stdlib/math-base-special-pow/lib/log2ax.js:
@stdlib/math-base-special-pow/lib/logx.js:
@stdlib/math-base-special-pow/lib/pow2.js:
@stdlib/math-base-special-pow/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/constants-float64-num-high-word-significand-bits/lib/index.js:
@stdlib/math-base-special-pow/lib/polyval_l.js:
@stdlib/math-base-special-pow/lib/polyval_w.js:
@stdlib/math-base-special-pow/lib/polyval_p.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2024 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
*/
//# sourceMappingURL=worker.js.map
