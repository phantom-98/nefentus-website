var g = Object.defineProperty;
var C = (o, t, a) =>
  t in o
    ? g(o, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
    : (o[t] = a);
var c = (o, t, a) => (C(o, typeof t != "symbol" ? t + "" : t, a), a);
import {
  aL as f,
  k as y,
  A as b,
  l as R,
  aM as v,
  n as A,
  o as k,
  t as P,
  G as O,
  s as T,
  v as S,
  M as s,
  j as I,
  av as B,
  Y as E,
  z as p,
  B as i,
} from "./index-c70ad044.js";
import { k as u } from "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const d = class d {
  constructor(t, a, e) {
    c(
      this,
      "withdraw",
      p(async (t) =>
        i.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "release(address)",
          args: [await s(t)],
        }),
      ),
    );
    c(
      this,
      "withdrawToken",
      p(async (t, a) =>
        i.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "release(address,address)",
          args: [await s(a), await s(t)],
        }),
      ),
    );
    c(
      this,
      "distribute",
      p(async () =>
        i.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "distribute()",
          args: [],
        }),
      ),
    );
    c(
      this,
      "distributeToken",
      p(async (t) =>
        i.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "distribute(address)",
          args: [await s(t)],
        }),
      ),
    );
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      n = arguments.length > 4 ? arguments[4] : void 0,
      l = arguments.length > 5 ? arguments[5] : void 0,
      h =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new y(t, a, n, r, e);
    (this._chainId = l),
      (this.abi = b.parse(n || [])),
      (this.contractWrapper = h),
      (this.storage = e),
      (this.metadata = new R(this.contractWrapper, v, this.storage)),
      (this.app = new A(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new k(this.contractWrapper, d.contractRoles)),
      (this.encoder = new P(this.contractWrapper)),
      (this.estimator = new O(this.contractWrapper)),
      (this.events = new T(this.contractWrapper)),
      (this.interceptor = new S(this.contractWrapper));
  }
  get chainId() {
    return this._chainId;
  }
  onNetworkUpdated(t) {
    this.contractWrapper.updateSignerOrProvider(t);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async getAllRecipients() {
    const t = [];
    let a = u.from(0);
    const e = await this.contractWrapper.readContract.payeeCount();
    for (; a.lt(e); )
      try {
        const r = await this.contractWrapper.readContract.payee(a);
        t.push(await this.getRecipientSplitPercentage(r)), (a = a.add(1));
      } catch (r) {
        if ("method" in r && r.method.toLowerCase().includes("payee(uint256)"))
          break;
        throw r;
      }
    return t;
  }
  async balanceOfAllRecipients() {
    const t = await this.getAllRecipients(),
      a = {};
    for (const e of t) a[e.address] = await this.balanceOf(e.address);
    return a;
  }
  async balanceOfTokenAllRecipients(t) {
    const a = await s(t),
      e = await this.getAllRecipients(),
      r = {};
    for (const n of e) r[n.address] = await this.balanceOfToken(n.address, a);
    return r;
  }
  async balanceOf(t) {
    const a = await s(t),
      e = await this.contractWrapper.readContract.provider.getBalance(
        this.getAddress(),
      ),
      r = await this.contractWrapper.readContract["totalReleased()"](),
      n = e.add(r);
    return this._pendingPayment(
      a,
      n,
      await this.contractWrapper.readContract["released(address)"](a),
    );
  }
  async balanceOfToken(t, a) {
    const e = await s(a),
      r = await s(t),
      l = await new I(e, B, this.contractWrapper.getProvider()).balanceOf(
        this.getAddress(),
      ),
      h = await this.contractWrapper.readContract["totalReleased(address)"](e),
      m = l.add(h),
      W = await this._pendingPayment(
        r,
        m,
        await this.contractWrapper.readContract["released(address,address)"](
          e,
          r,
        ),
      );
    return await E(this.contractWrapper.getProvider(), e, W);
  }
  async getRecipientSplitPercentage(t) {
    const a = await s(t),
      [e, r] = await Promise.all([
        this.contractWrapper.readContract.totalShares(),
        this.contractWrapper.readContract.shares(t),
      ]);
    return {
      address: a,
      splitPercentage: r.mul(u.from(1e7)).div(e).toNumber() / 1e5,
    };
  }
  async _pendingPayment(t, a, e) {
    return a
      .mul(await this.contractWrapper.readContract.shares(await s(t)))
      .div(await this.contractWrapper.readContract.totalShares())
      .sub(e);
  }
  async prepare(t, a, e) {
    return i.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: a,
      overrides: e,
    });
  }
  async call(t, a, e) {
    return this.contractWrapper.call(t, a, e);
  }
};
c(d, "contractRoles", f);
let w = d;
export { w as Split };
