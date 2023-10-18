import { _ as fe } from "./index-aff6404b.js";
const Ee = Symbol(),
  ee = Object.getPrototypeOf,
  Y = new WeakMap(),
  me = (e) =>
    e &&
    (Y.has(e)
      ? Y.get(e)
      : ee(e) === Object.prototype || ee(e) === Array.prototype),
  Ae = (e) => (me(e) && e[Ee]) || null,
  te = (e, t = !0) => {
    Y.set(e, t);
  },
  z = (e) => typeof e == "object" && e !== null,
  S = new WeakMap(),
  $ = new WeakSet(),
  ge = (
    e = Object.is,
    t = (o, w) => new Proxy(o, w),
    s = (o) =>
      z(o) &&
      !$.has(o) &&
      (Array.isArray(o) || !(Symbol.iterator in o)) &&
      !(o instanceof WeakMap) &&
      !(o instanceof WeakSet) &&
      !(o instanceof Error) &&
      !(o instanceof Number) &&
      !(o instanceof Date) &&
      !(o instanceof String) &&
      !(o instanceof RegExp) &&
      !(o instanceof ArrayBuffer),
    i = (o) => o.configurable && o.enumerable && o.writable,
    c = (o) => {
      switch (o.status) {
        case "fulfilled":
          return o.value;
        case "rejected":
          throw o.reason;
        default:
          throw o;
      }
    },
    d = new WeakMap(),
    m = (o, w, O = c) => {
      const g = d.get(o);
      if ((g == null ? void 0 : g[0]) === w) return g[1];
      const h = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));
      return (
        te(h, !0),
        d.set(o, [w, h]),
        Reflect.ownKeys(o).forEach((j) => {
          if (Object.getOwnPropertyDescriptor(h, j)) return;
          const C = Reflect.get(o, j),
            T = { value: C, enumerable: !0, configurable: !0 };
          if ($.has(C)) te(C, !1);
          else if (C instanceof Promise) delete T.value, (T.get = () => O(C));
          else if (S.has(C)) {
            const [b, x] = S.get(C);
            T.value = m(b, x(), O);
          }
          Object.defineProperty(h, j, T);
        }),
        Object.preventExtensions(h)
      );
    },
    E = new WeakMap(),
    A = [1, 1],
    R = (o) => {
      if (!z(o)) throw new Error("object required");
      const w = E.get(o);
      if (w) return w;
      let O = A[0];
      const g = new Set(),
        h = (a, n = ++A[0]) => {
          O !== n && ((O = n), g.forEach((l) => l(a, n)));
        };
      let j = A[1];
      const C = (a = ++A[1]) => (
          j !== a &&
            !g.size &&
            ((j = a),
            b.forEach(([n]) => {
              const l = n[1](a);
              l > O && (O = l);
            })),
          O
        ),
        T = (a) => (n, l) => {
          const r = [...n];
          (r[1] = [a, ...r[1]]), h(r, l);
        },
        b = new Map(),
        x = (a, n) => {
          if (g.size) {
            const l = n[3](T(a));
            b.set(a, [n, l]);
          } else b.set(a, [n]);
        },
        Q = (a) => {
          var n;
          const l = b.get(a);
          l && (b.delete(a), (n = l[1]) == null || n.call(l));
        },
        ue = (a) => (
          g.add(a),
          g.size === 1 &&
            b.forEach(([l, r], y) => {
              const L = l[3](T(y));
              b.set(y, [l, L]);
            }),
          () => {
            g.delete(a),
              g.size === 0 &&
                b.forEach(([l, r], y) => {
                  r && (r(), b.set(y, [l]));
                });
          }
        ),
        q = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o)),
        X = (a, n, l, r, y) => {
          if (a && (e(n, r) || (E.has(r) && e(n, E.get(r))))) return;
          Q(l), z(r) && (r = Ae(r) || r);
          let L = r;
          if (r instanceof Promise)
            r.then((_) => {
              (r.status = "fulfilled"), (r.value = _), h(["resolve", [l], _]);
            }).catch((_) => {
              (r.status = "rejected"), (r.reason = _), h(["reject", [l], _]);
            });
          else {
            !S.has(r) && s(r) && (L = R(r));
            const _ = !$.has(L) && S.get(L);
            _ && x(l, _);
          }
          y(L), h(["set", [l], r, n]);
        },
        H = t(q, {
          deleteProperty(a, n) {
            const l = Reflect.get(a, n);
            Q(n);
            const r = Reflect.deleteProperty(a, n);
            return r && h(["delete", [n], l]), r;
          },
          set(a, n, l, r) {
            const y = Reflect.has(a, n),
              L = Reflect.get(a, n, r);
            return (
              X(y, L, n, l, (_) => {
                Reflect.set(a, n, _, r);
              }),
              !0
            );
          },
          defineProperty(a, n, l) {
            if (i(l)) {
              const r = Reflect.getOwnPropertyDescriptor(a, n);
              if (!r || i(r))
                return (
                  X(
                    !!r && "value" in r,
                    r == null ? void 0 : r.value,
                    n,
                    l.value,
                    (y) => {
                      Reflect.defineProperty(a, n, { ...l, value: y });
                    },
                  ),
                  !0
                );
            }
            return Reflect.defineProperty(a, n, l);
          },
        });
      E.set(o, H);
      const pe = [q, C, m, ue];
      return (
        S.set(H, pe),
        Reflect.ownKeys(o).forEach((a) => {
          const n = Object.getOwnPropertyDescriptor(o, a);
          "value" in n && ((H[a] = o[a]), delete n.value, delete n.writable),
            Object.defineProperty(q, a, n);
        }),
        H
      );
    },
  ) => [R, S, $, e, t, s, i, c, d, m, E, A],
  [he] = ge();
