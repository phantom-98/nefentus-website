import {
  n as C,
  T as Fr,
  A as zr,
  i as R,
  s as A,
  b as N,
  x as d,
} from "./lit-element-2aa1acc0.js";
import {
  n as be,
  s as Ye,
  T as S,
  t as _,
  a as $,
  o as te,
  R as Hr,
  p as K,
  y as de,
} from "./index-6a6e05dd.js";
import "./index-aff6404b.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const O = (e) => (t) =>
  typeof t == "function"
    ? ((o, n) => (customElements.define(o, n), n))(e, t)
    : ((o, n) => {
        const { kind: r, elements: i } = n;
        return {
          kind: r,
          elements: i,
          finisher(a) {
            customElements.define(o, a);
          },
        };
      })(e, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function W(e) {
  return C({ ...e, state: !0 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Zr = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  Vr =
    (e) =>
    (...t) => ({ _$litDirective$: e, values: t });
class Kr {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, o, n) {
    (this._$Ct = t), (this._$AM = o), (this._$Ci = n);
  }
  _$AS(t, o) {
    return this.update(t, o);
  }
  update(t, o) {
    return this.render(...o);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const G = Vr(
  class extends Kr {
    constructor(e) {
      var t;
      if (
        (super(e),
        e.type !== Zr.ATTRIBUTE ||
          e.name !== "class" ||
          ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      )
        throw Error(
          "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.",
        );
    }
    render(e) {
      return (
        " " +
        Object.keys(e)
          .filter((t) => e[t])
          .join(" ") +
        " "
      );
    }
    update(e, [t]) {
      var o, n;
      if (this.it === void 0) {
        (this.it = new Set()),
          e.strings !== void 0 &&
            (this.nt = new Set(
              e.strings
                .join(" ")
                .split(/\s/)
                .filter((i) => i !== ""),
            ));
        for (const i in t)
          t[i] &&
            !(!((o = this.nt) === null || o === void 0) && o.has(i)) &&
            this.it.add(i);
        return this.render(t);
      }
      const r = e.element.classList;
      this.it.forEach((i) => {
        i in t || (r.remove(i), this.it.delete(i));
      });
      for (const i in t) {
        const a = !!t[i];
        a === this.it.has(i) ||
          (!((n = this.nt) === null || n === void 0) && n.has(i)) ||
          (a ? (r.add(i), this.it.add(i)) : (r.remove(i), this.it.delete(i)));
      }
      return Fr;
    }
  },
);
function qr(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
const fr = (e, t, o) => Math.min(Math.max(o, e), t),
  U = { duration: 0.3, delay: 0, endDelay: 0, repeat: 0, easing: "ease" },
  Ge = (e) => typeof e == "number",
  pe = (e) => Array.isArray(e) && !Ge(e[0]),
  Yr = (e, t, o) => {
    const n = t - e;
    return ((((o - e) % n) + n) % n) + e;
  };
function Gr(e, t) {
  return pe(e) ? e[Yr(0, e.length, t)] : e;
}
const wr = (e, t, o) => -o * e + o * t + e,
  pr = () => {},
  oe = (e) => e,
  Ft = (e, t, o) => (t - e === 0 ? 1 : (o - e) / (t - e));
function vr(e, t) {
  const o = e[e.length - 1];
  for (let n = 1; n <= t; n++) {
    const r = Ft(0, t, n);
    e.push(wr(o, 1, r));
  }
}
function Qr(e) {
  const t = [0];
  return vr(t, e - 1), t;
}
function Jr(e, t = Qr(e.length), o = oe) {
  const n = e.length,
    r = n - t.length;
  return (
    r > 0 && vr(t, r),
    (i) => {
      let a = 0;
      for (; a < n - 2 && !(i < t[a + 1]); a++);
      let l = fr(0, 1, Ft(t[a], t[a + 1], i));
      return (l = Gr(o, a)(l)), wr(e[a], e[a + 1], l);
    }
  );
}
const br = (e) => Array.isArray(e) && Ge(e[0]),
  Nt = (e) => typeof e == "object" && !!e.createAnimation,
  ye = (e) => typeof e == "function",
  Xr = (e) => typeof e == "string",
  Le = { ms: (e) => e * 1e3, s: (e) => e / 1e3 },
  yr = (e, t, o) =>
    (((1 - 3 * o + 3 * t) * e + (3 * o - 6 * t)) * e + 3 * t) * e,
  eo = 1e-7,
  to = 12;
function ro(e, t, o, n, r) {
  let i,
    a,
    l = 0;
  do (a = t + (o - t) / 2), (i = yr(a, n, r) - e), i > 0 ? (o = a) : (t = a);
  while (Math.abs(i) > eo && ++l < to);
  return a;
}
function Re(e, t, o, n) {
  if (e === t && o === n) return oe;
  const r = (i) => ro(i, 0, 1, e, o);
  return (i) => (i === 0 || i === 1 ? i : yr(r(i), t, n));
}
const oo =
    (e, t = "end") =>
    (o) => {
      o = t === "end" ? Math.min(o, 0.999) : Math.max(o, 0.001);
      const n = o * e,
        r = t === "end" ? Math.floor(n) : Math.ceil(n);
      return fr(0, 1, r / e);
    },
  Yt = {
    ease: Re(0.25, 0.1, 0.25, 1),
    "ease-in": Re(0.42, 0, 1, 1),
    "ease-in-out": Re(0.42, 0, 0.58, 1),
    "ease-out": Re(0, 0, 0.58, 1),
  },
  no = /\((.*?)\)/;
function Gt(e) {
  if (ye(e)) return e;
  if (br(e)) return Re(...e);
  if (Yt[e]) return Yt[e];
  if (e.startsWith("steps")) {
    const t = no.exec(e);
    if (t) {
      const o = t[1].split(",");
      return oo(parseFloat(o[0]), o[1].trim());
    }
  }
  return oe;
}
class xr {
  constructor(
    t,
    o = [0, 1],
    {
      easing: n,
      duration: r = U.duration,
      delay: i = U.delay,
      endDelay: a = U.endDelay,
      repeat: l = U.repeat,
      offset: s,
      direction: c = "normal",
    } = {},
  ) {
    if (
      ((this.startTime = null),
      (this.rate = 1),
      (this.t = 0),
      (this.cancelTimestamp = null),
      (this.easing = oe),
      (this.duration = 0),
      (this.totalDuration = 0),
      (this.repeat = 0),
      (this.playState = "idle"),
      (this.finished = new Promise((E, f) => {
        (this.resolve = E), (this.reject = f);
      })),
      (n = n || U.easing),
      Nt(n))
    ) {
      const E = n.createAnimation(o);
      (n = E.easing), (o = E.keyframes || o), (r = E.duration || r);
    }
    (this.repeat = l),
      (this.easing = pe(n) ? oe : Gt(n)),
      this.updateDuration(r);
    const m = Jr(o, s, pe(n) ? n.map(Gt) : oe);
    (this.tick = (E) => {
      var f;
      i = i;
      let g = 0;
      this.pauseTime !== void 0
        ? (g = this.pauseTime)
        : (g = (E - this.startTime) * this.rate),
        (this.t = g),
        (g /= 1e3),
        (g = Math.max(g - i, 0)),
        this.playState === "finished" &&
          this.pauseTime === void 0 &&
          (g = this.totalDuration);
      const p = g / this.duration;
      let h = Math.floor(p),
        x = p % 1;
      !x && p >= 1 && (x = 1), x === 1 && h--;
      const u = h % 2;
      (c === "reverse" ||
        (c === "alternate" && u) ||
        (c === "alternate-reverse" && !u)) &&
        (x = 1 - x);
      const b = g >= this.totalDuration ? 1 : Math.min(x, 1),
        v = m(this.easing(b));
      t(v),
        this.pauseTime === void 0 &&
        (this.playState === "finished" || g >= this.totalDuration + a)
          ? ((this.playState = "finished"),
            (f = this.resolve) === null || f === void 0 || f.call(this, v))
          : this.playState !== "idle" &&
            (this.frameRequestId = requestAnimationFrame(this.tick));
    }),
      this.play();
  }
  play() {
    const t = performance.now();
    (this.playState = "running"),
      this.pauseTime !== void 0
        ? (this.startTime = t - this.pauseTime)
        : this.startTime || (this.startTime = t),
      (this.cancelTimestamp = this.startTime),
      (this.pauseTime = void 0),
      (this.frameRequestId = requestAnimationFrame(this.tick));
  }
  pause() {
    (this.playState = "paused"), (this.pauseTime = this.t);
  }
  finish() {
    (this.playState = "finished"), this.tick(0);
  }
  stop() {
    var t;
    (this.playState = "idle"),
      this.frameRequestId !== void 0 &&
        cancelAnimationFrame(this.frameRequestId),
      (t = this.reject) === null || t === void 0 || t.call(this, !1);
  }
  cancel() {
    this.stop(), this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {}
  updateDuration(t) {
    (this.duration = t), (this.totalDuration = t * (this.repeat + 1));
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(t) {
    this.pauseTime !== void 0 || this.rate === 0
      ? (this.pauseTime = t)
      : (this.startTime = performance.now() - t / this.rate);
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(t) {
    this.rate = t;
  }
}
class io {
  setAnimation(t) {
    (this.animation = t),
      t == null || t.finished.then(() => this.clearAnimation()).catch(() => {});
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const it = new WeakMap();
function Cr(e) {
  return (
    it.has(e) || it.set(e, { transforms: [], values: new Map() }), it.get(e)
  );
}
function ao(e, t) {
  return e.has(t) || e.set(t, new io()), e.get(t);
}
const lo = ["", "X", "Y", "Z"],
  so = ["translate", "scale", "rotate", "skew"],
  Qe = { x: "translateX", y: "translateY", z: "translateZ" },
  Qt = {
    syntax: "<angle>",
    initialValue: "0deg",
    toDefaultUnit: (e) => e + "deg",
  },
  co = {
    translate: {
      syntax: "<length-percentage>",
      initialValue: "0px",
      toDefaultUnit: (e) => e + "px",
    },
    rotate: Qt,
    scale: { syntax: "<number>", initialValue: 1, toDefaultUnit: oe },
    skew: Qt,
  },
  Ne = new Map(),
  zt = (e) => `--motion-${e}`,
  Je = ["x", "y", "z"];
so.forEach((e) => {
  lo.forEach((t) => {
    Je.push(e + t), Ne.set(zt(e + t), co[e]);
  });
});
const uo = (e, t) => Je.indexOf(e) - Je.indexOf(t),
  ho = new Set(Je),
  Er = (e) => ho.has(e),
  mo = (e, t) => {
    Qe[t] && (t = Qe[t]);
    const { transforms: o } = Cr(e);
    qr(o, t), (e.style.transform = go(o));
  },
  go = (e) => e.sort(uo).reduce(fo, "").trim(),
  fo = (e, t) => `${e} ${t}(var(${zt(t)}))`,
  St = (e) => e.startsWith("--"),
  Jt = new Set();
function wo(e) {
  if (!Jt.has(e)) {
    Jt.add(e);
    try {
      const { syntax: t, initialValue: o } = Ne.has(e) ? Ne.get(e) : {};
      CSS.registerProperty({
        name: e,
        inherits: !1,
        syntax: t,
        initialValue: o,
      });
    } catch {}
  }
}
const at = (e, t) => document.createElement("div").animate(e, t),
  Xt = {
    cssRegisterProperty: () =>
      typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
    partialKeyframes: () => {
      try {
        at({ opacity: [1] });
      } catch {
        return !1;
      }
      return !0;
    },
    finished: () => !!at({ opacity: [0, 1] }, { duration: 0.001 }).finished,
    linearEasing: () => {
      try {
        at({ opacity: 0 }, { easing: "linear(0, 1)" });
      } catch {
        return !1;
      }
      return !0;
    },
  },
  lt = {},
  we = {};
for (const e in Xt)
  we[e] = () => (lt[e] === void 0 && (lt[e] = Xt[e]()), lt[e]);
const po = 0.015,
  vo = (e, t) => {
    let o = "";
    const n = Math.round(t / po);
    for (let r = 0; r < n; r++) o += e(Ft(0, n - 1, r)) + ", ";
    return o.substring(0, o.length - 2);
  },
  er = (e, t) =>
    ye(e)
      ? we.linearEasing()
        ? `linear(${vo(e, t)})`
        : U.easing
      : br(e)
      ? bo(e)
      : e,
  bo = ([e, t, o, n]) => `cubic-bezier(${e}, ${t}, ${o}, ${n})`;
function yo(e, t) {
  for (let o = 0; o < e.length; o++)
    e[o] === null && (e[o] = o ? e[o - 1] : t());
  return e;
}
const xo = (e) => (Array.isArray(e) ? e : [e]);
function Dt(e) {
  return Qe[e] && (e = Qe[e]), Er(e) ? zt(e) : e;
}
const We = {
  get: (e, t) => {
    t = Dt(t);
    let o = St(t) ? e.style.getPropertyValue(t) : getComputedStyle(e)[t];
    if (!o && o !== 0) {
      const n = Ne.get(t);
      n && (o = n.initialValue);
    }
    return o;
  },
  set: (e, t, o) => {
    (t = Dt(t)), St(t) ? e.style.setProperty(t, o) : (e.style[t] = o);
  },
};
function $r(e, t = !0) {
  if (!(!e || e.playState === "finished"))
    try {
      e.stop ? e.stop() : (t && e.commitStyles(), e.cancel());
    } catch {}
}
function Co(e, t) {
  var o;
  let n = (t == null ? void 0 : t.toDefaultUnit) || oe;
  const r = e[e.length - 1];
  if (Xr(r)) {
    const i =
      ((o = r.match(/(-?[\d.]+)([a-z%]*)/)) === null || o === void 0
        ? void 0
        : o[2]) || "";
    i && (n = (a) => a + i);
  }
  return n;
}
function Eo() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function $o(e, t, o, n = {}, r) {
  const i = Eo(),
    a = n.record !== !1 && i;
  let l,
    {
      duration: s = U.duration,
      delay: c = U.delay,
      endDelay: m = U.endDelay,
      repeat: E = U.repeat,
      easing: f = U.easing,
      persist: g = !1,
      direction: p,
      offset: h,
      allowWebkitAcceleration: x = !1,
    } = n;
  const u = Cr(e),
    b = Er(t);
  let v = we.waapi();
  b && mo(e, t);
  const w = Dt(t),
    k = ao(u.values, w),
    T = Ne.get(w);
  return (
    $r(k.animation, !(Nt(f) && k.generator) && n.record !== !1),
    () => {
      const B = () => {
        var P, z;
        return (z =
          (P = We.get(e, w)) !== null && P !== void 0
            ? P
            : T == null
            ? void 0
            : T.initialValue) !== null && z !== void 0
          ? z
          : 0;
      };
      let M = yo(xo(o), B);
      const F = Co(M, T);
      if (Nt(f)) {
        const P = f.createAnimation(M, t !== "opacity", B, w, k);
        (f = P.easing), (M = P.keyframes || M), (s = P.duration || s);
      }
      if (
        (St(w) && (we.cssRegisterProperty() ? wo(w) : (v = !1)),
        b && !we.linearEasing() && (ye(f) || (pe(f) && f.some(ye))) && (v = !1),
        v)
      ) {
        T && (M = M.map((H) => (Ge(H) ? T.toDefaultUnit(H) : H))),
          M.length === 1 && (!we.partialKeyframes() || a) && M.unshift(B());
        const P = {
          delay: Le.ms(c),
          duration: Le.ms(s),
          endDelay: Le.ms(m),
          easing: pe(f) ? void 0 : er(f, s),
          direction: p,
          iterations: E + 1,
          fill: "both",
        };
        (l = e.animate(
          {
            [w]: M,
            offset: h,
            easing: pe(f) ? f.map((H) => er(H, s)) : void 0,
          },
          P,
        )),
          l.finished ||
            (l.finished = new Promise((H, Z) => {
              (l.onfinish = H), (l.oncancel = Z);
            }));
        const z = M[M.length - 1];
        l.finished
          .then(() => {
            g || (We.set(e, w, z), l.cancel());
          })
          .catch(pr),
          x || (l.playbackRate = 1.000001);
      } else if (r && b)
        (M = M.map((P) => (typeof P == "string" ? parseFloat(P) : P))),
          M.length === 1 && M.unshift(parseFloat(B())),
          (l = new r(
            (P) => {
              We.set(e, w, F ? F(P) : P);
            },
            M,
            Object.assign(Object.assign({}, n), { duration: s, easing: f }),
          ));
      else {
        const P = M[M.length - 1];
        We.set(e, w, T && Ge(P) ? T.toDefaultUnit(P) : P);
      }
      return (
        a &&
          i(
            e,
            t,
            M,
            { duration: s, delay: c, easing: f, repeat: E, offset: h },
            "motion-one",
          ),
        k.setAnimation(l),
        l
      );
    }
  );
}
const Io = (e, t) =>
  e[t] ? Object.assign(Object.assign({}, e), e[t]) : Object.assign({}, e);
function Ao(e, t) {
  var o;
  return (
    typeof e == "string"
      ? t
        ? (((o = t[e]) !== null && o !== void 0) ||
            (t[e] = document.querySelectorAll(e)),
          (e = t[e]))
        : (e = document.querySelectorAll(e))
      : e instanceof Element && (e = [e]),
    Array.from(e || [])
  );
}
const Oo = (e) => e(),
  Ir = (e, t, o = U.duration) =>
    new Proxy(
      { animations: e.map(Oo).filter(Boolean), duration: o, options: t },
      To,
    ),
  ko = (e) => e.animations[0],
  To = {
    get: (e, t) => {
      const o = ko(e);
      switch (t) {
        case "duration":
          return e.duration;
        case "currentTime":
          return Le.s((o == null ? void 0 : o[t]) || 0);
        case "playbackRate":
        case "playState":
          return o == null ? void 0 : o[t];
        case "finished":
          return (
            e.finished ||
              (e.finished = Promise.all(e.animations.map(Mo)).catch(pr)),
            e.finished
          );
        case "stop":
          return () => {
            e.animations.forEach((n) => $r(n));
          };
        case "forEachNative":
          return (n) => {
            e.animations.forEach((r) => n(r, e));
          };
        default:
          return typeof (o == null ? void 0 : o[t]) > "u"
            ? void 0
            : () => e.animations.forEach((n) => n[t]());
      }
    },
    set: (e, t, o) => {
      switch (t) {
        case "currentTime":
          o = Le.ms(o);
        case "currentTime":
        case "playbackRate":
          for (let n = 0; n < e.animations.length; n++) e.animations[n][t] = o;
          return !0;
      }
      return !1;
    },
  },
  Mo = (e) => e.finished;
function Po(e, t, o) {
  return ye(e) ? e(t, o) : e;
}
function Ro(e) {
  return function (o, n, r = {}) {
    o = Ao(o);
    const i = o.length,
      a = [];
    for (let l = 0; l < i; l++) {
      const s = o[l];
      for (const c in n) {
        const m = Io(r, c);
        m.delay = Po(m.delay, l, i);
        const E = $o(s, c, n[c], m, e);
        a.push(E);
      }
    }
    return Ir(a, r, r.duration);
  };
}
const Lo = Ro(xr);
function Bo(e, t = {}) {
  return Ir(
    [
      () => {
        const o = new xr(e, [0, 1], t);
        return o.finished.catch(() => {}), o;
      },
    ],
    t,
    t.duration,
  );
}
function ce(e, t, o) {
  return (ye(e) ? Bo : Lo)(e, t, o);
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const D = (e) => e ?? zr;
var De = {},
  No = function () {
    return (
      typeof Promise == "function" &&
      Promise.prototype &&
      Promise.prototype.then
    );
  },
  Ar = {},
  j = {};
let Ht;
const So = [
  0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
  733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
  2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
];
j.getSymbolSize = function (t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
j.getSymbolTotalCodewords = function (t) {
  return So[t];
};
j.getBCHDigit = function (e) {
  let t = 0;
  for (; e !== 0; ) t++, (e >>>= 1);
  return t;
};
j.setToSJISFunction = function (t) {
  if (typeof t != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  Ht = t;
};
j.isKanjiModeEnabled = function () {
  return typeof Ht < "u";
};
j.toSJIS = function (t) {
  return Ht(t);
};
var tt = {};
(function (e) {
  (e.L = { bit: 1 }),
    (e.M = { bit: 0 }),
    (e.Q = { bit: 3 }),
    (e.H = { bit: 2 });
  function t(o) {
    if (typeof o != "string") throw new Error("Param is not a string");
    switch (o.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + o);
    }
  }
  (e.isValid = function (n) {
    return n && typeof n.bit < "u" && n.bit >= 0 && n.bit < 4;
  }),
    (e.from = function (n, r) {
      if (e.isValid(n)) return n;
      try {
        return t(n);
      } catch {
        return r;
      }
    });
})(tt);
function Or() {
  (this.buffer = []), (this.length = 0);
}
Or.prototype = {
  get: function (e) {
    const t = Math.floor(e / 8);
    return ((this.buffer[t] >>> (7 - (e % 8))) & 1) === 1;
  },
  put: function (e, t) {
    for (let o = 0; o < t; o++) this.putBit(((e >>> (t - o - 1)) & 1) === 1);
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (e) {
    const t = Math.floor(this.length / 8);
    this.buffer.length <= t && this.buffer.push(0),
      e && (this.buffer[t] |= 128 >>> this.length % 8),
      this.length++;
  },
};
var Do = Or;
function _e(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  (this.size = e),
    (this.data = new Uint8Array(e * e)),
    (this.reservedBit = new Uint8Array(e * e));
}
_e.prototype.set = function (e, t, o, n) {
  const r = e * this.size + t;
  (this.data[r] = o), n && (this.reservedBit[r] = !0);
};
_e.prototype.get = function (e, t) {
  return this.data[e * this.size + t];
};
_e.prototype.xor = function (e, t, o) {
  this.data[e * this.size + t] ^= o;
};
_e.prototype.isReserved = function (e, t) {
  return this.reservedBit[e * this.size + t];
};
var _o = _e,
  kr = {};
(function (e) {
  const t = j.getSymbolSize;
  (e.getRowColCoords = function (n) {
    if (n === 1) return [];
    const r = Math.floor(n / 7) + 2,
      i = t(n),
      a = i === 145 ? 26 : Math.ceil((i - 13) / (2 * r - 2)) * 2,
      l = [i - 7];
    for (let s = 1; s < r - 1; s++) l[s] = l[s - 1] - a;
    return l.push(6), l.reverse();
  }),
    (e.getPositions = function (n) {
      const r = [],
        i = e.getRowColCoords(n),
        a = i.length;
      for (let l = 0; l < a; l++)
        for (let s = 0; s < a; s++)
          (l === 0 && s === 0) ||
            (l === 0 && s === a - 1) ||
            (l === a - 1 && s === 0) ||
            r.push([i[l], i[s]]);
      return r;
    });
})(kr);
var Tr = {};
const Wo = j.getSymbolSize,
  tr = 7;
Tr.getPositions = function (t) {
  const o = Wo(t);
  return [
    [0, 0],
    [o - tr, 0],
    [0, o - tr],
  ];
};
var Mr = {};
(function (e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  const t = { N1: 3, N2: 3, N3: 40, N4: 10 };
  (e.isValid = function (r) {
    return r != null && r !== "" && !isNaN(r) && r >= 0 && r <= 7;
  }),
    (e.from = function (r) {
      return e.isValid(r) ? parseInt(r, 10) : void 0;
    }),
    (e.getPenaltyN1 = function (r) {
      const i = r.size;
      let a = 0,
        l = 0,
        s = 0,
        c = null,
        m = null;
      for (let E = 0; E < i; E++) {
        (l = s = 0), (c = m = null);
        for (let f = 0; f < i; f++) {
          let g = r.get(E, f);
          g === c ? l++ : (l >= 5 && (a += t.N1 + (l - 5)), (c = g), (l = 1)),
            (g = r.get(f, E)),
            g === m ? s++ : (s >= 5 && (a += t.N1 + (s - 5)), (m = g), (s = 1));
        }
        l >= 5 && (a += t.N1 + (l - 5)), s >= 5 && (a += t.N1 + (s - 5));
      }
      return a;
    }),
    (e.getPenaltyN2 = function (r) {
      const i = r.size;
      let a = 0;
      for (let l = 0; l < i - 1; l++)
        for (let s = 0; s < i - 1; s++) {
          const c =
            r.get(l, s) +
            r.get(l, s + 1) +
            r.get(l + 1, s) +
            r.get(l + 1, s + 1);
          (c === 4 || c === 0) && a++;
        }
      return a * t.N2;
    }),
    (e.getPenaltyN3 = function (r) {
      const i = r.size;
      let a = 0,
        l = 0,
        s = 0;
      for (let c = 0; c < i; c++) {
        l = s = 0;
        for (let m = 0; m < i; m++)
          (l = ((l << 1) & 2047) | r.get(c, m)),
            m >= 10 && (l === 1488 || l === 93) && a++,
            (s = ((s << 1) & 2047) | r.get(m, c)),
            m >= 10 && (s === 1488 || s === 93) && a++;
      }
      return a * t.N3;
    }),
    (e.getPenaltyN4 = function (r) {
      let i = 0;
      const a = r.data.length;
      for (let s = 0; s < a; s++) i += r.data[s];
      return Math.abs(Math.ceil((i * 100) / a / 5) - 10) * t.N4;
    });
  function o(n, r, i) {
    switch (n) {
      case e.Patterns.PATTERN000:
        return (r + i) % 2 === 0;
      case e.Patterns.PATTERN001:
        return r % 2 === 0;
      case e.Patterns.PATTERN010:
        return i % 3 === 0;
      case e.Patterns.PATTERN011:
        return (r + i) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(r / 2) + Math.floor(i / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return ((r * i) % 2) + ((r * i) % 3) === 0;
      case e.Patterns.PATTERN110:
        return (((r * i) % 2) + ((r * i) % 3)) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (((r * i) % 3) + ((r + i) % 2)) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + n);
    }
  }
  (e.applyMask = function (r, i) {
    const a = i.size;
    for (let l = 0; l < a; l++)
      for (let s = 0; s < a; s++) i.isReserved(s, l) || i.xor(s, l, o(r, s, l));
  }),
    (e.getBestMask = function (r, i) {
      const a = Object.keys(e.Patterns).length;
      let l = 0,
        s = 1 / 0;
      for (let c = 0; c < a; c++) {
        i(c), e.applyMask(c, r);
        const m =
          e.getPenaltyN1(r) +
          e.getPenaltyN2(r) +
          e.getPenaltyN3(r) +
          e.getPenaltyN4(r);
        e.applyMask(c, r), m < s && ((s = m), (l = c));
      }
      return l;
    });
})(Mr);
var rt = {};
const re = tt,
  je = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
    4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
    9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13,
    18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18,
    25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13,
    26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54,
    18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59,
    70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
  ],
  Ue = [
    7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
    88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192,
    72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352,
    120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448,
    532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442,
    644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312,
    588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050,
    1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510,
    924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064,
    1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860,
    2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
  ];
rt.getBlocksCount = function (t, o) {
  switch (o) {
    case re.L:
      return je[(t - 1) * 4 + 0];
    case re.M:
      return je[(t - 1) * 4 + 1];
    case re.Q:
      return je[(t - 1) * 4 + 2];
    case re.H:
      return je[(t - 1) * 4 + 3];
    default:
      return;
  }
};
rt.getTotalCodewordsCount = function (t, o) {
  switch (o) {
    case re.L:
      return Ue[(t - 1) * 4 + 0];
    case re.M:
      return Ue[(t - 1) * 4 + 1];
    case re.Q:
      return Ue[(t - 1) * 4 + 2];
    case re.H:
      return Ue[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var Pr = {},
  ot = {};
const Be = new Uint8Array(512),
  Xe = new Uint8Array(256);
(function () {
  let t = 1;
  for (let o = 0; o < 255; o++)
    (Be[o] = t), (Xe[t] = o), (t <<= 1), t & 256 && (t ^= 285);
  for (let o = 255; o < 512; o++) Be[o] = Be[o - 255];
})();
ot.log = function (t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return Xe[t];
};
ot.exp = function (t) {
  return Be[t];
};
ot.mul = function (t, o) {
  return t === 0 || o === 0 ? 0 : Be[Xe[t] + Xe[o]];
};
(function (e) {
  const t = ot;
  (e.mul = function (n, r) {
    const i = new Uint8Array(n.length + r.length - 1);
    for (let a = 0; a < n.length; a++)
      for (let l = 0; l < r.length; l++) i[a + l] ^= t.mul(n[a], r[l]);
    return i;
  }),
    (e.mod = function (n, r) {
      let i = new Uint8Array(n);
      for (; i.length - r.length >= 0; ) {
        const a = i[0];
        for (let s = 0; s < r.length; s++) i[s] ^= t.mul(r[s], a);
        let l = 0;
        for (; l < i.length && i[l] === 0; ) l++;
        i = i.slice(l);
      }
      return i;
    }),
    (e.generateECPolynomial = function (n) {
      let r = new Uint8Array([1]);
      for (let i = 0; i < n; i++) r = e.mul(r, new Uint8Array([1, t.exp(i)]));
      return r;
    });
})(Pr);
const Rr = Pr;
function Zt(e) {
  (this.genPoly = void 0),
    (this.degree = e),
    this.degree && this.initialize(this.degree);
}
Zt.prototype.initialize = function (t) {
  (this.degree = t), (this.genPoly = Rr.generateECPolynomial(this.degree));
};
Zt.prototype.encode = function (t) {
  if (!this.genPoly) throw new Error("Encoder not initialized");
  const o = new Uint8Array(t.length + this.degree);
  o.set(t);
  const n = Rr.mod(o, this.genPoly),
    r = this.degree - n.length;
  if (r > 0) {
    const i = new Uint8Array(this.degree);
    return i.set(n, r), i;
  }
  return n;
};
var jo = Zt,
  Lr = {},
  ie = {},
  Vt = {};
Vt.isValid = function (t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var q = {};
const Br = "[0-9]+",
  Uo = "[A-Z $%*+\\-./:]+";
let Se =
  "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
Se = Se.replace(/u/g, "\\u");
const Fo =
  "(?:(?![A-Z0-9 $%*+\\-./:]|" +
  Se +
  `)(?:.|[\r
]))+`;
q.KANJI = new RegExp(Se, "g");
q.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
q.BYTE = new RegExp(Fo, "g");
q.NUMERIC = new RegExp(Br, "g");
q.ALPHANUMERIC = new RegExp(Uo, "g");
const zo = new RegExp("^" + Se + "$"),
  Ho = new RegExp("^" + Br + "$"),
  Zo = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
q.testKanji = function (t) {
  return zo.test(t);
};
q.testNumeric = function (t) {
  return Ho.test(t);
};
q.testAlphanumeric = function (t) {
  return Zo.test(t);
};
(function (e) {
  const t = Vt,
    o = q;
  (e.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
    (e.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }),
    (e.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
    (e.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
    (e.MIXED = { bit: -1 }),
    (e.getCharCountIndicator = function (i, a) {
      if (!i.ccBits) throw new Error("Invalid mode: " + i);
      if (!t.isValid(a)) throw new Error("Invalid version: " + a);
      return a >= 1 && a < 10
        ? i.ccBits[0]
        : a < 27
        ? i.ccBits[1]
        : i.ccBits[2];
    }),
    (e.getBestModeForData = function (i) {
      return o.testNumeric(i)
        ? e.NUMERIC
        : o.testAlphanumeric(i)
        ? e.ALPHANUMERIC
        : o.testKanji(i)
        ? e.KANJI
        : e.BYTE;
    }),
    (e.toString = function (i) {
      if (i && i.id) return i.id;
      throw new Error("Invalid mode");
    }),
    (e.isValid = function (i) {
      return i && i.bit && i.ccBits;
    });
  function n(r) {
    if (typeof r != "string") throw new Error("Param is not a string");
    switch (r.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + r);
    }
  }
  e.from = function (i, a) {
    if (e.isValid(i)) return i;
    try {
      return n(i);
    } catch {
      return a;
    }
  };
})(ie);
(function (e) {
  const t = j,
    o = rt,
    n = tt,
    r = ie,
    i = Vt,
    a = 7973,
    l = t.getBCHDigit(a);
  function s(f, g, p) {
    for (let h = 1; h <= 40; h++) if (g <= e.getCapacity(h, p, f)) return h;
  }
  function c(f, g) {
    return r.getCharCountIndicator(f, g) + 4;
  }
  function m(f, g) {
    let p = 0;
    return (
      f.forEach(function (h) {
        const x = c(h.mode, g);
        p += x + h.getBitsLength();
      }),
      p
    );
  }
  function E(f, g) {
    for (let p = 1; p <= 40; p++)
      if (m(f, p) <= e.getCapacity(p, g, r.MIXED)) return p;
  }
  (e.from = function (g, p) {
    return i.isValid(g) ? parseInt(g, 10) : p;
  }),
    (e.getCapacity = function (g, p, h) {
      if (!i.isValid(g)) throw new Error("Invalid QR Code version");
      typeof h > "u" && (h = r.BYTE);
      const x = t.getSymbolTotalCodewords(g),
        u = o.getTotalCodewordsCount(g, p),
        b = (x - u) * 8;
      if (h === r.MIXED) return b;
      const v = b - c(h, g);
      switch (h) {
        case r.NUMERIC:
          return Math.floor((v / 10) * 3);
        case r.ALPHANUMERIC:
          return Math.floor((v / 11) * 2);
        case r.KANJI:
          return Math.floor(v / 13);
        case r.BYTE:
        default:
          return Math.floor(v / 8);
      }
    }),
    (e.getBestVersionForData = function (g, p) {
      let h;
      const x = n.from(p, n.M);
      if (Array.isArray(g)) {
        if (g.length > 1) return E(g, x);
        if (g.length === 0) return 1;
        h = g[0];
      } else h = g;
      return s(h.mode, h.getLength(), x);
    }),
    (e.getEncodedBits = function (g) {
      if (!i.isValid(g) || g < 7) throw new Error("Invalid QR Code version");
      let p = g << 12;
      for (; t.getBCHDigit(p) - l >= 0; ) p ^= a << (t.getBCHDigit(p) - l);
      return (g << 12) | p;
    });
})(Lr);
var Nr = {};
const _t = j,
  Sr = 1335,
  Vo = 21522,
  rr = _t.getBCHDigit(Sr);
Nr.getEncodedBits = function (t, o) {
  const n = (t.bit << 3) | o;
  let r = n << 10;
  for (; _t.getBCHDigit(r) - rr >= 0; ) r ^= Sr << (_t.getBCHDigit(r) - rr);
  return ((n << 10) | r) ^ Vo;
};
var Dr = {};
const Ko = ie;
function xe(e) {
  (this.mode = Ko.NUMERIC), (this.data = e.toString());
}
xe.getBitsLength = function (t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
};
xe.prototype.getLength = function () {
  return this.data.length;
};
xe.prototype.getBitsLength = function () {
  return xe.getBitsLength(this.data.length);
};
xe.prototype.write = function (t) {
  let o, n, r;
  for (o = 0; o + 3 <= this.data.length; o += 3)
    (n = this.data.substr(o, 3)), (r = parseInt(n, 10)), t.put(r, 10);
  const i = this.data.length - o;
  i > 0 &&
    ((n = this.data.substr(o)), (r = parseInt(n, 10)), t.put(r, i * 3 + 1));
};
var qo = xe;
const Yo = ie,
  st = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":",
  ];
function Ce(e) {
  (this.mode = Yo.ALPHANUMERIC), (this.data = e);
}
Ce.getBitsLength = function (t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
Ce.prototype.getLength = function () {
  return this.data.length;
};
Ce.prototype.getBitsLength = function () {
  return Ce.getBitsLength(this.data.length);
};
Ce.prototype.write = function (t) {
  let o;
  for (o = 0; o + 2 <= this.data.length; o += 2) {
    let n = st.indexOf(this.data[o]) * 45;
    (n += st.indexOf(this.data[o + 1])), t.put(n, 11);
  }
  this.data.length % 2 && t.put(st.indexOf(this.data[o]), 6);
};
var Go = Ce,
  Qo = function (t) {
    for (var o = [], n = t.length, r = 0; r < n; r++) {
      var i = t.charCodeAt(r);
      if (i >= 55296 && i <= 56319 && n > r + 1) {
        var a = t.charCodeAt(r + 1);
        a >= 56320 &&
          a <= 57343 &&
          ((i = (i - 55296) * 1024 + a - 56320 + 65536), (r += 1));
      }
      if (i < 128) {
        o.push(i);
        continue;
      }
      if (i < 2048) {
        o.push((i >> 6) | 192), o.push((i & 63) | 128);
        continue;
      }
      if (i < 55296 || (i >= 57344 && i < 65536)) {
        o.push((i >> 12) | 224),
          o.push(((i >> 6) & 63) | 128),
          o.push((i & 63) | 128);
        continue;
      }
      if (i >= 65536 && i <= 1114111) {
        o.push((i >> 18) | 240),
          o.push(((i >> 12) & 63) | 128),
          o.push(((i >> 6) & 63) | 128),
          o.push((i & 63) | 128);
        continue;
      }
      o.push(239, 191, 189);
    }
    return new Uint8Array(o).buffer;
  };
const Jo = Qo,
  Xo = ie;
function Ee(e) {
  (this.mode = Xo.BYTE),
    typeof e == "string" && (e = Jo(e)),
    (this.data = new Uint8Array(e));
}
Ee.getBitsLength = function (t) {
  return t * 8;
};
Ee.prototype.getLength = function () {
  return this.data.length;
};
Ee.prototype.getBitsLength = function () {
  return Ee.getBitsLength(this.data.length);
};
Ee.prototype.write = function (e) {
  for (let t = 0, o = this.data.length; t < o; t++) e.put(this.data[t], 8);
};
var en = Ee;
const tn = ie,
  rn = j;
function $e(e) {
  (this.mode = tn.KANJI), (this.data = e);
}
$e.getBitsLength = function (t) {
  return t * 13;
};
$e.prototype.getLength = function () {
  return this.data.length;
};
$e.prototype.getBitsLength = function () {
  return $e.getBitsLength(this.data.length);
};
$e.prototype.write = function (e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let o = rn.toSJIS(this.data[t]);
    if (o >= 33088 && o <= 40956) o -= 33088;
    else if (o >= 57408 && o <= 60351) o -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " +
          this.data[t] +
          `
Make sure your charset is UTF-8`,
      );
    (o = ((o >>> 8) & 255) * 192 + (o & 255)), e.put(o, 13);
  }
};
var on = $e,
  _r = { exports: {} };
(function (e) {
  var t = {
    single_source_shortest_paths: function (o, n, r) {
      var i = {},
        a = {};
      a[n] = 0;
      var l = t.PriorityQueue.make();
      l.push(n, 0);
      for (var s, c, m, E, f, g, p, h, x; !l.empty(); ) {
        (s = l.pop()), (c = s.value), (E = s.cost), (f = o[c] || {});
        for (m in f)
          f.hasOwnProperty(m) &&
            ((g = f[m]),
            (p = E + g),
            (h = a[m]),
            (x = typeof a[m] > "u"),
            (x || h > p) && ((a[m] = p), l.push(m, p), (i[m] = c)));
      }
      if (typeof r < "u" && typeof a[r] > "u") {
        var u = ["Could not find a path from ", n, " to ", r, "."].join("");
        throw new Error(u);
      }
      return i;
    },
    extract_shortest_path_from_predecessor_list: function (o, n) {
      for (var r = [], i = n; i; ) r.push(i), o[i], (i = o[i]);
      return r.reverse(), r;
    },
    find_path: function (o, n, r) {
      var i = t.single_source_shortest_paths(o, n, r);
      return t.extract_shortest_path_from_predecessor_list(i, r);
    },
    PriorityQueue: {
      make: function (o) {
        var n = t.PriorityQueue,
          r = {},
          i;
        o = o || {};
        for (i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
        return (r.queue = []), (r.sorter = o.sorter || n.default_sorter), r;
      },
      default_sorter: function (o, n) {
        return o.cost - n.cost;
      },
      push: function (o, n) {
        var r = { value: o, cost: n };
        this.queue.push(r), this.queue.sort(this.sorter);
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return this.queue.length === 0;
      },
    },
  };
  e.exports = t;
})(_r);
var nn = _r.exports;
(function (e) {
  const t = ie,
    o = qo,
    n = Go,
    r = en,
    i = on,
    a = q,
    l = j,
    s = nn;
  function c(u) {
    return unescape(encodeURIComponent(u)).length;
  }
  function m(u, b, v) {
    const w = [];
    let k;
    for (; (k = u.exec(v)) !== null; )
      w.push({ data: k[0], index: k.index, mode: b, length: k[0].length });
    return w;
  }
  function E(u) {
    const b = m(a.NUMERIC, t.NUMERIC, u),
      v = m(a.ALPHANUMERIC, t.ALPHANUMERIC, u);
    let w, k;
    return (
      l.isKanjiModeEnabled()
        ? ((w = m(a.BYTE, t.BYTE, u)), (k = m(a.KANJI, t.KANJI, u)))
        : ((w = m(a.BYTE_KANJI, t.BYTE, u)), (k = [])),
      b
        .concat(v, w, k)
        .sort(function (B, M) {
          return B.index - M.index;
        })
        .map(function (B) {
          return { data: B.data, mode: B.mode, length: B.length };
        })
    );
  }
  function f(u, b) {
    switch (b) {
      case t.NUMERIC:
        return o.getBitsLength(u);
      case t.ALPHANUMERIC:
        return n.getBitsLength(u);
      case t.KANJI:
        return i.getBitsLength(u);
      case t.BYTE:
        return r.getBitsLength(u);
    }
  }
  function g(u) {
    return u.reduce(function (b, v) {
      const w = b.length - 1 >= 0 ? b[b.length - 1] : null;
      return w && w.mode === v.mode
        ? ((b[b.length - 1].data += v.data), b)
        : (b.push(v), b);
    }, []);
  }
  function p(u) {
    const b = [];
    for (let v = 0; v < u.length; v++) {
      const w = u[v];
      switch (w.mode) {
        case t.NUMERIC:
          b.push([
            w,
            { data: w.data, mode: t.ALPHANUMERIC, length: w.length },
            { data: w.data, mode: t.BYTE, length: w.length },
          ]);
          break;
        case t.ALPHANUMERIC:
          b.push([w, { data: w.data, mode: t.BYTE, length: w.length }]);
          break;
        case t.KANJI:
          b.push([w, { data: w.data, mode: t.BYTE, length: c(w.data) }]);
          break;
        case t.BYTE:
          b.push([{ data: w.data, mode: t.BYTE, length: c(w.data) }]);
      }
    }
    return b;
  }
  function h(u, b) {
    const v = {},
      w = { start: {} };
    let k = ["start"];
    for (let T = 0; T < u.length; T++) {
      const B = u[T],
        M = [];
      for (let F = 0; F < B.length; F++) {
        const P = B[F],
          z = "" + T + F;
        M.push(z), (v[z] = { node: P, lastCount: 0 }), (w[z] = {});
        for (let H = 0; H < k.length; H++) {
          const Z = k[H];
          v[Z] && v[Z].node.mode === P.mode
            ? ((w[Z][z] =
                f(v[Z].lastCount + P.length, P.mode) -
                f(v[Z].lastCount, P.mode)),
              (v[Z].lastCount += P.length))
            : (v[Z] && (v[Z].lastCount = P.length),
              (w[Z][z] =
                f(P.length, P.mode) + 4 + t.getCharCountIndicator(P.mode, b)));
        }
      }
      k = M;
    }
    for (let T = 0; T < k.length; T++) w[k[T]].end = 0;
    return { map: w, table: v };
  }
  function x(u, b) {
    let v;
    const w = t.getBestModeForData(u);
    if (((v = t.from(b, w)), v !== t.BYTE && v.bit < w.bit))
      throw new Error(
        '"' +
          u +
          '" cannot be encoded with mode ' +
          t.toString(v) +
          `.
 Suggested mode is: ` +
          t.toString(w),
      );
    switch ((v === t.KANJI && !l.isKanjiModeEnabled() && (v = t.BYTE), v)) {
      case t.NUMERIC:
        return new o(u);
      case t.ALPHANUMERIC:
        return new n(u);
      case t.KANJI:
        return new i(u);
      case t.BYTE:
        return new r(u);
    }
  }
  (e.fromArray = function (b) {
    return b.reduce(function (v, w) {
      return (
        typeof w == "string"
          ? v.push(x(w, null))
          : w.data && v.push(x(w.data, w.mode)),
        v
      );
    }, []);
  }),
    (e.fromString = function (b, v) {
      const w = E(b, l.isKanjiModeEnabled()),
        k = p(w),
        T = h(k, v),
        B = s.find_path(T.map, "start", "end"),
        M = [];
      for (let F = 1; F < B.length - 1; F++) M.push(T.table[B[F]].node);
      return e.fromArray(g(M));
    }),
    (e.rawSplit = function (b) {
      return e.fromArray(E(b, l.isKanjiModeEnabled()));
    });
})(Dr);
const nt = j,
  ct = tt,
  an = Do,
  ln = _o,
  sn = kr,
  cn = Tr,
  Wt = Mr,
  jt = rt,
  dn = jo,
  et = Lr,
  un = Nr,
  hn = ie,
  dt = Dr;
function mn(e, t) {
  const o = e.size,
    n = cn.getPositions(t);
  for (let r = 0; r < n.length; r++) {
    const i = n[r][0],
      a = n[r][1];
    for (let l = -1; l <= 7; l++)
      if (!(i + l <= -1 || o <= i + l))
        for (let s = -1; s <= 7; s++)
          a + s <= -1 ||
            o <= a + s ||
            ((l >= 0 && l <= 6 && (s === 0 || s === 6)) ||
            (s >= 0 && s <= 6 && (l === 0 || l === 6)) ||
            (l >= 2 && l <= 4 && s >= 2 && s <= 4)
              ? e.set(i + l, a + s, !0, !0)
              : e.set(i + l, a + s, !1, !0));
  }
}
function gn(e) {
  const t = e.size;
  for (let o = 8; o < t - 8; o++) {
    const n = o % 2 === 0;
    e.set(o, 6, n, !0), e.set(6, o, n, !0);
  }
}
function fn(e, t) {
  const o = sn.getPositions(t);
  for (let n = 0; n < o.length; n++) {
    const r = o[n][0],
      i = o[n][1];
    for (let a = -2; a <= 2; a++)
      for (let l = -2; l <= 2; l++)
        a === -2 || a === 2 || l === -2 || l === 2 || (a === 0 && l === 0)
          ? e.set(r + a, i + l, !0, !0)
          : e.set(r + a, i + l, !1, !0);
  }
}
function wn(e, t) {
  const o = e.size,
    n = et.getEncodedBits(t);
  let r, i, a;
  for (let l = 0; l < 18; l++)
    (r = Math.floor(l / 3)),
      (i = (l % 3) + o - 8 - 3),
      (a = ((n >> l) & 1) === 1),
      e.set(r, i, a, !0),
      e.set(i, r, a, !0);
}
function ut(e, t, o) {
  const n = e.size,
    r = un.getEncodedBits(t, o);
  let i, a;
  for (i = 0; i < 15; i++)
    (a = ((r >> i) & 1) === 1),
      i < 6
        ? e.set(i, 8, a, !0)
        : i < 8
        ? e.set(i + 1, 8, a, !0)
        : e.set(n - 15 + i, 8, a, !0),
      i < 8
        ? e.set(8, n - i - 1, a, !0)
        : i < 9
        ? e.set(8, 15 - i - 1 + 1, a, !0)
        : e.set(8, 15 - i - 1, a, !0);
  e.set(n - 8, 8, 1, !0);
}
function pn(e, t) {
  const o = e.size;
  let n = -1,
    r = o - 1,
    i = 7,
    a = 0;
  for (let l = o - 1; l > 0; l -= 2)
    for (l === 6 && l--; ; ) {
      for (let s = 0; s < 2; s++)
        if (!e.isReserved(r, l - s)) {
          let c = !1;
          a < t.length && (c = ((t[a] >>> i) & 1) === 1),
            e.set(r, l - s, c),
            i--,
            i === -1 && (a++, (i = 7));
        }
      if (((r += n), r < 0 || o <= r)) {
        (r -= n), (n = -n);
        break;
      }
    }
}
function vn(e, t, o) {
  const n = new an();
  o.forEach(function (s) {
    n.put(s.mode.bit, 4),
      n.put(s.getLength(), hn.getCharCountIndicator(s.mode, e)),
      s.write(n);
  });
  const r = nt.getSymbolTotalCodewords(e),
    i = jt.getTotalCodewordsCount(e, t),
    a = (r - i) * 8;
  for (
    n.getLengthInBits() + 4 <= a && n.put(0, 4);
    n.getLengthInBits() % 8 !== 0;

  )
    n.putBit(0);
  const l = (a - n.getLengthInBits()) / 8;
  for (let s = 0; s < l; s++) n.put(s % 2 ? 17 : 236, 8);
  return bn(n, e, t);
}
function bn(e, t, o) {
  const n = nt.getSymbolTotalCodewords(t),
    r = jt.getTotalCodewordsCount(t, o),
    i = n - r,
    a = jt.getBlocksCount(t, o),
    l = n % a,
    s = a - l,
    c = Math.floor(n / a),
    m = Math.floor(i / a),
    E = m + 1,
    f = c - m,
    g = new dn(f);
  let p = 0;
  const h = new Array(a),
    x = new Array(a);
  let u = 0;
  const b = new Uint8Array(e.buffer);
  for (let B = 0; B < a; B++) {
    const M = B < s ? m : E;
    (h[B] = b.slice(p, p + M)),
      (x[B] = g.encode(h[B])),
      (p += M),
      (u = Math.max(u, M));
  }
  const v = new Uint8Array(n);
  let w = 0,
    k,
    T;
  for (k = 0; k < u; k++)
    for (T = 0; T < a; T++) k < h[T].length && (v[w++] = h[T][k]);
  for (k = 0; k < f; k++) for (T = 0; T < a; T++) v[w++] = x[T][k];
  return v;
}
function yn(e, t, o, n) {
  let r;
  if (Array.isArray(e)) r = dt.fromArray(e);
  else if (typeof e == "string") {
    let c = t;
    if (!c) {
      const m = dt.rawSplit(e);
      c = et.getBestVersionForData(m, o);
    }
    r = dt.fromString(e, c || 40);
  } else throw new Error("Invalid data");
  const i = et.getBestVersionForData(r, o);
  if (!i)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!t) t = i;
  else if (t < i)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` +
        i +
        `.
`,
    );
  const a = vn(t, o, r),
    l = nt.getSymbolSize(t),
    s = new ln(l);
  return (
    mn(s, t),
    gn(s),
    fn(s, t),
    ut(s, o, 0),
    t >= 7 && wn(s, t),
    pn(s, a),
    isNaN(n) && (n = Wt.getBestMask(s, ut.bind(null, s, o))),
    Wt.applyMask(n, s),
    ut(s, o, n),
    {
      modules: s,
      version: t,
      errorCorrectionLevel: o,
      maskPattern: n,
      segments: r,
    }
  );
}
Ar.create = function (t, o) {
  if (typeof t > "u" || t === "") throw new Error("No input text");
  let n = ct.M,
    r,
    i;
  return (
    typeof o < "u" &&
      ((n = ct.from(o.errorCorrectionLevel, ct.M)),
      (r = et.from(o.version)),
      (i = Wt.from(o.maskPattern)),
      o.toSJISFunc && nt.setToSJISFunction(o.toSJISFunc)),
    yn(t, r, n, i)
  );
};
var Wr = {},
  Kt = {};
(function (e) {
  function t(o) {
    if ((typeof o == "number" && (o = o.toString()), typeof o != "string"))
      throw new Error("Color should be defined as hex string");
    let n = o.slice().replace("#", "").split("");
    if (n.length < 3 || n.length === 5 || n.length > 8)
      throw new Error("Invalid hex color: " + o);
    (n.length === 3 || n.length === 4) &&
      (n = Array.prototype.concat.apply(
        [],
        n.map(function (i) {
          return [i, i];
        }),
      )),
      n.length === 6 && n.push("F", "F");
    const r = parseInt(n.join(""), 16);
    return {
      r: (r >> 24) & 255,
      g: (r >> 16) & 255,
      b: (r >> 8) & 255,
      a: r & 255,
      hex: "#" + n.slice(0, 6).join(""),
    };
  }
  (e.getOptions = function (n) {
    n || (n = {}), n.color || (n.color = {});
    const r =
        typeof n.margin > "u" || n.margin === null || n.margin < 0
          ? 4
          : n.margin,
      i = n.width && n.width >= 21 ? n.width : void 0,
      a = n.scale || 4;
    return {
      width: i,
      scale: i ? 4 : a,
      margin: r,
      color: {
        dark: t(n.color.dark || "#000000ff"),
        light: t(n.color.light || "#ffffffff"),
      },
      type: n.type,
      rendererOpts: n.rendererOpts || {},
    };
  }),
    (e.getScale = function (n, r) {
      return r.width && r.width >= n + r.margin * 2
        ? r.width / (n + r.margin * 2)
        : r.scale;
    }),
    (e.getImageWidth = function (n, r) {
      const i = e.getScale(n, r);
      return Math.floor((n + r.margin * 2) * i);
    }),
    (e.qrToImageData = function (n, r, i) {
      const a = r.modules.size,
        l = r.modules.data,
        s = e.getScale(a, i),
        c = Math.floor((a + i.margin * 2) * s),
        m = i.margin * s,
        E = [i.color.light, i.color.dark];
      for (let f = 0; f < c; f++)
        for (let g = 0; g < c; g++) {
          let p = (f * c + g) * 4,
            h = i.color.light;
          if (f >= m && g >= m && f < c - m && g < c - m) {
            const x = Math.floor((f - m) / s),
              u = Math.floor((g - m) / s);
            h = E[l[x * a + u] ? 1 : 0];
          }
          (n[p++] = h.r), (n[p++] = h.g), (n[p++] = h.b), (n[p] = h.a);
        }
    });
})(Kt);
(function (e) {
  const t = Kt;
  function o(r, i, a) {
    r.clearRect(0, 0, i.width, i.height),
      i.style || (i.style = {}),
      (i.height = a),
      (i.width = a),
      (i.style.height = a + "px"),
      (i.style.width = a + "px");
  }
  function n() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  (e.render = function (i, a, l) {
    let s = l,
      c = a;
    typeof s > "u" && (!a || !a.getContext) && ((s = a), (a = void 0)),
      a || (c = n()),
      (s = t.getOptions(s));
    const m = t.getImageWidth(i.modules.size, s),
      E = c.getContext("2d"),
      f = E.createImageData(m, m);
    return (
      t.qrToImageData(f.data, i, s), o(E, c, m), E.putImageData(f, 0, 0), c
    );
  }),
    (e.renderToDataURL = function (i, a, l) {
      let s = l;
      typeof s > "u" && (!a || !a.getContext) && ((s = a), (a = void 0)),
        s || (s = {});
      const c = e.render(i, a, s),
        m = s.type || "image/png",
        E = s.rendererOpts || {};
      return c.toDataURL(m, E.quality);
    });
})(Wr);
var jr = {};
const xn = Kt;
function or(e, t) {
  const o = e.a / 255,
    n = t + '="' + e.hex + '"';
  return o < 1 ? n + " " + t + '-opacity="' + o.toFixed(2).slice(1) + '"' : n;
}
function ht(e, t, o) {
  let n = e + t;
  return typeof o < "u" && (n += " " + o), n;
}
function Cn(e, t, o) {
  let n = "",
    r = 0,
    i = !1,
    a = 0;
  for (let l = 0; l < e.length; l++) {
    const s = Math.floor(l % t),
      c = Math.floor(l / t);
    !s && !i && (i = !0),
      e[l]
        ? (a++,
          (l > 0 && s > 0 && e[l - 1]) ||
            ((n += i ? ht("M", s + o, 0.5 + c + o) : ht("m", r, 0)),
            (r = 0),
            (i = !1)),
          (s + 1 < t && e[l + 1]) || ((n += ht("h", a)), (a = 0)))
        : r++;
  }
  return n;
}
jr.render = function (t, o, n) {
  const r = xn.getOptions(o),
    i = t.modules.size,
    a = t.modules.data,
    l = i + r.margin * 2,
    s = r.color.light.a
      ? "<path " +
        or(r.color.light, "fill") +
        ' d="M0 0h' +
        l +
        "v" +
        l +
        'H0z"/>'
      : "",
    c =
      "<path " +
      or(r.color.dark, "stroke") +
      ' d="' +
      Cn(a, i, r.margin) +
      '"/>',
    m = 'viewBox="0 0 ' + l + " " + l + '"',
    f =
      '<svg xmlns="http://www.w3.org/2000/svg" ' +
      (r.width ? 'width="' + r.width + '" height="' + r.width + '" ' : "") +
      m +
      ' shape-rendering="crispEdges">' +
      s +
      c +
      `</svg>
`;
  return typeof n == "function" && n(null, f), f;
};
const En = No,
  Ut = Ar,
  Ur = Wr,
  $n = jr;
function qt(e, t, o, n, r) {
  const i = [].slice.call(arguments, 1),
    a = i.length,
    l = typeof i[a - 1] == "function";
  if (!l && !En()) throw new Error("Callback required as last argument");
  if (l) {
    if (a < 2) throw new Error("Too few arguments provided");
    a === 2
      ? ((r = o), (o = t), (t = n = void 0))
      : a === 3 &&
        (t.getContext && typeof r > "u"
          ? ((r = n), (n = void 0))
          : ((r = n), (n = o), (o = t), (t = void 0)));
  } else {
    if (a < 1) throw new Error("Too few arguments provided");
    return (
      a === 1
        ? ((o = t), (t = n = void 0))
        : a === 2 && !t.getContext && ((n = o), (o = t), (t = void 0)),
      new Promise(function (s, c) {
        try {
          const m = Ut.create(o, n);
          s(e(m, t, n));
        } catch (m) {
          c(m);
        }
      })
    );
  }
  try {
    const s = Ut.create(o, n);
    r(null, e(s, t, n));
  } catch (s) {
    r(s);
  }
}
De.create = Ut.create;
De.toCanvas = qt.bind(null, Ur.render);
De.toDataURL = qt.bind(null, Ur.renderToDataURL);
De.toString = qt.bind(null, function (e, t, o) {
  return $n.render(e, o);
});
var In = Object.defineProperty,
  nr = Object.getOwnPropertySymbols,
  An = Object.prototype.hasOwnProperty,
  On = Object.prototype.propertyIsEnumerable,
  ir = (e, t, o) =>
    t in e
      ? In(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (e[t] = o),
  mt = (e, t) => {
    for (var o in t || (t = {})) An.call(t, o) && ir(e, o, t[o]);
    if (nr) for (var o of nr(t)) On.call(t, o) && ir(e, o, t[o]);
    return e;
  };
function kn() {
  var e;
  const t = (e = be.state.themeMode) != null ? e : "dark",
    o = {
      light: {
        foreground: {
          1: "rgb(20,20,20)",
          2: "rgb(121,134,134)",
          3: "rgb(158,169,169)",
        },
        background: {
          1: "rgb(255,255,255)",
          2: "rgb(241,243,243)",
          3: "rgb(228,231,231)",
        },
        overlay: "rgba(0,0,0,0.1)",
      },
      dark: {
        foreground: {
          1: "rgb(228,231,231)",
          2: "rgb(148,158,158)",
          3: "rgb(110,119,119)",
        },
        background: {
          1: "rgb(20,20,20)",
          2: "rgb(39,42,42)",
          3: "rgb(59,64,64)",
        },
        overlay: "rgba(255,255,255,0.1)",
      },
    }[t];
  return {
    "--wcm-color-fg-1": o.foreground[1],
    "--wcm-color-fg-2": o.foreground[2],
    "--wcm-color-fg-3": o.foreground[3],
    "--wcm-color-bg-1": o.background[1],
    "--wcm-color-bg-2": o.background[2],
    "--wcm-color-bg-3": o.background[3],
    "--wcm-color-overlay": o.overlay,
  };
}
function ar() {
  return {
    "--wcm-accent-color": "#3396FF",
    "--wcm-accent-fill-color": "#FFFFFF",
    "--wcm-z-index": "89",
    "--wcm-background-color": "#3396FF",
    "--wcm-background-border-radius": "8px",
    "--wcm-container-border-radius": "30px",
    "--wcm-wallet-icon-border-radius": "15px",
    "--wcm-wallet-icon-large-border-radius": "30px",
    "--wcm-wallet-icon-small-border-radius": "7px",
    "--wcm-input-border-radius": "28px",
    "--wcm-button-border-radius": "10px",
    "--wcm-notification-border-radius": "36px",
    "--wcm-secondary-button-border-radius": "28px",
    "--wcm-icon-button-border-radius": "50%",
    "--wcm-button-hover-highlight-border-radius": "10px",
    "--wcm-text-big-bold-size": "20px",
    "--wcm-text-big-bold-weight": "600",
    "--wcm-text-big-bold-line-height": "24px",
    "--wcm-text-big-bold-letter-spacing": "-0.03em",
    "--wcm-text-big-bold-text-transform": "none",
    "--wcm-text-xsmall-bold-size": "10px",
    "--wcm-text-xsmall-bold-weight": "700",
    "--wcm-text-xsmall-bold-line-height": "12px",
    "--wcm-text-xsmall-bold-letter-spacing": "0.02em",
    "--wcm-text-xsmall-bold-text-transform": "uppercase",
    "--wcm-text-xsmall-regular-size": "12px",
    "--wcm-text-xsmall-regular-weight": "600",
    "--wcm-text-xsmall-regular-line-height": "14px",
    "--wcm-text-xsmall-regular-letter-spacing": "-0.03em",
    "--wcm-text-xsmall-regular-text-transform": "none",
    "--wcm-text-small-thin-size": "14px",
    "--wcm-text-small-thin-weight": "500",
    "--wcm-text-small-thin-line-height": "16px",
    "--wcm-text-small-thin-letter-spacing": "-0.03em",
    "--wcm-text-small-thin-text-transform": "none",
    "--wcm-text-small-regular-size": "14px",
    "--wcm-text-small-regular-weight": "600",
    "--wcm-text-small-regular-line-height": "16px",
    "--wcm-text-small-regular-letter-spacing": "-0.03em",
    "--wcm-text-small-regular-text-transform": "none",
    "--wcm-text-medium-regular-size": "16px",
    "--wcm-text-medium-regular-weight": "600",
    "--wcm-text-medium-regular-line-height": "20px",
    "--wcm-text-medium-regular-letter-spacing": "-0.03em",
    "--wcm-text-medium-regular-text-transform": "none",
    "--wcm-font-family":
      "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
    "--wcm-font-feature-settings": "'tnum' on, 'lnum' on, 'case' on",
    "--wcm-success-color": "rgb(38,181,98)",
    "--wcm-error-color": "rgb(242, 90, 103)",
    "--wcm-overlay-background-color": "rgba(0, 0, 0, 0.3)",
    "--wcm-overlay-backdrop-filter": "none",
  };
}
const I = {
    getPreset(e) {
      return ar()[e];
    },
    setTheme() {
      const e = document.querySelector(":root"),
        { themeVariables: t } = be.state;
      if (e) {
        const o = mt(mt(mt({}, kn()), ar()), t);
        Object.entries(o).forEach(([n, r]) => e.style.setProperty(n, r));
      }
    },
    globalCss: R`*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-style:normal;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent;backface-visibility:hidden}button{cursor:pointer;display:flex;justify-content:center;align-items:center;position:relative;border:none;background-color:transparent;transition:all .2s ease}@media (hover:hover) and (pointer:fine){button:active{transition:all .1s ease;transform:scale(.93)}}button::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;transition:background-color,.2s ease}button:disabled{cursor:not-allowed}button svg,button wcm-text{position:relative;z-index:1}input{border:none;outline:0;appearance:none}img{display:block}::selection{color:var(--wcm-accent-fill-color);background:var(--wcm-accent-color)}`,
  },
  Tn = R`button{border-radius:var(--wcm-secondary-button-border-radius);height:28px;padding:0 10px;background-color:var(--wcm-accent-color)}button path{fill:var(--wcm-accent-fill-color)}button::after{border-radius:inherit;border:1px solid var(--wcm-color-overlay)}button:disabled::after{background-color:transparent}.wcm-icon-left svg{margin-right:5px}.wcm-icon-right svg{margin-left:5px}button:active::after{background-color:var(--wcm-color-overlay)}.wcm-ghost,.wcm-ghost:active::after,.wcm-outline{background-color:transparent}.wcm-ghost:active{opacity:.5}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}.wcm-ghost:hover::after{background-color:transparent}.wcm-ghost:hover{opacity:.5}}button:disabled{background-color:var(--wcm-color-bg-3);pointer-events:none}.wcm-ghost::after{border-color:transparent}.wcm-ghost path{fill:var(--wcm-color-fg-2)}.wcm-outline path{fill:var(--wcm-accent-color)}.wcm-outline:disabled{background-color:transparent;opacity:.5}`;
var Mn = Object.defineProperty,
  Pn = Object.getOwnPropertyDescriptor,
  ue = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Pn(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Mn(t, o, r), r;
  };
let Q = class extends A {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.iconLeft = void 0),
      (this.iconRight = void 0),
      (this.onClick = () => null),
      (this.variant = "default");
  }
  render() {
    const e = {
      "wcm-icon-left": this.iconLeft !== void 0,
      "wcm-icon-right": this.iconRight !== void 0,
      "wcm-ghost": this.variant === "ghost",
      "wcm-outline": this.variant === "outline",
    };
    let t = "inverse";
    return (
      this.variant === "ghost" && (t = "secondary"),
      this.variant === "outline" && (t = "accent"),
      d`<button class="${G(e)}" ?disabled="${this.disabled}" @click="${
        this.onClick
      }">${
        this.iconLeft
      }<wcm-text variant="small-regular" color="${t}"><slot></slot></wcm-text>${
        this.iconRight
      }</button>`
    );
  }
};
(Q.styles = [I.globalCss, Tn]),
  ue([C({ type: Boolean })], Q.prototype, "disabled", 2),
  ue([C()], Q.prototype, "iconLeft", 2),
  ue([C()], Q.prototype, "iconRight", 2),
  ue([C()], Q.prototype, "onClick", 2),
  ue([C()], Q.prototype, "variant", 2),
  (Q = ue([O("wcm-button")], Q));
const Rn = R`:host{display:inline-block}button{padding:0 15px 1px;height:40px;border-radius:var(--wcm-button-border-radius);color:var(--wcm-accent-fill-color);background-color:var(--wcm-accent-color)}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--wcm-color-overlay)}button:active::after{background-color:var(--wcm-color-overlay)}button:disabled{padding-bottom:0;background-color:var(--wcm-color-bg-3);color:var(--wcm-color-fg-3)}.wcm-secondary{color:var(--wcm-accent-color);background-color:transparent}.wcm-secondary::after{display:none}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}}`;
var Ln = Object.defineProperty,
  Bn = Object.getOwnPropertyDescriptor,
  gt = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Bn(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Ln(t, o, r), r;
  };
let Ie = class extends A {
  constructor() {
    super(...arguments), (this.disabled = !1), (this.variant = "primary");
  }
  render() {
    const e = { "wcm-secondary": this.variant === "secondary" };
    return d`<button ?disabled="${this.disabled}" class="${G(
      e,
    )}"><slot></slot></button>`;
  }
};
(Ie.styles = [I.globalCss, Rn]),
  gt([C({ type: Boolean })], Ie.prototype, "disabled", 2),
  gt([C()], Ie.prototype, "variant", 2),
  (Ie = gt([O("wcm-button-big")], Ie));
const Nn = R`:host{background-color:var(--wcm-color-bg-2);border-top:1px solid var(--wcm-color-bg-3)}div{padding:10px 20px;display:inherit;flex-direction:inherit;align-items:inherit;width:inherit;justify-content:inherit}`;
var Sn = Object.defineProperty,
  Dn = Object.getOwnPropertyDescriptor,
  _n = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Dn(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Sn(t, o, r), r;
  };
let ft = class extends A {
  render() {
    return d`<div><slot></slot></div>`;
  }
};
(ft.styles = [I.globalCss, Nn]), (ft = _n([O("wcm-info-footer")], ft));
const L = {
    CROSS_ICON: N`<svg width="12" height="12" viewBox="0 0 12 12"><path d="M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z" fill="#fff"/></svg>`,
    WALLET_CONNECT_LOGO: N`<svg width="178" height="29" viewBox="0 0 178 29" id="wcm-wc-logo"><path d="M10.683 7.926c5.284-5.17 13.85-5.17 19.134 0l.636.623a.652.652 0 0 1 0 .936l-2.176 2.129a.343.343 0 0 1-.478 0l-.875-.857c-3.686-3.607-9.662-3.607-13.348 0l-.937.918a.343.343 0 0 1-.479 0l-2.175-2.13a.652.652 0 0 1 0-.936l.698-.683Zm23.633 4.403 1.935 1.895a.652.652 0 0 1 0 .936l-8.73 8.543a.687.687 0 0 1-.956 0L20.37 17.64a.172.172 0 0 0-.239 0l-6.195 6.063a.687.687 0 0 1-.957 0l-8.73-8.543a.652.652 0 0 1 0-.936l1.936-1.895a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .239 0l6.195-6.064a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .24 0l6.195-6.064a.687.687 0 0 1 .956 0ZM48.093 20.948l2.338-9.355c.139-.515.258-1.07.416-1.942.12.872.258 1.427.357 1.942l2.022 9.355h4.181l3.528-13.874h-3.21l-1.943 8.523a24.825 24.825 0 0 0-.456 2.457c-.158-.931-.317-1.625-.495-2.438l-1.883-8.542h-4.201l-2.042 8.542a41.204 41.204 0 0 0-.475 2.438 41.208 41.208 0 0 0-.476-2.438l-1.903-8.542h-3.349l3.508 13.874h4.083ZM63.33 21.304c1.585 0 2.596-.654 3.11-1.605-.059.297-.078.595-.078.892v.357h2.655V15.22c0-2.735-1.248-4.32-4.3-4.32-2.636 0-4.36 1.466-4.52 3.487h2.914c.1-.891.734-1.426 1.705-1.426.911 0 1.407.515 1.407 1.11 0 .435-.258.693-1.03.792l-1.388.159c-2.061.257-3.825 1.01-3.825 3.19 0 1.982 1.645 3.092 3.35 3.092Zm.891-2.041c-.773 0-1.348-.436-1.348-1.19 0-.733.655-1.09 1.645-1.268l.674-.119c.575-.118.892-.218 1.09-.396v.912c0 1.228-.892 2.06-2.06 2.06ZM70.398 7.074v13.874h2.874V7.074h-2.874ZM74.934 7.074v13.874h2.874V7.074h-2.874ZM84.08 21.304c2.735 0 4.5-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922H81.92ZM94.92 21.146c.633 0 1.248-.1 1.525-.179v-2.18c-.218.04-.475.06-.693.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.338v-2.24h-2.338V7.788H91.47v3.448H89.37v2.24h2.1v4.201c0 2.3 1.15 3.469 3.45 3.469ZM104.62 21.304c3.924 0 6.302-2.299 6.599-5.608h-3.111c-.238 1.803-1.506 3.032-3.369 3.032-2.2 0-3.746-1.784-3.746-4.796 0-2.953 1.605-4.638 3.805-4.638 1.883 0 2.953 1.15 3.171 2.834h3.191c-.317-3.448-2.854-5.41-6.342-5.41-3.984 0-7.036 2.695-7.036 7.214 0 4.677 2.676 7.372 6.838 7.372ZM117.449 21.304c2.993 0 5.114-1.882 5.114-5.172 0-3.23-2.121-5.233-5.114-5.233-2.972 0-5.093 2.002-5.093 5.233 0 3.29 2.101 5.172 5.093 5.172Zm0-2.22c-1.327 0-2.18-1.09-2.18-2.952 0-1.903.892-2.973 2.18-2.973 1.308 0 2.2 1.07 2.2 2.973 0 1.862-.872 2.953-2.2 2.953ZM126.569 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.229-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM137.464 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.228-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM149.949 21.304c2.735 0 4.499-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922h-3.984ZM160.876 21.304c3.013 0 4.658-1.645 4.975-4.201h-2.874c-.099 1.07-.713 1.982-2.001 1.982-1.309 0-2.2-1.21-2.2-2.993 0-1.942 1.03-2.933 2.259-2.933 1.209 0 1.803.872 1.883 1.882h2.873c-.218-2.358-1.823-4.142-4.776-4.142-2.874 0-5.153 1.903-5.153 5.193 0 3.25 1.923 5.212 5.014 5.212ZM172.067 21.146c.634 0 1.248-.1 1.526-.179v-2.18c-.218.04-.476.06-.694.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.339v-2.24h-2.339V7.788h-2.854v3.448h-2.1v2.24h2.1v4.201c0 2.3 1.15 3.469 3.449 3.469Z" fill="#fff"/></svg>`,
    WALLET_CONNECT_ICON: N`<svg width="28" height="20" viewBox="0 0 28 20"><g clip-path="url(#a)"><path d="M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z" fill="#000000"/></g><defs><clipPath id="a"><path fill="#ffffff" d="M0 0h28v20H0z"/></clipPath></defs></svg>`,
    WALLET_CONNECT_ICON_COLORED: N`<svg width="96" height="96" fill="none"><path fill="#fff" d="M25.322 33.597c12.525-12.263 32.83-12.263 45.355 0l1.507 1.476a1.547 1.547 0 0 1 0 2.22l-5.156 5.048a.814.814 0 0 1-1.134 0l-2.074-2.03c-8.737-8.555-22.903-8.555-31.64 0l-2.222 2.175a.814.814 0 0 1-1.134 0l-5.156-5.049a1.547 1.547 0 0 1 0-2.22l1.654-1.62Zm56.019 10.44 4.589 4.494a1.547 1.547 0 0 1 0 2.22l-20.693 20.26a1.628 1.628 0 0 1-2.267 0L48.283 56.632a.407.407 0 0 0-.567 0L33.03 71.012a1.628 1.628 0 0 1-2.268 0L10.07 50.75a1.547 1.547 0 0 1 0-2.22l4.59-4.494a1.628 1.628 0 0 1 2.267 0l14.687 14.38c.156.153.41.153.567 0l14.685-14.38a1.628 1.628 0 0 1 2.268 0l14.687 14.38c.156.153.41.153.567 0l14.686-14.38a1.628 1.628 0 0 1 2.268 0Z"/><path stroke="#000" d="M25.672 33.954c12.33-12.072 32.325-12.072 44.655 0l1.508 1.476a1.047 1.047 0 0 1 0 1.506l-5.157 5.048a.314.314 0 0 1-.434 0l-2.074-2.03c-8.932-8.746-23.409-8.746-32.34 0l-2.222 2.174a.314.314 0 0 1-.434 0l-5.157-5.048a1.047 1.047 0 0 1 0-1.506l1.655-1.62Zm55.319 10.44 4.59 4.494a1.047 1.047 0 0 1 0 1.506l-20.694 20.26a1.128 1.128 0 0 1-1.568 0l-14.686-14.38a.907.907 0 0 0-1.267 0L32.68 70.655a1.128 1.128 0 0 1-1.568 0L10.42 50.394a1.047 1.047 0 0 1 0-1.506l4.59-4.493a1.128 1.128 0 0 1 1.567 0l14.687 14.379a.907.907 0 0 0 1.266 0l-.35-.357.35.357 14.686-14.38a1.128 1.128 0 0 1 1.568 0l14.687 14.38a.907.907 0 0 0 1.267 0l14.686-14.38a1.128 1.128 0 0 1 1.568 0Z"/></svg>`,
    BACK_ICON: N`<svg width="10" height="18" viewBox="0 0 10 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z" fill="#fff"/></svg>`,
    COPY_ICON: N`<svg width="24" height="24" fill="none"><path fill="#fff" fill-rule="evenodd" d="M7.01 7.01c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185c-.78.397-1.735.505-3.28.534l-.001.01c-.03 1.54-.138 2.493-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545C4.508 7.149 5.46 7.04 7 7.01h.01ZM15 15.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C8.501 11.403 8.5 10.425 8.5 9c0-1.425.001-2.403.063-3.162.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318.759-.062 1.737-.063 3.162-.063 1.425 0 2.403.001 3.162.063.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162 0 1.425-.001 2.403-.063 3.162-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063ZM7 8.511c-.444.009-.825.025-1.162.052-.74.06-1.139.172-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.288-.257.686-.318 1.427-.062.759-.063 1.737-.063 3.162 0 1.425.001 2.403.063 3.162.06.74.172 1.139.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.146.686.257 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403-.001 3.162-.063.74-.06 1.139-.172 1.427-.319a3.5 3.5 0 0 0 1.53-1.53c.146-.287.257-.685.318-1.426.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C7 13.2 7 11.8 7 9v-.489Z" clip-rule="evenodd"/></svg>`,
    RETRY_ICON: N`<svg width="15" height="16" viewBox="0 0 15 16"><path d="M6.464 2.03A.75.75 0 0 0 5.403.97L2.08 4.293a1 1 0 0 0 0 1.414L5.403 9.03a.75.75 0 0 0 1.06-1.06L4.672 6.177a.25.25 0 0 1 .177-.427h2.085a4 4 0 1 1-3.93 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.7.748a5.501 5.501 0 1 0 5.45-6.248H4.848a.25.25 0 0 1-.177-.427L6.464 2.03Z" fill="#fff"/></svg>`,
    DESKTOP_ICON: N`<svg width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C2.204 1 3.13 1 4.98 1h6.04c1.85 0 2.775 0 3.466.394a3 3 0 0 1 1.12 1.12C16 3.204 16 4.13 16 5.98v1.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C13.796 12 12.87 12 11.02 12H4.98c-1.85 0-2.775 0-3.466-.394a3 3 0 0 1-1.12-1.12C0 9.796 0 8.87 0 7.02V5.98ZM4.98 2.5h6.04c.953 0 1.568.001 2.034.043.446.04.608.108.69.154a1.5 1.5 0 0 1 .559.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033v1.04c0 .952-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.046-.243.114-.69.154-.466.042-1.08.043-2.033.043H4.98c-.952 0-1.568-.001-2.034-.043-.446-.04-.608-.108-.69-.154a1.5 1.5 0 0 1-.559-.56c-.046-.08-.114-.243-.154-.69-.042-.465-.043-1.08-.043-2.033V5.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.046.243-.114.69-.154.465-.042 1.08-.043 2.033-.043Z" fill="#fff"/><path d="M4 14.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`,
    MOBILE_ICON: N`<svg width="16" height="16" viewBox="0 0 16 16"><path d="M6.75 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C5.204 0 6.136 0 8 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C13 2.204 13 3.13 13 4.98v6.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C10.796 16 9.864 16 8 16s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C3 13.796 3 12.87 3 11.02V4.98Zm8.5 0v6.04c0 .953-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.046-.08-.114-.243-.154-.69-.042-.466-.043-1.08-.043-2.033V4.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.045.243-.113.693-.154C6.42 1.501 7.041 1.5 8 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033Z" fill="#fff"/></svg>`,
    ARROW_DOWN_ICON: N`<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.28 7.47a.75.75 0 0 0-1.06 1.06l5.25 5.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-3.544 3.543a.25.25 0 0 1-.426-.177V.75a.75.75 0 0 0-1.5 0v10.086a.25.25 0 0 1-.427.176L2.28 7.47Z" fill="#fff"/></svg>`,
    ARROW_UP_RIGHT_ICON: N`<svg width="15" height="14" fill="none"><path d="M4.5 1.75A.75.75 0 0 1 5.25 1H12a1.5 1.5 0 0 1 1.5 1.5v6.75a.75.75 0 0 1-1.5 0V4.164a.25.25 0 0 0-.427-.176L4.061 11.5A.75.75 0 0 1 3 10.44l7.513-7.513a.25.25 0 0 0-.177-.427H5.25a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`,
    ARROW_RIGHT_ICON: N`<svg width="6" height="14" viewBox="0 0 6 14"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.181 1.099a.75.75 0 0 1 1.024.279l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.257a.75.75 0 1 1-1.303-.744L4.335 7.62a1.25 1.25 0 0 0 0-1.24L1.902 2.122a.75.75 0 0 1 .28-1.023Z" fill="#fff"/></svg>`,
    QRCODE_ICON: N`<svg width="25" height="24" viewBox="0 0 25 24"><path d="M23.748 9a.748.748 0 0 0 .748-.752c-.018-2.596-.128-4.07-.784-5.22a6 6 0 0 0-2.24-2.24c-1.15-.656-2.624-.766-5.22-.784a.748.748 0 0 0-.752.748c0 .414.335.749.748.752 1.015.007 1.82.028 2.494.088.995.09 1.561.256 1.988.5.7.398 1.28.978 1.679 1.678.243.427.41.993.498 1.988.061.675.082 1.479.09 2.493a.753.753 0 0 0 .75.749ZM3.527.788C4.677.132 6.152.022 8.747.004A.748.748 0 0 1 9.5.752a.753.753 0 0 1-.749.752c-1.014.007-1.818.028-2.493.088-.995.09-1.561.256-1.988.5-.7.398-1.28.978-1.679 1.678-.243.427-.41.993-.499 1.988-.06.675-.081 1.479-.088 2.493A.753.753 0 0 1 1.252 9a.748.748 0 0 1-.748-.752c.018-2.596.128-4.07.784-5.22a6 6 0 0 1 2.24-2.24ZM1.252 15a.748.748 0 0 0-.748.752c.018 2.596.128 4.07.784 5.22a6 6 0 0 0 2.24 2.24c1.15.656 2.624.766 5.22.784a.748.748 0 0 0 .752-.748.753.753 0 0 0-.749-.752c-1.014-.007-1.818-.028-2.493-.089-.995-.089-1.561-.255-1.988-.498a4.5 4.5 0 0 1-1.679-1.68c-.243-.426-.41-.992-.499-1.987-.06-.675-.081-1.479-.088-2.493A.753.753 0 0 0 1.252 15ZM22.996 15.749a.753.753 0 0 1 .752-.749c.415 0 .751.338.748.752-.018 2.596-.128 4.07-.784 5.22a6 6 0 0 1-2.24 2.24c-1.15.656-2.624.766-5.22.784a.748.748 0 0 1-.752-.748c0-.414.335-.749.748-.752 1.015-.007 1.82-.028 2.494-.089.995-.089 1.561-.255 1.988-.498a4.5 4.5 0 0 0 1.679-1.68c.243-.426.41-.992.498-1.987.061-.675.082-1.479.09-2.493Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 4a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 11h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 4H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM13.5 6.5A2.5 2.5 0 0 1 16 4h2a2.5 2.5 0 0 1 2.5 2.5v2A2.5 2.5 0 0 1 18 11h-2a2.5 2.5 0 0 1-2.5-2.5v-2Zm2.5-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1ZM7 13a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 20h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 13H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" fill="#fff"/><path d="M13.5 15.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.303 13 15.535 13 16 13v2.5h-2.5ZM18 13c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89H18V13ZM18 17.5h2.5c0 .465 0 .697-.038.89a2 2 0 0 1-1.572 1.572C18.697 20 18.465 20 18 20v-2.5ZM13.5 17.5H16V20c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572c-.038-.193-.038-.425-.038-.89Z" fill="#fff"/></svg>`,
    SCAN_ICON: N`<svg width="16" height="16" fill="none"><path fill="#fff" d="M10 15.216c0 .422.347.763.768.74 1.202-.064 2.025-.222 2.71-.613a5.001 5.001 0 0 0 1.865-1.866c.39-.684.549-1.507.613-2.709a.735.735 0 0 0-.74-.768.768.768 0 0 0-.76.732c-.009.157-.02.306-.032.447-.073.812-.206 1.244-.384 1.555-.31.545-.761.996-1.306 1.306-.311.178-.743.311-1.555.384-.141.013-.29.023-.447.032a.768.768 0 0 0-.732.76ZM10 .784c0 .407.325.737.732.76.157.009.306.02.447.032.812.073 1.244.206 1.555.384a3.5 3.5 0 0 1 1.306 1.306c.178.311.311.743.384 1.555.013.142.023.29.032.447a.768.768 0 0 0 .76.732.734.734 0 0 0 .74-.768c-.064-1.202-.222-2.025-.613-2.71A5 5 0 0 0 13.477.658c-.684-.39-1.507-.549-2.709-.613a.735.735 0 0 0-.768.74ZM5.232.044A.735.735 0 0 1 6 .784a.768.768 0 0 1-.732.76c-.157.009-.305.02-.447.032-.812.073-1.244.206-1.555.384A3.5 3.5 0 0 0 1.96 3.266c-.178.311-.311.743-.384 1.555-.013.142-.023.29-.032.447A.768.768 0 0 1 .784 6a.735.735 0 0 1-.74-.768c.064-1.202.222-2.025.613-2.71A5 5 0 0 1 2.523.658C3.207.267 4.03.108 5.233.044ZM5.268 14.456a.768.768 0 0 1 .732.76.734.734 0 0 1-.768.74c-1.202-.064-2.025-.222-2.71-.613a5 5 0 0 1-1.865-1.866c-.39-.684-.549-1.507-.613-2.709A.735.735 0 0 1 .784 10c.407 0 .737.325.76.732.009.157.02.306.032.447.073.812.206 1.244.384 1.555a3.5 3.5 0 0 0 1.306 1.306c.311.178.743.311 1.555.384.142.013.29.023.447.032Z"/></svg>`,
    CHECKMARK_ICON: N`<svg width="13" height="12" viewBox="0 0 13 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.155.132a.75.75 0 0 1 .232 1.035L5.821 11.535a1 1 0 0 1-1.626.09L.665 7.21a.75.75 0 1 1 1.17-.937L4.71 9.867a.25.25 0 0 0 .406-.023L11.12.364a.75.75 0 0 1 1.035-.232Z" fill="#fff"/></svg>`,
    SEARCH_ICON: N`<svg width="20" height="21"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.432 13.992c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#949E9E"/></svg>`,
    WALLET_PLACEHOLDER: N`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#q)"><path id="wallet-placeholder-fill" fill="#fff" d="M0 24.9c0-9.251 0-13.877 1.97-17.332a15 15 0 0 1 5.598-5.597C11.023 0 15.648 0 24.9 0h10.2c9.252 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.023 60 15.648 60 24.9v10.2c0 9.252 0 13.877-1.97 17.332a15.001 15.001 0 0 1-5.598 5.597C48.977 60 44.352 60 35.1 60H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.352 0 35.1V24.9Z"/><path id="wallet-placeholder-dash" stroke="#000" stroke-dasharray="4 4" stroke-width="1.5" d="M.04 41.708a231.598 231.598 0 0 1-.039-4.403l.75-.001L.75 35.1v-2.55H0v-5.1h.75V24.9l.001-2.204h-.75c.003-1.617.011-3.077.039-4.404l.75.016c.034-1.65.099-3.08.218-4.343l-.746-.07c.158-1.678.412-3.083.82-4.316l.713.236c.224-.679.497-1.296.827-1.875a14.25 14.25 0 0 1 1.05-1.585L3.076 5.9A15 15 0 0 1 5.9 3.076l.455.596a14.25 14.25 0 0 1 1.585-1.05c.579-.33 1.196-.603 1.875-.827l-.236-.712C10.812.674 12.217.42 13.895.262l.07.746C15.23.89 16.66.824 18.308.79l-.016-.75C19.62.012 21.08.004 22.695.001l.001.75L24.9.75h2.55V0h5.1v.75h2.55l2.204.001v-.75c1.617.003 3.077.011 4.404.039l-.016.75c1.65.034 3.08.099 4.343.218l.07-.746c1.678.158 3.083.412 4.316.82l-.236.713c.679.224 1.296.497 1.875.827a14.24 14.24 0 0 1 1.585 1.05l.455-.596A14.999 14.999 0 0 1 56.924 5.9l-.596.455c.384.502.735 1.032 1.05 1.585.33.579.602 1.196.827 1.875l.712-.236c.409 1.233.663 2.638.822 4.316l-.747.07c.119 1.264.184 2.694.218 4.343l.75-.016c.028 1.327.036 2.787.039 4.403l-.75.001.001 2.204v2.55H60v5.1h-.75v2.55l-.001 2.204h.75a231.431 231.431 0 0 1-.039 4.404l-.75-.016c-.034 1.65-.099 3.08-.218 4.343l.747.07c-.159 1.678-.413 3.083-.822 4.316l-.712-.236a10.255 10.255 0 0 1-.827 1.875 14.242 14.242 0 0 1-1.05 1.585l.596.455a14.997 14.997 0 0 1-2.824 2.824l-.455-.596c-.502.384-1.032.735-1.585 1.05-.579.33-1.196.602-1.875.827l.236.712c-1.233.409-2.638.663-4.316.822l-.07-.747c-1.264.119-2.694.184-4.343.218l.016.75c-1.327.028-2.787.036-4.403.039l-.001-.75-2.204.001h-2.55V60h-5.1v-.75H24.9l-2.204-.001v.75a231.431 231.431 0 0 1-4.404-.039l.016-.75c-1.65-.034-3.08-.099-4.343-.218l-.07.747c-1.678-.159-3.083-.413-4.316-.822l.236-.712a10.258 10.258 0 0 1-1.875-.827 14.252 14.252 0 0 1-1.585-1.05l-.455.596A14.999 14.999 0 0 1 3.076 54.1l.596-.455a14.24 14.24 0 0 1-1.05-1.585 10.259 10.259 0 0 1-.827-1.875l-.712.236C.674 49.188.42 47.783.262 46.105l.746-.07C.89 44.77.824 43.34.79 41.692l-.75.016Z"/><path fill="#fff" fill-rule="evenodd" d="M35.643 32.145c-.297-.743-.445-1.114-.401-1.275a.42.42 0 0 1 .182-.27c.134-.1.463-.1 1.123-.1.742 0 1.499.046 2.236-.05a6 6 0 0 0 5.166-5.166c.051-.39.051-.855.051-1.784 0-.928 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.165c-.39-.052-.854-.052-1.783-.052h-7.72c-4.934 0-7.401 0-9.244 1.051a8 8 0 0 0-2.985 2.986C16.057 22.28 16.003 24.58 16 29 15.998 31.075 16 33.15 16 35.224A7.778 7.778 0 0 0 23.778 43H28.5c1.394 0 2.09 0 2.67-.116a6 6 0 0 0 4.715-4.714c.115-.58.115-1.301.115-2.744 0-1.31 0-1.964-.114-2.49a4.998 4.998 0 0 0-.243-.792Z" clip-rule="evenodd"/><path fill="#9EA9A9" fill-rule="evenodd" d="M37 18h-7.72c-2.494 0-4.266.002-5.647.126-1.361.122-2.197.354-2.854.728a6.5 6.5 0 0 0-2.425 2.426c-.375.657-.607 1.492-.729 2.853-.11 1.233-.123 2.777-.125 4.867 0 .7 0 1.05.097 1.181.096.13.182.181.343.2.163.02.518-.18 1.229-.581a6.195 6.195 0 0 1 3.053-.8H37c.977 0 1.32-.003 1.587-.038a4.5 4.5 0 0 0 3.874-3.874c.036-.268.039-.611.039-1.588 0-.976-.003-1.319-.038-1.587a4.5 4.5 0 0 0-3.875-3.874C38.32 18.004 37.977 18 37 18Zm-7.364 12.5h-7.414a4.722 4.722 0 0 0-4.722 4.723 6.278 6.278 0 0 0 6.278 6.278H28.5c1.466 0 1.98-.008 2.378-.087a4.5 4.5 0 0 0 3.535-3.536c.08-.397.087-.933.087-2.451 0-1.391-.009-1.843-.08-2.17a3.5 3.5 0 0 0-2.676-2.676c-.328-.072-.762-.08-2.108-.08Z" clip-rule="evenodd"/></g><defs><clipPath id="q"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`,
    GLOBE_ICON: N`<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-2.113.75c.301 0 .535.264.47.558a6.01 6.01 0 0 1-2.867 3.896c-.203.116-.42-.103-.334-.32.409-1.018.691-2.274.797-3.657a.512.512 0 0 1 .507-.477h1.427Zm.47-2.058c.065.294-.169.558-.47.558H11.96a.512.512 0 0 1-.507-.477c-.106-1.383-.389-2.638-.797-3.656-.087-.217.13-.437.333-.32a6.01 6.01 0 0 1 2.868 3.895Zm-4.402.558c.286 0 .515-.24.49-.525-.121-1.361-.429-2.534-.83-3.393-.279-.6-.549-.93-.753-1.112a.535.535 0 0 0-.724 0c-.204.182-.474.513-.754 1.112-.4.859-.708 2.032-.828 3.393a.486.486 0 0 0 .49.525h2.909Zm-5.415 0c.267 0 .486-.21.507-.477.106-1.383.389-2.638.797-3.656.087-.217-.13-.437-.333-.32a6.01 6.01 0 0 0-2.868 3.895c-.065.294.169.558.47.558H4.04ZM2.143 9.308c-.065-.294.169-.558.47-.558H4.04c.267 0 .486.21.507.477.106 1.383.389 2.639.797 3.657.087.217-.13.436-.333.32a6.01 6.01 0 0 1-2.868-3.896Zm3.913-.033a.486.486 0 0 1 .49-.525h2.909c.286 0 .515.24.49.525-.121 1.361-.428 2.535-.83 3.394-.279.6-.549.93-.753 1.112a.535.535 0 0 1-.724 0c-.204-.182-.474-.513-.754-1.112-.4-.859-.708-2.033-.828-3.394Z" clip-rule="evenodd"/></svg>`,
  },
  Wn = R`.wcm-toolbar-placeholder{top:0;bottom:0;left:0;right:0;width:100%;position:absolute;display:block;pointer-events:none;height:100px;border-radius:calc(var(--wcm-background-border-radius) * .9);background-color:var(--wcm-background-color);background-position:center;background-size:cover}.wcm-toolbar{height:38px;display:flex;position:relative;margin:5px 15px 5px 5px;justify-content:space-between;align-items:center}.wcm-toolbar img,.wcm-toolbar svg{height:28px;object-position:left center;object-fit:contain}#wcm-wc-logo path{fill:var(--wcm-accent-fill-color)}button{width:28px;height:28px;border-radius:var(--wcm-icon-button-border-radius);border:0;display:flex;justify-content:center;align-items:center;cursor:pointer;background-color:var(--wcm-color-bg-1);box-shadow:0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-bg-2)}button svg{display:block;object-position:center}button path{fill:var(--wcm-color-fg-1)}.wcm-toolbar div{display:flex}@media(hover:hover){button:hover{background-color:var(--wcm-color-bg-2)}}`;
var jn = Object.defineProperty,
  Un = Object.getOwnPropertyDescriptor,
  Fn = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Un(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && jn(t, o, r), r;
  };
let wt = class extends A {
  render() {
    return d`<div class="wcm-toolbar-placeholder"></div><div class="wcm-toolbar">${L.WALLET_CONNECT_LOGO} <button @click="${Ye.close}">${L.CROSS_ICON}</button></div>`;
  }
};
(wt.styles = [I.globalCss, Wn]), (wt = Fn([O("wcm-modal-backcard")], wt));
const zn = R`main{padding:20px;padding-top:0;width:100%}`;
var Hn = Object.defineProperty,
  Zn = Object.getOwnPropertyDescriptor,
  Vn = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Zn(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Hn(t, o, r), r;
  };
let pt = class extends A {
  render() {
    return d`<main><slot></slot></main>`;
  }
};
(pt.styles = [I.globalCss, zn]), (pt = Vn([O("wcm-modal-content")], pt));
const Kn = R`footer{padding:10px;display:flex;flex-direction:column;align-items:inherit;justify-content:inherit;border-top:1px solid var(--wcm-color-bg-2)}`;
var qn = Object.defineProperty,
  Yn = Object.getOwnPropertyDescriptor,
  Gn = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Yn(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && qn(t, o, r), r;
  };
let vt = class extends A {
  render() {
    return d`<footer><slot></slot></footer>`;
  }
};
(vt.styles = [I.globalCss, Kn]), (vt = Gn([O("wcm-modal-footer")], vt));
const Qn = R`header{display:flex;justify-content:center;align-items:center;padding:20px;position:relative}.wcm-border{border-bottom:1px solid var(--wcm-color-bg-2);margin-bottom:20px}header button{padding:15px 20px}header button:active{opacity:.5}@media(hover:hover){header button:hover{opacity:.5}}.wcm-back-btn{position:absolute;left:0}.wcm-action-btn{position:absolute;right:0}path{fill:var(--wcm-accent-color)}`;
var Jn = Object.defineProperty,
  Xn = Object.getOwnPropertyDescriptor,
  Ae = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Xn(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Jn(t, o, r), r;
  };
let ae = class extends A {
  constructor() {
    super(...arguments),
      (this.title = ""),
      (this.onAction = void 0),
      (this.actionIcon = void 0),
      (this.border = !1);
  }
  backBtnTemplate() {
    return d`<button class="wcm-back-btn" @click="${S.goBack}">${L.BACK_ICON}</button>`;
  }
  actionBtnTemplate() {
    return d`<button class="wcm-action-btn" @click="${this.onAction}">${this.actionIcon}</button>`;
  }
  render() {
    const e = { "wcm-border": this.border },
      t = S.state.history.length > 1,
      o = this.title
        ? d`<wcm-text variant="big-bold">${this.title}</wcm-text>`
        : d`<slot></slot>`;
    return d`<header class="${G(e)}">${
      t ? this.backBtnTemplate() : null
    } ${o} ${this.onAction ? this.actionBtnTemplate() : null}</header>`;
  }
};
(ae.styles = [I.globalCss, Qn]),
  Ae([C()], ae.prototype, "title", 2),
  Ae([C()], ae.prototype, "onAction", 2),
  Ae([C()], ae.prototype, "actionIcon", 2),
  Ae([C({ type: Boolean })], ae.prototype, "border", 2),
  (ae = Ae([O("wcm-modal-header")], ae));
const y = {
    MOBILE_BREAKPOINT: 600,
    WCM_RECENT_WALLET_DATA: "WCM_RECENT_WALLET_DATA",
    EXPLORER_WALLET_URL: "https://explorer.walletconnect.com/?type=wallet",
    getShadowRootElement(e, t) {
      const o = e.renderRoot.querySelector(t);
      if (!o) throw new Error(`${t} not found`);
      return o;
    },
    getWalletIcon({ id: e, image_id: t }) {
      const { walletImages: o } = de.state;
      return o != null && o[e] ? o[e] : t ? _.getWalletImageUrl(t) : "";
    },
    getWalletName(e, t = !1) {
      return t && e.length > 8 ? `${e.substring(0, 8)}..` : e;
    },
    isMobileAnimation() {
      return window.innerWidth <= y.MOBILE_BREAKPOINT;
    },
    async preloadImage(e) {
      const t = new Promise((o, n) => {
        const r = new Image();
        (r.onload = o),
          (r.onerror = n),
          (r.crossOrigin = "anonymous"),
          (r.src = e);
      });
      return Promise.race([t, $.wait(3e3)]);
    },
    getErrorMessage(e) {
      return e instanceof Error ? e.message : "Unknown Error";
    },
    debounce(e, t = 500) {
      let o;
      return (...n) => {
        function r() {
          e(...n);
        }
        o && clearTimeout(o), (o = setTimeout(r, t));
      };
    },
    handleMobileLinking(e) {
      const { walletConnectUri: t } = K.state,
        { mobile: o, name: n } = e,
        r = o == null ? void 0 : o.native,
        i = o == null ? void 0 : o.universal;
      y.setRecentWallet(e);
      function a(l) {
        let s = "";
        r
          ? (s = $.formatUniversalUrl(r, l, n))
          : i && (s = $.formatNativeUrl(i, l, n)),
          $.openHref(s, "_self");
      }
      t && a(t);
    },
    handleAndroidLinking() {
      const { walletConnectUri: e } = K.state;
      e && ($.setWalletConnectAndroidDeepLink(e), $.openHref(e, "_self"));
    },
    async handleUriCopy() {
      const { walletConnectUri: e } = K.state;
      if (e)
        try {
          await navigator.clipboard.writeText(e),
            te.openToast("Link copied", "success");
        } catch {
          te.openToast("Failed to copy", "error");
        }
    },
    getCustomImageUrls() {
      const { walletImages: e } = de.state,
        t = Object.values(e ?? {});
      return Object.values(t);
    },
    truncate(e, t = 8) {
      return e.length <= t
        ? e
        : `${e.substring(0, 4)}...${e.substring(e.length - 4)}`;
    },
    setRecentWallet(e) {
      try {
        localStorage.setItem(y.WCM_RECENT_WALLET_DATA, JSON.stringify(e));
      } catch {
        console.info("Unable to set recent wallet");
      }
    },
    getRecentWallet() {
      try {
        const e = localStorage.getItem(y.WCM_RECENT_WALLET_DATA);
        return e ? JSON.parse(e) : void 0;
      } catch {
        console.info("Unable to get recent wallet");
      }
    },
    caseSafeIncludes(e, t) {
      return e.toUpperCase().includes(t.toUpperCase());
    },
    openWalletExplorerUrl() {
      $.openHref(y.EXPLORER_WALLET_URL, "_blank");
    },
    getCachedRouterWalletPlatforms() {
      const { desktop: e, mobile: t } = $.getWalletRouterData(),
        o = !!(e != null && e.native),
        n = !!(e != null && e.universal),
        r = !!(t != null && t.native) || !!(t != null && t.universal);
      return { isDesktop: o, isMobile: r, isWeb: n };
    },
    goToConnectingView(e) {
      S.setData({ Wallet: e });
      const t = $.isMobile(),
        {
          isDesktop: o,
          isWeb: n,
          isMobile: r,
        } = y.getCachedRouterWalletPlatforms();
      t
        ? r
          ? S.push("MobileConnecting")
          : n
          ? S.push("WebConnecting")
          : S.push("InstallWallet")
        : o
        ? S.push("DesktopConnecting")
        : n
        ? S.push("WebConnecting")
        : r
        ? S.push("MobileQrcodeConnecting")
        : S.push("InstallWallet");
    },
  },
  ei = R`.wcm-router{overflow:hidden;will-change:transform}.wcm-content{display:flex;flex-direction:column}`;
var ti = Object.defineProperty,
  ri = Object.getOwnPropertyDescriptor,
  bt = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? ri(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ti(t, o, r), r;
  };
let Oe = class extends A {
  constructor() {
    super(),
      (this.view = S.state.view),
      (this.prevView = S.state.view),
      (this.unsubscribe = void 0),
      (this.oldHeight = "0px"),
      (this.resizeObserver = void 0),
      (this.unsubscribe = S.subscribe((e) => {
        this.view !== e.view && this.onChangeRoute();
      }));
  }
  firstUpdated() {
    (this.resizeObserver = new ResizeObserver(([e]) => {
      const t = `${e.contentRect.height}px`;
      this.oldHeight !== "0px" &&
        ce(this.routerEl, { height: [this.oldHeight, t] }, { duration: 0.2 }),
        (this.oldHeight = t);
    })),
      this.resizeObserver.observe(this.contentEl);
  }
  disconnectedCallback() {
    var e, t;
    (e = this.unsubscribe) == null || e.call(this),
      (t = this.resizeObserver) == null || t.disconnect();
  }
  get routerEl() {
    return y.getShadowRootElement(this, ".wcm-router");
  }
  get contentEl() {
    return y.getShadowRootElement(this, ".wcm-content");
  }
  viewTemplate() {
    switch (this.view) {
      case "ConnectWallet":
        return d`<wcm-connect-wallet-view></wcm-connect-wallet-view>`;
      case "DesktopConnecting":
        return d`<wcm-desktop-connecting-view></wcm-desktop-connecting-view>`;
      case "MobileConnecting":
        return d`<wcm-mobile-connecting-view></wcm-mobile-connecting-view>`;
      case "WebConnecting":
        return d`<wcm-web-connecting-view></wcm-web-connecting-view>`;
      case "MobileQrcodeConnecting":
        return d`<wcm-mobile-qr-connecting-view></wcm-mobile-qr-connecting-view>`;
      case "WalletExplorer":
        return d`<wcm-wallet-explorer-view></wcm-wallet-explorer-view>`;
      case "Qrcode":
        return d`<wcm-qrcode-view></wcm-qrcode-view>`;
      case "InstallWallet":
        return d`<wcm-install-wallet-view></wcm-install-wallet-view>`;
      default:
        return d`<div>Not Found</div>`;
    }
  }
  async onChangeRoute() {
    await ce(
      this.routerEl,
      { opacity: [1, 0], scale: [1, 1.02] },
      { duration: 0.15, delay: 0.1 },
    ).finished,
      (this.view = S.state.view),
      ce(
        this.routerEl,
        { opacity: [0, 1], scale: [0.99, 1] },
        { duration: 0.37, delay: 0.05 },
      );
  }
  render() {
    return d`<div class="wcm-router"><div class="wcm-content">${this.viewTemplate()}</div></div>`;
  }
};
(Oe.styles = [I.globalCss, ei]),
  bt([W()], Oe.prototype, "view", 2),
  bt([W()], Oe.prototype, "prevView", 2),
  (Oe = bt([O("wcm-modal-router")], Oe));
const oi = R`div{height:36px;width:max-content;display:flex;justify-content:center;align-items:center;padding:9px 15px 11px;position:absolute;top:12px;box-shadow:0 6px 14px -6px rgba(10,16,31,.3),0 10px 32px -4px rgba(10,16,31,.15);z-index:2;left:50%;transform:translateX(-50%);pointer-events:none;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border-radius:var(--wcm-notification-border-radius);border:1px solid var(--wcm-color-overlay);background-color:var(--wcm-color-overlay)}svg{margin-right:5px}@-moz-document url-prefix(){div{background-color:var(--wcm-color-bg-3)}}.wcm-success path{fill:var(--wcm-accent-color)}.wcm-error path{fill:var(--wcm-error-color)}`;
var ni = Object.defineProperty,
  ii = Object.getOwnPropertyDescriptor,
  lr = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? ii(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ni(t, o, r), r;
  };
let Fe = class extends A {
  constructor() {
    super(),
      (this.open = !1),
      (this.unsubscribe = void 0),
      (this.timeout = void 0),
      (this.unsubscribe = te.subscribe((e) => {
        e.open
          ? ((this.open = !0),
            (this.timeout = setTimeout(() => te.closeToast(), 2200)))
          : ((this.open = !1), clearTimeout(this.timeout));
      }));
  }
  disconnectedCallback() {
    var e;
    (e = this.unsubscribe) == null || e.call(this),
      clearTimeout(this.timeout),
      te.closeToast();
  }
  render() {
    const { message: e, variant: t } = te.state,
      o = { "wcm-success": t === "success", "wcm-error": t === "error" };
    return this.open
      ? d`<div class="${G(o)}">${t === "success" ? L.CHECKMARK_ICON : null} ${
          t === "error" ? L.CROSS_ICON : null
        }<wcm-text variant="small-regular">${e}</wcm-text></div>`
      : null;
  }
};
(Fe.styles = [I.globalCss, oi]),
  lr([W()], Fe.prototype, "open", 2),
  (Fe = lr([O("wcm-modal-toast")], Fe));
const ai = 0.1,
  sr = 2.5,
  Y = 7;
function yt(e, t, o) {
  return e === t ? !1 : (e - t < 0 ? t - e : e - t) <= o + ai;
}
function li(e, t) {
  const o = Array.prototype.slice.call(
      De.create(e, { errorCorrectionLevel: t }).modules.data,
      0,
    ),
    n = Math.sqrt(o.length);
  return o.reduce(
    (r, i, a) => (a % n === 0 ? r.push([i]) : r[r.length - 1].push(i)) && r,
    [],
  );
}
const si = {
    generate(e, t, o) {
      const n = "#141414",
        r = "#ffffff",
        i = [],
        a = li(e, "Q"),
        l = t / a.length,
        s = [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
        ];
      s.forEach(({ x: p, y: h }) => {
        const x = (a.length - Y) * l * p,
          u = (a.length - Y) * l * h,
          b = 0.45;
        for (let v = 0; v < s.length; v += 1) {
          const w = l * (Y - v * 2);
          i.push(
            N`<rect fill="${v % 2 === 0 ? n : r}" height="${w}" rx="${
              w * b
            }" ry="${w * b}" width="${w}" x="${x + l * v}" y="${u + l * v}">`,
          );
        }
      });
      const c = Math.floor((o + 25) / l),
        m = a.length / 2 - c / 2,
        E = a.length / 2 + c / 2 - 1,
        f = [];
      a.forEach((p, h) => {
        p.forEach((x, u) => {
          if (
            a[h][u] &&
            !(
              (h < Y && u < Y) ||
              (h > a.length - (Y + 1) && u < Y) ||
              (h < Y && u > a.length - (Y + 1))
            ) &&
            !(h > m && h < E && u > m && u < E)
          ) {
            const b = h * l + l / 2,
              v = u * l + l / 2;
            f.push([b, v]);
          }
        });
      });
      const g = {};
      return (
        f.forEach(([p, h]) => {
          g[p] ? g[p].push(h) : (g[p] = [h]);
        }),
        Object.entries(g)
          .map(([p, h]) => {
            const x = h.filter((u) => h.every((b) => !yt(u, b, l)));
            return [Number(p), x];
          })
          .forEach(([p, h]) => {
            h.forEach((x) => {
              i.push(N`<circle cx="${p}" cy="${x}" fill="${n}" r="${l / sr}">`);
            });
          }),
        Object.entries(g)
          .filter(([p, h]) => h.length > 1)
          .map(([p, h]) => {
            const x = h.filter((u) => h.some((b) => yt(u, b, l)));
            return [Number(p), x];
          })
          .map(([p, h]) => {
            h.sort((u, b) => (u < b ? -1 : 1));
            const x = [];
            for (const u of h) {
              const b = x.find((v) => v.some((w) => yt(u, w, l)));
              b ? b.push(u) : x.push([u]);
            }
            return [p, x.map((u) => [u[0], u[u.length - 1]])];
          })
          .forEach(([p, h]) => {
            h.forEach(([x, u]) => {
              i.push(
                N`<line x1="${p}" x2="${p}" y1="${x}" y2="${u}" stroke="${n}" stroke-width="${
                  l / (sr / 2)
                }" stroke-linecap="round">`,
              );
            });
          }),
        i
      );
    },
  },
  ci = R`@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}div{position:relative;user-select:none;display:block;overflow:hidden;aspect-ratio:1/1;animation:fadeIn ease .2s}.wcm-dark{background-color:#fff;border-radius:var(--wcm-container-border-radius);padding:18px;box-shadow:0 2px 5px #000}svg:first-child,wcm-wallet-image{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{width:25%;height:25%;border-radius:var(--wcm-wallet-icon-border-radius)}svg:first-child{transform:translateY(-50%) translateX(-50%) scale(.9)}svg:first-child path:first-child{fill:var(--wcm-accent-color)}svg:first-child path:last-child{stroke:var(--wcm-color-overlay)}`;
var di = Object.defineProperty,
  ui = Object.getOwnPropertyDescriptor,
  he = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? ui(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && di(t, o, r), r;
  };
let J = class extends A {
  constructor() {
    super(...arguments),
      (this.uri = ""),
      (this.size = 0),
      (this.imageId = void 0),
      (this.walletId = void 0),
      (this.imageUrl = void 0);
  }
  svgTemplate() {
    const e = be.state.themeMode === "light" ? this.size : this.size - 36;
    return N`<svg height="${e}" width="${e}">${si.generate(
      this.uri,
      e,
      e / 4,
    )}</svg>`;
  }
  render() {
    const e = { "wcm-dark": be.state.themeMode === "dark" };
    return d`<div style="${`width: ${this.size}px`}" class="${G(e)}">${
      this.walletId || this.imageUrl
        ? d`<wcm-wallet-image walletId="${D(this.walletId)}" imageId="${D(
            this.imageId,
          )}" imageUrl="${D(this.imageUrl)}"></wcm-wallet-image>`
        : L.WALLET_CONNECT_ICON_COLORED
    } ${this.svgTemplate()}</div>`;
  }
};
(J.styles = [I.globalCss, ci]),
  he([C()], J.prototype, "uri", 2),
  he([C({ type: Number })], J.prototype, "size", 2),
  he([C()], J.prototype, "imageId", 2),
  he([C()], J.prototype, "walletId", 2),
  he([C()], J.prototype, "imageUrl", 2),
  (J = he([O("wcm-qrcode")], J));
const hi = R`:host{position:relative;height:28px;width:80%}input{width:100%;height:100%;line-height:28px!important;border-radius:var(--wcm-input-border-radius);font-style:normal;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;font-feature-settings:'case' on;font-weight:500;font-size:16px;letter-spacing:-.03em;padding:0 10px 0 34px;transition:.2s all ease;color:var(--wcm-color-fg-1);background-color:var(--wcm-color-bg-3);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay);caret-color:var(--wcm-accent-color)}input::placeholder{color:var(--wcm-color-fg-2)}svg{left:10px;top:4px;pointer-events:none;position:absolute;width:20px;height:20px}input:focus-within{box-shadow:inset 0 0 0 1px var(--wcm-accent-color)}path{fill:var(--wcm-color-fg-2)}`;
var mi = Object.defineProperty,
  gi = Object.getOwnPropertyDescriptor,
  cr = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? gi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && mi(t, o, r), r;
  };
let ze = class extends A {
  constructor() {
    super(...arguments), (this.onChange = () => null);
  }
  render() {
    return d`<input type="text" @input="${this.onChange}" placeholder="Search wallets"> ${L.SEARCH_ICON}`;
  }
};
(ze.styles = [I.globalCss, hi]),
  cr([C()], ze.prototype, "onChange", 2),
  (ze = cr([O("wcm-search-input")], ze));
const fi = R`@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}svg{animation:rotate 2s linear infinite;display:flex;justify-content:center;align-items:center}svg circle{stroke-linecap:round;animation:dash 1.5s ease infinite;stroke:var(--wcm-accent-color)}`;
var wi = Object.defineProperty,
  pi = Object.getOwnPropertyDescriptor,
  vi = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? pi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && wi(t, o, r), r;
  };
let xt = class extends A {
  render() {
    return d`<svg viewBox="0 0 50 50" width="24" height="24"><circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#fff"/></svg>`;
  }
};
(xt.styles = [I.globalCss, fi]), (xt = vi([O("wcm-spinner")], xt));
const bi = R`span{font-style:normal;font-family:var(--wcm-font-family);font-feature-settings:var(--wcm-font-feature-settings)}.wcm-xsmall-bold{font-family:var(--wcm-text-xsmall-bold-font-family);font-weight:var(--wcm-text-xsmall-bold-weight);font-size:var(--wcm-text-xsmall-bold-size);line-height:var(--wcm-text-xsmall-bold-line-height);letter-spacing:var(--wcm-text-xsmall-bold-letter-spacing);text-transform:var(--wcm-text-xsmall-bold-text-transform)}.wcm-xsmall-regular{font-family:var(--wcm-text-xsmall-regular-font-family);font-weight:var(--wcm-text-xsmall-regular-weight);font-size:var(--wcm-text-xsmall-regular-size);line-height:var(--wcm-text-xsmall-regular-line-height);letter-spacing:var(--wcm-text-xsmall-regular-letter-spacing);text-transform:var(--wcm-text-xsmall-regular-text-transform)}.wcm-small-thin{font-family:var(--wcm-text-small-thin-font-family);font-weight:var(--wcm-text-small-thin-weight);font-size:var(--wcm-text-small-thin-size);line-height:var(--wcm-text-small-thin-line-height);letter-spacing:var(--wcm-text-small-thin-letter-spacing);text-transform:var(--wcm-text-small-thin-text-transform)}.wcm-small-regular{font-family:var(--wcm-text-small-regular-font-family);font-weight:var(--wcm-text-small-regular-weight);font-size:var(--wcm-text-small-regular-size);line-height:var(--wcm-text-small-regular-line-height);letter-spacing:var(--wcm-text-small-regular-letter-spacing);text-transform:var(--wcm-text-small-regular-text-transform)}.wcm-medium-regular{font-family:var(--wcm-text-medium-regular-font-family);font-weight:var(--wcm-text-medium-regular-weight);font-size:var(--wcm-text-medium-regular-size);line-height:var(--wcm-text-medium-regular-line-height);letter-spacing:var(--wcm-text-medium-regular-letter-spacing);text-transform:var(--wcm-text-medium-regular-text-transform)}.wcm-big-bold{font-family:var(--wcm-text-big-bold-font-family);font-weight:var(--wcm-text-big-bold-weight);font-size:var(--wcm-text-big-bold-size);line-height:var(--wcm-text-big-bold-line-height);letter-spacing:var(--wcm-text-big-bold-letter-spacing);text-transform:var(--wcm-text-big-bold-text-transform)}:host(*){color:var(--wcm-color-fg-1)}.wcm-color-primary{color:var(--wcm-color-fg-1)}.wcm-color-secondary{color:var(--wcm-color-fg-2)}.wcm-color-tertiary{color:var(--wcm-color-fg-3)}.wcm-color-inverse{color:var(--wcm-accent-fill-color)}.wcm-color-accnt{color:var(--wcm-accent-color)}.wcm-color-error{color:var(--wcm-error-color)}`;
var yi = Object.defineProperty,
  xi = Object.getOwnPropertyDescriptor,
  Ct = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? xi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && yi(t, o, r), r;
  };
