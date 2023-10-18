import { x as I, R as k, _ as z } from "./index-aff6404b.js";
import {
  f as d,
  b as l,
  _ as y,
  c as U,
  h as o,
  d as s,
  W as q,
  w as K,
} from "./index-c70ad044.js";
import {
  W as Y,
  U as L,
  S as O,
} from "./errors-d961f852.browser.esm-de44b07f.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const $ = new Set([1, 137, 10, 42161, 56]),
  x = "eip155",
  j = "wagmi.requestedChains",
  N = "wallet_addEthereumChain",
  S = "last-used-chain-id";
var n = new WeakMap(),
  C = new WeakMap(),
  u = new WeakMap(),
  P = new WeakSet(),
  H = new WeakSet(),
  E = new WeakSet(),
  M = new WeakSet(),
  f = new WeakSet(),
  A = new WeakSet(),
  W = new WeakSet(),
  D = new WeakSet();
class at extends Y {
  constructor(i) {
    super({ ...i, options: { isNewChainsStale: !0, ...i.options } }),
      d(this, D),
      d(this, W),
      d(this, A),
      d(this, f),
      d(this, M),
      d(this, E),
      d(this, H),
      d(this, P),
      l(this, "id", K.walletConnect),
      l(this, "name", "WalletConnect"),
      l(this, "ready", !0),
      y(this, n, { writable: !0, value: void 0 }),
      y(this, C, { writable: !0, value: void 0 }),
      y(this, u, { writable: !0, value: void 0 }),
      l(this, "onAccountsChanged", (e) => {
        e.length === 0
          ? this.emit("disconnect")
          : this.emit("change", { account: I(e[0]) });
      }),
      l(this, "onChainChanged", async (e) => {
        const a = Number(e),
          t = this.isChainUnsupported(a);
        await s(this, u).setItem(S, String(e)),
          this.emit("change", { chain: { id: a, unsupported: t } });
      }),
      l(this, "onDisconnect", async () => {
        await o(this, f, g).call(this, []),
          await s(this, u).removeItem(S),
          this.emit("disconnect");
      }),
      l(this, "onDisplayUri", (e) => {
        this.emit("message", { type: "display_uri", data: e });
      }),
      l(this, "onConnect", () => {
        this.emit("connect", { provider: s(this, n) });
      }),
      U(this, u, i.options.storage),
      o(this, P, b).call(this),
      (this.filteredChains =
        this.chains.length > 50
          ? this.chains.filter((e) => $.has(e.chainId))
          : this.chains);
  }
  async connect() {
    var a;
    let { chainId: i, pairingTopic: e } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      let t = i;
      if (!t) {
        const w = await s(this, u).getItem(S),
          c = w ? parseInt(w) : void 0;
        c && !this.isChainUnsupported(c)
          ? (t = c)
          : (t = (a = this.filteredChains[0]) == null ? void 0 : a.chainId);
      }
      if (!t) throw new Error("No chains found on connector.");
      const r = await this.getProvider();
      this.setupListeners();
      const p = await o(this, E, T).call(this);
      if ((r.session && p && (await r.disconnect()), !r.session || p)) {
        const w = this.filteredChains
          .filter((c) => c.chainId !== t)
          .map((c) => c.chainId);
        this.emit("message", { type: "connecting" }),
          await r.connect({
            pairingTopic: e,
            chains: [t],
            optionalChains: w.length > 0 ? w : [t],
          }),
          await o(this, f, g).call(
            this,
            this.filteredChains.map((c) => {
              let { chainId: Q } = c;
              return Q;
            }),
          );
      }
      const v = await r.enable();
      if (v.length === 0) throw new Error("No accounts found on provider.");
      const _ = I(v[0]),
        m = await this.getChainId(),
        J = this.isChainUnsupported(m);
      return {
        account: _,
        chain: { id: m, unsupported: J },
        provider: new q(r),
      };
    } catch (t) {
      throw /user rejected/i.test(t == null ? void 0 : t.message)
        ? new L(t)
        : t;
    }
  }
  async disconnect() {
    const i = () => {
      if (!(typeof localStorage > "u"))
        for (const t in localStorage)
          t.startsWith("wc@2") && localStorage.removeItem(t);
    };
    i();
    const e = await this.getProvider();
    (async () => {
      try {
        await e.disconnect();
      } catch (t) {
        if (!/No matching key/i.test(t.message)) throw t;
      } finally {
        o(this, M, R).call(this), await o(this, f, g).call(this, []), i();
      }
    })();
  }
  async getAccount() {
    const { accounts: i } = await this.getProvider();
    if (i.length === 0) throw new Error("No accounts found on provider.");
    return I(i[0]);
  }
  async getChainId() {
    const { chainId: i } = await this.getProvider();
    return i;
  }
  async getProvider() {
    let { chainId: i } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (
      (s(this, n) || (await o(this, P, b).call(this)),
      i && (await this.switchChain(i)),
      !s(this, n))
    )
      throw new Error("No provider found.");
    return s(this, n);
  }
  async getSigner() {
    let { chainId: i } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const [e, a] = await Promise.all([
      this.getProvider({ chainId: i }),
      this.getAccount(),
    ]);
    return new q(e, i).getSigner(a);
  }
  async isAuthorized() {
    try {
      const [i, e] = await Promise.all([this.getAccount(), this.getProvider()]),
        a = await o(this, E, T).call(this);
      if (!i) return !1;
      if (a && e.session) {
        try {
          await e.disconnect();
        } catch {}
        return !1;
      }
      return !0;
    } catch {
      return !1;
    }
  }
  async switchChain(i) {
    var a;
    const e = this.chains.find((t) => t.chainId === i);
    if (!e) throw new O(`Chain with ID: ${i}, not found on connector.`);
    try {
      const t = await this.getProvider(),
        r = o(this, W, V).call(this),
        p = o(this, D, G).call(this);
      if (!r.includes(i) && p.includes(N)) {
        const _ =
          (a = e.explorers) != null && a.length
            ? { blockExplorerUrls: [e.explorers[0].url] }
            : {};
        await t.request({
          method: N,
          params: [
            {
              chainId: k(e.chainId),
              chainName: e.name,
              nativeCurrency: e.nativeCurrency,
              rpcUrls: [...e.rpc],
              ..._,
            },
          ],
        });
        const m = await o(this, A, F).call(this);
        m.push(i), await o(this, f, g).call(this, m);
      }
      return (
        await t.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: k(i) }],
        }),
        e
      );
    } catch (t) {
      const r = typeof t == "string" ? t : t == null ? void 0 : t.message;
      throw /user rejected request/i.test(r) ? new L(t) : new O(t);
    }
  }
  async setupListeners() {
    s(this, n) &&
      (o(this, M, R).call(this),
      s(this, n).on("accountsChanged", this.onAccountsChanged),
      s(this, n).on("chainChanged", this.onChainChanged),
      s(this, n).on("disconnect", this.onDisconnect),
      s(this, n).on("session_delete", this.onDisconnect),
      s(this, n).on("display_uri", this.onDisplayUri),
      s(this, n).on("connect", this.onConnect));
  }
}
async function b() {
  return s(this, C) || U(this, C, o(this, H, B).call(this)), s(this, C);
}
async function B() {
  const {
      default: h,
      OPTIONAL_EVENTS: i,
      OPTIONAL_METHODS: e,
    } = await z(
      () => import("./index.es-88607b50.js"),
      [
        "assets/index.es-88607b50.js",
        "assets/index-aff6404b.js",
        "assets/index-6a964d41.css",
        "assets/events-4ec3c2d6.js",
        "assets/index-c70ad044.js",
        "assets/index-35d0d874.js",
        "assets/index-e651aa00.css",
        "assets/constants-ed7a1b25.js",
        "assets/hoist-non-react-statics.cjs-434f601a.js",
        "assets/Helmet-bfad690c.js",
        "assets/index-33720da0.css",
      ],
    ),
    [a, ...t] = this.filteredChains.map((r) => {
      let { chainId: p } = r;
      return p;
    });
  a &&
    U(
      this,
      n,
      await h.init({
        showQrModal: this.options.qrcode !== !1,
        projectId: this.options.projectId,
        optionalMethods: e,
        optionalEvents: i,
        chains: [a],
        optionalChains: t,
        metadata: {
          name: this.options.dappMetadata.name,
          description: this.options.dappMetadata.description || "",
          url: this.options.dappMetadata.url,
          icons: [this.options.dappMetadata.logoUrl || ""],
        },
        rpcMap: Object.fromEntries(
          this.filteredChains.map((r) => [r.chainId, r.rpc[0]]),
        ),
        qrModalOptions: this.options.qrModalOptions,
      }),
    );
}
async function T() {
  if (o(this, D, G).call(this).includes(N) || !this.options.isNewChainsStale)
    return !1;
  const i = await o(this, A, F).call(this),
    e = this.filteredChains.map((t) => {
      let { chainId: r } = t;
      return r;
    }),
    a = o(this, W, V).call(this);
  return a.length && !a.some((t) => e.includes(t))
    ? !1
    : !e.every((t) => i.includes(t));
}
function R() {
  s(this, n) &&
    (s(this, n).removeListener("accountsChanged", this.onAccountsChanged),
    s(this, n).removeListener("chainChanged", this.onChainChanged),
    s(this, n).removeListener("disconnect", this.onDisconnect),
    s(this, n).removeListener("session_delete", this.onDisconnect),
    s(this, n).removeListener("display_uri", this.onDisplayUri),
    s(this, n).removeListener("connect", this.onConnect));
}
async function g(h) {
  await s(this, u).setItem(j, JSON.stringify(h));
}
async function F() {
  const h = await s(this, u).getItem(j);
  return h ? JSON.parse(h) : [];
}
function V() {
  var i, e, a;
  return s(this, n)
    ? ((a =
        (e = (i = s(this, n).session) == null ? void 0 : i.namespaces[x]) ==
        null
          ? void 0
          : e.chains) == null
        ? void 0
        : a.map((t) => parseInt(t.split(":")[1] || ""))) ?? []
    : [];
}
function G() {
  var i, e;
  return s(this, n)
    ? ((e = (i = s(this, n).session) == null ? void 0 : i.namespaces[x]) == null
        ? void 0
        : e.methods) ?? []
    : [];
}
export { at as WalletConnectConnector };
