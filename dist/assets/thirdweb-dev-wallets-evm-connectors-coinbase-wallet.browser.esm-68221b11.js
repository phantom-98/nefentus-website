import { x as l, _ as I, R as _ } from "./index-aff6404b.js";
import {
  f as P,
  b as c,
  w as E,
  _ as m,
  W as w,
  d as o,
  c as v,
  h as C,
} from "./index-c70ad044.js";
import {
  W as b,
  U as u,
  a as U,
  A as W,
  S as A,
} from "./errors-d961f852.browser.esm-de44b07f.js";
import { n as f } from "./normalizeChainId-e4cc0175.browser.esm-196d9c80.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
var h = new WeakMap(),
  d = new WeakMap(),
  p = new WeakSet();
class M extends b {
  constructor(t) {
    let { chains: e, options: s } = t;
    super({ chains: e, options: { reloadOnDisconnect: !1, ...s } }),
      P(this, p),
      c(this, "id", E.coinbase),
      c(this, "name", "Coinbase Wallet"),
      c(this, "ready", !0),
      m(this, h, { writable: !0, value: void 0 }),
      m(this, d, { writable: !0, value: void 0 }),
      c(this, "onAccountsChanged", (i) => {
        i.length === 0
          ? this.emit("disconnect")
          : this.emit("change", { account: l(i[0]) });
      }),
      c(this, "onChainChanged", (i) => {
        const n = f(i),
          r = this.isChainUnsupported(n);
        this.emit("change", { chain: { id: n, unsupported: r } });
      }),
      c(this, "onDisconnect", () => {
        this.emit("disconnect");
      });
  }
  async connect() {
    let { chainId: t } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      const e = await this.getProvider();
      this.setupListeners(), this.emit("message", { type: "connecting" });
      const s = await e.enable(),
        i = l(s[0]);
      let n = await this.getChainId(),
        r = this.isChainUnsupported(n);
      if (t && n !== t)
        try {
          (n = (await this.switchChain(t)).chainId),
            (r = this.isChainUnsupported(n));
        } catch (a) {
          console.error(
            `Connected but failed to switch to desired chain ${t}`,
            a,
          );
        }
      return {
        account: i,
        chain: { id: n, unsupported: r },
        provider: new w(e),
      };
    } catch (e) {
      throw /(user closed modal|accounts received is empty)/i.test(e.message)
        ? new u(e)
        : e;
    }
  }
  async disconnect() {
    if (!o(this, d)) return;
    const t = await this.getProvider();
    t.removeListener("accountsChanged", this.onAccountsChanged),
      t.removeListener("chainChanged", this.onChainChanged),
      t.removeListener("disconnect", this.onDisconnect),
      t.disconnect(),
      t.close();
  }
  async getAccount() {
    const e = await (
      await this.getProvider()
    ).request({ method: "eth_accounts" });
    if (e.length === 0) throw new Error("No accounts found");
    return l(e[0]);
  }
  async getChainId() {
    const t = await this.getProvider();
    return f(t.chainId);
  }
  async getProvider() {
    var t;
    if (!o(this, d)) {
      let e = (
        await I(
          () => import("./index-d7e8945d.js").then((a) => a.i),
          [
            "assets/index-d7e8945d.js",
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
        )
      ).default;
      typeof e != "function" &&
        typeof e.default == "function" &&
        (e = e.default),
        v(this, h, new e(this.options));
      const s =
          (t = o(this, h).walletExtension) == null ? void 0 : t.getChainId(),
        i =
          this.chains.find((a) =>
            this.options.chainId
              ? a.chainId === this.options.chainId
              : a.chainId === s,
          ) || this.chains[0],
        n = this.options.chainId || (i == null ? void 0 : i.chainId),
        r = this.options.jsonRpcUrl || (i == null ? void 0 : i.rpc[0]);
      v(this, d, o(this, h).makeWeb3Provider(r, n));
    }
    return o(this, d);
  }
  async getSigner() {
    let { chainId: t } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const [e, s] = await Promise.all([this.getProvider(), this.getAccount()]);
    return new w(e, t).getSigner(s);
  }
  async isAuthorized() {
    try {
      return !!(await this.getAccount());
    } catch {
      return !1;
    }
  }
  async switchChain(t) {
    const e = await this.getProvider(),
      s = _(t);
    try {
      return (
        await e.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: s }],
        }),
        this.chains.find((i) => i.chainId === t) ?? {
          chainId: t,
          name: `Chain ${s}`,
          slug: `${s}`,
          nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
          rpc: [""],
          testnet: !1,
          chain: "ethereum",
          shortName: "eth",
        }
      );
    } catch (i) {
      const n = this.chains.find((r) => r.chainId === t);
      if (!n) throw new U({ chainId: t, connectorId: this.id });
      if (i.code === 4902)
        try {
          return (
            await e.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: s,
                  chainName: n.name,
                  nativeCurrency: n.nativeCurrency,
                  rpcUrls: n.rpc,
                  blockExplorerUrls: this.getBlockExplorerUrls(n),
                },
              ],
            }),
            n
          );
        } catch (r) {
          throw C(this, p, y).call(this, r) ? new u(r) : new W();
        }
      throw C(this, p, y).call(this, i) ? new u(i) : new A(i);
    }
  }
  async setupListeners() {
    const t = await this.getProvider();
    t.on("accountsChanged", this.onAccountsChanged),
      t.on("chainChanged", this.onChainChanged),
      t.on("disconnect", this.onDisconnect);
  }
  async getQrUrl() {
    if ((await this.getProvider(), !o(this, h)))
      throw new Error("Coinbase Wallet SDK not initialized");
    return o(this, h).getQrUrl();
  }
}
function y(g) {
  return /(user rejected)/i.test(g.message);
}
export { M as CoinbaseWalletConnector };