function W(e = {}) {
  return he(e);
}
function U(e, t, s) {
  const i = S.get(e);
  let c;
  const d = [],
    m = i[3];
  let E = !1;
  const R = m((o) => {
    if ((d.push(o), s)) {
      t(d.splice(0));
      return;
    }
    c ||
      (c = Promise.resolve().then(() => {
        (c = void 0), E && t(d.splice(0));
      }));
  });
  return (
    (E = !0),
    () => {
      (E = !1), R();
    }
  );
}
function be(e, t) {
  const s = S.get(e),
    [i, c, d] = s;
  return d(i, c(), t);
}
const u = W({
    history: ["ConnectWallet"],
    view: "ConnectWallet",
    data: void 0,
  }),
  de = {
    state: u,
    subscribe(e) {
      return U(u, () => e(u));
    },
    push(e, t) {
      e !== u.view && ((u.view = e), t && (u.data = t), u.history.push(e));
    },
    reset(e) {
      (u.view = e), (u.history = [e]);
    },
    replace(e) {
      u.history.length > 1 &&
        ((u.history[u.history.length - 1] = e), (u.view = e));
    },
    goBack() {
      if (u.history.length > 1) {
        u.history.pop();
        const [e] = u.history.slice(-1);
        u.view = e;
      }
    },
    setData(e) {
      u.data = e;
    },
  },
  f = {
    WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
    WCM_VERSION: "WCM_VERSION",
    RECOMMENDED_WALLET_AMOUNT: 9,
    isMobile() {
      return typeof window < "u"
        ? !!(
            window.matchMedia("(pointer:coarse)").matches ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(
              navigator.userAgent,
            )
          )
        : !1;
    },
    isAndroid() {
      return (
        f.isMobile() && navigator.userAgent.toLowerCase().includes("android")
      );
    },
    isIos() {
      const e = navigator.userAgent.toLowerCase();
      return f.isMobile() && (e.includes("iphone") || e.includes("ipad"));
    },
    isHttpUrl(e) {
      return e.startsWith("http://") || e.startsWith("https://");
    },
    isArray(e) {
      return Array.isArray(e) && e.length > 0;
    },
    formatNativeUrl(e, t, s) {
      if (f.isHttpUrl(e)) return this.formatUniversalUrl(e, t, s);
      let i = e;
      i.includes("://") ||
        ((i = e.replaceAll("/", "").replaceAll(":", "")), (i = `${i}://`)),
        i.endsWith("/") || (i = `${i}/`),
        this.setWalletConnectDeepLink(i, s);
      const c = encodeURIComponent(t);
      return `${i}wc?uri=${c}`;
    },
    formatUniversalUrl(e, t, s) {
      if (!f.isHttpUrl(e)) return this.formatNativeUrl(e, t, s);
      let i = e;
      i.endsWith("/") || (i = `${i}/`), this.setWalletConnectDeepLink(i, s);
      const c = encodeURIComponent(t);
      return `${i}wc?uri=${c}`;
    },
    async wait(e) {
      return new Promise((t) => {
        setTimeout(t, e);
      });
    },
    openHref(e, t) {
      window.open(e, t, "noreferrer noopener");
    },
    setWalletConnectDeepLink(e, t) {
      try {
        localStorage.setItem(
          f.WALLETCONNECT_DEEPLINK_CHOICE,
          JSON.stringify({ href: e, name: t }),
        );
      } catch {
        console.info("Unable to set WalletConnect deep link");
      }
    },
    setWalletConnectAndroidDeepLink(e) {
      try {
        const [t] = e.split("?");
        localStorage.setItem(
          f.WALLETCONNECT_DEEPLINK_CHOICE,
          JSON.stringify({ href: t, name: "Android" }),
        );
      } catch {
        console.info("Unable to set WalletConnect android deep link");
      }
    },
    removeWalletConnectDeepLink() {
      try {
        localStorage.removeItem(f.WALLETCONNECT_DEEPLINK_CHOICE);
      } catch {
        console.info("Unable to remove WalletConnect deep link");
      }
    },
    setModalVersionInStorage() {
      try {
        typeof localStorage < "u" &&
          localStorage.setItem(f.WCM_VERSION, "2.6.1");
      } catch {
        console.info("Unable to set Web3Modal version in storage");
      }
    },
    getWalletRouterData() {
      var e;
      const t = (e = de.state.data) == null ? void 0 : e.Wallet;
      if (!t) throw new Error('Missing "Wallet" view data');
      return t;
    },
  },
  Ie =
    typeof location < "u" &&
    (location.hostname.includes("localhost") ||
      location.protocol.includes("https")),
  p = W({
    enabled: Ie,
    userSessionId: "",
    events: [],
    connectedWalletId: void 0,
  }),
  ye = {
    state: p,
    subscribe(e) {
      return U(p.events, () => e(be(p.events[p.events.length - 1])));
    },
    initialize() {
      p.enabled &&
        typeof (crypto == null ? void 0 : crypto.randomUUID) < "u" &&
        (p.userSessionId = crypto.randomUUID());
    },
    setConnectedWalletId(e) {
      p.connectedWalletId = e;
    },
    click(e) {
      if (p.enabled) {
        const t = {
          type: "CLICK",
          name: e.name,
          userSessionId: p.userSessionId,
          timestamp: Date.now(),
          data: e,
        };
        p.events.push(t);
      }
    },
    track(e) {
      if (p.enabled) {
        const t = {
          type: "TRACK",
          name: e.name,
          userSessionId: p.userSessionId,
          timestamp: Date.now(),
          data: e,
        };
        p.events.push(t);
      }
    },
    view(e) {
      if (p.enabled) {
        const t = {
          type: "VIEW",
          name: e.name,
          userSessionId: p.userSessionId,
          timestamp: Date.now(),
          data: e,
        };
        p.events.push(t);
      }
    },
  },
  P = W({
    chains: void 0,
    walletConnectUri: void 0,
    isAuth: !1,
    isCustomDesktop: !1,
    isCustomMobile: !1,
    isDataLoaded: !1,
    isUiLoaded: !1,
  }),
  I = {
    state: P,
    subscribe(e) {
      return U(P, () => e(P));
    },
    setChains(e) {
      P.chains = e;
    },
    setWalletConnectUri(e) {
      P.walletConnectUri = e;
    },
    setIsCustomDesktop(e) {
      P.isCustomDesktop = e;
    },
    setIsCustomMobile(e) {
      P.isCustomMobile = e;
    },
    setIsDataLoaded(e) {
      P.isDataLoaded = e;
    },
    setIsUiLoaded(e) {
      P.isUiLoaded = e;
    },
    setIsAuth(e) {
      P.isAuth = e;
    },
  },
  B = W({
    projectId: "",
    mobileWallets: void 0,
    desktopWallets: void 0,
    walletImages: void 0,
    chains: void 0,
    enableAuthMode: !1,
    enableExplorer: !0,
    explorerExcludedWalletIds: void 0,
    explorerRecommendedWalletIds: void 0,
    termsOfServiceUrl: void 0,
    privacyPolicyUrl: void 0,
  }),
  V = {
    state: B,
    subscribe(e) {
      return U(B, () => e(B));
    },
    setConfig(e) {
      var t, s;
      ye.initialize(),
        I.setChains(e.chains),
        I.setIsAuth(!!e.enableAuthMode),
        I.setIsCustomMobile(!!((t = e.mobileWallets) != null && t.length)),
        I.setIsCustomDesktop(!!((s = e.desktopWallets) != null && s.length)),
        f.setModalVersionInStorage(),
        Object.assign(B, e);
    },
  };
