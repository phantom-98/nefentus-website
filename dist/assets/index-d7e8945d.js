import {
  aa as Ac,
  Z as F,
  ab as us,
  Y as Rr,
  C as I0,
} from "./index-aff6404b.js";
import { e as Tc } from "./events-4ec3c2d6.js";
import { aY as ls, aZ as pt, a_ as x0 } from "./index-c70ad044.js";
function A0(t, e) {
  for (var r = 0; r < e.length; r++) {
    const n = e[r];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const i in n)
        if (i !== "default" && !(i in t)) {
          const s = Object.getOwnPropertyDescriptor(n, i);
          s &&
            Object.defineProperty(
              t,
              i,
              s.get ? s : { enumerable: !0, get: () => n[i] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
  );
}
var Xa = { exports: {} },
  ua,
  Vu;
function T0() {
  if (Vu) return ua;
  Vu = 1;
  var t = 1e3,
    e = t * 60,
    r = e * 60,
    n = r * 24,
    i = n * 7,
    s = n * 365.25;
  ua = function (l, f) {
    f = f || {};
    var h = typeof l;
    if (h === "string" && l.length > 0) return o(l);
    if (h === "number" && isFinite(l)) return f.long ? c(l) : a(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(l),
    );
  };
  function o(l) {
    if (((l = String(l)), !(l.length > 100))) {
      var f =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          l,
        );
      if (f) {
        var h = parseFloat(f[1]),
          b = (f[2] || "ms").toLowerCase();
        switch (b) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * s;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var f = Math.abs(l);
    return f >= n
      ? Math.round(l / n) + "d"
      : f >= r
      ? Math.round(l / r) + "h"
      : f >= e
      ? Math.round(l / e) + "m"
      : f >= t
      ? Math.round(l / t) + "s"
      : l + "ms";
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= n
      ? u(l, f, n, "day")
      : f >= r
      ? u(l, f, r, "hour")
      : f >= e
      ? u(l, f, e, "minute")
      : f >= t
      ? u(l, f, t, "second")
      : l + " ms";
  }
  function u(l, f, h, b) {
    var g = f >= h * 1.5;
    return Math.round(l / h) + " " + b + (g ? "s" : "");
  }
  return ua;
}
function k0(t) {
  (r.debug = r),
    (r.default = r),
    (r.coerce = c),
    (r.disable = s),
    (r.enable = i),
    (r.enabled = o),
    (r.humanize = T0()),
    (r.destroy = u),
    Object.keys(t).forEach((l) => {
      r[l] = t[l];
    }),
    (r.names = []),
    (r.skips = []),
    (r.formatters = {});
  function e(l) {
    let f = 0;
    for (let h = 0; h < l.length; h++)
      (f = (f << 5) - f + l.charCodeAt(h)), (f |= 0);
    return r.colors[Math.abs(f) % r.colors.length];
  }
  r.selectColor = e;
  function r(l) {
    let f,
      h = null,
      b,
      g;
    function y(...S) {
      if (!y.enabled) return;
      const m = y,
        v = Number(new Date()),
        E = v - (f || v);
      (m.diff = E),
        (m.prev = f),
        (m.curr = v),
        (f = v),
        (S[0] = r.coerce(S[0])),
        typeof S[0] != "string" && S.unshift("%O");
      let R = 0;
      (S[0] = S[0].replace(/%([a-zA-Z%])/g, (I, $) => {
        if (I === "%%") return "%";
        R++;
        const L = r.formatters[$];
        if (typeof L == "function") {
          const x = S[R];
          (I = L.call(m, x)), S.splice(R, 1), R--;
        }
        return I;
      })),
        r.formatArgs.call(m, S),
        (m.log || r.log).apply(m, S);
    }
    return (
      (y.namespace = l),
      (y.useColors = r.useColors()),
      (y.color = r.selectColor(l)),
      (y.extend = n),
      (y.destroy = r.destroy),
      Object.defineProperty(y, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () =>
          h !== null
            ? h
            : (b !== r.namespaces && ((b = r.namespaces), (g = r.enabled(l))),
              g),
        set: (S) => {
          h = S;
        },
      }),
      typeof r.init == "function" && r.init(y),
      y
    );
  }
  function n(l, f) {
    const h = r(this.namespace + (typeof f > "u" ? ":" : f) + l);
    return (h.log = this.log), h;
  }
  function i(l) {
    r.save(l), (r.namespaces = l), (r.names = []), (r.skips = []);
    let f;
    const h = (typeof l == "string" ? l : "").split(/[\s,]+/),
      b = h.length;
    for (f = 0; f < b; f++)
      h[f] &&
        ((l = h[f].replace(/\*/g, ".*?")),
        l[0] === "-"
          ? r.skips.push(new RegExp("^" + l.slice(1) + "$"))
          : r.names.push(new RegExp("^" + l + "$")));
  }
  function s() {
    const l = [...r.names.map(a), ...r.skips.map(a).map((f) => "-" + f)].join(
      ",",
    );
    return r.enable(""), l;
  }
  function o(l) {
    if (l[l.length - 1] === "*") return !0;
    let f, h;
    for (f = 0, h = r.skips.length; f < h; f++)
      if (r.skips[f].test(l)) return !1;
    for (f = 0, h = r.names.length; f < h; f++)
      if (r.names[f].test(l)) return !0;
    return !1;
  }
  function a(l) {
    return l
      .toString()
      .substring(2, l.toString().length - 2)
      .replace(/\.\*\?$/, "*");
  }
  function c(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function u() {
    console.warn(
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
    );
  }
  return r.enable(r.load()), r;
}
var O0 = k0;
(function (t, e) {
  (e.formatArgs = n),
    (e.save = i),
    (e.load = s),
    (e.useColors = r),
    (e.storage = o()),
    (e.destroy = (() => {
      let c = !1;
      return () => {
        c ||
          ((c = !0),
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
          ));
      };
    })()),
    (e.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33",
    ]);
  function r() {
    return typeof window < "u" &&
      window.process &&
      (window.process.type === "renderer" || window.process.__nwjs)
      ? !0
      : typeof navigator < "u" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < "u" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < "u" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function n(c) {
    if (
      ((c[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        c[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        t.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    const u = "color: " + this.color;
    c.splice(1, 0, u, "color: inherit");
    let l = 0,
      f = 0;
    c[0].replace(/%[a-zA-Z%]/g, (h) => {
      h !== "%%" && (l++, h === "%c" && (f = l));
    }),
      c.splice(f, 0, u);
  }
  e.log = console.debug || console.log || (() => {});
  function i(c) {
    try {
      c ? e.storage.setItem("debug", c) : e.storage.removeItem("debug");
    } catch {}
  }
  function s() {
    let c;
    try {
      c = e.storage.getItem("debug");
    } catch {}
    return (
      !c &&
        typeof process < "u" &&
        "env" in process &&
        (c = {
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
        }.DEBUG),
      c
    );
  }
  function o() {
    try {
      return localStorage;
    } catch {}
  }
  t.exports = O0(e);
  const { formatters: a } = t.exports;
  a.j = function (c) {
    try {
      return JSON.stringify(c);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(Xa, Xa.exports);
var M0 = Xa.exports,
  la,
  Wu;
function N0() {
  return (
    Wu ||
      ((Wu = 1),
      (la = function (t) {
        t.prototype[Symbol.iterator] = function* () {
          for (let e = this.head; e; e = e.next) yield e.value;
        };
      })),
    la
  );
}
var j0 = ce;
ce.Node = _r;
ce.create = ce;
function ce(t) {
  var e = this;
  if (
    (e instanceof ce || (e = new ce()),
    (e.tail = null),
    (e.head = null),
    (e.length = 0),
    t && typeof t.forEach == "function")
  )
    t.forEach(function (i) {
      e.push(i);
    });
  else if (arguments.length > 0)
    for (var r = 0, n = arguments.length; r < n; r++) e.push(arguments[r]);
  return e;
}
ce.prototype.removeNode = function (t) {
  if (t.list !== this)
    throw new Error("removing node which does not belong to this list");
  var e = t.next,
    r = t.prev;
  return (
    e && (e.prev = r),
    r && (r.next = e),
    t === this.head && (this.head = e),
    t === this.tail && (this.tail = r),
    t.list.length--,
    (t.next = null),
    (t.prev = null),
    (t.list = null),
    e
  );
};
ce.prototype.unshiftNode = function (t) {
  if (t !== this.head) {
    t.list && t.list.removeNode(t);
    var e = this.head;
    (t.list = this),
      (t.next = e),
      e && (e.prev = t),
      (this.head = t),
      this.tail || (this.tail = t),
      this.length++;
  }
};
ce.prototype.pushNode = function (t) {
  if (t !== this.tail) {
    t.list && t.list.removeNode(t);
    var e = this.tail;
    (t.list = this),
      (t.prev = e),
      e && (e.next = t),
      (this.tail = t),
      this.head || (this.head = t),
      this.length++;
  }
};
ce.prototype.push = function () {
  for (var t = 0, e = arguments.length; t < e; t++) P0(this, arguments[t]);
  return this.length;
};
ce.prototype.unshift = function () {
  for (var t = 0, e = arguments.length; t < e; t++) D0(this, arguments[t]);
  return this.length;
};
ce.prototype.pop = function () {
  if (this.tail) {
    var t = this.tail.value;
    return (
      (this.tail = this.tail.prev),
      this.tail ? (this.tail.next = null) : (this.head = null),
      this.length--,
      t
    );
  }
};
ce.prototype.shift = function () {
  if (this.head) {
    var t = this.head.value;
    return (
      (this.head = this.head.next),
      this.head ? (this.head.prev = null) : (this.tail = null),
      this.length--,
      t
    );
  }
};
ce.prototype.forEach = function (t, e) {
  e = e || this;
  for (var r = this.head, n = 0; r !== null; n++)
    t.call(e, r.value, n, this), (r = r.next);
};
ce.prototype.forEachReverse = function (t, e) {
  e = e || this;
  for (var r = this.tail, n = this.length - 1; r !== null; n--)
    t.call(e, r.value, n, this), (r = r.prev);
};
ce.prototype.get = function (t) {
  for (var e = 0, r = this.head; r !== null && e < t; e++) r = r.next;
  if (e === t && r !== null) return r.value;
};
ce.prototype.getReverse = function (t) {
  for (var e = 0, r = this.tail; r !== null && e < t; e++) r = r.prev;
  if (e === t && r !== null) return r.value;
};
ce.prototype.map = function (t, e) {
  e = e || this;
  for (var r = new ce(), n = this.head; n !== null; )
    r.push(t.call(e, n.value, this)), (n = n.next);
  return r;
};
ce.prototype.mapReverse = function (t, e) {
  e = e || this;
  for (var r = new ce(), n = this.tail; n !== null; )
    r.push(t.call(e, n.value, this)), (n = n.prev);
  return r;
};
ce.prototype.reduce = function (t, e) {
  var r,
    n = this.head;
  if (arguments.length > 1) r = e;
  else if (this.head) (n = this.head.next), (r = this.head.value);
  else throw new TypeError("Reduce of empty list with no initial value");
  for (var i = 0; n !== null; i++) (r = t(r, n.value, i)), (n = n.next);
  return r;
};
ce.prototype.reduceReverse = function (t, e) {
  var r,
    n = this.tail;
  if (arguments.length > 1) r = e;
  else if (this.tail) (n = this.tail.prev), (r = this.tail.value);
  else throw new TypeError("Reduce of empty list with no initial value");
  for (var i = this.length - 1; n !== null; i--)
    (r = t(r, n.value, i)), (n = n.prev);
  return r;
};
ce.prototype.toArray = function () {
  for (var t = new Array(this.length), e = 0, r = this.head; r !== null; e++)
    (t[e] = r.value), (r = r.next);
  return t;
};
ce.prototype.toArrayReverse = function () {
  for (var t = new Array(this.length), e = 0, r = this.tail; r !== null; e++)
    (t[e] = r.value), (r = r.prev);
  return t;
};
ce.prototype.slice = function (t, e) {
  (e = e || this.length),
    e < 0 && (e += this.length),
    (t = t || 0),
    t < 0 && (t += this.length);
  var r = new ce();
  if (e < t || e < 0) return r;
  t < 0 && (t = 0), e > this.length && (e = this.length);
  for (var n = 0, i = this.head; i !== null && n < t; n++) i = i.next;
  for (; i !== null && n < e; n++, i = i.next) r.push(i.value);
  return r;
};
ce.prototype.sliceReverse = function (t, e) {
  (e = e || this.length),
    e < 0 && (e += this.length),
    (t = t || 0),
    t < 0 && (t += this.length);
  var r = new ce();
  if (e < t || e < 0) return r;
  t < 0 && (t = 0), e > this.length && (e = this.length);
  for (var n = this.length, i = this.tail; i !== null && n > e; n--) i = i.prev;
  for (; i !== null && n > t; n--, i = i.prev) r.push(i.value);
  return r;
};
ce.prototype.splice = function (t, e, ...r) {
  t > this.length && (t = this.length - 1), t < 0 && (t = this.length + t);
  for (var n = 0, i = this.head; i !== null && n < t; n++) i = i.next;
  for (var s = [], n = 0; i && n < e; n++)
    s.push(i.value), (i = this.removeNode(i));
  i === null && (i = this.tail),
    i !== this.head && i !== this.tail && (i = i.prev);
  for (var n = 0; n < r.length; n++) i = L0(this, i, r[n]);
  return s;
};
ce.prototype.reverse = function () {
  for (var t = this.head, e = this.tail, r = t; r !== null; r = r.prev) {
    var n = r.prev;
    (r.prev = r.next), (r.next = n);
  }
  return (this.head = e), (this.tail = t), this;
};
function L0(t, e, r) {
  var n = e === t.head ? new _r(r, null, e, t) : new _r(r, e, e.next, t);
  return (
    n.next === null && (t.tail = n),
    n.prev === null && (t.head = n),
    t.length++,
    n
  );
}
function P0(t, e) {
  (t.tail = new _r(e, t.tail, null, t)),
    t.head || (t.head = t.tail),
    t.length++;
}
function D0(t, e) {
  (t.head = new _r(e, null, t.head, t)),
    t.tail || (t.tail = t.head),
    t.length++;
}
function _r(t, e, r, n) {
  if (!(this instanceof _r)) return new _r(t, e, r, n);
  (this.list = n),
    (this.value = t),
    e ? ((e.next = this), (this.prev = e)) : (this.prev = null),
    r ? ((r.prev = this), (this.next = r)) : (this.next = null);
}
try {
  N0()(ce);
} catch {}
const $0 = j0,
  lr = Symbol("max"),
  Pt = Symbol("length"),
  Dr = Symbol("lengthCalculator"),
  Dn = Symbol("allowStale"),
  br = Symbol("maxAge"),
  jt = Symbol("dispose"),
  zu = Symbol("noDisposeOnSet"),
  Te = Symbol("lruList"),
  ft = Symbol("cache"),
  lh = Symbol("updateAgeOnGet"),
  fa = () => 1;
class B0 {
  constructor(e) {
    if (
      (typeof e == "number" && (e = { max: e }),
      e || (e = {}),
      e.max && (typeof e.max != "number" || e.max < 0))
    )
      throw new TypeError("max must be a non-negative number");
    this[lr] = e.max || 1 / 0;
    const r = e.length || fa;
    if (
      ((this[Dr] = typeof r != "function" ? fa : r),
      (this[Dn] = e.stale || !1),
      e.maxAge && typeof e.maxAge != "number")
    )
      throw new TypeError("maxAge must be a number");
    (this[br] = e.maxAge || 0),
      (this[jt] = e.dispose),
      (this[zu] = e.noDisposeOnSet || !1),
      (this[lh] = e.updateAgeOnGet || !1),
      this.reset();
  }
  set max(e) {
    if (typeof e != "number" || e < 0)
      throw new TypeError("max must be a non-negative number");
    (this[lr] = e || 1 / 0), kn(this);
  }
  get max() {
    return this[lr];
  }
  set allowStale(e) {
    this[Dn] = !!e;
  }
  get allowStale() {
    return this[Dn];
  }
  set maxAge(e) {
    if (typeof e != "number")
      throw new TypeError("maxAge must be a non-negative number");
    (this[br] = e), kn(this);
  }
  get maxAge() {
    return this[br];
  }
  set lengthCalculator(e) {
    typeof e != "function" && (e = fa),
      e !== this[Dr] &&
        ((this[Dr] = e),
        (this[Pt] = 0),
        this[Te].forEach((r) => {
          (r.length = this[Dr](r.value, r.key)), (this[Pt] += r.length);
        })),
      kn(this);
  }
  get lengthCalculator() {
    return this[Dr];
  }
  get length() {
    return this[Pt];
  }
  get itemCount() {
    return this[Te].length;
  }
  rforEach(e, r) {
    r = r || this;
    for (let n = this[Te].tail; n !== null; ) {
      const i = n.prev;
      Gu(this, e, n, r), (n = i);
    }
  }
  forEach(e, r) {
    r = r || this;
    for (let n = this[Te].head; n !== null; ) {
      const i = n.next;
      Gu(this, e, n, r), (n = i);
    }
  }
  keys() {
    return this[Te].toArray().map((e) => e.key);
  }
  values() {
    return this[Te].toArray().map((e) => e.value);
  }
  reset() {
    this[jt] &&
      this[Te] &&
      this[Te].length &&
      this[Te].forEach((e) => this[jt](e.key, e.value)),
      (this[ft] = new Map()),
      (this[Te] = new $0()),
      (this[Pt] = 0);
  }
  dump() {
    return this[Te].map((e) =>
      qi(this, e) ? !1 : { k: e.key, v: e.value, e: e.now + (e.maxAge || 0) },
    )
      .toArray()
      .filter((e) => e);
  }
  dumpLru() {
    return this[Te];
  }
  set(e, r, n) {
    if (((n = n || this[br]), n && typeof n != "number"))
      throw new TypeError("maxAge must be a number");
    const i = n ? Date.now() : 0,
      s = this[Dr](r, e);
    if (this[ft].has(e)) {
      if (s > this[lr]) return qr(this, this[ft].get(e)), !1;
      const c = this[ft].get(e).value;
      return (
        this[jt] && (this[zu] || this[jt](e, c.value)),
        (c.now = i),
        (c.maxAge = n),
        (c.value = r),
        (this[Pt] += s - c.length),
        (c.length = s),
        this.get(e),
        kn(this),
        !0
      );
    }
    const o = new F0(e, r, s, i, n);
    return o.length > this[lr]
      ? (this[jt] && this[jt](e, r), !1)
      : ((this[Pt] += o.length),
        this[Te].unshift(o),
        this[ft].set(e, this[Te].head),
        kn(this),
        !0);
  }
  has(e) {
    if (!this[ft].has(e)) return !1;
    const r = this[ft].get(e).value;
    return !qi(this, r);
  }
  get(e) {
    return ha(this, e, !0);
  }
  peek(e) {
    return ha(this, e, !1);
  }
  pop() {
    const e = this[Te].tail;
    return e ? (qr(this, e), e.value) : null;
  }
  del(e) {
    qr(this, this[ft].get(e));
  }
  load(e) {
    this.reset();
    const r = Date.now();
    for (let n = e.length - 1; n >= 0; n--) {
      const i = e[n],
        s = i.e || 0;
      if (s === 0) this.set(i.k, i.v);
      else {
        const o = s - r;
        o > 0 && this.set(i.k, i.v, o);
      }
    }
  }
  prune() {
    this[ft].forEach((e, r) => ha(this, r, !1));
  }
}
const ha = (t, e, r) => {
    const n = t[ft].get(e);
    if (n) {
      const i = n.value;
      if (qi(t, i)) {
        if ((qr(t, n), !t[Dn])) return;
      } else r && (t[lh] && (n.value.now = Date.now()), t[Te].unshiftNode(n));
      return i.value;
    }
  },
  qi = (t, e) => {
    if (!e || (!e.maxAge && !t[br])) return !1;
    const r = Date.now() - e.now;
    return e.maxAge ? r > e.maxAge : t[br] && r > t[br];
  },
  kn = (t) => {
    if (t[Pt] > t[lr])
      for (let e = t[Te].tail; t[Pt] > t[lr] && e !== null; ) {
        const r = e.prev;
        qr(t, e), (e = r);
      }
  },
  qr = (t, e) => {
    if (e) {
      const r = e.value;
      t[jt] && t[jt](r.key, r.value),
        (t[Pt] -= r.length),
        t[ft].delete(r.key),
        t[Te].removeNode(e);
    }
  };
class F0 {
  constructor(e, r, n, i, s) {
    (this.key = e),
      (this.value = r),
      (this.length = n),
      (this.now = i),
      (this.maxAge = s || 0);
  }
}
const Gu = (t, e, r, n) => {
  let i = r.value;
  qi(t, i) && (qr(t, r), t[Dn] || (i = void 0)),
    i && e.call(n, i.value, i.key, t);
};
var U0 = B0;
const H0 = Object.freeze({ loose: !0 }),
  V0 = Object.freeze({}),
  W0 = (t) => (t ? (typeof t != "object" ? H0 : t) : V0);
var kc = W0,
  ec = { exports: {} };
const z0 = "2.0.0",
  fh = 256,
  G0 = Number.MAX_SAFE_INTEGER || 9007199254740991,
  q0 = 16,
  J0 = fh - 6,
  Z0 = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease",
  ];
var fs = {
  MAX_LENGTH: fh,
  MAX_SAFE_COMPONENT_LENGTH: q0,
  MAX_SAFE_BUILD_LENGTH: J0,
  MAX_SAFE_INTEGER: G0,
  RELEASE_TYPES: Z0,
  SEMVER_SPEC_VERSION: z0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2,
};
const Q0 =
  typeof process == "object" && {
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
    npm_config_local_prefix: "/Users/nemanjamijailovic/Desktop/react/nefentus",
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
  } &&
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
    npm_config_local_prefix: "/Users/nemanjamijailovic/Desktop/react/nefentus",
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
  }.NODE_DEBUG &&
  /\bsemver\b/i.test(
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
    }.NODE_DEBUG,
  )
    ? (...t) => console.error("SEMVER", ...t)
    : () => {};
var hs = Q0;
(function (t, e) {
  const {
      MAX_SAFE_COMPONENT_LENGTH: r,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: i,
    } = fs,
    s = hs;
  e = t.exports = {};
  const o = (e.re = []),
    a = (e.safeRe = []),
    c = (e.src = []),
    u = (e.t = {});
  let l = 0;
  const f = "[a-zA-Z0-9-]",
    h = [
      ["\\s", 1],
      ["\\d", i],
      [f, n],
    ],
    b = (y) => {
      for (const [S, m] of h)
        y = y
          .split(`${S}*`)
          .join(`${S}{0,${m}}`)
          .split(`${S}+`)
          .join(`${S}{1,${m}}`);
      return y;
    },
    g = (y, S, m) => {
      const v = b(S),
        E = l++;
      s(y, E, S),
        (u[y] = E),
        (c[E] = S),
        (o[E] = new RegExp(S, m ? "g" : void 0)),
        (a[E] = new RegExp(v, m ? "g" : void 0));
    };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
    g("NUMERICIDENTIFIERLOOSE", "\\d+"),
    g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`),
    g(
      "MAINVERSION",
      `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${
        c[u.NUMERICIDENTIFIER]
      })`,
    ),
    g(
      "MAINVERSIONLOOSE",
      `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${
        c[u.NUMERICIDENTIFIERLOOSE]
      })`,
    ),
    g(
      "PRERELEASEIDENTIFIER",
      `(?:${c[u.NUMERICIDENTIFIER]}|${c[u.NONNUMERICIDENTIFIER]})`,
    ),
    g(
      "PRERELEASEIDENTIFIERLOOSE",
      `(?:${c[u.NUMERICIDENTIFIERLOOSE]}|${c[u.NONNUMERICIDENTIFIER]})`,
    ),
    g(
      "PRERELEASE",
      `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`,
    ),
    g(
      "PRERELEASELOOSE",
      `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${
        c[u.PRERELEASEIDENTIFIERLOOSE]
      })*))`,
    ),
    g("BUILDIDENTIFIER", `${f}+`),
    g(
      "BUILD",
      `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`,
    ),
    g("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`),
    g("FULL", `^${c[u.FULLPLAIN]}$`),
    g(
      "LOOSEPLAIN",
      `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`,
    ),
    g("LOOSE", `^${c[u.LOOSEPLAIN]}$`),
    g("GTLT", "((?:<|>)?=?)"),
    g("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
    g("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`),
    g(
      "XRANGEPLAIN",
      `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${
        c[u.XRANGEIDENTIFIER]
      })(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${
        c[u.BUILD]
      }?)?)?`,
    ),
    g(
      "XRANGEPLAINLOOSE",
      `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${
        c[u.XRANGEIDENTIFIERLOOSE]
      })(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${
        c[u.BUILD]
      }?)?)?`,
    ),
    g("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`),
    g("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`),
    g(
      "COERCE",
      `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?(?:$|[^\\d])`,
    ),
    g("COERCERTL", c[u.COERCE], !0),
    g("LONETILDE", "(?:~>?)"),
    g("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0),
    (e.tildeTrimReplace = "$1~"),
    g("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`),
    g("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`),
    g("LONECARET", "(?:\\^)"),
    g("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0),
    (e.caretTrimReplace = "$1^"),
    g("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`),
    g("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`),
    g("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`),
    g("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`),
    g(
      "COMPARATORTRIM",
      `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`,
      !0,
    ),
    (e.comparatorTrimReplace = "$1$2$3"),
    g(
      "HYPHENRANGE",
      `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`,
    ),
    g(
      "HYPHENRANGELOOSE",
      `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`,
    ),
    g("STAR", "(<|>)?=?\\s*\\*"),
    g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
    g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ec, ec.exports);
var Yn = ec.exports;
const qu = /^[0-9]+$/,
  hh = (t, e) => {
    const r = qu.test(t),
      n = qu.test(e);
    return (
      r && n && ((t = +t), (e = +e)),
      t === e ? 0 : r && !n ? -1 : n && !r ? 1 : t < e ? -1 : 1
    );
  },
  K0 = (t, e) => hh(e, t);
var dh = { compareIdentifiers: hh, rcompareIdentifiers: K0 };
const xi = hs,
  { MAX_LENGTH: Ju, MAX_SAFE_INTEGER: Ai } = fs,
  { safeRe: Zu, t: Qu } = Yn,
  Y0 = kc,
  { compareIdentifiers: $r } = dh;
let X0 = class wt {
  constructor(e, r) {
    if (((r = Y0(r)), e instanceof wt)) {
      if (
        e.loose === !!r.loose &&
        e.includePrerelease === !!r.includePrerelease
      )
        return e;
      e = e.version;
    } else if (typeof e != "string")
      throw new TypeError(
        `Invalid version. Must be a string. Got type "${typeof e}".`,
      );
    if (e.length > Ju)
      throw new TypeError(`version is longer than ${Ju} characters`);
    xi("SemVer", e, r),
      (this.options = r),
      (this.loose = !!r.loose),
      (this.includePrerelease = !!r.includePrerelease);
    const n = e.trim().match(r.loose ? Zu[Qu.LOOSE] : Zu[Qu.FULL]);
    if (!n) throw new TypeError(`Invalid Version: ${e}`);
    if (
      ((this.raw = e),
      (this.major = +n[1]),
      (this.minor = +n[2]),
      (this.patch = +n[3]),
      this.major > Ai || this.major < 0)
    )
      throw new TypeError("Invalid major version");
    if (this.minor > Ai || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ai || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4]
      ? (this.prerelease = n[4].split(".").map((i) => {
          if (/^[0-9]+$/.test(i)) {
            const s = +i;
            if (s >= 0 && s < Ai) return s;
          }
          return i;
        }))
      : (this.prerelease = []),
      (this.build = n[5] ? n[5].split(".") : []),
      this.format();
  }
  format() {
    return (
      (this.version = `${this.major}.${this.minor}.${this.patch}`),
      this.prerelease.length &&
        (this.version += `-${this.prerelease.join(".")}`),
      this.version
    );
  }
  toString() {
    return this.version;
  }
  compare(e) {
    if (
      (xi("SemVer.compare", this.version, this.options, e), !(e instanceof wt))
    ) {
      if (typeof e == "string" && e === this.version) return 0;
      e = new wt(e, this.options);
    }
    return e.version === this.version
      ? 0
      : this.compareMain(e) || this.comparePre(e);
  }
  compareMain(e) {
    return (
      e instanceof wt || (e = new wt(e, this.options)),
      $r(this.major, e.major) ||
        $r(this.minor, e.minor) ||
        $r(this.patch, e.patch)
    );
  }
  comparePre(e) {
    if (
      (e instanceof wt || (e = new wt(e, this.options)),
      this.prerelease.length && !e.prerelease.length)
    )
      return -1;
    if (!this.prerelease.length && e.prerelease.length) return 1;
    if (!this.prerelease.length && !e.prerelease.length) return 0;
    let r = 0;
    do {
      const n = this.prerelease[r],
        i = e.prerelease[r];
      if ((xi("prerelease compare", r, n, i), n === void 0 && i === void 0))
        return 0;
      if (i === void 0) return 1;
      if (n === void 0) return -1;
      if (n === i) continue;
      return $r(n, i);
    } while (++r);
  }
  compareBuild(e) {
    e instanceof wt || (e = new wt(e, this.options));
    let r = 0;
    do {
      const n = this.build[r],
        i = e.build[r];
      if ((xi("prerelease compare", r, n, i), n === void 0 && i === void 0))
        return 0;
      if (i === void 0) return 1;
      if (n === void 0) return -1;
      if (n === i) continue;
      return $r(n, i);
    } while (++r);
  }
  inc(e, r, n) {
    switch (e) {
      case "premajor":
        (this.prerelease.length = 0),
          (this.patch = 0),
          (this.minor = 0),
          this.major++,
          this.inc("pre", r, n);
        break;
      case "preminor":
        (this.prerelease.length = 0),
          (this.patch = 0),
          this.minor++,
          this.inc("pre", r, n);
        break;
      case "prepatch":
        (this.prerelease.length = 0),
          this.inc("patch", r, n),
          this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n),
          this.inc("pre", r, n);
        break;
      case "major":
        (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) &&
          this.major++,
          (this.minor = 0),
          (this.patch = 0),
          (this.prerelease = []);
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
          (this.patch = 0),
          (this.prerelease = []);
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (!r && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0) this.prerelease = [i];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" &&
              (this.prerelease[s]++, (s = -2));
          if (s === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error(
                "invalid increment argument: identifier already exists",
              );
            this.prerelease.push(i);
          }
        }
        if (r) {
          let s = [r, i];
          n === !1 && (s = [r]),
            $r(this.prerelease[0], r) === 0
              ? isNaN(this.prerelease[1]) && (this.prerelease = s)
              : (this.prerelease = s);
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${e}`);
    }
    return (
      (this.raw = this.format()),
      this.build.length && (this.raw += `+${this.build.join(".")}`),
      this
    );
  }
};
var ze = X0;
const Ku = ze,
  eb = (t, e, r) => new Ku(t, r).compare(new Ku(e, r));
var bt = eb;
const tb = bt,
  rb = (t, e, r) => tb(t, e, r) === 0;
var ph = rb;
const nb = bt,
  ib = (t, e, r) => nb(t, e, r) !== 0;
var bh = ib;
const sb = bt,
  ob = (t, e, r) => sb(t, e, r) > 0;
var ds = ob;
const ab = bt,
  cb = (t, e, r) => ab(t, e, r) >= 0;
var Oc = cb;
const ub = bt,
  lb = (t, e, r) => ub(t, e, r) < 0;
var Mc = lb;
const fb = bt,
  hb = (t, e, r) => fb(t, e, r) <= 0;
var Nc = hb;
const db = ph,
  pb = bh,
  bb = ds,
  gb = Oc,
  mb = Mc,
  yb = Nc,
  vb = (t, e, r, n) => {
    switch (e) {
      case "===":
        return (
          typeof t == "object" && (t = t.version),
          typeof r == "object" && (r = r.version),
          t === r
        );
      case "!==":
        return (
          typeof t == "object" && (t = t.version),
          typeof r == "object" && (r = r.version),
          t !== r
        );
      case "":
      case "=":
      case "==":
        return db(t, r, n);
      case "!=":
        return pb(t, r, n);
      case ">":
        return bb(t, r, n);
      case ">=":
        return gb(t, r, n);
      case "<":
        return mb(t, r, n);
      case "<=":
        return yb(t, r, n);
      default:
        throw new TypeError(`Invalid operator: ${e}`);
    }
  };
var gh = vb,
  da,
  Yu;
function ps() {
  if (Yu) return da;
  Yu = 1;
  const t = Symbol("SemVer ANY");
  class e {
    static get ANY() {
      return t;
    }
    constructor(l, f) {
      if (((f = r(f)), l instanceof e)) {
        if (l.loose === !!f.loose) return l;
        l = l.value;
      }
      (l = l.trim().split(/\s+/).join(" ")),
        o("comparator", l, f),
        (this.options = f),
        (this.loose = !!f.loose),
        this.parse(l),
        this.semver === t
          ? (this.value = "")
          : (this.value = this.operator + this.semver.version),
        o("comp", this);
    }
    parse(l) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR],
        h = l.match(f);
      if (!h) throw new TypeError(`Invalid comparator: ${l}`);
      (this.operator = h[1] !== void 0 ? h[1] : ""),
        this.operator === "=" && (this.operator = ""),
        h[2]
          ? (this.semver = new a(h[2], this.options.loose))
          : (this.semver = t);
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (
        (o("Comparator.test", l, this.options.loose),
        this.semver === t || l === t)
      )
        return !0;
      if (typeof l == "string")
        try {
          l = new a(l, this.options);
        } catch {
          return !1;
        }
      return s(l, this.operator, this.semver, this.options);
    }
    intersects(l, f) {
      if (!(l instanceof e)) throw new TypeError("a Comparator is required");
      return this.operator === ""
        ? this.value === ""
          ? !0
          : new c(l.value, f).test(this.value)
        : l.operator === ""
        ? l.value === ""
          ? !0
          : new c(this.value, f).test(l.semver)
        : ((f = r(f)),
          (f.includePrerelease &&
            (this.value === "<0.0.0-0" || l.value === "<0.0.0-0")) ||
          (!f.includePrerelease &&
            (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")))
            ? !1
            : !!(
                (this.operator.startsWith(">") && l.operator.startsWith(">")) ||
                (this.operator.startsWith("<") && l.operator.startsWith("<")) ||
                (this.semver.version === l.semver.version &&
                  this.operator.includes("=") &&
                  l.operator.includes("=")) ||
                (s(this.semver, "<", l.semver, f) &&
                  this.operator.startsWith(">") &&
                  l.operator.startsWith("<")) ||
                (s(this.semver, ">", l.semver, f) &&
                  this.operator.startsWith("<") &&
                  l.operator.startsWith(">"))
              ));
    }
  }
  da = e;
  const r = kc,
    { safeRe: n, t: i } = Yn,
    s = gh,
    o = hs,
    a = ze,
    c = gt();
  return da;
}
var pa, Xu;
function gt() {
  if (Xu) return pa;
  Xu = 1;
  class t {
    constructor(k, N) {
      if (((N = n(N)), k instanceof t))
        return k.loose === !!N.loose &&
          k.includePrerelease === !!N.includePrerelease
          ? k
          : new t(k.raw, N);
      if (k instanceof i)
        return (this.raw = k.value), (this.set = [[k]]), this.format(), this;
      if (
        ((this.options = N),
        (this.loose = !!N.loose),
        (this.includePrerelease = !!N.includePrerelease),
        (this.raw = k.trim().split(/\s+/).join(" ")),
        (this.set = this.raw
          .split("||")
          .map((P) => this.parseRange(P.trim()))
          .filter((P) => P.length)),
        !this.set.length)
      )
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const P = this.set[0];
        if (
          ((this.set = this.set.filter((B) => !g(B[0]))), this.set.length === 0)
        )
          this.set = [P];
        else if (this.set.length > 1) {
          for (const B of this.set)
            if (B.length === 1 && y(B[0])) {
              this.set = [B];
              break;
            }
        }
      }
      this.format();
    }
    format() {
      return (
        (this.range = this.set
          .map((k) => k.join(" ").trim())
          .join("||")
          .trim()),
        this.range
      );
    }
    toString() {
      return this.range;
    }
    parseRange(k) {
      const P =
          ((this.options.includePrerelease && h) | (this.options.loose && b)) +
          ":" +
          k,
        B = r.get(P);
      if (B) return B;
      const j = this.options.loose,
        U = j ? a[c.HYPHENRANGELOOSE] : a[c.HYPHENRANGE];
      (k = k.replace(U, se(this.options.includePrerelease))),
        s("hyphen replace", k),
        (k = k.replace(a[c.COMPARATORTRIM], u)),
        s("comparator trim", k),
        (k = k.replace(a[c.TILDETRIM], l)),
        s("tilde trim", k),
        (k = k.replace(a[c.CARETTRIM], f)),
        s("caret trim", k);
      let Q = k
        .split(" ")
        .map((le) => m(le, this.options))
        .join(" ")
        .split(/\s+/)
        .map((le) => W(le, this.options));
      j &&
        (Q = Q.filter(
          (le) => (
            s("loose invalid filter", le, this.options),
            !!le.match(a[c.COMPARATORLOOSE])
          ),
        )),
        s("range list", Q);
      const q = new Map(),
        oe = Q.map((le) => new i(le, this.options));
      for (const le of oe) {
        if (g(le)) return [le];
        q.set(le.value, le);
      }
      q.size > 1 && q.has("") && q.delete("");
      const he = [...q.values()];
      return r.set(P, he), he;
    }
    intersects(k, N) {
      if (!(k instanceof t)) throw new TypeError("a Range is required");
      return this.set.some(
        (P) =>
          S(P, N) &&
          k.set.some(
            (B) =>
              S(B, N) && P.every((j) => B.every((U) => j.intersects(U, N))),
          ),
      );
    }
    test(k) {
      if (!k) return !1;
      if (typeof k == "string")
        try {
          k = new o(k, this.options);
        } catch {
          return !1;
        }
      for (let N = 0; N < this.set.length; N++)
        if (K(this.set[N], k, this.options)) return !0;
      return !1;
    }
  }
  pa = t;
  const e = U0,
    r = new e({ max: 1e3 }),
    n = kc,
    i = ps(),
    s = hs,
    o = ze,
    {
      safeRe: a,
      t: c,
      comparatorTrimReplace: u,
      tildeTrimReplace: l,
      caretTrimReplace: f,
    } = Yn,
    { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: b } = fs,
    g = (T) => T.value === "<0.0.0-0",
    y = (T) => T.value === "",
    S = (T, k) => {
      let N = !0;
      const P = T.slice();
      let B = P.pop();
      for (; N && P.length; )
        (N = P.every((j) => B.intersects(j, k))), (B = P.pop());
      return N;
    },
    m = (T, k) => (
      s("comp", T, k),
      (T = C(T, k)),
      s("caret", T),
      (T = E(T, k)),
      s("tildes", T),
      (T = $(T, k)),
      s("xrange", T),
      (T = x(T, k)),
      s("stars", T),
      T
    ),
    v = (T) => !T || T.toLowerCase() === "x" || T === "*",
    E = (T, k) =>
      T.trim()
        .split(/\s+/)
        .map((N) => R(N, k))
        .join(" "),
    R = (T, k) => {
      const N = k.loose ? a[c.TILDELOOSE] : a[c.TILDE];
      return T.replace(N, (P, B, j, U, Q) => {
        s("tilde", T, P, B, j, U, Q);
        let q;
        return (
          v(B)
            ? (q = "")
            : v(j)
            ? (q = `>=${B}.0.0 <${+B + 1}.0.0-0`)
            : v(U)
            ? (q = `>=${B}.${j}.0 <${B}.${+j + 1}.0-0`)
            : Q
            ? (s("replaceTilde pr", Q),
              (q = `>=${B}.${j}.${U}-${Q} <${B}.${+j + 1}.0-0`))
            : (q = `>=${B}.${j}.${U} <${B}.${+j + 1}.0-0`),
          s("tilde return", q),
          q
        );
      });
    },
    C = (T, k) =>
      T.trim()
        .split(/\s+/)
        .map((N) => I(N, k))
        .join(" "),
    I = (T, k) => {
      s("caret", T, k);
      const N = k.loose ? a[c.CARETLOOSE] : a[c.CARET],
        P = k.includePrerelease ? "-0" : "";
      return T.replace(N, (B, j, U, Q, q) => {
        s("caret", T, B, j, U, Q, q);
        let oe;
        return (
          v(j)
            ? (oe = "")
            : v(U)
            ? (oe = `>=${j}.0.0${P} <${+j + 1}.0.0-0`)
            : v(Q)
            ? j === "0"
              ? (oe = `>=${j}.${U}.0${P} <${j}.${+U + 1}.0-0`)
              : (oe = `>=${j}.${U}.0${P} <${+j + 1}.0.0-0`)
            : q
            ? (s("replaceCaret pr", q),
              j === "0"
                ? U === "0"
                  ? (oe = `>=${j}.${U}.${Q}-${q} <${j}.${U}.${+Q + 1}-0`)
                  : (oe = `>=${j}.${U}.${Q}-${q} <${j}.${+U + 1}.0-0`)
                : (oe = `>=${j}.${U}.${Q}-${q} <${+j + 1}.0.0-0`))
            : (s("no pr"),
              j === "0"
                ? U === "0"
                  ? (oe = `>=${j}.${U}.${Q}${P} <${j}.${U}.${+Q + 1}-0`)
                  : (oe = `>=${j}.${U}.${Q}${P} <${j}.${+U + 1}.0-0`)
                : (oe = `>=${j}.${U}.${Q} <${+j + 1}.0.0-0`)),
          s("caret return", oe),
          oe
        );
      });
    },
    $ = (T, k) => (
      s("replaceXRanges", T, k),
      T.split(/\s+/)
        .map((N) => L(N, k))
        .join(" ")
    ),
    L = (T, k) => {
      T = T.trim();
      const N = k.loose ? a[c.XRANGELOOSE] : a[c.XRANGE];
      return T.replace(N, (P, B, j, U, Q, q) => {
        s("xRange", T, P, B, j, U, Q, q);
        const oe = v(j),
          he = oe || v(U),
          le = he || v(Q),
          Fe = le;
        return (
          B === "=" && Fe && (B = ""),
          (q = k.includePrerelease ? "-0" : ""),
          oe
            ? B === ">" || B === "<"
              ? (P = "<0.0.0-0")
              : (P = "*")
            : B && Fe
            ? (he && (U = 0),
              (Q = 0),
              B === ">"
                ? ((B = ">="),
                  he
                    ? ((j = +j + 1), (U = 0), (Q = 0))
                    : ((U = +U + 1), (Q = 0)))
                : B === "<=" && ((B = "<"), he ? (j = +j + 1) : (U = +U + 1)),
              B === "<" && (q = "-0"),
              (P = `${B + j}.${U}.${Q}${q}`))
            : he
            ? (P = `>=${j}.0.0${q} <${+j + 1}.0.0-0`)
            : le && (P = `>=${j}.${U}.0${q} <${j}.${+U + 1}.0-0`),
          s("xRange return", P),
          P
        );
      });
    },
    x = (T, k) => (s("replaceStars", T, k), T.trim().replace(a[c.STAR], "")),
    W = (T, k) => (
      s("replaceGTE0", T, k),
      T.trim().replace(a[k.includePrerelease ? c.GTE0PRE : c.GTE0], "")
    ),
    se = (T) => (k, N, P, B, j, U, Q, q, oe, he, le, Fe, _) => (
      v(P)
        ? (N = "")
        : v(B)
        ? (N = `>=${P}.0.0${T ? "-0" : ""}`)
        : v(j)
        ? (N = `>=${P}.${B}.0${T ? "-0" : ""}`)
        : U
        ? (N = `>=${N}`)
        : (N = `>=${N}${T ? "-0" : ""}`),
      v(oe)
        ? (q = "")
        : v(he)
        ? (q = `<${+oe + 1}.0.0-0`)
        : v(le)
        ? (q = `<${oe}.${+he + 1}.0-0`)
        : Fe
        ? (q = `<=${oe}.${he}.${le}-${Fe}`)
        : T
        ? (q = `<${oe}.${he}.${+le + 1}-0`)
        : (q = `<=${q}`),
      `${N} ${q}`.trim()
    ),
    K = (T, k, N) => {
      for (let P = 0; P < T.length; P++) if (!T[P].test(k)) return !1;
      if (k.prerelease.length && !N.includePrerelease) {
        for (let P = 0; P < T.length; P++)
          if (
            (s(T[P].semver),
            T[P].semver !== i.ANY && T[P].semver.prerelease.length > 0)
          ) {
            const B = T[P].semver;
            if (
              B.major === k.major &&
              B.minor === k.minor &&
              B.patch === k.patch
            )
              return !0;
          }
        return !1;
      }
      return !0;
    };
  return pa;
}
const _b = gt(),
  wb = (t, e, r) => {
    try {
      e = new _b(e, r);
    } catch {
      return !1;
    }
    return e.test(t);
  };
var bs = wb,
  Sb = function () {
    if (
      typeof Symbol != "function" ||
      typeof Object.getOwnPropertySymbols != "function"
    )
      return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var e = {},
      r = Symbol("test"),
      n = Object(r);
    if (
      typeof r == "string" ||
      Object.prototype.toString.call(r) !== "[object Symbol]" ||
      Object.prototype.toString.call(n) !== "[object Symbol]"
    )
      return !1;
    var i = 42;
    e[r] = i;
    for (r in e) return !1;
    if (
      (typeof Object.keys == "function" && Object.keys(e).length !== 0) ||
      (typeof Object.getOwnPropertyNames == "function" &&
        Object.getOwnPropertyNames(e).length !== 0)
    )
      return !1;
    var s = Object.getOwnPropertySymbols(e);
    if (
      s.length !== 1 ||
      s[0] !== r ||
      !Object.prototype.propertyIsEnumerable.call(e, r)
    )
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o = Object.getOwnPropertyDescriptor(e, r);
      if (o.value !== i || o.enumerable !== !0) return !1;
    }
    return !0;
  },
  el = typeof Symbol < "u" && Symbol,
  Eb = Sb,
  Cb = function () {
    return typeof el != "function" ||
      typeof Symbol != "function" ||
      typeof el("foo") != "symbol" ||
      typeof Symbol("bar") != "symbol"
      ? !1
      : Eb();
  },
  Rb = "Function.prototype.bind called on incompatible ",
  ba = Array.prototype.slice,
  Ib = Object.prototype.toString,
  xb = "[object Function]",
  Ab = function (e) {
    var r = this;
    if (typeof r != "function" || Ib.call(r) !== xb)
      throw new TypeError(Rb + r);
    for (
      var n = ba.call(arguments, 1),
        i,
        s = function () {
          if (this instanceof i) {
            var l = r.apply(this, n.concat(ba.call(arguments)));
            return Object(l) === l ? l : this;
          } else return r.apply(e, n.concat(ba.call(arguments)));
        },
        o = Math.max(0, r.length - n.length),
        a = [],
        c = 0;
      c < o;
      c++
    )
      a.push("$" + c);
    if (
      ((i = Function(
        "binder",
        "return function (" +
          a.join(",") +
          "){ return binder.apply(this,arguments); }",
      )(s)),
      r.prototype)
    ) {
      var u = function () {};
      (u.prototype = r.prototype),
        (i.prototype = new u()),
        (u.prototype = null);
    }
    return i;
  },
  Tb = Ab,
  jc = Function.prototype.bind || Tb,
  kb = jc,
  Ob = kb.call(Function.call, Object.prototype.hasOwnProperty),
  ne,
  en = SyntaxError,
  mh = Function,
  Jr = TypeError,
  ga = function (t) {
    try {
      return mh('"use strict"; return (' + t + ").constructor;")();
    } catch {}
  },
  yr = Object.getOwnPropertyDescriptor;
if (yr)
  try {
    yr({}, "");
  } catch {
    yr = null;
  }
var ma = function () {
    throw new Jr();
  },
  Mb = yr
    ? (function () {
        try {
          return arguments.callee, ma;
        } catch {
          try {
            return yr(arguments, "callee").get;
          } catch {
            return ma;
          }
        }
      })()
    : ma,
  Br = Cb(),
  Ct =
    Object.getPrototypeOf ||
    function (t) {
      return t.__proto__;
    },
  Vr = {},
  Nb = typeof Uint8Array > "u" ? ne : Ct(Uint8Array),
  vr = {
    "%AggregateError%": typeof AggregateError > "u" ? ne : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? ne : ArrayBuffer,
    "%ArrayIteratorPrototype%": Br ? Ct([][Symbol.iterator]()) : ne,
    "%AsyncFromSyncIteratorPrototype%": ne,
    "%AsyncFunction%": Vr,
    "%AsyncGenerator%": Vr,
    "%AsyncGeneratorFunction%": Vr,
    "%AsyncIteratorPrototype%": Vr,
    "%Atomics%": typeof Atomics > "u" ? ne : Atomics,
    "%BigInt%": typeof BigInt > "u" ? ne : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? ne : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? ne : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? ne : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%eval%": eval,
    "%EvalError%": EvalError,
    "%Float32Array%": typeof Float32Array > "u" ? ne : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? ne : Float64Array,
    "%FinalizationRegistry%":
      typeof FinalizationRegistry > "u" ? ne : FinalizationRegistry,
    "%Function%": mh,
    "%GeneratorFunction%": Vr,
    "%Int8Array%": typeof Int8Array > "u" ? ne : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? ne : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? ne : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": Br ? Ct(Ct([][Symbol.iterator]())) : ne,
    "%JSON%": typeof JSON == "object" ? JSON : ne,
    "%Map%": typeof Map > "u" ? ne : Map,
    "%MapIteratorPrototype%":
      typeof Map > "u" || !Br ? ne : Ct(new Map()[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? ne : Promise,
    "%Proxy%": typeof Proxy > "u" ? ne : Proxy,
    "%RangeError%": RangeError,
    "%ReferenceError%": ReferenceError,
    "%Reflect%": typeof Reflect > "u" ? ne : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? ne : Set,
    "%SetIteratorPrototype%":
      typeof Set > "u" || !Br ? ne : Ct(new Set()[Symbol.iterator]()),
    "%SharedArrayBuffer%":
      typeof SharedArrayBuffer > "u" ? ne : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": Br ? Ct(""[Symbol.iterator]()) : ne,
    "%Symbol%": Br ? Symbol : ne,
    "%SyntaxError%": en,
    "%ThrowTypeError%": Mb,
    "%TypedArray%": Nb,
    "%TypeError%": Jr,
    "%Uint8Array%": typeof Uint8Array > "u" ? ne : Uint8Array,
    "%Uint8ClampedArray%":
      typeof Uint8ClampedArray > "u" ? ne : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? ne : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? ne : Uint32Array,
    "%URIError%": URIError,
    "%WeakMap%": typeof WeakMap > "u" ? ne : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? ne : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? ne : WeakSet,
  };
try {
  null.error;
} catch (t) {
  var jb = Ct(Ct(t));
  vr["%Error.prototype%"] = jb;
}
var Lb = function t(e) {
    var r;
    if (e === "%AsyncFunction%") r = ga("async function () {}");
    else if (e === "%GeneratorFunction%") r = ga("function* () {}");
    else if (e === "%AsyncGeneratorFunction%") r = ga("async function* () {}");
    else if (e === "%AsyncGenerator%") {
      var n = t("%AsyncGeneratorFunction%");
      n && (r = n.prototype);
    } else if (e === "%AsyncIteratorPrototype%") {
      var i = t("%AsyncGenerator%");
      i && (r = Ct(i.prototype));
    }
    return (vr[e] = r), r;
  },
  tl = {
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": [
      "AsyncGeneratorFunction",
      "prototype",
      "prototype",
    ],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"],
  },
  Xn = jc,
  Ji = Ob,
  Pb = Xn.call(Function.call, Array.prototype.concat),
  Db = Xn.call(Function.apply, Array.prototype.splice),
  rl = Xn.call(Function.call, String.prototype.replace),
  Zi = Xn.call(Function.call, String.prototype.slice),
  $b = Xn.call(Function.call, RegExp.prototype.exec),
  Bb =
    /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
  Fb = /\\(\\)?/g,
  Ub = function (e) {
    var r = Zi(e, 0, 1),
      n = Zi(e, -1);
    if (r === "%" && n !== "%")
      throw new en("invalid intrinsic syntax, expected closing `%`");
    if (n === "%" && r !== "%")
      throw new en("invalid intrinsic syntax, expected opening `%`");
    var i = [];
    return (
      rl(e, Bb, function (s, o, a, c) {
        i[i.length] = a ? rl(c, Fb, "$1") : o || s;
      }),
      i
    );
  },
  Hb = function (e, r) {
    var n = e,
      i;
    if ((Ji(tl, n) && ((i = tl[n]), (n = "%" + i[0] + "%")), Ji(vr, n))) {
      var s = vr[n];
      if ((s === Vr && (s = Lb(n)), typeof s > "u" && !r))
        throw new Jr(
          "intrinsic " +
            e +
            " exists, but is not available. Please file an issue!",
        );
      return { alias: i, name: n, value: s };
    }
    throw new en("intrinsic " + e + " does not exist!");
  },
  Lc = function (e, r) {
    if (typeof e != "string" || e.length === 0)
      throw new Jr("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof r != "boolean")
      throw new Jr('"allowMissing" argument must be a boolean');
    if ($b(/^%?[^%]*%?$/, e) === null)
      throw new en(
        "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
      );
    var n = Ub(e),
      i = n.length > 0 ? n[0] : "",
      s = Hb("%" + i + "%", r),
      o = s.name,
      a = s.value,
      c = !1,
      u = s.alias;
    u && ((i = u[0]), Db(n, Pb([0, 1], u)));
    for (var l = 1, f = !0; l < n.length; l += 1) {
      var h = n[l],
        b = Zi(h, 0, 1),
        g = Zi(h, -1);
      if (
        (b === '"' ||
          b === "'" ||
          b === "`" ||
          g === '"' ||
          g === "'" ||
          g === "`") &&
        b !== g
      )
        throw new en("property names with quotes must have matching quotes");
      if (
        ((h === "constructor" || !f) && (c = !0),
        (i += "." + h),
        (o = "%" + i + "%"),
        Ji(vr, o))
      )
        a = vr[o];
      else if (a != null) {
        if (!(h in a)) {
          if (!r)
            throw new Jr(
              "base intrinsic for " +
                e +
                " exists, but the property is not available.",
            );
          return;
        }
        if (yr && l + 1 >= n.length) {
          var y = yr(a, h);
          (f = !!y),
            f && "get" in y && !("originalValue" in y.get)
              ? (a = y.get)
              : (a = a[h]);
        } else (f = Ji(a, h)), (a = a[h]);
        f && !c && (vr[o] = a);
      }
    }
    return a;
  },
  yh = { exports: {} };
(function (t) {
  var e = jc,
    r = Lc,
    n = r("%Function.prototype.apply%"),
    i = r("%Function.prototype.call%"),
    s = r("%Reflect.apply%", !0) || e.call(i, n),
    o = r("%Object.getOwnPropertyDescriptor%", !0),
    a = r("%Object.defineProperty%", !0),
    c = r("%Math.max%");
  if (a)
    try {
      a({}, "a", { value: 1 });
    } catch {
      a = null;
    }
  t.exports = function (f) {
    var h = s(e, i, arguments);
    if (o && a) {
      var b = o(h, "length");
      b.configurable &&
        a(h, "length", { value: 1 + c(0, f.length - (arguments.length - 1)) });
    }
    return h;
  };
  var u = function () {
    return s(e, n, arguments);
  };
  a ? a(t.exports, "apply", { value: u }) : (t.exports.apply = u);
})(yh);
var Vb = yh.exports,
  vh = Lc,
  _h = Vb,
  Wb = _h(vh("String.prototype.indexOf")),
  zb = function (e, r) {
    var n = vh(e, !!r);
    return typeof n == "function" && Wb(e, ".prototype.") > -1 ? _h(n) : n;
  },
  tc = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ (function (
  t,
  e,
) {
  var r = ls,
    n = r.Buffer;
  function i(o, a) {
    for (var c in o) a[c] = o[c];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow
    ? (t.exports = r)
    : (i(r, e), (e.Buffer = s));
  function s(o, a, c) {
    return n(o, a, c);
  }
  (s.prototype = Object.create(n.prototype)),
    i(n, s),
    (s.from = function (o, a, c) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return n(o, a, c);
    }),
    (s.alloc = function (o, a, c) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var u = n(o);
      return (
        a !== void 0
          ? typeof c == "string"
            ? u.fill(a, c)
            : u.fill(a)
          : u.fill(0),
        u
      );
    }),
    (s.allocUnsafe = function (o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return n(o);
    }),
    (s.allocUnsafeSlow = function (o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(o);
    });
})(tc, tc.exports);
var ir = tc.exports,
  rc = { exports: {} },
  wh = Tc.EventEmitter,
  ya,
  nl;
function Gb() {
  if (nl) return ya;
  nl = 1;
  function t(g, y) {
    var S = Object.keys(g);
    if (Object.getOwnPropertySymbols) {
      var m = Object.getOwnPropertySymbols(g);
      y &&
        (m = m.filter(function (v) {
          return Object.getOwnPropertyDescriptor(g, v).enumerable;
        })),
        S.push.apply(S, m);
    }
    return S;
  }
  function e(g) {
    for (var y = 1; y < arguments.length; y++) {
      var S = arguments[y] != null ? arguments[y] : {};
      y % 2
        ? t(Object(S), !0).forEach(function (m) {
            r(g, m, S[m]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(g, Object.getOwnPropertyDescriptors(S))
        : t(Object(S)).forEach(function (m) {
            Object.defineProperty(g, m, Object.getOwnPropertyDescriptor(S, m));
          });
    }
    return g;
  }
  function r(g, y, S) {
    return (
      (y = o(y)),
      y in g
        ? Object.defineProperty(g, y, {
            value: S,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (g[y] = S),
      g
    );
  }
  function n(g, y) {
    if (!(g instanceof y))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(g, y) {
    for (var S = 0; S < y.length; S++) {
      var m = y[S];
      (m.enumerable = m.enumerable || !1),
        (m.configurable = !0),
        "value" in m && (m.writable = !0),
        Object.defineProperty(g, o(m.key), m);
    }
  }
  function s(g, y, S) {
    return (
      y && i(g.prototype, y),
      S && i(g, S),
      Object.defineProperty(g, "prototype", { writable: !1 }),
      g
    );
  }
  function o(g) {
    var y = a(g, "string");
    return typeof y == "symbol" ? y : String(y);
  }
  function a(g, y) {
    if (typeof g != "object" || g === null) return g;
    var S = g[Symbol.toPrimitive];
    if (S !== void 0) {
      var m = S.call(g, y || "default");
      if (typeof m != "object") return m;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (y === "string" ? String : Number)(g);
  }
  var c = ls,
    u = c.Buffer,
    l = Ac,
    f = l.inspect,
    h = (f && f.custom) || "inspect";
  function b(g, y, S) {
    u.prototype.copy.call(g, y, S);
  }
  return (
    (ya = (function () {
      function g() {
        n(this, g), (this.head = null), (this.tail = null), (this.length = 0);
      }
      return (
        s(g, [
          {
            key: "push",
            value: function (S) {
              var m = { data: S, next: null };
              this.length > 0 ? (this.tail.next = m) : (this.head = m),
                (this.tail = m),
                ++this.length;
            },
          },
          {
            key: "unshift",
            value: function (S) {
              var m = { data: S, next: this.head };
              this.length === 0 && (this.tail = m),
                (this.head = m),
                ++this.length;
            },
          },
          {
            key: "shift",
            value: function () {
              if (this.length !== 0) {
                var S = this.head.data;
                return (
                  this.length === 1
                    ? (this.head = this.tail = null)
                    : (this.head = this.head.next),
                  --this.length,
                  S
                );
              }
            },
          },
          {
            key: "clear",
            value: function () {
              (this.head = this.tail = null), (this.length = 0);
            },
          },
          {
            key: "join",
            value: function (S) {
              if (this.length === 0) return "";
              for (var m = this.head, v = "" + m.data; (m = m.next); )
                v += S + m.data;
              return v;
            },
          },
          {
            key: "concat",
            value: function (S) {
              if (this.length === 0) return u.alloc(0);
              for (var m = u.allocUnsafe(S >>> 0), v = this.head, E = 0; v; )
                b(v.data, m, E), (E += v.data.length), (v = v.next);
              return m;
            },
          },
          {
            key: "consume",
            value: function (S, m) {
              var v;
              return (
                S < this.head.data.length
                  ? ((v = this.head.data.slice(0, S)),
                    (this.head.data = this.head.data.slice(S)))
                  : S === this.head.data.length
                  ? (v = this.shift())
                  : (v = m ? this._getString(S) : this._getBuffer(S)),
                v
              );
            },
          },
          {
            key: "first",
            value: function () {
              return this.head.data;
            },
          },
          {
            key: "_getString",
            value: function (S) {
              var m = this.head,
                v = 1,
                E = m.data;
              for (S -= E.length; (m = m.next); ) {
                var R = m.data,
                  C = S > R.length ? R.length : S;
                if (
                  (C === R.length ? (E += R) : (E += R.slice(0, S)),
                  (S -= C),
                  S === 0)
                ) {
                  C === R.length
                    ? (++v,
                      m.next
                        ? (this.head = m.next)
                        : (this.head = this.tail = null))
                    : ((this.head = m), (m.data = R.slice(C)));
                  break;
                }
                ++v;
              }
              return (this.length -= v), E;
            },
          },
          {
            key: "_getBuffer",
            value: function (S) {
              var m = u.allocUnsafe(S),
                v = this.head,
                E = 1;
              for (v.data.copy(m), S -= v.data.length; (v = v.next); ) {
                var R = v.data,
                  C = S > R.length ? R.length : S;
                if ((R.copy(m, m.length - S, 0, C), (S -= C), S === 0)) {
                  C === R.length
                    ? (++E,
                      v.next
                        ? (this.head = v.next)
                        : (this.head = this.tail = null))
                    : ((this.head = v), (v.data = R.slice(C)));
                  break;
                }
                ++E;
              }
              return (this.length -= E), m;
            },
          },
          {
            key: h,
            value: function (S, m) {
              return f(this, e(e({}, m), {}, { depth: 0, customInspect: !1 }));
            },
          },
        ]),
        g
      );
    })()),
    ya
  );
}
function qb(t, e) {
  var r = this,
    n = this._readableState && this._readableState.destroyed,
    i = this._writableState && this._writableState.destroyed;
  return n || i
    ? (e
        ? e(t)
        : t &&
          (this._writableState
            ? this._writableState.errorEmitted ||
              ((this._writableState.errorEmitted = !0),
              process.nextTick(nc, this, t))
            : process.nextTick(nc, this, t)),
      this)
    : (this._readableState && (this._readableState.destroyed = !0),
      this._writableState && (this._writableState.destroyed = !0),
      this._destroy(t || null, function (s) {
        !e && s
          ? r._writableState
            ? r._writableState.errorEmitted
              ? process.nextTick(Hi, r)
              : ((r._writableState.errorEmitted = !0),
                process.nextTick(il, r, s))
            : process.nextTick(il, r, s)
          : e
          ? (process.nextTick(Hi, r), e(s))
          : process.nextTick(Hi, r);
      }),
      this);
}
function il(t, e) {
  nc(t, e), Hi(t);
}
function Hi(t) {
  (t._writableState && !t._writableState.emitClose) ||
    (t._readableState && !t._readableState.emitClose) ||
    t.emit("close");
}
function Jb() {
  this._readableState &&
    ((this._readableState.destroyed = !1),
    (this._readableState.reading = !1),
    (this._readableState.ended = !1),
    (this._readableState.endEmitted = !1)),
    this._writableState &&
      ((this._writableState.destroyed = !1),
      (this._writableState.ended = !1),
      (this._writableState.ending = !1),
      (this._writableState.finalCalled = !1),
      (this._writableState.prefinished = !1),
      (this._writableState.finished = !1),
      (this._writableState.errorEmitted = !1));
}
function nc(t, e) {
  t.emit("error", e);
}
function Zb(t, e) {
  var r = t._readableState,
    n = t._writableState;
  (r && r.autoDestroy) || (n && n.autoDestroy)
    ? t.destroy(e)
    : t.emit("error", e);
}
var Sh = { destroy: qb, undestroy: Jb, errorOrDestroy: Zb },
  Ir = {};
function Qb(t, e) {
  (t.prototype = Object.create(e.prototype)),
    (t.prototype.constructor = t),
    (t.__proto__ = e);
}
var Eh = {};
function ot(t, e, r) {
  r || (r = Error);
  function n(s, o, a) {
    return typeof e == "string" ? e : e(s, o, a);
  }
  var i = (function (s) {
    Qb(o, s);
    function o(a, c, u) {
      return s.call(this, n(a, c, u)) || this;
    }
    return o;
  })(r);
  (i.prototype.name = r.name), (i.prototype.code = t), (Eh[t] = i);
}
function sl(t, e) {
  if (Array.isArray(t)) {
    var r = t.length;
    return (
      (t = t.map(function (n) {
        return String(n);
      })),
      r > 2
        ? "one of "
            .concat(e, " ")
            .concat(t.slice(0, r - 1).join(", "), ", or ") + t[r - 1]
        : r === 2
        ? "one of ".concat(e, " ").concat(t[0], " or ").concat(t[1])
        : "of ".concat(e, " ").concat(t[0])
    );
  } else return "of ".concat(e, " ").concat(String(t));
}
function Kb(t, e, r) {
  return t.substr(!r || r < 0 ? 0 : +r, e.length) === e;
}
function Yb(t, e, r) {
  return (
    (r === void 0 || r > t.length) && (r = t.length),
    t.substring(r - e.length, r) === e
  );
}
function Xb(t, e, r) {
  return (
    typeof r != "number" && (r = 0),
    r + e.length > t.length ? !1 : t.indexOf(e, r) !== -1
  );
}
ot(
  "ERR_INVALID_OPT_VALUE",
  function (t, e) {
    return 'The value "' + e + '" is invalid for option "' + t + '"';
  },
  TypeError,
);
ot(
  "ERR_INVALID_ARG_TYPE",
  function (t, e, r) {
    var n;
    typeof e == "string" && Kb(e, "not ")
      ? ((n = "must not be"), (e = e.replace(/^not /, "")))
      : (n = "must be");
    var i;
    if (Yb(t, " argument"))
      i = "The ".concat(t, " ").concat(n, " ").concat(sl(e, "type"));
    else {
      var s = Xb(t, ".") ? "property" : "argument";
      i = 'The "'
        .concat(t, '" ')
        .concat(s, " ")
        .concat(n, " ")
        .concat(sl(e, "type"));
    }
    return (i += ". Received type ".concat(typeof r)), i;
  },
  TypeError,
);
ot("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
ot("ERR_METHOD_NOT_IMPLEMENTED", function (t) {
  return "The " + t + " method is not implemented";
});
ot("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
ot("ERR_STREAM_DESTROYED", function (t) {
  return "Cannot call " + t + " after a stream was destroyed";
});
ot("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
ot("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
ot("ERR_STREAM_WRITE_AFTER_END", "write after end");
ot("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
ot(
  "ERR_UNKNOWN_ENCODING",
  function (t) {
    return "Unknown encoding: " + t;
  },
  TypeError,
);
ot("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
Ir.codes = Eh;
var eg = Ir.codes.ERR_INVALID_OPT_VALUE;
function tg(t, e, r) {
  return t.highWaterMark != null ? t.highWaterMark : e ? t[r] : null;
}
function rg(t, e, r, n) {
  var i = tg(e, n, r);
  if (i != null) {
    if (!(isFinite(i) && Math.floor(i) === i) || i < 0) {
      var s = n ? r : "highWaterMark";
      throw new eg(s, i);
    }
    return Math.floor(i);
  }
  return t.objectMode ? 16 : 16 * 1024;
}
var Ch = { getHighWaterMark: rg },
  ng = ig;
function ig(t, e) {
  if (va("noDeprecation")) return t;
  var r = !1;
  function n() {
    if (!r) {
      if (va("throwDeprecation")) throw new Error(e);
      va("traceDeprecation") ? console.trace(e) : console.warn(e), (r = !0);
    }
    return t.apply(this, arguments);
  }
  return n;
}
function va(t) {
  try {
    if (!F.localStorage) return !1;
  } catch {
    return !1;
  }
  var e = F.localStorage[t];
  return e == null ? !1 : String(e).toLowerCase() === "true";
}
var _a, ol;
function Rh() {
  if (ol) return _a;
  (ol = 1), (_a = L);
  function t(_) {
    var w = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        Fe(w, _);
      });
  }
  var e;
  L.WritableState = I;
  var r = { deprecate: ng },
    n = wh,
    i = ls.Buffer,
    s =
      (typeof F < "u"
        ? F
        : typeof window < "u"
        ? window
        : typeof self < "u"
        ? self
        : {}
      ).Uint8Array || function () {};
  function o(_) {
    return i.from(_);
  }
  function a(_) {
    return i.isBuffer(_) || _ instanceof s;
  }
  var c = Sh,
    u = Ch,
    l = u.getHighWaterMark,
    f = Ir.codes,
    h = f.ERR_INVALID_ARG_TYPE,
    b = f.ERR_METHOD_NOT_IMPLEMENTED,
    g = f.ERR_MULTIPLE_CALLBACK,
    y = f.ERR_STREAM_CANNOT_PIPE,
    S = f.ERR_STREAM_DESTROYED,
    m = f.ERR_STREAM_NULL_VALUES,
    v = f.ERR_STREAM_WRITE_AFTER_END,
    E = f.ERR_UNKNOWN_ENCODING,
    R = c.errorOrDestroy;
  pt(L, n);
  function C() {}
  function I(_, w, M) {
    (e = e || tn()),
      (_ = _ || {}),
      typeof M != "boolean" && (M = w instanceof e),
      (this.objectMode = !!_.objectMode),
      M && (this.objectMode = this.objectMode || !!_.writableObjectMode),
      (this.highWaterMark = l(this, _, "writableHighWaterMark", M)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var z = _.decodeStrings === !1;
    (this.decodeStrings = !z),
      (this.defaultEncoding = _.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (te) {
        P(w, te);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.emitClose = _.emitClose !== !1),
      (this.autoDestroy = !!_.autoDestroy),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new t(this));
  }
  (I.prototype.getBuffer = function () {
    for (var w = this.bufferedRequest, M = []; w; ) M.push(w), (w = w.next);
    return M;
  }),
    (function () {
      try {
        Object.defineProperty(I.prototype, "buffer", {
          get: r.deprecate(
            function () {
              return this.getBuffer();
            },
            "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
            "DEP0003",
          ),
        });
      } catch {}
    })();
  var $;
  typeof Symbol == "function" &&
  Symbol.hasInstance &&
  typeof Function.prototype[Symbol.hasInstance] == "function"
    ? (($ = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(L, Symbol.hasInstance, {
        value: function (w) {
          return $.call(this, w)
            ? !0
            : this !== L
            ? !1
            : w && w._writableState instanceof I;
        },
      }))
    : ($ = function (w) {
        return w instanceof this;
      });
  function L(_) {
    e = e || tn();
    var w = this instanceof e;
    if (!w && !$.call(L, this)) return new L(_);
    (this._writableState = new I(_, this, w)),
      (this.writable = !0),
      _ &&
        (typeof _.write == "function" && (this._write = _.write),
        typeof _.writev == "function" && (this._writev = _.writev),
        typeof _.destroy == "function" && (this._destroy = _.destroy),
        typeof _.final == "function" && (this._final = _.final)),
      n.call(this);
  }
  L.prototype.pipe = function () {
    R(this, new y());
  };
  function x(_, w) {
    var M = new v();
    R(_, M), process.nextTick(w, M);
  }
  function W(_, w, M, z) {
    var te;
    return (
      M === null
        ? (te = new m())
        : typeof M != "string" &&
          !w.objectMode &&
          (te = new h("chunk", ["string", "Buffer"], M)),
      te ? (R(_, te), process.nextTick(z, te), !1) : !0
    );
  }
  (L.prototype.write = function (_, w, M) {
    var z = this._writableState,
      te = !1,
      d = !z.objectMode && a(_);
    return (
      d && !i.isBuffer(_) && (_ = o(_)),
      typeof w == "function" && ((M = w), (w = null)),
      d ? (w = "buffer") : w || (w = z.defaultEncoding),
      typeof M != "function" && (M = C),
      z.ending
        ? x(this, M)
        : (d || W(this, z, _, M)) &&
          (z.pendingcb++, (te = K(this, z, d, _, w, M))),
      te
    );
  }),
    (L.prototype.cork = function () {
      this._writableState.corked++;
    }),
    (L.prototype.uncork = function () {
      var _ = this._writableState;
      _.corked &&
        (_.corked--,
        !_.writing &&
          !_.corked &&
          !_.bufferProcessing &&
          _.bufferedRequest &&
          U(this, _));
    }),
    (L.prototype.setDefaultEncoding = function (w) {
      if (
        (typeof w == "string" && (w = w.toLowerCase()),
        !(
          [
            "hex",
            "utf8",
            "utf-8",
            "ascii",
            "binary",
            "base64",
            "ucs2",
            "ucs-2",
            "utf16le",
            "utf-16le",
            "raw",
          ].indexOf((w + "").toLowerCase()) > -1
        ))
      )
        throw new E(w);
      return (this._writableState.defaultEncoding = w), this;
    }),
    Object.defineProperty(L.prototype, "writableBuffer", {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    });
  function se(_, w, M) {
    return (
      !_.objectMode &&
        _.decodeStrings !== !1 &&
        typeof w == "string" &&
        (w = i.from(w, M)),
      w
    );
  }
  Object.defineProperty(L.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function K(_, w, M, z, te, d) {
    if (!M) {
      var p = se(w, z, te);
      z !== p && ((M = !0), (te = "buffer"), (z = p));
    }
    var O = w.objectMode ? 1 : z.length;
    w.length += O;
    var D = w.length < w.highWaterMark;
    if ((D || (w.needDrain = !0), w.writing || w.corked)) {
      var ge = w.lastBufferedRequest;
      (w.lastBufferedRequest = {
        chunk: z,
        encoding: te,
        isBuf: M,
        callback: d,
        next: null,
      }),
        ge
          ? (ge.next = w.lastBufferedRequest)
          : (w.bufferedRequest = w.lastBufferedRequest),
        (w.bufferedRequestCount += 1);
    } else T(_, w, !1, O, z, te, d);
    return D;
  }
  function T(_, w, M, z, te, d, p) {
    (w.writelen = z),
      (w.writecb = p),
      (w.writing = !0),
      (w.sync = !0),
      w.destroyed
        ? w.onwrite(new S("write"))
        : M
        ? _._writev(te, w.onwrite)
        : _._write(te, d, w.onwrite),
      (w.sync = !1);
  }
  function k(_, w, M, z, te) {
    --w.pendingcb,
      M
        ? (process.nextTick(te, z),
          process.nextTick(he, _, w),
          (_._writableState.errorEmitted = !0),
          R(_, z))
        : (te(z), (_._writableState.errorEmitted = !0), R(_, z), he(_, w));
  }
  function N(_) {
    (_.writing = !1),
      (_.writecb = null),
      (_.length -= _.writelen),
      (_.writelen = 0);
  }
  function P(_, w) {
    var M = _._writableState,
      z = M.sync,
      te = M.writecb;
    if (typeof te != "function") throw new g();
    if ((N(M), w)) k(_, M, z, w, te);
    else {
      var d = Q(M) || _.destroyed;
      !d && !M.corked && !M.bufferProcessing && M.bufferedRequest && U(_, M),
        z ? process.nextTick(B, _, M, d, te) : B(_, M, d, te);
    }
  }
  function B(_, w, M, z) {
    M || j(_, w), w.pendingcb--, z(), he(_, w);
  }
  function j(_, w) {
    w.length === 0 && w.needDrain && ((w.needDrain = !1), _.emit("drain"));
  }
  function U(_, w) {
    w.bufferProcessing = !0;
    var M = w.bufferedRequest;
    if (_._writev && M && M.next) {
      var z = w.bufferedRequestCount,
        te = new Array(z),
        d = w.corkedRequestsFree;
      d.entry = M;
      for (var p = 0, O = !0; M; )
        (te[p] = M), M.isBuf || (O = !1), (M = M.next), (p += 1);
      (te.allBuffers = O),
        T(_, w, !0, w.length, te, "", d.finish),
        w.pendingcb++,
        (w.lastBufferedRequest = null),
        d.next
          ? ((w.corkedRequestsFree = d.next), (d.next = null))
          : (w.corkedRequestsFree = new t(w)),
        (w.bufferedRequestCount = 0);
    } else {
      for (; M; ) {
        var D = M.chunk,
          ge = M.encoding,
          Y = M.callback,
          fe = w.objectMode ? 1 : D.length;
        if (
          (T(_, w, !1, fe, D, ge, Y),
          (M = M.next),
          w.bufferedRequestCount--,
          w.writing)
        )
          break;
      }
      M === null && (w.lastBufferedRequest = null);
    }
    (w.bufferedRequest = M), (w.bufferProcessing = !1);
  }
  (L.prototype._write = function (_, w, M) {
    M(new b("_write()"));
  }),
    (L.prototype._writev = null),
    (L.prototype.end = function (_, w, M) {
      var z = this._writableState;
      return (
        typeof _ == "function"
          ? ((M = _), (_ = null), (w = null))
          : typeof w == "function" && ((M = w), (w = null)),
        _ != null && this.write(_, w),
        z.corked && ((z.corked = 1), this.uncork()),
        z.ending || le(this, z, M),
        this
      );
    }),
    Object.defineProperty(L.prototype, "writableLength", {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function Q(_) {
    return (
      _.ending &&
      _.length === 0 &&
      _.bufferedRequest === null &&
      !_.finished &&
      !_.writing
    );
  }
  function q(_, w) {
    _._final(function (M) {
      w.pendingcb--,
        M && R(_, M),
        (w.prefinished = !0),
        _.emit("prefinish"),
        he(_, w);
    });
  }
  function oe(_, w) {
    !w.prefinished &&
      !w.finalCalled &&
      (typeof _._final == "function" && !w.destroyed
        ? (w.pendingcb++, (w.finalCalled = !0), process.nextTick(q, _, w))
        : ((w.prefinished = !0), _.emit("prefinish")));
  }
  function he(_, w) {
    var M = Q(w);
    if (
      M &&
      (oe(_, w),
      w.pendingcb === 0 && ((w.finished = !0), _.emit("finish"), w.autoDestroy))
    ) {
      var z = _._readableState;
      (!z || (z.autoDestroy && z.endEmitted)) && _.destroy();
    }
    return M;
  }
  function le(_, w, M) {
    (w.ending = !0),
      he(_, w),
      M && (w.finished ? process.nextTick(M) : _.once("finish", M)),
      (w.ended = !0),
      (_.writable = !1);
  }
  function Fe(_, w, M) {
    var z = _.entry;
    for (_.entry = null; z; ) {
      var te = z.callback;
      w.pendingcb--, te(M), (z = z.next);
    }
    w.corkedRequestsFree.next = _;
  }
  return (
    Object.defineProperty(L.prototype, "destroyed", {
      enumerable: !1,
      get: function () {
        return this._writableState === void 0
          ? !1
          : this._writableState.destroyed;
      },
      set: function (w) {
        this._writableState && (this._writableState.destroyed = w);
      },
    }),
    (L.prototype.destroy = c.destroy),
    (L.prototype._undestroy = c.undestroy),
    (L.prototype._destroy = function (_, w) {
      w(_);
    }),
    _a
  );
}
var wa, al;
function tn() {
  if (al) return wa;
  al = 1;
  var t =
    Object.keys ||
    function (u) {
      var l = [];
      for (var f in u) l.push(f);
      return l;
    };
  wa = o;
  var e = xh(),
    r = Rh();
  pt(o, e);
  for (var n = t(r.prototype), i = 0; i < n.length; i++) {
    var s = n[i];
    o.prototype[s] || (o.prototype[s] = r.prototype[s]);
  }
  function o(u) {
    if (!(this instanceof o)) return new o(u);
    e.call(this, u),
      r.call(this, u),
      (this.allowHalfOpen = !0),
      u &&
        (u.readable === !1 && (this.readable = !1),
        u.writable === !1 && (this.writable = !1),
        u.allowHalfOpen === !1 &&
          ((this.allowHalfOpen = !1), this.once("end", a)));
  }
  Object.defineProperty(o.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  }),
    Object.defineProperty(o.prototype, "writableBuffer", {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    }),
    Object.defineProperty(o.prototype, "writableLength", {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function a() {
    this._writableState.ended || process.nextTick(c, this);
  }
  function c(u) {
    u.end();
  }
  return (
    Object.defineProperty(o.prototype, "destroyed", {
      enumerable: !1,
      get: function () {
        return this._readableState === void 0 || this._writableState === void 0
          ? !1
          : this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function (l) {
        this._readableState === void 0 ||
          this._writableState === void 0 ||
          ((this._readableState.destroyed = l),
          (this._writableState.destroyed = l));
      },
    }),
    wa
  );
}
var ic = {},
  Pc = ir.Buffer,
  cl =
    Pc.isEncoding ||
    function (t) {
      switch (((t = "" + t), t && t.toLowerCase())) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return !0;
        default:
          return !1;
      }
    };
function sg(t) {
  if (!t) return "utf8";
  for (var e; ; )
    switch (t) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return t;
      default:
        if (e) return;
        (t = ("" + t).toLowerCase()), (e = !0);
    }
}
function og(t) {
  var e = sg(t);
  if (typeof e != "string" && (Pc.isEncoding === cl || !cl(t)))
    throw new Error("Unknown encoding: " + t);
  return e || t;
}
ic.StringDecoder = ei;
function ei(t) {
  this.encoding = og(t);
  var e;
  switch (this.encoding) {
    case "utf16le":
      (this.text = hg), (this.end = dg), (e = 4);
      break;
    case "utf8":
      (this.fillLast = ug), (e = 4);
      break;
    case "base64":
      (this.text = pg), (this.end = bg), (e = 3);
      break;
    default:
      (this.write = gg), (this.end = mg);
      return;
  }
  (this.lastNeed = 0),
    (this.lastTotal = 0),
    (this.lastChar = Pc.allocUnsafe(e));
}
ei.prototype.write = function (t) {
  if (t.length === 0) return "";
  var e, r;
  if (this.lastNeed) {
    if (((e = this.fillLast(t)), e === void 0)) return "";
    (r = this.lastNeed), (this.lastNeed = 0);
  } else r = 0;
  return r < t.length ? (e ? e + this.text(t, r) : this.text(t, r)) : e || "";
};
ei.prototype.end = fg;
ei.prototype.text = lg;
ei.prototype.fillLast = function (t) {
  if (this.lastNeed <= t.length)
    return (
      t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
      this.lastChar.toString(this.encoding, 0, this.lastTotal)
    );
  t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length),
    (this.lastNeed -= t.length);
};
function Sa(t) {
  return t <= 127
    ? 0
    : t >> 5 === 6
    ? 2
    : t >> 4 === 14
    ? 3
    : t >> 3 === 30
    ? 4
    : t >> 6 === 2
    ? -1
    : -2;
}
function ag(t, e, r) {
  var n = e.length - 1;
  if (n < r) return 0;
  var i = Sa(e[n]);
  return i >= 0
    ? (i > 0 && (t.lastNeed = i - 1), i)
    : --n < r || i === -2
    ? 0
    : ((i = Sa(e[n])),
      i >= 0
        ? (i > 0 && (t.lastNeed = i - 2), i)
        : --n < r || i === -2
        ? 0
        : ((i = Sa(e[n])),
          i >= 0
            ? (i > 0 && (i === 2 ? (i = 0) : (t.lastNeed = i - 3)), i)
            : 0));
}
function cg(t, e, r) {
  if ((e[0] & 192) !== 128) return (t.lastNeed = 0), "�";
  if (t.lastNeed > 1 && e.length > 1) {
    if ((e[1] & 192) !== 128) return (t.lastNeed = 1), "�";
    if (t.lastNeed > 2 && e.length > 2 && (e[2] & 192) !== 128)
      return (t.lastNeed = 2), "�";
  }
}
function ug(t) {
  var e = this.lastTotal - this.lastNeed,
    r = cg(this, t);
  if (r !== void 0) return r;
  if (this.lastNeed <= t.length)
    return (
      t.copy(this.lastChar, e, 0, this.lastNeed),
      this.lastChar.toString(this.encoding, 0, this.lastTotal)
    );
  t.copy(this.lastChar, e, 0, t.length), (this.lastNeed -= t.length);
}
function lg(t, e) {
  var r = ag(this, t, e);
  if (!this.lastNeed) return t.toString("utf8", e);
  this.lastTotal = r;
  var n = t.length - (r - this.lastNeed);
  return t.copy(this.lastChar, 0, n), t.toString("utf8", e, n);
}
function fg(t) {
  var e = t && t.length ? this.write(t) : "";
  return this.lastNeed ? e + "�" : e;
}
function hg(t, e) {
  if ((t.length - e) % 2 === 0) {
    var r = t.toString("utf16le", e);
    if (r) {
      var n = r.charCodeAt(r.length - 1);
      if (n >= 55296 && n <= 56319)
        return (
          (this.lastNeed = 2),
          (this.lastTotal = 4),
          (this.lastChar[0] = t[t.length - 2]),
          (this.lastChar[1] = t[t.length - 1]),
          r.slice(0, -1)
        );
    }
    return r;
  }
  return (
    (this.lastNeed = 1),
    (this.lastTotal = 2),
    (this.lastChar[0] = t[t.length - 1]),
    t.toString("utf16le", e, t.length - 1)
  );
}
function dg(t) {
  var e = t && t.length ? this.write(t) : "";
  if (this.lastNeed) {
    var r = this.lastTotal - this.lastNeed;
    return e + this.lastChar.toString("utf16le", 0, r);
  }
  return e;
}
function pg(t, e) {
  var r = (t.length - e) % 3;
  return r === 0
    ? t.toString("base64", e)
    : ((this.lastNeed = 3 - r),
      (this.lastTotal = 3),
      r === 1
        ? (this.lastChar[0] = t[t.length - 1])
        : ((this.lastChar[0] = t[t.length - 2]),
          (this.lastChar[1] = t[t.length - 1])),
      t.toString("base64", e, t.length - r));
}
function bg(t) {
  var e = t && t.length ? this.write(t) : "";
  return this.lastNeed
    ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
    : e;
}
function gg(t) {
  return t.toString(this.encoding);
}
function mg(t) {
  return t && t.length ? this.write(t) : "";
}
var ul = Ir.codes.ERR_STREAM_PREMATURE_CLOSE;
function yg(t) {
  var e = !1;
  return function () {
    if (!e) {
      e = !0;
      for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
        n[i] = arguments[i];
      t.apply(this, n);
    }
  };
}
function vg() {}
function _g(t) {
  return t.setHeader && typeof t.abort == "function";
}
function Ih(t, e, r) {
  if (typeof e == "function") return Ih(t, null, e);
  e || (e = {}), (r = yg(r || vg));
  var n = e.readable || (e.readable !== !1 && t.readable),
    i = e.writable || (e.writable !== !1 && t.writable),
    s = function () {
      t.writable || a();
    },
    o = t._writableState && t._writableState.finished,
    a = function () {
      (i = !1), (o = !0), n || r.call(t);
    },
    c = t._readableState && t._readableState.endEmitted,
    u = function () {
      (n = !1), (c = !0), i || r.call(t);
    },
    l = function (g) {
      r.call(t, g);
    },
    f = function () {
      var g;
      if (n && !c)
        return (
          (!t._readableState || !t._readableState.ended) && (g = new ul()),
          r.call(t, g)
        );
      if (i && !o)
        return (
          (!t._writableState || !t._writableState.ended) && (g = new ul()),
          r.call(t, g)
        );
    },
    h = function () {
      t.req.on("finish", a);
    };
  return (
    _g(t)
      ? (t.on("complete", a),
        t.on("abort", f),
        t.req ? h() : t.on("request", h))
      : i && !t._writableState && (t.on("end", s), t.on("close", s)),
    t.on("end", u),
    t.on("finish", a),
    e.error !== !1 && t.on("error", l),
    t.on("close", f),
    function () {
      t.removeListener("complete", a),
        t.removeListener("abort", f),
        t.removeListener("request", h),
        t.req && t.req.removeListener("finish", a),
        t.removeListener("end", s),
        t.removeListener("close", s),
        t.removeListener("finish", a),
        t.removeListener("end", u),
        t.removeListener("error", l),
        t.removeListener("close", f);
    }
  );
}
var Dc = Ih,
  Ea,
  ll;
function wg() {
  if (ll) return Ea;
  ll = 1;
  var t;
  function e(E, R, C) {
    return (
      (R = r(R)),
      R in E
        ? Object.defineProperty(E, R, {
            value: C,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (E[R] = C),
      E
    );
  }
  function r(E) {
    var R = n(E, "string");
    return typeof R == "symbol" ? R : String(R);
  }
  function n(E, R) {
    if (typeof E != "object" || E === null) return E;
    var C = E[Symbol.toPrimitive];
    if (C !== void 0) {
      var I = C.call(E, R || "default");
      if (typeof I != "object") return I;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (R === "string" ? String : Number)(E);
  }
  var i = Dc,
    s = Symbol("lastResolve"),
    o = Symbol("lastReject"),
    a = Symbol("error"),
    c = Symbol("ended"),
    u = Symbol("lastPromise"),
    l = Symbol("handlePromise"),
    f = Symbol("stream");
  function h(E, R) {
    return { value: E, done: R };
  }
  function b(E) {
    var R = E[s];
    if (R !== null) {
      var C = E[f].read();
      C !== null && ((E[u] = null), (E[s] = null), (E[o] = null), R(h(C, !1)));
    }
  }
  function g(E) {
    process.nextTick(b, E);
  }
  function y(E, R) {
    return function (C, I) {
      E.then(function () {
        if (R[c]) {
          C(h(void 0, !0));
          return;
        }
        R[l](C, I);
      }, I);
    };
  }
  var S = Object.getPrototypeOf(function () {}),
    m = Object.setPrototypeOf(
      ((t = {
        get stream() {
          return this[f];
        },
        next: function () {
          var R = this,
            C = this[a];
          if (C !== null) return Promise.reject(C);
          if (this[c]) return Promise.resolve(h(void 0, !0));
          if (this[f].destroyed)
            return new Promise(function (x, W) {
              process.nextTick(function () {
                R[a] ? W(R[a]) : x(h(void 0, !0));
              });
            });
          var I = this[u],
            $;
          if (I) $ = new Promise(y(I, this));
          else {
            var L = this[f].read();
            if (L !== null) return Promise.resolve(h(L, !1));
            $ = new Promise(this[l]);
          }
          return (this[u] = $), $;
        },
      }),
      e(t, Symbol.asyncIterator, function () {
        return this;
      }),
      e(t, "return", function () {
        var R = this;
        return new Promise(function (C, I) {
          R[f].destroy(null, function ($) {
            if ($) {
              I($);
              return;
            }
            C(h(void 0, !0));
          });
        });
      }),
      t),
      S,
    ),
    v = function (R) {
      var C,
        I = Object.create(
          m,
          ((C = {}),
          e(C, f, { value: R, writable: !0 }),
          e(C, s, { value: null, writable: !0 }),
          e(C, o, { value: null, writable: !0 }),
          e(C, a, { value: null, writable: !0 }),
          e(C, c, { value: R._readableState.endEmitted, writable: !0 }),
          e(C, l, {
            value: function (L, x) {
              var W = I[f].read();
              W
                ? ((I[u] = null), (I[s] = null), (I[o] = null), L(h(W, !1)))
                : ((I[s] = L), (I[o] = x));
            },
            writable: !0,
          }),
          C),
        );
      return (
        (I[u] = null),
        i(R, function ($) {
          if ($ && $.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var L = I[o];
            L !== null && ((I[u] = null), (I[s] = null), (I[o] = null), L($)),
              (I[a] = $);
            return;
          }
          var x = I[s];
          x !== null &&
            ((I[u] = null), (I[s] = null), (I[o] = null), x(h(void 0, !0))),
            (I[c] = !0);
        }),
        R.on("readable", g.bind(null, I)),
        I
      );
    };
  return (Ea = v), Ea;
}
var Ca, fl;
function Sg() {
  return (
    fl ||
      ((fl = 1),
      (Ca = function () {
        throw new Error("Readable.from is not available in the browser");
      })),
    Ca
  );
}
var Ra, hl;
function xh() {
  if (hl) return Ra;
  (hl = 1), (Ra = x);
  var t;
  (x.ReadableState = L), Tc.EventEmitter;
  var e = function (p, O) {
      return p.listeners(O).length;
    },
    r = wh,
    n = ls.Buffer,
    i =
      (typeof F < "u"
        ? F
        : typeof window < "u"
        ? window
        : typeof self < "u"
        ? self
        : {}
      ).Uint8Array || function () {};
  function s(d) {
    return n.from(d);
  }
  function o(d) {
    return n.isBuffer(d) || d instanceof i;
  }
  var a = Ac,
    c;
  a && a.debuglog ? (c = a.debuglog("stream")) : (c = function () {});
  var u = Gb(),
    l = Sh,
    f = Ch,
    h = f.getHighWaterMark,
    b = Ir.codes,
    g = b.ERR_INVALID_ARG_TYPE,
    y = b.ERR_STREAM_PUSH_AFTER_EOF,
    S = b.ERR_METHOD_NOT_IMPLEMENTED,
    m = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
    v,
    E,
    R;
  pt(x, r);
  var C = l.errorOrDestroy,
    I = ["error", "close", "destroy", "pause", "resume"];
  function $(d, p, O) {
    if (typeof d.prependListener == "function") return d.prependListener(p, O);
    !d._events || !d._events[p]
      ? d.on(p, O)
      : Array.isArray(d._events[p])
      ? d._events[p].unshift(O)
      : (d._events[p] = [O, d._events[p]]);
  }
  function L(d, p, O) {
    (t = t || tn()),
      (d = d || {}),
      typeof O != "boolean" && (O = p instanceof t),
      (this.objectMode = !!d.objectMode),
      O && (this.objectMode = this.objectMode || !!d.readableObjectMode),
      (this.highWaterMark = h(this, d, "readableHighWaterMark", O)),
      (this.buffer = new u()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.paused = !0),
      (this.emitClose = d.emitClose !== !1),
      (this.autoDestroy = !!d.autoDestroy),
      (this.destroyed = !1),
      (this.defaultEncoding = d.defaultEncoding || "utf8"),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      d.encoding &&
        (v || (v = ic.StringDecoder),
        (this.decoder = new v(d.encoding)),
        (this.encoding = d.encoding));
  }
  function x(d) {
    if (((t = t || tn()), !(this instanceof x))) return new x(d);
    var p = this instanceof t;
    (this._readableState = new L(d, this, p)),
      (this.readable = !0),
      d &&
        (typeof d.read == "function" && (this._read = d.read),
        typeof d.destroy == "function" && (this._destroy = d.destroy)),
      r.call(this);
  }
  Object.defineProperty(x.prototype, "destroyed", {
    enumerable: !1,
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (p) {
      this._readableState && (this._readableState.destroyed = p);
    },
  }),
    (x.prototype.destroy = l.destroy),
    (x.prototype._undestroy = l.undestroy),
    (x.prototype._destroy = function (d, p) {
      p(d);
    }),
    (x.prototype.push = function (d, p) {
      var O = this._readableState,
        D;
      return (
        O.objectMode
          ? (D = !0)
          : typeof d == "string" &&
            ((p = p || O.defaultEncoding),
            p !== O.encoding && ((d = n.from(d, p)), (p = "")),
            (D = !0)),
        W(this, d, p, !1, D)
      );
    }),
    (x.prototype.unshift = function (d) {
      return W(this, d, null, !0, !1);
    });
  function W(d, p, O, D, ge) {
    c("readableAddChunk", p);
    var Y = d._readableState;
    if (p === null) (Y.reading = !1), P(d, Y);
    else {
      var fe;
      if ((ge || (fe = K(Y, p)), fe)) C(d, fe);
      else if (Y.objectMode || (p && p.length > 0))
        if (
          (typeof p != "string" &&
            !Y.objectMode &&
            Object.getPrototypeOf(p) !== n.prototype &&
            (p = s(p)),
          D)
        )
          Y.endEmitted ? C(d, new m()) : se(d, Y, p, !0);
        else if (Y.ended) C(d, new y());
        else {
          if (Y.destroyed) return !1;
          (Y.reading = !1),
            Y.decoder && !O
              ? ((p = Y.decoder.write(p)),
                Y.objectMode || p.length !== 0 ? se(d, Y, p, !1) : U(d, Y))
              : se(d, Y, p, !1);
        }
      else D || ((Y.reading = !1), U(d, Y));
    }
    return !Y.ended && (Y.length < Y.highWaterMark || Y.length === 0);
  }
  function se(d, p, O, D) {
    p.flowing && p.length === 0 && !p.sync
      ? ((p.awaitDrain = 0), d.emit("data", O))
      : ((p.length += p.objectMode ? 1 : O.length),
        D ? p.buffer.unshift(O) : p.buffer.push(O),
        p.needReadable && B(d)),
      U(d, p);
  }
  function K(d, p) {
    var O;
    return (
      !o(p) &&
        typeof p != "string" &&
        p !== void 0 &&
        !d.objectMode &&
        (O = new g("chunk", ["string", "Buffer", "Uint8Array"], p)),
      O
    );
  }
  (x.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  }),
    (x.prototype.setEncoding = function (d) {
      v || (v = ic.StringDecoder);
      var p = new v(d);
      (this._readableState.decoder = p),
        (this._readableState.encoding = this._readableState.decoder.encoding);
      for (var O = this._readableState.buffer.head, D = ""; O !== null; )
        (D += p.write(O.data)), (O = O.next);
      return (
        this._readableState.buffer.clear(),
        D !== "" && this._readableState.buffer.push(D),
        (this._readableState.length = D.length),
        this
      );
    });
  var T = 1073741824;
  function k(d) {
    return (
      d >= T
        ? (d = T)
        : (d--,
          (d |= d >>> 1),
          (d |= d >>> 2),
          (d |= d >>> 4),
          (d |= d >>> 8),
          (d |= d >>> 16),
          d++),
      d
    );
  }
  function N(d, p) {
    return d <= 0 || (p.length === 0 && p.ended)
      ? 0
      : p.objectMode
      ? 1
      : d !== d
      ? p.flowing && p.length
        ? p.buffer.head.data.length
        : p.length
      : (d > p.highWaterMark && (p.highWaterMark = k(d)),
        d <= p.length ? d : p.ended ? p.length : ((p.needReadable = !0), 0));
  }
  x.prototype.read = function (d) {
    c("read", d), (d = parseInt(d, 10));
    var p = this._readableState,
      O = d;
    if (
      (d !== 0 && (p.emittedReadable = !1),
      d === 0 &&
        p.needReadable &&
        ((p.highWaterMark !== 0 ? p.length >= p.highWaterMark : p.length > 0) ||
          p.ended))
    )
      return (
        c("read: emitReadable", p.length, p.ended),
        p.length === 0 && p.ended ? M(this) : B(this),
        null
      );
    if (((d = N(d, p)), d === 0 && p.ended))
      return p.length === 0 && M(this), null;
    var D = p.needReadable;
    c("need readable", D),
      (p.length === 0 || p.length - d < p.highWaterMark) &&
        ((D = !0), c("length less than watermark", D)),
      p.ended || p.reading
        ? ((D = !1), c("reading or ended", D))
        : D &&
          (c("do read"),
          (p.reading = !0),
          (p.sync = !0),
          p.length === 0 && (p.needReadable = !0),
          this._read(p.highWaterMark),
          (p.sync = !1),
          p.reading || (d = N(O, p)));
    var ge;
    return (
      d > 0 ? (ge = w(d, p)) : (ge = null),
      ge === null
        ? ((p.needReadable = p.length <= p.highWaterMark), (d = 0))
        : ((p.length -= d), (p.awaitDrain = 0)),
      p.length === 0 &&
        (p.ended || (p.needReadable = !0), O !== d && p.ended && M(this)),
      ge !== null && this.emit("data", ge),
      ge
    );
  };
  function P(d, p) {
    if ((c("onEofChunk"), !p.ended)) {
      if (p.decoder) {
        var O = p.decoder.end();
        O &&
          O.length &&
          (p.buffer.push(O), (p.length += p.objectMode ? 1 : O.length));
      }
      (p.ended = !0),
        p.sync
          ? B(d)
          : ((p.needReadable = !1),
            p.emittedReadable || ((p.emittedReadable = !0), j(d)));
    }
  }
  function B(d) {
    var p = d._readableState;
    c("emitReadable", p.needReadable, p.emittedReadable),
      (p.needReadable = !1),
      p.emittedReadable ||
        (c("emitReadable", p.flowing),
        (p.emittedReadable = !0),
        process.nextTick(j, d));
  }
  function j(d) {
    var p = d._readableState;
    c("emitReadable_", p.destroyed, p.length, p.ended),
      !p.destroyed &&
        (p.length || p.ended) &&
        (d.emit("readable"), (p.emittedReadable = !1)),
      (p.needReadable = !p.flowing && !p.ended && p.length <= p.highWaterMark),
      _(d);
  }
  function U(d, p) {
    p.readingMore || ((p.readingMore = !0), process.nextTick(Q, d, p));
  }
  function Q(d, p) {
    for (
      ;
      !p.reading &&
      !p.ended &&
      (p.length < p.highWaterMark || (p.flowing && p.length === 0));

    ) {
      var O = p.length;
      if ((c("maybeReadMore read 0"), d.read(0), O === p.length)) break;
    }
    p.readingMore = !1;
  }
  (x.prototype._read = function (d) {
    C(this, new S("_read()"));
  }),
    (x.prototype.pipe = function (d, p) {
      var O = this,
        D = this._readableState;
      switch (D.pipesCount) {
        case 0:
          D.pipes = d;
          break;
        case 1:
          D.pipes = [D.pipes, d];
          break;
        default:
          D.pipes.push(d);
          break;
      }
      (D.pipesCount += 1), c("pipe count=%d opts=%j", D.pipesCount, p);
      var ge =
          (!p || p.end !== !1) && d !== process.stdout && d !== process.stderr,
        Y = ge ? Mt : Wt;
      D.endEmitted ? process.nextTick(Y) : O.once("end", Y), d.on("unpipe", fe);
      function fe(Nt, mt) {
        c("onunpipe"),
          Nt === O &&
            mt &&
            mt.hasUnpiped === !1 &&
            ((mt.hasUnpiped = !0), Ii());
      }
      function Mt() {
        c("onend"), d.end();
      }
      var or = q(O);
      d.on("drain", or);
      var An = !1;
      function Ii() {
        c("cleanup"),
          d.removeListener("close", Lr),
          d.removeListener("finish", Pr),
          d.removeListener("drain", or),
          d.removeListener("error", jr),
          d.removeListener("unpipe", fe),
          O.removeListener("end", Mt),
          O.removeListener("end", Wt),
          O.removeListener("data", Tn),
          (An = !0),
          D.awaitDrain &&
            (!d._writableState || d._writableState.needDrain) &&
            or();
      }
      O.on("data", Tn);
      function Tn(Nt) {
        c("ondata");
        var mt = d.write(Nt);
        c("dest.write", mt),
          mt === !1 &&
            (((D.pipesCount === 1 && D.pipes === d) ||
              (D.pipesCount > 1 && te(D.pipes, d) !== -1)) &&
              !An &&
              (c("false write response, pause", D.awaitDrain), D.awaitDrain++),
            O.pause());
      }
      function jr(Nt) {
        c("onerror", Nt),
          Wt(),
          d.removeListener("error", jr),
          e(d, "error") === 0 && C(d, Nt);
      }
      $(d, "error", jr);
      function Lr() {
        d.removeListener("finish", Pr), Wt();
      }
      d.once("close", Lr);
      function Pr() {
        c("onfinish"), d.removeListener("close", Lr), Wt();
      }
      d.once("finish", Pr);
      function Wt() {
        c("unpipe"), O.unpipe(d);
      }
      return d.emit("pipe", O), D.flowing || (c("pipe resume"), O.resume()), d;
    });
  function q(d) {
    return function () {
      var O = d._readableState;
      c("pipeOnDrain", O.awaitDrain),
        O.awaitDrain && O.awaitDrain--,
        O.awaitDrain === 0 && e(d, "data") && ((O.flowing = !0), _(d));
    };
  }
  (x.prototype.unpipe = function (d) {
    var p = this._readableState,
      O = { hasUnpiped: !1 };
    if (p.pipesCount === 0) return this;
    if (p.pipesCount === 1)
      return d && d !== p.pipes
        ? this
        : (d || (d = p.pipes),
          (p.pipes = null),
          (p.pipesCount = 0),
          (p.flowing = !1),
          d && d.emit("unpipe", this, O),
          this);
    if (!d) {
      var D = p.pipes,
        ge = p.pipesCount;
      (p.pipes = null), (p.pipesCount = 0), (p.flowing = !1);
      for (var Y = 0; Y < ge; Y++)
        D[Y].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var fe = te(p.pipes, d);
    return fe === -1
      ? this
      : (p.pipes.splice(fe, 1),
        (p.pipesCount -= 1),
        p.pipesCount === 1 && (p.pipes = p.pipes[0]),
        d.emit("unpipe", this, O),
        this);
  }),
    (x.prototype.on = function (d, p) {
      var O = r.prototype.on.call(this, d, p),
        D = this._readableState;
      return (
        d === "data"
          ? ((D.readableListening = this.listenerCount("readable") > 0),
            D.flowing !== !1 && this.resume())
          : d === "readable" &&
            !D.endEmitted &&
            !D.readableListening &&
            ((D.readableListening = D.needReadable = !0),
            (D.flowing = !1),
            (D.emittedReadable = !1),
            c("on readable", D.length, D.reading),
            D.length ? B(this) : D.reading || process.nextTick(he, this)),
        O
      );
    }),
    (x.prototype.addListener = x.prototype.on),
    (x.prototype.removeListener = function (d, p) {
      var O = r.prototype.removeListener.call(this, d, p);
      return d === "readable" && process.nextTick(oe, this), O;
    }),
    (x.prototype.removeAllListeners = function (d) {
      var p = r.prototype.removeAllListeners.apply(this, arguments);
      return (
        (d === "readable" || d === void 0) && process.nextTick(oe, this), p
      );
    });
  function oe(d) {
    var p = d._readableState;
    (p.readableListening = d.listenerCount("readable") > 0),
      p.resumeScheduled && !p.paused
        ? (p.flowing = !0)
        : d.listenerCount("data") > 0 && d.resume();
  }
  function he(d) {
    c("readable nexttick read 0"), d.read(0);
  }
  x.prototype.resume = function () {
    var d = this._readableState;
    return (
      d.flowing ||
        (c("resume"), (d.flowing = !d.readableListening), le(this, d)),
      (d.paused = !1),
      this
    );
  };
  function le(d, p) {
    p.resumeScheduled || ((p.resumeScheduled = !0), process.nextTick(Fe, d, p));
  }
  function Fe(d, p) {
    c("resume", p.reading),
      p.reading || d.read(0),
      (p.resumeScheduled = !1),
      d.emit("resume"),
      _(d),
      p.flowing && !p.reading && d.read(0);
  }
  x.prototype.pause = function () {
    return (
      c("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (c("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      (this._readableState.paused = !0),
      this
    );
  };
  function _(d) {
    var p = d._readableState;
    for (c("flow", p.flowing); p.flowing && d.read() !== null; );
  }
  (x.prototype.wrap = function (d) {
    var p = this,
      O = this._readableState,
      D = !1;
    d.on("end", function () {
      if ((c("wrapped end"), O.decoder && !O.ended)) {
        var fe = O.decoder.end();
        fe && fe.length && p.push(fe);
      }
      p.push(null);
    }),
      d.on("data", function (fe) {
        if (
          (c("wrapped data"),
          O.decoder && (fe = O.decoder.write(fe)),
          !(O.objectMode && fe == null) &&
            !(!O.objectMode && (!fe || !fe.length)))
        ) {
          var Mt = p.push(fe);
          Mt || ((D = !0), d.pause());
        }
      });
    for (var ge in d)
      this[ge] === void 0 &&
        typeof d[ge] == "function" &&
        (this[ge] = (function (Mt) {
          return function () {
            return d[Mt].apply(d, arguments);
          };
        })(ge));
    for (var Y = 0; Y < I.length; Y++) d.on(I[Y], this.emit.bind(this, I[Y]));
    return (
      (this._read = function (fe) {
        c("wrapped _read", fe), D && ((D = !1), d.resume());
      }),
      this
    );
  }),
    typeof Symbol == "function" &&
      (x.prototype[Symbol.asyncIterator] = function () {
        return E === void 0 && (E = wg()), E(this);
      }),
    Object.defineProperty(x.prototype, "readableHighWaterMark", {
      enumerable: !1,
      get: function () {
        return this._readableState.highWaterMark;
      },
    }),
    Object.defineProperty(x.prototype, "readableBuffer", {
      enumerable: !1,
      get: function () {
        return this._readableState && this._readableState.buffer;
      },
    }),
    Object.defineProperty(x.prototype, "readableFlowing", {
      enumerable: !1,
      get: function () {
        return this._readableState.flowing;
      },
      set: function (p) {
        this._readableState && (this._readableState.flowing = p);
      },
    }),
    (x._fromList = w),
    Object.defineProperty(x.prototype, "readableLength", {
      enumerable: !1,
      get: function () {
        return this._readableState.length;
      },
    });
  function w(d, p) {
    if (p.length === 0) return null;
    var O;
    return (
      p.objectMode
        ? (O = p.buffer.shift())
        : !d || d >= p.length
        ? (p.decoder
            ? (O = p.buffer.join(""))
            : p.buffer.length === 1
            ? (O = p.buffer.first())
            : (O = p.buffer.concat(p.length)),
          p.buffer.clear())
        : (O = p.buffer.consume(d, p.decoder)),
      O
    );
  }
  function M(d) {
    var p = d._readableState;
    c("endReadable", p.endEmitted),
      p.endEmitted || ((p.ended = !0), process.nextTick(z, p, d));
  }
  function z(d, p) {
    if (
      (c("endReadableNT", d.endEmitted, d.length),
      !d.endEmitted &&
        d.length === 0 &&
        ((d.endEmitted = !0), (p.readable = !1), p.emit("end"), d.autoDestroy))
    ) {
      var O = p._writableState;
      (!O || (O.autoDestroy && O.finished)) && p.destroy();
    }
  }
  typeof Symbol == "function" &&
    (x.from = function (d, p) {
      return R === void 0 && (R = Sg()), R(x, d, p);
    });
  function te(d, p) {
    for (var O = 0, D = d.length; O < D; O++) if (d[O] === p) return O;
    return -1;
  }
  return Ra;
}
var Ah = Ft,
  gs = Ir.codes,
  Eg = gs.ERR_METHOD_NOT_IMPLEMENTED,
  Cg = gs.ERR_MULTIPLE_CALLBACK,
  Rg = gs.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  Ig = gs.ERR_TRANSFORM_WITH_LENGTH_0,
  ms = tn();
pt(Ft, ms);
function xg(t, e) {
  var r = this._transformState;
  r.transforming = !1;
  var n = r.writecb;
  if (n === null) return this.emit("error", new Cg());
  (r.writechunk = null), (r.writecb = null), e != null && this.push(e), n(t);
  var i = this._readableState;
  (i.reading = !1),
    (i.needReadable || i.length < i.highWaterMark) &&
      this._read(i.highWaterMark);
}
function Ft(t) {
  if (!(this instanceof Ft)) return new Ft(t);
  ms.call(this, t),
    (this._transformState = {
      afterTransform: xg.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null,
    }),
    (this._readableState.needReadable = !0),
    (this._readableState.sync = !1),
    t &&
      (typeof t.transform == "function" && (this._transform = t.transform),
      typeof t.flush == "function" && (this._flush = t.flush)),
    this.on("prefinish", Ag);
}
function Ag() {
  var t = this;
  typeof this._flush == "function" && !this._readableState.destroyed
    ? this._flush(function (e, r) {
        dl(t, e, r);
      })
    : dl(this, null, null);
}
Ft.prototype.push = function (t, e) {
  return (
    (this._transformState.needTransform = !1),
    ms.prototype.push.call(this, t, e)
  );
};
Ft.prototype._transform = function (t, e, r) {
  r(new Eg("_transform()"));
};
Ft.prototype._write = function (t, e, r) {
  var n = this._transformState;
  if (
    ((n.writecb = r),
    (n.writechunk = t),
    (n.writeencoding = e),
    !n.transforming)
  ) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) &&
      this._read(i.highWaterMark);
  }
};
Ft.prototype._read = function (t) {
  var e = this._transformState;
  e.writechunk !== null && !e.transforming
    ? ((e.transforming = !0),
      this._transform(e.writechunk, e.writeencoding, e.afterTransform))
    : (e.needTransform = !0);
};
Ft.prototype._destroy = function (t, e) {
  ms.prototype._destroy.call(this, t, function (r) {
    e(r);
  });
};
function dl(t, e, r) {
  if (e) return t.emit("error", e);
  if ((r != null && t.push(r), t._writableState.length)) throw new Ig();
  if (t._transformState.transforming) throw new Rg();
  return t.push(null);
}
var Tg = zn,
  Th = Ah;
pt(zn, Th);
function zn(t) {
  if (!(this instanceof zn)) return new zn(t);
  Th.call(this, t);
}
zn.prototype._transform = function (t, e, r) {
  r(null, t);
};
var Ia;
function kg(t) {
  var e = !1;
  return function () {
    e || ((e = !0), t.apply(void 0, arguments));
  };
}
var kh = Ir.codes,
  Og = kh.ERR_MISSING_ARGS,
  Mg = kh.ERR_STREAM_DESTROYED;
function pl(t) {
  if (t) throw t;
}
function Ng(t) {
  return t.setHeader && typeof t.abort == "function";
}
function jg(t, e, r, n) {
  n = kg(n);
  var i = !1;
  t.on("close", function () {
    i = !0;
  }),
    Ia === void 0 && (Ia = Dc),
    Ia(t, { readable: e, writable: r }, function (o) {
      if (o) return n(o);
      (i = !0), n();
    });
  var s = !1;
  return function (o) {
    if (!i && !s) {
      if (((s = !0), Ng(t))) return t.abort();
      if (typeof t.destroy == "function") return t.destroy();
      n(o || new Mg("pipe"));
    }
  };
}
function bl(t) {
  t();
}
function Lg(t, e) {
  return t.pipe(e);
}
function Pg(t) {
  return !t.length || typeof t[t.length - 1] != "function" ? pl : t.pop();
}
function Dg() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  var n = Pg(e);
  if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
    throw new Og("streams");
  var i,
    s = e.map(function (o, a) {
      var c = a < e.length - 1,
        u = a > 0;
      return jg(o, c, u, function (l) {
        i || (i = l), l && s.forEach(bl), !c && (s.forEach(bl), n(i));
      });
    });
  return e.reduce(Lg);
}
var $g = Dg;
(function (t, e) {
  (e = t.exports = xh()),
    (e.Stream = e),
    (e.Readable = e),
    (e.Writable = Rh()),
    (e.Duplex = tn()),
    (e.Transform = Ah),
    (e.PassThrough = Tg),
    (e.finished = Dc),
    (e.pipeline = $g);
})(rc, rc.exports);
var Oh = rc.exports;
const { Transform: Bg } = Oh;
var Fg = (t) =>
  class Mh extends Bg {
    constructor(r, n, i, s, o) {
      super(o),
        (this._rate = r),
        (this._capacity = n),
        (this._delimitedSuffix = i),
        (this._hashBitLength = s),
        (this._options = o),
        (this._state = new t()),
        this._state.initialize(r, n),
        (this._finalized = !1);
    }
    _transform(r, n, i) {
      let s = null;
      try {
        this.update(r, n);
      } catch (o) {
        s = o;
      }
      i(s);
    }
    _flush(r) {
      let n = null;
      try {
        this.push(this.digest());
      } catch (i) {
        n = i;
      }
      r(n);
    }
    update(r, n) {
      if (!Buffer.isBuffer(r) && typeof r != "string")
        throw new TypeError("Data must be a string or a buffer");
      if (this._finalized) throw new Error("Digest already called");
      return (
        Buffer.isBuffer(r) || (r = Buffer.from(r, n)),
        this._state.absorb(r),
        this
      );
    }
    digest(r) {
      if (this._finalized) throw new Error("Digest already called");
      (this._finalized = !0),
        this._delimitedSuffix &&
          this._state.absorbLastFewBits(this._delimitedSuffix);
      let n = this._state.squeeze(this._hashBitLength / 8);
      return r !== void 0 && (n = n.toString(r)), this._resetState(), n;
    }
    _resetState() {
      return this._state.initialize(this._rate, this._capacity), this;
    }
    _clone() {
      const r = new Mh(
        this._rate,
        this._capacity,
        this._delimitedSuffix,
        this._hashBitLength,
        this._options,
      );
      return this._state.copy(r._state), (r._finalized = this._finalized), r;
    }
  };
const { Transform: Ug } = Oh;
var Hg = (t) =>
  class Nh extends Ug {
    constructor(r, n, i, s) {
      super(s),
        (this._rate = r),
        (this._capacity = n),
        (this._delimitedSuffix = i),
        (this._options = s),
        (this._state = new t()),
        this._state.initialize(r, n),
        (this._finalized = !1);
    }
    _transform(r, n, i) {
      let s = null;
      try {
        this.update(r, n);
      } catch (o) {
        s = o;
      }
      i(s);
    }
    _flush() {}
    _read(r) {
      this.push(this.squeeze(r));
    }
    update(r, n) {
      if (!Buffer.isBuffer(r) && typeof r != "string")
        throw new TypeError("Data must be a string or a buffer");
      if (this._finalized) throw new Error("Squeeze already called");
      return (
        Buffer.isBuffer(r) || (r = Buffer.from(r, n)),
        this._state.absorb(r),
        this
      );
    }
    squeeze(r, n) {
      this._finalized ||
        ((this._finalized = !0),
        this._state.absorbLastFewBits(this._delimitedSuffix));
      let i = this._state.squeeze(r);
      return n !== void 0 && (i = i.toString(n)), i;
    }
    _resetState() {
      return this._state.initialize(this._rate, this._capacity), this;
    }
    _clone() {
      const r = new Nh(
        this._rate,
        this._capacity,
        this._delimitedSuffix,
        this._options,
      );
      return this._state.copy(r._state), (r._finalized = this._finalized), r;
    }
  };
const Vg = Fg,
  Wg = Hg;
var zg = function (t) {
    const e = Vg(t),
      r = Wg(t);
    return function (n, i) {
      switch (typeof n == "string" ? n.toLowerCase() : n) {
        case "keccak224":
          return new e(1152, 448, null, 224, i);
        case "keccak256":
          return new e(1088, 512, null, 256, i);
        case "keccak384":
          return new e(832, 768, null, 384, i);
        case "keccak512":
          return new e(576, 1024, null, 512, i);
        case "sha3-224":
          return new e(1152, 448, 6, 224, i);
        case "sha3-256":
          return new e(1088, 512, 6, 256, i);
        case "sha3-384":
          return new e(832, 768, 6, 384, i);
        case "sha3-512":
          return new e(576, 1024, 6, 512, i);
        case "shake128":
          return new r(1344, 256, 31, i);
        case "shake256":
          return new r(1088, 512, 31, i);
        default:
          throw new Error("Invald algorithm: " + n);
      }
    };
  },
  jh = {};
const gl = [
  1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
  2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0,
  2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
  2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0,
  2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649,
  0, 2147516424, 2147483648,
];
jh.p1600 = function (t) {
  for (let e = 0; e < 24; ++e) {
    const r = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
      n = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
      i = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
      s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
      o = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
      a = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
      c = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
      u = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
      l = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
      f = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
    let h = l ^ ((i << 1) | (s >>> 31)),
      b = f ^ ((s << 1) | (i >>> 31));
    const g = t[0] ^ h,
      y = t[1] ^ b,
      S = t[10] ^ h,
      m = t[11] ^ b,
      v = t[20] ^ h,
      E = t[21] ^ b,
      R = t[30] ^ h,
      C = t[31] ^ b,
      I = t[40] ^ h,
      $ = t[41] ^ b;
    (h = r ^ ((o << 1) | (a >>> 31))), (b = n ^ ((a << 1) | (o >>> 31)));
    const L = t[2] ^ h,
      x = t[3] ^ b,
      W = t[12] ^ h,
      se = t[13] ^ b,
      K = t[22] ^ h,
      T = t[23] ^ b,
      k = t[32] ^ h,
      N = t[33] ^ b,
      P = t[42] ^ h,
      B = t[43] ^ b;
    (h = i ^ ((c << 1) | (u >>> 31))), (b = s ^ ((u << 1) | (c >>> 31)));
    const j = t[4] ^ h,
      U = t[5] ^ b,
      Q = t[14] ^ h,
      q = t[15] ^ b,
      oe = t[24] ^ h,
      he = t[25] ^ b,
      le = t[34] ^ h,
      Fe = t[35] ^ b,
      _ = t[44] ^ h,
      w = t[45] ^ b;
    (h = o ^ ((l << 1) | (f >>> 31))), (b = a ^ ((f << 1) | (l >>> 31)));
    const M = t[6] ^ h,
      z = t[7] ^ b,
      te = t[16] ^ h,
      d = t[17] ^ b,
      p = t[26] ^ h,
      O = t[27] ^ b,
      D = t[36] ^ h,
      ge = t[37] ^ b,
      Y = t[46] ^ h,
      fe = t[47] ^ b;
    (h = c ^ ((r << 1) | (n >>> 31))), (b = u ^ ((n << 1) | (r >>> 31)));
    const Mt = t[8] ^ h,
      or = t[9] ^ b,
      An = t[18] ^ h,
      Ii = t[19] ^ b,
      Tn = t[28] ^ h,
      jr = t[29] ^ b,
      Lr = t[38] ^ h,
      Pr = t[39] ^ b,
      Wt = t[48] ^ h,
      Nt = t[49] ^ b,
      mt = g,
      po = y,
      bo = (m << 4) | (S >>> 28),
      go = (S << 4) | (m >>> 28),
      mo = (v << 3) | (E >>> 29),
      yo = (E << 3) | (v >>> 29),
      vo = (C << 9) | (R >>> 23),
      _o = (R << 9) | (C >>> 23),
      wo = (I << 18) | ($ >>> 14),
      So = ($ << 18) | (I >>> 14),
      Eo = (L << 1) | (x >>> 31),
      Co = (x << 1) | (L >>> 31),
      Ro = (se << 12) | (W >>> 20),
      Io = (W << 12) | (se >>> 20),
      xo = (K << 10) | (T >>> 22),
      Ao = (T << 10) | (K >>> 22),
      To = (N << 13) | (k >>> 19),
      ko = (k << 13) | (N >>> 19),
      Oo = (P << 2) | (B >>> 30),
      Mo = (B << 2) | (P >>> 30),
      No = (U << 30) | (j >>> 2),
      jo = (j << 30) | (U >>> 2),
      Lo = (Q << 6) | (q >>> 26),
      Po = (q << 6) | (Q >>> 26),
      Do = (he << 11) | (oe >>> 21),
      $o = (oe << 11) | (he >>> 21),
      Bo = (le << 15) | (Fe >>> 17),
      Fo = (Fe << 15) | (le >>> 17),
      Uo = (w << 29) | (_ >>> 3),
      Ho = (_ << 29) | (w >>> 3),
      Vo = (M << 28) | (z >>> 4),
      Wo = (z << 28) | (M >>> 4),
      zo = (d << 23) | (te >>> 9),
      Go = (te << 23) | (d >>> 9),
      qo = (p << 25) | (O >>> 7),
      Jo = (O << 25) | (p >>> 7),
      Zo = (D << 21) | (ge >>> 11),
      Qo = (ge << 21) | (D >>> 11),
      Ko = (fe << 24) | (Y >>> 8),
      Yo = (Y << 24) | (fe >>> 8),
      Xo = (Mt << 27) | (or >>> 5),
      ea = (or << 27) | (Mt >>> 5),
      ta = (An << 20) | (Ii >>> 12),
      ra = (Ii << 20) | (An >>> 12),
      na = (jr << 7) | (Tn >>> 25),
      ia = (Tn << 7) | (jr >>> 25),
      sa = (Lr << 8) | (Pr >>> 24),
      oa = (Pr << 8) | (Lr >>> 24),
      aa = (Wt << 14) | (Nt >>> 18),
      ca = (Nt << 14) | (Wt >>> 18);
    (t[0] = mt ^ (~Ro & Do)),
      (t[1] = po ^ (~Io & $o)),
      (t[10] = Vo ^ (~ta & mo)),
      (t[11] = Wo ^ (~ra & yo)),
      (t[20] = Eo ^ (~Lo & qo)),
      (t[21] = Co ^ (~Po & Jo)),
      (t[30] = Xo ^ (~bo & xo)),
      (t[31] = ea ^ (~go & Ao)),
      (t[40] = No ^ (~zo & na)),
      (t[41] = jo ^ (~Go & ia)),
      (t[2] = Ro ^ (~Do & Zo)),
      (t[3] = Io ^ (~$o & Qo)),
      (t[12] = ta ^ (~mo & To)),
      (t[13] = ra ^ (~yo & ko)),
      (t[22] = Lo ^ (~qo & sa)),
      (t[23] = Po ^ (~Jo & oa)),
      (t[32] = bo ^ (~xo & Bo)),
      (t[33] = go ^ (~Ao & Fo)),
      (t[42] = zo ^ (~na & vo)),
      (t[43] = Go ^ (~ia & _o)),
      (t[4] = Do ^ (~Zo & aa)),
      (t[5] = $o ^ (~Qo & ca)),
      (t[14] = mo ^ (~To & Uo)),
      (t[15] = yo ^ (~ko & Ho)),
      (t[24] = qo ^ (~sa & wo)),
      (t[25] = Jo ^ (~oa & So)),
      (t[34] = xo ^ (~Bo & Ko)),
      (t[35] = Ao ^ (~Fo & Yo)),
      (t[44] = na ^ (~vo & Oo)),
      (t[45] = ia ^ (~_o & Mo)),
      (t[6] = Zo ^ (~aa & mt)),
      (t[7] = Qo ^ (~ca & po)),
      (t[16] = To ^ (~Uo & Vo)),
      (t[17] = ko ^ (~Ho & Wo)),
      (t[26] = sa ^ (~wo & Eo)),
      (t[27] = oa ^ (~So & Co)),
      (t[36] = Bo ^ (~Ko & Xo)),
      (t[37] = Fo ^ (~Yo & ea)),
      (t[46] = vo ^ (~Oo & No)),
      (t[47] = _o ^ (~Mo & jo)),
      (t[8] = aa ^ (~mt & Ro)),
      (t[9] = ca ^ (~po & Io)),
      (t[18] = Uo ^ (~Vo & ta)),
      (t[19] = Ho ^ (~Wo & ra)),
      (t[28] = wo ^ (~Eo & Lo)),
      (t[29] = So ^ (~Co & Po)),
      (t[38] = Ko ^ (~Xo & bo)),
      (t[39] = Yo ^ (~ea & go)),
      (t[48] = Oo ^ (~No & zo)),
      (t[49] = Mo ^ (~jo & Go)),
      (t[0] ^= gl[e * 2]),
      (t[1] ^= gl[e * 2 + 1]);
  }
};
const Qi = jh;
function gn() {
  (this.state = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]),
    (this.blockSize = null),
    (this.count = 0),
    (this.squeezing = !1);
}
gn.prototype.initialize = function (t, e) {
  for (let r = 0; r < 50; ++r) this.state[r] = 0;
  (this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1);
};
gn.prototype.absorb = function (t) {
  for (let e = 0; e < t.length; ++e)
    (this.state[~~(this.count / 4)] ^= t[e] << (8 * (this.count % 4))),
      (this.count += 1),
      this.count === this.blockSize && (Qi.p1600(this.state), (this.count = 0));
};
gn.prototype.absorbLastFewBits = function (t) {
  (this.state[~~(this.count / 4)] ^= t << (8 * (this.count % 4))),
    t & 128 && this.count === this.blockSize - 1 && Qi.p1600(this.state),
    (this.state[~~((this.blockSize - 1) / 4)] ^=
      128 << (8 * ((this.blockSize - 1) % 4))),
    Qi.p1600(this.state),
    (this.count = 0),
    (this.squeezing = !0);
};
gn.prototype.squeeze = function (t) {
  this.squeezing || this.absorbLastFewBits(1);
  const e = Buffer.alloc(t);
  for (let r = 0; r < t; ++r)
    (e[r] = (this.state[~~(this.count / 4)] >>> (8 * (this.count % 4))) & 255),
      (this.count += 1),
      this.count === this.blockSize && (Qi.p1600(this.state), (this.count = 0));
  return e;
};
gn.prototype.copy = function (t) {
  for (let e = 0; e < 50; ++e) t.state[e] = this.state[e];
  (t.blockSize = this.blockSize),
    (t.count = this.count),
    (t.squeezing = this.squeezing);
};
var Gg = gn,
  qg = zg(Gg),
  Lh = { exports: {} },
  Ph = ir.Buffer;
function ys(t, e) {
  (this._block = Ph.alloc(t)),
    (this._finalSize = e),
    (this._blockSize = t),
    (this._len = 0);
}
ys.prototype.update = function (t, e) {
  typeof t == "string" && ((e = e || "utf8"), (t = Ph.from(t, e)));
  for (
    var r = this._block,
      n = this._blockSize,
      i = t.length,
      s = this._len,
      o = 0;
    o < i;

  ) {
    for (var a = s % n, c = Math.min(i - o, n - a), u = 0; u < c; u++)
      r[a + u] = t[o + u];
    (s += c), (o += c), s % n === 0 && this._update(r);
  }
  return (this._len += i), this;
};
ys.prototype.digest = function (t) {
  var e = this._len % this._blockSize;
  (this._block[e] = 128),
    this._block.fill(0, e + 1),
    e >= this._finalSize && (this._update(this._block), this._block.fill(0));
  var r = this._len * 8;
  if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4);
  else {
    var n = (r & 4294967295) >>> 0,
      i = (r - n) / 4294967296;
    this._block.writeUInt32BE(i, this._blockSize - 8),
      this._block.writeUInt32BE(n, this._blockSize - 4);
  }
  this._update(this._block);
  var s = this._hash();
  return t ? s.toString(t) : s;
};
ys.prototype._update = function () {
  throw new Error("_update must be implemented by subclass");
};
var mn = ys,
  Jg = pt,
  Dh = mn,
  Zg = ir.Buffer,
  Qg = [1518500249, 1859775393, -1894007588, -899497514],
  Kg = new Array(80);
function ti() {
  this.init(), (this._w = Kg), Dh.call(this, 64, 56);
}
Jg(ti, Dh);
ti.prototype.init = function () {
  return (
    (this._a = 1732584193),
    (this._b = 4023233417),
    (this._c = 2562383102),
    (this._d = 271733878),
    (this._e = 3285377520),
    this
  );
};
function Yg(t) {
  return (t << 5) | (t >>> 27);
}
function Xg(t) {
  return (t << 30) | (t >>> 2);
}
function em(t, e, r, n) {
  return t === 0
    ? (e & r) | (~e & n)
    : t === 2
    ? (e & r) | (e & n) | (r & n)
    : e ^ r ^ n;
}
ti.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._a | 0,
      n = this._b | 0,
      i = this._c | 0,
      s = this._d | 0,
      o = this._e | 0,
      a = 0;
    a < 16;
    ++a
  )
    e[a] = t.readInt32BE(a * 4);
  for (; a < 80; ++a) e[a] = e[a - 3] ^ e[a - 8] ^ e[a - 14] ^ e[a - 16];
  for (var c = 0; c < 80; ++c) {
    var u = ~~(c / 20),
      l = (Yg(r) + em(u, n, i, s) + o + e[c] + Qg[u]) | 0;
    (o = s), (s = i), (i = Xg(n)), (n = r), (r = l);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0);
};
ti.prototype._hash = function () {
  var t = Zg.allocUnsafe(20);
  return (
    t.writeInt32BE(this._a | 0, 0),
    t.writeInt32BE(this._b | 0, 4),
    t.writeInt32BE(this._c | 0, 8),
    t.writeInt32BE(this._d | 0, 12),
    t.writeInt32BE(this._e | 0, 16),
    t
  );
};
var tm = ti,
  rm = pt,
  $h = mn,
  nm = ir.Buffer,
  im = [1518500249, 1859775393, -1894007588, -899497514],
  sm = new Array(80);
function ri() {
  this.init(), (this._w = sm), $h.call(this, 64, 56);
}
rm(ri, $h);
ri.prototype.init = function () {
  return (
    (this._a = 1732584193),
    (this._b = 4023233417),
    (this._c = 2562383102),
    (this._d = 271733878),
    (this._e = 3285377520),
    this
  );
};
function om(t) {
  return (t << 1) | (t >>> 31);
}
function am(t) {
  return (t << 5) | (t >>> 27);
}
function cm(t) {
  return (t << 30) | (t >>> 2);
}
function um(t, e, r, n) {
  return t === 0
    ? (e & r) | (~e & n)
    : t === 2
    ? (e & r) | (e & n) | (r & n)
    : e ^ r ^ n;
}
ri.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._a | 0,
      n = this._b | 0,
      i = this._c | 0,
      s = this._d | 0,
      o = this._e | 0,
      a = 0;
    a < 16;
    ++a
  )
    e[a] = t.readInt32BE(a * 4);
  for (; a < 80; ++a) e[a] = om(e[a - 3] ^ e[a - 8] ^ e[a - 14] ^ e[a - 16]);
  for (var c = 0; c < 80; ++c) {
    var u = ~~(c / 20),
      l = (am(r) + um(u, n, i, s) + o + e[c] + im[u]) | 0;
    (o = s), (s = i), (i = cm(n)), (n = r), (r = l);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0);
};
ri.prototype._hash = function () {
  var t = nm.allocUnsafe(20);
  return (
    t.writeInt32BE(this._a | 0, 0),
    t.writeInt32BE(this._b | 0, 4),
    t.writeInt32BE(this._c | 0, 8),
    t.writeInt32BE(this._d | 0, 12),
    t.writeInt32BE(this._e | 0, 16),
    t
  );
};
var lm = ri,
  fm = pt,
  Bh = mn,
  hm = ir.Buffer,
  dm = [
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
  ],
  pm = new Array(64);
function ni() {
  this.init(), (this._w = pm), Bh.call(this, 64, 56);
}
fm(ni, Bh);
ni.prototype.init = function () {
  return (
    (this._a = 1779033703),
    (this._b = 3144134277),
    (this._c = 1013904242),
    (this._d = 2773480762),
    (this._e = 1359893119),
    (this._f = 2600822924),
    (this._g = 528734635),
    (this._h = 1541459225),
    this
  );
};
function bm(t, e, r) {
  return r ^ (t & (e ^ r));
}
function gm(t, e, r) {
  return (t & e) | (r & (t | e));
}
function mm(t) {
  return (
    ((t >>> 2) | (t << 30)) ^
    ((t >>> 13) | (t << 19)) ^
    ((t >>> 22) | (t << 10))
  );
}
function ym(t) {
  return (
    ((t >>> 6) | (t << 26)) ^ ((t >>> 11) | (t << 21)) ^ ((t >>> 25) | (t << 7))
  );
}
function vm(t) {
  return ((t >>> 7) | (t << 25)) ^ ((t >>> 18) | (t << 14)) ^ (t >>> 3);
}
function _m(t) {
  return ((t >>> 17) | (t << 15)) ^ ((t >>> 19) | (t << 13)) ^ (t >>> 10);
}
ni.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._a | 0,
      n = this._b | 0,
      i = this._c | 0,
      s = this._d | 0,
      o = this._e | 0,
      a = this._f | 0,
      c = this._g | 0,
      u = this._h | 0,
      l = 0;
    l < 16;
    ++l
  )
    e[l] = t.readInt32BE(l * 4);
  for (; l < 64; ++l)
    e[l] = (_m(e[l - 2]) + e[l - 7] + vm(e[l - 15]) + e[l - 16]) | 0;
  for (var f = 0; f < 64; ++f) {
    var h = (u + ym(o) + bm(o, a, c) + dm[f] + e[f]) | 0,
      b = (mm(r) + gm(r, n, i)) | 0;
    (u = c),
      (c = a),
      (a = o),
      (o = (s + h) | 0),
      (s = i),
      (i = n),
      (n = r),
      (r = (h + b) | 0);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0),
    (this._f = (a + this._f) | 0),
    (this._g = (c + this._g) | 0),
    (this._h = (u + this._h) | 0);
};
ni.prototype._hash = function () {
  var t = hm.allocUnsafe(32);
  return (
    t.writeInt32BE(this._a, 0),
    t.writeInt32BE(this._b, 4),
    t.writeInt32BE(this._c, 8),
    t.writeInt32BE(this._d, 12),
    t.writeInt32BE(this._e, 16),
    t.writeInt32BE(this._f, 20),
    t.writeInt32BE(this._g, 24),
    t.writeInt32BE(this._h, 28),
    t
  );
};
var Fh = ni,
  wm = pt,
  Sm = Fh,
  Em = mn,
  Cm = ir.Buffer,
  Rm = new Array(64);
function vs() {
  this.init(), (this._w = Rm), Em.call(this, 64, 56);
}
wm(vs, Sm);
vs.prototype.init = function () {
  return (
    (this._a = 3238371032),
    (this._b = 914150663),
    (this._c = 812702999),
    (this._d = 4144912697),
    (this._e = 4290775857),
    (this._f = 1750603025),
    (this._g = 1694076839),
    (this._h = 3204075428),
    this
  );
};
vs.prototype._hash = function () {
  var t = Cm.allocUnsafe(28);
  return (
    t.writeInt32BE(this._a, 0),
    t.writeInt32BE(this._b, 4),
    t.writeInt32BE(this._c, 8),
    t.writeInt32BE(this._d, 12),
    t.writeInt32BE(this._e, 16),
    t.writeInt32BE(this._f, 20),
    t.writeInt32BE(this._g, 24),
    t
  );
};
var Im = vs,
  xm = pt,
  Uh = mn,
  Am = ir.Buffer,
  ml = [
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
  ],
  Tm = new Array(160);
function ii() {
  this.init(), (this._w = Tm), Uh.call(this, 128, 112);
}
xm(ii, Uh);
ii.prototype.init = function () {
  return (
    (this._ah = 1779033703),
    (this._bh = 3144134277),
    (this._ch = 1013904242),
    (this._dh = 2773480762),
    (this._eh = 1359893119),
    (this._fh = 2600822924),
    (this._gh = 528734635),
    (this._hh = 1541459225),
    (this._al = 4089235720),
    (this._bl = 2227873595),
    (this._cl = 4271175723),
    (this._dl = 1595750129),
    (this._el = 2917565137),
    (this._fl = 725511199),
    (this._gl = 4215389547),
    (this._hl = 327033209),
    this
  );
};
function yl(t, e, r) {
  return r ^ (t & (e ^ r));
}
function vl(t, e, r) {
  return (t & e) | (r & (t | e));
}
function _l(t, e) {
  return (
    ((t >>> 28) | (e << 4)) ^ ((e >>> 2) | (t << 30)) ^ ((e >>> 7) | (t << 25))
  );
}
function wl(t, e) {
  return (
    ((t >>> 14) | (e << 18)) ^
    ((t >>> 18) | (e << 14)) ^
    ((e >>> 9) | (t << 23))
  );
}
function km(t, e) {
  return ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ (t >>> 7);
}
function Om(t, e) {
  return (
    ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ ((t >>> 7) | (e << 25))
  );
}
function Mm(t, e) {
  return ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ (t >>> 6);
}
function Nm(t, e) {
  return (
    ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ ((t >>> 6) | (e << 26))
  );
}
function Ae(t, e) {
  return t >>> 0 < e >>> 0 ? 1 : 0;
}
ii.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._ah | 0,
      n = this._bh | 0,
      i = this._ch | 0,
      s = this._dh | 0,
      o = this._eh | 0,
      a = this._fh | 0,
      c = this._gh | 0,
      u = this._hh | 0,
      l = this._al | 0,
      f = this._bl | 0,
      h = this._cl | 0,
      b = this._dl | 0,
      g = this._el | 0,
      y = this._fl | 0,
      S = this._gl | 0,
      m = this._hl | 0,
      v = 0;
    v < 32;
    v += 2
  )
    (e[v] = t.readInt32BE(v * 4)), (e[v + 1] = t.readInt32BE(v * 4 + 4));
  for (; v < 160; v += 2) {
    var E = e[v - 30],
      R = e[v - 15 * 2 + 1],
      C = km(E, R),
      I = Om(R, E);
    (E = e[v - 2 * 2]), (R = e[v - 2 * 2 + 1]);
    var $ = Mm(E, R),
      L = Nm(R, E),
      x = e[v - 7 * 2],
      W = e[v - 7 * 2 + 1],
      se = e[v - 16 * 2],
      K = e[v - 16 * 2 + 1],
      T = (I + W) | 0,
      k = (C + x + Ae(T, I)) | 0;
    (T = (T + L) | 0),
      (k = (k + $ + Ae(T, L)) | 0),
      (T = (T + K) | 0),
      (k = (k + se + Ae(T, K)) | 0),
      (e[v] = k),
      (e[v + 1] = T);
  }
  for (var N = 0; N < 160; N += 2) {
    (k = e[N]), (T = e[N + 1]);
    var P = vl(r, n, i),
      B = vl(l, f, h),
      j = _l(r, l),
      U = _l(l, r),
      Q = wl(o, g),
      q = wl(g, o),
      oe = ml[N],
      he = ml[N + 1],
      le = yl(o, a, c),
      Fe = yl(g, y, S),
      _ = (m + q) | 0,
      w = (u + Q + Ae(_, m)) | 0;
    (_ = (_ + Fe) | 0),
      (w = (w + le + Ae(_, Fe)) | 0),
      (_ = (_ + he) | 0),
      (w = (w + oe + Ae(_, he)) | 0),
      (_ = (_ + T) | 0),
      (w = (w + k + Ae(_, T)) | 0);
    var M = (U + B) | 0,
      z = (j + P + Ae(M, U)) | 0;
    (u = c),
      (m = S),
      (c = a),
      (S = y),
      (a = o),
      (y = g),
      (g = (b + _) | 0),
      (o = (s + w + Ae(g, b)) | 0),
      (s = i),
      (b = h),
      (i = n),
      (h = f),
      (n = r),
      (f = l),
      (l = (_ + M) | 0),
      (r = (w + z + Ae(l, _)) | 0);
  }
  (this._al = (this._al + l) | 0),
    (this._bl = (this._bl + f) | 0),
    (this._cl = (this._cl + h) | 0),
    (this._dl = (this._dl + b) | 0),
    (this._el = (this._el + g) | 0),
    (this._fl = (this._fl + y) | 0),
    (this._gl = (this._gl + S) | 0),
    (this._hl = (this._hl + m) | 0),
    (this._ah = (this._ah + r + Ae(this._al, l)) | 0),
    (this._bh = (this._bh + n + Ae(this._bl, f)) | 0),
    (this._ch = (this._ch + i + Ae(this._cl, h)) | 0),
    (this._dh = (this._dh + s + Ae(this._dl, b)) | 0),
    (this._eh = (this._eh + o + Ae(this._el, g)) | 0),
    (this._fh = (this._fh + a + Ae(this._fl, y)) | 0),
    (this._gh = (this._gh + c + Ae(this._gl, S)) | 0),
    (this._hh = (this._hh + u + Ae(this._hl, m)) | 0);
};
ii.prototype._hash = function () {
  var t = Am.allocUnsafe(64);
  function e(r, n, i) {
    t.writeInt32BE(r, i), t.writeInt32BE(n, i + 4);
  }
  return (
    e(this._ah, this._al, 0),
    e(this._bh, this._bl, 8),
    e(this._ch, this._cl, 16),
    e(this._dh, this._dl, 24),
    e(this._eh, this._el, 32),
    e(this._fh, this._fl, 40),
    e(this._gh, this._gl, 48),
    e(this._hh, this._hl, 56),
    t
  );
};
var Hh = ii,
  jm = pt,
  Lm = Hh,
  Pm = mn,
  Dm = ir.Buffer,
  $m = new Array(160);
function _s() {
  this.init(), (this._w = $m), Pm.call(this, 128, 112);
}
jm(_s, Lm);
_s.prototype.init = function () {
  return (
    (this._ah = 3418070365),
    (this._bh = 1654270250),
    (this._ch = 2438529370),
    (this._dh = 355462360),
    (this._eh = 1731405415),
    (this._fh = 2394180231),
    (this._gh = 3675008525),
    (this._hh = 1203062813),
    (this._al = 3238371032),
    (this._bl = 914150663),
    (this._cl = 812702999),
    (this._dl = 4144912697),
    (this._el = 4290775857),
    (this._fl = 1750603025),
    (this._gl = 1694076839),
    (this._hl = 3204075428),
    this
  );
};
_s.prototype._hash = function () {
  var t = Dm.allocUnsafe(48);
  function e(r, n, i) {
    t.writeInt32BE(r, i), t.writeInt32BE(n, i + 4);
  }
  return (
    e(this._ah, this._al, 0),
    e(this._bh, this._bl, 8),
    e(this._ch, this._cl, 16),
    e(this._dh, this._dl, 24),
    e(this._eh, this._el, 32),
    e(this._fh, this._fl, 40),
    t
  );
};
var Bm = _s,
  xr = (Lh.exports = function (e) {
    e = e.toLowerCase();
    var r = xr[e];
    if (!r) throw new Error(e + " is not supported (we accept pull requests)");
    return new r();
  });
xr.sha = tm;
xr.sha1 = lm;
xr.sha224 = Im;
xr.sha256 = Fh;
xr.sha384 = Bm;
xr.sha512 = Hh;
var Fm = Lh.exports,
  $c = {},
  Gn = {},
  ws = {};
Object.defineProperty(ws, "__esModule", { value: !0 });
ws.walletLogo = void 0;
const Um = (t, e) => {
  let r;
  switch (t) {
    case "standard":
      return (
        (r = e),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `
      );
    case "circle":
      return (
        (r = e),
        `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${r}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`
      );
    case "text":
      return (
        (r = (0.1 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
      );
    case "textWithLogo":
      return (
        (r = (0.25 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
      );
    case "textLight":
      return (
        (r = (0.1 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
      );
    case "textWithLogoLight":
      return (
        (r = (0.25 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
      );
    default:
      return (
        (r = e),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `
      );
  }
};
ws.walletLogo = Um;
var Ss = {};
Object.defineProperty(Ss, "__esModule", { value: !0 });
Ss.ScopedLocalStorage = void 0;
class Hm {
  constructor(e) {
    this.scope = e;
  }
  setItem(e, r) {
    localStorage.setItem(this.scopedKey(e), r);
  }
  getItem(e) {
    return localStorage.getItem(this.scopedKey(e));
  }
  removeItem(e) {
    localStorage.removeItem(this.scopedKey(e));
  }
  clear() {
    const e = this.scopedKey(""),
      r = [];
    for (let n = 0; n < localStorage.length; n++) {
      const i = localStorage.key(n);
      typeof i == "string" && i.startsWith(e) && r.push(i);
    }
    r.forEach((n) => localStorage.removeItem(n));
  }
  scopedKey(e) {
    return `${this.scope}:${e}`;
  }
}
Ss.ScopedLocalStorage = Hm;
var rn = {},
  Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
const Vm = Tc;
function Sl(t, e, r) {
  try {
    Reflect.apply(t, e, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    });
  }
}
function Wm(t) {
  const e = t.length,
    r = new Array(e);
  for (let n = 0; n < e; n += 1) r[n] = t[n];
  return r;
}
let zm = class extends Vm.EventEmitter {
  emit(e, ...r) {
    let n = e === "error";
    const i = this._events;
    if (i !== void 0) n = n && i.error === void 0;
    else if (!n) return !1;
    if (n) {
      let o;
      if ((r.length > 0 && ([o] = r), o instanceof Error)) throw o;
      const a = new Error(`Unhandled error.${o ? ` (${o.message})` : ""}`);
      throw ((a.context = o), a);
    }
    const s = i[e];
    if (s === void 0) return !1;
    if (typeof s == "function") Sl(s, this, r);
    else {
      const o = s.length,
        a = Wm(s);
      for (let c = 0; c < o; c += 1) Sl(a[c], this, r);
    }
    return !0;
  }
};
Ar.default = zm;
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.EVENTS = void 0;
yn.EVENTS = {
  STARTED_CONNECTING: "walletlink_sdk.started.connecting",
  CONNECTED_STATE_CHANGE: "walletlink_sdk.connected",
  DISCONNECTED: "walletlink_sdk.disconnected",
  METADATA_DESTROYED: "walletlink_sdk_metadata_destroyed",
  LINKED: "walletlink_sdk.linked",
  FAILURE: "walletlink_sdk.generic_failure",
  SESSION_CONFIG_RECEIVED: "walletlink_sdk.session_config_event_received",
  ETH_ACCOUNTS_STATE: "walletlink_sdk.eth_accounts_state",
  SESSION_STATE_CHANGE: "walletlink_sdk.session_state_change",
  UNLINKED_ERROR_STATE: "walletlink_sdk.unlinked_error_state",
  SKIPPED_CLEARING_SESSION: "walletlink_sdk.skipped_clearing_session",
  GENERAL_ERROR: "walletlink_sdk.general_error",
  WEB3_REQUEST: "walletlink_sdk.web3.request",
  WEB3_REQUEST_PUBLISHED: "walletlink_sdk.web3.request_published",
  WEB3_RESPONSE: "walletlink_sdk.web3.response",
  UNKNOWN_ADDRESS_ENCOUNTERED: "walletlink_sdk.unknown_address_encountered",
};
var si = {},
  Bc = {},
  Xt = {},
  Gm = qn;
qn.default = qn;
qn.stable = zh;
qn.stableStringify = zh;
var Ki = "[...]",
  Vh = "[Circular]",
  wr = [],
  gr = [];
function Wh() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER,
  };
}
function qn(t, e, r, n) {
  typeof n > "u" && (n = Wh()), sc(t, "", 0, [], void 0, 0, n);
  var i;
  try {
    gr.length === 0
      ? (i = JSON.stringify(t, e, r))
      : (i = JSON.stringify(t, Gh(e), r));
  } catch {
    return JSON.stringify(
      "[unable to serialize, circular reference is too complex to analyze]",
    );
  } finally {
    for (; wr.length !== 0; ) {
      var s = wr.pop();
      s.length === 4
        ? Object.defineProperty(s[0], s[1], s[3])
        : (s[0][s[1]] = s[2]);
    }
  }
  return i;
}
function Zr(t, e, r, n) {
  var i = Object.getOwnPropertyDescriptor(n, r);
  i.get !== void 0
    ? i.configurable
      ? (Object.defineProperty(n, r, { value: t }), wr.push([n, r, e, i]))
      : gr.push([e, r, t])
    : ((n[r] = t), wr.push([n, r, e]));
}
function sc(t, e, r, n, i, s, o) {
  s += 1;
  var a;
  if (typeof t == "object" && t !== null) {
    for (a = 0; a < n.length; a++)
      if (n[a] === t) {
        Zr(Vh, t, e, i);
        return;
      }
    if (typeof o.depthLimit < "u" && s > o.depthLimit) {
      Zr(Ki, t, e, i);
      return;
    }
    if (typeof o.edgesLimit < "u" && r + 1 > o.edgesLimit) {
      Zr(Ki, t, e, i);
      return;
    }
    if ((n.push(t), Array.isArray(t)))
      for (a = 0; a < t.length; a++) sc(t[a], a, a, n, t, s, o);
    else {
      var c = Object.keys(t);
      for (a = 0; a < c.length; a++) {
        var u = c[a];
        sc(t[u], u, a, n, t, s, o);
      }
    }
    n.pop();
  }
}
function qm(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function zh(t, e, r, n) {
  typeof n > "u" && (n = Wh());
  var i = oc(t, "", 0, [], void 0, 0, n) || t,
    s;
  try {
    gr.length === 0
      ? (s = JSON.stringify(i, e, r))
      : (s = JSON.stringify(i, Gh(e), r));
  } catch {
    return JSON.stringify(
      "[unable to serialize, circular reference is too complex to analyze]",
    );
  } finally {
    for (; wr.length !== 0; ) {
      var o = wr.pop();
      o.length === 4
        ? Object.defineProperty(o[0], o[1], o[3])
        : (o[0][o[1]] = o[2]);
    }
  }
  return s;
}
function oc(t, e, r, n, i, s, o) {
  s += 1;
  var a;
  if (typeof t == "object" && t !== null) {
    for (a = 0; a < n.length; a++)
      if (n[a] === t) {
        Zr(Vh, t, e, i);
        return;
      }
    try {
      if (typeof t.toJSON == "function") return;
    } catch {
      return;
    }
    if (typeof o.depthLimit < "u" && s > o.depthLimit) {
      Zr(Ki, t, e, i);
      return;
    }
    if (typeof o.edgesLimit < "u" && r + 1 > o.edgesLimit) {
      Zr(Ki, t, e, i);
      return;
    }
    if ((n.push(t), Array.isArray(t)))
      for (a = 0; a < t.length; a++) oc(t[a], a, a, n, t, s, o);
    else {
      var c = {},
        u = Object.keys(t).sort(qm);
      for (a = 0; a < u.length; a++) {
        var l = u[a];
        oc(t[l], l, a, n, t, s, o), (c[l] = t[l]);
      }
      if (typeof i < "u") wr.push([i, e, t]), (i[e] = c);
      else return c;
    }
    n.pop();
  }
}
function Gh(t) {
  return (
    (t =
      typeof t < "u"
        ? t
        : function (e, r) {
            return r;
          }),
    function (e, r) {
      if (gr.length > 0)
        for (var n = 0; n < gr.length; n++) {
          var i = gr[n];
          if (i[1] === e && i[0] === r) {
            (r = i[2]), gr.splice(n, 1);
            break;
          }
        }
      return t.call(this, e, r);
    }
  );
}
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.EthereumProviderError = Xt.EthereumRpcError = void 0;
const Jm = Gm;
class qh extends Error {
  constructor(e, r, n) {
    if (!Number.isInteger(e)) throw new Error('"code" must be an integer.');
    if (!r || typeof r != "string")
      throw new Error('"message" must be a nonempty string.');
    super(r), (this.code = e), n !== void 0 && (this.data = n);
  }
  serialize() {
    const e = { code: this.code, message: this.message };
    return (
      this.data !== void 0 && (e.data = this.data),
      this.stack && (e.stack = this.stack),
      e
    );
  }
  toString() {
    return Jm.default(this.serialize(), Km, 2);
  }
}
Xt.EthereumRpcError = qh;
class Zm extends qh {
  constructor(e, r, n) {
    if (!Qm(e))
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999',
      );
    super(e, r, n);
  }
}
Xt.EthereumProviderError = Zm;
function Qm(t) {
  return Number.isInteger(t) && t >= 1e3 && t <= 4999;
}
function Km(t, e) {
  if (e !== "[Circular]") return e;
}
var Fc = {},
  er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.errorValues = er.errorCodes = void 0;
er.errorCodes = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603,
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901,
  },
};
er.errorValues = {
  "-32700": {
    standard: "JSON RPC 2.0",
    message:
      "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
  },
  "-32600": {
    standard: "JSON RPC 2.0",
    message: "The JSON sent is not a valid Request object.",
  },
  "-32601": {
    standard: "JSON RPC 2.0",
    message: "The method does not exist / is not available.",
  },
  "-32602": {
    standard: "JSON RPC 2.0",
    message: "Invalid method parameter(s).",
  },
  "-32603": { standard: "JSON RPC 2.0", message: "Internal JSON-RPC error." },
  "-32000": { standard: "EIP-1474", message: "Invalid input." },
  "-32001": { standard: "EIP-1474", message: "Resource not found." },
  "-32002": { standard: "EIP-1474", message: "Resource unavailable." },
  "-32003": { standard: "EIP-1474", message: "Transaction rejected." },
  "-32004": { standard: "EIP-1474", message: "Method not supported." },
  "-32005": { standard: "EIP-1474", message: "Request limit exceeded." },
  4001: { standard: "EIP-1193", message: "User rejected the request." },
  4100: {
    standard: "EIP-1193",
    message:
      "The requested account and/or method has not been authorized by the user.",
  },
  4200: {
    standard: "EIP-1193",
    message: "The requested method is not supported by this Ethereum provider.",
  },
  4900: {
    standard: "EIP-1193",
    message: "The provider is disconnected from all chains.",
  },
  4901: {
    standard: "EIP-1193",
    message: "The provider is disconnected from the specified chain.",
  },
};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.serializeError =
      t.isValidCode =
      t.getMessageFromCode =
      t.JSON_RPC_SERVER_ERROR_MESSAGE =
        void 0);
  const e = er,
    r = Xt,
    n = e.errorCodes.rpc.internal,
    i = "Unspecified error message. This is a bug, please report it.",
    s = { code: n, message: o(n) };
  t.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
  function o(h, b = i) {
    if (Number.isInteger(h)) {
      const g = h.toString();
      if (f(e.errorValues, g)) return e.errorValues[g].message;
      if (u(h)) return t.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
    return b;
  }
  t.getMessageFromCode = o;
  function a(h) {
    if (!Number.isInteger(h)) return !1;
    const b = h.toString();
    return !!(e.errorValues[b] || u(h));
  }
  t.isValidCode = a;
  function c(h, { fallbackError: b = s, shouldIncludeStack: g = !1 } = {}) {
    var y, S;
    if (!b || !Number.isInteger(b.code) || typeof b.message != "string")
      throw new Error(
        "Must provide fallback error with integer number code and string message.",
      );
    if (h instanceof r.EthereumRpcError) return h.serialize();
    const m = {};
    if (
      h &&
      typeof h == "object" &&
      !Array.isArray(h) &&
      f(h, "code") &&
      a(h.code)
    ) {
      const E = h;
      (m.code = E.code),
        E.message && typeof E.message == "string"
          ? ((m.message = E.message), f(E, "data") && (m.data = E.data))
          : ((m.message = o(m.code)), (m.data = { originalError: l(h) }));
    } else {
      m.code = b.code;
      const E = (y = h) === null || y === void 0 ? void 0 : y.message;
      (m.message = E && typeof E == "string" ? E : b.message),
        (m.data = { originalError: l(h) });
    }
    const v = (S = h) === null || S === void 0 ? void 0 : S.stack;
    return g && h && v && typeof v == "string" && (m.stack = v), m;
  }
  t.serializeError = c;
  function u(h) {
    return h >= -32099 && h <= -32e3;
  }
  function l(h) {
    return h && typeof h == "object" && !Array.isArray(h)
      ? Object.assign({}, h)
      : h;
  }
  function f(h, b) {
    return Object.prototype.hasOwnProperty.call(h, b);
  }
})(Fc);
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
Es.ethErrors = void 0;
const Uc = Xt,
  Jh = Fc,
  De = er;
Es.ethErrors = {
  rpc: {
    parse: (t) => Ye(De.errorCodes.rpc.parse, t),
    invalidRequest: (t) => Ye(De.errorCodes.rpc.invalidRequest, t),
    invalidParams: (t) => Ye(De.errorCodes.rpc.invalidParams, t),
    methodNotFound: (t) => Ye(De.errorCodes.rpc.methodNotFound, t),
    internal: (t) => Ye(De.errorCodes.rpc.internal, t),
    server: (t) => {
      if (!t || typeof t != "object" || Array.isArray(t))
        throw new Error(
          "Ethereum RPC Server errors must provide single object argument.",
        );
      const { code: e } = t;
      if (!Number.isInteger(e) || e > -32005 || e < -32099)
        throw new Error(
          '"code" must be an integer such that: -32099 <= code <= -32005',
        );
      return Ye(e, t);
    },
    invalidInput: (t) => Ye(De.errorCodes.rpc.invalidInput, t),
    resourceNotFound: (t) => Ye(De.errorCodes.rpc.resourceNotFound, t),
    resourceUnavailable: (t) => Ye(De.errorCodes.rpc.resourceUnavailable, t),
    transactionRejected: (t) => Ye(De.errorCodes.rpc.transactionRejected, t),
    methodNotSupported: (t) => Ye(De.errorCodes.rpc.methodNotSupported, t),
    limitExceeded: (t) => Ye(De.errorCodes.rpc.limitExceeded, t),
  },
  provider: {
    userRejectedRequest: (t) =>
      On(De.errorCodes.provider.userRejectedRequest, t),
    unauthorized: (t) => On(De.errorCodes.provider.unauthorized, t),
    unsupportedMethod: (t) => On(De.errorCodes.provider.unsupportedMethod, t),
    disconnected: (t) => On(De.errorCodes.provider.disconnected, t),
    chainDisconnected: (t) => On(De.errorCodes.provider.chainDisconnected, t),
    custom: (t) => {
      if (!t || typeof t != "object" || Array.isArray(t))
        throw new Error(
          "Ethereum Provider custom errors must provide single object argument.",
        );
      const { code: e, message: r, data: n } = t;
      if (!r || typeof r != "string")
        throw new Error('"message" must be a nonempty string');
      return new Uc.EthereumProviderError(e, r, n);
    },
  },
};
function Ye(t, e) {
  const [r, n] = Zh(e);
  return new Uc.EthereumRpcError(t, r || Jh.getMessageFromCode(t), n);
}
function On(t, e) {
  const [r, n] = Zh(e);
  return new Uc.EthereumProviderError(t, r || Jh.getMessageFromCode(t), n);
}
function Zh(t) {
  if (t) {
    if (typeof t == "string") return [t];
    if (typeof t == "object" && !Array.isArray(t)) {
      const { message: e, data: r } = t;
      if (e && typeof e != "string")
        throw new Error("Must specify string message.");
      return [e || void 0, r];
    }
  }
  return [];
}
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.getMessageFromCode =
      t.serializeError =
      t.EthereumProviderError =
      t.EthereumRpcError =
      t.ethErrors =
      t.errorCodes =
        void 0);
  const e = Xt;
  Object.defineProperty(t, "EthereumRpcError", {
    enumerable: !0,
    get: function () {
      return e.EthereumRpcError;
    },
  }),
    Object.defineProperty(t, "EthereumProviderError", {
      enumerable: !0,
      get: function () {
        return e.EthereumProviderError;
      },
    });
  const r = Fc;
  Object.defineProperty(t, "serializeError", {
    enumerable: !0,
    get: function () {
      return r.serializeError;
    },
  }),
    Object.defineProperty(t, "getMessageFromCode", {
      enumerable: !0,
      get: function () {
        return r.getMessageFromCode;
      },
    });
  const n = Es;
  Object.defineProperty(t, "ethErrors", {
    enumerable: !0,
    get: function () {
      return n.ethErrors;
    },
  });
  const i = er;
  Object.defineProperty(t, "errorCodes", {
    enumerable: !0,
    get: function () {
      return i.errorCodes;
    },
  });
})(Bc);
var be = {},
  Cs = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Web3Method = void 0),
    (function (e) {
      (e.requestEthereumAccounts = "requestEthereumAccounts"),
        (e.signEthereumMessage = "signEthereumMessage"),
        (e.signEthereumTransaction = "signEthereumTransaction"),
        (e.submitEthereumTransaction = "submitEthereumTransaction"),
        (e.ethereumAddressFromSignedMessage =
          "ethereumAddressFromSignedMessage"),
        (e.scanQRCode = "scanQRCode"),
        (e.generic = "generic"),
        (e.childRequestEthereumAccounts = "childRequestEthereumAccounts"),
        (e.addEthereumChain = "addEthereumChain"),
        (e.switchEthereumChain = "switchEthereumChain"),
        (e.makeEthereumJSONRPCRequest = "makeEthereumJSONRPCRequest"),
        (e.watchAsset = "watchAsset"),
        (e.selectProvider = "selectProvider");
    })(t.Web3Method || (t.Web3Method = {}));
})(Cs);
Object.defineProperty(be, "__esModule", { value: !0 });
be.EthereumAddressFromSignedMessageResponse =
  be.SubmitEthereumTransactionResponse =
  be.SignEthereumTransactionResponse =
  be.SignEthereumMessageResponse =
  be.isRequestEthereumAccountsResponse =
  be.SelectProviderResponse =
  be.WatchAssetReponse =
  be.RequestEthereumAccountsResponse =
  be.SwitchEthereumChainResponse =
  be.AddEthereumChainResponse =
  be.isErrorResponse =
    void 0;
const Ot = Cs;
function Ym(t) {
  var e, r;
  return (
    ((e = t) === null || e === void 0 ? void 0 : e.method) !== void 0 &&
    ((r = t) === null || r === void 0 ? void 0 : r.errorMessage) !== void 0
  );
}
be.isErrorResponse = Ym;
function Xm(t) {
  return { method: Ot.Web3Method.addEthereumChain, result: t };
}
be.AddEthereumChainResponse = Xm;
function ey(t) {
  return { method: Ot.Web3Method.switchEthereumChain, result: t };
}
be.SwitchEthereumChainResponse = ey;
function ty(t) {
  return { method: Ot.Web3Method.requestEthereumAccounts, result: t };
}
be.RequestEthereumAccountsResponse = ty;
function ry(t) {
  return { method: Ot.Web3Method.watchAsset, result: t };
}
be.WatchAssetReponse = ry;
function ny(t) {
  return { method: Ot.Web3Method.selectProvider, result: t };
}
be.SelectProviderResponse = ny;
function iy(t) {
  return t && t.method === Ot.Web3Method.requestEthereumAccounts;
}
be.isRequestEthereumAccountsResponse = iy;
function sy(t) {
  return { method: Ot.Web3Method.signEthereumMessage, result: t };
}
be.SignEthereumMessageResponse = sy;
function oy(t) {
  return { method: Ot.Web3Method.signEthereumTransaction, result: t };
}
be.SignEthereumTransactionResponse = oy;
function ay(t) {
  return { method: Ot.Web3Method.submitEthereumTransaction, result: t };
}
be.SubmitEthereumTransactionResponse = ay;
function cy(t) {
  return { method: Ot.Web3Method.ethereumAddressFromSignedMessage, result: t };
}
be.EthereumAddressFromSignedMessageResponse = cy;
var oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.LIB_VERSION = void 0;
oi.LIB_VERSION = "3.7.1";
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.getErrorCode =
      t.serializeError =
      t.standardErrors =
      t.standardErrorMessage =
      t.standardErrorCodes =
        void 0);
  const e = Bc,
    r = be,
    n = oi;
  t.standardErrorCodes = Object.freeze(
    Object.assign(Object.assign({}, e.errorCodes), {
      provider: Object.freeze(
        Object.assign(Object.assign({}, e.errorCodes.provider), {
          unsupportedChain: 4902,
        }),
      ),
    }),
  );
  function i(l) {
    return l !== void 0 ? (0, e.getMessageFromCode)(l) : "Unknown error";
  }
  (t.standardErrorMessage = i),
    (t.standardErrors = Object.freeze(
      Object.assign(Object.assign({}, e.ethErrors), {
        provider: Object.freeze(
          Object.assign(Object.assign({}, e.ethErrors.provider), {
            unsupportedChain: (l = "") =>
              e.ethErrors.provider.custom({
                code: t.standardErrorCodes.provider.unsupportedChain,
                message: `Unrecognized chain ID ${l}. Try adding the chain using wallet_addEthereumChain first.`,
              }),
          }),
        ),
      }),
    ));
  function s(l, f) {
    const h = (0, e.serializeError)(o(l), { shouldIncludeStack: !0 }),
      b = new URL("https://docs.cloud.coinbase.com/wallet-sdk/docs/errors");
    b.searchParams.set("version", n.LIB_VERSION),
      b.searchParams.set("code", h.code.toString());
    const g = a(h.data, f);
    return (
      g && b.searchParams.set("method", g),
      b.searchParams.set("message", h.message),
      Object.assign(Object.assign({}, h), { docUrl: b.href })
    );
  }
  t.serializeError = s;
  function o(l) {
    return typeof l == "string"
      ? { message: l, code: t.standardErrorCodes.rpc.internal }
      : (0, r.isErrorResponse)(l)
      ? Object.assign(Object.assign({}, l), {
          message: l.errorMessage,
          code: l.errorCode,
          data: { method: l.method, result: l.result },
        })
      : l;
  }
  function a(l, f) {
    var h;
    const b = (h = l) === null || h === void 0 ? void 0 : h.method;
    if (b) return b;
    if (f !== void 0)
      return typeof f == "string"
        ? f
        : Array.isArray(f)
        ? f.length > 0
          ? f[0].method
          : void 0
        : f.method;
  }
  function c(l) {
    var f;
    if (typeof l == "number") return l;
    if (u(l)) return (f = l.code) !== null && f !== void 0 ? f : l.errorCode;
  }
  t.getErrorCode = c;
  function u(l) {
    return (
      typeof l == "object" &&
      l !== null &&
      (typeof l.code == "number" || typeof l.errorCode == "number")
    );
  }
})(si);
var vn = {},
  H = {},
  Hc = typeof Map == "function" && Map.prototype,
  xa =
    Object.getOwnPropertyDescriptor && Hc
      ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
      : null,
  Yi = Hc && xa && typeof xa.get == "function" ? xa.get : null,
  El = Hc && Map.prototype.forEach,
  Vc = typeof Set == "function" && Set.prototype,
  Aa =
    Object.getOwnPropertyDescriptor && Vc
      ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
      : null,
  Xi = Vc && Aa && typeof Aa.get == "function" ? Aa.get : null,
  Cl = Vc && Set.prototype.forEach,
  uy = typeof WeakMap == "function" && WeakMap.prototype,
  $n = uy ? WeakMap.prototype.has : null,
  ly = typeof WeakSet == "function" && WeakSet.prototype,
  Bn = ly ? WeakSet.prototype.has : null,
  fy = typeof WeakRef == "function" && WeakRef.prototype,
  Rl = fy ? WeakRef.prototype.deref : null,
  hy = Boolean.prototype.valueOf,
  dy = Object.prototype.toString,
  py = Function.prototype.toString,
  by = String.prototype.match,
  Wc = String.prototype.slice,
  Kt = String.prototype.replace,
  gy = String.prototype.toUpperCase,
  Il = String.prototype.toLowerCase,
  Qh = RegExp.prototype.test,
  xl = Array.prototype.concat,
  Rt = Array.prototype.join,
  my = Array.prototype.slice,
  Al = Math.floor,
  ac = typeof BigInt == "function" ? BigInt.prototype.valueOf : null,
  Ta = Object.getOwnPropertySymbols,
  cc =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? Symbol.prototype.toString
      : null,
  nn = typeof Symbol == "function" && typeof Symbol.iterator == "object",
  Be =
    typeof Symbol == "function" &&
    Symbol.toStringTag &&
    (typeof Symbol.toStringTag === nn || "symbol")
      ? Symbol.toStringTag
      : null,
  Kh = Object.prototype.propertyIsEnumerable,
  Tl =
    (typeof Reflect == "function"
      ? Reflect.getPrototypeOf
      : Object.getPrototypeOf) ||
    ([].__proto__ === Array.prototype
      ? function (t) {
          return t.__proto__;
        }
      : null);
function kl(t, e) {
  if (
    t === 1 / 0 ||
    t === -1 / 0 ||
    t !== t ||
    (t && t > -1e3 && t < 1e3) ||
    Qh.call(/e/, e)
  )
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -Al(-t) : Al(t);
    if (n !== t) {
      var i = String(n),
        s = Wc.call(e, i.length + 1);
      return (
        Kt.call(i, r, "$&_") +
        "." +
        Kt.call(Kt.call(s, /([0-9]{3})/g, "$&_"), /_$/, "")
      );
    }
  }
  return Kt.call(e, r, "$&_");
}
var uc = Ac,
  Ol = uc.custom,
  Ml = Xh(Ol) ? Ol : null,
  yy = function t(e, r, n, i) {
    var s = r || {};
    if (
      Jt(s, "quoteStyle") &&
      s.quoteStyle !== "single" &&
      s.quoteStyle !== "double"
    )
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (
      Jt(s, "maxStringLength") &&
      (typeof s.maxStringLength == "number"
        ? s.maxStringLength < 0 && s.maxStringLength !== 1 / 0
        : s.maxStringLength !== null)
    )
      throw new TypeError(
        'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
      );
    var o = Jt(s, "customInspect") ? s.customInspect : !0;
    if (typeof o != "boolean" && o !== "symbol")
      throw new TypeError(
        "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`",
      );
    if (
      Jt(s, "indent") &&
      s.indent !== null &&
      s.indent !== "	" &&
      !(parseInt(s.indent, 10) === s.indent && s.indent > 0)
    )
      throw new TypeError(
        'option "indent" must be "\\t", an integer > 0, or `null`',
      );
    if (Jt(s, "numericSeparator") && typeof s.numericSeparator != "boolean")
      throw new TypeError(
        'option "numericSeparator", if provided, must be `true` or `false`',
      );
    var a = s.numericSeparator;
    if (typeof e > "u") return "undefined";
    if (e === null) return "null";
    if (typeof e == "boolean") return e ? "true" : "false";
    if (typeof e == "string") return td(e, s);
    if (typeof e == "number") {
      if (e === 0) return 1 / 0 / e > 0 ? "0" : "-0";
      var c = String(e);
      return a ? kl(e, c) : c;
    }
    if (typeof e == "bigint") {
      var u = String(e) + "n";
      return a ? kl(e, u) : u;
    }
    var l = typeof s.depth > "u" ? 5 : s.depth;
    if ((typeof n > "u" && (n = 0), n >= l && l > 0 && typeof e == "object"))
      return lc(e) ? "[Array]" : "[Object]";
    var f = Py(s, n);
    if (typeof i > "u") i = [];
    else if (ed(i, e) >= 0) return "[Circular]";
    function h(T, k, N) {
      if ((k && ((i = my.call(i)), i.push(k)), N)) {
        var P = { depth: s.depth };
        return (
          Jt(s, "quoteStyle") && (P.quoteStyle = s.quoteStyle),
          t(T, P, n + 1, i)
        );
      }
      return t(T, s, n + 1, i);
    }
    if (typeof e == "function" && !Nl(e)) {
      var b = xy(e),
        g = Ti(e, h);
      return (
        "[Function" +
        (b ? ": " + b : " (anonymous)") +
        "]" +
        (g.length > 0 ? " { " + Rt.call(g, ", ") + " }" : "")
      );
    }
    if (Xh(e)) {
      var y = nn
        ? Kt.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1")
        : cc.call(e);
      return typeof e == "object" && !nn ? Mn(y) : y;
    }
    if (Ny(e)) {
      for (
        var S = "<" + Il.call(String(e.nodeName)),
          m = e.attributes || [],
          v = 0;
        v < m.length;
        v++
      )
        S += " " + m[v].name + "=" + Yh(vy(m[v].value), "double", s);
      return (
        (S += ">"),
        e.childNodes && e.childNodes.length && (S += "..."),
        (S += "</" + Il.call(String(e.nodeName)) + ">"),
        S
      );
    }
    if (lc(e)) {
      if (e.length === 0) return "[]";
      var E = Ti(e, h);
      return f && !Ly(E)
        ? "[" + fc(E, f) + "]"
        : "[ " + Rt.call(E, ", ") + " ]";
    }
    if (wy(e)) {
      var R = Ti(e, h);
      return !("cause" in Error.prototype) &&
        "cause" in e &&
        !Kh.call(e, "cause")
        ? "{ [" +
            String(e) +
            "] " +
            Rt.call(xl.call("[cause]: " + h(e.cause), R), ", ") +
            " }"
        : R.length === 0
        ? "[" + String(e) + "]"
        : "{ [" + String(e) + "] " + Rt.call(R, ", ") + " }";
    }
    if (typeof e == "object" && o) {
      if (Ml && typeof e[Ml] == "function" && uc)
        return uc(e, { depth: l - n });
      if (o !== "symbol" && typeof e.inspect == "function") return e.inspect();
    }
    if (Ay(e)) {
      var C = [];
      return (
        El &&
          El.call(e, function (T, k) {
            C.push(h(k, e, !0) + " => " + h(T, e));
          }),
        jl("Map", Yi.call(e), C, f)
      );
    }
    if (Oy(e)) {
      var I = [];
      return (
        Cl &&
          Cl.call(e, function (T) {
            I.push(h(T, e));
          }),
        jl("Set", Xi.call(e), I, f)
      );
    }
    if (Ty(e)) return ka("WeakMap");
    if (My(e)) return ka("WeakSet");
    if (ky(e)) return ka("WeakRef");
    if (Ey(e)) return Mn(h(Number(e)));
    if (Ry(e)) return Mn(h(ac.call(e)));
    if (Cy(e)) return Mn(hy.call(e));
    if (Sy(e)) return Mn(h(String(e)));
    if (!_y(e) && !Nl(e)) {
      var $ = Ti(e, h),
        L = Tl
          ? Tl(e) === Object.prototype
          : e instanceof Object || e.constructor === Object,
        x = e instanceof Object ? "" : "null prototype",
        W =
          !L && Be && Object(e) === e && Be in e
            ? Wc.call(sr(e), 8, -1)
            : x
            ? "Object"
            : "",
        se =
          L || typeof e.constructor != "function"
            ? ""
            : e.constructor.name
            ? e.constructor.name + " "
            : "",
        K =
          se +
          (W || x
            ? "[" + Rt.call(xl.call([], W || [], x || []), ": ") + "] "
            : "");
      return $.length === 0
        ? K + "{}"
        : f
        ? K + "{" + fc($, f) + "}"
        : K + "{ " + Rt.call($, ", ") + " }";
    }
    return String(e);
  };
function Yh(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function vy(t) {
  return Kt.call(String(t), /"/g, "&quot;");
}
function lc(t) {
  return (
    sr(t) === "[object Array]" && (!Be || !(typeof t == "object" && Be in t))
  );
}
function _y(t) {
  return (
    sr(t) === "[object Date]" && (!Be || !(typeof t == "object" && Be in t))
  );
}
function Nl(t) {
  return (
    sr(t) === "[object RegExp]" && (!Be || !(typeof t == "object" && Be in t))
  );
}
function wy(t) {
  return (
    sr(t) === "[object Error]" && (!Be || !(typeof t == "object" && Be in t))
  );
}
function Sy(t) {
  return (
    sr(t) === "[object String]" && (!Be || !(typeof t == "object" && Be in t))
  );
}
function Ey(t) {
  return (
    sr(t) === "[object Number]" && (!Be || !(typeof t == "object" && Be in t))
  );
}
function Cy(t) {
  return (
    sr(t) === "[object Boolean]" && (!Be || !(typeof t == "object" && Be in t))
  );
}
function Xh(t) {
  if (nn) return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol") return !0;
  if (!t || typeof t != "object" || !cc) return !1;
  try {
    return cc.call(t), !0;
  } catch {}
  return !1;
}
function Ry(t) {
  if (!t || typeof t != "object" || !ac) return !1;
  try {
    return ac.call(t), !0;
  } catch {}
  return !1;
}
var Iy =
  Object.prototype.hasOwnProperty ||
  function (t) {
    return t in this;
  };
function Jt(t, e) {
  return Iy.call(t, e);
}
function sr(t) {
  return dy.call(t);
}
function xy(t) {
  if (t.name) return t.name;
  var e = by.call(py.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function ed(t, e) {
  if (t.indexOf) return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
  return -1;
}
function Ay(t) {
  if (!Yi || !t || typeof t != "object") return !1;
  try {
    Yi.call(t);
    try {
      Xi.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {}
  return !1;
}
function Ty(t) {
  if (!$n || !t || typeof t != "object") return !1;
  try {
    $n.call(t, $n);
    try {
      Bn.call(t, Bn);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {}
  return !1;
}
function ky(t) {
  if (!Rl || !t || typeof t != "object") return !1;
  try {
    return Rl.call(t), !0;
  } catch {}
  return !1;
}
function Oy(t) {
  if (!Xi || !t || typeof t != "object") return !1;
  try {
    Xi.call(t);
    try {
      Yi.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {}
  return !1;
}
function My(t) {
  if (!Bn || !t || typeof t != "object") return !1;
  try {
    Bn.call(t, Bn);
    try {
      $n.call(t, $n);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {}
  return !1;
}
function Ny(t) {
  return !t || typeof t != "object"
    ? !1
    : typeof HTMLElement < "u" && t instanceof HTMLElement
    ? !0
    : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function td(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength,
      n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return td(Wc.call(t, 0, e.maxStringLength), e) + n;
  }
  var i = Kt.call(Kt.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, jy);
  return Yh(i, "single", e);
}
function jy(t) {
  var e = t.charCodeAt(0),
    r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + gy.call(e.toString(16));
}
function Mn(t) {
  return "Object(" + t + ")";
}
function ka(t) {
  return t + " { ? }";
}
function jl(t, e, r, n) {
  var i = n ? fc(r, n) : Rt.call(r, ", ");
  return t + " (" + e + ") {" + i + "}";
}
function Ly(t) {
  for (var e = 0; e < t.length; e++)
    if (
      ed(
        t[e],
        `
`,
      ) >= 0
    )
      return !1;
  return !0;
}
function Py(t, e) {
  var r;
  if (t.indent === "	") r = "	";
  else if (typeof t.indent == "number" && t.indent > 0)
    r = Rt.call(Array(t.indent + 1), " ");
  else return null;
  return { base: r, prev: Rt.call(Array(e + 1), r) };
}
function fc(t, e) {
  if (t.length === 0) return "";
  var r =
    `
` +
    e.prev +
    e.base;
  return (
    r +
    Rt.call(t, "," + r) +
    `
` +
    e.prev
  );
}
function Ti(t, e) {
  var r = lc(t),
    n = [];
  if (r) {
    n.length = t.length;
    for (var i = 0; i < t.length; i++) n[i] = Jt(t, i) ? e(t[i], t) : "";
  }
  var s = typeof Ta == "function" ? Ta(t) : [],
    o;
  if (nn) {
    o = {};
    for (var a = 0; a < s.length; a++) o["$" + s[a]] = s[a];
  }
  for (var c in t)
    Jt(t, c) &&
      ((r && String(Number(c)) === c && c < t.length) ||
        (nn && o["$" + c] instanceof Symbol) ||
        (Qh.call(/[^\w$]/, c)
          ? n.push(e(c, t) + ": " + e(t[c], t))
          : n.push(c + ": " + e(t[c], t))));
  if (typeof Ta == "function")
    for (var u = 0; u < s.length; u++)
      Kh.call(t, s[u]) && n.push("[" + e(s[u]) + "]: " + e(t[s[u]], t));
  return n;
}
var zc = Lc,
  _n = zb,
  Dy = yy,
  $y = zc("%TypeError%"),
  ki = zc("%WeakMap%", !0),
  Oi = zc("%Map%", !0),
  By = _n("WeakMap.prototype.get", !0),
  Fy = _n("WeakMap.prototype.set", !0),
  Uy = _n("WeakMap.prototype.has", !0),
  Hy = _n("Map.prototype.get", !0),
  Vy = _n("Map.prototype.set", !0),
  Wy = _n("Map.prototype.has", !0),
  Gc = function (t, e) {
    for (var r = t, n; (n = r.next) !== null; r = n)
      if (n.key === e)
        return (r.next = n.next), (n.next = t.next), (t.next = n), n;
  },
  zy = function (t, e) {
    var r = Gc(t, e);
    return r && r.value;
  },
  Gy = function (t, e, r) {
    var n = Gc(t, e);
    n ? (n.value = r) : (t.next = { key: e, next: t.next, value: r });
  },
  qy = function (t, e) {
    return !!Gc(t, e);
  },
  Jy = function () {
    var e,
      r,
      n,
      i = {
        assert: function (s) {
          if (!i.has(s)) throw new $y("Side channel does not contain " + Dy(s));
        },
        get: function (s) {
          if (ki && s && (typeof s == "object" || typeof s == "function")) {
            if (e) return By(e, s);
          } else if (Oi) {
            if (r) return Hy(r, s);
          } else if (n) return zy(n, s);
        },
        has: function (s) {
          if (ki && s && (typeof s == "object" || typeof s == "function")) {
            if (e) return Uy(e, s);
          } else if (Oi) {
            if (r) return Wy(r, s);
          } else if (n) return qy(n, s);
          return !1;
        },
        set: function (s, o) {
          ki && s && (typeof s == "object" || typeof s == "function")
            ? (e || (e = new ki()), Fy(e, s, o))
            : Oi
            ? (r || (r = new Oi()), Vy(r, s, o))
            : (n || (n = { key: {}, next: null }), Gy(n, s, o));
        },
      };
    return i;
  },
  Zy = String.prototype.replace,
  Qy = /%20/g,
  Oa = { RFC1738: "RFC1738", RFC3986: "RFC3986" },
  qc = {
    default: Oa.RFC3986,
    formatters: {
      RFC1738: function (t) {
        return Zy.call(t, Qy, "+");
      },
      RFC3986: function (t) {
        return String(t);
      },
    },
    RFC1738: Oa.RFC1738,
    RFC3986: Oa.RFC3986,
  },
  Ky = qc,
  Ma = Object.prototype.hasOwnProperty,
  fr = Array.isArray,
  yt = (function () {
    for (var t = [], e = 0; e < 256; ++e)
      t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
    return t;
  })(),
  Yy = function (e) {
    for (; e.length > 1; ) {
      var r = e.pop(),
        n = r.obj[r.prop];
      if (fr(n)) {
        for (var i = [], s = 0; s < n.length; ++s)
          typeof n[s] < "u" && i.push(n[s]);
        r.obj[r.prop] = i;
      }
    }
  },
  rd = function (e, r) {
    for (
      var n = r && r.plainObjects ? Object.create(null) : {}, i = 0;
      i < e.length;
      ++i
    )
      typeof e[i] < "u" && (n[i] = e[i]);
    return n;
  },
  Xy = function t(e, r, n) {
    if (!r) return e;
    if (typeof r != "object") {
      if (fr(e)) e.push(r);
      else if (e && typeof e == "object")
        ((n && (n.plainObjects || n.allowPrototypes)) ||
          !Ma.call(Object.prototype, r)) &&
          (e[r] = !0);
      else return [e, r];
      return e;
    }
    if (!e || typeof e != "object") return [e].concat(r);
    var i = e;
    return (
      fr(e) && !fr(r) && (i = rd(e, n)),
      fr(e) && fr(r)
        ? (r.forEach(function (s, o) {
            if (Ma.call(e, o)) {
              var a = e[o];
              a && typeof a == "object" && s && typeof s == "object"
                ? (e[o] = t(a, s, n))
                : e.push(s);
            } else e[o] = s;
          }),
          e)
        : Object.keys(r).reduce(function (s, o) {
            var a = r[o];
            return Ma.call(s, o) ? (s[o] = t(s[o], a, n)) : (s[o] = a), s;
          }, i)
    );
  },
  ev = function (e, r) {
    return Object.keys(r).reduce(function (n, i) {
      return (n[i] = r[i]), n;
    }, e);
  },
  tv = function (t, e, r) {
    var n = t.replace(/\+/g, " ");
    if (r === "iso-8859-1") return n.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(n);
    } catch {
      return n;
    }
  },
  rv = function (e, r, n, i, s) {
    if (e.length === 0) return e;
    var o = e;
    if (
      (typeof e == "symbol"
        ? (o = Symbol.prototype.toString.call(e))
        : typeof e != "string" && (o = String(e)),
      n === "iso-8859-1")
    )
      return escape(o).replace(/%u[0-9a-f]{4}/gi, function (l) {
        return "%26%23" + parseInt(l.slice(2), 16) + "%3B";
      });
    for (var a = "", c = 0; c < o.length; ++c) {
      var u = o.charCodeAt(c);
      if (
        u === 45 ||
        u === 46 ||
        u === 95 ||
        u === 126 ||
        (u >= 48 && u <= 57) ||
        (u >= 65 && u <= 90) ||
        (u >= 97 && u <= 122) ||
        (s === Ky.RFC1738 && (u === 40 || u === 41))
      ) {
        a += o.charAt(c);
        continue;
      }
      if (u < 128) {
        a = a + yt[u];
        continue;
      }
      if (u < 2048) {
        a = a + (yt[192 | (u >> 6)] + yt[128 | (u & 63)]);
        continue;
      }
      if (u < 55296 || u >= 57344) {
        a =
          a +
          (yt[224 | (u >> 12)] +
            yt[128 | ((u >> 6) & 63)] +
            yt[128 | (u & 63)]);
        continue;
      }
      (c += 1),
        (u = 65536 + (((u & 1023) << 10) | (o.charCodeAt(c) & 1023))),
        (a +=
          yt[240 | (u >> 18)] +
          yt[128 | ((u >> 12) & 63)] +
          yt[128 | ((u >> 6) & 63)] +
          yt[128 | (u & 63)]);
    }
    return a;
  },
  nv = function (e) {
    for (
      var r = [{ obj: { o: e }, prop: "o" }], n = [], i = 0;
      i < r.length;
      ++i
    )
      for (
        var s = r[i], o = s.obj[s.prop], a = Object.keys(o), c = 0;
        c < a.length;
        ++c
      ) {
        var u = a[c],
          l = o[u];
        typeof l == "object" &&
          l !== null &&
          n.indexOf(l) === -1 &&
          (r.push({ obj: o, prop: u }), n.push(l));
      }
    return Yy(r), e;
  },
  iv = function (e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  },
  sv = function (e) {
    return !e || typeof e != "object"
      ? !1
      : !!(
          e.constructor &&
          e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
  },
  ov = function (e, r) {
    return [].concat(e, r);
  },
  av = function (e, r) {
    if (fr(e)) {
      for (var n = [], i = 0; i < e.length; i += 1) n.push(r(e[i]));
      return n;
    }
    return r(e);
  },
  nd = {
    arrayToObject: rd,
    assign: ev,
    combine: ov,
    compact: nv,
    decode: tv,
    encode: rv,
    isBuffer: sv,
    isRegExp: iv,
    maybeMap: av,
    merge: Xy,
  },
  id = Jy,
  hc = nd,
  Fn = qc,
  cv = Object.prototype.hasOwnProperty,
  Ll = {
    brackets: function (e) {
      return e + "[]";
    },
    comma: "comma",
    indices: function (e, r) {
      return e + "[" + r + "]";
    },
    repeat: function (e) {
      return e;
    },
  },
  Dt = Array.isArray,
  uv = String.prototype.split,
  lv = Array.prototype.push,
  sd = function (t, e) {
    lv.apply(t, Dt(e) ? e : [e]);
  },
  fv = Date.prototype.toISOString,
  Pl = Fn.default,
  je = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encoder: hc.encode,
    encodeValuesOnly: !1,
    format: Pl,
    formatter: Fn.formatters[Pl],
    indices: !1,
    serializeDate: function (e) {
      return fv.call(e);
    },
    skipNulls: !1,
    strictNullHandling: !1,
  },
  hv = function (e) {
    return (
      typeof e == "string" ||
      typeof e == "number" ||
      typeof e == "boolean" ||
      typeof e == "symbol" ||
      typeof e == "bigint"
    );
  },
  Na = {},
  dv = function t(e, r, n, i, s, o, a, c, u, l, f, h, b, g, y, S) {
    for (var m = e, v = S, E = 0, R = !1; (v = v.get(Na)) !== void 0 && !R; ) {
      var C = v.get(e);
      if (((E += 1), typeof C < "u")) {
        if (C === E) throw new RangeError("Cyclic object value");
        R = !0;
      }
      typeof v.get(Na) > "u" && (E = 0);
    }
    if (
      (typeof c == "function"
        ? (m = c(r, m))
        : m instanceof Date
        ? (m = f(m))
        : n === "comma" &&
          Dt(m) &&
          (m = hc.maybeMap(m, function (U) {
            return U instanceof Date ? f(U) : U;
          })),
      m === null)
    ) {
      if (s) return a && !g ? a(r, je.encoder, y, "key", h) : r;
      m = "";
    }
    if (hv(m) || hc.isBuffer(m)) {
      if (a) {
        var I = g ? r : a(r, je.encoder, y, "key", h);
        if (n === "comma" && g) {
          for (
            var $ = uv.call(String(m), ","), L = "", x = 0;
            x < $.length;
            ++x
          )
            L += (x === 0 ? "" : ",") + b(a($[x], je.encoder, y, "value", h));
          return [b(I) + (i && Dt(m) && $.length === 1 ? "[]" : "") + "=" + L];
        }
        return [b(I) + "=" + b(a(m, je.encoder, y, "value", h))];
      }
      return [b(r) + "=" + b(String(m))];
    }
    var W = [];
    if (typeof m > "u") return W;
    var se;
    if (n === "comma" && Dt(m))
      se = [{ value: m.length > 0 ? m.join(",") || null : void 0 }];
    else if (Dt(c)) se = c;
    else {
      var K = Object.keys(m);
      se = u ? K.sort(u) : K;
    }
    for (
      var T = i && Dt(m) && m.length === 1 ? r + "[]" : r, k = 0;
      k < se.length;
      ++k
    ) {
      var N = se[k],
        P = typeof N == "object" && typeof N.value < "u" ? N.value : m[N];
      if (!(o && P === null)) {
        var B = Dt(m)
          ? typeof n == "function"
            ? n(T, N)
            : T
          : T + (l ? "." + N : "[" + N + "]");
        S.set(e, E);
        var j = id();
        j.set(Na, S), sd(W, t(P, B, n, i, s, o, a, c, u, l, f, h, b, g, y, j));
      }
    }
    return W;
  },
  pv = function (e) {
    if (!e) return je;
    if (
      e.encoder !== null &&
      typeof e.encoder < "u" &&
      typeof e.encoder != "function"
    )
      throw new TypeError("Encoder has to be a function.");
    var r = e.charset || je.charset;
    if (
      typeof e.charset < "u" &&
      e.charset !== "utf-8" &&
      e.charset !== "iso-8859-1"
    )
      throw new TypeError(
        "The charset option must be either utf-8, iso-8859-1, or undefined",
      );
    var n = Fn.default;
    if (typeof e.format < "u") {
      if (!cv.call(Fn.formatters, e.format))
        throw new TypeError("Unknown format option provided.");
      n = e.format;
    }
    var i = Fn.formatters[n],
      s = je.filter;
    return (
      (typeof e.filter == "function" || Dt(e.filter)) && (s = e.filter),
      {
        addQueryPrefix:
          typeof e.addQueryPrefix == "boolean"
            ? e.addQueryPrefix
            : je.addQueryPrefix,
        allowDots: typeof e.allowDots > "u" ? je.allowDots : !!e.allowDots,
        charset: r,
        charsetSentinel:
          typeof e.charsetSentinel == "boolean"
            ? e.charsetSentinel
            : je.charsetSentinel,
        delimiter: typeof e.delimiter > "u" ? je.delimiter : e.delimiter,
        encode: typeof e.encode == "boolean" ? e.encode : je.encode,
        encoder: typeof e.encoder == "function" ? e.encoder : je.encoder,
        encodeValuesOnly:
          typeof e.encodeValuesOnly == "boolean"
            ? e.encodeValuesOnly
            : je.encodeValuesOnly,
        filter: s,
        format: n,
        formatter: i,
        serializeDate:
          typeof e.serializeDate == "function"
            ? e.serializeDate
            : je.serializeDate,
        skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : je.skipNulls,
        sort: typeof e.sort == "function" ? e.sort : null,
        strictNullHandling:
          typeof e.strictNullHandling == "boolean"
            ? e.strictNullHandling
            : je.strictNullHandling,
      }
    );
  },
  bv = function (t, e) {
    var r = t,
      n = pv(e),
      i,
      s;
    typeof n.filter == "function"
      ? ((s = n.filter), (r = s("", r)))
      : Dt(n.filter) && ((s = n.filter), (i = s));
    var o = [];
    if (typeof r != "object" || r === null) return "";
    var a;
    e && e.arrayFormat in Ll
      ? (a = e.arrayFormat)
      : e && "indices" in e
      ? (a = e.indices ? "indices" : "repeat")
      : (a = "indices");
    var c = Ll[a];
    if (e && "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var u = c === "comma" && e && e.commaRoundTrip;
    i || (i = Object.keys(r)), n.sort && i.sort(n.sort);
    for (var l = id(), f = 0; f < i.length; ++f) {
      var h = i[f];
      (n.skipNulls && r[h] === null) ||
        sd(
          o,
          dv(
            r[h],
            h,
            c,
            u,
            n.strictNullHandling,
            n.skipNulls,
            n.encode ? n.encoder : null,
            n.filter,
            n.sort,
            n.allowDots,
            n.serializeDate,
            n.format,
            n.formatter,
            n.encodeValuesOnly,
            n.charset,
            l,
          ),
        );
    }
    var b = o.join(n.delimiter),
      g = n.addQueryPrefix === !0 ? "?" : "";
    return (
      n.charsetSentinel &&
        (n.charset === "iso-8859-1"
          ? (g += "utf8=%26%2310003%3B&")
          : (g += "utf8=%E2%9C%93&")),
      b.length > 0 ? g + b : ""
    );
  },
  sn = nd,
  dc = Object.prototype.hasOwnProperty,
  gv = Array.isArray,
  ke = {
    allowDots: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decoder: sn.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1,
  },
  mv = function (t) {
    return t.replace(/&#(\d+);/g, function (e, r) {
      return String.fromCharCode(parseInt(r, 10));
    });
  },
  od = function (t, e) {
    return t && typeof t == "string" && e.comma && t.indexOf(",") > -1
      ? t.split(",")
      : t;
  },
  yv = "utf8=%26%2310003%3B",
  vv = "utf8=%E2%9C%93",
  _v = function (e, r) {
    var n = {},
      i = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
      s = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit,
      o = i.split(r.delimiter, s),
      a = -1,
      c,
      u = r.charset;
    if (r.charsetSentinel)
      for (c = 0; c < o.length; ++c)
        o[c].indexOf("utf8=") === 0 &&
          (o[c] === vv ? (u = "utf-8") : o[c] === yv && (u = "iso-8859-1"),
          (a = c),
          (c = o.length));
    for (c = 0; c < o.length; ++c)
      if (c !== a) {
        var l = o[c],
          f = l.indexOf("]="),
          h = f === -1 ? l.indexOf("=") : f + 1,
          b,
          g;
        h === -1
          ? ((b = r.decoder(l, ke.decoder, u, "key")),
            (g = r.strictNullHandling ? null : ""))
          : ((b = r.decoder(l.slice(0, h), ke.decoder, u, "key")),
            (g = sn.maybeMap(od(l.slice(h + 1), r), function (y) {
              return r.decoder(y, ke.decoder, u, "value");
            }))),
          g && r.interpretNumericEntities && u === "iso-8859-1" && (g = mv(g)),
          l.indexOf("[]=") > -1 && (g = gv(g) ? [g] : g),
          dc.call(n, b) ? (n[b] = sn.combine(n[b], g)) : (n[b] = g);
      }
    return n;
  },
  wv = function (t, e, r, n) {
    for (var i = n ? e : od(e, r), s = t.length - 1; s >= 0; --s) {
      var o,
        a = t[s];
      if (a === "[]" && r.parseArrays) o = [].concat(i);
      else {
        o = r.plainObjects ? Object.create(null) : {};
        var c =
            a.charAt(0) === "[" && a.charAt(a.length - 1) === "]"
              ? a.slice(1, -1)
              : a,
          u = parseInt(c, 10);
        !r.parseArrays && c === ""
          ? (o = { 0: i })
          : !isNaN(u) &&
            a !== c &&
            String(u) === c &&
            u >= 0 &&
            r.parseArrays &&
            u <= r.arrayLimit
          ? ((o = []), (o[u] = i))
          : c !== "__proto__" && (o[c] = i);
      }
      i = o;
    }
    return i;
  },
  Sv = function (e, r, n, i) {
    if (e) {
      var s = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
        o = /(\[[^[\]]*])/,
        a = /(\[[^[\]]*])/g,
        c = n.depth > 0 && o.exec(s),
        u = c ? s.slice(0, c.index) : s,
        l = [];
      if (u) {
        if (
          !n.plainObjects &&
          dc.call(Object.prototype, u) &&
          !n.allowPrototypes
        )
          return;
        l.push(u);
      }
      for (
        var f = 0;
        n.depth > 0 && (c = a.exec(s)) !== null && f < n.depth;

      ) {
        if (
          ((f += 1),
          !n.plainObjects &&
            dc.call(Object.prototype, c[1].slice(1, -1)) &&
            !n.allowPrototypes)
        )
          return;
        l.push(c[1]);
      }
      return c && l.push("[" + s.slice(c.index) + "]"), wv(l, r, n, i);
    }
  },
  Ev = function (e) {
    if (!e) return ke;
    if (
      e.decoder !== null &&
      e.decoder !== void 0 &&
      typeof e.decoder != "function"
    )
      throw new TypeError("Decoder has to be a function.");
    if (
      typeof e.charset < "u" &&
      e.charset !== "utf-8" &&
      e.charset !== "iso-8859-1"
    )
      throw new TypeError(
        "The charset option must be either utf-8, iso-8859-1, or undefined",
      );
    var r = typeof e.charset > "u" ? ke.charset : e.charset;
    return {
      allowDots: typeof e.allowDots > "u" ? ke.allowDots : !!e.allowDots,
      allowPrototypes:
        typeof e.allowPrototypes == "boolean"
          ? e.allowPrototypes
          : ke.allowPrototypes,
      allowSparse:
        typeof e.allowSparse == "boolean" ? e.allowSparse : ke.allowSparse,
      arrayLimit:
        typeof e.arrayLimit == "number" ? e.arrayLimit : ke.arrayLimit,
      charset: r,
      charsetSentinel:
        typeof e.charsetSentinel == "boolean"
          ? e.charsetSentinel
          : ke.charsetSentinel,
      comma: typeof e.comma == "boolean" ? e.comma : ke.comma,
      decoder: typeof e.decoder == "function" ? e.decoder : ke.decoder,
      delimiter:
        typeof e.delimiter == "string" || sn.isRegExp(e.delimiter)
          ? e.delimiter
          : ke.delimiter,
      depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : ke.depth,
      ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
      interpretNumericEntities:
        typeof e.interpretNumericEntities == "boolean"
          ? e.interpretNumericEntities
          : ke.interpretNumericEntities,
      parameterLimit:
        typeof e.parameterLimit == "number"
          ? e.parameterLimit
          : ke.parameterLimit,
      parseArrays: e.parseArrays !== !1,
      plainObjects:
        typeof e.plainObjects == "boolean" ? e.plainObjects : ke.plainObjects,
      strictNullHandling:
        typeof e.strictNullHandling == "boolean"
          ? e.strictNullHandling
          : ke.strictNullHandling,
    };
  },
  Cv = function (t, e) {
    var r = Ev(e);
    if (t === "" || t === null || typeof t > "u")
      return r.plainObjects ? Object.create(null) : {};
    for (
      var n = typeof t == "string" ? _v(t, r) : t,
        i = r.plainObjects ? Object.create(null) : {},
        s = Object.keys(n),
        o = 0;
      o < s.length;
      ++o
    ) {
      var a = s[o],
        c = Sv(a, n[a], r, typeof t == "string");
      i = sn.merge(i, c, r);
    }
    return r.allowSparse === !0 ? i : sn.compact(i);
  },
  Rv = bv,
  Iv = Cv,
  xv = qc,
  Av = { formats: xv, parse: Iv, stringify: Rv },
  ai = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.ProviderType =
      t.RegExpString =
      t.IntNumber =
      t.BigIntString =
      t.AddressString =
      t.HexString =
      t.OpaqueType =
        void 0);
  function e() {
    return (n) => n;
  }
  (t.OpaqueType = e),
    (t.HexString = e()),
    (t.AddressString = e()),
    (t.BigIntString = e());
  function r(n) {
    return Math.floor(n);
  }
  (t.IntNumber = r),
    (t.RegExpString = e()),
    (function (n) {
      (n.CoinbaseWallet = "CoinbaseWallet"),
        (n.MetaMask = "MetaMask"),
        (n.Unselected = "");
    })(t.ProviderType || (t.ProviderType = {}));
})(ai);
var Tv =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(H, "__esModule", { value: !0 });
H.isInIFrame =
  H.createQrUrl =
  H.getFavicon =
  H.range =
  H.isBigNumber =
  H.ensureParsedJSONObject =
  H.ensureBN =
  H.ensureRegExpString =
  H.ensureIntNumber =
  H.ensureBuffer =
  H.ensureAddressString =
  H.ensureEvenLengthHexString =
  H.ensureHexString =
  H.isHexString =
  H.prepend0x =
  H.strip0x =
  H.has0xPrefix =
  H.hexStringFromIntNumber =
  H.intNumberFromHexString =
  H.bigIntStringFromBN =
  H.hexStringFromBuffer =
  H.hexStringToUint8Array =
  H.uint8ArrayToHex =
  H.randomBytesHex =
    void 0;
const Zt = Tv(us),
  kv = Av,
  Tr = si,
  it = ai,
  ad = /^[0-9]*$/,
  cd = /^[a-f0-9]*$/;
function Ov(t) {
  return ud(crypto.getRandomValues(new Uint8Array(t)));
}
H.randomBytesHex = Ov;
function ud(t) {
  return [...t].map((e) => e.toString(16).padStart(2, "0")).join("");
}
H.uint8ArrayToHex = ud;
function Mv(t) {
  return new Uint8Array(t.match(/.{1,2}/g).map((e) => parseInt(e, 16)));
}
H.hexStringToUint8Array = Mv;
function Nv(t, e = !1) {
  const r = t.toString("hex");
  return (0, it.HexString)(e ? "0x" + r : r);
}
H.hexStringFromBuffer = Nv;
function jv(t) {
  return (0, it.BigIntString)(t.toString(10));
}
H.bigIntStringFromBN = jv;
function Lv(t) {
  return (0, it.IntNumber)(new Zt.default(ui(t, !1), 16).toNumber());
}
H.intNumberFromHexString = Lv;
function Pv(t) {
  return (0, it.HexString)("0x" + new Zt.default(t).toString(16));
}
H.hexStringFromIntNumber = Pv;
function Jc(t) {
  return t.startsWith("0x") || t.startsWith("0X");
}
H.has0xPrefix = Jc;
function Rs(t) {
  return Jc(t) ? t.slice(2) : t;
}
H.strip0x = Rs;
function ld(t) {
  return Jc(t) ? "0x" + t.slice(2) : "0x" + t;
}
H.prepend0x = ld;
function ci(t) {
  if (typeof t != "string") return !1;
  const e = Rs(t).toLowerCase();
  return cd.test(e);
}
H.isHexString = ci;
function fd(t, e = !1) {
  if (typeof t == "string") {
    const r = Rs(t).toLowerCase();
    if (cd.test(r)) return (0, it.HexString)(e ? "0x" + r : r);
  }
  throw Tr.standardErrors.rpc.invalidParams(
    `"${String(t)}" is not a hexadecimal string`,
  );
}
H.ensureHexString = fd;
function ui(t, e = !1) {
  let r = fd(t, !1);
  return (
    r.length % 2 === 1 && (r = (0, it.HexString)("0" + r)),
    e ? (0, it.HexString)("0x" + r) : r
  );
}
H.ensureEvenLengthHexString = ui;
function Dv(t) {
  if (typeof t == "string") {
    const e = Rs(t).toLowerCase();
    if (ci(e) && e.length === 40) return (0, it.AddressString)(ld(e));
  }
  throw Tr.standardErrors.rpc.invalidParams(
    `Invalid Ethereum address: ${String(t)}`,
  );
}
H.ensureAddressString = Dv;
function $v(t) {
  if (Buffer.isBuffer(t)) return t;
  if (typeof t == "string")
    if (ci(t)) {
      const e = ui(t, !1);
      return Buffer.from(e, "hex");
    } else return Buffer.from(t, "utf8");
  throw Tr.standardErrors.rpc.invalidParams(`Not binary data: ${String(t)}`);
}
H.ensureBuffer = $v;
function hd(t) {
  if (typeof t == "number" && Number.isInteger(t)) return (0, it.IntNumber)(t);
  if (typeof t == "string") {
    if (ad.test(t)) return (0, it.IntNumber)(Number(t));
    if (ci(t))
      return (0, it.IntNumber)(new Zt.default(ui(t, !1), 16).toNumber());
  }
  throw Tr.standardErrors.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
H.ensureIntNumber = hd;
function Bv(t) {
  if (t instanceof RegExp) return (0, it.RegExpString)(t.toString());
  throw Tr.standardErrors.rpc.invalidParams(`Not a RegExp: ${String(t)}`);
}
H.ensureRegExpString = Bv;
function Fv(t) {
  if (t !== null && (Zt.default.isBN(t) || dd(t)))
    return new Zt.default(t.toString(10), 10);
  if (typeof t == "number") return new Zt.default(hd(t));
  if (typeof t == "string") {
    if (ad.test(t)) return new Zt.default(t, 10);
    if (ci(t)) return new Zt.default(ui(t, !1), 16);
  }
  throw Tr.standardErrors.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
H.ensureBN = Fv;
function Uv(t) {
  if (typeof t == "string") return JSON.parse(t);
  if (typeof t == "object") return t;
  throw Tr.standardErrors.rpc.invalidParams(
    `Not a JSON string or an object: ${String(t)}`,
  );
}
H.ensureParsedJSONObject = Uv;
function dd(t) {
  if (t == null || typeof t.constructor != "function") return !1;
  const { constructor: e } = t;
  return typeof e.config == "function" && typeof e.EUCLID == "number";
}
H.isBigNumber = dd;
function Hv(t, e) {
  return Array.from({ length: e - t }, (r, n) => t + n);
}
H.range = Hv;
function Vv() {
  const t =
      document.querySelector('link[sizes="192x192"]') ||
      document.querySelector('link[sizes="180x180"]') ||
      document.querySelector('link[rel="icon"]') ||
      document.querySelector('link[rel="shortcut icon"]'),
    { protocol: e, host: r } = document.location,
    n = t ? t.getAttribute("href") : null;
  return !n || n.startsWith("javascript:")
    ? null
    : n.startsWith("http://") ||
      n.startsWith("https://") ||
      n.startsWith("data:")
    ? n
    : n.startsWith("//")
    ? e + n
    : `${e}//${r}${n}`;
}
H.getFavicon = Vv;
function Wv(t, e, r, n, i, s) {
  const o = n ? "parent-id" : "id",
    a = (0, kv.stringify)({ [o]: t, secret: e, server: r, v: i, chainId: s });
  return `${r}/#/link?${a}`;
}
H.createQrUrl = Wv;
function zv() {
  try {
    return window.frameElement !== null;
  } catch {
    return !1;
  }
}
H.isInIFrame = zv;
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.Session = void 0;
const Dl = Fm,
  $l = H,
  Bl = "session:id",
  Fl = "session:secret",
  Ul = "session:linked";
class Zc {
  constructor(e, r, n, i) {
    (this._storage = e),
      (this._id = r || (0, $l.randomBytesHex)(16)),
      (this._secret = n || (0, $l.randomBytesHex)(32)),
      (this._key = new Dl.sha256()
        .update(`${this._id}, ${this._secret} WalletLink`)
        .digest("hex")),
      (this._linked = !!i);
  }
  static load(e) {
    const r = e.getItem(Bl),
      n = e.getItem(Ul),
      i = e.getItem(Fl);
    return r && i ? new Zc(e, r, i, n === "1") : null;
  }
  static hash(e) {
    return new Dl.sha256().update(e).digest("hex");
  }
  get id() {
    return this._id;
  }
  get secret() {
    return this._secret;
  }
  get key() {
    return this._key;
  }
  get linked() {
    return this._linked;
  }
  set linked(e) {
    (this._linked = e), this.persistLinked();
  }
  save() {
    return (
      this._storage.setItem(Bl, this._id),
      this._storage.setItem(Fl, this._secret),
      this.persistLinked(),
      this
    );
  }
  persistLinked() {
    this._storage.setItem(Ul, this._linked ? "1" : "0");
  }
}
vn.Session = Zc;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.WalletSDKRelayAbstract =
  dt.APP_VERSION_KEY =
  dt.LOCAL_STORAGE_ADDRESSES_KEY =
  dt.WALLET_USER_NAME_KEY =
    void 0;
const Hl = si;
dt.WALLET_USER_NAME_KEY = "walletUsername";
dt.LOCAL_STORAGE_ADDRESSES_KEY = "Addresses";
dt.APP_VERSION_KEY = "AppVersion";
class Gv {
  async makeEthereumJSONRPCRequest(e, r) {
    if (!r) throw new Error("Error: No jsonRpcUrl provided");
    return window
      .fetch(r, {
        method: "POST",
        body: JSON.stringify(e),
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      })
      .then((n) => n.json())
      .then((n) => {
        if (!n) throw Hl.standardErrors.rpc.parse({});
        const i = n,
          { error: s } = i;
        if (s) throw (0, Hl.serializeError)(s, e.method);
        return i;
      });
  }
}
dt.WalletSDKRelayAbstract = Gv;
const qv = qg,
  Jv = us;
function pd(t) {
  return Buffer.allocUnsafe(t).fill(0);
}
function bd(t, e, r) {
  const n = pd(e);
  return (
    (t = Is(t)),
    r
      ? t.length < e
        ? (t.copy(n), n)
        : t.slice(0, e)
      : t.length < e
      ? (t.copy(n, e - t.length), n)
      : t.slice(-e)
  );
}
function Zv(t, e) {
  return bd(t, e, !0);
}
function Is(t) {
  if (!Buffer.isBuffer(t))
    if (Array.isArray(t)) t = Buffer.from(t);
    else if (typeof t == "string")
      gd(t) ? (t = Buffer.from(Yv(md(t)), "hex")) : (t = Buffer.from(t));
    else if (typeof t == "number") t = intToBuffer(t);
    else if (t == null) t = Buffer.allocUnsafe(0);
    else if (Jv.isBN(t)) t = t.toArrayLike(Buffer);
    else if (t.toArray) t = Buffer.from(t.toArray());
    else throw new Error("invalid type");
  return t;
}
function Qv(t) {
  return (t = Is(t)), "0x" + t.toString("hex");
}
function Kv(t, e) {
  return (
    (t = Is(t)),
    e || (e = 256),
    qv("keccak" + e)
      .update(t)
      .digest()
  );
}
function Yv(t) {
  return t.length % 2 ? "0" + t : t;
}
function gd(t) {
  return typeof t == "string" && t.match(/^0x[0-9A-Fa-f]*$/);
}
function md(t) {
  return typeof t == "string" && t.startsWith("0x") ? t.slice(2) : t;
}
var yd = {
  zeros: pd,
  setLength: bd,
  setLengthRight: Zv,
  isHexString: gd,
  stripHexPrefix: md,
  toBuffer: Is,
  bufferToHex: Qv,
  keccak: Kv,
};
const Sr = yd,
  mr = us;
function vd(t) {
  return t.startsWith("int[")
    ? "int256" + t.slice(3)
    : t === "int"
    ? "int256"
    : t.startsWith("uint[")
    ? "uint256" + t.slice(4)
    : t === "uint"
    ? "uint256"
    : t.startsWith("fixed[")
    ? "fixed128x128" + t.slice(5)
    : t === "fixed"
    ? "fixed128x128"
    : t.startsWith("ufixed[")
    ? "ufixed128x128" + t.slice(6)
    : t === "ufixed"
    ? "ufixed128x128"
    : t;
}
function Qr(t) {
  return parseInt(/^\D+(\d+)$/.exec(t)[1], 10);
}
function Vl(t) {
  var e = /^\D+(\d+)x(\d+)$/.exec(t);
  return [parseInt(e[1], 10), parseInt(e[2], 10)];
}
function _d(t) {
  var e = t.match(/(.*)\[(.*?)\]$/);
  return e ? (e[2] === "" ? "dynamic" : parseInt(e[2], 10)) : null;
}
function hr(t) {
  var e = typeof t;
  if (e === "string")
    return Sr.isHexString(t) ? new mr(Sr.stripHexPrefix(t), 16) : new mr(t, 10);
  if (e === "number") return new mr(t);
  if (t.toArray) return t;
  throw new Error("Argument is not a number");
}
function St(t, e) {
  var r, n, i, s;
  if (t === "address") return St("uint160", hr(e));
  if (t === "bool") return St("uint8", e ? 1 : 0);
  if (t === "string") return St("bytes", new Buffer(e, "utf8"));
  if (e_(t)) {
    if (typeof e.length > "u") throw new Error("Not an array?");
    if (((r = _d(t)), r !== "dynamic" && r !== 0 && e.length > r))
      throw new Error("Elements exceed array size: " + r);
    (i = []),
      (t = t.slice(0, t.lastIndexOf("["))),
      typeof e == "string" && (e = JSON.parse(e));
    for (s in e) i.push(St(t, e[s]));
    if (r === "dynamic") {
      var o = St("uint256", e.length);
      i.unshift(o);
    }
    return Buffer.concat(i);
  } else {
    if (t === "bytes")
      return (
        (e = new Buffer(e)),
        (i = Buffer.concat([St("uint256", e.length), e])),
        e.length % 32 !== 0 &&
          (i = Buffer.concat([i, Sr.zeros(32 - (e.length % 32))])),
        i
      );
    if (t.startsWith("bytes")) {
      if (((r = Qr(t)), r < 1 || r > 32))
        throw new Error("Invalid bytes<N> width: " + r);
      return Sr.setLengthRight(e, 32);
    } else if (t.startsWith("uint")) {
      if (((r = Qr(t)), r % 8 || r < 8 || r > 256))
        throw new Error("Invalid uint<N> width: " + r);
      if (((n = hr(e)), n.bitLength() > r))
        throw new Error(
          "Supplied uint exceeds width: " + r + " vs " + n.bitLength(),
        );
      if (n < 0) throw new Error("Supplied uint is negative");
      return n.toArrayLike(Buffer, "be", 32);
    } else if (t.startsWith("int")) {
      if (((r = Qr(t)), r % 8 || r < 8 || r > 256))
        throw new Error("Invalid int<N> width: " + r);
      if (((n = hr(e)), n.bitLength() > r))
        throw new Error(
          "Supplied int exceeds width: " + r + " vs " + n.bitLength(),
        );
      return n.toTwos(256).toArrayLike(Buffer, "be", 32);
    } else if (t.startsWith("ufixed")) {
      if (((r = Vl(t)), (n = hr(e)), n < 0))
        throw new Error("Supplied ufixed is negative");
      return St("uint256", n.mul(new mr(2).pow(new mr(r[1]))));
    } else if (t.startsWith("fixed"))
      return (r = Vl(t)), St("int256", hr(e).mul(new mr(2).pow(new mr(r[1]))));
  }
  throw new Error("Unsupported or invalid type: " + t);
}
function Xv(t) {
  return t === "string" || t === "bytes" || _d(t) === "dynamic";
}
function e_(t) {
  return t.lastIndexOf("]") === t.length - 1;
}
function t_(t, e) {
  var r = [],
    n = [],
    i = 32 * t.length;
  for (var s in t) {
    var o = vd(t[s]),
      a = e[s],
      c = St(o, a);
    Xv(o) ? (r.push(St("uint256", i)), n.push(c), (i += c.length)) : r.push(c);
  }
  return Buffer.concat(r.concat(n));
}
function wd(t, e) {
  if (t.length !== e.length)
    throw new Error("Number of types are not matching the values");
  for (var r, n, i = [], s = 0; s < t.length; s++) {
    var o = vd(t[s]),
      a = e[s];
    if (o === "bytes") i.push(a);
    else if (o === "string") i.push(new Buffer(a, "utf8"));
    else if (o === "bool") i.push(new Buffer(a ? "01" : "00", "hex"));
    else if (o === "address") i.push(Sr.setLength(a, 20));
    else if (o.startsWith("bytes")) {
      if (((r = Qr(o)), r < 1 || r > 32))
        throw new Error("Invalid bytes<N> width: " + r);
      i.push(Sr.setLengthRight(a, r));
    } else if (o.startsWith("uint")) {
      if (((r = Qr(o)), r % 8 || r < 8 || r > 256))
        throw new Error("Invalid uint<N> width: " + r);
      if (((n = hr(a)), n.bitLength() > r))
        throw new Error(
          "Supplied uint exceeds width: " + r + " vs " + n.bitLength(),
        );
      i.push(n.toArrayLike(Buffer, "be", r / 8));
    } else if (o.startsWith("int")) {
      if (((r = Qr(o)), r % 8 || r < 8 || r > 256))
        throw new Error("Invalid int<N> width: " + r);
      if (((n = hr(a)), n.bitLength() > r))
        throw new Error(
          "Supplied int exceeds width: " + r + " vs " + n.bitLength(),
        );
      i.push(n.toTwos(r).toArrayLike(Buffer, "be", r / 8));
    } else throw new Error("Unsupported or invalid type: " + o);
  }
  return Buffer.concat(i);
}
function r_(t, e) {
  return Sr.keccak(wd(t, e));
}
var n_ = { rawEncode: t_, solidityPack: wd, soliditySHA3: r_ };
const lt = yd,
  Un = n_,
  Sd = {
    type: "object",
    properties: {
      types: {
        type: "object",
        additionalProperties: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" }, type: { type: "string" } },
            required: ["name", "type"],
          },
        },
      },
      primaryType: { type: "string" },
      domain: { type: "object" },
      message: { type: "object" },
    },
    required: ["types", "primaryType", "domain", "message"],
  },
  ja = {
    encodeData(t, e, r, n = !0) {
      const i = ["bytes32"],
        s = [this.hashType(t, r)];
      if (n) {
        const o = (a, c, u) => {
          if (r[c] !== void 0)
            return [
              "bytes32",
              u == null
                ? "0x0000000000000000000000000000000000000000000000000000000000000000"
                : lt.keccak(this.encodeData(c, u, r, n)),
            ];
          if (u === void 0)
            throw new Error(`missing value for field ${a} of type ${c}`);
          if (c === "bytes") return ["bytes32", lt.keccak(u)];
          if (c === "string")
            return (
              typeof u == "string" && (u = Buffer.from(u, "utf8")),
              ["bytes32", lt.keccak(u)]
            );
          if (c.lastIndexOf("]") === c.length - 1) {
            const l = c.slice(0, c.lastIndexOf("[")),
              f = u.map((h) => o(a, l, h));
            return [
              "bytes32",
              lt.keccak(
                Un.rawEncode(
                  f.map(([h]) => h),
                  f.map(([, h]) => h),
                ),
              ),
            ];
          }
          return [c, u];
        };
        for (const a of r[t]) {
          const [c, u] = o(a.name, a.type, e[a.name]);
          i.push(c), s.push(u);
        }
      } else
        for (const o of r[t]) {
          let a = e[o.name];
          if (a !== void 0)
            if (o.type === "bytes")
              i.push("bytes32"), (a = lt.keccak(a)), s.push(a);
            else if (o.type === "string")
              i.push("bytes32"),
                typeof a == "string" && (a = Buffer.from(a, "utf8")),
                (a = lt.keccak(a)),
                s.push(a);
            else if (r[o.type] !== void 0)
              i.push("bytes32"),
                (a = lt.keccak(this.encodeData(o.type, a, r, n))),
                s.push(a);
            else {
              if (o.type.lastIndexOf("]") === o.type.length - 1)
                throw new Error("Arrays currently unimplemented in encodeData");
              i.push(o.type), s.push(a);
            }
        }
      return Un.rawEncode(i, s);
    },
    encodeType(t, e) {
      let r = "",
        n = this.findTypeDependencies(t, e).filter((i) => i !== t);
      n = [t].concat(n.sort());
      for (const i of n) {
        if (!e[i]) throw new Error("No type definition specified: " + i);
        r +=
          i +
          "(" +
          e[i].map(({ name: o, type: a }) => a + " " + o).join(",") +
          ")";
      }
      return r;
    },
    findTypeDependencies(t, e, r = []) {
      if (((t = t.match(/^\w*/)[0]), r.includes(t) || e[t] === void 0))
        return r;
      r.push(t);
      for (const n of e[t])
        for (const i of this.findTypeDependencies(n.type, e, r))
          !r.includes(i) && r.push(i);
      return r;
    },
    hashStruct(t, e, r, n = !0) {
      return lt.keccak(this.encodeData(t, e, r, n));
    },
    hashType(t, e) {
      return lt.keccak(this.encodeType(t, e));
    },
    sanitizeData(t) {
      const e = {};
      for (const r in Sd.properties) t[r] && (e[r] = t[r]);
      return (
        e.types && (e.types = Object.assign({ EIP712Domain: [] }, e.types)), e
      );
    },
    hash(t, e = !0) {
      const r = this.sanitizeData(t),
        n = [Buffer.from("1901", "hex")];
      return (
        n.push(this.hashStruct("EIP712Domain", r.domain, r.types, e)),
        r.primaryType !== "EIP712Domain" &&
          n.push(this.hashStruct(r.primaryType, r.message, r.types, e)),
        lt.keccak(Buffer.concat(n))
      );
    },
  };
var i_ = {
  TYPED_MESSAGE_SCHEMA: Sd,
  TypedDataUtils: ja,
  hashForSignTypedDataLegacy: function (t) {
    return s_(t.data);
  },
  hashForSignTypedData_v3: function (t) {
    return ja.hash(t.data, !1);
  },
  hashForSignTypedData_v4: function (t) {
    return ja.hash(t.data);
  },
};
function s_(t) {
  const e = new Error("Expect argument to be non-empty array");
  if (typeof t != "object" || !t.length) throw e;
  const r = t.map(function (s) {
      return s.type === "bytes" ? lt.toBuffer(s.value) : s.value;
    }),
    n = t.map(function (s) {
      return s.type;
    }),
    i = t.map(function (s) {
      if (!s.name) throw e;
      return s.type + " " + s.name;
    });
  return Un.soliditySHA3(
    ["bytes32", "bytes32"],
    [
      Un.soliditySHA3(new Array(t.length).fill("string"), i),
      Un.soliditySHA3(n, r),
    ],
  );
}
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.filterFromParam = on.FilterPolyfill = void 0;
const Wr = ai,
  Ue = H,
  o_ = 5 * 60 * 1e3,
  dr = { jsonrpc: "2.0", id: 0 };
class a_ {
  constructor(e) {
    (this.logFilters = new Map()),
      (this.blockFilters = new Set()),
      (this.pendingTransactionFilters = new Set()),
      (this.cursors = new Map()),
      (this.timeouts = new Map()),
      (this.nextFilterId = (0, Wr.IntNumber)(1)),
      (this.provider = e);
  }
  async newFilter(e) {
    const r = Ed(e),
      n = this.makeFilterId(),
      i = await this.setInitialCursorPosition(n, r.fromBlock);
    return (
      console.log(
        `Installing new log filter(${n}):`,
        r,
        "initial cursor position:",
        i,
      ),
      this.logFilters.set(n, r),
      this.setFilterTimeout(n),
      (0, Ue.hexStringFromIntNumber)(n)
    );
  }
  async newBlockFilter() {
    const e = this.makeFilterId(),
      r = await this.setInitialCursorPosition(e, "latest");
    return (
      console.log(
        `Installing new block filter (${e}) with initial cursor position:`,
        r,
      ),
      this.blockFilters.add(e),
      this.setFilterTimeout(e),
      (0, Ue.hexStringFromIntNumber)(e)
    );
  }
  async newPendingTransactionFilter() {
    const e = this.makeFilterId(),
      r = await this.setInitialCursorPosition(e, "latest");
    return (
      console.log(
        `Installing new block filter (${e}) with initial cursor position:`,
        r,
      ),
      this.pendingTransactionFilters.add(e),
      this.setFilterTimeout(e),
      (0, Ue.hexStringFromIntNumber)(e)
    );
  }
  uninstallFilter(e) {
    const r = (0, Ue.intNumberFromHexString)(e);
    return console.log(`Uninstalling filter (${r})`), this.deleteFilter(r), !0;
  }
  getFilterChanges(e) {
    const r = (0, Ue.intNumberFromHexString)(e);
    return (
      this.timeouts.has(r) && this.setFilterTimeout(r),
      this.logFilters.has(r)
        ? this.getLogFilterChanges(r)
        : this.blockFilters.has(r)
        ? this.getBlockFilterChanges(r)
        : this.pendingTransactionFilters.has(r)
        ? this.getPendingTransactionFilterChanges(r)
        : Promise.resolve(Mi())
    );
  }
  async getFilterLogs(e) {
    const r = (0, Ue.intNumberFromHexString)(e),
      n = this.logFilters.get(r);
    return n
      ? this.sendAsyncPromise(
          Object.assign(Object.assign({}, dr), {
            method: "eth_getLogs",
            params: [Wl(n)],
          }),
        )
      : Mi();
  }
  makeFilterId() {
    return (0, Wr.IntNumber)(++this.nextFilterId);
  }
  sendAsyncPromise(e) {
    return new Promise((r, n) => {
      this.provider.sendAsync(e, (i, s) => {
        if (i) return n(i);
        if (Array.isArray(s) || s == null)
          return n(
            new Error(`unexpected response received: ${JSON.stringify(s)}`),
          );
        r(s);
      });
    });
  }
  deleteFilter(e) {
    console.log(`Deleting filter (${e})`),
      this.logFilters.delete(e),
      this.blockFilters.delete(e),
      this.pendingTransactionFilters.delete(e),
      this.cursors.delete(e),
      this.timeouts.delete(e);
  }
  async getLogFilterChanges(e) {
    const r = this.logFilters.get(e),
      n = this.cursors.get(e);
    if (!n || !r) return Mi();
    const i = await this.getCurrentBlockHeight(),
      s = r.toBlock === "latest" ? i : r.toBlock;
    if (n > i || n > r.toBlock) return Ni();
    console.log(`Fetching logs from ${n} to ${s} for filter ${e}`);
    const o = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, dr), {
        method: "eth_getLogs",
        params: [
          Wl(Object.assign(Object.assign({}, r), { fromBlock: n, toBlock: s })),
        ],
      }),
    );
    if (Array.isArray(o.result)) {
      const a = o.result.map((u) =>
          (0, Ue.intNumberFromHexString)(u.blockNumber || "0x0"),
        ),
        c = Math.max(...a);
      if (c && c > n) {
        const u = (0, Wr.IntNumber)(c + 1);
        console.log(
          `Moving cursor position for filter (${e}) from ${n} to ${u}`,
        ),
          this.cursors.set(e, u);
      }
    }
    return o;
  }
  async getBlockFilterChanges(e) {
    const r = this.cursors.get(e);
    if (!r) return Mi();
    const n = await this.getCurrentBlockHeight();
    if (r > n) return Ni();
    console.log(`Fetching blocks from ${r} to ${n} for filter (${e})`);
    const i = (
        await Promise.all(
          (0, Ue.range)(r, n + 1).map((o) =>
            this.getBlockHashByNumber((0, Wr.IntNumber)(o)),
          ),
        )
      ).filter((o) => !!o),
      s = (0, Wr.IntNumber)(r + i.length);
    return (
      console.log(`Moving cursor position for filter (${e}) from ${r} to ${s}`),
      this.cursors.set(e, s),
      Object.assign(Object.assign({}, dr), { result: i })
    );
  }
  async getPendingTransactionFilterChanges(e) {
    return Promise.resolve(Ni());
  }
  async setInitialCursorPosition(e, r) {
    const n = await this.getCurrentBlockHeight(),
      i = typeof r == "number" && r > n ? r : n;
    return this.cursors.set(e, i), i;
  }
  setFilterTimeout(e) {
    const r = this.timeouts.get(e);
    r && window.clearTimeout(r);
    const n = window.setTimeout(() => {
      console.log(`Filter (${e}) timed out`), this.deleteFilter(e);
    }, o_);
    this.timeouts.set(e, n);
  }
  async getCurrentBlockHeight() {
    const { result: e } = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, dr), {
        method: "eth_blockNumber",
        params: [],
      }),
    );
    return (0, Ue.intNumberFromHexString)((0, Ue.ensureHexString)(e));
  }
  async getBlockHashByNumber(e) {
    const r = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, dr), {
        method: "eth_getBlockByNumber",
        params: [(0, Ue.hexStringFromIntNumber)(e), !1],
      }),
    );
    return r.result && typeof r.result.hash == "string"
      ? (0, Ue.ensureHexString)(r.result.hash)
      : null;
  }
}
on.FilterPolyfill = a_;
function Ed(t) {
  return {
    fromBlock: zl(t.fromBlock),
    toBlock: zl(t.toBlock),
    addresses:
      t.address === void 0
        ? null
        : Array.isArray(t.address)
        ? t.address
        : [t.address],
    topics: t.topics || [],
  };
}
on.filterFromParam = Ed;
function Wl(t) {
  const e = {
    fromBlock: Gl(t.fromBlock),
    toBlock: Gl(t.toBlock),
    topics: t.topics,
  };
  return t.addresses !== null && (e.address = t.addresses), e;
}
function zl(t) {
  if (t === void 0 || t === "latest" || t === "pending") return "latest";
  if (t === "earliest") return (0, Wr.IntNumber)(0);
  if ((0, Ue.isHexString)(t)) return (0, Ue.intNumberFromHexString)(t);
  throw new Error(`Invalid block option: ${String(t)}`);
}
function Gl(t) {
  return t === "latest" ? t : (0, Ue.hexStringFromIntNumber)(t);
}
function Mi() {
  return Object.assign(Object.assign({}, dr), {
    error: { code: -32e3, message: "filter not found" },
  });
}
function Ni() {
  return Object.assign(Object.assign({}, dr), { result: [] });
}
var Cd = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.JSONRPCMethod = void 0),
    (function (e) {
      (e.eth_accounts = "eth_accounts"),
        (e.eth_coinbase = "eth_coinbase"),
        (e.net_version = "net_version"),
        (e.eth_chainId = "eth_chainId"),
        (e.eth_uninstallFilter = "eth_uninstallFilter"),
        (e.eth_requestAccounts = "eth_requestAccounts"),
        (e.eth_sign = "eth_sign"),
        (e.eth_ecRecover = "eth_ecRecover"),
        (e.personal_sign = "personal_sign"),
        (e.personal_ecRecover = "personal_ecRecover"),
        (e.eth_signTransaction = "eth_signTransaction"),
        (e.eth_sendRawTransaction = "eth_sendRawTransaction"),
        (e.eth_sendTransaction = "eth_sendTransaction"),
        (e.eth_signTypedData_v1 = "eth_signTypedData_v1"),
        (e.eth_signTypedData_v2 = "eth_signTypedData_v2"),
        (e.eth_signTypedData_v3 = "eth_signTypedData_v3"),
        (e.eth_signTypedData_v4 = "eth_signTypedData_v4"),
        (e.eth_signTypedData = "eth_signTypedData"),
        (e.cbWallet_arbitrary = "walletlink_arbitrary"),
        (e.wallet_addEthereumChain = "wallet_addEthereumChain"),
        (e.wallet_switchEthereumChain = "wallet_switchEthereumChain"),
        (e.wallet_watchAsset = "wallet_watchAsset"),
        (e.eth_subscribe = "eth_subscribe"),
        (e.eth_unsubscribe = "eth_unsubscribe"),
        (e.eth_newFilter = "eth_newFilter"),
        (e.eth_newBlockFilter = "eth_newBlockFilter"),
        (e.eth_newPendingTransactionFilter = "eth_newPendingTransactionFilter"),
        (e.eth_getFilterChanges = "eth_getFilterChanges"),
        (e.eth_getFilterLogs = "eth_getFilterLogs");
    })(t.JSONRPCMethod || (t.JSONRPCMethod = {}));
})(Cd);
var xs = {},
  Rd = {},
  As = {},
  Qc = c_;
function c_(t) {
  t = t || {};
  var e = t.max || Number.MAX_SAFE_INTEGER,
    r = typeof t.start < "u" ? t.start : Math.floor(Math.random() * e);
  return function () {
    return (r = r % e), r++;
  };
}
const ql = (t, e) =>
  function () {
    const r = e.promiseModule,
      n = new Array(arguments.length);
    for (let i = 0; i < arguments.length; i++) n[i] = arguments[i];
    return new r((i, s) => {
      e.errorFirst
        ? n.push(function (o, a) {
            if (e.multiArgs) {
              const c = new Array(arguments.length - 1);
              for (let u = 1; u < arguments.length; u++)
                c[u - 1] = arguments[u];
              o ? (c.unshift(o), s(c)) : i(c);
            } else o ? s(o) : i(a);
          })
        : n.push(function (o) {
            if (e.multiArgs) {
              const a = new Array(arguments.length - 1);
              for (let c = 0; c < arguments.length; c++) a[c] = arguments[c];
              i(a);
            } else i(o);
          }),
        t.apply(this, n);
    });
  };
var u_ = (t, e) => {
    e = Object.assign(
      { exclude: [/.+(Sync|Stream)$/], errorFirst: !0, promiseModule: Promise },
      e,
    );
    const r = (i) => {
      const s = (o) => (typeof o == "string" ? i === o : o.test(i));
      return e.include ? e.include.some(s) : !e.exclude.some(s);
    };
    let n;
    typeof t == "function"
      ? (n = function () {
          return e.excludeMain
            ? t.apply(this, arguments)
            : ql(t, e).apply(this, arguments);
        })
      : (n = Object.create(Object.getPrototypeOf(t)));
    for (const i in t) {
      const s = t[i];
      n[i] = typeof s == "function" && r(i) ? ql(s, e) : s;
    }
    return n;
  },
  li = {},
  l_ =
    (F && F.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(li, "__esModule", { value: !0 });
li.BaseBlockTracker = void 0;
const f_ = l_(Ar),
  h_ = 1e3,
  d_ = (t, e) => t + e,
  Jl = ["sync", "latest"];
class p_ extends f_.default {
  constructor(e) {
    super(),
      (this._blockResetDuration = e.blockResetDuration || 20 * h_),
      (this._currentBlock = null),
      (this._isRunning = !1),
      (this._onNewListener = this._onNewListener.bind(this)),
      (this._onRemoveListener = this._onRemoveListener.bind(this)),
      (this._resetCurrentBlock = this._resetCurrentBlock.bind(this)),
      this._setupInternalEvents();
  }
  async destroy() {
    this._cancelBlockResetTimeout(),
      await this._maybeEnd(),
      super.removeAllListeners();
  }
  isRunning() {
    return this._isRunning;
  }
  getCurrentBlock() {
    return this._currentBlock;
  }
  async getLatestBlock() {
    return this._currentBlock
      ? this._currentBlock
      : await new Promise((r) => this.once("latest", r));
  }
  removeAllListeners(e) {
    return (
      e ? super.removeAllListeners(e) : super.removeAllListeners(),
      this._setupInternalEvents(),
      this._onRemoveListener(),
      this
    );
  }
  _setupInternalEvents() {
    this.removeListener("newListener", this._onNewListener),
      this.removeListener("removeListener", this._onRemoveListener),
      this.on("newListener", this._onNewListener),
      this.on("removeListener", this._onRemoveListener);
  }
  _onNewListener(e) {
    Jl.includes(e) && this._maybeStart();
  }
  _onRemoveListener() {
    this._getBlockTrackerEventCount() > 0 || this._maybeEnd();
  }
  async _maybeStart() {
    this._isRunning ||
      ((this._isRunning = !0),
      this._cancelBlockResetTimeout(),
      await this._start(),
      this.emit("_started"));
  }
  async _maybeEnd() {
    this._isRunning &&
      ((this._isRunning = !1),
      this._setupBlockResetTimeout(),
      await this._end(),
      this.emit("_ended"));
  }
  _getBlockTrackerEventCount() {
    return Jl.map((e) => this.listenerCount(e)).reduce(d_);
  }
  _newPotentialLatest(e) {
    const r = this._currentBlock;
    (r && Zl(e) <= Zl(r)) || this._setCurrentBlock(e);
  }
  _setCurrentBlock(e) {
    const r = this._currentBlock;
    (this._currentBlock = e),
      this.emit("latest", e),
      this.emit("sync", { oldBlock: r, newBlock: e });
  }
  _setupBlockResetTimeout() {
    this._cancelBlockResetTimeout(),
      (this._blockResetTimeout = setTimeout(
        this._resetCurrentBlock,
        this._blockResetDuration,
      )),
      this._blockResetTimeout.unref && this._blockResetTimeout.unref();
  }
  _cancelBlockResetTimeout() {
    this._blockResetTimeout && clearTimeout(this._blockResetTimeout);
  }
  _resetCurrentBlock() {
    this._currentBlock = null;
  }
}
li.BaseBlockTracker = p_;
function Zl(t) {
  return Number.parseInt(t, 16);
}
var Id = {},
  xd = {},
  Pe = {};
class Ad extends TypeError {
  constructor(e, r) {
    let n;
    const { message: i, explanation: s, ...o } = e,
      { path: a } = e,
      c = a.length === 0 ? i : `At path: ${a.join(".")} -- ${i}`;
    super(s ?? c),
      s != null && (this.cause = c),
      Object.assign(this, o),
      (this.name = this.constructor.name),
      (this.failures = () => n ?? (n = [e, ...r()]));
  }
}
function b_(t) {
  return st(t) && typeof t[Symbol.iterator] == "function";
}
function st(t) {
  return typeof t == "object" && t != null;
}
function Ql(t) {
  if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
  const e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype;
}
function xe(t) {
  return typeof t == "symbol"
    ? t.toString()
    : typeof t == "string"
    ? JSON.stringify(t)
    : `${t}`;
}
function g_(t) {
  const { done: e, value: r } = t.next();
  return e ? void 0 : r;
}
function m_(t, e, r, n) {
  if (t === !0) return;
  t === !1 ? (t = {}) : typeof t == "string" && (t = { message: t });
  const { path: i, branch: s } = e,
    { type: o } = r,
    {
      refinement: a,
      message: c = `Expected a value of type \`${o}\`${
        a ? ` with refinement \`${a}\`` : ""
      }, but received: \`${xe(n)}\``,
    } = t;
  return {
    value: n,
    type: o,
    refinement: a,
    key: i[i.length - 1],
    path: i,
    branch: s,
    ...t,
    message: c,
  };
}
function* pc(t, e, r, n) {
  b_(t) || (t = [t]);
  for (const i of t) {
    const s = m_(i, e, r, n);
    s && (yield s);
  }
}
function* Kc(t, e, r = {}) {
  const { path: n = [], branch: i = [t], coerce: s = !1, mask: o = !1 } = r,
    a = { path: n, branch: i };
  if (
    s &&
    ((t = e.coercer(t, a)),
    o && e.type !== "type" && st(e.schema) && st(t) && !Array.isArray(t))
  )
    for (const u in t) e.schema[u] === void 0 && delete t[u];
  let c = "valid";
  for (const u of e.validator(t, a))
    (u.explanation = r.message), (c = "not_valid"), yield [u, void 0];
  for (let [u, l, f] of e.entries(t, a)) {
    const h = Kc(l, f, {
      path: u === void 0 ? n : [...n, u],
      branch: u === void 0 ? i : [...i, l],
      coerce: s,
      mask: o,
      message: r.message,
    });
    for (const b of h)
      b[0]
        ? ((c = b[0].refinement != null ? "not_refined" : "not_valid"),
          yield [b[0], void 0])
        : s &&
          ((l = b[1]),
          u === void 0
            ? (t = l)
            : t instanceof Map
            ? t.set(u, l)
            : t instanceof Set
            ? t.add(l)
            : st(t) && (l !== void 0 || u in t) && (t[u] = l));
  }
  if (c !== "not_valid")
    for (const u of e.refiner(t, a))
      (u.explanation = r.message), (c = "not_refined"), yield [u, void 0];
  c === "valid" && (yield [void 0, t]);
}
class Ce {
  constructor(e) {
    const {
      type: r,
      schema: n,
      validator: i,
      refiner: s,
      coercer: o = (c) => c,
      entries: a = function* () {},
    } = e;
    (this.type = r),
      (this.schema = n),
      (this.entries = a),
      (this.coercer = o),
      i
        ? (this.validator = (c, u) => {
            const l = i(c, u);
            return pc(l, u, this, c);
          })
        : (this.validator = () => []),
      s
        ? (this.refiner = (c, u) => {
            const l = s(c, u);
            return pc(l, u, this, c);
          })
        : (this.refiner = () => []);
  }
  assert(e, r) {
    return Td(e, this, r);
  }
  create(e, r) {
    return kd(e, this, r);
  }
  is(e) {
    return Yc(e, this);
  }
  mask(e, r) {
    return Od(e, this, r);
  }
  validate(e, r = {}) {
    return wn(e, this, r);
  }
}
function Td(t, e, r) {
  const n = wn(t, e, { message: r });
  if (n[0]) throw n[0];
}
function kd(t, e, r) {
  const n = wn(t, e, { coerce: !0, message: r });
  if (n[0]) throw n[0];
  return n[1];
}
function Od(t, e, r) {
  const n = wn(t, e, { coerce: !0, mask: !0, message: r });
  if (n[0]) throw n[0];
  return n[1];
}
function Yc(t, e) {
  return !wn(t, e)[0];
}
function wn(t, e, r = {}) {
  const n = Kc(t, e, r),
    i = g_(n);
  return i[0]
    ? [
        new Ad(i[0], function* () {
          for (const o of n) o[0] && (yield o[0]);
        }),
        void 0,
      ]
    : [void 0, i[1]];
}
function y_(...t) {
  const e = t[0].type === "type",
    r = t.map((i) => i.schema),
    n = Object.assign({}, ...r);
  return e ? eu(n) : fi(n);
}
function qe(t, e) {
  return new Ce({ type: t, schema: null, validator: e });
}
function v_(t, e) {
  return new Ce({
    ...t,
    refiner: (r, n) => r === void 0 || t.refiner(r, n),
    validator(r, n) {
      return r === void 0 ? !0 : (e(r, n), t.validator(r, n));
    },
  });
}
function __(t) {
  return new Ce({
    type: "dynamic",
    schema: null,
    *entries(e, r) {
      yield* t(e, r).entries(e, r);
    },
    validator(e, r) {
      return t(e, r).validator(e, r);
    },
    coercer(e, r) {
      return t(e, r).coercer(e, r);
    },
    refiner(e, r) {
      return t(e, r).refiner(e, r);
    },
  });
}
function w_(t) {
  let e;
  return new Ce({
    type: "lazy",
    schema: null,
    *entries(r, n) {
      e ?? (e = t()), yield* e.entries(r, n);
    },
    validator(r, n) {
      return e ?? (e = t()), e.validator(r, n);
    },
    coercer(r, n) {
      return e ?? (e = t()), e.coercer(r, n);
    },
    refiner(r, n) {
      return e ?? (e = t()), e.refiner(r, n);
    },
  });
}
function S_(t, e) {
  const { schema: r } = t,
    n = { ...r };
  for (const i of e) delete n[i];
  switch (t.type) {
    case "type":
      return eu(n);
    default:
      return fi(n);
  }
}
function E_(t) {
  const e = t instanceof Ce ? { ...t.schema } : { ...t };
  for (const r in e) e[r] = Md(e[r]);
  return fi(e);
}
function C_(t, e) {
  const { schema: r } = t,
    n = {};
  for (const i of e) n[i] = r[i];
  return fi(n);
}
function R_(t, e) {
  return (
    console.warn(
      "superstruct@0.11 - The `struct` helper has been renamed to `define`.",
    ),
    qe(t, e)
  );
}
function I_() {
  return qe("any", () => !0);
}
function x_(t) {
  return new Ce({
    type: "array",
    schema: t,
    *entries(e) {
      if (t && Array.isArray(e))
        for (const [r, n] of e.entries()) yield [r, n, t];
    },
    coercer(e) {
      return Array.isArray(e) ? e.slice() : e;
    },
    validator(e) {
      return (
        Array.isArray(e) || `Expected an array value, but received: ${xe(e)}`
      );
    },
  });
}
function A_() {
  return qe("bigint", (t) => typeof t == "bigint");
}
function T_() {
  return qe("boolean", (t) => typeof t == "boolean");
}
function k_() {
  return qe(
    "date",
    (t) =>
      (t instanceof Date && !isNaN(t.getTime())) ||
      `Expected a valid \`Date\` object, but received: ${xe(t)}`,
  );
}
function O_(t) {
  const e = {},
    r = t.map((n) => xe(n)).join();
  for (const n of t) e[n] = n;
  return new Ce({
    type: "enums",
    schema: e,
    validator(n) {
      return (
        t.includes(n) || `Expected one of \`${r}\`, but received: ${xe(n)}`
      );
    },
  });
}
function M_() {
  return qe(
    "func",
    (t) =>
      typeof t == "function" || `Expected a function, but received: ${xe(t)}`,
  );
}
function N_(t) {
  return qe(
    "instance",
    (e) =>
      e instanceof t ||
      `Expected a \`${t.name}\` instance, but received: ${xe(e)}`,
  );
}
function j_() {
  return qe(
    "integer",
    (t) =>
      (typeof t == "number" && !isNaN(t) && Number.isInteger(t)) ||
      `Expected an integer, but received: ${xe(t)}`,
  );
}
function L_(t) {
  return new Ce({
    type: "intersection",
    schema: null,
    *entries(e, r) {
      for (const n of t) yield* n.entries(e, r);
    },
    *validator(e, r) {
      for (const n of t) yield* n.validator(e, r);
    },
    *refiner(e, r) {
      for (const n of t) yield* n.refiner(e, r);
    },
  });
}
function P_(t) {
  const e = xe(t),
    r = typeof t;
  return new Ce({
    type: "literal",
    schema: r === "string" || r === "number" || r === "boolean" ? t : null,
    validator(n) {
      return n === t || `Expected the literal \`${e}\`, but received: ${xe(n)}`;
    },
  });
}
function D_(t, e) {
  return new Ce({
    type: "map",
    schema: null,
    *entries(r) {
      if (t && e && r instanceof Map)
        for (const [n, i] of r.entries()) yield [n, n, t], yield [n, i, e];
    },
    coercer(r) {
      return r instanceof Map ? new Map(r) : r;
    },
    validator(r) {
      return (
        r instanceof Map || `Expected a \`Map\` object, but received: ${xe(r)}`
      );
    },
  });
}
function Xc() {
  return qe("never", () => !1);
}
function $_(t) {
  return new Ce({
    ...t,
    validator: (e, r) => e === null || t.validator(e, r),
    refiner: (e, r) => e === null || t.refiner(e, r),
  });
}
function B_() {
  return qe(
    "number",
    (t) =>
      (typeof t == "number" && !isNaN(t)) ||
      `Expected a number, but received: ${xe(t)}`,
  );
}
function fi(t) {
  const e = t ? Object.keys(t) : [],
    r = Xc();
  return new Ce({
    type: "object",
    schema: t || null,
    *entries(n) {
      if (t && st(n)) {
        const i = new Set(Object.keys(n));
        for (const s of e) i.delete(s), yield [s, n[s], t[s]];
        for (const s of i) yield [s, n[s], r];
      }
    },
    validator(n) {
      return st(n) || `Expected an object, but received: ${xe(n)}`;
    },
    coercer(n) {
      return st(n) ? { ...n } : n;
    },
  });
}
function Md(t) {
  return new Ce({
    ...t,
    validator: (e, r) => e === void 0 || t.validator(e, r),
    refiner: (e, r) => e === void 0 || t.refiner(e, r),
  });
}
function F_(t, e) {
  return new Ce({
    type: "record",
    schema: null,
    *entries(r) {
      if (st(r))
        for (const n in r) {
          const i = r[n];
          yield [n, n, t], yield [n, i, e];
        }
    },
    validator(r) {
      return st(r) || `Expected an object, but received: ${xe(r)}`;
    },
  });
}
function U_() {
  return qe("regexp", (t) => t instanceof RegExp);
}
function H_(t) {
  return new Ce({
    type: "set",
    schema: null,
    *entries(e) {
      if (t && e instanceof Set) for (const r of e) yield [r, r, t];
    },
    coercer(e) {
      return e instanceof Set ? new Set(e) : e;
    },
    validator(e) {
      return (
        e instanceof Set || `Expected a \`Set\` object, but received: ${xe(e)}`
      );
    },
  });
}
function Nd() {
  return qe(
    "string",
    (t) => typeof t == "string" || `Expected a string, but received: ${xe(t)}`,
  );
}
function V_(t) {
  const e = Xc();
  return new Ce({
    type: "tuple",
    schema: null,
    *entries(r) {
      if (Array.isArray(r)) {
        const n = Math.max(t.length, r.length);
        for (let i = 0; i < n; i++) yield [i, r[i], t[i] || e];
      }
    },
    validator(r) {
      return Array.isArray(r) || `Expected an array, but received: ${xe(r)}`;
    },
  });
}
function eu(t) {
  const e = Object.keys(t);
  return new Ce({
    type: "type",
    schema: t,
    *entries(r) {
      if (st(r)) for (const n of e) yield [n, r[n], t[n]];
    },
    validator(r) {
      return st(r) || `Expected an object, but received: ${xe(r)}`;
    },
    coercer(r) {
      return st(r) ? { ...r } : r;
    },
  });
}
function W_(t) {
  const e = t.map((r) => r.type).join(" | ");
  return new Ce({
    type: "union",
    schema: null,
    coercer(r) {
      for (const n of t) {
        const [i, s] = n.validate(r, { coerce: !0 });
        if (!i) return s;
      }
      return r;
    },
    validator(r, n) {
      const i = [];
      for (const s of t) {
        const [...o] = Kc(r, s, n),
          [a] = o;
        if (a[0]) for (const [c] of o) c && i.push(c);
        else return [];
      }
      return [
        `Expected the value to satisfy a union of \`${e}\`, but received: ${xe(
          r,
        )}`,
        ...i,
      ];
    },
  });
}
function jd() {
  return qe("unknown", () => !0);
}
function tu(t, e, r) {
  return new Ce({
    ...t,
    coercer: (n, i) => (Yc(n, e) ? t.coercer(r(n, i), i) : t.coercer(n, i)),
  });
}
function z_(t, e, r = {}) {
  return tu(t, jd(), (n) => {
    const i = typeof e == "function" ? e() : e;
    if (n === void 0) return i;
    if (!r.strict && Ql(n) && Ql(i)) {
      const s = { ...n };
      let o = !1;
      for (const a in i) s[a] === void 0 && ((s[a] = i[a]), (o = !0));
      if (o) return s;
    }
    return n;
  });
}
function G_(t) {
  return tu(t, Nd(), (e) => e.trim());
}
function q_(t) {
  return kr(t, "empty", (e) => {
    const r = Ld(e);
    return (
      r === 0 ||
      `Expected an empty ${t.type} but received one with a size of \`${r}\``
    );
  });
}
function Ld(t) {
  return t instanceof Map || t instanceof Set ? t.size : t.length;
}
function J_(t, e, r = {}) {
  const { exclusive: n } = r;
  return kr(t, "max", (i) =>
    n
      ? i < e
      : i <= e ||
        `Expected a ${t.type} less than ${
          n ? "" : "or equal to "
        }${e} but received \`${i}\``,
  );
}
function Z_(t, e, r = {}) {
  const { exclusive: n } = r;
  return kr(t, "min", (i) =>
    n
      ? i > e
      : i >= e ||
        `Expected a ${t.type} greater than ${
          n ? "" : "or equal to "
        }${e} but received \`${i}\``,
  );
}
function Q_(t) {
  return kr(
    t,
    "nonempty",
    (e) =>
      Ld(e) > 0 || `Expected a nonempty ${t.type} but received an empty one`,
  );
}
function K_(t, e) {
  return kr(
    t,
    "pattern",
    (r) =>
      e.test(r) ||
      `Expected a ${t.type} matching \`/${e.source}/\` but received "${r}"`,
  );
}
function Y_(t, e, r = e) {
  const n = `Expected a ${t.type}`,
    i = e === r ? `of \`${e}\`` : `between \`${e}\` and \`${r}\``;
  return kr(t, "size", (s) => {
    if (typeof s == "number" || s instanceof Date)
      return (e <= s && s <= r) || `${n} ${i} but received \`${s}\``;
    if (s instanceof Map || s instanceof Set) {
      const { size: o } = s;
      return (
        (e <= o && o <= r) ||
        `${n} with a size ${i} but received one with a size of \`${o}\``
      );
    } else {
      const { length: o } = s;
      return (
        (e <= o && o <= r) ||
        `${n} with a length ${i} but received one with a length of \`${o}\``
      );
    }
  });
}
function kr(t, e, r) {
  return new Ce({
    ...t,
    *refiner(n, i) {
      yield* t.refiner(n, i);
      const s = r(n, i),
        o = pc(s, i, t, n);
      for (const a of o) yield { ...a, refinement: e };
    },
  });
}
const X_ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Struct: Ce,
        StructError: Ad,
        any: I_,
        array: x_,
        assert: Td,
        assign: y_,
        bigint: A_,
        boolean: T_,
        coerce: tu,
        create: kd,
        date: k_,
        defaulted: z_,
        define: qe,
        deprecated: v_,
        dynamic: __,
        empty: q_,
        enums: O_,
        func: M_,
        instance: N_,
        integer: j_,
        intersection: L_,
        is: Yc,
        lazy: w_,
        literal: P_,
        map: D_,
        mask: Od,
        max: J_,
        min: Z_,
        never: Xc,
        nonempty: Q_,
        nullable: $_,
        number: B_,
        object: fi,
        omit: S_,
        optional: Md,
        partial: E_,
        pattern: K_,
        pick: C_,
        record: F_,
        refine: kr,
        regexp: U_,
        set: H_,
        size: Y_,
        string: Nd,
        struct: R_,
        trimmed: G_,
        tuple: V_,
        type: eu,
        union: W_,
        unknown: jd,
        validate: wn,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Or = Rr(X_);
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.assertExhaustive = Pe.assertStruct = Pe.assert = Pe.AssertionError = void 0;
const e1 = Or;
function t1(t) {
  return typeof t == "object" && t !== null && "message" in t;
}
function r1(t) {
  var e, r;
  return (
    typeof ((r =
      (e = t == null ? void 0 : t.prototype) === null || e === void 0
        ? void 0
        : e.constructor) === null || r === void 0
      ? void 0
      : r.name) == "string"
  );
}
function n1(t) {
  const e = t1(t) ? t.message : String(t);
  return e.endsWith(".") ? e.slice(0, -1) : e;
}
function Pd(t, e) {
  return r1(t) ? new t({ message: e }) : t({ message: e });
}
class ru extends Error {
  constructor(e) {
    super(e.message), (this.code = "ERR_ASSERTION");
  }
}
Pe.AssertionError = ru;
function i1(t, e = "Assertion failed.", r = ru) {
  if (!t) throw e instanceof Error ? e : Pd(r, e);
}
Pe.assert = i1;
function s1(t, e, r = "Assertion failed", n = ru) {
  try {
    (0, e1.assert)(t, e);
  } catch (i) {
    throw Pd(n, `${r}: ${n1(i)}.`);
  }
}
Pe.assertStruct = s1;
function o1(t) {
  throw new Error(
    "Invalid branch reached. Should be detected during compilation.",
  );
}
Pe.assertExhaustive = o1;
var hi = {};
Object.defineProperty(hi, "__esModule", { value: !0 });
hi.base64 = void 0;
const a1 = Or,
  c1 = Pe,
  u1 = (t, e = {}) => {
    var r, n;
    const i = (r = e.paddingRequired) !== null && r !== void 0 ? r : !1,
      s = (n = e.characterSet) !== null && n !== void 0 ? n : "base64";
    let o;
    s === "base64"
      ? (o = String.raw`[A-Za-z0-9+\/]`)
      : ((0, c1.assert)(s === "base64url"), (o = String.raw`[-_A-Za-z0-9]`));
    let a;
    return (
      i
        ? (a = new RegExp(`^(?:${o}{4})*(?:${o}{3}=|${o}{2}==)?$`, "u"))
        : (a = new RegExp(
            `^(?:${o}{4})*(?:${o}{2,3}|${o}{3}=|${o}{2}==)?$`,
            "u",
          )),
      (0, a1.pattern)(t, a)
    );
  };
hi.base64 = u1;
var ae = {},
  di = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.remove0x =
      t.add0x =
      t.assertIsStrictHexString =
      t.assertIsHexString =
      t.isStrictHexString =
      t.isHexString =
      t.StrictHexStruct =
      t.HexStruct =
        void 0);
  const e = Or,
    r = Pe;
  (t.HexStruct = (0, e.pattern)((0, e.string)(), /^(?:0x)?[0-9a-f]+$/iu)),
    (t.StrictHexStruct = (0, e.pattern)((0, e.string)(), /^0x[0-9a-f]+$/iu));
  function n(u) {
    return (0, e.is)(u, t.HexStruct);
  }
  t.isHexString = n;
  function i(u) {
    return (0, e.is)(u, t.StrictHexStruct);
  }
  t.isStrictHexString = i;
  function s(u) {
    (0, r.assert)(n(u), "Value must be a hexadecimal string.");
  }
  t.assertIsHexString = s;
  function o(u) {
    (0, r.assert)(
      i(u),
      'Value must be a hexadecimal string, starting with "0x".',
    );
  }
  t.assertIsStrictHexString = o;
  function a(u) {
    return u.startsWith("0x")
      ? u
      : u.startsWith("0X")
      ? `0x${u.substring(2)}`
      : `0x${u}`;
  }
  t.add0x = a;
  function c(u) {
    return u.startsWith("0x") || u.startsWith("0X") ? u.substring(2) : u;
  }
  t.remove0x = c;
})(di);
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.createDataView =
  ae.concatBytes =
  ae.valueToBytes =
  ae.stringToBytes =
  ae.numberToBytes =
  ae.signedBigIntToBytes =
  ae.bigIntToBytes =
  ae.hexToBytes =
  ae.bytesToString =
  ae.bytesToNumber =
  ae.bytesToSignedBigInt =
  ae.bytesToBigInt =
  ae.bytesToHex =
  ae.assertIsBytes =
  ae.isBytes =
    void 0;
const Ze = Pe,
  bc = di,
  Kl = 48,
  Yl = 58,
  Xl = 87;
function l1() {
  const t = [];
  return () => {
    if (t.length === 0)
      for (let e = 0; e < 256; e++) t.push(e.toString(16).padStart(2, "0"));
    return t;
  };
}
const f1 = l1();
function nu(t) {
  return t instanceof Uint8Array;
}
ae.isBytes = nu;
function Sn(t) {
  (0, Ze.assert)(nu(t), "Value must be a Uint8Array.");
}
ae.assertIsBytes = Sn;
function Dd(t) {
  if ((Sn(t), t.length === 0)) return "0x";
  const e = f1(),
    r = new Array(t.length);
  for (let n = 0; n < t.length; n++) r[n] = e[t[n]];
  return (0, bc.add0x)(r.join(""));
}
ae.bytesToHex = Dd;
function $d(t) {
  Sn(t);
  const e = Dd(t);
  return BigInt(e);
}
ae.bytesToBigInt = $d;
function h1(t) {
  Sn(t);
  let e = BigInt(0);
  for (const r of t) e = (e << BigInt(8)) + BigInt(r);
  return BigInt.asIntN(t.length * 8, e);
}
ae.bytesToSignedBigInt = h1;
function d1(t) {
  Sn(t);
  const e = $d(t);
  return (
    (0, Ze.assert)(
      e <= BigInt(Number.MAX_SAFE_INTEGER),
      "Number is not a safe integer. Use `bytesToBigInt` instead.",
    ),
    Number(e)
  );
}
ae.bytesToNumber = d1;
function p1(t) {
  return Sn(t), new TextDecoder().decode(t);
}
ae.bytesToString = p1;
function Ts(t) {
  var e;
  if (
    ((e = t == null ? void 0 : t.toLowerCase) === null || e === void 0
      ? void 0
      : e.call(t)) === "0x"
  )
    return new Uint8Array();
  (0, bc.assertIsHexString)(t);
  const r = (0, bc.remove0x)(t).toLowerCase(),
    n = r.length % 2 === 0 ? r : `0${r}`,
    i = new Uint8Array(n.length / 2);
  for (let s = 0; s < i.length; s++) {
    const o = n.charCodeAt(s * 2),
      a = n.charCodeAt(s * 2 + 1),
      c = o - (o < Yl ? Kl : Xl),
      u = a - (a < Yl ? Kl : Xl);
    i[s] = c * 16 + u;
  }
  return i;
}
ae.hexToBytes = Ts;
function Bd(t) {
  (0, Ze.assert)(typeof t == "bigint", "Value must be a bigint."),
    (0, Ze.assert)(t >= BigInt(0), "Value must be a non-negative bigint.");
  const e = t.toString(16);
  return Ts(e);
}
ae.bigIntToBytes = Bd;
function b1(t, e) {
  (0, Ze.assert)(e > 0);
  const r = t >> BigInt(31);
  return !(((~t & r) + (t & ~r)) >> BigInt(e * 8 + -1));
}
function g1(t, e) {
  (0, Ze.assert)(typeof t == "bigint", "Value must be a bigint."),
    (0, Ze.assert)(typeof e == "number", "Byte length must be a number."),
    (0, Ze.assert)(e > 0, "Byte length must be greater than 0."),
    (0, Ze.assert)(
      b1(t, e),
      "Byte length is too small to represent the given value.",
    );
  let r = t;
  const n = new Uint8Array(e);
  for (let i = 0; i < n.length; i++)
    (n[i] = Number(BigInt.asUintN(8, r))), (r >>= BigInt(8));
  return n.reverse();
}
ae.signedBigIntToBytes = g1;
function Fd(t) {
  (0, Ze.assert)(typeof t == "number", "Value must be a number."),
    (0, Ze.assert)(t >= 0, "Value must be a non-negative number."),
    (0, Ze.assert)(
      Number.isSafeInteger(t),
      "Value is not a safe integer. Use `bigIntToBytes` instead.",
    );
  const e = t.toString(16);
  return Ts(e);
}
ae.numberToBytes = Fd;
function Ud(t) {
  return (
    (0, Ze.assert)(typeof t == "string", "Value must be a string."),
    new TextEncoder().encode(t)
  );
}
ae.stringToBytes = Ud;
function Hd(t) {
  if (typeof t == "bigint") return Bd(t);
  if (typeof t == "number") return Fd(t);
  if (typeof t == "string") return t.startsWith("0x") ? Ts(t) : Ud(t);
  if (nu(t)) return t;
  throw new TypeError(`Unsupported value type: "${typeof t}".`);
}
ae.valueToBytes = Hd;
function m1(t) {
  const e = new Array(t.length);
  let r = 0;
  for (let i = 0; i < t.length; i++) {
    const s = Hd(t[i]);
    (e[i] = s), (r += s.length);
  }
  const n = new Uint8Array(r);
  for (let i = 0, s = 0; i < e.length; i++) n.set(e[i], s), (s += e[i].length);
  return n;
}
ae.concatBytes = m1;
function y1(t) {
  if (typeof Buffer < "u" && t instanceof Buffer) {
    const e = t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
    return new DataView(e);
  }
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
ae.createDataView = y1;
var ks = {};
Object.defineProperty(ks, "__esModule", { value: !0 });
ks.ChecksumStruct = void 0;
const ef = Or,
  v1 = hi;
ks.ChecksumStruct = (0, ef.size)(
  (0, v1.base64)((0, ef.string)(), { paddingRequired: !0 }),
  44,
  44,
);
var xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.createHex = xt.createBytes = xt.createBigInt = xt.createNumber = void 0;
const ve = Or,
  _1 = Pe,
  Vd = ae,
  Os = di,
  Wd = (0, ve.union)([
    (0, ve.number)(),
    (0, ve.bigint)(),
    (0, ve.string)(),
    Os.StrictHexStruct,
  ]),
  w1 = (0, ve.coerce)((0, ve.number)(), Wd, Number),
  S1 = (0, ve.coerce)((0, ve.bigint)(), Wd, BigInt);
(0, ve.union)([Os.StrictHexStruct, (0, ve.instance)(Uint8Array)]);
const E1 = (0, ve.coerce)(
    (0, ve.instance)(Uint8Array),
    (0, ve.union)([Os.StrictHexStruct]),
    Vd.hexToBytes,
  ),
  C1 = (0, ve.coerce)(
    Os.StrictHexStruct,
    (0, ve.instance)(Uint8Array),
    Vd.bytesToHex,
  );
function R1(t) {
  try {
    const e = (0, ve.create)(t, w1);
    return (
      (0, _1.assert)(
        Number.isFinite(e),
        `Expected a number-like value, got "${t}".`,
      ),
      e
    );
  } catch (e) {
    throw e instanceof ve.StructError
      ? new Error(`Expected a number-like value, got "${t}".`)
      : e;
  }
}
xt.createNumber = R1;
function I1(t) {
  try {
    return (0, ve.create)(t, S1);
  } catch (e) {
    throw e instanceof ve.StructError
      ? new Error(`Expected a number-like value, got "${String(e.value)}".`)
      : e;
  }
}
xt.createBigInt = I1;
function x1(t) {
  if (typeof t == "string" && t.toLowerCase() === "0x") return new Uint8Array();
  try {
    return (0, ve.create)(t, E1);
  } catch (e) {
    throw e instanceof ve.StructError
      ? new Error(`Expected a bytes-like value, got "${String(e.value)}".`)
      : e;
  }
}
xt.createBytes = x1;
function A1(t) {
  if (
    (t instanceof Uint8Array && t.length === 0) ||
    (typeof t == "string" && t.toLowerCase() === "0x")
  )
    return "0x";
  try {
    return (0, ve.create)(t, C1);
  } catch (e) {
    throw e instanceof ve.StructError
      ? new Error(`Expected a bytes-like value, got "${String(e.value)}".`)
      : e;
  }
}
xt.createHex = A1;
var an = {},
  zd =
    (F && F.__classPrivateFieldSet) ||
    function (t, e, r, n, i) {
      if (n === "m") throw new TypeError("Private method is not writable");
      if (n === "a" && !i)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof e == "function" ? t !== e || !i : !e.has(t))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
    },
  He =
    (F && F.__classPrivateFieldGet) ||
    function (t, e, r, n) {
      if (r === "a" && !n)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof e == "function" ? t !== e || !n : !e.has(t))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
    },
  ct,
  vt;
Object.defineProperty(an, "__esModule", { value: !0 });
an.FrozenSet = an.FrozenMap = void 0;
class iu {
  constructor(e) {
    ct.set(this, void 0), zd(this, ct, new Map(e), "f"), Object.freeze(this);
  }
  get size() {
    return He(this, ct, "f").size;
  }
  [((ct = new WeakMap()), Symbol.iterator)]() {
    return He(this, ct, "f")[Symbol.iterator]();
  }
  entries() {
    return He(this, ct, "f").entries();
  }
  forEach(e, r) {
    return He(this, ct, "f").forEach((n, i, s) => e.call(r, n, i, this));
  }
  get(e) {
    return He(this, ct, "f").get(e);
  }
  has(e) {
    return He(this, ct, "f").has(e);
  }
  keys() {
    return He(this, ct, "f").keys();
  }
  values() {
    return He(this, ct, "f").values();
  }
  toString() {
    return `FrozenMap(${this.size}) {${
      this.size > 0
        ? ` ${[...this.entries()]
            .map(([e, r]) => `${String(e)} => ${String(r)}`)
            .join(", ")} `
        : ""
    }}`;
  }
}
an.FrozenMap = iu;
class su {
  constructor(e) {
    vt.set(this, void 0), zd(this, vt, new Set(e), "f"), Object.freeze(this);
  }
  get size() {
    return He(this, vt, "f").size;
  }
  [((vt = new WeakMap()), Symbol.iterator)]() {
    return He(this, vt, "f")[Symbol.iterator]();
  }
  entries() {
    return He(this, vt, "f").entries();
  }
  forEach(e, r) {
    return He(this, vt, "f").forEach((n, i, s) => e.call(r, n, i, this));
  }
  has(e) {
    return He(this, vt, "f").has(e);
  }
  keys() {
    return He(this, vt, "f").keys();
  }
  values() {
    return He(this, vt, "f").values();
  }
  toString() {
    return `FrozenSet(${this.size}) {${
      this.size > 0
        ? ` ${[...this.values()].map((e) => String(e)).join(", ")} `
        : ""
    }}`;
  }
}
an.FrozenSet = su;
Object.freeze(iu);
Object.freeze(iu.prototype);
Object.freeze(su);
Object.freeze(su.prototype);
var Gd = {},
  ou = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.calculateNumberSize =
      t.calculateStringSize =
      t.isASCII =
      t.isPlainObject =
      t.ESCAPE_CHARACTERS_REGEXP =
      t.JsonSize =
      t.hasProperty =
      t.isObject =
      t.isNullOrUndefined =
      t.isNonEmptyArray =
        void 0);
  function e(u) {
    return Array.isArray(u) && u.length > 0;
  }
  t.isNonEmptyArray = e;
  function r(u) {
    return u == null;
  }
  t.isNullOrUndefined = r;
  function n(u) {
    return !!u && typeof u == "object" && !Array.isArray(u);
  }
  t.isObject = n;
  const i = (u, l) => Object.hasOwnProperty.call(u, l);
  (t.hasProperty = i),
    (function (u) {
      (u[(u.Null = 4)] = "Null"),
        (u[(u.Comma = 1)] = "Comma"),
        (u[(u.Wrapper = 1)] = "Wrapper"),
        (u[(u.True = 4)] = "True"),
        (u[(u.False = 5)] = "False"),
        (u[(u.Quote = 1)] = "Quote"),
        (u[(u.Colon = 1)] = "Colon"),
        (u[(u.Date = 24)] = "Date");
    })(t.JsonSize || (t.JsonSize = {})),
    (t.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu);
  function s(u) {
    if (typeof u != "object" || u === null) return !1;
    try {
      let l = u;
      for (; Object.getPrototypeOf(l) !== null; ) l = Object.getPrototypeOf(l);
      return Object.getPrototypeOf(u) === l;
    } catch {
      return !1;
    }
  }
  t.isPlainObject = s;
  function o(u) {
    return u.charCodeAt(0) <= 127;
  }
  t.isASCII = o;
  function a(u) {
    var l;
    return (
      u.split("").reduce((h, b) => (o(b) ? h + 1 : h + 2), 0) +
      ((l = u.match(t.ESCAPE_CHARACTERS_REGEXP)) !== null && l !== void 0
        ? l
        : []
      ).length
    );
  }
  t.calculateStringSize = a;
  function c(u) {
    return u.toString().length;
  }
  t.calculateNumberSize = c;
})(ou);
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.validateJsonAndGetSize =
      t.getJsonRpcIdValidator =
      t.assertIsJsonRpcError =
      t.isJsonRpcError =
      t.assertIsJsonRpcFailure =
      t.isJsonRpcFailure =
      t.assertIsJsonRpcSuccess =
      t.isJsonRpcSuccess =
      t.assertIsJsonRpcResponse =
      t.isJsonRpcResponse =
      t.assertIsPendingJsonRpcResponse =
      t.isPendingJsonRpcResponse =
      t.JsonRpcResponseStruct =
      t.JsonRpcFailureStruct =
      t.JsonRpcSuccessStruct =
      t.PendingJsonRpcResponseStruct =
      t.assertIsJsonRpcRequest =
      t.isJsonRpcRequest =
      t.assertIsJsonRpcNotification =
      t.isJsonRpcNotification =
      t.JsonRpcNotificationStruct =
      t.JsonRpcRequestStruct =
      t.JsonRpcParamsStruct =
      t.JsonRpcErrorStruct =
      t.JsonRpcIdStruct =
      t.JsonRpcVersionStruct =
      t.jsonrpc2 =
      t.isValidJson =
      t.JsonStruct =
        void 0);
  const e = Or,
    r = Pe,
    n = ou;
  t.JsonStruct = (0, e.define)("Json", (C) => {
    const [I] = R(C, !0);
    return I ? !0 : "Expected a valid JSON-serializable value";
  });
  function i(C) {
    return (0, e.is)(C, t.JsonStruct);
  }
  (t.isValidJson = i),
    (t.jsonrpc2 = "2.0"),
    (t.JsonRpcVersionStruct = (0, e.literal)(t.jsonrpc2)),
    (t.JsonRpcIdStruct = (0, e.nullable)(
      (0, e.union)([(0, e.number)(), (0, e.string)()]),
    )),
    (t.JsonRpcErrorStruct = (0, e.object)({
      code: (0, e.integer)(),
      message: (0, e.string)(),
      data: (0, e.optional)(t.JsonStruct),
      stack: (0, e.optional)((0, e.string)()),
    })),
    (t.JsonRpcParamsStruct = (0, e.optional)(
      (0, e.union)([
        (0, e.record)((0, e.string)(), t.JsonStruct),
        (0, e.array)(t.JsonStruct),
      ]),
    )),
    (t.JsonRpcRequestStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      method: (0, e.string)(),
      params: t.JsonRpcParamsStruct,
    })),
    (t.JsonRpcNotificationStruct = (0, e.omit)(t.JsonRpcRequestStruct, ["id"]));
  function s(C) {
    return (0, e.is)(C, t.JsonRpcNotificationStruct);
  }
  t.isJsonRpcNotification = s;
  function o(C, I) {
    (0, r.assertStruct)(
      C,
      t.JsonRpcNotificationStruct,
      "Invalid JSON-RPC notification",
      I,
    );
  }
  t.assertIsJsonRpcNotification = o;
  function a(C) {
    return (0, e.is)(C, t.JsonRpcRequestStruct);
  }
  t.isJsonRpcRequest = a;
  function c(C, I) {
    (0, r.assertStruct)(
      C,
      t.JsonRpcRequestStruct,
      "Invalid JSON-RPC request",
      I,
    );
  }
  (t.assertIsJsonRpcRequest = c),
    (t.PendingJsonRpcResponseStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      result: (0, e.optional)((0, e.unknown)()),
      error: (0, e.optional)(t.JsonRpcErrorStruct),
    })),
    (t.JsonRpcSuccessStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      result: t.JsonStruct,
    })),
    (t.JsonRpcFailureStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      error: t.JsonRpcErrorStruct,
    })),
    (t.JsonRpcResponseStruct = (0, e.union)([
      t.JsonRpcSuccessStruct,
      t.JsonRpcFailureStruct,
    ]));
  function u(C) {
    return (0, e.is)(C, t.PendingJsonRpcResponseStruct);
  }
  t.isPendingJsonRpcResponse = u;
  function l(C, I) {
    (0, r.assertStruct)(
      C,
      t.PendingJsonRpcResponseStruct,
      "Invalid pending JSON-RPC response",
      I,
    );
  }
  t.assertIsPendingJsonRpcResponse = l;
  function f(C) {
    return (0, e.is)(C, t.JsonRpcResponseStruct);
  }
  t.isJsonRpcResponse = f;
  function h(C, I) {
    (0, r.assertStruct)(
      C,
      t.JsonRpcResponseStruct,
      "Invalid JSON-RPC response",
      I,
    );
  }
  t.assertIsJsonRpcResponse = h;
  function b(C) {
    return (0, e.is)(C, t.JsonRpcSuccessStruct);
  }
  t.isJsonRpcSuccess = b;
  function g(C, I) {
    (0, r.assertStruct)(
      C,
      t.JsonRpcSuccessStruct,
      "Invalid JSON-RPC success response",
      I,
    );
  }
  t.assertIsJsonRpcSuccess = g;
  function y(C) {
    return (0, e.is)(C, t.JsonRpcFailureStruct);
  }
  t.isJsonRpcFailure = y;
  function S(C, I) {
    (0, r.assertStruct)(
      C,
      t.JsonRpcFailureStruct,
      "Invalid JSON-RPC failure response",
      I,
    );
  }
  t.assertIsJsonRpcFailure = S;
  function m(C) {
    return (0, e.is)(C, t.JsonRpcErrorStruct);
  }
  t.isJsonRpcError = m;
  function v(C, I) {
    (0, r.assertStruct)(C, t.JsonRpcErrorStruct, "Invalid JSON-RPC error", I);
  }
  t.assertIsJsonRpcError = v;
  function E(C) {
    const {
      permitEmptyString: I,
      permitFractions: $,
      permitNull: L,
    } = Object.assign(
      { permitEmptyString: !0, permitFractions: !1, permitNull: !0 },
      C,
    );
    return (W) =>
      !!(
        (typeof W == "number" && ($ || Number.isInteger(W))) ||
        (typeof W == "string" && (I || W.length > 0)) ||
        (L && W === null)
      );
  }
  t.getJsonRpcIdValidator = E;
  function R(C, I = !1) {
    const $ = new Set();
    function L(x, W) {
      if (x === void 0) return [!1, 0];
      if (x === null) return [!0, W ? 0 : n.JsonSize.Null];
      const se = typeof x;
      try {
        if (se === "function") return [!1, 0];
        if (se === "string" || x instanceof String)
          return [
            !0,
            W ? 0 : (0, n.calculateStringSize)(x) + n.JsonSize.Quote * 2,
          ];
        if (se === "boolean" || x instanceof Boolean)
          return W
            ? [!0, 0]
            : [!0, x == !0 ? n.JsonSize.True : n.JsonSize.False];
        if (se === "number" || x instanceof Number)
          return W ? [!0, 0] : [!0, (0, n.calculateNumberSize)(x)];
        if (x instanceof Date)
          return W
            ? [!0, 0]
            : [
                !0,
                isNaN(x.getDate())
                  ? n.JsonSize.Null
                  : n.JsonSize.Date + n.JsonSize.Quote * 2,
              ];
      } catch {
        return [!1, 0];
      }
      if (!(0, n.isPlainObject)(x) && !Array.isArray(x)) return [!1, 0];
      if ($.has(x)) return [!1, 0];
      $.add(x);
      try {
        return [
          !0,
          Object.entries(x).reduce(
            (K, [T, k], N, P) => {
              let [B, j] = L(k, W);
              if (!B)
                throw new Error(
                  "JSON validation did not pass. Validation process stopped.",
                );
              if (($.delete(x), W)) return 0;
              const U = Array.isArray(x)
                  ? 0
                  : T.length + n.JsonSize.Comma + n.JsonSize.Colon * 2,
                Q = N < P.length - 1 ? n.JsonSize.Comma : 0;
              return K + U + j + Q;
            },
            W ? 0 : n.JsonSize.Wrapper * 2,
          ),
        ];
      } catch {
        return [!1, 0];
      }
    }
    return L(C, I);
  }
  t.validateJsonAndGetSize = R;
})(Gd);
var cn = {},
  T1 =
    (F && F.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(cn, "__esModule", { value: !0 });
cn.createModuleLogger = cn.createProjectLogger = void 0;
const k1 = T1(M0),
  O1 = (0, k1.default)("metamask");
function M1(t) {
  return O1.extend(t);
}
cn.createProjectLogger = M1;
function N1(t, e) {
  return t.extend(e);
}
cn.createModuleLogger = N1;
var At = {};
Object.defineProperty(At, "__esModule", { value: !0 });
At.hexToBigInt = At.hexToNumber = At.bigIntToHex = At.numberToHex = void 0;
const Kr = Pe,
  Jn = di,
  j1 = (t) => (
    (0, Kr.assert)(typeof t == "number", "Value must be a number."),
    (0, Kr.assert)(t >= 0, "Value must be a non-negative number."),
    (0, Kr.assert)(
      Number.isSafeInteger(t),
      "Value is not a safe integer. Use `bigIntToHex` instead.",
    ),
    (0, Jn.add0x)(t.toString(16))
  );
At.numberToHex = j1;
const L1 = (t) => (
  (0, Kr.assert)(typeof t == "bigint", "Value must be a bigint."),
  (0, Kr.assert)(t >= 0, "Value must be a non-negative bigint."),
  (0, Jn.add0x)(t.toString(16))
);
At.bigIntToHex = L1;
const P1 = (t) => {
  (0, Jn.assertIsHexString)(t);
  const e = parseInt(t, 16);
  return (
    (0, Kr.assert)(
      Number.isSafeInteger(e),
      "Value is not a safe integer. Use `hexToBigInt` instead.",
    ),
    e
  );
};
At.hexToNumber = P1;
const D1 = (t) => ((0, Jn.assertIsHexString)(t), BigInt((0, Jn.add0x)(t)));
At.hexToBigInt = D1;
var qd = {};
Object.defineProperty(qd, "__esModule", { value: !0 });
var Jd = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.timeSince = t.inMilliseconds = t.Duration = void 0),
    (function (s) {
      (s[(s.Millisecond = 1)] = "Millisecond"),
        (s[(s.Second = 1e3)] = "Second"),
        (s[(s.Minute = 6e4)] = "Minute"),
        (s[(s.Hour = 36e5)] = "Hour"),
        (s[(s.Day = 864e5)] = "Day"),
        (s[(s.Week = 6048e5)] = "Week"),
        (s[(s.Year = 31536e6)] = "Year");
    })(t.Duration || (t.Duration = {}));
  const e = (s) => Number.isInteger(s) && s >= 0,
    r = (s, o) => {
      if (!e(s))
        throw new Error(
          `"${o}" must be a non-negative integer. Received: "${s}".`,
        );
    };
  function n(s, o) {
    return r(s, "count"), s * o;
  }
  t.inMilliseconds = n;
  function i(s) {
    return r(s, "timestamp"), Date.now() - s;
  }
  t.timeSince = i;
})(Jd);
var Zd = {};
const tf = ze,
  $1 = (t, e, r = !1) => {
    if (t instanceof tf) return t;
    try {
      return new tf(t, e);
    } catch (n) {
      if (!r) return null;
      throw n;
    }
  };
var En = $1;
const B1 = En,
  F1 = (t, e) => {
    const r = B1(t, e);
    return r ? r.version : null;
  };
var U1 = F1;
const H1 = En,
  V1 = (t, e) => {
    const r = H1(t.trim().replace(/^[=v]+/, ""), e);
    return r ? r.version : null;
  };
var W1 = V1;
const rf = ze,
  z1 = (t, e, r, n, i) => {
    typeof r == "string" && ((i = n), (n = r), (r = void 0));
    try {
      return new rf(t instanceof rf ? t.version : t, r).inc(e, n, i).version;
    } catch {
      return null;
    }
  };
var G1 = z1;
const nf = En,
  q1 = (t, e) => {
    const r = nf(t, null, !0),
      n = nf(e, null, !0),
      i = r.compare(n);
    if (i === 0) return null;
    const s = i > 0,
      o = s ? r : n,
      a = s ? n : r,
      c = !!o.prerelease.length;
    if (!!a.prerelease.length && !c)
      return !a.patch && !a.minor
        ? "major"
        : o.patch
        ? "patch"
        : o.minor
        ? "minor"
        : "major";
    const l = c ? "pre" : "";
    return r.major !== n.major
      ? l + "major"
      : r.minor !== n.minor
      ? l + "minor"
      : r.patch !== n.patch
      ? l + "patch"
      : "prerelease";
  };
var J1 = q1;
const Z1 = ze,
  Q1 = (t, e) => new Z1(t, e).major;
var K1 = Q1;
const Y1 = ze,
  X1 = (t, e) => new Y1(t, e).minor;
var ew = X1;
const tw = ze,
  rw = (t, e) => new tw(t, e).patch;
var nw = rw;
const iw = En,
  sw = (t, e) => {
    const r = iw(t, e);
    return r && r.prerelease.length ? r.prerelease : null;
  };
var ow = sw;
const aw = bt,
  cw = (t, e, r) => aw(e, t, r);
var uw = cw;
const lw = bt,
  fw = (t, e) => lw(t, e, !0);
var hw = fw;
const sf = ze,
  dw = (t, e, r) => {
    const n = new sf(t, r),
      i = new sf(e, r);
    return n.compare(i) || n.compareBuild(i);
  };
var au = dw;
const pw = au,
  bw = (t, e) => t.sort((r, n) => pw(r, n, e));
var gw = bw;
const mw = au,
  yw = (t, e) => t.sort((r, n) => mw(n, r, e));
var vw = yw;
const _w = ze,
  ww = En,
  { safeRe: ji, t: Li } = Yn,
  Sw = (t, e) => {
    if (t instanceof _w) return t;
    if ((typeof t == "number" && (t = String(t)), typeof t != "string"))
      return null;
    e = e || {};
    let r = null;
    if (!e.rtl) r = t.match(ji[Li.COERCE]);
    else {
      let n;
      for (
        ;
        (n = ji[Li.COERCERTL].exec(t)) &&
        (!r || r.index + r[0].length !== t.length);

      )
        (!r || n.index + n[0].length !== r.index + r[0].length) && (r = n),
          (ji[Li.COERCERTL].lastIndex = n.index + n[1].length + n[2].length);
      ji[Li.COERCERTL].lastIndex = -1;
    }
    return r === null ? null : ww(`${r[2]}.${r[3] || "0"}.${r[4] || "0"}`, e);
  };
var Ew = Sw;
const Cw = gt(),
  Rw = (t, e) =>
    new Cw(t, e).set.map((r) =>
      r
        .map((n) => n.value)
        .join(" ")
        .trim()
        .split(" "),
    );
var Iw = Rw;
const xw = ze,
  Aw = gt(),
  Tw = (t, e, r) => {
    let n = null,
      i = null,
      s = null;
    try {
      s = new Aw(e, r);
    } catch {
      return null;
    }
    return (
      t.forEach((o) => {
        s.test(o) &&
          (!n || i.compare(o) === -1) &&
          ((n = o), (i = new xw(n, r)));
      }),
      n
    );
  };
var kw = Tw;
const Ow = ze,
  Mw = gt(),
  Nw = (t, e, r) => {
    let n = null,
      i = null,
      s = null;
    try {
      s = new Mw(e, r);
    } catch {
      return null;
    }
    return (
      t.forEach((o) => {
        s.test(o) &&
          (!n || i.compare(o) === 1) &&
          ((n = o), (i = new Ow(n, r)));
      }),
      n
    );
  };
var jw = Nw;
const La = ze,
  Lw = gt(),
  of = ds,
  Pw = (t, e) => {
    t = new Lw(t, e);
    let r = new La("0.0.0");
    if (t.test(r) || ((r = new La("0.0.0-0")), t.test(r))) return r;
    r = null;
    for (let n = 0; n < t.set.length; ++n) {
      const i = t.set[n];
      let s = null;
      i.forEach((o) => {
        const a = new La(o.semver.version);
        switch (o.operator) {
          case ">":
            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0),
              (a.raw = a.format());
          case "":
          case ">=":
            (!s || of(a, s)) && (s = a);
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error(`Unexpected operation: ${o.operator}`);
        }
      }),
        s && (!r || of(r, s)) && (r = s);
    }
    return r && t.test(r) ? r : null;
  };
var Dw = Pw;
const $w = gt(),
  Bw = (t, e) => {
    try {
      return new $w(t, e).range || "*";
    } catch {
      return null;
    }
  };
var Fw = Bw;
const Uw = ze,
  Qd = ps(),
  { ANY: Hw } = Qd,
  Vw = gt(),
  Ww = bs,
  af = ds,
  cf = Mc,
  zw = Nc,
  Gw = Oc,
  qw = (t, e, r, n) => {
    (t = new Uw(t, n)), (e = new Vw(e, n));
    let i, s, o, a, c;
    switch (r) {
      case ">":
        (i = af), (s = zw), (o = cf), (a = ">"), (c = ">=");
        break;
      case "<":
        (i = cf), (s = Gw), (o = af), (a = "<"), (c = "<=");
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (Ww(t, e, n)) return !1;
    for (let u = 0; u < e.set.length; ++u) {
      const l = e.set[u];
      let f = null,
        h = null;
      if (
        (l.forEach((b) => {
          b.semver === Hw && (b = new Qd(">=0.0.0")),
            (f = f || b),
            (h = h || b),
            i(b.semver, f.semver, n)
              ? (f = b)
              : o(b.semver, h.semver, n) && (h = b);
        }),
        f.operator === a ||
          f.operator === c ||
          ((!h.operator || h.operator === a) && s(t, h.semver)))
      )
        return !1;
      if (h.operator === c && o(t, h.semver)) return !1;
    }
    return !0;
  };
var cu = qw;
const Jw = cu,
  Zw = (t, e, r) => Jw(t, e, ">", r);
var Qw = Zw;
const Kw = cu,
  Yw = (t, e, r) => Kw(t, e, "<", r);
var Xw = Yw;
const uf = gt(),
  eS = (t, e, r) => (
    (t = new uf(t, r)), (e = new uf(e, r)), t.intersects(e, r)
  );
var tS = eS;
const rS = bs,
  nS = bt;
var iS = (t, e, r) => {
  const n = [];
  let i = null,
    s = null;
  const o = t.sort((l, f) => nS(l, f, r));
  for (const l of o)
    rS(l, e, r)
      ? ((s = l), i || (i = l))
      : (s && n.push([i, s]), (s = null), (i = null));
  i && n.push([i, null]);
  const a = [];
  for (const [l, f] of n)
    l === f
      ? a.push(l)
      : !f && l === o[0]
      ? a.push("*")
      : f
      ? l === o[0]
        ? a.push(`<=${f}`)
        : a.push(`${l} - ${f}`)
      : a.push(`>=${l}`);
  const c = a.join(" || "),
    u = typeof e.raw == "string" ? e.raw : String(e);
  return c.length < u.length ? c : e;
};
const lf = gt(),
  uu = ps(),
  { ANY: Pa } = uu,
  Nn = bs,
  lu = bt,
  sS = (t, e, r = {}) => {
    if (t === e) return !0;
    (t = new lf(t, r)), (e = new lf(e, r));
    let n = !1;
    e: for (const i of t.set) {
      for (const s of e.set) {
        const o = aS(i, s, r);
        if (((n = n || o !== null), o)) continue e;
      }
      if (n) return !1;
    }
    return !0;
  },
  oS = [new uu(">=0.0.0-0")],
  ff = [new uu(">=0.0.0")],
  aS = (t, e, r) => {
    if (t === e) return !0;
    if (t.length === 1 && t[0].semver === Pa) {
      if (e.length === 1 && e[0].semver === Pa) return !0;
      r.includePrerelease ? (t = oS) : (t = ff);
    }
    if (e.length === 1 && e[0].semver === Pa) {
      if (r.includePrerelease) return !0;
      e = ff;
    }
    const n = new Set();
    let i, s;
    for (const b of t)
      b.operator === ">" || b.operator === ">="
        ? (i = hf(i, b, r))
        : b.operator === "<" || b.operator === "<="
        ? (s = df(s, b, r))
        : n.add(b.semver);
    if (n.size > 1) return null;
    let o;
    if (i && s) {
      if (((o = lu(i.semver, s.semver, r)), o > 0)) return null;
      if (o === 0 && (i.operator !== ">=" || s.operator !== "<=")) return null;
    }
    for (const b of n) {
      if ((i && !Nn(b, String(i), r)) || (s && !Nn(b, String(s), r)))
        return null;
      for (const g of e) if (!Nn(b, String(g), r)) return !1;
      return !0;
    }
    let a,
      c,
      u,
      l,
      f =
        s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1,
      h =
        i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
    f &&
      f.prerelease.length === 1 &&
      s.operator === "<" &&
      f.prerelease[0] === 0 &&
      (f = !1);
    for (const b of e) {
      if (
        ((l = l || b.operator === ">" || b.operator === ">="),
        (u = u || b.operator === "<" || b.operator === "<="),
        i)
      ) {
        if (
          (h &&
            b.semver.prerelease &&
            b.semver.prerelease.length &&
            b.semver.major === h.major &&
            b.semver.minor === h.minor &&
            b.semver.patch === h.patch &&
            (h = !1),
          b.operator === ">" || b.operator === ">=")
        ) {
          if (((a = hf(i, b, r)), a === b && a !== i)) return !1;
        } else if (i.operator === ">=" && !Nn(i.semver, String(b), r))
          return !1;
      }
      if (s) {
        if (
          (f &&
            b.semver.prerelease &&
            b.semver.prerelease.length &&
            b.semver.major === f.major &&
            b.semver.minor === f.minor &&
            b.semver.patch === f.patch &&
            (f = !1),
          b.operator === "<" || b.operator === "<=")
        ) {
          if (((c = df(s, b, r)), c === b && c !== s)) return !1;
        } else if (s.operator === "<=" && !Nn(s.semver, String(b), r))
          return !1;
      }
      if (!b.operator && (s || i) && o !== 0) return !1;
    }
    return !((i && u && !s && o !== 0) || (s && l && !i && o !== 0) || h || f);
  },
  hf = (t, e, r) => {
    if (!t) return e;
    const n = lu(t.semver, e.semver, r);
    return n > 0
      ? t
      : n < 0 || (e.operator === ">" && t.operator === ">=")
      ? e
      : t;
  },
  df = (t, e, r) => {
    if (!t) return e;
    const n = lu(t.semver, e.semver, r);
    return n < 0
      ? t
      : n > 0 || (e.operator === "<" && t.operator === "<=")
      ? e
      : t;
  };
var cS = sS;
const Da = Yn,
  pf = fs,
  uS = ze,
  bf = dh,
  lS = En,
  fS = U1,
  hS = W1,
  dS = G1,
  pS = J1,
  bS = K1,
  gS = ew,
  mS = nw,
  yS = ow,
  vS = bt,
  _S = uw,
  wS = hw,
  SS = au,
  ES = gw,
  CS = vw,
  RS = ds,
  IS = Mc,
  xS = ph,
  AS = bh,
  TS = Oc,
  kS = Nc,
  OS = gh,
  MS = Ew,
  NS = ps(),
  jS = gt(),
  LS = bs,
  PS = Iw,
  DS = kw,
  $S = jw,
  BS = Dw,
  FS = Fw,
  US = cu,
  HS = Qw,
  VS = Xw,
  WS = tS,
  zS = iS,
  GS = cS;
var qS = {
  parse: lS,
  valid: fS,
  clean: hS,
  inc: dS,
  diff: pS,
  major: bS,
  minor: gS,
  patch: mS,
  prerelease: yS,
  compare: vS,
  rcompare: _S,
  compareLoose: wS,
  compareBuild: SS,
  sort: ES,
  rsort: CS,
  gt: RS,
  lt: IS,
  eq: xS,
  neq: AS,
  gte: TS,
  lte: kS,
  cmp: OS,
  coerce: MS,
  Comparator: NS,
  Range: jS,
  satisfies: LS,
  toComparators: PS,
  maxSatisfying: DS,
  minSatisfying: $S,
  minVersion: BS,
  validRange: FS,
  outside: US,
  gtr: HS,
  ltr: VS,
  intersects: WS,
  simplifyRange: zS,
  subset: GS,
  SemVer: uS,
  re: Da.re,
  src: Da.src,
  tokens: Da.t,
  SEMVER_SPEC_VERSION: pf.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: pf.RELEASE_TYPES,
  compareIdentifiers: bf.compareIdentifiers,
  rcompareIdentifiers: bf.rcompareIdentifiers,
};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.satisfiesVersionRange =
      t.gtRange =
      t.gtVersion =
      t.assertIsSemVerRange =
      t.assertIsSemVerVersion =
      t.isValidSemVerRange =
      t.isValidSemVerVersion =
      t.VersionRangeStruct =
      t.VersionStruct =
        void 0);
  const e = qS,
    r = Or,
    n = Pe;
  (t.VersionStruct = (0, r.refine)((0, r.string)(), "Version", (f) =>
    (0, e.valid)(f) === null ? `Expected SemVer version, got "${f}"` : !0,
  )),
    (t.VersionRangeStruct = (0, r.refine)(
      (0, r.string)(),
      "Version range",
      (f) =>
        (0, e.validRange)(f) === null
          ? `Expected SemVer range, got "${f}"`
          : !0,
    ));
  function i(f) {
    return (0, r.is)(f, t.VersionStruct);
  }
  t.isValidSemVerVersion = i;
  function s(f) {
    return (0, r.is)(f, t.VersionRangeStruct);
  }
  t.isValidSemVerRange = s;
  function o(f) {
    (0, n.assertStruct)(f, t.VersionStruct);
  }
  t.assertIsSemVerVersion = o;
  function a(f) {
    (0, n.assertStruct)(f, t.VersionRangeStruct);
  }
  t.assertIsSemVerRange = a;
  function c(f, h) {
    return (0, e.gt)(f, h);
  }
  t.gtVersion = c;
  function u(f, h) {
    return (0, e.gtr)(f, h);
  }
  t.gtRange = u;
  function l(f, h) {
    return (0, e.satisfies)(f, h, { includePrerelease: !0 });
  }
  t.satisfiesVersionRange = l;
})(Zd);
(function (t) {
  var e =
      (F && F.__createBinding) ||
      (Object.create
        ? function (n, i, s, o) {
            o === void 0 && (o = s);
            var a = Object.getOwnPropertyDescriptor(i, s);
            (!a ||
              ("get" in a ? !i.__esModule : a.writable || a.configurable)) &&
              (a = {
                enumerable: !0,
                get: function () {
                  return i[s];
                },
              }),
              Object.defineProperty(n, o, a);
          }
        : function (n, i, s, o) {
            o === void 0 && (o = s), (n[o] = i[s]);
          }),
    r =
      (F && F.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== "default" &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, "__esModule", { value: !0 }),
    r(Pe, t),
    r(hi, t),
    r(ae, t),
    r(ks, t),
    r(xt, t),
    r(an, t),
    r(di, t),
    r(Gd, t),
    r(cn, t),
    r(ou, t),
    r(At, t),
    r(qd, t),
    r(Jd, t),
    r(Zd, t);
})(xd);
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.createModuleLogger = t.projectLogger = void 0);
  const e = xd;
  Object.defineProperty(t, "createModuleLogger", {
    enumerable: !0,
    get: function () {
      return e.createModuleLogger;
    },
  }),
    (t.projectLogger = (0, e.createProjectLogger)("eth-block-tracker"));
})(Id);
var Kd =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(As, "__esModule", { value: !0 });
As.PollingBlockTracker = void 0;
const JS = Kd(Qc),
  ZS = Kd(u_),
  QS = li,
  gf = Id,
  mf = (0, gf.createModuleLogger)(gf.projectLogger, "polling-block-tracker"),
  KS = (0, JS.default)(),
  YS = 1e3;
class XS extends QS.BaseBlockTracker {
  constructor(e = {}) {
    var r;
    if (!e.provider)
      throw new Error("PollingBlockTracker - no provider specified.");
    super({
      blockResetDuration:
        (r = e.blockResetDuration) !== null && r !== void 0
          ? r
          : e.pollingInterval,
    }),
      (this._provider = e.provider),
      (this._pollingInterval = e.pollingInterval || 20 * YS),
      (this._retryTimeout = e.retryTimeout || this._pollingInterval / 10),
      (this._keepEventLoopActive =
        e.keepEventLoopActive === void 0 ? !0 : e.keepEventLoopActive),
      (this._setSkipCacheFlag = e.setSkipCacheFlag || !1);
  }
  async checkForLatestBlock() {
    return await this._updateLatestBlock(), await this.getLatestBlock();
  }
  async _start() {
    this._synchronize();
  }
  async _end() {}
  async _synchronize() {
    for (var e; this._isRunning; )
      try {
        await this._updateLatestBlock();
        const r = yf(this._pollingInterval, !this._keepEventLoopActive);
        this.emit("_waitingForNextIteration"), await r;
      } catch (r) {
        const n =
          new Error(`PollingBlockTracker - encountered an error while attempting to update latest block:
${(e = r.stack) !== null && e !== void 0 ? e : r}`);
        try {
          this.emit("error", n);
        } catch {
          console.error(n);
        }
        const i = yf(this._retryTimeout, !this._keepEventLoopActive);
        this.emit("_waitingForNextIteration"), await i;
      }
  }
  async _updateLatestBlock() {
    const e = await this._fetchLatestBlock();
    this._newPotentialLatest(e);
  }
  async _fetchLatestBlock() {
    const e = {
      jsonrpc: "2.0",
      id: KS(),
      method: "eth_blockNumber",
      params: [],
    };
    this._setSkipCacheFlag && (e.skipCache = !0), mf("Making request", e);
    const r = await (0, ZS.default)((n) => this._provider.sendAsync(e, n))();
    if ((mf("Got response", r), r.error))
      throw new Error(`PollingBlockTracker - encountered error fetching block:
${r.error.message}`);
    return r.result;
  }
}
As.PollingBlockTracker = XS;
function yf(t, e) {
  return new Promise((r) => {
    const n = setTimeout(r, t);
    n.unref && e && n.unref();
  });
}
var Ms = {},
  eE =
    (F && F.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Ms, "__esModule", { value: !0 });
Ms.SubscribeBlockTracker = void 0;
const tE = eE(Qc),
  rE = li,
  nE = (0, tE.default)();
class iE extends rE.BaseBlockTracker {
  constructor(e = {}) {
    if (!e.provider)
      throw new Error("SubscribeBlockTracker - no provider specified.");
    super(e), (this._provider = e.provider), (this._subscriptionId = null);
  }
  async checkForLatestBlock() {
    return await this.getLatestBlock();
  }
  async _start() {
    if (this._subscriptionId === void 0 || this._subscriptionId === null)
      try {
        const e = await this._call("eth_blockNumber");
        (this._subscriptionId = await this._call("eth_subscribe", "newHeads")),
          this._provider.on("data", this._handleSubData.bind(this)),
          this._newPotentialLatest(e);
      } catch (e) {
        this.emit("error", e);
      }
  }
  async _end() {
    if (this._subscriptionId !== null && this._subscriptionId !== void 0)
      try {
        await this._call("eth_unsubscribe", this._subscriptionId),
          (this._subscriptionId = null);
      } catch (e) {
        this.emit("error", e);
      }
  }
  _call(e, ...r) {
    return new Promise((n, i) => {
      this._provider.sendAsync(
        { id: nE(), method: e, params: r, jsonrpc: "2.0" },
        (s, o) => {
          s ? i(s) : n(o.result);
        },
      );
    });
  }
  _handleSubData(e, r) {
    var n;
    r.method === "eth_subscription" &&
      ((n = r.params) === null || n === void 0 ? void 0 : n.subscription) ===
        this._subscriptionId &&
      this._newPotentialLatest(r.params.result.number);
  }
}
Ms.SubscribeBlockTracker = iE;
var Yd = {};
Object.defineProperty(Yd, "__esModule", { value: !0 });
(function (t) {
  var e =
      (F && F.__createBinding) ||
      (Object.create
        ? function (n, i, s, o) {
            o === void 0 && (o = s),
              Object.defineProperty(n, o, {
                enumerable: !0,
                get: function () {
                  return i[s];
                },
              });
          }
        : function (n, i, s, o) {
            o === void 0 && (o = s), (n[o] = i[s]);
          }),
    r =
      (F && F.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== "default" &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, "__esModule", { value: !0 }),
    r(As, t),
    r(Ms, t),
    r(Yd, t);
})(Rd);
var fu = {},
  Ns = {},
  pi = {};
Object.defineProperty(pi, "__esModule", { value: !0 });
pi.getUniqueId = void 0;
const Xd = 4294967295;
let $a = Math.floor(Math.random() * Xd);
function sE() {
  return ($a = ($a + 1) % Xd), $a;
}
pi.getUniqueId = sE;
Object.defineProperty(Ns, "__esModule", { value: !0 });
Ns.createIdRemapMiddleware = void 0;
const oE = pi;
function aE() {
  return (t, e, r, n) => {
    const i = t.id,
      s = oE.getUniqueId();
    (t.id = s),
      (e.id = s),
      r((o) => {
        (t.id = i), (e.id = i), o();
      });
  };
}
Ns.createIdRemapMiddleware = aE;
var js = {};
Object.defineProperty(js, "__esModule", { value: !0 });
js.createAsyncMiddleware = void 0;
function cE(t) {
  return async (e, r, n, i) => {
    let s;
    const o = new Promise((l) => {
      s = l;
    });
    let a = null,
      c = !1;
    const u = async () => {
      (c = !0),
        n((l) => {
          (a = l), s();
        }),
        await o;
    };
    try {
      await t(e, r, u), c ? (await o, a(null)) : i(null);
    } catch (l) {
      a ? a(l) : i(l);
    }
  };
}
js.createAsyncMiddleware = cE;
var Ls = {};
Object.defineProperty(Ls, "__esModule", { value: !0 });
Ls.createScaffoldMiddleware = void 0;
function uE(t) {
  return (e, r, n, i) => {
    const s = t[e.method];
    return s === void 0
      ? n()
      : typeof s == "function"
      ? s(e, r, n, i)
      : ((r.result = s), i());
  };
}
Ls.createScaffoldMiddleware = uE;
var bi = {},
  lE =
    (F && F.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(bi, "__esModule", { value: !0 });
bi.JsonRpcEngine = void 0;
const fE = lE(Ar),
  Xe = Bc;
class Lt extends fE.default {
  constructor() {
    super(), (this._middleware = []);
  }
  push(e) {
    this._middleware.push(e);
  }
  handle(e, r) {
    if (r && typeof r != "function")
      throw new Error('"callback" must be a function if provided.');
    return Array.isArray(e)
      ? r
        ? this._handleBatch(e, r)
        : this._handleBatch(e)
      : r
      ? this._handle(e, r)
      : this._promiseHandle(e);
  }
  asMiddleware() {
    return async (e, r, n, i) => {
      try {
        const [s, o, a] = await Lt._runAllMiddleware(e, r, this._middleware);
        return o
          ? (await Lt._runReturnHandlers(a), i(s))
          : n(async (c) => {
              try {
                await Lt._runReturnHandlers(a);
              } catch (u) {
                return c(u);
              }
              return c();
            });
      } catch (s) {
        return i(s);
      }
    };
  }
  async _handleBatch(e, r) {
    try {
      const n = await Promise.all(e.map(this._promiseHandle.bind(this)));
      return r ? r(null, n) : n;
    } catch (n) {
      if (r) return r(n);
      throw n;
    }
  }
  _promiseHandle(e) {
    return new Promise((r) => {
      this._handle(e, (n, i) => {
        r(i);
      });
    });
  }
  async _handle(e, r) {
    if (!e || Array.isArray(e) || typeof e != "object") {
      const o = new Xe.EthereumRpcError(
        Xe.errorCodes.rpc.invalidRequest,
        `Requests must be plain objects. Received: ${typeof e}`,
        { request: e },
      );
      return r(o, { id: void 0, jsonrpc: "2.0", error: o });
    }
    if (typeof e.method != "string") {
      const o = new Xe.EthereumRpcError(
        Xe.errorCodes.rpc.invalidRequest,
        `Must specify a string method. Received: ${typeof e.method}`,
        { request: e },
      );
      return r(o, { id: e.id, jsonrpc: "2.0", error: o });
    }
    const n = Object.assign({}, e),
      i = { id: n.id, jsonrpc: n.jsonrpc };
    let s = null;
    try {
      await this._processRequest(n, i);
    } catch (o) {
      s = o;
    }
    return (
      s && (delete i.result, i.error || (i.error = Xe.serializeError(s))),
      r(s, i)
    );
  }
  async _processRequest(e, r) {
    const [n, i, s] = await Lt._runAllMiddleware(e, r, this._middleware);
    if ((Lt._checkForCompletion(e, r, i), await Lt._runReturnHandlers(s), n))
      throw n;
  }
  static async _runAllMiddleware(e, r, n) {
    const i = [];
    let s = null,
      o = !1;
    for (const a of n)
      if ((([s, o] = await Lt._runMiddleware(e, r, a, i)), o)) break;
    return [s, o, i.reverse()];
  }
  static _runMiddleware(e, r, n, i) {
    return new Promise((s) => {
      const o = (c) => {
          const u = c || r.error;
          u && (r.error = Xe.serializeError(u)), s([u, !0]);
        },
        a = (c) => {
          r.error
            ? o(r.error)
            : (c &&
                (typeof c != "function" &&
                  o(
                    new Xe.EthereumRpcError(
                      Xe.errorCodes.rpc.internal,
                      `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof c}" for request:
${Ba(e)}`,
                      { request: e },
                    ),
                  ),
                i.push(c)),
              s([null, !1]));
        };
      try {
        n(e, r, a, o);
      } catch (c) {
        o(c);
      }
    });
  }
  static async _runReturnHandlers(e) {
    for (const r of e)
      await new Promise((n, i) => {
        r((s) => (s ? i(s) : n()));
      });
  }
  static _checkForCompletion(e, r, n) {
    if (!("result" in r) && !("error" in r))
      throw new Xe.EthereumRpcError(
        Xe.errorCodes.rpc.internal,
        `JsonRpcEngine: Response has no error or result for request:
${Ba(e)}`,
        { request: e },
      );
    if (!n)
      throw new Xe.EthereumRpcError(
        Xe.errorCodes.rpc.internal,
        `JsonRpcEngine: Nothing ended request:
${Ba(e)}`,
        { request: e },
      );
  }
}
bi.JsonRpcEngine = Lt;
function Ba(t) {
  return JSON.stringify(t, null, 2);
}
var Ps = {};
Object.defineProperty(Ps, "__esModule", { value: !0 });
Ps.mergeMiddleware = void 0;
const hE = bi;
function dE(t) {
  const e = new hE.JsonRpcEngine();
  return t.forEach((r) => e.push(r)), e.asMiddleware();
}
Ps.mergeMiddleware = dE;
(function (t) {
  var e =
      (F && F.__createBinding) ||
      (Object.create
        ? function (n, i, s, o) {
            o === void 0 && (o = s),
              Object.defineProperty(n, o, {
                enumerable: !0,
                get: function () {
                  return i[s];
                },
              });
          }
        : function (n, i, s, o) {
            o === void 0 && (o = s), (n[o] = i[s]);
          }),
    r =
      (F && F.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== "default" &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, "__esModule", { value: !0 }),
    r(Ns, t),
    r(js, t),
    r(Ls, t),
    r(pi, t),
    r(bi, t),
    r(Ps, t);
})(fu);
var ep = {},
  hu = {};
const du = Rr(x0);
var Ds = {};
Object.defineProperty(Ds, "__esModule", { value: !0 });
var vf = du,
  pE = (function () {
    function t(e) {
      if (((this._maxConcurrency = e), (this._queue = []), e <= 0))
        throw new Error("semaphore must be initialized to a positive value");
      this._value = e;
    }
    return (
      (t.prototype.acquire = function () {
        var e = this,
          r = this.isLocked(),
          n = new Promise(function (i) {
            return e._queue.push(i);
          });
        return r || this._dispatch(), n;
      }),
      (t.prototype.runExclusive = function (e) {
        return vf.__awaiter(this, void 0, void 0, function () {
          var r, n, i;
          return vf.__generator(this, function (s) {
            switch (s.label) {
              case 0:
                return [4, this.acquire()];
              case 1:
                (r = s.sent()), (n = r[0]), (i = r[1]), (s.label = 2);
              case 2:
                return s.trys.push([2, , 4, 5]), [4, e(n)];
              case 3:
                return [2, s.sent()];
              case 4:
                return i(), [7];
              case 5:
                return [2];
            }
          });
        });
      }),
      (t.prototype.isLocked = function () {
        return this._value <= 0;
      }),
      (t.prototype.release = function () {
        if (this._maxConcurrency > 1)
          throw new Error(
            "this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead",
          );
        if (this._currentReleaser) {
          var e = this._currentReleaser;
          (this._currentReleaser = void 0), e();
        }
      }),
      (t.prototype._dispatch = function () {
        var e = this,
          r = this._queue.shift();
        if (r) {
          var n = !1;
          (this._currentReleaser = function () {
            n || ((n = !0), e._value++, e._dispatch());
          }),
            r([this._value--, this._currentReleaser]);
        }
      }),
      t
    );
  })();
Ds.default = pE;
Object.defineProperty(hu, "__esModule", { value: !0 });
var _f = du,
  bE = Ds,
  gE = (function () {
    function t() {
      this._semaphore = new bE.default(1);
    }
    return (
      (t.prototype.acquire = function () {
        return _f.__awaiter(this, void 0, void 0, function () {
          var e, r;
          return _f.__generator(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this._semaphore.acquire()];
              case 1:
                return (e = n.sent()), (r = e[1]), [2, r];
            }
          });
        });
      }),
      (t.prototype.runExclusive = function (e) {
        return this._semaphore.runExclusive(function () {
          return e();
        });
      }),
      (t.prototype.isLocked = function () {
        return this._semaphore.isLocked();
      }),
      (t.prototype.release = function () {
        this._semaphore.release();
      }),
      t
    );
  })();
hu.default = gE;
var $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
$s.withTimeout = void 0;
var Pi = du;
function mE(t, e, r) {
  var n = this;
  return (
    r === void 0 && (r = new Error("timeout")),
    {
      acquire: function () {
        return new Promise(function (i, s) {
          return Pi.__awaiter(n, void 0, void 0, function () {
            var o, a, c;
            return Pi.__generator(this, function (u) {
              switch (u.label) {
                case 0:
                  return (
                    (o = !1),
                    setTimeout(function () {
                      (o = !0), s(r);
                    }, e),
                    [4, t.acquire()]
                  );
                case 1:
                  return (
                    (a = u.sent()),
                    o ? ((c = Array.isArray(a) ? a[1] : a), c()) : i(a),
                    [2]
                  );
              }
            });
          });
        });
      },
      runExclusive: function (i) {
        return Pi.__awaiter(this, void 0, void 0, function () {
          var s, o;
          return Pi.__generator(this, function (a) {
            switch (a.label) {
              case 0:
                (s = function () {}), (a.label = 1);
              case 1:
                return a.trys.push([1, , 7, 8]), [4, this.acquire()];
              case 2:
                return (
                  (o = a.sent()),
                  Array.isArray(o) ? ((s = o[1]), [4, i(o[0])]) : [3, 4]
                );
              case 3:
                return [2, a.sent()];
              case 4:
                return (s = o), [4, i()];
              case 5:
                return [2, a.sent()];
              case 6:
                return [3, 8];
              case 7:
                return s(), [7];
              case 8:
                return [2];
            }
          });
        });
      },
      release: function () {
        t.release();
      },
      isLocked: function () {
        return t.isLocked();
      },
    }
  );
}
$s.withTimeout = mE;
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.withTimeout = t.Semaphore = t.Mutex = void 0);
  var e = hu;
  Object.defineProperty(t, "Mutex", {
    enumerable: !0,
    get: function () {
      return e.default;
    },
  });
  var r = Ds;
  Object.defineProperty(t, "Semaphore", {
    enumerable: !0,
    get: function () {
      return r.default;
    },
  });
  var n = $s;
  Object.defineProperty(t, "withTimeout", {
    enumerable: !0,
    get: function () {
      return n.withTimeout;
    },
  });
})(ep);
var yE = _E,
  vE = Object.prototype.hasOwnProperty;
function _E() {
  for (var t = {}, e = 0; e < arguments.length; e++) {
    var r = arguments[e];
    for (var n in r) vE.call(r, n) && (t[n] = r[n]);
  }
  return t;
}
const wE = yE,
  SE = Qc();
var EE = J;
function J(t) {
  const e = this;
  e.currentProvider = t;
}
J.prototype.getBalance = gi(2, "eth_getBalance");
J.prototype.getCode = gi(2, "eth_getCode");
J.prototype.getTransactionCount = gi(2, "eth_getTransactionCount");
J.prototype.getStorageAt = gi(3, "eth_getStorageAt");
J.prototype.call = gi(2, "eth_call");
J.prototype.protocolVersion = re("eth_protocolVersion");
J.prototype.syncing = re("eth_syncing");
J.prototype.coinbase = re("eth_coinbase");
J.prototype.mining = re("eth_mining");
J.prototype.hashrate = re("eth_hashrate");
J.prototype.gasPrice = re("eth_gasPrice");
J.prototype.accounts = re("eth_accounts");
J.prototype.blockNumber = re("eth_blockNumber");
J.prototype.getBlockTransactionCountByHash = re(
  "eth_getBlockTransactionCountByHash",
);
J.prototype.getBlockTransactionCountByNumber = re(
  "eth_getBlockTransactionCountByNumber",
);
J.prototype.getUncleCountByBlockHash = re("eth_getUncleCountByBlockHash");
J.prototype.getUncleCountByBlockNumber = re("eth_getUncleCountByBlockNumber");
J.prototype.sign = re("eth_sign");
J.prototype.sendTransaction = re("eth_sendTransaction");
J.prototype.sendRawTransaction = re("eth_sendRawTransaction");
J.prototype.estimateGas = re("eth_estimateGas");
J.prototype.getBlockByHash = re("eth_getBlockByHash");
J.prototype.getBlockByNumber = re("eth_getBlockByNumber");
J.prototype.getTransactionByHash = re("eth_getTransactionByHash");
J.prototype.getTransactionByBlockHashAndIndex = re(
  "eth_getTransactionByBlockHashAndIndex",
);
J.prototype.getTransactionByBlockNumberAndIndex = re(
  "eth_getTransactionByBlockNumberAndIndex",
);
J.prototype.getTransactionReceipt = re("eth_getTransactionReceipt");
J.prototype.getUncleByBlockHashAndIndex = re("eth_getUncleByBlockHashAndIndex");
J.prototype.getUncleByBlockNumberAndIndex = re(
  "eth_getUncleByBlockNumberAndIndex",
);
J.prototype.getCompilers = re("eth_getCompilers");
J.prototype.compileLLL = re("eth_compileLLL");
J.prototype.compileSolidity = re("eth_compileSolidity");
J.prototype.compileSerpent = re("eth_compileSerpent");
J.prototype.newFilter = re("eth_newFilter");
J.prototype.newBlockFilter = re("eth_newBlockFilter");
J.prototype.newPendingTransactionFilter = re("eth_newPendingTransactionFilter");
J.prototype.uninstallFilter = re("eth_uninstallFilter");
J.prototype.getFilterChanges = re("eth_getFilterChanges");
J.prototype.getFilterLogs = re("eth_getFilterLogs");
J.prototype.getLogs = re("eth_getLogs");
J.prototype.getWork = re("eth_getWork");
J.prototype.submitWork = re("eth_submitWork");
J.prototype.submitHashrate = re("eth_submitHashrate");
J.prototype.sendAsync = function (t, e) {
  this.currentProvider.sendAsync(CE(t), function (n, i) {
    if (
      (!n &&
        i.error &&
        (n = new Error("EthQuery - RPC Error - " + i.error.message)),
      n)
    )
      return e(n);
    e(null, i.result);
  });
};
function re(t) {
  return function () {
    const e = this;
    var r = [].slice.call(arguments),
      n = r.pop();
    e.sendAsync({ method: t, params: r }, n);
  };
}
function gi(t, e) {
  return function () {
    const r = this;
    var n = [].slice.call(arguments),
      i = n.pop();
    n.length < t && n.push("latest"), r.sendAsync({ method: e, params: n }, i);
  };
}
function CE(t) {
  return wE({ id: SE(), jsonrpc: "2.0", params: [] }, t);
}
const wf = (t, e, r, n) =>
    function (...i) {
      const s = e.promiseModule;
      return new s((o, a) => {
        e.multiArgs
          ? i.push((...u) => {
              e.errorFirst ? (u[0] ? a(u) : (u.shift(), o(u))) : o(u);
            })
          : e.errorFirst
          ? i.push((u, l) => {
              u ? a(u) : o(l);
            })
          : i.push(o),
          Reflect.apply(t, this === r ? n : this, i);
      });
    },
  Sf = new WeakMap();
var RE = (t, e) => {
  e = {
    exclude: [/.+(?:Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise,
    ...e,
  };
  const r = typeof t;
  if (!(t !== null && (r === "object" || r === "function")))
    throw new TypeError(
      `Expected \`input\` to be a \`Function\` or \`Object\`, got \`${
        t === null ? "null" : r
      }\``,
    );
  const n = (o, a) => {
      let c = Sf.get(o);
      if ((c || ((c = {}), Sf.set(o, c)), a in c)) return c[a];
      const u = (g) =>
          typeof g == "string" || typeof a == "symbol" ? a === g : g.test(a),
        l = Reflect.getOwnPropertyDescriptor(o, a),
        f = l === void 0 || l.writable || l.configurable,
        b = (e.include ? e.include.some(u) : !e.exclude.some(u)) && f;
      return (c[a] = b), b;
    },
    i = new WeakMap(),
    s = new Proxy(t, {
      apply(o, a, c) {
        const u = i.get(o);
        if (u) return Reflect.apply(u, a, c);
        const l = e.excludeMain ? o : wf(o, e, s, o);
        return i.set(o, l), Reflect.apply(l, a, c);
      },
      get(o, a) {
        const c = o[a];
        if (!n(o, a) || c === Function.prototype[a]) return c;
        const u = i.get(c);
        if (u) return u;
        if (typeof c == "function") {
          const l = wf(c, e, s, o);
          return i.set(c, l), l;
        }
        return c;
      },
    });
  return s;
};
const IE = Ar.default;
let xE = class extends IE {
  constructor() {
    super(), (this.updates = []);
  }
  async initialize() {}
  async update() {
    throw new Error("BaseFilter - no update method specified");
  }
  addResults(e) {
    (this.updates = this.updates.concat(e)),
      e.forEach((r) => this.emit("update", r));
  }
  addInitialResults(e) {}
  getChangesAndClear() {
    const e = this.updates;
    return (this.updates = []), e;
  }
};
var pu = xE;
const AE = pu;
let TE = class extends AE {
  constructor() {
    super(), (this.allResults = []);
  }
  async update() {
    throw new Error("BaseFilterWithHistory - no update method specified");
  }
  addResults(e) {
    (this.allResults = this.allResults.concat(e)), super.addResults(e);
  }
  addInitialResults(e) {
    (this.allResults = this.allResults.concat(e)), super.addInitialResults(e);
  }
  getAllResults() {
    return this.allResults;
  }
};
var kE = TE,
  mi = {
    minBlockRef: OE,
    maxBlockRef: ME,
    sortBlockRefs: bu,
    bnToHex: NE,
    blockRefIsNumber: jE,
    hexToInt: es,
    incrementHexInt: LE,
    intToHex: tp,
    unsafeRandomBytes: PE,
  };
function OE(...t) {
  return bu(t)[0];
}
function ME(...t) {
  const e = bu(t);
  return e[e.length - 1];
}
function bu(t) {
  return t.sort((e, r) =>
    e === "latest" || r === "earliest"
      ? 1
      : r === "latest" || e === "earliest"
      ? -1
      : es(e) - es(r),
  );
}
function NE(t) {
  return "0x" + t.toString(16);
}
function jE(t) {
  return t && !["earliest", "latest", "pending"].includes(t);
}
function es(t) {
  return t == null ? t : Number.parseInt(t, 16);
}
function LE(t) {
  if (t == null) return t;
  const e = es(t);
  return tp(e + 1);
}
function tp(t) {
  if (t == null) return t;
  let e = t.toString(16);
  return e.length % 2 && (e = "0" + e), "0x" + e;
}
function PE(t) {
  let e = "0x";
  for (let r = 0; r < t; r++) (e += Ef()), (e += Ef());
  return e;
}
function Ef() {
  return Math.floor(Math.random() * 16).toString(16);
}
const DE = EE,
  $E = RE,
  BE = kE,
  {
    bnToHex: wA,
    hexToInt: Di,
    incrementHexInt: FE,
    minBlockRef: UE,
    blockRefIsNumber: HE,
  } = mi;
let VE = class extends BE {
  constructor({ provider: e, params: r }) {
    super(),
      (this.type = "log"),
      (this.ethQuery = new DE(e)),
      (this.params = Object.assign(
        { fromBlock: "latest", toBlock: "latest", address: void 0, topics: [] },
        r,
      )),
      this.params.address &&
        (Array.isArray(this.params.address) ||
          (this.params.address = [this.params.address]),
        (this.params.address = this.params.address.map((n) =>
          n.toLowerCase(),
        )));
  }
  async initialize({ currentBlock: e }) {
    let r = this.params.fromBlock;
    ["latest", "pending"].includes(r) && (r = e),
      r === "earliest" && (r = "0x0"),
      (this.params.fromBlock = r);
    const n = UE(this.params.toBlock, e),
      i = Object.assign({}, this.params, { toBlock: n }),
      s = await this._fetchLogs(i);
    this.addInitialResults(s);
  }
  async update({ oldBlock: e, newBlock: r }) {
    const n = r;
    let i;
    e ? (i = FE(e)) : (i = r);
    const s = Object.assign({}, this.params, { fromBlock: i, toBlock: n }),
      a = (await this._fetchLogs(s)).filter((c) => this.matchLog(c));
    this.addResults(a);
  }
  async _fetchLogs(e) {
    return await $E((n) => this.ethQuery.getLogs(e, n))();
  }
  matchLog(e) {
    if (
      Di(this.params.fromBlock) >= Di(e.blockNumber) ||
      (HE(this.params.toBlock) && Di(this.params.toBlock) <= Di(e.blockNumber))
    )
      return !1;
    const r = e.address && e.address.toLowerCase();
    return this.params.address && r && !this.params.address.includes(r)
      ? !1
      : this.params.topics.every((i, s) => {
          let o = e.topics[s];
          if (!o) return !1;
          o = o.toLowerCase();
          let a = Array.isArray(i) ? i : [i];
          return a.includes(null)
            ? !0
            : ((a = a.map((l) => l.toLowerCase())), a.includes(o));
        });
  }
};
var WE = VE,
  gu = zE;
async function zE({ provider: t, fromBlock: e, toBlock: r }) {
  e || (e = r);
  const n = Cf(e),
    s = Cf(r) - n + 1,
    o = Array(s)
      .fill()
      .map((c, u) => n + u)
      .map(GE);
  return await Promise.all(
    o.map((c) => JE(t, "eth_getBlockByNumber", [c, !1])),
  );
}
function Cf(t) {
  return t == null ? t : Number.parseInt(t, 16);
}
function GE(t) {
  return t == null ? t : "0x" + t.toString(16);
}
function qE(t, e) {
  return new Promise((r, n) => {
    t.sendAsync(e, (i, s) => {
      i
        ? n(i)
        : s.error
        ? n(s.error)
        : s.result
        ? r(s.result)
        : n(new Error("Result was empty"));
    });
  });
}
async function JE(t, e, r) {
  for (let n = 0; n < 3; n++)
    try {
      return await qE(t, { id: 1, jsonrpc: "2.0", method: e, params: r });
    } catch (i) {
      console.error(`provider.sendAsync failed: ${i.stack || i.message || i}`);
    }
  throw new Error(`Block not found for params: ${JSON.stringify(r)}`);
}
const ZE = pu,
  QE = gu,
  { incrementHexInt: KE } = mi;
let YE = class extends ZE {
  constructor({ provider: e, params: r }) {
    super(), (this.type = "block"), (this.provider = e);
  }
  async update({ oldBlock: e, newBlock: r }) {
    const n = r,
      i = KE(e),
      o = (await QE({ provider: this.provider, fromBlock: i, toBlock: n })).map(
        (a) => a.hash,
      );
    this.addResults(o);
  }
};
var XE = YE;
const e2 = pu,
  t2 = gu,
  { incrementHexInt: r2 } = mi;
let n2 = class extends e2 {
  constructor({ provider: e }) {
    super(), (this.type = "tx"), (this.provider = e);
  }
  async update({ oldBlock: e }) {
    const r = e,
      n = r2(e),
      i = await t2({ provider: this.provider, fromBlock: n, toBlock: r }),
      s = [];
    for (const o of i) s.push(...o.transactions);
    this.addResults(s);
  }
};
var i2 = n2;
const s2 = ep.Mutex,
  { createAsyncMiddleware: o2, createScaffoldMiddleware: a2 } = fu,
  c2 = WE,
  u2 = XE,
  l2 = i2,
  { intToHex: rp, hexToInt: Fa } = mi;
var f2 = h2;
function h2({ blockTracker: t, provider: e }) {
  let r = 0,
    n = {};
  const i = new s2(),
    s = d2({ mutex: i }),
    o = a2({
      eth_newFilter: s(Ua(c)),
      eth_newBlockFilter: s(Ua(u)),
      eth_newPendingTransactionFilter: s(Ua(l)),
      eth_uninstallFilter: s(Vi(b)),
      eth_getFilterChanges: s(Vi(f)),
      eth_getFilterLogs: s(Vi(h)),
    }),
    a = async ({ oldBlock: v, newBlock: E }) => {
      if (n.length === 0) return;
      const R = await i.acquire();
      try {
        await Promise.all(
          Fr(n).map(async (C) => {
            try {
              await C.update({ oldBlock: v, newBlock: E });
            } catch (I) {
              console.error(I);
            }
          }),
        );
      } catch (C) {
        console.error(C);
      }
      R();
    };
  return (
    (o.newLogFilter = c),
    (o.newBlockFilter = u),
    (o.newPendingTransactionFilter = l),
    (o.uninstallFilter = b),
    (o.getFilterChanges = f),
    (o.getFilterLogs = h),
    (o.destroy = () => {
      S();
    }),
    o
  );
  async function c(v) {
    const E = new c2({ provider: e, params: v });
    return await g(E), E;
  }
  async function u() {
    const v = new u2({ provider: e });
    return await g(v), v;
  }
  async function l() {
    const v = new l2({ provider: e });
    return await g(v), v;
  }
  async function f(v) {
    const E = Fa(v),
      R = n[E];
    if (!R) throw new Error(`No filter for index "${E}"`);
    return R.getChangesAndClear();
  }
  async function h(v) {
    const E = Fa(v),
      R = n[E];
    if (!R) throw new Error(`No filter for index "${E}"`);
    let C = [];
    return R.type === "log" && (C = R.getAllResults()), C;
  }
  async function b(v) {
    const E = Fa(v),
      C = !!n[E];
    return C && (await y(E)), C;
  }
  async function g(v) {
    const E = Fr(n).length,
      R = await t.getLatestBlock();
    await v.initialize({ currentBlock: R }),
      r++,
      (n[r] = v),
      (v.id = r),
      (v.idHex = rp(r));
    const C = Fr(n).length;
    return m({ prevFilterCount: E, newFilterCount: C }), r;
  }
  async function y(v) {
    const E = Fr(n).length;
    delete n[v];
    const R = Fr(n).length;
    m({ prevFilterCount: E, newFilterCount: R });
  }
  async function S() {
    const v = Fr(n).length;
    (n = {}), m({ prevFilterCount: v, newFilterCount: 0 });
  }
  function m({ prevFilterCount: v, newFilterCount: E }) {
    if (v === 0 && E > 0) {
      t.on("sync", a);
      return;
    }
    if (v > 0 && E === 0) {
      t.removeListener("sync", a);
      return;
    }
  }
}
function Ua(t) {
  return Vi(async (...e) => {
    const r = await t(...e);
    return rp(r.id);
  });
}
function Vi(t) {
  return o2(async (e, r) => {
    const n = await t.apply(null, e.params);
    r.result = n;
  });
}
function d2({ mutex: t }) {
  return (e) => async (r, n, i, s) => {
    (await t.acquire())(), e(r, n, i, s);
  };
}
function Fr(t, e) {
  const r = [];
  for (let n in t) r.push(t[n]);
  return r;
}
const p2 = Ar.default,
  { createAsyncMiddleware: Rf, createScaffoldMiddleware: b2 } = fu,
  g2 = f2,
  { unsafeRandomBytes: m2, incrementHexInt: y2 } = mi,
  v2 = gu;
var _2 = w2;
function w2({ blockTracker: t, provider: e }) {
  const r = {},
    n = g2({ blockTracker: t, provider: e });
  let i = !1;
  const s = new p2(),
    o = b2({ eth_subscribe: Rf(a), eth_unsubscribe: Rf(c) });
  return (o.destroy = l), { events: s, middleware: o };
  async function a(f, h) {
    if (i)
      throw new Error(
        "SubscriptionManager - attempting to use after destroying",
      );
    const b = f.params[0],
      g = m2(16);
    let y;
    switch (b) {
      case "newHeads":
        y = S({ subId: g });
        break;
      case "logs":
        const v = f.params[1],
          E = await n.newLogFilter(v);
        y = m({ subId: g, filter: E });
        break;
      default:
        throw new Error(
          `SubscriptionManager - unsupported subscription type "${b}"`,
        );
    }
    (r[g] = y), (h.result = g);
    return;
    function S({ subId: v }) {
      const E = {
        type: b,
        destroy: async () => {
          t.removeListener("sync", E.update);
        },
        update: async ({ oldBlock: R, newBlock: C }) => {
          const I = C,
            $ = y2(R);
          (await v2({ provider: e, fromBlock: $, toBlock: I }))
            .map(S2)
            .filter((W) => W !== null)
            .forEach((W) => {
              u(v, W);
            });
        },
      };
      return t.on("sync", E.update), E;
    }
    function m({ subId: v, filter: E }) {
      return (
        E.on("update", (C) => u(v, C)),
        { type: b, destroy: async () => await n.uninstallFilter(E.idHex) }
      );
    }
  }
  async function c(f, h) {
    if (i)
      throw new Error(
        "SubscriptionManager - attempting to use after destroying",
      );
    const b = f.params[0],
      g = r[b];
    if (!g) {
      h.result = !1;
      return;
    }
    delete r[b], await g.destroy(), (h.result = !0);
  }
  function u(f, h) {
    s.emit("notification", {
      jsonrpc: "2.0",
      method: "eth_subscription",
      params: { subscription: f, result: h },
    });
  }
  function l() {
    s.removeAllListeners();
    for (const f in r) r[f].destroy(), delete r[f];
    i = !0;
  }
}
function S2(t) {
  return t == null
    ? null
    : {
        hash: t.hash,
        parentHash: t.parentHash,
        sha3Uncles: t.sha3Uncles,
        miner: t.miner,
        stateRoot: t.stateRoot,
        transactionsRoot: t.transactionsRoot,
        receiptsRoot: t.receiptsRoot,
        logsBloom: t.logsBloom,
        difficulty: t.difficulty,
        number: t.number,
        gasLimit: t.gasLimit,
        gasUsed: t.gasUsed,
        nonce: t.nonce,
        mixHash: t.mixHash,
        timestamp: t.timestamp,
        extraData: t.extraData,
      };
}
Object.defineProperty(xs, "__esModule", { value: !0 });
xs.SubscriptionManager = void 0;
const E2 = Rd,
  C2 = _2,
  If = () => {};
class R2 {
  constructor(e) {
    const r = new E2.PollingBlockTracker({
        provider: e,
        pollingInterval: 15e3,
        setSkipCacheFlag: !0,
      }),
      { events: n, middleware: i } = C2({ blockTracker: r, provider: e });
    (this.events = n), (this.subscriptionMiddleware = i);
  }
  async handleRequest(e) {
    const r = {};
    return await this.subscriptionMiddleware(e, r, If, If), r;
  }
  destroy() {
    this.subscriptionMiddleware.destroy();
  }
}
xs.SubscriptionManager = R2;
var mu =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(rn, "__esModule", { value: !0 });
rn.CoinbaseWalletProvider = void 0;
const I2 = mu(Ar),
  x2 = mu(us),
  Ha = yn,
  de = si,
  xf = vn,
  Af = dt,
  Va = Cs,
  A2 = be,
  X = H,
  Wa = mu(i_),
  T2 = on,
  ue = Cd,
  k2 = xs,
  Tf = "DefaultChainId",
  kf = "DefaultJsonRpcUrl";
class O2 extends I2.default {
  constructor(e) {
    var r, n;
    super(),
      (this._filterPolyfill = new T2.FilterPolyfill(this)),
      (this._subscriptionManager = new k2.SubscriptionManager(this)),
      (this._relay = null),
      (this._addresses = []),
      (this.hasMadeFirstChainChangedEmission = !1),
      (this.setProviderInfo = this.setProviderInfo.bind(this)),
      (this.updateProviderInfo = this.updateProviderInfo.bind(this)),
      (this.getChainId = this.getChainId.bind(this)),
      (this.setAppInfo = this.setAppInfo.bind(this)),
      (this.enable = this.enable.bind(this)),
      (this.close = this.close.bind(this)),
      (this.send = this.send.bind(this)),
      (this.sendAsync = this.sendAsync.bind(this)),
      (this.request = this.request.bind(this)),
      (this._setAddresses = this._setAddresses.bind(this)),
      (this.scanQRCode = this.scanQRCode.bind(this)),
      (this.genericRequest = this.genericRequest.bind(this)),
      (this._chainIdFromOpts = e.chainId),
      (this._jsonRpcUrlFromOpts = e.jsonRpcUrl),
      (this._overrideIsMetaMask = e.overrideIsMetaMask),
      (this._relayProvider = e.relayProvider),
      (this._storage = e.storage),
      (this._relayEventManager = e.relayEventManager),
      (this.diagnostic = e.diagnosticLogger),
      (this.reloadOnDisconnect = !0),
      (this.isCoinbaseWallet =
        (r = e.overrideIsCoinbaseWallet) !== null && r !== void 0 ? r : !0),
      (this.isCoinbaseBrowser =
        (n = e.overrideIsCoinbaseBrowser) !== null && n !== void 0 ? n : !1),
      (this.qrUrl = e.qrUrl),
      (this.supportsAddressSwitching = e.supportsAddressSwitching),
      (this.isLedger = e.isLedger);
    const i = this.getChainId(),
      s = (0, X.prepend0x)(i.toString(16));
    this.emit("connect", { chainIdStr: s });
    const o = this._storage.getItem(Af.LOCAL_STORAGE_ADDRESSES_KEY);
    if (o) {
      const a = o.split(" ");
      a[0] !== "" &&
        ((this._addresses = a.map((c) => (0, X.ensureAddressString)(c))),
        this.emit("accountsChanged", a));
    }
    this._subscriptionManager.events.on("notification", (a) => {
      this.emit("message", { type: a.method, data: a.params });
    }),
      this._addresses.length > 0 && this.initializeRelay(),
      window.addEventListener("message", (a) => {
        var c;
        if (
          !(a.origin !== location.origin || a.source !== window) &&
          a.data.type === "walletLinkMessage"
        ) {
          if (
            a.data.data.action === "defaultChainChanged" ||
            a.data.data.action === "dappChainSwitched"
          ) {
            const u = a.data.data.chainId,
              l =
                (c = a.data.data.jsonRpcUrl) !== null && c !== void 0
                  ? c
                  : this.jsonRpcUrl;
            this.updateProviderInfo(l, Number(u));
          }
          a.data.data.action === "addressChanged" &&
            this._setAddresses([a.data.data.address]);
        }
      });
  }
  get selectedAddress() {
    return this._addresses[0] || void 0;
  }
  get networkVersion() {
    return this.getChainId().toString(10);
  }
  get chainId() {
    return (0, X.prepend0x)(this.getChainId().toString(16));
  }
  get isWalletLink() {
    return !0;
  }
  get isMetaMask() {
    return this._overrideIsMetaMask;
  }
  get host() {
    return this.jsonRpcUrl;
  }
  get connected() {
    return !0;
  }
  isConnected() {
    return !0;
  }
  get jsonRpcUrl() {
    var e;
    return (e = this._storage.getItem(kf)) !== null && e !== void 0
      ? e
      : this._jsonRpcUrlFromOpts;
  }
  set jsonRpcUrl(e) {
    this._storage.setItem(kf, e);
  }
  disableReloadOnDisconnect() {
    this.reloadOnDisconnect = !1;
  }
  setProviderInfo(e, r) {
    this.isLedger ||
      this.isCoinbaseBrowser ||
      ((this._chainIdFromOpts = r), (this._jsonRpcUrlFromOpts = e)),
      this.updateProviderInfo(this.jsonRpcUrl, this.getChainId());
  }
  updateProviderInfo(e, r) {
    this.jsonRpcUrl = e;
    const n = this.getChainId();
    this._storage.setItem(Tf, r.toString(10)),
      ((0, X.ensureIntNumber)(r) !== n ||
        !this.hasMadeFirstChainChangedEmission) &&
        (this.emit("chainChanged", this.getChainId()),
        (this.hasMadeFirstChainChangedEmission = !0));
  }
  async watchAsset(e, r, n, i, s, o) {
    return !!(
      await (
        await this.initializeRelay()
      ).watchAsset(e, r, n, i, s, o == null ? void 0 : o.toString()).promise
    ).result;
  }
  async addEthereumChain(e, r, n, i, s, o) {
    var a, c;
    if ((0, X.ensureIntNumber)(e) === this.getChainId()) return !1;
    const u = await this.initializeRelay(),
      l = u.inlineAddEthereumChain(e.toString());
    !this._isAuthorized() && !l && (await u.requestEthereumAccounts().promise);
    const f = await u.addEthereumChain(e.toString(), r, s, n, i, o).promise;
    return (
      ((a = f.result) === null || a === void 0 ? void 0 : a.isApproved) ===
        !0 && this.updateProviderInfo(r[0], e),
      ((c = f.result) === null || c === void 0 ? void 0 : c.isApproved) === !0
    );
  }
  async switchEthereumChain(e) {
    const n = await (
      await this.initializeRelay()
    ).switchEthereumChain(e.toString(10), this.selectedAddress || void 0)
      .promise;
    if ((0, A2.isErrorResponse)(n) && n.errorCode)
      throw n.errorCode === de.standardErrorCodes.provider.unsupportedChain
        ? de.standardErrors.provider.unsupportedChain(e)
        : de.standardErrors.provider.custom({
            message: n.errorMessage,
            code: n.errorCode,
          });
    const i = n.result;
    i.isApproved && i.rpcUrl.length > 0 && this.updateProviderInfo(i.rpcUrl, e);
  }
  setAppInfo(e, r) {
    this.initializeRelay().then((n) => n.setAppInfo(e, r));
  }
  async enable() {
    var e;
    return (
      (e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(Ha.EVENTS.ETH_ACCOUNTS_STATE, {
          method: "provider::enable",
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay
            ? xf.Session.hash(this._relay.session.id)
            : void 0,
        }),
      this._addresses.length > 0
        ? [...this._addresses]
        : await this.send(ue.JSONRPCMethod.eth_requestAccounts)
    );
  }
  async close() {
    (await this.initializeRelay()).resetAndReload();
  }
  send(e, r) {
    try {
      const n = this._send(e, r);
      if (n instanceof Promise)
        return n.catch((i) => {
          throw (0, de.serializeError)(i, e);
        });
    } catch (n) {
      throw (0, de.serializeError)(n, e);
    }
  }
  _send(e, r) {
    if (typeof e == "string") {
      const i = e,
        s = Array.isArray(r) ? r : r !== void 0 ? [r] : [],
        o = { jsonrpc: "2.0", id: 0, method: i, params: s };
      return this._sendRequestAsync(o).then((a) => a.result);
    }
    if (typeof r == "function") {
      const i = e,
        s = r;
      return this._sendAsync(i, s);
    }
    if (Array.isArray(e)) return e.map((s) => this._sendRequest(s));
    const n = e;
    return this._sendRequest(n);
  }
  async sendAsync(e, r) {
    try {
      return this._sendAsync(e, r).catch((n) => {
        throw (0, de.serializeError)(n, e);
      });
    } catch (n) {
      return Promise.reject((0, de.serializeError)(n, e));
    }
  }
  async _sendAsync(e, r) {
    if (typeof r != "function") throw new Error("callback is required");
    if (Array.isArray(e)) {
      const i = r;
      this._sendMultipleRequestsAsync(e)
        .then((s) => i(null, s))
        .catch((s) => i(s, null));
      return;
    }
    const n = r;
    return this._sendRequestAsync(e)
      .then((i) => n(null, i))
      .catch((i) => n(i, null));
  }
  async request(e) {
    try {
      return this._request(e).catch((r) => {
        throw (0, de.serializeError)(r, e.method);
      });
    } catch (r) {
      return Promise.reject((0, de.serializeError)(r, e.method));
    }
  }
  async _request(e) {
    if (!e || typeof e != "object" || Array.isArray(e))
      throw de.standardErrors.rpc.invalidRequest({
        message: "Expected a single, non-array, object argument.",
        data: e,
      });
    const { method: r, params: n } = e;
    if (typeof r != "string" || r.length === 0)
      throw de.standardErrors.rpc.invalidRequest({
        message: "'args.method' must be a non-empty string.",
        data: e,
      });
    if (
      n !== void 0 &&
      !Array.isArray(n) &&
      (typeof n != "object" || n === null)
    )
      throw de.standardErrors.rpc.invalidRequest({
        message: "'args.params' must be an object or array if provided.",
        data: e,
      });
    const i = n === void 0 ? [] : n,
      s = this._relayEventManager.makeRequestId();
    return (
      await this._sendRequestAsync({
        method: r,
        params: i,
        jsonrpc: "2.0",
        id: s,
      })
    ).result;
  }
  async scanQRCode(e) {
    var r;
    const i = await (
      await this.initializeRelay()
    ).scanQRCode((0, X.ensureRegExpString)(e)).promise;
    if (typeof i.result != "string")
      throw (0, de.serializeError)(
        (r = i.errorMessage) !== null && r !== void 0
          ? r
          : "result was not a string",
        Va.Web3Method.scanQRCode,
      );
    return i.result;
  }
  async genericRequest(e, r) {
    var n;
    const s = await (await this.initializeRelay()).genericRequest(e, r).promise;
    if (typeof s.result != "string")
      throw (0, de.serializeError)(
        (n = s.errorMessage) !== null && n !== void 0
          ? n
          : "result was not a string",
        Va.Web3Method.generic,
      );
    return s.result;
  }
  async selectProvider(e) {
    var r;
    const i = await (await this.initializeRelay()).selectProvider(e).promise;
    if (typeof i.result != "string")
      throw (0, de.serializeError)(
        (r = i.errorMessage) !== null && r !== void 0
          ? r
          : "result was not a string",
        Va.Web3Method.selectProvider,
      );
    return i.result;
  }
  supportsSubscriptions() {
    return !1;
  }
  subscribe() {
    throw new Error("Subscriptions are not supported");
  }
  unsubscribe() {
    throw new Error("Subscriptions are not supported");
  }
  disconnect() {
    return !0;
  }
  _sendRequest(e) {
    const r = { jsonrpc: "2.0", id: e.id },
      { method: n } = e;
    if (((r.result = this._handleSynchronousMethods(e)), r.result === void 0))
      throw new Error(
        `Coinbase Wallet does not support calling ${n} synchronously without a callback. Please provide a callback parameter to call ${n} asynchronously.`,
      );
    return r;
  }
  _setAddresses(e, r) {
    if (!Array.isArray(e)) throw new Error("addresses is not an array");
    const n = e.map((i) => (0, X.ensureAddressString)(i));
    JSON.stringify(n) !== JSON.stringify(this._addresses) &&
      ((this._addresses.length > 0 &&
        this.supportsAddressSwitching === !1 &&
        !r) ||
        ((this._addresses = n),
        this.emit("accountsChanged", this._addresses),
        this._storage.setItem(Af.LOCAL_STORAGE_ADDRESSES_KEY, n.join(" "))));
  }
  _sendRequestAsync(e) {
    return new Promise((r, n) => {
      try {
        const i = this._handleSynchronousMethods(e);
        if (i !== void 0) return r({ jsonrpc: "2.0", id: e.id, result: i });
        const s = this._handleAsynchronousFilterMethods(e);
        if (s !== void 0) {
          s.then((a) =>
            r(Object.assign(Object.assign({}, a), { id: e.id })),
          ).catch((a) => n(a));
          return;
        }
        const o = this._handleSubscriptionMethods(e);
        if (o !== void 0) {
          o.then((a) =>
            r({ jsonrpc: "2.0", id: e.id, result: a.result }),
          ).catch((a) => n(a));
          return;
        }
      } catch (i) {
        return n(i);
      }
      this._handleAsynchronousMethods(e)
        .then((i) => i && r(Object.assign(Object.assign({}, i), { id: e.id })))
        .catch((i) => n(i));
    });
  }
  _sendMultipleRequestsAsync(e) {
    return Promise.all(e.map((r) => this._sendRequestAsync(r)));
  }
  _handleSynchronousMethods(e) {
    const { method: r } = e,
      n = e.params || [];
    switch (r) {
      case ue.JSONRPCMethod.eth_accounts:
        return this._eth_accounts();
      case ue.JSONRPCMethod.eth_coinbase:
        return this._eth_coinbase();
      case ue.JSONRPCMethod.eth_uninstallFilter:
        return this._eth_uninstallFilter(n);
      case ue.JSONRPCMethod.net_version:
        return this._net_version();
      case ue.JSONRPCMethod.eth_chainId:
        return this._eth_chainId();
      default:
        return;
    }
  }
  async _handleAsynchronousMethods(e) {
    const { method: r } = e,
      n = e.params || [];
    switch (r) {
      case ue.JSONRPCMethod.eth_requestAccounts:
        return this._eth_requestAccounts();
      case ue.JSONRPCMethod.eth_sign:
        return this._eth_sign(n);
      case ue.JSONRPCMethod.eth_ecRecover:
        return this._eth_ecRecover(n);
      case ue.JSONRPCMethod.personal_sign:
        return this._personal_sign(n);
      case ue.JSONRPCMethod.personal_ecRecover:
        return this._personal_ecRecover(n);
      case ue.JSONRPCMethod.eth_signTransaction:
        return this._eth_signTransaction(n);
      case ue.JSONRPCMethod.eth_sendRawTransaction:
        return this._eth_sendRawTransaction(n);
      case ue.JSONRPCMethod.eth_sendTransaction:
        return this._eth_sendTransaction(n);
      case ue.JSONRPCMethod.eth_signTypedData_v1:
        return this._eth_signTypedData_v1(n);
      case ue.JSONRPCMethod.eth_signTypedData_v2:
        return this._throwUnsupportedMethodError();
      case ue.JSONRPCMethod.eth_signTypedData_v3:
        return this._eth_signTypedData_v3(n);
      case ue.JSONRPCMethod.eth_signTypedData_v4:
      case ue.JSONRPCMethod.eth_signTypedData:
        return this._eth_signTypedData_v4(n);
      case ue.JSONRPCMethod.cbWallet_arbitrary:
        return this._cbwallet_arbitrary(n);
      case ue.JSONRPCMethod.wallet_addEthereumChain:
        return this._wallet_addEthereumChain(n);
      case ue.JSONRPCMethod.wallet_switchEthereumChain:
        return this._wallet_switchEthereumChain(n);
      case ue.JSONRPCMethod.wallet_watchAsset:
        return this._wallet_watchAsset(n);
    }
    return (await this.initializeRelay()).makeEthereumJSONRPCRequest(
      e,
      this.jsonRpcUrl,
    );
  }
  _handleAsynchronousFilterMethods(e) {
    const { method: r } = e,
      n = e.params || [];
    switch (r) {
      case ue.JSONRPCMethod.eth_newFilter:
        return this._eth_newFilter(n);
      case ue.JSONRPCMethod.eth_newBlockFilter:
        return this._eth_newBlockFilter();
      case ue.JSONRPCMethod.eth_newPendingTransactionFilter:
        return this._eth_newPendingTransactionFilter();
      case ue.JSONRPCMethod.eth_getFilterChanges:
        return this._eth_getFilterChanges(n);
      case ue.JSONRPCMethod.eth_getFilterLogs:
        return this._eth_getFilterLogs(n);
    }
  }
  _handleSubscriptionMethods(e) {
    switch (e.method) {
      case ue.JSONRPCMethod.eth_subscribe:
      case ue.JSONRPCMethod.eth_unsubscribe:
        return this._subscriptionManager.handleRequest(e);
    }
  }
  _isKnownAddress(e) {
    try {
      const r = (0, X.ensureAddressString)(e);
      return this._addresses
        .map((i) => (0, X.ensureAddressString)(i))
        .includes(r);
    } catch {}
    return !1;
  }
  _ensureKnownAddress(e) {
    var r;
    if (!this._isKnownAddress(e))
      throw (
        ((r = this.diagnostic) === null ||
          r === void 0 ||
          r.log(Ha.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED),
        new Error("Unknown Ethereum address"))
      );
  }
  _prepareTransactionParams(e) {
    const r = e.from
      ? (0, X.ensureAddressString)(e.from)
      : this.selectedAddress;
    if (!r) throw new Error("Ethereum address is unavailable");
    this._ensureKnownAddress(r);
    const n = e.to ? (0, X.ensureAddressString)(e.to) : null,
      i = e.value != null ? (0, X.ensureBN)(e.value) : new x2.default(0),
      s = e.data ? (0, X.ensureBuffer)(e.data) : Buffer.alloc(0),
      o = e.nonce != null ? (0, X.ensureIntNumber)(e.nonce) : null,
      a = e.gasPrice != null ? (0, X.ensureBN)(e.gasPrice) : null,
      c = e.maxFeePerGas != null ? (0, X.ensureBN)(e.maxFeePerGas) : null,
      u =
        e.maxPriorityFeePerGas != null
          ? (0, X.ensureBN)(e.maxPriorityFeePerGas)
          : null,
      l = e.gas != null ? (0, X.ensureBN)(e.gas) : null,
      f = this.getChainId();
    return {
      fromAddress: r,
      toAddress: n,
      weiValue: i,
      data: s,
      nonce: o,
      gasPriceInWei: a,
      maxFeePerGas: c,
      maxPriorityFeePerGas: u,
      gasLimit: l,
      chainId: f,
    };
  }
  _isAuthorized() {
    return this._addresses.length > 0;
  }
  _requireAuthorization() {
    if (!this._isAuthorized())
      throw de.standardErrors.provider.unauthorized({});
  }
  _throwUnsupportedMethodError() {
    throw de.standardErrors.provider.unsupportedMethod({});
  }
  async _signEthereumMessage(e, r, n, i) {
    this._ensureKnownAddress(r);
    try {
      return {
        jsonrpc: "2.0",
        id: 0,
        result: (
          await (await this.initializeRelay()).signEthereumMessage(e, r, n, i)
            .promise
        ).result,
      };
    } catch (s) {
      throw typeof s.message == "string" &&
        s.message.match(/(denied|rejected)/i)
        ? de.standardErrors.provider.userRejectedRequest(
            "User denied message signature",
          )
        : s;
    }
  }
  async _ethereumAddressFromSignedMessage(e, r, n) {
    return {
      jsonrpc: "2.0",
      id: 0,
      result: (
        await (
          await this.initializeRelay()
        ).ethereumAddressFromSignedMessage(e, r, n).promise
      ).result,
    };
  }
  _eth_accounts() {
    return [...this._addresses];
  }
  _eth_coinbase() {
    return this.selectedAddress || null;
  }
  _net_version() {
    return this.getChainId().toString(10);
  }
  _eth_chainId() {
    return (0, X.hexStringFromIntNumber)(this.getChainId());
  }
  getChainId() {
    const e = this._storage.getItem(Tf);
    if (!e) return (0, X.ensureIntNumber)(this._chainIdFromOpts);
    const r = parseInt(e, 10);
    return (0, X.ensureIntNumber)(r);
  }
  async _eth_requestAccounts() {
    var e;
    if (
      ((e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(Ha.EVENTS.ETH_ACCOUNTS_STATE, {
          method: "provider::_eth_requestAccounts",
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay
            ? xf.Session.hash(this._relay.session.id)
            : void 0,
        }),
      this._addresses.length > 0)
    )
      return Promise.resolve({
        jsonrpc: "2.0",
        id: 0,
        result: this._addresses,
      });
    let r;
    try {
      r = await (await this.initializeRelay()).requestEthereumAccounts()
        .promise;
    } catch (n) {
      throw typeof n.message == "string" &&
        n.message.match(/(denied|rejected)/i)
        ? de.standardErrors.provider.userRejectedRequest(
            "User denied account authorization",
          )
        : n;
    }
    if (!r.result) throw new Error("accounts received is empty");
    return (
      this._setAddresses(r.result),
      this.isLedger ||
        this.isCoinbaseBrowser ||
        (await this.switchEthereumChain(this.getChainId())),
      { jsonrpc: "2.0", id: 0, result: this._addresses }
    );
  }
  _eth_sign(e) {
    this._requireAuthorization();
    const r = (0, X.ensureAddressString)(e[0]),
      n = (0, X.ensureBuffer)(e[1]);
    return this._signEthereumMessage(n, r, !1);
  }
  _eth_ecRecover(e) {
    const r = (0, X.ensureBuffer)(e[0]),
      n = (0, X.ensureBuffer)(e[1]);
    return this._ethereumAddressFromSignedMessage(r, n, !1);
  }
  _personal_sign(e) {
    this._requireAuthorization();
    const r = (0, X.ensureBuffer)(e[0]),
      n = (0, X.ensureAddressString)(e[1]);
    return this._signEthereumMessage(r, n, !0);
  }
  _personal_ecRecover(e) {
    const r = (0, X.ensureBuffer)(e[0]),
      n = (0, X.ensureBuffer)(e[1]);
    return this._ethereumAddressFromSignedMessage(r, n, !0);
  }
  async _eth_signTransaction(e) {
    this._requireAuthorization();
    const r = this._prepareTransactionParams(e[0] || {});
    try {
      return {
        jsonrpc: "2.0",
        id: 0,
        result: (
          await (await this.initializeRelay()).signEthereumTransaction(r)
            .promise
        ).result,
      };
    } catch (n) {
      throw typeof n.message == "string" &&
        n.message.match(/(denied|rejected)/i)
        ? de.standardErrors.provider.userRejectedRequest(
            "User denied transaction signature",
          )
        : n;
    }
  }
  async _eth_sendRawTransaction(e) {
    const r = (0, X.ensureBuffer)(e[0]);
    return {
      jsonrpc: "2.0",
      id: 0,
      result: (
        await (
          await this.initializeRelay()
        ).submitEthereumTransaction(r, this.getChainId()).promise
      ).result,
    };
  }
  async _eth_sendTransaction(e) {
    this._requireAuthorization();
    const r = this._prepareTransactionParams(e[0] || {});
    try {
      return {
        jsonrpc: "2.0",
        id: 0,
        result: (
          await (
            await this.initializeRelay()
          ).signAndSubmitEthereumTransaction(r).promise
        ).result,
      };
    } catch (n) {
      throw typeof n.message == "string" &&
        n.message.match(/(denied|rejected)/i)
        ? de.standardErrors.provider.userRejectedRequest(
            "User denied transaction signature",
          )
        : n;
    }
  }
  async _eth_signTypedData_v1(e) {
    this._requireAuthorization();
    const r = (0, X.ensureParsedJSONObject)(e[0]),
      n = (0, X.ensureAddressString)(e[1]);
    this._ensureKnownAddress(n);
    const i = Wa.default.hashForSignTypedDataLegacy({ data: r }),
      s = JSON.stringify(r, null, 2);
    return this._signEthereumMessage(i, n, !1, s);
  }
  async _eth_signTypedData_v3(e) {
    this._requireAuthorization();
    const r = (0, X.ensureAddressString)(e[0]),
      n = (0, X.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(r);
    const i = Wa.default.hashForSignTypedData_v3({ data: n }),
      s = JSON.stringify(n, null, 2);
    return this._signEthereumMessage(i, r, !1, s);
  }
  async _eth_signTypedData_v4(e) {
    this._requireAuthorization();
    const r = (0, X.ensureAddressString)(e[0]),
      n = (0, X.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(r);
    const i = Wa.default.hashForSignTypedData_v4({ data: n }),
      s = JSON.stringify(n, null, 2);
    return this._signEthereumMessage(i, r, !1, s);
  }
  async _cbwallet_arbitrary(e) {
    const r = e[0],
      n = e[1];
    if (typeof n != "string") throw new Error("parameter must be a string");
    if (typeof r != "object" || r === null)
      throw new Error("parameter must be an object");
    return { jsonrpc: "2.0", id: 0, result: await this.genericRequest(r, n) };
  }
  async _wallet_addEthereumChain(e) {
    var r, n, i, s;
    const o = e[0];
    if (((r = o.rpcUrls) === null || r === void 0 ? void 0 : r.length) === 0)
      return {
        jsonrpc: "2.0",
        id: 0,
        error: { code: 2, message: "please pass in at least 1 rpcUrl" },
      };
    if (!o.chainName || o.chainName.trim() === "")
      throw de.standardErrors.rpc.invalidParams(
        "chainName is a required field",
      );
    if (!o.nativeCurrency)
      throw de.standardErrors.rpc.invalidParams(
        "nativeCurrency is a required field",
      );
    const a = parseInt(o.chainId, 16);
    return (await this.addEthereumChain(
      a,
      (n = o.rpcUrls) !== null && n !== void 0 ? n : [],
      (i = o.blockExplorerUrls) !== null && i !== void 0 ? i : [],
      o.chainName,
      (s = o.iconUrls) !== null && s !== void 0 ? s : [],
      o.nativeCurrency,
    ))
      ? { jsonrpc: "2.0", id: 0, result: null }
      : {
          jsonrpc: "2.0",
          id: 0,
          error: { code: 2, message: "unable to add ethereum chain" },
        };
  }
  async _wallet_switchEthereumChain(e) {
    const r = e[0];
    return (
      await this.switchEthereumChain(parseInt(r.chainId, 16)),
      { jsonrpc: "2.0", id: 0, result: null }
    );
  }
  async _wallet_watchAsset(e) {
    const r = Array.isArray(e) ? e[0] : e;
    if (!r.type) throw de.standardErrors.rpc.invalidParams("Type is required");
    if ((r == null ? void 0 : r.type) !== "ERC20")
      throw de.standardErrors.rpc.invalidParams(
        `Asset of type '${r.type}' is not supported`,
      );
    if (!(r != null && r.options))
      throw de.standardErrors.rpc.invalidParams("Options are required");
    if (!(r != null && r.options.address))
      throw de.standardErrors.rpc.invalidParams("Address is required");
    const n = this.getChainId(),
      { address: i, symbol: s, image: o, decimals: a } = r.options;
    return {
      jsonrpc: "2.0",
      id: 0,
      result: await this.watchAsset(r.type, i, s, a, o, n),
    };
  }
  _eth_uninstallFilter(e) {
    const r = (0, X.ensureHexString)(e[0]);
    return this._filterPolyfill.uninstallFilter(r);
  }
  async _eth_newFilter(e) {
    const r = e[0];
    return {
      jsonrpc: "2.0",
      id: 0,
      result: await this._filterPolyfill.newFilter(r),
    };
  }
  async _eth_newBlockFilter() {
    return {
      jsonrpc: "2.0",
      id: 0,
      result: await this._filterPolyfill.newBlockFilter(),
    };
  }
  async _eth_newPendingTransactionFilter() {
    return {
      jsonrpc: "2.0",
      id: 0,
      result: await this._filterPolyfill.newPendingTransactionFilter(),
    };
  }
  _eth_getFilterChanges(e) {
    const r = (0, X.ensureHexString)(e[0]);
    return this._filterPolyfill.getFilterChanges(r);
  }
  _eth_getFilterLogs(e) {
    const r = (0, X.ensureHexString)(e[0]);
    return this._filterPolyfill.getFilterLogs(r);
  }
  initializeRelay() {
    return this._relay
      ? Promise.resolve(this._relay)
      : this._relayProvider().then(
          (e) => (
            e.setAccountsCallback((r, n) => this._setAddresses(r, n)),
            e.setChainCallback((r, n) => {
              this.updateProviderInfo(n, parseInt(r, 10));
            }),
            e.setDappDefaultChainCallback(this._chainIdFromOpts),
            (this._relay = e),
            e
          ),
        );
  }
}
rn.CoinbaseWalletProvider = O2;
var Bs = {},
  Fs = {},
  yi,
  Z,
  np,
  ip,
  pr,
  Of,
  sp,
  gc,
  op,
  Yr = {},
  ap = [],
  M2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  Us = Array.isArray;
function $t(t, e) {
  for (var r in e) t[r] = e[r];
  return t;
}
function cp(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function mc(t, e, r) {
  var n,
    i,
    s,
    o = {};
  for (s in e)
    s == "key" ? (n = e[s]) : s == "ref" ? (i = e[s]) : (o[s] = e[s]);
  if (
    (arguments.length > 2 &&
      (o.children = arguments.length > 3 ? yi.call(arguments, 2) : r),
    typeof t == "function" && t.defaultProps != null)
  )
    for (s in t.defaultProps) o[s] === void 0 && (o[s] = t.defaultProps[s]);
  return Hn(t, o, n, i, null);
}
function Hn(t, e, r, n, i) {
  var s = {
    type: t,
    props: e,
    key: r,
    ref: n,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: i ?? ++np,
  };
  return i == null && Z.vnode != null && Z.vnode(s), s;
}
function N2() {
  return { current: null };
}
function vi(t) {
  return t.children;
}
function Vn(t, e) {
  (this.props = t), (this.context = e);
}
function ts(t, e) {
  if (e == null) return t.__ ? ts(t.__, t.__.__k.indexOf(t) + 1) : null;
  for (var r; e < t.__k.length; e++)
    if ((r = t.__k[e]) != null && r.__e != null) return r.__e;
  return typeof t.type == "function" ? ts(t) : null;
}
function up(t) {
  var e, r;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
      if ((r = t.__k[e]) != null && r.__e != null) {
        t.__e = t.__c.base = r.__e;
        break;
      }
    return up(t);
  }
}
function yc(t) {
  ((!t.__d && (t.__d = !0) && pr.push(t) && !rs.__r++) ||
    Of !== Z.debounceRendering) &&
    ((Of = Z.debounceRendering) || sp)(rs);
}
function rs() {
  var t, e, r, n, i, s, o, a, c;
  for (pr.sort(gc); (t = pr.shift()); )
    t.__d &&
      ((e = pr.length),
      (n = void 0),
      (i = void 0),
      (s = void 0),
      (a = (o = (r = t).__v).__e),
      (c = r.__P) &&
        ((n = []),
        (i = []),
        ((s = $t({}, o)).__v = o.__v + 1),
        yu(
          c,
          o,
          s,
          r.__n,
          c.ownerSVGElement !== void 0,
          o.__h != null ? [a] : null,
          n,
          a ?? ts(o),
          o.__h,
          i,
        ),
        pp(n, o, i),
        o.__e != a && up(o)),
      pr.length > e && pr.sort(gc));
  rs.__r = 0;
}
function lp(t, e, r, n, i, s, o, a, c, u, l) {
  var f,
    h,
    b,
    g,
    y,
    S,
    m,
    v,
    E,
    R,
    C = 0,
    I = (n && n.__k) || ap,
    $ = I.length,
    L = $,
    x = e.length;
  for (r.__k = [], f = 0; f < x; f++)
    (g = r.__k[f] =
      (g = e[f]) == null || typeof g == "boolean" || typeof g == "function"
        ? null
        : typeof g == "string" || typeof g == "number" || typeof g == "bigint"
        ? Hn(null, g, null, null, g)
        : Us(g)
        ? Hn(vi, { children: g }, null, null, null)
        : g.__b > 0
        ? Hn(g.type, g.props, g.key, g.ref ? g.ref : null, g.__v)
        : g) != null &&
      ((g.__ = r),
      (g.__b = r.__b + 1),
      (v = j2(g, I, (m = f + C), L)) === -1
        ? (b = Yr)
        : ((b = I[v] || Yr), (I[v] = void 0), L--),
      yu(t, g, b, i, s, o, a, c, u, l),
      (y = g.__e),
      (h = g.ref) &&
        b.ref != h &&
        (b.ref && vu(b.ref, null, g), l.push(h, g.__c || y, g)),
      y != null &&
        (S == null && (S = y),
        (R = !(E = b === Yr || b.__v === null) && v === m),
        E
          ? v == -1 && C--
          : v !== m &&
            (v === m + 1
              ? (C++, (R = !0))
              : v > m
              ? L > x - m
                ? ((C += v - m), (R = !0))
                : C--
              : (C = v < m && v == m - 1 ? v - m : 0)),
        (m = f + C),
        (R = R || (v == f && !E)),
        typeof g.type != "function" || (v === m && b.__k !== g.__k)
          ? typeof g.type == "function" || R
            ? g.__d !== void 0
              ? ((c = g.__d), (g.__d = void 0))
              : (c = y.nextSibling)
            : (c = dp(t, y, c))
          : (c = fp(g, c, t)),
        typeof r.type == "function" && (r.__d = c)));
  for (r.__e = S, f = $; f--; )
    I[f] != null &&
      (typeof r.type == "function" &&
        I[f].__e != null &&
        I[f].__e == r.__d &&
        (r.__d = I[f].__e.nextSibling),
      bp(I[f], I[f]));
}
function fp(t, e, r) {
  for (var n, i = t.__k, s = 0; i && s < i.length; s++)
    (n = i[s]) &&
      ((n.__ = t),
      (e = typeof n.type == "function" ? fp(n, e, r) : dp(r, n.__e, e)));
  return e;
}
function hp(t, e) {
  return (
    (e = e || []),
    t == null ||
      typeof t == "boolean" ||
      (Us(t)
        ? t.some(function (r) {
            hp(r, e);
          })
        : e.push(t)),
    e
  );
}
function dp(t, e, r) {
  return (
    r == null || r.parentNode !== t
      ? t.insertBefore(e, null)
      : (e == r && e.parentNode != null) || t.insertBefore(e, r),
    e.nextSibling
  );
}
function j2(t, e, r, n) {
  var i = t.key,
    s = t.type,
    o = r - 1,
    a = r + 1,
    c = e[r];
  if (c === null || (c && i == c.key && s === c.type)) return r;
  if (n > (c != null ? 1 : 0))
    for (; o >= 0 || a < e.length; ) {
      if (o >= 0) {
        if ((c = e[o]) && i == c.key && s === c.type) return o;
        o--;
      }
      if (a < e.length) {
        if ((c = e[a]) && i == c.key && s === c.type) return a;
        a++;
      }
    }
  return -1;
}
function L2(t, e, r, n, i) {
  var s;
  for (s in r)
    s === "children" || s === "key" || s in e || ns(t, s, null, r[s], n);
  for (s in e)
    (i && typeof e[s] != "function") ||
      s === "children" ||
      s === "key" ||
      s === "value" ||
      s === "checked" ||
      r[s] === e[s] ||
      ns(t, s, e[s], r[s], n);
}
function Mf(t, e, r) {
  e[0] === "-"
    ? t.setProperty(e, r ?? "")
    : (t[e] =
        r == null ? "" : typeof r != "number" || M2.test(e) ? r : r + "px");
}
function ns(t, e, r, n, i) {
  var s;
  e: if (e === "style")
    if (typeof r == "string") t.style.cssText = r;
    else {
      if ((typeof n == "string" && (t.style.cssText = n = ""), n))
        for (e in n) (r && e in r) || Mf(t.style, e, "");
      if (r) for (e in r) (n && r[e] === n[e]) || Mf(t.style, e, r[e]);
    }
  else if (e[0] === "o" && e[1] === "n")
    (s = e !== (e = e.replace(/Capture$/, ""))),
      (e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2)),
      t.l || (t.l = {}),
      (t.l[e + s] = r),
      r
        ? n || t.addEventListener(e, s ? jf : Nf, s)
        : t.removeEventListener(e, s ? jf : Nf, s);
  else if (e !== "dangerouslySetInnerHTML") {
    if (i) e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (
      e !== "width" &&
      e !== "height" &&
      e !== "href" &&
      e !== "list" &&
      e !== "form" &&
      e !== "tabIndex" &&
      e !== "download" &&
      e !== "rowSpan" &&
      e !== "colSpan" &&
      e in t
    )
      try {
        t[e] = r ?? "";
        break e;
      } catch {}
    typeof r == "function" ||
      (r == null || (r === !1 && e[4] !== "-")
        ? t.removeAttribute(e)
        : t.setAttribute(e, r));
  }
}
function Nf(t) {
  return this.l[t.type + !1](Z.event ? Z.event(t) : t);
}
function jf(t) {
  return this.l[t.type + !0](Z.event ? Z.event(t) : t);
}
function yu(t, e, r, n, i, s, o, a, c, u) {
  var l,
    f,
    h,
    b,
    g,
    y,
    S,
    m,
    v,
    E,
    R,
    C,
    I,
    $,
    L,
    x = e.type;
  if (e.constructor !== void 0) return null;
  r.__h != null &&
    ((c = r.__h), (a = e.__e = r.__e), (e.__h = null), (s = [a])),
    (l = Z.__b) && l(e);
  try {
    e: if (typeof x == "function") {
      if (
        ((m = e.props),
        (v = (l = x.contextType) && n[l.__c]),
        (E = l ? (v ? v.props.value : l.__) : n),
        r.__c
          ? (S = (f = e.__c = r.__c).__ = f.__E)
          : ("prototype" in x && x.prototype.render
              ? (e.__c = f = new x(m, E))
              : ((e.__c = f = new Vn(m, E)),
                (f.constructor = x),
                (f.render = D2)),
            v && v.sub(f),
            (f.props = m),
            f.state || (f.state = {}),
            (f.context = E),
            (f.__n = n),
            (h = f.__d = !0),
            (f.__h = []),
            (f._sb = [])),
        f.__s == null && (f.__s = f.state),
        x.getDerivedStateFromProps != null &&
          (f.__s == f.state && (f.__s = $t({}, f.__s)),
          $t(f.__s, x.getDerivedStateFromProps(m, f.__s))),
        (b = f.props),
        (g = f.state),
        (f.__v = e),
        h)
      )
        x.getDerivedStateFromProps == null &&
          f.componentWillMount != null &&
          f.componentWillMount(),
          f.componentDidMount != null && f.__h.push(f.componentDidMount);
      else {
        if (
          (x.getDerivedStateFromProps == null &&
            m !== b &&
            f.componentWillReceiveProps != null &&
            f.componentWillReceiveProps(m, E),
          !f.__e &&
            ((f.shouldComponentUpdate != null &&
              f.shouldComponentUpdate(m, f.__s, E) === !1) ||
              e.__v === r.__v))
        ) {
          for (
            e.__v !== r.__v && ((f.props = m), (f.state = f.__s), (f.__d = !1)),
              e.__e = r.__e,
              e.__k = r.__k,
              e.__k.forEach(function (W) {
                W && (W.__ = e);
              }),
              R = 0;
            R < f._sb.length;
            R++
          )
            f.__h.push(f._sb[R]);
          (f._sb = []), f.__h.length && o.push(f);
          break e;
        }
        f.componentWillUpdate != null && f.componentWillUpdate(m, f.__s, E),
          f.componentDidUpdate != null &&
            f.__h.push(function () {
              f.componentDidUpdate(b, g, y);
            });
      }
      if (
        ((f.context = E),
        (f.props = m),
        (f.__P = t),
        (f.__e = !1),
        (C = Z.__r),
        (I = 0),
        "prototype" in x && x.prototype.render)
      ) {
        for (
          f.state = f.__s,
            f.__d = !1,
            C && C(e),
            l = f.render(f.props, f.state, f.context),
            $ = 0;
          $ < f._sb.length;
          $++
        )
          f.__h.push(f._sb[$]);
        f._sb = [];
      } else
        do
          (f.__d = !1),
            C && C(e),
            (l = f.render(f.props, f.state, f.context)),
            (f.state = f.__s);
        while (f.__d && ++I < 25);
      (f.state = f.__s),
        f.getChildContext != null && (n = $t($t({}, n), f.getChildContext())),
        h ||
          f.getSnapshotBeforeUpdate == null ||
          (y = f.getSnapshotBeforeUpdate(b, g)),
        lp(
          t,
          Us(
            (L =
              l != null && l.type === vi && l.key == null
                ? l.props.children
                : l),
          )
            ? L
            : [L],
          e,
          r,
          n,
          i,
          s,
          o,
          a,
          c,
          u,
        ),
        (f.base = e.__e),
        (e.__h = null),
        f.__h.length && o.push(f),
        S && (f.__E = f.__ = null);
    } else
      s == null && e.__v === r.__v
        ? ((e.__k = r.__k), (e.__e = r.__e))
        : (e.__e = P2(r.__e, e, r, n, i, s, o, c, u));
    (l = Z.diffed) && l(e);
  } catch (W) {
    (e.__v = null),
      (c || s != null) &&
        ((e.__e = a), (e.__h = !!c), (s[s.indexOf(a)] = null)),
      Z.__e(W, e, r);
  }
}
function pp(t, e, r) {
  for (var n = 0; n < r.length; n++) vu(r[n], r[++n], r[++n]);
  Z.__c && Z.__c(e, t),
    t.some(function (i) {
      try {
        (t = i.__h),
          (i.__h = []),
          t.some(function (s) {
            s.call(i);
          });
      } catch (s) {
        Z.__e(s, i.__v);
      }
    });
}
function P2(t, e, r, n, i, s, o, a, c) {
  var u,
    l,
    f,
    h = r.props,
    b = e.props,
    g = e.type,
    y = 0;
  if ((g === "svg" && (i = !0), s != null)) {
    for (; y < s.length; y++)
      if (
        (u = s[y]) &&
        "setAttribute" in u == !!g &&
        (g ? u.localName === g : u.nodeType === 3)
      ) {
        (t = u), (s[y] = null);
        break;
      }
  }
  if (t == null) {
    if (g === null) return document.createTextNode(b);
    (t = i
      ? document.createElementNS("http://www.w3.org/2000/svg", g)
      : document.createElement(g, b.is && b)),
      (s = null),
      (a = !1);
  }
  if (g === null) h === b || (a && t.data === b) || (t.data = b);
  else {
    if (
      ((s = s && yi.call(t.childNodes)),
      (l = (h = r.props || Yr).dangerouslySetInnerHTML),
      (f = b.dangerouslySetInnerHTML),
      !a)
    ) {
      if (s != null)
        for (h = {}, y = 0; y < t.attributes.length; y++)
          h[t.attributes[y].name] = t.attributes[y].value;
      (f || l) &&
        ((f && ((l && f.__html == l.__html) || f.__html === t.innerHTML)) ||
          (t.innerHTML = (f && f.__html) || ""));
    }
    if ((L2(t, b, h, i, a), f)) e.__k = [];
    else if (
      (lp(
        t,
        Us((y = e.props.children)) ? y : [y],
        e,
        r,
        n,
        i && g !== "foreignObject",
        s,
        o,
        s ? s[0] : r.__k && ts(r, 0),
        a,
        c,
      ),
      s != null)
    )
      for (y = s.length; y--; ) s[y] != null && cp(s[y]);
    a ||
      ("value" in b &&
        (y = b.value) !== void 0 &&
        (y !== t.value ||
          (g === "progress" && !y) ||
          (g === "option" && y !== h.value)) &&
        ns(t, "value", y, h.value, !1),
      "checked" in b &&
        (y = b.checked) !== void 0 &&
        y !== t.checked &&
        ns(t, "checked", y, h.checked, !1));
  }
  return t;
}
function vu(t, e, r) {
  try {
    typeof t == "function" ? t(e) : (t.current = e);
  } catch (n) {
    Z.__e(n, r);
  }
}
function bp(t, e, r) {
  var n, i;
  if (
    (Z.unmount && Z.unmount(t),
    (n = t.ref) && ((n.current && n.current !== t.__e) || vu(n, null, e)),
    (n = t.__c) != null)
  ) {
    if (n.componentWillUnmount)
      try {
        n.componentWillUnmount();
      } catch (s) {
        Z.__e(s, e);
      }
    (n.base = n.__P = null), (t.__c = void 0);
  }
  if ((n = t.__k))
    for (i = 0; i < n.length; i++)
      n[i] && bp(n[i], e, r || typeof t.type != "function");
  r || t.__e == null || cp(t.__e), (t.__ = t.__e = t.__d = void 0);
}
function D2(t, e, r) {
  return this.constructor(t, r);
}
function gp(t, e, r) {
  var n, i, s, o;
  Z.__ && Z.__(t, e),
    (i = (n = typeof r == "function") ? null : (r && r.__k) || e.__k),
    (s = []),
    (o = []),
    yu(
      e,
      (t = ((!n && r) || e).__k = mc(vi, null, [t])),
      i || Yr,
      Yr,
      e.ownerSVGElement !== void 0,
      !n && r ? [r] : i ? null : e.firstChild ? yi.call(e.childNodes) : null,
      s,
      !n && r ? r : i ? i.__e : e.firstChild,
      n,
      o,
    ),
    pp(s, t, o);
}
function mp(t, e) {
  gp(t, e, mp);
}
function $2(t, e, r) {
  var n,
    i,
    s,
    o,
    a = $t({}, t.props);
  for (s in (t.type && t.type.defaultProps && (o = t.type.defaultProps), e))
    s == "key"
      ? (n = e[s])
      : s == "ref"
      ? (i = e[s])
      : (a[s] = e[s] === void 0 && o !== void 0 ? o[s] : e[s]);
  return (
    arguments.length > 2 &&
      (a.children = arguments.length > 3 ? yi.call(arguments, 2) : r),
    Hn(t.type, a, n || t.key, i || t.ref, null)
  );
}
function B2(t, e) {
  var r = {
    __c: (e = "__cC" + op++),
    __: t,
    Consumer: function (n, i) {
      return n.children(i);
    },
    Provider: function (n) {
      var i, s;
      return (
        this.getChildContext ||
          ((i = []),
          ((s = {})[e] = this),
          (this.getChildContext = function () {
            return s;
          }),
          (this.shouldComponentUpdate = function (o) {
            this.props.value !== o.value &&
              i.some(function (a) {
                (a.__e = !0), yc(a);
              });
          }),
          (this.sub = function (o) {
            i.push(o);
            var a = o.componentWillUnmount;
            o.componentWillUnmount = function () {
              i.splice(i.indexOf(o), 1), a && a.call(o);
            };
          })),
        n.children
      );
    },
  };
  return (r.Provider.__ = r.Consumer.contextType = r);
}
(yi = ap.slice),
  (Z = {
    __e: function (t, e, r, n) {
      for (var i, s, o; (e = e.__); )
        if ((i = e.__c) && !i.__)
          try {
            if (
              ((s = i.constructor) &&
                s.getDerivedStateFromError != null &&
                (i.setState(s.getDerivedStateFromError(t)), (o = i.__d)),
              i.componentDidCatch != null &&
                (i.componentDidCatch(t, n || {}), (o = i.__d)),
              o)
            )
              return (i.__E = i);
          } catch (a) {
            t = a;
          }
      throw t;
    },
  }),
  (np = 0),
  (ip = function (t) {
    return t != null && t.constructor === void 0;
  }),
  (Vn.prototype.setState = function (t, e) {
    var r;
    (r =
      this.__s != null && this.__s !== this.state
        ? this.__s
        : (this.__s = $t({}, this.state))),
      typeof t == "function" && (t = t($t({}, r), this.props)),
      t && $t(r, t),
      t != null && this.__v && (e && this._sb.push(e), yc(this));
  }),
  (Vn.prototype.forceUpdate = function (t) {
    this.__v && ((this.__e = !0), t && this.__h.push(t), yc(this));
  }),
  (Vn.prototype.render = vi),
  (pr = []),
  (sp =
    typeof Promise == "function"
      ? Promise.prototype.then.bind(Promise.resolve())
      : setTimeout),
  (gc = function (t, e) {
    return t.__v.__b - e.__v.__b;
  }),
  (rs.__r = 0),
  (op = 0);
const F2 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Component: Vn,
        Fragment: vi,
        cloneElement: $2,
        createContext: B2,
        createElement: mc,
        createRef: N2,
        h: mc,
        hydrate: mp,
        get isValidElement() {
          return ip;
        },
        get options() {
          return Z;
        },
        render: gp,
        toChildArray: hp,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Ke = Rr(F2);
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
***************************************************************************** */ var vc =
  function (t, e) {
    return (
      (vc =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (r, n) {
            r.__proto__ = n;
          }) ||
        function (r, n) {
          for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
        }),
      vc(t, e)
    );
  };
function A(t, e) {
  vc(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype =
    e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
}
function un(t) {
  return typeof t == "function";
}
var Lf = !1,
  tt = {
    Promise: void 0,
    set useDeprecatedSynchronousErrorHandling(t) {
      if (t) {
        var e = new Error();
        "" + e.stack;
      }
      Lf = t;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return Lf;
    },
  };
function zr(t) {
  setTimeout(function () {
    throw t;
  }, 0);
}
var is = {
    closed: !0,
    next: function (t) {},
    error: function (t) {
      if (tt.useDeprecatedSynchronousErrorHandling) throw t;
      zr(t);
    },
    complete: function () {},
  },
  Ve = (function () {
    return (
      Array.isArray ||
      function (t) {
        return t && typeof t.length == "number";
      }
    );
  })();
function _u(t) {
  return t !== null && typeof t == "object";
}
var U2 = (function () {
    function t(e) {
      return (
        Error.call(this),
        (this.message = e
          ? e.length +
            ` errors occurred during unsubscription:
` +
            e.map(function (r, n) {
              return n + 1 + ") " + r.toString();
            }).join(`
  `)
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = e),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  Wn = U2,
  _e = (function () {
    function t(e) {
      (this.closed = !1),
        (this._parentOrParents = null),
        (this._subscriptions = null),
        e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
    }
    return (
      (t.prototype.unsubscribe = function () {
        var e;
        if (!this.closed) {
          var r = this,
            n = r._parentOrParents,
            i = r._ctorUnsubscribe,
            s = r._unsubscribe,
            o = r._subscriptions;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            n instanceof t)
          )
            n.remove(this);
          else if (n !== null)
            for (var a = 0; a < n.length; ++a) {
              var c = n[a];
              c.remove(this);
            }
          if (un(s)) {
            i && (this._unsubscribe = void 0);
            try {
              s.call(this);
            } catch (f) {
              e = f instanceof Wn ? Pf(f.errors) : [f];
            }
          }
          if (Ve(o))
            for (var a = -1, u = o.length; ++a < u; ) {
              var l = o[a];
              if (_u(l))
                try {
                  l.unsubscribe();
                } catch (h) {
                  (e = e || []),
                    h instanceof Wn ? (e = e.concat(Pf(h.errors))) : e.push(h);
                }
            }
          if (e) throw new Wn(e);
        }
      }),
      (t.prototype.add = function (e) {
        var r = e;
        if (!e) return t.EMPTY;
        switch (typeof e) {
          case "function":
            r = new t(e);
          case "object":
            if (r === this || r.closed || typeof r.unsubscribe != "function")
              return r;
            if (this.closed) return r.unsubscribe(), r;
            if (!(r instanceof t)) {
              var n = r;
              (r = new t()), (r._subscriptions = [n]);
            }
            break;
          default:
            throw new Error(
              "unrecognized teardown " + e + " added to Subscription.",
            );
        }
        var i = r._parentOrParents;
        if (i === null) r._parentOrParents = this;
        else if (i instanceof t) {
          if (i === this) return r;
          r._parentOrParents = [i, this];
        } else if (i.indexOf(this) === -1) i.push(this);
        else return r;
        var s = this._subscriptions;
        return s === null ? (this._subscriptions = [r]) : s.push(r), r;
      }),
      (t.prototype.remove = function (e) {
        var r = this._subscriptions;
        if (r) {
          var n = r.indexOf(e);
          n !== -1 && r.splice(n, 1);
        }
      }),
      (t.EMPTY = (function (e) {
        return (e.closed = !0), e;
      })(new t())),
      t
    );
  })();
function Pf(t) {
  return t.reduce(function (e, r) {
    return e.concat(r instanceof Wn ? r.errors : r);
  }, []);
}
var ss = (function () {
    return typeof Symbol == "function"
      ? Symbol("rxSubscriber")
      : "@@rxSubscriber_" + Math.random();
  })(),
  V = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this) || this;
      switch (
        ((s.syncErrorValue = null),
        (s.syncErrorThrown = !1),
        (s.syncErrorThrowable = !1),
        (s.isStopped = !1),
        arguments.length)
      ) {
        case 0:
          s.destination = is;
          break;
        case 1:
          if (!r) {
            s.destination = is;
            break;
          }
          if (typeof r == "object") {
            r instanceof e
              ? ((s.syncErrorThrowable = r.syncErrorThrowable),
                (s.destination = r),
                r.add(s))
              : ((s.syncErrorThrowable = !0), (s.destination = new Df(s, r)));
            break;
          }
        default:
          (s.syncErrorThrowable = !0), (s.destination = new Df(s, r, n, i));
          break;
      }
      return s;
    }
    return (
      (e.prototype[ss] = function () {
        return this;
      }),
      (e.create = function (r, n, i) {
        var s = new e(r, n, i);
        return (s.syncErrorThrowable = !1), s;
      }),
      (e.prototype.next = function (r) {
        this.isStopped || this._next(r);
      }),
      (e.prototype.error = function (r) {
        this.isStopped || ((this.isStopped = !0), this._error(r));
      }),
      (e.prototype.complete = function () {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (e.prototype.unsubscribe = function () {
        this.closed ||
          ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
      }),
      (e.prototype._next = function (r) {
        this.destination.next(r);
      }),
      (e.prototype._error = function (r) {
        this.destination.error(r), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.destination.complete(), this.unsubscribe();
      }),
      (e.prototype._unsubscribeAndRecycle = function () {
        var r = this._parentOrParents;
        return (
          (this._parentOrParents = null),
          this.unsubscribe(),
          (this.closed = !1),
          (this.isStopped = !1),
          (this._parentOrParents = r),
          this
        );
      }),
      e
    );
  })(_e),
  Df = (function (t) {
    A(e, t);
    function e(r, n, i, s) {
      var o = t.call(this) || this;
      o._parentSubscriber = r;
      var a,
        c = o;
      return (
        un(n)
          ? (a = n)
          : n &&
            ((a = n.next),
            (i = n.error),
            (s = n.complete),
            n !== is &&
              ((c = Object.create(n)),
              un(c.unsubscribe) && o.add(c.unsubscribe.bind(c)),
              (c.unsubscribe = o.unsubscribe.bind(o)))),
        (o._context = c),
        (o._next = a),
        (o._error = i),
        (o._complete = s),
        o
      );
    }
    return (
      (e.prototype.next = function (r) {
        if (!this.isStopped && this._next) {
          var n = this._parentSubscriber;
          !tt.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
            ? this.__tryOrUnsub(this._next, r)
            : this.__tryOrSetError(n, this._next, r) && this.unsubscribe();
        }
      }),
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this._parentSubscriber,
            i = tt.useDeprecatedSynchronousErrorHandling;
          if (this._error)
            !i || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(this._error, r), this.unsubscribe())
              : (this.__tryOrSetError(n, this._error, r), this.unsubscribe());
          else if (n.syncErrorThrowable)
            i ? ((n.syncErrorValue = r), (n.syncErrorThrown = !0)) : zr(r),
              this.unsubscribe();
          else {
            if ((this.unsubscribe(), i)) throw r;
            zr(r);
          }
        }
      }),
      (e.prototype.complete = function () {
        var r = this;
        if (!this.isStopped) {
          var n = this._parentSubscriber;
          if (this._complete) {
            var i = function () {
              return r._complete.call(r._context);
            };
            !tt.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(i), this.unsubscribe())
              : (this.__tryOrSetError(n, i), this.unsubscribe());
          } else this.unsubscribe();
        }
      }),
      (e.prototype.__tryOrUnsub = function (r, n) {
        try {
          r.call(this._context, n);
        } catch (i) {
          if ((this.unsubscribe(), tt.useDeprecatedSynchronousErrorHandling))
            throw i;
          zr(i);
        }
      }),
      (e.prototype.__tryOrSetError = function (r, n, i) {
        if (!tt.useDeprecatedSynchronousErrorHandling)
          throw new Error("bad call");
        try {
          n.call(this._context, i);
        } catch (s) {
          return tt.useDeprecatedSynchronousErrorHandling
            ? ((r.syncErrorValue = s), (r.syncErrorThrown = !0), !0)
            : (zr(s), !0);
        }
        return !1;
      }),
      (e.prototype._unsubscribe = function () {
        var r = this._parentSubscriber;
        (this._context = null),
          (this._parentSubscriber = null),
          r.unsubscribe();
      }),
      e
    );
  })(V);
function wu(t) {
  for (; t; ) {
    var e = t,
      r = e.closed,
      n = e.destination,
      i = e.isStopped;
    if (r || i) return !1;
    n && n instanceof V ? (t = n) : (t = null);
  }
  return !0;
}
function H2(t, e, r) {
  if (t) {
    if (t instanceof V) return t;
    if (t[ss]) return t[ss]();
  }
  return !t && !e && !r ? new V(is) : new V(t, e, r);
}
var Cn = (function () {
  return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
})();
function tr(t) {
  return t;
}
function _c() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return yp(t);
}
function yp(t) {
  return t.length === 0
    ? tr
    : t.length === 1
    ? t[0]
    : function (r) {
        return t.reduce(function (n, i) {
          return i(n);
        }, r);
      };
}
var ee = (function () {
  function t(e) {
    (this._isScalar = !1), e && (this._subscribe = e);
  }
  return (
    (t.prototype.lift = function (e) {
      var r = new t();
      return (r.source = this), (r.operator = e), r;
    }),
    (t.prototype.subscribe = function (e, r, n) {
      var i = this.operator,
        s = H2(e, r, n);
      if (
        (i
          ? s.add(i.call(s, this.source))
          : s.add(
              this.source ||
                (tt.useDeprecatedSynchronousErrorHandling &&
                  !s.syncErrorThrowable)
                ? this._subscribe(s)
                : this._trySubscribe(s),
            ),
        tt.useDeprecatedSynchronousErrorHandling &&
          s.syncErrorThrowable &&
          ((s.syncErrorThrowable = !1), s.syncErrorThrown))
      )
        throw s.syncErrorValue;
      return s;
    }),
    (t.prototype._trySubscribe = function (e) {
      try {
        return this._subscribe(e);
      } catch (r) {
        tt.useDeprecatedSynchronousErrorHandling &&
          ((e.syncErrorThrown = !0), (e.syncErrorValue = r)),
          wu(e) ? e.error(r) : console.warn(r);
      }
    }),
    (t.prototype.forEach = function (e, r) {
      var n = this;
      return (
        (r = $f(r)),
        new r(function (i, s) {
          var o;
          o = n.subscribe(
            function (a) {
              try {
                e(a);
              } catch (c) {
                s(c), o && o.unsubscribe();
              }
            },
            s,
            i,
          );
        })
      );
    }),
    (t.prototype._subscribe = function (e) {
      var r = this.source;
      return r && r.subscribe(e);
    }),
    (t.prototype[Cn] = function () {
      return this;
    }),
    (t.prototype.pipe = function () {
      for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
      return e.length === 0 ? this : yp(e)(this);
    }),
    (t.prototype.toPromise = function (e) {
      var r = this;
      return (
        (e = $f(e)),
        new e(function (n, i) {
          var s;
          r.subscribe(
            function (o) {
              return (s = o);
            },
            function (o) {
              return i(o);
            },
            function () {
              return n(s);
            },
          );
        })
      );
    }),
    (t.create = function (e) {
      return new t(e);
    }),
    t
  );
})();
function $f(t) {
  if ((t || (t = tt.Promise || Promise), !t))
    throw new Error("no Promise impl found");
  return t;
}
var V2 = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = "object unsubscribed"),
        (this.name = "ObjectUnsubscribedError"),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  Qt = V2,
  vp = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.subject = r), (i.subscriber = n), (i.closed = !1), i;
    }
    return (
      (e.prototype.unsubscribe = function () {
        if (!this.closed) {
          this.closed = !0;
          var r = this.subject,
            n = r.observers;
          if (
            ((this.subject = null),
            !(!n || n.length === 0 || r.isStopped || r.closed))
          ) {
            var i = n.indexOf(this.subscriber);
            i !== -1 && n.splice(i, 1);
          }
        }
      }),
      e
    );
  })(_e),
  _p = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.destination = r), n;
    }
    return e;
  })(V),
  Me = (function (t) {
    A(e, t);
    function e() {
      var r = t.call(this) || this;
      return (
        (r.observers = []),
        (r.closed = !1),
        (r.isStopped = !1),
        (r.hasError = !1),
        (r.thrownError = null),
        r
      );
    }
    return (
      (e.prototype[ss] = function () {
        return new _p(this);
      }),
      (e.prototype.lift = function (r) {
        var n = new Bf(this, this);
        return (n.operator = r), n;
      }),
      (e.prototype.next = function (r) {
        if (this.closed) throw new Qt();
        if (!this.isStopped)
          for (
            var n = this.observers, i = n.length, s = n.slice(), o = 0;
            o < i;
            o++
          )
            s[o].next(r);
      }),
      (e.prototype.error = function (r) {
        if (this.closed) throw new Qt();
        (this.hasError = !0), (this.thrownError = r), (this.isStopped = !0);
        for (
          var n = this.observers, i = n.length, s = n.slice(), o = 0;
          o < i;
          o++
        )
          s[o].error(r);
        this.observers.length = 0;
      }),
      (e.prototype.complete = function () {
        if (this.closed) throw new Qt();
        this.isStopped = !0;
        for (
          var r = this.observers, n = r.length, i = r.slice(), s = 0;
          s < n;
          s++
        )
          i[s].complete();
        this.observers.length = 0;
      }),
      (e.prototype.unsubscribe = function () {
        (this.isStopped = !0), (this.closed = !0), (this.observers = null);
      }),
      (e.prototype._trySubscribe = function (r) {
        if (this.closed) throw new Qt();
        return t.prototype._trySubscribe.call(this, r);
      }),
      (e.prototype._subscribe = function (r) {
        if (this.closed) throw new Qt();
        return this.hasError
          ? (r.error(this.thrownError), _e.EMPTY)
          : this.isStopped
          ? (r.complete(), _e.EMPTY)
          : (this.observers.push(r), new vp(this, r));
      }),
      (e.prototype.asObservable = function () {
        var r = new ee();
        return (r.source = this), r;
      }),
      (e.create = function (r, n) {
        return new Bf(r, n);
      }),
      e
    );
  })(ee),
  Bf = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.destination = r), (i.source = n), i;
    }
    return (
      (e.prototype.next = function (r) {
        var n = this.destination;
        n && n.next && n.next(r);
      }),
      (e.prototype.error = function (r) {
        var n = this.destination;
        n && n.error && this.destination.error(r);
      }),
      (e.prototype.complete = function () {
        var r = this.destination;
        r && r.complete && this.destination.complete();
      }),
      (e.prototype._subscribe = function (r) {
        var n = this.source;
        return n ? this.source.subscribe(r) : _e.EMPTY;
      }),
      e
    );
  })(Me);
function Su() {
  return function (e) {
    return e.lift(new W2(e));
  };
}
var W2 = (function () {
    function t(e) {
      this.connectable = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = this.connectable;
        n._refCount++;
        var i = new z2(e, n),
          s = r.subscribe(i);
        return i.closed || (i.connection = n.connect()), s;
      }),
      t
    );
  })(),
  z2 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.connectable = n), i;
    }
    return (
      (e.prototype._unsubscribe = function () {
        var r = this.connectable;
        if (!r) {
          this.connection = null;
          return;
        }
        this.connectable = null;
        var n = r._refCount;
        if (n <= 0) {
          this.connection = null;
          return;
        }
        if (((r._refCount = n - 1), n > 1)) {
          this.connection = null;
          return;
        }
        var i = this.connection,
          s = r._connection;
        (this.connection = null), s && (!i || s === i) && s.unsubscribe();
      }),
      e
    );
  })(V),
  wp = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (
        (i.source = r),
        (i.subjectFactory = n),
        (i._refCount = 0),
        (i._isComplete = !1),
        i
      );
    }
    return (
      (e.prototype._subscribe = function (r) {
        return this.getSubject().subscribe(r);
      }),
      (e.prototype.getSubject = function () {
        var r = this._subject;
        return (
          (!r || r.isStopped) && (this._subject = this.subjectFactory()),
          this._subject
        );
      }),
      (e.prototype.connect = function () {
        var r = this._connection;
        return (
          r ||
            ((this._isComplete = !1),
            (r = this._connection = new _e()),
            r.add(this.source.subscribe(new q2(this.getSubject(), this))),
            r.closed && ((this._connection = null), (r = _e.EMPTY))),
          r
        );
      }),
      (e.prototype.refCount = function () {
        return Su()(this);
      }),
      e
    );
  })(ee),
  G2 = (function () {
    var t = wp.prototype;
    return {
      operator: { value: null },
      _refCount: { value: 0, writable: !0 },
      _subject: { value: null, writable: !0 },
      _connection: { value: null, writable: !0 },
      _subscribe: { value: t._subscribe },
      _isComplete: { value: t._isComplete, writable: !0 },
      getSubject: { value: t.getSubject },
      connect: { value: t.connect },
      refCount: { value: t.refCount },
    };
  })(),
  q2 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.connectable = n), i;
    }
    return (
      (e.prototype._error = function (r) {
        this._unsubscribe(), t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        (this.connectable._isComplete = !0),
          this._unsubscribe(),
          t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        var r = this.connectable;
        if (r) {
          this.connectable = null;
          var n = r._connection;
          (r._refCount = 0),
            (r._subject = null),
            (r._connection = null),
            n && n.unsubscribe();
        }
      }),
      e
    );
  })(_p);
function J2(t, e, r, n) {
  return function (i) {
    return i.lift(new Z2(t, e, r, n));
  };
}
var Z2 = (function () {
    function t(e, r, n, i) {
      (this.keySelector = e),
        (this.elementSelector = r),
        (this.durationSelector = n),
        (this.subjectSelector = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new Q2(
            e,
            this.keySelector,
            this.elementSelector,
            this.durationSelector,
            this.subjectSelector,
          ),
        );
      }),
      t
    );
  })(),
  Q2 = (function (t) {
    A(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.keySelector = n),
        (a.elementSelector = i),
        (a.durationSelector = s),
        (a.subjectSelector = o),
        (a.groups = null),
        (a.attemptedToUnsubscribe = !1),
        (a.count = 0),
        a
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        try {
          n = this.keySelector(r);
        } catch (i) {
          this.error(i);
          return;
        }
        this._group(r, n);
      }),
      (e.prototype._group = function (r, n) {
        var i = this.groups;
        i || (i = this.groups = new Map());
        var s = i.get(n),
          o;
        if (this.elementSelector)
          try {
            o = this.elementSelector(r);
          } catch (u) {
            this.error(u);
          }
        else o = r;
        if (!s) {
          (s = this.subjectSelector ? this.subjectSelector() : new Me()),
            i.set(n, s);
          var a = new wc(n, s, this);
          if ((this.destination.next(a), this.durationSelector)) {
            var c = void 0;
            try {
              c = this.durationSelector(new wc(n, s));
            } catch (u) {
              this.error(u);
              return;
            }
            this.add(c.subscribe(new K2(n, s, this)));
          }
        }
        s.closed || s.next(o);
      }),
      (e.prototype._error = function (r) {
        var n = this.groups;
        n &&
          (n.forEach(function (i, s) {
            i.error(r);
          }),
          n.clear()),
          this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        var r = this.groups;
        r &&
          (r.forEach(function (n, i) {
            n.complete();
          }),
          r.clear()),
          this.destination.complete();
      }),
      (e.prototype.removeGroup = function (r) {
        this.groups.delete(r);
      }),
      (e.prototype.unsubscribe = function () {
        this.closed ||
          ((this.attemptedToUnsubscribe = !0),
          this.count === 0 && t.prototype.unsubscribe.call(this));
      }),
      e
    );
  })(V),
  K2 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, n) || this;
      return (s.key = r), (s.group = n), (s.parent = i), s;
    }
    return (
      (e.prototype._next = function (r) {
        this.complete();
      }),
      (e.prototype._unsubscribe = function () {
        var r = this,
          n = r.parent,
          i = r.key;
        (this.key = this.parent = null), n && n.removeGroup(i);
      }),
      e
    );
  })(V),
  wc = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this) || this;
      return (s.key = r), (s.groupSubject = n), (s.refCountSubscription = i), s;
    }
    return (
      (e.prototype._subscribe = function (r) {
        var n = new _e(),
          i = this,
          s = i.refCountSubscription,
          o = i.groupSubject;
        return s && !s.closed && n.add(new Y2(s)), n.add(o.subscribe(r)), n;
      }),
      e
    );
  })(ee),
  Y2 = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this) || this;
      return (n.parent = r), r.count++, n;
    }
    return (
      (e.prototype.unsubscribe = function () {
        var r = this.parent;
        !r.closed &&
          !this.closed &&
          (t.prototype.unsubscribe.call(this),
          (r.count -= 1),
          r.count === 0 && r.attemptedToUnsubscribe && r.unsubscribe());
      }),
      e
    );
  })(_e),
  Sp = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this) || this;
      return (n._value = r), n;
    }
    return (
      Object.defineProperty(e.prototype, "value", {
        get: function () {
          return this.getValue();
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.prototype._subscribe = function (r) {
        var n = t.prototype._subscribe.call(this, r);
        return n && !n.closed && r.next(this._value), n;
      }),
      (e.prototype.getValue = function () {
        if (this.hasError) throw this.thrownError;
        if (this.closed) throw new Qt();
        return this._value;
      }),
      (e.prototype.next = function (r) {
        t.prototype.next.call(this, (this._value = r));
      }),
      e
    );
  })(Me),
  X2 = (function (t) {
    A(e, t);
    function e(r, n) {
      return t.call(this) || this;
    }
    return (
      (e.prototype.schedule = function (r, n) {
        return this;
      }),
      e
    );
  })(_e),
  _i = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), (i.pending = !1), i;
    }
    return (
      (e.prototype.schedule = function (r, n) {
        if ((n === void 0 && (n = 0), this.closed)) return this;
        this.state = r;
        var i = this.id,
          s = this.scheduler;
        return (
          i != null && (this.id = this.recycleAsyncId(s, i, n)),
          (this.pending = !0),
          (this.delay = n),
          (this.id = this.id || this.requestAsyncId(s, this.id, n)),
          this
        );
      }),
      (e.prototype.requestAsyncId = function (r, n, i) {
        return i === void 0 && (i = 0), setInterval(r.flush.bind(r, this), i);
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {
        if (
          (i === void 0 && (i = 0),
          i !== null && this.delay === i && this.pending === !1)
        )
          return n;
        clearInterval(n);
      }),
      (e.prototype.execute = function (r, n) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        var i = this._execute(r, n);
        if (i) return i;
        this.pending === !1 &&
          this.id != null &&
          (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
      }),
      (e.prototype._execute = function (r, n) {
        var i = !1,
          s = void 0;
        try {
          this.work(r);
        } catch (o) {
          (i = !0), (s = (!!o && o) || new Error(o));
        }
        if (i) return this.unsubscribe(), s;
      }),
      (e.prototype._unsubscribe = function () {
        var r = this.id,
          n = this.scheduler,
          i = n.actions,
          s = i.indexOf(this);
        (this.work = null),
          (this.state = null),
          (this.pending = !1),
          (this.scheduler = null),
          s !== -1 && i.splice(s, 1),
          r != null && (this.id = this.recycleAsyncId(n, r, null)),
          (this.delay = null);
      }),
      e
    );
  })(X2),
  e3 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), i;
    }
    return (
      (e.prototype.schedule = function (r, n) {
        return (
          n === void 0 && (n = 0),
          n > 0
            ? t.prototype.schedule.call(this, r, n)
            : ((this.delay = n),
              (this.state = r),
              this.scheduler.flush(this),
              this)
        );
      }),
      (e.prototype.execute = function (r, n) {
        return n > 0 || this.closed
          ? t.prototype.execute.call(this, r, n)
          : this._execute(r, n);
      }),
      (e.prototype.requestAsyncId = function (r, n, i) {
        return (
          i === void 0 && (i = 0),
          (i !== null && i > 0) || (i === null && this.delay > 0)
            ? t.prototype.requestAsyncId.call(this, r, n, i)
            : r.flush(this)
        );
      }),
      e
    );
  })(_i),
  Sc = (function () {
    function t(e, r) {
      r === void 0 && (r = t.now), (this.SchedulerAction = e), (this.now = r);
    }
    return (
      (t.prototype.schedule = function (e, r, n) {
        return (
          r === void 0 && (r = 0),
          new this.SchedulerAction(this, e).schedule(n, r)
        );
      }),
      (t.now = function () {
        return Date.now();
      }),
      t
    );
  })(),
  wi = (function (t) {
    A(e, t);
    function e(r, n) {
      n === void 0 && (n = Sc.now);
      var i =
        t.call(this, r, function () {
          return e.delegate && e.delegate !== i ? e.delegate.now() : n();
        }) || this;
      return (i.actions = []), (i.active = !1), (i.scheduled = void 0), i;
    }
    return (
      (e.prototype.schedule = function (r, n, i) {
        return (
          n === void 0 && (n = 0),
          e.delegate && e.delegate !== this
            ? e.delegate.schedule(r, n, i)
            : t.prototype.schedule.call(this, r, n, i)
        );
      }),
      (e.prototype.flush = function (r) {
        var n = this.actions;
        if (this.active) {
          n.push(r);
          return;
        }
        var i;
        this.active = !0;
        do if ((i = r.execute(r.state, r.delay))) break;
        while ((r = n.shift()));
        if (((this.active = !1), i)) {
          for (; (r = n.shift()); ) r.unsubscribe();
          throw i;
        }
      }),
      e
    );
  })(Sc),
  t3 = (function (t) {
    A(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return e;
  })(wi),
  Ep = new t3(e3),
  Cp = Ep,
  ln = new ee(function (t) {
    return t.complete();
  });
function Rn(t) {
  return t ? r3(t) : ln;
}
function r3(t) {
  return new ee(function (e) {
    return t.schedule(function () {
      return e.complete();
    });
  });
}
function Qe(t) {
  return t && typeof t.schedule == "function";
}
var Rp = function (t) {
  return function (e) {
    for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
    e.complete();
  };
};
function Eu(t, e) {
  return new ee(function (r) {
    var n = new _e(),
      i = 0;
    return (
      n.add(
        e.schedule(function () {
          if (i === t.length) {
            r.complete();
            return;
          }
          r.next(t[i++]), r.closed || n.add(this.schedule());
        }),
      ),
      n
    );
  });
}
function Si(t, e) {
  return e ? Eu(t, e) : new ee(Rp(t));
}
function Hs() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return Qe(r) ? (t.pop(), Eu(t, r)) : Si(t);
}
function Cu(t, e) {
  return e
    ? new ee(function (r) {
        return e.schedule(n3, 0, { error: t, subscriber: r });
      })
    : new ee(function (r) {
        return r.error(t);
      });
}
function n3(t) {
  var e = t.error,
    r = t.subscriber;
  r.error(e);
}
var Ec;
Ec || (Ec = {});
var Bt = (function () {
  function t(e, r, n) {
    (this.kind = e),
      (this.value = r),
      (this.error = n),
      (this.hasValue = e === "N");
  }
  return (
    (t.prototype.observe = function (e) {
      switch (this.kind) {
        case "N":
          return e.next && e.next(this.value);
        case "E":
          return e.error && e.error(this.error);
        case "C":
          return e.complete && e.complete();
      }
    }),
    (t.prototype.do = function (e, r, n) {
      var i = this.kind;
      switch (i) {
        case "N":
          return e && e(this.value);
        case "E":
          return r && r(this.error);
        case "C":
          return n && n();
      }
    }),
    (t.prototype.accept = function (e, r, n) {
      return e && typeof e.next == "function"
        ? this.observe(e)
        : this.do(e, r, n);
    }),
    (t.prototype.toObservable = function () {
      var e = this.kind;
      switch (e) {
        case "N":
          return Hs(this.value);
        case "E":
          return Cu(this.error);
        case "C":
          return Rn();
      }
      throw new Error("unexpected notification kind value");
    }),
    (t.createNext = function (e) {
      return typeof e < "u" ? new t("N", e) : t.undefinedValueNotification;
    }),
    (t.createError = function (e) {
      return new t("E", void 0, e);
    }),
    (t.createComplete = function () {
      return t.completeNotification;
    }),
    (t.completeNotification = new t("C")),
    (t.undefinedValueNotification = new t("N", void 0)),
    t
  );
})();
function i3(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new s3(t, e));
    }
  );
}
var s3 = (function () {
    function t(e, r) {
      r === void 0 && (r = 0), (this.scheduler = e), (this.delay = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Ip(e, this.scheduler, this.delay));
      }),
      t
    );
  })(),
  Ip = (function (t) {
    A(e, t);
    function e(r, n, i) {
      i === void 0 && (i = 0);
      var s = t.call(this, r) || this;
      return (s.scheduler = n), (s.delay = i), s;
    }
    return (
      (e.dispatch = function (r) {
        var n = r.notification,
          i = r.destination;
        n.observe(i), this.unsubscribe();
      }),
      (e.prototype.scheduleMessage = function (r) {
        var n = this.destination;
        n.add(
          this.scheduler.schedule(
            e.dispatch,
            this.delay,
            new o3(r, this.destination),
          ),
        );
      }),
      (e.prototype._next = function (r) {
        this.scheduleMessage(Bt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        this.scheduleMessage(Bt.createError(r)), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.scheduleMessage(Bt.createComplete()), this.unsubscribe();
      }),
      e
    );
  })(V),
  o3 = (function () {
    function t(e, r) {
      (this.notification = e), (this.destination = r);
    }
    return t;
  })(),
  Ru = (function (t) {
    A(e, t);
    function e(r, n, i) {
      r === void 0 && (r = Number.POSITIVE_INFINITY),
        n === void 0 && (n = Number.POSITIVE_INFINITY);
      var s = t.call(this) || this;
      return (
        (s.scheduler = i),
        (s._events = []),
        (s._infiniteTimeWindow = !1),
        (s._bufferSize = r < 1 ? 1 : r),
        (s._windowTime = n < 1 ? 1 : n),
        n === Number.POSITIVE_INFINITY
          ? ((s._infiniteTimeWindow = !0), (s.next = s.nextInfiniteTimeWindow))
          : (s.next = s.nextTimeWindow),
        s
      );
    }
    return (
      (e.prototype.nextInfiniteTimeWindow = function (r) {
        if (!this.isStopped) {
          var n = this._events;
          n.push(r), n.length > this._bufferSize && n.shift();
        }
        t.prototype.next.call(this, r);
      }),
      (e.prototype.nextTimeWindow = function (r) {
        this.isStopped ||
          (this._events.push(new a3(this._getNow(), r)),
          this._trimBufferThenGetEvents()),
          t.prototype.next.call(this, r);
      }),
      (e.prototype._subscribe = function (r) {
        var n = this._infiniteTimeWindow,
          i = n ? this._events : this._trimBufferThenGetEvents(),
          s = this.scheduler,
          o = i.length,
          a;
        if (this.closed) throw new Qt();
        if (
          (this.isStopped || this.hasError
            ? (a = _e.EMPTY)
            : (this.observers.push(r), (a = new vp(this, r))),
          s && r.add((r = new Ip(r, s))),
          n)
        )
          for (var c = 0; c < o && !r.closed; c++) r.next(i[c]);
        else for (var c = 0; c < o && !r.closed; c++) r.next(i[c].value);
        return (
          this.hasError
            ? r.error(this.thrownError)
            : this.isStopped && r.complete(),
          a
        );
      }),
      (e.prototype._getNow = function () {
        return (this.scheduler || Cp).now();
      }),
      (e.prototype._trimBufferThenGetEvents = function () {
        for (
          var r = this._getNow(),
            n = this._bufferSize,
            i = this._windowTime,
            s = this._events,
            o = s.length,
            a = 0;
          a < o && !(r - s[a].time < i);

        )
          a++;
        return o > n && (a = Math.max(a, o - n)), a > 0 && s.splice(0, a), s;
      }),
      e
    );
  })(Me),
  a3 = (function () {
    function t(e, r) {
      (this.time = e), (this.value = r);
    }
    return t;
  })(),
  In = (function (t) {
    A(e, t);
    function e() {
      var r = (t !== null && t.apply(this, arguments)) || this;
      return (r.value = null), (r.hasNext = !1), (r.hasCompleted = !1), r;
    }
    return (
      (e.prototype._subscribe = function (r) {
        return this.hasError
          ? (r.error(this.thrownError), _e.EMPTY)
          : this.hasCompleted && this.hasNext
          ? (r.next(this.value), r.complete(), _e.EMPTY)
          : t.prototype._subscribe.call(this, r);
      }),
      (e.prototype.next = function (r) {
        this.hasCompleted || ((this.value = r), (this.hasNext = !0));
      }),
      (e.prototype.error = function (r) {
        this.hasCompleted || t.prototype.error.call(this, r);
      }),
      (e.prototype.complete = function () {
        (this.hasCompleted = !0),
          this.hasNext && t.prototype.next.call(this, this.value),
          t.prototype.complete.call(this);
      }),
      e
    );
  })(Me),
  c3 = 1,
  u3 = (function () {
    return Promise.resolve();
  })(),
  Cc = {};
function Ff(t) {
  return t in Cc ? (delete Cc[t], !0) : !1;
}
var Uf = {
    setImmediate: function (t) {
      var e = c3++;
      return (
        (Cc[e] = !0),
        u3.then(function () {
          return Ff(e) && t();
        }),
        e
      );
    },
    clearImmediate: function (t) {
      Ff(t);
    },
  },
  l3 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), i;
    }
    return (
      (e.prototype.requestAsyncId = function (r, n, i) {
        return (
          i === void 0 && (i = 0),
          i !== null && i > 0
            ? t.prototype.requestAsyncId.call(this, r, n, i)
            : (r.actions.push(this),
              r.scheduled ||
                (r.scheduled = Uf.setImmediate(r.flush.bind(r, null))))
        );
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {
        if (
          (i === void 0 && (i = 0),
          (i !== null && i > 0) || (i === null && this.delay > 0))
        )
          return t.prototype.recycleAsyncId.call(this, r, n, i);
        r.actions.length === 0 &&
          (Uf.clearImmediate(n), (r.scheduled = void 0));
      }),
      e
    );
  })(_i),
  f3 = (function (t) {
    A(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.flush = function (r) {
        (this.active = !0), (this.scheduled = void 0);
        var n = this.actions,
          i,
          s = -1,
          o = n.length;
        r = r || n.shift();
        do if ((i = r.execute(r.state, r.delay))) break;
        while (++s < o && (r = n.shift()));
        if (((this.active = !1), i)) {
          for (; ++s < o && (r = n.shift()); ) r.unsubscribe();
          throw i;
        }
      }),
      e
    );
  })(wi),
  xp = new f3(l3),
  Wi = xp,
  Ap = new wi(_i),
  We = Ap,
  h3 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), i;
    }
    return (
      (e.prototype.requestAsyncId = function (r, n, i) {
        return (
          i === void 0 && (i = 0),
          i !== null && i > 0
            ? t.prototype.requestAsyncId.call(this, r, n, i)
            : (r.actions.push(this),
              r.scheduled ||
                (r.scheduled = requestAnimationFrame(function () {
                  return r.flush(null);
                })))
        );
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {
        if (
          (i === void 0 && (i = 0),
          (i !== null && i > 0) || (i === null && this.delay > 0))
        )
          return t.prototype.recycleAsyncId.call(this, r, n, i);
        r.actions.length === 0 &&
          (cancelAnimationFrame(n), (r.scheduled = void 0));
      }),
      e
    );
  })(_i),
  d3 = (function (t) {
    A(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.flush = function (r) {
        (this.active = !0), (this.scheduled = void 0);
        var n = this.actions,
          i,
          s = -1,
          o = n.length;
        r = r || n.shift();
        do if ((i = r.execute(r.state, r.delay))) break;
        while (++s < o && (r = n.shift()));
        if (((this.active = !1), i)) {
          for (; ++s < o && (r = n.shift()); ) r.unsubscribe();
          throw i;
        }
      }),
      e
    );
  })(wi),
  Tp = new d3(h3),
  p3 = Tp,
  b3 = (function (t) {
    A(e, t);
    function e(r, n) {
      r === void 0 && (r = kp), n === void 0 && (n = Number.POSITIVE_INFINITY);
      var i =
        t.call(this, r, function () {
          return i.frame;
        }) || this;
      return (i.maxFrames = n), (i.frame = 0), (i.index = -1), i;
    }
    return (
      (e.prototype.flush = function () {
        for (
          var r = this, n = r.actions, i = r.maxFrames, s, o;
          (o = n[0]) &&
          o.delay <= i &&
          (n.shift(),
          (this.frame = o.delay),
          !(s = o.execute(o.state, o.delay)));

        );
        if (s) {
          for (; (o = n.shift()); ) o.unsubscribe();
          throw s;
        }
      }),
      (e.frameTimeFactor = 10),
      e
    );
  })(wi),
  kp = (function (t) {
    A(e, t);
    function e(r, n, i) {
      i === void 0 && (i = r.index += 1);
      var s = t.call(this, r, n) || this;
      return (
        (s.scheduler = r),
        (s.work = n),
        (s.index = i),
        (s.active = !0),
        (s.index = r.index = i),
        s
      );
    }
    return (
      (e.prototype.schedule = function (r, n) {
        if ((n === void 0 && (n = 0), !this.id))
          return t.prototype.schedule.call(this, r, n);
        this.active = !1;
        var i = new e(this.scheduler, this.work);
        return this.add(i), i.schedule(r, n);
      }),
      (e.prototype.requestAsyncId = function (r, n, i) {
        i === void 0 && (i = 0), (this.delay = r.frame + i);
        var s = r.actions;
        return s.push(this), s.sort(e.sortActions), !0;
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {}),
      (e.prototype._execute = function (r, n) {
        if (this.active === !0) return t.prototype._execute.call(this, r, n);
      }),
      (e.sortActions = function (r, n) {
        return r.delay === n.delay
          ? r.index === n.index
            ? 0
            : r.index > n.index
            ? 1
            : -1
          : r.delay > n.delay
          ? 1
          : -1;
      }),
      e
    );
  })(_i);
function Et() {}
function g3(t) {
  return (
    !!t &&
    (t instanceof ee ||
      (typeof t.lift == "function" && typeof t.subscribe == "function"))
  );
}
var m3 = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = "argument out of range"),
        (this.name = "ArgumentOutOfRangeError"),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  fn = m3,
  y3 = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = "no elements in sequence"),
        (this.name = "EmptyError"),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  Ei = y3,
  v3 = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = "Timeout has occurred"),
        (this.name = "TimeoutError"),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  Op = v3;
function at(t, e) {
  return function (n) {
    if (typeof t != "function")
      throw new TypeError(
        "argument is not a function. Are you looking for `mapTo()`?",
      );
    return n.lift(new _3(t, e));
  };
}
var _3 = (function () {
    function t(e, r) {
      (this.project = e), (this.thisArg = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new w3(e, this.project, this.thisArg));
      }),
      t
    );
  })(),
  w3 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.project = n), (s.count = 0), (s.thisArg = i || s), s;
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        try {
          n = this.project.call(this.thisArg, r, this.count++);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(V);
function Mp(t, e, r) {
  if (e)
    if (Qe(e)) r = e;
    else
      return function () {
        for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
        return Mp(t, r)
          .apply(void 0, n)
          .pipe(
            at(function (s) {
              return Ve(s) ? e.apply(void 0, s) : e(s);
            }),
          );
      };
  return function () {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    var s = this,
      o,
      a = { context: s, subject: o, callbackFunc: t, scheduler: r };
    return new ee(function (c) {
      if (r) {
        var l = { args: n, subscriber: c, params: a };
        return r.schedule(S3, 0, l);
      } else {
        if (!o) {
          o = new In();
          var u = function () {
            for (var f = [], h = 0; h < arguments.length; h++)
              f[h] = arguments[h];
            o.next(f.length <= 1 ? f[0] : f), o.complete();
          };
          try {
            t.apply(s, n.concat([u]));
          } catch (f) {
            wu(o) ? o.error(f) : console.warn(f);
          }
        }
        return o.subscribe(c);
      }
    });
  };
}
function S3(t) {
  var e = this,
    r = t.args,
    n = t.subscriber,
    i = t.params,
    s = i.callbackFunc,
    o = i.context,
    a = i.scheduler,
    c = i.subject;
  if (!c) {
    c = i.subject = new In();
    var u = function () {
      for (var l = [], f = 0; f < arguments.length; f++) l[f] = arguments[f];
      var h = l.length <= 1 ? l[0] : l;
      e.add(a.schedule(E3, 0, { value: h, subject: c }));
    };
    try {
      s.apply(o, r.concat([u]));
    } catch (l) {
      c.error(l);
    }
  }
  this.add(c.subscribe(n));
}
function E3(t) {
  var e = t.value,
    r = t.subject;
  r.next(e), r.complete();
}
function Np(t, e, r) {
  if (e)
    if (Qe(e)) r = e;
    else
      return function () {
        for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
        return Np(t, r)
          .apply(void 0, n)
          .pipe(
            at(function (s) {
              return Ve(s) ? e.apply(void 0, s) : e(s);
            }),
          );
      };
  return function () {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    var s = {
      subject: void 0,
      args: n,
      callbackFunc: t,
      scheduler: r,
      context: this,
    };
    return new ee(function (o) {
      var a = s.context,
        c = s.subject;
      if (r) return r.schedule(C3, 0, { params: s, subscriber: o, context: a });
      if (!c) {
        c = s.subject = new In();
        var u = function () {
          for (var l = [], f = 0; f < arguments.length; f++)
            l[f] = arguments[f];
          var h = l.shift();
          if (h) {
            c.error(h);
            return;
          }
          c.next(l.length <= 1 ? l[0] : l), c.complete();
        };
        try {
          t.apply(a, n.concat([u]));
        } catch (l) {
          wu(c) ? c.error(l) : console.warn(l);
        }
      }
      return c.subscribe(o);
    });
  };
}
function C3(t) {
  var e = this,
    r = t.params,
    n = t.subscriber,
    i = t.context,
    s = r.callbackFunc,
    o = r.args,
    a = r.scheduler,
    c = r.subject;
  if (!c) {
    c = r.subject = new In();
    var u = function () {
      for (var l = [], f = 0; f < arguments.length; f++) l[f] = arguments[f];
      var h = l.shift();
      if (h) e.add(a.schedule(Hf, 0, { err: h, subject: c }));
      else {
        var b = l.length <= 1 ? l[0] : l;
        e.add(a.schedule(R3, 0, { value: b, subject: c }));
      }
    };
    try {
      s.apply(i, o.concat([u]));
    } catch (l) {
      this.add(a.schedule(Hf, 0, { err: l, subject: c }));
    }
  }
  this.add(c.subscribe(n));
}
function R3(t) {
  var e = t.value,
    r = t.subject;
  r.next(e), r.complete();
}
function Hf(t) {
  var e = t.err,
    r = t.subject;
  r.error(e);
}
var Mr = (function (t) {
    A(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        this.destination.next(n);
      }),
      (e.prototype.notifyError = function (r, n) {
        this.destination.error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        this.destination.complete();
      }),
      e
    );
  })(V),
  I3 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this) || this;
      return (
        (s.parent = r), (s.outerValue = n), (s.outerIndex = i), (s.index = 0), s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.parent.notifyNext(
          this.outerValue,
          r,
          this.outerIndex,
          this.index++,
          this,
        );
      }),
      (e.prototype._error = function (r) {
        this.parent.notifyError(r, this), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.parent.notifyComplete(this), this.unsubscribe();
      }),
      e
    );
  })(V),
  x3 = function (t) {
    return function (e) {
      return (
        t
          .then(
            function (r) {
              e.closed || (e.next(r), e.complete());
            },
            function (r) {
              return e.error(r);
            },
          )
          .then(null, zr),
        e
      );
    };
  };
function A3() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var rr = A3(),
  T3 = function (t) {
    return function (e) {
      var r = t[rr]();
      do {
        var n = void 0;
        try {
          n = r.next();
        } catch (i) {
          return e.error(i), e;
        }
        if (n.done) {
          e.complete();
          break;
        }
        if ((e.next(n.value), e.closed)) break;
      } while (!0);
      return (
        typeof r.return == "function" &&
          e.add(function () {
            r.return && r.return();
          }),
        e
      );
    };
  },
  k3 = function (t) {
    return function (e) {
      var r = t[Cn]();
      if (typeof r.subscribe != "function")
        throw new TypeError(
          "Provided object does not correctly implement Symbol.observable",
        );
      return r.subscribe(e);
    };
  },
  jp = function (t) {
    return t && typeof t.length == "number" && typeof t != "function";
  };
function Lp(t) {
  return !!t && typeof t.subscribe != "function" && typeof t.then == "function";
}
var Zn = function (t) {
  if (t && typeof t[Cn] == "function") return k3(t);
  if (jp(t)) return Rp(t);
  if (Lp(t)) return x3(t);
  if (t && typeof t[rr] == "function") return T3(t);
  var e = _u(t) ? "an invalid object" : "'" + t + "'",
    r =
      "You provided " +
      e +
      " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.";
  throw new TypeError(r);
};
function Ut(t, e, r, n, i) {
  if ((i === void 0 && (i = new I3(t, r, n)), !i.closed))
    return e instanceof ee ? e.subscribe(i) : Zn(e)(i);
}
var Vf = {};
function O3() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = void 0,
    n = void 0;
  return (
    Qe(t[t.length - 1]) && (n = t.pop()),
    typeof t[t.length - 1] == "function" && (r = t.pop()),
    t.length === 1 && Ve(t[0]) && (t = t[0]),
    Si(t, n).lift(new Iu(r))
  );
}
var Iu = (function () {
    function t(e) {
      this.resultSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new M3(e, this.resultSelector));
      }),
      t
    );
  })(),
  M3 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (
        (i.resultSelector = n),
        (i.active = 0),
        (i.values = []),
        (i.observables = []),
        i
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.values.push(Vf), this.observables.push(r);
      }),
      (e.prototype._complete = function () {
        var r = this.observables,
          n = r.length;
        if (n === 0) this.destination.complete();
        else {
          (this.active = n), (this.toRespond = n);
          for (var i = 0; i < n; i++) {
            var s = r[i];
            this.add(Ut(this, s, void 0, i));
          }
        }
      }),
      (e.prototype.notifyComplete = function (r) {
        (this.active -= 1) === 0 && this.destination.complete();
      }),
      (e.prototype.notifyNext = function (r, n, i) {
        var s = this.values,
          o = s[i],
          a = this.toRespond
            ? o === Vf
              ? --this.toRespond
              : this.toRespond
            : 0;
        (s[i] = n),
          a === 0 &&
            (this.resultSelector
              ? this._tryResultSelector(s)
              : this.destination.next(s.slice()));
      }),
      (e.prototype._tryResultSelector = function (r) {
        var n;
        try {
          n = this.resultSelector.apply(this, r);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(Mr);
function N3(t, e) {
  return new ee(function (r) {
    var n = new _e();
    return (
      n.add(
        e.schedule(function () {
          var i = t[Cn]();
          n.add(
            i.subscribe({
              next: function (s) {
                n.add(
                  e.schedule(function () {
                    return r.next(s);
                  }),
                );
              },
              error: function (s) {
                n.add(
                  e.schedule(function () {
                    return r.error(s);
                  }),
                );
              },
              complete: function () {
                n.add(
                  e.schedule(function () {
                    return r.complete();
                  }),
                );
              },
            }),
          );
        }),
      ),
      n
    );
  });
}
function j3(t, e) {
  return new ee(function (r) {
    var n = new _e();
    return (
      n.add(
        e.schedule(function () {
          return t.then(
            function (i) {
              n.add(
                e.schedule(function () {
                  r.next(i),
                    n.add(
                      e.schedule(function () {
                        return r.complete();
                      }),
                    );
                }),
              );
            },
            function (i) {
              n.add(
                e.schedule(function () {
                  return r.error(i);
                }),
              );
            },
          );
        }),
      ),
      n
    );
  });
}
function L3(t, e) {
  if (!t) throw new Error("Iterable cannot be null");
  return new ee(function (r) {
    var n = new _e(),
      i;
    return (
      n.add(function () {
        i && typeof i.return == "function" && i.return();
      }),
      n.add(
        e.schedule(function () {
          (i = t[rr]()),
            n.add(
              e.schedule(function () {
                if (!r.closed) {
                  var s, o;
                  try {
                    var a = i.next();
                    (s = a.value), (o = a.done);
                  } catch (c) {
                    r.error(c);
                    return;
                  }
                  o ? r.complete() : (r.next(s), this.schedule());
                }
              }),
            );
        }),
      ),
      n
    );
  });
}
function P3(t) {
  return t && typeof t[Cn] == "function";
}
function D3(t) {
  return t && typeof t[rr] == "function";
}
function Pp(t, e) {
  if (t != null) {
    if (P3(t)) return N3(t, e);
    if (Lp(t)) return j3(t, e);
    if (jp(t)) return Eu(t, e);
    if (D3(t) || typeof t == "string") return L3(t, e);
  }
  throw new TypeError(((t !== null && typeof t) || t) + " is not observable");
}
function Vt(t, e) {
  return e ? Pp(t, e) : t instanceof ee ? t : new ee(Zn(t));
}
var we = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this) || this;
      return (n.parent = r), n;
    }
    return (
      (e.prototype._next = function (r) {
        this.parent.notifyNext(r);
      }),
      (e.prototype._error = function (r) {
        this.parent.notifyError(r), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.parent.notifyComplete(), this.unsubscribe();
      }),
      e
    );
  })(V),
  Se = (function (t) {
    A(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      (e.prototype.notifyError = function (r) {
        this.destination.error(r);
      }),
      (e.prototype.notifyComplete = function () {
        this.destination.complete();
      }),
      e
    );
  })(V);
function Ee(t, e) {
  if (!e.closed) {
    if (t instanceof ee) return t.subscribe(e);
    var r;
    try {
      r = Zn(t)(e);
    } catch (n) {
      e.error(n);
    }
    return r;
  }
}
function Er(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    typeof e == "function"
      ? function (n) {
          return n.pipe(
            Er(function (i, s) {
              return Vt(t(i, s)).pipe(
                at(function (o, a) {
                  return e(i, o, s, a);
                }),
              );
            }, r),
          );
        }
      : (typeof e == "number" && (r = e),
        function (n) {
          return n.lift(new $3(t, r));
        })
  );
}
var $3 = (function () {
    function t(e, r) {
      r === void 0 && (r = Number.POSITIVE_INFINITY),
        (this.project = e),
        (this.concurrent = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new B3(e, this.project, this.concurrent));
      }),
      t
    );
  })(),
  B3 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      i === void 0 && (i = Number.POSITIVE_INFINITY);
      var s = t.call(this, r) || this;
      return (
        (s.project = n),
        (s.concurrent = i),
        (s.hasCompleted = !1),
        (s.buffer = []),
        (s.active = 0),
        (s.index = 0),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.active < this.concurrent ? this._tryNext(r) : this.buffer.push(r);
      }),
      (e.prototype._tryNext = function (r) {
        var n,
          i = this.index++;
        try {
          n = this.project(r, i);
        } catch (s) {
          this.destination.error(s);
          return;
        }
        this.active++, this._innerSub(n);
      }),
      (e.prototype._innerSub = function (r) {
        var n = new we(this),
          i = this.destination;
        i.add(n);
        var s = Ee(r, n);
        s !== n && i.add(s);
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.active === 0 &&
            this.buffer.length === 0 &&
            this.destination.complete(),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      (e.prototype.notifyComplete = function () {
        var r = this.buffer;
        this.active--,
          r.length > 0
            ? this._next(r.shift())
            : this.active === 0 &&
              this.hasCompleted &&
              this.destination.complete();
      }),
      e
    );
  })(Se),
  F3 = Er;
function xu(t) {
  return t === void 0 && (t = Number.POSITIVE_INFINITY), Er(tr, t);
}
function Dp() {
  return xu(1);
}
function Qn() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return Dp()(Hs.apply(void 0, t));
}
function Au(t) {
  return new ee(function (e) {
    var r;
    try {
      r = t();
    } catch (i) {
      e.error(i);
      return;
    }
    var n = r ? Vt(r) : Rn();
    return n.subscribe(e);
  });
}
function U3() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 1) {
    var r = t[0];
    if (Ve(r)) return $i(r, null);
    if (_u(r) && Object.getPrototypeOf(r) === Object.prototype) {
      var n = Object.keys(r);
      return $i(
        n.map(function (s) {
          return r[s];
        }),
        n,
      );
    }
  }
  if (typeof t[t.length - 1] == "function") {
    var i = t.pop();
    return (
      (t = t.length === 1 && Ve(t[0]) ? t[0] : t),
      $i(t, null).pipe(
        at(function (s) {
          return i.apply(void 0, s);
        }),
      )
    );
  }
  return $i(t, null);
}
function $i(t, e) {
  return new ee(function (r) {
    var n = t.length;
    if (n === 0) {
      r.complete();
      return;
    }
    for (
      var i = new Array(n),
        s = 0,
        o = 0,
        a = function (u) {
          var l = Vt(t[u]),
            f = !1;
          r.add(
            l.subscribe({
              next: function (h) {
                f || ((f = !0), o++), (i[u] = h);
              },
              error: function (h) {
                return r.error(h);
              },
              complete: function () {
                s++,
                  (s === n || !f) &&
                    (o === n &&
                      r.next(
                        e
                          ? e.reduce(function (h, b, g) {
                              return (h[b] = i[g]), h;
                            }, {})
                          : i,
                      ),
                    r.complete());
              },
            }),
          );
        },
        c = 0;
      c < n;
      c++
    )
      a(c);
  });
}
function $p(t, e, r, n) {
  return (
    un(r) && ((n = r), (r = void 0)),
    n
      ? $p(t, e, r).pipe(
          at(function (i) {
            return Ve(i) ? n.apply(void 0, i) : n(i);
          }),
        )
      : new ee(function (i) {
          function s(o) {
            arguments.length > 1
              ? i.next(Array.prototype.slice.call(arguments))
              : i.next(o);
          }
          Bp(t, e, s, i, r);
        })
  );
}
function Bp(t, e, r, n, i) {
  var s;
  if (W3(t)) {
    var o = t;
    t.addEventListener(e, r, i),
      (s = function () {
        return o.removeEventListener(e, r, i);
      });
  } else if (V3(t)) {
    var a = t;
    t.on(e, r),
      (s = function () {
        return a.off(e, r);
      });
  } else if (H3(t)) {
    var c = t;
    t.addListener(e, r),
      (s = function () {
        return c.removeListener(e, r);
      });
  } else if (t && t.length)
    for (var u = 0, l = t.length; u < l; u++) Bp(t[u], e, r, n, i);
  else throw new TypeError("Invalid event target");
  n.add(s);
}
function H3(t) {
  return (
    t &&
    typeof t.addListener == "function" &&
    typeof t.removeListener == "function"
  );
}
function V3(t) {
  return t && typeof t.on == "function" && typeof t.off == "function";
}
function W3(t) {
  return (
    t &&
    typeof t.addEventListener == "function" &&
    typeof t.removeEventListener == "function"
  );
}
function Fp(t, e, r) {
  return r
    ? Fp(t, e).pipe(
        at(function (n) {
          return Ve(n) ? r.apply(void 0, n) : r(n);
        }),
      )
    : new ee(function (n) {
        var i = function () {
            for (var o = [], a = 0; a < arguments.length; a++)
              o[a] = arguments[a];
            return n.next(o.length === 1 ? o[0] : o);
          },
          s;
        try {
          s = t(i);
        } catch (o) {
          n.error(o);
          return;
        }
        if (un(e))
          return function () {
            return e(i, s);
          };
      });
}
function z3(t, e, r, n, i) {
  var s, o;
  if (arguments.length == 1) {
    var a = t;
    (o = a.initialState),
      (e = a.condition),
      (r = a.iterate),
      (s = a.resultSelector || tr),
      (i = a.scheduler);
  } else
    n === void 0 || Qe(n) ? ((o = t), (s = tr), (i = n)) : ((o = t), (s = n));
  return new ee(function (c) {
    var u = o;
    if (i)
      return i.schedule(G3, 0, {
        subscriber: c,
        iterate: r,
        condition: e,
        resultSelector: s,
        state: u,
      });
    do {
      if (e) {
        var l = void 0;
        try {
          l = e(u);
        } catch (h) {
          c.error(h);
          return;
        }
        if (!l) {
          c.complete();
          break;
        }
      }
      var f = void 0;
      try {
        f = s(u);
      } catch (h) {
        c.error(h);
        return;
      }
      if ((c.next(f), c.closed)) break;
      try {
        u = r(u);
      } catch (h) {
        c.error(h);
        return;
      }
    } while (!0);
  });
}
function G3(t) {
  var e = t.subscriber,
    r = t.condition;
  if (!e.closed) {
    if (t.needIterate)
      try {
        t.state = t.iterate(t.state);
      } catch (s) {
        e.error(s);
        return;
      }
    else t.needIterate = !0;
    if (r) {
      var n = void 0;
      try {
        n = r(t.state);
      } catch (s) {
        e.error(s);
        return;
      }
      if (!n) {
        e.complete();
        return;
      }
      if (e.closed) return;
    }
    var i;
    try {
      i = t.resultSelector(t.state);
    } catch (s) {
      e.error(s);
      return;
    }
    if (!e.closed && (e.next(i), !e.closed)) return this.schedule(t);
  }
}
function q3(t, e, r) {
  return (
    e === void 0 && (e = ln),
    r === void 0 && (r = ln),
    Au(function () {
      return t() ? e : r;
    })
  );
}
function hn(t) {
  return !Ve(t) && t - parseFloat(t) + 1 >= 0;
}
function J3(t, e) {
  return (
    t === void 0 && (t = 0),
    e === void 0 && (e = We),
    (!hn(t) || t < 0) && (t = 0),
    (!e || typeof e.schedule != "function") && (e = We),
    new ee(function (r) {
      return (
        r.add(e.schedule(Z3, t, { subscriber: r, counter: 0, period: t })), r
      );
    })
  );
}
function Z3(t) {
  var e = t.subscriber,
    r = t.counter,
    n = t.period;
  e.next(r), this.schedule({ subscriber: e, counter: r + 1, period: n }, n);
}
function Up() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = Number.POSITIVE_INFINITY,
    n = null,
    i = t[t.length - 1];
  return (
    Qe(i)
      ? ((n = t.pop()),
        t.length > 1 && typeof t[t.length - 1] == "number" && (r = t.pop()))
      : typeof i == "number" && (r = t.pop()),
    n === null && t.length === 1 && t[0] instanceof ee ? t[0] : xu(r)(Si(t, n))
  );
}
var Hp = new ee(Et);
function Q3() {
  return Hp;
}
function Rc() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 0) return ln;
  var r = t[0],
    n = t.slice(1);
  return t.length === 1 && Ve(r)
    ? Rc.apply(void 0, r)
    : new ee(function (i) {
        var s = function () {
          return i.add(Rc.apply(void 0, n).subscribe(i));
        };
        return Vt(r).subscribe({
          next: function (o) {
            i.next(o);
          },
          error: s,
          complete: s,
        });
      });
}
function K3(t, e) {
  return e
    ? new ee(function (r) {
        var n = Object.keys(t),
          i = new _e();
        return (
          i.add(
            e.schedule(Y3, 0, {
              keys: n,
              index: 0,
              subscriber: r,
              subscription: i,
              obj: t,
            }),
          ),
          i
        );
      })
    : new ee(function (r) {
        for (var n = Object.keys(t), i = 0; i < n.length && !r.closed; i++) {
          var s = n[i];
          t.hasOwnProperty(s) && r.next([s, t[s]]);
        }
        r.complete();
      });
}
function Y3(t) {
  var e = t.keys,
    r = t.index,
    n = t.subscriber,
    i = t.subscription,
    s = t.obj;
  if (!n.closed)
    if (r < e.length) {
      var o = e[r];
      n.next([o, s[o]]),
        i.add(
          this.schedule({
            keys: e,
            index: r + 1,
            subscriber: n,
            subscription: i,
            obj: s,
          }),
        );
    } else n.complete();
}
function Vp(t, e) {
  function r() {
    return !r.pred.apply(r.thisArg, arguments);
  }
  return (r.pred = t), (r.thisArg = e), r;
}
function nr(t, e) {
  return function (n) {
    return n.lift(new X3(t, e));
  };
}
var X3 = (function () {
    function t(e, r) {
      (this.predicate = e), (this.thisArg = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new e4(e, this.predicate, this.thisArg));
      }),
      t
    );
  })(),
  e4 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.predicate = n), (s.thisArg = i), (s.count = 0), s;
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        try {
          n = this.predicate.call(this.thisArg, r, this.count++);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        n && this.destination.next(r);
      }),
      e
    );
  })(V);
function t4(t, e, r) {
  return [nr(e, r)(new ee(Zn(t))), nr(Vp(e, r))(new ee(Zn(t)))];
}
function Wp() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 1)
    if (Ve(t[0])) t = t[0];
    else return t[0];
  return Si(t, void 0).lift(new r4());
}
var r4 = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new n4(e));
      }),
      t
    );
  })(),
  n4 = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.hasFirst = !1), (n.observables = []), (n.subscriptions = []), n;
    }
    return (
      (e.prototype._next = function (r) {
        this.observables.push(r);
      }),
      (e.prototype._complete = function () {
        var r = this.observables,
          n = r.length;
        if (n === 0) this.destination.complete();
        else {
          for (var i = 0; i < n && !this.hasFirst; i++) {
            var s = r[i],
              o = Ut(this, s, void 0, i);
            this.subscriptions && this.subscriptions.push(o), this.add(o);
          }
          this.observables = null;
        }
      }),
      (e.prototype.notifyNext = function (r, n, i) {
        if (!this.hasFirst) {
          this.hasFirst = !0;
          for (var s = 0; s < this.subscriptions.length; s++)
            if (s !== i) {
              var o = this.subscriptions[s];
              o.unsubscribe(), this.remove(o);
            }
          this.subscriptions = null;
        }
        this.destination.next(n);
      }),
      e
    );
  })(Mr);
function i4(t, e, r) {
  return (
    t === void 0 && (t = 0),
    new ee(function (n) {
      e === void 0 && ((e = t), (t = 0));
      var i = 0,
        s = t;
      if (r)
        return r.schedule(s4, 0, {
          index: i,
          count: e,
          start: t,
          subscriber: n,
        });
      do {
        if (i++ >= e) {
          n.complete();
          break;
        }
        if ((n.next(s++), n.closed)) break;
      } while (!0);
    })
  );
}
function s4(t) {
  var e = t.start,
    r = t.index,
    n = t.count,
    i = t.subscriber;
  if (r >= n) {
    i.complete();
    return;
  }
  i.next(e),
    !i.closed && ((t.index = r + 1), (t.start = e + 1), this.schedule(t));
}
function zp(t, e, r) {
  t === void 0 && (t = 0);
  var n = -1;
  return (
    hn(e) ? (n = (Number(e) < 1 && 1) || Number(e)) : Qe(e) && (r = e),
    Qe(r) || (r = We),
    new ee(function (i) {
      var s = hn(t) ? t : +t - r.now();
      return r.schedule(o4, s, { index: 0, period: n, subscriber: i });
    })
  );
}
function o4(t) {
  var e = t.index,
    r = t.period,
    n = t.subscriber;
  if ((n.next(e), !n.closed)) {
    if (r === -1) return n.complete();
    (t.index = e + 1), this.schedule(t, r);
  }
}
function a4(t, e) {
  return new ee(function (r) {
    var n;
    try {
      n = t();
    } catch (a) {
      r.error(a);
      return;
    }
    var i;
    try {
      i = e(n);
    } catch (a) {
      r.error(a);
      return;
    }
    var s = i ? Vt(i) : ln,
      o = s.subscribe(r);
    return function () {
      o.unsubscribe(), n && n.unsubscribe();
    };
  });
}
function Gp() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return typeof r == "function" && t.pop(), Si(t, void 0).lift(new qp(r));
}
var qp = (function () {
    function t(e) {
      this.resultSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new c4(e, this.resultSelector));
      }),
      t
    );
  })(),
  c4 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.resultSelector = n),
        (s.iterators = []),
        (s.active = 0),
        (s.resultSelector = typeof n == "function" ? n : void 0),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.iterators;
        Ve(r)
          ? n.push(new l4(r))
          : typeof r[rr] == "function"
          ? n.push(new u4(r[rr]()))
          : n.push(new f4(this.destination, this, r));
      }),
      (e.prototype._complete = function () {
        var r = this.iterators,
          n = r.length;
        if ((this.unsubscribe(), n === 0)) {
          this.destination.complete();
          return;
        }
        this.active = n;
        for (var i = 0; i < n; i++) {
          var s = r[i];
          if (s.stillUnsubscribed) {
            var o = this.destination;
            o.add(s.subscribe());
          } else this.active--;
        }
      }),
      (e.prototype.notifyInactive = function () {
        this.active--, this.active === 0 && this.destination.complete();
      }),
      (e.prototype.checkIterators = function () {
        for (
          var r = this.iterators, n = r.length, i = this.destination, s = 0;
          s < n;
          s++
        ) {
          var o = r[s];
          if (typeof o.hasValue == "function" && !o.hasValue()) return;
        }
        for (var a = !1, c = [], s = 0; s < n; s++) {
          var o = r[s],
            u = o.next();
          if ((o.hasCompleted() && (a = !0), u.done)) {
            i.complete();
            return;
          }
          c.push(u.value);
        }
        this.resultSelector ? this._tryresultSelector(c) : i.next(c),
          a && i.complete();
      }),
      (e.prototype._tryresultSelector = function (r) {
        var n;
        try {
          n = this.resultSelector.apply(this, r);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(V),
  u4 = (function () {
    function t(e) {
      (this.iterator = e), (this.nextResult = e.next());
    }
    return (
      (t.prototype.hasValue = function () {
        return !0;
      }),
      (t.prototype.next = function () {
        var e = this.nextResult;
        return (this.nextResult = this.iterator.next()), e;
      }),
      (t.prototype.hasCompleted = function () {
        var e = this.nextResult;
        return !!(e && e.done);
      }),
      t
    );
  })(),
  l4 = (function () {
    function t(e) {
      (this.array = e),
        (this.index = 0),
        (this.length = 0),
        (this.length = e.length);
    }
    return (
      (t.prototype[rr] = function () {
        return this;
      }),
      (t.prototype.next = function (e) {
        var r = this.index++,
          n = this.array;
        return r < this.length
          ? { value: n[r], done: !1 }
          : { value: null, done: !0 };
      }),
      (t.prototype.hasValue = function () {
        return this.array.length > this.index;
      }),
      (t.prototype.hasCompleted = function () {
        return this.array.length === this.index;
      }),
      t
    );
  })(),
  f4 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.parent = n),
        (s.observable = i),
        (s.stillUnsubscribed = !0),
        (s.buffer = []),
        (s.isComplete = !1),
        s
      );
    }
    return (
      (e.prototype[rr] = function () {
        return this;
      }),
      (e.prototype.next = function () {
        var r = this.buffer;
        return r.length === 0 && this.isComplete
          ? { value: null, done: !0 }
          : { value: r.shift(), done: !1 };
      }),
      (e.prototype.hasValue = function () {
        return this.buffer.length > 0;
      }),
      (e.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
      }),
      (e.prototype.notifyComplete = function () {
        this.buffer.length > 0
          ? ((this.isComplete = !0), this.parent.notifyInactive())
          : this.destination.complete();
      }),
      (e.prototype.notifyNext = function (r) {
        this.buffer.push(r), this.parent.checkIterators();
      }),
      (e.prototype.subscribe = function () {
        return Ee(this.observable, new we(this));
      }),
      e
    );
  })(Se);
const h4 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        ArgumentOutOfRangeError: fn,
        AsyncSubject: In,
        BehaviorSubject: Sp,
        ConnectableObservable: wp,
        EMPTY: ln,
        EmptyError: Ei,
        GroupedObservable: wc,
        NEVER: Hp,
        Notification: Bt,
        get NotificationKind() {
          return Ec;
        },
        ObjectUnsubscribedError: Qt,
        Observable: ee,
        ReplaySubject: Ru,
        Scheduler: Sc,
        Subject: Me,
        Subscriber: V,
        Subscription: _e,
        TimeoutError: Op,
        UnsubscriptionError: Wn,
        VirtualAction: kp,
        VirtualTimeScheduler: b3,
        animationFrame: p3,
        animationFrameScheduler: Tp,
        asap: Wi,
        asapScheduler: xp,
        async: We,
        asyncScheduler: Ap,
        bindCallback: Mp,
        bindNodeCallback: Np,
        combineLatest: O3,
        concat: Qn,
        config: tt,
        defer: Au,
        empty: Rn,
        forkJoin: U3,
        from: Vt,
        fromEvent: $p,
        fromEventPattern: Fp,
        generate: z3,
        identity: tr,
        iif: q3,
        interval: J3,
        isObservable: g3,
        merge: Up,
        never: Q3,
        noop: Et,
        observable: Cn,
        of: Hs,
        onErrorResumeNext: Rc,
        pairs: K3,
        partition: t4,
        pipe: _c,
        queue: Cp,
        queueScheduler: Ep,
        race: Wp,
        range: i4,
        scheduled: Pp,
        throwError: Cu,
        timer: zp,
        using: a4,
        zip: Gp,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Vs = Rr(h4);
var Ws = {};
function Jp(t) {
  var e,
    r,
    n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object")
    if (Array.isArray(t))
      for (e = 0; e < t.length; e++)
        t[e] && (r = Jp(t[e])) && (n && (n += " "), (n += r));
    else for (e in t) t[e] && (n && (n += " "), (n += e));
  return n;
}
function Wf() {
  for (var t, e, r = 0, n = ""; r < arguments.length; )
    (t = arguments[r++]) && (e = Jp(t)) && (n && (n += " "), (n += e));
  return n;
}
const d4 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, clsx: Wf, default: Wf },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  zs = Rr(d4);
var Ht,
  pe,
  za,
  zf,
  dn = 0,
  Zp = [],
  zi = [],
  Gf = Z.__b,
  qf = Z.__r,
  Jf = Z.diffed,
  Zf = Z.__c,
  Qf = Z.unmount;
function Nr(t, e) {
  Z.__h && Z.__h(pe, t, dn || e), (dn = 0);
  var r = pe.__H || (pe.__H = { __: [], __h: [] });
  return t >= r.__.length && r.__.push({ __V: zi }), r.__[t];
}
function Qp(t) {
  return (dn = 1), Kp(Xp, t);
}
function Kp(t, e, r) {
  var n = Nr(Ht++, 2);
  if (
    ((n.t = t),
    !n.__c &&
      ((n.__ = [
        r ? r(e) : Xp(void 0, e),
        function (a) {
          var c = n.__N ? n.__N[0] : n.__[0],
            u = n.t(c, a);
          c !== u && ((n.__N = [u, n.__[1]]), n.__c.setState({}));
        },
      ]),
      (n.__c = pe),
      !pe.u))
  ) {
    var i = function (a, c, u) {
      if (!n.__c.__H) return !0;
      var l = n.__c.__H.__.filter(function (h) {
        return h.__c;
      });
      if (
        l.every(function (h) {
          return !h.__N;
        })
      )
        return !s || s.call(this, a, c, u);
      var f = !1;
      return (
        l.forEach(function (h) {
          if (h.__N) {
            var b = h.__[0];
            (h.__ = h.__N), (h.__N = void 0), b !== h.__[0] && (f = !0);
          }
        }),
        !(!f && n.__c.props === a) && (!s || s.call(this, a, c, u))
      );
    };
    pe.u = !0;
    var s = pe.shouldComponentUpdate,
      o = pe.componentWillUpdate;
    (pe.componentWillUpdate = function (a, c, u) {
      if (this.__e) {
        var l = s;
        (s = void 0), i(a, c, u), (s = l);
      }
      o && o.call(this, a, c, u);
    }),
      (pe.shouldComponentUpdate = i);
  }
  return n.__N || n.__;
}
function p4(t, e) {
  var r = Nr(Ht++, 3);
  !Z.__s && ku(r.__H, e) && ((r.__ = t), (r.i = e), pe.__H.__h.push(r));
}
function Yp(t, e) {
  var r = Nr(Ht++, 4);
  !Z.__s && ku(r.__H, e) && ((r.__ = t), (r.i = e), pe.__h.push(r));
}
function b4(t) {
  return (
    (dn = 5),
    Tu(function () {
      return { current: t };
    }, [])
  );
}
function g4(t, e, r) {
  (dn = 6),
    Yp(
      function () {
        return typeof t == "function"
          ? (t(e()),
            function () {
              return t(null);
            })
          : t
          ? ((t.current = e()),
            function () {
              return (t.current = null);
            })
          : void 0;
      },
      r == null ? r : r.concat(t),
    );
}
function Tu(t, e) {
  var r = Nr(Ht++, 7);
  return ku(r.__H, e) ? ((r.__V = t()), (r.i = e), (r.__h = t), r.__V) : r.__;
}
function m4(t, e) {
  return (
    (dn = 8),
    Tu(function () {
      return t;
    }, e)
  );
}
function y4(t) {
  var e = pe.context[t.__c],
    r = Nr(Ht++, 9);
  return (
    (r.c = t),
    e ? (r.__ == null && ((r.__ = !0), e.sub(pe)), e.props.value) : t.__
  );
}
function v4(t, e) {
  Z.useDebugValue && Z.useDebugValue(e ? e(t) : t);
}
function _4(t) {
  var e = Nr(Ht++, 10),
    r = Qp();
  return (
    (e.__ = t),
    pe.componentDidCatch ||
      (pe.componentDidCatch = function (n, i) {
        e.__ && e.__(n, i), r[1](n);
      }),
    [
      r[0],
      function () {
        r[1](void 0);
      },
    ]
  );
}
function w4() {
  var t = Nr(Ht++, 11);
  if (!t.__) {
    for (var e = pe.__v; e !== null && !e.__m && e.__ !== null; ) e = e.__;
    var r = e.__m || (e.__m = [0, 0]);
    t.__ = "P" + r[0] + "-" + r[1]++;
  }
  return t.__;
}
function S4() {
  for (var t; (t = Zp.shift()); )
    if (t.__P && t.__H)
      try {
        t.__H.__h.forEach(Gi), t.__H.__h.forEach(Ic), (t.__H.__h = []);
      } catch (e) {
        (t.__H.__h = []), Z.__e(e, t.__v);
      }
}
(Z.__b = function (t) {
  (pe = null), Gf && Gf(t);
}),
  (Z.__r = function (t) {
    qf && qf(t), (Ht = 0);
    var e = (pe = t.__c).__H;
    e &&
      (za === pe
        ? ((e.__h = []),
          (pe.__h = []),
          e.__.forEach(function (r) {
            r.__N && (r.__ = r.__N), (r.__V = zi), (r.__N = r.i = void 0);
          }))
        : (e.__h.forEach(Gi), e.__h.forEach(Ic), (e.__h = []), (Ht = 0))),
      (za = pe);
  }),
  (Z.diffed = function (t) {
    Jf && Jf(t);
    var e = t.__c;
    e &&
      e.__H &&
      (e.__H.__h.length &&
        ((Zp.push(e) !== 1 && zf === Z.requestAnimationFrame) ||
          ((zf = Z.requestAnimationFrame) || E4)(S4)),
      e.__H.__.forEach(function (r) {
        r.i && (r.__H = r.i),
          r.__V !== zi && (r.__ = r.__V),
          (r.i = void 0),
          (r.__V = zi);
      })),
      (za = pe = null);
  }),
  (Z.__c = function (t, e) {
    e.some(function (r) {
      try {
        r.__h.forEach(Gi),
          (r.__h = r.__h.filter(function (n) {
            return !n.__ || Ic(n);
          }));
      } catch (n) {
        e.some(function (i) {
          i.__h && (i.__h = []);
        }),
          (e = []),
          Z.__e(n, r.__v);
      }
    }),
      Zf && Zf(t, e);
  }),
  (Z.unmount = function (t) {
    Qf && Qf(t);
    var e,
      r = t.__c;
    r &&
      r.__H &&
      (r.__H.__.forEach(function (n) {
        try {
          Gi(n);
        } catch (i) {
          e = i;
        }
      }),
      (r.__H = void 0),
      e && Z.__e(e, r.__v));
  });
var Kf = typeof requestAnimationFrame == "function";
function E4(t) {
  var e,
    r = function () {
      clearTimeout(n), Kf && cancelAnimationFrame(e), setTimeout(t);
    },
    n = setTimeout(r, 100);
  Kf && (e = requestAnimationFrame(r));
}
function Gi(t) {
  var e = pe,
    r = t.__c;
  typeof r == "function" && ((t.__c = void 0), r()), (pe = e);
}
function Ic(t) {
  var e = pe;
  (t.__c = t.__()), (pe = e);
}
function ku(t, e) {
  return (
    !t ||
    t.length !== e.length ||
    e.some(function (r, n) {
      return r !== t[n];
    })
  );
}
function Xp(t, e) {
  return typeof e == "function" ? e(t) : e;
}
const C4 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        useCallback: m4,
        useContext: y4,
        useDebugValue: v4,
        useEffect: p4,
        useErrorBoundary: _4,
        useId: w4,
        useImperativeHandle: g4,
        useLayoutEffect: Yp,
        useMemo: Tu,
        useReducer: Kp,
        useRef: b4,
        useState: Qp,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Ci = Rr(C4);
var Tt = {},
  Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
Gs.CloseIcon = void 0;
const Yf = Ke;
function R4(t) {
  return (0, Yf.h)(
    "svg",
    Object.assign(
      {
        width: "40",
        height: "40",
        viewBox: "0 0 40 40",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
      },
      t,
    ),
    (0, Yf.h)("path", {
      d: "M13.7677 13L12.3535 14.4142L18.3535 20.4142L12.3535 26.4142L13.7677 27.8284L19.7677 21.8284L25.7677 27.8284L27.1819 26.4142L21.1819 20.4142L27.1819 14.4142L25.7677 13L19.7677 19L13.7677 13Z",
    }),
  );
}
Gs.CloseIcon = R4;
var Ou = {};
Object.defineProperty(Ou, "__esModule", { value: !0 });
Ou.default =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMTQuMDM3IDE4LjkyNmMtMi43NSAwLTQuOTA3LTIuMjA1LTQuOTA3LTQuOTI2IDAtMi43MiAyLjIzLTQuOTI2IDQuOTA3LTQuOTI2YTQuODY2IDQuODY2IDAgMCAxIDQuODMzIDQuMTE4aDQuOTgyYy0uNDQ2LTUuMDczLTQuNjg0LTkuMDQ0LTkuODE1LTkuMDQ0QzguNjEgNC4xNDggNC4xNDkgOC41NiA0LjE0OSAxNHM0LjM4NyA5Ljg1MiA5Ljg5IDkuODUyYzUuMjA0IDAgOS4zNjgtMy45NyA5LjgxNC05LjA0M0gxOC44N2E0Ljg2NiA0Ljg2NiAwIDAgMS00LjgzMyA0LjExN1oiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";
var Mu = {};
Object.defineProperty(Mu, "__esModule", { value: !0 });
Mu.default =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMjMuODUyIDE0QTkuODM0IDkuODM0IDAgMCAxIDE0IDIzLjg1MiA5LjgzNCA5LjgzNCAwIDAgMSA0LjE0OCAxNCA5LjgzNCA5LjgzNCAwIDAgMSAxNCA0LjE0OCA5LjgzNCA5LjgzNCAwIDAgMSAyMy44NTIgMTRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjE4NSAxMi41MDRjMC0uNDU2IDAtLjcxLjA5OC0uODYyLjA5OC0uMTUyLjE5Ni0uMzA0LjM0My0uMzU1LjE5Ni0uMTAyLjM5Mi0uMTAyLjg4MS0uMTAyaDIuOTg2Yy40OSAwIC42ODYgMCAuODgyLjEwMi4xNDYuMTAxLjI5My4yMDMuMzQyLjM1NS4wOTguMjAzLjA5OC40MDYuMDk4Ljg2MnYyLjk5MmMwIC40NTcgMCAuNzEtLjA5OC44NjMtLjA5OC4xNTItLjE5NS4zMDQtLjM0Mi4zNTUtLjE5Ni4xMDEtLjM5Mi4xMDEtLjg4Mi4xMDFoLTIuOTg2Yy0uNDkgMC0uNjg1IDAtLjg4LS4xMDEtLjE0OC0uMTAyLS4yOTUtLjIwMy0uMzQ0LS4zNTUtLjA5OC0uMjAzLS4wOTgtLjQwNi0uMDk4LS44NjN2LTIuOTkyWiIgZmlsbD0iIzAwNTJGRiIvPjwvc3ZnPg==";
var qs = {};
Object.defineProperty(qs, "__esModule", { value: !0 });
qs.QRCodeIcon = void 0;
const _t = Ke;
function I4(t) {
  return (0, _t.h)(
    "svg",
    Object.assign(
      {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        xmlns: "http://www.w3.org/2000/svg",
      },
      t,
    ),
    (0, _t.h)("path", {
      d: "M8.2271 1.77124L7.0271 1.77124V2.97124H8.2271V1.77124Z",
    }),
    (0, _t.h)("path", {
      d: "M5.44922 0.199219L5.44922 4.54922L9.79922 4.54922V0.199219L5.44922 0.199219ZM8.89922 3.64922L6.34922 3.64922L6.34922 1.09922L8.89922 1.09922V3.64922Z",
    }),
    (0, _t.h)("path", {
      d: "M2.97124 1.77124L1.77124 1.77124L1.77124 2.97124H2.97124V1.77124Z",
    }),
    (0, _t.h)("path", {
      d: "M0.199219 4.54922L4.54922 4.54922L4.54922 0.199219L0.199219 0.199219L0.199219 4.54922ZM1.09922 1.09922L3.64922 1.09922L3.64922 3.64922L1.09922 3.64922L1.09922 1.09922Z",
    }),
    (0, _t.h)("path", {
      d: "M2.97124 7.0271H1.77124L1.77124 8.2271H2.97124V7.0271Z",
    }),
    (0, _t.h)("path", {
      d: "M0.199219 9.79922H4.54922L4.54922 5.44922L0.199219 5.44922L0.199219 9.79922ZM1.09922 6.34922L3.64922 6.34922L3.64922 8.89922H1.09922L1.09922 6.34922Z",
    }),
    (0, _t.h)("path", {
      d: "M8.89922 7.39912H7.99922V5.40112H5.44922L5.44922 9.79912H6.34922L6.34922 6.30112H7.09922V8.29912H9.79922V5.40112H8.89922V7.39912Z",
    }),
    (0, _t.h)("path", {
      d: "M7.99912 8.89917H7.09912V9.79917H7.99912V8.89917Z",
    }),
    (0, _t.h)("path", {
      d: "M9.79917 8.89917H8.89917V9.79917H9.79917V8.89917Z",
    }),
  );
}
qs.QRCodeIcon = I4;
var Nu = {};
Object.defineProperty(Nu, "__esModule", { value: !0 });
const x4 = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="white"/>
        <path d="M50.512 94C74.2907 94 93.5673 74.5244 93.5673 50.5C93.5673 26.4756 74.2907 7 50.512 7C26.7332 7 7.45667 26.4756 7.45667 50.5C7.45667 74.5244 26.7332 94 50.512 94Z" fill="#0052FF"/>
        <path d="M50.6248 65.4335C42.3697 65.4335 35.8996 58.7469 35.8996 50.5C35.8996 42.2531 42.5928 35.5664 50.6248 35.5664C57.9873 35.5664 64.0111 40.9157 65.1267 48.0481H80.0749C78.7363 32.6688 66.0191 20.6328 50.6248 20.6328C34.3379 20.6328 20.9514 34.0062 20.9514 50.5C20.9514 66.9936 34.1148 80.3671 50.6248 80.3671C66.2422 80.3671 78.7363 68.331 80.0749 52.9516H65.1267C64.0111 60.0841 57.9873 65.4335 50.6248 65.4335Z" fill="white"/>
    </svg>
`;
Nu.default = x4;
var ju = {};
Object.defineProperty(ju, "__esModule", { value: !0 });
ju.default = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="white"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" fill="#1B53E4"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" stroke="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3379 49.9484C19.3379 66.8508 33.04 80.553 49.9425 80.553C66.8449 80.553 80.5471 66.8508 80.5471 49.9484C80.5471 33.0459 66.8449 19.3438 49.9425 19.3438C33.04 19.3438 19.3379 33.0459 19.3379 49.9484ZM44.0817 40.0799C41.8725 40.0799 40.0817 41.8708 40.0817 44.0799V55.8029C40.0817 58.012 41.8725 59.8029 44.0817 59.8029H55.8046C58.0138 59.8029 59.8046 58.012 59.8046 55.8029V44.0799C59.8046 41.8708 58.0138 40.0799 55.8046 40.0799H44.0817Z" fill="white"/>
    </svg>
`;
var Js = {};
Object.defineProperty(Js, "__esModule", { value: !0 });
Js.StatusDotIcon = void 0;
const Xf = Ke;
function A4(t) {
  return (0, Xf.h)(
    "svg",
    Object.assign(
      {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        xmlns: "http://www.w3.org/2000/svg",
      },
      t,
    ),
    (0, Xf.h)("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M2.29995 4.99995C2.29995 5.57985 1.82985 6.04995 1.24995 6.04995C0.670052 6.04995 0.199951 5.57985 0.199951 4.99995C0.199951 4.42005 0.670052 3.94995 1.24995 3.94995C1.82985 3.94995 2.29995 4.42005 2.29995 4.99995ZM4.99995 6.04995C5.57985 6.04995 6.04995 5.57985 6.04995 4.99995C6.04995 4.42005 5.57985 3.94995 4.99995 3.94995C4.42005 3.94995 3.94995 4.42005 3.94995 4.99995C3.94995 5.57985 4.42005 6.04995 4.99995 6.04995ZM8.74995 6.04995C9.32985 6.04995 9.79995 5.57985 9.79995 4.99995C9.79995 4.42005 9.32985 3.94995 8.74995 3.94995C8.17005 3.94995 7.69995 4.42005 7.69995 4.99995C7.69995 5.57985 8.17005 6.04995 8.74995 6.04995Z",
    }),
  );
}
Js.StatusDotIcon = A4;
var Zs = {};
function e0(t) {
  (this.mode = Je.MODE_8BIT_BYTE), (this.data = t), (this.parsedData = []);
  for (var e = 0, r = this.data.length; e < r; e++) {
    var n = [],
      i = this.data.charCodeAt(e);
    i > 65536
      ? ((n[0] = 240 | ((i & 1835008) >>> 18)),
        (n[1] = 128 | ((i & 258048) >>> 12)),
        (n[2] = 128 | ((i & 4032) >>> 6)),
        (n[3] = 128 | (i & 63)))
      : i > 2048
      ? ((n[0] = 224 | ((i & 61440) >>> 12)),
        (n[1] = 128 | ((i & 4032) >>> 6)),
        (n[2] = 128 | (i & 63)))
      : i > 128
      ? ((n[0] = 192 | ((i & 1984) >>> 6)), (n[1] = 128 | (i & 63)))
      : (n[0] = i),
      this.parsedData.push(n);
  }
  (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
    this.parsedData.length != this.data.length &&
      (this.parsedData.unshift(191),
      this.parsedData.unshift(187),
      this.parsedData.unshift(239));
}
e0.prototype = {
  getLength: function (t) {
    return this.parsedData.length;
  },
  write: function (t) {
    for (var e = 0, r = this.parsedData.length; e < r; e++)
      t.put(this.parsedData[e], 8);
  },
};
function kt(t, e) {
  (this.typeNumber = t),
    (this.errorCorrectLevel = e),
    (this.modules = null),
    (this.moduleCount = 0),
    (this.dataCache = null),
    (this.dataList = []);
}
kt.prototype = {
  addData: function (t) {
    var e = new e0(t);
    this.dataList.push(e), (this.dataCache = null);
  },
  isDark: function (t, e) {
    if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e)
      throw new Error(t + "," + e);
    return this.modules[t][e];
  },
  getModuleCount: function () {
    return this.moduleCount;
  },
  make: function () {
    this.makeImpl(!1, this.getBestMaskPattern());
  },
  makeImpl: function (t, e) {
    (this.moduleCount = this.typeNumber * 4 + 17),
      (this.modules = new Array(this.moduleCount));
    for (var r = 0; r < this.moduleCount; r++) {
      this.modules[r] = new Array(this.moduleCount);
      for (var n = 0; n < this.moduleCount; n++) this.modules[r][n] = null;
    }
    this.setupPositionProbePattern(0, 0),
      this.setupPositionProbePattern(this.moduleCount - 7, 0),
      this.setupPositionProbePattern(0, this.moduleCount - 7),
      this.setupPositionAdjustPattern(),
      this.setupTimingPattern(),
      this.setupTypeInfo(t, e),
      this.typeNumber >= 7 && this.setupTypeNumber(t),
      this.dataCache == null &&
        (this.dataCache = kt.createData(
          this.typeNumber,
          this.errorCorrectLevel,
          this.dataList,
        )),
      this.mapData(this.dataCache, e);
  },
  setupPositionProbePattern: function (t, e) {
    for (var r = -1; r <= 7; r++)
      if (!(t + r <= -1 || this.moduleCount <= t + r))
        for (var n = -1; n <= 7; n++)
          e + n <= -1 ||
            this.moduleCount <= e + n ||
            ((0 <= r && r <= 6 && (n == 0 || n == 6)) ||
            (0 <= n && n <= 6 && (r == 0 || r == 6)) ||
            (2 <= r && r <= 4 && 2 <= n && n <= 4)
              ? (this.modules[t + r][e + n] = !0)
              : (this.modules[t + r][e + n] = !1));
  },
  getBestMaskPattern: function () {
    for (var t = 0, e = 0, r = 0; r < 8; r++) {
      this.makeImpl(!0, r);
      var n = ye.getLostPoint(this);
      (r == 0 || t > n) && ((t = n), (e = r));
    }
    return e;
  },
  createMovieClip: function (t, e, r) {
    var n = t.createEmptyMovieClip(e, r),
      i = 1;
    this.make();
    for (var s = 0; s < this.modules.length; s++)
      for (var o = s * i, a = 0; a < this.modules[s].length; a++) {
        var c = a * i,
          u = this.modules[s][a];
        u &&
          (n.beginFill(0, 100),
          n.moveTo(c, o),
          n.lineTo(c + i, o),
          n.lineTo(c + i, o + i),
          n.lineTo(c, o + i),
          n.endFill());
      }
    return n;
  },
  setupTimingPattern: function () {
    for (var t = 8; t < this.moduleCount - 8; t++)
      this.modules[t][6] == null && (this.modules[t][6] = t % 2 == 0);
    for (var e = 8; e < this.moduleCount - 8; e++)
      this.modules[6][e] == null && (this.modules[6][e] = e % 2 == 0);
  },
  setupPositionAdjustPattern: function () {
    for (
      var t = ye.getPatternPosition(this.typeNumber), e = 0;
      e < t.length;
      e++
    )
      for (var r = 0; r < t.length; r++) {
        var n = t[e],
          i = t[r];
        if (this.modules[n][i] == null)
          for (var s = -2; s <= 2; s++)
            for (var o = -2; o <= 2; o++)
              s == -2 || s == 2 || o == -2 || o == 2 || (s == 0 && o == 0)
                ? (this.modules[n + s][i + o] = !0)
                : (this.modules[n + s][i + o] = !1);
      }
  },
  setupTypeNumber: function (t) {
    for (var e = ye.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
      var n = !t && ((e >> r) & 1) == 1;
      this.modules[Math.floor(r / 3)][(r % 3) + this.moduleCount - 8 - 3] = n;
    }
    for (var r = 0; r < 18; r++) {
      var n = !t && ((e >> r) & 1) == 1;
      this.modules[(r % 3) + this.moduleCount - 8 - 3][Math.floor(r / 3)] = n;
    }
  },
  setupTypeInfo: function (t, e) {
    for (
      var r = (this.errorCorrectLevel << 3) | e,
        n = ye.getBCHTypeInfo(r),
        i = 0;
      i < 15;
      i++
    ) {
      var s = !t && ((n >> i) & 1) == 1;
      i < 6
        ? (this.modules[i][8] = s)
        : i < 8
        ? (this.modules[i + 1][8] = s)
        : (this.modules[this.moduleCount - 15 + i][8] = s);
    }
    for (var i = 0; i < 15; i++) {
      var s = !t && ((n >> i) & 1) == 1;
      i < 8
        ? (this.modules[8][this.moduleCount - i - 1] = s)
        : i < 9
        ? (this.modules[8][15 - i - 1 + 1] = s)
        : (this.modules[8][15 - i - 1] = s);
    }
    this.modules[this.moduleCount - 8][8] = !t;
  },
  mapData: function (t, e) {
    for (
      var r = -1,
        n = this.moduleCount - 1,
        i = 7,
        s = 0,
        o = this.moduleCount - 1;
      o > 0;
      o -= 2
    )
      for (o == 6 && o--; ; ) {
        for (var a = 0; a < 2; a++)
          if (this.modules[n][o - a] == null) {
            var c = !1;
            s < t.length && (c = ((t[s] >>> i) & 1) == 1);
            var u = ye.getMask(e, n, o - a);
            u && (c = !c),
              (this.modules[n][o - a] = c),
              i--,
              i == -1 && (s++, (i = 7));
          }
        if (((n += r), n < 0 || this.moduleCount <= n)) {
          (n -= r), (r = -r);
          break;
        }
      }
  },
};
kt.PAD0 = 236;
kt.PAD1 = 17;
kt.createData = function (t, e, r) {
  for (var n = It.getRSBlocks(t, e), i = new t0(), s = 0; s < r.length; s++) {
    var o = r[s];
    i.put(o.mode, 4),
      i.put(o.getLength(), ye.getLengthInBits(o.mode, t)),
      o.write(i);
  }
  for (var a = 0, s = 0; s < n.length; s++) a += n[s].dataCount;
  if (i.getLengthInBits() > a * 8)
    throw new Error(
      "code length overflow. (" + i.getLengthInBits() + ">" + a * 8 + ")",
    );
  for (
    i.getLengthInBits() + 4 <= a * 8 && i.put(0, 4);
    i.getLengthInBits() % 8 != 0;

  )
    i.putBit(!1);
  for (
    ;
    !(
      i.getLengthInBits() >= a * 8 ||
      (i.put(kt.PAD0, 8), i.getLengthInBits() >= a * 8)
    );

  )
    i.put(kt.PAD1, 8);
  return kt.createBytes(i, n);
};
kt.createBytes = function (t, e) {
  for (
    var r = 0,
      n = 0,
      i = 0,
      s = new Array(e.length),
      o = new Array(e.length),
      a = 0;
    a < e.length;
    a++
  ) {
    var c = e[a].dataCount,
      u = e[a].totalCount - c;
    (n = Math.max(n, c)), (i = Math.max(i, u)), (s[a] = new Array(c));
    for (var l = 0; l < s[a].length; l++) s[a][l] = 255 & t.buffer[l + r];
    r += c;
    var f = ye.getErrorCorrectPolynomial(u),
      h = new Xr(s[a], f.getLength() - 1),
      b = h.mod(f);
    o[a] = new Array(f.getLength() - 1);
    for (var l = 0; l < o[a].length; l++) {
      var g = l + b.getLength() - o[a].length;
      o[a][l] = g >= 0 ? b.get(g) : 0;
    }
  }
  for (var y = 0, l = 0; l < e.length; l++) y += e[l].totalCount;
  for (var S = new Array(y), m = 0, l = 0; l < n; l++)
    for (var a = 0; a < e.length; a++) l < s[a].length && (S[m++] = s[a][l]);
  for (var l = 0; l < i; l++)
    for (var a = 0; a < e.length; a++) l < o[a].length && (S[m++] = o[a][l]);
  return S;
};
var Je = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8,
  },
  Yt = { L: 1, M: 0, Q: 3, H: 2 },
  zt = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  },
  ye = {
    PATTERN_POSITION_TABLE: [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170],
    ],
    G15: 1335,
    G18: 7973,
    G15_MASK: 21522,
    getBCHTypeInfo: function (t) {
      for (var e = t << 10; ye.getBCHDigit(e) - ye.getBCHDigit(ye.G15) >= 0; )
        e ^= ye.G15 << (ye.getBCHDigit(e) - ye.getBCHDigit(ye.G15));
      return ((t << 10) | e) ^ ye.G15_MASK;
    },
    getBCHTypeNumber: function (t) {
      for (var e = t << 12; ye.getBCHDigit(e) - ye.getBCHDigit(ye.G18) >= 0; )
        e ^= ye.G18 << (ye.getBCHDigit(e) - ye.getBCHDigit(ye.G18));
      return (t << 12) | e;
    },
    getBCHDigit: function (t) {
      for (var e = 0; t != 0; ) e++, (t >>>= 1);
      return e;
    },
    getPatternPosition: function (t) {
      return ye.PATTERN_POSITION_TABLE[t - 1];
    },
    getMask: function (t, e, r) {
      switch (t) {
        case zt.PATTERN000:
          return (e + r) % 2 == 0;
        case zt.PATTERN001:
          return e % 2 == 0;
        case zt.PATTERN010:
          return r % 3 == 0;
        case zt.PATTERN011:
          return (e + r) % 3 == 0;
        case zt.PATTERN100:
          return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
        case zt.PATTERN101:
          return ((e * r) % 2) + ((e * r) % 3) == 0;
        case zt.PATTERN110:
          return (((e * r) % 2) + ((e * r) % 3)) % 2 == 0;
        case zt.PATTERN111:
          return (((e * r) % 3) + ((e + r) % 2)) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + t);
      }
    },
    getErrorCorrectPolynomial: function (t) {
      for (var e = new Xr([1], 0), r = 0; r < t; r++)
        e = e.multiply(new Xr([1, Oe.gexp(r)], 0));
      return e;
    },
    getLengthInBits: function (t, e) {
      if (1 <= e && e < 10)
        switch (t) {
          case Je.MODE_NUMBER:
            return 10;
          case Je.MODE_ALPHA_NUM:
            return 9;
          case Je.MODE_8BIT_BYTE:
            return 8;
          case Je.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + t);
        }
      else if (e < 27)
        switch (t) {
          case Je.MODE_NUMBER:
            return 12;
          case Je.MODE_ALPHA_NUM:
            return 11;
          case Je.MODE_8BIT_BYTE:
            return 16;
          case Je.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + t);
        }
      else if (e < 41)
        switch (t) {
          case Je.MODE_NUMBER:
            return 14;
          case Je.MODE_ALPHA_NUM:
            return 13;
          case Je.MODE_8BIT_BYTE:
            return 16;
          case Je.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + t);
        }
      else throw new Error("type:" + e);
    },
    getLostPoint: function (t) {
      for (var e = t.getModuleCount(), r = 0, n = 0; n < e; n++)
        for (var i = 0; i < e; i++) {
          for (var s = 0, o = t.isDark(n, i), a = -1; a <= 1; a++)
            if (!(n + a < 0 || e <= n + a))
              for (var c = -1; c <= 1; c++)
                i + c < 0 ||
                  e <= i + c ||
                  (a == 0 && c == 0) ||
                  (o == t.isDark(n + a, i + c) && s++);
          s > 5 && (r += 3 + s - 5);
        }
      for (var n = 0; n < e - 1; n++)
        for (var i = 0; i < e - 1; i++) {
          var u = 0;
          t.isDark(n, i) && u++,
            t.isDark(n + 1, i) && u++,
            t.isDark(n, i + 1) && u++,
            t.isDark(n + 1, i + 1) && u++,
            (u == 0 || u == 4) && (r += 3);
        }
      for (var n = 0; n < e; n++)
        for (var i = 0; i < e - 6; i++)
          t.isDark(n, i) &&
            !t.isDark(n, i + 1) &&
            t.isDark(n, i + 2) &&
            t.isDark(n, i + 3) &&
            t.isDark(n, i + 4) &&
            !t.isDark(n, i + 5) &&
            t.isDark(n, i + 6) &&
            (r += 40);
      for (var i = 0; i < e; i++)
        for (var n = 0; n < e - 6; n++)
          t.isDark(n, i) &&
            !t.isDark(n + 1, i) &&
            t.isDark(n + 2, i) &&
            t.isDark(n + 3, i) &&
            t.isDark(n + 4, i) &&
            !t.isDark(n + 5, i) &&
            t.isDark(n + 6, i) &&
            (r += 40);
      for (var l = 0, i = 0; i < e; i++)
        for (var n = 0; n < e; n++) t.isDark(n, i) && l++;
      var f = Math.abs((100 * l) / e / e - 50) / 5;
      return (r += f * 10), r;
    },
  },
  Oe = {
    glog: function (t) {
      if (t < 1) throw new Error("glog(" + t + ")");
      return Oe.LOG_TABLE[t];
    },
    gexp: function (t) {
      for (; t < 0; ) t += 255;
      for (; t >= 256; ) t -= 255;
      return Oe.EXP_TABLE[t];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256),
  };
for (var Le = 0; Le < 8; Le++) Oe.EXP_TABLE[Le] = 1 << Le;
for (var Le = 8; Le < 256; Le++)
  Oe.EXP_TABLE[Le] =
    Oe.EXP_TABLE[Le - 4] ^
    Oe.EXP_TABLE[Le - 5] ^
    Oe.EXP_TABLE[Le - 6] ^
    Oe.EXP_TABLE[Le - 8];
for (var Le = 0; Le < 255; Le++) Oe.LOG_TABLE[Oe.EXP_TABLE[Le]] = Le;
function Xr(t, e) {
  if (t.length == null) throw new Error(t.length + "/" + e);
  for (var r = 0; r < t.length && t[r] == 0; ) r++;
  this.num = new Array(t.length - r + e);
  for (var n = 0; n < t.length - r; n++) this.num[n] = t[n + r];
}
Xr.prototype = {
  get: function (t) {
    return this.num[t];
  },
  getLength: function () {
    return this.num.length;
  },
  multiply: function (t) {
    for (
      var e = new Array(this.getLength() + t.getLength() - 1), r = 0;
      r < this.getLength();
      r++
    )
      for (var n = 0; n < t.getLength(); n++)
        e[r + n] ^= Oe.gexp(Oe.glog(this.get(r)) + Oe.glog(t.get(n)));
    return new Xr(e, 0);
  },
  mod: function (t) {
    if (this.getLength() - t.getLength() < 0) return this;
    for (
      var e = Oe.glog(this.get(0)) - Oe.glog(t.get(0)),
        r = new Array(this.getLength()),
        n = 0;
      n < this.getLength();
      n++
    )
      r[n] = this.get(n);
    for (var n = 0; n < t.getLength(); n++)
      r[n] ^= Oe.gexp(Oe.glog(t.get(n)) + e);
    return new Xr(r, 0).mod(t);
  },
};
function It(t, e) {
  (this.totalCount = t), (this.dataCount = e);
}
It.RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16],
];
It.getRSBlocks = function (t, e) {
  var r = It.getRsBlockTable(t, e);
  if (r == null)
    throw new Error(
      "bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e,
    );
  for (var n = r.length / 3, i = [], s = 0; s < n; s++)
    for (
      var o = r[s * 3 + 0], a = r[s * 3 + 1], c = r[s * 3 + 2], u = 0;
      u < o;
      u++
    )
      i.push(new It(a, c));
  return i;
};
It.getRsBlockTable = function (t, e) {
  switch (e) {
    case Yt.L:
      return It.RS_BLOCK_TABLE[(t - 1) * 4 + 0];
    case Yt.M:
      return It.RS_BLOCK_TABLE[(t - 1) * 4 + 1];
    case Yt.Q:
      return It.RS_BLOCK_TABLE[(t - 1) * 4 + 2];
    case Yt.H:
      return It.RS_BLOCK_TABLE[(t - 1) * 4 + 3];
    default:
      return;
  }
};
function t0() {
  (this.buffer = []), (this.length = 0);
}
t0.prototype = {
  get: function (t) {
    var e = Math.floor(t / 8);
    return ((this.buffer[e] >>> (7 - (t % 8))) & 1) == 1;
  },
  put: function (t, e) {
    for (var r = 0; r < e; r++) this.putBit(((t >>> (e - r - 1)) & 1) == 1);
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (t) {
    var e = Math.floor(this.length / 8);
    this.buffer.length <= e && this.buffer.push(0),
      t && (this.buffer[e] |= 128 >>> this.length % 8),
      this.length++;
  },
};
var Ga = [
  [17, 14, 11, 7],
  [32, 26, 20, 14],
  [53, 42, 32, 24],
  [78, 62, 46, 34],
  [106, 84, 60, 44],
  [134, 106, 74, 58],
  [154, 122, 86, 64],
  [192, 152, 108, 84],
  [230, 180, 130, 98],
  [271, 213, 151, 119],
  [321, 251, 177, 137],
  [367, 287, 203, 155],
  [425, 331, 241, 177],
  [458, 362, 258, 194],
  [520, 412, 292, 220],
  [586, 450, 322, 250],
  [644, 504, 364, 280],
  [718, 560, 394, 310],
  [792, 624, 442, 338],
  [858, 666, 482, 382],
  [929, 711, 509, 403],
  [1003, 779, 565, 439],
  [1091, 857, 611, 461],
  [1171, 911, 661, 511],
  [1273, 997, 715, 535],
  [1367, 1059, 751, 593],
  [1465, 1125, 805, 625],
  [1528, 1190, 868, 658],
  [1628, 1264, 908, 698],
  [1732, 1370, 982, 742],
  [1840, 1452, 1030, 790],
  [1952, 1538, 1112, 842],
  [2068, 1628, 1168, 898],
  [2188, 1722, 1228, 958],
  [2303, 1809, 1283, 983],
  [2431, 1911, 1351, 1051],
  [2563, 1989, 1423, 1093],
  [2699, 2099, 1499, 1139],
  [2809, 2213, 1579, 1219],
  [2953, 2331, 1663, 1273],
];
function r0(t) {
  if (
    ((this.options = {
      padding: 4,
      width: 256,
      height: 256,
      typeNumber: 4,
      color: "#000000",
      background: "#ffffff",
      ecl: "M",
      image: { svg: "", width: 0, height: 0 },
    }),
    typeof t == "string" && (t = { content: t }),
    t)
  )
    for (var e in t) this.options[e] = t[e];
  if (typeof this.options.content != "string")
    throw new Error("Expected 'content' as string!");
  if (this.options.content.length === 0)
    throw new Error("Expected 'content' to be non-empty!");
  if (!(this.options.padding >= 0))
    throw new Error("Expected 'padding' value to be non-negative!");
  if (!(this.options.width > 0) || !(this.options.height > 0))
    throw new Error(
      "Expected 'width' or 'height' value to be higher than zero!",
    );
  function r(c) {
    switch (c) {
      case "L":
        return Yt.L;
      case "M":
        return Yt.M;
      case "Q":
        return Yt.Q;
      case "H":
        return Yt.H;
      default:
        throw new Error("Unknwon error correction level: " + c);
    }
  }
  function n(c, u) {
    for (var l = i(c), f = 1, h = 0, b = 0, g = Ga.length; b <= g; b++) {
      var y = Ga[b];
      if (!y)
        throw new Error("Content too long: expected " + h + " but got " + l);
      switch (u) {
        case "L":
          h = y[0];
          break;
        case "M":
          h = y[1];
          break;
        case "Q":
          h = y[2];
          break;
        case "H":
          h = y[3];
          break;
        default:
          throw new Error("Unknwon error correction level: " + u);
      }
      if (l <= h) break;
      f++;
    }
    if (f > Ga.length) throw new Error("Content too long");
    return f;
  }
  function i(c) {
    var u = encodeURI(c)
      .toString()
      .replace(/\%[0-9a-fA-F]{2}/g, "a");
    return u.length + (u.length != c ? 3 : 0);
  }
  var s = this.options.content,
    o = n(s, this.options.ecl),
    a = r(this.options.ecl);
  (this.qrcode = new kt(o, a)), this.qrcode.addData(s), this.qrcode.make();
}
r0.prototype.svg = function (t) {
  var e = this.options || {},
    r = this.qrcode.modules;
  typeof t > "u" && (t = { container: e.container || "svg" });
  for (
    var n = typeof e.pretty < "u" ? !!e.pretty : !0,
      i = n ? "  " : "",
      s = n
        ? `\r
`
        : "",
      o = e.width,
      a = e.height,
      c = r.length,
      u = o / (c + 2 * e.padding),
      l = a / (c + 2 * e.padding),
      f = typeof e.join < "u" ? !!e.join : !1,
      h = typeof e.swap < "u" ? !!e.swap : !1,
      b = typeof e.xmlDeclaration < "u" ? !!e.xmlDeclaration : !0,
      g = typeof e.predefined < "u" ? !!e.predefined : !1,
      y = g
        ? i +
          '<defs><path id="qrmodule" d="M0 0 h' +
          l +
          " v" +
          u +
          ' H0 z" style="fill:' +
          e.color +
          ';shape-rendering:crispEdges;" /></defs>' +
          s
        : "",
      S =
        i +
        '<rect x="0" y="0" width="' +
        o +
        '" height="' +
        a +
        '" style="fill:' +
        e.background +
        ';shape-rendering:crispEdges;"/>' +
        s,
      m = "",
      v = "",
      E = 0;
    E < c;
    E++
  )
    for (var R = 0; R < c; R++) {
      var C = r[R][E];
      if (C) {
        var I = R * u + e.padding * u,
          $ = E * l + e.padding * l;
        if (h) {
          var L = I;
          (I = $), ($ = L);
        }
        if (f) {
          var x = u + I,
            W = l + $;
          (I = Number.isInteger(I) ? Number(I) : I.toFixed(2)),
            ($ = Number.isInteger($) ? Number($) : $.toFixed(2)),
            (x = Number.isInteger(x) ? Number(x) : x.toFixed(2)),
            (W = Number.isInteger(W) ? Number(W) : W.toFixed(2)),
            (v +=
              "M" +
              I +
              "," +
              $ +
              " V" +
              W +
              " H" +
              x +
              " V" +
              $ +
              " H" +
              I +
              " Z ");
        } else
          g
            ? (m +=
                i +
                '<use x="' +
                I.toString() +
                '" y="' +
                $.toString() +
                '" href="#qrmodule" />' +
                s)
            : (m +=
                i +
                '<rect x="' +
                I.toString() +
                '" y="' +
                $.toString() +
                '" width="' +
                u +
                '" height="' +
                l +
                '" style="fill:' +
                e.color +
                ';shape-rendering:crispEdges;"/>' +
                s);
      }
    }
  f &&
    (m =
      i +
      '<path x="0" y="0" style="fill:' +
      e.color +
      ';shape-rendering:crispEdges;" d="' +
      v +
      '" />');
  let se = "";
  if (this.options.image !== void 0 && this.options.image.svg) {
    const T = (o * this.options.image.width) / 100,
      k = (a * this.options.image.height) / 100,
      N = o / 2 - T / 2,
      P = a / 2 - k / 2;
    (se += `<svg x="${N}" y="${P}" width="${T}" height="${k}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`),
      (se += this.options.image.svg + s),
      (se += "</svg>");
  }
  var K = "";
  switch (t.container) {
    case "svg":
      b && (K += '<?xml version="1.0" standalone="yes"?>' + s),
        (K +=
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' +
          o +
          '" height="' +
          a +
          '">' +
          s),
        (K += y + S + m),
        (K += se),
        (K += "</svg>");
      break;
    case "svg-viewbox":
      b && (K += '<?xml version="1.0" standalone="yes"?>' + s),
        (K +=
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' +
          o +
          " " +
          a +
          '">' +
          s),
        (K += y + S + m),
        (K += se),
        (K += "</svg>");
      break;
    case "g":
      (K += '<g width="' + o + '" height="' + a + '">' + s),
        (K += y + S + m),
        (K += se),
        (K += "</g>");
      break;
    default:
      K += (y + S + m + se).replace(/^\s+/, "");
      break;
  }
  return K;
};
var T4 = r0,
  k4 =
    (F && F.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Zs, "__esModule", { value: !0 });
Zs.QRCode = void 0;
const O4 = Ke,
  eh = Ci,
  M4 = k4(T4),
  N4 = (t) => {
    const [e, r] = (0, eh.useState)("");
    return (
      (0, eh.useEffect)(() => {
        var n, i;
        const s = new M4.default({
            content: t.content,
            background: t.bgColor || "#ffffff",
            color: t.fgColor || "#000000",
            container: "svg",
            ecl: "M",
            width: (n = t.width) !== null && n !== void 0 ? n : 256,
            height: (i = t.height) !== null && i !== void 0 ? i : 256,
            padding: 0,
            image: t.image,
          }),
          o = Buffer.from(s.svg(), "utf8").toString("base64");
        r(`data:image/svg+xml;base64,${o}`);
      }),
      e ? (0, O4.h)("img", { src: e, alt: "QR Code" }) : null
    );
  };
Zs.QRCode = N4;
var Qs = {},
  Lu = {};
Object.defineProperty(Lu, "__esModule", { value: !0 });
Lu.default =
  ".-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}";
var j4 =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Qs, "__esModule", { value: !0 });
Qs.Spinner = void 0;
const Bi = Ke,
  L4 = j4(Lu),
  P4 = (t) => {
    var e;
    const r = (e = t.size) !== null && e !== void 0 ? e : 64,
      n = t.color || "#000";
    return (0, Bi.h)(
      "div",
      { class: "-cbwsdk-spinner" },
      (0, Bi.h)("style", null, L4.default),
      (0, Bi.h)(
        "svg",
        {
          viewBox: "0 0 100 100",
          xmlns: "http://www.w3.org/2000/svg",
          style: { width: r, height: r },
        },
        (0, Bi.h)("circle", { style: { cx: 50, cy: 50, r: 45, stroke: n } }),
      ),
    );
  };
Qs.Spinner = P4;
var Pu = {};
Object.defineProperty(Pu, "__esModule", { value: !0 });
Pu.default =
  ".-cbwsdk-css-reset .-cbwsdk-connect-content{height:430px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-connect-content.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-header{display:flex;align-items:center;justify-content:space-between;margin:0 0 30px}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading{font-style:normal;font-weight:500;font-size:28px;line-height:36px;margin:0}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-layout{display:flex;flex-direction:row}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-left{margin-right:30px;display:flex;flex-direction:column;justify-content:space-between}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-right{flex:25%;margin-right:34px}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-wrapper{width:220px;height:220px;border-radius:12px;display:flex;justify-content:center;align-items:center;background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light>p{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark{background-color:rgba(10,11,13,.9)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app{border-radius:8px;font-size:14px;line-height:20px;padding:12px;width:339px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.light{background:#eef0f3;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.dark{background:#1e2025;color:#8a919e}.-cbwsdk-css-reset .-cbwsdk-cancel-button{-webkit-appearance:none;border:none;background:none;cursor:pointer;padding:0;margin:0}.-cbwsdk-css-reset .-cbwsdk-cancel-button-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-wallet-steps{padding:0 0 0 16px;margin:0;width:100%;list-style:decimal}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item{list-style-type:decimal;display:list-item;font-style:normal;font-weight:400;font-size:16px;line-height:24px;margin-top:20px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item-wrapper{display:flex;align-items:center}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-pad-left{margin-left:6px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon{display:flex;border-radius:50%;height:24px;width:24px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.light{background:#0052ff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.dark{background:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item{align-items:center;display:flex;flex-direction:row;padding:16px 24px;gap:12px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-connect-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-item.light.selected{background:#f5f8ff;color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark.selected{background:#001033;color:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item.selected{border-radius:100px;font-weight:600}.-cbwsdk-css-reset .-cbwsdk-connect-item-copy-wrapper{margin:0 4px 0 8px}.-cbwsdk-css-reset .-cbwsdk-connect-item-title{margin:0 0 0;font-size:16px;line-height:24px;font-weight:500}.-cbwsdk-css-reset .-cbwsdk-connect-item-description{font-weight:400;font-size:14px;line-height:20px;margin:0}";
var xn =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.CoinbaseAppSteps =
  Tt.CoinbaseWalletSteps =
  Tt.ConnectItem =
  Tt.ConnectContent =
    void 0;
const nt = xn(zs),
  G = Ke,
  th = Ci,
  D4 = H,
  $4 = oi,
  B4 = Gs,
  F4 = xn(Ou),
  U4 = xn(Mu),
  n0 = qs,
  H4 = xn(Nu),
  V4 = xn(ju),
  W4 = Js,
  z4 = Zs,
  G4 = Qs,
  q4 = xn(Pu),
  rh = {
    "coinbase-wallet-app": {
      title: "Coinbase Wallet app",
      description: "Connect with your self-custody wallet",
      icon: U4.default,
      steps: s0,
    },
    "coinbase-app": {
      title: "Coinbase app",
      description: "Connect with your Coinbase account",
      icon: F4.default,
      steps: o0,
    },
  },
  J4 = (t) => {
    switch (t) {
      case "coinbase-app":
        return H4.default;
      case "coinbase-wallet-app":
      default:
        return V4.default;
    }
  },
  xc = (t) => (t === "light" ? "#FFFFFF" : "#0A0B0D");
function Z4(t) {
  const { theme: e } = t,
    [r, n] = (0, th.useState)("coinbase-wallet-app"),
    i = (0, th.useCallback)((u) => {
      n(u);
    }, []),
    s = (0, D4.createQrUrl)(
      t.sessionId,
      t.sessionSecret,
      t.linkAPIUrl,
      t.isParentConnection,
      t.version,
      t.chainId,
    ),
    o = rh[r];
  if (!r) return null;
  const a = o.steps,
    c = r === "coinbase-app";
  return (0, G.h)(
    "div",
    {
      "data-testid": "connect-content",
      class: (0, nt.default)("-cbwsdk-connect-content", e),
    },
    (0, G.h)("style", null, q4.default),
    (0, G.h)(
      "div",
      { class: "-cbwsdk-connect-content-header" },
      (0, G.h)(
        "h2",
        { class: (0, nt.default)("-cbwsdk-connect-content-heading", e) },
        "Scan to connect with one of our mobile apps",
      ),
      t.onCancel &&
        (0, G.h)(
          "button",
          {
            type: "button",
            class: "-cbwsdk-cancel-button",
            onClick: t.onCancel,
          },
          (0, G.h)(B4.CloseIcon, {
            fill: e === "light" ? "#0A0B0D" : "#FFFFFF",
          }),
        ),
    ),
    (0, G.h)(
      "div",
      { class: "-cbwsdk-connect-content-layout" },
      (0, G.h)(
        "div",
        { class: "-cbwsdk-connect-content-column-left" },
        (0, G.h)(
          "div",
          null,
          Object.entries(rh).map(([u, l]) =>
            (0, G.h)(i0, {
              key: u,
              title: l.title,
              description: l.description,
              icon: l.icon,
              selected: r === u,
              onClick: () => i(u),
              theme: e,
            }),
          ),
        ),
        c &&
          (0, G.h)(
            "div",
            { class: (0, nt.default)("-cbwsdk-connect-content-update-app", e) },
            "Don’t see a ",
            (0, G.h)("strong", null, "Scan"),
            " option? Update your Coinbase app to the latest version and try again.",
          ),
      ),
      (0, G.h)(
        "div",
        { class: "-cbwsdk-connect-content-column-right" },
        (0, G.h)(
          "div",
          { class: "-cbwsdk-connect-content-qr-wrapper" },
          (0, G.h)(z4.QRCode, {
            content: s,
            width: 200,
            height: 200,
            fgColor: "#000",
            bgColor: "transparent",
            image: { svg: J4(r), width: 25, height: 25 },
          }),
          (0, G.h)("input", {
            type: "hidden",
            name: "cbw-cbwsdk-version",
            value: $4.LIB_VERSION,
          }),
          (0, G.h)("input", { type: "hidden", value: s }),
        ),
        (0, G.h)(a, { theme: e }),
        !t.isConnected &&
          (0, G.h)(
            "div",
            {
              "data-testid": "connecting-spinner",
              class: (0, nt.default)(
                "-cbwsdk-connect-content-qr-connecting",
                e,
              ),
            },
            (0, G.h)(G4.Spinner, {
              size: 36,
              color: e === "dark" ? "#FFF" : "#000",
            }),
            (0, G.h)("p", null, "Connecting..."),
          ),
      ),
    ),
  );
}
Tt.ConnectContent = Z4;
function i0({
  title: t,
  description: e,
  icon: r,
  selected: n,
  theme: i,
  onClick: s,
}) {
  return (0, G.h)(
    "div",
    {
      onClick: s,
      class: (0, nt.default)("-cbwsdk-connect-item", i, { selected: n }),
    },
    (0, G.h)("div", null, (0, G.h)("img", { src: r, alt: t })),
    (0, G.h)(
      "div",
      { class: "-cbwsdk-connect-item-copy-wrapper" },
      (0, G.h)("h3", { class: "-cbwsdk-connect-item-title" }, t),
      (0, G.h)("p", { class: "-cbwsdk-connect-item-description" }, e),
    ),
  );
}
Tt.ConnectItem = i0;
function s0({ theme: t }) {
  return (0, G.h)(
    "ol",
    { class: "-cbwsdk-wallet-steps" },
    (0, G.h)(
      "li",
      { class: (0, nt.default)("-cbwsdk-wallet-steps-item", t) },
      (0, G.h)(
        "div",
        { class: "-cbwsdk-wallet-steps-item-wrapper" },
        "Open Coinbase Wallet app",
      ),
    ),
    (0, G.h)(
      "li",
      { class: (0, nt.default)("-cbwsdk-wallet-steps-item", t) },
      (0, G.h)(
        "div",
        { class: "-cbwsdk-wallet-steps-item-wrapper" },
        (0, G.h)("span", null, "Tap ", (0, G.h)("strong", null, "Scan"), " "),
        (0, G.h)(
          "span",
          {
            class: (0, nt.default)(
              "-cbwsdk-wallet-steps-pad-left",
              "-cbwsdk-wallet-steps-icon",
              t,
            ),
          },
          (0, G.h)(n0.QRCodeIcon, { fill: xc(t) }),
        ),
      ),
    ),
  );
}
Tt.CoinbaseWalletSteps = s0;
function o0({ theme: t }) {
  return (0, G.h)(
    "ol",
    { class: "-cbwsdk-wallet-steps" },
    (0, G.h)(
      "li",
      { class: (0, nt.default)("-cbwsdk-wallet-steps-item", t) },
      (0, G.h)(
        "div",
        { class: "-cbwsdk-wallet-steps-item-wrapper" },
        "Open Coinbase app",
      ),
    ),
    (0, G.h)(
      "li",
      { class: (0, nt.default)("-cbwsdk-wallet-steps-item", t) },
      (0, G.h)(
        "div",
        { class: "-cbwsdk-wallet-steps-item-wrapper" },
        (0, G.h)("span", null, "Tap ", (0, G.h)("strong", null, "More")),
        (0, G.h)(
          "span",
          {
            class: (0, nt.default)(
              "-cbwsdk-wallet-steps-pad-left",
              "-cbwsdk-wallet-steps-icon",
              t,
            ),
          },
          (0, G.h)(W4.StatusDotIcon, { fill: xc(t) }),
        ),
        (0, G.h)(
          "span",
          { class: "-cbwsdk-wallet-steps-pad-left" },
          "then ",
          (0, G.h)("strong", null, "Scan"),
        ),
        (0, G.h)(
          "span",
          {
            class: (0, nt.default)(
              "-cbwsdk-wallet-steps-pad-left",
              "-cbwsdk-wallet-steps-icon",
              t,
            ),
          },
          (0, G.h)(n0.QRCodeIcon, { fill: xc(t) }),
        ),
      ),
    ),
  );
}
Tt.CoinbaseAppSteps = o0;
var Ks = {},
  Ys = {};
Object.defineProperty(Ys, "__esModule", { value: !0 });
Ys.ArrowLeftIcon = void 0;
const nh = Ke;
function Q4(t) {
  return (0, nh.h)(
    "svg",
    Object.assign(
      {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
      },
      t,
    ),
    (0, nh.h)("path", {
      d: "M8.60675 0.155884L7.37816 1.28209L12.7723 7.16662H0V8.83328H12.6548L6.82149 14.6666L8 15.8451L15.8201 8.02501L8.60675 0.155884Z",
    }),
  );
}
Ys.ArrowLeftIcon = Q4;
var Xs = {};
Object.defineProperty(Xs, "__esModule", { value: !0 });
Xs.LaptopIcon = void 0;
const qa = Ke;
function K4(t) {
  return (0, qa.h)(
    "svg",
    Object.assign(
      {
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        xmlns: "http://www.w3.org/2000/svg",
      },
      t,
    ),
    (0, qa.h)("path", {
      d: "M1.8001 2.2002H12.2001V9.40019H1.8001V2.2002ZM3.4001 3.8002V7.80019H10.6001V3.8002H3.4001Z",
    }),
    (0, qa.h)("path", {
      d: "M13.4001 10.2002H0.600098C0.600098 11.0838 1.31644 11.8002 2.2001 11.8002H11.8001C12.6838 11.8002 13.4001 11.0838 13.4001 10.2002Z",
    }),
  );
}
Xs.LaptopIcon = K4;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
eo.SafeIcon = void 0;
const ih = Ke;
function Y4(t) {
  return (0, ih.h)(
    "svg",
    Object.assign(
      {
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        xmlns: "http://www.w3.org/2000/svg",
      },
      t,
    ),
    (0, ih.h)("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M0.600098 0.600098V11.8001H13.4001V0.600098H0.600098ZM7.0001 9.2001C5.3441 9.2001 4.0001 7.8561 4.0001 6.2001C4.0001 4.5441 5.3441 3.2001 7.0001 3.2001C8.6561 3.2001 10.0001 4.5441 10.0001 6.2001C10.0001 7.8561 8.6561 9.2001 7.0001 9.2001ZM0.600098 12.6001H3.8001V13.4001H0.600098V12.6001ZM10.2001 12.6001H13.4001V13.4001H10.2001V12.6001ZM8.8001 6.2001C8.8001 7.19421 7.99421 8.0001 7.0001 8.0001C6.00598 8.0001 5.2001 7.19421 5.2001 6.2001C5.2001 5.20598 6.00598 4.4001 7.0001 4.4001C7.99421 4.4001 8.8001 5.20598 8.8001 6.2001Z",
    }),
  );
}
eo.SafeIcon = Y4;
var Du = {};
Object.defineProperty(Du, "__esModule", { value: !0 });
Du.default =
  ".-cbwsdk-css-reset .-cbwsdk-try-extension{display:flex;margin-top:12px;height:202px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-try-extension.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-column-half{flex:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading{font-style:normal;font-weight:500;font-size:25px;line-height:32px;margin:0;max-width:204px}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta{appearance:none;border:none;background:none;color:#0052ff;cursor:pointer;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.light{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.dark{color:#588af5}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-wrapper{display:flex;align-items:center;margin-top:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-icon{display:block;margin-left:4px;height:14px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0;padding:0;list-style:none;height:100%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item{display:flex;align-items:center;flex-flow:nowrap;margin-top:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item:first-of-type{margin-top:0}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon-wrapper{display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon{display:flex;height:32px;width:32px;border-radius:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.light{background:#eef0f3}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.dark{background:#1e2025}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy{display:block;font-weight:400;font-size:14px;line-height:20px;padding-left:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.light{color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.dark{color:#8a919e}";
var a0 =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Ks, "__esModule", { value: !0 });
Ks.TryExtensionContent = void 0;
const ar = a0(zs),
  Re = Ke,
  Ja = Ci,
  X4 = Ys,
  eC = Xs,
  tC = eo,
  rC = a0(Du);
function nC({ theme: t }) {
  const [e, r] = (0, Ja.useState)(!1),
    n = (0, Ja.useCallback)(() => {
      window.open(
        "https://api.wallet.coinbase.com/rpc/v2/desktop/chrome",
        "_blank",
      );
    }, []),
    i = (0, Ja.useCallback)(() => {
      e ? window.location.reload() : (n(), r(!0));
    }, [n, e]);
  return (0, Re.h)(
    "div",
    { class: (0, ar.default)("-cbwsdk-try-extension", t) },
    (0, Re.h)("style", null, rC.default),
    (0, Re.h)(
      "div",
      { class: "-cbwsdk-try-extension-column-half" },
      (0, Re.h)(
        "h3",
        { class: (0, ar.default)("-cbwsdk-try-extension-heading", t) },
        "Or try the Coinbase Wallet browser extension",
      ),
      (0, Re.h)(
        "div",
        { class: "-cbwsdk-try-extension-cta-wrapper" },
        (0, Re.h)(
          "button",
          {
            class: (0, ar.default)("-cbwsdk-try-extension-cta", t),
            onClick: i,
          },
          e ? "Refresh" : "Install",
        ),
        (0, Re.h)(
          "div",
          null,
          !e &&
            (0, Re.h)(X4.ArrowLeftIcon, {
              class: "-cbwsdk-try-extension-cta-icon",
              fill: t === "light" ? "#0052FF" : "#588AF5",
            }),
        ),
      ),
    ),
    (0, Re.h)(
      "div",
      { class: "-cbwsdk-try-extension-column-half" },
      (0, Re.h)(
        "ul",
        { class: "-cbwsdk-try-extension-list" },
        (0, Re.h)(
          "li",
          { class: "-cbwsdk-try-extension-list-item" },
          (0, Re.h)(
            "div",
            { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
            (0, Re.h)(
              "span",
              {
                class: (0, ar.default)(
                  "-cbwsdk-try-extension-list-item-icon",
                  t,
                ),
              },
              (0, Re.h)(eC.LaptopIcon, {
                fill: t === "light" ? "#0A0B0D" : "#FFFFFF",
              }),
            ),
          ),
          (0, Re.h)(
            "div",
            {
              class: (0, ar.default)("-cbwsdk-try-extension-list-item-copy", t),
            },
            "Connect with dapps with just one click on your desktop browser",
          ),
        ),
        (0, Re.h)(
          "li",
          { class: "-cbwsdk-try-extension-list-item" },
          (0, Re.h)(
            "div",
            { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
            (0, Re.h)(
              "span",
              {
                class: (0, ar.default)(
                  "-cbwsdk-try-extension-list-item-icon",
                  t,
                ),
              },
              (0, Re.h)(tC.SafeIcon, {
                fill: t === "light" ? "#0A0B0D" : "#FFFFFF",
              }),
            ),
          ),
          (0, Re.h)(
            "div",
            {
              class: (0, ar.default)("-cbwsdk-try-extension-list-item-copy", t),
            },
            "Add an additional layer of security by using a supported Ledger hardware wallet",
          ),
        ),
      ),
    ),
  );
}
Ks.TryExtensionContent = nC;
var $u = {};
Object.defineProperty($u, "__esModule", { value: !0 });
$u.default =
  ".-cbwsdk-css-reset .-cbwsdk-connect-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box{display:flex;position:relative;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container-hidden{display:none}";
var c0 =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Ws, "__esModule", { value: !0 });
Ws.ConnectDialog = void 0;
const Za = c0(zs),
  cr = Ke,
  Qa = Ci,
  iC = Tt,
  sC = Ks,
  oC = c0($u),
  aC = (t) => {
    const { isOpen: e, darkMode: r } = t,
      [n, i] = (0, Qa.useState)(!e),
      [s, o] = (0, Qa.useState)(!e);
    (0, Qa.useEffect)(() => {
      const c = [
        window.setTimeout(() => {
          o(!e);
        }, 10),
      ];
      return (
        e
          ? i(!1)
          : c.push(
              window.setTimeout(() => {
                i(!0);
              }, 360),
            ),
        () => {
          c.forEach(window.clearTimeout);
        }
      );
    }, [t.isOpen]);
    const a = r ? "dark" : "light";
    return (0, cr.h)(
      "div",
      {
        class: (0, Za.default)(
          "-cbwsdk-connect-dialog-container",
          n && "-cbwsdk-connect-dialog-container-hidden",
        ),
      },
      (0, cr.h)("style", null, oC.default),
      (0, cr.h)("div", {
        class: (0, Za.default)(
          "-cbwsdk-connect-dialog-backdrop",
          a,
          s && "-cbwsdk-connect-dialog-backdrop-hidden",
        ),
      }),
      (0, cr.h)(
        "div",
        { class: "-cbwsdk-connect-dialog" },
        (0, cr.h)(
          "div",
          {
            class: (0, Za.default)(
              "-cbwsdk-connect-dialog-box",
              s && "-cbwsdk-connect-dialog-box-hidden",
            ),
          },
          t.connectDisabled
            ? null
            : (0, cr.h)(iC.ConnectContent, {
                theme: a,
                version: t.version,
                sessionId: t.sessionId,
                sessionSecret: t.sessionSecret,
                linkAPIUrl: t.linkAPIUrl,
                isConnected: t.isConnected,
                isParentConnection: t.isParentConnection,
                chainId: t.chainId,
                onCancel: t.onCancel,
              }),
          (0, cr.h)(sC.TryExtensionContent, { theme: a }),
        ),
      ),
    );
  };
Ws.ConnectDialog = aC;
Object.defineProperty(Fs, "__esModule", { value: !0 });
Fs.LinkFlow = void 0;
const Ka = Ke,
  sh = Vs,
  cC = Ws;
class uC {
  constructor(e) {
    (this.extensionUI$ = new sh.BehaviorSubject({})),
      (this.subscriptions = new sh.Subscription()),
      (this.isConnected = !1),
      (this.chainId = 1),
      (this.isOpen = !1),
      (this.onCancel = null),
      (this.root = null),
      (this.connectDisabled = !1),
      (this.darkMode = e.darkMode),
      (this.version = e.version),
      (this.sessionId = e.sessionId),
      (this.sessionSecret = e.sessionSecret),
      (this.linkAPIUrl = e.linkAPIUrl),
      (this.isParentConnection = e.isParentConnection),
      (this.connected$ = e.connected$),
      (this.chainId$ = e.chainId$);
  }
  attach(e) {
    (this.root = document.createElement("div")),
      (this.root.className = "-cbwsdk-link-flow-root"),
      e.appendChild(this.root),
      this.render(),
      this.subscriptions.add(
        this.connected$.subscribe((r) => {
          this.isConnected !== r && ((this.isConnected = r), this.render());
        }),
      ),
      this.subscriptions.add(
        this.chainId$.subscribe((r) => {
          this.chainId !== r && ((this.chainId = r), this.render());
        }),
      );
  }
  detach() {
    var e;
    this.root &&
      (this.subscriptions.unsubscribe(),
      (0, Ka.render)(null, this.root),
      (e = this.root.parentElement) === null ||
        e === void 0 ||
        e.removeChild(this.root));
  }
  setConnectDisabled(e) {
    this.connectDisabled = e;
  }
  open(e) {
    (this.isOpen = !0), (this.onCancel = e.onCancel), this.render();
  }
  close() {
    (this.isOpen = !1), (this.onCancel = null), this.render();
  }
  render() {
    if (!this.root) return;
    const e = this.extensionUI$.subscribe(() => {
      this.root &&
        (0, Ka.render)(
          (0, Ka.h)(cC.ConnectDialog, {
            darkMode: this.darkMode,
            version: this.version,
            sessionId: this.sessionId,
            sessionSecret: this.sessionSecret,
            linkAPIUrl: this.linkAPIUrl,
            isOpen: this.isOpen,
            isConnected: this.isConnected,
            isParentConnection: this.isParentConnection,
            chainId: this.chainId,
            onCancel: this.onCancel,
            connectDisabled: this.connectDisabled,
          }),
          this.root,
        );
    });
    this.subscriptions.add(e);
  }
}
Fs.LinkFlow = uC;
var u0 = {},
  Bu = {};
Object.defineProperty(Bu, "__esModule", { value: !0 });
Bu.default =
  ".-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}";
(function (t) {
  var e =
    (F && F.__importDefault) ||
    function (f) {
      return f && f.__esModule ? f : { default: f };
    };
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.SnackbarInstance = t.SnackbarContainer = t.Snackbar = void 0);
  const r = e(zs),
    n = Ke,
    i = Ci,
    s = e(Bu),
    o =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=";
  function a(f) {
    switch (f) {
      case "coinbase-app":
        return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjY3NCAxOC44NThjLTIuMDQ1IDAtMy42NDgtMS43MjItMy42NDgtMy44NDVzMS42NTktMy44NDUgMy42NDgtMy44NDVjMS44MjQgMCAzLjMxNyAxLjM3NyAzLjU5MyAzLjIxNGgzLjcwM2MtLjMzMS0zLjk2LTMuNDgyLTcuMDU5LTcuMjk2LTcuMDU5LTQuMDM0IDAtNy4zNSAzLjQ0My03LjM1IDcuNjkgMCA0LjI0NiAzLjI2IDcuNjkgNy4zNSA3LjY5IDMuODcgMCA2Ljk2NS0zLjEgNy4yOTYtNy4wNTloLTMuNzAzYy0uMjc2IDEuODM2LTEuNzY5IDMuMjE0LTMuNTkzIDMuMjE0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDEwLjY3OGMwLTMuNzExIDAtNS41OTYuNzQyLTcuMDIzQTYuNTMyIDYuNTMyIDAgMCAxIDMuNjU1Ljc0MkM1LjA4MiAwIDYuOTY3IDAgMTAuNjc4IDBoNy45MzhjMy43MTEgMCA1LjU5NiAwIDcuMDIzLjc0MmE2LjUzMSA2LjUzMSAwIDAgMSAyLjkxMyAyLjkxM2MuNzQyIDEuNDI3Ljc0MiAzLjMxMi43NDIgNy4wMjN2Ny45MzhjMCAzLjcxMSAwIDUuNTk2LS43NDIgNy4wMjNhNi41MzEgNi41MzEgMCAwIDEtMi45MTMgMi45MTNjLTEuNDI3Ljc0Mi0zLjMxMi43NDItNy4wMjMuNzQyaC03LjkzOGMtMy43MTEgMC01LjU5NiAwLTcuMDIzLS43NDJhNi41MzEgNi41MzEgMCAwIDEtMi45MTMtMi45MTNDMCAyNC4yMTIgMCAyMi4zODQgMCAxOC42MTZ2LTcuOTM4WiIgZmlsbD0iIzAwNTJGRiIvPjxwYXRoIGQ9Ik0xNC42ODQgMTkuNzczYy0yLjcyNyAwLTQuODY0LTIuMjk1LTQuODY0LTUuMTI2IDAtMi44MzEgMi4yMS01LjEyNyA0Ljg2NC01LjEyNyAyLjQzMiAwIDQuNDIyIDEuODM3IDQuNzkgNC4yODVoNC45MzhjLS40NDItNS4yOC00LjY0My05LjQxMS05LjcyOC05LjQxMS01LjM4IDAtOS44MDIgNC41OS05LjgwMiAxMC4yNTMgMCA1LjY2MiA0LjM0OCAxMC4yNTMgOS44MDIgMTAuMjUzIDUuMTU5IDAgOS4yODYtNC4xMzIgOS43MjgtOS40MTFoLTQuOTM4Yy0uMzY4IDIuNDQ4LTIuMzU4IDQuMjg0LTQuNzkgNC4yODRaIiBmaWxsPSIjZmZmIi8+PC9zdmc+";
      case "coinbase-wallet-app":
      default:
        return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+";
    }
  }
  class c {
    constructor(h) {
      (this.items = new Map()),
        (this.nextItemKey = 0),
        (this.root = null),
        (this.darkMode = h.darkMode);
    }
    attach(h) {
      (this.root = document.createElement("div")),
        (this.root.className = "-cbwsdk-snackbar-root"),
        h.appendChild(this.root),
        this.render();
    }
    presentItem(h) {
      const b = this.nextItemKey++;
      return (
        this.items.set(b, h),
        this.render(),
        () => {
          this.items.delete(b), this.render();
        }
      );
    }
    clear() {
      this.items.clear(), this.render();
    }
    render() {
      this.root &&
        (0, n.render)(
          (0, n.h)(
            "div",
            null,
            (0, n.h)(
              t.SnackbarContainer,
              { darkMode: this.darkMode },
              Array.from(this.items.entries()).map(([h, b]) =>
                (0, n.h)(t.SnackbarInstance, Object.assign({}, b, { key: h })),
              ),
            ),
          ),
          this.root,
        );
    }
  }
  t.Snackbar = c;
  const u = (f) =>
    (0, n.h)(
      "div",
      { class: (0, r.default)("-cbwsdk-snackbar-container") },
      (0, n.h)("style", null, s.default),
      (0, n.h)("div", { class: "-cbwsdk-snackbar" }, f.children),
    );
  t.SnackbarContainer = u;
  const l = ({ autoExpand: f, message: h, menuItems: b, appSrc: g }) => {
    const [y, S] = (0, i.useState)(!0),
      [m, v] = (0, i.useState)(f ?? !1);
    (0, i.useEffect)(() => {
      const R = [
        window.setTimeout(() => {
          S(!1);
        }, 1),
        window.setTimeout(() => {
          v(!0);
        }, 1e4),
      ];
      return () => {
        R.forEach(window.clearTimeout);
      };
    });
    const E = () => {
      v(!m);
    };
    return (0, n.h)(
      "div",
      {
        class: (0, r.default)(
          "-cbwsdk-snackbar-instance",
          y && "-cbwsdk-snackbar-instance-hidden",
          m && "-cbwsdk-snackbar-instance-expanded",
        ),
      },
      (0, n.h)(
        "div",
        { class: "-cbwsdk-snackbar-instance-header", onClick: E },
        (0, n.h)("img", {
          src: a(g),
          class: "-cbwsdk-snackbar-instance-header-cblogo",
        }),
        (0, n.h)(
          "div",
          { class: "-cbwsdk-snackbar-instance-header-message" },
          h,
        ),
        (0, n.h)(
          "div",
          { class: "-gear-container" },
          !m &&
            (0, n.h)(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              (0, n.h)("circle", {
                cx: "12",
                cy: "12",
                r: "12",
                fill: "#F5F7F8",
              }),
            ),
          (0, n.h)("img", { src: o, class: "-gear-icon", title: "Expand" }),
        ),
      ),
      b &&
        b.length > 0 &&
        (0, n.h)(
          "div",
          { class: "-cbwsdk-snackbar-instance-menu" },
          b.map((R, C) =>
            (0, n.h)(
              "div",
              {
                class: (0, r.default)(
                  "-cbwsdk-snackbar-instance-menu-item",
                  R.isRed && "-cbwsdk-snackbar-instance-menu-item-is-red",
                ),
                onClick: R.onClick,
                key: C,
              },
              (0, n.h)(
                "svg",
                {
                  width: R.svgWidth,
                  height: R.svgHeight,
                  viewBox: "0 0 10 11",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
                (0, n.h)("path", {
                  "fill-rule": R.defaultFillRule,
                  "clip-rule": R.defaultClipRule,
                  d: R.path,
                  fill: "#AAAAAA",
                }),
              ),
              (0, n.h)(
                "span",
                {
                  class: (0, r.default)(
                    "-cbwsdk-snackbar-instance-menu-item-info",
                    R.isRed &&
                      "-cbwsdk-snackbar-instance-menu-item-info-is-red",
                  ),
                },
                R.info,
              ),
            ),
          ),
        ),
    );
  };
  t.SnackbarInstance = l;
})(u0);
var to = {},
  Fu = {};
Object.defineProperty(Fu, "__esModule", { value: !0 });
Fu.default =
  '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}';
var lC =
  (F && F.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(to, "__esModule", { value: !0 });
to.injectCssReset = void 0;
const fC = lC(Fu);
function hC() {
  const t = document.createElement("style");
  (t.type = "text/css"),
    t.appendChild(document.createTextNode(fC.default)),
    document.documentElement.appendChild(t);
}
to.injectCssReset = hC;
Object.defineProperty(Bs, "__esModule", { value: !0 });
Bs.WalletSDKUI = void 0;
const dC = Fs,
  pC = u0,
  bC = to;
class gC {
  constructor(e) {
    (this.standalone = null),
      (this.attached = !1),
      (this.appSrc = null),
      (this.snackbar = new pC.Snackbar({ darkMode: e.darkMode })),
      (this.linkFlow = new dC.LinkFlow({
        darkMode: e.darkMode,
        version: e.version,
        sessionId: e.session.id,
        sessionSecret: e.session.secret,
        linkAPIUrl: e.linkAPIUrl,
        connected$: e.connected$,
        chainId$: e.chainId$,
        isParentConnection: !1,
      }));
  }
  attach() {
    if (this.attached)
      throw new Error("Coinbase Wallet SDK UI is already attached");
    const e = document.documentElement,
      r = document.createElement("div");
    (r.className = "-cbwsdk-css-reset"),
      e.appendChild(r),
      this.linkFlow.attach(r),
      this.snackbar.attach(r),
      (this.attached = !0),
      (0, bC.injectCssReset)();
  }
  setConnectDisabled(e) {
    this.linkFlow.setConnectDisabled(e);
  }
  addEthereumChain(e) {}
  watchAsset(e) {}
  switchEthereumChain(e) {}
  requestEthereumAccounts(e) {
    this.linkFlow.open({ onCancel: e.onCancel });
  }
  hideRequestEthereumAccounts() {
    this.linkFlow.close();
  }
  signEthereumMessage(e) {}
  signEthereumTransaction(e) {}
  submitEthereumTransaction(e) {}
  ethereumAddressFromSignedMessage(e) {}
  showConnecting(e) {
    let r;
    return (
      e.isUnlinkedErrorState
        ? (r = {
            autoExpand: !0,
            message: "Connection lost",
            appSrc: this.appSrc,
            menuItems: [
              {
                isRed: !1,
                info: "Reset connection",
                svgWidth: "10",
                svgHeight: "11",
                path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                defaultFillRule: "evenodd",
                defaultClipRule: "evenodd",
                onClick: e.onResetConnection,
              },
            ],
          })
        : (r = {
            message: "Confirm on phone",
            appSrc: this.appSrc,
            menuItems: [
              {
                isRed: !0,
                info: "Cancel transaction",
                svgWidth: "11",
                svgHeight: "11",
                path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
                defaultFillRule: "inherit",
                defaultClipRule: "inherit",
                onClick: e.onCancel,
              },
              {
                isRed: !1,
                info: "Reset connection",
                svgWidth: "10",
                svgHeight: "11",
                path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                defaultFillRule: "evenodd",
                defaultClipRule: "evenodd",
                onClick: e.onResetConnection,
              },
            ],
          }),
      this.snackbar.presentItem(r)
    );
  }
  setAppSrc(e) {
    this.appSrc = e;
  }
  reloadUI() {
    document.location.reload();
  }
  inlineAccountsResponse() {
    return !1;
  }
  inlineAddEthereumChain(e) {
    return !1;
  }
  inlineWatchAsset() {
    return !1;
  }
  inlineSwitchEthereumChain() {
    return !1;
  }
  setStandalone(e) {
    this.standalone = e;
  }
  isStandalone() {
    var e;
    return (e = this.standalone) !== null && e !== void 0 ? e : !1;
  }
}
Bs.WalletSDKUI = gC;
var ro = {},
  no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
var Gr;
(function (t) {
  (t.typeOfFunction = "function"), (t.boolTrue = !0);
})(Gr || (Gr = {}));
function l0(t, e, r) {
  if (!r || typeof r.value !== Gr.typeOfFunction)
    throw new TypeError(
      "Only methods can be decorated with @bind. <" + e + "> is not a method!",
    );
  return {
    configurable: Gr.boolTrue,
    get: function () {
      var n = r.value.bind(this);
      return (
        Object.defineProperty(this, e, {
          value: n,
          configurable: Gr.boolTrue,
          writable: Gr.boolTrue,
        }),
        n
      );
    },
  };
}
no.bind = l0;
no.default = l0;
function f0(t) {
  return function (r) {
    return r.lift(new mC(t));
  };
}
var mC = (function () {
    function t(e) {
      this.durationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new yC(e, this.durationSelector));
      }),
      t
    );
  })(),
  yC = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.durationSelector = n), (i.hasValue = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        if (((this.value = r), (this.hasValue = !0), !this.throttled)) {
          var n = void 0;
          try {
            var i = this.durationSelector;
            n = i(r);
          } catch (o) {
            return this.destination.error(o);
          }
          var s = Ee(n, new we(this));
          !s || s.closed
            ? this.clearThrottle()
            : this.add((this.throttled = s));
        }
      }),
      (e.prototype.clearThrottle = function () {
        var r = this,
          n = r.value,
          i = r.hasValue,
          s = r.throttled;
        s && (this.remove(s), (this.throttled = void 0), s.unsubscribe()),
          i &&
            ((this.value = void 0),
            (this.hasValue = !1),
            this.destination.next(n));
      }),
      (e.prototype.notifyNext = function () {
        this.clearThrottle();
      }),
      (e.prototype.notifyComplete = function () {
        this.clearThrottle();
      }),
      e
    );
  })(Se);
function vC(t, e) {
  return (
    e === void 0 && (e = We),
    f0(function () {
      return zp(t, e);
    })
  );
}
function _C(t) {
  return function (r) {
    return r.lift(new wC(t));
  };
}
var wC = (function () {
    function t(e) {
      this.closingNotifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new SC(e, this.closingNotifier));
      }),
      t
    );
  })(),
  SC = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.buffer = []), i.add(Ee(n, new we(i))), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.buffer.push(r);
      }),
      (e.prototype.notifyNext = function () {
        var r = this.buffer;
        (this.buffer = []), this.destination.next(r);
      }),
      e
    );
  })(Se);
function EC(t, e) {
  return (
    e === void 0 && (e = null),
    function (n) {
      return n.lift(new CC(t, e));
    }
  );
}
var CC = (function () {
    function t(e, r) {
      (this.bufferSize = e),
        (this.startBufferEvery = r),
        !r || e === r
          ? (this.subscriberClass = RC)
          : (this.subscriberClass = IC);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new this.subscriberClass(e, this.bufferSize, this.startBufferEvery),
        );
      }),
      t
    );
  })(),
  RC = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.bufferSize = n), (i.buffer = []), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.buffer;
        n.push(r),
          n.length == this.bufferSize &&
            (this.destination.next(n), (this.buffer = []));
      }),
      (e.prototype._complete = function () {
        var r = this.buffer;
        r.length > 0 && this.destination.next(r),
          t.prototype._complete.call(this);
      }),
      e
    );
  })(V),
  IC = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.bufferSize = n),
        (s.startBufferEvery = i),
        (s.buffers = []),
        (s.count = 0),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n = this,
          i = n.bufferSize,
          s = n.startBufferEvery,
          o = n.buffers,
          a = n.count;
        this.count++, a % s === 0 && o.push([]);
        for (var c = o.length; c--; ) {
          var u = o[c];
          u.push(r),
            u.length === i && (o.splice(c, 1), this.destination.next(u));
        }
      }),
      (e.prototype._complete = function () {
        for (var r = this, n = r.buffers, i = r.destination; n.length > 0; ) {
          var s = n.shift();
          s.length > 0 && i.next(s);
        }
        t.prototype._complete.call(this);
      }),
      e
    );
  })(V);
function xC(t) {
  var e = arguments.length,
    r = We;
  Qe(arguments[arguments.length - 1]) &&
    ((r = arguments[arguments.length - 1]), e--);
  var n = null;
  e >= 2 && (n = arguments[1]);
  var i = Number.POSITIVE_INFINITY;
  return (
    e >= 3 && (i = arguments[2]),
    function (o) {
      return o.lift(new AC(t, n, i, r));
    }
  );
}
var AC = (function () {
    function t(e, r, n, i) {
      (this.bufferTimeSpan = e),
        (this.bufferCreationInterval = r),
        (this.maxBufferSize = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new kC(
            e,
            this.bufferTimeSpan,
            this.bufferCreationInterval,
            this.maxBufferSize,
            this.scheduler,
          ),
        );
      }),
      t
    );
  })(),
  TC = (function () {
    function t() {
      this.buffer = [];
    }
    return t;
  })(),
  kC = (function (t) {
    A(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      (a.bufferTimeSpan = n),
        (a.bufferCreationInterval = i),
        (a.maxBufferSize = s),
        (a.scheduler = o),
        (a.contexts = []);
      var c = a.openContext();
      if (((a.timespanOnly = i == null || i < 0), a.timespanOnly)) {
        var u = { subscriber: a, context: c, bufferTimeSpan: n };
        a.add((c.closeAction = o.schedule(oh, n, u)));
      } else {
        var l = { subscriber: a, context: c },
          f = {
            bufferTimeSpan: n,
            bufferCreationInterval: i,
            subscriber: a,
            scheduler: o,
          };
        a.add((c.closeAction = o.schedule(h0, n, l))),
          a.add(o.schedule(OC, i, f));
      }
      return a;
    }
    return (
      (e.prototype._next = function (r) {
        for (var n = this.contexts, i = n.length, s, o = 0; o < i; o++) {
          var a = n[o],
            c = a.buffer;
          c.push(r), c.length == this.maxBufferSize && (s = a);
        }
        s && this.onBufferFull(s);
      }),
      (e.prototype._error = function (r) {
        (this.contexts.length = 0), t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        for (var r = this, n = r.contexts, i = r.destination; n.length > 0; ) {
          var s = n.shift();
          i.next(s.buffer);
        }
        t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        this.contexts = null;
      }),
      (e.prototype.onBufferFull = function (r) {
        this.closeContext(r);
        var n = r.closeAction;
        if (
          (n.unsubscribe(), this.remove(n), !this.closed && this.timespanOnly)
        ) {
          r = this.openContext();
          var i = this.bufferTimeSpan,
            s = { subscriber: this, context: r, bufferTimeSpan: i };
          this.add((r.closeAction = this.scheduler.schedule(oh, i, s)));
        }
      }),
      (e.prototype.openContext = function () {
        var r = new TC();
        return this.contexts.push(r), r;
      }),
      (e.prototype.closeContext = function (r) {
        this.destination.next(r.buffer);
        var n = this.contexts,
          i = n ? n.indexOf(r) : -1;
        i >= 0 && n.splice(n.indexOf(r), 1);
      }),
      e
    );
  })(V);
function oh(t) {
  var e = t.subscriber,
    r = t.context;
  r && e.closeContext(r),
    e.closed ||
      ((t.context = e.openContext()),
      (t.context.closeAction = this.schedule(t, t.bufferTimeSpan)));
}
function OC(t) {
  var e = t.bufferCreationInterval,
    r = t.bufferTimeSpan,
    n = t.subscriber,
    i = t.scheduler,
    s = n.openContext(),
    o = this;
  n.closed ||
    (n.add((s.closeAction = i.schedule(h0, r, { subscriber: n, context: s }))),
    o.schedule(t, e));
}
function h0(t) {
  var e = t.subscriber,
    r = t.context;
  e.closeContext(r);
}
function MC(t, e) {
  return function (n) {
    return n.lift(new NC(t, e));
  };
}
var NC = (function () {
    function t(e, r) {
      (this.openings = e), (this.closingSelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new jC(e, this.openings, this.closingSelector));
      }),
      t
    );
  })(),
  jC = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.closingSelector = i), (s.contexts = []), s.add(Ut(s, n)), s;
    }
    return (
      (e.prototype._next = function (r) {
        for (var n = this.contexts, i = n.length, s = 0; s < i; s++)
          n[s].buffer.push(r);
      }),
      (e.prototype._error = function (r) {
        for (var n = this.contexts; n.length > 0; ) {
          var i = n.shift();
          i.subscription.unsubscribe(),
            (i.buffer = null),
            (i.subscription = null);
        }
        (this.contexts = null), t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        for (var r = this.contexts; r.length > 0; ) {
          var n = r.shift();
          this.destination.next(n.buffer),
            n.subscription.unsubscribe(),
            (n.buffer = null),
            (n.subscription = null);
        }
        (this.contexts = null), t.prototype._complete.call(this);
      }),
      (e.prototype.notifyNext = function (r, n) {
        r ? this.closeBuffer(r) : this.openBuffer(n);
      }),
      (e.prototype.notifyComplete = function (r) {
        this.closeBuffer(r.context);
      }),
      (e.prototype.openBuffer = function (r) {
        try {
          var n = this.closingSelector,
            i = n.call(this, r);
          i && this.trySubscribe(i);
        } catch (s) {
          this._error(s);
        }
      }),
      (e.prototype.closeBuffer = function (r) {
        var n = this.contexts;
        if (n && r) {
          var i = r.buffer,
            s = r.subscription;
          this.destination.next(i),
            n.splice(n.indexOf(r), 1),
            this.remove(s),
            s.unsubscribe();
        }
      }),
      (e.prototype.trySubscribe = function (r) {
        var n = this.contexts,
          i = [],
          s = new _e(),
          o = { buffer: i, subscription: s };
        n.push(o);
        var a = Ut(this, r, o);
        !a || a.closed
          ? this.closeBuffer(o)
          : ((a.context = o), this.add(a), s.add(a));
      }),
      e
    );
  })(Mr);
function LC(t) {
  return function (e) {
    return e.lift(new PC(t));
  };
}
var PC = (function () {
    function t(e) {
      this.closingSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new DC(e, this.closingSelector));
      }),
      t
    );
  })(),
  DC = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.closingSelector = n), (i.subscribing = !1), i.openBuffer(), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.buffer.push(r);
      }),
      (e.prototype._complete = function () {
        var r = this.buffer;
        r && this.destination.next(r), t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        (this.buffer = void 0), (this.subscribing = !1);
      }),
      (e.prototype.notifyNext = function () {
        this.openBuffer();
      }),
      (e.prototype.notifyComplete = function () {
        this.subscribing ? this.complete() : this.openBuffer();
      }),
      (e.prototype.openBuffer = function () {
        var r = this.closingSubscription;
        r && (this.remove(r), r.unsubscribe());
        var n = this.buffer;
        this.buffer && this.destination.next(n), (this.buffer = []);
        var i;
        try {
          var s = this.closingSelector;
          i = s();
        } catch (o) {
          return this.error(o);
        }
        (r = new _e()),
          (this.closingSubscription = r),
          this.add(r),
          (this.subscribing = !0),
          r.add(Ee(i, new we(this))),
          (this.subscribing = !1);
      }),
      e
    );
  })(Se);
function $C(t) {
  return function (r) {
    var n = new BC(t),
      i = r.lift(n);
    return (n.caught = i);
  };
}
var BC = (function () {
    function t(e) {
      this.selector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new FC(e, this.selector, this.caught));
      }),
      t
    );
  })(),
  FC = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.selector = n), (s.caught = i), s;
    }
    return (
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = void 0;
          try {
            n = this.selector(r, this.caught);
          } catch (o) {
            t.prototype.error.call(this, o);
            return;
          }
          this._unsubscribeAndRecycle();
          var i = new we(this);
          this.add(i);
          var s = Ee(n, i);
          s !== i && this.add(s);
        }
      }),
      e
    );
  })(Se);
function UC(t) {
  return function (e) {
    return e.lift(new Iu(t));
  };
}
function HC() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = null;
  return (
    typeof t[t.length - 1] == "function" && (r = t.pop()),
    t.length === 1 && Ve(t[0]) && (t = t[0].slice()),
    function (n) {
      return n.lift.call(Vt([n].concat(t)), new Iu(r));
    }
  );
}
function VC() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return r.lift.call(Qn.apply(void 0, [r].concat(t)));
  };
}
function d0(t, e) {
  return Er(t, e, 1);
}
function WC(t, e) {
  return d0(function () {
    return t;
  }, e);
}
function zC(t) {
  return function (e) {
    return e.lift(new GC(t, e));
  };
}
var GC = (function () {
    function t(e, r) {
      (this.predicate = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new qC(e, this.predicate, this.source));
      }),
      t
    );
  })(),
  qC = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.predicate = n), (s.source = i), (s.count = 0), (s.index = 0), s;
    }
    return (
      (e.prototype._next = function (r) {
        this.predicate ? this._tryPredicate(r) : this.count++;
      }),
      (e.prototype._tryPredicate = function (r) {
        var n;
        try {
          n = this.predicate(r, this.index++, this.source);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        n && this.count++;
      }),
      (e.prototype._complete = function () {
        this.destination.next(this.count), this.destination.complete();
      }),
      e
    );
  })(V);
function JC(t) {
  return function (e) {
    return e.lift(new ZC(t));
  };
}
var ZC = (function () {
    function t(e) {
      this.durationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new QC(e, this.durationSelector));
      }),
      t
    );
  })(),
  QC = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.durationSelector = n), (i.hasValue = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        try {
          var n = this.durationSelector.call(this, r);
          n && this._tryNext(r, n);
        } catch (i) {
          this.destination.error(i);
        }
      }),
      (e.prototype._complete = function () {
        this.emitValue(), this.destination.complete();
      }),
      (e.prototype._tryNext = function (r, n) {
        var i = this.durationSubscription;
        (this.value = r),
          (this.hasValue = !0),
          i && (i.unsubscribe(), this.remove(i)),
          (i = Ee(n, new we(this))),
          i && !i.closed && this.add((this.durationSubscription = i));
      }),
      (e.prototype.notifyNext = function () {
        this.emitValue();
      }),
      (e.prototype.notifyComplete = function () {
        this.emitValue();
      }),
      (e.prototype.emitValue = function () {
        if (this.hasValue) {
          var r = this.value,
            n = this.durationSubscription;
          n &&
            ((this.durationSubscription = void 0),
            n.unsubscribe(),
            this.remove(n)),
            (this.value = void 0),
            (this.hasValue = !1),
            t.prototype._next.call(this, r);
        }
      }),
      e
    );
  })(Se);
function KC(t, e) {
  return (
    e === void 0 && (e = We),
    function (r) {
      return r.lift(new YC(t, e));
    }
  );
}
var YC = (function () {
    function t(e, r) {
      (this.dueTime = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new XC(e, this.dueTime, this.scheduler));
      }),
      t
    );
  })(),
  XC = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.dueTime = n),
        (s.scheduler = i),
        (s.debouncedSubscription = null),
        (s.lastValue = null),
        (s.hasValue = !1),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.clearDebounce(),
          (this.lastValue = r),
          (this.hasValue = !0),
          this.add(
            (this.debouncedSubscription = this.scheduler.schedule(
              e5,
              this.dueTime,
              this,
            )),
          );
      }),
      (e.prototype._complete = function () {
        this.debouncedNext(), this.destination.complete();
      }),
      (e.prototype.debouncedNext = function () {
        if ((this.clearDebounce(), this.hasValue)) {
          var r = this.lastValue;
          (this.lastValue = null),
            (this.hasValue = !1),
            this.destination.next(r);
        }
      }),
      (e.prototype.clearDebounce = function () {
        var r = this.debouncedSubscription;
        r !== null &&
          (this.remove(r),
          r.unsubscribe(),
          (this.debouncedSubscription = null));
      }),
      e
    );
  })(V);
function e5(t) {
  t.debouncedNext();
}
function Ri(t) {
  return (
    t === void 0 && (t = null),
    function (e) {
      return e.lift(new t5(t));
    }
  );
}
var t5 = (function () {
    function t(e) {
      this.defaultValue = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new r5(e, this.defaultValue));
      }),
      t
    );
  })(),
  r5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.defaultValue = n), (i.isEmpty = !0), i;
    }
    return (
      (e.prototype._next = function (r) {
        (this.isEmpty = !1), this.destination.next(r);
      }),
      (e.prototype._complete = function () {
        this.isEmpty && this.destination.next(this.defaultValue),
          this.destination.complete();
      }),
      e
    );
  })(V);
function p0(t) {
  return t instanceof Date && !isNaN(+t);
}
function n5(t, e) {
  e === void 0 && (e = We);
  var r = p0(t),
    n = r ? +t - e.now() : Math.abs(t);
  return function (i) {
    return i.lift(new i5(n, e));
  };
}
var i5 = (function () {
    function t(e, r) {
      (this.delay = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new s5(e, this.delay, this.scheduler));
      }),
      t
    );
  })(),
  s5 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.delay = n),
        (s.scheduler = i),
        (s.queue = []),
        (s.active = !1),
        (s.errored = !1),
        s
      );
    }
    return (
      (e.dispatch = function (r) {
        for (
          var n = r.source, i = n.queue, s = r.scheduler, o = r.destination;
          i.length > 0 && i[0].time - s.now() <= 0;

        )
          i.shift().notification.observe(o);
        if (i.length > 0) {
          var a = Math.max(0, i[0].time - s.now());
          this.schedule(r, a);
        } else this.unsubscribe(), (n.active = !1);
      }),
      (e.prototype._schedule = function (r) {
        this.active = !0;
        var n = this.destination;
        n.add(
          r.schedule(e.dispatch, this.delay, {
            source: this,
            destination: this.destination,
            scheduler: r,
          }),
        );
      }),
      (e.prototype.scheduleNotification = function (r) {
        if (this.errored !== !0) {
          var n = this.scheduler,
            i = new o5(n.now() + this.delay, r);
          this.queue.push(i), this.active === !1 && this._schedule(n);
        }
      }),
      (e.prototype._next = function (r) {
        this.scheduleNotification(Bt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        (this.errored = !0),
          (this.queue = []),
          this.destination.error(r),
          this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.scheduleNotification(Bt.createComplete()), this.unsubscribe();
      }),
      e
    );
  })(V),
  o5 = (function () {
    function t(e, r) {
      (this.time = e), (this.notification = r);
    }
    return t;
  })();
function a5(t, e) {
  return e
    ? function (r) {
        return new u5(r, e).lift(new ah(t));
      }
    : function (r) {
        return r.lift(new ah(t));
      };
}
var ah = (function () {
    function t(e) {
      this.delayDurationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new c5(e, this.delayDurationSelector));
      }),
      t
    );
  })(),
  c5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (
        (i.delayDurationSelector = n),
        (i.completed = !1),
        (i.delayNotifierSubscriptions = []),
        (i.index = 0),
        i
      );
    }
    return (
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        this.destination.next(r),
          this.removeSubscription(o),
          this.tryComplete();
      }),
      (e.prototype.notifyError = function (r, n) {
        this._error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        var n = this.removeSubscription(r);
        n && this.destination.next(n), this.tryComplete();
      }),
      (e.prototype._next = function (r) {
        var n = this.index++;
        try {
          var i = this.delayDurationSelector(r, n);
          i && this.tryDelay(i, r);
        } catch (s) {
          this.destination.error(s);
        }
      }),
      (e.prototype._complete = function () {
        (this.completed = !0), this.tryComplete(), this.unsubscribe();
      }),
      (e.prototype.removeSubscription = function (r) {
        r.unsubscribe();
        var n = this.delayNotifierSubscriptions.indexOf(r);
        return (
          n !== -1 && this.delayNotifierSubscriptions.splice(n, 1), r.outerValue
        );
      }),
      (e.prototype.tryDelay = function (r, n) {
        var i = Ut(this, r, n);
        if (i && !i.closed) {
          var s = this.destination;
          s.add(i), this.delayNotifierSubscriptions.push(i);
        }
      }),
      (e.prototype.tryComplete = function () {
        this.completed &&
          this.delayNotifierSubscriptions.length === 0 &&
          this.destination.complete();
      }),
      e
    );
  })(Mr),
  u5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.source = r), (i.subscriptionDelay = n), i;
    }
    return (
      (e.prototype._subscribe = function (r) {
        this.subscriptionDelay.subscribe(new l5(r, this.source));
      }),
      e
    );
  })(ee),
  l5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.parent = r), (i.source = n), (i.sourceSubscribed = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.subscribeToSource();
      }),
      (e.prototype._error = function (r) {
        this.unsubscribe(), this.parent.error(r);
      }),
      (e.prototype._complete = function () {
        this.unsubscribe(), this.subscribeToSource();
      }),
      (e.prototype.subscribeToSource = function () {
        this.sourceSubscribed ||
          ((this.sourceSubscribed = !0),
          this.unsubscribe(),
          this.source.subscribe(this.parent));
      }),
      e
    );
  })(V);
function f5() {
  return function (e) {
    return e.lift(new h5());
  };
}
var h5 = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new d5(e));
      }),
      t
    );
  })(),
  d5 = (function (t) {
    A(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype._next = function (r) {
        r.observe(this.destination);
      }),
      e
    );
  })(V);
function p5(t, e) {
  return function (r) {
    return r.lift(new b5(t, e));
  };
}
var b5 = (function () {
    function t(e, r) {
      (this.keySelector = e), (this.flushes = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new g5(e, this.keySelector, this.flushes));
      }),
      t
    );
  })(),
  g5 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.keySelector = n),
        (s.values = new Set()),
        i && s.add(Ee(i, new we(s))),
        s
      );
    }
    return (
      (e.prototype.notifyNext = function () {
        this.values.clear();
      }),
      (e.prototype.notifyError = function (r) {
        this._error(r);
      }),
      (e.prototype._next = function (r) {
        this.keySelector ? this._useKeySelector(r) : this._finalizeNext(r, r);
      }),
      (e.prototype._useKeySelector = function (r) {
        var n,
          i = this.destination;
        try {
          n = this.keySelector(r);
        } catch (s) {
          i.error(s);
          return;
        }
        this._finalizeNext(n, r);
      }),
      (e.prototype._finalizeNext = function (r, n) {
        var i = this.values;
        i.has(r) || (i.add(r), this.destination.next(n));
      }),
      e
    );
  })(Se);
function b0(t, e) {
  return function (r) {
    return r.lift(new m5(t, e));
  };
}
var m5 = (function () {
    function t(e, r) {
      (this.compare = e), (this.keySelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new y5(e, this.compare, this.keySelector));
      }),
      t
    );
  })(),
  y5 = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.keySelector = i),
        (s.hasKey = !1),
        typeof n == "function" && (s.compare = n),
        s
      );
    }
    return (
      (e.prototype.compare = function (r, n) {
        return r === n;
      }),
      (e.prototype._next = function (r) {
        var n;
        try {
          var i = this.keySelector;
          n = i ? i(r) : r;
        } catch (a) {
          return this.destination.error(a);
        }
        var s = !1;
        if (this.hasKey)
          try {
            var o = this.compare;
            s = o(this.key, n);
          } catch (a) {
            return this.destination.error(a);
          }
        else this.hasKey = !0;
        s || ((this.key = n), this.destination.next(r));
      }),
      e
    );
  })(V);
function v5(t, e) {
  return b0(function (r, n) {
    return e ? e(r[t], n[t]) : r[t] === n[t];
  });
}
function io(t) {
  return (
    t === void 0 && (t = S5),
    function (e) {
      return e.lift(new _5(t));
    }
  );
}
var _5 = (function () {
    function t(e) {
      this.errorFactory = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new w5(e, this.errorFactory));
      }),
      t
    );
  })(),
  w5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.errorFactory = n), (i.hasValue = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        (this.hasValue = !0), this.destination.next(r);
      }),
      (e.prototype._complete = function () {
        if (this.hasValue) return this.destination.complete();
        var r = void 0;
        try {
          r = this.errorFactory();
        } catch (n) {
          r = n;
        }
        this.destination.error(r);
      }),
      e
    );
  })(V);
function S5() {
  return new Ei();
}
function Uu(t) {
  return function (e) {
    return t === 0 ? Rn() : e.lift(new E5(t));
  };
}
var E5 = (function () {
    function t(e) {
      if (((this.total = e), this.total < 0)) throw new fn();
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new C5(e, this.total));
      }),
      t
    );
  })(),
  C5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.total = n), (i.count = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.total,
          i = ++this.count;
        i <= n &&
          (this.destination.next(r),
          i === n && (this.destination.complete(), this.unsubscribe()));
      }),
      e
    );
  })(V);
function R5(t, e) {
  if (t < 0) throw new fn();
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      nr(function (i, s) {
        return s === t;
      }),
      Uu(1),
      r
        ? Ri(e)
        : io(function () {
            return new fn();
          }),
    );
  };
}
function I5() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return Qn(r, Hs.apply(void 0, t));
  };
}
function x5(t, e) {
  return function (r) {
    return r.lift(new A5(t, e, r));
  };
}
var A5 = (function () {
    function t(e, r, n) {
      (this.predicate = e), (this.thisArg = r), (this.source = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new T5(e, this.predicate, this.thisArg, this.source),
        );
      }),
      t
    );
  })(),
  T5 = (function (t) {
    A(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.predicate = n),
        (o.thisArg = i),
        (o.source = s),
        (o.index = 0),
        (o.thisArg = i || o),
        o
      );
    }
    return (
      (e.prototype.notifyComplete = function (r) {
        this.destination.next(r), this.destination.complete();
      }),
      (e.prototype._next = function (r) {
        var n = !1;
        try {
          n = this.predicate.call(this.thisArg, r, this.index++, this.source);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        n || this.notifyComplete(!1);
      }),
      (e.prototype._complete = function () {
        this.notifyComplete(!0);
      }),
      e
    );
  })(V);
function k5() {
  return function (t) {
    return t.lift(new O5());
  };
}
var O5 = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new M5(e));
      }),
      t
    );
  })(),
  M5 = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.hasCompleted = !1), (n.hasSubscription = !1), n;
    }
    return (
      (e.prototype._next = function (r) {
        this.hasSubscription ||
          ((this.hasSubscription = !0), this.add(Ee(r, new we(this))));
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.hasSubscription || this.destination.complete();
      }),
      (e.prototype.notifyComplete = function () {
        (this.hasSubscription = !1),
          this.hasCompleted && this.destination.complete();
      }),
      e
    );
  })(Se);
function g0(t, e) {
  return e
    ? function (r) {
        return r.pipe(
          g0(function (n, i) {
            return Vt(t(n, i)).pipe(
              at(function (s, o) {
                return e(n, s, i, o);
              }),
            );
          }),
        );
      }
    : function (r) {
        return r.lift(new N5(t));
      };
}
var N5 = (function () {
    function t(e) {
      this.project = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new j5(e, this.project));
      }),
      t
    );
  })(),
  j5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (
        (i.project = n),
        (i.hasSubscription = !1),
        (i.hasCompleted = !1),
        (i.index = 0),
        i
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.hasSubscription || this.tryNext(r);
      }),
      (e.prototype.tryNext = function (r) {
        var n,
          i = this.index++;
        try {
          n = this.project(r, i);
        } catch (s) {
          this.destination.error(s);
          return;
        }
        (this.hasSubscription = !0), this._innerSub(n);
      }),
      (e.prototype._innerSub = function (r) {
        var n = new we(this),
          i = this.destination;
        i.add(n);
        var s = Ee(r, n);
        s !== n && i.add(s);
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.hasSubscription || this.destination.complete(),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      (e.prototype.notifyError = function (r) {
        this.destination.error(r);
      }),
      (e.prototype.notifyComplete = function () {
        (this.hasSubscription = !1),
          this.hasCompleted && this.destination.complete();
      }),
      e
    );
  })(Se);
function L5(t, e, r) {
  return (
    e === void 0 && (e = Number.POSITIVE_INFINITY),
    (e = (e || 0) < 1 ? Number.POSITIVE_INFINITY : e),
    function (n) {
      return n.lift(new P5(t, e, r));
    }
  );
}
var P5 = (function () {
    function t(e, r, n) {
      (this.project = e), (this.concurrent = r), (this.scheduler = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new D5(e, this.project, this.concurrent, this.scheduler),
        );
      }),
      t
    );
  })(),
  D5 = (function (t) {
    A(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.project = n),
        (o.concurrent = i),
        (o.scheduler = s),
        (o.index = 0),
        (o.active = 0),
        (o.hasCompleted = !1),
        i < Number.POSITIVE_INFINITY && (o.buffer = []),
        o
      );
    }
    return (
      (e.dispatch = function (r) {
        var n = r.subscriber,
          i = r.result,
          s = r.value,
          o = r.index;
        n.subscribeToProjection(i, s, o);
      }),
      (e.prototype._next = function (r) {
        var n = this.destination;
        if (n.closed) {
          this._complete();
          return;
        }
        var i = this.index++;
        if (this.active < this.concurrent) {
          n.next(r);
          try {
            var s = this.project,
              o = s(r, i);
            if (!this.scheduler) this.subscribeToProjection(o, r, i);
            else {
              var a = { subscriber: this, result: o, value: r, index: i },
                c = this.destination;
              c.add(this.scheduler.schedule(e.dispatch, 0, a));
            }
          } catch (u) {
            n.error(u);
          }
        } else this.buffer.push(r);
      }),
      (e.prototype.subscribeToProjection = function (r, n, i) {
        this.active++;
        var s = this.destination;
        s.add(Ee(r, new we(this)));
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.hasCompleted && this.active === 0 && this.destination.complete(),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        this._next(r);
      }),
      (e.prototype.notifyComplete = function () {
        var r = this.buffer;
        this.active--,
          r && r.length > 0 && this._next(r.shift()),
          this.hasCompleted && this.active === 0 && this.destination.complete();
      }),
      e
    );
  })(Se);
function $5(t) {
  return function (e) {
    return e.lift(new B5(t));
  };
}
var B5 = (function () {
    function t(e) {
      this.callback = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new F5(e, this.callback));
      }),
      t
    );
  })(),
  F5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return i.add(new _e(n)), i;
    }
    return e;
  })(V);
function U5(t, e) {
  if (typeof t != "function")
    throw new TypeError("predicate is not a function");
  return function (r) {
    return r.lift(new m0(t, r, !1, e));
  };
}
var m0 = (function () {
    function t(e, r, n, i) {
      (this.predicate = e),
        (this.source = r),
        (this.yieldIndex = n),
        (this.thisArg = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new H5(e, this.predicate, this.source, this.yieldIndex, this.thisArg),
        );
      }),
      t
    );
  })(),
  H5 = (function (t) {
    A(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.predicate = n),
        (a.source = i),
        (a.yieldIndex = s),
        (a.thisArg = o),
        (a.index = 0),
        a
      );
    }
    return (
      (e.prototype.notifyComplete = function (r) {
        var n = this.destination;
        n.next(r), n.complete(), this.unsubscribe();
      }),
      (e.prototype._next = function (r) {
        var n = this,
          i = n.predicate,
          s = n.thisArg,
          o = this.index++;
        try {
          var a = i.call(s || this, r, o, this.source);
          a && this.notifyComplete(this.yieldIndex ? o : r);
        } catch (c) {
          this.destination.error(c);
        }
      }),
      (e.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : void 0);
      }),
      e
    );
  })(V);
function V5(t, e) {
  return function (r) {
    return r.lift(new m0(t, r, !0, e));
  };
}
function W5(t, e) {
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      t
        ? nr(function (i, s) {
            return t(i, s, n);
          })
        : tr,
      Uu(1),
      r
        ? Ri(e)
        : io(function () {
            return new Ei();
          }),
    );
  };
}
function z5() {
  return function (e) {
    return e.lift(new G5());
  };
}
var G5 = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new q5(e));
      }),
      t
    );
  })(),
  q5 = (function (t) {
    A(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (e.prototype._next = function (r) {}), e;
  })(V);
function J5() {
  return function (t) {
    return t.lift(new Z5());
  };
}
var Z5 = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Q5(e));
      }),
      t
    );
  })(),
  Q5 = (function (t) {
    A(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype.notifyComplete = function (r) {
        var n = this.destination;
        n.next(r), n.complete();
      }),
      (e.prototype._next = function (r) {
        this.notifyComplete(!1);
      }),
      (e.prototype._complete = function () {
        this.notifyComplete(!0);
      }),
      e
    );
  })(V);
function os(t) {
  return function (r) {
    return t === 0 ? Rn() : r.lift(new K5(t));
  };
}
var K5 = (function () {
    function t(e) {
      if (((this.total = e), this.total < 0)) throw new fn();
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Y5(e, this.total));
      }),
      t
    );
  })(),
  Y5 = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.total = n), (i.ring = new Array()), (i.count = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.ring,
          i = this.total,
          s = this.count++;
        if (n.length < i) n.push(r);
        else {
          var o = s % i;
          n[o] = r;
        }
      }),
      (e.prototype._complete = function () {
        var r = this.destination,
          n = this.count;
        if (n > 0)
          for (
            var i = this.count >= this.total ? this.total : this.count,
              s = this.ring,
              o = 0;
            o < i;
            o++
          ) {
            var a = n++ % i;
            r.next(s[a]);
          }
        r.complete();
      }),
      e
    );
  })(V);
function X5(t, e) {
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      t
        ? nr(function (i, s) {
            return t(i, s, n);
          })
        : tr,
      os(1),
      r
        ? Ri(e)
        : io(function () {
            return new Ei();
          }),
    );
  };
}
function eR(t) {
  return function (e) {
    return e.lift(new tR(t));
  };
}
var tR = (function () {
    function t(e) {
      this.value = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new rR(e, this.value));
      }),
      t
    );
  })(),
  rR = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.value = n), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.destination.next(this.value);
      }),
      e
    );
  })(V);
function nR() {
  return function (e) {
    return e.lift(new iR());
  };
}
var iR = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new sR(e));
      }),
      t
    );
  })(),
  sR = (function (t) {
    A(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype._next = function (r) {
        this.destination.next(Bt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        var n = this.destination;
        n.next(Bt.createError(r)), n.complete();
      }),
      (e.prototype._complete = function () {
        var r = this.destination;
        r.next(Bt.createComplete()), r.complete();
      }),
      e
    );
  })(V);
function as(t, e) {
  var r = !1;
  return (
    arguments.length >= 2 && (r = !0),
    function (i) {
      return i.lift(new oR(t, e, r));
    }
  );
}
var oR = (function () {
    function t(e, r, n) {
      n === void 0 && (n = !1),
        (this.accumulator = e),
        (this.seed = r),
        (this.hasSeed = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new aR(e, this.accumulator, this.seed, this.hasSeed),
        );
      }),
      t
    );
  })(),
  aR = (function (t) {
    A(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.accumulator = n), (o._seed = i), (o.hasSeed = s), (o.index = 0), o
      );
    }
    return (
      Object.defineProperty(e.prototype, "seed", {
        get: function () {
          return this._seed;
        },
        set: function (r) {
          (this.hasSeed = !0), (this._seed = r);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.prototype._next = function (r) {
        if (!this.hasSeed) (this.seed = r), this.destination.next(r);
        else return this._tryNext(r);
      }),
      (e.prototype._tryNext = function (r) {
        var n = this.index++,
          i;
        try {
          i = this.accumulator(this.seed, r, n);
        } catch (s) {
          this.destination.error(s);
        }
        (this.seed = i), this.destination.next(i);
      }),
      e
    );
  })(V);
function so(t, e) {
  return arguments.length >= 2
    ? function (n) {
        return _c(as(t, e), os(1), Ri(e))(n);
      }
    : function (n) {
        return _c(
          as(function (i, s, o) {
            return t(i, s, o + 1);
          }),
          os(1),
        )(n);
      };
}
function cR(t) {
  var e =
    typeof t == "function"
      ? function (r, n) {
          return t(r, n) > 0 ? r : n;
        }
      : function (r, n) {
          return r > n ? r : n;
        };
  return so(e);
}
function uR() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return r.lift.call(Up.apply(void 0, [r].concat(t)));
  };
}
function lR(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    typeof e == "function"
      ? Er(
          function () {
            return t;
          },
          e,
          r,
        )
      : (typeof e == "number" && (r = e),
        Er(function () {
          return t;
        }, r))
  );
}
function fR(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    function (n) {
      return n.lift(new hR(t, e, r));
    }
  );
}
var hR = (function () {
    function t(e, r, n) {
      (this.accumulator = e), (this.seed = r), (this.concurrent = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new dR(e, this.accumulator, this.seed, this.concurrent),
        );
      }),
      t
    );
  })(),
  dR = (function (t) {
    A(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.accumulator = n),
        (o.acc = i),
        (o.concurrent = s),
        (o.hasValue = !1),
        (o.hasCompleted = !1),
        (o.buffer = []),
        (o.active = 0),
        (o.index = 0),
        o
      );
    }
    return (
      (e.prototype._next = function (r) {
        if (this.active < this.concurrent) {
          var n = this.index++,
            i = this.destination,
            s = void 0;
          try {
            var o = this.accumulator;
            s = o(this.acc, r, n);
          } catch (a) {
            return i.error(a);
          }
          this.active++, this._innerSub(s);
        } else this.buffer.push(r);
      }),
      (e.prototype._innerSub = function (r) {
        var n = new we(this),
          i = this.destination;
        i.add(n);
        var s = Ee(r, n);
        s !== n && i.add(s);
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.active === 0 &&
            this.buffer.length === 0 &&
            (this.hasValue === !1 && this.destination.next(this.acc),
            this.destination.complete()),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        var n = this.destination;
        (this.acc = r), (this.hasValue = !0), n.next(r);
      }),
      (e.prototype.notifyComplete = function () {
        var r = this.buffer;
        this.active--,
          r.length > 0
            ? this._next(r.shift())
            : this.active === 0 &&
              this.hasCompleted &&
              (this.hasValue === !1 && this.destination.next(this.acc),
              this.destination.complete());
      }),
      e
    );
  })(Se);
function pR(t) {
  var e =
    typeof t == "function"
      ? function (r, n) {
          return t(r, n) < 0 ? r : n;
        }
      : function (r, n) {
          return r < n ? r : n;
        };
  return so(e);
}
function Cr(t, e) {
  return function (n) {
    var i;
    if (
      (typeof t == "function"
        ? (i = t)
        : (i = function () {
            return t;
          }),
      typeof e == "function")
    )
      return n.lift(new bR(i, e));
    var s = Object.create(n, G2);
    return (s.source = n), (s.subjectFactory = i), s;
  };
}
var bR = (function () {
  function t(e, r) {
    (this.subjectFactory = e), (this.selector = r);
  }
  return (
    (t.prototype.call = function (e, r) {
      var n = this.selector,
        i = this.subjectFactory(),
        s = n(i).subscribe(e);
      return s.add(r.subscribe(i)), s;
    }),
    t
  );
})();
function gR() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return (
    t.length === 1 && Ve(t[0]) && (t = t[0]),
    function (r) {
      return r.lift(new mR(t));
    }
  );
}
var mR = (function () {
    function t(e) {
      this.nextSources = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new yR(e, this.nextSources));
      }),
      t
    );
  })(),
  yR = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.destination = r), (i.nextSources = n), i;
    }
    return (
      (e.prototype.notifyError = function () {
        this.subscribeToNextSource();
      }),
      (e.prototype.notifyComplete = function () {
        this.subscribeToNextSource();
      }),
      (e.prototype._error = function (r) {
        this.subscribeToNextSource(), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.subscribeToNextSource(), this.unsubscribe();
      }),
      (e.prototype.subscribeToNextSource = function () {
        var r = this.nextSources.shift();
        if (r) {
          var n = new we(this),
            i = this.destination;
          i.add(n);
          var s = Ee(r, n);
          s !== n && i.add(s);
        } else this.destination.complete();
      }),
      e
    );
  })(Se);
function vR() {
  return function (t) {
    return t.lift(new _R());
  };
}
var _R = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new wR(e));
      }),
      t
    );
  })(),
  wR = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.hasPrev = !1), n;
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        this.hasPrev ? (n = [this.prev, r]) : (this.hasPrev = !0),
          (this.prev = r),
          n && this.destination.next(n);
      }),
      e
    );
  })(V);
function SR(t, e) {
  return function (r) {
    return [nr(t, e)(r), nr(Vp(t, e))(r)];
  };
}
function ER() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t.length;
  if (r === 0) throw new Error("list of properties cannot be empty.");
  return function (n) {
    return at(CR(t, r))(n);
  };
}
function CR(t, e) {
  var r = function (n) {
    for (var i = n, s = 0; s < e; s++) {
      var o = i != null ? i[t[s]] : void 0;
      if (o !== void 0) i = o;
      else return;
    }
    return i;
  };
  return r;
}
function RR(t) {
  return t
    ? Cr(function () {
        return new Me();
      }, t)
    : Cr(new Me());
}
function IR(t) {
  return function (e) {
    return Cr(new Sp(t))(e);
  };
}
function xR() {
  return function (t) {
    return Cr(new In())(t);
  };
}
function AR(t, e, r, n) {
  r && typeof r != "function" && (n = r);
  var i = typeof r == "function" ? r : void 0,
    s = new Ru(t, e, n);
  return function (o) {
    return Cr(function () {
      return s;
    }, i)(o);
  };
}
function TR() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (n) {
    return (
      t.length === 1 && Ve(t[0]) && (t = t[0]),
      n.lift.call(Wp.apply(void 0, [n].concat(t)))
    );
  };
}
function kR(t) {
  return (
    t === void 0 && (t = -1),
    function (e) {
      return t === 0
        ? Rn()
        : t < 0
        ? e.lift(new ch(-1, e))
        : e.lift(new ch(t - 1, e));
    }
  );
}
var ch = (function () {
    function t(e, r) {
      (this.count = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new OR(e, this.count, this.source));
      }),
      t
    );
  })(),
  OR = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.count = n), (s.source = i), s;
    }
    return (
      (e.prototype.complete = function () {
        if (!this.isStopped) {
          var r = this,
            n = r.source,
            i = r.count;
          if (i === 0) return t.prototype.complete.call(this);
          i > -1 && (this.count = i - 1),
            n.subscribe(this._unsubscribeAndRecycle());
        }
      }),
      e
    );
  })(V);
function MR(t) {
  return function (e) {
    return e.lift(new NR(t));
  };
}
var NR = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new jR(e, this.notifier, r));
      }),
      t
    );
  })(),
  jR = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.notifier = n), (s.source = i), (s.sourceIsBeingSubscribedTo = !0), s
      );
    }
    return (
      (e.prototype.notifyNext = function () {
        (this.sourceIsBeingSubscribedTo = !0), this.source.subscribe(this);
      }),
      (e.prototype.notifyComplete = function () {
        if (this.sourceIsBeingSubscribedTo === !1)
          return t.prototype.complete.call(this);
      }),
      (e.prototype.complete = function () {
        if (((this.sourceIsBeingSubscribedTo = !1), !this.isStopped)) {
          if (
            (this.retries || this.subscribeToRetries(),
            !this.retriesSubscription || this.retriesSubscription.closed)
          )
            return t.prototype.complete.call(this);
          this._unsubscribeAndRecycle(), this.notifications.next(void 0);
        }
      }),
      (e.prototype._unsubscribe = function () {
        var r = this,
          n = r.notifications,
          i = r.retriesSubscription;
        n && (n.unsubscribe(), (this.notifications = void 0)),
          i && (i.unsubscribe(), (this.retriesSubscription = void 0)),
          (this.retries = void 0);
      }),
      (e.prototype._unsubscribeAndRecycle = function () {
        var r = this._unsubscribe;
        return (
          (this._unsubscribe = null),
          t.prototype._unsubscribeAndRecycle.call(this),
          (this._unsubscribe = r),
          this
        );
      }),
      (e.prototype.subscribeToRetries = function () {
        this.notifications = new Me();
        var r;
        try {
          var n = this.notifier;
          r = n(this.notifications);
        } catch {
          return t.prototype.complete.call(this);
        }
        (this.retries = r), (this.retriesSubscription = Ee(r, new we(this)));
      }),
      e
    );
  })(Se);
function LR(t) {
  return (
    t === void 0 && (t = -1),
    function (e) {
      return e.lift(new PR(t, e));
    }
  );
}
var PR = (function () {
    function t(e, r) {
      (this.count = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new DR(e, this.count, this.source));
      }),
      t
    );
  })(),
  DR = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.count = n), (s.source = i), s;
    }
    return (
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this,
            i = n.source,
            s = n.count;
          if (s === 0) return t.prototype.error.call(this, r);
          s > -1 && (this.count = s - 1),
            i.subscribe(this._unsubscribeAndRecycle());
        }
      }),
      e
    );
  })(V);
function $R(t) {
  return function (e) {
    return e.lift(new BR(t, e));
  };
}
var BR = (function () {
    function t(e, r) {
      (this.notifier = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new FR(e, this.notifier, this.source));
      }),
      t
    );
  })(),
  FR = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.notifier = n), (s.source = i), s;
    }
    return (
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this.errors,
            i = this.retries,
            s = this.retriesSubscription;
          if (i) (this.errors = void 0), (this.retriesSubscription = void 0);
          else {
            n = new Me();
            try {
              var o = this.notifier;
              i = o(n);
            } catch (a) {
              return t.prototype.error.call(this, a);
            }
            s = Ee(i, new we(this));
          }
          this._unsubscribeAndRecycle(),
            (this.errors = n),
            (this.retries = i),
            (this.retriesSubscription = s),
            n.next(r);
        }
      }),
      (e.prototype._unsubscribe = function () {
        var r = this,
          n = r.errors,
          i = r.retriesSubscription;
        n && (n.unsubscribe(), (this.errors = void 0)),
          i && (i.unsubscribe(), (this.retriesSubscription = void 0)),
          (this.retries = void 0);
      }),
      (e.prototype.notifyNext = function () {
        var r = this._unsubscribe;
        (this._unsubscribe = null),
          this._unsubscribeAndRecycle(),
          (this._unsubscribe = r),
          this.source.subscribe(this);
      }),
      e
    );
  })(Se);
function UR(t) {
  return function (e) {
    return e.lift(new HR(t));
  };
}
var HR = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new VR(e),
          i = r.subscribe(n);
        return i.add(Ee(this.notifier, new we(n))), i;
      }),
      t
    );
  })(),
  VR = (function (t) {
    A(e, t);
    function e() {
      var r = (t !== null && t.apply(this, arguments)) || this;
      return (r.hasValue = !1), r;
    }
    return (
      (e.prototype._next = function (r) {
        (this.value = r), (this.hasValue = !0);
      }),
      (e.prototype.notifyNext = function () {
        this.emitValue();
      }),
      (e.prototype.notifyComplete = function () {
        this.emitValue();
      }),
      (e.prototype.emitValue = function () {
        this.hasValue &&
          ((this.hasValue = !1), this.destination.next(this.value));
      }),
      e
    );
  })(Se);
function WR(t, e) {
  return (
    e === void 0 && (e = We),
    function (r) {
      return r.lift(new zR(t, e));
    }
  );
}
var zR = (function () {
    function t(e, r) {
      (this.period = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new GR(e, this.period, this.scheduler));
      }),
      t
    );
  })(),
  GR = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.period = n),
        (s.scheduler = i),
        (s.hasValue = !1),
        s.add(i.schedule(qR, n, { subscriber: s, period: n })),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        (this.lastValue = r), (this.hasValue = !0);
      }),
      (e.prototype.notifyNext = function () {
        this.hasValue &&
          ((this.hasValue = !1), this.destination.next(this.lastValue));
      }),
      e
    );
  })(V);
function qR(t) {
  var e = t.subscriber,
    r = t.period;
  e.notifyNext(), this.schedule(t, r);
}
function JR(t, e) {
  return function (r) {
    return r.lift(new ZR(t, e));
  };
}
var ZR = (function () {
    function t(e, r) {
      (this.compareTo = e), (this.comparator = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new QR(e, this.compareTo, this.comparator));
      }),
      t
    );
  })(),
  QR = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.compareTo = n),
        (s.comparator = i),
        (s._a = []),
        (s._b = []),
        (s._oneComplete = !1),
        s.destination.add(n.subscribe(new KR(r, s))),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this._oneComplete && this._b.length === 0
          ? this.emit(!1)
          : (this._a.push(r), this.checkValues());
      }),
      (e.prototype._complete = function () {
        this._oneComplete
          ? this.emit(this._a.length === 0 && this._b.length === 0)
          : (this._oneComplete = !0),
          this.unsubscribe();
      }),
      (e.prototype.checkValues = function () {
        for (
          var r = this, n = r._a, i = r._b, s = r.comparator;
          n.length > 0 && i.length > 0;

        ) {
          var o = n.shift(),
            a = i.shift(),
            c = !1;
          try {
            c = s ? s(o, a) : o === a;
          } catch (u) {
            this.destination.error(u);
          }
          c || this.emit(!1);
        }
      }),
      (e.prototype.emit = function (r) {
        var n = this.destination;
        n.next(r), n.complete();
      }),
      (e.prototype.nextB = function (r) {
        this._oneComplete && this._a.length === 0
          ? this.emit(!1)
          : (this._b.push(r), this.checkValues());
      }),
      (e.prototype.completeB = function () {
        this._oneComplete
          ? this.emit(this._a.length === 0 && this._b.length === 0)
          : (this._oneComplete = !0);
      }),
      e
    );
  })(V),
  KR = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.parent = n), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.parent.nextB(r);
      }),
      (e.prototype._error = function (r) {
        this.parent.error(r), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.parent.completeB(), this.unsubscribe();
      }),
      e
    );
  })(V);
function YR() {
  return new Me();
}
function XR() {
  return function (t) {
    return Su()(Cr(YR)(t));
  };
}
function eI(t, e, r) {
  var n;
  return (
    t && typeof t == "object"
      ? (n = t)
      : (n = { bufferSize: t, windowTime: e, refCount: !1, scheduler: r }),
    function (i) {
      return i.lift(tI(n));
    }
  );
}
function tI(t) {
  var e = t.bufferSize,
    r = e === void 0 ? Number.POSITIVE_INFINITY : e,
    n = t.windowTime,
    i = n === void 0 ? Number.POSITIVE_INFINITY : n,
    s = t.refCount,
    o = t.scheduler,
    a,
    c = 0,
    u,
    l = !1,
    f = !1;
  return function (b) {
    c++;
    var g;
    !a || l
      ? ((l = !1),
        (a = new Ru(r, i, o)),
        (g = a.subscribe(this)),
        (u = b.subscribe({
          next: function (y) {
            a.next(y);
          },
          error: function (y) {
            (l = !0), a.error(y);
          },
          complete: function () {
            (f = !0), (u = void 0), a.complete();
          },
        })),
        f && (u = void 0))
      : (g = a.subscribe(this)),
      this.add(function () {
        c--,
          g.unsubscribe(),
          (g = void 0),
          u &&
            !f &&
            s &&
            c === 0 &&
            (u.unsubscribe(), (u = void 0), (a = void 0));
      });
  };
}
function rI(t) {
  return function (e) {
    return e.lift(new nI(t, e));
  };
}
var nI = (function () {
    function t(e, r) {
      (this.predicate = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new iI(e, this.predicate, this.source));
      }),
      t
    );
  })(),
  iI = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.predicate = n), (s.source = i), (s.seenValue = !1), (s.index = 0), s
      );
    }
    return (
      (e.prototype.applySingleValue = function (r) {
        this.seenValue
          ? this.destination.error("Sequence contains more than one element")
          : ((this.seenValue = !0), (this.singleValue = r));
      }),
      (e.prototype._next = function (r) {
        var n = this.index++;
        this.predicate ? this.tryNext(r, n) : this.applySingleValue(r);
      }),
      (e.prototype.tryNext = function (r, n) {
        try {
          this.predicate(r, n, this.source) && this.applySingleValue(r);
        } catch (i) {
          this.destination.error(i);
        }
      }),
      (e.prototype._complete = function () {
        var r = this.destination;
        this.index > 0
          ? (r.next(this.seenValue ? this.singleValue : void 0), r.complete())
          : r.error(new Ei());
      }),
      e
    );
  })(V);
function sI(t) {
  return function (e) {
    return e.lift(new oI(t));
  };
}
var oI = (function () {
    function t(e) {
      this.total = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new aI(e, this.total));
      }),
      t
    );
  })(),
  aI = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.total = n), (i.count = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        ++this.count > this.total && this.destination.next(r);
      }),
      e
    );
  })(V);
function cI(t) {
  return function (e) {
    return e.lift(new uI(t));
  };
}
var uI = (function () {
    function t(e) {
      if (((this._skipCount = e), this._skipCount < 0)) throw new fn();
    }
    return (
      (t.prototype.call = function (e, r) {
        return this._skipCount === 0
          ? r.subscribe(new V(e))
          : r.subscribe(new lI(e, this._skipCount));
      }),
      t
    );
  })(),
  lI = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i._skipCount = n), (i._count = 0), (i._ring = new Array(n)), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this._skipCount,
          i = this._count++;
        if (i < n) this._ring[i] = r;
        else {
          var s = i % n,
            o = this._ring,
            a = o[s];
          (o[s] = r), this.destination.next(a);
        }
      }),
      e
    );
  })(V);
function fI(t) {
  return function (e) {
    return e.lift(new hI(t));
  };
}
var hI = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new dI(e, this.notifier));
      }),
      t
    );
  })(),
  dI = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      i.hasValue = !1;
      var s = new we(i);
      i.add(s), (i.innerSubscription = s);
      var o = Ee(n, s);
      return o !== s && (i.add(o), (i.innerSubscription = o)), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.hasValue && t.prototype._next.call(this, r);
      }),
      (e.prototype.notifyNext = function () {
        (this.hasValue = !0),
          this.innerSubscription && this.innerSubscription.unsubscribe();
      }),
      (e.prototype.notifyComplete = function () {}),
      e
    );
  })(Se);
function pI(t) {
  return function (e) {
    return e.lift(new bI(t));
  };
}
var bI = (function () {
    function t(e) {
      this.predicate = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new gI(e, this.predicate));
      }),
      t
    );
  })(),
  gI = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.predicate = n), (i.skipping = !0), (i.index = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.destination;
        this.skipping && this.tryCallPredicate(r), this.skipping || n.next(r);
      }),
      (e.prototype.tryCallPredicate = function (r) {
        try {
          var n = this.predicate(r, this.index++);
          this.skipping = !!n;
        } catch (i) {
          this.destination.error(i);
        }
      }),
      e
    );
  })(V);
function mI() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return Qe(r)
    ? (t.pop(),
      function (n) {
        return Qn(t, n, r);
      })
    : function (n) {
        return Qn(t, n);
      };
}
var yI = (function (t) {
  A(e, t);
  function e(r, n, i) {
    n === void 0 && (n = 0), i === void 0 && (i = Wi);
    var s = t.call(this) || this;
    return (
      (s.source = r),
      (s.delayTime = n),
      (s.scheduler = i),
      (!hn(n) || n < 0) && (s.delayTime = 0),
      (!i || typeof i.schedule != "function") && (s.scheduler = Wi),
      s
    );
  }
  return (
    (e.create = function (r, n, i) {
      return n === void 0 && (n = 0), i === void 0 && (i = Wi), new e(r, n, i);
    }),
    (e.dispatch = function (r) {
      var n = r.source,
        i = r.subscriber;
      return this.add(n.subscribe(i));
    }),
    (e.prototype._subscribe = function (r) {
      var n = this.delayTime,
        i = this.source,
        s = this.scheduler;
      return s.schedule(e.dispatch, n, { source: i, subscriber: r });
    }),
    e
  );
})(ee);
function vI(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new _I(t, e));
    }
  );
}
var _I = (function () {
  function t(e, r) {
    (this.scheduler = e), (this.delay = r);
  }
  return (
    (t.prototype.call = function (e, r) {
      return new yI(r, this.delay, this.scheduler).subscribe(e);
    }),
    t
  );
})();
function Kn(t, e) {
  return typeof e == "function"
    ? function (r) {
        return r.pipe(
          Kn(function (n, i) {
            return Vt(t(n, i)).pipe(
              at(function (s, o) {
                return e(n, s, i, o);
              }),
            );
          }),
        );
      }
    : function (r) {
        return r.lift(new wI(t));
      };
}
var wI = (function () {
    function t(e) {
      this.project = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new SI(e, this.project));
      }),
      t
    );
  })(),
  SI = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.project = n), (i.index = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n,
          i = this.index++;
        try {
          n = this.project(r, i);
        } catch (s) {
          this.destination.error(s);
          return;
        }
        this._innerSub(n);
      }),
      (e.prototype._innerSub = function (r) {
        var n = this.innerSubscription;
        n && n.unsubscribe();
        var i = new we(this),
          s = this.destination;
        s.add(i),
          (this.innerSubscription = Ee(r, i)),
          this.innerSubscription !== i && s.add(this.innerSubscription);
      }),
      (e.prototype._complete = function () {
        var r = this.innerSubscription;
        (!r || r.closed) && t.prototype._complete.call(this),
          this.unsubscribe();
      }),
      (e.prototype._unsubscribe = function () {
        this.innerSubscription = void 0;
      }),
      (e.prototype.notifyComplete = function () {
        (this.innerSubscription = void 0),
          this.isStopped && t.prototype._complete.call(this);
      }),
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      e
    );
  })(Se);
function EI() {
  return Kn(tr);
}
function CI(t, e) {
  return e
    ? Kn(function () {
        return t;
      }, e)
    : Kn(function () {
        return t;
      });
}
function RI(t) {
  return function (e) {
    return e.lift(new II(t));
  };
}
var II = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new xI(e),
          i = Ee(this.notifier, new we(n));
        return i && !n.seenValue ? (n.add(i), r.subscribe(n)) : n;
      }),
      t
    );
  })(),
  xI = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.seenValue = !1), n;
    }
    return (
      (e.prototype.notifyNext = function () {
        (this.seenValue = !0), this.complete();
      }),
      (e.prototype.notifyComplete = function () {}),
      e
    );
  })(Se);
function AI(t, e) {
  return (
    e === void 0 && (e = !1),
    function (r) {
      return r.lift(new TI(t, e));
    }
  );
}
var TI = (function () {
    function t(e, r) {
      (this.predicate = e), (this.inclusive = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new kI(e, this.predicate, this.inclusive));
      }),
      t
    );
  })(),
  kI = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.predicate = n), (s.inclusive = i), (s.index = 0), s;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.destination,
          i;
        try {
          i = this.predicate(r, this.index++);
        } catch (s) {
          n.error(s);
          return;
        }
        this.nextOrComplete(r, i);
      }),
      (e.prototype.nextOrComplete = function (r, n) {
        var i = this.destination;
        n ? i.next(r) : (this.inclusive && i.next(r), i.complete());
      }),
      e
    );
  })(V);
function OI(t, e, r) {
  return function (i) {
    return i.lift(new MI(t, e, r));
  };
}
var MI = (function () {
    function t(e, r, n) {
      (this.nextOrObserver = e), (this.error = r), (this.complete = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new NI(e, this.nextOrObserver, this.error, this.complete),
        );
      }),
      t
    );
  })(),
  NI = (function (t) {
    A(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o._tapNext = Et),
        (o._tapError = Et),
        (o._tapComplete = Et),
        (o._tapError = i || Et),
        (o._tapComplete = s || Et),
        un(n)
          ? ((o._context = o), (o._tapNext = n))
          : n &&
            ((o._context = n),
            (o._tapNext = n.next || Et),
            (o._tapError = n.error || Et),
            (o._tapComplete = n.complete || Et)),
        o
      );
    }
    return (
      (e.prototype._next = function (r) {
        try {
          this._tapNext.call(this._context, r);
        } catch (n) {
          this.destination.error(n);
          return;
        }
        this.destination.next(r);
      }),
      (e.prototype._error = function (r) {
        try {
          this._tapError.call(this._context, r);
        } catch (n) {
          this.destination.error(n);
          return;
        }
        this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        try {
          this._tapComplete.call(this._context);
        } catch (r) {
          this.destination.error(r);
          return;
        }
        return this.destination.complete();
      }),
      e
    );
  })(V),
  y0 = { leading: !0, trailing: !1 };
function jI(t, e) {
  return (
    e === void 0 && (e = y0),
    function (r) {
      return r.lift(new LI(t, !!e.leading, !!e.trailing));
    }
  );
}
var LI = (function () {
    function t(e, r, n) {
      (this.durationSelector = e), (this.leading = r), (this.trailing = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new PI(e, this.durationSelector, this.leading, this.trailing),
        );
      }),
      t
    );
  })(),
  PI = (function (t) {
    A(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.destination = r),
        (o.durationSelector = n),
        (o._leading = i),
        (o._trailing = s),
        (o._hasValue = !1),
        o
      );
    }
    return (
      (e.prototype._next = function (r) {
        (this._hasValue = !0),
          (this._sendValue = r),
          this._throttled || (this._leading ? this.send() : this.throttle(r));
      }),
      (e.prototype.send = function () {
        var r = this,
          n = r._hasValue,
          i = r._sendValue;
        n && (this.destination.next(i), this.throttle(i)),
          (this._hasValue = !1),
          (this._sendValue = void 0);
      }),
      (e.prototype.throttle = function (r) {
        var n = this.tryDurationSelector(r);
        n && this.add((this._throttled = Ee(n, new we(this))));
      }),
      (e.prototype.tryDurationSelector = function (r) {
        try {
          return this.durationSelector(r);
        } catch (n) {
          return this.destination.error(n), null;
        }
      }),
      (e.prototype.throttlingDone = function () {
        var r = this,
          n = r._throttled,
          i = r._trailing;
        n && n.unsubscribe(), (this._throttled = void 0), i && this.send();
      }),
      (e.prototype.notifyNext = function () {
        this.throttlingDone();
      }),
      (e.prototype.notifyComplete = function () {
        this.throttlingDone();
      }),
      e
    );
  })(Se);
function DI(t, e, r) {
  return (
    e === void 0 && (e = We),
    r === void 0 && (r = y0),
    function (n) {
      return n.lift(new $I(t, e, r.leading, r.trailing));
    }
  );
}
var $I = (function () {
    function t(e, r, n, i) {
      (this.duration = e),
        (this.scheduler = r),
        (this.leading = n),
        (this.trailing = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new BI(e, this.duration, this.scheduler, this.leading, this.trailing),
        );
      }),
      t
    );
  })(),
  BI = (function (t) {
    A(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.duration = n),
        (a.scheduler = i),
        (a.leading = s),
        (a.trailing = o),
        (a._hasTrailingValue = !1),
        (a._trailingValue = null),
        a
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.throttled
          ? this.trailing &&
            ((this._trailingValue = r), (this._hasTrailingValue = !0))
          : (this.add(
              (this.throttled = this.scheduler.schedule(FI, this.duration, {
                subscriber: this,
              })),
            ),
            this.leading
              ? this.destination.next(r)
              : this.trailing &&
                ((this._trailingValue = r), (this._hasTrailingValue = !0)));
      }),
      (e.prototype._complete = function () {
        this._hasTrailingValue
          ? (this.destination.next(this._trailingValue),
            this.destination.complete())
          : this.destination.complete();
      }),
      (e.prototype.clearThrottle = function () {
        var r = this.throttled;
        r &&
          (this.trailing &&
            this._hasTrailingValue &&
            (this.destination.next(this._trailingValue),
            (this._trailingValue = null),
            (this._hasTrailingValue = !1)),
          r.unsubscribe(),
          this.remove(r),
          (this.throttled = null));
      }),
      e
    );
  })(V);
function FI(t) {
  var e = t.subscriber;
  e.clearThrottle();
}
function UI(t) {
  return (
    t === void 0 && (t = We),
    function (e) {
      return Au(function () {
        return e.pipe(
          as(
            function (r, n) {
              var i = r.current;
              return { value: n, current: t.now(), last: i };
            },
            { current: t.now(), value: void 0, last: void 0 },
          ),
          at(function (r) {
            var n = r.current,
              i = r.last,
              s = r.value;
            return new HI(s, n - i);
          }),
        );
      });
    }
  );
}
var HI = (function () {
  function t(e, r) {
    (this.value = e), (this.interval = r);
  }
  return t;
})();
function v0(t, e, r) {
  return (
    r === void 0 && (r = We),
    function (n) {
      var i = p0(t),
        s = i ? +t - r.now() : Math.abs(t);
      return n.lift(new VI(s, i, e, r));
    }
  );
}
var VI = (function () {
    function t(e, r, n, i) {
      (this.waitFor = e),
        (this.absoluteTimeout = r),
        (this.withObservable = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new WI(
            e,
            this.absoluteTimeout,
            this.waitFor,
            this.withObservable,
            this.scheduler,
          ),
        );
      }),
      t
    );
  })(),
  WI = (function (t) {
    A(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.absoluteTimeout = n),
        (a.waitFor = i),
        (a.withObservable = s),
        (a.scheduler = o),
        a.scheduleTimeout(),
        a
      );
    }
    return (
      (e.dispatchTimeout = function (r) {
        var n = r.withObservable;
        r._unsubscribeAndRecycle(), r.add(Ee(n, new we(r)));
      }),
      (e.prototype.scheduleTimeout = function () {
        var r = this.action;
        r
          ? (this.action = r.schedule(this, this.waitFor))
          : this.add(
              (this.action = this.scheduler.schedule(
                e.dispatchTimeout,
                this.waitFor,
                this,
              )),
            );
      }),
      (e.prototype._next = function (r) {
        this.absoluteTimeout || this.scheduleTimeout(),
          t.prototype._next.call(this, r);
      }),
      (e.prototype._unsubscribe = function () {
        (this.action = void 0),
          (this.scheduler = null),
          (this.withObservable = null);
      }),
      e
    );
  })(Se);
function zI(t, e) {
  return e === void 0 && (e = We), v0(t, Cu(new Op()), e);
}
function GI(t) {
  return (
    t === void 0 && (t = We),
    at(function (e) {
      return new qI(e, t.now());
    })
  );
}
var qI = (function () {
  function t(e, r) {
    (this.value = e), (this.timestamp = r);
  }
  return t;
})();
function JI(t, e, r) {
  return r === 0 ? [e] : (t.push(e), t);
}
function ZI() {
  return so(JI, []);
}
function QI(t) {
  return function (r) {
    return r.lift(new KI(t));
  };
}
var KI = (function () {
    function t(e) {
      this.windowBoundaries = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new YI(e),
          i = r.subscribe(n);
        return i.closed || n.add(Ee(this.windowBoundaries, new we(n))), i;
      }),
      t
    );
  })(),
  YI = (function (t) {
    A(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.window = new Me()), r.next(n.window), n;
    }
    return (
      (e.prototype.notifyNext = function () {
        this.openWindow();
      }),
      (e.prototype.notifyError = function (r) {
        this._error(r);
      }),
      (e.prototype.notifyComplete = function () {
        this._complete();
      }),
      (e.prototype._next = function (r) {
        this.window.next(r);
      }),
      (e.prototype._error = function (r) {
        this.window.error(r), this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        this.window.complete(), this.destination.complete();
      }),
      (e.prototype._unsubscribe = function () {
        this.window = null;
      }),
      (e.prototype.openWindow = function () {
        var r = this.window;
        r && r.complete();
        var n = this.destination,
          i = (this.window = new Me());
        n.next(i);
      }),
      e
    );
  })(Se);
function XI(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new ex(t, e));
    }
  );
}
var ex = (function () {
    function t(e, r) {
      (this.windowSize = e), (this.startWindowEvery = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new tx(e, this.windowSize, this.startWindowEvery));
      }),
      t
    );
  })(),
  tx = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.destination = r),
        (s.windowSize = n),
        (s.startWindowEvery = i),
        (s.windows = [new Me()]),
        (s.count = 0),
        r.next(s.windows[0]),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        for (
          var n =
              this.startWindowEvery > 0
                ? this.startWindowEvery
                : this.windowSize,
            i = this.destination,
            s = this.windowSize,
            o = this.windows,
            a = o.length,
            c = 0;
          c < a && !this.closed;
          c++
        )
          o[c].next(r);
        var u = this.count - s + 1;
        if (
          (u >= 0 && u % n === 0 && !this.closed && o.shift().complete(),
          ++this.count % n === 0 && !this.closed)
        ) {
          var l = new Me();
          o.push(l), i.next(l);
        }
      }),
      (e.prototype._error = function (r) {
        var n = this.windows;
        if (n) for (; n.length > 0 && !this.closed; ) n.shift().error(r);
        this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        var r = this.windows;
        if (r) for (; r.length > 0 && !this.closed; ) r.shift().complete();
        this.destination.complete();
      }),
      (e.prototype._unsubscribe = function () {
        (this.count = 0), (this.windows = null);
      }),
      e
    );
  })(V);
function rx(t) {
  var e = We,
    r = null,
    n = Number.POSITIVE_INFINITY;
  return (
    Qe(arguments[3]) && (e = arguments[3]),
    Qe(arguments[2])
      ? (e = arguments[2])
      : hn(arguments[2]) && (n = Number(arguments[2])),
    Qe(arguments[1])
      ? (e = arguments[1])
      : hn(arguments[1]) && (r = Number(arguments[1])),
    function (s) {
      return s.lift(new nx(t, r, n, e));
    }
  );
}
var nx = (function () {
    function t(e, r, n, i) {
      (this.windowTimeSpan = e),
        (this.windowCreationInterval = r),
        (this.maxWindowSize = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new sx(
            e,
            this.windowTimeSpan,
            this.windowCreationInterval,
            this.maxWindowSize,
            this.scheduler,
          ),
        );
      }),
      t
    );
  })(),
  ix = (function (t) {
    A(e, t);
    function e() {
      var r = (t !== null && t.apply(this, arguments)) || this;
      return (r._numberOfNextedValues = 0), r;
    }
    return (
      (e.prototype.next = function (r) {
        this._numberOfNextedValues++, t.prototype.next.call(this, r);
      }),
      Object.defineProperty(e.prototype, "numberOfNextedValues", {
        get: function () {
          return this._numberOfNextedValues;
        },
        enumerable: !0,
        configurable: !0,
      }),
      e
    );
  })(Me),
  sx = (function (t) {
    A(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      (a.destination = r),
        (a.windowTimeSpan = n),
        (a.windowCreationInterval = i),
        (a.maxWindowSize = s),
        (a.scheduler = o),
        (a.windows = []);
      var c = a.openWindow();
      if (i !== null && i >= 0) {
        var u = { subscriber: a, window: c, context: null },
          l = {
            windowTimeSpan: n,
            windowCreationInterval: i,
            subscriber: a,
            scheduler: o,
          };
        a.add(o.schedule(_0, n, u)), a.add(o.schedule(ax, i, l));
      } else {
        var f = { subscriber: a, window: c, windowTimeSpan: n };
        a.add(o.schedule(ox, n, f));
      }
      return a;
    }
    return (
      (e.prototype._next = function (r) {
        for (var n = this.windows, i = n.length, s = 0; s < i; s++) {
          var o = n[s];
          o.closed ||
            (o.next(r),
            o.numberOfNextedValues >= this.maxWindowSize &&
              this.closeWindow(o));
        }
      }),
      (e.prototype._error = function (r) {
        for (var n = this.windows; n.length > 0; ) n.shift().error(r);
        this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        for (var r = this.windows; r.length > 0; ) {
          var n = r.shift();
          n.closed || n.complete();
        }
        this.destination.complete();
      }),
      (e.prototype.openWindow = function () {
        var r = new ix();
        this.windows.push(r);
        var n = this.destination;
        return n.next(r), r;
      }),
      (e.prototype.closeWindow = function (r) {
        r.complete();
        var n = this.windows;
        n.splice(n.indexOf(r), 1);
      }),
      e
    );
  })(V);
function ox(t) {
  var e = t.subscriber,
    r = t.windowTimeSpan,
    n = t.window;
  n && e.closeWindow(n), (t.window = e.openWindow()), this.schedule(t, r);
}
function ax(t) {
  var e = t.windowTimeSpan,
    r = t.subscriber,
    n = t.scheduler,
    i = t.windowCreationInterval,
    s = r.openWindow(),
    o = this,
    a = { action: o, subscription: null },
    c = { subscriber: r, window: s, context: a };
  (a.subscription = n.schedule(_0, e, c)),
    o.add(a.subscription),
    o.schedule(t, i);
}
function _0(t) {
  var e = t.subscriber,
    r = t.window,
    n = t.context;
  n && n.action && n.subscription && n.action.remove(n.subscription),
    e.closeWindow(r);
}
function cx(t, e) {
  return function (r) {
    return r.lift(new ux(t, e));
  };
}
var ux = (function () {
    function t(e, r) {
      (this.openings = e), (this.closingSelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new lx(e, this.openings, this.closingSelector));
      }),
      t
    );
  })(),
  lx = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.openings = n),
        (s.closingSelector = i),
        (s.contexts = []),
        s.add((s.openSubscription = Ut(s, n, n))),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.contexts;
        if (n) for (var i = n.length, s = 0; s < i; s++) n[s].window.next(r);
      }),
      (e.prototype._error = function (r) {
        var n = this.contexts;
        if (((this.contexts = null), n))
          for (var i = n.length, s = -1; ++s < i; ) {
            var o = n[s];
            o.window.error(r), o.subscription.unsubscribe();
          }
        t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        var r = this.contexts;
        if (((this.contexts = null), r))
          for (var n = r.length, i = -1; ++i < n; ) {
            var s = r[i];
            s.window.complete(), s.subscription.unsubscribe();
          }
        t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        var r = this.contexts;
        if (((this.contexts = null), r))
          for (var n = r.length, i = -1; ++i < n; ) {
            var s = r[i];
            s.window.unsubscribe(), s.subscription.unsubscribe();
          }
      }),
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        if (r === this.openings) {
          var a = void 0;
          try {
            var c = this.closingSelector;
            a = c(n);
          } catch (b) {
            return this.error(b);
          }
          var u = new Me(),
            l = new _e(),
            f = { window: u, subscription: l };
          this.contexts.push(f);
          var h = Ut(this, a, f);
          h.closed
            ? this.closeWindow(this.contexts.length - 1)
            : ((h.context = f), l.add(h)),
            this.destination.next(u);
        } else this.closeWindow(this.contexts.indexOf(r));
      }),
      (e.prototype.notifyError = function (r) {
        this.error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        r !== this.openSubscription &&
          this.closeWindow(this.contexts.indexOf(r.context));
      }),
      (e.prototype.closeWindow = function (r) {
        if (r !== -1) {
          var n = this.contexts,
            i = n[r],
            s = i.window,
            o = i.subscription;
          n.splice(r, 1), s.complete(), o.unsubscribe();
        }
      }),
      e
    );
  })(Mr);
function fx(t) {
  return function (r) {
    return r.lift(new hx(t));
  };
}
var hx = (function () {
    function t(e) {
      this.closingSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new dx(e, this.closingSelector));
      }),
      t
    );
  })(),
  dx = (function (t) {
    A(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.destination = r), (i.closingSelector = n), i.openWindow(), i;
    }
    return (
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        this.openWindow(o);
      }),
      (e.prototype.notifyError = function (r) {
        this._error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        this.openWindow(r);
      }),
      (e.prototype._next = function (r) {
        this.window.next(r);
      }),
      (e.prototype._error = function (r) {
        this.window.error(r),
          this.destination.error(r),
          this.unsubscribeClosingNotification();
      }),
      (e.prototype._complete = function () {
        this.window.complete(),
          this.destination.complete(),
          this.unsubscribeClosingNotification();
      }),
      (e.prototype.unsubscribeClosingNotification = function () {
        this.closingNotification && this.closingNotification.unsubscribe();
      }),
      (e.prototype.openWindow = function (r) {
        r === void 0 && (r = null), r && (this.remove(r), r.unsubscribe());
        var n = this.window;
        n && n.complete();
        var i = (this.window = new Me());
        this.destination.next(i);
        var s;
        try {
          var o = this.closingSelector;
          s = o();
        } catch (a) {
          this.destination.error(a), this.window.error(a);
          return;
        }
        this.add((this.closingNotification = Ut(this, s)));
      }),
      e
    );
  })(Mr);
function px() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    var n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    var i = t;
    return r.lift(new bx(i, n));
  };
}
var bx = (function () {
    function t(e, r) {
      (this.observables = e), (this.project = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new gx(e, this.observables, this.project));
      }),
      t
    );
  })(),
  gx = (function (t) {
    A(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      (s.observables = n), (s.project = i), (s.toRespond = []);
      var o = n.length;
      s.values = new Array(o);
      for (var a = 0; a < o; a++) s.toRespond.push(a);
      for (var a = 0; a < o; a++) {
        var c = n[a];
        s.add(Ut(s, c, void 0, a));
      }
      return s;
    }
    return (
      (e.prototype.notifyNext = function (r, n, i) {
        this.values[i] = n;
        var s = this.toRespond;
        if (s.length > 0) {
          var o = s.indexOf(i);
          o !== -1 && s.splice(o, 1);
        }
      }),
      (e.prototype.notifyComplete = function () {}),
      (e.prototype._next = function (r) {
        if (this.toRespond.length === 0) {
          var n = [r].concat(this.values);
          this.project ? this._tryProject(n) : this.destination.next(n);
        }
      }),
      (e.prototype._tryProject = function (r) {
        var n;
        try {
          n = this.project.apply(this, r);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(Mr);
function mx() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (n) {
    return n.lift.call(Gp.apply(void 0, [n].concat(t)));
  };
}
function yx(t) {
  return function (e) {
    return e.lift(new qp(t));
  };
}
const vx = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        audit: f0,
        auditTime: vC,
        buffer: _C,
        bufferCount: EC,
        bufferTime: xC,
        bufferToggle: MC,
        bufferWhen: LC,
        catchError: $C,
        combineAll: UC,
        combineLatest: HC,
        concat: VC,
        concatAll: Dp,
        concatMap: d0,
        concatMapTo: WC,
        count: zC,
        debounce: JC,
        debounceTime: KC,
        defaultIfEmpty: Ri,
        delay: n5,
        delayWhen: a5,
        dematerialize: f5,
        distinct: p5,
        distinctUntilChanged: b0,
        distinctUntilKeyChanged: v5,
        elementAt: R5,
        endWith: I5,
        every: x5,
        exhaust: k5,
        exhaustMap: g0,
        expand: L5,
        filter: nr,
        finalize: $5,
        find: U5,
        findIndex: V5,
        first: W5,
        flatMap: F3,
        groupBy: J2,
        ignoreElements: z5,
        isEmpty: J5,
        last: X5,
        map: at,
        mapTo: eR,
        materialize: nR,
        max: cR,
        merge: uR,
        mergeAll: xu,
        mergeMap: Er,
        mergeMapTo: lR,
        mergeScan: fR,
        min: pR,
        multicast: Cr,
        observeOn: i3,
        onErrorResumeNext: gR,
        pairwise: vR,
        partition: SR,
        pluck: ER,
        publish: RR,
        publishBehavior: IR,
        publishLast: xR,
        publishReplay: AR,
        race: TR,
        reduce: so,
        refCount: Su,
        repeat: kR,
        repeatWhen: MR,
        retry: LR,
        retryWhen: $R,
        sample: UR,
        sampleTime: WR,
        scan: as,
        sequenceEqual: JR,
        share: XR,
        shareReplay: eI,
        single: rI,
        skip: sI,
        skipLast: cI,
        skipUntil: fI,
        skipWhile: pI,
        startWith: mI,
        subscribeOn: vI,
        switchAll: EI,
        switchMap: Kn,
        switchMapTo: CI,
        take: Uu,
        takeLast: os,
        takeUntil: RI,
        takeWhile: AI,
        tap: OI,
        throttle: jI,
        throttleTime: DI,
        throwIfEmpty: io,
        timeInterval: UI,
        timeout: zI,
        timeoutWith: v0,
        timestamp: GI,
        toArray: ZI,
        window: QI,
        windowCount: XI,
        windowTime: rx,
        windowToggle: cx,
        windowWhen: fx,
        withLatestFrom: px,
        zip: mx,
        zipAll: yx,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Hu = Rr(vx);
var oo = {},
  rt = {};
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.ClientMessagePublishEvent =
  rt.ClientMessageSetSessionConfig =
  rt.ClientMessageGetSessionConfig =
  rt.ClientMessageIsLinked =
  rt.ClientMessageHostSession =
    void 0;
function _x(t) {
  return Object.assign({ type: "HostSession" }, t);
}
rt.ClientMessageHostSession = _x;
function wx(t) {
  return Object.assign({ type: "IsLinked" }, t);
}
rt.ClientMessageIsLinked = wx;
function Sx(t) {
  return Object.assign({ type: "GetSessionConfig" }, t);
}
rt.ClientMessageGetSessionConfig = Sx;
function Ex(t) {
  return Object.assign({ type: "SetSessionConfig" }, t);
}
rt.ClientMessageSetSessionConfig = Ex;
function Cx(t) {
  return Object.assign({ type: "PublishEvent" }, t);
}
rt.ClientMessagePublishEvent = Cx;
var w0 = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.RxWebSocket = t.ConnectionState = void 0);
  const e = Vs,
    r = Hu;
  var n;
  (function (s) {
    (s[(s.DISCONNECTED = 0)] = "DISCONNECTED"),
      (s[(s.CONNECTING = 1)] = "CONNECTING"),
      (s[(s.CONNECTED = 2)] = "CONNECTED");
  })((n = t.ConnectionState || (t.ConnectionState = {})));
  class i {
    constructor(o, a = WebSocket) {
      (this.WebSocketClass = a),
        (this.webSocket = null),
        (this.connectionStateSubject = new e.BehaviorSubject(n.DISCONNECTED)),
        (this.incomingDataSubject = new e.Subject()),
        (this.url = o.replace(/^http/, "ws"));
    }
    connect() {
      return this.webSocket
        ? (0, e.throwError)(new Error("webSocket object is not null"))
        : new e.Observable((o) => {
            let a;
            try {
              this.webSocket = a = new this.WebSocketClass(this.url);
            } catch (c) {
              o.error(c);
              return;
            }
            this.connectionStateSubject.next(n.CONNECTING),
              (a.onclose = (c) => {
                this.clearWebSocket(),
                  o.error(new Error(`websocket error ${c.code}: ${c.reason}`)),
                  this.connectionStateSubject.next(n.DISCONNECTED);
              }),
              (a.onopen = (c) => {
                o.next(),
                  o.complete(),
                  this.connectionStateSubject.next(n.CONNECTED);
              }),
              (a.onmessage = (c) => {
                this.incomingDataSubject.next(c.data);
              });
          }).pipe((0, r.take)(1));
    }
    disconnect() {
      const { webSocket: o } = this;
      if (o) {
        this.clearWebSocket(), this.connectionStateSubject.next(n.DISCONNECTED);
        try {
          o.close();
        } catch {}
      }
    }
    get connectionState$() {
      return this.connectionStateSubject.asObservable();
    }
    get incomingData$() {
      return this.incomingDataSubject.asObservable();
    }
    get incomingJSONData$() {
      return this.incomingData$.pipe(
        (0, r.flatMap)((o) => {
          let a;
          try {
            a = JSON.parse(o);
          } catch {
            return (0, e.empty)();
          }
          return (0, e.of)(a);
        }),
      );
    }
    sendData(o) {
      const { webSocket: a } = this;
      if (!a) throw new Error("websocket is not connected");
      a.send(o);
    }
    clearWebSocket() {
      const { webSocket: o } = this;
      o &&
        ((this.webSocket = null),
        (o.onclose = null),
        (o.onerror = null),
        (o.onmessage = null),
        (o.onopen = null));
    }
  }
  t.RxWebSocket = i;
})(w0);
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.isServerMessageFail = void 0;
function Rx(t) {
  return (
    t &&
    t.type === "Fail" &&
    typeof t.id == "number" &&
    typeof t.sessionId == "string" &&
    typeof t.error == "string"
  );
}
ao.isServerMessageFail = Rx;
Object.defineProperty(oo, "__esModule", { value: !0 });
oo.WalletSDKConnection = void 0;
const ut = Vs,
  ie = Hu,
  jn = vn,
  Ur = ai,
  Ln = rt,
  Pn = yn,
  Fi = w0,
  Ya = ao,
  uh = 1e4,
  Ix = 6e4;
class xx {
  constructor(e, r, n, i, s = WebSocket) {
    (this.sessionId = e),
      (this.sessionKey = r),
      (this.diagnostic = i),
      (this.subscriptions = new ut.Subscription()),
      (this.destroyed = !1),
      (this.lastHeartbeatResponse = 0),
      (this.nextReqId = (0, Ur.IntNumber)(1)),
      (this.connectedSubject = new ut.BehaviorSubject(!1)),
      (this.linkedSubject = new ut.BehaviorSubject(!1)),
      (this.sessionConfigSubject = new ut.ReplaySubject(1));
    const o = new Fi.RxWebSocket(n + "/rpc", s);
    (this.ws = o),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, ie.tap)((a) => {
              var c;
              return (c = this.diagnostic) === null || c === void 0
                ? void 0
                : c.log(Pn.EVENTS.CONNECTED_STATE_CHANGE, {
                    state: a,
                    sessionIdHash: jn.Session.hash(e),
                  });
            }),
            (0, ie.skip)(1),
            (0, ie.filter)(
              (a) => a === Fi.ConnectionState.DISCONNECTED && !this.destroyed,
            ),
            (0, ie.delay)(5e3),
            (0, ie.filter)((a) => !this.destroyed),
            (0, ie.flatMap)((a) => o.connect()),
            (0, ie.retry)(),
          )
          .subscribe(),
      ),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, ie.skip)(2),
            (0, ie.switchMap)((a) =>
              (0, ut.iif)(
                () => a === Fi.ConnectionState.CONNECTED,
                this.authenticate().pipe(
                  (0, ie.tap)((c) => this.sendIsLinked()),
                  (0, ie.tap)((c) => this.sendGetSessionConfig()),
                  (0, ie.map)((c) => !0),
                ),
                (0, ut.of)(!1),
              ),
            ),
            (0, ie.distinctUntilChanged)(),
            (0, ie.catchError)((a) => (0, ut.of)(!1)),
          )
          .subscribe((a) => this.connectedSubject.next(a)),
      ),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, ie.skip)(1),
            (0, ie.switchMap)((a) =>
              (0, ut.iif)(
                () => a === Fi.ConnectionState.CONNECTED,
                (0, ut.timer)(0, uh),
              ),
            ),
          )
          .subscribe((a) =>
            a === 0 ? this.updateLastHeartbeat() : this.heartbeat(),
          ),
      ),
      this.subscriptions.add(
        o.incomingData$
          .pipe((0, ie.filter)((a) => a === "h"))
          .subscribe((a) => this.updateLastHeartbeat()),
      ),
      this.subscriptions.add(
        o.incomingJSONData$
          .pipe(
            (0, ie.filter)((a) => ["IsLinkedOK", "Linked"].includes(a.type)),
          )
          .subscribe((a) => {
            var c;
            const u = a;
            (c = this.diagnostic) === null ||
              c === void 0 ||
              c.log(Pn.EVENTS.LINKED, {
                sessionIdHash: jn.Session.hash(e),
                linked: u.linked,
                type: a.type,
                onlineGuests: u.onlineGuests,
              }),
              this.linkedSubject.next(u.linked || u.onlineGuests > 0);
          }),
      ),
      this.subscriptions.add(
        o.incomingJSONData$
          .pipe(
            (0, ie.filter)((a) =>
              ["GetSessionConfigOK", "SessionConfigUpdated"].includes(a.type),
            ),
          )
          .subscribe((a) => {
            var c;
            const u = a;
            (c = this.diagnostic) === null ||
              c === void 0 ||
              c.log(Pn.EVENTS.SESSION_CONFIG_RECEIVED, {
                sessionIdHash: jn.Session.hash(e),
                metadata_keys:
                  u && u.metadata ? Object.keys(u.metadata) : void 0,
              }),
              this.sessionConfigSubject.next({
                webhookId: u.webhookId,
                webhookUrl: u.webhookUrl,
                metadata: u.metadata,
              });
          }),
      );
  }
  connect() {
    var e;
    if (this.destroyed) throw new Error("instance is destroyed");
    (e = this.diagnostic) === null ||
      e === void 0 ||
      e.log(Pn.EVENTS.STARTED_CONNECTING, {
        sessionIdHash: jn.Session.hash(this.sessionId),
      }),
      this.ws.connect().subscribe();
  }
  destroy() {
    var e;
    this.subscriptions.unsubscribe(),
      this.ws.disconnect(),
      (e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(Pn.EVENTS.DISCONNECTED, {
          sessionIdHash: jn.Session.hash(this.sessionId),
        }),
      (this.destroyed = !0);
  }
  get isDestroyed() {
    return this.destroyed;
  }
  get connected$() {
    return this.connectedSubject.asObservable();
  }
  get onceConnected$() {
    return this.connected$.pipe(
      (0, ie.filter)((e) => e),
      (0, ie.take)(1),
      (0, ie.map)(() => {}),
    );
  }
  get linked$() {
    return this.linkedSubject.asObservable();
  }
  get onceLinked$() {
    return this.linked$.pipe(
      (0, ie.filter)((e) => e),
      (0, ie.take)(1),
      (0, ie.map)(() => {}),
    );
  }
  get sessionConfig$() {
    return this.sessionConfigSubject.asObservable();
  }
  get incomingEvent$() {
    return this.ws.incomingJSONData$.pipe(
      (0, ie.filter)((e) => {
        if (e.type !== "Event") return !1;
        const r = e;
        return (
          typeof r.sessionId == "string" &&
          typeof r.eventId == "string" &&
          typeof r.event == "string" &&
          typeof r.data == "string"
        );
      }),
      (0, ie.map)((e) => e),
    );
  }
  setSessionMetadata(e, r) {
    const n = (0, Ln.ClientMessageSetSessionConfig)({
      id: (0, Ur.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      metadata: { [e]: r },
    });
    return this.onceConnected$.pipe(
      (0, ie.flatMap)((i) => this.makeRequest(n)),
      (0, ie.map)((i) => {
        if ((0, Ya.isServerMessageFail)(i))
          throw new Error(i.error || "failed to set session metadata");
      }),
    );
  }
  publishEvent(e, r, n = !1) {
    const i = (0, Ln.ClientMessagePublishEvent)({
      id: (0, Ur.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      event: e,
      data: r,
      callWebhook: n,
    });
    return this.onceLinked$.pipe(
      (0, ie.flatMap)((s) => this.makeRequest(i)),
      (0, ie.map)((s) => {
        if ((0, Ya.isServerMessageFail)(s))
          throw new Error(s.error || "failed to publish event");
        return s.eventId;
      }),
    );
  }
  sendData(e) {
    this.ws.sendData(JSON.stringify(e));
  }
  updateLastHeartbeat() {
    this.lastHeartbeatResponse = Date.now();
  }
  heartbeat() {
    if (Date.now() - this.lastHeartbeatResponse > uh * 2) {
      this.ws.disconnect();
      return;
    }
    try {
      this.ws.sendData("h");
    } catch {}
  }
  makeRequest(e, r = Ix) {
    const n = e.id;
    try {
      this.sendData(e);
    } catch (i) {
      return (0, ut.throwError)(i);
    }
    return this.ws.incomingJSONData$.pipe(
      (0, ie.timeoutWith)(
        r,
        (0, ut.throwError)(new Error(`request ${n} timed out`)),
      ),
      (0, ie.filter)((i) => i.id === n),
      (0, ie.take)(1),
    );
  }
  authenticate() {
    const e = (0, Ln.ClientMessageHostSession)({
      id: (0, Ur.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      sessionKey: this.sessionKey,
    });
    return this.makeRequest(e).pipe(
      (0, ie.map)((r) => {
        if ((0, Ya.isServerMessageFail)(r))
          throw new Error(r.error || "failed to authentcate");
      }),
    );
  }
  sendIsLinked() {
    const e = (0, Ln.ClientMessageIsLinked)({
      id: (0, Ur.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
    });
    this.sendData(e);
  }
  sendGetSessionConfig() {
    const e = (0, Ln.ClientMessageGetSessionConfig)({
      id: (0, Ur.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
    });
    this.sendData(e);
  }
}
oo.WalletSDKConnection = xx;
var pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.decrypt = pn.encrypt = void 0;
const cs = H;
async function Ax(t, e) {
  if (e.length !== 64) throw Error("secret must be 256 bits");
  const r = crypto.getRandomValues(new Uint8Array(12)),
    n = await crypto.subtle.importKey(
      "raw",
      (0, cs.hexStringToUint8Array)(e),
      { name: "aes-gcm" },
      !1,
      ["encrypt", "decrypt"],
    ),
    i = new TextEncoder(),
    s = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: r },
      n,
      i.encode(t),
    ),
    o = 16,
    a = s.slice(s.byteLength - o),
    c = s.slice(0, s.byteLength - o),
    u = new Uint8Array(a),
    l = new Uint8Array(c),
    f = new Uint8Array([...r, ...u, ...l]);
  return (0, cs.uint8ArrayToHex)(f);
}
pn.encrypt = Ax;
function Tx(t, e) {
  if (e.length !== 64) throw Error("secret must be 256 bits");
  return new Promise((r, n) => {
    (async function () {
      const i = await crypto.subtle.importKey(
          "raw",
          (0, cs.hexStringToUint8Array)(e),
          { name: "aes-gcm" },
          !1,
          ["encrypt", "decrypt"],
        ),
        s = (0, cs.hexStringToUint8Array)(t),
        o = s.slice(0, 12),
        a = s.slice(12, 28),
        c = s.slice(28),
        u = new Uint8Array([...c, ...a]),
        l = { name: "AES-GCM", iv: new Uint8Array(o) };
      try {
        const f = await window.crypto.subtle.decrypt(l, i, u),
          h = new TextDecoder();
        r(h.decode(f));
      } catch (f) {
        n(f);
      }
    })();
  });
}
pn.decrypt = Tx;
var co = {},
  uo = {};
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.RelayMessageType = void 0),
    (function (e) {
      (e.SESSION_ID_REQUEST = "SESSION_ID_REQUEST"),
        (e.SESSION_ID_RESPONSE = "SESSION_ID_RESPONSE"),
        (e.LINKED = "LINKED"),
        (e.UNLINKED = "UNLINKED"),
        (e.WEB3_REQUEST = "WEB3_REQUEST"),
        (e.WEB3_REQUEST_CANCELED = "WEB3_REQUEST_CANCELED"),
        (e.WEB3_RESPONSE = "WEB3_RESPONSE");
    })(t.RelayMessageType || (t.RelayMessageType = {}));
})(uo);
Object.defineProperty(co, "__esModule", { value: !0 });
co.Web3RequestCanceledMessage = void 0;
const kx = uo;
function Ox(t) {
  return { type: kx.RelayMessageType.WEB3_REQUEST_CANCELED, id: t };
}
co.Web3RequestCanceledMessage = Ox;
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
lo.Web3RequestMessage = void 0;
const Mx = uo;
function Nx(t) {
  return Object.assign({ type: Mx.RelayMessageType.WEB3_REQUEST }, t);
}
lo.Web3RequestMessage = Nx;
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.isWeb3ResponseMessage = bn.Web3ResponseMessage = void 0;
const S0 = uo;
function jx(t) {
  return Object.assign({ type: S0.RelayMessageType.WEB3_RESPONSE }, t);
}
bn.Web3ResponseMessage = jx;
function Lx(t) {
  return t && t.type === S0.RelayMessageType.WEB3_RESPONSE;
}
bn.isWeb3ResponseMessage = Lx;
var Px =
    (F && F.__createBinding) ||
    (Object.create
      ? function (t, e, r, n) {
          n === void 0 && (n = r),
            Object.defineProperty(t, n, {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            });
        }
      : function (t, e, r, n) {
          n === void 0 && (n = r), (t[n] = e[r]);
        }),
  Dx =
    (F && F.__setModuleDefault) ||
    (Object.create
      ? function (t, e) {
          Object.defineProperty(t, "default", { enumerable: !0, value: e });
        }
      : function (t, e) {
          t.default = e;
        }),
  E0 =
    (F && F.__decorate) ||
    function (t, e, r, n) {
      var i = arguments.length,
        s =
          i < 3
            ? e
            : n === null
            ? (n = Object.getOwnPropertyDescriptor(e, r))
            : n,
        o;
      if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
        s = Reflect.decorate(t, e, r, n);
      else
        for (var a = t.length - 1; a >= 0; a--)
          (o = t[a]) &&
            (s = (i < 3 ? o(s) : i > 3 ? o(e, r, s) : o(e, r)) || s);
      return i > 3 && s && Object.defineProperty(e, r, s), s;
    },
  $x =
    (F && F.__importStar) ||
    function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (t != null)
        for (var r in t)
          r !== "default" &&
            Object.prototype.hasOwnProperty.call(t, r) &&
            Px(e, t, r);
      return Dx(e, t), e;
    },
  Bx =
    (F && F.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.WalletSDKRelay = void 0;
const C0 = Bx(no),
  ur = Vs,
  Ie = Hu,
  $e = yn,
  Fx = oo,
  Hr = si,
  Ux = ai,
  me = H,
  Gt = $x(pn),
  qt = vn,
  Ui = dt,
  Ne = Cs,
  Hx = co,
  Vx = lo,
  et = be,
  Ge = bn;
class ht extends Ui.WalletSDKRelayAbstract {
  constructor(e) {
    var r;
    super(),
      (this.accountsCallback = null),
      (this.chainCallback = null),
      (this.dappDefaultChainSubject = new ur.BehaviorSubject(1)),
      (this.dappDefaultChain = 1),
      (this.appName = ""),
      (this.appLogoUrl = null),
      (this.subscriptions = new ur.Subscription()),
      (this.linkAPIUrl = e.linkAPIUrl),
      (this.storage = e.storage),
      (this.options = e);
    const { session: n, ui: i, connection: s } = this.subscribe();
    if (
      ((this._session = n),
      (this.connection = s),
      (this.relayEventManager = e.relayEventManager),
      e.diagnosticLogger && e.eventListener)
    )
      throw new Error(
        "Can't have both eventListener and diagnosticLogger options, use only diagnosticLogger",
      );
    e.eventListener
      ? (this.diagnostic = { log: e.eventListener.onEvent })
      : (this.diagnostic = e.diagnosticLogger),
      (this._reloadOnDisconnect =
        (r = e.reloadOnDisconnect) !== null && r !== void 0 ? r : !0),
      (this.ui = i);
  }
  subscribe() {
    this.subscriptions.add(
      this.dappDefaultChainSubject.subscribe((i) => {
        this.dappDefaultChain !== i && (this.dappDefaultChain = i);
      }),
    );
    const e =
        qt.Session.load(this.storage) || new qt.Session(this.storage).save(),
      r = new Fx.WalletSDKConnection(
        e.id,
        e.key,
        this.linkAPIUrl,
        this.diagnostic,
      );
    this.subscriptions.add(
      r.sessionConfig$.subscribe({
        next: (i) => {
          this.onSessionConfigChanged(i);
        },
        error: () => {
          var i;
          (i = this.diagnostic) === null ||
            i === void 0 ||
            i.log($e.EVENTS.GENERAL_ERROR, {
              message: "error while invoking session config callback",
            });
        },
      }),
    ),
      this.subscriptions.add(
        r.incomingEvent$
          .pipe((0, Ie.filter)((i) => i.event === "Web3Response"))
          .subscribe({ next: this.handleIncomingEvent }),
      ),
      this.subscriptions.add(
        r.linked$
          .pipe(
            (0, Ie.skip)(1),
            (0, Ie.tap)((i) => {
              var s;
              this.isLinked = i;
              const o = this.storage.getItem(Ui.LOCAL_STORAGE_ADDRESSES_KEY);
              if (
                (i && (this.session.linked = i),
                (this.isUnlinkedErrorState = !1),
                o)
              ) {
                const a = o.split(" "),
                  c = this.storage.getItem("IsStandaloneSigning") === "true";
                if (a[0] !== "" && !i && this.session.linked && !c) {
                  this.isUnlinkedErrorState = !0;
                  const u = this.getSessionIdHash();
                  (s = this.diagnostic) === null ||
                    s === void 0 ||
                    s.log($e.EVENTS.UNLINKED_ERROR_STATE, { sessionIdHash: u });
                }
              }
            }),
          )
          .subscribe(),
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, Ie.filter)(
              (i) => !!i.metadata && i.metadata.__destroyed === "1",
            ),
          )
          .subscribe(() => {
            var i;
            const s = r.isDestroyed;
            return (
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log($e.EVENTS.METADATA_DESTROYED, {
                  alreadyDestroyed: s,
                  sessionIdHash: this.getSessionIdHash(),
                }),
              this.resetAndReload()
            );
          }),
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, Ie.filter)(
              (i) => i.metadata && i.metadata.WalletUsername !== void 0,
            ),
          )
          .pipe(
            (0, Ie.mergeMap)((i) =>
              Gt.decrypt(i.metadata.WalletUsername, e.secret),
            ),
          )
          .subscribe({
            next: (i) => {
              this.storage.setItem(Ui.WALLET_USER_NAME_KEY, i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log($e.EVENTS.GENERAL_ERROR, {
                  message: "Had error decrypting",
                  value: "username",
                });
            },
          }),
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, Ie.filter)(
              (i) => i.metadata && i.metadata.AppVersion !== void 0,
            ),
          )
          .pipe(
            (0, Ie.mergeMap)((i) =>
              Gt.decrypt(i.metadata.AppVersion, e.secret),
            ),
          )
          .subscribe({
            next: (i) => {
              this.storage.setItem(Ui.APP_VERSION_KEY, i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log($e.EVENTS.GENERAL_ERROR, {
                  message: "Had error decrypting",
                  value: "appversion",
                });
            },
          }),
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, Ie.filter)(
              (i) =>
                i.metadata &&
                i.metadata.ChainId !== void 0 &&
                i.metadata.JsonRpcUrl !== void 0,
            ),
          )
          .pipe(
            (0, Ie.mergeMap)((i) =>
              (0, ur.zip)(
                Gt.decrypt(i.metadata.ChainId, e.secret),
                Gt.decrypt(i.metadata.JsonRpcUrl, e.secret),
              ),
            ),
          )
          .pipe((0, Ie.distinctUntilChanged)())
          .subscribe({
            next: ([i, s]) => {
              this.chainCallback && this.chainCallback(i, s);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log($e.EVENTS.GENERAL_ERROR, {
                  message: "Had error decrypting",
                  value: "chainId|jsonRpcUrl",
                });
            },
          }),
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, Ie.filter)(
              (i) => i.metadata && i.metadata.EthereumAddress !== void 0,
            ),
          )
          .pipe(
            (0, Ie.mergeMap)((i) =>
              Gt.decrypt(i.metadata.EthereumAddress, e.secret),
            ),
          )
          .subscribe({
            next: (i) => {
              this.accountsCallback && this.accountsCallback([i]),
                ht.accountRequestCallbackIds.size > 0 &&
                  (Array.from(ht.accountRequestCallbackIds.values()).forEach(
                    (s) => {
                      const o = (0, Ge.Web3ResponseMessage)({
                        id: s,
                        response: (0, et.RequestEthereumAccountsResponse)([i]),
                      });
                      this.invokeCallback(
                        Object.assign(Object.assign({}, o), { id: s }),
                      );
                    },
                  ),
                  ht.accountRequestCallbackIds.clear());
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log($e.EVENTS.GENERAL_ERROR, {
                  message: "Had error decrypting",
                  value: "selectedAddress",
                });
            },
          }),
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, Ie.filter)((i) => i.metadata && i.metadata.AppSrc !== void 0),
          )
          .pipe(
            (0, Ie.mergeMap)((i) => Gt.decrypt(i.metadata.AppSrc, e.secret)),
          )
          .subscribe({
            next: (i) => {
              this.ui.setAppSrc(i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log($e.EVENTS.GENERAL_ERROR, {
                  message: "Had error decrypting",
                  value: "appSrc",
                });
            },
          }),
      );
    const n = this.options.uiConstructor({
      linkAPIUrl: this.options.linkAPIUrl,
      version: this.options.version,
      darkMode: this.options.darkMode,
      session: e,
      connected$: r.connected$,
      chainId$: this.dappDefaultChainSubject,
    });
    return r.connect(), { session: e, ui: n, connection: r };
  }
  attachUI() {
    this.ui.attach();
  }
  resetAndReload() {
    this.connection
      .setSessionMetadata("__destroyed", "1")
      .pipe(
        (0, Ie.timeout)(1e3),
        (0, Ie.catchError)((e) => (0, ur.of)(null)),
      )
      .subscribe(
        (e) => {
          var r, n, i;
          const s = this.ui.isStandalone();
          try {
            this.subscriptions.unsubscribe();
          } catch {
            (r = this.diagnostic) === null ||
              r === void 0 ||
              r.log($e.EVENTS.GENERAL_ERROR, {
                message: "Had error unsubscribing",
              });
          }
          (n = this.diagnostic) === null ||
            n === void 0 ||
            n.log($e.EVENTS.SESSION_STATE_CHANGE, {
              method: "relay::resetAndReload",
              sessionMetadataChange: "__destroyed, 1",
              sessionIdHash: this.getSessionIdHash(),
            }),
            this.connection.destroy();
          const o = qt.Session.load(this.storage);
          if (
            ((o == null ? void 0 : o.id) === this._session.id
              ? this.storage.clear()
              : o &&
                ((i = this.diagnostic) === null ||
                  i === void 0 ||
                  i.log($e.EVENTS.SKIPPED_CLEARING_SESSION, {
                    sessionIdHash: this.getSessionIdHash(),
                    storedSessionIdHash: qt.Session.hash(o.id),
                  })),
            this._reloadOnDisconnect)
          ) {
            this.ui.reloadUI();
            return;
          }
          this.accountsCallback && this.accountsCallback([], !0),
            (this.subscriptions = new ur.Subscription());
          const { session: a, ui: c, connection: u } = this.subscribe();
          (this._session = a),
            (this.connection = u),
            (this.ui = c),
            s && this.ui.setStandalone && this.ui.setStandalone(!0),
            this.attachUI();
        },
        (e) => {
          var r;
          (r = this.diagnostic) === null ||
            r === void 0 ||
            r.log($e.EVENTS.FAILURE, {
              method: "relay::resetAndReload",
              message: `failed to reset and reload with ${e}`,
              sessionIdHash: this.getSessionIdHash(),
            });
        },
      );
  }
  setAppInfo(e, r) {
    (this.appName = e), (this.appLogoUrl = r);
  }
  getStorageItem(e) {
    return this.storage.getItem(e);
  }
  get session() {
    return this._session;
  }
  setStorageItem(e, r) {
    this.storage.setItem(e, r);
  }
  signEthereumMessage(e, r, n, i) {
    return this.sendRequest({
      method: Ne.Web3Method.signEthereumMessage,
      params: {
        message: (0, me.hexStringFromBuffer)(e, !0),
        address: r,
        addPrefix: n,
        typedDataJson: i || null,
      },
    });
  }
  ethereumAddressFromSignedMessage(e, r, n) {
    return this.sendRequest({
      method: Ne.Web3Method.ethereumAddressFromSignedMessage,
      params: {
        message: (0, me.hexStringFromBuffer)(e, !0),
        signature: (0, me.hexStringFromBuffer)(r, !0),
        addPrefix: n,
      },
    });
  }
  signEthereumTransaction(e) {
    return this.sendRequest({
      method: Ne.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, me.bigIntStringFromBN)(e.weiValue),
        data: (0, me.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei
          ? (0, me.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxFeePerGas: e.gasPriceInWei
          ? (0, me.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxPriorityFeePerGas: e.gasPriceInWei
          ? (0, me.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        gasLimit: e.gasLimit ? (0, me.bigIntStringFromBN)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !1,
      },
    });
  }
  signAndSubmitEthereumTransaction(e) {
    return this.sendRequest({
      method: Ne.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, me.bigIntStringFromBN)(e.weiValue),
        data: (0, me.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei
          ? (0, me.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxFeePerGas: e.maxFeePerGas
          ? (0, me.bigIntStringFromBN)(e.maxFeePerGas)
          : null,
        maxPriorityFeePerGas: e.maxPriorityFeePerGas
          ? (0, me.bigIntStringFromBN)(e.maxPriorityFeePerGas)
          : null,
        gasLimit: e.gasLimit ? (0, me.bigIntStringFromBN)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !0,
      },
    });
  }
  submitEthereumTransaction(e, r) {
    return this.sendRequest({
      method: Ne.Web3Method.submitEthereumTransaction,
      params: {
        signedTransaction: (0, me.hexStringFromBuffer)(e, !0),
        chainId: r,
      },
    });
  }
  scanQRCode(e) {
    return this.sendRequest({
      method: Ne.Web3Method.scanQRCode,
      params: { regExp: e },
    });
  }
  getQRCodeUrl() {
    return (0, me.createQrUrl)(
      this._session.id,
      this._session.secret,
      this.linkAPIUrl,
      !1,
      this.options.version,
      this.dappDefaultChain,
    );
  }
  genericRequest(e, r) {
    return this.sendRequest({
      method: Ne.Web3Method.generic,
      params: { action: r, data: e },
    });
  }
  sendGenericMessage(e) {
    return this.sendRequest(e);
  }
  sendRequest(e) {
    let r = null;
    const n = (0, me.randomBytesHex)(8),
      i = (o) => {
        this.publishWeb3RequestCanceledEvent(n),
          this.handleErrorResponse(n, e.method, o),
          r == null || r();
      };
    return {
      promise: new Promise((o, a) => {
        this.ui.isStandalone() ||
          (r = this.ui.showConnecting({
            isUnlinkedErrorState: this.isUnlinkedErrorState,
            onCancel: i,
            onResetConnection: this.resetAndReload,
          })),
          this.relayEventManager.callbacks.set(n, (c) => {
            if ((r == null || r(), c.errorMessage))
              return a(new Error(c.errorMessage));
            o(c);
          }),
          this.ui.isStandalone()
            ? this.sendRequestStandalone(n, e)
            : this.publishWeb3RequestEvent(n, e);
      }),
      cancel: i,
    };
  }
  setConnectDisabled(e) {
    this.ui.setConnectDisabled(e);
  }
  setAccountsCallback(e) {
    this.accountsCallback = e;
  }
  setChainCallback(e) {
    this.chainCallback = e;
  }
  setDappDefaultChainCallback(e) {
    this.dappDefaultChainSubject.next(e);
  }
  publishWeb3RequestEvent(e, r) {
    var n;
    const i = (0, Vx.Web3RequestMessage)({ id: e, request: r }),
      s = qt.Session.load(this.storage);
    (n = this.diagnostic) === null ||
      n === void 0 ||
      n.log($e.EVENTS.WEB3_REQUEST, {
        eventId: i.id,
        method: `relay::${i.request.method}`,
        sessionIdHash: this.getSessionIdHash(),
        storedSessionIdHash: s ? qt.Session.hash(s.id) : "",
        isSessionMismatched: (
          (s == null ? void 0 : s.id) !== this._session.id
        ).toString(),
      }),
      this.subscriptions.add(
        this.publishEvent("Web3Request", i, !0).subscribe({
          next: (o) => {
            var a;
            (a = this.diagnostic) === null ||
              a === void 0 ||
              a.log($e.EVENTS.WEB3_REQUEST_PUBLISHED, {
                eventId: i.id,
                method: `relay::${i.request.method}`,
                sessionIdHash: this.getSessionIdHash(),
                storedSessionIdHash: s ? qt.Session.hash(s.id) : "",
                isSessionMismatched: (
                  (s == null ? void 0 : s.id) !== this._session.id
                ).toString(),
              });
          },
          error: (o) => {
            this.handleWeb3ResponseMessage(
              (0, Ge.Web3ResponseMessage)({
                id: i.id,
                response: { method: i.request.method, errorMessage: o.message },
              }),
            );
          },
        }),
      );
  }
  publishWeb3RequestCanceledEvent(e) {
    const r = (0, Hx.Web3RequestCanceledMessage)(e);
    this.subscriptions.add(
      this.publishEvent("Web3RequestCanceled", r, !1).subscribe(),
    );
  }
  publishEvent(e, r, n) {
    const i = this.session.secret;
    return new ur.Observable((s) => {
      Gt.encrypt(
        JSON.stringify(
          Object.assign(Object.assign({}, r), { origin: location.origin }),
        ),
        i,
      ).then((o) => {
        s.next(o), s.complete();
      });
    }).pipe((0, Ie.mergeMap)((s) => this.connection.publishEvent(e, s, n)));
  }
  handleIncomingEvent(e) {
    try {
      this.subscriptions.add(
        (0, ur.from)(Gt.decrypt(e.data, this.session.secret))
          .pipe((0, Ie.map)((r) => JSON.parse(r)))
          .subscribe({
            next: (r) => {
              const n = (0, Ge.isWeb3ResponseMessage)(r) ? r : null;
              n && this.handleWeb3ResponseMessage(n);
            },
            error: () => {
              var r;
              (r = this.diagnostic) === null ||
                r === void 0 ||
                r.log($e.EVENTS.GENERAL_ERROR, {
                  message: "Had error decrypting",
                  value: "incomingEvent",
                });
            },
          }),
      );
    } catch {
      return;
    }
  }
  handleWeb3ResponseMessage(e) {
    var r;
    const { response: n } = e;
    if (
      ((r = this.diagnostic) === null ||
        r === void 0 ||
        r.log($e.EVENTS.WEB3_RESPONSE, {
          eventId: e.id,
          method: `relay::${n.method}`,
          sessionIdHash: this.getSessionIdHash(),
        }),
      (0, et.isRequestEthereumAccountsResponse)(n))
    ) {
      ht.accountRequestCallbackIds.forEach((i) =>
        this.invokeCallback(Object.assign(Object.assign({}, e), { id: i })),
      ),
        ht.accountRequestCallbackIds.clear();
      return;
    }
    this.invokeCallback(e);
  }
  handleErrorResponse(e, r, n, i) {
    var s;
    const o =
      (s = n == null ? void 0 : n.message) !== null && s !== void 0
        ? s
        : (0, Hr.standardErrorMessage)(i);
    this.handleWeb3ResponseMessage(
      (0, Ge.Web3ResponseMessage)({
        id: e,
        response: { method: r, errorMessage: o, errorCode: i },
      }),
    );
  }
  invokeCallback(e) {
    const r = this.relayEventManager.callbacks.get(e.id);
    r && (r(e.response), this.relayEventManager.callbacks.delete(e.id));
  }
  requestEthereumAccounts() {
    const e = {
        method: Ne.Web3Method.requestEthereumAccounts,
        params: { appName: this.appName, appLogoUrl: this.appLogoUrl || null },
      },
      r = (0, me.randomBytesHex)(8),
      n = (s) => {
        this.publishWeb3RequestCanceledEvent(r),
          this.handleErrorResponse(r, e.method, s);
      };
    return {
      promise: new Promise((s, o) => {
        var a;
        this.relayEventManager.callbacks.set(r, (u) => {
          if ((this.ui.hideRequestEthereumAccounts(), u.errorMessage))
            return o(new Error(u.errorMessage));
          s(u);
        });
        const c =
          ((a = window == null ? void 0 : window.navigator) === null ||
          a === void 0
            ? void 0
            : a.userAgent) || null;
        if (
          c &&
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            c,
          )
        ) {
          let u;
          try {
            (0, me.isInIFrame)() && window.top
              ? (u = window.top.location)
              : (u = window.location);
          } catch {
            u = window.location;
          }
          u.href = `https://www.coinbase.com/connect-dapp?uri=${encodeURIComponent(
            u.href,
          )}`;
          return;
        }
        if (this.ui.inlineAccountsResponse()) {
          const u = (l) => {
            this.handleWeb3ResponseMessage(
              (0, Ge.Web3ResponseMessage)({
                id: r,
                response: (0, et.RequestEthereumAccountsResponse)(l),
              }),
            );
          };
          this.ui.requestEthereumAccounts({ onCancel: n, onAccounts: u });
        } else {
          const u = Hr.standardErrors.provider.userRejectedRequest(
            "User denied account authorization",
          );
          this.ui.requestEthereumAccounts({ onCancel: () => n(u) });
        }
        ht.accountRequestCallbackIds.add(r),
          !this.ui.inlineAccountsResponse() &&
            !this.ui.isStandalone() &&
            this.publishWeb3RequestEvent(r, e);
      }),
      cancel: n,
    };
  }
  selectProvider(e) {
    const r = {
        method: Ne.Web3Method.selectProvider,
        params: { providerOptions: e },
      },
      n = (0, me.randomBytesHex)(8),
      i = (o) => {
        this.publishWeb3RequestCanceledEvent(n),
          this.handleErrorResponse(n, r.method, o);
      },
      s = new Promise((o, a) => {
        this.relayEventManager.callbacks.set(n, (l) => {
          if (l.errorMessage) return a(new Error(l.errorMessage));
          o(l);
        });
        const c = (l) => {
            this.handleWeb3ResponseMessage(
              (0, Ge.Web3ResponseMessage)({
                id: n,
                response: (0, et.SelectProviderResponse)(
                  Ux.ProviderType.Unselected,
                ),
              }),
            );
          },
          u = (l) => {
            this.handleWeb3ResponseMessage(
              (0, Ge.Web3ResponseMessage)({
                id: n,
                response: (0, et.SelectProviderResponse)(l),
              }),
            );
          };
        this.ui.selectProvider &&
          this.ui.selectProvider({
            onApprove: u,
            onCancel: c,
            providerOptions: e,
          });
      });
    return { cancel: i, promise: s };
  }
  watchAsset(e, r, n, i, s, o) {
    const a = {
      method: Ne.Web3Method.watchAsset,
      params: {
        type: e,
        options: { address: r, symbol: n, decimals: i, image: s },
        chainId: o,
      },
    };
    let c = null;
    const u = (0, me.randomBytesHex)(8),
      l = (h) => {
        this.publishWeb3RequestCanceledEvent(u),
          this.handleErrorResponse(u, a.method, h),
          c == null || c();
      };
    this.ui.inlineWatchAsset() ||
      (c = this.ui.showConnecting({
        isUnlinkedErrorState: this.isUnlinkedErrorState,
        onCancel: l,
        onResetConnection: this.resetAndReload,
      }));
    const f = new Promise((h, b) => {
      this.relayEventManager.callbacks.set(u, (S) => {
        if ((c == null || c(), S.errorMessage))
          return b(new Error(S.errorMessage));
        h(S);
      });
      const g = (S) => {
          this.handleWeb3ResponseMessage(
            (0, Ge.Web3ResponseMessage)({
              id: u,
              response: (0, et.WatchAssetReponse)(!1),
            }),
          );
        },
        y = () => {
          this.handleWeb3ResponseMessage(
            (0, Ge.Web3ResponseMessage)({
              id: u,
              response: (0, et.WatchAssetReponse)(!0),
            }),
          );
        };
      this.ui.inlineWatchAsset() &&
        this.ui.watchAsset({
          onApprove: y,
          onCancel: g,
          type: e,
          address: r,
          symbol: n,
          decimals: i,
          image: s,
          chainId: o,
        }),
        !this.ui.inlineWatchAsset() &&
          !this.ui.isStandalone() &&
          this.publishWeb3RequestEvent(u, a);
    });
    return { cancel: l, promise: f };
  }
  addEthereumChain(e, r, n, i, s, o) {
    const a = {
      method: Ne.Web3Method.addEthereumChain,
      params: {
        chainId: e,
        rpcUrls: r,
        blockExplorerUrls: i,
        chainName: s,
        iconUrls: n,
        nativeCurrency: o,
      },
    };
    let c = null;
    const u = (0, me.randomBytesHex)(8),
      l = (h) => {
        this.publishWeb3RequestCanceledEvent(u),
          this.handleErrorResponse(u, a.method, h),
          c == null || c();
      };
    return (
      this.ui.inlineAddEthereumChain(e) ||
        (c = this.ui.showConnecting({
          isUnlinkedErrorState: this.isUnlinkedErrorState,
          onCancel: l,
          onResetConnection: this.resetAndReload,
        })),
      {
        promise: new Promise((h, b) => {
          this.relayEventManager.callbacks.set(u, (S) => {
            if ((c == null || c(), S.errorMessage))
              return b(new Error(S.errorMessage));
            h(S);
          });
          const g = (S) => {
              this.handleWeb3ResponseMessage(
                (0, Ge.Web3ResponseMessage)({
                  id: u,
                  response: (0, et.AddEthereumChainResponse)({
                    isApproved: !1,
                    rpcUrl: "",
                  }),
                }),
              );
            },
            y = (S) => {
              this.handleWeb3ResponseMessage(
                (0, Ge.Web3ResponseMessage)({
                  id: u,
                  response: (0, et.AddEthereumChainResponse)({
                    isApproved: !0,
                    rpcUrl: S,
                  }),
                }),
              );
            };
          this.ui.inlineAddEthereumChain(e) &&
            this.ui.addEthereumChain({
              onCancel: g,
              onApprove: y,
              chainId: a.params.chainId,
              rpcUrls: a.params.rpcUrls,
              blockExplorerUrls: a.params.blockExplorerUrls,
              chainName: a.params.chainName,
              iconUrls: a.params.iconUrls,
              nativeCurrency: a.params.nativeCurrency,
            }),
            !this.ui.inlineAddEthereumChain(e) &&
              !this.ui.isStandalone() &&
              this.publishWeb3RequestEvent(u, a);
        }),
        cancel: l,
      }
    );
  }
  switchEthereumChain(e, r) {
    const n = {
        method: Ne.Web3Method.switchEthereumChain,
        params: Object.assign({ chainId: e }, { address: r }),
      },
      i = (0, me.randomBytesHex)(8),
      s = (a) => {
        this.publishWeb3RequestCanceledEvent(i),
          this.handleErrorResponse(i, n.method, a);
      };
    return {
      promise: new Promise((a, c) => {
        this.relayEventManager.callbacks.set(i, (f) => {
          if ((0, et.isErrorResponse)(f) && f.errorCode)
            return c(
              Hr.standardErrors.provider.custom({
                code: f.errorCode,
                message:
                  "Unrecognized chain ID. Try adding the chain using addEthereumChain first.",
              }),
            );
          if (f.errorMessage) return c(new Error(f.errorMessage));
          a(f);
        });
        const u = (f) => {
            var h;
            if (f) {
              const b =
                (h = (0, Hr.getErrorCode)(f)) !== null && h !== void 0
                  ? h
                  : Hr.standardErrorCodes.provider.unsupportedChain;
              this.handleErrorResponse(
                i,
                Ne.Web3Method.switchEthereumChain,
                f instanceof Error
                  ? f
                  : Hr.standardErrors.provider.unsupportedChain(e),
                b,
              );
            } else
              this.handleWeb3ResponseMessage(
                (0, Ge.Web3ResponseMessage)({
                  id: i,
                  response: (0, et.SwitchEthereumChainResponse)({
                    isApproved: !1,
                    rpcUrl: "",
                  }),
                }),
              );
          },
          l = (f) => {
            this.handleWeb3ResponseMessage(
              (0, Ge.Web3ResponseMessage)({
                id: i,
                response: (0, et.SwitchEthereumChainResponse)({
                  isApproved: !0,
                  rpcUrl: f,
                }),
              }),
            );
          };
        this.ui.switchEthereumChain({
          onCancel: u,
          onApprove: l,
          chainId: n.params.chainId,
          address: n.params.address,
        }),
          !this.ui.inlineSwitchEthereumChain() &&
            !this.ui.isStandalone() &&
            this.publishWeb3RequestEvent(i, n);
      }),
      cancel: s,
    };
  }
  inlineAddEthereumChain(e) {
    return this.ui.inlineAddEthereumChain(e);
  }
  getSessionIdHash() {
    return qt.Session.hash(this._session.id);
  }
  sendRequestStandalone(e, r) {
    const n = (s) => {
        this.handleErrorResponse(e, r.method, s);
      },
      i = (s) => {
        this.handleWeb3ResponseMessage(
          (0, Ge.Web3ResponseMessage)({ id: e, response: s }),
        );
      };
    switch (r.method) {
      case Ne.Web3Method.signEthereumMessage:
        this.ui.signEthereumMessage({ request: r, onSuccess: i, onCancel: n });
        break;
      case Ne.Web3Method.signEthereumTransaction:
        this.ui.signEthereumTransaction({
          request: r,
          onSuccess: i,
          onCancel: n,
        });
        break;
      case Ne.Web3Method.submitEthereumTransaction:
        this.ui.submitEthereumTransaction({
          request: r,
          onSuccess: i,
          onCancel: n,
        });
        break;
      case Ne.Web3Method.ethereumAddressFromSignedMessage:
        this.ui.ethereumAddressFromSignedMessage({ request: r, onSuccess: i });
        break;
      default:
        n();
        break;
    }
  }
  onSessionConfigChanged(e) {}
}
ht.accountRequestCallbackIds = new Set();
E0([C0.default], ht.prototype, "resetAndReload", null);
E0([C0.default], ht.prototype, "handleIncomingEvent", null);
ro.WalletSDKRelay = ht;
var fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
fo.WalletSDKRelayEventManager = void 0;
const Wx = H;
class zx {
  constructor() {
    (this._nextRequestId = 0), (this.callbacks = new Map());
  }
  makeRequestId() {
    this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
    const e = this._nextRequestId,
      r = (0, Wx.prepend0x)(e.toString(16));
    return this.callbacks.get(r) && this.callbacks.delete(r), e;
  }
}
fo.WalletSDKRelayEventManager = zx;
const Gx = "@coinbase/wallet-sdk",
  qx = "3.7.1",
  Jx = "Coinbase Wallet JavaScript SDK",
  Zx = [
    "cipher",
    "cipherbrowser",
    "coinbase",
    "coinbasewallet",
    "eth",
    "ether",
    "ethereum",
    "etherium",
    "injection",
    "toshi",
    "wallet",
    "walletlink",
    "web3",
  ],
  Qx = "dist/index.js",
  Kx = "dist/index.d.ts",
  Yx = "https://github.com/coinbase/coinbase-wallet-sdk.git",
  Xx = "Coinbase, Inc.",
  eA = "Apache-2.0",
  tA = {
    "pretest:unit": "node compile-assets.js",
    "test:unit": "jest",
    "test:unit:coverage":
      "yarn test:unit && open coverage/lcov-report/index.html",
    "test:karma": "yarn build-npm && karma start",
    prebuild: `rm -rf ./build && node -p "'export const LIB_VERSION = ' + JSON.stringify(require('./package.json').version) + ';'" > src/version.ts`,
    build: "node compile-assets.js && webpack --config webpack.config.js",
    "build-npm": "tsc -p ./tsconfig.build.json",
    "build:dev": "export LINK_API_URL='http://localhost:3000'; yarn build",
    "build:dev:watch":
      "nodemon -e 'ts,tsx,js,json,css,scss,svg' --ignore 'src/**/*-css.ts' --ignore 'src/**/*-svg.ts' --watch src/ --exec 'yarn build:dev'",
    "build:prod": `yarn prebuild && yarn build && yarn build-npm && cp ./package.json ../../README.md ./LICENSE build/npm && cp -a src/vendor-js build/npm/dist && sed -i.bak 's|  "private": true,||g' build/npm/package.json && rm -f build/npm/package.json.bak`,
    "lint:types": "tsc --noEmit",
    "lint:prettier": 'prettier --check "{src,__tests__}/**/*.(js|ts|tsx)"',
    "lint:eslint": "eslint ./src --ext .ts,.tsx",
    lint: "yarn lint:eslint && yarn lint:types && yarn lint:prettier",
    "fix:eslint": "yarn lint:eslint --fix",
    "fix:prettier": "prettier . --write",
    release: "./scripts/release.sh",
  },
  rA = {
    "@metamask/safe-event-emitter": "2.0.0",
    "@solana/web3.js": "^1.70.1",
    "bind-decorator": "^1.0.11",
    "bn.js": "^5.1.1",
    buffer: "^6.0.3",
    clsx: "^1.1.0",
    "eth-block-tracker": "6.1.0",
    "eth-json-rpc-filters": "5.1.0",
    "eth-rpc-errors": "4.0.2",
    "json-rpc-engine": "6.1.0",
    keccak: "^3.0.1",
    preact: "^10.5.9",
    qs: "^6.10.3",
    rxjs: "^6.6.3",
    "sha.js": "^2.4.11",
    "stream-browserify": "^3.0.0",
    util: "^0.12.4",
  },
  nA = {
    "@babel/core": "^7.17.9",
    "@babel/plugin-proposal-decorators": "^7.17.9",
    "@babel/plugin-transform-react-jsx": "^7.17.3",
    "@babel/preset-env": "^7.16.11",
    "@babel/preset-typescript": "^7.16.7",
    "@peculiar/webcrypto": "^1.3.3",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/preact": "^2.0.1",
    "@types/bn.js": "^4.11.6",
    "@types/jest": "^27.4.1",
    "@types/node": "^14.14.20",
    "@types/qs": "^6.9.7",
    "@types/sha.js": "^2.4.0",
    "@typescript-eslint/eslint-plugin": "^5.7.0",
    "@typescript-eslint/eslint-plugin-tslint": "^5.7.0",
    "@typescript-eslint/parser": "^5.7.0",
    "babel-jest": "^27.5.1",
    browserify: "17.0.0",
    "copy-webpack-plugin": "^6.4.1",
    "core-js": "^3.8.2",
    eslint: "^8.4.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-preact": "^0.1.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-simple-import-sort": "^7.0.0",
    jasmine: "3.8.0",
    jest: "^27.5.1",
    "jest-chrome": "^0.7.2",
    "jest-websocket-mock": "^2.3.0",
    karma: "^6.4.0",
    "karma-browserify": "8.1.0",
    "karma-chrome-launcher": "^3.1.0",
    "karma-jasmine": "^4.0.1",
    nodemon: "^2.0.6",
    prettier: "^2.5.1",
    "raw-loader": "^4.0.2",
    "regenerator-runtime": "^0.13.7",
    sass: "^1.50.0",
    svgo: "^2.8.0",
    "ts-jest": "^27.1.4",
    "ts-loader": "^8.0.13",
    "ts-node": "^10.7.0",
    tslib: "^2.0.3",
    typescript: "^4.1.3",
    watchify: "4.0.0",
    webpack: "^5.76.0",
    "webpack-cli": "^4.9.2",
    "whatwg-fetch": "^3.5.0",
  },
  iA = { node: ">= 10.0.0" },
  sA = {
    name: Gx,
    version: qx,
    description: Jx,
    keywords: Zx,
    main: Qx,
    types: Kx,
    repository: Yx,
    author: Xx,
    license: eA,
    scripts: tA,
    dependencies: rA,
    devDependencies: nA,
    engines: iA,
  };
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.CoinbaseWalletSDK = void 0;
const oA = ws,
  aA = Ss,
  cA = rn,
  uA = Bs,
  lA = ro,
  fA = fo,
  hA = H,
  dA =
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
    }.LINK_API_URL || "https://www.walletlink.org",
  R0 =
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
    }.SDK_VERSION ||
    sA.version ||
    "unknown";
class ho {
  constructor(e) {
    var r, n, i;
    (this._appName = ""),
      (this._appLogoUrl = null),
      (this._relay = null),
      (this._relayEventManager = null);
    const s = e.linkAPIUrl || dA;
    let o;
    if (
      (e.uiConstructor
        ? (o = e.uiConstructor)
        : (o = (u) => new uA.WalletSDKUI(u)),
      typeof e.overrideIsMetaMask > "u"
        ? (this._overrideIsMetaMask = !1)
        : (this._overrideIsMetaMask = e.overrideIsMetaMask),
      (this._overrideIsCoinbaseWallet =
        (r = e.overrideIsCoinbaseWallet) !== null && r !== void 0 ? r : !0),
      (this._overrideIsCoinbaseBrowser =
        (n = e.overrideIsCoinbaseBrowser) !== null && n !== void 0 ? n : !1),
      e.diagnosticLogger && e.eventListener)
    )
      throw new Error(
        "Can't have both eventListener and diagnosticLogger options, use only diagnosticLogger",
      );
    e.eventListener
      ? (this._diagnosticLogger = { log: e.eventListener.onEvent })
      : (this._diagnosticLogger = e.diagnosticLogger),
      (this._reloadOnDisconnect =
        (i = e.reloadOnDisconnect) !== null && i !== void 0 ? i : !0);
    const a = new URL(s),
      c = `${a.protocol}//${a.host}`;
    (this._storage = new aA.ScopedLocalStorage(`-walletlink:${c}`)),
      this._storage.setItem("version", ho.VERSION),
      !(this.walletExtension || this.coinbaseBrowser) &&
        ((this._relayEventManager = new fA.WalletSDKRelayEventManager()),
        (this._relay = new lA.WalletSDKRelay({
          linkAPIUrl: s,
          version: R0,
          darkMode: !!e.darkMode,
          uiConstructor: o,
          storage: this._storage,
          relayEventManager: this._relayEventManager,
          diagnosticLogger: this._diagnosticLogger,
          reloadOnDisconnect: this._reloadOnDisconnect,
        })),
        this.setAppInfo(e.appName, e.appLogoUrl),
        !e.headlessMode && this._relay.attachUI());
  }
  makeWeb3Provider(e = "", r = 1) {
    const n = this.walletExtension;
    if (n)
      return (
        this.isCipherProvider(n) || n.setProviderInfo(e, r),
        this._reloadOnDisconnect === !1 &&
          typeof n.disableReloadOnDisconnect == "function" &&
          n.disableReloadOnDisconnect(),
        n
      );
    const i = this.coinbaseBrowser;
    if (i) return i;
    const s = this._relay;
    if (!s || !this._relayEventManager || !this._storage)
      throw new Error("Relay not initialized, should never happen");
    return (
      e || s.setConnectDisabled(!0),
      new cA.CoinbaseWalletProvider({
        relayProvider: () => Promise.resolve(s),
        relayEventManager: this._relayEventManager,
        storage: this._storage,
        jsonRpcUrl: e,
        chainId: r,
        qrUrl: this.getQrUrl(),
        diagnosticLogger: this._diagnosticLogger,
        overrideIsMetaMask: this._overrideIsMetaMask,
        overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
        overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser,
      })
    );
  }
  setAppInfo(e, r) {
    var n;
    (this._appName = e || "DApp"),
      (this._appLogoUrl = r || (0, hA.getFavicon)());
    const i = this.walletExtension;
    i
      ? this.isCipherProvider(i) ||
        i.setAppInfo(this._appName, this._appLogoUrl)
      : (n = this._relay) === null ||
        n === void 0 ||
        n.setAppInfo(this._appName, this._appLogoUrl);
  }
  disconnect() {
    var e;
    const r = this.walletExtension;
    r
      ? r.close()
      : (e = this._relay) === null || e === void 0 || e.resetAndReload();
  }
  getQrUrl() {
    var e, r;
    return (r =
      (e = this._relay) === null || e === void 0
        ? void 0
        : e.getQRCodeUrl()) !== null && r !== void 0
      ? r
      : null;
  }
  getCoinbaseWalletLogo(e, r = 240) {
    return (0, oA.walletLogo)(e, r);
  }
  get walletExtension() {
    var e;
    return (e = window.coinbaseWalletExtension) !== null && e !== void 0
      ? e
      : window.walletLinkExtension;
  }
  get coinbaseBrowser() {
    var e, r;
    try {
      const n =
        (e = window.ethereum) !== null && e !== void 0
          ? e
          : (r = window.top) === null || r === void 0
          ? void 0
          : r.ethereum;
      return n && "isCoinbaseBrowser" in n && n.isCoinbaseBrowser ? n : void 0;
    } catch {
      return;
    }
  }
  isCipherProvider(e) {
    return typeof e.isCipher == "boolean" && e.isCipher;
  }
}
Gn.CoinbaseWalletSDK = ho;
ho.VERSION = R0;
(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.CoinbaseWalletProvider = t.CoinbaseWalletSDK = void 0);
  const e = Gn,
    r = rn;
  var n = Gn;
  Object.defineProperty(t, "CoinbaseWalletSDK", {
    enumerable: !0,
    get: function () {
      return n.CoinbaseWalletSDK;
    },
  });
  var i = rn;
  Object.defineProperty(t, "CoinbaseWalletProvider", {
    enumerable: !0,
    get: function () {
      return i.CoinbaseWalletProvider;
    },
  }),
    (t.default = e.CoinbaseWalletSDK),
    typeof window < "u" &&
      ((window.CoinbaseWalletSDK = e.CoinbaseWalletSDK),
      (window.CoinbaseWalletProvider = r.CoinbaseWalletProvider),
      (window.WalletLink = e.CoinbaseWalletSDK),
      (window.WalletLinkProvider = r.CoinbaseWalletProvider));
})($c);
const pA = I0($c),
  RA = A0({ __proto__: null, default: pA }, [$c]);
export { RA as i };