let ke = class extends A {
  constructor() {
    super(...arguments),
      (this.variant = "medium-regular"),
      (this.color = "primary");
  }
  render() {
    const e = {
      "wcm-big-bold": this.variant === "big-bold",
      "wcm-medium-regular": this.variant === "medium-regular",
      "wcm-small-regular": this.variant === "small-regular",
      "wcm-small-thin": this.variant === "small-thin",
      "wcm-xsmall-regular": this.variant === "xsmall-regular",
      "wcm-xsmall-bold": this.variant === "xsmall-bold",
      "wcm-color-primary": this.color === "primary",
      "wcm-color-secondary": this.color === "secondary",
      "wcm-color-tertiary": this.color === "tertiary",
      "wcm-color-inverse": this.color === "inverse",
      "wcm-color-accnt": this.color === "accent",
      "wcm-color-error": this.color === "error",
    };
    return d`<span><slot class="${G(e)}"></slot></span>`;
  }
};
(ke.styles = [I.globalCss, bi]),
  Ct([C()], ke.prototype, "variant", 2),
  Ct([C()], ke.prototype, "color", 2),
  (ke = Ct([O("wcm-text")], ke));
const Ci = R`button{width:100%;height:100%;border-radius:var(--wcm-button-hover-highlight-border-radius);display:flex;align-items:flex-start}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}button>div{width:80px;padding:5px 0;display:flex;flex-direction:column;align-items:center}wcm-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}wcm-wallet-image{height:60px;width:60px;transition:all .2s ease;border-radius:var(--wcm-wallet-icon-border-radius);margin-bottom:5px}.wcm-sublabel{margin-top:2px}`;
var Ei = Object.defineProperty,
  $i = Object.getOwnPropertyDescriptor,
  X = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? $i(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Ei(t, o, r), r;
  };
