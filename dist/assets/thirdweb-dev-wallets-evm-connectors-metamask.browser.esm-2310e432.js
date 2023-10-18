import {
  _ as C,
  b as d,
  c as I,
  d as v,
  W as P,
  e as A,
  g as E,
  w as S,
} from "./index-c70ad044.js";
import {
  W as U,
  C as h,
  U as u,
  R as y,
  a as W,
  A as D,
  S as _,
} from "./errors-d961f852.browser.esm-de44b07f.js";
import { n as p } from "./normalizeChainId-e4cc0175.browser.esm-196d9c80.js";
import { x as m, R as q } from "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
function k(c) {
  var i;
  if (!c) return "Injected";
  const t = (e) => {
    if (e.isAvalanche) return "Core Wallet";
    if (e.isBitKeep) return "BitKeep";
    if (e.isBraveWallet) return "Brave Wallet";
    if (e.isCoinbaseWallet) return "Coinbase Wallet";
    if (e.isExodus) return "Exodus";
    if (e.isFrame) return "Frame";
    if (e.isKuCoinWallet) return "KuCoin Wallet";
    if (e.isMathWallet) return "MathWallet";
    if (e.isOneInchIOSWallet || e.isOneInchAndroidWallet) return "1inch Wallet";
    if (e.isOpera) return "Opera";
    if (e.isPortal) return "Ripio Portal";
    if (e.isTally) return "Tally";
    if (e.isTokenPocket) return "TokenPocket";
    if (e.isTokenary) return "Tokenary";
    if (e.isTrust || e.isTrustWallet) return "Trust Wallet";
    if (e.isMetaMask) return "MetaMask";
  };
  if ((i = c.providers) != null && i.length) {
    const e = new Set();
    let r = 1;
    for (const s of c.providers) {
      let o = t(s);
      o || ((o = `Unknown Wallet #${r}`), (r += 1)), e.add(o);
    }
    const n = [...e];
    return n.length ? n : n[0] ?? "Injected";
  }
  return t(c) ?? "Injected";
}
var w = new WeakMap();
class R extends U {
  constructor(t) {
    const e = {
      ...{
        shimDisconnect: !0,
        getProvider: () => {
          if (A(globalThis.window)) return globalThis.window.ethereum;
        },
      },
      ...t.options,
    };
    super({ chains: t.chains, options: e }),
      C(this, w, { writable: !0, value: void 0 }),
      d(this, "shimDisconnectKey", "injected.shimDisconnect"),
      d(this, "onAccountsChanged", async (n) => {
        n.length === 0
          ? this.emit("disconnect")
          : this.emit("change", { account: m(n[0]) });
      }),
      d(this, "onChainChanged", (n) => {
        const s = p(n),
          o = this.isChainUnsupported(s);
        this.emit("change", { chain: { id: s, unsupported: o } });
      }),
      d(this, "onDisconnect", async (n) => {
        (n.code === 1013 &&
          (await this.getProvider()) &&
          (await this.getAccount())) ||
          (this.emit("disconnect"),
          this.options.shimDisconnect &&
            (await this.connectorStorage.removeItem(this.shimDisconnectKey)));
      });
    const r = e.getProvider();
    if (typeof e.name == "string") this.name = e.name;
    else if (r) {
      const n = k(r);
      e.name
        ? (this.name = e.name(n))
        : typeof n == "string"
        ? (this.name = n)
        : (this.name = n[0]);
    } else this.name = "Injected";
    (this.id = "injected"),
      (this.ready = !!r),
      (this.connectorStorage = t.connectorStorage);
  }
  async connect() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      const i = await this.getProvider();
      if (!i) throw new h();
      this.setupListeners(), this.emit("message", { type: "connecting" });
      const e = await i.request({ method: "eth_requestAccounts" }),
        r = m(e[0]);
      let n = await this.getChainId(),
        s = this.isChainUnsupported(n);
      if (t.chainId && n !== t.chainId)
        try {
          await this.switchChain(t.chainId),
            (n = t.chainId),
            (s = this.isChainUnsupported(t.chainId));
        } catch (a) {
          console.error(`Could not switch to chain id: ${t.chainId}`, a);
        }
      this.options.shimDisconnect &&
        (await this.connectorStorage.setItem(this.shimDisconnectKey, "true"));
      const o = { account: r, chain: { id: n, unsupported: s }, provider: i };
      return this.emit("connect", o), o;
    } catch (i) {
      throw this.isUserRejectedRequestError(i)
        ? new u(i)
        : i.code === -32002
        ? new y(i)
        : i;
    }
  }
  async disconnect() {
    const t = await this.getProvider();
    t != null &&
      t.removeListener &&
      (t.removeListener("accountsChanged", this.onAccountsChanged),
      t.removeListener("chainChanged", this.onChainChanged),
      t.removeListener("disconnect", this.onDisconnect),
      this.options.shimDisconnect &&
        (await this.connectorStorage.removeItem(this.shimDisconnectKey)));
  }
  async getAccount() {
    const t = await this.getProvider();
    if (!t) throw new h();
    const i = await t.request({ method: "eth_accounts" });
    return m(i[0]);
  }
  async getChainId() {
    const t = await this.getProvider();
    if (!t) throw new h();
    return t.request({ method: "eth_chainId" }).then(p);
  }
  async getProvider() {
    const t = this.options.getProvider();
    return t && I(this, w, t), v(this, w);
  }
  async getSigner() {
    let { chainId: t } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const [i, e] = await Promise.all([this.getProvider(), this.getAccount()]);
    return new P(i, t).getSigner(e);
  }
  async isAuthorized() {
    try {
      if (
        this.options.shimDisconnect &&
        !(await this.connectorStorage.getItem(this.shimDisconnectKey))
      )
        return !1;
      if (!(await this.getProvider())) throw new h();
      return !!(await this.getAccount());
    } catch {
      return !1;
    }
  }
  async switchChain(t) {
    var r, n;
    const i = await this.getProvider();
    if (!i) throw new h();
    const e = q(t);
    try {
      await i.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: e }],
      });
      const s = this.chains.find((o) => o.chainId === t);
      return (
        s || {
          chainId: t,
          name: `Chain ${e}`,
          slug: `${e}`,
          nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
          rpc: [""],
          chain: "",
          shortName: "",
          testnet: !0,
        }
      );
    } catch (s) {
      const o = this.chains.find((a) => a.chainId === t);
      if (!o) throw new W({ chainId: t, connectorId: this.id });
      if (
        s.code === 4902 ||
        ((n =
          (r = s == null ? void 0 : s.data) == null
            ? void 0
            : r.originalError) == null
          ? void 0
          : n.code) === 4902
      )
        try {
          return (
            await i.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: e,
                  chainName: o.name,
                  nativeCurrency: o.nativeCurrency,
                  rpcUrls: o.rpc,
                  blockExplorerUrls: this.getBlockExplorerUrls(o),
                },
              ],
            }),
            o
          );
        } catch (a) {
          throw this.isUserRejectedRequestError(a) ? new u(s) : new D();
        }
      throw this.isUserRejectedRequestError(s) ? new u(s) : new _(s);
    }
  }
  async setupListeners() {
    const t = await this.getProvider();
    t.on &&
      (t.on("accountsChanged", this.onAccountsChanged),
      t.on("chainChanged", this.onChainChanged),
      t.on("disconnect", this.onDisconnect));
  }
  isUserRejectedRequestError(t) {
    return t.code === 4001;
  }
}
var f = new WeakMap();
class L extends R {
  constructor(t) {
    const e = {
      ...{
        name: "MetaMask",
        shimDisconnect: !0,
        shimChainChangedDisconnect: !0,
        getProvider: E,
      },
      ...t.options,
    };
    super({
      chains: t.chains,
      options: e,
      connectorStorage: t.connectorStorage,
    }),
      d(this, "id", S.metamask),
      C(this, f, { writable: !0, value: void 0 }),
      I(this, f, e.UNSTABLE_shimOnConnectSelectAccount);
  }
  async connect() {
    var i, e;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      const r = await this.getProvider();
      if (!r) throw new h();
      this.setupListeners(), this.emit("message", { type: "connecting" });
      let n = null;
      if (
        v(this, f) &&
        (i = this.options) != null &&
        i.shimDisconnect &&
        !this.connectorStorage.getItem(this.shimDisconnectKey) &&
        ((n = await this.getAccount().catch(() => null)), !!n)
      )
        try {
          await r.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
          });
        } catch (g) {
          if (this.isUserRejectedRequestError(g)) throw new u(g);
        }
      if (!n) {
        const l = await r.request({ method: "eth_requestAccounts" });
        n = m(l[0]);
      }
      let s = await this.getChainId(),
        o = this.isChainUnsupported(s);
      if (t.chainId && s !== t.chainId)
        try {
          await this.switchChain(t.chainId),
            (s = t.chainId),
            (o = this.isChainUnsupported(t.chainId));
        } catch (l) {
          console.error(`Could not switch to chain id : ${t.chainId}`, l);
        }
      (e = this.options) != null &&
        e.shimDisconnect &&
        (await this.connectorStorage.setItem(this.shimDisconnectKey, "true"));
      const a = { chain: { id: s, unsupported: o }, provider: r, account: n };
      return this.emit("connect", a), a;
    } catch (r) {
      throw this.isUserRejectedRequestError(r)
        ? new u(r)
        : r.code === -32002
        ? new y(r)
        : r;
    }
  }
  async switchAccount() {
    await (
      await this.getProvider()
    ).request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
  }
}
export { L as MetaMaskConnector };
