import {
  Y as Tn,
  Z as Sr,
  a9 as _m,
  aa as ym,
  C as vm,
  _ as mm,
} from "./index-aff6404b.js";
import { e as Fr, N as Iu } from "./events-4ec3c2d6.js";
import {
  aT as _r,
  aU as cr,
  aV as kc,
  aW as bm,
  aX as Gl,
} from "./index-c70ad044.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
var Bo = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Gc =
  function (i, e) {
    return (
      (Gc =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, s) {
            t.__proto__ = s;
          }) ||
        function (t, s) {
          for (var o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
        }),
      Gc(i, e)
    );
  };
function wm(i, e) {
  Gc(i, e);
  function t() {
    this.constructor = i;
  }
  i.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
var Wc = function () {
  return (
    (Wc =
      Object.assign ||
      function (e) {
        for (var t, s = 1, o = arguments.length; s < o; s++) {
          t = arguments[s];
          for (var c in t)
            Object.prototype.hasOwnProperty.call(t, c) && (e[c] = t[c]);
        }
        return e;
      }),
    Wc.apply(this, arguments)
  );
};
function Em(i, e) {
  var t = {};
  for (var s in i)
    Object.prototype.hasOwnProperty.call(i, s) &&
      e.indexOf(s) < 0 &&
      (t[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(i); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(i, s[o]) &&
        (t[s[o]] = i[s[o]]);
  return t;
}
function Sm(i, e, t, s) {
  var o = arguments.length,
    c =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, t)) : s,
    l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    c = Reflect.decorate(i, e, t, s);
  else
    for (var p = i.length - 1; p >= 0; p--)
      (l = i[p]) && (c = (o < 3 ? l(c) : o > 3 ? l(e, t, c) : l(e, t)) || c);
  return o > 3 && c && Object.defineProperty(e, t, c), c;
}
function Im(i, e) {
  return function (t, s) {
    e(t, s, i);
  };
}
function xm(i, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, e);
}
function Om(i, e, t, s) {
  function o(c) {
    return c instanceof t
      ? c
      : new t(function (l) {
          l(c);
        });
  }
  return new (t || (t = Promise))(function (c, l) {
    function p(w) {
      try {
        d(s.next(w));
      } catch (A) {
        l(A);
      }
    }
    function _(w) {
      try {
        d(s.throw(w));
      } catch (A) {
        l(A);
      }
    }
    function d(w) {
      w.done ? c(w.value) : o(w.value).then(p, _);
    }
    d((s = s.apply(i, e || [])).next());
  });
}
function Pm(i, e) {
  var t = {
      label: 0,
      sent: function () {
        if (c[0] & 1) throw c[1];
        return c[1];
      },
      trys: [],
      ops: [],
    },
    s,
    o,
    c,
    l;
  return (
    (l = { next: p(0), throw: p(1), return: p(2) }),
    typeof Symbol == "function" &&
      (l[Symbol.iterator] = function () {
        return this;
      }),
    l
  );
  function p(d) {
    return function (w) {
      return _([d, w]);
    };
  }
  function _(d) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (
          ((s = 1),
          o &&
            (c =
              d[0] & 2
                ? o.return
                : d[0]
                ? o.throw || ((c = o.return) && c.call(o), 0)
                : o.next) &&
            !(c = c.call(o, d[1])).done)
        )
          return c;
        switch (((o = 0), c && (d = [d[0] & 2, c.value]), d[0])) {
          case 0:
          case 1:
            c = d;
            break;
          case 4:
            return t.label++, { value: d[1], done: !1 };
          case 5:
            t.label++, (o = d[1]), (d = [0]);
            continue;
          case 7:
            (d = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((c = t.trys),
              !(c = c.length > 0 && c[c.length - 1]) &&
                (d[0] === 6 || d[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (d[0] === 3 && (!c || (d[1] > c[0] && d[1] < c[3]))) {
              t.label = d[1];
              break;
            }
            if (d[0] === 6 && t.label < c[1]) {
              (t.label = c[1]), (c = d);
              break;
            }
            if (c && t.label < c[2]) {
              (t.label = c[2]), t.ops.push(d);
              break;
            }
            c[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        d = e.call(i, t);
      } catch (w) {
        (d = [6, w]), (o = 0);
      } finally {
        s = c = 0;
      }
    if (d[0] & 5) throw d[1];
    return { value: d[0] ? d[1] : void 0, done: !0 };
  }
}
function Am(i, e, t, s) {
  s === void 0 && (s = t), (i[s] = e[t]);
}
function Tm(i, e) {
  for (var t in i) t !== "default" && !e.hasOwnProperty(t) && (e[t] = i[t]);
}
function Yc(i) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    t = e && i[e],
    s = 0;
  if (t) return t.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function () {
        return (
          i && s >= i.length && (i = void 0), { value: i && i[s++], done: !i }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function Ip(i, e) {
  var t = typeof Symbol == "function" && i[Symbol.iterator];
  if (!t) return i;
  var s = t.call(i),
    o,
    c = [],
    l;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = s.next()).done; ) c.push(o.value);
  } catch (p) {
    l = { error: p };
  } finally {
    try {
      o && !o.done && (t = s.return) && t.call(s);
    } finally {
      if (l) throw l.error;
    }
  }
  return c;
}
function Cm() {
  for (var i = [], e = 0; e < arguments.length; e++)
    i = i.concat(Ip(arguments[e]));
  return i;
}
function Rm() {
  for (var i = 0, e = 0, t = arguments.length; e < t; e++)
    i += arguments[e].length;
  for (var s = Array(i), o = 0, e = 0; e < t; e++)
    for (var c = arguments[e], l = 0, p = c.length; l < p; l++, o++)
      s[o] = c[l];
  return s;
}
function ds(i) {
  return this instanceof ds ? ((this.v = i), this) : new ds(i);
}
function Nm(i, e, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = t.apply(i, e || []),
    o,
    c = [];
  return (
    (o = {}),
    l("next"),
    l("throw"),
    l("return"),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function l(S) {
    s[S] &&
      (o[S] = function (P) {
        return new Promise(function (M, K) {
          c.push([S, P, M, K]) > 1 || p(S, P);
        });
      });
  }
  function p(S, P) {
    try {
      _(s[S](P));
    } catch (M) {
      A(c[0][3], M);
    }
  }
  function _(S) {
    S.value instanceof ds
      ? Promise.resolve(S.value.v).then(d, w)
      : A(c[0][2], S);
  }
  function d(S) {
    p("next", S);
  }
  function w(S) {
    p("throw", S);
  }
  function A(S, P) {
    S(P), c.shift(), c.length && p(c[0][0], c[0][1]);
  }
}
function $m(i) {
  var e, t;
  return (
    (e = {}),
    s("next"),
    s("throw", function (o) {
      throw o;
    }),
    s("return"),
    (e[Symbol.iterator] = function () {
      return this;
    }),
    e
  );
  function s(o, c) {
    e[o] = i[o]
      ? function (l) {
          return (t = !t)
            ? { value: ds(i[o](l)), done: o === "return" }
            : c
            ? c(l)
            : l;
        }
      : c;
  }
}
function jm(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = i[Symbol.asyncIterator],
    t;
  return e
    ? e.call(i)
    : ((i = typeof Yc == "function" ? Yc(i) : i[Symbol.iterator]()),
      (t = {}),
      s("next"),
      s("throw"),
      s("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function s(c) {
    t[c] =
      i[c] &&
      function (l) {
        return new Promise(function (p, _) {
          (l = i[c](l)), o(p, _, l.done, l.value);
        });
      };
  }
  function o(c, l, p, _) {
    Promise.resolve(_).then(function (d) {
      c({ value: d, done: p });
    }, l);
  }
}
function Dm(i, e) {
  return (
    Object.defineProperty
      ? Object.defineProperty(i, "raw", { value: e })
      : (i.raw = e),
    i
  );
}
function Um(i) {
  if (i && i.__esModule) return i;
  var e = {};
  if (i != null)
    for (var t in i) Object.hasOwnProperty.call(i, t) && (e[t] = i[t]);
  return (e.default = i), e;
}
function Fm(i) {
  return i && i.__esModule ? i : { default: i };
}
function Lm(i, e) {
  if (!e.has(i))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(i);
}
function Mm(i, e, t) {
  if (!e.has(i))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(i, t), t;
}
const qm = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        get __assign() {
          return Wc;
        },
        __asyncDelegator: $m,
        __asyncGenerator: Nm,
        __asyncValues: jm,
        __await: ds,
        __awaiter: Om,
        __classPrivateFieldGet: Lm,
        __classPrivateFieldSet: Mm,
        __createBinding: Am,
        __decorate: Sm,
        __exportStar: Tm,
        __extends: wm,
        __generator: Pm,
        __importDefault: Fm,
        __importStar: Um,
        __makeTemplateObject: Dm,
        __metadata: xm,
        __param: Im,
        __read: Ip,
        __rest: Em,
        __spread: Cm,
        __spreadArrays: Rm,
        __values: Yc,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  xp = Tn(qm);
var ws = {};
Object.defineProperty(ws, "__esModule", { value: !0 });
function zm(i) {
  if (typeof i != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof i}`);
  try {
    return JSON.parse(i);
  } catch {
    return i;
  }
}
ws.safeJsonParse = zm;
function Hm(i) {
  return typeof i == "string"
    ? i
    : JSON.stringify(i, (e, t) => (typeof t > "u" ? null : t));
}
ws.safeJsonStringify = Hm;
var Zn = { exports: {} },
  Wl;
function Km() {
  return (
    Wl ||
      ((Wl = 1),
      (function () {
        let i;
        function e() {}
        (i = e),
          (i.prototype.getItem = function (t) {
            return this.hasOwnProperty(t) ? String(this[t]) : null;
          }),
          (i.prototype.setItem = function (t, s) {
            this[t] = String(s);
          }),
          (i.prototype.removeItem = function (t) {
            delete this[t];
          }),
          (i.prototype.clear = function () {
            const t = this;
            Object.keys(t).forEach(function (s) {
              (t[s] = void 0), delete t[s];
            });
          }),
          (i.prototype.key = function (t) {
            return (t = t || 0), Object.keys(this)[t];
          }),
          i.prototype.__defineGetter__("length", function () {
            return Object.keys(this).length;
          }),
          typeof Sr < "u" && Sr.localStorage
            ? (Zn.exports = Sr.localStorage)
            : typeof window < "u" && window.localStorage
            ? (Zn.exports = window.localStorage)
            : (Zn.exports = new e());
      })()),
    Zn.exports
  );
}
var Pc = {},
  es = {},
  Yl;
function Bm() {
  if (Yl) return es;
  (Yl = 1),
    Object.defineProperty(es, "__esModule", { value: !0 }),
    (es.IKeyValueStorage = void 0);
  class i {}
  return (es.IKeyValueStorage = i), es;
}
var ts = {},
  Jl;
function Vm() {
  if (Jl) return ts;
  (Jl = 1),
    Object.defineProperty(ts, "__esModule", { value: !0 }),
    (ts.parseEntry = void 0);
  const i = ws;
  function e(t) {
    var s;
    return [
      t[0],
      i.safeJsonParse((s = t[1]) !== null && s !== void 0 ? s : ""),
    ];
  }
  return (ts.parseEntry = e), ts;
}
var Xl;
function km() {
  return (
    Xl ||
      ((Xl = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        const e = xp;
        e.__exportStar(Bm(), i), e.__exportStar(Vm(), i);
      })(Pc)),
    Pc
  );
}
Object.defineProperty(Bo, "__esModule", { value: !0 });
Bo.KeyValueStorage = void 0;
const xn = xp,
  Ql = ws,
  Gm = xn.__importDefault(Km()),
  Wm = km();
class Op {
  constructor() {
    this.localStorage = Gm.default;
  }
  getKeys() {
    return xn.__awaiter(this, void 0, void 0, function* () {
      return Object.keys(this.localStorage);
    });
  }
  getEntries() {
    return xn.__awaiter(this, void 0, void 0, function* () {
      return Object.entries(this.localStorage).map(Wm.parseEntry);
    });
  }
  getItem(e) {
    return xn.__awaiter(this, void 0, void 0, function* () {
      const t = this.localStorage.getItem(e);
      if (t !== null) return Ql.safeJsonParse(t);
    });
  }
  setItem(e, t) {
    return xn.__awaiter(this, void 0, void 0, function* () {
      this.localStorage.setItem(e, Ql.safeJsonStringify(t));
    });
  }
  removeItem(e) {
    return xn.__awaiter(this, void 0, void 0, function* () {
      this.localStorage.removeItem(e);
    });
  }
}
Bo.KeyValueStorage = Op;
var Ym = (Bo.default = Op),
  Cn = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Jc =
  function (i, e) {
    return (
      (Jc =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, s) {
            t.__proto__ = s;
          }) ||
        function (t, s) {
          for (var o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
        }),
      Jc(i, e)
    );
  };
function Jm(i, e) {
  Jc(i, e);
  function t() {
    this.constructor = i;
  }
  i.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
var Xc = function () {
  return (
    (Xc =
      Object.assign ||
      function (e) {
        for (var t, s = 1, o = arguments.length; s < o; s++) {
          t = arguments[s];
          for (var c in t)
            Object.prototype.hasOwnProperty.call(t, c) && (e[c] = t[c]);
        }
        return e;
      }),
    Xc.apply(this, arguments)
  );
};
function Xm(i, e) {
  var t = {};
  for (var s in i)
    Object.prototype.hasOwnProperty.call(i, s) &&
      e.indexOf(s) < 0 &&
      (t[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(i); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(i, s[o]) &&
        (t[s[o]] = i[s[o]]);
  return t;
}
function Qm(i, e, t, s) {
  var o = arguments.length,
    c =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, t)) : s,
    l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    c = Reflect.decorate(i, e, t, s);
  else
    for (var p = i.length - 1; p >= 0; p--)
      (l = i[p]) && (c = (o < 3 ? l(c) : o > 3 ? l(e, t, c) : l(e, t)) || c);
  return o > 3 && c && Object.defineProperty(e, t, c), c;
}
function Zm(i, e) {
  return function (t, s) {
    e(t, s, i);
  };
}
function eb(i, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, e);
}
function tb(i, e, t, s) {
  function o(c) {
    return c instanceof t
      ? c
      : new t(function (l) {
          l(c);
        });
  }
  return new (t || (t = Promise))(function (c, l) {
    function p(w) {
      try {
        d(s.next(w));
      } catch (A) {
        l(A);
      }
    }
    function _(w) {
      try {
        d(s.throw(w));
      } catch (A) {
        l(A);
      }
    }
    function d(w) {
      w.done ? c(w.value) : o(w.value).then(p, _);
    }
    d((s = s.apply(i, e || [])).next());
  });
}
function rb(i, e) {
  var t = {
      label: 0,
      sent: function () {
        if (c[0] & 1) throw c[1];
        return c[1];
      },
      trys: [],
      ops: [],
    },
    s,
    o,
    c,
    l;
  return (
    (l = { next: p(0), throw: p(1), return: p(2) }),
    typeof Symbol == "function" &&
      (l[Symbol.iterator] = function () {
        return this;
      }),
    l
  );
  function p(d) {
    return function (w) {
      return _([d, w]);
    };
  }
  function _(d) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (
          ((s = 1),
          o &&
            (c =
              d[0] & 2
                ? o.return
                : d[0]
                ? o.throw || ((c = o.return) && c.call(o), 0)
                : o.next) &&
            !(c = c.call(o, d[1])).done)
        )
          return c;
        switch (((o = 0), c && (d = [d[0] & 2, c.value]), d[0])) {
          case 0:
          case 1:
            c = d;
            break;
          case 4:
            return t.label++, { value: d[1], done: !1 };
          case 5:
            t.label++, (o = d[1]), (d = [0]);
            continue;
          case 7:
            (d = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((c = t.trys),
              !(c = c.length > 0 && c[c.length - 1]) &&
                (d[0] === 6 || d[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (d[0] === 3 && (!c || (d[1] > c[0] && d[1] < c[3]))) {
              t.label = d[1];
              break;
            }
            if (d[0] === 6 && t.label < c[1]) {
              (t.label = c[1]), (c = d);
              break;
            }
            if (c && t.label < c[2]) {
              (t.label = c[2]), t.ops.push(d);
              break;
            }
            c[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        d = e.call(i, t);
      } catch (w) {
        (d = [6, w]), (o = 0);
      } finally {
        s = c = 0;
      }
    if (d[0] & 5) throw d[1];
    return { value: d[0] ? d[1] : void 0, done: !0 };
  }
}
function ib(i, e, t, s) {
  s === void 0 && (s = t), (i[s] = e[t]);
}
function nb(i, e) {
  for (var t in i) t !== "default" && !e.hasOwnProperty(t) && (e[t] = i[t]);
}
function Qc(i) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    t = e && i[e],
    s = 0;
  if (t) return t.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function () {
        return (
          i && s >= i.length && (i = void 0), { value: i && i[s++], done: !i }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function Pp(i, e) {
  var t = typeof Symbol == "function" && i[Symbol.iterator];
  if (!t) return i;
  var s = t.call(i),
    o,
    c = [],
    l;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = s.next()).done; ) c.push(o.value);
  } catch (p) {
    l = { error: p };
  } finally {
    try {
      o && !o.done && (t = s.return) && t.call(s);
    } finally {
      if (l) throw l.error;
    }
  }
  return c;
}
function sb() {
  for (var i = [], e = 0; e < arguments.length; e++)
    i = i.concat(Pp(arguments[e]));
  return i;
}
function ob() {
  for (var i = 0, e = 0, t = arguments.length; e < t; e++)
    i += arguments[e].length;
  for (var s = Array(i), o = 0, e = 0; e < t; e++)
    for (var c = arguments[e], l = 0, p = c.length; l < p; l++, o++)
      s[o] = c[l];
  return s;
}
function gs(i) {
  return this instanceof gs ? ((this.v = i), this) : new gs(i);
}
function ab(i, e, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = t.apply(i, e || []),
    o,
    c = [];
  return (
    (o = {}),
    l("next"),
    l("throw"),
    l("return"),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function l(S) {
    s[S] &&
      (o[S] = function (P) {
        return new Promise(function (M, K) {
          c.push([S, P, M, K]) > 1 || p(S, P);
        });
      });
  }
  function p(S, P) {
    try {
      _(s[S](P));
    } catch (M) {
      A(c[0][3], M);
    }
  }
  function _(S) {
    S.value instanceof gs
      ? Promise.resolve(S.value.v).then(d, w)
      : A(c[0][2], S);
  }
  function d(S) {
    p("next", S);
  }
  function w(S) {
    p("throw", S);
  }
  function A(S, P) {
    S(P), c.shift(), c.length && p(c[0][0], c[0][1]);
  }
}
function cb(i) {
  var e, t;
  return (
    (e = {}),
    s("next"),
    s("throw", function (o) {
      throw o;
    }),
    s("return"),
    (e[Symbol.iterator] = function () {
      return this;
    }),
    e
  );
  function s(o, c) {
    e[o] = i[o]
      ? function (l) {
          return (t = !t)
            ? { value: gs(i[o](l)), done: o === "return" }
            : c
            ? c(l)
            : l;
        }
      : c;
  }
}
function ub(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = i[Symbol.asyncIterator],
    t;
  return e
    ? e.call(i)
    : ((i = typeof Qc == "function" ? Qc(i) : i[Symbol.iterator]()),
      (t = {}),
      s("next"),
      s("throw"),
      s("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function s(c) {
    t[c] =
      i[c] &&
      function (l) {
        return new Promise(function (p, _) {
          (l = i[c](l)), o(p, _, l.done, l.value);
        });
      };
  }
  function o(c, l, p, _) {
    Promise.resolve(_).then(function (d) {
      c({ value: d, done: p });
    }, l);
  }
}
function hb(i, e) {
  return (
    Object.defineProperty
      ? Object.defineProperty(i, "raw", { value: e })
      : (i.raw = e),
    i
  );
}
function lb(i) {
  if (i && i.__esModule) return i;
  var e = {};
  if (i != null)
    for (var t in i) Object.hasOwnProperty.call(i, t) && (e[t] = i[t]);
  return (e.default = i), e;
}
function fb(i) {
  return i && i.__esModule ? i : { default: i };
}
function pb(i, e) {
  if (!e.has(i))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(i);
}
function db(i, e, t) {
  if (!e.has(i))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(i, t), t;
}
const gb = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        get __assign() {
          return Xc;
        },
        __asyncDelegator: cb,
        __asyncGenerator: ab,
        __asyncValues: ub,
        __await: gs,
        __awaiter: tb,
        __classPrivateFieldGet: pb,
        __classPrivateFieldSet: db,
        __createBinding: ib,
        __decorate: Qm,
        __exportStar: nb,
        __extends: Jm,
        __generator: rb,
        __importDefault: fb,
        __importStar: lb,
        __makeTemplateObject: hb,
        __metadata: eb,
        __param: Zm,
        __read: Pp,
        __rest: Xm,
        __spread: sb,
        __spreadArrays: ob,
        __values: Qc,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Vo = Tn(gb);
var rs = {},
  _e = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Zc =
  function (i, e) {
    return (
      (Zc =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, s) {
            t.__proto__ = s;
          }) ||
        function (t, s) {
          for (var o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
        }),
      Zc(i, e)
    );
  };
function _b(i, e) {
  Zc(i, e);
  function t() {
    this.constructor = i;
  }
  i.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
var eu = function () {
  return (
    (eu =
      Object.assign ||
      function (e) {
        for (var t, s = 1, o = arguments.length; s < o; s++) {
          t = arguments[s];
          for (var c in t)
            Object.prototype.hasOwnProperty.call(t, c) && (e[c] = t[c]);
        }
        return e;
      }),
    eu.apply(this, arguments)
  );
};
function yb(i, e) {
  var t = {};
  for (var s in i)
    Object.prototype.hasOwnProperty.call(i, s) &&
      e.indexOf(s) < 0 &&
      (t[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(i); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(i, s[o]) &&
        (t[s[o]] = i[s[o]]);
  return t;
}
function vb(i, e, t, s) {
  var o = arguments.length,
    c =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, t)) : s,
    l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    c = Reflect.decorate(i, e, t, s);
  else
    for (var p = i.length - 1; p >= 0; p--)
      (l = i[p]) && (c = (o < 3 ? l(c) : o > 3 ? l(e, t, c) : l(e, t)) || c);
  return o > 3 && c && Object.defineProperty(e, t, c), c;
}
function mb(i, e) {
  return function (t, s) {
    e(t, s, i);
  };
}
function bb(i, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, e);
}
function wb(i, e, t, s) {
  function o(c) {
    return c instanceof t
      ? c
      : new t(function (l) {
          l(c);
        });
  }
  return new (t || (t = Promise))(function (c, l) {
    function p(w) {
      try {
        d(s.next(w));
      } catch (A) {
        l(A);
      }
    }
    function _(w) {
      try {
        d(s.throw(w));
      } catch (A) {
        l(A);
      }
    }
    function d(w) {
      w.done ? c(w.value) : o(w.value).then(p, _);
    }
    d((s = s.apply(i, e || [])).next());
  });
}
function Eb(i, e) {
  var t = {
      label: 0,
      sent: function () {
        if (c[0] & 1) throw c[1];
        return c[1];
      },
      trys: [],
      ops: [],
    },
    s,
    o,
    c,
    l;
  return (
    (l = { next: p(0), throw: p(1), return: p(2) }),
    typeof Symbol == "function" &&
      (l[Symbol.iterator] = function () {
        return this;
      }),
    l
  );
  function p(d) {
    return function (w) {
      return _([d, w]);
    };
  }
  function _(d) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (
          ((s = 1),
          o &&
            (c =
              d[0] & 2
                ? o.return
                : d[0]
                ? o.throw || ((c = o.return) && c.call(o), 0)
                : o.next) &&
            !(c = c.call(o, d[1])).done)
        )
          return c;
        switch (((o = 0), c && (d = [d[0] & 2, c.value]), d[0])) {
          case 0:
          case 1:
            c = d;
            break;
          case 4:
            return t.label++, { value: d[1], done: !1 };
          case 5:
            t.label++, (o = d[1]), (d = [0]);
            continue;
          case 7:
            (d = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((c = t.trys),
              !(c = c.length > 0 && c[c.length - 1]) &&
                (d[0] === 6 || d[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (d[0] === 3 && (!c || (d[1] > c[0] && d[1] < c[3]))) {
              t.label = d[1];
              break;
            }
            if (d[0] === 6 && t.label < c[1]) {
              (t.label = c[1]), (c = d);
              break;
            }
            if (c && t.label < c[2]) {
              (t.label = c[2]), t.ops.push(d);
              break;
            }
            c[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        d = e.call(i, t);
      } catch (w) {
        (d = [6, w]), (o = 0);
      } finally {
        s = c = 0;
      }
    if (d[0] & 5) throw d[1];
    return { value: d[0] ? d[1] : void 0, done: !0 };
  }
}
function Sb(i, e, t, s) {
  s === void 0 && (s = t), (i[s] = e[t]);
}
function Ib(i, e) {
  for (var t in i) t !== "default" && !e.hasOwnProperty(t) && (e[t] = i[t]);
}
function tu(i) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    t = e && i[e],
    s = 0;
  if (t) return t.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function () {
        return (
          i && s >= i.length && (i = void 0), { value: i && i[s++], done: !i }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function Ap(i, e) {
  var t = typeof Symbol == "function" && i[Symbol.iterator];
  if (!t) return i;
  var s = t.call(i),
    o,
    c = [],
    l;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = s.next()).done; ) c.push(o.value);
  } catch (p) {
    l = { error: p };
  } finally {
    try {
      o && !o.done && (t = s.return) && t.call(s);
    } finally {
      if (l) throw l.error;
    }
  }
  return c;
}
function xb() {
  for (var i = [], e = 0; e < arguments.length; e++)
    i = i.concat(Ap(arguments[e]));
  return i;
}
function Ob() {
  for (var i = 0, e = 0, t = arguments.length; e < t; e++)
    i += arguments[e].length;
  for (var s = Array(i), o = 0, e = 0; e < t; e++)
    for (var c = arguments[e], l = 0, p = c.length; l < p; l++, o++)
      s[o] = c[l];
  return s;
}
function _s(i) {
  return this instanceof _s ? ((this.v = i), this) : new _s(i);
}
function Pb(i, e, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = t.apply(i, e || []),
    o,
    c = [];
  return (
    (o = {}),
    l("next"),
    l("throw"),
    l("return"),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function l(S) {
    s[S] &&
      (o[S] = function (P) {
        return new Promise(function (M, K) {
          c.push([S, P, M, K]) > 1 || p(S, P);
        });
      });
  }
  function p(S, P) {
    try {
      _(s[S](P));
    } catch (M) {
      A(c[0][3], M);
    }
  }
  function _(S) {
    S.value instanceof _s
      ? Promise.resolve(S.value.v).then(d, w)
      : A(c[0][2], S);
  }
  function d(S) {
    p("next", S);
  }
  function w(S) {
    p("throw", S);
  }
  function A(S, P) {
    S(P), c.shift(), c.length && p(c[0][0], c[0][1]);
  }
}
function Ab(i) {
  var e, t;
  return (
    (e = {}),
    s("next"),
    s("throw", function (o) {
      throw o;
    }),
    s("return"),
    (e[Symbol.iterator] = function () {
      return this;
    }),
    e
  );
  function s(o, c) {
    e[o] = i[o]
      ? function (l) {
          return (t = !t)
            ? { value: _s(i[o](l)), done: o === "return" }
            : c
            ? c(l)
            : l;
        }
      : c;
  }
}
function Tb(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = i[Symbol.asyncIterator],
    t;
  return e
    ? e.call(i)
    : ((i = typeof tu == "function" ? tu(i) : i[Symbol.iterator]()),
      (t = {}),
      s("next"),
      s("throw"),
      s("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function s(c) {
    t[c] =
      i[c] &&
      function (l) {
        return new Promise(function (p, _) {
          (l = i[c](l)), o(p, _, l.done, l.value);
        });
      };
  }
  function o(c, l, p, _) {
    Promise.resolve(_).then(function (d) {
      c({ value: d, done: p });
    }, l);
  }
}
function Cb(i, e) {
  return (
    Object.defineProperty
      ? Object.defineProperty(i, "raw", { value: e })
      : (i.raw = e),
    i
  );
}
function Rb(i) {
  if (i && i.__esModule) return i;
  var e = {};
  if (i != null)
    for (var t in i) Object.hasOwnProperty.call(i, t) && (e[t] = i[t]);
  return (e.default = i), e;
}
function Nb(i) {
  return i && i.__esModule ? i : { default: i };
}
function $b(i, e) {
  if (!e.has(i))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(i);
}
function jb(i, e, t) {
  if (!e.has(i))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(i, t), t;
}
const Db = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        get __assign() {
          return eu;
        },
        __asyncDelegator: Ab,
        __asyncGenerator: Pb,
        __asyncValues: Tb,
        __await: _s,
        __awaiter: wb,
        __classPrivateFieldGet: $b,
        __classPrivateFieldSet: jb,
        __createBinding: Sb,
        __decorate: vb,
        __exportStar: Ib,
        __extends: _b,
        __generator: Eb,
        __importDefault: Nb,
        __importStar: Rb,
        __makeTemplateObject: Cb,
        __metadata: bb,
        __param: mb,
        __read: Ap,
        __rest: yb,
        __spread: xb,
        __spreadArrays: Ob,
        __values: tu,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  ko = Tn(Db);
var Ac = {},
  is = {},
  Zl;
function Ub() {
  if (Zl) return is;
  (Zl = 1),
    Object.defineProperty(is, "__esModule", { value: !0 }),
    (is.delay = void 0);
  function i(e) {
    return new Promise((t) => {
      setTimeout(() => {
        t(!0);
      }, e);
    });
  }
  return (is.delay = i), is;
}
var Wi = {},
  Tc = {},
  Yi = {},
  ef;
function Fb() {
  return (
    ef ||
      ((ef = 1),
      Object.defineProperty(Yi, "__esModule", { value: !0 }),
      (Yi.ONE_THOUSAND = Yi.ONE_HUNDRED = void 0),
      (Yi.ONE_HUNDRED = 100),
      (Yi.ONE_THOUSAND = 1e3)),
    Yi
  );
}
var Cc = {},
  tf;
function Lb() {
  return (
    tf ||
      ((tf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          (i.ONE_YEAR =
            i.FOUR_WEEKS =
            i.THREE_WEEKS =
            i.TWO_WEEKS =
            i.ONE_WEEK =
            i.THIRTY_DAYS =
            i.SEVEN_DAYS =
            i.FIVE_DAYS =
            i.THREE_DAYS =
            i.ONE_DAY =
            i.TWENTY_FOUR_HOURS =
            i.TWELVE_HOURS =
            i.SIX_HOURS =
            i.THREE_HOURS =
            i.ONE_HOUR =
            i.SIXTY_MINUTES =
            i.THIRTY_MINUTES =
            i.TEN_MINUTES =
            i.FIVE_MINUTES =
            i.ONE_MINUTE =
            i.SIXTY_SECONDS =
            i.THIRTY_SECONDS =
            i.TEN_SECONDS =
            i.FIVE_SECONDS =
            i.ONE_SECOND =
              void 0),
          (i.ONE_SECOND = 1),
          (i.FIVE_SECONDS = 5),
          (i.TEN_SECONDS = 10),
          (i.THIRTY_SECONDS = 30),
          (i.SIXTY_SECONDS = 60),
          (i.ONE_MINUTE = i.SIXTY_SECONDS),
          (i.FIVE_MINUTES = i.ONE_MINUTE * 5),
          (i.TEN_MINUTES = i.ONE_MINUTE * 10),
          (i.THIRTY_MINUTES = i.ONE_MINUTE * 30),
          (i.SIXTY_MINUTES = i.ONE_MINUTE * 60),
          (i.ONE_HOUR = i.SIXTY_MINUTES),
          (i.THREE_HOURS = i.ONE_HOUR * 3),
          (i.SIX_HOURS = i.ONE_HOUR * 6),
          (i.TWELVE_HOURS = i.ONE_HOUR * 12),
          (i.TWENTY_FOUR_HOURS = i.ONE_HOUR * 24),
          (i.ONE_DAY = i.TWENTY_FOUR_HOURS),
          (i.THREE_DAYS = i.ONE_DAY * 3),
          (i.FIVE_DAYS = i.ONE_DAY * 5),
          (i.SEVEN_DAYS = i.ONE_DAY * 7),
          (i.THIRTY_DAYS = i.ONE_DAY * 30),
          (i.ONE_WEEK = i.SEVEN_DAYS),
          (i.TWO_WEEKS = i.ONE_WEEK * 2),
          (i.THREE_WEEKS = i.ONE_WEEK * 3),
          (i.FOUR_WEEKS = i.ONE_WEEK * 4),
          (i.ONE_YEAR = i.ONE_DAY * 365);
      })(Cc)),
    Cc
  );
}
var rf;
function Tp() {
  return (
    rf ||
      ((rf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        const e = ko;
        e.__exportStar(Fb(), i), e.__exportStar(Lb(), i);
      })(Tc)),
    Tc
  );
}
var nf;
function Mb() {
  if (nf) return Wi;
  (nf = 1),
    Object.defineProperty(Wi, "__esModule", { value: !0 }),
    (Wi.fromMiliseconds = Wi.toMiliseconds = void 0);
  const i = Tp();
  function e(s) {
    return s * i.ONE_THOUSAND;
  }
  Wi.toMiliseconds = e;
  function t(s) {
    return Math.floor(s / i.ONE_THOUSAND);
  }
  return (Wi.fromMiliseconds = t), Wi;
}
var sf;
function qb() {
  return (
    sf ||
      ((sf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        const e = ko;
        e.__exportStar(Ub(), i), e.__exportStar(Mb(), i);
      })(Ac)),
    Ac
  );
}
var In = {},
  of;
function zb() {
  if (of) return In;
  (of = 1),
    Object.defineProperty(In, "__esModule", { value: !0 }),
    (In.Watch = void 0);
  class i {
    constructor() {
      this.timestamps = new Map();
    }
    start(t) {
      if (this.timestamps.has(t))
        throw new Error(`Watch already started for label: ${t}`);
      this.timestamps.set(t, { started: Date.now() });
    }
    stop(t) {
      const s = this.get(t);
      if (typeof s.elapsed < "u")
        throw new Error(`Watch already stopped for label: ${t}`);
      const o = Date.now() - s.started;
      this.timestamps.set(t, { started: s.started, elapsed: o });
    }
    get(t) {
      const s = this.timestamps.get(t);
      if (typeof s > "u") throw new Error(`No timestamp found for label: ${t}`);
      return s;
    }
    elapsed(t) {
      const s = this.get(t);
      return s.elapsed || Date.now() - s.started;
    }
  }
  return (In.Watch = i), (In.default = i), In;
}
var Rc = {},
  ns = {},
  af;
function Hb() {
  if (af) return ns;
  (af = 1),
    Object.defineProperty(ns, "__esModule", { value: !0 }),
    (ns.IWatch = void 0);
  class i {}
  return (ns.IWatch = i), ns;
}
var cf;
function Kb() {
  return (
    cf ||
      ((cf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          ko.__exportStar(Hb(), i);
      })(Rc)),
    Rc
  );
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  const e = ko;
  e.__exportStar(qb(), i),
    e.__exportStar(zb(), i),
    e.__exportStar(Kb(), i),
    e.__exportStar(Tp(), i);
})(_e);
var Nc = {},
  ss = {};
let Zi = class {};
const Bb = Object.freeze(
    Object.defineProperty(
      { __proto__: null, IEvents: Zi },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Vb = Tn(Bb);
var uf;
function kb() {
  if (uf) return ss;
  (uf = 1),
    Object.defineProperty(ss, "__esModule", { value: !0 }),
    (ss.IHeartBeat = void 0);
  const i = Vb;
  class e extends i.IEvents {
    constructor(s) {
      super();
    }
  }
  return (ss.IHeartBeat = e), ss;
}
var hf;
function Cp() {
  return (
    hf ||
      ((hf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Vo.__exportStar(kb(), i);
      })(Nc)),
    Nc
  );
}
var $c = {},
  Ji = {},
  lf;
function Gb() {
  if (lf) return Ji;
  (lf = 1),
    Object.defineProperty(Ji, "__esModule", { value: !0 }),
    (Ji.HEARTBEAT_EVENTS = Ji.HEARTBEAT_INTERVAL = void 0);
  const i = _e;
  return (
    (Ji.HEARTBEAT_INTERVAL = i.FIVE_SECONDS),
    (Ji.HEARTBEAT_EVENTS = { pulse: "heartbeat_pulse" }),
    Ji
  );
}
var ff;
function Rp() {
  return (
    ff ||
      ((ff = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Vo.__exportStar(Gb(), i);
      })($c)),
    $c
  );
}
var pf;
function Wb() {
  if (pf) return rs;
  (pf = 1),
    Object.defineProperty(rs, "__esModule", { value: !0 }),
    (rs.HeartBeat = void 0);
  const i = Vo,
    e = Fr,
    t = _e,
    s = Cp(),
    o = Rp();
  class c extends s.IHeartBeat {
    constructor(p) {
      super(p),
        (this.events = new e.EventEmitter()),
        (this.interval = o.HEARTBEAT_INTERVAL),
        (this.interval =
          (p == null ? void 0 : p.interval) || o.HEARTBEAT_INTERVAL);
    }
    static init(p) {
      return i.__awaiter(this, void 0, void 0, function* () {
        const _ = new c(p);
        return yield _.init(), _;
      });
    }
    init() {
      return i.__awaiter(this, void 0, void 0, function* () {
        yield this.initialize();
      });
    }
    stop() {
      clearInterval(this.intervalRef);
    }
    on(p, _) {
      this.events.on(p, _);
    }
    once(p, _) {
      this.events.once(p, _);
    }
    off(p, _) {
      this.events.off(p, _);
    }
    removeListener(p, _) {
      this.events.removeListener(p, _);
    }
    initialize() {
      return i.__awaiter(this, void 0, void 0, function* () {
        this.intervalRef = setInterval(
          () => this.pulse(),
          t.toMiliseconds(this.interval),
        );
      });
    }
    pulse() {
      this.events.emit(o.HEARTBEAT_EVENTS.pulse);
    }
  }
  return (rs.HeartBeat = c), rs;
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  const e = Vo;
  e.__exportStar(Wb(), i), e.__exportStar(Cp(), i), e.__exportStar(Rp(), i);
})(Cn);
var Ze = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var ru =
  function (i, e) {
    return (
      (ru =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, s) {
            t.__proto__ = s;
          }) ||
        function (t, s) {
          for (var o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
        }),
      ru(i, e)
    );
  };
function Yb(i, e) {
  ru(i, e);
  function t() {
    this.constructor = i;
  }
  i.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
var iu = function () {
  return (
    (iu =
      Object.assign ||
      function (e) {
        for (var t, s = 1, o = arguments.length; s < o; s++) {
          t = arguments[s];
          for (var c in t)
            Object.prototype.hasOwnProperty.call(t, c) && (e[c] = t[c]);
        }
        return e;
      }),
    iu.apply(this, arguments)
  );
};
function Jb(i, e) {
  var t = {};
  for (var s in i)
    Object.prototype.hasOwnProperty.call(i, s) &&
      e.indexOf(s) < 0 &&
      (t[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(i); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(i, s[o]) &&
        (t[s[o]] = i[s[o]]);
  return t;
}
function Xb(i, e, t, s) {
  var o = arguments.length,
    c =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, t)) : s,
    l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    c = Reflect.decorate(i, e, t, s);
  else
    for (var p = i.length - 1; p >= 0; p--)
      (l = i[p]) && (c = (o < 3 ? l(c) : o > 3 ? l(e, t, c) : l(e, t)) || c);
  return o > 3 && c && Object.defineProperty(e, t, c), c;
}
function Qb(i, e) {
  return function (t, s) {
    e(t, s, i);
  };
}
function Zb(i, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, e);
}
function ew(i, e, t, s) {
  function o(c) {
    return c instanceof t
      ? c
      : new t(function (l) {
          l(c);
        });
  }
  return new (t || (t = Promise))(function (c, l) {
    function p(w) {
      try {
        d(s.next(w));
      } catch (A) {
        l(A);
      }
    }
    function _(w) {
      try {
        d(s.throw(w));
      } catch (A) {
        l(A);
      }
    }
    function d(w) {
      w.done ? c(w.value) : o(w.value).then(p, _);
    }
    d((s = s.apply(i, e || [])).next());
  });
}
function tw(i, e) {
  var t = {
      label: 0,
      sent: function () {
        if (c[0] & 1) throw c[1];
        return c[1];
      },
      trys: [],
      ops: [],
    },
    s,
    o,
    c,
    l;
  return (
    (l = { next: p(0), throw: p(1), return: p(2) }),
    typeof Symbol == "function" &&
      (l[Symbol.iterator] = function () {
        return this;
      }),
    l
  );
  function p(d) {
    return function (w) {
      return _([d, w]);
    };
  }
  function _(d) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (
          ((s = 1),
          o &&
            (c =
              d[0] & 2
                ? o.return
                : d[0]
                ? o.throw || ((c = o.return) && c.call(o), 0)
                : o.next) &&
            !(c = c.call(o, d[1])).done)
        )
          return c;
        switch (((o = 0), c && (d = [d[0] & 2, c.value]), d[0])) {
          case 0:
          case 1:
            c = d;
            break;
          case 4:
            return t.label++, { value: d[1], done: !1 };
          case 5:
            t.label++, (o = d[1]), (d = [0]);
            continue;
          case 7:
            (d = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((c = t.trys),
              !(c = c.length > 0 && c[c.length - 1]) &&
                (d[0] === 6 || d[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (d[0] === 3 && (!c || (d[1] > c[0] && d[1] < c[3]))) {
              t.label = d[1];
              break;
            }
            if (d[0] === 6 && t.label < c[1]) {
              (t.label = c[1]), (c = d);
              break;
            }
            if (c && t.label < c[2]) {
              (t.label = c[2]), t.ops.push(d);
              break;
            }
            c[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        d = e.call(i, t);
      } catch (w) {
        (d = [6, w]), (o = 0);
      } finally {
        s = c = 0;
      }
    if (d[0] & 5) throw d[1];
    return { value: d[0] ? d[1] : void 0, done: !0 };
  }
}
function rw(i, e, t, s) {
  s === void 0 && (s = t), (i[s] = e[t]);
}
function iw(i, e) {
  for (var t in i) t !== "default" && !e.hasOwnProperty(t) && (e[t] = i[t]);
}
function nu(i) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    t = e && i[e],
    s = 0;
  if (t) return t.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function () {
        return (
          i && s >= i.length && (i = void 0), { value: i && i[s++], done: !i }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function Np(i, e) {
  var t = typeof Symbol == "function" && i[Symbol.iterator];
  if (!t) return i;
  var s = t.call(i),
    o,
    c = [],
    l;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = s.next()).done; ) c.push(o.value);
  } catch (p) {
    l = { error: p };
  } finally {
    try {
      o && !o.done && (t = s.return) && t.call(s);
    } finally {
      if (l) throw l.error;
    }
  }
  return c;
}
function nw() {
  for (var i = [], e = 0; e < arguments.length; e++)
    i = i.concat(Np(arguments[e]));
  return i;
}
function sw() {
  for (var i = 0, e = 0, t = arguments.length; e < t; e++)
    i += arguments[e].length;
  for (var s = Array(i), o = 0, e = 0; e < t; e++)
    for (var c = arguments[e], l = 0, p = c.length; l < p; l++, o++)
      s[o] = c[l];
  return s;
}
function ys(i) {
  return this instanceof ys ? ((this.v = i), this) : new ys(i);
}
function ow(i, e, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = t.apply(i, e || []),
    o,
    c = [];
  return (
    (o = {}),
    l("next"),
    l("throw"),
    l("return"),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function l(S) {
    s[S] &&
      (o[S] = function (P) {
        return new Promise(function (M, K) {
          c.push([S, P, M, K]) > 1 || p(S, P);
        });
      });
  }
  function p(S, P) {
    try {
      _(s[S](P));
    } catch (M) {
      A(c[0][3], M);
    }
  }
  function _(S) {
    S.value instanceof ys
      ? Promise.resolve(S.value.v).then(d, w)
      : A(c[0][2], S);
  }
  function d(S) {
    p("next", S);
  }
  function w(S) {
    p("throw", S);
  }
  function A(S, P) {
    S(P), c.shift(), c.length && p(c[0][0], c[0][1]);
  }
}
function aw(i) {
  var e, t;
  return (
    (e = {}),
    s("next"),
    s("throw", function (o) {
      throw o;
    }),
    s("return"),
    (e[Symbol.iterator] = function () {
      return this;
    }),
    e
  );
  function s(o, c) {
    e[o] = i[o]
      ? function (l) {
          return (t = !t)
            ? { value: ys(i[o](l)), done: o === "return" }
            : c
            ? c(l)
            : l;
        }
      : c;
  }
}
function cw(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = i[Symbol.asyncIterator],
    t;
  return e
    ? e.call(i)
    : ((i = typeof nu == "function" ? nu(i) : i[Symbol.iterator]()),
      (t = {}),
      s("next"),
      s("throw"),
      s("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function s(c) {
    t[c] =
      i[c] &&
      function (l) {
        return new Promise(function (p, _) {
          (l = i[c](l)), o(p, _, l.done, l.value);
        });
      };
  }
  function o(c, l, p, _) {
    Promise.resolve(_).then(function (d) {
      c({ value: d, done: p });
    }, l);
  }
}
function uw(i, e) {
  return (
    Object.defineProperty
      ? Object.defineProperty(i, "raw", { value: e })
      : (i.raw = e),
    i
  );
}
function hw(i) {
  if (i && i.__esModule) return i;
  var e = {};
  if (i != null)
    for (var t in i) Object.hasOwnProperty.call(i, t) && (e[t] = i[t]);
  return (e.default = i), e;
}
function lw(i) {
  return i && i.__esModule ? i : { default: i };
}
function fw(i, e) {
  if (!e.has(i))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(i);
}
function pw(i, e, t) {
  if (!e.has(i))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(i, t), t;
}
const dw = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        get __assign() {
          return iu;
        },
        __asyncDelegator: aw,
        __asyncGenerator: ow,
        __asyncValues: cw,
        __await: ys,
        __awaiter: ew,
        __classPrivateFieldGet: fw,
        __classPrivateFieldSet: pw,
        __createBinding: rw,
        __decorate: Xb,
        __exportStar: iw,
        __extends: Yb,
        __generator: tw,
        __importDefault: lw,
        __importStar: hw,
        __makeTemplateObject: uw,
        __metadata: Zb,
        __param: Qb,
        __read: Np,
        __rest: Jb,
        __spread: nw,
        __spreadArrays: sw,
        __values: nu,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  gw = Tn(dw);
var jc, df;
function _w() {
  if (df) return jc;
  df = 1;
  function i(t) {
    try {
      return JSON.stringify(t);
    } catch {
      return '"[Circular]"';
    }
  }
  jc = e;
  function e(t, s, o) {
    var c = (o && o.stringify) || i,
      l = 1;
    if (typeof t == "object" && t !== null) {
      var p = s.length + l;
      if (p === 1) return t;
      var _ = new Array(p);
      _[0] = c(t);
      for (var d = 1; d < p; d++) _[d] = c(s[d]);
      return _.join(" ");
    }
    if (typeof t != "string") return t;
    var w = s.length;
    if (w === 0) return t;
    for (
      var A = "", S = 1 - l, P = -1, M = (t && t.length) || 0, K = 0;
      K < M;

    ) {
      if (t.charCodeAt(K) === 37 && K + 1 < M) {
        switch (((P = P > -1 ? P : 0), t.charCodeAt(K + 1))) {
          case 100:
          case 102:
            if (S >= w || s[S] == null) break;
            P < K && (A += t.slice(P, K)),
              (A += Number(s[S])),
              (P = K + 2),
              K++;
            break;
          case 105:
            if (S >= w || s[S] == null) break;
            P < K && (A += t.slice(P, K)),
              (A += Math.floor(Number(s[S]))),
              (P = K + 2),
              K++;
            break;
          case 79:
          case 111:
          case 106:
            if (S >= w || s[S] === void 0) break;
            P < K && (A += t.slice(P, K));
            var B = typeof s[S];
            if (B === "string") {
              (A += "'" + s[S] + "'"), (P = K + 2), K++;
              break;
            }
            if (B === "function") {
              (A += s[S].name || "<anonymous>"), (P = K + 2), K++;
              break;
            }
            (A += c(s[S])), (P = K + 2), K++;
            break;
          case 115:
            if (S >= w) break;
            P < K && (A += t.slice(P, K)),
              (A += String(s[S])),
              (P = K + 2),
              K++;
            break;
          case 37:
            P < K && (A += t.slice(P, K)), (A += "%"), (P = K + 2), K++, S--;
            break;
        }
        ++S;
      }
      ++K;
    }
    return P === -1 ? t : (P < M && (A += t.slice(P)), A);
  }
  return jc;
}
var Dc, gf;
function yw() {
  if (gf) return Dc;
  gf = 1;
  const i = _w();
  Dc = o;
  const e = C().console || {},
    t = {
      mapHttpRequest: M,
      mapHttpResponse: M,
      wrapRequestSerializer: K,
      wrapResponseSerializer: K,
      wrapErrorSerializer: K,
      req: M,
      res: M,
      err: S,
    };
  function s(b, h) {
    return Array.isArray(b)
      ? b.filter(function (G) {
          return G !== "!stdSerializers.err";
        })
      : b === !0
      ? Object.keys(h)
      : !1;
  }
  function o(b) {
    (b = b || {}), (b.browser = b.browser || {});
    const h = b.browser.transmit;
    if (h && typeof h.send != "function")
      throw Error("pino: transmit option must have a send function");
    const m = b.browser.write || e;
    b.browser.write && (b.browser.asObject = !0);
    const G = b.serializers || {},
      k = s(b.browser.serialize, G);
    let se = b.browser.serialize;
    Array.isArray(b.browser.serialize) &&
      b.browser.serialize.indexOf("!stdSerializers.err") > -1 &&
      (se = !1);
    const ce = ["error", "fatal", "warn", "info", "debug", "trace"];
    typeof m == "function" &&
      (m.error = m.fatal = m.warn = m.info = m.debug = m.trace = m),
      b.enabled === !1 && (b.level = "silent");
    const ge = b.level || "info",
      $ = Object.create(m);
    $.log || ($.log = B),
      Object.defineProperty($, "levelVal", { get: le }),
      Object.defineProperty($, "level", { get: te, set: W });
    const z = {
      transmit: h,
      serialize: k,
      asObject: b.browser.asObject,
      levels: ce,
      timestamp: P(b),
    };
    ($.levels = o.levels),
      ($.level = ge),
      ($.setMaxListeners =
        $.getMaxListeners =
        $.emit =
        $.addListener =
        $.on =
        $.prependListener =
        $.once =
        $.prependOnceListener =
        $.removeListener =
        $.removeAllListeners =
        $.listeners =
        $.listenerCount =
        $.eventNames =
        $.write =
        $.flush =
          B),
      ($.serializers = G),
      ($._serialize = k),
      ($._stdErrSerialize = se),
      ($.child = ee),
      h && ($._logEvent = A());
    function le() {
      return this.level === "silent" ? 1 / 0 : this.levels.values[this.level];
    }
    function te() {
      return this._level;
    }
    function W(Y) {
      if (Y !== "silent" && !this.levels.values[Y])
        throw Error("unknown level " + Y);
      (this._level = Y),
        c(z, $, "error", "log"),
        c(z, $, "fatal", "error"),
        c(z, $, "warn", "error"),
        c(z, $, "info", "log"),
        c(z, $, "debug", "log"),
        c(z, $, "trace", "log");
    }
    function ee(Y, re) {
      if (!Y) throw new Error("missing bindings for child Pino");
      (re = re || {}), k && Y.serializers && (re.serializers = Y.serializers);
      const Oe = re.serializers;
      if (k && Oe) {
        var ie = Object.assign({}, G, Oe),
          be = b.browser.serialize === !0 ? Object.keys(ie) : k;
        delete Y.serializers, _([Y], be, ie, this._stdErrSerialize);
      }
      function he(ve) {
        (this._childLevel = (ve._childLevel | 0) + 1),
          (this.error = d(ve, Y, "error")),
          (this.fatal = d(ve, Y, "fatal")),
          (this.warn = d(ve, Y, "warn")),
          (this.info = d(ve, Y, "info")),
          (this.debug = d(ve, Y, "debug")),
          (this.trace = d(ve, Y, "trace")),
          ie && ((this.serializers = ie), (this._serialize = be)),
          h && (this._logEvent = A([].concat(ve._logEvent.bindings, Y)));
      }
      return (he.prototype = this), new he(this);
    }
    return $;
  }
  (o.levels = {
    values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 },
    labels: {
      10: "trace",
      20: "debug",
      30: "info",
      40: "warn",
      50: "error",
      60: "fatal",
    },
  }),
    (o.stdSerializers = t),
    (o.stdTimeFunctions = Object.assign(
      {},
      { nullTime: oe, epochTime: N, unixTime: F, isoTime: x },
    ));
  function c(b, h, m, G) {
    const k = Object.getPrototypeOf(h);
    (h[m] =
      h.levelVal > h.levels.values[m] ? B : k[m] ? k[m] : e[m] || e[G] || B),
      l(b, h, m);
  }
  function l(b, h, m) {
    (!b.transmit && h[m] === B) ||
      (h[m] = (function (G) {
        return function () {
          const se = b.timestamp(),
            ce = new Array(arguments.length),
            ge =
              Object.getPrototypeOf && Object.getPrototypeOf(this) === e
                ? e
                : this;
          for (var $ = 0; $ < ce.length; $++) ce[$] = arguments[$];
          if (
            (b.serialize &&
              !b.asObject &&
              _(ce, this._serialize, this.serializers, this._stdErrSerialize),
            b.asObject ? G.call(ge, p(this, m, ce, se)) : G.apply(ge, ce),
            b.transmit)
          ) {
            const z = b.transmit.level || h.level,
              le = o.levels.values[z],
              te = o.levels.values[m];
            if (te < le) return;
            w(
              this,
              {
                ts: se,
                methodLevel: m,
                methodValue: te,
                transmitLevel: z,
                transmitValue: o.levels.values[b.transmit.level || h.level],
                send: b.transmit.send,
                val: h.levelVal,
              },
              ce,
            );
          }
        };
      })(h[m]));
  }
  function p(b, h, m, G) {
    b._serialize && _(m, b._serialize, b.serializers, b._stdErrSerialize);
    const k = m.slice();
    let se = k[0];
    const ce = {};
    G && (ce.time = G), (ce.level = o.levels.values[h]);
    let ge = (b._childLevel | 0) + 1;
    if ((ge < 1 && (ge = 1), se !== null && typeof se == "object")) {
      for (; ge-- && typeof k[0] == "object"; ) Object.assign(ce, k.shift());
      se = k.length ? i(k.shift(), k) : void 0;
    } else typeof se == "string" && (se = i(k.shift(), k));
    return se !== void 0 && (ce.msg = se), ce;
  }
  function _(b, h, m, G) {
    for (const k in b)
      if (G && b[k] instanceof Error) b[k] = o.stdSerializers.err(b[k]);
      else if (typeof b[k] == "object" && !Array.isArray(b[k]))
        for (const se in b[k])
          h && h.indexOf(se) > -1 && se in m && (b[k][se] = m[se](b[k][se]));
  }
  function d(b, h, m) {
    return function () {
      const G = new Array(1 + arguments.length);
      G[0] = h;
      for (var k = 1; k < G.length; k++) G[k] = arguments[k - 1];
      return b[m].apply(this, G);
    };
  }
  function w(b, h, m) {
    const G = h.send,
      k = h.ts,
      se = h.methodLevel,
      ce = h.methodValue,
      ge = h.val,
      $ = b._logEvent.bindings;
    _(
      m,
      b._serialize || Object.keys(b.serializers),
      b.serializers,
      b._stdErrSerialize === void 0 ? !0 : b._stdErrSerialize,
    ),
      (b._logEvent.ts = k),
      (b._logEvent.messages = m.filter(function (z) {
        return $.indexOf(z) === -1;
      })),
      (b._logEvent.level.label = se),
      (b._logEvent.level.value = ce),
      G(se, b._logEvent, ge),
      (b._logEvent = A($));
  }
  function A(b) {
    return {
      ts: 0,
      messages: [],
      bindings: b || [],
      level: { label: "", value: 0 },
    };
  }
  function S(b) {
    const h = { type: b.constructor.name, msg: b.message, stack: b.stack };
    for (const m in b) h[m] === void 0 && (h[m] = b[m]);
    return h;
  }
  function P(b) {
    return typeof b.timestamp == "function"
      ? b.timestamp
      : b.timestamp === !1
      ? oe
      : N;
  }
  function M() {
    return {};
  }
  function K(b) {
    return b;
  }
  function B() {}
  function oe() {
    return !1;
  }
  function N() {
    return Date.now();
  }
  function F() {
    return Math.round(Date.now() / 1e3);
  }
  function x() {
    return new Date(Date.now()).toISOString();
  }
  function C() {
    function b(h) {
      return typeof h < "u" && h;
    }
    try {
      return (
        typeof globalThis < "u" ||
          Object.defineProperty(Object.prototype, "globalThis", {
            get: function () {
              return (
                delete Object.prototype.globalThis, (this.globalThis = this)
              );
            },
            configurable: !0,
          }),
        globalThis
      );
    } catch {
      return b(self) || b(window) || b(this) || {};
    }
  }
  return Dc;
}
var Xi = {},
  _f;
function $p() {
  return (
    _f ||
      ((_f = 1),
      Object.defineProperty(Xi, "__esModule", { value: !0 }),
      (Xi.PINO_CUSTOM_CONTEXT_KEY = Xi.PINO_LOGGER_DEFAULTS = void 0),
      (Xi.PINO_LOGGER_DEFAULTS = { level: "info" }),
      (Xi.PINO_CUSTOM_CONTEXT_KEY = "custom_context")),
    Xi
  );
}
var sr = {},
  yf;
function vw() {
  if (yf) return sr;
  (yf = 1),
    Object.defineProperty(sr, "__esModule", { value: !0 }),
    (sr.generateChildLogger =
      sr.formatChildLoggerContext =
      sr.getLoggerContext =
      sr.setBrowserLoggerContext =
      sr.getBrowserLoggerContext =
      sr.getDefaultLoggerOptions =
        void 0);
  const i = $p();
  function e(p) {
    return Object.assign(Object.assign({}, p), {
      level: (p == null ? void 0 : p.level) || i.PINO_LOGGER_DEFAULTS.level,
    });
  }
  sr.getDefaultLoggerOptions = e;
  function t(p, _ = i.PINO_CUSTOM_CONTEXT_KEY) {
    return p[_] || "";
  }
  sr.getBrowserLoggerContext = t;
  function s(p, _, d = i.PINO_CUSTOM_CONTEXT_KEY) {
    return (p[d] = _), p;
  }
  sr.setBrowserLoggerContext = s;
  function o(p, _ = i.PINO_CUSTOM_CONTEXT_KEY) {
    let d = "";
    return (
      typeof p.bindings > "u"
        ? (d = t(p, _))
        : (d = p.bindings().context || ""),
      d
    );
  }
  sr.getLoggerContext = o;
  function c(p, _, d = i.PINO_CUSTOM_CONTEXT_KEY) {
    const w = o(p, d);
    return w.trim() ? `${w}/${_}` : _;
  }
  sr.formatChildLoggerContext = c;
  function l(p, _, d = i.PINO_CUSTOM_CONTEXT_KEY) {
    const w = c(p, _, d),
      A = p.child({ context: w });
    return s(A, w, d);
  }
  return (sr.generateChildLogger = l), sr;
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), (i.pino = void 0);
  const e = gw,
    t = e.__importDefault(yw());
  Object.defineProperty(i, "pino", {
    enumerable: !0,
    get: function () {
      return t.default;
    },
  }),
    e.__exportStar($p(), i),
    e.__exportStar(vw(), i);
})(Ze);
class mw extends Zi {
  constructor(e) {
    super(), (this.opts = e), (this.protocol = "wc"), (this.version = 2);
  }
}
class bw extends Zi {
  constructor(e, t) {
    super(), (this.core = e), (this.logger = t), (this.records = new Map());
  }
}
class ww {
  constructor(e, t) {
    (this.logger = e), (this.core = t);
  }
}
let Ew = class extends Zi {
    constructor(e, t) {
      super(), (this.relayer = e), (this.logger = t);
    }
  },
  Sw = class extends Zi {
    constructor(e) {
      super();
    }
  },
  Iw = class {
    constructor(e, t, s, o) {
      (this.core = e), (this.logger = t), (this.name = s);
    }
  };
class xw extends Zi {
  constructor(e, t) {
    super(), (this.relayer = e), (this.logger = t);
  }
}
let Ow = class extends Zi {
    constructor(e, t) {
      super(), (this.core = e), (this.logger = t);
    }
  },
  Pw = class {
    constructor(e, t) {
      (this.projectId = e), (this.logger = t);
    }
  },
  Aw = class {
    constructor(e) {
      (this.opts = e), (this.protocol = "wc"), (this.version = 2);
    }
  },
  Tw = class {
    constructor(e) {
      this.client = e;
    }
  };
const Cw = (i) =>
    JSON.stringify(i, (e, t) =>
      typeof t == "bigint" ? t.toString() + "n" : t,
    ),
  Rw = (i) => {
    const e =
        /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g,
      t = i.replace(e, '$1"$2n"$3');
    return JSON.parse(t, (s, o) =>
      typeof o == "string" && o.match(/^\d+n$/)
        ? BigInt(o.substring(0, o.length - 1))
        : o,
    );
  };
function xu(i) {
  if (typeof i != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof i}`);
  try {
    return Rw(i);
  } catch {
    return i;
  }
}
function vs(i) {
  return typeof i == "string" ? i : Cw(i) || "";
}
var Ou = {},
  Rn = {},
  Go = {},
  Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
Wo.BrowserRandomSource = void 0;
const vf = 65536;
class Nw {
  constructor() {
    (this.isAvailable = !1), (this.isInstantiated = !1);
    const e = typeof self < "u" ? self.crypto || self.msCrypto : null;
    e &&
      e.getRandomValues !== void 0 &&
      ((this._crypto = e), (this.isAvailable = !0), (this.isInstantiated = !0));
  }
  randomBytes(e) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Browser random byte generator is not available.");
    const t = new Uint8Array(e);
    for (let s = 0; s < t.length; s += vf)
      this._crypto.getRandomValues(
        t.subarray(s, s + Math.min(t.length - s, vf)),
      );
    return t;
  }
}
Wo.BrowserRandomSource = Nw;
var Yo = {},
  Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
function $w(i) {
  for (var e = 0; e < i.length; e++) i[e] = 0;
  return i;
}
Ir.wipe = $w;
Object.defineProperty(Yo, "__esModule", { value: !0 });
Yo.NodeRandomSource = void 0;
const jw = Ir;
class Dw {
  constructor() {
    if (
      ((this.isAvailable = !1), (this.isInstantiated = !1), typeof _m < "u")
    ) {
      const e = ym;
      e &&
        e.randomBytes &&
        ((this._crypto = e),
        (this.isAvailable = !0),
        (this.isInstantiated = !0));
    }
  }
  randomBytes(e) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Node.js random byte generator is not available.");
    let t = this._crypto.randomBytes(e);
    if (t.length !== e)
      throw new Error("NodeRandomSource: got fewer bytes than requested");
    const s = new Uint8Array(e);
    for (let o = 0; o < s.length; o++) s[o] = t[o];
    return (0, jw.wipe)(t), s;
  }
}
Yo.NodeRandomSource = Dw;
Object.defineProperty(Go, "__esModule", { value: !0 });
Go.SystemRandomSource = void 0;
const Uw = Wo,
  Fw = Yo;
class Lw {
  constructor() {
    if (
      ((this.isAvailable = !1),
      (this.name = ""),
      (this._source = new Uw.BrowserRandomSource()),
      this._source.isAvailable)
    ) {
      (this.isAvailable = !0), (this.name = "Browser");
      return;
    }
    if (
      ((this._source = new Fw.NodeRandomSource()), this._source.isAvailable)
    ) {
      (this.isAvailable = !0), (this.name = "Node");
      return;
    }
  }
  randomBytes(e) {
    if (!this.isAvailable)
      throw new Error("System random byte generator is not available.");
    return this._source.randomBytes(e);
  }
}
Go.SystemRandomSource = Lw;
var Ue = {},
  jp = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  function e(p, _) {
    var d = (p >>> 16) & 65535,
      w = p & 65535,
      A = (_ >>> 16) & 65535,
      S = _ & 65535;
    return (w * S + (((d * S + w * A) << 16) >>> 0)) | 0;
  }
  i.mul = Math.imul || e;
  function t(p, _) {
    return (p + _) | 0;
  }
  i.add = t;
  function s(p, _) {
    return (p - _) | 0;
  }
  i.sub = s;
  function o(p, _) {
    return (p << _) | (p >>> (32 - _));
  }
  i.rotl = o;
  function c(p, _) {
    return (p << (32 - _)) | (p >>> _);
  }
  i.rotr = c;
  function l(p) {
    return typeof p == "number" && isFinite(p) && Math.floor(p) === p;
  }
  (i.isInteger = Number.isInteger || l),
    (i.MAX_SAFE_INTEGER = 9007199254740991),
    (i.isSafeInteger = function (p) {
      return (
        i.isInteger(p) && p >= -i.MAX_SAFE_INTEGER && p <= i.MAX_SAFE_INTEGER
      );
    });
})(jp);
Object.defineProperty(Ue, "__esModule", { value: !0 });
var Dp = jp;
function Mw(i, e) {
  return e === void 0 && (e = 0), (((i[e + 0] << 8) | i[e + 1]) << 16) >> 16;
}
Ue.readInt16BE = Mw;
function qw(i, e) {
  return e === void 0 && (e = 0), ((i[e + 0] << 8) | i[e + 1]) >>> 0;
}
Ue.readUint16BE = qw;
function zw(i, e) {
  return e === void 0 && (e = 0), (((i[e + 1] << 8) | i[e]) << 16) >> 16;
}
Ue.readInt16LE = zw;
function Hw(i, e) {
  return e === void 0 && (e = 0), ((i[e + 1] << 8) | i[e]) >>> 0;
}
Ue.readUint16LE = Hw;
function Up(i, e, t) {
  return (
    e === void 0 && (e = new Uint8Array(2)),
    t === void 0 && (t = 0),
    (e[t + 0] = i >>> 8),
    (e[t + 1] = i >>> 0),
    e
  );
}
Ue.writeUint16BE = Up;
Ue.writeInt16BE = Up;
function Fp(i, e, t) {
  return (
    e === void 0 && (e = new Uint8Array(2)),
    t === void 0 && (t = 0),
    (e[t + 0] = i >>> 0),
    (e[t + 1] = i >>> 8),
    e
  );
}
Ue.writeUint16LE = Fp;
Ue.writeInt16LE = Fp;
function su(i, e) {
  return (
    e === void 0 && (e = 0),
    (i[e] << 24) | (i[e + 1] << 16) | (i[e + 2] << 8) | i[e + 3]
  );
}
Ue.readInt32BE = su;
function ou(i, e) {
  return (
    e === void 0 && (e = 0),
    ((i[e] << 24) | (i[e + 1] << 16) | (i[e + 2] << 8) | i[e + 3]) >>> 0
  );
}
Ue.readUint32BE = ou;
function au(i, e) {
  return (
    e === void 0 && (e = 0),
    (i[e + 3] << 24) | (i[e + 2] << 16) | (i[e + 1] << 8) | i[e]
  );
}
Ue.readInt32LE = au;
function cu(i, e) {
  return (
    e === void 0 && (e = 0),
    ((i[e + 3] << 24) | (i[e + 2] << 16) | (i[e + 1] << 8) | i[e]) >>> 0
  );
}
Ue.readUint32LE = cu;
function Uo(i, e, t) {
  return (
    e === void 0 && (e = new Uint8Array(4)),
    t === void 0 && (t = 0),
    (e[t + 0] = i >>> 24),
    (e[t + 1] = i >>> 16),
    (e[t + 2] = i >>> 8),
    (e[t + 3] = i >>> 0),
    e
  );
}
Ue.writeUint32BE = Uo;
Ue.writeInt32BE = Uo;
function Fo(i, e, t) {
  return (
    e === void 0 && (e = new Uint8Array(4)),
    t === void 0 && (t = 0),
    (e[t + 0] = i >>> 0),
    (e[t + 1] = i >>> 8),
    (e[t + 2] = i >>> 16),
    (e[t + 3] = i >>> 24),
    e
  );
}
Ue.writeUint32LE = Fo;
Ue.writeInt32LE = Fo;
function Kw(i, e) {
  e === void 0 && (e = 0);
  var t = su(i, e),
    s = su(i, e + 4);
  return t * 4294967296 + s - (s >> 31) * 4294967296;
}
Ue.readInt64BE = Kw;
function Bw(i, e) {
  e === void 0 && (e = 0);
  var t = ou(i, e),
    s = ou(i, e + 4);
  return t * 4294967296 + s;
}
Ue.readUint64BE = Bw;
function Vw(i, e) {
  e === void 0 && (e = 0);
  var t = au(i, e),
    s = au(i, e + 4);
  return s * 4294967296 + t - (t >> 31) * 4294967296;
}
Ue.readInt64LE = Vw;
function kw(i, e) {
  e === void 0 && (e = 0);
  var t = cu(i, e),
    s = cu(i, e + 4);
  return s * 4294967296 + t;
}
Ue.readUint64LE = kw;
function Lp(i, e, t) {
  return (
    e === void 0 && (e = new Uint8Array(8)),
    t === void 0 && (t = 0),
    Uo((i / 4294967296) >>> 0, e, t),
    Uo(i >>> 0, e, t + 4),
    e
  );
}
Ue.writeUint64BE = Lp;
Ue.writeInt64BE = Lp;
function Mp(i, e, t) {
  return (
    e === void 0 && (e = new Uint8Array(8)),
    t === void 0 && (t = 0),
    Fo(i >>> 0, e, t),
    Fo((i / 4294967296) >>> 0, e, t + 4),
    e
  );
}
Ue.writeUint64LE = Mp;
Ue.writeInt64LE = Mp;
function Gw(i, e, t) {
  if ((t === void 0 && (t = 0), i % 8 !== 0))
    throw new Error("readUintBE supports only bitLengths divisible by 8");
  if (i / 8 > e.length - t)
    throw new Error("readUintBE: array is too short for the given bitLength");
  for (var s = 0, o = 1, c = i / 8 + t - 1; c >= t; c--)
    (s += e[c] * o), (o *= 256);
  return s;
}
Ue.readUintBE = Gw;
function Ww(i, e, t) {
  if ((t === void 0 && (t = 0), i % 8 !== 0))
    throw new Error("readUintLE supports only bitLengths divisible by 8");
  if (i / 8 > e.length - t)
    throw new Error("readUintLE: array is too short for the given bitLength");
  for (var s = 0, o = 1, c = t; c < t + i / 8; c++) (s += e[c] * o), (o *= 256);
  return s;
}
Ue.readUintLE = Ww;
function Yw(i, e, t, s) {
  if (
    (t === void 0 && (t = new Uint8Array(i / 8)),
    s === void 0 && (s = 0),
    i % 8 !== 0)
  )
    throw new Error("writeUintBE supports only bitLengths divisible by 8");
  if (!Dp.isSafeInteger(e))
    throw new Error("writeUintBE value must be an integer");
  for (var o = 1, c = i / 8 + s - 1; c >= s; c--)
    (t[c] = (e / o) & 255), (o *= 256);
  return t;
}
Ue.writeUintBE = Yw;
function Jw(i, e, t, s) {
  if (
    (t === void 0 && (t = new Uint8Array(i / 8)),
    s === void 0 && (s = 0),
    i % 8 !== 0)
  )
    throw new Error("writeUintLE supports only bitLengths divisible by 8");
  if (!Dp.isSafeInteger(e))
    throw new Error("writeUintLE value must be an integer");
  for (var o = 1, c = s; c < s + i / 8; c++) (t[c] = (e / o) & 255), (o *= 256);
  return t;
}
Ue.writeUintLE = Jw;
function Xw(i, e) {
  e === void 0 && (e = 0);
  var t = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return t.getFloat32(e);
}
Ue.readFloat32BE = Xw;
function Qw(i, e) {
  e === void 0 && (e = 0);
  var t = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return t.getFloat32(e, !0);
}
Ue.readFloat32LE = Qw;
function Zw(i, e) {
  e === void 0 && (e = 0);
  var t = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return t.getFloat64(e);
}
Ue.readFloat64BE = Zw;
function eE(i, e) {
  e === void 0 && (e = 0);
  var t = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return t.getFloat64(e, !0);
}
Ue.readFloat64LE = eE;
function tE(i, e, t) {
  e === void 0 && (e = new Uint8Array(4)), t === void 0 && (t = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat32(t, i), e;
}
Ue.writeFloat32BE = tE;
function rE(i, e, t) {
  e === void 0 && (e = new Uint8Array(4)), t === void 0 && (t = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat32(t, i, !0), e;
}
Ue.writeFloat32LE = rE;
function iE(i, e, t) {
  e === void 0 && (e = new Uint8Array(8)), t === void 0 && (t = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat64(t, i), e;
}
Ue.writeFloat64BE = iE;
function nE(i, e, t) {
  e === void 0 && (e = new Uint8Array(8)), t === void 0 && (t = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat64(t, i, !0), e;
}
Ue.writeFloat64LE = nE;
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }),
    (i.randomStringForEntropy =
      i.randomString =
      i.randomUint32 =
      i.randomBytes =
      i.defaultRandomSource =
        void 0);
  const e = Go,
    t = Ue,
    s = Ir;
  i.defaultRandomSource = new e.SystemRandomSource();
  function o(d, w = i.defaultRandomSource) {
    return w.randomBytes(d);
  }
  i.randomBytes = o;
  function c(d = i.defaultRandomSource) {
    const w = o(4, d),
      A = (0, t.readUint32LE)(w);
    return (0, s.wipe)(w), A;
  }
  i.randomUint32 = c;
  const l = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function p(d, w = l, A = i.defaultRandomSource) {
    if (w.length < 2) throw new Error("randomString charset is too short");
    if (w.length > 256) throw new Error("randomString charset is too long");
    let S = "";
    const P = w.length,
      M = 256 - (256 % P);
    for (; d > 0; ) {
      const K = o(Math.ceil((d * 256) / M), A);
      for (let B = 0; B < K.length && d > 0; B++) {
        const oe = K[B];
        oe < M && ((S += w.charAt(oe % P)), d--);
      }
      (0, s.wipe)(K);
    }
    return S;
  }
  i.randomString = p;
  function _(d, w = l, A = i.defaultRandomSource) {
    const S = Math.ceil(d / (Math.log(w.length) / Math.LN2));
    return p(S, w, A);
  }
  i.randomStringForEntropy = _;
})(Rn);
var qp = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ue,
    t = Ir;
  (i.DIGEST_LENGTH = 64), (i.BLOCK_SIZE = 128);
  var s = (function () {
    function p() {
      (this.digestLength = i.DIGEST_LENGTH),
        (this.blockSize = i.BLOCK_SIZE),
        (this._stateHi = new Int32Array(8)),
        (this._stateLo = new Int32Array(8)),
        (this._tempHi = new Int32Array(16)),
        (this._tempLo = new Int32Array(16)),
        (this._buffer = new Uint8Array(256)),
        (this._bufferLength = 0),
        (this._bytesHashed = 0),
        (this._finished = !1),
        this.reset();
    }
    return (
      (p.prototype._initState = function () {
        (this._stateHi[0] = 1779033703),
          (this._stateHi[1] = 3144134277),
          (this._stateHi[2] = 1013904242),
          (this._stateHi[3] = 2773480762),
          (this._stateHi[4] = 1359893119),
          (this._stateHi[5] = 2600822924),
          (this._stateHi[6] = 528734635),
          (this._stateHi[7] = 1541459225),
          (this._stateLo[0] = 4089235720),
          (this._stateLo[1] = 2227873595),
          (this._stateLo[2] = 4271175723),
          (this._stateLo[3] = 1595750129),
          (this._stateLo[4] = 2917565137),
          (this._stateLo[5] = 725511199),
          (this._stateLo[6] = 4215389547),
          (this._stateLo[7] = 327033209);
      }),
      (p.prototype.reset = function () {
        return (
          this._initState(),
          (this._bufferLength = 0),
          (this._bytesHashed = 0),
          (this._finished = !1),
          this
        );
      }),
      (p.prototype.clean = function () {
        t.wipe(this._buffer),
          t.wipe(this._tempHi),
          t.wipe(this._tempLo),
          this.reset();
      }),
      (p.prototype.update = function (_, d) {
        if ((d === void 0 && (d = _.length), this._finished))
          throw new Error("SHA512: can't update because hash was finished.");
        var w = 0;
        if (((this._bytesHashed += d), this._bufferLength > 0)) {
          for (; this._bufferLength < i.BLOCK_SIZE && d > 0; )
            (this._buffer[this._bufferLength++] = _[w++]), d--;
          this._bufferLength === this.blockSize &&
            (c(
              this._tempHi,
              this._tempLo,
              this._stateHi,
              this._stateLo,
              this._buffer,
              0,
              this.blockSize,
            ),
            (this._bufferLength = 0));
        }
        for (
          d >= this.blockSize &&
          ((w = c(
            this._tempHi,
            this._tempLo,
            this._stateHi,
            this._stateLo,
            _,
            w,
            d,
          )),
          (d %= this.blockSize));
          d > 0;

        )
          (this._buffer[this._bufferLength++] = _[w++]), d--;
        return this;
      }),
      (p.prototype.finish = function (_) {
        if (!this._finished) {
          var d = this._bytesHashed,
            w = this._bufferLength,
            A = (d / 536870912) | 0,
            S = d << 3,
            P = d % 128 < 112 ? 128 : 256;
          this._buffer[w] = 128;
          for (var M = w + 1; M < P - 8; M++) this._buffer[M] = 0;
          e.writeUint32BE(A, this._buffer, P - 8),
            e.writeUint32BE(S, this._buffer, P - 4),
            c(
              this._tempHi,
              this._tempLo,
              this._stateHi,
              this._stateLo,
              this._buffer,
              0,
              P,
            ),
            (this._finished = !0);
        }
        for (var M = 0; M < this.digestLength / 8; M++)
          e.writeUint32BE(this._stateHi[M], _, M * 8),
            e.writeUint32BE(this._stateLo[M], _, M * 8 + 4);
        return this;
      }),
      (p.prototype.digest = function () {
        var _ = new Uint8Array(this.digestLength);
        return this.finish(_), _;
      }),
      (p.prototype.saveState = function () {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer:
            this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed,
        };
      }),
      (p.prototype.restoreState = function (_) {
        return (
          this._stateHi.set(_.stateHi),
          this._stateLo.set(_.stateLo),
          (this._bufferLength = _.bufferLength),
          _.buffer && this._buffer.set(_.buffer),
          (this._bytesHashed = _.bytesHashed),
          (this._finished = !1),
          this
        );
      }),
      (p.prototype.cleanSavedState = function (_) {
        t.wipe(_.stateHi),
          t.wipe(_.stateLo),
          _.buffer && t.wipe(_.buffer),
          (_.bufferLength = 0),
          (_.bytesHashed = 0);
      }),
      p
    );
  })();
  i.SHA512 = s;
  var o = new Int32Array([
    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
    2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
    3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
    113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
    773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
    1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
    2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
    3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
    430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
    883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
    1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
    2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
    2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
    3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
    3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
    174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
    685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
    1607167915, 987167468, 1816402316, 1246189591,
  ]);
  function c(p, _, d, w, A, S, P) {
    for (
      var M = d[0],
        K = d[1],
        B = d[2],
        oe = d[3],
        N = d[4],
        F = d[5],
        x = d[6],
        C = d[7],
        b = w[0],
        h = w[1],
        m = w[2],
        G = w[3],
        k = w[4],
        se = w[5],
        ce = w[6],
        ge = w[7],
        $,
        z,
        le,
        te,
        W,
        ee,
        Y,
        re;
      P >= 128;

    ) {
      for (var Oe = 0; Oe < 16; Oe++) {
        var ie = 8 * Oe + S;
        (p[Oe] = e.readUint32BE(A, ie)), (_[Oe] = e.readUint32BE(A, ie + 4));
      }
      for (var Oe = 0; Oe < 80; Oe++) {
        var be = M,
          he = K,
          ve = B,
          q = oe,
          L = N,
          R = F,
          f = x,
          O = C,
          ne = b,
          fe = h,
          Ie = m,
          He = G,
          Ve = k,
          Fe = se,
          dt = ce,
          gt = ge;
        if (
          (($ = C),
          (z = ge),
          (W = z & 65535),
          (ee = z >>> 16),
          (Y = $ & 65535),
          (re = $ >>> 16),
          ($ =
            ((N >>> 14) | (k << (32 - 14))) ^
            ((N >>> 18) | (k << (32 - 18))) ^
            ((k >>> (41 - 32)) | (N << (32 - (41 - 32))))),
          (z =
            ((k >>> 14) | (N << (32 - 14))) ^
            ((k >>> 18) | (N << (32 - 18))) ^
            ((N >>> (41 - 32)) | (k << (32 - (41 - 32))))),
          (W += z & 65535),
          (ee += z >>> 16),
          (Y += $ & 65535),
          (re += $ >>> 16),
          ($ = (N & F) ^ (~N & x)),
          (z = (k & se) ^ (~k & ce)),
          (W += z & 65535),
          (ee += z >>> 16),
          (Y += $ & 65535),
          (re += $ >>> 16),
          ($ = o[Oe * 2]),
          (z = o[Oe * 2 + 1]),
          (W += z & 65535),
          (ee += z >>> 16),
          (Y += $ & 65535),
          (re += $ >>> 16),
          ($ = p[Oe % 16]),
          (z = _[Oe % 16]),
          (W += z & 65535),
          (ee += z >>> 16),
          (Y += $ & 65535),
          (re += $ >>> 16),
          (ee += W >>> 16),
          (Y += ee >>> 16),
          (re += Y >>> 16),
          (le = (Y & 65535) | (re << 16)),
          (te = (W & 65535) | (ee << 16)),
          ($ = le),
          (z = te),
          (W = z & 65535),
          (ee = z >>> 16),
          (Y = $ & 65535),
          (re = $ >>> 16),
          ($ =
            ((M >>> 28) | (b << (32 - 28))) ^
            ((b >>> (34 - 32)) | (M << (32 - (34 - 32)))) ^
            ((b >>> (39 - 32)) | (M << (32 - (39 - 32))))),
          (z =
            ((b >>> 28) | (M << (32 - 28))) ^
            ((M >>> (34 - 32)) | (b << (32 - (34 - 32)))) ^
            ((M >>> (39 - 32)) | (b << (32 - (39 - 32))))),
          (W += z & 65535),
          (ee += z >>> 16),
          (Y += $ & 65535),
          (re += $ >>> 16),
          ($ = (M & K) ^ (M & B) ^ (K & B)),
          (z = (b & h) ^ (b & m) ^ (h & m)),
          (W += z & 65535),
          (ee += z >>> 16),
          (Y += $ & 65535),
          (re += $ >>> 16),
          (ee += W >>> 16),
          (Y += ee >>> 16),
          (re += Y >>> 16),
          (O = (Y & 65535) | (re << 16)),
          (gt = (W & 65535) | (ee << 16)),
          ($ = q),
          (z = He),
          (W = z & 65535),
          (ee = z >>> 16),
          (Y = $ & 65535),
          (re = $ >>> 16),
          ($ = le),
          (z = te),
          (W += z & 65535),
          (ee += z >>> 16),
          (Y += $ & 65535),
          (re += $ >>> 16),
          (ee += W >>> 16),
          (Y += ee >>> 16),
          (re += Y >>> 16),
          (q = (Y & 65535) | (re << 16)),
          (He = (W & 65535) | (ee << 16)),
          (K = be),
          (B = he),
          (oe = ve),
          (N = q),
          (F = L),
          (x = R),
          (C = f),
          (M = O),
          (h = ne),
          (m = fe),
          (G = Ie),
          (k = He),
          (se = Ve),
          (ce = Fe),
          (ge = dt),
          (b = gt),
          Oe % 16 === 15)
        )
          for (var ie = 0; ie < 16; ie++)
            ($ = p[ie]),
              (z = _[ie]),
              (W = z & 65535),
              (ee = z >>> 16),
              (Y = $ & 65535),
              (re = $ >>> 16),
              ($ = p[(ie + 9) % 16]),
              (z = _[(ie + 9) % 16]),
              (W += z & 65535),
              (ee += z >>> 16),
              (Y += $ & 65535),
              (re += $ >>> 16),
              (le = p[(ie + 1) % 16]),
              (te = _[(ie + 1) % 16]),
              ($ =
                ((le >>> 1) | (te << (32 - 1))) ^
                ((le >>> 8) | (te << (32 - 8))) ^
                (le >>> 7)),
              (z =
                ((te >>> 1) | (le << (32 - 1))) ^
                ((te >>> 8) | (le << (32 - 8))) ^
                ((te >>> 7) | (le << (32 - 7)))),
              (W += z & 65535),
              (ee += z >>> 16),
              (Y += $ & 65535),
              (re += $ >>> 16),
              (le = p[(ie + 14) % 16]),
              (te = _[(ie + 14) % 16]),
              ($ =
                ((le >>> 19) | (te << (32 - 19))) ^
                ((te >>> (61 - 32)) | (le << (32 - (61 - 32)))) ^
                (le >>> 6)),
              (z =
                ((te >>> 19) | (le << (32 - 19))) ^
                ((le >>> (61 - 32)) | (te << (32 - (61 - 32)))) ^
                ((te >>> 6) | (le << (32 - 6)))),
              (W += z & 65535),
              (ee += z >>> 16),
              (Y += $ & 65535),
              (re += $ >>> 16),
              (ee += W >>> 16),
              (Y += ee >>> 16),
              (re += Y >>> 16),
              (p[ie] = (Y & 65535) | (re << 16)),
              (_[ie] = (W & 65535) | (ee << 16));
      }
      ($ = M),
        (z = b),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[0]),
        (z = w[0]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[0] = M = (Y & 65535) | (re << 16)),
        (w[0] = b = (W & 65535) | (ee << 16)),
        ($ = K),
        (z = h),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[1]),
        (z = w[1]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[1] = K = (Y & 65535) | (re << 16)),
        (w[1] = h = (W & 65535) | (ee << 16)),
        ($ = B),
        (z = m),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[2]),
        (z = w[2]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[2] = B = (Y & 65535) | (re << 16)),
        (w[2] = m = (W & 65535) | (ee << 16)),
        ($ = oe),
        (z = G),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[3]),
        (z = w[3]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[3] = oe = (Y & 65535) | (re << 16)),
        (w[3] = G = (W & 65535) | (ee << 16)),
        ($ = N),
        (z = k),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[4]),
        (z = w[4]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[4] = N = (Y & 65535) | (re << 16)),
        (w[4] = k = (W & 65535) | (ee << 16)),
        ($ = F),
        (z = se),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[5]),
        (z = w[5]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[5] = F = (Y & 65535) | (re << 16)),
        (w[5] = se = (W & 65535) | (ee << 16)),
        ($ = x),
        (z = ce),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[6]),
        (z = w[6]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[6] = x = (Y & 65535) | (re << 16)),
        (w[6] = ce = (W & 65535) | (ee << 16)),
        ($ = C),
        (z = ge),
        (W = z & 65535),
        (ee = z >>> 16),
        (Y = $ & 65535),
        (re = $ >>> 16),
        ($ = d[7]),
        (z = w[7]),
        (W += z & 65535),
        (ee += z >>> 16),
        (Y += $ & 65535),
        (re += $ >>> 16),
        (ee += W >>> 16),
        (Y += ee >>> 16),
        (re += Y >>> 16),
        (d[7] = C = (Y & 65535) | (re << 16)),
        (w[7] = ge = (W & 65535) | (ee << 16)),
        (S += 128),
        (P -= 128);
    }
    return S;
  }
  function l(p) {
    var _ = new s();
    _.update(p);
    var d = _.digest();
    return _.clean(), d;
  }
  i.hash = l;
})(qp);
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }),
    (i.convertSecretKeyToX25519 =
      i.convertPublicKeyToX25519 =
      i.verify =
      i.sign =
      i.extractPublicKeyFromSecretKey =
      i.generateKeyPair =
      i.generateKeyPairFromSeed =
      i.SEED_LENGTH =
      i.SECRET_KEY_LENGTH =
      i.PUBLIC_KEY_LENGTH =
      i.SIGNATURE_LENGTH =
        void 0);
  const e = Rn,
    t = qp,
    s = Ir;
  (i.SIGNATURE_LENGTH = 64),
    (i.PUBLIC_KEY_LENGTH = 32),
    (i.SECRET_KEY_LENGTH = 64),
    (i.SEED_LENGTH = 32);
  function o(q) {
    const L = new Float64Array(16);
    if (q) for (let R = 0; R < q.length; R++) L[R] = q[R];
    return L;
  }
  const c = new Uint8Array(32);
  c[0] = 9;
  const l = o(),
    p = o([1]),
    _ = o([
      30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505,
      36039, 65139, 11119, 27886, 20995,
    ]),
    d = o([
      61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010,
      6542, 64743, 22239, 55772, 9222,
    ]),
    w = o([
      54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982,
      57905, 49316, 21502, 52590, 14035, 8553,
    ]),
    A = o([
      26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
      26214, 26214, 26214, 26214, 26214, 26214,
    ]),
    S = o([
      41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153,
      11085, 57099, 20417, 9344, 11139,
    ]);
  function P(q, L) {
    for (let R = 0; R < 16; R++) q[R] = L[R] | 0;
  }
  function M(q) {
    let L = 1;
    for (let R = 0; R < 16; R++) {
      let f = q[R] + L + 65535;
      (L = Math.floor(f / 65536)), (q[R] = f - L * 65536);
    }
    q[0] += L - 1 + 37 * (L - 1);
  }
  function K(q, L, R) {
    const f = ~(R - 1);
    for (let O = 0; O < 16; O++) {
      const ne = f & (q[O] ^ L[O]);
      (q[O] ^= ne), (L[O] ^= ne);
    }
  }
  function B(q, L) {
    const R = o(),
      f = o();
    for (let O = 0; O < 16; O++) f[O] = L[O];
    M(f), M(f), M(f);
    for (let O = 0; O < 2; O++) {
      R[0] = f[0] - 65517;
      for (let fe = 1; fe < 15; fe++)
        (R[fe] = f[fe] - 65535 - ((R[fe - 1] >> 16) & 1)), (R[fe - 1] &= 65535);
      R[15] = f[15] - 32767 - ((R[14] >> 16) & 1);
      const ne = (R[15] >> 16) & 1;
      (R[14] &= 65535), K(f, R, 1 - ne);
    }
    for (let O = 0; O < 16; O++)
      (q[2 * O] = f[O] & 255), (q[2 * O + 1] = f[O] >> 8);
  }
  function oe(q, L) {
    let R = 0;
    for (let f = 0; f < 32; f++) R |= q[f] ^ L[f];
    return (1 & ((R - 1) >>> 8)) - 1;
  }
  function N(q, L) {
    const R = new Uint8Array(32),
      f = new Uint8Array(32);
    return B(R, q), B(f, L), oe(R, f);
  }
  function F(q) {
    const L = new Uint8Array(32);
    return B(L, q), L[0] & 1;
  }
  function x(q, L) {
    for (let R = 0; R < 16; R++) q[R] = L[2 * R] + (L[2 * R + 1] << 8);
    q[15] &= 32767;
  }
  function C(q, L, R) {
    for (let f = 0; f < 16; f++) q[f] = L[f] + R[f];
  }
  function b(q, L, R) {
    for (let f = 0; f < 16; f++) q[f] = L[f] - R[f];
  }
  function h(q, L, R) {
    let f,
      O,
      ne = 0,
      fe = 0,
      Ie = 0,
      He = 0,
      Ve = 0,
      Fe = 0,
      dt = 0,
      gt = 0,
      Me = 0,
      xe = 0,
      $e = 0,
      je = 0,
      qe = 0,
      Ae = 0,
      De = 0,
      Se = 0,
      Te = 0,
      Ke = 0,
      Pe = 0,
      ke = 0,
      We = 0,
      et = 0,
      tt = 0,
      Je = 0,
      Zt = 0,
      ur = 0,
      kr = 0,
      er = 0,
      ri = 0,
      yi = 0,
      ji = 0,
      wt = R[0],
      _t = R[1],
      Et = R[2],
      St = R[3],
      mt = R[4],
      yt = R[5],
      Dt = R[6],
      Ut = R[7],
      It = R[8],
      Ft = R[9],
      xt = R[10],
      Tt = R[11],
      Ot = R[12],
      ht = R[13],
      Lt = R[14],
      Mt = R[15];
    (f = L[0]),
      (ne += f * wt),
      (fe += f * _t),
      (Ie += f * Et),
      (He += f * St),
      (Ve += f * mt),
      (Fe += f * yt),
      (dt += f * Dt),
      (gt += f * Ut),
      (Me += f * It),
      (xe += f * Ft),
      ($e += f * xt),
      (je += f * Tt),
      (qe += f * Ot),
      (Ae += f * ht),
      (De += f * Lt),
      (Se += f * Mt),
      (f = L[1]),
      (fe += f * wt),
      (Ie += f * _t),
      (He += f * Et),
      (Ve += f * St),
      (Fe += f * mt),
      (dt += f * yt),
      (gt += f * Dt),
      (Me += f * Ut),
      (xe += f * It),
      ($e += f * Ft),
      (je += f * xt),
      (qe += f * Tt),
      (Ae += f * Ot),
      (De += f * ht),
      (Se += f * Lt),
      (Te += f * Mt),
      (f = L[2]),
      (Ie += f * wt),
      (He += f * _t),
      (Ve += f * Et),
      (Fe += f * St),
      (dt += f * mt),
      (gt += f * yt),
      (Me += f * Dt),
      (xe += f * Ut),
      ($e += f * It),
      (je += f * Ft),
      (qe += f * xt),
      (Ae += f * Tt),
      (De += f * Ot),
      (Se += f * ht),
      (Te += f * Lt),
      (Ke += f * Mt),
      (f = L[3]),
      (He += f * wt),
      (Ve += f * _t),
      (Fe += f * Et),
      (dt += f * St),
      (gt += f * mt),
      (Me += f * yt),
      (xe += f * Dt),
      ($e += f * Ut),
      (je += f * It),
      (qe += f * Ft),
      (Ae += f * xt),
      (De += f * Tt),
      (Se += f * Ot),
      (Te += f * ht),
      (Ke += f * Lt),
      (Pe += f * Mt),
      (f = L[4]),
      (Ve += f * wt),
      (Fe += f * _t),
      (dt += f * Et),
      (gt += f * St),
      (Me += f * mt),
      (xe += f * yt),
      ($e += f * Dt),
      (je += f * Ut),
      (qe += f * It),
      (Ae += f * Ft),
      (De += f * xt),
      (Se += f * Tt),
      (Te += f * Ot),
      (Ke += f * ht),
      (Pe += f * Lt),
      (ke += f * Mt),
      (f = L[5]),
      (Fe += f * wt),
      (dt += f * _t),
      (gt += f * Et),
      (Me += f * St),
      (xe += f * mt),
      ($e += f * yt),
      (je += f * Dt),
      (qe += f * Ut),
      (Ae += f * It),
      (De += f * Ft),
      (Se += f * xt),
      (Te += f * Tt),
      (Ke += f * Ot),
      (Pe += f * ht),
      (ke += f * Lt),
      (We += f * Mt),
      (f = L[6]),
      (dt += f * wt),
      (gt += f * _t),
      (Me += f * Et),
      (xe += f * St),
      ($e += f * mt),
      (je += f * yt),
      (qe += f * Dt),
      (Ae += f * Ut),
      (De += f * It),
      (Se += f * Ft),
      (Te += f * xt),
      (Ke += f * Tt),
      (Pe += f * Ot),
      (ke += f * ht),
      (We += f * Lt),
      (et += f * Mt),
      (f = L[7]),
      (gt += f * wt),
      (Me += f * _t),
      (xe += f * Et),
      ($e += f * St),
      (je += f * mt),
      (qe += f * yt),
      (Ae += f * Dt),
      (De += f * Ut),
      (Se += f * It),
      (Te += f * Ft),
      (Ke += f * xt),
      (Pe += f * Tt),
      (ke += f * Ot),
      (We += f * ht),
      (et += f * Lt),
      (tt += f * Mt),
      (f = L[8]),
      (Me += f * wt),
      (xe += f * _t),
      ($e += f * Et),
      (je += f * St),
      (qe += f * mt),
      (Ae += f * yt),
      (De += f * Dt),
      (Se += f * Ut),
      (Te += f * It),
      (Ke += f * Ft),
      (Pe += f * xt),
      (ke += f * Tt),
      (We += f * Ot),
      (et += f * ht),
      (tt += f * Lt),
      (Je += f * Mt),
      (f = L[9]),
      (xe += f * wt),
      ($e += f * _t),
      (je += f * Et),
      (qe += f * St),
      (Ae += f * mt),
      (De += f * yt),
      (Se += f * Dt),
      (Te += f * Ut),
      (Ke += f * It),
      (Pe += f * Ft),
      (ke += f * xt),
      (We += f * Tt),
      (et += f * Ot),
      (tt += f * ht),
      (Je += f * Lt),
      (Zt += f * Mt),
      (f = L[10]),
      ($e += f * wt),
      (je += f * _t),
      (qe += f * Et),
      (Ae += f * St),
      (De += f * mt),
      (Se += f * yt),
      (Te += f * Dt),
      (Ke += f * Ut),
      (Pe += f * It),
      (ke += f * Ft),
      (We += f * xt),
      (et += f * Tt),
      (tt += f * Ot),
      (Je += f * ht),
      (Zt += f * Lt),
      (ur += f * Mt),
      (f = L[11]),
      (je += f * wt),
      (qe += f * _t),
      (Ae += f * Et),
      (De += f * St),
      (Se += f * mt),
      (Te += f * yt),
      (Ke += f * Dt),
      (Pe += f * Ut),
      (ke += f * It),
      (We += f * Ft),
      (et += f * xt),
      (tt += f * Tt),
      (Je += f * Ot),
      (Zt += f * ht),
      (ur += f * Lt),
      (kr += f * Mt),
      (f = L[12]),
      (qe += f * wt),
      (Ae += f * _t),
      (De += f * Et),
      (Se += f * St),
      (Te += f * mt),
      (Ke += f * yt),
      (Pe += f * Dt),
      (ke += f * Ut),
      (We += f * It),
      (et += f * Ft),
      (tt += f * xt),
      (Je += f * Tt),
      (Zt += f * Ot),
      (ur += f * ht),
      (kr += f * Lt),
      (er += f * Mt),
      (f = L[13]),
      (Ae += f * wt),
      (De += f * _t),
      (Se += f * Et),
      (Te += f * St),
      (Ke += f * mt),
      (Pe += f * yt),
      (ke += f * Dt),
      (We += f * Ut),
      (et += f * It),
      (tt += f * Ft),
      (Je += f * xt),
      (Zt += f * Tt),
      (ur += f * Ot),
      (kr += f * ht),
      (er += f * Lt),
      (ri += f * Mt),
      (f = L[14]),
      (De += f * wt),
      (Se += f * _t),
      (Te += f * Et),
      (Ke += f * St),
      (Pe += f * mt),
      (ke += f * yt),
      (We += f * Dt),
      (et += f * Ut),
      (tt += f * It),
      (Je += f * Ft),
      (Zt += f * xt),
      (ur += f * Tt),
      (kr += f * Ot),
      (er += f * ht),
      (ri += f * Lt),
      (yi += f * Mt),
      (f = L[15]),
      (Se += f * wt),
      (Te += f * _t),
      (Ke += f * Et),
      (Pe += f * St),
      (ke += f * mt),
      (We += f * yt),
      (et += f * Dt),
      (tt += f * Ut),
      (Je += f * It),
      (Zt += f * Ft),
      (ur += f * xt),
      (kr += f * Tt),
      (er += f * Ot),
      (ri += f * ht),
      (yi += f * Lt),
      (ji += f * Mt),
      (ne += 38 * Te),
      (fe += 38 * Ke),
      (Ie += 38 * Pe),
      (He += 38 * ke),
      (Ve += 38 * We),
      (Fe += 38 * et),
      (dt += 38 * tt),
      (gt += 38 * Je),
      (Me += 38 * Zt),
      (xe += 38 * ur),
      ($e += 38 * kr),
      (je += 38 * er),
      (qe += 38 * ri),
      (Ae += 38 * yi),
      (De += 38 * ji),
      (O = 1),
      (f = ne + O + 65535),
      (O = Math.floor(f / 65536)),
      (ne = f - O * 65536),
      (f = fe + O + 65535),
      (O = Math.floor(f / 65536)),
      (fe = f - O * 65536),
      (f = Ie + O + 65535),
      (O = Math.floor(f / 65536)),
      (Ie = f - O * 65536),
      (f = He + O + 65535),
      (O = Math.floor(f / 65536)),
      (He = f - O * 65536),
      (f = Ve + O + 65535),
      (O = Math.floor(f / 65536)),
      (Ve = f - O * 65536),
      (f = Fe + O + 65535),
      (O = Math.floor(f / 65536)),
      (Fe = f - O * 65536),
      (f = dt + O + 65535),
      (O = Math.floor(f / 65536)),
      (dt = f - O * 65536),
      (f = gt + O + 65535),
      (O = Math.floor(f / 65536)),
      (gt = f - O * 65536),
      (f = Me + O + 65535),
      (O = Math.floor(f / 65536)),
      (Me = f - O * 65536),
      (f = xe + O + 65535),
      (O = Math.floor(f / 65536)),
      (xe = f - O * 65536),
      (f = $e + O + 65535),
      (O = Math.floor(f / 65536)),
      ($e = f - O * 65536),
      (f = je + O + 65535),
      (O = Math.floor(f / 65536)),
      (je = f - O * 65536),
      (f = qe + O + 65535),
      (O = Math.floor(f / 65536)),
      (qe = f - O * 65536),
      (f = Ae + O + 65535),
      (O = Math.floor(f / 65536)),
      (Ae = f - O * 65536),
      (f = De + O + 65535),
      (O = Math.floor(f / 65536)),
      (De = f - O * 65536),
      (f = Se + O + 65535),
      (O = Math.floor(f / 65536)),
      (Se = f - O * 65536),
      (ne += O - 1 + 37 * (O - 1)),
      (O = 1),
      (f = ne + O + 65535),
      (O = Math.floor(f / 65536)),
      (ne = f - O * 65536),
      (f = fe + O + 65535),
      (O = Math.floor(f / 65536)),
      (fe = f - O * 65536),
      (f = Ie + O + 65535),
      (O = Math.floor(f / 65536)),
      (Ie = f - O * 65536),
      (f = He + O + 65535),
      (O = Math.floor(f / 65536)),
      (He = f - O * 65536),
      (f = Ve + O + 65535),
      (O = Math.floor(f / 65536)),
      (Ve = f - O * 65536),
      (f = Fe + O + 65535),
      (O = Math.floor(f / 65536)),
      (Fe = f - O * 65536),
      (f = dt + O + 65535),
      (O = Math.floor(f / 65536)),
      (dt = f - O * 65536),
      (f = gt + O + 65535),
      (O = Math.floor(f / 65536)),
      (gt = f - O * 65536),
      (f = Me + O + 65535),
      (O = Math.floor(f / 65536)),
      (Me = f - O * 65536),
      (f = xe + O + 65535),
      (O = Math.floor(f / 65536)),
      (xe = f - O * 65536),
      (f = $e + O + 65535),
      (O = Math.floor(f / 65536)),
      ($e = f - O * 65536),
      (f = je + O + 65535),
      (O = Math.floor(f / 65536)),
      (je = f - O * 65536),
      (f = qe + O + 65535),
      (O = Math.floor(f / 65536)),
      (qe = f - O * 65536),
      (f = Ae + O + 65535),
      (O = Math.floor(f / 65536)),
      (Ae = f - O * 65536),
      (f = De + O + 65535),
      (O = Math.floor(f / 65536)),
      (De = f - O * 65536),
      (f = Se + O + 65535),
      (O = Math.floor(f / 65536)),
      (Se = f - O * 65536),
      (ne += O - 1 + 37 * (O - 1)),
      (q[0] = ne),
      (q[1] = fe),
      (q[2] = Ie),
      (q[3] = He),
      (q[4] = Ve),
      (q[5] = Fe),
      (q[6] = dt),
      (q[7] = gt),
      (q[8] = Me),
      (q[9] = xe),
      (q[10] = $e),
      (q[11] = je),
      (q[12] = qe),
      (q[13] = Ae),
      (q[14] = De),
      (q[15] = Se);
  }
  function m(q, L) {
    h(q, L, L);
  }
  function G(q, L) {
    const R = o();
    let f;
    for (f = 0; f < 16; f++) R[f] = L[f];
    for (f = 253; f >= 0; f--) m(R, R), f !== 2 && f !== 4 && h(R, R, L);
    for (f = 0; f < 16; f++) q[f] = R[f];
  }
  function k(q, L) {
    const R = o();
    let f;
    for (f = 0; f < 16; f++) R[f] = L[f];
    for (f = 250; f >= 0; f--) m(R, R), f !== 1 && h(R, R, L);
    for (f = 0; f < 16; f++) q[f] = R[f];
  }
  function se(q, L) {
    const R = o(),
      f = o(),
      O = o(),
      ne = o(),
      fe = o(),
      Ie = o(),
      He = o(),
      Ve = o(),
      Fe = o();
    b(R, q[1], q[0]),
      b(Fe, L[1], L[0]),
      h(R, R, Fe),
      C(f, q[0], q[1]),
      C(Fe, L[0], L[1]),
      h(f, f, Fe),
      h(O, q[3], L[3]),
      h(O, O, d),
      h(ne, q[2], L[2]),
      C(ne, ne, ne),
      b(fe, f, R),
      b(Ie, ne, O),
      C(He, ne, O),
      C(Ve, f, R),
      h(q[0], fe, Ie),
      h(q[1], Ve, He),
      h(q[2], He, Ie),
      h(q[3], fe, Ve);
  }
  function ce(q, L, R) {
    for (let f = 0; f < 4; f++) K(q[f], L[f], R);
  }
  function ge(q, L) {
    const R = o(),
      f = o(),
      O = o();
    G(O, L[2]), h(R, L[0], O), h(f, L[1], O), B(q, f), (q[31] ^= F(R) << 7);
  }
  function $(q, L, R) {
    P(q[0], l), P(q[1], p), P(q[2], p), P(q[3], l);
    for (let f = 255; f >= 0; --f) {
      const O = (R[(f / 8) | 0] >> (f & 7)) & 1;
      ce(q, L, O), se(L, q), se(q, q), ce(q, L, O);
    }
  }
  function z(q, L) {
    const R = [o(), o(), o(), o()];
    P(R[0], w), P(R[1], A), P(R[2], p), h(R[3], w, A), $(q, R, L);
  }
  function le(q) {
    if (q.length !== i.SEED_LENGTH)
      throw new Error(`ed25519: seed must be ${i.SEED_LENGTH} bytes`);
    const L = (0, t.hash)(q);
    (L[0] &= 248), (L[31] &= 127), (L[31] |= 64);
    const R = new Uint8Array(32),
      f = [o(), o(), o(), o()];
    z(f, L), ge(R, f);
    const O = new Uint8Array(64);
    return O.set(q), O.set(R, 32), { publicKey: R, secretKey: O };
  }
  i.generateKeyPairFromSeed = le;
  function te(q) {
    const L = (0, e.randomBytes)(32, q),
      R = le(L);
    return (0, s.wipe)(L), R;
  }
  i.generateKeyPair = te;
  function W(q) {
    if (q.length !== i.SECRET_KEY_LENGTH)
      throw new Error(
        `ed25519: secret key must be ${i.SECRET_KEY_LENGTH} bytes`,
      );
    return new Uint8Array(q.subarray(32));
  }
  i.extractPublicKeyFromSecretKey = W;
  const ee = new Float64Array([
    237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
  ]);
  function Y(q, L) {
    let R, f, O, ne;
    for (f = 63; f >= 32; --f) {
      for (R = 0, O = f - 32, ne = f - 12; O < ne; ++O)
        (L[O] += R - 16 * L[f] * ee[O - (f - 32)]),
          (R = Math.floor((L[O] + 128) / 256)),
          (L[O] -= R * 256);
      (L[O] += R), (L[f] = 0);
    }
    for (R = 0, O = 0; O < 32; O++)
      (L[O] += R - (L[31] >> 4) * ee[O]), (R = L[O] >> 8), (L[O] &= 255);
    for (O = 0; O < 32; O++) L[O] -= R * ee[O];
    for (f = 0; f < 32; f++) (L[f + 1] += L[f] >> 8), (q[f] = L[f] & 255);
  }
  function re(q) {
    const L = new Float64Array(64);
    for (let R = 0; R < 64; R++) L[R] = q[R];
    for (let R = 0; R < 64; R++) q[R] = 0;
    Y(q, L);
  }
  function Oe(q, L) {
    const R = new Float64Array(64),
      f = [o(), o(), o(), o()],
      O = (0, t.hash)(q.subarray(0, 32));
    (O[0] &= 248), (O[31] &= 127), (O[31] |= 64);
    const ne = new Uint8Array(64);
    ne.set(O.subarray(32), 32);
    const fe = new t.SHA512();
    fe.update(ne.subarray(32)), fe.update(L);
    const Ie = fe.digest();
    fe.clean(),
      re(Ie),
      z(f, Ie),
      ge(ne, f),
      fe.reset(),
      fe.update(ne.subarray(0, 32)),
      fe.update(q.subarray(32)),
      fe.update(L);
    const He = fe.digest();
    re(He);
    for (let Ve = 0; Ve < 32; Ve++) R[Ve] = Ie[Ve];
    for (let Ve = 0; Ve < 32; Ve++)
      for (let Fe = 0; Fe < 32; Fe++) R[Ve + Fe] += He[Ve] * O[Fe];
    return Y(ne.subarray(32), R), ne;
  }
  i.sign = Oe;
  function ie(q, L) {
    const R = o(),
      f = o(),
      O = o(),
      ne = o(),
      fe = o(),
      Ie = o(),
      He = o();
    return (
      P(q[2], p),
      x(q[1], L),
      m(O, q[1]),
      h(ne, O, _),
      b(O, O, q[2]),
      C(ne, q[2], ne),
      m(fe, ne),
      m(Ie, fe),
      h(He, Ie, fe),
      h(R, He, O),
      h(R, R, ne),
      k(R, R),
      h(R, R, O),
      h(R, R, ne),
      h(R, R, ne),
      h(q[0], R, ne),
      m(f, q[0]),
      h(f, f, ne),
      N(f, O) && h(q[0], q[0], S),
      m(f, q[0]),
      h(f, f, ne),
      N(f, O)
        ? -1
        : (F(q[0]) === L[31] >> 7 && b(q[0], l, q[0]), h(q[3], q[0], q[1]), 0)
    );
  }
  function be(q, L, R) {
    const f = new Uint8Array(32),
      O = [o(), o(), o(), o()],
      ne = [o(), o(), o(), o()];
    if (R.length !== i.SIGNATURE_LENGTH)
      throw new Error(`ed25519: signature must be ${i.SIGNATURE_LENGTH} bytes`);
    if (ie(ne, q)) return !1;
    const fe = new t.SHA512();
    fe.update(R.subarray(0, 32)), fe.update(q), fe.update(L);
    const Ie = fe.digest();
    return (
      re(Ie),
      $(O, ne, Ie),
      z(ne, R.subarray(32)),
      se(O, ne),
      ge(f, O),
      !oe(R, f)
    );
  }
  i.verify = be;
  function he(q) {
    let L = [o(), o(), o(), o()];
    if (ie(L, q)) throw new Error("Ed25519: invalid public key");
    let R = o(),
      f = o(),
      O = L[1];
    C(R, p, O), b(f, p, O), G(f, f), h(R, R, f);
    let ne = new Uint8Array(32);
    return B(ne, R), ne;
  }
  i.convertPublicKeyToX25519 = he;
  function ve(q) {
    const L = (0, t.hash)(q.subarray(0, 32));
    (L[0] &= 248), (L[31] &= 127), (L[31] |= 64);
    const R = new Uint8Array(L.subarray(0, 32));
    return (0, s.wipe)(L), R;
  }
  i.convertSecretKeyToX25519 = ve;
})(Ou);
const sE = "EdDSA",
  oE = "JWT",
  zp = ".",
  Hp = "base64url",
  aE = "utf8",
  cE = "utf8",
  uE = ":",
  hE = "did",
  lE = "key",
  mf = "base58btc",
  fE = "z",
  pE = "K36",
  dE = 32;
function Lo(i) {
  return cr(_r(vs(i), aE), Hp);
}
function Kp(i) {
  const e = _r(pE, mf),
    t = fE + cr(kc([e, i]), mf);
  return [hE, lE, t].join(uE);
}
function gE(i) {
  return cr(i, Hp);
}
function _E(i) {
  return _r([Lo(i.header), Lo(i.payload)].join(zp), cE);
}
function yE(i) {
  return [Lo(i.header), Lo(i.payload), gE(i.signature)].join(zp);
}
function bf(i = Rn.randomBytes(dE)) {
  return Ou.generateKeyPairFromSeed(i);
}
async function vE(i, e, t, s, o = _e.fromMiliseconds(Date.now())) {
  const c = { alg: sE, typ: oE },
    l = Kp(s.publicKey),
    p = o + t,
    _ = { iss: l, sub: i, aud: e, iat: o, exp: p },
    d = _E({ header: c, payload: _ }),
    w = Ou.sign(s.secretKey, d);
  return yE({ header: c, payload: _, signature: w });
}
var Pu = {},
  Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
var Qt = Ue,
  uu = Ir,
  mE = 20;
function bE(i, e, t) {
  for (
    var s = 1634760805,
      o = 857760878,
      c = 2036477234,
      l = 1797285236,
      p = (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0],
      _ = (t[7] << 24) | (t[6] << 16) | (t[5] << 8) | t[4],
      d = (t[11] << 24) | (t[10] << 16) | (t[9] << 8) | t[8],
      w = (t[15] << 24) | (t[14] << 16) | (t[13] << 8) | t[12],
      A = (t[19] << 24) | (t[18] << 16) | (t[17] << 8) | t[16],
      S = (t[23] << 24) | (t[22] << 16) | (t[21] << 8) | t[20],
      P = (t[27] << 24) | (t[26] << 16) | (t[25] << 8) | t[24],
      M = (t[31] << 24) | (t[30] << 16) | (t[29] << 8) | t[28],
      K = (e[3] << 24) | (e[2] << 16) | (e[1] << 8) | e[0],
      B = (e[7] << 24) | (e[6] << 16) | (e[5] << 8) | e[4],
      oe = (e[11] << 24) | (e[10] << 16) | (e[9] << 8) | e[8],
      N = (e[15] << 24) | (e[14] << 16) | (e[13] << 8) | e[12],
      F = s,
      x = o,
      C = c,
      b = l,
      h = p,
      m = _,
      G = d,
      k = w,
      se = A,
      ce = S,
      ge = P,
      $ = M,
      z = K,
      le = B,
      te = oe,
      W = N,
      ee = 0;
    ee < mE;
    ee += 2
  )
    (F = (F + h) | 0),
      (z ^= F),
      (z = (z >>> (32 - 16)) | (z << 16)),
      (se = (se + z) | 0),
      (h ^= se),
      (h = (h >>> (32 - 12)) | (h << 12)),
      (x = (x + m) | 0),
      (le ^= x),
      (le = (le >>> (32 - 16)) | (le << 16)),
      (ce = (ce + le) | 0),
      (m ^= ce),
      (m = (m >>> (32 - 12)) | (m << 12)),
      (C = (C + G) | 0),
      (te ^= C),
      (te = (te >>> (32 - 16)) | (te << 16)),
      (ge = (ge + te) | 0),
      (G ^= ge),
      (G = (G >>> (32 - 12)) | (G << 12)),
      (b = (b + k) | 0),
      (W ^= b),
      (W = (W >>> (32 - 16)) | (W << 16)),
      ($ = ($ + W) | 0),
      (k ^= $),
      (k = (k >>> (32 - 12)) | (k << 12)),
      (C = (C + G) | 0),
      (te ^= C),
      (te = (te >>> (32 - 8)) | (te << 8)),
      (ge = (ge + te) | 0),
      (G ^= ge),
      (G = (G >>> (32 - 7)) | (G << 7)),
      (b = (b + k) | 0),
      (W ^= b),
      (W = (W >>> (32 - 8)) | (W << 8)),
      ($ = ($ + W) | 0),
      (k ^= $),
      (k = (k >>> (32 - 7)) | (k << 7)),
      (x = (x + m) | 0),
      (le ^= x),
      (le = (le >>> (32 - 8)) | (le << 8)),
      (ce = (ce + le) | 0),
      (m ^= ce),
      (m = (m >>> (32 - 7)) | (m << 7)),
      (F = (F + h) | 0),
      (z ^= F),
      (z = (z >>> (32 - 8)) | (z << 8)),
      (se = (se + z) | 0),
      (h ^= se),
      (h = (h >>> (32 - 7)) | (h << 7)),
      (F = (F + m) | 0),
      (W ^= F),
      (W = (W >>> (32 - 16)) | (W << 16)),
      (ge = (ge + W) | 0),
      (m ^= ge),
      (m = (m >>> (32 - 12)) | (m << 12)),
      (x = (x + G) | 0),
      (z ^= x),
      (z = (z >>> (32 - 16)) | (z << 16)),
      ($ = ($ + z) | 0),
      (G ^= $),
      (G = (G >>> (32 - 12)) | (G << 12)),
      (C = (C + k) | 0),
      (le ^= C),
      (le = (le >>> (32 - 16)) | (le << 16)),
      (se = (se + le) | 0),
      (k ^= se),
      (k = (k >>> (32 - 12)) | (k << 12)),
      (b = (b + h) | 0),
      (te ^= b),
      (te = (te >>> (32 - 16)) | (te << 16)),
      (ce = (ce + te) | 0),
      (h ^= ce),
      (h = (h >>> (32 - 12)) | (h << 12)),
      (C = (C + k) | 0),
      (le ^= C),
      (le = (le >>> (32 - 8)) | (le << 8)),
      (se = (se + le) | 0),
      (k ^= se),
      (k = (k >>> (32 - 7)) | (k << 7)),
      (b = (b + h) | 0),
      (te ^= b),
      (te = (te >>> (32 - 8)) | (te << 8)),
      (ce = (ce + te) | 0),
      (h ^= ce),
      (h = (h >>> (32 - 7)) | (h << 7)),
      (x = (x + G) | 0),
      (z ^= x),
      (z = (z >>> (32 - 8)) | (z << 8)),
      ($ = ($ + z) | 0),
      (G ^= $),
      (G = (G >>> (32 - 7)) | (G << 7)),
      (F = (F + m) | 0),
      (W ^= F),
      (W = (W >>> (32 - 8)) | (W << 8)),
      (ge = (ge + W) | 0),
      (m ^= ge),
      (m = (m >>> (32 - 7)) | (m << 7));
  Qt.writeUint32LE((F + s) | 0, i, 0),
    Qt.writeUint32LE((x + o) | 0, i, 4),
    Qt.writeUint32LE((C + c) | 0, i, 8),
    Qt.writeUint32LE((b + l) | 0, i, 12),
    Qt.writeUint32LE((h + p) | 0, i, 16),
    Qt.writeUint32LE((m + _) | 0, i, 20),
    Qt.writeUint32LE((G + d) | 0, i, 24),
    Qt.writeUint32LE((k + w) | 0, i, 28),
    Qt.writeUint32LE((se + A) | 0, i, 32),
    Qt.writeUint32LE((ce + S) | 0, i, 36),
    Qt.writeUint32LE((ge + P) | 0, i, 40),
    Qt.writeUint32LE(($ + M) | 0, i, 44),
    Qt.writeUint32LE((z + K) | 0, i, 48),
    Qt.writeUint32LE((le + B) | 0, i, 52),
    Qt.writeUint32LE((te + oe) | 0, i, 56),
    Qt.writeUint32LE((W + N) | 0, i, 60);
}
function Bp(i, e, t, s, o) {
  if ((o === void 0 && (o = 0), i.length !== 32))
    throw new Error("ChaCha: key size must be 32 bytes");
  if (s.length < t.length)
    throw new Error("ChaCha: destination is shorter than source");
  var c, l;
  if (o === 0) {
    if (e.length !== 8 && e.length !== 12)
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    (c = new Uint8Array(16)), (l = c.length - e.length), c.set(e, l);
  } else {
    if (e.length !== 16)
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    (c = e), (l = o);
  }
  for (var p = new Uint8Array(64), _ = 0; _ < t.length; _ += 64) {
    bE(p, c, i);
    for (var d = _; d < _ + 64 && d < t.length; d++) s[d] = t[d] ^ p[d - _];
    EE(c, 0, l);
  }
  return uu.wipe(p), o === 0 && uu.wipe(c), s;
}
Jo.streamXOR = Bp;
function wE(i, e, t, s) {
  return s === void 0 && (s = 0), uu.wipe(t), Bp(i, e, t, t, s);
}
Jo.stream = wE;
function EE(i, e, t) {
  for (var s = 1; t--; )
    (s = (s + (i[e] & 255)) | 0), (i[e] = s & 255), (s >>>= 8), e++;
  if (s > 0) throw new Error("ChaCha: counter overflow");
}
var Vp = {},
  Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
function SE(i, e, t) {
  return (~(i - 1) & e) | ((i - 1) & t);
}
Ri.select = SE;
function IE(i, e) {
  return (((i | 0) - (e | 0) - 1) >>> 31) & 1;
}
Ri.lessOrEqual = IE;
function kp(i, e) {
  if (i.length !== e.length) return 0;
  for (var t = 0, s = 0; s < i.length; s++) t |= i[s] ^ e[s];
  return 1 & ((t - 1) >>> 8);
}
Ri.compare = kp;
function xE(i, e) {
  return i.length === 0 || e.length === 0 ? !1 : kp(i, e) !== 0;
}
Ri.equal = xE;
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ri,
    t = Ir;
  i.DIGEST_LENGTH = 16;
  var s = (function () {
    function l(p) {
      (this.digestLength = i.DIGEST_LENGTH),
        (this._buffer = new Uint8Array(16)),
        (this._r = new Uint16Array(10)),
        (this._h = new Uint16Array(10)),
        (this._pad = new Uint16Array(8)),
        (this._leftover = 0),
        (this._fin = 0),
        (this._finished = !1);
      var _ = p[0] | (p[1] << 8);
      this._r[0] = _ & 8191;
      var d = p[2] | (p[3] << 8);
      this._r[1] = ((_ >>> 13) | (d << 3)) & 8191;
      var w = p[4] | (p[5] << 8);
      this._r[2] = ((d >>> 10) | (w << 6)) & 7939;
      var A = p[6] | (p[7] << 8);
      this._r[3] = ((w >>> 7) | (A << 9)) & 8191;
      var S = p[8] | (p[9] << 8);
      (this._r[4] = ((A >>> 4) | (S << 12)) & 255),
        (this._r[5] = (S >>> 1) & 8190);
      var P = p[10] | (p[11] << 8);
      this._r[6] = ((S >>> 14) | (P << 2)) & 8191;
      var M = p[12] | (p[13] << 8);
      this._r[7] = ((P >>> 11) | (M << 5)) & 8065;
      var K = p[14] | (p[15] << 8);
      (this._r[8] = ((M >>> 8) | (K << 8)) & 8191),
        (this._r[9] = (K >>> 5) & 127),
        (this._pad[0] = p[16] | (p[17] << 8)),
        (this._pad[1] = p[18] | (p[19] << 8)),
        (this._pad[2] = p[20] | (p[21] << 8)),
        (this._pad[3] = p[22] | (p[23] << 8)),
        (this._pad[4] = p[24] | (p[25] << 8)),
        (this._pad[5] = p[26] | (p[27] << 8)),
        (this._pad[6] = p[28] | (p[29] << 8)),
        (this._pad[7] = p[30] | (p[31] << 8));
    }
    return (
      (l.prototype._blocks = function (p, _, d) {
        for (
          var w = this._fin ? 0 : 2048,
            A = this._h[0],
            S = this._h[1],
            P = this._h[2],
            M = this._h[3],
            K = this._h[4],
            B = this._h[5],
            oe = this._h[6],
            N = this._h[7],
            F = this._h[8],
            x = this._h[9],
            C = this._r[0],
            b = this._r[1],
            h = this._r[2],
            m = this._r[3],
            G = this._r[4],
            k = this._r[5],
            se = this._r[6],
            ce = this._r[7],
            ge = this._r[8],
            $ = this._r[9];
          d >= 16;

        ) {
          var z = p[_ + 0] | (p[_ + 1] << 8);
          A += z & 8191;
          var le = p[_ + 2] | (p[_ + 3] << 8);
          S += ((z >>> 13) | (le << 3)) & 8191;
          var te = p[_ + 4] | (p[_ + 5] << 8);
          P += ((le >>> 10) | (te << 6)) & 8191;
          var W = p[_ + 6] | (p[_ + 7] << 8);
          M += ((te >>> 7) | (W << 9)) & 8191;
          var ee = p[_ + 8] | (p[_ + 9] << 8);
          (K += ((W >>> 4) | (ee << 12)) & 8191), (B += (ee >>> 1) & 8191);
          var Y = p[_ + 10] | (p[_ + 11] << 8);
          oe += ((ee >>> 14) | (Y << 2)) & 8191;
          var re = p[_ + 12] | (p[_ + 13] << 8);
          N += ((Y >>> 11) | (re << 5)) & 8191;
          var Oe = p[_ + 14] | (p[_ + 15] << 8);
          (F += ((re >>> 8) | (Oe << 8)) & 8191), (x += (Oe >>> 5) | w);
          var ie = 0,
            be = ie;
          (be += A * C),
            (be += S * (5 * $)),
            (be += P * (5 * ge)),
            (be += M * (5 * ce)),
            (be += K * (5 * se)),
            (ie = be >>> 13),
            (be &= 8191),
            (be += B * (5 * k)),
            (be += oe * (5 * G)),
            (be += N * (5 * m)),
            (be += F * (5 * h)),
            (be += x * (5 * b)),
            (ie += be >>> 13),
            (be &= 8191);
          var he = ie;
          (he += A * b),
            (he += S * C),
            (he += P * (5 * $)),
            (he += M * (5 * ge)),
            (he += K * (5 * ce)),
            (ie = he >>> 13),
            (he &= 8191),
            (he += B * (5 * se)),
            (he += oe * (5 * k)),
            (he += N * (5 * G)),
            (he += F * (5 * m)),
            (he += x * (5 * h)),
            (ie += he >>> 13),
            (he &= 8191);
          var ve = ie;
          (ve += A * h),
            (ve += S * b),
            (ve += P * C),
            (ve += M * (5 * $)),
            (ve += K * (5 * ge)),
            (ie = ve >>> 13),
            (ve &= 8191),
            (ve += B * (5 * ce)),
            (ve += oe * (5 * se)),
            (ve += N * (5 * k)),
            (ve += F * (5 * G)),
            (ve += x * (5 * m)),
            (ie += ve >>> 13),
            (ve &= 8191);
          var q = ie;
          (q += A * m),
            (q += S * h),
            (q += P * b),
            (q += M * C),
            (q += K * (5 * $)),
            (ie = q >>> 13),
            (q &= 8191),
            (q += B * (5 * ge)),
            (q += oe * (5 * ce)),
            (q += N * (5 * se)),
            (q += F * (5 * k)),
            (q += x * (5 * G)),
            (ie += q >>> 13),
            (q &= 8191);
          var L = ie;
          (L += A * G),
            (L += S * m),
            (L += P * h),
            (L += M * b),
            (L += K * C),
            (ie = L >>> 13),
            (L &= 8191),
            (L += B * (5 * $)),
            (L += oe * (5 * ge)),
            (L += N * (5 * ce)),
            (L += F * (5 * se)),
            (L += x * (5 * k)),
            (ie += L >>> 13),
            (L &= 8191);
          var R = ie;
          (R += A * k),
            (R += S * G),
            (R += P * m),
            (R += M * h),
            (R += K * b),
            (ie = R >>> 13),
            (R &= 8191),
            (R += B * C),
            (R += oe * (5 * $)),
            (R += N * (5 * ge)),
            (R += F * (5 * ce)),
            (R += x * (5 * se)),
            (ie += R >>> 13),
            (R &= 8191);
          var f = ie;
          (f += A * se),
            (f += S * k),
            (f += P * G),
            (f += M * m),
            (f += K * h),
            (ie = f >>> 13),
            (f &= 8191),
            (f += B * b),
            (f += oe * C),
            (f += N * (5 * $)),
            (f += F * (5 * ge)),
            (f += x * (5 * ce)),
            (ie += f >>> 13),
            (f &= 8191);
          var O = ie;
          (O += A * ce),
            (O += S * se),
            (O += P * k),
            (O += M * G),
            (O += K * m),
            (ie = O >>> 13),
            (O &= 8191),
            (O += B * h),
            (O += oe * b),
            (O += N * C),
            (O += F * (5 * $)),
            (O += x * (5 * ge)),
            (ie += O >>> 13),
            (O &= 8191);
          var ne = ie;
          (ne += A * ge),
            (ne += S * ce),
            (ne += P * se),
            (ne += M * k),
            (ne += K * G),
            (ie = ne >>> 13),
            (ne &= 8191),
            (ne += B * m),
            (ne += oe * h),
            (ne += N * b),
            (ne += F * C),
            (ne += x * (5 * $)),
            (ie += ne >>> 13),
            (ne &= 8191);
          var fe = ie;
          (fe += A * $),
            (fe += S * ge),
            (fe += P * ce),
            (fe += M * se),
            (fe += K * k),
            (ie = fe >>> 13),
            (fe &= 8191),
            (fe += B * G),
            (fe += oe * m),
            (fe += N * h),
            (fe += F * b),
            (fe += x * C),
            (ie += fe >>> 13),
            (fe &= 8191),
            (ie = ((ie << 2) + ie) | 0),
            (ie = (ie + be) | 0),
            (be = ie & 8191),
            (ie = ie >>> 13),
            (he += ie),
            (A = be),
            (S = he),
            (P = ve),
            (M = q),
            (K = L),
            (B = R),
            (oe = f),
            (N = O),
            (F = ne),
            (x = fe),
            (_ += 16),
            (d -= 16);
        }
        (this._h[0] = A),
          (this._h[1] = S),
          (this._h[2] = P),
          (this._h[3] = M),
          (this._h[4] = K),
          (this._h[5] = B),
          (this._h[6] = oe),
          (this._h[7] = N),
          (this._h[8] = F),
          (this._h[9] = x);
      }),
      (l.prototype.finish = function (p, _) {
        _ === void 0 && (_ = 0);
        var d = new Uint16Array(10),
          w,
          A,
          S,
          P;
        if (this._leftover) {
          for (P = this._leftover, this._buffer[P++] = 1; P < 16; P++)
            this._buffer[P] = 0;
          (this._fin = 1), this._blocks(this._buffer, 0, 16);
        }
        for (w = this._h[1] >>> 13, this._h[1] &= 8191, P = 2; P < 10; P++)
          (this._h[P] += w), (w = this._h[P] >>> 13), (this._h[P] &= 8191);
        for (
          this._h[0] += w * 5,
            w = this._h[0] >>> 13,
            this._h[0] &= 8191,
            this._h[1] += w,
            w = this._h[1] >>> 13,
            this._h[1] &= 8191,
            this._h[2] += w,
            d[0] = this._h[0] + 5,
            w = d[0] >>> 13,
            d[0] &= 8191,
            P = 1;
          P < 10;
          P++
        )
          (d[P] = this._h[P] + w), (w = d[P] >>> 13), (d[P] &= 8191);
        for (d[9] -= 8192, A = (w ^ 1) - 1, P = 0; P < 10; P++) d[P] &= A;
        for (A = ~A, P = 0; P < 10; P++) this._h[P] = (this._h[P] & A) | d[P];
        for (
          this._h[0] = (this._h[0] | (this._h[1] << 13)) & 65535,
            this._h[1] = ((this._h[1] >>> 3) | (this._h[2] << 10)) & 65535,
            this._h[2] = ((this._h[2] >>> 6) | (this._h[3] << 7)) & 65535,
            this._h[3] = ((this._h[3] >>> 9) | (this._h[4] << 4)) & 65535,
            this._h[4] =
              ((this._h[4] >>> 12) | (this._h[5] << 1) | (this._h[6] << 14)) &
              65535,
            this._h[5] = ((this._h[6] >>> 2) | (this._h[7] << 11)) & 65535,
            this._h[6] = ((this._h[7] >>> 5) | (this._h[8] << 8)) & 65535,
            this._h[7] = ((this._h[8] >>> 8) | (this._h[9] << 5)) & 65535,
            S = this._h[0] + this._pad[0],
            this._h[0] = S & 65535,
            P = 1;
          P < 8;
          P++
        )
          (S = (((this._h[P] + this._pad[P]) | 0) + (S >>> 16)) | 0),
            (this._h[P] = S & 65535);
        return (
          (p[_ + 0] = this._h[0] >>> 0),
          (p[_ + 1] = this._h[0] >>> 8),
          (p[_ + 2] = this._h[1] >>> 0),
          (p[_ + 3] = this._h[1] >>> 8),
          (p[_ + 4] = this._h[2] >>> 0),
          (p[_ + 5] = this._h[2] >>> 8),
          (p[_ + 6] = this._h[3] >>> 0),
          (p[_ + 7] = this._h[3] >>> 8),
          (p[_ + 8] = this._h[4] >>> 0),
          (p[_ + 9] = this._h[4] >>> 8),
          (p[_ + 10] = this._h[5] >>> 0),
          (p[_ + 11] = this._h[5] >>> 8),
          (p[_ + 12] = this._h[6] >>> 0),
          (p[_ + 13] = this._h[6] >>> 8),
          (p[_ + 14] = this._h[7] >>> 0),
          (p[_ + 15] = this._h[7] >>> 8),
          (this._finished = !0),
          this
        );
      }),
      (l.prototype.update = function (p) {
        var _ = 0,
          d = p.length,
          w;
        if (this._leftover) {
          (w = 16 - this._leftover), w > d && (w = d);
          for (var A = 0; A < w; A++)
            this._buffer[this._leftover + A] = p[_ + A];
          if (((d -= w), (_ += w), (this._leftover += w), this._leftover < 16))
            return this;
          this._blocks(this._buffer, 0, 16), (this._leftover = 0);
        }
        if (
          (d >= 16 &&
            ((w = d - (d % 16)), this._blocks(p, _, w), (_ += w), (d -= w)),
          d)
        ) {
          for (var A = 0; A < d; A++)
            this._buffer[this._leftover + A] = p[_ + A];
          this._leftover += d;
        }
        return this;
      }),
      (l.prototype.digest = function () {
        if (this._finished) throw new Error("Poly1305 was finished");
        var p = new Uint8Array(16);
        return this.finish(p), p;
      }),
      (l.prototype.clean = function () {
        return (
          t.wipe(this._buffer),
          t.wipe(this._r),
          t.wipe(this._h),
          t.wipe(this._pad),
          (this._leftover = 0),
          (this._fin = 0),
          (this._finished = !0),
          this
        );
      }),
      l
    );
  })();
  i.Poly1305 = s;
  function o(l, p) {
    var _ = new s(l);
    _.update(p);
    var d = _.digest();
    return _.clean(), d;
  }
  i.oneTimeAuth = o;
  function c(l, p) {
    return l.length !== i.DIGEST_LENGTH || p.length !== i.DIGEST_LENGTH
      ? !1
      : e.equal(l, p);
  }
  i.equal = c;
})(Vp);
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Jo,
    t = Vp,
    s = Ir,
    o = Ue,
    c = Ri;
  (i.KEY_LENGTH = 32), (i.NONCE_LENGTH = 12), (i.TAG_LENGTH = 16);
  var l = new Uint8Array(16),
    p = (function () {
      function _(d) {
        if (
          ((this.nonceLength = i.NONCE_LENGTH),
          (this.tagLength = i.TAG_LENGTH),
          d.length !== i.KEY_LENGTH)
        )
          throw new Error("ChaCha20Poly1305 needs 32-byte key");
        this._key = new Uint8Array(d);
      }
      return (
        (_.prototype.seal = function (d, w, A, S) {
          if (d.length > 16)
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          var P = new Uint8Array(16);
          P.set(d, P.length - d.length);
          var M = new Uint8Array(32);
          e.stream(this._key, P, M, 4);
          var K = w.length + this.tagLength,
            B;
          if (S) {
            if (S.length !== K)
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            B = S;
          } else B = new Uint8Array(K);
          return (
            e.streamXOR(this._key, P, w, B, 4),
            this._authenticate(
              B.subarray(B.length - this.tagLength, B.length),
              M,
              B.subarray(0, B.length - this.tagLength),
              A,
            ),
            s.wipe(P),
            B
          );
        }),
        (_.prototype.open = function (d, w, A, S) {
          if (d.length > 16)
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          if (w.length < this.tagLength) return null;
          var P = new Uint8Array(16);
          P.set(d, P.length - d.length);
          var M = new Uint8Array(32);
          e.stream(this._key, P, M, 4);
          var K = new Uint8Array(this.tagLength);
          if (
            (this._authenticate(
              K,
              M,
              w.subarray(0, w.length - this.tagLength),
              A,
            ),
            !c.equal(K, w.subarray(w.length - this.tagLength, w.length)))
          )
            return null;
          var B = w.length - this.tagLength,
            oe;
          if (S) {
            if (S.length !== B)
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            oe = S;
          } else oe = new Uint8Array(B);
          return (
            e.streamXOR(
              this._key,
              P,
              w.subarray(0, w.length - this.tagLength),
              oe,
              4,
            ),
            s.wipe(P),
            oe
          );
        }),
        (_.prototype.clean = function () {
          return s.wipe(this._key), this;
        }),
        (_.prototype._authenticate = function (d, w, A, S) {
          var P = new t.Poly1305(w);
          S &&
            (P.update(S),
            S.length % 16 > 0 && P.update(l.subarray(S.length % 16))),
            P.update(A),
            A.length % 16 > 0 && P.update(l.subarray(A.length % 16));
          var M = new Uint8Array(8);
          S && o.writeUint64LE(S.length, M),
            P.update(M),
            o.writeUint64LE(A.length, M),
            P.update(M);
          for (var K = P.digest(), B = 0; B < K.length; B++) d[B] = K[B];
          P.clean(), s.wipe(K), s.wipe(M);
        }),
        _
      );
    })();
  i.ChaCha20Poly1305 = p;
})(Pu);
var Gp = {},
  Es = {},
  Au = {};
Object.defineProperty(Au, "__esModule", { value: !0 });
function OE(i) {
  return (
    typeof i.saveState < "u" &&
    typeof i.restoreState < "u" &&
    typeof i.cleanSavedState < "u"
  );
}
Au.isSerializableHash = OE;
Object.defineProperty(Es, "__esModule", { value: !0 });
var Qr = Au,
  PE = Ri,
  AE = Ir,
  Wp = (function () {
    function i(e, t) {
      (this._finished = !1),
        (this._inner = new e()),
        (this._outer = new e()),
        (this.blockSize = this._outer.blockSize),
        (this.digestLength = this._outer.digestLength);
      var s = new Uint8Array(this.blockSize);
      t.length > this.blockSize
        ? this._inner.update(t).finish(s).clean()
        : s.set(t);
      for (var o = 0; o < s.length; o++) s[o] ^= 54;
      this._inner.update(s);
      for (var o = 0; o < s.length; o++) s[o] ^= 106;
      this._outer.update(s),
        Qr.isSerializableHash(this._inner) &&
          Qr.isSerializableHash(this._outer) &&
          ((this._innerKeyedState = this._inner.saveState()),
          (this._outerKeyedState = this._outer.saveState())),
        AE.wipe(s);
    }
    return (
      (i.prototype.reset = function () {
        if (
          !Qr.isSerializableHash(this._inner) ||
          !Qr.isSerializableHash(this._outer)
        )
          throw new Error(
            "hmac: can't reset() because hash doesn't implement restoreState()",
          );
        return (
          this._inner.restoreState(this._innerKeyedState),
          this._outer.restoreState(this._outerKeyedState),
          (this._finished = !1),
          this
        );
      }),
      (i.prototype.clean = function () {
        Qr.isSerializableHash(this._inner) &&
          this._inner.cleanSavedState(this._innerKeyedState),
          Qr.isSerializableHash(this._outer) &&
            this._outer.cleanSavedState(this._outerKeyedState),
          this._inner.clean(),
          this._outer.clean();
      }),
      (i.prototype.update = function (e) {
        return this._inner.update(e), this;
      }),
      (i.prototype.finish = function (e) {
        return this._finished
          ? (this._outer.finish(e), this)
          : (this._inner.finish(e),
            this._outer.update(e.subarray(0, this.digestLength)).finish(e),
            (this._finished = !0),
            this);
      }),
      (i.prototype.digest = function () {
        var e = new Uint8Array(this.digestLength);
        return this.finish(e), e;
      }),
      (i.prototype.saveState = function () {
        if (!Qr.isSerializableHash(this._inner))
          throw new Error(
            "hmac: can't saveState() because hash doesn't implement it",
          );
        return this._inner.saveState();
      }),
      (i.prototype.restoreState = function (e) {
        if (
          !Qr.isSerializableHash(this._inner) ||
          !Qr.isSerializableHash(this._outer)
        )
          throw new Error(
            "hmac: can't restoreState() because hash doesn't implement it",
          );
        return (
          this._inner.restoreState(e),
          this._outer.restoreState(this._outerKeyedState),
          (this._finished = !1),
          this
        );
      }),
      (i.prototype.cleanSavedState = function (e) {
        if (!Qr.isSerializableHash(this._inner))
          throw new Error(
            "hmac: can't cleanSavedState() because hash doesn't implement it",
          );
        this._inner.cleanSavedState(e);
      }),
      i
    );
  })();
Es.HMAC = Wp;
function TE(i, e, t) {
  var s = new Wp(i, e);
  s.update(t);
  var o = s.digest();
  return s.clean(), o;
}
Es.hmac = TE;
Es.equal = PE.equal;
Object.defineProperty(Gp, "__esModule", { value: !0 });
var wf = Es,
  Ef = Ir,
  CE = (function () {
    function i(e, t, s, o) {
      s === void 0 && (s = new Uint8Array(0)),
        (this._counter = new Uint8Array(1)),
        (this._hash = e),
        (this._info = o);
      var c = wf.hmac(this._hash, s, t);
      (this._hmac = new wf.HMAC(e, c)),
        (this._buffer = new Uint8Array(this._hmac.digestLength)),
        (this._bufpos = this._buffer.length);
    }
    return (
      (i.prototype._fillBuffer = function () {
        this._counter[0]++;
        var e = this._counter[0];
        if (e === 0) throw new Error("hkdf: cannot expand more");
        this._hmac.reset(),
          e > 1 && this._hmac.update(this._buffer),
          this._info && this._hmac.update(this._info),
          this._hmac.update(this._counter),
          this._hmac.finish(this._buffer),
          (this._bufpos = 0);
      }),
      (i.prototype.expand = function (e) {
        for (var t = new Uint8Array(e), s = 0; s < t.length; s++)
          this._bufpos === this._buffer.length && this._fillBuffer(),
            (t[s] = this._buffer[this._bufpos++]);
        return t;
      }),
      (i.prototype.clean = function () {
        this._hmac.clean(),
          Ef.wipe(this._buffer),
          Ef.wipe(this._counter),
          (this._bufpos = 0);
      }),
      i
    );
  })(),
  RE = (Gp.HKDF = CE),
  Xo = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ue,
    t = Ir;
  (i.DIGEST_LENGTH = 32), (i.BLOCK_SIZE = 64);
  var s = (function () {
    function p() {
      (this.digestLength = i.DIGEST_LENGTH),
        (this.blockSize = i.BLOCK_SIZE),
        (this._state = new Int32Array(8)),
        (this._temp = new Int32Array(64)),
        (this._buffer = new Uint8Array(128)),
        (this._bufferLength = 0),
        (this._bytesHashed = 0),
        (this._finished = !1),
        this.reset();
    }
    return (
      (p.prototype._initState = function () {
        (this._state[0] = 1779033703),
          (this._state[1] = 3144134277),
          (this._state[2] = 1013904242),
          (this._state[3] = 2773480762),
          (this._state[4] = 1359893119),
          (this._state[5] = 2600822924),
          (this._state[6] = 528734635),
          (this._state[7] = 1541459225);
      }),
      (p.prototype.reset = function () {
        return (
          this._initState(),
          (this._bufferLength = 0),
          (this._bytesHashed = 0),
          (this._finished = !1),
          this
        );
      }),
      (p.prototype.clean = function () {
        t.wipe(this._buffer), t.wipe(this._temp), this.reset();
      }),
      (p.prototype.update = function (_, d) {
        if ((d === void 0 && (d = _.length), this._finished))
          throw new Error("SHA256: can't update because hash was finished.");
        var w = 0;
        if (((this._bytesHashed += d), this._bufferLength > 0)) {
          for (; this._bufferLength < this.blockSize && d > 0; )
            (this._buffer[this._bufferLength++] = _[w++]), d--;
          this._bufferLength === this.blockSize &&
            (c(this._temp, this._state, this._buffer, 0, this.blockSize),
            (this._bufferLength = 0));
        }
        for (
          d >= this.blockSize &&
          ((w = c(this._temp, this._state, _, w, d)), (d %= this.blockSize));
          d > 0;

        )
          (this._buffer[this._bufferLength++] = _[w++]), d--;
        return this;
      }),
      (p.prototype.finish = function (_) {
        if (!this._finished) {
          var d = this._bytesHashed,
            w = this._bufferLength,
            A = (d / 536870912) | 0,
            S = d << 3,
            P = d % 64 < 56 ? 64 : 128;
          this._buffer[w] = 128;
          for (var M = w + 1; M < P - 8; M++) this._buffer[M] = 0;
          e.writeUint32BE(A, this._buffer, P - 8),
            e.writeUint32BE(S, this._buffer, P - 4),
            c(this._temp, this._state, this._buffer, 0, P),
            (this._finished = !0);
        }
        for (var M = 0; M < this.digestLength / 4; M++)
          e.writeUint32BE(this._state[M], _, M * 4);
        return this;
      }),
      (p.prototype.digest = function () {
        var _ = new Uint8Array(this.digestLength);
        return this.finish(_), _;
      }),
      (p.prototype.saveState = function () {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          state: new Int32Array(this._state),
          buffer:
            this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed,
        };
      }),
      (p.prototype.restoreState = function (_) {
        return (
          this._state.set(_.state),
          (this._bufferLength = _.bufferLength),
          _.buffer && this._buffer.set(_.buffer),
          (this._bytesHashed = _.bytesHashed),
          (this._finished = !1),
          this
        );
      }),
      (p.prototype.cleanSavedState = function (_) {
        t.wipe(_.state),
          _.buffer && t.wipe(_.buffer),
          (_.bufferLength = 0),
          (_.bytesHashed = 0);
      }),
      p
    );
  })();
  i.SHA256 = s;
  var o = new Int32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]);
  function c(p, _, d, w, A) {
    for (; A >= 64; ) {
      for (
        var S = _[0],
          P = _[1],
          M = _[2],
          K = _[3],
          B = _[4],
          oe = _[5],
          N = _[6],
          F = _[7],
          x = 0;
        x < 16;
        x++
      ) {
        var C = w + x * 4;
        p[x] = e.readUint32BE(d, C);
      }
      for (var x = 16; x < 64; x++) {
        var b = p[x - 2],
          h =
            ((b >>> 17) | (b << (32 - 17))) ^
            ((b >>> 19) | (b << (32 - 19))) ^
            (b >>> 10);
        b = p[x - 15];
        var m =
          ((b >>> 7) | (b << (32 - 7))) ^
          ((b >>> 18) | (b << (32 - 18))) ^
          (b >>> 3);
        p[x] = ((h + p[x - 7]) | 0) + ((m + p[x - 16]) | 0);
      }
      for (var x = 0; x < 64; x++) {
        var h =
            ((((((B >>> 6) | (B << 26)) ^
              ((B >>> 11) | (B << 21)) ^
              ((B >>> 25) | (B << 7))) +
              ((B & oe) ^ (~B & N))) |
              0) +
              ((F + ((o[x] + p[x]) | 0)) | 0)) |
            0,
          m =
            ((((S >>> 2) | (S << (32 - 2))) ^
              ((S >>> 13) | (S << (32 - 13))) ^
              ((S >>> 22) | (S << (32 - 22)))) +
              ((S & P) ^ (S & M) ^ (P & M))) |
            0;
        (F = N),
          (N = oe),
          (oe = B),
          (B = (K + h) | 0),
          (K = M),
          (M = P),
          (P = S),
          (S = (h + m) | 0);
      }
      (_[0] += S),
        (_[1] += P),
        (_[2] += M),
        (_[3] += K),
        (_[4] += B),
        (_[5] += oe),
        (_[6] += N),
        (_[7] += F),
        (w += 64),
        (A -= 64);
    }
    return w;
  }
  function l(p) {
    var _ = new s();
    _.update(p);
    var d = _.digest();
    return _.clean(), d;
  }
  i.hash = l;
})(Xo);
var Tu = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }),
    (i.sharedKey =
      i.generateKeyPair =
      i.generateKeyPairFromSeed =
      i.scalarMultBase =
      i.scalarMult =
      i.SHARED_KEY_LENGTH =
      i.SECRET_KEY_LENGTH =
      i.PUBLIC_KEY_LENGTH =
        void 0);
  const e = Rn,
    t = Ir;
  (i.PUBLIC_KEY_LENGTH = 32),
    (i.SECRET_KEY_LENGTH = 32),
    (i.SHARED_KEY_LENGTH = 32);
  function s(x) {
    const C = new Float64Array(16);
    if (x) for (let b = 0; b < x.length; b++) C[b] = x[b];
    return C;
  }
  const o = new Uint8Array(32);
  o[0] = 9;
  const c = s([56129, 1]);
  function l(x) {
    let C = 1;
    for (let b = 0; b < 16; b++) {
      let h = x[b] + C + 65535;
      (C = Math.floor(h / 65536)), (x[b] = h - C * 65536);
    }
    x[0] += C - 1 + 37 * (C - 1);
  }
  function p(x, C, b) {
    const h = ~(b - 1);
    for (let m = 0; m < 16; m++) {
      const G = h & (x[m] ^ C[m]);
      (x[m] ^= G), (C[m] ^= G);
    }
  }
  function _(x, C) {
    const b = s(),
      h = s();
    for (let m = 0; m < 16; m++) h[m] = C[m];
    l(h), l(h), l(h);
    for (let m = 0; m < 2; m++) {
      b[0] = h[0] - 65517;
      for (let k = 1; k < 15; k++)
        (b[k] = h[k] - 65535 - ((b[k - 1] >> 16) & 1)), (b[k - 1] &= 65535);
      b[15] = h[15] - 32767 - ((b[14] >> 16) & 1);
      const G = (b[15] >> 16) & 1;
      (b[14] &= 65535), p(h, b, 1 - G);
    }
    for (let m = 0; m < 16; m++)
      (x[2 * m] = h[m] & 255), (x[2 * m + 1] = h[m] >> 8);
  }
  function d(x, C) {
    for (let b = 0; b < 16; b++) x[b] = C[2 * b] + (C[2 * b + 1] << 8);
    x[15] &= 32767;
  }
  function w(x, C, b) {
    for (let h = 0; h < 16; h++) x[h] = C[h] + b[h];
  }
  function A(x, C, b) {
    for (let h = 0; h < 16; h++) x[h] = C[h] - b[h];
  }
  function S(x, C, b) {
    let h,
      m,
      G = 0,
      k = 0,
      se = 0,
      ce = 0,
      ge = 0,
      $ = 0,
      z = 0,
      le = 0,
      te = 0,
      W = 0,
      ee = 0,
      Y = 0,
      re = 0,
      Oe = 0,
      ie = 0,
      be = 0,
      he = 0,
      ve = 0,
      q = 0,
      L = 0,
      R = 0,
      f = 0,
      O = 0,
      ne = 0,
      fe = 0,
      Ie = 0,
      He = 0,
      Ve = 0,
      Fe = 0,
      dt = 0,
      gt = 0,
      Me = b[0],
      xe = b[1],
      $e = b[2],
      je = b[3],
      qe = b[4],
      Ae = b[5],
      De = b[6],
      Se = b[7],
      Te = b[8],
      Ke = b[9],
      Pe = b[10],
      ke = b[11],
      We = b[12],
      et = b[13],
      tt = b[14],
      Je = b[15];
    (h = C[0]),
      (G += h * Me),
      (k += h * xe),
      (se += h * $e),
      (ce += h * je),
      (ge += h * qe),
      ($ += h * Ae),
      (z += h * De),
      (le += h * Se),
      (te += h * Te),
      (W += h * Ke),
      (ee += h * Pe),
      (Y += h * ke),
      (re += h * We),
      (Oe += h * et),
      (ie += h * tt),
      (be += h * Je),
      (h = C[1]),
      (k += h * Me),
      (se += h * xe),
      (ce += h * $e),
      (ge += h * je),
      ($ += h * qe),
      (z += h * Ae),
      (le += h * De),
      (te += h * Se),
      (W += h * Te),
      (ee += h * Ke),
      (Y += h * Pe),
      (re += h * ke),
      (Oe += h * We),
      (ie += h * et),
      (be += h * tt),
      (he += h * Je),
      (h = C[2]),
      (se += h * Me),
      (ce += h * xe),
      (ge += h * $e),
      ($ += h * je),
      (z += h * qe),
      (le += h * Ae),
      (te += h * De),
      (W += h * Se),
      (ee += h * Te),
      (Y += h * Ke),
      (re += h * Pe),
      (Oe += h * ke),
      (ie += h * We),
      (be += h * et),
      (he += h * tt),
      (ve += h * Je),
      (h = C[3]),
      (ce += h * Me),
      (ge += h * xe),
      ($ += h * $e),
      (z += h * je),
      (le += h * qe),
      (te += h * Ae),
      (W += h * De),
      (ee += h * Se),
      (Y += h * Te),
      (re += h * Ke),
      (Oe += h * Pe),
      (ie += h * ke),
      (be += h * We),
      (he += h * et),
      (ve += h * tt),
      (q += h * Je),
      (h = C[4]),
      (ge += h * Me),
      ($ += h * xe),
      (z += h * $e),
      (le += h * je),
      (te += h * qe),
      (W += h * Ae),
      (ee += h * De),
      (Y += h * Se),
      (re += h * Te),
      (Oe += h * Ke),
      (ie += h * Pe),
      (be += h * ke),
      (he += h * We),
      (ve += h * et),
      (q += h * tt),
      (L += h * Je),
      (h = C[5]),
      ($ += h * Me),
      (z += h * xe),
      (le += h * $e),
      (te += h * je),
      (W += h * qe),
      (ee += h * Ae),
      (Y += h * De),
      (re += h * Se),
      (Oe += h * Te),
      (ie += h * Ke),
      (be += h * Pe),
      (he += h * ke),
      (ve += h * We),
      (q += h * et),
      (L += h * tt),
      (R += h * Je),
      (h = C[6]),
      (z += h * Me),
      (le += h * xe),
      (te += h * $e),
      (W += h * je),
      (ee += h * qe),
      (Y += h * Ae),
      (re += h * De),
      (Oe += h * Se),
      (ie += h * Te),
      (be += h * Ke),
      (he += h * Pe),
      (ve += h * ke),
      (q += h * We),
      (L += h * et),
      (R += h * tt),
      (f += h * Je),
      (h = C[7]),
      (le += h * Me),
      (te += h * xe),
      (W += h * $e),
      (ee += h * je),
      (Y += h * qe),
      (re += h * Ae),
      (Oe += h * De),
      (ie += h * Se),
      (be += h * Te),
      (he += h * Ke),
      (ve += h * Pe),
      (q += h * ke),
      (L += h * We),
      (R += h * et),
      (f += h * tt),
      (O += h * Je),
      (h = C[8]),
      (te += h * Me),
      (W += h * xe),
      (ee += h * $e),
      (Y += h * je),
      (re += h * qe),
      (Oe += h * Ae),
      (ie += h * De),
      (be += h * Se),
      (he += h * Te),
      (ve += h * Ke),
      (q += h * Pe),
      (L += h * ke),
      (R += h * We),
      (f += h * et),
      (O += h * tt),
      (ne += h * Je),
      (h = C[9]),
      (W += h * Me),
      (ee += h * xe),
      (Y += h * $e),
      (re += h * je),
      (Oe += h * qe),
      (ie += h * Ae),
      (be += h * De),
      (he += h * Se),
      (ve += h * Te),
      (q += h * Ke),
      (L += h * Pe),
      (R += h * ke),
      (f += h * We),
      (O += h * et),
      (ne += h * tt),
      (fe += h * Je),
      (h = C[10]),
      (ee += h * Me),
      (Y += h * xe),
      (re += h * $e),
      (Oe += h * je),
      (ie += h * qe),
      (be += h * Ae),
      (he += h * De),
      (ve += h * Se),
      (q += h * Te),
      (L += h * Ke),
      (R += h * Pe),
      (f += h * ke),
      (O += h * We),
      (ne += h * et),
      (fe += h * tt),
      (Ie += h * Je),
      (h = C[11]),
      (Y += h * Me),
      (re += h * xe),
      (Oe += h * $e),
      (ie += h * je),
      (be += h * qe),
      (he += h * Ae),
      (ve += h * De),
      (q += h * Se),
      (L += h * Te),
      (R += h * Ke),
      (f += h * Pe),
      (O += h * ke),
      (ne += h * We),
      (fe += h * et),
      (Ie += h * tt),
      (He += h * Je),
      (h = C[12]),
      (re += h * Me),
      (Oe += h * xe),
      (ie += h * $e),
      (be += h * je),
      (he += h * qe),
      (ve += h * Ae),
      (q += h * De),
      (L += h * Se),
      (R += h * Te),
      (f += h * Ke),
      (O += h * Pe),
      (ne += h * ke),
      (fe += h * We),
      (Ie += h * et),
      (He += h * tt),
      (Ve += h * Je),
      (h = C[13]),
      (Oe += h * Me),
      (ie += h * xe),
      (be += h * $e),
      (he += h * je),
      (ve += h * qe),
      (q += h * Ae),
      (L += h * De),
      (R += h * Se),
      (f += h * Te),
      (O += h * Ke),
      (ne += h * Pe),
      (fe += h * ke),
      (Ie += h * We),
      (He += h * et),
      (Ve += h * tt),
      (Fe += h * Je),
      (h = C[14]),
      (ie += h * Me),
      (be += h * xe),
      (he += h * $e),
      (ve += h * je),
      (q += h * qe),
      (L += h * Ae),
      (R += h * De),
      (f += h * Se),
      (O += h * Te),
      (ne += h * Ke),
      (fe += h * Pe),
      (Ie += h * ke),
      (He += h * We),
      (Ve += h * et),
      (Fe += h * tt),
      (dt += h * Je),
      (h = C[15]),
      (be += h * Me),
      (he += h * xe),
      (ve += h * $e),
      (q += h * je),
      (L += h * qe),
      (R += h * Ae),
      (f += h * De),
      (O += h * Se),
      (ne += h * Te),
      (fe += h * Ke),
      (Ie += h * Pe),
      (He += h * ke),
      (Ve += h * We),
      (Fe += h * et),
      (dt += h * tt),
      (gt += h * Je),
      (G += 38 * he),
      (k += 38 * ve),
      (se += 38 * q),
      (ce += 38 * L),
      (ge += 38 * R),
      ($ += 38 * f),
      (z += 38 * O),
      (le += 38 * ne),
      (te += 38 * fe),
      (W += 38 * Ie),
      (ee += 38 * He),
      (Y += 38 * Ve),
      (re += 38 * Fe),
      (Oe += 38 * dt),
      (ie += 38 * gt),
      (m = 1),
      (h = G + m + 65535),
      (m = Math.floor(h / 65536)),
      (G = h - m * 65536),
      (h = k + m + 65535),
      (m = Math.floor(h / 65536)),
      (k = h - m * 65536),
      (h = se + m + 65535),
      (m = Math.floor(h / 65536)),
      (se = h - m * 65536),
      (h = ce + m + 65535),
      (m = Math.floor(h / 65536)),
      (ce = h - m * 65536),
      (h = ge + m + 65535),
      (m = Math.floor(h / 65536)),
      (ge = h - m * 65536),
      (h = $ + m + 65535),
      (m = Math.floor(h / 65536)),
      ($ = h - m * 65536),
      (h = z + m + 65535),
      (m = Math.floor(h / 65536)),
      (z = h - m * 65536),
      (h = le + m + 65535),
      (m = Math.floor(h / 65536)),
      (le = h - m * 65536),
      (h = te + m + 65535),
      (m = Math.floor(h / 65536)),
      (te = h - m * 65536),
      (h = W + m + 65535),
      (m = Math.floor(h / 65536)),
      (W = h - m * 65536),
      (h = ee + m + 65535),
      (m = Math.floor(h / 65536)),
      (ee = h - m * 65536),
      (h = Y + m + 65535),
      (m = Math.floor(h / 65536)),
      (Y = h - m * 65536),
      (h = re + m + 65535),
      (m = Math.floor(h / 65536)),
      (re = h - m * 65536),
      (h = Oe + m + 65535),
      (m = Math.floor(h / 65536)),
      (Oe = h - m * 65536),
      (h = ie + m + 65535),
      (m = Math.floor(h / 65536)),
      (ie = h - m * 65536),
      (h = be + m + 65535),
      (m = Math.floor(h / 65536)),
      (be = h - m * 65536),
      (G += m - 1 + 37 * (m - 1)),
      (m = 1),
      (h = G + m + 65535),
      (m = Math.floor(h / 65536)),
      (G = h - m * 65536),
      (h = k + m + 65535),
      (m = Math.floor(h / 65536)),
      (k = h - m * 65536),
      (h = se + m + 65535),
      (m = Math.floor(h / 65536)),
      (se = h - m * 65536),
      (h = ce + m + 65535),
      (m = Math.floor(h / 65536)),
      (ce = h - m * 65536),
      (h = ge + m + 65535),
      (m = Math.floor(h / 65536)),
      (ge = h - m * 65536),
      (h = $ + m + 65535),
      (m = Math.floor(h / 65536)),
      ($ = h - m * 65536),
      (h = z + m + 65535),
      (m = Math.floor(h / 65536)),
      (z = h - m * 65536),
      (h = le + m + 65535),
      (m = Math.floor(h / 65536)),
      (le = h - m * 65536),
      (h = te + m + 65535),
      (m = Math.floor(h / 65536)),
      (te = h - m * 65536),
      (h = W + m + 65535),
      (m = Math.floor(h / 65536)),
      (W = h - m * 65536),
      (h = ee + m + 65535),
      (m = Math.floor(h / 65536)),
      (ee = h - m * 65536),
      (h = Y + m + 65535),
      (m = Math.floor(h / 65536)),
      (Y = h - m * 65536),
      (h = re + m + 65535),
      (m = Math.floor(h / 65536)),
      (re = h - m * 65536),
      (h = Oe + m + 65535),
      (m = Math.floor(h / 65536)),
      (Oe = h - m * 65536),
      (h = ie + m + 65535),
      (m = Math.floor(h / 65536)),
      (ie = h - m * 65536),
      (h = be + m + 65535),
      (m = Math.floor(h / 65536)),
      (be = h - m * 65536),
      (G += m - 1 + 37 * (m - 1)),
      (x[0] = G),
      (x[1] = k),
      (x[2] = se),
      (x[3] = ce),
      (x[4] = ge),
      (x[5] = $),
      (x[6] = z),
      (x[7] = le),
      (x[8] = te),
      (x[9] = W),
      (x[10] = ee),
      (x[11] = Y),
      (x[12] = re),
      (x[13] = Oe),
      (x[14] = ie),
      (x[15] = be);
  }
  function P(x, C) {
    S(x, C, C);
  }
  function M(x, C) {
    const b = s();
    for (let h = 0; h < 16; h++) b[h] = C[h];
    for (let h = 253; h >= 0; h--) P(b, b), h !== 2 && h !== 4 && S(b, b, C);
    for (let h = 0; h < 16; h++) x[h] = b[h];
  }
  function K(x, C) {
    const b = new Uint8Array(32),
      h = new Float64Array(80),
      m = s(),
      G = s(),
      k = s(),
      se = s(),
      ce = s(),
      ge = s();
    for (let te = 0; te < 31; te++) b[te] = x[te];
    (b[31] = (x[31] & 127) | 64), (b[0] &= 248), d(h, C);
    for (let te = 0; te < 16; te++) G[te] = h[te];
    m[0] = se[0] = 1;
    for (let te = 254; te >= 0; --te) {
      const W = (b[te >>> 3] >>> (te & 7)) & 1;
      p(m, G, W),
        p(k, se, W),
        w(ce, m, k),
        A(m, m, k),
        w(k, G, se),
        A(G, G, se),
        P(se, ce),
        P(ge, m),
        S(m, k, m),
        S(k, G, ce),
        w(ce, m, k),
        A(m, m, k),
        P(G, m),
        A(k, se, ge),
        S(m, k, c),
        w(m, m, se),
        S(k, k, m),
        S(m, se, ge),
        S(se, G, h),
        P(G, ce),
        p(m, G, W),
        p(k, se, W);
    }
    for (let te = 0; te < 16; te++)
      (h[te + 16] = m[te]),
        (h[te + 32] = k[te]),
        (h[te + 48] = G[te]),
        (h[te + 64] = se[te]);
    const $ = h.subarray(32),
      z = h.subarray(16);
    M($, $), S(z, z, $);
    const le = new Uint8Array(32);
    return _(le, z), le;
  }
  i.scalarMult = K;
  function B(x) {
    return K(x, o);
  }
  i.scalarMultBase = B;
  function oe(x) {
    if (x.length !== i.SECRET_KEY_LENGTH)
      throw new Error(`x25519: seed must be ${i.SECRET_KEY_LENGTH} bytes`);
    const C = new Uint8Array(x);
    return { publicKey: B(C), secretKey: C };
  }
  i.generateKeyPairFromSeed = oe;
  function N(x) {
    const C = (0, e.randomBytes)(32, x),
      b = oe(C);
    return (0, t.wipe)(C), b;
  }
  i.generateKeyPair = N;
  function F(x, C, b = !1) {
    if (x.length !== i.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect secret key length");
    if (C.length !== i.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect public key length");
    const h = K(x, C);
    if (b) {
      let m = 0;
      for (let G = 0; G < h.length; G++) m |= h[G];
      if (m === 0) throw new Error("X25519: invalid shared key");
    }
    return h;
  }
  i.sharedKey = F;
})(Tu);
var lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.getLocalStorage =
  lt.getLocalStorageOrThrow =
  lt.getCrypto =
  lt.getCryptoOrThrow =
  Jp =
  lt.getLocation =
  lt.getLocationOrThrow =
  Cu =
  lt.getNavigator =
  lt.getNavigatorOrThrow =
  Yp =
  lt.getDocument =
  lt.getDocumentOrThrow =
  lt.getFromWindowOrThrow =
  lt.getFromWindow =
    void 0;
function en(i) {
  let e;
  return typeof window < "u" && typeof window[i] < "u" && (e = window[i]), e;
}
lt.getFromWindow = en;
function Nn(i) {
  const e = en(i);
  if (!e) throw new Error(`${i} is not defined in Window`);
  return e;
}
lt.getFromWindowOrThrow = Nn;
function NE() {
  return Nn("document");
}
lt.getDocumentOrThrow = NE;
function $E() {
  return en("document");
}
var Yp = (lt.getDocument = $E);
function jE() {
  return Nn("navigator");
}
lt.getNavigatorOrThrow = jE;
function DE() {
  return en("navigator");
}
var Cu = (lt.getNavigator = DE);
function UE() {
  return Nn("location");
}
lt.getLocationOrThrow = UE;
function FE() {
  return en("location");
}
var Jp = (lt.getLocation = FE);
function LE() {
  return Nn("crypto");
}
lt.getCryptoOrThrow = LE;
function ME() {
  return en("crypto");
}
lt.getCrypto = ME;
function qE() {
  return Nn("localStorage");
}
lt.getLocalStorageOrThrow = qE;
function zE() {
  return en("localStorage");
}
lt.getLocalStorage = zE;
var Ru = {};
Object.defineProperty(Ru, "__esModule", { value: !0 });
var Xp = (Ru.getWindowMetadata = void 0);
const Sf = lt;
function HE() {
  let i, e;
  try {
    (i = Sf.getDocumentOrThrow()), (e = Sf.getLocationOrThrow());
  } catch {
    return null;
  }
  function t() {
    const A = i.getElementsByTagName("link"),
      S = [];
    for (let P = 0; P < A.length; P++) {
      const M = A[P],
        K = M.getAttribute("rel");
      if (K && K.toLowerCase().indexOf("icon") > -1) {
        const B = M.getAttribute("href");
        if (B)
          if (
            B.toLowerCase().indexOf("https:") === -1 &&
            B.toLowerCase().indexOf("http:") === -1 &&
            B.indexOf("//") !== 0
          ) {
            let oe = e.protocol + "//" + e.host;
            if (B.indexOf("/") === 0) oe += B;
            else {
              const N = e.pathname.split("/");
              N.pop();
              const F = N.join("/");
              oe += F + "/" + B;
            }
            S.push(oe);
          } else if (B.indexOf("//") === 0) {
            const oe = e.protocol + B;
            S.push(oe);
          } else S.push(B);
      }
    }
    return S;
  }
  function s(...A) {
    const S = i.getElementsByTagName("meta");
    for (let P = 0; P < S.length; P++) {
      const M = S[P],
        K = ["itemprop", "property", "name"]
          .map((B) => M.getAttribute(B))
          .filter((B) => (B ? A.includes(B) : !1));
      if (K.length && K) {
        const B = M.getAttribute("content");
        if (B) return B;
      }
    }
    return "";
  }
  function o() {
    let A = s("name", "og:site_name", "og:title", "twitter:title");
    return A || (A = i.title), A;
  }
  function c() {
    return s(
      "description",
      "og:description",
      "twitter:description",
      "keywords",
    );
  }
  const l = o(),
    p = c(),
    _ = e.origin,
    d = t();
  return { description: p, url: _, icons: d, name: l };
}
Xp = Ru.getWindowMetadata = HE;
var ms = {},
  KE = (i) =>
    encodeURIComponent(i).replace(
      /[!'()*]/g,
      (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`,
    ),
  Qp = "%[a-f0-9]{2}",
  If = new RegExp("(" + Qp + ")|([^%]+?)", "gi"),
  xf = new RegExp("(" + Qp + ")+", "gi");
function hu(i, e) {
  try {
    return [decodeURIComponent(i.join(""))];
  } catch {}
  if (i.length === 1) return i;
  e = e || 1;
  var t = i.slice(0, e),
    s = i.slice(e);
  return Array.prototype.concat.call([], hu(t), hu(s));
}
function BE(i) {
  try {
    return decodeURIComponent(i);
  } catch {
    for (var e = i.match(If) || [], t = 1; t < e.length; t++)
      (i = hu(e, t).join("")), (e = i.match(If) || []);
    return i;
  }
}
function VE(i) {
  for (var e = { "%FE%FF": "��", "%FF%FE": "��" }, t = xf.exec(i); t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      var s = BE(t[0]);
      s !== t[0] && (e[t[0]] = s);
    }
    t = xf.exec(i);
  }
  e["%C2"] = "�";
  for (var o = Object.keys(e), c = 0; c < o.length; c++) {
    var l = o[c];
    i = i.replace(new RegExp(l, "g"), e[l]);
  }
  return i;
}
var kE = function (i) {
    if (typeof i != "string")
      throw new TypeError(
        "Expected `encodedURI` to be of type `string`, got `" + typeof i + "`",
      );
    try {
      return (i = i.replace(/\+/g, " ")), decodeURIComponent(i);
    } catch {
      return VE(i);
    }
  },
  GE = (i, e) => {
    if (!(typeof i == "string" && typeof e == "string"))
      throw new TypeError("Expected the arguments to be of type `string`");
    if (e === "") return [i];
    const t = i.indexOf(e);
    return t === -1 ? [i] : [i.slice(0, t), i.slice(t + e.length)];
  },
  WE = function (i, e) {
    for (
      var t = {}, s = Object.keys(i), o = Array.isArray(e), c = 0;
      c < s.length;
      c++
    ) {
      var l = s[c],
        p = i[l];
      (o ? e.indexOf(l) !== -1 : e(l, p, i)) && (t[l] = p);
    }
    return t;
  };
(function (i) {
  const e = KE,
    t = kE,
    s = GE,
    o = WE,
    c = (N) => N == null,
    l = Symbol("encodeFragmentIdentifier");
  function p(N) {
    switch (N.arrayFormat) {
      case "index":
        return (F) => (x, C) => {
          const b = x.length;
          return C === void 0 ||
            (N.skipNull && C === null) ||
            (N.skipEmptyString && C === "")
            ? x
            : C === null
            ? [...x, [w(F, N), "[", b, "]"].join("")]
            : [...x, [w(F, N), "[", w(b, N), "]=", w(C, N)].join("")];
        };
      case "bracket":
        return (F) => (x, C) =>
          C === void 0 ||
          (N.skipNull && C === null) ||
          (N.skipEmptyString && C === "")
            ? x
            : C === null
            ? [...x, [w(F, N), "[]"].join("")]
            : [...x, [w(F, N), "[]=", w(C, N)].join("")];
      case "colon-list-separator":
        return (F) => (x, C) =>
          C === void 0 ||
          (N.skipNull && C === null) ||
          (N.skipEmptyString && C === "")
            ? x
            : C === null
            ? [...x, [w(F, N), ":list="].join("")]
            : [...x, [w(F, N), ":list=", w(C, N)].join("")];
      case "comma":
      case "separator":
      case "bracket-separator": {
        const F = N.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (x) => (C, b) =>
          b === void 0 ||
          (N.skipNull && b === null) ||
          (N.skipEmptyString && b === "")
            ? C
            : ((b = b === null ? "" : b),
              C.length === 0
                ? [[w(x, N), F, w(b, N)].join("")]
                : [[C, w(b, N)].join(N.arrayFormatSeparator)]);
      }
      default:
        return (F) => (x, C) =>
          C === void 0 ||
          (N.skipNull && C === null) ||
          (N.skipEmptyString && C === "")
            ? x
            : C === null
            ? [...x, w(F, N)]
            : [...x, [w(F, N), "=", w(C, N)].join("")];
    }
  }
  function _(N) {
    let F;
    switch (N.arrayFormat) {
      case "index":
        return (x, C, b) => {
          if (
            ((F = /\[(\d*)\]$/.exec(x)), (x = x.replace(/\[\d*\]$/, "")), !F)
          ) {
            b[x] = C;
            return;
          }
          b[x] === void 0 && (b[x] = {}), (b[x][F[1]] = C);
        };
      case "bracket":
        return (x, C, b) => {
          if (((F = /(\[\])$/.exec(x)), (x = x.replace(/\[\]$/, "")), !F)) {
            b[x] = C;
            return;
          }
          if (b[x] === void 0) {
            b[x] = [C];
            return;
          }
          b[x] = [].concat(b[x], C);
        };
      case "colon-list-separator":
        return (x, C, b) => {
          if (((F = /(:list)$/.exec(x)), (x = x.replace(/:list$/, "")), !F)) {
            b[x] = C;
            return;
          }
          if (b[x] === void 0) {
            b[x] = [C];
            return;
          }
          b[x] = [].concat(b[x], C);
        };
      case "comma":
      case "separator":
        return (x, C, b) => {
          const h = typeof C == "string" && C.includes(N.arrayFormatSeparator),
            m =
              typeof C == "string" &&
              !h &&
              A(C, N).includes(N.arrayFormatSeparator);
          C = m ? A(C, N) : C;
          const G =
            h || m
              ? C.split(N.arrayFormatSeparator).map((k) => A(k, N))
              : C === null
              ? C
              : A(C, N);
          b[x] = G;
        };
      case "bracket-separator":
        return (x, C, b) => {
          const h = /(\[\])$/.test(x);
          if (((x = x.replace(/\[\]$/, "")), !h)) {
            b[x] = C && A(C, N);
            return;
          }
          const m =
            C === null
              ? []
              : C.split(N.arrayFormatSeparator).map((G) => A(G, N));
          if (b[x] === void 0) {
            b[x] = m;
            return;
          }
          b[x] = [].concat(b[x], m);
        };
      default:
        return (x, C, b) => {
          if (b[x] === void 0) {
            b[x] = C;
            return;
          }
          b[x] = [].concat(b[x], C);
        };
    }
  }
  function d(N) {
    if (typeof N != "string" || N.length !== 1)
      throw new TypeError(
        "arrayFormatSeparator must be single character string",
      );
  }
  function w(N, F) {
    return F.encode ? (F.strict ? e(N) : encodeURIComponent(N)) : N;
  }
  function A(N, F) {
    return F.decode ? t(N) : N;
  }
  function S(N) {
    return Array.isArray(N)
      ? N.sort()
      : typeof N == "object"
      ? S(Object.keys(N))
          .sort((F, x) => Number(F) - Number(x))
          .map((F) => N[F])
      : N;
  }
  function P(N) {
    const F = N.indexOf("#");
    return F !== -1 && (N = N.slice(0, F)), N;
  }
  function M(N) {
    let F = "";
    const x = N.indexOf("#");
    return x !== -1 && (F = N.slice(x)), F;
  }
  function K(N) {
    N = P(N);
    const F = N.indexOf("?");
    return F === -1 ? "" : N.slice(F + 1);
  }
  function B(N, F) {
    return (
      F.parseNumbers &&
      !Number.isNaN(Number(N)) &&
      typeof N == "string" &&
      N.trim() !== ""
        ? (N = Number(N))
        : F.parseBooleans &&
          N !== null &&
          (N.toLowerCase() === "true" || N.toLowerCase() === "false") &&
          (N = N.toLowerCase() === "true"),
      N
    );
  }
  function oe(N, F) {
    (F = Object.assign(
      {
        decode: !0,
        sort: !0,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: !1,
        parseBooleans: !1,
      },
      F,
    )),
      d(F.arrayFormatSeparator);
    const x = _(F),
      C = Object.create(null);
    if (typeof N != "string" || ((N = N.trim().replace(/^[?#&]/, "")), !N))
      return C;
    for (const b of N.split("&")) {
      if (b === "") continue;
      let [h, m] = s(F.decode ? b.replace(/\+/g, " ") : b, "=");
      (m =
        m === void 0
          ? null
          : ["comma", "separator", "bracket-separator"].includes(F.arrayFormat)
          ? m
          : A(m, F)),
        x(A(h, F), m, C);
    }
    for (const b of Object.keys(C)) {
      const h = C[b];
      if (typeof h == "object" && h !== null)
        for (const m of Object.keys(h)) h[m] = B(h[m], F);
      else C[b] = B(h, F);
    }
    return F.sort === !1
      ? C
      : (F.sort === !0
          ? Object.keys(C).sort()
          : Object.keys(C).sort(F.sort)
        ).reduce((b, h) => {
          const m = C[h];
          return (
            m && typeof m == "object" && !Array.isArray(m)
              ? (b[h] = S(m))
              : (b[h] = m),
            b
          );
        }, Object.create(null));
  }
  (i.extract = K),
    (i.parse = oe),
    (i.stringify = (N, F) => {
      if (!N) return "";
      (F = Object.assign(
        {
          encode: !0,
          strict: !0,
          arrayFormat: "none",
          arrayFormatSeparator: ",",
        },
        F,
      )),
        d(F.arrayFormatSeparator);
      const x = (m) =>
          (F.skipNull && c(N[m])) || (F.skipEmptyString && N[m] === ""),
        C = p(F),
        b = {};
      for (const m of Object.keys(N)) x(m) || (b[m] = N[m]);
      const h = Object.keys(b);
      return (
        F.sort !== !1 && h.sort(F.sort),
        h
          .map((m) => {
            const G = N[m];
            return G === void 0
              ? ""
              : G === null
              ? w(m, F)
              : Array.isArray(G)
              ? G.length === 0 && F.arrayFormat === "bracket-separator"
                ? w(m, F) + "[]"
                : G.reduce(C(m), []).join("&")
              : w(m, F) + "=" + w(G, F);
          })
          .filter((m) => m.length > 0)
          .join("&")
      );
    }),
    (i.parseUrl = (N, F) => {
      F = Object.assign({ decode: !0 }, F);
      const [x, C] = s(N, "#");
      return Object.assign(
        { url: x.split("?")[0] || "", query: oe(K(N), F) },
        F && F.parseFragmentIdentifier && C
          ? { fragmentIdentifier: A(C, F) }
          : {},
      );
    }),
    (i.stringifyUrl = (N, F) => {
      F = Object.assign({ encode: !0, strict: !0, [l]: !0 }, F);
      const x = P(N.url).split("?")[0] || "",
        C = i.extract(N.url),
        b = i.parse(C, { sort: !1 }),
        h = Object.assign(b, N.query);
      let m = i.stringify(h, F);
      m && (m = `?${m}`);
      let G = M(N.url);
      return (
        N.fragmentIdentifier &&
          (G = `#${F[l] ? w(N.fragmentIdentifier, F) : N.fragmentIdentifier}`),
        `${x}${m}${G}`
      );
    }),
    (i.pick = (N, F, x) => {
      x = Object.assign({ parseFragmentIdentifier: !0, [l]: !1 }, x);
      const { url: C, query: b, fragmentIdentifier: h } = i.parseUrl(N, x);
      return i.stringifyUrl(
        { url: C, query: o(b, F), fragmentIdentifier: h },
        x,
      );
    }),
    (i.exclude = (N, F, x) => {
      const C = Array.isArray(F) ? (b) => !F.includes(b) : (b, h) => !F(b, h);
      return i.pick(N, C, x);
    });
})(ms);
const YE = {
  waku: {
    publish: "waku_publish",
    batchPublish: "waku_batchPublish",
    subscribe: "waku_subscribe",
    batchSubscribe: "waku_batchSubscribe",
    subscription: "waku_subscription",
    unsubscribe: "waku_unsubscribe",
    batchUnsubscribe: "waku_batchUnsubscribe",
  },
  irn: {
    publish: "irn_publish",
    batchPublish: "irn_batchPublish",
    subscribe: "irn_subscribe",
    batchSubscribe: "irn_batchSubscribe",
    subscription: "irn_subscription",
    unsubscribe: "irn_unsubscribe",
    batchUnsubscribe: "irn_batchUnsubscribe",
  },
  iridium: {
    publish: "iridium_publish",
    batchPublish: "iridium_batchPublish",
    subscribe: "iridium_subscribe",
    batchSubscribe: "iridium_batchSubscribe",
    subscription: "iridium_subscription",
    unsubscribe: "iridium_unsubscribe",
    batchUnsubscribe: "iridium_batchUnsubscribe",
  },
};
function JE(i, e = []) {
  const t = [];
  return (
    Object.keys(i).forEach((s) => {
      if (e.length && !e.includes(s)) return;
      const o = i[s];
      t.push(...o.accounts);
    }),
    t
  );
}
function Zp(i, e) {
  return i.includes(":") ? [i] : e.chains || [];
}
const ed = "base10",
  ar = "base16",
  lu = "base64pad",
  Nu = "utf8",
  td = 0,
  tn = 1,
  XE = 0,
  Of = 1,
  fu = 12,
  $u = 32;
function QE() {
  const i = Tu.generateKeyPair();
  return { privateKey: cr(i.secretKey, ar), publicKey: cr(i.publicKey, ar) };
}
function pu() {
  const i = Rn.randomBytes($u);
  return cr(i, ar);
}
function ZE(i, e) {
  const t = Tu.sharedKey(_r(i, ar), _r(e, ar)),
    s = new RE(Xo.SHA256, t).expand($u);
  return cr(s, ar);
}
function e6(i) {
  const e = Xo.hash(_r(i, ar));
  return cr(e, ar);
}
function Pn(i) {
  const e = Xo.hash(_r(i, Nu));
  return cr(e, ar);
}
function t6(i) {
  return _r(`${i}`, ed);
}
function Ss(i) {
  return Number(cr(i, ed));
}
function r6(i) {
  const e = t6(typeof i.type < "u" ? i.type : td);
  if (Ss(e) === tn && typeof i.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const t = typeof i.senderPublicKey < "u" ? _r(i.senderPublicKey, ar) : void 0,
    s = typeof i.iv < "u" ? _r(i.iv, ar) : Rn.randomBytes(fu),
    o = new Pu.ChaCha20Poly1305(_r(i.symKey, ar)).seal(s, _r(i.message, Nu));
  return n6({ type: e, sealed: o, iv: s, senderPublicKey: t });
}
function i6(i) {
  const e = new Pu.ChaCha20Poly1305(_r(i.symKey, ar)),
    { sealed: t, iv: s } = Mo(i.encoded),
    o = e.open(s, t);
  if (o === null) throw new Error("Failed to decrypt");
  return cr(o, Nu);
}
function n6(i) {
  if (Ss(i.type) === tn) {
    if (typeof i.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return cr(kc([i.type, i.senderPublicKey, i.iv, i.sealed]), lu);
  }
  return cr(kc([i.type, i.iv, i.sealed]), lu);
}
function Mo(i) {
  const e = _r(i, lu),
    t = e.slice(XE, Of),
    s = Of;
  if (Ss(t) === tn) {
    const p = s + $u,
      _ = p + fu,
      d = e.slice(s, p),
      w = e.slice(p, _),
      A = e.slice(_);
    return { type: t, sealed: A, iv: w, senderPublicKey: d };
  }
  const o = s + fu,
    c = e.slice(s, o),
    l = e.slice(o);
  return { type: t, sealed: l, iv: c };
}
function s6(i, e) {
  const t = Mo(i);
  return rd({
    type: Ss(t.type),
    senderPublicKey:
      typeof t.senderPublicKey < "u" ? cr(t.senderPublicKey, ar) : void 0,
    receiverPublicKey: e == null ? void 0 : e.receiverPublicKey,
  });
}
function rd(i) {
  const e = (i == null ? void 0 : i.type) || td;
  if (e === tn) {
    if (typeof (i == null ? void 0 : i.senderPublicKey) > "u")
      throw new Error("missing sender public key");
    if (typeof (i == null ? void 0 : i.receiverPublicKey) > "u")
      throw new Error("missing receiver public key");
  }
  return {
    type: e,
    senderPublicKey: i == null ? void 0 : i.senderPublicKey,
    receiverPublicKey: i == null ? void 0 : i.receiverPublicKey,
  };
}
function Pf(i) {
  return (
    i.type === tn &&
    typeof i.senderPublicKey == "string" &&
    typeof i.receiverPublicKey == "string"
  );
}
var o6 = Object.defineProperty,
  Af = Object.getOwnPropertySymbols,
  a6 = Object.prototype.hasOwnProperty,
  c6 = Object.prototype.propertyIsEnumerable,
  Tf = (i, e, t) =>
    e in i
      ? o6(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  Cf = (i, e) => {
    for (var t in e || (e = {})) a6.call(e, t) && Tf(i, t, e[t]);
    if (Af) for (var t of Af(e)) c6.call(e, t) && Tf(i, t, e[t]);
    return i;
  };
const u6 = "ReactNative",
  Ti = {
    reactNative: "react-native",
    node: "node",
    browser: "browser",
    unknown: "unknown",
  },
  h6 = "js";
function ju() {
  return (
    typeof process < "u" &&
    typeof process.versions < "u" &&
    typeof process.versions.node < "u"
  );
}
function id() {
  return !Yp() && !!Cu() && navigator.product === u6;
}
function Du() {
  return !ju() && !!Cu();
}
function Uu() {
  return id()
    ? Ti.reactNative
    : ju()
    ? Ti.node
    : Du()
    ? Ti.browser
    : Ti.unknown;
}
function l6(i, e) {
  let t = ms.parse(i);
  return (t = Cf(Cf({}, t), e)), (i = ms.stringify(t)), i;
}
function f6() {
  return Xp() || { name: "", description: "", url: "", icons: [""] };
}
function p6() {
  if (
    Uu() === Ti.reactNative &&
    typeof global < "u" &&
    typeof (global == null ? void 0 : global.Platform) < "u"
  ) {
    const { OS: t, Version: s } = global.Platform;
    return [t, s].join("-");
  }
  const i = bm();
  if (i === null) return "unknown";
  const e = i.os ? i.os.replace(" ", "").toLowerCase() : "unknown";
  return i.type === "browser"
    ? [e, i.name, i.version].join("-")
    : [e, i.version].join("-");
}
function d6() {
  var i;
  const e = Uu();
  return e === Ti.browser
    ? [e, ((i = Jp()) == null ? void 0 : i.host) || "unknown"].join(":")
    : e;
}
function g6(i, e, t) {
  const s = p6(),
    o = d6();
  return [[i, e].join("-"), [h6, t].join("-"), s, o].join("/");
}
function _6({
  protocol: i,
  version: e,
  relayUrl: t,
  sdkVersion: s,
  auth: o,
  projectId: c,
  useOnCloseEvent: l,
}) {
  const p = t.split("?"),
    _ = g6(i, e, s),
    d = { auth: o, ua: _, projectId: c, useOnCloseEvent: l || void 0 },
    w = l6(p[1] || "", d);
  return p[0] + "?" + w;
}
function Qi(i, e) {
  return i.filter((t) => e.includes(t)).length === i.length;
}
function nd(i) {
  return Object.fromEntries(i.entries());
}
function sd(i) {
  return new Map(Object.entries(i));
}
function On(i = _e.FIVE_MINUTES, e) {
  const t = _e.toMiliseconds(i || _e.FIVE_MINUTES);
  let s, o, c;
  return {
    resolve: (l) => {
      c && s && (clearTimeout(c), s(l));
    },
    reject: (l) => {
      c && o && (clearTimeout(c), o(l));
    },
    done: () =>
      new Promise((l, p) => {
        (c = setTimeout(() => {
          p(new Error(e));
        }, t)),
          (s = l),
          (o = p);
      }),
  };
}
function qo(i, e, t) {
  return new Promise(async (s, o) => {
    const c = setTimeout(() => o(new Error(t)), e);
    try {
      const l = await i;
      s(l);
    } catch (l) {
      o(l);
    }
    clearTimeout(c);
  });
}
function od(i, e) {
  if (typeof e == "string" && e.startsWith(`${i}:`)) return e;
  if (i.toLowerCase() === "topic") {
    if (typeof e != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (i.toLowerCase() === "id") {
    if (typeof e != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${i}`);
}
function y6(i) {
  return od("topic", i);
}
function v6(i) {
  return od("id", i);
}
function ad(i) {
  const [e, t] = i.split(":"),
    s = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof t == "string") s.topic = t;
  else if (e === "id" && Number.isInteger(Number(t))) s.id = Number(t);
  else
    throw new Error(
      `Invalid target, expected id:number or topic:string, got ${e}:${t}`,
    );
  return s;
}
function Br(i, e) {
  return _e.fromMiliseconds((e || Date.now()) + _e.toMiliseconds(i));
}
function Ai(i) {
  return Date.now() >= _e.toMiliseconds(i);
}
function Ht(i, e) {
  return `${i}${e ? `:${e}` : ""}`;
}
function Uc(i = [], e = []) {
  return [...new Set([...i, ...e])];
}
async function m6({ id: i, topic: e, wcDeepLink: t }) {
  try {
    if (!t) return;
    const s = typeof t == "string" ? JSON.parse(t) : t;
    let o = s == null ? void 0 : s.href;
    if (typeof o != "string") return;
    o.endsWith("/") && (o = o.slice(0, -1));
    const c = `${o}/wc?requestId=${i}&sessionTopic=${e}`,
      l = Uu();
    l === Ti.browser
      ? c.startsWith("https://")
        ? window.open(c, "_blank", "noreferrer noopener")
        : window.open(c, "_self", "noreferrer noopener")
      : l === Ti.reactNative &&
        typeof (global == null ? void 0 : global.Linking) < "u" &&
        (await global.Linking.openURL(c));
  } catch (s) {
    console.error(s);
  }
}
const b6 = "irn";
function du(i) {
  return (i == null ? void 0 : i.relay) || { protocol: b6 };
}
function $o(i) {
  const e = YE[i];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${i}`);
  return e;
}
var w6 = Object.defineProperty,
  Rf = Object.getOwnPropertySymbols,
  E6 = Object.prototype.hasOwnProperty,
  S6 = Object.prototype.propertyIsEnumerable,
  Nf = (i, e, t) =>
    e in i
      ? w6(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  I6 = (i, e) => {
    for (var t in e || (e = {})) E6.call(e, t) && Nf(i, t, e[t]);
    if (Rf) for (var t of Rf(e)) S6.call(e, t) && Nf(i, t, e[t]);
    return i;
  };
function x6(i, e = "-") {
  const t = {},
    s = "relay" + e;
  return (
    Object.keys(i).forEach((o) => {
      if (o.startsWith(s)) {
        const c = o.replace(s, ""),
          l = i[o];
        t[c] = l;
      }
    }),
    t
  );
}
function O6(i) {
  const e = i.indexOf(":"),
    t = i.indexOf("?") !== -1 ? i.indexOf("?") : void 0,
    s = i.substring(0, e),
    o = i.substring(e + 1, t).split("@"),
    c = typeof t < "u" ? i.substring(t) : "",
    l = ms.parse(c);
  return {
    protocol: s,
    topic: P6(o[0]),
    version: parseInt(o[1], 10),
    symKey: l.symKey,
    relay: x6(l),
  };
}
function P6(i) {
  return i.startsWith("//") ? i.substring(2) : i;
}
function A6(i, e = "-") {
  const t = "relay",
    s = {};
  return (
    Object.keys(i).forEach((o) => {
      const c = t + e + o;
      i[o] && (s[c] = i[o]);
    }),
    s
  );
}
function T6(i) {
  return (
    `${i.protocol}:${i.topic}@${i.version}?` +
    ms.stringify(I6({ symKey: i.symKey }, A6(i.relay)))
  );
}
function $n(i) {
  const e = [];
  return (
    i.forEach((t) => {
      const [s, o] = t.split(":");
      e.push(`${s}:${o}`);
    }),
    e
  );
}
function C6(i) {
  const e = [];
  return (
    Object.values(i).forEach((t) => {
      e.push(...$n(t.accounts));
    }),
    e
  );
}
function R6(i, e) {
  const t = [];
  return (
    Object.values(i).forEach((s) => {
      $n(s.accounts).includes(e) && t.push(...s.methods);
    }),
    t
  );
}
function N6(i, e) {
  const t = [];
  return (
    Object.values(i).forEach((s) => {
      $n(s.accounts).includes(e) && t.push(...s.events);
    }),
    t
  );
}
function $6(i, e) {
  const t = Do(i, e);
  if (t) throw new Error(t.message);
  const s = {};
  for (const [o, c] of Object.entries(i))
    s[o] = {
      methods: c.methods,
      events: c.events,
      chains: c.accounts.map((l) => `${l.split(":")[0]}:${l.split(":")[1]}`),
    };
  return s;
}
function Fu(i) {
  return i.includes(":");
}
function jo(i) {
  return Fu(i) ? i.split(":")[0] : i;
}
const j6 = {
    INVALID_METHOD: { message: "Invalid method.", code: 1001 },
    INVALID_EVENT: { message: "Invalid event.", code: 1002 },
    INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 },
    INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 },
    INVALID_SESSION_SETTLE_REQUEST: {
      message: "Invalid session settle request.",
      code: 1005,
    },
    UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 },
    UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 },
    UNAUTHORIZED_UPDATE_REQUEST: {
      message: "Unauthorized update request.",
      code: 3003,
    },
    UNAUTHORIZED_EXTEND_REQUEST: {
      message: "Unauthorized extend request.",
      code: 3004,
    },
    USER_REJECTED: { message: "User rejected.", code: 5e3 },
    USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 },
    USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 },
    USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 },
    UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 },
    UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 },
    UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 },
    UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 },
    UNSUPPORTED_NAMESPACE_KEY: {
      message: "Unsupported namespace key.",
      code: 5104,
    },
    USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 },
    SESSION_SETTLEMENT_FAILED: {
      message: "Session settlement failed.",
      code: 7e3,
    },
    WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 },
  },
  D6 = {
    NOT_INITIALIZED: { message: "Not initialized.", code: 1 },
    NO_MATCHING_KEY: { message: "No matching key.", code: 2 },
    RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 },
    RESUBSCRIBED: { message: "Resubscribed.", code: 4 },
    MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 },
    EXPIRED: { message: "Expired.", code: 6 },
    UNKNOWN_TYPE: { message: "Unknown type.", code: 7 },
    MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 },
    NON_CONFORMING_NAMESPACES: {
      message: "Non conforming namespaces.",
      code: 9,
    },
  };
function ue(i, e) {
  const { message: t, code: s } = D6[i];
  return { message: e ? `${t} ${e}` : t, code: s };
}
function $t(i, e) {
  const { message: t, code: s } = j6[i];
  return { message: e ? `${t} ${e}` : t, code: s };
}
function ti(i, e) {
  return Array.isArray(i) ? (typeof e < "u" && i.length ? i.every(e) : !0) : !1;
}
function An(i) {
  return Object.getPrototypeOf(i) === Object.prototype && Object.keys(i).length;
}
function or(i) {
  return typeof i > "u";
}
function Gt(i, e) {
  return e && or(i) ? !0 : typeof i == "string" && !!i.trim().length;
}
function Lu(i, e) {
  return e && or(i) ? !0 : typeof i == "number" && !isNaN(i);
}
function U6(i, e) {
  const { requiredNamespaces: t } = e,
    s = Object.keys(i.namespaces),
    o = Object.keys(t);
  let c = !0;
  return Qi(o, s)
    ? (s.forEach((l) => {
        const { accounts: p, methods: _, events: d } = i.namespaces[l],
          w = $n(p),
          A = t[l];
        (!Qi(Zp(l, A), w) || !Qi(A.methods, _) || !Qi(A.events, d)) && (c = !1);
      }),
      c)
    : !1;
}
function zo(i) {
  return Gt(i, !1) && i.includes(":") ? i.split(":").length === 2 : !1;
}
function F6(i) {
  if (Gt(i, !1) && i.includes(":")) {
    const e = i.split(":");
    if (e.length === 3) {
      const t = e[0] + ":" + e[1];
      return !!e[2] && zo(t);
    }
  }
  return !1;
}
function L6(i) {
  if (Gt(i, !1))
    try {
      return typeof new URL(i) < "u";
    } catch {
      return !1;
    }
  return !1;
}
function M6(i) {
  var e;
  return (e = i == null ? void 0 : i.proposer) == null ? void 0 : e.publicKey;
}
function q6(i) {
  return i == null ? void 0 : i.topic;
}
function z6(i, e) {
  let t = null;
  return (
    Gt(i == null ? void 0 : i.publicKey, !1) ||
      (t = ue(
        "MISSING_OR_INVALID",
        `${e} controller public key should be a string`,
      )),
    t
  );
}
function $f(i) {
  let e = !0;
  return ti(i) ? i.length && (e = i.every((t) => Gt(t, !1))) : (e = !1), e;
}
function H6(i, e, t) {
  let s = null;
  return (
    ti(e) && e.length
      ? e.forEach((o) => {
          s ||
            zo(o) ||
            (s = $t(
              "UNSUPPORTED_CHAINS",
              `${t}, chain ${o} should be a string and conform to "namespace:chainId" format`,
            ));
        })
      : zo(i) ||
        (s = $t(
          "UNSUPPORTED_CHAINS",
          `${t}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`,
        )),
    s
  );
}
function K6(i, e, t) {
  let s = null;
  return (
    Object.entries(i).forEach(([o, c]) => {
      if (s) return;
      const l = H6(o, Zp(o, c), `${e} ${t}`);
      l && (s = l);
    }),
    s
  );
}
function B6(i, e) {
  let t = null;
  return (
    ti(i)
      ? i.forEach((s) => {
          t ||
            F6(s) ||
            (t = $t(
              "UNSUPPORTED_ACCOUNTS",
              `${e}, account ${s} should be a string and conform to "namespace:chainId:address" format`,
            ));
        })
      : (t = $t(
          "UNSUPPORTED_ACCOUNTS",
          `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`,
        )),
    t
  );
}
function V6(i, e) {
  let t = null;
  return (
    Object.values(i).forEach((s) => {
      if (t) return;
      const o = B6(s == null ? void 0 : s.accounts, `${e} namespace`);
      o && (t = o);
    }),
    t
  );
}
function k6(i, e) {
  let t = null;
  return (
    $f(i == null ? void 0 : i.methods)
      ? $f(i == null ? void 0 : i.events) ||
        (t = $t(
          "UNSUPPORTED_EVENTS",
          `${e}, events should be an array of strings or empty array for no events`,
        ))
      : (t = $t(
          "UNSUPPORTED_METHODS",
          `${e}, methods should be an array of strings or empty array for no methods`,
        )),
    t
  );
}
function cd(i, e) {
  let t = null;
  return (
    Object.values(i).forEach((s) => {
      if (t) return;
      const o = k6(s, `${e}, namespace`);
      o && (t = o);
    }),
    t
  );
}
function G6(i, e, t) {
  let s = null;
  if (i && An(i)) {
    const o = cd(i, e);
    o && (s = o);
    const c = K6(i, e, t);
    c && (s = c);
  } else
    s = ue("MISSING_OR_INVALID", `${e}, ${t} should be an object with data`);
  return s;
}
function Do(i, e) {
  let t = null;
  if (i && An(i)) {
    const s = cd(i, e);
    s && (t = s);
    const o = V6(i, e);
    o && (t = o);
  } else
    t = ue(
      "MISSING_OR_INVALID",
      `${e}, namespaces should be an object with data`,
    );
  return t;
}
function ud(i) {
  return Gt(i.protocol, !0);
}
function W6(i, e) {
  let t = !1;
  return (
    e && !i
      ? (t = !0)
      : i &&
        ti(i) &&
        i.length &&
        i.forEach((s) => {
          t = ud(s);
        }),
    t
  );
}
function Y6(i) {
  return typeof i == "number";
}
function gr(i) {
  return typeof i < "u" && typeof i !== null;
}
function J6(i) {
  return !(
    !i ||
    typeof i != "object" ||
    !i.code ||
    !Lu(i.code, !1) ||
    !i.message ||
    !Gt(i.message, !1)
  );
}
function X6(i) {
  return !(or(i) || !Gt(i.method, !1));
}
function Q6(i) {
  return !(
    or(i) ||
    (or(i.result) && or(i.error)) ||
    !Lu(i.id, !1) ||
    !Gt(i.jsonrpc, !1)
  );
}
function Z6(i) {
  return !(or(i) || !Gt(i.name, !1));
}
function jf(i, e) {
  return !(!zo(e) || !C6(i).includes(e));
}
function eS(i, e, t) {
  return Gt(t, !1) ? R6(i, e).includes(t) : !1;
}
function tS(i, e, t) {
  return Gt(t, !1) ? N6(i, e).includes(t) : !1;
}
function Df(i, e, t) {
  let s = null;
  const o = rS(i),
    c = iS(e),
    l = Object.keys(o),
    p = Object.keys(c),
    _ = Uf(Object.keys(i)),
    d = Uf(Object.keys(e)),
    w = _.filter((A) => !d.includes(A));
  return (
    w.length &&
      (s = ue(
        "NON_CONFORMING_NAMESPACES",
        `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${w.toString()}
      Received: ${Object.keys(e).toString()}`,
      )),
    Qi(l, p) ||
      (s = ue(
        "NON_CONFORMING_NAMESPACES",
        `${t} namespaces chains don't satisfy required namespaces.
      Required: ${l.toString()}
      Approved: ${p.toString()}`,
      )),
    Object.keys(e).forEach((A) => {
      if (!A.includes(":") || s) return;
      const S = $n(e[A].accounts);
      S.includes(A) ||
        (s = ue(
          "NON_CONFORMING_NAMESPACES",
          `${t} namespaces accounts don't satisfy namespace accounts for ${A}
        Required: ${A}
        Approved: ${S.toString()}`,
        ));
    }),
    l.forEach((A) => {
      s ||
        (Qi(o[A].methods, c[A].methods)
          ? Qi(o[A].events, c[A].events) ||
            (s = ue(
              "NON_CONFORMING_NAMESPACES",
              `${t} namespaces events don't satisfy namespace events for ${A}`,
            ))
          : (s = ue(
              "NON_CONFORMING_NAMESPACES",
              `${t} namespaces methods don't satisfy namespace methods for ${A}`,
            )));
    }),
    s
  );
}
function rS(i) {
  const e = {};
  return (
    Object.keys(i).forEach((t) => {
      var s;
      t.includes(":")
        ? (e[t] = i[t])
        : (s = i[t].chains) == null ||
          s.forEach((o) => {
            e[o] = { methods: i[t].methods, events: i[t].events };
          });
    }),
    e
  );
}
function Uf(i) {
  return [...new Set(i.map((e) => (e.includes(":") ? e.split(":")[0] : e)))];
}
function iS(i) {
  const e = {};
  return (
    Object.keys(i).forEach((t) => {
      if (t.includes(":")) e[t] = i[t];
      else {
        const s = $n(i[t].accounts);
        s == null ||
          s.forEach((o) => {
            e[o] = {
              accounts: i[t].accounts.filter((c) => c.includes(`${o}:`)),
              methods: i[t].methods,
              events: i[t].events,
            };
          });
      }
    }),
    e
  );
}
function nS(i, e) {
  return Lu(i, !1) && i <= e.max && i >= e.min;
}
const sS = "PARSE_ERROR",
  oS = "INVALID_REQUEST",
  aS = "METHOD_NOT_FOUND",
  cS = "INVALID_PARAMS",
  hd = "INTERNAL_ERROR",
  Mu = "SERVER_ERROR",
  uS = [-32700, -32600, -32601, -32602, -32603],
  ps = {
    [sS]: { code: -32700, message: "Parse error" },
    [oS]: { code: -32600, message: "Invalid Request" },
    [aS]: { code: -32601, message: "Method not found" },
    [cS]: { code: -32602, message: "Invalid params" },
    [hd]: { code: -32603, message: "Internal error" },
    [Mu]: { code: -32e3, message: "Server error" },
  },
  ld = Mu;
function hS(i) {
  return uS.includes(i);
}
function Ff(i) {
  return Object.keys(ps).includes(i) ? ps[i] : ps[ld];
}
function lS(i) {
  const e = Object.values(ps).find((t) => t.code === i);
  return e || ps[ld];
}
function fd(i, e, t) {
  return i.message.includes("getaddrinfo ENOTFOUND") ||
    i.message.includes("connect ECONNREFUSED")
    ? new Error(`Unavailable ${t} RPC url at ${e}`)
    : i;
}
var pd = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var gu =
  function (i, e) {
    return (
      (gu =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, s) {
            t.__proto__ = s;
          }) ||
        function (t, s) {
          for (var o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
        }),
      gu(i, e)
    );
  };
function fS(i, e) {
  gu(i, e);
  function t() {
    this.constructor = i;
  }
  i.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
var _u = function () {
  return (
    (_u =
      Object.assign ||
      function (e) {
        for (var t, s = 1, o = arguments.length; s < o; s++) {
          t = arguments[s];
          for (var c in t)
            Object.prototype.hasOwnProperty.call(t, c) && (e[c] = t[c]);
        }
        return e;
      }),
    _u.apply(this, arguments)
  );
};
function pS(i, e) {
  var t = {};
  for (var s in i)
    Object.prototype.hasOwnProperty.call(i, s) &&
      e.indexOf(s) < 0 &&
      (t[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(i); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(i, s[o]) &&
        (t[s[o]] = i[s[o]]);
  return t;
}
function dS(i, e, t, s) {
  var o = arguments.length,
    c =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, t)) : s,
    l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    c = Reflect.decorate(i, e, t, s);
  else
    for (var p = i.length - 1; p >= 0; p--)
      (l = i[p]) && (c = (o < 3 ? l(c) : o > 3 ? l(e, t, c) : l(e, t)) || c);
  return o > 3 && c && Object.defineProperty(e, t, c), c;
}
function gS(i, e) {
  return function (t, s) {
    e(t, s, i);
  };
}
function _S(i, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, e);
}
function yS(i, e, t, s) {
  function o(c) {
    return c instanceof t
      ? c
      : new t(function (l) {
          l(c);
        });
  }
  return new (t || (t = Promise))(function (c, l) {
    function p(w) {
      try {
        d(s.next(w));
      } catch (A) {
        l(A);
      }
    }
    function _(w) {
      try {
        d(s.throw(w));
      } catch (A) {
        l(A);
      }
    }
    function d(w) {
      w.done ? c(w.value) : o(w.value).then(p, _);
    }
    d((s = s.apply(i, e || [])).next());
  });
}
function vS(i, e) {
  var t = {
      label: 0,
      sent: function () {
        if (c[0] & 1) throw c[1];
        return c[1];
      },
      trys: [],
      ops: [],
    },
    s,
    o,
    c,
    l;
  return (
    (l = { next: p(0), throw: p(1), return: p(2) }),
    typeof Symbol == "function" &&
      (l[Symbol.iterator] = function () {
        return this;
      }),
    l
  );
  function p(d) {
    return function (w) {
      return _([d, w]);
    };
  }
  function _(d) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (
          ((s = 1),
          o &&
            (c =
              d[0] & 2
                ? o.return
                : d[0]
                ? o.throw || ((c = o.return) && c.call(o), 0)
                : o.next) &&
            !(c = c.call(o, d[1])).done)
        )
          return c;
        switch (((o = 0), c && (d = [d[0] & 2, c.value]), d[0])) {
          case 0:
          case 1:
            c = d;
            break;
          case 4:
            return t.label++, { value: d[1], done: !1 };
          case 5:
            t.label++, (o = d[1]), (d = [0]);
            continue;
          case 7:
            (d = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((c = t.trys),
              !(c = c.length > 0 && c[c.length - 1]) &&
                (d[0] === 6 || d[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (d[0] === 3 && (!c || (d[1] > c[0] && d[1] < c[3]))) {
              t.label = d[1];
              break;
            }
            if (d[0] === 6 && t.label < c[1]) {
              (t.label = c[1]), (c = d);
              break;
            }
            if (c && t.label < c[2]) {
              (t.label = c[2]), t.ops.push(d);
              break;
            }
            c[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        d = e.call(i, t);
      } catch (w) {
        (d = [6, w]), (o = 0);
      } finally {
        s = c = 0;
      }
    if (d[0] & 5) throw d[1];
    return { value: d[0] ? d[1] : void 0, done: !0 };
  }
}
function mS(i, e, t, s) {
  s === void 0 && (s = t), (i[s] = e[t]);
}
function bS(i, e) {
  for (var t in i) t !== "default" && !e.hasOwnProperty(t) && (e[t] = i[t]);
}
function yu(i) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    t = e && i[e],
    s = 0;
  if (t) return t.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function () {
        return (
          i && s >= i.length && (i = void 0), { value: i && i[s++], done: !i }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function dd(i, e) {
  var t = typeof Symbol == "function" && i[Symbol.iterator];
  if (!t) return i;
  var s = t.call(i),
    o,
    c = [],
    l;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = s.next()).done; ) c.push(o.value);
  } catch (p) {
    l = { error: p };
  } finally {
    try {
      o && !o.done && (t = s.return) && t.call(s);
    } finally {
      if (l) throw l.error;
    }
  }
  return c;
}
function wS() {
  for (var i = [], e = 0; e < arguments.length; e++)
    i = i.concat(dd(arguments[e]));
  return i;
}
function ES() {
  for (var i = 0, e = 0, t = arguments.length; e < t; e++)
    i += arguments[e].length;
  for (var s = Array(i), o = 0, e = 0; e < t; e++)
    for (var c = arguments[e], l = 0, p = c.length; l < p; l++, o++)
      s[o] = c[l];
  return s;
}
function bs(i) {
  return this instanceof bs ? ((this.v = i), this) : new bs(i);
}
function SS(i, e, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = t.apply(i, e || []),
    o,
    c = [];
  return (
    (o = {}),
    l("next"),
    l("throw"),
    l("return"),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function l(S) {
    s[S] &&
      (o[S] = function (P) {
        return new Promise(function (M, K) {
          c.push([S, P, M, K]) > 1 || p(S, P);
        });
      });
  }
  function p(S, P) {
    try {
      _(s[S](P));
    } catch (M) {
      A(c[0][3], M);
    }
  }
  function _(S) {
    S.value instanceof bs
      ? Promise.resolve(S.value.v).then(d, w)
      : A(c[0][2], S);
  }
  function d(S) {
    p("next", S);
  }
  function w(S) {
    p("throw", S);
  }
  function A(S, P) {
    S(P), c.shift(), c.length && p(c[0][0], c[0][1]);
  }
}
function IS(i) {
  var e, t;
  return (
    (e = {}),
    s("next"),
    s("throw", function (o) {
      throw o;
    }),
    s("return"),
    (e[Symbol.iterator] = function () {
      return this;
    }),
    e
  );
  function s(o, c) {
    e[o] = i[o]
      ? function (l) {
          return (t = !t)
            ? { value: bs(i[o](l)), done: o === "return" }
            : c
            ? c(l)
            : l;
        }
      : c;
  }
}
function xS(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = i[Symbol.asyncIterator],
    t;
  return e
    ? e.call(i)
    : ((i = typeof yu == "function" ? yu(i) : i[Symbol.iterator]()),
      (t = {}),
      s("next"),
      s("throw"),
      s("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function s(c) {
    t[c] =
      i[c] &&
      function (l) {
        return new Promise(function (p, _) {
          (l = i[c](l)), o(p, _, l.done, l.value);
        });
      };
  }
  function o(c, l, p, _) {
    Promise.resolve(_).then(function (d) {
      c({ value: d, done: p });
    }, l);
  }
}
function OS(i, e) {
  return (
    Object.defineProperty
      ? Object.defineProperty(i, "raw", { value: e })
      : (i.raw = e),
    i
  );
}
function PS(i) {
  if (i && i.__esModule) return i;
  var e = {};
  if (i != null)
    for (var t in i) Object.hasOwnProperty.call(i, t) && (e[t] = i[t]);
  return (e.default = i), e;
}
function AS(i) {
  return i && i.__esModule ? i : { default: i };
}
function TS(i, e) {
  if (!e.has(i))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(i);
}
function CS(i, e, t) {
  if (!e.has(i))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(i, t), t;
}
const RS = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        get __assign() {
          return _u;
        },
        __asyncDelegator: IS,
        __asyncGenerator: SS,
        __asyncValues: xS,
        __await: bs,
        __awaiter: yS,
        __classPrivateFieldGet: TS,
        __classPrivateFieldSet: CS,
        __createBinding: mS,
        __decorate: dS,
        __exportStar: bS,
        __extends: fS,
        __generator: vS,
        __importDefault: AS,
        __importStar: PS,
        __makeTemplateObject: OS,
        __metadata: _S,
        __param: gS,
        __read: dd,
        __rest: pS,
        __spread: wS,
        __spreadArrays: ES,
        __values: yu,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  NS = Tn(RS);
var di = {},
  Lf;
function $S() {
  if (Lf) return di;
  (Lf = 1),
    Object.defineProperty(di, "__esModule", { value: !0 }),
    (di.isBrowserCryptoAvailable =
      di.getSubtleCrypto =
      di.getBrowerCrypto =
        void 0);
  function i() {
    return (
      (Sr === null || Sr === void 0 ? void 0 : Sr.crypto) ||
      (Sr === null || Sr === void 0 ? void 0 : Sr.msCrypto) ||
      {}
    );
  }
  di.getBrowerCrypto = i;
  function e() {
    const s = i();
    return s.subtle || s.webkitSubtle;
  }
  di.getSubtleCrypto = e;
  function t() {
    return !!i() && !!e();
  }
  return (di.isBrowserCryptoAvailable = t), di;
}
var gi = {},
  Mf;
function jS() {
  if (Mf) return gi;
  (Mf = 1),
    Object.defineProperty(gi, "__esModule", { value: !0 }),
    (gi.isBrowser = gi.isNode = gi.isReactNative = void 0);
  function i() {
    return (
      typeof document > "u" &&
      typeof navigator < "u" &&
      navigator.product === "ReactNative"
    );
  }
  gi.isReactNative = i;
  function e() {
    return (
      typeof process < "u" &&
      typeof process.versions < "u" &&
      typeof process.versions.node < "u"
    );
  }
  gi.isNode = e;
  function t() {
    return !i() && !e();
  }
  return (gi.isBrowser = t), gi;
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  const e = NS;
  e.__exportStar($S(), i), e.__exportStar(jS(), i);
})(pd);
function gd(i = 3) {
  const e = Date.now() * Math.pow(10, i),
    t = Math.floor(Math.random() * Math.pow(10, i));
  return e + t;
}
function qu(i = 6) {
  return BigInt(gd(i));
}
function Qo(i, e, t) {
  return { id: t || gd(), jsonrpc: "2.0", method: i, params: e };
}
function zu(i, e) {
  return { id: i, jsonrpc: "2.0", result: e };
}
function Zo(i, e, t) {
  return { id: i, jsonrpc: "2.0", error: DS(e, t) };
}
function DS(i, e) {
  return typeof i > "u"
    ? Ff(hd)
    : (typeof i == "string" &&
        (i = Object.assign(Object.assign({}, Ff(Mu)), { message: i })),
      typeof e < "u" && (i.data = e),
      hS(i.code) && (i = lS(i.code)),
      i);
}
class US {}
class FS extends US {
  constructor() {
    super();
  }
}
class LS extends FS {
  constructor(e) {
    super();
  }
}
const MS = "^https?:",
  qS = "^wss?:";
function zS(i) {
  const e = i.match(new RegExp(/^\w+:/, "gi"));
  if (!(!e || !e.length)) return e[0];
}
function _d(i, e) {
  const t = zS(i);
  return typeof t > "u" ? !1 : new RegExp(e).test(t);
}
function qf(i) {
  return _d(i, MS);
}
function zf(i) {
  return _d(i, qS);
}
function HS(i) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(i);
}
function yd(i) {
  return (
    typeof i == "object" && "id" in i && "jsonrpc" in i && i.jsonrpc === "2.0"
  );
}
function Hu(i) {
  return yd(i) && "method" in i;
}
function ea(i) {
  return yd(i) && (_i(i) || Vr(i));
}
function _i(i) {
  return "result" in i;
}
function Vr(i) {
  return "error" in i;
}
class Ni extends LS {
  constructor(e) {
    super(e),
      (this.events = new Fr.EventEmitter()),
      (this.hasRegisteredEventListeners = !1),
      (this.connection = this.setConnection(e)),
      this.connection.connected && this.registerEventListeners();
  }
  async connect(e = this.connection) {
    await this.open(e);
  }
  async disconnect() {
    await this.close();
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async request(e, t) {
    return this.requestStrict(
      Qo(e.method, e.params || [], e.id || qu().toString()),
      t,
    );
  }
  async requestStrict(e, t) {
    return new Promise(async (s, o) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (c) {
          o(c);
        }
      this.events.on(`${e.id}`, (c) => {
        Vr(c) ? o(c.error) : s(c.result);
      });
      try {
        await this.connection.send(e, t);
      } catch (c) {
        o(c);
      }
    });
  }
  setConnection(e = this.connection) {
    return e;
  }
  onPayload(e) {
    this.events.emit("payload", e),
      ea(e)
        ? this.events.emit(`${e.id}`, e)
        : this.events.emit("message", { type: e.method, data: e.params });
  }
  onClose(e) {
    e &&
      e.code === 3e3 &&
      this.events.emit(
        "error",
        new Error(
          `WebSocket connection closed abnormally with code: ${e.code} ${
            e.reason ? `(${e.reason})` : ""
          }`,
        ),
      ),
      this.events.emit("disconnect");
  }
  async open(e = this.connection) {
    (this.connection === e && this.connection.connected) ||
      (this.connection.connected && this.close(),
      typeof e == "string" &&
        (await this.connection.open(e), (e = this.connection)),
      (this.connection = this.setConnection(e)),
      await this.connection.open(),
      this.registerEventListeners(),
      this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners ||
      (this.connection.on("payload", (e) => this.onPayload(e)),
      this.connection.on("close", (e) => this.onClose(e)),
      this.connection.on("error", (e) => this.events.emit("error", e)),
      this.connection.on("register_error", (e) => this.onClose()),
      (this.hasRegisteredEventListeners = !0));
  }
}
const KS = () =>
    typeof WebSocket < "u"
      ? WebSocket
      : typeof global < "u" && typeof global.WebSocket < "u"
      ? global.WebSocket
      : typeof window < "u" && typeof window.WebSocket < "u"
      ? window.WebSocket
      : typeof self < "u" && typeof self.WebSocket < "u"
      ? self.WebSocket
      : require("ws"),
  BS = () =>
    typeof WebSocket < "u" ||
    (typeof global < "u" && typeof global.WebSocket < "u") ||
    (typeof window < "u" && typeof window.WebSocket < "u") ||
    (typeof self < "u" && typeof self.WebSocket < "u"),
  Hf = (i) => i.split("?")[0],
  Kf = 10,
  VS = KS();
class kS {
  constructor(e) {
    if (
      ((this.url = e),
      (this.events = new Fr.EventEmitter()),
      (this.registering = !1),
      !zf(e))
    )
      throw new Error(
        `Provided URL is not compatible with WebSocket connection: ${e}`,
      );
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    return new Promise((e, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      (this.socket.onclose = (s) => {
        this.onClose(s), e();
      }),
        this.socket.close();
    });
  }
  async send(e, t) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(vs(e));
    } catch (s) {
      this.onError(e.id, s);
    }
  }
  register(e = this.url) {
    if (!zf(e))
      throw new Error(
        `Provided URL is not compatible with WebSocket connection: ${e}`,
      );
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (
        (this.events.listenerCount("register_error") >= t ||
          this.events.listenerCount("open") >= t) &&
          this.events.setMaxListeners(t + 1),
        new Promise((s, o) => {
          this.events.once("register_error", (c) => {
            this.resetMaxListeners(), o(c);
          }),
            this.events.once("open", () => {
              if ((this.resetMaxListeners(), typeof this.socket > "u"))
                return o(
                  new Error("WebSocket connection is missing or invalid"),
                );
              s(this.socket);
            });
        })
      );
    }
    return (
      (this.url = e),
      (this.registering = !0),
      new Promise((t, s) => {
        const o = pd.isReactNative() ? void 0 : { rejectUnauthorized: !HS(e) },
          c = new VS(e, [], o);
        BS()
          ? (c.onerror = (l) => {
              const p = l;
              s(this.emitError(p.error));
            })
          : c.on("error", (l) => {
              s(this.emitError(l));
            }),
          (c.onopen = () => {
            this.onOpen(c), t(c);
          });
      })
    );
  }
  onOpen(e) {
    (e.onmessage = (t) => this.onPayload(t)),
      (e.onclose = (t) => this.onClose(t)),
      (this.socket = e),
      (this.registering = !1),
      this.events.emit("open");
  }
  onClose(e) {
    (this.socket = void 0),
      (this.registering = !1),
      this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const t = typeof e.data == "string" ? xu(e.data) : e.data;
    this.events.emit("payload", t);
  }
  onError(e, t) {
    const s = this.parseError(t),
      o = s.message || s.toString(),
      c = Zo(e, o);
    this.events.emit("payload", c);
  }
  parseError(e, t = this.url) {
    return fd(e, Hf(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Kf && this.events.setMaxListeners(Kf);
  }
  emitError(e) {
    const t = this.parseError(
      new Error(
        (e == null ? void 0 : e.message) ||
          `WebSocket connection failed for host: ${Hf(this.url)}`,
      ),
    );
    return this.events.emit("register_error", t), t;
  }
}
var Ho = { exports: {} };
Ho.exports;
(function (i, e) {
  var t = 200,
    s = "__lodash_hash_undefined__",
    o = 1,
    c = 2,
    l = 9007199254740991,
    p = "[object Arguments]",
    _ = "[object Array]",
    d = "[object AsyncFunction]",
    w = "[object Boolean]",
    A = "[object Date]",
    S = "[object Error]",
    P = "[object Function]",
    M = "[object GeneratorFunction]",
    K = "[object Map]",
    B = "[object Number]",
    oe = "[object Null]",
    N = "[object Object]",
    F = "[object Promise]",
    x = "[object Proxy]",
    C = "[object RegExp]",
    b = "[object Set]",
    h = "[object String]",
    m = "[object Symbol]",
    G = "[object Undefined]",
    k = "[object WeakMap]",
    se = "[object ArrayBuffer]",
    ce = "[object DataView]",
    ge = "[object Float32Array]",
    $ = "[object Float64Array]",
    z = "[object Int8Array]",
    le = "[object Int16Array]",
    te = "[object Int32Array]",
    W = "[object Uint8Array]",
    ee = "[object Uint8ClampedArray]",
    Y = "[object Uint16Array]",
    re = "[object Uint32Array]",
    Oe = /[\\^$.*+?()[\]{}|]/g,
    ie = /^\[object .+?Constructor\]$/,
    be = /^(?:0|[1-9]\d*)$/,
    he = {};
  (he[ge] =
    he[$] =
    he[z] =
    he[le] =
    he[te] =
    he[W] =
    he[ee] =
    he[Y] =
    he[re] =
      !0),
    (he[p] =
      he[_] =
      he[se] =
      he[w] =
      he[ce] =
      he[A] =
      he[S] =
      he[P] =
      he[K] =
      he[B] =
      he[N] =
      he[C] =
      he[b] =
      he[h] =
      he[k] =
        !1);
  var ve = typeof Sr == "object" && Sr && Sr.Object === Object && Sr,
    q = typeof self == "object" && self && self.Object === Object && self,
    L = ve || q || Function("return this")(),
    R = e && !e.nodeType && e,
    f = R && !0 && i && !i.nodeType && i,
    O = f && f.exports === R,
    ne = O && ve.process,
    fe = (function () {
      try {
        return ne && ne.binding && ne.binding("util");
      } catch {}
    })(),
    Ie = fe && fe.isTypedArray;
  function He(E, j) {
    for (
      var Q = -1, pe = E == null ? 0 : E.length, at = 0, Re = [];
      ++Q < pe;

    ) {
      var ft = E[Q];
      j(ft, Q, E) && (Re[at++] = ft);
    }
    return Re;
  }
  function Ve(E, j) {
    for (var Q = -1, pe = j.length, at = E.length; ++Q < pe; ) E[at + Q] = j[Q];
    return E;
  }
  function Fe(E, j) {
    for (var Q = -1, pe = E == null ? 0 : E.length; ++Q < pe; )
      if (j(E[Q], Q, E)) return !0;
    return !1;
  }
  function dt(E, j) {
    for (var Q = -1, pe = Array(E); ++Q < E; ) pe[Q] = j(Q);
    return pe;
  }
  function gt(E) {
    return function (j) {
      return E(j);
    };
  }
  function Me(E, j) {
    return E.has(j);
  }
  function xe(E, j) {
    return E == null ? void 0 : E[j];
  }
  function $e(E) {
    var j = -1,
      Q = Array(E.size);
    return (
      E.forEach(function (pe, at) {
        Q[++j] = [at, pe];
      }),
      Q
    );
  }
  function je(E, j) {
    return function (Q) {
      return E(j(Q));
    };
  }
  function qe(E) {
    var j = -1,
      Q = Array(E.size);
    return (
      E.forEach(function (pe) {
        Q[++j] = pe;
      }),
      Q
    );
  }
  var Ae = Array.prototype,
    De = Function.prototype,
    Se = Object.prototype,
    Te = L["__core-js_shared__"],
    Ke = De.toString,
    Pe = Se.hasOwnProperty,
    ke = (function () {
      var E = /[^.]+$/.exec((Te && Te.keys && Te.keys.IE_PROTO) || "");
      return E ? "Symbol(src)_1." + E : "";
    })(),
    We = Se.toString,
    et = RegExp(
      "^" +
        Ke.call(Pe)
          .replace(Oe, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?",
          ) +
        "$",
    ),
    tt = O ? L.Buffer : void 0,
    Je = L.Symbol,
    Zt = L.Uint8Array,
    ur = Se.propertyIsEnumerable,
    kr = Ae.splice,
    er = Je ? Je.toStringTag : void 0,
    ri = Object.getOwnPropertySymbols,
    yi = tt ? tt.isBuffer : void 0,
    ji = je(Object.keys, Object),
    wt = yr(L, "DataView"),
    _t = yr(L, "Map"),
    Et = yr(L, "Promise"),
    St = yr(L, "Set"),
    mt = yr(L, "WeakMap"),
    yt = yr(Object, "create"),
    Dt = ni(wt),
    Ut = ni(_t),
    It = ni(Et),
    Ft = ni(St),
    xt = ni(mt),
    Tt = Je ? Je.prototype : void 0,
    Ot = Tt ? Tt.valueOf : void 0;
  function ht(E) {
    var j = -1,
      Q = E == null ? 0 : E.length;
    for (this.clear(); ++j < Q; ) {
      var pe = E[j];
      this.set(pe[0], pe[1]);
    }
  }
  function Lt() {
    (this.__data__ = yt ? yt(null) : {}), (this.size = 0);
  }
  function Mt(E) {
    var j = this.has(E) && delete this.__data__[E];
    return (this.size -= j ? 1 : 0), j;
  }
  function ia(E) {
    var j = this.__data__;
    if (yt) {
      var Q = j[E];
      return Q === s ? void 0 : Q;
    }
    return Pe.call(j, E) ? j[E] : void 0;
  }
  function na(E) {
    var j = this.__data__;
    return yt ? j[E] !== void 0 : Pe.call(j, E);
  }
  function sa(E, j) {
    var Q = this.__data__;
    return (
      (this.size += this.has(E) ? 0 : 1),
      (Q[E] = yt && j === void 0 ? s : j),
      this
    );
  }
  (ht.prototype.clear = Lt),
    (ht.prototype.delete = Mt),
    (ht.prototype.get = ia),
    (ht.prototype.has = na),
    (ht.prototype.set = sa);
  function xr(E) {
    var j = -1,
      Q = E == null ? 0 : E.length;
    for (this.clear(); ++j < Q; ) {
      var pe = E[j];
      this.set(pe[0], pe[1]);
    }
  }
  function oa() {
    (this.__data__ = []), (this.size = 0);
  }
  function aa(E) {
    var j = this.__data__,
      Q = Di(j, E);
    if (Q < 0) return !1;
    var pe = j.length - 1;
    return Q == pe ? j.pop() : kr.call(j, Q, 1), --this.size, !0;
  }
  function ca(E) {
    var j = this.__data__,
      Q = Di(j, E);
    return Q < 0 ? void 0 : j[Q][1];
  }
  function ua(E) {
    return Di(this.__data__, E) > -1;
  }
  function ha(E, j) {
    var Q = this.__data__,
      pe = Di(Q, E);
    return pe < 0 ? (++this.size, Q.push([E, j])) : (Q[pe][1] = j), this;
  }
  (xr.prototype.clear = oa),
    (xr.prototype.delete = aa),
    (xr.prototype.get = ca),
    (xr.prototype.has = ua),
    (xr.prototype.set = ha);
  function ii(E) {
    var j = -1,
      Q = E == null ? 0 : E.length;
    for (this.clear(); ++j < Q; ) {
      var pe = E[j];
      this.set(pe[0], pe[1]);
    }
  }
  function nn() {
    (this.size = 0),
      (this.__data__ = {
        hash: new ht(),
        map: new (_t || xr)(),
        string: new ht(),
      });
  }
  function la(E) {
    var j = vi(this, E).delete(E);
    return (this.size -= j ? 1 : 0), j;
  }
  function sn(E) {
    return vi(this, E).get(E);
  }
  function fa(E) {
    return vi(this, E).has(E);
  }
  function pa(E, j) {
    var Q = vi(this, E),
      pe = Q.size;
    return Q.set(E, j), (this.size += Q.size == pe ? 0 : 1), this;
  }
  (ii.prototype.clear = nn),
    (ii.prototype.delete = la),
    (ii.prototype.get = sn),
    (ii.prototype.has = fa),
    (ii.prototype.set = pa);
  function on(E) {
    var j = -1,
      Q = E == null ? 0 : E.length;
    for (this.__data__ = new ii(); ++j < Q; ) this.add(E[j]);
  }
  function xs(E) {
    return this.__data__.set(E, s), this;
  }
  function Os(E) {
    return this.__data__.has(E);
  }
  (on.prototype.add = on.prototype.push = xs), (on.prototype.has = Os);
  function Lr(E) {
    var j = (this.__data__ = new xr(E));
    this.size = j.size;
  }
  function da() {
    (this.__data__ = new xr()), (this.size = 0);
  }
  function ga(E) {
    var j = this.__data__,
      Q = j.delete(E);
    return (this.size = j.size), Q;
  }
  function _a(E) {
    return this.__data__.get(E);
  }
  function ya(E) {
    return this.__data__.has(E);
  }
  function Ps(E, j) {
    var Q = this.__data__;
    if (Q instanceof xr) {
      var pe = Q.__data__;
      if (!_t || pe.length < t - 1)
        return pe.push([E, j]), (this.size = ++Q.size), this;
      Q = this.__data__ = new ii(pe);
    }
    return Q.set(E, j), (this.size = Q.size), this;
  }
  (Lr.prototype.clear = da),
    (Lr.prototype.delete = ga),
    (Lr.prototype.get = _a),
    (Lr.prototype.has = ya),
    (Lr.prototype.set = Ps);
  function As(E, j) {
    var Q = un(E),
      pe = !Q && qs(E),
      at = !Q && !pe && Un(E),
      Re = !Q && !pe && !at && Ks(E),
      ft = Q || pe || at || Re,
      qt = ft ? dt(E.length, String) : [],
      Xe = qt.length;
    for (var ct in E)
      (j || Pe.call(E, ct)) &&
        !(
          ft &&
          (ct == "length" ||
            (at && (ct == "offset" || ct == "parent")) ||
            (Re &&
              (ct == "buffer" || ct == "byteLength" || ct == "byteOffset")) ||
            Ds(ct, Xe))
        ) &&
        qt.push(ct);
    return qt;
  }
  function Di(E, j) {
    for (var Q = E.length; Q--; ) if (Ms(E[Q][0], j)) return Q;
    return -1;
  }
  function jn(E, j, Q) {
    var pe = j(E);
    return un(E) ? pe : Ve(pe, Q(E));
  }
  function Ui(E) {
    return E == null
      ? E === void 0
        ? G
        : oe
      : er && er in Object(E)
      ? $s(E)
      : ba(E);
  }
  function Dn(E) {
    return Li(E) && Ui(E) == p;
  }
  function Fi(E, j, Q, pe, at) {
    return E === j
      ? !0
      : E == null || j == null || (!Li(E) && !Li(j))
      ? E !== E && j !== j
      : Ts(E, j, Q, pe, Fi, at);
  }
  function Ts(E, j, Q, pe, at, Re) {
    var ft = un(E),
      qt = un(j),
      Xe = ft ? _ : Gr(E),
      ct = qt ? _ : Gr(j);
    (Xe = Xe == p ? N : Xe), (ct = ct == p ? N : ct);
    var Ct = Xe == N,
      hr = ct == N,
      zt = Xe == ct;
    if (zt && Un(E)) {
      if (!Un(j)) return !1;
      (ft = !0), (Ct = !1);
    }
    if (zt && !Ct)
      return (
        Re || (Re = new Lr()),
        ft || Ks(E) ? an(E, j, Q, pe, at, Re) : ma(E, j, Xe, Q, pe, at, Re)
      );
    if (!(Q & o)) {
      var pt = Ct && Pe.call(E, "__wrapped__"),
        tr = hr && Pe.call(j, "__wrapped__");
      if (pt || tr) {
        var Mr = pt ? E.value() : E,
          Or = tr ? j.value() : j;
        return Re || (Re = new Lr()), at(Mr, Or, Q, pe, Re);
      }
    }
    return zt ? (Re || (Re = new Lr()), Ns(E, j, Q, pe, at, Re)) : !1;
  }
  function va(E) {
    if (!Hs(E) || Fs(E)) return !1;
    var j = hn(E) ? et : ie;
    return j.test(ni(E));
  }
  function Cs(E) {
    return Li(E) && zs(E.length) && !!he[Ui(E)];
  }
  function Rs(E) {
    if (!Ls(E)) return ji(E);
    var j = [];
    for (var Q in Object(E)) Pe.call(E, Q) && Q != "constructor" && j.push(Q);
    return j;
  }
  function an(E, j, Q, pe, at, Re) {
    var ft = Q & o,
      qt = E.length,
      Xe = j.length;
    if (qt != Xe && !(ft && Xe > qt)) return !1;
    var ct = Re.get(E);
    if (ct && Re.get(j)) return ct == j;
    var Ct = -1,
      hr = !0,
      zt = Q & c ? new on() : void 0;
    for (Re.set(E, j), Re.set(j, E); ++Ct < qt; ) {
      var pt = E[Ct],
        tr = j[Ct];
      if (pe) var Mr = ft ? pe(tr, pt, Ct, j, E, Re) : pe(pt, tr, Ct, E, j, Re);
      if (Mr !== void 0) {
        if (Mr) continue;
        hr = !1;
        break;
      }
      if (zt) {
        if (
          !Fe(j, function (Or, Wr) {
            if (!Me(zt, Wr) && (pt === Or || at(pt, Or, Q, pe, Re)))
              return zt.push(Wr);
          })
        ) {
          hr = !1;
          break;
        }
      } else if (!(pt === tr || at(pt, tr, Q, pe, Re))) {
        hr = !1;
        break;
      }
    }
    return Re.delete(E), Re.delete(j), hr;
  }
  function ma(E, j, Q, pe, at, Re, ft) {
    switch (Q) {
      case ce:
        if (E.byteLength != j.byteLength || E.byteOffset != j.byteOffset)
          return !1;
        (E = E.buffer), (j = j.buffer);
      case se:
        return !(E.byteLength != j.byteLength || !Re(new Zt(E), new Zt(j)));
      case w:
      case A:
      case B:
        return Ms(+E, +j);
      case S:
        return E.name == j.name && E.message == j.message;
      case C:
      case h:
        return E == j + "";
      case K:
        var qt = $e;
      case b:
        var Xe = pe & o;
        if ((qt || (qt = qe), E.size != j.size && !Xe)) return !1;
        var ct = ft.get(E);
        if (ct) return ct == j;
        (pe |= c), ft.set(E, j);
        var Ct = an(qt(E), qt(j), pe, at, Re, ft);
        return ft.delete(E), Ct;
      case m:
        if (Ot) return Ot.call(E) == Ot.call(j);
    }
    return !1;
  }
  function Ns(E, j, Q, pe, at, Re) {
    var ft = Q & o,
      qt = cn(E),
      Xe = qt.length,
      ct = cn(j),
      Ct = ct.length;
    if (Xe != Ct && !ft) return !1;
    for (var hr = Xe; hr--; ) {
      var zt = qt[hr];
      if (!(ft ? zt in j : Pe.call(j, zt))) return !1;
    }
    var pt = Re.get(E);
    if (pt && Re.get(j)) return pt == j;
    var tr = !0;
    Re.set(E, j), Re.set(j, E);
    for (var Mr = ft; ++hr < Xe; ) {
      zt = qt[hr];
      var Or = E[zt],
        Wr = j[zt];
      if (pe) var Fn = ft ? pe(Wr, Or, zt, j, E, Re) : pe(Or, Wr, zt, E, j, Re);
      if (!(Fn === void 0 ? Or === Wr || at(Or, Wr, Q, pe, Re) : Fn)) {
        tr = !1;
        break;
      }
      Mr || (Mr = zt == "constructor");
    }
    if (tr && !Mr) {
      var Mi = E.constructor,
        Vt = j.constructor;
      Mi != Vt &&
        "constructor" in E &&
        "constructor" in j &&
        !(
          typeof Mi == "function" &&
          Mi instanceof Mi &&
          typeof Vt == "function" &&
          Vt instanceof Vt
        ) &&
        (tr = !1);
    }
    return Re.delete(E), Re.delete(j), tr;
  }
  function cn(E) {
    return jn(E, Sa, js);
  }
  function vi(E, j) {
    var Q = E.__data__;
    return Us(j) ? Q[typeof j == "string" ? "string" : "hash"] : Q.map;
  }
  function yr(E, j) {
    var Q = xe(E, j);
    return va(Q) ? Q : void 0;
  }
  function $s(E) {
    var j = Pe.call(E, er),
      Q = E[er];
    try {
      E[er] = void 0;
      var pe = !0;
    } catch {}
    var at = We.call(E);
    return pe && (j ? (E[er] = Q) : delete E[er]), at;
  }
  var js = ri
      ? function (E) {
          return E == null
            ? []
            : ((E = Object(E)),
              He(ri(E), function (j) {
                return ur.call(E, j);
              }));
        }
      : ot,
    Gr = Ui;
  ((wt && Gr(new wt(new ArrayBuffer(1))) != ce) ||
    (_t && Gr(new _t()) != K) ||
    (Et && Gr(Et.resolve()) != F) ||
    (St && Gr(new St()) != b) ||
    (mt && Gr(new mt()) != k)) &&
    (Gr = function (E) {
      var j = Ui(E),
        Q = j == N ? E.constructor : void 0,
        pe = Q ? ni(Q) : "";
      if (pe)
        switch (pe) {
          case Dt:
            return ce;
          case Ut:
            return K;
          case It:
            return F;
          case Ft:
            return b;
          case xt:
            return k;
        }
      return j;
    });
  function Ds(E, j) {
    return (
      (j = j ?? l),
      !!j &&
        (typeof E == "number" || be.test(E)) &&
        E > -1 &&
        E % 1 == 0 &&
        E < j
    );
  }
  function Us(E) {
    var j = typeof E;
    return j == "string" || j == "number" || j == "symbol" || j == "boolean"
      ? E !== "__proto__"
      : E === null;
  }
  function Fs(E) {
    return !!ke && ke in E;
  }
  function Ls(E) {
    var j = E && E.constructor,
      Q = (typeof j == "function" && j.prototype) || Se;
    return E === Q;
  }
  function ba(E) {
    return We.call(E);
  }
  function ni(E) {
    if (E != null) {
      try {
        return Ke.call(E);
      } catch {}
      try {
        return E + "";
      } catch {}
    }
    return "";
  }
  function Ms(E, j) {
    return E === j || (E !== E && j !== j);
  }
  var qs = Dn(
      (function () {
        return arguments;
      })(),
    )
      ? Dn
      : function (E) {
          return Li(E) && Pe.call(E, "callee") && !ur.call(E, "callee");
        },
    un = Array.isArray;
  function wa(E) {
    return E != null && zs(E.length) && !hn(E);
  }
  var Un = yi || st;
  function Ea(E, j) {
    return Fi(E, j);
  }
  function hn(E) {
    if (!Hs(E)) return !1;
    var j = Ui(E);
    return j == P || j == M || j == d || j == x;
  }
  function zs(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= l;
  }
  function Hs(E) {
    var j = typeof E;
    return E != null && (j == "object" || j == "function");
  }
  function Li(E) {
    return E != null && typeof E == "object";
  }
  var Ks = Ie ? gt(Ie) : Cs;
  function Sa(E) {
    return wa(E) ? As(E) : Rs(E);
  }
  function ot() {
    return [];
  }
  function st() {
    return !1;
  }
  i.exports = Ea;
})(Ho, Ho.exports);
var GS = Ho.exports;
const WS = vm(GS);
function YS(i, e) {
  if (i.length >= 255) throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), s = 0; s < t.length; s++) t[s] = 255;
  for (var o = 0; o < i.length; o++) {
    var c = i.charAt(o),
      l = c.charCodeAt(0);
    if (t[l] !== 255) throw new TypeError(c + " is ambiguous");
    t[l] = o;
  }
  var p = i.length,
    _ = i.charAt(0),
    d = Math.log(p) / Math.log(256),
    w = Math.log(256) / Math.log(p);
  function A(M) {
    if (
      (M instanceof Uint8Array ||
        (ArrayBuffer.isView(M)
          ? (M = new Uint8Array(M.buffer, M.byteOffset, M.byteLength))
          : Array.isArray(M) && (M = Uint8Array.from(M))),
      !(M instanceof Uint8Array))
    )
      throw new TypeError("Expected Uint8Array");
    if (M.length === 0) return "";
    for (var K = 0, B = 0, oe = 0, N = M.length; oe !== N && M[oe] === 0; )
      oe++, K++;
    for (var F = ((N - oe) * w + 1) >>> 0, x = new Uint8Array(F); oe !== N; ) {
      for (
        var C = M[oe], b = 0, h = F - 1;
        (C !== 0 || b < B) && h !== -1;
        h--, b++
      )
        (C += (256 * x[h]) >>> 0), (x[h] = C % p >>> 0), (C = (C / p) >>> 0);
      if (C !== 0) throw new Error("Non-zero carry");
      (B = b), oe++;
    }
    for (var m = F - B; m !== F && x[m] === 0; ) m++;
    for (var G = _.repeat(K); m < F; ++m) G += i.charAt(x[m]);
    return G;
  }
  function S(M) {
    if (typeof M != "string") throw new TypeError("Expected String");
    if (M.length === 0) return new Uint8Array();
    var K = 0;
    if (M[K] !== " ") {
      for (var B = 0, oe = 0; M[K] === _; ) B++, K++;
      for (
        var N = ((M.length - K) * d + 1) >>> 0, F = new Uint8Array(N);
        M[K];

      ) {
        var x = t[M.charCodeAt(K)];
        if (x === 255) return;
        for (var C = 0, b = N - 1; (x !== 0 || C < oe) && b !== -1; b--, C++)
          (x += (p * F[b]) >>> 0),
            (F[b] = x % 256 >>> 0),
            (x = (x / 256) >>> 0);
        if (x !== 0) throw new Error("Non-zero carry");
        (oe = C), K++;
      }
      if (M[K] !== " ") {
        for (var h = N - oe; h !== N && F[h] === 0; ) h++;
        for (var m = new Uint8Array(B + (N - h)), G = B; h !== N; )
          m[G++] = F[h++];
        return m;
      }
    }
  }
  function P(M) {
    var K = S(M);
    if (K) return K;
    throw new Error(`Non-${e} character`);
  }
  return { encode: A, decodeUnsafe: S, decode: P };
}
var JS = YS,
  XS = JS;
const vd = (i) => {
    if (i instanceof Uint8Array && i.constructor.name === "Uint8Array")
      return i;
    if (i instanceof ArrayBuffer) return new Uint8Array(i);
    if (ArrayBuffer.isView(i))
      return new Uint8Array(i.buffer, i.byteOffset, i.byteLength);
    throw new Error("Unknown type, must be binary type");
  },
  QS = (i) => new TextEncoder().encode(i),
  ZS = (i) => new TextDecoder().decode(i);
class e2 {
  constructor(e, t, s) {
    (this.name = e), (this.prefix = t), (this.baseEncode = s);
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class t2 {
  constructor(e, t, s) {
    if (((this.name = e), (this.prefix = t), t.codePointAt(0) === void 0))
      throw new Error("Invalid prefix character");
    (this.prefixCodePoint = t.codePointAt(0)), (this.baseDecode = s);
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(
          `Unable to decode multibase string ${JSON.stringify(e)}, ${
            this.name
          } decoder only supports inputs prefixed with ${this.prefix}`,
        );
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return md(this, e);
  }
}
class r2 {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return md(this, e);
  }
  decode(e) {
    const t = e[0],
      s = this.decoders[t];
    if (s) return s.decode(e);
    throw RangeError(
      `Unable to decode multibase string ${JSON.stringify(
        e,
      )}, only inputs prefixed with ${Object.keys(
        this.decoders,
      )} are supported`,
    );
  }
}
const md = (i, e) =>
  new r2({
    ...(i.decoders || { [i.prefix]: i }),
    ...(e.decoders || { [e.prefix]: e }),
  });
class i2 {
  constructor(e, t, s, o) {
    (this.name = e),
      (this.prefix = t),
      (this.baseEncode = s),
      (this.baseDecode = o),
      (this.encoder = new e2(e, t, s)),
      (this.decoder = new t2(e, t, o));
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const ta = ({ name: i, prefix: e, encode: t, decode: s }) => new i2(i, e, t, s),
  Is = ({ prefix: i, name: e, alphabet: t }) => {
    const { encode: s, decode: o } = XS(t, e);
    return ta({ prefix: i, name: e, encode: s, decode: (c) => vd(o(c)) });
  },
  n2 = (i, e, t, s) => {
    const o = {};
    for (let w = 0; w < e.length; ++w) o[e[w]] = w;
    let c = i.length;
    for (; i[c - 1] === "="; ) --c;
    const l = new Uint8Array(((c * t) / 8) | 0);
    let p = 0,
      _ = 0,
      d = 0;
    for (let w = 0; w < c; ++w) {
      const A = o[i[w]];
      if (A === void 0) throw new SyntaxError(`Non-${s} character`);
      (_ = (_ << t) | A),
        (p += t),
        p >= 8 && ((p -= 8), (l[d++] = 255 & (_ >> p)));
    }
    if (p >= t || 255 & (_ << (8 - p)))
      throw new SyntaxError("Unexpected end of data");
    return l;
  },
  s2 = (i, e, t) => {
    const s = e[e.length - 1] === "=",
      o = (1 << t) - 1;
    let c = "",
      l = 0,
      p = 0;
    for (let _ = 0; _ < i.length; ++_)
      for (p = (p << 8) | i[_], l += 8; l > t; )
        (l -= t), (c += e[o & (p >> l)]);
    if ((l && (c += e[o & (p << (t - l))]), s))
      for (; (c.length * t) & 7; ) c += "=";
    return c;
  },
  Yt = ({ name: i, prefix: e, bitsPerChar: t, alphabet: s }) =>
    ta({
      prefix: e,
      name: i,
      encode(o) {
        return s2(o, s, t);
      },
      decode(o) {
        return n2(o, s, t, i);
      },
    }),
  o2 = ta({
    prefix: "\0",
    name: "identity",
    encode: (i) => ZS(i),
    decode: (i) => QS(i),
  });
var a2 = Object.freeze({ __proto__: null, identity: o2 });
const c2 = Yt({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var u2 = Object.freeze({ __proto__: null, base2: c2 });
const h2 = Yt({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3,
});
var l2 = Object.freeze({ __proto__: null, base8: h2 });
const f2 = Is({ prefix: "9", name: "base10", alphabet: "0123456789" });
var p2 = Object.freeze({ __proto__: null, base10: f2 });
const d2 = Yt({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4,
  }),
  g2 = Yt({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4,
  });
var _2 = Object.freeze({ __proto__: null, base16: d2, base16upper: g2 });
const y2 = Yt({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5,
  }),
  v2 = Yt({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5,
  }),
  m2 = Yt({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5,
  }),
  b2 = Yt({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5,
  }),
  w2 = Yt({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5,
  }),
  E2 = Yt({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5,
  }),
  S2 = Yt({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5,
  }),
  I2 = Yt({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5,
  }),
  x2 = Yt({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5,
  });
var O2 = Object.freeze({
  __proto__: null,
  base32: y2,
  base32upper: v2,
  base32pad: m2,
  base32padupper: b2,
  base32hex: w2,
  base32hexupper: E2,
  base32hexpad: S2,
  base32hexpadupper: I2,
  base32z: x2,
});
const P2 = Is({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
  }),
  A2 = Is({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  });
var T2 = Object.freeze({ __proto__: null, base36: P2, base36upper: A2 });
const C2 = Is({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  }),
  R2 = Is({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  });
var N2 = Object.freeze({ __proto__: null, base58btc: C2, base58flickr: R2 });
const $2 = Yt({
    prefix: "m",
    name: "base64",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6,
  }),
  j2 = Yt({
    prefix: "M",
    name: "base64pad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6,
  }),
  D2 = Yt({
    prefix: "u",
    name: "base64url",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6,
  }),
  U2 = Yt({
    prefix: "U",
    name: "base64urlpad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6,
  });
var F2 = Object.freeze({
  __proto__: null,
  base64: $2,
  base64pad: j2,
  base64url: D2,
  base64urlpad: U2,
});
const bd = Array.from(
    "🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂",
  ),
  L2 = bd.reduce((i, e, t) => ((i[t] = e), i), []),
  M2 = bd.reduce((i, e, t) => ((i[e.codePointAt(0)] = t), i), []);
function q2(i) {
  return i.reduce((e, t) => ((e += L2[t]), e), "");
}
function z2(i) {
  const e = [];
  for (const t of i) {
    const s = M2[t.codePointAt(0)];
    if (s === void 0) throw new Error(`Non-base256emoji character: ${t}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const H2 = ta({ prefix: "🚀", name: "base256emoji", encode: q2, decode: z2 });
var K2 = Object.freeze({ __proto__: null, base256emoji: H2 }),
  B2 = wd,
  Bf = 128,
  V2 = 127,
  k2 = ~V2,
  G2 = Math.pow(2, 31);
function wd(i, e, t) {
  (e = e || []), (t = t || 0);
  for (var s = t; i >= G2; ) (e[t++] = (i & 255) | Bf), (i /= 128);
  for (; i & k2; ) (e[t++] = (i & 255) | Bf), (i >>>= 7);
  return (e[t] = i | 0), (wd.bytes = t - s + 1), e;
}
var W2 = vu,
  Y2 = 128,
  Vf = 127;
function vu(i, s) {
  var t = 0,
    s = s || 0,
    o = 0,
    c = s,
    l,
    p = i.length;
  do {
    if (c >= p)
      throw ((vu.bytes = 0), new RangeError("Could not decode varint"));
    (l = i[c++]),
      (t += o < 28 ? (l & Vf) << o : (l & Vf) * Math.pow(2, o)),
      (o += 7);
  } while (l >= Y2);
  return (vu.bytes = c - s), t;
}
var J2 = Math.pow(2, 7),
  X2 = Math.pow(2, 14),
  Q2 = Math.pow(2, 21),
  Z2 = Math.pow(2, 28),
  e3 = Math.pow(2, 35),
  t3 = Math.pow(2, 42),
  r3 = Math.pow(2, 49),
  i3 = Math.pow(2, 56),
  n3 = Math.pow(2, 63),
  s3 = function (i) {
    return i < J2
      ? 1
      : i < X2
      ? 2
      : i < Q2
      ? 3
      : i < Z2
      ? 4
      : i < e3
      ? 5
      : i < t3
      ? 6
      : i < r3
      ? 7
      : i < i3
      ? 8
      : i < n3
      ? 9
      : 10;
  },
  o3 = { encode: B2, decode: W2, encodingLength: s3 },
  Ed = o3;
const kf = (i, e, t = 0) => (Ed.encode(i, e, t), e),
  Gf = (i) => Ed.encodingLength(i),
  mu = (i, e) => {
    const t = e.byteLength,
      s = Gf(i),
      o = s + Gf(t),
      c = new Uint8Array(o + t);
    return kf(i, c, 0), kf(t, c, s), c.set(e, o), new a3(i, t, e, c);
  };
class a3 {
  constructor(e, t, s, o) {
    (this.code = e), (this.size = t), (this.digest = s), (this.bytes = o);
  }
}
const Sd = ({ name: i, code: e, encode: t }) => new c3(i, e, t);
class c3 {
  constructor(e, t, s) {
    (this.name = e), (this.code = t), (this.encode = s);
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array
        ? mu(this.code, t)
        : t.then((s) => mu(this.code, s));
    } else throw Error("Unknown type, must be binary type");
  }
}
const Id = (i) => async (e) => new Uint8Array(await crypto.subtle.digest(i, e)),
  u3 = Sd({ name: "sha2-256", code: 18, encode: Id("SHA-256") }),
  h3 = Sd({ name: "sha2-512", code: 19, encode: Id("SHA-512") });
var l3 = Object.freeze({ __proto__: null, sha256: u3, sha512: h3 });
const xd = 0,
  f3 = "identity",
  Od = vd,
  p3 = (i) => mu(xd, Od(i)),
  d3 = { code: xd, name: f3, encode: Od, digest: p3 };
var g3 = Object.freeze({ __proto__: null, identity: d3 });
new TextEncoder(), new TextDecoder();
const Wf = {
  ...a2,
  ...u2,
  ...l2,
  ...p2,
  ..._2,
  ...O2,
  ...T2,
  ...N2,
  ...F2,
  ...K2,
};
({ ...l3, ...g3 });
function Pd(i) {
  return globalThis.Buffer != null
    ? new Uint8Array(i.buffer, i.byteOffset, i.byteLength)
    : i;
}
function _3(i = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null
    ? Pd(globalThis.Buffer.allocUnsafe(i))
    : new Uint8Array(i);
}
function Ad(i, e, t, s) {
  return {
    name: i,
    prefix: e,
    encoder: { name: i, prefix: e, encode: t },
    decoder: { decode: s },
  };
}
const Yf = Ad(
    "utf8",
    "u",
    (i) => "u" + new TextDecoder("utf8").decode(i),
    (i) => new TextEncoder().encode(i.substring(1)),
  ),
  Fc = Ad(
    "ascii",
    "a",
    (i) => {
      let e = "a";
      for (let t = 0; t < i.length; t++) e += String.fromCharCode(i[t]);
      return e;
    },
    (i) => {
      i = i.substring(1);
      const e = _3(i.length);
      for (let t = 0; t < i.length; t++) e[t] = i.charCodeAt(t);
      return e;
    },
  ),
  y3 = {
    utf8: Yf,
    "utf-8": Yf,
    hex: Wf.base16,
    latin1: Fc,
    ascii: Fc,
    binary: Fc,
    ...Wf,
  };
function v3(i, e = "utf8") {
  const t = y3[e];
  if (!t) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") &&
    globalThis.Buffer != null &&
    globalThis.Buffer.from != null
    ? Pd(globalThis.Buffer.from(i, "utf-8"))
    : t.decoder.decode(`${t.prefix}${i}`);
}
const Td = "wc",
  m3 = 2,
  Ku = "core",
  Ci = `${Td}@2:${Ku}:`,
  b3 = { name: Ku, logger: "error" },
  w3 = { database: ":memory:" },
  E3 = "crypto",
  Jf = "client_ed25519_seed",
  S3 = _e.ONE_DAY,
  I3 = "keychain",
  x3 = "0.3",
  O3 = "messages",
  P3 = "0.3",
  A3 = _e.SIX_HOURS,
  T3 = "publisher",
  Cd = "irn",
  C3 = "error",
  Rd = "wss://relay.walletconnect.com",
  Xf = "wss://relay.walletconnect.org",
  R3 = "relayer",
  At = {
    message: "relayer_message",
    message_ack: "relayer_message_ack",
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error",
    connection_stalled: "relayer_connection_stalled",
    transport_closed: "relayer_transport_closed",
    publish: "relayer_publish",
  },
  N3 = "_subscription",
  os = {
    payload: "payload",
    connect: "connect",
    disconnect: "disconnect",
    error: "error",
  },
  $3 = _e.ONE_SECOND / 2,
  j3 = "2.9.2",
  D3 = 1e4,
  U3 = "0.3",
  F3 = "WALLETCONNECT_CLIENT_ID",
  ei = {
    created: "subscription_created",
    deleted: "subscription_deleted",
    expired: "subscription_expired",
    disabled: "subscription_disabled",
    sync: "subscription_sync",
    resubscribed: "subscription_resubscribed",
  },
  L3 = "subscription",
  M3 = "0.3",
  q3 = _e.FIVE_SECONDS * 1e3,
  z3 = "pairing",
  H3 = "0.3",
  as = {
    wc_pairingDelete: {
      req: { ttl: _e.ONE_DAY, prompt: !1, tag: 1e3 },
      res: { ttl: _e.ONE_DAY, prompt: !1, tag: 1001 },
    },
    wc_pairingPing: {
      req: { ttl: _e.THIRTY_SECONDS, prompt: !1, tag: 1002 },
      res: { ttl: _e.THIRTY_SECONDS, prompt: !1, tag: 1003 },
    },
    unregistered_method: {
      req: { ttl: _e.ONE_DAY, prompt: !1, tag: 0 },
      res: { ttl: _e.ONE_DAY, prompt: !1, tag: 0 },
    },
  },
  Zr = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync",
  },
  K3 = "history",
  B3 = "0.3",
  V3 = "expirer",
  Dr = {
    created: "expirer_created",
    deleted: "expirer_deleted",
    expired: "expirer_expired",
    sync: "expirer_sync",
  },
  k3 = "0.3",
  Lc = "verify-api",
  Qf = "https://verify.walletconnect.com";
class G3 {
  constructor(e, t) {
    (this.core = e),
      (this.logger = t),
      (this.keychain = new Map()),
      (this.name = I3),
      (this.version = x3),
      (this.initialized = !1),
      (this.storagePrefix = Ci),
      (this.init = async () => {
        if (!this.initialized) {
          const s = await this.getKeyChain();
          typeof s < "u" && (this.keychain = s), (this.initialized = !0);
        }
      }),
      (this.has = (s) => (this.isInitialized(), this.keychain.has(s))),
      (this.set = async (s, o) => {
        this.isInitialized(), this.keychain.set(s, o), await this.persist();
      }),
      (this.get = (s) => {
        this.isInitialized();
        const o = this.keychain.get(s);
        if (typeof o > "u") {
          const { message: c } = ue("NO_MATCHING_KEY", `${this.name}: ${s}`);
          throw new Error(c);
        }
        return o;
      }),
      (this.del = async (s) => {
        this.isInitialized(), this.keychain.delete(s), await this.persist();
      }),
      (this.core = e),
      (this.logger = Ze.generateChildLogger(t, this.name));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, nd(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? sd(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class W3 {
  constructor(e, t, s) {
    (this.core = e),
      (this.logger = t),
      (this.name = E3),
      (this.initialized = !1),
      (this.init = async () => {
        this.initialized ||
          (await this.keychain.init(), (this.initialized = !0));
      }),
      (this.hasKeys = (o) => (this.isInitialized(), this.keychain.has(o))),
      (this.getClientId = async () => {
        this.isInitialized();
        const o = await this.getClientSeed(),
          c = bf(o);
        return Kp(c.publicKey);
      }),
      (this.generateKeyPair = () => {
        this.isInitialized();
        const o = QE();
        return this.setPrivateKey(o.publicKey, o.privateKey);
      }),
      (this.signJWT = async (o) => {
        this.isInitialized();
        const c = await this.getClientSeed(),
          l = bf(c),
          p = pu();
        return await vE(p, o, S3, l);
      }),
      (this.generateSharedKey = (o, c, l) => {
        this.isInitialized();
        const p = this.getPrivateKey(o),
          _ = ZE(p, c);
        return this.setSymKey(_, l);
      }),
      (this.setSymKey = async (o, c) => {
        this.isInitialized();
        const l = c || e6(o);
        return await this.keychain.set(l, o), l;
      }),
      (this.deleteKeyPair = async (o) => {
        this.isInitialized(), await this.keychain.del(o);
      }),
      (this.deleteSymKey = async (o) => {
        this.isInitialized(), await this.keychain.del(o);
      }),
      (this.encode = async (o, c, l) => {
        this.isInitialized();
        const p = rd(l),
          _ = vs(c);
        if (Pf(p)) {
          const S = p.senderPublicKey,
            P = p.receiverPublicKey;
          o = await this.generateSharedKey(S, P);
        }
        const d = this.getSymKey(o),
          { type: w, senderPublicKey: A } = p;
        return r6({ type: w, symKey: d, message: _, senderPublicKey: A });
      }),
      (this.decode = async (o, c, l) => {
        this.isInitialized();
        const p = s6(c, l);
        if (Pf(p)) {
          const _ = p.receiverPublicKey,
            d = p.senderPublicKey;
          o = await this.generateSharedKey(_, d);
        }
        try {
          const _ = this.getSymKey(o),
            d = i6({ symKey: _, encoded: c });
          return xu(d);
        } catch (_) {
          this.logger.error(
            `Failed to decode message from topic: '${o}', clientId: '${await this.getClientId()}'`,
          ),
            this.logger.error(_);
        }
      }),
      (this.getPayloadType = (o) => {
        const c = Mo(o);
        return Ss(c.type);
      }),
      (this.getPayloadSenderPublicKey = (o) => {
        const c = Mo(o);
        return c.senderPublicKey ? cr(c.senderPublicKey, ar) : void 0;
      }),
      (this.core = e),
      (this.logger = Ze.generateChildLogger(t, this.name)),
      (this.keychain = s || new G3(this.core, this.logger));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(Jf);
    } catch {
      (e = pu()), await this.keychain.set(Jf, e);
    }
    return v3(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class Y3 extends ww {
  constructor(e, t) {
    super(e, t),
      (this.logger = e),
      (this.core = t),
      (this.messages = new Map()),
      (this.name = O3),
      (this.version = P3),
      (this.initialized = !1),
      (this.storagePrefix = Ci),
      (this.init = async () => {
        if (!this.initialized) {
          this.logger.trace("Initialized");
          try {
            const s = await this.getRelayerMessages();
            typeof s < "u" && (this.messages = s),
              this.logger.debug(
                `Successfully Restored records for ${this.name}`,
              ),
              this.logger.trace({
                type: "method",
                method: "restore",
                size: this.messages.size,
              });
          } catch (s) {
            this.logger.debug(`Failed to Restore records for ${this.name}`),
              this.logger.error(s);
          } finally {
            this.initialized = !0;
          }
        }
      }),
      (this.set = async (s, o) => {
        this.isInitialized();
        const c = Pn(o);
        let l = this.messages.get(s);
        return (
          typeof l > "u" && (l = {}),
          typeof l[c] < "u" ||
            ((l[c] = o), this.messages.set(s, l), await this.persist()),
          c
        );
      }),
      (this.get = (s) => {
        this.isInitialized();
        let o = this.messages.get(s);
        return typeof o > "u" && (o = {}), o;
      }),
      (this.has = (s, o) => {
        this.isInitialized();
        const c = this.get(s),
          l = Pn(o);
        return typeof c[l] < "u";
      }),
      (this.del = async (s) => {
        this.isInitialized(), this.messages.delete(s), await this.persist();
      }),
      (this.logger = Ze.generateChildLogger(e, this.name)),
      (this.core = t);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, nd(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? sd(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class J3 extends Ew {
  constructor(e, t) {
    super(e, t),
      (this.relayer = e),
      (this.logger = t),
      (this.events = new Fr.EventEmitter()),
      (this.name = T3),
      (this.queue = new Map()),
      (this.publishTimeout = _e.toMiliseconds(_e.TEN_SECONDS)),
      (this.queueTimeout = _e.toMiliseconds(_e.FIVE_SECONDS)),
      (this.needsTransportRestart = !1),
      (this.publish = async (s, o, c) => {
        this.logger.debug("Publishing Payload"),
          this.logger.trace({
            type: "method",
            method: "publish",
            params: { topic: s, message: o, opts: c },
          });
        try {
          const l = (c == null ? void 0 : c.ttl) || A3,
            p = du(c),
            _ = (c == null ? void 0 : c.prompt) || !1,
            d = (c == null ? void 0 : c.tag) || 0,
            w = (c == null ? void 0 : c.id) || qu().toString(),
            A = {
              topic: s,
              message: o,
              opts: { ttl: l, relay: p, prompt: _, tag: d, id: w },
            },
            S = setTimeout(() => this.queue.set(w, A), this.queueTimeout);
          try {
            await await qo(
              this.rpcPublish(s, o, l, p, _, d, w),
              this.publishTimeout,
            ),
              clearTimeout(S),
              this.relayer.events.emit(At.publish, A);
          } catch {
            this.logger.debug("Publishing Payload stalled"),
              (this.needsTransportRestart = !0);
            return;
          }
          this.logger.debug("Successfully Published Payload"),
            this.logger.trace({
              type: "method",
              method: "publish",
              params: { topic: s, message: o, opts: c },
            });
        } catch (l) {
          throw (
            (this.logger.debug("Failed to Publish Payload"),
            this.logger.error(l),
            l)
          );
        }
      }),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.relayer = e),
      (this.logger = Ze.generateChildLogger(t, this.name)),
      this.registerEventListeners();
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  rpcPublish(e, t, s, o, c, l, p) {
    var _, d, w, A;
    const S = {
      method: $o(o.protocol).publish,
      params: { topic: e, message: t, ttl: s, prompt: c, tag: l },
      id: p,
    };
    return (
      or((_ = S.params) == null ? void 0 : _.prompt) &&
        ((d = S.params) == null || delete d.prompt),
      or((w = S.params) == null ? void 0 : w.tag) &&
        ((A = S.params) == null || delete A.tag),
      this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "message", direction: "outgoing", request: S }),
      this.relayer.request(S)
    );
  }
  onPublish(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e) => {
      const { topic: t, message: s, opts: o } = e;
      await this.publish(t, s, o);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Cn.HEARTBEAT_EVENTS.pulse, () => {
      if (this.needsTransportRestart) {
        (this.needsTransportRestart = !1),
          this.relayer.events.emit(At.connection_stalled);
        return;
      }
      this.checkQueue();
    }),
      this.relayer.on(At.message_ack, (e) => {
        this.onPublish(e.id.toString());
      });
  }
}
class X3 {
  constructor() {
    (this.map = new Map()),
      (this.set = (e, t) => {
        const s = this.get(e);
        this.exists(e, t) || this.map.set(e, [...s, t]);
      }),
      (this.get = (e) => this.map.get(e) || []),
      (this.exists = (e, t) => this.get(e).includes(t)),
      (this.delete = (e, t) => {
        if (typeof t > "u") {
          this.map.delete(e);
          return;
        }
        if (!this.map.has(e)) return;
        const s = this.get(e);
        if (!this.exists(e, t)) return;
        const o = s.filter((c) => c !== t);
        if (!o.length) {
          this.map.delete(e);
          return;
        }
        this.map.set(e, o);
      }),
      (this.clear = () => {
        this.map.clear();
      });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var Q3 = Object.defineProperty,
  Z3 = Object.defineProperties,
  eI = Object.getOwnPropertyDescriptors,
  Zf = Object.getOwnPropertySymbols,
  tI = Object.prototype.hasOwnProperty,
  rI = Object.prototype.propertyIsEnumerable,
  ep = (i, e, t) =>
    e in i
      ? Q3(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  cs = (i, e) => {
    for (var t in e || (e = {})) tI.call(e, t) && ep(i, t, e[t]);
    if (Zf) for (var t of Zf(e)) rI.call(e, t) && ep(i, t, e[t]);
    return i;
  },
  Mc = (i, e) => Z3(i, eI(e));
class iI extends xw {
  constructor(e, t) {
    super(e, t),
      (this.relayer = e),
      (this.logger = t),
      (this.subscriptions = new Map()),
      (this.topicMap = new X3()),
      (this.events = new Fr.EventEmitter()),
      (this.name = L3),
      (this.version = M3),
      (this.pending = new Map()),
      (this.cached = []),
      (this.initialized = !1),
      (this.pendingSubscriptionWatchLabel = "pending_sub_watch_label"),
      (this.pollingInterval = 20),
      (this.storagePrefix = Ci),
      (this.subscribeTimeout = 1e4),
      (this.restartInProgress = !1),
      (this.batchSubscribeTopicsLimit = 500),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restart(),
          this.registerEventListeners(),
          this.onEnable(),
          (this.clientId = await this.relayer.core.crypto.getClientId()));
      }),
      (this.subscribe = async (s, o) => {
        await this.restartToComplete(),
          this.isInitialized(),
          this.logger.debug("Subscribing Topic"),
          this.logger.trace({
            type: "method",
            method: "subscribe",
            params: { topic: s, opts: o },
          });
        try {
          const c = du(o),
            l = { topic: s, relay: c };
          this.pending.set(s, l);
          const p = await this.rpcSubscribe(s, c);
          return (
            this.onSubscribe(p, l),
            this.logger.debug("Successfully Subscribed Topic"),
            this.logger.trace({
              type: "method",
              method: "subscribe",
              params: { topic: s, opts: o },
            }),
            p
          );
        } catch (c) {
          throw (
            (this.logger.debug("Failed to Subscribe Topic"),
            this.logger.error(c),
            c)
          );
        }
      }),
      (this.unsubscribe = async (s, o) => {
        await this.restartToComplete(),
          this.isInitialized(),
          typeof (o == null ? void 0 : o.id) < "u"
            ? await this.unsubscribeById(s, o.id, o)
            : await this.unsubscribeByTopic(s, o);
      }),
      (this.isSubscribed = async (s) =>
        this.topics.includes(s)
          ? !0
          : await new Promise((o, c) => {
              const l = new _e.Watch();
              l.start(this.pendingSubscriptionWatchLabel);
              const p = setInterval(() => {
                !this.pending.has(s) &&
                  this.topics.includes(s) &&
                  (clearInterval(p),
                  l.stop(this.pendingSubscriptionWatchLabel),
                  o(!0)),
                  l.elapsed(this.pendingSubscriptionWatchLabel) >= q3 &&
                    (clearInterval(p),
                    l.stop(this.pendingSubscriptionWatchLabel),
                    c(new Error("Subscription resolution timeout")));
              }, this.pollingInterval);
            }).catch(() => !1)),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.restart = async () => {
        (this.restartInProgress = !0),
          await this.restore(),
          await this.reset(),
          (this.restartInProgress = !1);
      }),
      (this.relayer = e),
      (this.logger = Ze.generateChildLogger(t, this.name)),
      (this.clientId = "");
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e, t) {
    let s = !1;
    try {
      s = this.getSubscription(e).topic === t;
    } catch {}
    return s;
  }
  onEnable() {
    (this.cached = []), (this.initialized = !0);
  }
  onDisable() {
    (this.cached = this.values),
      this.subscriptions.clear(),
      this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const s = this.topicMap.get(e);
    await Promise.all(s.map(async (o) => await this.unsubscribeById(e, o, t)));
  }
  async unsubscribeById(e, t, s) {
    this.logger.debug("Unsubscribing Topic"),
      this.logger.trace({
        type: "method",
        method: "unsubscribe",
        params: { topic: e, id: t, opts: s },
      });
    try {
      const o = du(s);
      await this.rpcUnsubscribe(e, t, o);
      const c = $t("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, c),
        this.logger.debug("Successfully Unsubscribed Topic"),
        this.logger.trace({
          type: "method",
          method: "unsubscribe",
          params: { topic: e, id: t, opts: s },
        });
    } catch (o) {
      throw (
        (this.logger.debug("Failed to Unsubscribe Topic"),
        this.logger.error(o),
        o)
      );
    }
  }
  async rpcSubscribe(e, t) {
    const s = { method: $o(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    try {
      await await qo(this.relayer.request(s), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Subscribe Payload stalled"),
        this.relayer.events.emit(At.connection_stalled);
    }
    return Pn(e + this.clientId);
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return;
    const t = e[0].relay,
      s = {
        method: $o(t.protocol).batchSubscribe,
        params: { topics: e.map((o) => o.topic) },
      };
    this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    try {
      return await await qo(this.relayer.request(s), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Payload stalled"),
        this.relayer.events.emit(At.connection_stalled);
    }
  }
  rpcUnsubscribe(e, t, s) {
    const o = {
      method: $o(s.protocol).unsubscribe,
      params: { topic: e, id: t },
    };
    return (
      this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "payload", direction: "outgoing", request: o }),
      this.relayer.request(o)
    );
  }
  onSubscribe(e, t) {
    this.setSubscription(e, Mc(cs({}, t), { id: e })),
      this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length &&
      e.forEach((t) => {
        this.setSubscription(t.id, cs({}, t)), this.pending.delete(t.topic);
      });
  }
  async onUnsubscribe(e, t, s) {
    this.events.removeAllListeners(t),
      this.hasSubscription(t, e) && this.deleteSubscription(t, s),
      await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.subscriptions.has(e) ||
      (this.logger.debug("Setting subscription"),
      this.logger.trace({
        type: "method",
        method: "setSubscription",
        id: e,
        subscription: t,
      }),
      this.addSubscription(e, t));
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, cs({}, t)),
      this.topicMap.set(t.topic, e),
      this.events.emit(ei.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"),
      this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: s } = ue("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"),
      this.logger.trace({
        type: "method",
        method: "deleteSubscription",
        id: e,
        reason: t,
      });
    const s = this.getSubscription(e);
    this.subscriptions.delete(e),
      this.topicMap.delete(s.topic, e),
      this.events.emit(ei.deleted, Mc(cs({}, s), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(ei.sync);
  }
  async reset() {
    if (this.cached.length) {
      const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let t = 0; t < e; t++) {
        const s = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(s);
      }
    }
    this.events.emit(ei.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size) {
        const { message: t } = ue("RESTORE_WILL_OVERRIDE", this.name);
        throw (
          (this.logger.error(t),
          this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),
          new Error(t))
        );
      }
      (this.cached = e),
        this.logger.debug(
          `Successfully Restored subscriptions for ${this.name}`,
        ),
        this.logger.trace({
          type: "method",
          method: "restore",
          subscriptions: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),
        this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    if (!e.length) return;
    const t = await this.rpcBatchSubscribe(e);
    ti(t) &&
      this.onBatchSubscribe(t.map((s, o) => Mc(cs({}, e[o]), { id: s })));
  }
  async onConnect() {
    this.restartInProgress || (await this.restart(), this.onEnable());
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (this.relayer.transportExplicitlyClosed) return;
    const e = [];
    this.pending.forEach((t) => {
      e.push(t);
    }),
      await this.batchSubscribe(e);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Cn.HEARTBEAT_EVENTS.pulse, async () => {
      await this.checkPending();
    }),
      this.relayer.on(At.connect, async () => {
        await this.onConnect();
      }),
      this.relayer.on(At.disconnect, () => {
        this.onDisconnect();
      }),
      this.events.on(ei.created, async (e) => {
        const t = ei.created;
        this.logger.info(`Emitting ${t}`),
          this.logger.debug({ type: "event", event: t, data: e }),
          await this.persist();
      }),
      this.events.on(ei.deleted, async (e) => {
        const t = ei.deleted;
        this.logger.info(`Emitting ${t}`),
          this.logger.debug({ type: "event", event: t, data: e }),
          await this.persist();
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete() {
    this.restartInProgress &&
      (await new Promise((e) => {
        const t = setInterval(() => {
          this.restartInProgress || (clearInterval(t), e());
        }, this.pollingInterval);
      }));
  }
}
var nI = Object.defineProperty,
  tp = Object.getOwnPropertySymbols,
  sI = Object.prototype.hasOwnProperty,
  oI = Object.prototype.propertyIsEnumerable,
  rp = (i, e, t) =>
    e in i
      ? nI(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  aI = (i, e) => {
    for (var t in e || (e = {})) sI.call(e, t) && rp(i, t, e[t]);
    if (tp) for (var t of tp(e)) oI.call(e, t) && rp(i, t, e[t]);
    return i;
  };
class cI extends Sw {
  constructor(e) {
    super(e),
      (this.protocol = "wc"),
      (this.version = 2),
      (this.events = new Fr.EventEmitter()),
      (this.name = R3),
      (this.transportExplicitlyClosed = !1),
      (this.initialized = !1),
      (this.reconnecting = !1),
      (this.connectionStatusPollingInterval = 20),
      (this.staleConnectionErrors = ["socket hang up", "socket stalled"]),
      (this.request = async (t) => {
        this.logger.debug("Publishing Request Payload");
        try {
          return (
            await this.toEstablishConnection(), await this.provider.request(t)
          );
        } catch (s) {
          throw (
            (this.logger.debug("Failed to Publish Request"),
            this.logger.error(s),
            s)
          );
        }
      }),
      (this.core = e.core),
      (this.logger =
        typeof e.logger < "u" && typeof e.logger != "string"
          ? Ze.generateChildLogger(e.logger, this.name)
          : Ze.pino(Ze.getDefaultLoggerOptions({ level: e.logger || C3 }))),
      (this.messages = new Y3(this.logger, e.core)),
      (this.subscriber = new iI(this, this.logger)),
      (this.publisher = new J3(this, this.logger)),
      (this.relayUrl = (e == null ? void 0 : e.relayUrl) || Rd),
      (this.projectId = e.projectId),
      (this.provider = {});
  }
  async init() {
    this.logger.trace("Initialized"),
      await this.createProvider(),
      await Promise.all([this.messages.init(), this.subscriber.init()]);
    try {
      await this.transportOpen();
    } catch {
      this.logger.warn(
        `Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${Xf}...`,
      ),
        await this.restartTransport(Xf);
    }
    this.registerEventListeners(),
      (this.initialized = !0),
      setTimeout(async () => {
        this.subscriber.topics.length === 0 &&
          (this.logger.info(
            "No topics subscribed to after init, closing transport",
          ),
          await this.transportClose(),
          (this.transportExplicitlyClosed = !1));
      }, D3);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get connected() {
    return this.provider.connection.connected;
  }
  get connecting() {
    return this.provider.connection.connecting;
  }
  async publish(e, t, s) {
    this.isInitialized(),
      await this.publisher.publish(e, t, s),
      await this.recordMessageEvent({
        topic: e,
        message: t,
        publishedAt: Date.now(),
      });
  }
  async subscribe(e, t) {
    var s;
    this.isInitialized();
    let o =
      ((s = this.subscriber.topicMap.get(e)) == null ? void 0 : s[0]) || "";
    return (
      o ||
      (await Promise.all([
        new Promise((c) => {
          this.subscriber.once(ei.created, (l) => {
            l.topic === e && c();
          });
        }),
        new Promise(async (c) => {
          (o = await this.subscriber.subscribe(e, t)), c();
        }),
      ]),
      o)
    );
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportClose() {
    (this.transportExplicitlyClosed = !0),
      this.connected &&
        (await this.provider.disconnect(),
        this.events.emit(At.transport_closed));
  }
  async transportOpen(e) {
    if (((this.transportExplicitlyClosed = !1), !this.reconnecting)) {
      (this.relayUrl = e || this.relayUrl), (this.reconnecting = !0);
      try {
        await Promise.all([
          new Promise((t) => {
            this.initialized || t(),
              this.subscriber.once(ei.resubscribed, () => {
                t();
              });
          }),
          await Promise.race([
            new Promise(async (t, s) => {
              await qo(
                this.provider.connect(),
                1e4,
                `Socket stalled when trying to connect to ${this.relayUrl}`,
              )
                .catch((o) => s(o))
                .then(() => t())
                .finally(() =>
                  this.removeListener(
                    At.transport_closed,
                    this.rejectTransportOpen,
                  ),
                );
            }),
            new Promise((t) =>
              this.once(At.transport_closed, this.rejectTransportOpen),
            ),
          ]),
        ]);
      } catch (t) {
        this.logger.error(t);
        const s = t;
        if (!this.isConnectionStalled(s.message)) throw t;
        this.events.emit(At.transport_closed);
      } finally {
        this.reconnecting = !1;
      }
    }
  }
  async restartTransport(e) {
    this.transportExplicitlyClosed ||
      this.reconnecting ||
      ((this.relayUrl = e || this.relayUrl),
      this.connected &&
        (await Promise.all([
          new Promise((t) => {
            this.provider.once(os.disconnect, () => {
              t();
            });
          }),
          this.transportClose(),
        ])),
      await this.createProvider(),
      await this.transportOpen());
  }
  isConnectionStalled(e) {
    return this.staleConnectionErrors.some((t) => e.includes(t));
  }
  rejectTransportOpen() {
    throw new Error(
      "Attempt to connect to relay via `transportOpen` has stalled. Retrying...",
    );
  }
  async createProvider() {
    const e = await this.core.crypto.signJWT(this.relayUrl);
    (this.provider = new Ni(
      new kS(
        _6({
          sdkVersion: j3,
          protocol: this.protocol,
          version: this.version,
          relayUrl: this.relayUrl,
          projectId: this.projectId,
          auth: e,
          useOnCloseEvent: !0,
        }),
      ),
    )),
      this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: t, message: s } = e;
    await this.messages.set(t, s);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: s } = e;
    if (!s || s.length === 0)
      return this.logger.debug(`Ignoring invalid/empty message: ${s}`), !0;
    if (!(await this.subscriber.isSubscribed(t)))
      return (
        this.logger.debug(`Ignoring message for non-subscribed topic ${t}`), !0
      );
    const o = this.messages.has(t, s);
    return o && this.logger.debug(`Ignoring duplicate message: ${s}`), o;
  }
  async onProviderPayload(e) {
    if (
      (this.logger.debug("Incoming Relay Payload"),
      this.logger.trace({ type: "payload", direction: "incoming", payload: e }),
      Hu(e))
    ) {
      if (!e.method.endsWith(N3)) return;
      const t = e.params,
        { topic: s, message: o, publishedAt: c } = t.data,
        l = { topic: s, message: o, publishedAt: c };
      this.logger.debug("Emitting Relayer Payload"),
        this.logger.trace(aI({ type: "event", event: t.id }, l)),
        this.events.emit(t.id, l),
        await this.acknowledgePayload(e),
        await this.onMessageEvent(l);
    } else ea(e) && this.events.emit(At.message_ack, e);
  }
  async onMessageEvent(e) {
    (await this.shouldIgnoreMessageEvent(e)) ||
      (this.events.emit(At.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const t = zu(e.id, !0);
    await this.provider.connection.send(t);
  }
  registerProviderListeners() {
    this.provider.on(os.payload, (e) => this.onProviderPayload(e)),
      this.provider.on(os.connect, () => {
        this.events.emit(At.connect);
      }),
      this.provider.on(os.disconnect, () => {
        this.onProviderDisconnect();
      }),
      this.provider.on(os.error, (e) => {
        this.logger.error(e), this.events.emit(At.error, e);
      });
  }
  registerEventListeners() {
    this.events.on(At.connection_stalled, async () => {
      await this.restartTransport();
    });
  }
  onProviderDisconnect() {
    this.events.emit(At.disconnect), this.attemptToReconnect();
  }
  attemptToReconnect() {
    this.transportExplicitlyClosed ||
      setTimeout(async () => {
        await this.restartTransport();
      }, _e.toMiliseconds($3));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (!this.connected) {
      if (this.connecting)
        return await new Promise((e) => {
          const t = setInterval(() => {
            this.connected && (clearInterval(t), e());
          }, this.connectionStatusPollingInterval);
        });
      await this.restartTransport();
    }
  }
}
var uI = Object.defineProperty,
  ip = Object.getOwnPropertySymbols,
  hI = Object.prototype.hasOwnProperty,
  lI = Object.prototype.propertyIsEnumerable,
  np = (i, e, t) =>
    e in i
      ? uI(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  sp = (i, e) => {
    for (var t in e || (e = {})) hI.call(e, t) && np(i, t, e[t]);
    if (ip) for (var t of ip(e)) lI.call(e, t) && np(i, t, e[t]);
    return i;
  };
class ra extends Iw {
  constructor(e, t, s, o = Ci, c = void 0) {
    super(e, t, s, o),
      (this.core = e),
      (this.logger = t),
      (this.name = s),
      (this.map = new Map()),
      (this.version = U3),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = Ci),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restore(),
          this.cached.forEach((l) => {
            this.getKey && l !== null && !or(l)
              ? this.map.set(this.getKey(l), l)
              : M6(l)
              ? this.map.set(l.id, l)
              : q6(l) && this.map.set(l.topic, l);
          }),
          (this.cached = []),
          (this.initialized = !0));
      }),
      (this.set = async (l, p) => {
        this.isInitialized(),
          this.map.has(l)
            ? await this.update(l, p)
            : (this.logger.debug("Setting value"),
              this.logger.trace({
                type: "method",
                method: "set",
                key: l,
                value: p,
              }),
              this.map.set(l, p),
              await this.persist());
      }),
      (this.get = (l) => (
        this.isInitialized(),
        this.logger.debug("Getting value"),
        this.logger.trace({ type: "method", method: "get", key: l }),
        this.getData(l)
      )),
      (this.getAll = (l) => (
        this.isInitialized(),
        l
          ? this.values.filter((p) =>
              Object.keys(l).every((_) => WS(p[_], l[_])),
            )
          : this.values
      )),
      (this.update = async (l, p) => {
        this.isInitialized(),
          this.logger.debug("Updating value"),
          this.logger.trace({
            type: "method",
            method: "update",
            key: l,
            update: p,
          });
        const _ = sp(sp({}, this.getData(l)), p);
        this.map.set(l, _), await this.persist();
      }),
      (this.delete = async (l, p) => {
        this.isInitialized(),
          this.map.has(l) &&
            (this.logger.debug("Deleting value"),
            this.logger.trace({
              type: "method",
              method: "delete",
              key: l,
              reason: p,
            }),
            this.map.delete(l),
            await this.persist());
      }),
      (this.logger = Ze.generateChildLogger(t, this.name)),
      (this.storagePrefix = o),
      (this.getKey = c);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      const { message: s } = ue("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw (this.logger.error(s), new Error(s));
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length) return;
      if (this.map.size) {
        const { message: t } = ue("RESTORE_WILL_OVERRIDE", this.name);
        throw (this.logger.error(t), new Error(t));
      }
      (this.cached = e),
        this.logger.debug(`Successfully Restored value for ${this.name}`),
        this.logger.trace({
          type: "method",
          method: "restore",
          value: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`),
        this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class fI {
  constructor(e, t) {
    (this.core = e),
      (this.logger = t),
      (this.name = z3),
      (this.version = H3),
      (this.events = new Iu()),
      (this.initialized = !1),
      (this.storagePrefix = Ci),
      (this.ignoredPayloadTypes = [tn]),
      (this.registeredMethods = []),
      (this.init = async () => {
        this.initialized ||
          (await this.pairings.init(),
          await this.cleanup(),
          this.registerRelayerEvents(),
          this.registerExpirerEvents(),
          (this.initialized = !0),
          this.logger.trace("Initialized"));
      }),
      (this.register = ({ methods: s }) => {
        this.isInitialized(),
          (this.registeredMethods = [
            ...new Set([...this.registeredMethods, ...s]),
          ]);
      }),
      (this.create = async () => {
        this.isInitialized();
        const s = pu(),
          o = await this.core.crypto.setSymKey(s),
          c = Br(_e.FIVE_MINUTES),
          l = { protocol: Cd },
          p = { topic: o, expiry: c, relay: l, active: !1 },
          _ = T6({
            protocol: this.core.protocol,
            version: this.core.version,
            topic: o,
            symKey: s,
            relay: l,
          });
        return (
          await this.pairings.set(o, p),
          await this.core.relayer.subscribe(o),
          this.core.expirer.set(o, c),
          { topic: o, uri: _ }
        );
      }),
      (this.pair = async (s) => {
        this.isInitialized(), this.isValidPair(s);
        const { topic: o, symKey: c, relay: l } = O6(s.uri);
        if (this.pairings.keys.includes(o))
          throw new Error(`Pairing already exists: ${o}`);
        if (this.core.crypto.hasKeys(o))
          throw new Error(`Keychain already exists: ${o}`);
        const p = Br(_e.FIVE_MINUTES),
          _ = { topic: o, relay: l, expiry: p, active: !1 };
        return (
          await this.pairings.set(o, _),
          await this.core.crypto.setSymKey(c, o),
          await this.core.relayer.subscribe(o, { relay: l }),
          this.core.expirer.set(o, p),
          s.activatePairing && (await this.activate({ topic: o })),
          _
        );
      }),
      (this.activate = async ({ topic: s }) => {
        this.isInitialized();
        const o = Br(_e.THIRTY_DAYS);
        await this.pairings.update(s, { active: !0, expiry: o }),
          this.core.expirer.set(s, o);
      }),
      (this.ping = async (s) => {
        this.isInitialized(), await this.isValidPing(s);
        const { topic: o } = s;
        if (this.pairings.keys.includes(o)) {
          const c = await this.sendRequest(o, "wc_pairingPing", {}),
            { done: l, resolve: p, reject: _ } = On();
          this.events.once(Ht("pairing_ping", c), ({ error: d }) => {
            d ? _(d) : p();
          }),
            await l();
        }
      }),
      (this.updateExpiry = async ({ topic: s, expiry: o }) => {
        this.isInitialized(), await this.pairings.update(s, { expiry: o });
      }),
      (this.updateMetadata = async ({ topic: s, metadata: o }) => {
        this.isInitialized(),
          await this.pairings.update(s, { peerMetadata: o });
      }),
      (this.getPairings = () => (this.isInitialized(), this.pairings.values)),
      (this.disconnect = async (s) => {
        this.isInitialized(), await this.isValidDisconnect(s);
        const { topic: o } = s;
        this.pairings.keys.includes(o) &&
          (await this.sendRequest(
            o,
            "wc_pairingDelete",
            $t("USER_DISCONNECTED"),
          ),
          await this.deletePairing(o));
      }),
      (this.sendRequest = async (s, o, c) => {
        const l = Qo(o, c),
          p = await this.core.crypto.encode(s, l),
          _ = as[o].req;
        return (
          this.core.history.set(s, l), this.core.relayer.publish(s, p, _), l.id
        );
      }),
      (this.sendResult = async (s, o, c) => {
        const l = zu(s, c),
          p = await this.core.crypto.encode(o, l),
          _ = await this.core.history.get(o, s),
          d = as[_.request.method].res;
        await this.core.relayer.publish(o, p, d),
          await this.core.history.resolve(l);
      }),
      (this.sendError = async (s, o, c) => {
        const l = Zo(s, c),
          p = await this.core.crypto.encode(o, l),
          _ = await this.core.history.get(o, s),
          d = as[_.request.method]
            ? as[_.request.method].res
            : as.unregistered_method.res;
        await this.core.relayer.publish(o, p, d),
          await this.core.history.resolve(l);
      }),
      (this.deletePairing = async (s, o) => {
        await this.core.relayer.unsubscribe(s),
          await Promise.all([
            this.pairings.delete(s, $t("USER_DISCONNECTED")),
            this.core.crypto.deleteSymKey(s),
            o ? Promise.resolve() : this.core.expirer.del(s),
          ]);
      }),
      (this.cleanup = async () => {
        const s = this.pairings.getAll().filter((o) => Ai(o.expiry));
        await Promise.all(s.map((o) => this.deletePairing(o.topic)));
      }),
      (this.onRelayEventRequest = (s) => {
        const { topic: o, payload: c } = s;
        switch (c.method) {
          case "wc_pairingPing":
            return this.onPairingPingRequest(o, c);
          case "wc_pairingDelete":
            return this.onPairingDeleteRequest(o, c);
          default:
            return this.onUnknownRpcMethodRequest(o, c);
        }
      }),
      (this.onRelayEventResponse = async (s) => {
        const { topic: o, payload: c } = s,
          l = (await this.core.history.get(o, c.id)).request.method;
        switch (l) {
          case "wc_pairingPing":
            return this.onPairingPingResponse(o, c);
          default:
            return this.onUnknownRpcMethodResponse(l);
        }
      }),
      (this.onPairingPingRequest = async (s, o) => {
        const { id: c } = o;
        try {
          this.isValidPing({ topic: s }),
            await this.sendResult(c, s, !0),
            this.events.emit("pairing_ping", { id: c, topic: s });
        } catch (l) {
          await this.sendError(c, s, l), this.logger.error(l);
        }
      }),
      (this.onPairingPingResponse = (s, o) => {
        const { id: c } = o;
        setTimeout(() => {
          _i(o)
            ? this.events.emit(Ht("pairing_ping", c), {})
            : Vr(o) &&
              this.events.emit(Ht("pairing_ping", c), { error: o.error });
        }, 500);
      }),
      (this.onPairingDeleteRequest = async (s, o) => {
        const { id: c } = o;
        try {
          this.isValidDisconnect({ topic: s }),
            await this.deletePairing(s),
            this.events.emit("pairing_delete", { id: c, topic: s });
        } catch (l) {
          await this.sendError(c, s, l), this.logger.error(l);
        }
      }),
      (this.onUnknownRpcMethodRequest = async (s, o) => {
        const { id: c, method: l } = o;
        try {
          if (this.registeredMethods.includes(l)) return;
          const p = $t("WC_METHOD_UNSUPPORTED", l);
          await this.sendError(c, s, p), this.logger.error(p);
        } catch (p) {
          await this.sendError(c, s, p), this.logger.error(p);
        }
      }),
      (this.onUnknownRpcMethodResponse = (s) => {
        this.registeredMethods.includes(s) ||
          this.logger.error($t("WC_METHOD_UNSUPPORTED", s));
      }),
      (this.isValidPair = (s) => {
        if (!gr(s)) {
          const { message: o } = ue(
            "MISSING_OR_INVALID",
            `pair() params: ${s}`,
          );
          throw new Error(o);
        }
        if (!L6(s.uri)) {
          const { message: o } = ue(
            "MISSING_OR_INVALID",
            `pair() uri: ${s.uri}`,
          );
          throw new Error(o);
        }
      }),
      (this.isValidPing = async (s) => {
        if (!gr(s)) {
          const { message: c } = ue(
            "MISSING_OR_INVALID",
            `ping() params: ${s}`,
          );
          throw new Error(c);
        }
        const { topic: o } = s;
        await this.isValidPairingTopic(o);
      }),
      (this.isValidDisconnect = async (s) => {
        if (!gr(s)) {
          const { message: c } = ue(
            "MISSING_OR_INVALID",
            `disconnect() params: ${s}`,
          );
          throw new Error(c);
        }
        const { topic: o } = s;
        await this.isValidPairingTopic(o);
      }),
      (this.isValidPairingTopic = async (s) => {
        if (!Gt(s, !1)) {
          const { message: o } = ue(
            "MISSING_OR_INVALID",
            `pairing topic should be a string: ${s}`,
          );
          throw new Error(o);
        }
        if (!this.pairings.keys.includes(s)) {
          const { message: o } = ue(
            "NO_MATCHING_KEY",
            `pairing topic doesn't exist: ${s}`,
          );
          throw new Error(o);
        }
        if (Ai(this.pairings.get(s).expiry)) {
          await this.deletePairing(s);
          const { message: o } = ue("EXPIRED", `pairing topic: ${s}`);
          throw new Error(o);
        }
      }),
      (this.core = e),
      (this.logger = Ze.generateChildLogger(t, this.name)),
      (this.pairings = new ra(
        this.core,
        this.logger,
        this.name,
        this.storagePrefix,
      ));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(At.message, async (e) => {
      const { topic: t, message: s } = e;
      if (
        !this.pairings.keys.includes(t) ||
        this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s))
      )
        return;
      const o = await this.core.crypto.decode(t, s);
      try {
        Hu(o)
          ? (this.core.history.set(t, o),
            this.onRelayEventRequest({ topic: t, payload: o }))
          : ea(o) &&
            (await this.core.history.resolve(o),
            await this.onRelayEventResponse({ topic: t, payload: o }),
            this.core.history.delete(t, o.id));
      } catch (c) {
        this.logger.error(c);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(Dr.expired, async (e) => {
      const { topic: t } = ad(e.target);
      t &&
        this.pairings.keys.includes(t) &&
        (await this.deletePairing(t, !0),
        this.events.emit("pairing_expire", { topic: t }));
    });
  }
}
class pI extends bw {
  constructor(e, t) {
    super(e, t),
      (this.core = e),
      (this.logger = t),
      (this.records = new Map()),
      (this.events = new Fr.EventEmitter()),
      (this.name = K3),
      (this.version = B3),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = Ci),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restore(),
          this.cached.forEach((s) => this.records.set(s.id, s)),
          (this.cached = []),
          this.registerEventListeners(),
          (this.initialized = !0));
      }),
      (this.set = (s, o, c) => {
        if (
          (this.isInitialized(),
          this.logger.debug("Setting JSON-RPC request history record"),
          this.logger.trace({
            type: "method",
            method: "set",
            topic: s,
            request: o,
            chainId: c,
          }),
          this.records.has(o.id))
        )
          return;
        const l = {
          id: o.id,
          topic: s,
          request: { method: o.method, params: o.params || null },
          chainId: c,
          expiry: Br(_e.THIRTY_DAYS),
        };
        this.records.set(l.id, l), this.events.emit(Zr.created, l);
      }),
      (this.resolve = async (s) => {
        if (
          (this.isInitialized(),
          this.logger.debug("Updating JSON-RPC response history record"),
          this.logger.trace({ type: "method", method: "update", response: s }),
          !this.records.has(s.id))
        )
          return;
        const o = await this.getRecord(s.id);
        typeof o.response > "u" &&
          ((o.response = Vr(s) ? { error: s.error } : { result: s.result }),
          this.records.set(o.id, o),
          this.events.emit(Zr.updated, o));
      }),
      (this.get = async (s, o) => (
        this.isInitialized(),
        this.logger.debug("Getting record"),
        this.logger.trace({ type: "method", method: "get", topic: s, id: o }),
        await this.getRecord(o)
      )),
      (this.delete = (s, o) => {
        this.isInitialized(),
          this.logger.debug("Deleting record"),
          this.logger.trace({ type: "method", method: "delete", id: o }),
          this.values.forEach((c) => {
            if (c.topic === s) {
              if (typeof o < "u" && c.id !== o) return;
              this.records.delete(c.id), this.events.emit(Zr.deleted, c);
            }
          });
      }),
      (this.exists = async (s, o) => (
        this.isInitialized(),
        this.records.has(o) ? (await this.getRecord(o)).topic === s : !1
      )),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.logger = Ze.generateChildLogger(t, this.name));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return (
      this.values.forEach((t) => {
        if (typeof t.response < "u") return;
        const s = {
          topic: t.topic,
          request: Qo(t.request.method, t.request.params, t.id),
          chainId: t.chainId,
        };
        return e.push(s);
      }),
      e
    );
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: s } = ue("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(Zr.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: t } = ue("RESTORE_WILL_OVERRIDE", this.name);
        throw (this.logger.error(t), new Error(t));
      }
      (this.cached = e),
        this.logger.debug(`Successfully Restored records for ${this.name}`),
        this.logger.trace({
          type: "method",
          method: "restore",
          records: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`),
        this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(Zr.created, (e) => {
      const t = Zr.created;
      this.logger.info(`Emitting ${t}`),
        this.logger.debug({ type: "event", event: t, record: e }),
        this.persist();
    }),
      this.events.on(Zr.updated, (e) => {
        const t = Zr.updated;
        this.logger.info(`Emitting ${t}`),
          this.logger.debug({ type: "event", event: t, record: e }),
          this.persist();
      }),
      this.events.on(Zr.deleted, (e) => {
        const t = Zr.deleted;
        this.logger.info(`Emitting ${t}`),
          this.logger.debug({ type: "event", event: t, record: e }),
          this.persist();
      }),
      this.core.heartbeat.on(Cn.HEARTBEAT_EVENTS.pulse, () => {
        this.cleanup();
      });
  }
  cleanup() {
    try {
      this.records.forEach((e) => {
        _e.toMiliseconds(e.expiry || 0) - Date.now() <= 0 &&
          (this.logger.info(`Deleting expired history log: ${e.id}`),
          this.delete(e.topic, e.id));
      });
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class dI extends Ow {
  constructor(e, t) {
    super(e, t),
      (this.core = e),
      (this.logger = t),
      (this.expirations = new Map()),
      (this.events = new Fr.EventEmitter()),
      (this.name = V3),
      (this.version = k3),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = Ci),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restore(),
          this.cached.forEach((s) => this.expirations.set(s.target, s)),
          (this.cached = []),
          this.registerEventListeners(),
          (this.initialized = !0));
      }),
      (this.has = (s) => {
        try {
          const o = this.formatTarget(s);
          return typeof this.getExpiration(o) < "u";
        } catch {
          return !1;
        }
      }),
      (this.set = (s, o) => {
        this.isInitialized();
        const c = this.formatTarget(s),
          l = { target: c, expiry: o };
        this.expirations.set(c, l),
          this.checkExpiry(c, l),
          this.events.emit(Dr.created, { target: c, expiration: l });
      }),
      (this.get = (s) => {
        this.isInitialized();
        const o = this.formatTarget(s);
        return this.getExpiration(o);
      }),
      (this.del = (s) => {
        if ((this.isInitialized(), this.has(s))) {
          const o = this.formatTarget(s),
            c = this.getExpiration(o);
          this.expirations.delete(o),
            this.events.emit(Dr.deleted, { target: o, expiration: c });
        }
      }),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.logger = Ze.generateChildLogger(t, this.name));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string") return y6(e);
    if (typeof e == "number") return v6(e);
    const { message: t } = ue("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(Dr.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: t } = ue("RESTORE_WILL_OVERRIDE", this.name);
        throw (this.logger.error(t), new Error(t));
      }
      (this.cached = e),
        this.logger.debug(`Successfully Restored expirations for ${this.name}`),
        this.logger.trace({
          type: "method",
          method: "restore",
          expirations: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`),
        this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: s } = ue("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw (this.logger.error(s), new Error(s));
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: s } = t;
    _e.toMiliseconds(s) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e),
      this.events.emit(Dr.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected &&
      this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(Cn.HEARTBEAT_EVENTS.pulse, () =>
      this.checkExpirations(),
    ),
      this.events.on(Dr.created, (e) => {
        const t = Dr.created;
        this.logger.info(`Emitting ${t}`),
          this.logger.debug({ type: "event", event: t, data: e }),
          this.persist();
      }),
      this.events.on(Dr.expired, (e) => {
        const t = Dr.expired;
        this.logger.info(`Emitting ${t}`),
          this.logger.debug({ type: "event", event: t, data: e }),
          this.persist();
      }),
      this.events.on(Dr.deleted, (e) => {
        const t = Dr.deleted;
        this.logger.info(`Emitting ${t}`),
          this.logger.debug({ type: "event", event: t, data: e }),
          this.persist();
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class gI extends Pw {
  constructor(e, t) {
    super(e, t),
      (this.projectId = e),
      (this.logger = t),
      (this.name = Lc),
      (this.initialized = !1),
      (this.init = async (s) => {
        id() ||
          !Du() ||
          ((this.verifyUrl = (s == null ? void 0 : s.verifyUrl) || Qf),
          await this.createIframe());
      }),
      (this.register = async (s) => {
        var o;
        if ((this.initialized || (await this.init()), !!this.iframe))
          try {
            (o = this.iframe.contentWindow) == null ||
              o.postMessage(s.attestationId, this.verifyUrl),
              this.logger.info(
                `postMessage sent: ${s.attestationId} ${this.verifyUrl}`,
              );
          } catch {}
      }),
      (this.resolve = async (s) => {
        var o;
        if (this.isDevEnv) return "";
        this.logger.info(`resolving attestation: ${s.attestationId}`);
        const c = this.startAbortTimer(_e.FIVE_SECONDS),
          l = await fetch(`${this.verifyUrl}/attestation/${s.attestationId}`, {
            signal: this.abortController.signal,
          });
        return (
          clearTimeout(c),
          l.status === 200
            ? (o = await l.json()) == null
              ? void 0
              : o.origin
            : ""
        );
      }),
      (this.createIframe = async () => {
        try {
          await Promise.race([
            new Promise((s, o) => {
              if (document.getElementById(Lc)) return s();
              const c = document.createElement("iframe");
              c.setAttribute("id", Lc),
                c.setAttribute("src", `${this.verifyUrl}/${this.projectId}`),
                (c.style.display = "none"),
                c.addEventListener("load", () => {
                  (this.initialized = !0), s();
                }),
                c.addEventListener("error", (l) => {
                  o(l);
                }),
                document.body.append(c),
                (this.iframe = c);
            }),
            new Promise((s) => {
              setTimeout(
                () => s("iframe load timeout"),
                _e.toMiliseconds(_e.ONE_SECOND / 2),
              );
            }),
          ]);
        } catch (s) {
          this.logger.error(`Verify iframe failed to load: ${this.verifyUrl}`),
            this.logger.error(s);
        }
      }),
      (this.logger = Ze.generateChildLogger(t, this.name)),
      (this.verifyUrl = Qf),
      (this.abortController = new AbortController()),
      (this.isDevEnv =
        ju() &&
        {
          TERM_PROGRAM: "vscode",
          NODE: "/opt/homebrew/Cellar/node/20.4.0/bin/node",
          INIT_CWD: "/Users/nemanjamijailovic/Desktop/react/nefentus",
          TERM: "xterm-256color",
          SHELL: "/bin/zsh",
          npm_config_metrics_registry: "https://registry.npmjs.org/",
          TMPDIR: "/var/folders/sf/_jxj1sq93p92nygnjzjz7wz40000gn/T/",
          npm_config_global_prefix: "/opt/homebrew",
          TERM_PROGRAM_VERSION: "1.83.1",
          ZDOTDIR: "/Users/nemanjamijailovic",
          ORIGINAL_XDG_CURRENT_DESKTOP: "undefined",
          MallocNanoZone: "0",
          COLOR: "1",
          npm_config_noproxy: "",
          npm_config_local_prefix:
            "/Users/nemanjamijailovic/Desktop/react/nefentus",
          USER: "nemanjamijailovic",
          COMMAND_MODE: "unix2003",
          npm_config_globalconfig: "/opt/homebrew/etc/npmrc",
          SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.v3QbEzlluP/Listeners",
          __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x0",
          npm_execpath: "/opt/homebrew/lib/node_modules/npm/bin/npm-cli.js",
          PATH: "/Users/nemanjamijailovic/Desktop/react/nefentus/node_modules/.bin:/Users/nemanjamijailovic/Desktop/react/node_modules/.bin:/Users/nemanjamijailovic/Desktop/node_modules/.bin:/Users/nemanjamijailovic/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/opt/homebrew/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/opt/homebrew/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin",
          npm_package_json:
            "/Users/nemanjamijailovic/Desktop/react/nefentus/package.json",
          _: "/Users/nemanjamijailovic/Desktop/react/nefentus/node_modules/.bin/vite",
          LaunchInstanceID: "40140A37-FB8D-43E2-921C-067ECA7C31B9",
          npm_config_userconfig: "/Users/nemanjamijailovic/.npmrc",
          npm_config_init_module: "/Users/nemanjamijailovic/.npm-init.js",
          USER_ZDOTDIR: "/Users/nemanjamijailovic",
          __CFBundleIdentifier: "com.microsoft.VSCode",
          npm_command: "run-script",
          PWD: "/Users/nemanjamijailovic/Desktop/react/nefentus",
          npm_lifecycle_event: "build",
          EDITOR: "vi",
          npm_package_name: "nefentus",
          LANG: "en_US.UTF-8",
          npm_config_npm_version: "9.7.2",
          VSCODE_GIT_ASKPASS_EXTRA_ARGS: "--ms-enable-electron-run-as-node",
          XPC_FLAGS: "0x0",
          npm_config_node_gyp:
            "/opt/homebrew/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",
          npm_package_version: "0.1.0",
          XPC_SERVICE_NAME: "0",
          VSCODE_INJECTION: "1",
          SHLVL: "2",
          HOME: "/Users/nemanjamijailovic",
          VSCODE_GIT_ASKPASS_MAIN:
            "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js",
          npm_config_cache: "/Users/nemanjamijailovic/.npm",
          LOGNAME: "nemanjamijailovic",
          npm_lifecycle_script: "vite build",
          VSCODE_GIT_IPC_HANDLE:
            "/var/folders/sf/_jxj1sq93p92nygnjzjz7wz40000gn/T/vscode-git-ae8730b21b.sock",
          npm_config_user_agent:
            "npm/9.7.2 node/v20.4.0 darwin arm64 workspaces/false",
          VSCODE_GIT_ASKPASS_NODE:
            "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)",
          GIT_ASKPASS:
            "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh",
          SECURITYSESSIONID: "186b4",
          npm_node_execpath: "/opt/homebrew/Cellar/node/20.4.0/bin/node",
          npm_config_prefix: "/opt/homebrew",
          COLORTERM: "truecolor",
          NODE_ENV: "production",
          VITE_REACT_APP_BASE_ENDPOINT_API: "https://api.nefentus.com/api",
          VITE_REACT_APP_GA_ID: "G-HRH664KZ9E",
          VITE_REACT_APP_RECAPTCHA_SITE_KEY:
            "6Leb6H8oAAAAAM0q25gltEqlMOUUymzoDobq4NLc",
          VITE_REACT_APP_SECRET_WORD: "AppNefentusSuperPuperSecretWord",
        }.IS_VITEST);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  startAbortTimer(e) {
    return setTimeout(() => this.abortController.abort(), _e.toMiliseconds(e));
  }
}
var _I = Object.defineProperty,
  op = Object.getOwnPropertySymbols,
  yI = Object.prototype.hasOwnProperty,
  vI = Object.prototype.propertyIsEnumerable,
  ap = (i, e, t) =>
    e in i
      ? _I(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  cp = (i, e) => {
    for (var t in e || (e = {})) yI.call(e, t) && ap(i, t, e[t]);
    if (op) for (var t of op(e)) vI.call(e, t) && ap(i, t, e[t]);
    return i;
  };
class Bu extends mw {
  constructor(e) {
    super(e),
      (this.protocol = Td),
      (this.version = m3),
      (this.name = Ku),
      (this.events = new Fr.EventEmitter()),
      (this.initialized = !1),
      (this.on = (s, o) => this.events.on(s, o)),
      (this.once = (s, o) => this.events.once(s, o)),
      (this.off = (s, o) => this.events.off(s, o)),
      (this.removeListener = (s, o) => this.events.removeListener(s, o)),
      (this.projectId = e == null ? void 0 : e.projectId),
      (this.relayUrl = (e == null ? void 0 : e.relayUrl) || Rd);
    const t =
      typeof (e == null ? void 0 : e.logger) < "u" &&
      typeof (e == null ? void 0 : e.logger) != "string"
        ? e.logger
        : Ze.pino(
            Ze.getDefaultLoggerOptions({
              level: (e == null ? void 0 : e.logger) || b3.logger,
            }),
          );
    (this.logger = Ze.generateChildLogger(t, this.name)),
      (this.heartbeat = new Cn.HeartBeat()),
      (this.crypto = new W3(
        this,
        this.logger,
        e == null ? void 0 : e.keychain,
      )),
      (this.history = new pI(this, this.logger)),
      (this.expirer = new dI(this, this.logger)),
      (this.storage =
        e != null && e.storage
          ? e.storage
          : new Ym(cp(cp({}, w3), e == null ? void 0 : e.storageOptions))),
      (this.relayer = new cI({
        core: this,
        logger: this.logger,
        relayUrl: this.relayUrl,
        projectId: this.projectId,
      })),
      (this.pairing = new fI(this, this.logger)),
      (this.verify = new gI(this.projectId || "", this.logger));
  }
  static async init(e) {
    const t = new Bu(e);
    await t.initialize();
    const s = await t.crypto.getClientId();
    return await t.storage.setItem(F3, s), t;
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  async start() {
    this.initialized || (await this.initialize());
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(),
        await this.history.init(),
        await this.expirer.init(),
        await this.relayer.init(),
        await this.heartbeat.init(),
        await this.pairing.init(),
        (this.initialized = !0),
        this.logger.info("Core Initialization Success");
    } catch (e) {
      throw (
        (this.logger.warn(
          `Core Initialization Failure at epoch ${Date.now()}`,
          e,
        ),
        this.logger.error(e.message),
        e)
      );
    }
  }
}
const mI = Bu,
  Nd = "wc",
  $d = 2,
  jd = "client",
  Vu = `${Nd}@${$d}:${jd}:`,
  qc = {
    name: jd,
    logger: "error",
    controller: !1,
    relayUrl: "wss://relay.walletconnect.com",
  },
  up = "WALLETCONNECT_DEEPLINK_CHOICE",
  bI = "proposal",
  Dd = "Proposal expired",
  wI = "session",
  Co = _e.SEVEN_DAYS,
  EI = "engine",
  us = {
    wc_sessionPropose: {
      req: { ttl: _e.FIVE_MINUTES, prompt: !0, tag: 1100 },
      res: { ttl: _e.FIVE_MINUTES, prompt: !1, tag: 1101 },
    },
    wc_sessionSettle: {
      req: { ttl: _e.FIVE_MINUTES, prompt: !1, tag: 1102 },
      res: { ttl: _e.FIVE_MINUTES, prompt: !1, tag: 1103 },
    },
    wc_sessionUpdate: {
      req: { ttl: _e.ONE_DAY, prompt: !1, tag: 1104 },
      res: { ttl: _e.ONE_DAY, prompt: !1, tag: 1105 },
    },
    wc_sessionExtend: {
      req: { ttl: _e.ONE_DAY, prompt: !1, tag: 1106 },
      res: { ttl: _e.ONE_DAY, prompt: !1, tag: 1107 },
    },
    wc_sessionRequest: {
      req: { ttl: _e.FIVE_MINUTES, prompt: !0, tag: 1108 },
      res: { ttl: _e.FIVE_MINUTES, prompt: !1, tag: 1109 },
    },
    wc_sessionEvent: {
      req: { ttl: _e.FIVE_MINUTES, prompt: !0, tag: 1110 },
      res: { ttl: _e.FIVE_MINUTES, prompt: !1, tag: 1111 },
    },
    wc_sessionDelete: {
      req: { ttl: _e.ONE_DAY, prompt: !1, tag: 1112 },
      res: { ttl: _e.ONE_DAY, prompt: !1, tag: 1113 },
    },
    wc_sessionPing: {
      req: { ttl: _e.THIRTY_SECONDS, prompt: !1, tag: 1114 },
      res: { ttl: _e.THIRTY_SECONDS, prompt: !1, tag: 1115 },
    },
  },
  zc = { min: _e.FIVE_MINUTES, max: _e.SEVEN_DAYS },
  hs = { idle: "idle", active: "active" },
  SI = "request",
  II = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest"];
var xI = Object.defineProperty,
  OI = Object.defineProperties,
  PI = Object.getOwnPropertyDescriptors,
  hp = Object.getOwnPropertySymbols,
  AI = Object.prototype.hasOwnProperty,
  TI = Object.prototype.propertyIsEnumerable,
  lp = (i, e, t) =>
    e in i
      ? xI(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  jr = (i, e) => {
    for (var t in e || (e = {})) AI.call(e, t) && lp(i, t, e[t]);
    if (hp) for (var t of hp(e)) TI.call(e, t) && lp(i, t, e[t]);
    return i;
  },
  Hc = (i, e) => OI(i, PI(e));
class CI extends Tw {
  constructor(e) {
    super(e),
      (this.name = EI),
      (this.events = new Iu()),
      (this.initialized = !1),
      (this.ignoredPayloadTypes = [tn]),
      (this.requestQueue = { state: hs.idle, requests: [] }),
      (this.requestQueueDelay = _e.ONE_SECOND),
      (this.init = async () => {
        this.initialized ||
          (await this.cleanup(),
          this.registerRelayerEvents(),
          this.registerExpirerEvents(),
          this.client.core.pairing.register({ methods: Object.keys(us) }),
          (this.initialized = !0),
          setTimeout(() => {
            (this.requestQueue.requests = this.getPendingSessionRequests()),
              this.processRequestQueue();
          }, _e.toMiliseconds(this.requestQueueDelay)));
      }),
      (this.connect = async (t) => {
        this.isInitialized();
        const s = Hc(jr({}, t), {
          requiredNamespaces: t.requiredNamespaces || {},
          optionalNamespaces: t.optionalNamespaces || {},
        });
        await this.isValidConnect(s);
        const {
          pairingTopic: o,
          requiredNamespaces: c,
          optionalNamespaces: l,
          sessionProperties: p,
          relays: _,
        } = s;
        let d = o,
          w,
          A = !1;
        if (
          (d && (A = this.client.core.pairing.pairings.get(d).active), !d || !A)
        ) {
          const { topic: F, uri: x } = await this.client.core.pairing.create();
          (d = F), (w = x);
        }
        const S = await this.client.core.crypto.generateKeyPair(),
          P = jr(
            {
              requiredNamespaces: c,
              optionalNamespaces: l,
              relays: _ ?? [{ protocol: Cd }],
              proposer: { publicKey: S, metadata: this.client.metadata },
            },
            p && { sessionProperties: p },
          ),
          { reject: M, resolve: K, done: B } = On(_e.FIVE_MINUTES, Dd);
        if (
          (this.events.once(
            Ht("session_connect"),
            async ({ error: F, session: x }) => {
              if (F) M(F);
              else if (x) {
                x.self.publicKey = S;
                const C = Hc(jr({}, x), {
                  requiredNamespaces: x.requiredNamespaces,
                  optionalNamespaces: x.optionalNamespaces,
                });
                await this.client.session.set(x.topic, C),
                  await this.setExpiry(x.topic, x.expiry),
                  d &&
                    (await this.client.core.pairing.updateMetadata({
                      topic: d,
                      metadata: x.peer.metadata,
                    })),
                  K(C);
              }
            },
          ),
          !d)
        ) {
          const { message: F } = ue(
            "NO_MATCHING_KEY",
            `connect() pairing topic: ${d}`,
          );
          throw new Error(F);
        }
        const oe = await this.sendRequest(d, "wc_sessionPropose", P),
          N = Br(_e.FIVE_MINUTES);
        return (
          await this.setProposal(oe, jr({ id: oe, expiry: N }, P)),
          { uri: w, approval: B }
        );
      }),
      (this.pair = async (t) => (
        this.isInitialized(), await this.client.core.pairing.pair(t)
      )),
      (this.approve = async (t) => {
        this.isInitialized(), await this.isValidApprove(t);
        const {
            id: s,
            relayProtocol: o,
            namespaces: c,
            sessionProperties: l,
          } = t,
          p = this.client.proposal.get(s);
        let {
          pairingTopic: _,
          proposer: d,
          requiredNamespaces: w,
          optionalNamespaces: A,
        } = p;
        (_ = _ || ""), An(w) || (w = $6(c, "approve()"));
        const S = await this.client.core.crypto.generateKeyPair(),
          P = d.publicKey,
          M = await this.client.core.crypto.generateSharedKey(S, P);
        _ &&
          s &&
          (await this.client.core.pairing.updateMetadata({
            topic: _,
            metadata: d.metadata,
          }),
          await this.sendResult(s, _, {
            relay: { protocol: o ?? "irn" },
            responderPublicKey: S,
          }),
          await this.client.proposal.delete(s, $t("USER_DISCONNECTED")),
          await this.client.core.pairing.activate({ topic: _ }));
        const K = jr(
          {
            relay: { protocol: o ?? "irn" },
            namespaces: c,
            requiredNamespaces: w,
            optionalNamespaces: A,
            pairingTopic: _,
            controller: { publicKey: S, metadata: this.client.metadata },
            expiry: Br(Co),
          },
          l && { sessionProperties: l },
        );
        await this.client.core.relayer.subscribe(M),
          await this.sendRequest(M, "wc_sessionSettle", K);
        const B = Hc(jr({}, K), {
          topic: M,
          pairingTopic: _,
          acknowledged: !1,
          self: K.controller,
          peer: { publicKey: d.publicKey, metadata: d.metadata },
          controller: S,
        });
        return (
          await this.client.session.set(M, B),
          await this.setExpiry(M, Br(Co)),
          {
            topic: M,
            acknowledged: () =>
              new Promise((oe) =>
                setTimeout(() => oe(this.client.session.get(M)), 500),
              ),
          }
        );
      }),
      (this.reject = async (t) => {
        this.isInitialized(), await this.isValidReject(t);
        const { id: s, reason: o } = t,
          { pairingTopic: c } = this.client.proposal.get(s);
        c &&
          (await this.sendError(s, c, o),
          await this.client.proposal.delete(s, $t("USER_DISCONNECTED")));
      }),
      (this.update = async (t) => {
        this.isInitialized(), await this.isValidUpdate(t);
        const { topic: s, namespaces: o } = t,
          c = await this.sendRequest(s, "wc_sessionUpdate", { namespaces: o }),
          { done: l, resolve: p, reject: _ } = On();
        return (
          this.events.once(Ht("session_update", c), ({ error: d }) => {
            d ? _(d) : p();
          }),
          await this.client.session.update(s, { namespaces: o }),
          { acknowledged: l }
        );
      }),
      (this.extend = async (t) => {
        this.isInitialized(), await this.isValidExtend(t);
        const { topic: s } = t,
          o = await this.sendRequest(s, "wc_sessionExtend", {}),
          { done: c, resolve: l, reject: p } = On();
        return (
          this.events.once(Ht("session_extend", o), ({ error: _ }) => {
            _ ? p(_) : l();
          }),
          await this.setExpiry(s, Br(Co)),
          { acknowledged: c }
        );
      }),
      (this.request = async (t) => {
        this.isInitialized(), await this.isValidRequest(t);
        const { chainId: s, request: o, topic: c, expiry: l } = t,
          p = await this.sendRequest(
            c,
            "wc_sessionRequest",
            { request: o, chainId: s },
            l,
          ),
          { done: _, resolve: d, reject: w } = On(l);
        this.events.once(
          Ht("session_request", p),
          ({ error: S, result: P }) => {
            S ? w(S) : d(P);
          },
        ),
          this.client.events.emit("session_request_sent", {
            topic: c,
            request: o,
            chainId: s,
            id: p,
          });
        const A = await this.client.core.storage.getItem(up);
        return m6({ id: p, topic: c, wcDeepLink: A }), await _();
      }),
      (this.respond = async (t) => {
        this.isInitialized(), await this.isValidRespond(t);
        const { topic: s, response: o } = t,
          { id: c } = o;
        _i(o)
          ? await this.sendResult(c, s, o.result)
          : Vr(o) && (await this.sendError(c, s, o.error)),
          this.cleanupAfterResponse(t);
      }),
      (this.ping = async (t) => {
        this.isInitialized(), await this.isValidPing(t);
        const { topic: s } = t;
        if (this.client.session.keys.includes(s)) {
          const o = await this.sendRequest(s, "wc_sessionPing", {}),
            { done: c, resolve: l, reject: p } = On();
          this.events.once(Ht("session_ping", o), ({ error: _ }) => {
            _ ? p(_) : l();
          }),
            await c();
        } else
          this.client.core.pairing.pairings.keys.includes(s) &&
            (await this.client.core.pairing.ping({ topic: s }));
      }),
      (this.emit = async (t) => {
        this.isInitialized(), await this.isValidEmit(t);
        const { topic: s, event: o, chainId: c } = t;
        await this.sendRequest(s, "wc_sessionEvent", { event: o, chainId: c });
      }),
      (this.disconnect = async (t) => {
        this.isInitialized(), await this.isValidDisconnect(t);
        const { topic: s } = t;
        if (this.client.session.keys.includes(s)) {
          const o = qu().toString();
          let c;
          const l = (p) => {
            (p == null ? void 0 : p.id.toString()) === o &&
              (this.client.core.relayer.events.removeListener(
                At.message_ack,
                l,
              ),
              c());
          };
          await Promise.all([
            new Promise((p) => {
              (c = p), this.client.core.relayer.on(At.message_ack, l);
            }),
            this.sendRequest(
              s,
              "wc_sessionDelete",
              $t("USER_DISCONNECTED"),
              void 0,
              o,
            ),
          ]),
            await this.deleteSession(s);
        } else await this.client.core.pairing.disconnect({ topic: s });
      }),
      (this.find = (t) => (
        this.isInitialized(),
        this.client.session.getAll().filter((s) => U6(s, t))
      )),
      (this.getPendingSessionRequests = () => (
        this.isInitialized(), this.client.pendingRequest.getAll()
      )),
      (this.cleanupDuplicatePairings = async (t) => {
        if (t.pairingTopic)
          try {
            const s = this.client.core.pairing.pairings.get(t.pairingTopic),
              o = this.client.core.pairing.pairings.getAll().filter((c) => {
                var l, p;
                return (
                  ((l = c.peerMetadata) == null ? void 0 : l.url) &&
                  ((p = c.peerMetadata) == null ? void 0 : p.url) ===
                    t.peer.metadata.url &&
                  c.topic &&
                  c.topic !== s.topic
                );
              });
            if (o.length === 0) return;
            this.client.logger.info(
              `Cleaning up ${o.length} duplicate pairing(s)`,
            ),
              await Promise.all(
                o.map((c) =>
                  this.client.core.pairing.disconnect({ topic: c.topic }),
                ),
              ),
              this.client.logger.info("Duplicate pairings clean up finished");
          } catch (s) {
            this.client.logger.error(s);
          }
      }),
      (this.deleteSession = async (t, s) => {
        const { self: o } = this.client.session.get(t);
        await this.client.core.relayer.unsubscribe(t),
          this.client.session.delete(t, $t("USER_DISCONNECTED")),
          this.client.core.crypto.keychain.has(o.publicKey) &&
            (await this.client.core.crypto.deleteKeyPair(o.publicKey)),
          this.client.core.crypto.keychain.has(t) &&
            (await this.client.core.crypto.deleteSymKey(t)),
          s || this.client.core.expirer.del(t),
          this.client.core.storage
            .removeItem(up)
            .catch((c) => this.client.logger.warn(c));
      }),
      (this.deleteProposal = async (t, s) => {
        await Promise.all([
          this.client.proposal.delete(t, $t("USER_DISCONNECTED")),
          s ? Promise.resolve() : this.client.core.expirer.del(t),
        ]);
      }),
      (this.deletePendingSessionRequest = async (t, s, o = !1) => {
        await Promise.all([
          this.client.pendingRequest.delete(t, s),
          o ? Promise.resolve() : this.client.core.expirer.del(t),
        ]),
          (this.requestQueue.requests = this.requestQueue.requests.filter(
            (c) => c.id !== t,
          )),
          o && (this.requestQueue.state = hs.idle);
      }),
      (this.setExpiry = async (t, s) => {
        this.client.session.keys.includes(t) &&
          (await this.client.session.update(t, { expiry: s })),
          this.client.core.expirer.set(t, s);
      }),
      (this.setProposal = async (t, s) => {
        await this.client.proposal.set(t, s),
          this.client.core.expirer.set(t, s.expiry);
      }),
      (this.setPendingSessionRequest = async (t) => {
        const s = us.wc_sessionRequest.req.ttl,
          { id: o, topic: c, params: l } = t;
        await this.client.pendingRequest.set(o, { id: o, topic: c, params: l }),
          s && this.client.core.expirer.set(o, Br(s));
      }),
      (this.sendRequest = async (t, s, o, c, l) => {
        const p = Qo(s, o);
        if (Du() && II.includes(s)) {
          const w = Pn(JSON.stringify(p));
          await this.client.core.verify.register({ attestationId: w });
        }
        const _ = await this.client.core.crypto.encode(t, p),
          d = us[s].req;
        return (
          c && (d.ttl = c),
          l && (d.id = l),
          this.client.core.history.set(t, p),
          this.client.core.relayer.publish(t, _, d),
          p.id
        );
      }),
      (this.sendResult = async (t, s, o) => {
        const c = zu(t, o),
          l = await this.client.core.crypto.encode(s, c),
          p = await this.client.core.history.get(s, t),
          _ = us[p.request.method].res;
        this.client.core.relayer.publish(s, l, _),
          await this.client.core.history.resolve(c);
      }),
      (this.sendError = async (t, s, o) => {
        const c = Zo(t, o),
          l = await this.client.core.crypto.encode(s, c),
          p = await this.client.core.history.get(s, t),
          _ = us[p.request.method].res;
        this.client.core.relayer.publish(s, l, _),
          await this.client.core.history.resolve(c);
      }),
      (this.cleanup = async () => {
        const t = [],
          s = [];
        this.client.session.getAll().forEach((o) => {
          Ai(o.expiry) && t.push(o.topic);
        }),
          this.client.proposal.getAll().forEach((o) => {
            Ai(o.expiry) && s.push(o.id);
          }),
          await Promise.all([
            ...t.map((o) => this.deleteSession(o)),
            ...s.map((o) => this.deleteProposal(o)),
          ]);
      }),
      (this.onRelayEventRequest = (t) => {
        const { topic: s, payload: o } = t,
          c = o.method;
        switch (c) {
          case "wc_sessionPropose":
            return this.onSessionProposeRequest(s, o);
          case "wc_sessionSettle":
            return this.onSessionSettleRequest(s, o);
          case "wc_sessionUpdate":
            return this.onSessionUpdateRequest(s, o);
          case "wc_sessionExtend":
            return this.onSessionExtendRequest(s, o);
          case "wc_sessionPing":
            return this.onSessionPingRequest(s, o);
          case "wc_sessionDelete":
            return this.onSessionDeleteRequest(s, o);
          case "wc_sessionRequest":
            return this.onSessionRequest(s, o);
          case "wc_sessionEvent":
            return this.onSessionEventRequest(s, o);
          default:
            return this.client.logger.info(`Unsupported request method ${c}`);
        }
      }),
      (this.onRelayEventResponse = async (t) => {
        const { topic: s, payload: o } = t,
          c = (await this.client.core.history.get(s, o.id)).request.method;
        switch (c) {
          case "wc_sessionPropose":
            return this.onSessionProposeResponse(s, o);
          case "wc_sessionSettle":
            return this.onSessionSettleResponse(s, o);
          case "wc_sessionUpdate":
            return this.onSessionUpdateResponse(s, o);
          case "wc_sessionExtend":
            return this.onSessionExtendResponse(s, o);
          case "wc_sessionPing":
            return this.onSessionPingResponse(s, o);
          case "wc_sessionRequest":
            return this.onSessionRequestResponse(s, o);
          default:
            return this.client.logger.info(`Unsupported response method ${c}`);
        }
      }),
      (this.onRelayEventUnknownPayload = (t) => {
        const { topic: s } = t,
          { message: o } = ue(
            "MISSING_OR_INVALID",
            `Decoded payload on topic ${s} is not identifiable as a JSON-RPC request or a response.`,
          );
        throw new Error(o);
      }),
      (this.onSessionProposeRequest = async (t, s) => {
        const { params: o, id: c } = s;
        try {
          this.isValidConnect(jr({}, s.params));
          const l = Br(_e.FIVE_MINUTES),
            p = jr({ id: c, pairingTopic: t, expiry: l }, o);
          await this.setProposal(c, p);
          const _ = Pn(JSON.stringify(s)),
            d = await this.getVerifyContext(_, p.proposer.metadata);
          this.client.events.emit("session_proposal", {
            id: c,
            params: p,
            verifyContext: d,
          });
        } catch (l) {
          await this.sendError(c, t, l), this.client.logger.error(l);
        }
      }),
      (this.onSessionProposeResponse = async (t, s) => {
        const { id: o } = s;
        if (_i(s)) {
          const { result: c } = s;
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            result: c,
          });
          const l = this.client.proposal.get(o);
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            proposal: l,
          });
          const p = l.proposer.publicKey;
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            selfPublicKey: p,
          });
          const _ = c.responderPublicKey;
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            peerPublicKey: _,
          });
          const d = await this.client.core.crypto.generateSharedKey(p, _);
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            sessionTopic: d,
          });
          const w = await this.client.core.relayer.subscribe(d);
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            subscriptionId: w,
          }),
            await this.client.core.pairing.activate({ topic: t });
        } else
          Vr(s) &&
            (await this.client.proposal.delete(o, $t("USER_DISCONNECTED")),
            this.events.emit(Ht("session_connect"), { error: s.error }));
      }),
      (this.onSessionSettleRequest = async (t, s) => {
        const { id: o, params: c } = s;
        try {
          this.isValidSessionSettleRequest(c);
          const {
              relay: l,
              controller: p,
              expiry: _,
              namespaces: d,
              requiredNamespaces: w,
              optionalNamespaces: A,
              sessionProperties: S,
              pairingTopic: P,
            } = s.params,
            M = jr(
              {
                topic: t,
                relay: l,
                expiry: _,
                namespaces: d,
                acknowledged: !0,
                pairingTopic: P,
                requiredNamespaces: w,
                optionalNamespaces: A,
                controller: p.publicKey,
                self: { publicKey: "", metadata: this.client.metadata },
                peer: { publicKey: p.publicKey, metadata: p.metadata },
              },
              S && { sessionProperties: S },
            );
          await this.sendResult(s.id, t, !0),
            this.events.emit(Ht("session_connect"), { session: M }),
            this.cleanupDuplicatePairings(M);
        } catch (l) {
          await this.sendError(o, t, l), this.client.logger.error(l);
        }
      }),
      (this.onSessionSettleResponse = async (t, s) => {
        const { id: o } = s;
        _i(s)
          ? (await this.client.session.update(t, { acknowledged: !0 }),
            this.events.emit(Ht("session_approve", o), {}))
          : Vr(s) &&
            (await this.client.session.delete(t, $t("USER_DISCONNECTED")),
            this.events.emit(Ht("session_approve", o), { error: s.error }));
      }),
      (this.onSessionUpdateRequest = async (t, s) => {
        const { params: o, id: c } = s;
        try {
          this.isValidUpdate(jr({ topic: t }, o)),
            await this.client.session.update(t, { namespaces: o.namespaces }),
            await this.sendResult(c, t, !0),
            this.client.events.emit("session_update", {
              id: c,
              topic: t,
              params: o,
            });
        } catch (l) {
          await this.sendError(c, t, l), this.client.logger.error(l);
        }
      }),
      (this.onSessionUpdateResponse = (t, s) => {
        const { id: o } = s;
        _i(s)
          ? this.events.emit(Ht("session_update", o), {})
          : Vr(s) &&
            this.events.emit(Ht("session_update", o), { error: s.error });
      }),
      (this.onSessionExtendRequest = async (t, s) => {
        const { id: o } = s;
        try {
          this.isValidExtend({ topic: t }),
            await this.setExpiry(t, Br(Co)),
            await this.sendResult(o, t, !0),
            this.client.events.emit("session_extend", { id: o, topic: t });
        } catch (c) {
          await this.sendError(o, t, c), this.client.logger.error(c);
        }
      }),
      (this.onSessionExtendResponse = (t, s) => {
        const { id: o } = s;
        _i(s)
          ? this.events.emit(Ht("session_extend", o), {})
          : Vr(s) &&
            this.events.emit(Ht("session_extend", o), { error: s.error });
      }),
      (this.onSessionPingRequest = async (t, s) => {
        const { id: o } = s;
        try {
          this.isValidPing({ topic: t }),
            await this.sendResult(o, t, !0),
            this.client.events.emit("session_ping", { id: o, topic: t });
        } catch (c) {
          await this.sendError(o, t, c), this.client.logger.error(c);
        }
      }),
      (this.onSessionPingResponse = (t, s) => {
        const { id: o } = s;
        setTimeout(() => {
          _i(s)
            ? this.events.emit(Ht("session_ping", o), {})
            : Vr(s) &&
              this.events.emit(Ht("session_ping", o), { error: s.error });
        }, 500);
      }),
      (this.onSessionDeleteRequest = async (t, s) => {
        const { id: o } = s;
        try {
          this.isValidDisconnect({ topic: t, reason: s.params }),
            await Promise.all([
              new Promise((c) => {
                this.client.core.relayer.once(At.publish, async () => {
                  c(await this.deleteSession(t));
                });
              }),
              this.sendResult(o, t, !0),
            ]),
            this.client.events.emit("session_delete", { id: o, topic: t });
        } catch (c) {
          this.client.logger.error(c);
        }
      }),
      (this.onSessionRequest = async (t, s) => {
        const { id: o, params: c } = s;
        try {
          this.isValidRequest(jr({ topic: t }, c)),
            await this.setPendingSessionRequest({ id: o, topic: t, params: c }),
            this.addRequestToQueue({ id: o, topic: t, params: c }),
            await this.processRequestQueue();
        } catch (l) {
          await this.sendError(o, t, l), this.client.logger.error(l);
        }
      }),
      (this.onSessionRequestResponse = (t, s) => {
        const { id: o } = s;
        _i(s)
          ? this.events.emit(Ht("session_request", o), { result: s.result })
          : Vr(s) &&
            this.events.emit(Ht("session_request", o), { error: s.error });
      }),
      (this.onSessionEventRequest = async (t, s) => {
        const { id: o, params: c } = s;
        try {
          this.isValidEmit(jr({ topic: t }, c)),
            this.client.events.emit("session_event", {
              id: o,
              topic: t,
              params: c,
            });
        } catch (l) {
          await this.sendError(o, t, l), this.client.logger.error(l);
        }
      }),
      (this.addRequestToQueue = (t) => {
        this.requestQueue.requests.push(t);
      }),
      (this.cleanupAfterResponse = (t) => {
        this.deletePendingSessionRequest(t.response.id, {
          message: "fulfilled",
          code: 0,
        }),
          setTimeout(() => {
            (this.requestQueue.state = hs.idle), this.processRequestQueue();
          }, _e.toMiliseconds(this.requestQueueDelay));
      }),
      (this.processRequestQueue = async () => {
        if (this.requestQueue.state === hs.active) {
          this.client.logger.info("session request queue is already active.");
          return;
        }
        const t = this.requestQueue.requests[0];
        if (!t) {
          this.client.logger.info("session request queue is empty.");
          return;
        }
        try {
          const { id: s, topic: o, params: c } = t,
            l = Pn(JSON.stringify({ id: s, params: c })),
            p = this.client.session.get(o),
            _ = await this.getVerifyContext(l, p.peer.metadata);
          (this.requestQueue.state = hs.active),
            this.client.events.emit("session_request", {
              id: s,
              topic: o,
              params: c,
              verifyContext: _,
            });
        } catch (s) {
          this.client.logger.error(s);
        }
      }),
      (this.isValidConnect = async (t) => {
        if (!gr(t)) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `connect() params: ${JSON.stringify(t)}`,
          );
          throw new Error(_);
        }
        const {
          pairingTopic: s,
          requiredNamespaces: o,
          optionalNamespaces: c,
          sessionProperties: l,
          relays: p,
        } = t;
        if ((or(s) || (await this.isValidPairingTopic(s)), !W6(p, !0))) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `connect() relays: ${p}`,
          );
          throw new Error(_);
        }
        !or(o) &&
          An(o) !== 0 &&
          this.validateNamespaces(o, "requiredNamespaces"),
          !or(c) &&
            An(c) !== 0 &&
            this.validateNamespaces(c, "optionalNamespaces"),
          or(l) || this.validateSessionProps(l, "sessionProperties");
      }),
      (this.validateNamespaces = (t, s) => {
        const o = G6(t, "connect()", s);
        if (o) throw new Error(o.message);
      }),
      (this.isValidApprove = async (t) => {
        if (!gr(t))
          throw new Error(
            ue("MISSING_OR_INVALID", `approve() params: ${t}`).message,
          );
        const {
          id: s,
          namespaces: o,
          relayProtocol: c,
          sessionProperties: l,
        } = t;
        await this.isValidProposalId(s);
        const p = this.client.proposal.get(s),
          _ = Do(o, "approve()");
        if (_) throw new Error(_.message);
        const d = Df(p.requiredNamespaces, o, "approve()");
        if (d) throw new Error(d.message);
        if (!Gt(c, !0)) {
          const { message: w } = ue(
            "MISSING_OR_INVALID",
            `approve() relayProtocol: ${c}`,
          );
          throw new Error(w);
        }
        or(l) || this.validateSessionProps(l, "sessionProperties");
      }),
      (this.isValidReject = async (t) => {
        if (!gr(t)) {
          const { message: c } = ue(
            "MISSING_OR_INVALID",
            `reject() params: ${t}`,
          );
          throw new Error(c);
        }
        const { id: s, reason: o } = t;
        if ((await this.isValidProposalId(s), !J6(o))) {
          const { message: c } = ue(
            "MISSING_OR_INVALID",
            `reject() reason: ${JSON.stringify(o)}`,
          );
          throw new Error(c);
        }
      }),
      (this.isValidSessionSettleRequest = (t) => {
        if (!gr(t)) {
          const { message: d } = ue(
            "MISSING_OR_INVALID",
            `onSessionSettleRequest() params: ${t}`,
          );
          throw new Error(d);
        }
        const { relay: s, controller: o, namespaces: c, expiry: l } = t;
        if (!ud(s)) {
          const { message: d } = ue(
            "MISSING_OR_INVALID",
            "onSessionSettleRequest() relay protocol should be a string",
          );
          throw new Error(d);
        }
        const p = z6(o, "onSessionSettleRequest()");
        if (p) throw new Error(p.message);
        const _ = Do(c, "onSessionSettleRequest()");
        if (_) throw new Error(_.message);
        if (Ai(l)) {
          const { message: d } = ue("EXPIRED", "onSessionSettleRequest()");
          throw new Error(d);
        }
      }),
      (this.isValidUpdate = async (t) => {
        if (!gr(t)) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `update() params: ${t}`,
          );
          throw new Error(_);
        }
        const { topic: s, namespaces: o } = t;
        await this.isValidSessionTopic(s);
        const c = this.client.session.get(s),
          l = Do(o, "update()");
        if (l) throw new Error(l.message);
        const p = Df(c.requiredNamespaces, o, "update()");
        if (p) throw new Error(p.message);
      }),
      (this.isValidExtend = async (t) => {
        if (!gr(t)) {
          const { message: o } = ue(
            "MISSING_OR_INVALID",
            `extend() params: ${t}`,
          );
          throw new Error(o);
        }
        const { topic: s } = t;
        await this.isValidSessionTopic(s);
      }),
      (this.isValidRequest = async (t) => {
        if (!gr(t)) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `request() params: ${t}`,
          );
          throw new Error(_);
        }
        const { topic: s, request: o, chainId: c, expiry: l } = t;
        await this.isValidSessionTopic(s);
        const { namespaces: p } = this.client.session.get(s);
        if (!jf(p, c)) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `request() chainId: ${c}`,
          );
          throw new Error(_);
        }
        if (!X6(o)) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `request() ${JSON.stringify(o)}`,
          );
          throw new Error(_);
        }
        if (!eS(p, c, o.method)) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `request() method: ${o.method}`,
          );
          throw new Error(_);
        }
        if (l && !nS(l, zc)) {
          const { message: _ } = ue(
            "MISSING_OR_INVALID",
            `request() expiry: ${l}. Expiry must be a number (in seconds) between ${zc.min} and ${zc.max}`,
          );
          throw new Error(_);
        }
      }),
      (this.isValidRespond = async (t) => {
        if (!gr(t)) {
          const { message: c } = ue(
            "MISSING_OR_INVALID",
            `respond() params: ${t}`,
          );
          throw new Error(c);
        }
        const { topic: s, response: o } = t;
        if ((await this.isValidSessionTopic(s), !Q6(o))) {
          const { message: c } = ue(
            "MISSING_OR_INVALID",
            `respond() response: ${JSON.stringify(o)}`,
          );
          throw new Error(c);
        }
      }),
      (this.isValidPing = async (t) => {
        if (!gr(t)) {
          const { message: o } = ue(
            "MISSING_OR_INVALID",
            `ping() params: ${t}`,
          );
          throw new Error(o);
        }
        const { topic: s } = t;
        await this.isValidSessionOrPairingTopic(s);
      }),
      (this.isValidEmit = async (t) => {
        if (!gr(t)) {
          const { message: p } = ue(
            "MISSING_OR_INVALID",
            `emit() params: ${t}`,
          );
          throw new Error(p);
        }
        const { topic: s, event: o, chainId: c } = t;
        await this.isValidSessionTopic(s);
        const { namespaces: l } = this.client.session.get(s);
        if (!jf(l, c)) {
          const { message: p } = ue(
            "MISSING_OR_INVALID",
            `emit() chainId: ${c}`,
          );
          throw new Error(p);
        }
        if (!Z6(o)) {
          const { message: p } = ue(
            "MISSING_OR_INVALID",
            `emit() event: ${JSON.stringify(o)}`,
          );
          throw new Error(p);
        }
        if (!tS(l, c, o.name)) {
          const { message: p } = ue(
            "MISSING_OR_INVALID",
            `emit() event: ${JSON.stringify(o)}`,
          );
          throw new Error(p);
        }
      }),
      (this.isValidDisconnect = async (t) => {
        if (!gr(t)) {
          const { message: o } = ue(
            "MISSING_OR_INVALID",
            `disconnect() params: ${t}`,
          );
          throw new Error(o);
        }
        const { topic: s } = t;
        await this.isValidSessionOrPairingTopic(s);
      }),
      (this.getVerifyContext = async (t, s) => {
        const o = {
          verified: {
            verifyUrl: s.verifyUrl || "",
            validation: "UNKNOWN",
            origin: s.url || "",
          },
        };
        try {
          const c = await this.client.core.verify.resolve({
            attestationId: t,
            verifyUrl: s.verifyUrl,
          });
          c &&
            ((o.verified.origin = c),
            (o.verified.validation = c === s.url ? "VALID" : "INVALID"));
        } catch (c) {
          this.client.logger.error(c);
        }
        return (
          this.client.logger.info(`Verify context: ${JSON.stringify(o)}`), o
        );
      }),
      (this.validateSessionProps = (t, s) => {
        Object.values(t).forEach((o) => {
          if (!Gt(o, !1)) {
            const { message: c } = ue(
              "MISSING_OR_INVALID",
              `${s} must be in Record<string, string> format. Received: ${JSON.stringify(
                o,
              )}`,
            );
            throw new Error(c);
          }
        });
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ue("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(At.message, async (e) => {
      const { topic: t, message: s } = e;
      if (
        this.ignoredPayloadTypes.includes(
          this.client.core.crypto.getPayloadType(s),
        )
      )
        return;
      const o = await this.client.core.crypto.decode(t, s);
      try {
        Hu(o)
          ? (this.client.core.history.set(t, o),
            this.onRelayEventRequest({ topic: t, payload: o }))
          : ea(o)
          ? (await this.client.core.history.resolve(o),
            await this.onRelayEventResponse({ topic: t, payload: o }),
            this.client.core.history.delete(t, o.id))
          : this.onRelayEventUnknownPayload({ topic: t, payload: o });
      } catch (c) {
        this.client.logger.error(c);
      }
    });
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(Dr.expired, async (e) => {
      const { topic: t, id: s } = ad(e.target);
      if (s && this.client.pendingRequest.keys.includes(s))
        return await this.deletePendingSessionRequest(s, ue("EXPIRED"), !0);
      t
        ? this.client.session.keys.includes(t) &&
          (await this.deleteSession(t, !0),
          this.client.events.emit("session_expire", { topic: t }))
        : s &&
          (await this.deleteProposal(s, !0),
          this.client.events.emit("proposal_expire", { id: s }));
    });
  }
  isValidPairingTopic(e) {
    if (!Gt(e, !1)) {
      const { message: t } = ue(
        "MISSING_OR_INVALID",
        `pairing topic should be a string: ${e}`,
      );
      throw new Error(t);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: t } = ue(
        "NO_MATCHING_KEY",
        `pairing topic doesn't exist: ${e}`,
      );
      throw new Error(t);
    }
    if (Ai(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: t } = ue("EXPIRED", `pairing topic: ${e}`);
      throw new Error(t);
    }
  }
  async isValidSessionTopic(e) {
    if (!Gt(e, !1)) {
      const { message: t } = ue(
        "MISSING_OR_INVALID",
        `session topic should be a string: ${e}`,
      );
      throw new Error(t);
    }
    if (!this.client.session.keys.includes(e)) {
      const { message: t } = ue(
        "NO_MATCHING_KEY",
        `session topic doesn't exist: ${e}`,
      );
      throw new Error(t);
    }
    if (Ai(this.client.session.get(e).expiry)) {
      await this.deleteSession(e);
      const { message: t } = ue("EXPIRED", `session topic: ${e}`);
      throw new Error(t);
    }
  }
  async isValidSessionOrPairingTopic(e) {
    if (this.client.session.keys.includes(e)) await this.isValidSessionTopic(e);
    else if (this.client.core.pairing.pairings.keys.includes(e))
      this.isValidPairingTopic(e);
    else if (Gt(e, !1)) {
      const { message: t } = ue(
        "NO_MATCHING_KEY",
        `session or pairing topic doesn't exist: ${e}`,
      );
      throw new Error(t);
    } else {
      const { message: t } = ue(
        "MISSING_OR_INVALID",
        `session or pairing topic should be a string: ${e}`,
      );
      throw new Error(t);
    }
  }
  async isValidProposalId(e) {
    if (!Y6(e)) {
      const { message: t } = ue(
        "MISSING_OR_INVALID",
        `proposal id should be a number: ${e}`,
      );
      throw new Error(t);
    }
    if (!this.client.proposal.keys.includes(e)) {
      const { message: t } = ue(
        "NO_MATCHING_KEY",
        `proposal id doesn't exist: ${e}`,
      );
      throw new Error(t);
    }
    if (Ai(this.client.proposal.get(e).expiry)) {
      await this.deleteProposal(e);
      const { message: t } = ue("EXPIRED", `proposal id: ${e}`);
      throw new Error(t);
    }
  }
}
class RI extends ra {
  constructor(e, t) {
    super(e, t, bI, Vu), (this.core = e), (this.logger = t);
  }
}
class NI extends ra {
  constructor(e, t) {
    super(e, t, wI, Vu), (this.core = e), (this.logger = t);
  }
}
class $I extends ra {
  constructor(e, t) {
    super(e, t, SI, Vu, (s) => s.id), (this.core = e), (this.logger = t);
  }
}
let jI = class Ud extends Aw {
  constructor(e) {
    super(e),
      (this.protocol = Nd),
      (this.version = $d),
      (this.name = qc.name),
      (this.events = new Fr.EventEmitter()),
      (this.on = (s, o) => this.events.on(s, o)),
      (this.once = (s, o) => this.events.once(s, o)),
      (this.off = (s, o) => this.events.off(s, o)),
      (this.removeListener = (s, o) => this.events.removeListener(s, o)),
      (this.removeAllListeners = (s) => this.events.removeAllListeners(s)),
      (this.connect = async (s) => {
        try {
          return await this.engine.connect(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.pair = async (s) => {
        try {
          return await this.engine.pair(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.approve = async (s) => {
        try {
          return await this.engine.approve(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.reject = async (s) => {
        try {
          return await this.engine.reject(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.update = async (s) => {
        try {
          return await this.engine.update(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.extend = async (s) => {
        try {
          return await this.engine.extend(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.request = async (s) => {
        try {
          return await this.engine.request(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.respond = async (s) => {
        try {
          return await this.engine.respond(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.ping = async (s) => {
        try {
          return await this.engine.ping(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.emit = async (s) => {
        try {
          return await this.engine.emit(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.disconnect = async (s) => {
        try {
          return await this.engine.disconnect(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.find = (s) => {
        try {
          return this.engine.find(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.getPendingSessionRequests = () => {
        try {
          return this.engine.getPendingSessionRequests();
        } catch (s) {
          throw (this.logger.error(s.message), s);
        }
      }),
      (this.name = (e == null ? void 0 : e.name) || qc.name),
      (this.metadata = (e == null ? void 0 : e.metadata) || f6());
    const t =
      typeof (e == null ? void 0 : e.logger) < "u" &&
      typeof (e == null ? void 0 : e.logger) != "string"
        ? e.logger
        : Ze.pino(
            Ze.getDefaultLoggerOptions({
              level: (e == null ? void 0 : e.logger) || qc.logger,
            }),
          );
    (this.core = (e == null ? void 0 : e.core) || new mI(e)),
      (this.logger = Ze.generateChildLogger(t, this.name)),
      (this.session = new NI(this.core, this.logger)),
      (this.proposal = new RI(this.core, this.logger)),
      (this.pendingRequest = new $I(this.core, this.logger)),
      (this.engine = new CI(this));
  }
  static async init(e) {
    const t = new Ud(e);
    return await t.initialize(), t;
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(),
        await this.session.init(),
        await this.proposal.init(),
        await this.pendingRequest.init(),
        await this.engine.init(),
        this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }),
        this.logger.info("SignClient Initialization Success");
    } catch (e) {
      throw (
        (this.logger.info("SignClient Initialization Failure"),
        this.logger.error(e.message),
        e)
      );
    }
  }
};
const DI = { Accept: "application/json", "Content-Type": "application/json" },
  UI = "POST",
  fp = { headers: DI, method: UI },
  pp = 10;
class rn {
  constructor(e, t = !1) {
    if (
      ((this.url = e),
      (this.disableProviderPing = t),
      (this.events = new Fr.EventEmitter()),
      (this.isAvailable = !1),
      (this.registering = !1),
      !qf(e))
    )
      throw new Error(
        `Provided URL is not compatible with HTTP connection: ${e}`,
      );
    (this.url = e), (this.disableProviderPing = t);
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(e, t) {
    this.isAvailable || (await this.register());
    try {
      const s = vs(e),
        c = await (
          await Gl(this.url, Object.assign(Object.assign({}, fp), { body: s }))
        ).json();
      this.onPayload({ data: c });
    } catch (s) {
      this.onError(e.id, s);
    }
  }
  async register(e = this.url) {
    if (!qf(e))
      throw new Error(
        `Provided URL is not compatible with HTTP connection: ${e}`,
      );
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (
        (this.events.listenerCount("register_error") >= t ||
          this.events.listenerCount("open") >= t) &&
          this.events.setMaxListeners(t + 1),
        new Promise((s, o) => {
          this.events.once("register_error", (c) => {
            this.resetMaxListeners(), o(c);
          }),
            this.events.once("open", () => {
              if ((this.resetMaxListeners(), typeof this.isAvailable > "u"))
                return o(new Error("HTTP connection is missing or invalid"));
              s();
            });
        })
      );
    }
    (this.url = e), (this.registering = !0);
    try {
      if (!this.disableProviderPing) {
        const t = vs({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await Gl(e, Object.assign(Object.assign({}, fp), { body: t }));
      }
      this.onOpen();
    } catch (t) {
      const s = this.parseError(t);
      throw (this.events.emit("register_error", s), this.onClose(), s);
    }
  }
  onOpen() {
    (this.isAvailable = !0), (this.registering = !1), this.events.emit("open");
  }
  onClose() {
    (this.isAvailable = !1), (this.registering = !1), this.events.emit("close");
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const t = typeof e.data == "string" ? xu(e.data) : e.data;
    this.events.emit("payload", t);
  }
  onError(e, t) {
    const s = this.parseError(t),
      o = s.message || s.toString(),
      c = Zo(e, o);
    this.events.emit("payload", c);
  }
  parseError(e, t = this.url) {
    return fd(e, t, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > pp && this.events.setMaxListeners(pp);
  }
}
const dp = "error",
  FI = "wss://relay.walletconnect.com",
  LI = "wc",
  MI = "universal_provider",
  gp = `${LI}@2:${MI}:`,
  qI = "https://rpc.walletconnect.com/v1",
  $i = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
var ls =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  bu = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ (function (i, e) {
  (function () {
    var t,
      s = "4.17.21",
      o = 200,
      c = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
      l = "Expected a function",
      p = "Invalid `variable` option passed into `_.template`",
      _ = "__lodash_hash_undefined__",
      d = 500,
      w = "__lodash_placeholder__",
      A = 1,
      S = 2,
      P = 4,
      M = 1,
      K = 2,
      B = 1,
      oe = 2,
      N = 4,
      F = 8,
      x = 16,
      C = 32,
      b = 64,
      h = 128,
      m = 256,
      G = 512,
      k = 30,
      se = "...",
      ce = 800,
      ge = 16,
      $ = 1,
      z = 2,
      le = 3,
      te = 1 / 0,
      W = 9007199254740991,
      ee = 17976931348623157e292,
      Y = 0 / 0,
      re = 4294967295,
      Oe = re - 1,
      ie = re >>> 1,
      be = [
        ["ary", h],
        ["bind", B],
        ["bindKey", oe],
        ["curry", F],
        ["curryRight", x],
        ["flip", G],
        ["partial", C],
        ["partialRight", b],
        ["rearg", m],
      ],
      he = "[object Arguments]",
      ve = "[object Array]",
      q = "[object AsyncFunction]",
      L = "[object Boolean]",
      R = "[object Date]",
      f = "[object DOMException]",
      O = "[object Error]",
      ne = "[object Function]",
      fe = "[object GeneratorFunction]",
      Ie = "[object Map]",
      He = "[object Number]",
      Ve = "[object Null]",
      Fe = "[object Object]",
      dt = "[object Promise]",
      gt = "[object Proxy]",
      Me = "[object RegExp]",
      xe = "[object Set]",
      $e = "[object String]",
      je = "[object Symbol]",
      qe = "[object Undefined]",
      Ae = "[object WeakMap]",
      De = "[object WeakSet]",
      Se = "[object ArrayBuffer]",
      Te = "[object DataView]",
      Ke = "[object Float32Array]",
      Pe = "[object Float64Array]",
      ke = "[object Int8Array]",
      We = "[object Int16Array]",
      et = "[object Int32Array]",
      tt = "[object Uint8Array]",
      Je = "[object Uint8ClampedArray]",
      Zt = "[object Uint16Array]",
      ur = "[object Uint32Array]",
      kr = /\b__p \+= '';/g,
      er = /\b(__p \+=) '' \+/g,
      ri = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      yi = /&(?:amp|lt|gt|quot|#39);/g,
      ji = /[&<>"']/g,
      wt = RegExp(yi.source),
      _t = RegExp(ji.source),
      Et = /<%-([\s\S]+?)%>/g,
      St = /<%([\s\S]+?)%>/g,
      mt = /<%=([\s\S]+?)%>/g,
      yt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Dt = /^\w*$/,
      Ut =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      It = /[\\^$.*+?()[\]{}|]/g,
      Ft = RegExp(It.source),
      xt = /^\s+/,
      Tt = /\s/,
      Ot = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      ht = /\{\n\/\* \[wrapped with (.+)\] \*/,
      Lt = /,? & /,
      Mt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      ia = /[()=,{}\[\]\/\s]/,
      na = /\\(\\)?/g,
      sa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      xr = /\w*$/,
      oa = /^[-+]0x[0-9a-f]+$/i,
      aa = /^0b[01]+$/i,
      ca = /^\[object .+?Constructor\]$/,
      ua = /^0o[0-7]+$/i,
      ha = /^(?:0|[1-9]\d*)$/,
      ii = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      nn = /($^)/,
      la = /['\n\r\u2028\u2029\\]/g,
      sn = "\\ud800-\\udfff",
      fa = "\\u0300-\\u036f",
      pa = "\\ufe20-\\ufe2f",
      on = "\\u20d0-\\u20ff",
      xs = fa + pa + on,
      Os = "\\u2700-\\u27bf",
      Lr = "a-z\\xdf-\\xf6\\xf8-\\xff",
      da = "\\xac\\xb1\\xd7\\xf7",
      ga = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
      _a = "\\u2000-\\u206f",
      ya =
        " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      Ps = "A-Z\\xc0-\\xd6\\xd8-\\xde",
      As = "\\ufe0e\\ufe0f",
      Di = da + ga + _a + ya,
      jn = "['’]",
      Ui = "[" + sn + "]",
      Dn = "[" + Di + "]",
      Fi = "[" + xs + "]",
      Ts = "\\d+",
      va = "[" + Os + "]",
      Cs = "[" + Lr + "]",
      Rs = "[^" + sn + Di + Ts + Os + Lr + Ps + "]",
      an = "\\ud83c[\\udffb-\\udfff]",
      ma = "(?:" + Fi + "|" + an + ")",
      Ns = "[^" + sn + "]",
      cn = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      vi = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      yr = "[" + Ps + "]",
      $s = "\\u200d",
      js = "(?:" + Cs + "|" + Rs + ")",
      Gr = "(?:" + yr + "|" + Rs + ")",
      Ds = "(?:" + jn + "(?:d|ll|m|re|s|t|ve))?",
      Us = "(?:" + jn + "(?:D|LL|M|RE|S|T|VE))?",
      Fs = ma + "?",
      Ls = "[" + As + "]?",
      ba = "(?:" + $s + "(?:" + [Ns, cn, vi].join("|") + ")" + Ls + Fs + ")*",
      ni = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
      Ms = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
      qs = Ls + Fs + ba,
      un = "(?:" + [va, cn, vi].join("|") + ")" + qs,
      wa = "(?:" + [Ns + Fi + "?", Fi, cn, vi, Ui].join("|") + ")",
      Un = RegExp(jn, "g"),
      Ea = RegExp(Fi, "g"),
      hn = RegExp(an + "(?=" + an + ")|" + wa + qs, "g"),
      zs = RegExp(
        [
          yr + "?" + Cs + "+" + Ds + "(?=" + [Dn, yr, "$"].join("|") + ")",
          Gr + "+" + Us + "(?=" + [Dn, yr + js, "$"].join("|") + ")",
          yr + "?" + js + "+" + Ds,
          yr + "+" + Us,
          Ms,
          ni,
          Ts,
          un,
        ].join("|"),
        "g",
      ),
      Hs = RegExp("[" + $s + sn + xs + As + "]"),
      Li = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      Ks = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout",
      ],
      Sa = -1,
      ot = {};
    (ot[Ke] =
      ot[Pe] =
      ot[ke] =
      ot[We] =
      ot[et] =
      ot[tt] =
      ot[Je] =
      ot[Zt] =
      ot[ur] =
        !0),
      (ot[he] =
        ot[ve] =
        ot[Se] =
        ot[L] =
        ot[Te] =
        ot[R] =
        ot[O] =
        ot[ne] =
        ot[Ie] =
        ot[He] =
        ot[Fe] =
        ot[Me] =
        ot[xe] =
        ot[$e] =
        ot[Ae] =
          !1);
    var st = {};
    (st[he] =
      st[ve] =
      st[Se] =
      st[Te] =
      st[L] =
      st[R] =
      st[Ke] =
      st[Pe] =
      st[ke] =
      st[We] =
      st[et] =
      st[Ie] =
      st[He] =
      st[Fe] =
      st[Me] =
      st[xe] =
      st[$e] =
      st[je] =
      st[tt] =
      st[Je] =
      st[Zt] =
      st[ur] =
        !0),
      (st[O] = st[ne] = st[Ae] = !1);
    var E = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s",
      },
      j = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      },
      Q = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      },
      pe = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      at = parseFloat,
      Re = parseInt,
      ft = typeof ls == "object" && ls && ls.Object === Object && ls,
      qt = typeof self == "object" && self && self.Object === Object && self,
      Xe = ft || qt || Function("return this")(),
      ct = e && !e.nodeType && e,
      Ct = ct && !0 && i && !i.nodeType && i,
      hr = Ct && Ct.exports === ct,
      zt = hr && ft.process,
      pt = (function () {
        try {
          var D = Ct && Ct.require && Ct.require("util").types;
          return D || (zt && zt.binding && zt.binding("util"));
        } catch {}
      })(),
      tr = pt && pt.isArrayBuffer,
      Mr = pt && pt.isDate,
      Or = pt && pt.isMap,
      Wr = pt && pt.isRegExp,
      Fn = pt && pt.isSet,
      Mi = pt && pt.isTypedArray;
    function Vt(D, V, H) {
      switch (H.length) {
        case 0:
          return D.call(V);
        case 1:
          return D.call(V, H[0]);
        case 2:
          return D.call(V, H[0], H[1]);
        case 3:
          return D.call(V, H[0], H[1], H[2]);
      }
      return D.apply(V, H);
    }
    function Md(D, V, H, de) {
      for (var Ce = -1, rt = D == null ? 0 : D.length; ++Ce < rt; ) {
        var Kt = D[Ce];
        V(de, Kt, H(Kt), D);
      }
      return de;
    }
    function Pr(D, V) {
      for (
        var H = -1, de = D == null ? 0 : D.length;
        ++H < de && V(D[H], H, D) !== !1;

      );
      return D;
    }
    function qd(D, V) {
      for (var H = D == null ? 0 : D.length; H-- && V(D[H], H, D) !== !1; );
      return D;
    }
    function Wu(D, V) {
      for (var H = -1, de = D == null ? 0 : D.length; ++H < de; )
        if (!V(D[H], H, D)) return !1;
      return !0;
    }
    function mi(D, V) {
      for (
        var H = -1, de = D == null ? 0 : D.length, Ce = 0, rt = [];
        ++H < de;

      ) {
        var Kt = D[H];
        V(Kt, H, D) && (rt[Ce++] = Kt);
      }
      return rt;
    }
    function Bs(D, V) {
      var H = D == null ? 0 : D.length;
      return !!H && ln(D, V, 0) > -1;
    }
    function Ia(D, V, H) {
      for (var de = -1, Ce = D == null ? 0 : D.length; ++de < Ce; )
        if (H(V, D[de])) return !0;
      return !1;
    }
    function vt(D, V) {
      for (
        var H = -1, de = D == null ? 0 : D.length, Ce = Array(de);
        ++H < de;

      )
        Ce[H] = V(D[H], H, D);
      return Ce;
    }
    function bi(D, V) {
      for (var H = -1, de = V.length, Ce = D.length; ++H < de; )
        D[Ce + H] = V[H];
      return D;
    }
    function xa(D, V, H, de) {
      var Ce = -1,
        rt = D == null ? 0 : D.length;
      for (de && rt && (H = D[++Ce]); ++Ce < rt; ) H = V(H, D[Ce], Ce, D);
      return H;
    }
    function zd(D, V, H, de) {
      var Ce = D == null ? 0 : D.length;
      for (de && Ce && (H = D[--Ce]); Ce--; ) H = V(H, D[Ce], Ce, D);
      return H;
    }
    function Oa(D, V) {
      for (var H = -1, de = D == null ? 0 : D.length; ++H < de; )
        if (V(D[H], H, D)) return !0;
      return !1;
    }
    var Hd = Pa("length");
    function Kd(D) {
      return D.split("");
    }
    function Bd(D) {
      return D.match(Mt) || [];
    }
    function Yu(D, V, H) {
      var de;
      return (
        H(D, function (Ce, rt, Kt) {
          if (V(Ce, rt, Kt)) return (de = rt), !1;
        }),
        de
      );
    }
    function Vs(D, V, H, de) {
      for (var Ce = D.length, rt = H + (de ? 1 : -1); de ? rt-- : ++rt < Ce; )
        if (V(D[rt], rt, D)) return rt;
      return -1;
    }
    function ln(D, V, H) {
      return V === V ? rg(D, V, H) : Vs(D, Ju, H);
    }
    function Vd(D, V, H, de) {
      for (var Ce = H - 1, rt = D.length; ++Ce < rt; )
        if (de(D[Ce], V)) return Ce;
      return -1;
    }
    function Ju(D) {
      return D !== D;
    }
    function Xu(D, V) {
      var H = D == null ? 0 : D.length;
      return H ? Ta(D, V) / H : Y;
    }
    function Pa(D) {
      return function (V) {
        return V == null ? t : V[D];
      };
    }
    function Aa(D) {
      return function (V) {
        return D == null ? t : D[V];
      };
    }
    function Qu(D, V, H, de, Ce) {
      return (
        Ce(D, function (rt, Kt, ut) {
          H = de ? ((de = !1), rt) : V(H, rt, Kt, ut);
        }),
        H
      );
    }
    function kd(D, V) {
      var H = D.length;
      for (D.sort(V); H--; ) D[H] = D[H].value;
      return D;
    }
    function Ta(D, V) {
      for (var H, de = -1, Ce = D.length; ++de < Ce; ) {
        var rt = V(D[de]);
        rt !== t && (H = H === t ? rt : H + rt);
      }
      return H;
    }
    function Ca(D, V) {
      for (var H = -1, de = Array(D); ++H < D; ) de[H] = V(H);
      return de;
    }
    function Gd(D, V) {
      return vt(V, function (H) {
        return [H, D[H]];
      });
    }
    function Zu(D) {
      return D && D.slice(0, ih(D) + 1).replace(xt, "");
    }
    function vr(D) {
      return function (V) {
        return D(V);
      };
    }
    function Ra(D, V) {
      return vt(V, function (H) {
        return D[H];
      });
    }
    function Ln(D, V) {
      return D.has(V);
    }
    function eh(D, V) {
      for (var H = -1, de = D.length; ++H < de && ln(V, D[H], 0) > -1; );
      return H;
    }
    function th(D, V) {
      for (var H = D.length; H-- && ln(V, D[H], 0) > -1; );
      return H;
    }
    function Wd(D, V) {
      for (var H = D.length, de = 0; H--; ) D[H] === V && ++de;
      return de;
    }
    var Yd = Aa(E),
      Jd = Aa(j);
    function Xd(D) {
      return "\\" + pe[D];
    }
    function Qd(D, V) {
      return D == null ? t : D[V];
    }
    function fn(D) {
      return Hs.test(D);
    }
    function Zd(D) {
      return Li.test(D);
    }
    function eg(D) {
      for (var V, H = []; !(V = D.next()).done; ) H.push(V.value);
      return H;
    }
    function Na(D) {
      var V = -1,
        H = Array(D.size);
      return (
        D.forEach(function (de, Ce) {
          H[++V] = [Ce, de];
        }),
        H
      );
    }
    function rh(D, V) {
      return function (H) {
        return D(V(H));
      };
    }
    function wi(D, V) {
      for (var H = -1, de = D.length, Ce = 0, rt = []; ++H < de; ) {
        var Kt = D[H];
        (Kt === V || Kt === w) && ((D[H] = w), (rt[Ce++] = H));
      }
      return rt;
    }
    function ks(D) {
      var V = -1,
        H = Array(D.size);
      return (
        D.forEach(function (de) {
          H[++V] = de;
        }),
        H
      );
    }
    function tg(D) {
      var V = -1,
        H = Array(D.size);
      return (
        D.forEach(function (de) {
          H[++V] = [de, de];
        }),
        H
      );
    }
    function rg(D, V, H) {
      for (var de = H - 1, Ce = D.length; ++de < Ce; )
        if (D[de] === V) return de;
      return -1;
    }
    function ig(D, V, H) {
      for (var de = H + 1; de--; ) if (D[de] === V) return de;
      return de;
    }
    function pn(D) {
      return fn(D) ? sg(D) : Hd(D);
    }
    function qr(D) {
      return fn(D) ? og(D) : Kd(D);
    }
    function ih(D) {
      for (var V = D.length; V-- && Tt.test(D.charAt(V)); );
      return V;
    }
    var ng = Aa(Q);
    function sg(D) {
      for (var V = (hn.lastIndex = 0); hn.test(D); ) ++V;
      return V;
    }
    function og(D) {
      return D.match(hn) || [];
    }
    function ag(D) {
      return D.match(zs) || [];
    }
    var cg = function D(V) {
        V = V == null ? Xe : dn.defaults(Xe.Object(), V, dn.pick(Xe, Ks));
        var H = V.Array,
          de = V.Date,
          Ce = V.Error,
          rt = V.Function,
          Kt = V.Math,
          ut = V.Object,
          $a = V.RegExp,
          ug = V.String,
          Ar = V.TypeError,
          Gs = H.prototype,
          hg = rt.prototype,
          gn = ut.prototype,
          Ws = V["__core-js_shared__"],
          Ys = hg.toString,
          nt = gn.hasOwnProperty,
          lg = 0,
          nh = (function () {
            var r = /[^.]+$/.exec((Ws && Ws.keys && Ws.keys.IE_PROTO) || "");
            return r ? "Symbol(src)_1." + r : "";
          })(),
          Js = gn.toString,
          fg = Ys.call(ut),
          pg = Xe._,
          dg = $a(
            "^" +
              Ys.call(nt)
                .replace(It, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?",
                ) +
              "$",
          ),
          Xs = hr ? V.Buffer : t,
          Ei = V.Symbol,
          Qs = V.Uint8Array,
          sh = Xs ? Xs.allocUnsafe : t,
          Zs = rh(ut.getPrototypeOf, ut),
          oh = ut.create,
          ah = gn.propertyIsEnumerable,
          eo = Gs.splice,
          ch = Ei ? Ei.isConcatSpreadable : t,
          Mn = Ei ? Ei.iterator : t,
          qi = Ei ? Ei.toStringTag : t,
          to = (function () {
            try {
              var r = Vi(ut, "defineProperty");
              return r({}, "", {}), r;
            } catch {}
          })(),
          gg = V.clearTimeout !== Xe.clearTimeout && V.clearTimeout,
          _g = de && de.now !== Xe.Date.now && de.now,
          yg = V.setTimeout !== Xe.setTimeout && V.setTimeout,
          ro = Kt.ceil,
          io = Kt.floor,
          ja = ut.getOwnPropertySymbols,
          vg = Xs ? Xs.isBuffer : t,
          uh = V.isFinite,
          mg = Gs.join,
          bg = rh(ut.keys, ut),
          Bt = Kt.max,
          Jt = Kt.min,
          wg = de.now,
          Eg = V.parseInt,
          hh = Kt.random,
          Sg = Gs.reverse,
          Da = Vi(V, "DataView"),
          qn = Vi(V, "Map"),
          Ua = Vi(V, "Promise"),
          _n = Vi(V, "Set"),
          zn = Vi(V, "WeakMap"),
          Hn = Vi(ut, "create"),
          no = zn && new zn(),
          yn = {},
          Ig = ki(Da),
          xg = ki(qn),
          Og = ki(Ua),
          Pg = ki(_n),
          Ag = ki(zn),
          so = Ei ? Ei.prototype : t,
          Kn = so ? so.valueOf : t,
          lh = so ? so.toString : t;
        function y(r) {
          if (Pt(r) && !Ne(r) && !(r instanceof Ye)) {
            if (r instanceof Tr) return r;
            if (nt.call(r, "__wrapped__")) return fl(r);
          }
          return new Tr(r);
        }
        var vn = (function () {
          function r() {}
          return function (n) {
            if (!bt(n)) return {};
            if (oh) return oh(n);
            r.prototype = n;
            var a = new r();
            return (r.prototype = t), a;
          };
        })();
        function oo() {}
        function Tr(r, n) {
          (this.__wrapped__ = r),
            (this.__actions__ = []),
            (this.__chain__ = !!n),
            (this.__index__ = 0),
            (this.__values__ = t);
        }
        (y.templateSettings = {
          escape: Et,
          evaluate: St,
          interpolate: mt,
          variable: "",
          imports: { _: y },
        }),
          (y.prototype = oo.prototype),
          (y.prototype.constructor = y),
          (Tr.prototype = vn(oo.prototype)),
          (Tr.prototype.constructor = Tr);
        function Ye(r) {
          (this.__wrapped__ = r),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = re),
            (this.__views__ = []);
        }
        function Tg() {
          var r = new Ye(this.__wrapped__);
          return (
            (r.__actions__ = lr(this.__actions__)),
            (r.__dir__ = this.__dir__),
            (r.__filtered__ = this.__filtered__),
            (r.__iteratees__ = lr(this.__iteratees__)),
            (r.__takeCount__ = this.__takeCount__),
            (r.__views__ = lr(this.__views__)),
            r
          );
        }
        function Cg() {
          if (this.__filtered__) {
            var r = new Ye(this);
            (r.__dir__ = -1), (r.__filtered__ = !0);
          } else (r = this.clone()), (r.__dir__ *= -1);
          return r;
        }
        function Rg() {
          var r = this.__wrapped__.value(),
            n = this.__dir__,
            a = Ne(r),
            u = n < 0,
            g = a ? r.length : 0,
            v = K0(0, g, this.__views__),
            I = v.start,
            T = v.end,
            U = T - I,
            J = u ? T : I - 1,
            X = this.__iteratees__,
            Z = X.length,
            ae = 0,
            ye = Jt(U, this.__takeCount__);
          if (!a || (!u && g == U && ye == U)) return Dh(r, this.__actions__);
          var we = [];
          e: for (; U-- && ae < ye; ) {
            J += n;
            for (var ze = -1, Ee = r[J]; ++ze < Z; ) {
              var Ge = X[ze],
                Qe = Ge.iteratee,
                wr = Ge.type,
                nr = Qe(Ee);
              if (wr == z) Ee = nr;
              else if (!nr) {
                if (wr == $) continue e;
                break e;
              }
            }
            we[ae++] = Ee;
          }
          return we;
        }
        (Ye.prototype = vn(oo.prototype)), (Ye.prototype.constructor = Ye);
        function zi(r) {
          var n = -1,
            a = r == null ? 0 : r.length;
          for (this.clear(); ++n < a; ) {
            var u = r[n];
            this.set(u[0], u[1]);
          }
        }
        function Ng() {
          (this.__data__ = Hn ? Hn(null) : {}), (this.size = 0);
        }
        function $g(r) {
          var n = this.has(r) && delete this.__data__[r];
          return (this.size -= n ? 1 : 0), n;
        }
        function jg(r) {
          var n = this.__data__;
          if (Hn) {
            var a = n[r];
            return a === _ ? t : a;
          }
          return nt.call(n, r) ? n[r] : t;
        }
        function Dg(r) {
          var n = this.__data__;
          return Hn ? n[r] !== t : nt.call(n, r);
        }
        function Ug(r, n) {
          var a = this.__data__;
          return (
            (this.size += this.has(r) ? 0 : 1),
            (a[r] = Hn && n === t ? _ : n),
            this
          );
        }
        (zi.prototype.clear = Ng),
          (zi.prototype.delete = $g),
          (zi.prototype.get = jg),
          (zi.prototype.has = Dg),
          (zi.prototype.set = Ug);
        function si(r) {
          var n = -1,
            a = r == null ? 0 : r.length;
          for (this.clear(); ++n < a; ) {
            var u = r[n];
            this.set(u[0], u[1]);
          }
        }
        function Fg() {
          (this.__data__ = []), (this.size = 0);
        }
        function Lg(r) {
          var n = this.__data__,
            a = ao(n, r);
          if (a < 0) return !1;
          var u = n.length - 1;
          return a == u ? n.pop() : eo.call(n, a, 1), --this.size, !0;
        }
        function Mg(r) {
          var n = this.__data__,
            a = ao(n, r);
          return a < 0 ? t : n[a][1];
        }
        function qg(r) {
          return ao(this.__data__, r) > -1;
        }
        function zg(r, n) {
          var a = this.__data__,
            u = ao(a, r);
          return u < 0 ? (++this.size, a.push([r, n])) : (a[u][1] = n), this;
        }
        (si.prototype.clear = Fg),
          (si.prototype.delete = Lg),
          (si.prototype.get = Mg),
          (si.prototype.has = qg),
          (si.prototype.set = zg);
        function oi(r) {
          var n = -1,
            a = r == null ? 0 : r.length;
          for (this.clear(); ++n < a; ) {
            var u = r[n];
            this.set(u[0], u[1]);
          }
        }
        function Hg() {
          (this.size = 0),
            (this.__data__ = {
              hash: new zi(),
              map: new (qn || si)(),
              string: new zi(),
            });
        }
        function Kg(r) {
          var n = bo(this, r).delete(r);
          return (this.size -= n ? 1 : 0), n;
        }
        function Bg(r) {
          return bo(this, r).get(r);
        }
        function Vg(r) {
          return bo(this, r).has(r);
        }
        function kg(r, n) {
          var a = bo(this, r),
            u = a.size;
          return a.set(r, n), (this.size += a.size == u ? 0 : 1), this;
        }
        (oi.prototype.clear = Hg),
          (oi.prototype.delete = Kg),
          (oi.prototype.get = Bg),
          (oi.prototype.has = Vg),
          (oi.prototype.set = kg);
        function Hi(r) {
          var n = -1,
            a = r == null ? 0 : r.length;
          for (this.__data__ = new oi(); ++n < a; ) this.add(r[n]);
        }
        function Gg(r) {
          return this.__data__.set(r, _), this;
        }
        function Wg(r) {
          return this.__data__.has(r);
        }
        (Hi.prototype.add = Hi.prototype.push = Gg), (Hi.prototype.has = Wg);
        function zr(r) {
          var n = (this.__data__ = new si(r));
          this.size = n.size;
        }
        function Yg() {
          (this.__data__ = new si()), (this.size = 0);
        }
        function Jg(r) {
          var n = this.__data__,
            a = n.delete(r);
          return (this.size = n.size), a;
        }
        function Xg(r) {
          return this.__data__.get(r);
        }
        function Qg(r) {
          return this.__data__.has(r);
        }
        function Zg(r, n) {
          var a = this.__data__;
          if (a instanceof si) {
            var u = a.__data__;
            if (!qn || u.length < o - 1)
              return u.push([r, n]), (this.size = ++a.size), this;
            a = this.__data__ = new oi(u);
          }
          return a.set(r, n), (this.size = a.size), this;
        }
        (zr.prototype.clear = Yg),
          (zr.prototype.delete = Jg),
          (zr.prototype.get = Xg),
          (zr.prototype.has = Qg),
          (zr.prototype.set = Zg);
        function fh(r, n) {
          var a = Ne(r),
            u = !a && Gi(r),
            g = !a && !u && Pi(r),
            v = !a && !u && !g && En(r),
            I = a || u || g || v,
            T = I ? Ca(r.length, ug) : [],
            U = T.length;
          for (var J in r)
            (n || nt.call(r, J)) &&
              !(
                I &&
                (J == "length" ||
                  (g && (J == "offset" || J == "parent")) ||
                  (v &&
                    (J == "buffer" ||
                      J == "byteLength" ||
                      J == "byteOffset")) ||
                  hi(J, U))
              ) &&
              T.push(J);
          return T;
        }
        function ph(r) {
          var n = r.length;
          return n ? r[Ga(0, n - 1)] : t;
        }
        function e0(r, n) {
          return wo(lr(r), Ki(n, 0, r.length));
        }
        function t0(r) {
          return wo(lr(r));
        }
        function Fa(r, n, a) {
          ((a !== t && !Hr(r[n], a)) || (a === t && !(n in r))) && ai(r, n, a);
        }
        function Bn(r, n, a) {
          var u = r[n];
          (!(nt.call(r, n) && Hr(u, a)) || (a === t && !(n in r))) &&
            ai(r, n, a);
        }
        function ao(r, n) {
          for (var a = r.length; a--; ) if (Hr(r[a][0], n)) return a;
          return -1;
        }
        function r0(r, n, a, u) {
          return (
            Si(r, function (g, v, I) {
              n(u, g, a(g), I);
            }),
            u
          );
        }
        function dh(r, n) {
          return r && Jr(n, kt(n), r);
        }
        function i0(r, n) {
          return r && Jr(n, pr(n), r);
        }
        function ai(r, n, a) {
          n == "__proto__" && to
            ? to(r, n, {
                configurable: !0,
                enumerable: !0,
                value: a,
                writable: !0,
              })
            : (r[n] = a);
        }
        function La(r, n) {
          for (var a = -1, u = n.length, g = H(u), v = r == null; ++a < u; )
            g[a] = v ? t : vc(r, n[a]);
          return g;
        }
        function Ki(r, n, a) {
          return (
            r === r &&
              (a !== t && (r = r <= a ? r : a),
              n !== t && (r = r >= n ? r : n)),
            r
          );
        }
        function Cr(r, n, a, u, g, v) {
          var I,
            T = n & A,
            U = n & S,
            J = n & P;
          if ((a && (I = g ? a(r, u, g, v) : a(r)), I !== t)) return I;
          if (!bt(r)) return r;
          var X = Ne(r);
          if (X) {
            if (((I = V0(r)), !T)) return lr(r, I);
          } else {
            var Z = Xt(r),
              ae = Z == ne || Z == fe;
            if (Pi(r)) return Lh(r, T);
            if (Z == Fe || Z == he || (ae && !g)) {
              if (((I = U || ae ? {} : il(r)), !T))
                return U ? j0(r, i0(I, r)) : $0(r, dh(I, r));
            } else {
              if (!st[Z]) return g ? r : {};
              I = k0(r, Z, T);
            }
          }
          v || (v = new zr());
          var ye = v.get(r);
          if (ye) return ye;
          v.set(r, I),
            Nl(r)
              ? r.forEach(function (Ee) {
                  I.add(Cr(Ee, n, a, Ee, r, v));
                })
              : Cl(r) &&
                r.forEach(function (Ee, Ge) {
                  I.set(Ge, Cr(Ee, n, a, Ge, r, v));
                });
          var we = J ? (U ? nc : ic) : U ? pr : kt,
            ze = X ? t : we(r);
          return (
            Pr(ze || r, function (Ee, Ge) {
              ze && ((Ge = Ee), (Ee = r[Ge])),
                Bn(I, Ge, Cr(Ee, n, a, Ge, r, v));
            }),
            I
          );
        }
        function n0(r) {
          var n = kt(r);
          return function (a) {
            return gh(a, r, n);
          };
        }
        function gh(r, n, a) {
          var u = a.length;
          if (r == null) return !u;
          for (r = ut(r); u--; ) {
            var g = a[u],
              v = n[g],
              I = r[g];
            if ((I === t && !(g in r)) || !v(I)) return !1;
          }
          return !0;
        }
        function _h(r, n, a) {
          if (typeof r != "function") throw new Ar(l);
          return Xn(function () {
            r.apply(t, a);
          }, n);
        }
        function Vn(r, n, a, u) {
          var g = -1,
            v = Bs,
            I = !0,
            T = r.length,
            U = [],
            J = n.length;
          if (!T) return U;
          a && (n = vt(n, vr(a))),
            u
              ? ((v = Ia), (I = !1))
              : n.length >= o && ((v = Ln), (I = !1), (n = new Hi(n)));
          e: for (; ++g < T; ) {
            var X = r[g],
              Z = a == null ? X : a(X);
            if (((X = u || X !== 0 ? X : 0), I && Z === Z)) {
              for (var ae = J; ae--; ) if (n[ae] === Z) continue e;
              U.push(X);
            } else v(n, Z, u) || U.push(X);
          }
          return U;
        }
        var Si = Kh(Yr),
          yh = Kh(qa, !0);
        function s0(r, n) {
          var a = !0;
          return (
            Si(r, function (u, g, v) {
              return (a = !!n(u, g, v)), a;
            }),
            a
          );
        }
        function co(r, n, a) {
          for (var u = -1, g = r.length; ++u < g; ) {
            var v = r[u],
              I = n(v);
            if (I != null && (T === t ? I === I && !br(I) : a(I, T)))
              var T = I,
                U = v;
          }
          return U;
        }
        function o0(r, n, a, u) {
          var g = r.length;
          for (
            a = Le(a),
              a < 0 && (a = -a > g ? 0 : g + a),
              u = u === t || u > g ? g : Le(u),
              u < 0 && (u += g),
              u = a > u ? 0 : jl(u);
            a < u;

          )
            r[a++] = n;
          return r;
        }
        function vh(r, n) {
          var a = [];
          return (
            Si(r, function (u, g, v) {
              n(u, g, v) && a.push(u);
            }),
            a
          );
        }
        function Wt(r, n, a, u, g) {
          var v = -1,
            I = r.length;
          for (a || (a = W0), g || (g = []); ++v < I; ) {
            var T = r[v];
            n > 0 && a(T)
              ? n > 1
                ? Wt(T, n - 1, a, u, g)
                : bi(g, T)
              : u || (g[g.length] = T);
          }
          return g;
        }
        var Ma = Bh(),
          mh = Bh(!0);
        function Yr(r, n) {
          return r && Ma(r, n, kt);
        }
        function qa(r, n) {
          return r && mh(r, n, kt);
        }
        function uo(r, n) {
          return mi(n, function (a) {
            return li(r[a]);
          });
        }
        function Bi(r, n) {
          n = xi(n, r);
          for (var a = 0, u = n.length; r != null && a < u; ) r = r[Xr(n[a++])];
          return a && a == u ? r : t;
        }
        function bh(r, n, a) {
          var u = n(r);
          return Ne(r) ? u : bi(u, a(r));
        }
        function rr(r) {
          return r == null
            ? r === t
              ? qe
              : Ve
            : qi && qi in ut(r)
            ? H0(r)
            : t_(r);
        }
        function za(r, n) {
          return r > n;
        }
        function a0(r, n) {
          return r != null && nt.call(r, n);
        }
        function c0(r, n) {
          return r != null && n in ut(r);
        }
        function u0(r, n, a) {
          return r >= Jt(n, a) && r < Bt(n, a);
        }
        function Ha(r, n, a) {
          for (
            var u = a ? Ia : Bs,
              g = r[0].length,
              v = r.length,
              I = v,
              T = H(v),
              U = 1 / 0,
              J = [];
            I--;

          ) {
            var X = r[I];
            I && n && (X = vt(X, vr(n))),
              (U = Jt(X.length, U)),
              (T[I] =
                !a && (n || (g >= 120 && X.length >= 120))
                  ? new Hi(I && X)
                  : t);
          }
          X = r[0];
          var Z = -1,
            ae = T[0];
          e: for (; ++Z < g && J.length < U; ) {
            var ye = X[Z],
              we = n ? n(ye) : ye;
            if (
              ((ye = a || ye !== 0 ? ye : 0), !(ae ? Ln(ae, we) : u(J, we, a)))
            ) {
              for (I = v; --I; ) {
                var ze = T[I];
                if (!(ze ? Ln(ze, we) : u(r[I], we, a))) continue e;
              }
              ae && ae.push(we), J.push(ye);
            }
          }
          return J;
        }
        function h0(r, n, a, u) {
          return (
            Yr(r, function (g, v, I) {
              n(u, a(g), v, I);
            }),
            u
          );
        }
        function kn(r, n, a) {
          (n = xi(n, r)), (r = al(r, n));
          var u = r == null ? r : r[Xr(Nr(n))];
          return u == null ? t : Vt(u, r, a);
        }
        function wh(r) {
          return Pt(r) && rr(r) == he;
        }
        function l0(r) {
          return Pt(r) && rr(r) == Se;
        }
        function f0(r) {
          return Pt(r) && rr(r) == R;
        }
        function Gn(r, n, a, u, g) {
          return r === n
            ? !0
            : r == null || n == null || (!Pt(r) && !Pt(n))
            ? r !== r && n !== n
            : p0(r, n, a, u, Gn, g);
        }
        function p0(r, n, a, u, g, v) {
          var I = Ne(r),
            T = Ne(n),
            U = I ? ve : Xt(r),
            J = T ? ve : Xt(n);
          (U = U == he ? Fe : U), (J = J == he ? Fe : J);
          var X = U == Fe,
            Z = J == Fe,
            ae = U == J;
          if (ae && Pi(r)) {
            if (!Pi(n)) return !1;
            (I = !0), (X = !1);
          }
          if (ae && !X)
            return (
              v || (v = new zr()),
              I || En(r) ? el(r, n, a, u, g, v) : q0(r, n, U, a, u, g, v)
            );
          if (!(a & M)) {
            var ye = X && nt.call(r, "__wrapped__"),
              we = Z && nt.call(n, "__wrapped__");
            if (ye || we) {
              var ze = ye ? r.value() : r,
                Ee = we ? n.value() : n;
              return v || (v = new zr()), g(ze, Ee, a, u, v);
            }
          }
          return ae ? (v || (v = new zr()), z0(r, n, a, u, g, v)) : !1;
        }
        function d0(r) {
          return Pt(r) && Xt(r) == Ie;
        }
        function Ka(r, n, a, u) {
          var g = a.length,
            v = g,
            I = !u;
          if (r == null) return !v;
          for (r = ut(r); g--; ) {
            var T = a[g];
            if (I && T[2] ? T[1] !== r[T[0]] : !(T[0] in r)) return !1;
          }
          for (; ++g < v; ) {
            T = a[g];
            var U = T[0],
              J = r[U],
              X = T[1];
            if (I && T[2]) {
              if (J === t && !(U in r)) return !1;
            } else {
              var Z = new zr();
              if (u) var ae = u(J, X, U, r, n, Z);
              if (!(ae === t ? Gn(X, J, M | K, u, Z) : ae)) return !1;
            }
          }
          return !0;
        }
        function Eh(r) {
          if (!bt(r) || J0(r)) return !1;
          var n = li(r) ? dg : ca;
          return n.test(ki(r));
        }
        function g0(r) {
          return Pt(r) && rr(r) == Me;
        }
        function _0(r) {
          return Pt(r) && Xt(r) == xe;
        }
        function y0(r) {
          return Pt(r) && Po(r.length) && !!ot[rr(r)];
        }
        function Sh(r) {
          return typeof r == "function"
            ? r
            : r == null
            ? dr
            : typeof r == "object"
            ? Ne(r)
              ? Oh(r[0], r[1])
              : xh(r)
            : Vl(r);
        }
        function Ba(r) {
          if (!Jn(r)) return bg(r);
          var n = [];
          for (var a in ut(r)) nt.call(r, a) && a != "constructor" && n.push(a);
          return n;
        }
        function v0(r) {
          if (!bt(r)) return e_(r);
          var n = Jn(r),
            a = [];
          for (var u in r)
            (u == "constructor" && (n || !nt.call(r, u))) || a.push(u);
          return a;
        }
        function Va(r, n) {
          return r < n;
        }
        function Ih(r, n) {
          var a = -1,
            u = fr(r) ? H(r.length) : [];
          return (
            Si(r, function (g, v, I) {
              u[++a] = n(g, v, I);
            }),
            u
          );
        }
        function xh(r) {
          var n = oc(r);
          return n.length == 1 && n[0][2]
            ? sl(n[0][0], n[0][1])
            : function (a) {
                return a === r || Ka(a, r, n);
              };
        }
        function Oh(r, n) {
          return cc(r) && nl(n)
            ? sl(Xr(r), n)
            : function (a) {
                var u = vc(a, r);
                return u === t && u === n ? mc(a, r) : Gn(n, u, M | K);
              };
        }
        function ho(r, n, a, u, g) {
          r !== n &&
            Ma(
              n,
              function (v, I) {
                if ((g || (g = new zr()), bt(v))) m0(r, n, I, a, ho, u, g);
                else {
                  var T = u ? u(hc(r, I), v, I + "", r, n, g) : t;
                  T === t && (T = v), Fa(r, I, T);
                }
              },
              pr,
            );
        }
        function m0(r, n, a, u, g, v, I) {
          var T = hc(r, a),
            U = hc(n, a),
            J = I.get(U);
          if (J) {
            Fa(r, a, J);
            return;
          }
          var X = v ? v(T, U, a + "", r, n, I) : t,
            Z = X === t;
          if (Z) {
            var ae = Ne(U),
              ye = !ae && Pi(U),
              we = !ae && !ye && En(U);
            (X = U),
              ae || ye || we
                ? Ne(T)
                  ? (X = T)
                  : Rt(T)
                  ? (X = lr(T))
                  : ye
                  ? ((Z = !1), (X = Lh(U, !0)))
                  : we
                  ? ((Z = !1), (X = Mh(U, !0)))
                  : (X = [])
                : Qn(U) || Gi(U)
                ? ((X = T),
                  Gi(T) ? (X = Dl(T)) : (!bt(T) || li(T)) && (X = il(U)))
                : (Z = !1);
          }
          Z && (I.set(U, X), g(X, U, u, v, I), I.delete(U)), Fa(r, a, X);
        }
        function Ph(r, n) {
          var a = r.length;
          if (a) return (n += n < 0 ? a : 0), hi(n, a) ? r[n] : t;
        }
        function Ah(r, n, a) {
          n.length
            ? (n = vt(n, function (v) {
                return Ne(v)
                  ? function (I) {
                      return Bi(I, v.length === 1 ? v[0] : v);
                    }
                  : v;
              }))
            : (n = [dr]);
          var u = -1;
          n = vt(n, vr(me()));
          var g = Ih(r, function (v, I, T) {
            var U = vt(n, function (J) {
              return J(v);
            });
            return { criteria: U, index: ++u, value: v };
          });
          return kd(g, function (v, I) {
            return N0(v, I, a);
          });
        }
        function b0(r, n) {
          return Th(r, n, function (a, u) {
            return mc(r, u);
          });
        }
        function Th(r, n, a) {
          for (var u = -1, g = n.length, v = {}; ++u < g; ) {
            var I = n[u],
              T = Bi(r, I);
            a(T, I) && Wn(v, xi(I, r), T);
          }
          return v;
        }
        function w0(r) {
          return function (n) {
            return Bi(n, r);
          };
        }
        function ka(r, n, a, u) {
          var g = u ? Vd : ln,
            v = -1,
            I = n.length,
            T = r;
          for (r === n && (n = lr(n)), a && (T = vt(r, vr(a))); ++v < I; )
            for (
              var U = 0, J = n[v], X = a ? a(J) : J;
              (U = g(T, X, U, u)) > -1;

            )
              T !== r && eo.call(T, U, 1), eo.call(r, U, 1);
          return r;
        }
        function Ch(r, n) {
          for (var a = r ? n.length : 0, u = a - 1; a--; ) {
            var g = n[a];
            if (a == u || g !== v) {
              var v = g;
              hi(g) ? eo.call(r, g, 1) : Ja(r, g);
            }
          }
          return r;
        }
        function Ga(r, n) {
          return r + io(hh() * (n - r + 1));
        }
        function E0(r, n, a, u) {
          for (var g = -1, v = Bt(ro((n - r) / (a || 1)), 0), I = H(v); v--; )
            (I[u ? v : ++g] = r), (r += a);
          return I;
        }
        function Wa(r, n) {
          var a = "";
          if (!r || n < 1 || n > W) return a;
          do n % 2 && (a += r), (n = io(n / 2)), n && (r += r);
          while (n);
          return a;
        }
        function Be(r, n) {
          return lc(ol(r, n, dr), r + "");
        }
        function S0(r) {
          return ph(Sn(r));
        }
        function I0(r, n) {
          var a = Sn(r);
          return wo(a, Ki(n, 0, a.length));
        }
        function Wn(r, n, a, u) {
          if (!bt(r)) return r;
          n = xi(n, r);
          for (
            var g = -1, v = n.length, I = v - 1, T = r;
            T != null && ++g < v;

          ) {
            var U = Xr(n[g]),
              J = a;
            if (U === "__proto__" || U === "constructor" || U === "prototype")
              return r;
            if (g != I) {
              var X = T[U];
              (J = u ? u(X, U, T) : t),
                J === t && (J = bt(X) ? X : hi(n[g + 1]) ? [] : {});
            }
            Bn(T, U, J), (T = T[U]);
          }
          return r;
        }
        var Rh = no
            ? function (r, n) {
                return no.set(r, n), r;
              }
            : dr,
          x0 = to
            ? function (r, n) {
                return to(r, "toString", {
                  configurable: !0,
                  enumerable: !1,
                  value: wc(n),
                  writable: !0,
                });
              }
            : dr;
        function O0(r) {
          return wo(Sn(r));
        }
        function Rr(r, n, a) {
          var u = -1,
            g = r.length;
          n < 0 && (n = -n > g ? 0 : g + n),
            (a = a > g ? g : a),
            a < 0 && (a += g),
            (g = n > a ? 0 : (a - n) >>> 0),
            (n >>>= 0);
          for (var v = H(g); ++u < g; ) v[u] = r[u + n];
          return v;
        }
        function P0(r, n) {
          var a;
          return (
            Si(r, function (u, g, v) {
              return (a = n(u, g, v)), !a;
            }),
            !!a
          );
        }
        function lo(r, n, a) {
          var u = 0,
            g = r == null ? u : r.length;
          if (typeof n == "number" && n === n && g <= ie) {
            for (; u < g; ) {
              var v = (u + g) >>> 1,
                I = r[v];
              I !== null && !br(I) && (a ? I <= n : I < n)
                ? (u = v + 1)
                : (g = v);
            }
            return g;
          }
          return Ya(r, n, dr, a);
        }
        function Ya(r, n, a, u) {
          var g = 0,
            v = r == null ? 0 : r.length;
          if (v === 0) return 0;
          n = a(n);
          for (
            var I = n !== n, T = n === null, U = br(n), J = n === t;
            g < v;

          ) {
            var X = io((g + v) / 2),
              Z = a(r[X]),
              ae = Z !== t,
              ye = Z === null,
              we = Z === Z,
              ze = br(Z);
            if (I) var Ee = u || we;
            else
              J
                ? (Ee = we && (u || ae))
                : T
                ? (Ee = we && ae && (u || !ye))
                : U
                ? (Ee = we && ae && !ye && (u || !ze))
                : ye || ze
                ? (Ee = !1)
                : (Ee = u ? Z <= n : Z < n);
            Ee ? (g = X + 1) : (v = X);
          }
          return Jt(v, Oe);
        }
        function Nh(r, n) {
          for (var a = -1, u = r.length, g = 0, v = []; ++a < u; ) {
            var I = r[a],
              T = n ? n(I) : I;
            if (!a || !Hr(T, U)) {
              var U = T;
              v[g++] = I === 0 ? 0 : I;
            }
          }
          return v;
        }
        function $h(r) {
          return typeof r == "number" ? r : br(r) ? Y : +r;
        }
        function mr(r) {
          if (typeof r == "string") return r;
          if (Ne(r)) return vt(r, mr) + "";
          if (br(r)) return lh ? lh.call(r) : "";
          var n = r + "";
          return n == "0" && 1 / r == -te ? "-0" : n;
        }
        function Ii(r, n, a) {
          var u = -1,
            g = Bs,
            v = r.length,
            I = !0,
            T = [],
            U = T;
          if (a) (I = !1), (g = Ia);
          else if (v >= o) {
            var J = n ? null : L0(r);
            if (J) return ks(J);
            (I = !1), (g = Ln), (U = new Hi());
          } else U = n ? [] : T;
          e: for (; ++u < v; ) {
            var X = r[u],
              Z = n ? n(X) : X;
            if (((X = a || X !== 0 ? X : 0), I && Z === Z)) {
              for (var ae = U.length; ae--; ) if (U[ae] === Z) continue e;
              n && U.push(Z), T.push(X);
            } else g(U, Z, a) || (U !== T && U.push(Z), T.push(X));
          }
          return T;
        }
        function Ja(r, n) {
          return (
            (n = xi(n, r)), (r = al(r, n)), r == null || delete r[Xr(Nr(n))]
          );
        }
        function jh(r, n, a, u) {
          return Wn(r, n, a(Bi(r, n)), u);
        }
        function fo(r, n, a, u) {
          for (
            var g = r.length, v = u ? g : -1;
            (u ? v-- : ++v < g) && n(r[v], v, r);

          );
          return a
            ? Rr(r, u ? 0 : v, u ? v + 1 : g)
            : Rr(r, u ? v + 1 : 0, u ? g : v);
        }
        function Dh(r, n) {
          var a = r;
          return (
            a instanceof Ye && (a = a.value()),
            xa(
              n,
              function (u, g) {
                return g.func.apply(g.thisArg, bi([u], g.args));
              },
              a,
            )
          );
        }
        function Xa(r, n, a) {
          var u = r.length;
          if (u < 2) return u ? Ii(r[0]) : [];
          for (var g = -1, v = H(u); ++g < u; )
            for (var I = r[g], T = -1; ++T < u; )
              T != g && (v[g] = Vn(v[g] || I, r[T], n, a));
          return Ii(Wt(v, 1), n, a);
        }
        function Uh(r, n, a) {
          for (var u = -1, g = r.length, v = n.length, I = {}; ++u < g; ) {
            var T = u < v ? n[u] : t;
            a(I, r[u], T);
          }
          return I;
        }
        function Qa(r) {
          return Rt(r) ? r : [];
        }
        function Za(r) {
          return typeof r == "function" ? r : dr;
        }
        function xi(r, n) {
          return Ne(r) ? r : cc(r, n) ? [r] : ll(it(r));
        }
        var A0 = Be;
        function Oi(r, n, a) {
          var u = r.length;
          return (a = a === t ? u : a), !n && a >= u ? r : Rr(r, n, a);
        }
        var Fh =
          gg ||
          function (r) {
            return Xe.clearTimeout(r);
          };
        function Lh(r, n) {
          if (n) return r.slice();
          var a = r.length,
            u = sh ? sh(a) : new r.constructor(a);
          return r.copy(u), u;
        }
        function ec(r) {
          var n = new r.constructor(r.byteLength);
          return new Qs(n).set(new Qs(r)), n;
        }
        function T0(r, n) {
          var a = n ? ec(r.buffer) : r.buffer;
          return new r.constructor(a, r.byteOffset, r.byteLength);
        }
        function C0(r) {
          var n = new r.constructor(r.source, xr.exec(r));
          return (n.lastIndex = r.lastIndex), n;
        }
        function R0(r) {
          return Kn ? ut(Kn.call(r)) : {};
        }
        function Mh(r, n) {
          var a = n ? ec(r.buffer) : r.buffer;
          return new r.constructor(a, r.byteOffset, r.length);
        }
        function qh(r, n) {
          if (r !== n) {
            var a = r !== t,
              u = r === null,
              g = r === r,
              v = br(r),
              I = n !== t,
              T = n === null,
              U = n === n,
              J = br(n);
            if (
              (!T && !J && !v && r > n) ||
              (v && I && U && !T && !J) ||
              (u && I && U) ||
              (!a && U) ||
              !g
            )
              return 1;
            if (
              (!u && !v && !J && r < n) ||
              (J && a && g && !u && !v) ||
              (T && a && g) ||
              (!I && g) ||
              !U
            )
              return -1;
          }
          return 0;
        }
        function N0(r, n, a) {
          for (
            var u = -1,
              g = r.criteria,
              v = n.criteria,
              I = g.length,
              T = a.length;
            ++u < I;

          ) {
            var U = qh(g[u], v[u]);
            if (U) {
              if (u >= T) return U;
              var J = a[u];
              return U * (J == "desc" ? -1 : 1);
            }
          }
          return r.index - n.index;
        }
        function zh(r, n, a, u) {
          for (
            var g = -1,
              v = r.length,
              I = a.length,
              T = -1,
              U = n.length,
              J = Bt(v - I, 0),
              X = H(U + J),
              Z = !u;
            ++T < U;

          )
            X[T] = n[T];
          for (; ++g < I; ) (Z || g < v) && (X[a[g]] = r[g]);
          for (; J--; ) X[T++] = r[g++];
          return X;
        }
        function Hh(r, n, a, u) {
          for (
            var g = -1,
              v = r.length,
              I = -1,
              T = a.length,
              U = -1,
              J = n.length,
              X = Bt(v - T, 0),
              Z = H(X + J),
              ae = !u;
            ++g < X;

          )
            Z[g] = r[g];
          for (var ye = g; ++U < J; ) Z[ye + U] = n[U];
          for (; ++I < T; ) (ae || g < v) && (Z[ye + a[I]] = r[g++]);
          return Z;
        }
        function lr(r, n) {
          var a = -1,
            u = r.length;
          for (n || (n = H(u)); ++a < u; ) n[a] = r[a];
          return n;
        }
        function Jr(r, n, a, u) {
          var g = !a;
          a || (a = {});
          for (var v = -1, I = n.length; ++v < I; ) {
            var T = n[v],
              U = u ? u(a[T], r[T], T, a, r) : t;
            U === t && (U = r[T]), g ? ai(a, T, U) : Bn(a, T, U);
          }
          return a;
        }
        function $0(r, n) {
          return Jr(r, ac(r), n);
        }
        function j0(r, n) {
          return Jr(r, tl(r), n);
        }
        function po(r, n) {
          return function (a, u) {
            var g = Ne(a) ? Md : r0,
              v = n ? n() : {};
            return g(a, r, me(u, 2), v);
          };
        }
        function mn(r) {
          return Be(function (n, a) {
            var u = -1,
              g = a.length,
              v = g > 1 ? a[g - 1] : t,
              I = g > 2 ? a[2] : t;
            for (
              v = r.length > 3 && typeof v == "function" ? (g--, v) : t,
                I && ir(a[0], a[1], I) && ((v = g < 3 ? t : v), (g = 1)),
                n = ut(n);
              ++u < g;

            ) {
              var T = a[u];
              T && r(n, T, u, v);
            }
            return n;
          });
        }
        function Kh(r, n) {
          return function (a, u) {
            if (a == null) return a;
            if (!fr(a)) return r(a, u);
            for (
              var g = a.length, v = n ? g : -1, I = ut(a);
              (n ? v-- : ++v < g) && u(I[v], v, I) !== !1;

            );
            return a;
          };
        }
        function Bh(r) {
          return function (n, a, u) {
            for (var g = -1, v = ut(n), I = u(n), T = I.length; T--; ) {
              var U = I[r ? T : ++g];
              if (a(v[U], U, v) === !1) break;
            }
            return n;
          };
        }
        function D0(r, n, a) {
          var u = n & B,
            g = Yn(r);
          function v() {
            var I = this && this !== Xe && this instanceof v ? g : r;
            return I.apply(u ? a : this, arguments);
          }
          return v;
        }
        function Vh(r) {
          return function (n) {
            n = it(n);
            var a = fn(n) ? qr(n) : t,
              u = a ? a[0] : n.charAt(0),
              g = a ? Oi(a, 1).join("") : n.slice(1);
            return u[r]() + g;
          };
        }
        function bn(r) {
          return function (n) {
            return xa(Kl(Hl(n).replace(Un, "")), r, "");
          };
        }
        function Yn(r) {
          return function () {
            var n = arguments;
            switch (n.length) {
              case 0:
                return new r();
              case 1:
                return new r(n[0]);
              case 2:
                return new r(n[0], n[1]);
              case 3:
                return new r(n[0], n[1], n[2]);
              case 4:
                return new r(n[0], n[1], n[2], n[3]);
              case 5:
                return new r(n[0], n[1], n[2], n[3], n[4]);
              case 6:
                return new r(n[0], n[1], n[2], n[3], n[4], n[5]);
              case 7:
                return new r(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
            }
            var a = vn(r.prototype),
              u = r.apply(a, n);
            return bt(u) ? u : a;
          };
        }
        function U0(r, n, a) {
          var u = Yn(r);
          function g() {
            for (var v = arguments.length, I = H(v), T = v, U = wn(g); T--; )
              I[T] = arguments[T];
            var J = v < 3 && I[0] !== U && I[v - 1] !== U ? [] : wi(I, U);
            if (((v -= J.length), v < a))
              return Jh(r, n, go, g.placeholder, t, I, J, t, t, a - v);
            var X = this && this !== Xe && this instanceof g ? u : r;
            return Vt(X, this, I);
          }
          return g;
        }
        function kh(r) {
          return function (n, a, u) {
            var g = ut(n);
            if (!fr(n)) {
              var v = me(a, 3);
              (n = kt(n)),
                (a = function (T) {
                  return v(g[T], T, g);
                });
            }
            var I = r(n, a, u);
            return I > -1 ? g[v ? n[I] : I] : t;
          };
        }
        function Gh(r) {
          return ui(function (n) {
            var a = n.length,
              u = a,
              g = Tr.prototype.thru;
            for (r && n.reverse(); u--; ) {
              var v = n[u];
              if (typeof v != "function") throw new Ar(l);
              if (g && !I && mo(v) == "wrapper") var I = new Tr([], !0);
            }
            for (u = I ? u : a; ++u < a; ) {
              v = n[u];
              var T = mo(v),
                U = T == "wrapper" ? sc(v) : t;
              U &&
              uc(U[0]) &&
              U[1] == (h | F | C | m) &&
              !U[4].length &&
              U[9] == 1
                ? (I = I[mo(U[0])].apply(I, U[3]))
                : (I = v.length == 1 && uc(v) ? I[T]() : I.thru(v));
            }
            return function () {
              var J = arguments,
                X = J[0];
              if (I && J.length == 1 && Ne(X)) return I.plant(X).value();
              for (var Z = 0, ae = a ? n[Z].apply(this, J) : X; ++Z < a; )
                ae = n[Z].call(this, ae);
              return ae;
            };
          });
        }
        function go(r, n, a, u, g, v, I, T, U, J) {
          var X = n & h,
            Z = n & B,
            ae = n & oe,
            ye = n & (F | x),
            we = n & G,
            ze = ae ? t : Yn(r);
          function Ee() {
            for (var Ge = arguments.length, Qe = H(Ge), wr = Ge; wr--; )
              Qe[wr] = arguments[wr];
            if (ye)
              var nr = wn(Ee),
                Er = Wd(Qe, nr);
            if (
              (u && (Qe = zh(Qe, u, g, ye)),
              v && (Qe = Hh(Qe, v, I, ye)),
              (Ge -= Er),
              ye && Ge < J)
            ) {
              var Nt = wi(Qe, nr);
              return Jh(r, n, go, Ee.placeholder, a, Qe, Nt, T, U, J - Ge);
            }
            var Kr = Z ? a : this,
              pi = ae ? Kr[r] : r;
            return (
              (Ge = Qe.length),
              T ? (Qe = r_(Qe, T)) : we && Ge > 1 && Qe.reverse(),
              X && U < Ge && (Qe.length = U),
              this && this !== Xe && this instanceof Ee && (pi = ze || Yn(pi)),
              pi.apply(Kr, Qe)
            );
          }
          return Ee;
        }
        function Wh(r, n) {
          return function (a, u) {
            return h0(a, r, n(u), {});
          };
        }
        function _o(r, n) {
          return function (a, u) {
            var g;
            if (a === t && u === t) return n;
            if ((a !== t && (g = a), u !== t)) {
              if (g === t) return u;
              typeof a == "string" || typeof u == "string"
                ? ((a = mr(a)), (u = mr(u)))
                : ((a = $h(a)), (u = $h(u))),
                (g = r(a, u));
            }
            return g;
          };
        }
        function tc(r) {
          return ui(function (n) {
            return (
              (n = vt(n, vr(me()))),
              Be(function (a) {
                var u = this;
                return r(n, function (g) {
                  return Vt(g, u, a);
                });
              })
            );
          });
        }
        function yo(r, n) {
          n = n === t ? " " : mr(n);
          var a = n.length;
          if (a < 2) return a ? Wa(n, r) : n;
          var u = Wa(n, ro(r / pn(n)));
          return fn(n) ? Oi(qr(u), 0, r).join("") : u.slice(0, r);
        }
        function F0(r, n, a, u) {
          var g = n & B,
            v = Yn(r);
          function I() {
            for (
              var T = -1,
                U = arguments.length,
                J = -1,
                X = u.length,
                Z = H(X + U),
                ae = this && this !== Xe && this instanceof I ? v : r;
              ++J < X;

            )
              Z[J] = u[J];
            for (; U--; ) Z[J++] = arguments[++T];
            return Vt(ae, g ? a : this, Z);
          }
          return I;
        }
        function Yh(r) {
          return function (n, a, u) {
            return (
              u && typeof u != "number" && ir(n, a, u) && (a = u = t),
              (n = fi(n)),
              a === t ? ((a = n), (n = 0)) : (a = fi(a)),
              (u = u === t ? (n < a ? 1 : -1) : fi(u)),
              E0(n, a, u, r)
            );
          };
        }
        function vo(r) {
          return function (n, a) {
            return (
              (typeof n == "string" && typeof a == "string") ||
                ((n = $r(n)), (a = $r(a))),
              r(n, a)
            );
          };
        }
        function Jh(r, n, a, u, g, v, I, T, U, J) {
          var X = n & F,
            Z = X ? I : t,
            ae = X ? t : I,
            ye = X ? v : t,
            we = X ? t : v;
          (n |= X ? C : b), (n &= ~(X ? b : C)), n & N || (n &= ~(B | oe));
          var ze = [r, n, g, ye, Z, we, ae, T, U, J],
            Ee = a.apply(t, ze);
          return uc(r) && cl(Ee, ze), (Ee.placeholder = u), ul(Ee, r, n);
        }
        function rc(r) {
          var n = Kt[r];
          return function (a, u) {
            if (
              ((a = $r(a)), (u = u == null ? 0 : Jt(Le(u), 292)), u && uh(a))
            ) {
              var g = (it(a) + "e").split("e"),
                v = n(g[0] + "e" + (+g[1] + u));
              return (
                (g = (it(v) + "e").split("e")), +(g[0] + "e" + (+g[1] - u))
              );
            }
            return n(a);
          };
        }
        var L0 =
          _n && 1 / ks(new _n([, -0]))[1] == te
            ? function (r) {
                return new _n(r);
              }
            : Ic;
        function Xh(r) {
          return function (n) {
            var a = Xt(n);
            return a == Ie ? Na(n) : a == xe ? tg(n) : Gd(n, r(n));
          };
        }
        function ci(r, n, a, u, g, v, I, T) {
          var U = n & oe;
          if (!U && typeof r != "function") throw new Ar(l);
          var J = u ? u.length : 0;
          if (
            (J || ((n &= ~(C | b)), (u = g = t)),
            (I = I === t ? I : Bt(Le(I), 0)),
            (T = T === t ? T : Le(T)),
            (J -= g ? g.length : 0),
            n & b)
          ) {
            var X = u,
              Z = g;
            u = g = t;
          }
          var ae = U ? t : sc(r),
            ye = [r, n, a, u, g, X, Z, v, I, T];
          if (
            (ae && Z0(ye, ae),
            (r = ye[0]),
            (n = ye[1]),
            (a = ye[2]),
            (u = ye[3]),
            (g = ye[4]),
            (T = ye[9] = ye[9] === t ? (U ? 0 : r.length) : Bt(ye[9] - J, 0)),
            !T && n & (F | x) && (n &= ~(F | x)),
            !n || n == B)
          )
            var we = D0(r, n, a);
          else
            n == F || n == x
              ? (we = U0(r, n, T))
              : (n == C || n == (B | C)) && !g.length
              ? (we = F0(r, n, a, u))
              : (we = go.apply(t, ye));
          var ze = ae ? Rh : cl;
          return ul(ze(we, ye), r, n);
        }
        function Qh(r, n, a, u) {
          return r === t || (Hr(r, gn[a]) && !nt.call(u, a)) ? n : r;
        }
        function Zh(r, n, a, u, g, v) {
          return (
            bt(r) && bt(n) && (v.set(n, r), ho(r, n, t, Zh, v), v.delete(n)), r
          );
        }
        function M0(r) {
          return Qn(r) ? t : r;
        }
        function el(r, n, a, u, g, v) {
          var I = a & M,
            T = r.length,
            U = n.length;
          if (T != U && !(I && U > T)) return !1;
          var J = v.get(r),
            X = v.get(n);
          if (J && X) return J == n && X == r;
          var Z = -1,
            ae = !0,
            ye = a & K ? new Hi() : t;
          for (v.set(r, n), v.set(n, r); ++Z < T; ) {
            var we = r[Z],
              ze = n[Z];
            if (u) var Ee = I ? u(ze, we, Z, n, r, v) : u(we, ze, Z, r, n, v);
            if (Ee !== t) {
              if (Ee) continue;
              ae = !1;
              break;
            }
            if (ye) {
              if (
                !Oa(n, function (Ge, Qe) {
                  if (!Ln(ye, Qe) && (we === Ge || g(we, Ge, a, u, v)))
                    return ye.push(Qe);
                })
              ) {
                ae = !1;
                break;
              }
            } else if (!(we === ze || g(we, ze, a, u, v))) {
              ae = !1;
              break;
            }
          }
          return v.delete(r), v.delete(n), ae;
        }
        function q0(r, n, a, u, g, v, I) {
          switch (a) {
            case Te:
              if (r.byteLength != n.byteLength || r.byteOffset != n.byteOffset)
                return !1;
              (r = r.buffer), (n = n.buffer);
            case Se:
              return !(
                r.byteLength != n.byteLength || !v(new Qs(r), new Qs(n))
              );
            case L:
            case R:
            case He:
              return Hr(+r, +n);
            case O:
              return r.name == n.name && r.message == n.message;
            case Me:
            case $e:
              return r == n + "";
            case Ie:
              var T = Na;
            case xe:
              var U = u & M;
              if ((T || (T = ks), r.size != n.size && !U)) return !1;
              var J = I.get(r);
              if (J) return J == n;
              (u |= K), I.set(r, n);
              var X = el(T(r), T(n), u, g, v, I);
              return I.delete(r), X;
            case je:
              if (Kn) return Kn.call(r) == Kn.call(n);
          }
          return !1;
        }
        function z0(r, n, a, u, g, v) {
          var I = a & M,
            T = ic(r),
            U = T.length,
            J = ic(n),
            X = J.length;
          if (U != X && !I) return !1;
          for (var Z = U; Z--; ) {
            var ae = T[Z];
            if (!(I ? ae in n : nt.call(n, ae))) return !1;
          }
          var ye = v.get(r),
            we = v.get(n);
          if (ye && we) return ye == n && we == r;
          var ze = !0;
          v.set(r, n), v.set(n, r);
          for (var Ee = I; ++Z < U; ) {
            ae = T[Z];
            var Ge = r[ae],
              Qe = n[ae];
            if (u) var wr = I ? u(Qe, Ge, ae, n, r, v) : u(Ge, Qe, ae, r, n, v);
            if (!(wr === t ? Ge === Qe || g(Ge, Qe, a, u, v) : wr)) {
              ze = !1;
              break;
            }
            Ee || (Ee = ae == "constructor");
          }
          if (ze && !Ee) {
            var nr = r.constructor,
              Er = n.constructor;
            nr != Er &&
              "constructor" in r &&
              "constructor" in n &&
              !(
                typeof nr == "function" &&
                nr instanceof nr &&
                typeof Er == "function" &&
                Er instanceof Er
              ) &&
              (ze = !1);
          }
          return v.delete(r), v.delete(n), ze;
        }
        function ui(r) {
          return lc(ol(r, t, gl), r + "");
        }
        function ic(r) {
          return bh(r, kt, ac);
        }
        function nc(r) {
          return bh(r, pr, tl);
        }
        var sc = no
          ? function (r) {
              return no.get(r);
            }
          : Ic;
        function mo(r) {
          for (
            var n = r.name + "", a = yn[n], u = nt.call(yn, n) ? a.length : 0;
            u--;

          ) {
            var g = a[u],
              v = g.func;
            if (v == null || v == r) return g.name;
          }
          return n;
        }
        function wn(r) {
          var n = nt.call(y, "placeholder") ? y : r;
          return n.placeholder;
        }
        function me() {
          var r = y.iteratee || Ec;
          return (
            (r = r === Ec ? Sh : r),
            arguments.length ? r(arguments[0], arguments[1]) : r
          );
        }
        function bo(r, n) {
          var a = r.__data__;
          return Y0(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
        }
        function oc(r) {
          for (var n = kt(r), a = n.length; a--; ) {
            var u = n[a],
              g = r[u];
            n[a] = [u, g, nl(g)];
          }
          return n;
        }
        function Vi(r, n) {
          var a = Qd(r, n);
          return Eh(a) ? a : t;
        }
        function H0(r) {
          var n = nt.call(r, qi),
            a = r[qi];
          try {
            r[qi] = t;
            var u = !0;
          } catch {}
          var g = Js.call(r);
          return u && (n ? (r[qi] = a) : delete r[qi]), g;
        }
        var ac = ja
            ? function (r) {
                return r == null
                  ? []
                  : ((r = ut(r)),
                    mi(ja(r), function (n) {
                      return ah.call(r, n);
                    }));
              }
            : xc,
          tl = ja
            ? function (r) {
                for (var n = []; r; ) bi(n, ac(r)), (r = Zs(r));
                return n;
              }
            : xc,
          Xt = rr;
        ((Da && Xt(new Da(new ArrayBuffer(1))) != Te) ||
          (qn && Xt(new qn()) != Ie) ||
          (Ua && Xt(Ua.resolve()) != dt) ||
          (_n && Xt(new _n()) != xe) ||
          (zn && Xt(new zn()) != Ae)) &&
          (Xt = function (r) {
            var n = rr(r),
              a = n == Fe ? r.constructor : t,
              u = a ? ki(a) : "";
            if (u)
              switch (u) {
                case Ig:
                  return Te;
                case xg:
                  return Ie;
                case Og:
                  return dt;
                case Pg:
                  return xe;
                case Ag:
                  return Ae;
              }
            return n;
          });
        function K0(r, n, a) {
          for (var u = -1, g = a.length; ++u < g; ) {
            var v = a[u],
              I = v.size;
            switch (v.type) {
              case "drop":
                r += I;
                break;
              case "dropRight":
                n -= I;
                break;
              case "take":
                n = Jt(n, r + I);
                break;
              case "takeRight":
                r = Bt(r, n - I);
                break;
            }
          }
          return { start: r, end: n };
        }
        function B0(r) {
          var n = r.match(ht);
          return n ? n[1].split(Lt) : [];
        }
        function rl(r, n, a) {
          n = xi(n, r);
          for (var u = -1, g = n.length, v = !1; ++u < g; ) {
            var I = Xr(n[u]);
            if (!(v = r != null && a(r, I))) break;
            r = r[I];
          }
          return v || ++u != g
            ? v
            : ((g = r == null ? 0 : r.length),
              !!g && Po(g) && hi(I, g) && (Ne(r) || Gi(r)));
        }
        function V0(r) {
          var n = r.length,
            a = new r.constructor(n);
          return (
            n &&
              typeof r[0] == "string" &&
              nt.call(r, "index") &&
              ((a.index = r.index), (a.input = r.input)),
            a
          );
        }
        function il(r) {
          return typeof r.constructor == "function" && !Jn(r) ? vn(Zs(r)) : {};
        }
        function k0(r, n, a) {
          var u = r.constructor;
          switch (n) {
            case Se:
              return ec(r);
            case L:
            case R:
              return new u(+r);
            case Te:
              return T0(r, a);
            case Ke:
            case Pe:
            case ke:
            case We:
            case et:
            case tt:
            case Je:
            case Zt:
            case ur:
              return Mh(r, a);
            case Ie:
              return new u();
            case He:
            case $e:
              return new u(r);
            case Me:
              return C0(r);
            case xe:
              return new u();
            case je:
              return R0(r);
          }
        }
        function G0(r, n) {
          var a = n.length;
          if (!a) return r;
          var u = a - 1;
          return (
            (n[u] = (a > 1 ? "& " : "") + n[u]),
            (n = n.join(a > 2 ? ", " : " ")),
            r.replace(
              Ot,
              `{
/* [wrapped with ` +
                n +
                `] */
`,
            )
          );
        }
        function W0(r) {
          return Ne(r) || Gi(r) || !!(ch && r && r[ch]);
        }
        function hi(r, n) {
          var a = typeof r;
          return (
            (n = n ?? W),
            !!n &&
              (a == "number" || (a != "symbol" && ha.test(r))) &&
              r > -1 &&
              r % 1 == 0 &&
              r < n
          );
        }
        function ir(r, n, a) {
          if (!bt(a)) return !1;
          var u = typeof n;
          return (
            u == "number" ? fr(a) && hi(n, a.length) : u == "string" && n in a
          )
            ? Hr(a[n], r)
            : !1;
        }
        function cc(r, n) {
          if (Ne(r)) return !1;
          var a = typeof r;
          return a == "number" ||
            a == "symbol" ||
            a == "boolean" ||
            r == null ||
            br(r)
            ? !0
            : Dt.test(r) || !yt.test(r) || (n != null && r in ut(n));
        }
        function Y0(r) {
          var n = typeof r;
          return n == "string" ||
            n == "number" ||
            n == "symbol" ||
            n == "boolean"
            ? r !== "__proto__"
            : r === null;
        }
        function uc(r) {
          var n = mo(r),
            a = y[n];
          if (typeof a != "function" || !(n in Ye.prototype)) return !1;
          if (r === a) return !0;
          var u = sc(a);
          return !!u && r === u[0];
        }
        function J0(r) {
          return !!nh && nh in r;
        }
        var X0 = Ws ? li : Oc;
        function Jn(r) {
          var n = r && r.constructor,
            a = (typeof n == "function" && n.prototype) || gn;
          return r === a;
        }
        function nl(r) {
          return r === r && !bt(r);
        }
        function sl(r, n) {
          return function (a) {
            return a == null ? !1 : a[r] === n && (n !== t || r in ut(a));
          };
        }
        function Q0(r) {
          var n = xo(r, function (u) {
              return a.size === d && a.clear(), u;
            }),
            a = n.cache;
          return n;
        }
        function Z0(r, n) {
          var a = r[1],
            u = n[1],
            g = a | u,
            v = g < (B | oe | h),
            I =
              (u == h && a == F) ||
              (u == h && a == m && r[7].length <= n[8]) ||
              (u == (h | m) && n[7].length <= n[8] && a == F);
          if (!(v || I)) return r;
          u & B && ((r[2] = n[2]), (g |= a & B ? 0 : N));
          var T = n[3];
          if (T) {
            var U = r[3];
            (r[3] = U ? zh(U, T, n[4]) : T), (r[4] = U ? wi(r[3], w) : n[4]);
          }
          return (
            (T = n[5]),
            T &&
              ((U = r[5]),
              (r[5] = U ? Hh(U, T, n[6]) : T),
              (r[6] = U ? wi(r[5], w) : n[6])),
            (T = n[7]),
            T && (r[7] = T),
            u & h && (r[8] = r[8] == null ? n[8] : Jt(r[8], n[8])),
            r[9] == null && (r[9] = n[9]),
            (r[0] = n[0]),
            (r[1] = g),
            r
          );
        }
        function e_(r) {
          var n = [];
          if (r != null) for (var a in ut(r)) n.push(a);
          return n;
        }
        function t_(r) {
          return Js.call(r);
        }
        function ol(r, n, a) {
          return (
            (n = Bt(n === t ? r.length - 1 : n, 0)),
            function () {
              for (
                var u = arguments, g = -1, v = Bt(u.length - n, 0), I = H(v);
                ++g < v;

              )
                I[g] = u[n + g];
              g = -1;
              for (var T = H(n + 1); ++g < n; ) T[g] = u[g];
              return (T[n] = a(I)), Vt(r, this, T);
            }
          );
        }
        function al(r, n) {
          return n.length < 2 ? r : Bi(r, Rr(n, 0, -1));
        }
        function r_(r, n) {
          for (var a = r.length, u = Jt(n.length, a), g = lr(r); u--; ) {
            var v = n[u];
            r[u] = hi(v, a) ? g[v] : t;
          }
          return r;
        }
        function hc(r, n) {
          if (
            !(n === "constructor" && typeof r[n] == "function") &&
            n != "__proto__"
          )
            return r[n];
        }
        var cl = hl(Rh),
          Xn =
            yg ||
            function (r, n) {
              return Xe.setTimeout(r, n);
            },
          lc = hl(x0);
        function ul(r, n, a) {
          var u = n + "";
          return lc(r, G0(u, i_(B0(u), a)));
        }
        function hl(r) {
          var n = 0,
            a = 0;
          return function () {
            var u = wg(),
              g = ge - (u - a);
            if (((a = u), g > 0)) {
              if (++n >= ce) return arguments[0];
            } else n = 0;
            return r.apply(t, arguments);
          };
        }
        function wo(r, n) {
          var a = -1,
            u = r.length,
            g = u - 1;
          for (n = n === t ? u : n; ++a < n; ) {
            var v = Ga(a, g),
              I = r[v];
            (r[v] = r[a]), (r[a] = I);
          }
          return (r.length = n), r;
        }
        var ll = Q0(function (r) {
          var n = [];
          return (
            r.charCodeAt(0) === 46 && n.push(""),
            r.replace(Ut, function (a, u, g, v) {
              n.push(g ? v.replace(na, "$1") : u || a);
            }),
            n
          );
        });
        function Xr(r) {
          if (typeof r == "string" || br(r)) return r;
          var n = r + "";
          return n == "0" && 1 / r == -te ? "-0" : n;
        }
        function ki(r) {
          if (r != null) {
            try {
              return Ys.call(r);
            } catch {}
            try {
              return r + "";
            } catch {}
          }
          return "";
        }
        function i_(r, n) {
          return (
            Pr(be, function (a) {
              var u = "_." + a[0];
              n & a[1] && !Bs(r, u) && r.push(u);
            }),
            r.sort()
          );
        }
        function fl(r) {
          if (r instanceof Ye) return r.clone();
          var n = new Tr(r.__wrapped__, r.__chain__);
          return (
            (n.__actions__ = lr(r.__actions__)),
            (n.__index__ = r.__index__),
            (n.__values__ = r.__values__),
            n
          );
        }
        function n_(r, n, a) {
          (a ? ir(r, n, a) : n === t) ? (n = 1) : (n = Bt(Le(n), 0));
          var u = r == null ? 0 : r.length;
          if (!u || n < 1) return [];
          for (var g = 0, v = 0, I = H(ro(u / n)); g < u; )
            I[v++] = Rr(r, g, (g += n));
          return I;
        }
        function s_(r) {
          for (
            var n = -1, a = r == null ? 0 : r.length, u = 0, g = [];
            ++n < a;

          ) {
            var v = r[n];
            v && (g[u++] = v);
          }
          return g;
        }
        function o_() {
          var r = arguments.length;
          if (!r) return [];
          for (var n = H(r - 1), a = arguments[0], u = r; u--; )
            n[u - 1] = arguments[u];
          return bi(Ne(a) ? lr(a) : [a], Wt(n, 1));
        }
        var a_ = Be(function (r, n) {
            return Rt(r) ? Vn(r, Wt(n, 1, Rt, !0)) : [];
          }),
          c_ = Be(function (r, n) {
            var a = Nr(n);
            return (
              Rt(a) && (a = t), Rt(r) ? Vn(r, Wt(n, 1, Rt, !0), me(a, 2)) : []
            );
          }),
          u_ = Be(function (r, n) {
            var a = Nr(n);
            return Rt(a) && (a = t), Rt(r) ? Vn(r, Wt(n, 1, Rt, !0), t, a) : [];
          });
        function h_(r, n, a) {
          var u = r == null ? 0 : r.length;
          return u
            ? ((n = a || n === t ? 1 : Le(n)), Rr(r, n < 0 ? 0 : n, u))
            : [];
        }
        function l_(r, n, a) {
          var u = r == null ? 0 : r.length;
          return u
            ? ((n = a || n === t ? 1 : Le(n)),
              (n = u - n),
              Rr(r, 0, n < 0 ? 0 : n))
            : [];
        }
        function f_(r, n) {
          return r && r.length ? fo(r, me(n, 3), !0, !0) : [];
        }
        function p_(r, n) {
          return r && r.length ? fo(r, me(n, 3), !0) : [];
        }
        function d_(r, n, a, u) {
          var g = r == null ? 0 : r.length;
          return g
            ? (a && typeof a != "number" && ir(r, n, a) && ((a = 0), (u = g)),
              o0(r, n, a, u))
            : [];
        }
        function pl(r, n, a) {
          var u = r == null ? 0 : r.length;
          if (!u) return -1;
          var g = a == null ? 0 : Le(a);
          return g < 0 && (g = Bt(u + g, 0)), Vs(r, me(n, 3), g);
        }
        function dl(r, n, a) {
          var u = r == null ? 0 : r.length;
          if (!u) return -1;
          var g = u - 1;
          return (
            a !== t && ((g = Le(a)), (g = a < 0 ? Bt(u + g, 0) : Jt(g, u - 1))),
            Vs(r, me(n, 3), g, !0)
          );
        }
        function gl(r) {
          var n = r == null ? 0 : r.length;
          return n ? Wt(r, 1) : [];
        }
        function g_(r) {
          var n = r == null ? 0 : r.length;
          return n ? Wt(r, te) : [];
        }
        function __(r, n) {
          var a = r == null ? 0 : r.length;
          return a ? ((n = n === t ? 1 : Le(n)), Wt(r, n)) : [];
        }
        function y_(r) {
          for (var n = -1, a = r == null ? 0 : r.length, u = {}; ++n < a; ) {
            var g = r[n];
            u[g[0]] = g[1];
          }
          return u;
        }
        function _l(r) {
          return r && r.length ? r[0] : t;
        }
        function v_(r, n, a) {
          var u = r == null ? 0 : r.length;
          if (!u) return -1;
          var g = a == null ? 0 : Le(a);
          return g < 0 && (g = Bt(u + g, 0)), ln(r, n, g);
        }
        function m_(r) {
          var n = r == null ? 0 : r.length;
          return n ? Rr(r, 0, -1) : [];
        }
        var b_ = Be(function (r) {
            var n = vt(r, Qa);
            return n.length && n[0] === r[0] ? Ha(n) : [];
          }),
          w_ = Be(function (r) {
            var n = Nr(r),
              a = vt(r, Qa);
            return (
              n === Nr(a) ? (n = t) : a.pop(),
              a.length && a[0] === r[0] ? Ha(a, me(n, 2)) : []
            );
          }),
          E_ = Be(function (r) {
            var n = Nr(r),
              a = vt(r, Qa);
            return (
              (n = typeof n == "function" ? n : t),
              n && a.pop(),
              a.length && a[0] === r[0] ? Ha(a, t, n) : []
            );
          });
        function S_(r, n) {
          return r == null ? "" : mg.call(r, n);
        }
        function Nr(r) {
          var n = r == null ? 0 : r.length;
          return n ? r[n - 1] : t;
        }
        function I_(r, n, a) {
          var u = r == null ? 0 : r.length;
          if (!u) return -1;
          var g = u;
          return (
            a !== t && ((g = Le(a)), (g = g < 0 ? Bt(u + g, 0) : Jt(g, u - 1))),
            n === n ? ig(r, n, g) : Vs(r, Ju, g, !0)
          );
        }
        function x_(r, n) {
          return r && r.length ? Ph(r, Le(n)) : t;
        }
        var O_ = Be(yl);
        function yl(r, n) {
          return r && r.length && n && n.length ? ka(r, n) : r;
        }
        function P_(r, n, a) {
          return r && r.length && n && n.length ? ka(r, n, me(a, 2)) : r;
        }
        function A_(r, n, a) {
          return r && r.length && n && n.length ? ka(r, n, t, a) : r;
        }
        var T_ = ui(function (r, n) {
          var a = r == null ? 0 : r.length,
            u = La(r, n);
          return (
            Ch(
              r,
              vt(n, function (g) {
                return hi(g, a) ? +g : g;
              }).sort(qh),
            ),
            u
          );
        });
        function C_(r, n) {
          var a = [];
          if (!(r && r.length)) return a;
          var u = -1,
            g = [],
            v = r.length;
          for (n = me(n, 3); ++u < v; ) {
            var I = r[u];
            n(I, u, r) && (a.push(I), g.push(u));
          }
          return Ch(r, g), a;
        }
        function fc(r) {
          return r == null ? r : Sg.call(r);
        }
        function R_(r, n, a) {
          var u = r == null ? 0 : r.length;
          return u
            ? (a && typeof a != "number" && ir(r, n, a)
                ? ((n = 0), (a = u))
                : ((n = n == null ? 0 : Le(n)), (a = a === t ? u : Le(a))),
              Rr(r, n, a))
            : [];
        }
        function N_(r, n) {
          return lo(r, n);
        }
        function $_(r, n, a) {
          return Ya(r, n, me(a, 2));
        }
        function j_(r, n) {
          var a = r == null ? 0 : r.length;
          if (a) {
            var u = lo(r, n);
            if (u < a && Hr(r[u], n)) return u;
          }
          return -1;
        }
        function D_(r, n) {
          return lo(r, n, !0);
        }
        function U_(r, n, a) {
          return Ya(r, n, me(a, 2), !0);
        }
        function F_(r, n) {
          var a = r == null ? 0 : r.length;
          if (a) {
            var u = lo(r, n, !0) - 1;
            if (Hr(r[u], n)) return u;
          }
          return -1;
        }
        function L_(r) {
          return r && r.length ? Nh(r) : [];
        }
        function M_(r, n) {
          return r && r.length ? Nh(r, me(n, 2)) : [];
        }
        function q_(r) {
          var n = r == null ? 0 : r.length;
          return n ? Rr(r, 1, n) : [];
        }
        function z_(r, n, a) {
          return r && r.length
            ? ((n = a || n === t ? 1 : Le(n)), Rr(r, 0, n < 0 ? 0 : n))
            : [];
        }
        function H_(r, n, a) {
          var u = r == null ? 0 : r.length;
          return u
            ? ((n = a || n === t ? 1 : Le(n)),
              (n = u - n),
              Rr(r, n < 0 ? 0 : n, u))
            : [];
        }
        function K_(r, n) {
          return r && r.length ? fo(r, me(n, 3), !1, !0) : [];
        }
        function B_(r, n) {
          return r && r.length ? fo(r, me(n, 3)) : [];
        }
        var V_ = Be(function (r) {
            return Ii(Wt(r, 1, Rt, !0));
          }),
          k_ = Be(function (r) {
            var n = Nr(r);
            return Rt(n) && (n = t), Ii(Wt(r, 1, Rt, !0), me(n, 2));
          }),
          G_ = Be(function (r) {
            var n = Nr(r);
            return (
              (n = typeof n == "function" ? n : t), Ii(Wt(r, 1, Rt, !0), t, n)
            );
          });
        function W_(r) {
          return r && r.length ? Ii(r) : [];
        }
        function Y_(r, n) {
          return r && r.length ? Ii(r, me(n, 2)) : [];
        }
        function J_(r, n) {
          return (
            (n = typeof n == "function" ? n : t),
            r && r.length ? Ii(r, t, n) : []
          );
        }
        function pc(r) {
          if (!(r && r.length)) return [];
          var n = 0;
          return (
            (r = mi(r, function (a) {
              if (Rt(a)) return (n = Bt(a.length, n)), !0;
            })),
            Ca(n, function (a) {
              return vt(r, Pa(a));
            })
          );
        }
        function vl(r, n) {
          if (!(r && r.length)) return [];
          var a = pc(r);
          return n == null
            ? a
            : vt(a, function (u) {
                return Vt(n, t, u);
              });
        }
        var X_ = Be(function (r, n) {
            return Rt(r) ? Vn(r, n) : [];
          }),
          Q_ = Be(function (r) {
            return Xa(mi(r, Rt));
          }),
          Z_ = Be(function (r) {
            var n = Nr(r);
            return Rt(n) && (n = t), Xa(mi(r, Rt), me(n, 2));
          }),
          ey = Be(function (r) {
            var n = Nr(r);
            return (n = typeof n == "function" ? n : t), Xa(mi(r, Rt), t, n);
          }),
          ty = Be(pc);
        function ry(r, n) {
          return Uh(r || [], n || [], Bn);
        }
        function iy(r, n) {
          return Uh(r || [], n || [], Wn);
        }
        var ny = Be(function (r) {
          var n = r.length,
            a = n > 1 ? r[n - 1] : t;
          return (a = typeof a == "function" ? (r.pop(), a) : t), vl(r, a);
        });
        function ml(r) {
          var n = y(r);
          return (n.__chain__ = !0), n;
        }
        function sy(r, n) {
          return n(r), r;
        }
        function Eo(r, n) {
          return n(r);
        }
        var oy = ui(function (r) {
          var n = r.length,
            a = n ? r[0] : 0,
            u = this.__wrapped__,
            g = function (v) {
              return La(v, r);
            };
          return n > 1 ||
            this.__actions__.length ||
            !(u instanceof Ye) ||
            !hi(a)
            ? this.thru(g)
            : ((u = u.slice(a, +a + (n ? 1 : 0))),
              u.__actions__.push({ func: Eo, args: [g], thisArg: t }),
              new Tr(u, this.__chain__).thru(function (v) {
                return n && !v.length && v.push(t), v;
              }));
        });
        function ay() {
          return ml(this);
        }
        function cy() {
          return new Tr(this.value(), this.__chain__);
        }
        function uy() {
          this.__values__ === t && (this.__values__ = $l(this.value()));
          var r = this.__index__ >= this.__values__.length,
            n = r ? t : this.__values__[this.__index__++];
          return { done: r, value: n };
        }
        function hy() {
          return this;
        }
        function ly(r) {
          for (var n, a = this; a instanceof oo; ) {
            var u = fl(a);
            (u.__index__ = 0),
              (u.__values__ = t),
              n ? (g.__wrapped__ = u) : (n = u);
            var g = u;
            a = a.__wrapped__;
          }
          return (g.__wrapped__ = r), n;
        }
        function fy() {
          var r = this.__wrapped__;
          if (r instanceof Ye) {
            var n = r;
            return (
              this.__actions__.length && (n = new Ye(this)),
              (n = n.reverse()),
              n.__actions__.push({ func: Eo, args: [fc], thisArg: t }),
              new Tr(n, this.__chain__)
            );
          }
          return this.thru(fc);
        }
        function py() {
          return Dh(this.__wrapped__, this.__actions__);
        }
        var dy = po(function (r, n, a) {
          nt.call(r, a) ? ++r[a] : ai(r, a, 1);
        });
        function gy(r, n, a) {
          var u = Ne(r) ? Wu : s0;
          return a && ir(r, n, a) && (n = t), u(r, me(n, 3));
        }
        function _y(r, n) {
          var a = Ne(r) ? mi : vh;
          return a(r, me(n, 3));
        }
        var yy = kh(pl),
          vy = kh(dl);
        function my(r, n) {
          return Wt(So(r, n), 1);
        }
        function by(r, n) {
          return Wt(So(r, n), te);
        }
        function wy(r, n, a) {
          return (a = a === t ? 1 : Le(a)), Wt(So(r, n), a);
        }
        function bl(r, n) {
          var a = Ne(r) ? Pr : Si;
          return a(r, me(n, 3));
        }
        function wl(r, n) {
          var a = Ne(r) ? qd : yh;
          return a(r, me(n, 3));
        }
        var Ey = po(function (r, n, a) {
          nt.call(r, a) ? r[a].push(n) : ai(r, a, [n]);
        });
        function Sy(r, n, a, u) {
          (r = fr(r) ? r : Sn(r)), (a = a && !u ? Le(a) : 0);
          var g = r.length;
          return (
            a < 0 && (a = Bt(g + a, 0)),
            Ao(r) ? a <= g && r.indexOf(n, a) > -1 : !!g && ln(r, n, a) > -1
          );
        }
        var Iy = Be(function (r, n, a) {
            var u = -1,
              g = typeof n == "function",
              v = fr(r) ? H(r.length) : [];
            return (
              Si(r, function (I) {
                v[++u] = g ? Vt(n, I, a) : kn(I, n, a);
              }),
              v
            );
          }),
          xy = po(function (r, n, a) {
            ai(r, a, n);
          });
        function So(r, n) {
          var a = Ne(r) ? vt : Ih;
          return a(r, me(n, 3));
        }
        function Oy(r, n, a, u) {
          return r == null
            ? []
            : (Ne(n) || (n = n == null ? [] : [n]),
              (a = u ? t : a),
              Ne(a) || (a = a == null ? [] : [a]),
              Ah(r, n, a));
        }
        var Py = po(
          function (r, n, a) {
            r[a ? 0 : 1].push(n);
          },
          function () {
            return [[], []];
          },
        );
        function Ay(r, n, a) {
          var u = Ne(r) ? xa : Qu,
            g = arguments.length < 3;
          return u(r, me(n, 4), a, g, Si);
        }
        function Ty(r, n, a) {
          var u = Ne(r) ? zd : Qu,
            g = arguments.length < 3;
          return u(r, me(n, 4), a, g, yh);
        }
        function Cy(r, n) {
          var a = Ne(r) ? mi : vh;
          return a(r, Oo(me(n, 3)));
        }
        function Ry(r) {
          var n = Ne(r) ? ph : S0;
          return n(r);
        }
        function Ny(r, n, a) {
          (a ? ir(r, n, a) : n === t) ? (n = 1) : (n = Le(n));
          var u = Ne(r) ? e0 : I0;
          return u(r, n);
        }
        function $y(r) {
          var n = Ne(r) ? t0 : O0;
          return n(r);
        }
        function jy(r) {
          if (r == null) return 0;
          if (fr(r)) return Ao(r) ? pn(r) : r.length;
          var n = Xt(r);
          return n == Ie || n == xe ? r.size : Ba(r).length;
        }
        function Dy(r, n, a) {
          var u = Ne(r) ? Oa : P0;
          return a && ir(r, n, a) && (n = t), u(r, me(n, 3));
        }
        var Uy = Be(function (r, n) {
            if (r == null) return [];
            var a = n.length;
            return (
              a > 1 && ir(r, n[0], n[1])
                ? (n = [])
                : a > 2 && ir(n[0], n[1], n[2]) && (n = [n[0]]),
              Ah(r, Wt(n, 1), [])
            );
          }),
          Io =
            _g ||
            function () {
              return Xe.Date.now();
            };
        function Fy(r, n) {
          if (typeof n != "function") throw new Ar(l);
          return (
            (r = Le(r)),
            function () {
              if (--r < 1) return n.apply(this, arguments);
            }
          );
        }
        function El(r, n, a) {
          return (
            (n = a ? t : n),
            (n = r && n == null ? r.length : n),
            ci(r, h, t, t, t, t, n)
          );
        }
        function Sl(r, n) {
          var a;
          if (typeof n != "function") throw new Ar(l);
          return (
            (r = Le(r)),
            function () {
              return (
                --r > 0 && (a = n.apply(this, arguments)), r <= 1 && (n = t), a
              );
            }
          );
        }
        var dc = Be(function (r, n, a) {
            var u = B;
            if (a.length) {
              var g = wi(a, wn(dc));
              u |= C;
            }
            return ci(r, u, n, a, g);
          }),
          Il = Be(function (r, n, a) {
            var u = B | oe;
            if (a.length) {
              var g = wi(a, wn(Il));
              u |= C;
            }
            return ci(n, u, r, a, g);
          });
        function xl(r, n, a) {
          n = a ? t : n;
          var u = ci(r, F, t, t, t, t, t, n);
          return (u.placeholder = xl.placeholder), u;
        }
        function Ol(r, n, a) {
          n = a ? t : n;
          var u = ci(r, x, t, t, t, t, t, n);
          return (u.placeholder = Ol.placeholder), u;
        }
        function Pl(r, n, a) {
          var u,
            g,
            v,
            I,
            T,
            U,
            J = 0,
            X = !1,
            Z = !1,
            ae = !0;
          if (typeof r != "function") throw new Ar(l);
          (n = $r(n) || 0),
            bt(a) &&
              ((X = !!a.leading),
              (Z = "maxWait" in a),
              (v = Z ? Bt($r(a.maxWait) || 0, n) : v),
              (ae = "trailing" in a ? !!a.trailing : ae));
          function ye(Nt) {
            var Kr = u,
              pi = g;
            return (u = g = t), (J = Nt), (I = r.apply(pi, Kr)), I;
          }
          function we(Nt) {
            return (J = Nt), (T = Xn(Ge, n)), X ? ye(Nt) : I;
          }
          function ze(Nt) {
            var Kr = Nt - U,
              pi = Nt - J,
              kl = n - Kr;
            return Z ? Jt(kl, v - pi) : kl;
          }
          function Ee(Nt) {
            var Kr = Nt - U,
              pi = Nt - J;
            return U === t || Kr >= n || Kr < 0 || (Z && pi >= v);
          }
          function Ge() {
            var Nt = Io();
            if (Ee(Nt)) return Qe(Nt);
            T = Xn(Ge, ze(Nt));
          }
          function Qe(Nt) {
            return (T = t), ae && u ? ye(Nt) : ((u = g = t), I);
          }
          function wr() {
            T !== t && Fh(T), (J = 0), (u = U = g = T = t);
          }
          function nr() {
            return T === t ? I : Qe(Io());
          }
          function Er() {
            var Nt = Io(),
              Kr = Ee(Nt);
            if (((u = arguments), (g = this), (U = Nt), Kr)) {
              if (T === t) return we(U);
              if (Z) return Fh(T), (T = Xn(Ge, n)), ye(U);
            }
            return T === t && (T = Xn(Ge, n)), I;
          }
          return (Er.cancel = wr), (Er.flush = nr), Er;
        }
        var Ly = Be(function (r, n) {
            return _h(r, 1, n);
          }),
          My = Be(function (r, n, a) {
            return _h(r, $r(n) || 0, a);
          });
        function qy(r) {
          return ci(r, G);
        }
        function xo(r, n) {
          if (typeof r != "function" || (n != null && typeof n != "function"))
            throw new Ar(l);
          var a = function () {
            var u = arguments,
              g = n ? n.apply(this, u) : u[0],
              v = a.cache;
            if (v.has(g)) return v.get(g);
            var I = r.apply(this, u);
            return (a.cache = v.set(g, I) || v), I;
          };
          return (a.cache = new (xo.Cache || oi)()), a;
        }
        xo.Cache = oi;
        function Oo(r) {
          if (typeof r != "function") throw new Ar(l);
          return function () {
            var n = arguments;
            switch (n.length) {
              case 0:
                return !r.call(this);
              case 1:
                return !r.call(this, n[0]);
              case 2:
                return !r.call(this, n[0], n[1]);
              case 3:
                return !r.call(this, n[0], n[1], n[2]);
            }
            return !r.apply(this, n);
          };
        }
        function zy(r) {
          return Sl(2, r);
        }
        var Hy = A0(function (r, n) {
            n =
              n.length == 1 && Ne(n[0])
                ? vt(n[0], vr(me()))
                : vt(Wt(n, 1), vr(me()));
            var a = n.length;
            return Be(function (u) {
              for (var g = -1, v = Jt(u.length, a); ++g < v; )
                u[g] = n[g].call(this, u[g]);
              return Vt(r, this, u);
            });
          }),
          gc = Be(function (r, n) {
            var a = wi(n, wn(gc));
            return ci(r, C, t, n, a);
          }),
          Al = Be(function (r, n) {
            var a = wi(n, wn(Al));
            return ci(r, b, t, n, a);
          }),
          Ky = ui(function (r, n) {
            return ci(r, m, t, t, t, n);
          });
        function By(r, n) {
          if (typeof r != "function") throw new Ar(l);
          return (n = n === t ? n : Le(n)), Be(r, n);
        }
        function Vy(r, n) {
          if (typeof r != "function") throw new Ar(l);
          return (
            (n = n == null ? 0 : Bt(Le(n), 0)),
            Be(function (a) {
              var u = a[n],
                g = Oi(a, 0, n);
              return u && bi(g, u), Vt(r, this, g);
            })
          );
        }
        function ky(r, n, a) {
          var u = !0,
            g = !0;
          if (typeof r != "function") throw new Ar(l);
          return (
            bt(a) &&
              ((u = "leading" in a ? !!a.leading : u),
              (g = "trailing" in a ? !!a.trailing : g)),
            Pl(r, n, { leading: u, maxWait: n, trailing: g })
          );
        }
        function Gy(r) {
          return El(r, 1);
        }
        function Wy(r, n) {
          return gc(Za(n), r);
        }
        function Yy() {
          if (!arguments.length) return [];
          var r = arguments[0];
          return Ne(r) ? r : [r];
        }
        function Jy(r) {
          return Cr(r, P);
        }
        function Xy(r, n) {
          return (n = typeof n == "function" ? n : t), Cr(r, P, n);
        }
        function Qy(r) {
          return Cr(r, A | P);
        }
        function Zy(r, n) {
          return (n = typeof n == "function" ? n : t), Cr(r, A | P, n);
        }
        function e1(r, n) {
          return n == null || gh(r, n, kt(n));
        }
        function Hr(r, n) {
          return r === n || (r !== r && n !== n);
        }
        var t1 = vo(za),
          r1 = vo(function (r, n) {
            return r >= n;
          }),
          Gi = wh(
            (function () {
              return arguments;
            })(),
          )
            ? wh
            : function (r) {
                return Pt(r) && nt.call(r, "callee") && !ah.call(r, "callee");
              },
          Ne = H.isArray,
          i1 = tr ? vr(tr) : l0;
        function fr(r) {
          return r != null && Po(r.length) && !li(r);
        }
        function Rt(r) {
          return Pt(r) && fr(r);
        }
        function n1(r) {
          return r === !0 || r === !1 || (Pt(r) && rr(r) == L);
        }
        var Pi = vg || Oc,
          s1 = Mr ? vr(Mr) : f0;
        function o1(r) {
          return Pt(r) && r.nodeType === 1 && !Qn(r);
        }
        function a1(r) {
          if (r == null) return !0;
          if (
            fr(r) &&
            (Ne(r) ||
              typeof r == "string" ||
              typeof r.splice == "function" ||
              Pi(r) ||
              En(r) ||
              Gi(r))
          )
            return !r.length;
          var n = Xt(r);
          if (n == Ie || n == xe) return !r.size;
          if (Jn(r)) return !Ba(r).length;
          for (var a in r) if (nt.call(r, a)) return !1;
          return !0;
        }
        function c1(r, n) {
          return Gn(r, n);
        }
        function u1(r, n, a) {
          a = typeof a == "function" ? a : t;
          var u = a ? a(r, n) : t;
          return u === t ? Gn(r, n, t, a) : !!u;
        }
        function _c(r) {
          if (!Pt(r)) return !1;
          var n = rr(r);
          return (
            n == O ||
            n == f ||
            (typeof r.message == "string" &&
              typeof r.name == "string" &&
              !Qn(r))
          );
        }
        function h1(r) {
          return typeof r == "number" && uh(r);
        }
        function li(r) {
          if (!bt(r)) return !1;
          var n = rr(r);
          return n == ne || n == fe || n == q || n == gt;
        }
        function Tl(r) {
          return typeof r == "number" && r == Le(r);
        }
        function Po(r) {
          return typeof r == "number" && r > -1 && r % 1 == 0 && r <= W;
        }
        function bt(r) {
          var n = typeof r;
          return r != null && (n == "object" || n == "function");
        }
        function Pt(r) {
          return r != null && typeof r == "object";
        }
        var Cl = Or ? vr(Or) : d0;
        function l1(r, n) {
          return r === n || Ka(r, n, oc(n));
        }
        function f1(r, n, a) {
          return (a = typeof a == "function" ? a : t), Ka(r, n, oc(n), a);
        }
        function p1(r) {
          return Rl(r) && r != +r;
        }
        function d1(r) {
          if (X0(r)) throw new Ce(c);
          return Eh(r);
        }
        function g1(r) {
          return r === null;
        }
        function _1(r) {
          return r == null;
        }
        function Rl(r) {
          return typeof r == "number" || (Pt(r) && rr(r) == He);
        }
        function Qn(r) {
          if (!Pt(r) || rr(r) != Fe) return !1;
          var n = Zs(r);
          if (n === null) return !0;
          var a = nt.call(n, "constructor") && n.constructor;
          return typeof a == "function" && a instanceof a && Ys.call(a) == fg;
        }
        var yc = Wr ? vr(Wr) : g0;
        function y1(r) {
          return Tl(r) && r >= -W && r <= W;
        }
        var Nl = Fn ? vr(Fn) : _0;
        function Ao(r) {
          return typeof r == "string" || (!Ne(r) && Pt(r) && rr(r) == $e);
        }
        function br(r) {
          return typeof r == "symbol" || (Pt(r) && rr(r) == je);
        }
        var En = Mi ? vr(Mi) : y0;
        function v1(r) {
          return r === t;
        }
        function m1(r) {
          return Pt(r) && Xt(r) == Ae;
        }
        function b1(r) {
          return Pt(r) && rr(r) == De;
        }
        var w1 = vo(Va),
          E1 = vo(function (r, n) {
            return r <= n;
          });
        function $l(r) {
          if (!r) return [];
          if (fr(r)) return Ao(r) ? qr(r) : lr(r);
          if (Mn && r[Mn]) return eg(r[Mn]());
          var n = Xt(r),
            a = n == Ie ? Na : n == xe ? ks : Sn;
          return a(r);
        }
        function fi(r) {
          if (!r) return r === 0 ? r : 0;
          if (((r = $r(r)), r === te || r === -te)) {
            var n = r < 0 ? -1 : 1;
            return n * ee;
          }
          return r === r ? r : 0;
        }
        function Le(r) {
          var n = fi(r),
            a = n % 1;
          return n === n ? (a ? n - a : n) : 0;
        }
        function jl(r) {
          return r ? Ki(Le(r), 0, re) : 0;
        }
        function $r(r) {
          if (typeof r == "number") return r;
          if (br(r)) return Y;
          if (bt(r)) {
            var n = typeof r.valueOf == "function" ? r.valueOf() : r;
            r = bt(n) ? n + "" : n;
          }
          if (typeof r != "string") return r === 0 ? r : +r;
          r = Zu(r);
          var a = aa.test(r);
          return a || ua.test(r)
            ? Re(r.slice(2), a ? 2 : 8)
            : oa.test(r)
            ? Y
            : +r;
        }
        function Dl(r) {
          return Jr(r, pr(r));
        }
        function S1(r) {
          return r ? Ki(Le(r), -W, W) : r === 0 ? r : 0;
        }
        function it(r) {
          return r == null ? "" : mr(r);
        }
        var I1 = mn(function (r, n) {
            if (Jn(n) || fr(n)) {
              Jr(n, kt(n), r);
              return;
            }
            for (var a in n) nt.call(n, a) && Bn(r, a, n[a]);
          }),
          Ul = mn(function (r, n) {
            Jr(n, pr(n), r);
          }),
          To = mn(function (r, n, a, u) {
            Jr(n, pr(n), r, u);
          }),
          x1 = mn(function (r, n, a, u) {
            Jr(n, kt(n), r, u);
          }),
          O1 = ui(La);
        function P1(r, n) {
          var a = vn(r);
          return n == null ? a : dh(a, n);
        }
        var A1 = Be(function (r, n) {
            r = ut(r);
            var a = -1,
              u = n.length,
              g = u > 2 ? n[2] : t;
            for (g && ir(n[0], n[1], g) && (u = 1); ++a < u; )
              for (var v = n[a], I = pr(v), T = -1, U = I.length; ++T < U; ) {
                var J = I[T],
                  X = r[J];
                (X === t || (Hr(X, gn[J]) && !nt.call(r, J))) && (r[J] = v[J]);
              }
            return r;
          }),
          T1 = Be(function (r) {
            return r.push(t, Zh), Vt(Fl, t, r);
          });
        function C1(r, n) {
          return Yu(r, me(n, 3), Yr);
        }
        function R1(r, n) {
          return Yu(r, me(n, 3), qa);
        }
        function N1(r, n) {
          return r == null ? r : Ma(r, me(n, 3), pr);
        }
        function $1(r, n) {
          return r == null ? r : mh(r, me(n, 3), pr);
        }
        function j1(r, n) {
          return r && Yr(r, me(n, 3));
        }
        function D1(r, n) {
          return r && qa(r, me(n, 3));
        }
        function U1(r) {
          return r == null ? [] : uo(r, kt(r));
        }
        function F1(r) {
          return r == null ? [] : uo(r, pr(r));
        }
        function vc(r, n, a) {
          var u = r == null ? t : Bi(r, n);
          return u === t ? a : u;
        }
        function L1(r, n) {
          return r != null && rl(r, n, a0);
        }
        function mc(r, n) {
          return r != null && rl(r, n, c0);
        }
        var M1 = Wh(function (r, n, a) {
            n != null && typeof n.toString != "function" && (n = Js.call(n)),
              (r[n] = a);
          }, wc(dr)),
          q1 = Wh(function (r, n, a) {
            n != null && typeof n.toString != "function" && (n = Js.call(n)),
              nt.call(r, n) ? r[n].push(a) : (r[n] = [a]);
          }, me),
          z1 = Be(kn);
        function kt(r) {
          return fr(r) ? fh(r) : Ba(r);
        }
        function pr(r) {
          return fr(r) ? fh(r, !0) : v0(r);
        }
        function H1(r, n) {
          var a = {};
          return (
            (n = me(n, 3)),
            Yr(r, function (u, g, v) {
              ai(a, n(u, g, v), u);
            }),
            a
          );
        }
        function K1(r, n) {
          var a = {};
          return (
            (n = me(n, 3)),
            Yr(r, function (u, g, v) {
              ai(a, g, n(u, g, v));
            }),
            a
          );
        }
        var B1 = mn(function (r, n, a) {
            ho(r, n, a);
          }),
          Fl = mn(function (r, n, a, u) {
            ho(r, n, a, u);
          }),
          V1 = ui(function (r, n) {
            var a = {};
            if (r == null) return a;
            var u = !1;
            (n = vt(n, function (v) {
              return (v = xi(v, r)), u || (u = v.length > 1), v;
            })),
              Jr(r, nc(r), a),
              u && (a = Cr(a, A | S | P, M0));
            for (var g = n.length; g--; ) Ja(a, n[g]);
            return a;
          });
        function k1(r, n) {
          return Ll(r, Oo(me(n)));
        }
        var G1 = ui(function (r, n) {
          return r == null ? {} : b0(r, n);
        });
        function Ll(r, n) {
          if (r == null) return {};
          var a = vt(nc(r), function (u) {
            return [u];
          });
          return (
            (n = me(n)),
            Th(r, a, function (u, g) {
              return n(u, g[0]);
            })
          );
        }
        function W1(r, n, a) {
          n = xi(n, r);
          var u = -1,
            g = n.length;
          for (g || ((g = 1), (r = t)); ++u < g; ) {
            var v = r == null ? t : r[Xr(n[u])];
            v === t && ((u = g), (v = a)), (r = li(v) ? v.call(r) : v);
          }
          return r;
        }
        function Y1(r, n, a) {
          return r == null ? r : Wn(r, n, a);
        }
        function J1(r, n, a, u) {
          return (
            (u = typeof u == "function" ? u : t), r == null ? r : Wn(r, n, a, u)
          );
        }
        var Ml = Xh(kt),
          ql = Xh(pr);
        function X1(r, n, a) {
          var u = Ne(r),
            g = u || Pi(r) || En(r);
          if (((n = me(n, 4)), a == null)) {
            var v = r && r.constructor;
            g
              ? (a = u ? new v() : [])
              : bt(r)
              ? (a = li(v) ? vn(Zs(r)) : {})
              : (a = {});
          }
          return (
            (g ? Pr : Yr)(r, function (I, T, U) {
              return n(a, I, T, U);
            }),
            a
          );
        }
        function Q1(r, n) {
          return r == null ? !0 : Ja(r, n);
        }
        function Z1(r, n, a) {
          return r == null ? r : jh(r, n, Za(a));
        }
        function ev(r, n, a, u) {
          return (
            (u = typeof u == "function" ? u : t),
            r == null ? r : jh(r, n, Za(a), u)
          );
        }
        function Sn(r) {
          return r == null ? [] : Ra(r, kt(r));
        }
        function tv(r) {
          return r == null ? [] : Ra(r, pr(r));
        }
        function rv(r, n, a) {
          return (
            a === t && ((a = n), (n = t)),
            a !== t && ((a = $r(a)), (a = a === a ? a : 0)),
            n !== t && ((n = $r(n)), (n = n === n ? n : 0)),
            Ki($r(r), n, a)
          );
        }
        function iv(r, n, a) {
          return (
            (n = fi(n)),
            a === t ? ((a = n), (n = 0)) : (a = fi(a)),
            (r = $r(r)),
            u0(r, n, a)
          );
        }
        function nv(r, n, a) {
          if (
            (a && typeof a != "boolean" && ir(r, n, a) && (n = a = t),
            a === t &&
              (typeof n == "boolean"
                ? ((a = n), (n = t))
                : typeof r == "boolean" && ((a = r), (r = t))),
            r === t && n === t
              ? ((r = 0), (n = 1))
              : ((r = fi(r)), n === t ? ((n = r), (r = 0)) : (n = fi(n))),
            r > n)
          ) {
            var u = r;
            (r = n), (n = u);
          }
          if (a || r % 1 || n % 1) {
            var g = hh();
            return Jt(r + g * (n - r + at("1e-" + ((g + "").length - 1))), n);
          }
          return Ga(r, n);
        }
        var sv = bn(function (r, n, a) {
          return (n = n.toLowerCase()), r + (a ? zl(n) : n);
        });
        function zl(r) {
          return bc(it(r).toLowerCase());
        }
        function Hl(r) {
          return (r = it(r)), r && r.replace(ii, Yd).replace(Ea, "");
        }
        function ov(r, n, a) {
          (r = it(r)), (n = mr(n));
          var u = r.length;
          a = a === t ? u : Ki(Le(a), 0, u);
          var g = a;
          return (a -= n.length), a >= 0 && r.slice(a, g) == n;
        }
        function av(r) {
          return (r = it(r)), r && _t.test(r) ? r.replace(ji, Jd) : r;
        }
        function cv(r) {
          return (r = it(r)), r && Ft.test(r) ? r.replace(It, "\\$&") : r;
        }
        var uv = bn(function (r, n, a) {
            return r + (a ? "-" : "") + n.toLowerCase();
          }),
          hv = bn(function (r, n, a) {
            return r + (a ? " " : "") + n.toLowerCase();
          }),
          lv = Vh("toLowerCase");
        function fv(r, n, a) {
          (r = it(r)), (n = Le(n));
          var u = n ? pn(r) : 0;
          if (!n || u >= n) return r;
          var g = (n - u) / 2;
          return yo(io(g), a) + r + yo(ro(g), a);
        }
        function pv(r, n, a) {
          (r = it(r)), (n = Le(n));
          var u = n ? pn(r) : 0;
          return n && u < n ? r + yo(n - u, a) : r;
        }
        function dv(r, n, a) {
          (r = it(r)), (n = Le(n));
          var u = n ? pn(r) : 0;
          return n && u < n ? yo(n - u, a) + r : r;
        }
        function gv(r, n, a) {
          return (
            a || n == null ? (n = 0) : n && (n = +n),
            Eg(it(r).replace(xt, ""), n || 0)
          );
        }
        function _v(r, n, a) {
          return (
            (a ? ir(r, n, a) : n === t) ? (n = 1) : (n = Le(n)), Wa(it(r), n)
          );
        }
        function yv() {
          var r = arguments,
            n = it(r[0]);
          return r.length < 3 ? n : n.replace(r[1], r[2]);
        }
        var vv = bn(function (r, n, a) {
          return r + (a ? "_" : "") + n.toLowerCase();
        });
        function mv(r, n, a) {
          return (
            a && typeof a != "number" && ir(r, n, a) && (n = a = t),
            (a = a === t ? re : a >>> 0),
            a
              ? ((r = it(r)),
                r &&
                (typeof n == "string" || (n != null && !yc(n))) &&
                ((n = mr(n)), !n && fn(r))
                  ? Oi(qr(r), 0, a)
                  : r.split(n, a))
              : []
          );
        }
        var bv = bn(function (r, n, a) {
          return r + (a ? " " : "") + bc(n);
        });
        function wv(r, n, a) {
          return (
            (r = it(r)),
            (a = a == null ? 0 : Ki(Le(a), 0, r.length)),
            (n = mr(n)),
            r.slice(a, a + n.length) == n
          );
        }
        function Ev(r, n, a) {
          var u = y.templateSettings;
          a && ir(r, n, a) && (n = t), (r = it(r)), (n = To({}, n, u, Qh));
          var g = To({}, n.imports, u.imports, Qh),
            v = kt(g),
            I = Ra(g, v),
            T,
            U,
            J = 0,
            X = n.interpolate || nn,
            Z = "__p += '",
            ae = $a(
              (n.escape || nn).source +
                "|" +
                X.source +
                "|" +
                (X === mt ? sa : nn).source +
                "|" +
                (n.evaluate || nn).source +
                "|$",
              "g",
            ),
            ye =
              "//# sourceURL=" +
              (nt.call(n, "sourceURL")
                ? (n.sourceURL + "").replace(/\s/g, " ")
                : "lodash.templateSources[" + ++Sa + "]") +
              `
`;
          r.replace(ae, function (Ee, Ge, Qe, wr, nr, Er) {
            return (
              Qe || (Qe = wr),
              (Z += r.slice(J, Er).replace(la, Xd)),
              Ge &&
                ((T = !0),
                (Z +=
                  `' +
__e(` +
                  Ge +
                  `) +
'`)),
              nr &&
                ((U = !0),
                (Z +=
                  `';
` +
                  nr +
                  `;
__p += '`)),
              Qe &&
                (Z +=
                  `' +
((__t = (` +
                  Qe +
                  `)) == null ? '' : __t) +
'`),
              (J = Er + Ee.length),
              Ee
            );
          }),
            (Z += `';
`);
          var we = nt.call(n, "variable") && n.variable;
          if (!we)
            Z =
              `with (obj) {
` +
              Z +
              `
}
`;
          else if (ia.test(we)) throw new Ce(p);
          (Z = (U ? Z.replace(kr, "") : Z)
            .replace(er, "$1")
            .replace(ri, "$1;")),
            (Z =
              "function(" +
              (we || "obj") +
              `) {
` +
              (we
                ? ""
                : `obj || (obj = {});
`) +
              "var __t, __p = ''" +
              (T ? ", __e = _.escape" : "") +
              (U
                ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                : `;
`) +
              Z +
              `return __p
}`);
          var ze = Bl(function () {
            return rt(v, ye + "return " + Z).apply(t, I);
          });
          if (((ze.source = Z), _c(ze))) throw ze;
          return ze;
        }
        function Sv(r) {
          return it(r).toLowerCase();
        }
        function Iv(r) {
          return it(r).toUpperCase();
        }
        function xv(r, n, a) {
          if (((r = it(r)), r && (a || n === t))) return Zu(r);
          if (!r || !(n = mr(n))) return r;
          var u = qr(r),
            g = qr(n),
            v = eh(u, g),
            I = th(u, g) + 1;
          return Oi(u, v, I).join("");
        }
        function Ov(r, n, a) {
          if (((r = it(r)), r && (a || n === t))) return r.slice(0, ih(r) + 1);
          if (!r || !(n = mr(n))) return r;
          var u = qr(r),
            g = th(u, qr(n)) + 1;
          return Oi(u, 0, g).join("");
        }
        function Pv(r, n, a) {
          if (((r = it(r)), r && (a || n === t))) return r.replace(xt, "");
          if (!r || !(n = mr(n))) return r;
          var u = qr(r),
            g = eh(u, qr(n));
          return Oi(u, g).join("");
        }
        function Av(r, n) {
          var a = k,
            u = se;
          if (bt(n)) {
            var g = "separator" in n ? n.separator : g;
            (a = "length" in n ? Le(n.length) : a),
              (u = "omission" in n ? mr(n.omission) : u);
          }
          r = it(r);
          var v = r.length;
          if (fn(r)) {
            var I = qr(r);
            v = I.length;
          }
          if (a >= v) return r;
          var T = a - pn(u);
          if (T < 1) return u;
          var U = I ? Oi(I, 0, T).join("") : r.slice(0, T);
          if (g === t) return U + u;
          if ((I && (T += U.length - T), yc(g))) {
            if (r.slice(T).search(g)) {
              var J,
                X = U;
              for (
                g.global || (g = $a(g.source, it(xr.exec(g)) + "g")),
                  g.lastIndex = 0;
                (J = g.exec(X));

              )
                var Z = J.index;
              U = U.slice(0, Z === t ? T : Z);
            }
          } else if (r.indexOf(mr(g), T) != T) {
            var ae = U.lastIndexOf(g);
            ae > -1 && (U = U.slice(0, ae));
          }
          return U + u;
        }
        function Tv(r) {
          return (r = it(r)), r && wt.test(r) ? r.replace(yi, ng) : r;
        }
        var Cv = bn(function (r, n, a) {
            return r + (a ? " " : "") + n.toUpperCase();
          }),
          bc = Vh("toUpperCase");
        function Kl(r, n, a) {
          return (
            (r = it(r)),
            (n = a ? t : n),
            n === t ? (Zd(r) ? ag(r) : Bd(r)) : r.match(n) || []
          );
        }
        var Bl = Be(function (r, n) {
            try {
              return Vt(r, t, n);
            } catch (a) {
              return _c(a) ? a : new Ce(a);
            }
          }),
          Rv = ui(function (r, n) {
            return (
              Pr(n, function (a) {
                (a = Xr(a)), ai(r, a, dc(r[a], r));
              }),
              r
            );
          });
        function Nv(r) {
          var n = r == null ? 0 : r.length,
            a = me();
          return (
            (r = n
              ? vt(r, function (u) {
                  if (typeof u[1] != "function") throw new Ar(l);
                  return [a(u[0]), u[1]];
                })
              : []),
            Be(function (u) {
              for (var g = -1; ++g < n; ) {
                var v = r[g];
                if (Vt(v[0], this, u)) return Vt(v[1], this, u);
              }
            })
          );
        }
        function $v(r) {
          return n0(Cr(r, A));
        }
        function wc(r) {
          return function () {
            return r;
          };
        }
        function jv(r, n) {
          return r == null || r !== r ? n : r;
        }
        var Dv = Gh(),
          Uv = Gh(!0);
        function dr(r) {
          return r;
        }
        function Ec(r) {
          return Sh(typeof r == "function" ? r : Cr(r, A));
        }
        function Fv(r) {
          return xh(Cr(r, A));
        }
        function Lv(r, n) {
          return Oh(r, Cr(n, A));
        }
        var Mv = Be(function (r, n) {
            return function (a) {
              return kn(a, r, n);
            };
          }),
          qv = Be(function (r, n) {
            return function (a) {
              return kn(r, a, n);
            };
          });
        function Sc(r, n, a) {
          var u = kt(n),
            g = uo(n, u);
          a == null &&
            !(bt(n) && (g.length || !u.length)) &&
            ((a = n), (n = r), (r = this), (g = uo(n, kt(n))));
          var v = !(bt(a) && "chain" in a) || !!a.chain,
            I = li(r);
          return (
            Pr(g, function (T) {
              var U = n[T];
              (r[T] = U),
                I &&
                  (r.prototype[T] = function () {
                    var J = this.__chain__;
                    if (v || J) {
                      var X = r(this.__wrapped__),
                        Z = (X.__actions__ = lr(this.__actions__));
                      return (
                        Z.push({ func: U, args: arguments, thisArg: r }),
                        (X.__chain__ = J),
                        X
                      );
                    }
                    return U.apply(r, bi([this.value()], arguments));
                  });
            }),
            r
          );
        }
        function zv() {
          return Xe._ === this && (Xe._ = pg), this;
        }
        function Ic() {}
        function Hv(r) {
          return (
            (r = Le(r)),
            Be(function (n) {
              return Ph(n, r);
            })
          );
        }
        var Kv = tc(vt),
          Bv = tc(Wu),
          Vv = tc(Oa);
        function Vl(r) {
          return cc(r) ? Pa(Xr(r)) : w0(r);
        }
        function kv(r) {
          return function (n) {
            return r == null ? t : Bi(r, n);
          };
        }
        var Gv = Yh(),
          Wv = Yh(!0);
        function xc() {
          return [];
        }
        function Oc() {
          return !1;
        }
        function Yv() {
          return {};
        }
        function Jv() {
          return "";
        }
        function Xv() {
          return !0;
        }
        function Qv(r, n) {
          if (((r = Le(r)), r < 1 || r > W)) return [];
          var a = re,
            u = Jt(r, re);
          (n = me(n)), (r -= re);
          for (var g = Ca(u, n); ++a < r; ) n(a);
          return g;
        }
        function Zv(r) {
          return Ne(r) ? vt(r, Xr) : br(r) ? [r] : lr(ll(it(r)));
        }
        function em(r) {
          var n = ++lg;
          return it(r) + n;
        }
        var tm = _o(function (r, n) {
            return r + n;
          }, 0),
          rm = rc("ceil"),
          im = _o(function (r, n) {
            return r / n;
          }, 1),
          nm = rc("floor");
        function sm(r) {
          return r && r.length ? co(r, dr, za) : t;
        }
        function om(r, n) {
          return r && r.length ? co(r, me(n, 2), za) : t;
        }
        function am(r) {
          return Xu(r, dr);
        }
        function cm(r, n) {
          return Xu(r, me(n, 2));
        }
        function um(r) {
          return r && r.length ? co(r, dr, Va) : t;
        }
        function hm(r, n) {
          return r && r.length ? co(r, me(n, 2), Va) : t;
        }
        var lm = _o(function (r, n) {
            return r * n;
          }, 1),
          fm = rc("round"),
          pm = _o(function (r, n) {
            return r - n;
          }, 0);
        function dm(r) {
          return r && r.length ? Ta(r, dr) : 0;
        }
        function gm(r, n) {
          return r && r.length ? Ta(r, me(n, 2)) : 0;
        }
        return (
          (y.after = Fy),
          (y.ary = El),
          (y.assign = I1),
          (y.assignIn = Ul),
          (y.assignInWith = To),
          (y.assignWith = x1),
          (y.at = O1),
          (y.before = Sl),
          (y.bind = dc),
          (y.bindAll = Rv),
          (y.bindKey = Il),
          (y.castArray = Yy),
          (y.chain = ml),
          (y.chunk = n_),
          (y.compact = s_),
          (y.concat = o_),
          (y.cond = Nv),
          (y.conforms = $v),
          (y.constant = wc),
          (y.countBy = dy),
          (y.create = P1),
          (y.curry = xl),
          (y.curryRight = Ol),
          (y.debounce = Pl),
          (y.defaults = A1),
          (y.defaultsDeep = T1),
          (y.defer = Ly),
          (y.delay = My),
          (y.difference = a_),
          (y.differenceBy = c_),
          (y.differenceWith = u_),
          (y.drop = h_),
          (y.dropRight = l_),
          (y.dropRightWhile = f_),
          (y.dropWhile = p_),
          (y.fill = d_),
          (y.filter = _y),
          (y.flatMap = my),
          (y.flatMapDeep = by),
          (y.flatMapDepth = wy),
          (y.flatten = gl),
          (y.flattenDeep = g_),
          (y.flattenDepth = __),
          (y.flip = qy),
          (y.flow = Dv),
          (y.flowRight = Uv),
          (y.fromPairs = y_),
          (y.functions = U1),
          (y.functionsIn = F1),
          (y.groupBy = Ey),
          (y.initial = m_),
          (y.intersection = b_),
          (y.intersectionBy = w_),
          (y.intersectionWith = E_),
          (y.invert = M1),
          (y.invertBy = q1),
          (y.invokeMap = Iy),
          (y.iteratee = Ec),
          (y.keyBy = xy),
          (y.keys = kt),
          (y.keysIn = pr),
          (y.map = So),
          (y.mapKeys = H1),
          (y.mapValues = K1),
          (y.matches = Fv),
          (y.matchesProperty = Lv),
          (y.memoize = xo),
          (y.merge = B1),
          (y.mergeWith = Fl),
          (y.method = Mv),
          (y.methodOf = qv),
          (y.mixin = Sc),
          (y.negate = Oo),
          (y.nthArg = Hv),
          (y.omit = V1),
          (y.omitBy = k1),
          (y.once = zy),
          (y.orderBy = Oy),
          (y.over = Kv),
          (y.overArgs = Hy),
          (y.overEvery = Bv),
          (y.overSome = Vv),
          (y.partial = gc),
          (y.partialRight = Al),
          (y.partition = Py),
          (y.pick = G1),
          (y.pickBy = Ll),
          (y.property = Vl),
          (y.propertyOf = kv),
          (y.pull = O_),
          (y.pullAll = yl),
          (y.pullAllBy = P_),
          (y.pullAllWith = A_),
          (y.pullAt = T_),
          (y.range = Gv),
          (y.rangeRight = Wv),
          (y.rearg = Ky),
          (y.reject = Cy),
          (y.remove = C_),
          (y.rest = By),
          (y.reverse = fc),
          (y.sampleSize = Ny),
          (y.set = Y1),
          (y.setWith = J1),
          (y.shuffle = $y),
          (y.slice = R_),
          (y.sortBy = Uy),
          (y.sortedUniq = L_),
          (y.sortedUniqBy = M_),
          (y.split = mv),
          (y.spread = Vy),
          (y.tail = q_),
          (y.take = z_),
          (y.takeRight = H_),
          (y.takeRightWhile = K_),
          (y.takeWhile = B_),
          (y.tap = sy),
          (y.throttle = ky),
          (y.thru = Eo),
          (y.toArray = $l),
          (y.toPairs = Ml),
          (y.toPairsIn = ql),
          (y.toPath = Zv),
          (y.toPlainObject = Dl),
          (y.transform = X1),
          (y.unary = Gy),
          (y.union = V_),
          (y.unionBy = k_),
          (y.unionWith = G_),
          (y.uniq = W_),
          (y.uniqBy = Y_),
          (y.uniqWith = J_),
          (y.unset = Q1),
          (y.unzip = pc),
          (y.unzipWith = vl),
          (y.update = Z1),
          (y.updateWith = ev),
          (y.values = Sn),
          (y.valuesIn = tv),
          (y.without = X_),
          (y.words = Kl),
          (y.wrap = Wy),
          (y.xor = Q_),
          (y.xorBy = Z_),
          (y.xorWith = ey),
          (y.zip = ty),
          (y.zipObject = ry),
          (y.zipObjectDeep = iy),
          (y.zipWith = ny),
          (y.entries = Ml),
          (y.entriesIn = ql),
          (y.extend = Ul),
          (y.extendWith = To),
          Sc(y, y),
          (y.add = tm),
          (y.attempt = Bl),
          (y.camelCase = sv),
          (y.capitalize = zl),
          (y.ceil = rm),
          (y.clamp = rv),
          (y.clone = Jy),
          (y.cloneDeep = Qy),
          (y.cloneDeepWith = Zy),
          (y.cloneWith = Xy),
          (y.conformsTo = e1),
          (y.deburr = Hl),
          (y.defaultTo = jv),
          (y.divide = im),
          (y.endsWith = ov),
          (y.eq = Hr),
          (y.escape = av),
          (y.escapeRegExp = cv),
          (y.every = gy),
          (y.find = yy),
          (y.findIndex = pl),
          (y.findKey = C1),
          (y.findLast = vy),
          (y.findLastIndex = dl),
          (y.findLastKey = R1),
          (y.floor = nm),
          (y.forEach = bl),
          (y.forEachRight = wl),
          (y.forIn = N1),
          (y.forInRight = $1),
          (y.forOwn = j1),
          (y.forOwnRight = D1),
          (y.get = vc),
          (y.gt = t1),
          (y.gte = r1),
          (y.has = L1),
          (y.hasIn = mc),
          (y.head = _l),
          (y.identity = dr),
          (y.includes = Sy),
          (y.indexOf = v_),
          (y.inRange = iv),
          (y.invoke = z1),
          (y.isArguments = Gi),
          (y.isArray = Ne),
          (y.isArrayBuffer = i1),
          (y.isArrayLike = fr),
          (y.isArrayLikeObject = Rt),
          (y.isBoolean = n1),
          (y.isBuffer = Pi),
          (y.isDate = s1),
          (y.isElement = o1),
          (y.isEmpty = a1),
          (y.isEqual = c1),
          (y.isEqualWith = u1),
          (y.isError = _c),
          (y.isFinite = h1),
          (y.isFunction = li),
          (y.isInteger = Tl),
          (y.isLength = Po),
          (y.isMap = Cl),
          (y.isMatch = l1),
          (y.isMatchWith = f1),
          (y.isNaN = p1),
          (y.isNative = d1),
          (y.isNil = _1),
          (y.isNull = g1),
          (y.isNumber = Rl),
          (y.isObject = bt),
          (y.isObjectLike = Pt),
          (y.isPlainObject = Qn),
          (y.isRegExp = yc),
          (y.isSafeInteger = y1),
          (y.isSet = Nl),
          (y.isString = Ao),
          (y.isSymbol = br),
          (y.isTypedArray = En),
          (y.isUndefined = v1),
          (y.isWeakMap = m1),
          (y.isWeakSet = b1),
          (y.join = S_),
          (y.kebabCase = uv),
          (y.last = Nr),
          (y.lastIndexOf = I_),
          (y.lowerCase = hv),
          (y.lowerFirst = lv),
          (y.lt = w1),
          (y.lte = E1),
          (y.max = sm),
          (y.maxBy = om),
          (y.mean = am),
          (y.meanBy = cm),
          (y.min = um),
          (y.minBy = hm),
          (y.stubArray = xc),
          (y.stubFalse = Oc),
          (y.stubObject = Yv),
          (y.stubString = Jv),
          (y.stubTrue = Xv),
          (y.multiply = lm),
          (y.nth = x_),
          (y.noConflict = zv),
          (y.noop = Ic),
          (y.now = Io),
          (y.pad = fv),
          (y.padEnd = pv),
          (y.padStart = dv),
          (y.parseInt = gv),
          (y.random = nv),
          (y.reduce = Ay),
          (y.reduceRight = Ty),
          (y.repeat = _v),
          (y.replace = yv),
          (y.result = W1),
          (y.round = fm),
          (y.runInContext = D),
          (y.sample = Ry),
          (y.size = jy),
          (y.snakeCase = vv),
          (y.some = Dy),
          (y.sortedIndex = N_),
          (y.sortedIndexBy = $_),
          (y.sortedIndexOf = j_),
          (y.sortedLastIndex = D_),
          (y.sortedLastIndexBy = U_),
          (y.sortedLastIndexOf = F_),
          (y.startCase = bv),
          (y.startsWith = wv),
          (y.subtract = pm),
          (y.sum = dm),
          (y.sumBy = gm),
          (y.template = Ev),
          (y.times = Qv),
          (y.toFinite = fi),
          (y.toInteger = Le),
          (y.toLength = jl),
          (y.toLower = Sv),
          (y.toNumber = $r),
          (y.toSafeInteger = S1),
          (y.toString = it),
          (y.toUpper = Iv),
          (y.trim = xv),
          (y.trimEnd = Ov),
          (y.trimStart = Pv),
          (y.truncate = Av),
          (y.unescape = Tv),
          (y.uniqueId = em),
          (y.upperCase = Cv),
          (y.upperFirst = bc),
          (y.each = bl),
          (y.eachRight = wl),
          (y.first = _l),
          Sc(
            y,
            (function () {
              var r = {};
              return (
                Yr(y, function (n, a) {
                  nt.call(y.prototype, a) || (r[a] = n);
                }),
                r
              );
            })(),
            { chain: !1 },
          ),
          (y.VERSION = s),
          Pr(
            [
              "bind",
              "bindKey",
              "curry",
              "curryRight",
              "partial",
              "partialRight",
            ],
            function (r) {
              y[r].placeholder = y;
            },
          ),
          Pr(["drop", "take"], function (r, n) {
            (Ye.prototype[r] = function (a) {
              a = a === t ? 1 : Bt(Le(a), 0);
              var u = this.__filtered__ && !n ? new Ye(this) : this.clone();
              return (
                u.__filtered__
                  ? (u.__takeCount__ = Jt(a, u.__takeCount__))
                  : u.__views__.push({
                      size: Jt(a, re),
                      type: r + (u.__dir__ < 0 ? "Right" : ""),
                    }),
                u
              );
            }),
              (Ye.prototype[r + "Right"] = function (a) {
                return this.reverse()[r](a).reverse();
              });
          }),
          Pr(["filter", "map", "takeWhile"], function (r, n) {
            var a = n + 1,
              u = a == $ || a == le;
            Ye.prototype[r] = function (g) {
              var v = this.clone();
              return (
                v.__iteratees__.push({ iteratee: me(g, 3), type: a }),
                (v.__filtered__ = v.__filtered__ || u),
                v
              );
            };
          }),
          Pr(["head", "last"], function (r, n) {
            var a = "take" + (n ? "Right" : "");
            Ye.prototype[r] = function () {
              return this[a](1).value()[0];
            };
          }),
          Pr(["initial", "tail"], function (r, n) {
            var a = "drop" + (n ? "" : "Right");
            Ye.prototype[r] = function () {
              return this.__filtered__ ? new Ye(this) : this[a](1);
            };
          }),
          (Ye.prototype.compact = function () {
            return this.filter(dr);
          }),
          (Ye.prototype.find = function (r) {
            return this.filter(r).head();
          }),
          (Ye.prototype.findLast = function (r) {
            return this.reverse().find(r);
          }),
          (Ye.prototype.invokeMap = Be(function (r, n) {
            return typeof r == "function"
              ? new Ye(this)
              : this.map(function (a) {
                  return kn(a, r, n);
                });
          })),
          (Ye.prototype.reject = function (r) {
            return this.filter(Oo(me(r)));
          }),
          (Ye.prototype.slice = function (r, n) {
            r = Le(r);
            var a = this;
            return a.__filtered__ && (r > 0 || n < 0)
              ? new Ye(a)
              : (r < 0 ? (a = a.takeRight(-r)) : r && (a = a.drop(r)),
                n !== t &&
                  ((n = Le(n)), (a = n < 0 ? a.dropRight(-n) : a.take(n - r))),
                a);
          }),
          (Ye.prototype.takeRightWhile = function (r) {
            return this.reverse().takeWhile(r).reverse();
          }),
          (Ye.prototype.toArray = function () {
            return this.take(re);
          }),
          Yr(Ye.prototype, function (r, n) {
            var a = /^(?:filter|find|map|reject)|While$/.test(n),
              u = /^(?:head|last)$/.test(n),
              g = y[u ? "take" + (n == "last" ? "Right" : "") : n],
              v = u || /^find/.test(n);
            g &&
              (y.prototype[n] = function () {
                var I = this.__wrapped__,
                  T = u ? [1] : arguments,
                  U = I instanceof Ye,
                  J = T[0],
                  X = U || Ne(I),
                  Z = function (Ge) {
                    var Qe = g.apply(y, bi([Ge], T));
                    return u && ae ? Qe[0] : Qe;
                  };
                X &&
                  a &&
                  typeof J == "function" &&
                  J.length != 1 &&
                  (U = X = !1);
                var ae = this.__chain__,
                  ye = !!this.__actions__.length,
                  we = v && !ae,
                  ze = U && !ye;
                if (!v && X) {
                  I = ze ? I : new Ye(this);
                  var Ee = r.apply(I, T);
                  return (
                    Ee.__actions__.push({ func: Eo, args: [Z], thisArg: t }),
                    new Tr(Ee, ae)
                  );
                }
                return we && ze
                  ? r.apply(this, T)
                  : ((Ee = this.thru(Z)),
                    we ? (u ? Ee.value()[0] : Ee.value()) : Ee);
              });
          }),
          Pr(
            ["pop", "push", "shift", "sort", "splice", "unshift"],
            function (r) {
              var n = Gs[r],
                a = /^(?:push|sort|unshift)$/.test(r) ? "tap" : "thru",
                u = /^(?:pop|shift)$/.test(r);
              y.prototype[r] = function () {
                var g = arguments;
                if (u && !this.__chain__) {
                  var v = this.value();
                  return n.apply(Ne(v) ? v : [], g);
                }
                return this[a](function (I) {
                  return n.apply(Ne(I) ? I : [], g);
                });
              };
            },
          ),
          Yr(Ye.prototype, function (r, n) {
            var a = y[n];
            if (a) {
              var u = a.name + "";
              nt.call(yn, u) || (yn[u] = []), yn[u].push({ name: n, func: a });
            }
          }),
          (yn[go(t, oe).name] = [{ name: "wrapper", func: t }]),
          (Ye.prototype.clone = Tg),
          (Ye.prototype.reverse = Cg),
          (Ye.prototype.value = Rg),
          (y.prototype.at = oy),
          (y.prototype.chain = ay),
          (y.prototype.commit = cy),
          (y.prototype.next = uy),
          (y.prototype.plant = ly),
          (y.prototype.reverse = fy),
          (y.prototype.toJSON = y.prototype.valueOf = y.prototype.value = py),
          (y.prototype.first = y.prototype.head),
          Mn && (y.prototype[Mn] = hy),
          y
        );
      },
      dn = cg();
    Ct ? (((Ct.exports = dn)._ = dn), (ct._ = dn)) : (Xe._ = dn);
  }).call(ls);
})(bu, bu.exports);
var zI = Object.defineProperty,
  HI = Object.defineProperties,
  KI = Object.getOwnPropertyDescriptors,
  _p = Object.getOwnPropertySymbols,
  BI = Object.prototype.hasOwnProperty,
  VI = Object.prototype.propertyIsEnumerable,
  yp = (i, e, t) =>
    e in i
      ? zI(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  Ro = (i, e) => {
    for (var t in e || (e = {})) BI.call(e, t) && yp(i, t, e[t]);
    if (_p) for (var t of _p(e)) VI.call(e, t) && yp(i, t, e[t]);
    return i;
  },
  kI = (i, e) => HI(i, KI(e));
function Ur(i, e, t) {
  let s;
  const o = wu(i);
  return (
    e.rpcMap && (s = e.rpcMap[o]),
    s || (s = `${qI}?chainId=eip155:${o}&projectId=${t}`),
    s
  );
}
function wu(i) {
  return i.includes("eip155") ? Number(i.split(":")[1]) : Number(i);
}
function Fd(i) {
  return i.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function GI(i, e) {
  const t = Object.keys(e.namespaces).filter((o) => o.includes(i));
  if (!t.length) return [];
  const s = [];
  return (
    t.forEach((o) => {
      const c = e.namespaces[o].accounts;
      s.push(...c);
    }),
    s
  );
}
function WI(i = {}, e = {}) {
  const t = vp(i),
    s = vp(e);
  return bu.exports.merge(t, s);
}
function vp(i) {
  var e, t, s, o;
  const c = {};
  if (!An(i)) return c;
  for (const [l, p] of Object.entries(i)) {
    const _ = Fu(l) ? [l] : p.chains,
      d = p.methods || [],
      w = p.events || [],
      A = p.rpcMap || {},
      S = jo(l);
    c[S] = kI(Ro(Ro({}, c[S]), p), {
      chains: Uc(_, (e = c[S]) == null ? void 0 : e.chains),
      methods: Uc(d, (t = c[S]) == null ? void 0 : t.methods),
      events: Uc(w, (s = c[S]) == null ? void 0 : s.events),
      rpcMap: Ro(Ro({}, A), (o = c[S]) == null ? void 0 : o.rpcMap),
    });
  }
  return c;
}
function YI(i) {
  return i.includes(":") ? i.split(":")[2] : i;
}
function JI(i) {
  const e = {};
  for (const [t, s] of Object.entries(i)) {
    const o = s.methods || [],
      c = s.events || [],
      l = s.accounts || [],
      p = Fu(t) ? [t] : s.chains ? s.chains : Fd(s.accounts);
    e[t] = { chains: p, methods: o, events: c, accounts: l };
  }
  return e;
}
const Ld = {},
  jt = (i) => Ld[i],
  Kc = (i, e) => {
    Ld[i] = e;
  };
class XI {
  constructor(e) {
    (this.name = "polkadot"),
      (this.namespace = e.namespace),
      (this.events = jt("events")),
      (this.client = jt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (((this.chainId = e), !this.httpProviders[e])) {
      const s = t || Ur(`${this.name}:${e}`, this.namespace);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit($i.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? e
          .filter((t) => t.split(":")[1] === this.chainId.toString())
          .map((t) => t.split(":")[2]) || []
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((t) => {
        var s;
        e[t] = this.createHttpProvider(
          t,
          (s = this.namespace.rpcMap) == null ? void 0 : s[t],
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || Ur(e, this.namespace);
    return typeof s > "u"
      ? void 0
      : new Ni(new rn(s, jt("disableProviderPing")));
  }
}
class QI {
  constructor(e) {
    (this.name = "eip155"),
      (this.namespace = e.namespace),
      (this.events = jt("events")),
      (this.client = jt("client")),
      (this.httpProviders = this.createHttpProviders()),
      (this.chainId = parseInt(this.getDefaultChain()));
  }
  async request(e) {
    switch (e.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(e);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
    }
    return this.namespace.methods.includes(e.request.method)
      ? await this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  setDefaultChain(e, t) {
    const s = wu(e);
    if (!this.httpProviders[s]) {
      const o =
        t ||
        Ur(`${this.name}:${s}`, this.namespace, this.client.core.projectId);
      if (!o) throw new Error(`No RPC url provided for chainId: ${s}`);
      this.setHttpProvider(s, o);
    }
    (this.chainId = s),
      this.events.emit($i.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  createHttpProvider(e, t) {
    const s =
      t || Ur(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Ni(new rn(s, jt("disableProviderPing")));
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((t) => {
        var s;
        const o = wu(t);
        e[o] = this.createHttpProvider(
          o,
          (s = this.namespace.rpcMap) == null ? void 0 : s[t],
        );
      }),
      e
    );
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((t) => t.split(":")[1] === this.chainId.toString())
              .map((t) => t.split(":")[2]),
          ),
        ]
      : [];
  }
  getHttpProvider() {
    const e = this.chainId,
      t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  async handleSwitchChain(e) {
    var t, s;
    let o = e.request.params
      ? (t = e.request.params[0]) == null
        ? void 0
        : t.chainId
      : "0x0";
    o = o.startsWith("0x") ? o : `0x${o}`;
    const c = parseInt(o, 16);
    if (this.isChainApproved(c)) this.setDefaultChain(`${c}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
      await this.client.request({
        topic: e.topic,
        request: { method: e.request.method, params: [{ chainId: o }] },
        chainId: (s = this.namespace.chains) == null ? void 0 : s[0],
      }),
        this.setDefaultChain(`${c}`);
    else
      throw new Error(
        `Failed to switch to chain 'eip155:${c}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`,
      );
    return null;
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
}
class ZI {
  constructor(e) {
    (this.name = "solana"),
      (this.namespace = e.namespace),
      (this.events = jt("events")),
      (this.client = jt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (!this.httpProviders[e]) {
      const s =
        t ||
        Ur(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    (this.chainId = e),
      this.events.emit(
        $i.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`,
      );
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((t) => t.split(":")[1] === this.chainId.toString())
              .map((t) => t.split(":")[2]),
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((t) => {
        var s;
        e[t] = this.createHttpProvider(
          t,
          (s = this.namespace.rpcMap) == null ? void 0 : s[t],
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || Ur(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Ni(new rn(s, jt("disableProviderPing")));
  }
}
class e5 {
  constructor(e) {
    (this.name = "cosmos"),
      (this.namespace = e.namespace),
      (this.events = jt("events")),
      (this.client = jt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (((this.chainId = e), !this.httpProviders[e])) {
      const s =
        t ||
        Ur(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit($i.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((t) => t.split(":")[1] === this.chainId.toString())
              .map((t) => t.split(":")[2]),
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((t) => {
        var s;
        e[t] = this.createHttpProvider(
          t,
          (s = this.namespace.rpcMap) == null ? void 0 : s[t],
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || Ur(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Ni(new rn(s, jt("disableProviderPing")));
  }
}
class t5 {
  constructor(e) {
    (this.name = "cip34"),
      (this.namespace = e.namespace),
      (this.events = jt("events")),
      (this.client = jt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (((this.chainId = e), !this.httpProviders[e])) {
      const s = t || this.getCardanoRPCUrl(e);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit($i.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((t) => t.split(":")[1] === this.chainId.toString())
              .map((t) => t.split(":")[2]),
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((t) => {
        const s = this.getCardanoRPCUrl(t);
        e[t] = this.createHttpProvider(t, s);
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  getCardanoRPCUrl(e) {
    const t = this.namespace.rpcMap;
    if (t) return t[e];
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || this.getCardanoRPCUrl(e);
    return typeof s > "u"
      ? void 0
      : new Ni(new rn(s, jt("disableProviderPing")));
  }
}
class r5 {
  constructor(e) {
    (this.name = "elrond"),
      (this.namespace = e.namespace),
      (this.events = jt("events")),
      (this.client = jt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (!this.httpProviders[e]) {
      const s =
        t ||
        Ur(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    (this.chainId = e),
      this.events.emit(
        $i.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`,
      );
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((t) => t.split(":")[1] === this.chainId.toString())
              .map((t) => t.split(":")[2]),
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((t) => {
        var s;
        e[t] = this.createHttpProvider(
          t,
          (s = this.namespace.rpcMap) == null ? void 0 : s[t],
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || Ur(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Ni(new rn(s, jt("disableProviderPing")));
  }
}
class i5 {
  constructor(e) {
    (this.name = "multiversx"),
      (this.namespace = e.namespace),
      (this.events = jt("events")),
      (this.client = jt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (!this.httpProviders[e]) {
      const s =
        t ||
        Ur(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    (this.chainId = e),
      this.events.emit(
        $i.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`,
      );
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((t) => t.split(":")[1] === this.chainId.toString())
              .map((t) => t.split(":")[2]),
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((t) => {
        var s;
        e[t] = this.createHttpProvider(
          t,
          (s = this.namespace.rpcMap) == null ? void 0 : s[t],
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || Ur(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Ni(new rn(s, jt("disableProviderPing")));
  }
}
var n5 = Object.defineProperty,
  s5 = Object.defineProperties,
  o5 = Object.getOwnPropertyDescriptors,
  mp = Object.getOwnPropertySymbols,
  a5 = Object.prototype.hasOwnProperty,
  c5 = Object.prototype.propertyIsEnumerable,
  bp = (i, e, t) =>
    e in i
      ? n5(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  No = (i, e) => {
    for (var t in e || (e = {})) a5.call(e, t) && bp(i, t, e[t]);
    if (mp) for (var t of mp(e)) c5.call(e, t) && bp(i, t, e[t]);
    return i;
  },
  Bc = (i, e) => s5(i, o5(e));
class ku {
  constructor(e) {
    (this.events = new Iu()),
      (this.rpcProviders = {}),
      (this.shouldAbortPairingAttempt = !1),
      (this.maxPairingAttempts = 10),
      (this.disableProviderPing = !1),
      (this.providerOpts = e),
      (this.logger =
        typeof (e == null ? void 0 : e.logger) < "u" &&
        typeof (e == null ? void 0 : e.logger) != "string"
          ? e.logger
          : Ze.pino(
              Ze.getDefaultLoggerOptions({
                level: (e == null ? void 0 : e.logger) || dp,
              }),
            )),
      (this.disableProviderPing =
        (e == null ? void 0 : e.disableProviderPing) || !1);
  }
  static async init(e) {
    const t = new ku(e);
    return await t.initialize(), t;
  }
  async request(e, t) {
    const [s, o] = this.validateChain(t);
    if (!this.session)
      throw new Error("Please call connect() before request()");
    return await this.getProvider(s).request({
      request: No({}, e),
      chainId: `${s}:${o}`,
      topic: this.session.topic,
    });
  }
  sendAsync(e, t, s) {
    this.request(e, s)
      .then((o) => t(null, o))
      .catch((o) => t(o, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return (
      this.session ||
        (await this.connect({
          namespaces: this.namespaces,
          optionalNamespaces: this.optionalNamespaces,
          sessionProperties: this.sessionProperties,
        })),
      await this.requestAccounts()
    );
  }
  async disconnect() {
    var e;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({
      topic: (e = this.session) == null ? void 0 : e.topic,
      reason: $t("USER_DISCONNECTED"),
    }),
      await this.cleanup();
  }
  async connect(e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (
      (this.setNamespaces(e),
      await this.cleanupPendingPairings(),
      !e.skipPairing)
    )
      return await this.pair(e.pairingTopic);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  get isWalletConnect() {
    return !0;
  }
  async pair(e) {
    this.shouldAbortPairingAttempt = !1;
    let t = 0;
    do {
      if (this.shouldAbortPairingAttempt) throw new Error("Pairing aborted");
      if (t >= this.maxPairingAttempts)
        throw new Error("Max auto pairing attempts reached");
      const { uri: s, approval: o } = await this.client.connect({
        pairingTopic: e,
        requiredNamespaces: this.namespaces,
        optionalNamespaces: this.optionalNamespaces,
        sessionProperties: this.sessionProperties,
      });
      s && ((this.uri = s), this.events.emit("display_uri", s)),
        await o()
          .then((c) => {
            (this.session = c),
              this.namespaces ||
                ((this.namespaces = JI(c.namespaces)),
                this.persist("namespaces", this.namespaces));
          })
          .catch((c) => {
            if (c.message !== Dd) throw c;
            t++;
          });
    } while (!this.session);
    return this.onConnect(), this.session;
  }
  setDefaultChain(e, t) {
    try {
      if (!this.session) return;
      const [s, o] = this.validateChain(e);
      this.getProvider(s).setDefaultChain(o, t);
    } catch (s) {
      if (!/Please call connect/.test(s.message)) throw s;
    }
  }
  async cleanupPendingPairings(e = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const t = this.client.pairing.getAll();
    if (ti(t)) {
      for (const s of t)
        e.deletePairings
          ? this.client.core.expirer.set(s.topic, 0)
          : await this.client.core.relayer.subscriber.unsubscribe(s.topic);
      this.logger.info(`Inactive pairings cleared: ${t.length}`);
    }
  }
  abortPairingAttempt() {
    this.shouldAbortPairingAttempt = !0;
  }
  async checkStorage() {
    if (
      ((this.namespaces = await this.getFromStore("namespaces")),
      (this.optionalNamespaces =
        (await this.getFromStore("optionalNamespaces")) || {}),
      this.client.session.length)
    ) {
      const e = this.client.session.keys.length - 1;
      (this.session = this.client.session.get(this.client.session.keys[e])),
        this.createProviders();
    }
  }
  async initialize() {
    this.logger.trace("Initialized"),
      await this.createClient(),
      await this.checkStorage(),
      this.registerEventListeners();
  }
  async createClient() {
    (this.client =
      this.providerOpts.client ||
      (await jI.init({
        logger: this.providerOpts.logger || dp,
        relayUrl: this.providerOpts.relayUrl || FI,
        projectId: this.providerOpts.projectId,
        metadata: this.providerOpts.metadata,
        storageOptions: this.providerOpts.storageOptions,
        storage: this.providerOpts.storage,
        name: this.providerOpts.name,
      }))),
      this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session)
      throw new Error(
        "Session not initialized. Please call connect() before enable()",
      );
    const e = [
      ...new Set(Object.keys(this.session.namespaces).map((t) => jo(t))),
    ];
    Kc("client", this.client),
      Kc("events", this.events),
      Kc("disableProviderPing", this.disableProviderPing),
      e.forEach((t) => {
        if (!this.session) return;
        const s = GI(t, this.session),
          o = Fd(s),
          c = WI(this.namespaces, this.optionalNamespaces),
          l = Bc(No({}, c[t]), { accounts: s, chains: o });
        switch (t) {
          case "eip155":
            this.rpcProviders[t] = new QI({ namespace: l });
            break;
          case "solana":
            this.rpcProviders[t] = new ZI({ namespace: l });
            break;
          case "cosmos":
            this.rpcProviders[t] = new e5({ namespace: l });
            break;
          case "polkadot":
            this.rpcProviders[t] = new XI({ namespace: l });
            break;
          case "cip34":
            this.rpcProviders[t] = new t5({ namespace: l });
            break;
          case "elrond":
            this.rpcProviders[t] = new r5({ namespace: l });
            break;
          case "multiversx":
            this.rpcProviders[t] = new i5({ namespace: l });
            break;
        }
      });
  }
  registerEventListeners() {
    if (typeof this.client > "u")
      throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      this.events.emit("session_ping", e);
    }),
      this.client.on("session_event", (e) => {
        const { params: t } = e,
          { event: s } = t;
        if (s.name === "accountsChanged") {
          const o = s.data;
          o && ti(o) && this.events.emit("accountsChanged", o.map(YI));
        } else
          s.name === "chainChanged"
            ? this.onChainChanged(t.chainId)
            : this.events.emit(s.name, s.data);
        this.events.emit("session_event", e);
      }),
      this.client.on("session_update", ({ topic: e, params: t }) => {
        var s;
        const { namespaces: o } = t,
          c = (s = this.client) == null ? void 0 : s.session.get(e);
        (this.session = Bc(No({}, c), { namespaces: o })),
          this.onSessionUpdate(),
          this.events.emit("session_update", { topic: e, params: t });
      }),
      this.client.on("session_delete", async (e) => {
        await this.cleanup(),
          this.events.emit("session_delete", e),
          this.events.emit(
            "disconnect",
            Bc(No({}, $t("USER_DISCONNECTED")), { data: e.topic }),
          );
      }),
      this.on($i.DEFAULT_CHAIN_CHANGED, (e) => {
        this.onChainChanged(e, !0);
      });
  }
  getProvider(e) {
    if (!this.rpcProviders[e]) throw new Error(`Provider not found: ${e}`);
    return this.rpcProviders[e];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      var t;
      this.getProvider(e).updateNamespace(
        (t = this.session) == null ? void 0 : t.namespaces[e],
      );
    });
  }
  setNamespaces(e) {
    const { namespaces: t, optionalNamespaces: s, sessionProperties: o } = e;
    t && Object.keys(t).length && (this.namespaces = t),
      s && Object.keys(s).length && (this.optionalNamespaces = s),
      (this.sessionProperties = o),
      this.persist("namespaces", t),
      this.persist("optionalNamespaces", s);
  }
  validateChain(e) {
    const [t, s] = (e == null ? void 0 : e.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [t, s];
    if (
      t &&
      !Object.keys(this.namespaces || {})
        .map((l) => jo(l))
        .includes(t)
    )
      throw new Error(
        `Namespace '${t}' is not configured. Please call connect() first with namespace config.`,
      );
    if (t && s) return [t, s];
    const o = jo(Object.keys(this.namespaces)[0]),
      c = this.rpcProviders[o].getDefaultChain();
    return [o, c];
  }
  async requestAccounts() {
    const [e] = this.validateChain();
    return await this.getProvider(e).requestAccounts();
  }
  onChainChanged(e, t = !1) {
    var s;
    if (!this.namespaces) return;
    const [o, c] = this.validateChain(e);
    t || this.getProvider(o).setDefaultChain(c),
      (((s = this.namespaces[o]) != null
        ? s
        : this.namespaces[`${o}:${c}`]
      ).defaultChain = c),
      this.persist("namespaces", this.namespaces),
      this.events.emit("chainChanged", c);
  }
  onConnect() {
    this.createProviders(),
      this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    (this.session = void 0),
      (this.namespaces = void 0),
      (this.optionalNamespaces = void 0),
      (this.sessionProperties = void 0),
      this.persist("namespaces", void 0),
      this.persist("optionalNamespaces", void 0),
      this.persist("sessionProperties", void 0),
      await this.cleanupPendingPairings({ deletePairings: !0 });
  }
  persist(e, t) {
    this.client.core.storage.setItem(`${gp}/${e}`, t);
  }
  async getFromStore(e) {
    return await this.client.core.storage.getItem(`${gp}/${e}`);
  }
}
const u5 = ku,
  h5 = "wc",
  l5 = "ethereum_provider",
  f5 = `${h5}@2:${l5}:`,
  p5 = "https://rpc.walletconnect.com/v1/",
  Eu = ["eth_sendTransaction", "personal_sign"],
  d5 = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
  ],
  Su = ["chainChanged", "accountsChanged"],
  g5 = ["message", "disconnect", "connect"];
var _5 = Object.defineProperty,
  y5 = Object.defineProperties,
  v5 = Object.getOwnPropertyDescriptors,
  wp = Object.getOwnPropertySymbols,
  m5 = Object.prototype.hasOwnProperty,
  b5 = Object.prototype.propertyIsEnumerable,
  Ep = (i, e, t) =>
    e in i
      ? _5(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  fs = (i, e) => {
    for (var t in e || (e = {})) m5.call(e, t) && Ep(i, t, e[t]);
    if (wp) for (var t of wp(e)) b5.call(e, t) && Ep(i, t, e[t]);
    return i;
  },
  Sp = (i, e) => y5(i, v5(e));
function Ko(i) {
  return Number(i[0].split(":")[1]);
}
function Vc(i) {
  return `0x${i.toString(16)}`;
}
function w5(i) {
  const {
    chains: e,
    optionalChains: t,
    methods: s,
    optionalMethods: o,
    events: c,
    optionalEvents: l,
    rpcMap: p,
  } = i;
  if (!ti(e)) throw new Error("Invalid chains");
  const _ = {
      chains: e,
      methods: s || Eu,
      events: c || Su,
      rpcMap: fs({}, e.length ? { [Ko(e)]: p[Ko(e)] } : {}),
    },
    d = c == null ? void 0 : c.filter((P) => !Su.includes(P)),
    w = s == null ? void 0 : s.filter((P) => !Eu.includes(P));
  if (!t && !l && !o && !(d != null && d.length) && !(w != null && w.length))
    return { required: e.length ? _ : void 0 };
  const A =
      ((d == null ? void 0 : d.length) && (w == null ? void 0 : w.length)) ||
      !t,
    S = {
      chains: [...new Set(A ? _.chains.concat(t || []) : t)],
      methods: [...new Set(_.methods.concat(o != null && o.length ? o : d5))],
      events: [...new Set(_.events.concat(l || g5))],
      rpcMap: p,
    };
  return { required: e.length ? _ : void 0, optional: t.length ? S : void 0 };
}
class Gu {
  constructor() {
    (this.events = new Fr.EventEmitter()),
      (this.namespace = "eip155"),
      (this.accounts = []),
      (this.chainId = 1),
      (this.STORAGE_KEY = f5),
      (this.on = (e, t) => (this.events.on(e, t), this)),
      (this.once = (e, t) => (this.events.once(e, t), this)),
      (this.removeListener = (e, t) => (
        this.events.removeListener(e, t), this
      )),
      (this.off = (e, t) => (this.events.off(e, t), this)),
      (this.parseAccount = (e) =>
        this.isCompatibleChainId(e) ? this.parseAccountId(e).address : e),
      (this.signer = {}),
      (this.rpc = {});
  }
  static async init(e) {
    const t = new Gu();
    return await t.initialize(e), t;
  }
  async request(e) {
    return await this.signer.request(e, this.formatChainId(this.chainId));
  }
  sendAsync(e, t) {
    this.signer.sendAsync(e, t, this.formatChainId(this.chainId));
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : !1;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
  }
  async enable() {
    return (
      this.session || (await this.connect()),
      await this.request({ method: "eth_requestAccounts" })
    );
  }
  async connect(e) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(e);
    const { required: t, optional: s } = w5(this.rpc);
    try {
      const o = await new Promise(async (l, p) => {
        var _;
        this.rpc.showQrModal &&
          ((_ = this.modal) == null ||
            _.subscribeModal((d) => {
              !d.open &&
                !this.signer.session &&
                (this.signer.abortPairingAttempt(),
                p(new Error("Connection request reset. Please try again.")));
            })),
          await this.signer
            .connect(
              Sp(
                fs(
                  { namespaces: fs({}, t && { [this.namespace]: t }) },
                  s && { optionalNamespaces: { [this.namespace]: s } },
                ),
                { pairingTopic: e == null ? void 0 : e.pairingTopic },
              ),
            )
            .then((d) => {
              l(d);
            })
            .catch((d) => {
              p(new Error(d.message));
            });
      });
      if (!o) return;
      this.setChainIds(this.rpc.chains);
      const c = JE(o.namespaces, [this.namespace]);
      this.setAccounts(c),
        this.events.emit("connect", { chainId: Vc(this.chainId) });
    } catch (o) {
      throw (this.signer.logger.error(o), o);
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && (await this.signer.disconnect()), this.reset();
  }
  get isWalletConnect() {
    return !0;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (e) => {
      const { params: t } = e,
        { event: s } = t;
      s.name === "accountsChanged"
        ? ((this.accounts = this.parseAccounts(s.data)),
          this.events.emit("accountsChanged", this.accounts))
        : s.name === "chainChanged"
        ? this.setChainId(this.formatChainId(s.data))
        : this.events.emit(s.name, s.data),
        this.events.emit("session_event", e);
    }),
      this.signer.on("chainChanged", (e) => {
        const t = parseInt(e);
        (this.chainId = t),
          this.events.emit("chainChanged", Vc(this.chainId)),
          this.persist();
      }),
      this.signer.on("session_update", (e) => {
        this.events.emit("session_update", e);
      }),
      this.signer.on("session_delete", (e) => {
        this.reset(),
          this.events.emit("session_delete", e),
          this.events.emit(
            "disconnect",
            Sp(fs({}, $t("USER_DISCONNECTED")), {
              data: e.topic,
              name: "USER_DISCONNECTED",
            }),
          );
      }),
      this.signer.on("display_uri", (e) => {
        var t, s;
        this.rpc.showQrModal &&
          ((t = this.modal) == null || t.closeModal(),
          (s = this.modal) == null || s.openModal({ uri: e })),
          this.events.emit("display_uri", e);
      });
  }
  switchEthereumChain(e) {
    this.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.toString(16) }],
    });
  }
  isCompatibleChainId(e) {
    return typeof e == "string" ? e.startsWith(`${this.namespace}:`) : !1;
  }
  formatChainId(e) {
    return `${this.namespace}:${e}`;
  }
  parseChainId(e) {
    return Number(e.split(":")[1]);
  }
  setChainIds(e) {
    const t = e
      .filter((s) => this.isCompatibleChainId(s))
      .map((s) => this.parseChainId(s));
    t.length &&
      ((this.chainId = t[0]),
      this.events.emit("chainChanged", Vc(this.chainId)),
      this.persist());
  }
  setChainId(e) {
    if (this.isCompatibleChainId(e)) {
      const t = this.parseChainId(e);
      (this.chainId = t), this.switchEthereumChain(t);
    }
  }
  parseAccountId(e) {
    const [t, s, o] = e.split(":");
    return { chainId: `${t}:${s}`, address: o };
  }
  setAccounts(e) {
    (this.accounts = e
      .filter(
        (t) =>
          this.parseChainId(this.parseAccountId(t).chainId) === this.chainId,
      )
      .map((t) => this.parseAccountId(t).address)),
      this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(e) {
    var t, s;
    const o = (t = e == null ? void 0 : e.chains) != null ? t : [],
      c = (s = e == null ? void 0 : e.optionalChains) != null ? s : [],
      l = o.concat(c);
    if (!l.length)
      throw new Error(
        "No chains specified in either `chains` or `optionalChains`",
      );
    const p = o.length ? (e == null ? void 0 : e.methods) || Eu : [],
      _ = o.length ? (e == null ? void 0 : e.events) || Su : [],
      d = (e == null ? void 0 : e.optionalMethods) || [],
      w = (e == null ? void 0 : e.optionalEvents) || [],
      A = (e == null ? void 0 : e.rpcMap) || this.buildRpcMap(l, e.projectId),
      S = (e == null ? void 0 : e.qrModalOptions) || void 0;
    return {
      chains: o == null ? void 0 : o.map((P) => this.formatChainId(P)),
      optionalChains: c.map((P) => this.formatChainId(P)),
      methods: p,
      events: _,
      optionalMethods: d,
      optionalEvents: w,
      rpcMap: A,
      showQrModal: !!(e != null && e.showQrModal),
      qrModalOptions: S,
      projectId: e.projectId,
      metadata: e.metadata,
    };
  }
  buildRpcMap(e, t) {
    const s = {};
    return (
      e.forEach((o) => {
        s[o] = this.getRpcUrl(o, t);
      }),
      s
    );
  }
  async initialize(e) {
    if (
      ((this.rpc = this.getRpcConfig(e)),
      (this.chainId = this.rpc.chains.length
        ? Ko(this.rpc.chains)
        : Ko(this.rpc.optionalChains)),
      (this.signer = await u5.init({
        projectId: this.rpc.projectId,
        metadata: this.rpc.metadata,
        disableProviderPing: e.disableProviderPing,
        relayUrl: e.relayUrl,
        storageOptions: e.storageOptions,
      })),
      this.registerEventListeners(),
      await this.loadPersistedSession(),
      this.rpc.showQrModal)
    ) {
      let t;
      try {
        const { WalletConnectModal: s } = await mm(
          () => import("./index-6a6e05dd.js").then((o) => o.i),
          [
            "assets/index-6a6e05dd.js",
            "assets/index-aff6404b.js",
            "assets/index-6a964d41.css",
          ],
        );
        t = s;
      } catch {
        throw new Error(
          "To use QR modal, please install @walletconnect/modal package",
        );
      }
      if (t)
        try {
          this.modal = new t(
            fs(
              {
                walletConnectVersion: 2,
                projectId: this.rpc.projectId,
                standaloneChains: this.rpc.chains,
              },
              this.rpc.qrModalOptions,
            ),
          );
        } catch (s) {
          throw (
            (this.signer.logger.error(s),
            new Error("Could not generate WalletConnectModal Instance"))
          );
        }
    }
  }
  loadConnectOpts(e) {
    if (!e) return;
    const { chains: t, optionalChains: s, rpcMap: o } = e;
    t &&
      ti(t) &&
      ((this.rpc.chains = t.map((c) => this.formatChainId(c))),
      t.forEach((c) => {
        this.rpc.rpcMap[c] = (o == null ? void 0 : o[c]) || this.getRpcUrl(c);
      })),
      s &&
        ti(s) &&
        ((this.rpc.optionalChains = []),
        (this.rpc.optionalChains =
          s == null ? void 0 : s.map((c) => this.formatChainId(c))),
        s.forEach((c) => {
          this.rpc.rpcMap[c] = (o == null ? void 0 : o[c]) || this.getRpcUrl(c);
        }));
  }
  getRpcUrl(e, t) {
    var s;
    return (
      ((s = this.rpc.rpcMap) == null ? void 0 : s[e]) ||
      `${p5}?chainId=eip155:${e}&projectId=${t || this.rpc.projectId}`
    );
  }
  async loadPersistedSession() {
    if (!this.session) return;
    const e = await this.signer.client.core.storage.getItem(
        `${this.STORAGE_KEY}/chainId`,
      ),
      t = this.session.namespaces[`${this.namespace}:${e}`]
        ? this.session.namespaces[`${this.namespace}:${e}`]
        : this.session.namespaces[this.namespace];
    this.setChainIds(
      e ? [this.formatChainId(e)] : t == null ? void 0 : t.accounts,
    ),
      this.setAccounts(t == null ? void 0 : t.accounts);
  }
  reset() {
    (this.chainId = 1), (this.accounts = []);
  }
  persist() {
    this.session &&
      this.signer.client.core.storage.setItem(
        `${this.STORAGE_KEY}/chainId`,
        this.chainId,
      );
  }
  parseAccounts(e) {
    return typeof e == "string" || e instanceof String
      ? [this.parseAccount(e)]
      : e.map((t) => this.parseAccount(t));
  }
}
const F5 = Gu;
export {
  F5 as EthereumProvider,
  g5 as OPTIONAL_EVENTS,
  d5 as OPTIONAL_METHODS,
  Su as REQUIRED_EVENTS,
  Eu as REQUIRED_METHODS,
  Gu as default,
};