let V = class extends A {
  constructor() {
    super(...arguments),
      (this.onClick = () => null),
      (this.name = ""),
      (this.walletId = ""),
      (this.label = void 0),
      (this.imageId = void 0),
      (this.installed = !1),
      (this.recent = !1);
  }
  sublabelTemplate() {
    return this.recent
      ? d`<wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">RECENT</wcm-text>`
      : this.installed
      ? d`<wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">INSTALLED</wcm-text>`
      : null;
  }
  handleClick() {
    Hr.click({ name: "WALLET_BUTTON", walletId: this.walletId }),
      this.onClick();
  }
  render() {
    var e;
    return d`<button @click="${this.handleClick.bind(
      this,
    )}"><div><wcm-wallet-image walletId="${this.walletId}" imageId="${D(
      this.imageId,
    )}"></wcm-wallet-image><wcm-text variant="xsmall-regular">${
      (e = this.label) != null ? e : y.getWalletName(this.name, !0)
    }</wcm-text>${this.sublabelTemplate()}</div></button>`;
  }
};
(V.styles = [I.globalCss, Ci]),
  X([C()], V.prototype, "onClick", 2),
  X([C()], V.prototype, "name", 2),
  X([C()], V.prototype, "walletId", 2),
  X([C()], V.prototype, "label", 2),
  X([C()], V.prototype, "imageId", 2),
  X([C({ type: Boolean })], V.prototype, "installed", 2),
  X([C({ type: Boolean })], V.prototype, "recent", 2),
  (V = X([O("wcm-wallet-button")], V));