var _e = Object.defineProperty,
  se = Object.getOwnPropertySymbols,
  Pe = Object.prototype.hasOwnProperty,
  ve = Object.prototype.propertyIsEnumerable,
  oe = (e, t, s) =>
    t in e
      ? _e(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  we = (e, t) => {
    for (var s in t || (t = {})) Pe.call(t, s) && oe(e, s, t[s]);
    if (se) for (var s of se(t)) ve.call(t, s) && oe(e, s, t[s]);
    return e;
  };
const Z = "https://explorer-api.walletconnect.com",
  J = "wcm",
  F = "js-2.6.1";
async function K(e, t) {
  const s = we({ sdkType: J, sdkVersion: F }, t),
    i = new URL(e, Z);
  return (
    i.searchParams.append("projectId", V.state.projectId),
    Object.entries(s).forEach(([c, d]) => {
      d && i.searchParams.append(c, String(d));
    }),
    (await fetch(i)).json()
  );
}
const D = {
  async getDesktopListings(e) {
    return K("/w3m/v1/getDesktopListings", e);
  },
  async getMobileListings(e) {
    return K("/w3m/v1/getMobileListings", e);
  },
  async getInjectedListings(e) {
    return K("/w3m/v1/getInjectedListings", e);
  },
  async getAllListings(e) {
    return K("/w3m/v1/getAllListings", e);
  },
  getWalletImageUrl(e) {
    return `${Z}/w3m/v1/getWalletImage/${e}?projectId=${V.state.projectId}&sdkType=${J}&sdkVersion=${F}`;
  },
  getAssetImageUrl(e) {
    return `${Z}/w3m/v1/getAssetImage/${e}?projectId=${V.state.projectId}&sdkType=${J}&sdkVersion=${F}`;
  },
};
var Ce = Object.defineProperty,
  ne = Object.getOwnPropertySymbols,
  Oe = Object.prototype.hasOwnProperty,
  Le = Object.prototype.propertyIsEnumerable,
  re = (e, t, s) =>
    t in e
      ? Ce(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  Se = (e, t) => {
    for (var s in t || (t = {})) Oe.call(t, s) && re(e, s, t[s]);
    if (ne) for (var s of ne(t)) Le.call(t, s) && re(e, s, t[s]);
    return e;
  };
const ie = f.isMobile(),
  v = W({
    wallets: { listings: [], total: 0, page: 1 },
    search: { listings: [], total: 0, page: 1 },
    recomendedWallets: [],
  }),
  Ve = {
    state: v,
    async getRecomendedWallets() {
      const { explorerRecommendedWalletIds: e, explorerExcludedWalletIds: t } =
        V.state;
      if (e === "NONE" || (t === "ALL" && !e)) return v.recomendedWallets;
      if (f.isArray(e)) {
        const s = { recommendedIds: e.join(",") },
          { listings: i } = await D.getAllListings(s),
          c = Object.values(i);
        c.sort((d, m) => {
          const E = e.indexOf(d.id),
            A = e.indexOf(m.id);
          return E - A;
        }),
          (v.recomendedWallets = c);
      } else {
        const { chains: s, isAuth: i } = I.state,
          c = s == null ? void 0 : s.join(","),
          d = f.isArray(t),
          m = {
            page: 1,
            sdks: i ? "auth_v1" : void 0,
            entries: f.RECOMMENDED_WALLET_AMOUNT,
            chains: c,
            version: 2,
            excludedIds: d ? t.join(",") : void 0,
          },
          { listings: E } = ie
            ? await D.getMobileListings(m)
            : await D.getDesktopListings(m);
        v.recomendedWallets = Object.values(E);
      }
      return v.recomendedWallets;
    },
    async getWallets(e) {
      const t = Se({}, e),
        { explorerRecommendedWalletIds: s, explorerExcludedWalletIds: i } =
          V.state,
        { recomendedWallets: c } = v;
      if (i === "ALL") return v.wallets;
      c.length
        ? (t.excludedIds = c.map((w) => w.id).join(","))
        : f.isArray(s) && (t.excludedIds = s.join(",")),
        f.isArray(i) &&
          (t.excludedIds = [t.excludedIds, i].filter(Boolean).join(",")),
        I.state.isAuth && (t.sdks = "auth_v1");
      const { page: d, search: m } = e,
        { listings: E, total: A } = ie
          ? await D.getMobileListings(t)
          : await D.getDesktopListings(t),
        R = Object.values(E),
        o = m ? "search" : "wallets";
      return (
        (v[o] = { listings: [...v[o].listings, ...R], total: A, page: d ?? 1 }),
        { listings: R, total: A }
      );
    },
    getWalletImageUrl(e) {
      return D.getWalletImageUrl(e);
    },
    getAssetImageUrl(e) {
      return D.getAssetImageUrl(e);
    },
    resetSearch() {
      v.search = { listings: [], total: 0, page: 1 };
    },
  },
  N = W({ open: !1 }),
  G = {
    state: N,
    subscribe(e) {
      return U(N, () => e(N));
    },
    async open(e) {
      return new Promise((t) => {
        const { isUiLoaded: s, isDataLoaded: i } = I.state;
        if (
          (f.removeWalletConnectDeepLink(),
          I.setWalletConnectUri(e == null ? void 0 : e.uri),
          I.setChains(e == null ? void 0 : e.chains),
          de.reset("ConnectWallet"),
          s && i)
        )
          (N.open = !0), t();
        else {
          const c = setInterval(() => {
            const d = I.state;
            d.isUiLoaded &&
              d.isDataLoaded &&
              (clearInterval(c), (N.open = !0), t());
          }, 200);
        }
      });
    },
    close() {
      N.open = !1;
    },
  };
var We = Object.defineProperty,
  ae = Object.getOwnPropertySymbols,
  Re = Object.prototype.hasOwnProperty,
  Te = Object.prototype.propertyIsEnumerable,
  le = (e, t, s) =>
    t in e
      ? We(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  De = (e, t) => {
    for (var s in t || (t = {})) Re.call(t, s) && le(e, s, t[s]);
    if (ae) for (var s of ae(t)) Te.call(t, s) && le(e, s, t[s]);
    return e;
  };
function Me() {
  return (
    typeof matchMedia < "u" &&
    matchMedia("(prefers-color-scheme: dark)").matches
  );
}
const k = W({ themeMode: Me() ? "dark" : "light" }),
  ce = {
    state: k,
    subscribe(e) {
      return U(k, () => e(k));
    },
    setThemeConfig(e) {
      const { themeMode: t, themeVariables: s } = e;
      t && (k.themeMode = t), s && (k.themeVariables = De({}, s));
    },
  },
  M = W({ open: !1, message: "", variant: "success" }),
  ke = {
    state: M,
    subscribe(e) {
      return U(M, () => e(M));
    },
    openToast(e, t) {
      (M.open = !0), (M.message = e), (M.variant = t);
    },
    closeToast() {
      M.open = !1;
    },
  };
class Ue {
  constructor(t) {
    (this.openModal = G.open),
      (this.closeModal = G.close),
      (this.subscribeModal = G.subscribe),
      (this.setTheme = ce.setThemeConfig),
      ce.setThemeConfig(t),
      V.setConfig(t),
      this.initUi();
  }
  async initUi() {
    if (typeof window < "u") {
      await fe(
        () => import("./index-b27b61e5.js"),
        [
          "assets/index-b27b61e5.js",
          "assets/lit-element-2aa1acc0.js",
          "assets/index-aff6404b.js",
          "assets/index-6a964d41.css",
        ],
      );
      const t = document.createElement("wcm-modal");
      document.body.insertAdjacentElement("beforeend", t), I.setIsUiLoaded(!0);
    }
  }
}
const He = Object.freeze(
  Object.defineProperty(
    { __proto__: null, WalletConnectModal: Ue },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
export {
  ye as R,
  de as T,
  f as a,
  He as i,
  ce as n,
  ke as o,
  I as p,
  G as s,
  Ve as t,
  V as y,
};
