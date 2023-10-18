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
  y as P,
  z as c,
  B as k,
} from "./index-c70ad044.js";
import { S as x } from "./erc-721-standard-961fbe42.browser.esm-01ce6e8c.js";
import { P as I } from "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const i = class i extends x {
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
    return !(await this.contractWrapper.readContract.hasRole(P("transfer"), I));
  }
  async getMintTransaction(t, r) {
    return this.erc721.getMintTransaction(t, r);
  }
  async prepare(t, r, n) {
    return k.fromContractWrapper({
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