const Ii = R`:host{display:block}div{overflow:hidden;position:relative;border-radius:inherit;width:100%;height:100%;background-color:var(--wcm-color-overlay)}svg{position:relative;width:100%;height:100%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:inherit;border:1px solid var(--wcm-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
var Ai = Object.defineProperty,
  Oi = Object.getOwnPropertyDescriptor,
  He = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Oi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Ai(t, o, r), r;
  };
let me = class extends A {
  constructor() {
    super(...arguments),
      (this.walletId = ""),
      (this.imageId = void 0),
      (this.imageUrl = void 0);
  }
  render() {
    var e;
    const t =
      (e = this.imageUrl) != null && e.length
        ? this.imageUrl
        : y.getWalletIcon({ id: this.walletId, image_id: this.imageId });
    return d`${
      t.length
        ? d`<div><img crossorigin="anonymous" src="${t}" alt="${this.id}"></div>`
        : L.WALLET_PLACEHOLDER
    }`;
  }
};
(me.styles = [I.globalCss, Ii]),
  He([C()], me.prototype, "walletId", 2),
  He([C()], me.prototype, "imageId", 2),
  He([C()], me.prototype, "imageUrl", 2),
  (me = He([O("wcm-wallet-image")], me));
var ki = Object.defineProperty,
  Ti = Object.getOwnPropertyDescriptor,
  dr = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Ti(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ki(t, o, r), r;
  };
let Et = class extends A {
  constructor() {
    super(), (this.preload = !0), this.preloadData();
  }
  async loadImages(e) {
    try {
      e != null &&
        e.length &&
        (await Promise.all(e.map(async (t) => y.preloadImage(t))));
    } catch {
      console.info("Unsuccessful attempt at preloading some images", e);
    }
  }
  async preloadListings() {
    if (de.state.enableExplorer) {
      await _.getRecomendedWallets(), K.setIsDataLoaded(!0);
      const { recomendedWallets: e } = _.state,
        t = e.map((o) => y.getWalletIcon(o));
      await this.loadImages(t);
    } else K.setIsDataLoaded(!0);
  }
  async preloadCustomImages() {
    const e = y.getCustomImageUrls();
    await this.loadImages(e);
  }
  async preloadData() {
    try {
      this.preload &&
        ((this.preload = !1),
        await Promise.all([
          this.preloadListings(),
          this.preloadCustomImages(),
        ]));
    } catch (e) {
      console.error(e), te.openToast("Failed preloading", "error");
    }
  }
};
dr([W()], Et.prototype, "preload", 2),
  (Et = dr([O("wcm-explorer-context")], Et));
var Mi = Object.defineProperty,
  Pi = Object.getOwnPropertyDescriptor,
  Ri = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Pi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Mi(t, o, r), r;
  };
let ur = class extends A {
  constructor() {
    super(),
      (this.unsubscribeTheme = void 0),
      I.setTheme(),
      (this.unsubscribeTheme = be.subscribe(I.setTheme));
  }
  disconnectedCallback() {
    var e;
    (e = this.unsubscribeTheme) == null || e.call(this);
  }
};
ur = Ri([O("wcm-theme-context")], ur);
const Li = R`@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(calc(-70px * 9),0,0)}}.wcm-slider{position:relative;overflow-x:hidden;padding:10px 0;margin:0 -20px;width:calc(100% + 40px)}.wcm-track{display:flex;width:calc(70px * 18);animation:scroll 20s linear infinite;opacity:.7}.wcm-track svg{margin:0 5px}wcm-wallet-image{width:60px;height:60px;margin:0 5px;border-radius:var(--wcm-wallet-icon-border-radius)}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-title{display:flex;align-items:center;margin-bottom:10px}.wcm-title svg{margin-right:6px}.wcm-title path{fill:var(--wcm-accent-color)}wcm-modal-footer .wcm-title{padding:0 10px}wcm-button-big{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);filter:drop-shadow(0 0 17px var(--wcm-color-bg-1))}wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-info-footer wcm-text{text-align:center;margin-bottom:15px}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
var Bi = Object.defineProperty,
  Ni = Object.getOwnPropertyDescriptor,
  Si = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Ni(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Bi(t, o, r), r;
  };
