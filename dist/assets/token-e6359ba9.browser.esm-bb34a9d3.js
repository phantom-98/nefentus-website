var W = Object.defineProperty;
var w = (o, e, t) =>
  e in o
    ? W(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (o[e] = t);
var s = (o, e, t) => (w(o, typeof e != "symbol" ? e + "" : e, t), t);
import {
  Y as y,
  N as C,
  k as T,
  A as b,
  l as E,
  aP as v,
  n as A,
  o as R,
  q as S,
  s as B,
  t as O,
  G as F,
  u as P,
  v as V,
  aQ as M,
  M as u,
  y as N,
  z as i,
  B as g,
} from "./index-c70ad044.js";
import { P as l, k as d } from "./index-aff6404b.js";
import { S as k } from "./erc-20-standard-4ea47ba3.browser.esm-a05127e0.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
class x {
  constructor(e, t) {
    (this.contractWrapper = e), (this.events = t);
  }
  async getAllHolderBalances() {
    const t = (await this.events.getEvents("Transfer")).map((a) => a.data),
      r = {};
    return (
      t.forEach((a) => {
        const c = a == null ? void 0 : a.from,
          n = a == null ? void 0 : a.to,
          p = a == null ? void 0 : a.value;
        c !== l && (c in r || (r[c] = d.from(0)), (r[c] = r[c].sub(p))),
          n !== l && (n in r || (r[n] = d.from(0)), (r[n] = r[n].add(p)));
      }),
      Promise.all(
        Object.keys(r).map(async (a) => ({
          holder: a,
          balance: await y(
            this.contractWrapper.getProvider(),
            this.contractWrapper.readContract.address,
            r[a],
          ),
        })),
      )
    );
  }
}
const h = class h extends k {
  constructor(t, r, a) {
    let c = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      n = arguments.length > 4 ? arguments[4] : void 0,
      p = arguments.length > 5 ? arguments[5] : void 0,
      f =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new T(t, r, n, c, a);
    super(f, a, p);
    s(
      this,
      "mint",
      i(async (t) => this.erc20.mint.prepare(t)),
    );
    s(
      this,
      "mintTo",
      i(async (t, r) => this.erc20.mintTo.prepare(t, r)),
    );
    s(
      this,
      "mintBatchTo",
      i(async (t) => this.erc20.mintBatchTo.prepare(t)),
    );
    s(
      this,
      "delegateTo",
      i(async (t) =>
        g.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "delegate",
          args: [await u(t)],
        }),
      ),
    );
    s(
      this,
      "burn",
      i((t) => this.erc20.burn.prepare(t)),
    );
    s(
      this,
      "burnFrom",
      i(async (t, r) => this.erc20.burnFrom.prepare(t, r)),
    );
    (this.abi = b.parse(n || [])),
      (this.metadata = new E(this.contractWrapper, v, this.storage)),
      (this.app = new A(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new R(this.contractWrapper, h.contractRoles)),
      (this.sales = new S(this.contractWrapper)),
      (this.events = new B(this.contractWrapper)),
      (this.history = new x(this.contractWrapper, this.events)),
      (this.encoder = new O(this.contractWrapper)),
      (this.estimator = new F(this.contractWrapper)),
      (this.platformFees = new P(this.contractWrapper)),
      (this.interceptor = new V(this.contractWrapper)),
      (this.signature = new M(this.contractWrapper, this.roles));
  }
  async getVoteBalance() {
    return await this.getVoteBalanceOf(
      await this.contractWrapper.getSignerAddress(),
    );
  }
  async getVoteBalanceOf(t) {
    return await this.erc20.getValue(
      await this.contractWrapper.readContract.getVotes(t),
    );
  }
  async getDelegation() {
    return await this.getDelegationOf(
      await this.contractWrapper.getSignerAddress(),
    );
  }
  async getDelegationOf(t) {
    return await this.contractWrapper.readContract.delegates(await u(t));
  }
  async isTransferRestricted() {
    return !(await this.contractWrapper.readContract.hasRole(N("transfer"), l));
  }
  async getMintTransaction(t, r) {
    return this.erc20.getMintTransaction(t, r);
  }
  async prepare(t, r, a) {
    return g.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: r,
      overrides: a,
    });
  }
  async call(t, r, a) {
    return this.contractWrapper.call(t, r, a);
  }
};
s(h, "contractRoles", C);
let m = h;
export { m as Token };
