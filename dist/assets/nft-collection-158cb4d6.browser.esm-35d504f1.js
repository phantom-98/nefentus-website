var d = Object.defineProperty;
var l = (s, a, t) =>
  a in s
    ? d(s, a, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (s[a] = t);
var e = (s, a, t) => (l(s, typeof a != "symbol" ? a + "" : a, t), t);
import {
  N as g,
  k as W,
  A as C,
  l as w,
  aq as y,
  n as f,
  o as T,
  p as R,
  q as S,
  t as E,
  G as b,
  s as A,
  u as B,
  v,
  ar as M,
  x as O,
  y as k,
  z as c,
  B as x,
} from "./index-0b7da92f.js";
import { S as I } from "./erc-721-standard-961fbe42.browser.esm-711a8851.js";
import { R as P } from "./index-dd74b233.js";
import "./index-e5cf03ca.js";
import "./constants-ac5fb9cc.js";
import "./hoist-non-react-statics.cjs-41d71acf.js";
import "./Helmet-4c7ebf64.js";
const i = class i extends I {
  constructor(t, r, n) {
    let h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      o = arguments.length > 4 ? arguments[4] : void 0,
      m = arguments.length > 5 ? arguments[5] : void 0,
      u =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new W(t, r, o, h, n);
    super(u, n, m);
    e(
      this,
      "mint",
      c(async (t) => this.erc721.mint.prepare(t)),
    );
    e(
      this,
      "mintTo",
      c(async (t, r) => this.erc721.mintTo.prepare(t, r)),
    );
    e(
      this,
      "mintBatch",
      c(async (t) => this.erc721.mintBatch.prepare(t)),
    );
    e(
      this,
      "mintBatchTo",
      c(async (t, r) => this.erc721.mintBatchTo.prepare(t, r)),
    );
    e(
      this,
      "burn",
      c((t) => this.erc721.burn.prepare(t)),
    );
    (this.abi = C.parse(o || [])),
      (this.metadata = new w(this.contractWrapper, y, this.storage)),
      (this.app = new f(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new T(this.contractWrapper, i.contractRoles)),
      (this.royalties = new R(this.contractWrapper, this.metadata)),
      (this.sales = new S(this.contractWrapper)),
      (this.encoder = new E(this.contractWrapper)),
      (this.estimator = new b(this.contractWrapper)),
      (this.events = new A(this.contractWrapper)),
      (this.platformFees = new B(this.contractWrapper)),
      (this.interceptor = new v(this.contractWrapper)),
      (this.signature = new M(this.contractWrapper, this.storage)),
      (this.owner = new O(this.contractWrapper));
  }
  onNetworkUpdated(t) {
    this.contractWrapper.updateSignerOrProvider(t);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async isTransferRestricted() {
    return !(await this.contractWrapper.readContract.hasRole(k("transfer"), P));
  }
  async getMintTransaction(t, r) {
    return this.erc721.getMintTransaction(t, r);
  }
  async prepare(t, r, n) {
    return x.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: r,
      overrides: n,
    });
  }
  async call(t, r, n) {
    return this.contractWrapper.call(t, r, n);
  }
};
e(i, "contractRoles", g);
let p = i;
export { p as NFTCollection };