let $t = class extends A {
  onGoToQrcode() {
    S.push("Qrcode");
  }
  render() {
    const { recomendedWallets: e } = _.state,
      t = [...e, ...e],
      o = $.RECOMMENDED_WALLET_AMOUNT * 2;
    return d`<wcm-modal-header title="Connect your wallet" .onAction="${
      this.onGoToQrcode
    }" .actionIcon="${
      L.QRCODE_ICON
    }"></wcm-modal-header><wcm-modal-content><div class="wcm-title">${
      L.MOBILE_ICON
    }<wcm-text variant="small-regular" color="accent">WalletConnect</wcm-text></div><div class="wcm-slider"><div class="wcm-track">${[
      ...Array(o),
    ].map((n, r) => {
      const i = t[r % t.length];
      return i
        ? d`<wcm-wallet-image walletId="${i.id}" imageId="${i.image_id}"></wcm-wallet-image>`
        : L.WALLET_PLACEHOLDER;
    })}</div><wcm-button-big @click="${
      y.handleAndroidLinking
    }"><wcm-text variant="medium-regular" color="inverse">Select Wallet</wcm-text></wcm-button-big></div></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">Choose WalletConnect to see supported apps on your device</wcm-text></wcm-info-footer>`;
  }
};
($t.styles = [I.globalCss, Li]),
  ($t = Si([O("wcm-android-wallet-selection")], $t));
