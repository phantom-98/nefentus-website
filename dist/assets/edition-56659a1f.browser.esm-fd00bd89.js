var m = Object.defineProperty;
var d = (c, e, t) =>
  e in c
    ? m(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (c[e] = t);
var a = (c, e, t) => (d(c, typeof e != "symbol" ? e + "" : e, t), t);
import {
  N as g,
  k as y,
  A as C,
  l as W,
  F as w,
  n as T,
  o as f,
  p as A,
  q as S,
  t as R,
  G as b,
  s as B,
  u as E,
  v as O,
  H as F,
  x as v,
  y as M,
  z as s,
  B as N,
} from "./index-c70ad044.js";
import { S as P } from "./erc-1155-standard-ab2417d3.browser.esm-7d3533bf.js";
import { P as k } from "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const i = class i extends P {
  constructor(t, r, n) {
    let h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      o = arguments.length > 4 ? arguments[4] : void 0,
      u = arguments.length > 5 ? arguments[5] : void 0,
      l =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new y(t, r, o, h, n);
    super(l, n, u);
    a(
      this,
      "mint",
      s(async (t) => this.erc1155.mint.prepare(t)),
    );
    a(
      this,
      "mintTo",
      s(async (t, r) => this.erc1155.mintTo.prepare(t, r)),
    );
    a(
      this,
      "mintAdditionalSupply",
      s(async (t, r) => this.erc1155.mintAdditionalSupply.prepare(t, r)),
    );
    a(
      this,
      "mintAdditionalSupplyTo",
      s(async (t, r, n) =>
        this.erc1155.mintAdditionalSupplyTo.prepare(t, r, n),
      ),
    );
    a(
      this,
      "mintBatch",
      s(async (t) => this.erc1155.mintBatch.prepare(t)),
    );
    a(
      this,
      "mintBatchTo",
      s(async (t, r) => this.erc1155.mintBatchTo.prepare(t, r)),
    );
    a(
      this,
      "burn",
      s(async (t, r) => this.erc1155.burn.prepare(t, r)),
    );
    (this.abi = C.parse(o || [])),
      (this.metadata = new W(this.contractWrapper, w, this.storage)),
      (this.app = new T(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new f(this.contractWrapper, i.contractRoles)),
      (this.royalties = new A(this.contractWrapper, this.metadata)),
      (this.sales = new S(this.contractWrapper)),
      (this.encoder = new R(this.contractWrapper)),
      (this.estimator = new b(this.contractWrapper)),
      (this.events = new B(this.contractWrapper)),
      (this.platformFees = new E(this.contractWrapper)),
      (this.interceptor = new O(this.contractWrapper)),
      (this.signature = new F(this.contractWrapper, this.storage, this.roles)),
      (this.owner = new v(this.contractWrapper));
  }
  onNetworkUpdated(t) {
    this.contractWrapper.updateSignerOrProvider(t);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async getAll(t) {
    return this.erc1155.getAll(t);
  }
  async getOwned(t) {
    return this.erc1155.getOwned(t);
  }
  async getTotalCount() {
    return this.erc1155.totalCount();
  }
  async isTransferRestricted() {
    return !(await this.contractWrapper.readContract.hasRole(M("transfer"), k));
  }
  async getMintTransaction(t, r) {
    return this.erc1155.getMintTransaction(t, r);
  }
  async prepare(t, r, n) {
    return N.fromContractWrapper({
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
a(i, "contractRoles", g);
let p = i;
export { p as Edition };