const Di = R`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:2px;top:0;left:0}use{stroke:var(--wcm-accent-color);animation:loading 1s linear infinite}wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:90px;height:90px}wcm-text{margin-bottom:40px}.wcm-error svg{stroke:var(--wcm-error-color)}.wcm-error use{display:none}.wcm-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}.wcm-stale svg,.wcm-stale use{display:none}`;
var _i = Object.defineProperty,
  Wi = Object.getOwnPropertyDescriptor,
  ge = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Wi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && _i(t, o, r), r;
  };
let ee = class extends A {
  constructor() {
    super(...arguments),
      (this.walletId = void 0),
      (this.imageId = void 0),
      (this.isError = !1),
      (this.isStale = !1),
      (this.label = "");
  }
  svgLoaderTemplate() {
    var e, t;
    const o =
      (t =
        (e = be.state.themeVariables) == null
          ? void 0
          : e["--wcm-wallet-icon-large-border-radius"]) != null
        ? t
        : I.getPreset("--wcm-wallet-icon-large-border-radius");
    let n = 0;
    o.includes("%")
      ? (n = (88 / 100) * parseInt(o, 10))
      : (n = parseInt(o, 10)),
      (n *= 1.17);
    const r = 317 - n * 1.57,
      i = 425 - n * 1.8;
    return d`<svg viewBox="0 0 110 110" width="110" height="110"><rect id="wcm-loader" x="2" y="2" width="106" height="106" rx="${n}"/><use xlink:href="#wcm-loader" stroke-dasharray="106 ${r}" stroke-dashoffset="${i}"></use></svg>`;
  }
  render() {
    const e = { "wcm-error": this.isError, "wcm-stale": this.isStale };
    return d`<div class="${G(
      e,
    )}">${this.svgLoaderTemplate()}<wcm-wallet-image walletId="${D(
      this.walletId,
    )}" imageId="${D(
      this.imageId,
    )}"></wcm-wallet-image></div><wcm-text variant="medium-regular" color="${
      this.isError ? "error" : "primary"
    }">${this.isError ? "Connection declined" : this.label}</wcm-text>`;
  }
};
(ee.styles = [I.globalCss, Di]),
  ge([C()], ee.prototype, "walletId", 2),
  ge([C()], ee.prototype, "imageId", 2),
  ge([C({ type: Boolean })], ee.prototype, "isError", 2),
  ge([C({ type: Boolean })], ee.prototype, "isStale", 2),
  ge([C()], ee.prototype, "label", 2),
  (ee = ge([O("wcm-connector-waiting")], ee));
const ve = {
    manualWallets() {
      var e, t;
      const { mobileWallets: o, desktopWallets: n } = de.state,
        r = (e = ve.recentWallet()) == null ? void 0 : e.id,
        i = $.isMobile() ? o : n,
        a = i == null ? void 0 : i.filter((l) => r !== l.id);
      return (t = $.isMobile()
        ? a == null
          ? void 0
          : a.map(({ id: l, name: s, links: c }) => ({
              id: l,
              name: s,
              mobile: c,
              links: c,
            }))
        : a == null
        ? void 0
        : a.map(({ id: l, name: s, links: c }) => ({
            id: l,
            name: s,
            desktop: c,
            links: c,
          }))) != null
        ? t
        : [];
    },
    recentWallet() {
      return y.getRecentWallet();
    },
    recomendedWallets(e = !1) {
      var t;
      const o = e || (t = ve.recentWallet()) == null ? void 0 : t.id,
        { recomendedWallets: n } = _.state;
      return n.filter((r) => o !== r.id);
    },
  },
  ne = {
    onConnecting(e) {
      y.goToConnectingView(e);
    },
    manualWalletsTemplate() {
      return ve
        .manualWallets()
        .map(
          (e) =>
            d`<wcm-wallet-button walletId="${e.id}" name="${
              e.name
            }" .onClick="${() => this.onConnecting(e)}"></wcm-wallet-button>`,
        );
    },
    recomendedWalletsTemplate(e = !1) {
      return ve
        .recomendedWallets(e)
        .map(
          (t) =>
            d`<wcm-wallet-button name="${t.name}" walletId="${t.id}" imageId="${
              t.image_id
            }" .onClick="${() => this.onConnecting(t)}"></wcm-wallet-button>`,
        );
    },
    recentWalletTemplate() {
      const e = ve.recentWallet();
      if (e)
        return d`<wcm-wallet-button name="${e.name}" walletId="${
          e.id
        }" imageId="${D(e.image_id)}" .recent="${!0}" .onClick="${() =>
          this.onConnecting(e)}"></wcm-wallet-button>`;
    },
  },
  ji = R`.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-desktop-title,.wcm-mobile-title{display:flex;align-items:center}.wcm-mobile-title{justify-content:space-between;margin-bottom:20px;margin-top:-10px}.wcm-desktop-title{margin-bottom:10px;padding:0 10px}.wcm-subtitle{display:flex;align-items:center}.wcm-subtitle:last-child path{fill:var(--wcm-color-fg-3)}.wcm-desktop-title svg,.wcm-mobile-title svg{margin-right:6px}.wcm-desktop-title path,.wcm-mobile-title path{fill:var(--wcm-accent-color)}`;
var Ui = Object.defineProperty,
  Fi = Object.getOwnPropertyDescriptor,
  zi = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Fi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Ui(t, o, r), r;
  };
let It = class extends A {
  render() {
    const { explorerExcludedWalletIds: e, enableExplorer: t } = de.state,
      o = e !== "ALL" && t,
      n = ne.manualWalletsTemplate(),
      r = ne.recomendedWalletsTemplate();
    let i = [ne.recentWalletTemplate(), ...n, ...r];
    i = i.filter(Boolean);
    const a = i.length > 4 || o;
    let l = [];
    a ? (l = i.slice(0, 3)) : (l = i);
    const s = !!l.length;
    return d`<wcm-modal-header .border="${!0}" title="Connect your wallet" .onAction="${
      y.handleUriCopy
    }" .actionIcon="${
      L.COPY_ICON
    }"></wcm-modal-header><wcm-modal-content><div class="wcm-mobile-title"><div class="wcm-subtitle">${
      L.MOBILE_ICON
    }<wcm-text variant="small-regular" color="accent">Mobile</wcm-text></div><div class="wcm-subtitle">${
      L.SCAN_ICON
    }<wcm-text variant="small-regular" color="secondary">Scan with your wallet</wcm-text></div></div><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>${
      s
        ? d`<wcm-modal-footer><div class="wcm-desktop-title">${
            L.DESKTOP_ICON
          }<wcm-text variant="small-regular" color="accent">Desktop</wcm-text></div><div class="wcm-grid">${l} ${
            a
              ? d`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>`
              : null
          }</div></wcm-modal-footer>`
        : null
    }`;
  }
};
(It.styles = [I.globalCss, ji]),
  (It = zi([O("wcm-desktop-wallet-selection")], It));
const Hi = R`div{background-color:var(--wcm-color-bg-2);padding:10px 20px 15px 20px;border-top:1px solid var(--wcm-color-bg-3);text-align:center}a{color:var(--wcm-accent-color);text-decoration:none;transition:opacity .2s ease-in-out;display:inline}a:active{opacity:.8}@media(hover:hover){a:hover{opacity:.8}}`;
var Zi = Object.defineProperty,
  Vi = Object.getOwnPropertyDescriptor,
  Ki = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Vi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Zi(t, o, r), r;
  };
let At = class extends A {
  render() {
    const { termsOfServiceUrl: e, privacyPolicyUrl: t } = de.state;
    return e ?? t
      ? d`<div><wcm-text variant="small-regular" color="secondary">By connecting your wallet to this app, you agree to the app's ${
          e
            ? d`<a href="${e}" target="_blank" rel="noopener noreferrer">Terms of Service</a>`
            : null
        } ${e && t ? "and" : null} ${
          t
            ? d`<a href="${t}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>`
            : null
        }</wcm-text></div>`
      : null;
  }
};
(At.styles = [I.globalCss, Hi]), (At = Ki([O("wcm-legal-notice")], At));
const qi = R`div{display:grid;grid-template-columns:repeat(4,80px);margin:0 -10px;justify-content:space-between;row-gap:10px}`;
var Yi = Object.defineProperty,
  Gi = Object.getOwnPropertyDescriptor,
  Qi = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Gi(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Yi(t, o, r), r;
  };
let Ot = class extends A {
  onQrcode() {
    S.push("Qrcode");
  }
  render() {
    const { explorerExcludedWalletIds: e, enableExplorer: t } = de.state,
      o = e !== "ALL" && t,
      n = ne.manualWalletsTemplate(),
      r = ne.recomendedWalletsTemplate();
    let i = [ne.recentWalletTemplate(), ...n, ...r];
    i = i.filter(Boolean);
    const a = i.length > 8 || o;
    let l = [];
    a ? (l = i.slice(0, 7)) : (l = i);
    const s = !!l.length;
    return d`<wcm-modal-header title="Connect your wallet" .onAction="${
      this.onQrcode
    }" .actionIcon="${L.QRCODE_ICON}"></wcm-modal-header>${
      s
        ? d`<wcm-modal-content><div>${l} ${
            a
              ? d`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>`
              : null
          }</div></wcm-modal-content>`
        : null
    }`;
  }
};
(Ot.styles = [I.globalCss, qi]),
  (Ot = Qi([O("wcm-mobile-wallet-selection")], Ot));
const Ji = R`:host{all:initial}.wcm-overlay{top:0;bottom:0;left:0;right:0;position:fixed;z-index:var(--wcm-z-index);overflow:hidden;display:flex;justify-content:center;align-items:center;opacity:0;pointer-events:none;background-color:var(--wcm-overlay-background-color);backdrop-filter:var(--wcm-overlay-backdrop-filter)}@media(max-height:720px) and (orientation:landscape){.wcm-overlay{overflow:scroll;align-items:flex-start;padding:20px 0}}.wcm-active{pointer-events:auto}.wcm-container{position:relative;max-width:360px;width:100%;outline:0;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) var(--wcm-container-border-radius) var(--wcm-container-border-radius);border:1px solid var(--wcm-color-overlay);overflow:hidden}.wcm-card{width:100%;position:relative;border-radius:var(--wcm-container-border-radius);overflow:hidden;box-shadow:0 6px 14px -6px rgba(10,16,31,.12),0 10px 32px -4px rgba(10,16,31,.1),0 0 0 1px var(--wcm-color-overlay);background-color:var(--wcm-color-bg-1);color:var(--wcm-color-fg-1)}@media(max-width:600px){.wcm-container{max-width:440px;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) 0 0}.wcm-card{border-radius:var(--wcm-container-border-radius) var(--wcm-container-border-radius) 0 0}.wcm-overlay{align-items:flex-end}}@media(max-width:440px){.wcm-container{border:0}}`;
var Xi = Object.defineProperty,
  ea = Object.getOwnPropertyDescriptor,
  kt = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? ea(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Xi(t, o, r), r;
  };
let Te = class extends A {
  constructor() {
    super(),
      (this.open = !1),
      (this.active = !1),
      (this.unsubscribeModal = void 0),
      (this.abortController = void 0),
      (this.unsubscribeModal = Ye.subscribe((e) => {
        e.open ? this.onOpenModalEvent() : this.onCloseModalEvent();
      }));
  }
  disconnectedCallback() {
    var e;
    (e = this.unsubscribeModal) == null || e.call(this);
  }
  get overlayEl() {
    return y.getShadowRootElement(this, ".wcm-overlay");
  }
  get containerEl() {
    return y.getShadowRootElement(this, ".wcm-container");
  }
  toggleBodyScroll(e) {
    if (document.querySelector("body"))
      if (e) {
        const t = document.getElementById("wcm-styles");
        t == null || t.remove();
      } else
        document.head.insertAdjacentHTML(
          "beforeend",
          '<style id="wcm-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>',
        );
  }
  onCloseModal(e) {
    e.target === e.currentTarget && Ye.close();
  }
  onOpenModalEvent() {
    this.toggleBodyScroll(!1),
      this.addKeyboardEvents(),
      (this.open = !0),
      setTimeout(async () => {
        const e = y.isMobileAnimation()
            ? { y: ["50vh", "0vh"] }
            : { scale: [0.98, 1] },
          t = 0.1,
          o = 0.2;
        await Promise.all([
          ce(this.overlayEl, { opacity: [0, 1] }, { delay: t, duration: o })
            .finished,
          ce(this.containerEl, e, { delay: t, duration: o }).finished,
        ]),
          (this.active = !0);
      }, 0);
  }
  async onCloseModalEvent() {
    this.toggleBodyScroll(!0), this.removeKeyboardEvents();
    const e = y.isMobileAnimation()
        ? { y: ["0vh", "50vh"] }
        : { scale: [1, 0.98] },
      t = 0.2;
    await Promise.all([
      ce(this.overlayEl, { opacity: [1, 0] }, { duration: t }).finished,
      ce(this.containerEl, e, { duration: t }).finished,
    ]),
      this.containerEl.removeAttribute("style"),
      (this.active = !1),
      (this.open = !1);
  }
  addKeyboardEvents() {
    (this.abortController = new AbortController()),
      window.addEventListener(
        "keydown",
        (e) => {
          var t;
          e.key === "Escape"
            ? Ye.close()
            : e.key === "Tab" &&
              (((t = e.target) != null && t.tagName.includes("wcm-")) ||
                this.containerEl.focus());
        },
        this.abortController,
      ),
      this.containerEl.focus();
  }
  removeKeyboardEvents() {
    var e;
    (e = this.abortController) == null || e.abort(),
      (this.abortController = void 0);
  }
  render() {
    const e = { "wcm-overlay": !0, "wcm-active": this.active };
    return d`<wcm-explorer-context></wcm-explorer-context><wcm-theme-context></wcm-theme-context><div id="wcm-modal" class="${G(
      e,
    )}" @click="${
      this.onCloseModal
    }" role="alertdialog" aria-modal="true"><div class="wcm-container" tabindex="0">${
      this.open
        ? d`<wcm-modal-backcard></wcm-modal-backcard><div class="wcm-card"><wcm-modal-router></wcm-modal-router><wcm-modal-toast></wcm-modal-toast></div>`
        : null
    }</div></div>`;
  }
};
(Te.styles = [I.globalCss, Ji]),
  kt([W()], Te.prototype, "open", 2),
  kt([W()], Te.prototype, "active", 2),
  (Te = kt([O("wcm-modal")], Te));
const ta = R`div{display:flex;margin-top:15px}slot{display:inline-block;margin:0 5px}wcm-button{margin:0 5px}`;
var ra = Object.defineProperty,
  oa = Object.getOwnPropertyDescriptor,
  Me = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? oa(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ra(t, o, r), r;
  };
let le = class extends A {
  constructor() {
    super(...arguments),
      (this.isMobile = !1),
      (this.isDesktop = !1),
      (this.isWeb = !1),
      (this.isRetry = !1);
  }
  onMobile() {
    $.isMobile()
      ? S.replace("MobileConnecting")
      : S.replace("MobileQrcodeConnecting");
  }
  onDesktop() {
    S.replace("DesktopConnecting");
  }
  onWeb() {
    S.replace("WebConnecting");
  }
  render() {
    return d`<div>${this.isRetry ? d`<slot></slot>` : null} ${
      this.isMobile
        ? d`<wcm-button .onClick="${this.onMobile}" .iconLeft="${L.MOBILE_ICON}" variant="outline">Mobile</wcm-button>`
        : null
    } ${
      this.isDesktop
        ? d`<wcm-button .onClick="${this.onDesktop}" .iconLeft="${L.DESKTOP_ICON}" variant="outline">Desktop</wcm-button>`
        : null
    } ${
      this.isWeb
        ? d`<wcm-button .onClick="${this.onWeb}" .iconLeft="${L.GLOBE_ICON}" variant="outline">Web</wcm-button>`
        : null
    }</div>`;
  }
};
(le.styles = [I.globalCss, ta]),
  Me([C({ type: Boolean })], le.prototype, "isMobile", 2),
  Me([C({ type: Boolean })], le.prototype, "isDesktop", 2),
  Me([C({ type: Boolean })], le.prototype, "isWeb", 2),
  Me([C({ type: Boolean })], le.prototype, "isRetry", 2),
  (le = Me([O("wcm-platform-selection")], le));
const na = R`button{display:flex;flex-direction:column;padding:5px 10px;border-radius:var(--wcm-button-hover-highlight-border-radius);height:100%;justify-content:flex-start}.wcm-icons{width:60px;height:60px;display:flex;flex-wrap:wrap;padding:7px;border-radius:var(--wcm-wallet-icon-border-radius);justify-content:space-between;align-items:center;margin-bottom:5px;background-color:var(--wcm-color-bg-2);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}.wcm-icons img{width:21px;height:21px;object-fit:cover;object-position:center;border-radius:calc(var(--wcm-wallet-icon-border-radius)/ 2);border:1px solid var(--wcm-color-overlay)}.wcm-icons svg{width:21px;height:21px}.wcm-icons img:nth-child(1),.wcm-icons img:nth-child(2),.wcm-icons svg:nth-child(1),.wcm-icons svg:nth-child(2){margin-bottom:4px}wcm-text{width:100%;text-align:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
var ia = Object.defineProperty,
  aa = Object.getOwnPropertyDescriptor,
  la = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? aa(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ia(t, o, r), r;
  };
let Tt = class extends A {
  onClick() {
    S.push("WalletExplorer");
  }
  render() {
    const { recomendedWallets: e } = _.state,
      t = ve.manualWallets(),
      o = [...e, ...t].reverse().slice(0, 4);
    return d`<button @click="${this.onClick}"><div class="wcm-icons">${o.map(
      (n) => {
        const r = y.getWalletIcon(n);
        if (r) return d`<img crossorigin="anonymous" src="${r}">`;
        const i = y.getWalletIcon({ id: n.id });
        return i
          ? d`<img crossorigin="anonymous" src="${i}">`
          : L.WALLET_PLACEHOLDER;
      },
    )} ${[...Array(4 - o.length)].map(
      () => L.WALLET_PLACEHOLDER,
    )}</div><wcm-text variant="xsmall-regular">View All</wcm-text></button>`;
  }
};
(Tt.styles = [I.globalCss, na]),
  (Tt = la([O("wcm-view-all-wallets-button")], Tt));
const sa = R`.wcm-qr-container{width:100%;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1}`;
var ca = Object.defineProperty,
  da = Object.getOwnPropertyDescriptor,
  Ze = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? da(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ca(t, o, r), r;
  };
let fe = class extends A {
  constructor() {
    super(),
      (this.walletId = ""),
      (this.imageId = ""),
      (this.uri = ""),
      setTimeout(() => {
        const { walletConnectUri: e } = K.state;
        this.uri = e;
      }, 0);
  }
  get overlayEl() {
    return y.getShadowRootElement(this, ".wcm-qr-container");
  }
  render() {
    return d`<div class="wcm-qr-container">${
      this.uri
        ? d`<wcm-qrcode size="${this.overlayEl.offsetWidth}" uri="${
            this.uri
          }" walletId="${D(this.walletId)}" imageId="${D(
            this.imageId,
          )}"></wcm-qrcode>`
        : d`<wcm-spinner></wcm-spinner>`
    }</div>`;
  }
};
(fe.styles = [I.globalCss, sa]),
  Ze([C()], fe.prototype, "walletId", 2),
  Ze([C()], fe.prototype, "imageId", 2),
  Ze([W()], fe.prototype, "uri", 2),
  (fe = Ze([O("wcm-walletconnect-qr")], fe));
var ua = Object.defineProperty,
  ha = Object.getOwnPropertyDescriptor,
  ma = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? ha(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ua(t, o, r), r;
  };
let Mt = class extends A {
  viewTemplate() {
    return $.isAndroid()
      ? d`<wcm-android-wallet-selection></wcm-android-wallet-selection>`
      : $.isMobile()
      ? d`<wcm-mobile-wallet-selection></wcm-mobile-wallet-selection>`
      : d`<wcm-desktop-wallet-selection></wcm-desktop-wallet-selection>`;
  }
  render() {
    return d`${this.viewTemplate()}<wcm-legal-notice></wcm-legal-notice>`;
  }
};
(Mt.styles = [I.globalCss]), (Mt = ma([O("wcm-connect-wallet-view")], Mt));
const ga = R`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
var fa = Object.defineProperty,
  wa = Object.getOwnPropertyDescriptor,
  hr = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? wa(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && fa(t, o, r), r;
  };
let Ve = class extends A {
  constructor() {
    super(), (this.isError = !1), this.openDesktopApp();
  }
  onFormatAndRedirect(e) {
    const { desktop: t, name: o } = $.getWalletRouterData(),
      n = t == null ? void 0 : t.native;
    if (n) {
      const r = $.formatNativeUrl(n, e, o);
      $.openHref(r, "_self");
    }
  }
  openDesktopApp() {
    const { walletConnectUri: e } = K.state,
      t = $.getWalletRouterData();
    y.setRecentWallet(t), e && this.onFormatAndRedirect(e);
  }
  render() {
    const { name: e, id: t, image_id: o } = $.getWalletRouterData(),
      { isMobile: n, isWeb: r } = y.getCachedRouterWalletPlatforms();
    return d`<wcm-modal-header title="${e}" .onAction="${
      y.handleUriCopy
    }" .actionIcon="${
      L.COPY_ICON
    }"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${t}" imageId="${D(
      o,
    )}" label="${`Continue in ${e}...`}" .isError="${
      this.isError
    }"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Connection can continue loading if ${e} is not installed on your device`}</wcm-text><wcm-platform-selection .isMobile="${n}" .isWeb="${r}" .isRetry="${!0}"><wcm-button .onClick="${this.openDesktopApp.bind(
      this,
    )}" .iconRight="${
      L.RETRY_ICON
    }">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>`;
  }
};
(Ve.styles = [I.globalCss, ga]),
  hr([W()], Ve.prototype, "isError", 2),
  (Ve = hr([O("wcm-desktop-connecting-view")], Ve));
const pa = R`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}wcm-button{margin-top:15px}`;
var va = Object.defineProperty,
  ba = Object.getOwnPropertyDescriptor,
  ya = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? ba(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && va(t, o, r), r;
  };
let Pt = class extends A {
  onInstall(e) {
    e && $.openHref(e, "_blank");
  }
  render() {
    const {
      name: e,
      id: t,
      image_id: o,
      homepage: n,
    } = $.getWalletRouterData();
    return d`<wcm-modal-header title="${e}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${t}" imageId="${D(
      o,
    )}" label="Not Detected" .isStale="${!0}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Download ${e} to continue. If multiple browser extensions are installed, disable non ${e} ones and try again`}</wcm-text><wcm-button .onClick="${() =>
      this.onInstall(n)}" .iconLeft="${
      L.ARROW_DOWN_ICON
    }">Download</wcm-button></wcm-info-footer>`;
  }
};
(Pt.styles = [I.globalCss, pa]), (Pt = ya([O("wcm-install-wallet-view")], Pt));
const xa = R`wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:96px;height:96px;margin-bottom:20px}wcm-info-footer{display:flex;width:100%}.wcm-app-store{justify-content:space-between}.wcm-app-store wcm-wallet-image{margin-right:10px;margin-bottom:0;width:28px;height:28px;border-radius:var(--wcm-wallet-icon-small-border-radius)}.wcm-app-store div{display:flex;align-items:center}.wcm-app-store wcm-button{margin-right:-10px}.wcm-note{flex-direction:column;align-items:center;padding:5px 0}.wcm-note wcm-text{text-align:center}wcm-platform-selection{margin-top:-15px}.wcm-note wcm-text{margin-top:15px}.wcm-note wcm-text span{color:var(--wcm-accent-color)}`;
var Ca = Object.defineProperty,
  Ea = Object.getOwnPropertyDescriptor,
  mr = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Ea(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Ca(t, o, r), r;
  };
let Ke = class extends A {
  constructor() {
    super(), (this.isError = !1), this.openMobileApp();
  }
  onFormatAndRedirect(e, t = !1) {
    const { mobile: o, name: n } = $.getWalletRouterData(),
      r = o == null ? void 0 : o.native,
      i = o == null ? void 0 : o.universal;
    if (r && !t) {
      const a = $.formatNativeUrl(r, e, n);
      $.openHref(a, "_self");
    } else if (i) {
      const a = $.formatUniversalUrl(i, e, n);
      $.openHref(a, "_self");
    }
  }
  openMobileApp(e = !1) {
    const { walletConnectUri: t } = K.state,
      o = $.getWalletRouterData();
    y.setRecentWallet(o), t && this.onFormatAndRedirect(t, e);
  }
  onGoToAppStore(e) {
    e && $.openHref(e, "_blank");
  }
  render() {
    const {
        name: e,
        id: t,
        image_id: o,
        app: n,
        mobile: r,
      } = $.getWalletRouterData(),
      { isWeb: i } = y.getCachedRouterWalletPlatforms(),
      a = n == null ? void 0 : n.ios,
      l = r == null ? void 0 : r.universal;
    return d`<wcm-modal-header title="${e}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${t}" imageId="${D(
      o,
    )}" label="Tap 'Open' to continue…" .isError="${
      this.isError
    }"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer class="wcm-note"><wcm-platform-selection .isWeb="${i}" .isRetry="${!0}"><wcm-button .onClick="${() =>
      this.openMobileApp(!1)}" .iconRight="${
      L.RETRY_ICON
    }">Retry</wcm-button></wcm-platform-selection>${
      l
        ? d`<wcm-text color="secondary" variant="small-thin">Still doesn't work? <span tabindex="0" @click="${() =>
            this.openMobileApp(!0)}">Try this alternate link</span></wcm-text>`
        : null
    }</wcm-info-footer><wcm-info-footer class="wcm-app-store"><div><wcm-wallet-image walletId="${t}" imageId="${D(
      o,
    )}"></wcm-wallet-image><wcm-text>${`Get ${e}`}</wcm-text></div><wcm-button .iconRight="${
      L.ARROW_RIGHT_ICON
    }" .onClick="${() =>
      this.onGoToAppStore(
        a,
      )}" variant="ghost">App Store</wcm-button></wcm-info-footer>`;
  }
};
(Ke.styles = [I.globalCss, xa]),
  mr([W()], Ke.prototype, "isError", 2),
  (Ke = mr([O("wcm-mobile-connecting-view")], Ke));
const $a = R`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
var Ia = Object.defineProperty,
  Aa = Object.getOwnPropertyDescriptor,
  Oa = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Aa(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Ia(t, o, r), r;
  };
let Rt = class extends A {
  render() {
    const { name: e, id: t, image_id: o } = $.getWalletRouterData(),
      { isDesktop: n, isWeb: r } = y.getCachedRouterWalletPlatforms();
    return d`<wcm-modal-header title="${e}" .onAction="${
      y.handleUriCopy
    }" .actionIcon="${
      L.COPY_ICON
    }"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr walletId="${t}" imageId="${D(
      o,
    )}"></wcm-walletconnect-qr></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Scan this QR Code with your phone's camera or inside ${e} app`}</wcm-text><wcm-platform-selection .isDesktop="${n}" .isWeb="${r}"></wcm-platform-selection></wcm-info-footer>`;
  }
};
(Rt.styles = [I.globalCss, $a]),
  (Rt = Oa([O("wcm-mobile-qr-connecting-view")], Rt));
var ka = Object.defineProperty,
  Ta = Object.getOwnPropertyDescriptor,
  Ma = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Ta(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && ka(t, o, r), r;
  };
let Lt = class extends A {
  render() {
    return d`<wcm-modal-header title="Scan the code" .onAction="${y.handleUriCopy}" .actionIcon="${L.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>`;
  }
};
(Lt.styles = [I.globalCss]), (Lt = Ma([O("wcm-qrcode-view")], Lt));
const Pa = R`wcm-modal-content{height:clamp(200px,60vh,600px);display:block;overflow:scroll;scrollbar-width:none;position:relative;margin-top:1px}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between;margin:-15px -10px;padding-top:20px}wcm-modal-content::after,wcm-modal-content::before{content:'';position:fixed;pointer-events:none;z-index:1;width:100%;height:20px;opacity:1}wcm-modal-content::before{box-shadow:0 -1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(var(--wcm-color-bg-1),rgba(255,255,255,0))}wcm-modal-content::after{box-shadow:0 1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(rgba(255,255,255,0),var(--wcm-color-bg-1));top:calc(100% - 20px)}wcm-modal-content::-webkit-scrollbar{display:none}.wcm-placeholder-block{display:flex;justify-content:center;align-items:center;height:100px;overflow:hidden}.wcm-empty,.wcm-loading{display:flex}.wcm-loading .wcm-placeholder-block{height:100%}.wcm-end-reached .wcm-placeholder-block{height:0;opacity:0}.wcm-empty .wcm-placeholder-block{opacity:1;height:100%}wcm-wallet-button{margin:calc((100% - 60px)/ 3) 0}`;
var Ra = Object.defineProperty,
  La = Object.getOwnPropertyDescriptor,
  Pe = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? La(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Ra(t, o, r), r;
  };
const Bt = 40;
let se = class extends A {
  constructor() {
    super(...arguments),
      (this.loading = !_.state.wallets.listings.length),
      (this.firstFetch = !_.state.wallets.listings.length),
      (this.search = ""),
      (this.endReached = !1),
      (this.intersectionObserver = void 0),
      (this.searchDebounce = y.debounce((e) => {
        e.length >= 1
          ? ((this.firstFetch = !0),
            (this.endReached = !1),
            (this.search = e),
            _.resetSearch(),
            this.fetchWallets())
          : this.search &&
            ((this.search = ""),
            (this.endReached = this.isLastPage()),
            _.resetSearch());
      }));
  }
  firstUpdated() {
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    var e;
    (e = this.intersectionObserver) == null || e.disconnect();
  }
  get placeholderEl() {
    return y.getShadowRootElement(this, ".wcm-placeholder-block");
  }
  createPaginationObserver() {
    (this.intersectionObserver = new IntersectionObserver(([e]) => {
      e.isIntersecting &&
        !(this.search && this.firstFetch) &&
        this.fetchWallets();
    })),
      this.intersectionObserver.observe(this.placeholderEl);
  }
  isLastPage() {
    const { wallets: e, search: t } = _.state,
      { listings: o, total: n } = this.search ? t : e;
    return n <= Bt || o.length >= n;
  }
  async fetchWallets() {
    var e;
    const { wallets: t, search: o } = _.state,
      { listings: n, total: r, page: i } = this.search ? o : t;
    if (!this.endReached && (this.firstFetch || (r > Bt && n.length < r)))
      try {
        this.loading = !0;
        const a = (e = K.state.chains) == null ? void 0 : e.join(","),
          { listings: l } = await _.getWallets({
            page: this.firstFetch ? 1 : i + 1,
            entries: Bt,
            search: this.search,
            version: 2,
            chains: a,
          }),
          s = l.map((c) => y.getWalletIcon(c));
        await Promise.all([
          ...s.map(async (c) => y.preloadImage(c)),
          $.wait(300),
        ]),
          (this.endReached = this.isLastPage());
      } catch (a) {
        console.error(a), te.openToast(y.getErrorMessage(a), "error");
      } finally {
        (this.loading = !1), (this.firstFetch = !1);
      }
  }
  onConnect(e) {
    $.isAndroid() ? y.handleMobileLinking(e) : y.goToConnectingView(e);
  }
  onSearchChange(e) {
    const { value: t } = e.target;
    this.searchDebounce(t);
  }
  render() {
    const { wallets: e, search: t } = _.state,
      { listings: o } = this.search ? t : e,
      n = this.loading && !o.length,
      r = this.search.length >= 3;
    let i = ne.manualWalletsTemplate(),
      a = ne.recomendedWalletsTemplate(!0);
    r &&
      ((i = i.filter(({ values: c }) => y.caseSafeIncludes(c[0], this.search))),
      (a = a.filter(({ values: c }) => y.caseSafeIncludes(c[0], this.search))));
    const l = !this.loading && !o.length && !a.length,
      s = {
        "wcm-loading": n,
        "wcm-end-reached": this.endReached || !this.loading,
        "wcm-empty": l,
      };
    return d`<wcm-modal-header><wcm-search-input .onChange="${this.onSearchChange.bind(
      this,
    )}"></wcm-search-input></wcm-modal-header><wcm-modal-content class="${G(
      s,
    )}"><div class="wcm-grid">${n ? null : i} ${n ? null : a} ${
      n
        ? null
        : o.map(
            (c) =>
              d`${
                c
                  ? d`<wcm-wallet-button imageId="${c.image_id}" name="${
                      c.name
                    }" walletId="${c.id}" .onClick="${() =>
                      this.onConnect(c)}"></wcm-wallet-button>`
                  : null
              }`,
          )
    }</div><div class="wcm-placeholder-block">${
      l
        ? d`<wcm-text variant="big-bold" color="secondary">No results found</wcm-text>`
        : null
    } ${
      !l && this.loading ? d`<wcm-spinner></wcm-spinner>` : null
    }</div></wcm-modal-content>`;
  }
};
(se.styles = [I.globalCss, Pa]),
  Pe([W()], se.prototype, "loading", 2),
  Pe([W()], se.prototype, "firstFetch", 2),
  Pe([W()], se.prototype, "search", 2),
  Pe([W()], se.prototype, "endReached", 2),
  (se = Pe([O("wcm-wallet-explorer-view")], se));
const Ba = R`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
var Na = Object.defineProperty,
  Sa = Object.getOwnPropertyDescriptor,
  gr = (e, t, o, n) => {
    for (
      var r = n > 1 ? void 0 : n ? Sa(t, o) : t, i = e.length - 1, a;
      i >= 0;
      i--
    )
      (a = e[i]) && (r = (n ? a(t, o, r) : a(r)) || r);
    return n && r && Na(t, o, r), r;
  };
let qe = class extends A {
  constructor() {
    super(), (this.isError = !1), this.openWebWallet();
  }
  onFormatAndRedirect(e) {
    const { desktop: t, name: o } = $.getWalletRouterData(),
      n = t == null ? void 0 : t.universal;
    if (n) {
      const r = $.formatUniversalUrl(n, e, o);
      $.openHref(r, "_blank");
    }
  }
  openWebWallet() {
    const { walletConnectUri: e } = K.state,
      t = $.getWalletRouterData();
    y.setRecentWallet(t), e && this.onFormatAndRedirect(e);
  }
  render() {
    const { name: e, id: t, image_id: o } = $.getWalletRouterData(),
      { isMobile: n, isDesktop: r } = y.getCachedRouterWalletPlatforms(),
      i = $.isMobile();
    return d`<wcm-modal-header title="${e}" .onAction="${
      y.handleUriCopy
    }" .actionIcon="${
      L.COPY_ICON
    }"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${t}" imageId="${D(
      o,
    )}" label="${`Continue in ${e}...`}" .isError="${
      this.isError
    }"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`${e} web app has opened in a new tab. Go there, accept the connection, and come back`}</wcm-text><wcm-platform-selection .isMobile="${n}" .isDesktop="${
      i ? !1 : r
    }" .isRetry="${!0}"><wcm-button .onClick="${this.openWebWallet.bind(
      this,
    )}" .iconRight="${
      L.RETRY_ICON
    }">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>`;
  }
};
(qe.styles = [I.globalCss, Ba]),
  gr([W()], qe.prototype, "isError", 2),
  (qe = gr([O("wcm-web-connecting-view")], qe));
export { Te as WcmModal, J as WcmQrCode };
