var g = Object.defineProperty;
var w = (i, e, t) =>
  e in i
    ? g(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (i[e] = t);
var o = (i, e, t) => (w(i, typeof e != "symbol" ? e + "" : e, t), t);
import {
  N as W,
  k as f,
  A as T,
  l as y,
  aw as b,
  n as A,
  o as S,
  p as N,
  q as E,
  t as R,
  G as k,
  s as U,
  u as x,
  v as M,
  ax as I,
  ar as m,
  ay as F,
  az as v,
  x as L,
  ad as d,
  y as _,
  z as p,
  B,
} from "./index-c70ad044.js";
import { S as O } from "./erc-721-standard-961fbe42.browser.esm-01ce6e8c.js";
import { P as z } from "./thirdweb-checkout-fbd7e98d.browser.esm-ef219347.js";
import { k as c, P as D } from "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const h = class h extends O {
  constructor(t, a, r) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      s = arguments.length > 4 ? arguments[4] : void 0,
      l = arguments.length > 5 ? arguments[5] : void 0,
      C =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new f(t, a, s, n, r);
    super(C, r, l);
    o(
      this,
      "createBatch",
      p(async (t, a) => this.erc721.lazyMint.prepare(t, a)),
    );
    o(
      this,
      "claimTo",
      p(async (t, a, r) => this.erc721.claimTo.prepare(t, a, r)),
    );
    o(
      this,
      "claim",
      p(async (t, a) => this.erc721.claim.prepare(t, a)),
    );
    o(
      this,
      "burn",
      p(async (t) => this.erc721.burn.prepare(t)),
    );
    (this.abi = T.parse(s || [])),
      (this.metadata = new y(this.contractWrapper, b, this.storage)),
      (this.app = new A(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new S(this.contractWrapper, h.contractRoles)),
      (this.royalties = new N(this.contractWrapper, this.metadata)),
      (this.sales = new E(this.contractWrapper)),
      (this.encoder = new R(this.contractWrapper)),
      (this.estimator = new k(this.contractWrapper)),
      (this.events = new U(this.contractWrapper)),
      (this.platformFees = new x(this.contractWrapper)),
      (this.interceptor = new M(this.contractWrapper)),
      (this.claimConditions = new I(
        this.contractWrapper,
        this.metadata,
        this.storage,
      )),
      (this.signature = new m(this.contractWrapper, this.storage)),
      (this.revealer = new F(this.contractWrapper, this.storage, v.name, () =>
        this.erc721.nextTokenIdToMint(),
      )),
      (this.signature = new m(this.contractWrapper, this.storage)),
      (this.owner = new L(this.contractWrapper)),
      (this.checkout = new z(this.contractWrapper));
  }
  onNetworkUpdated(t) {
    this.contractWrapper.updateSignerOrProvider(t);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async totalSupply() {
    const t = await this.totalClaimedSupply(),
      a = await this.totalUnclaimedSupply();
    return t.add(a);
  }
  async getAllClaimed(t) {
    const a = c.from((t == null ? void 0 : t.start) || 0).toNumber(),
      r = c.from((t == null ? void 0 : t.count) || d).toNumber(),
      n = Math.min((await this.totalClaimedSupply()).toNumber(), a + r);
    return await Promise.all(
      Array.from(Array(n).keys()).map((s) => this.get(s.toString())),
    );
  }
  async getAllUnclaimed(t) {
    const a = c.from((t == null ? void 0 : t.start) || 0).toNumber(),
      r = c.from((t == null ? void 0 : t.count) || d).toNumber(),
      n = c.from(Math.max((await this.totalClaimedSupply()).toNumber(), a)),
      s = c.from(
        Math.min(
          (
            await this.contractWrapper.readContract.nextTokenIdToMint()
          ).toNumber(),
          n.toNumber() + r,
        ),
      );
    return await Promise.all(
      Array.from(Array(s.sub(n).toNumber()).keys()).map((l) =>
        this.erc721.getTokenMetadata(n.add(l).toString()),
      ),
    );
  }
  async totalClaimedSupply() {
    return this.erc721.totalClaimedSupply();
  }
  async totalUnclaimedSupply() {
    return this.erc721.totalUnclaimedSupply();
  }
  async isTransferRestricted() {
    return !(await this.contractWrapper.readContract.hasRole(_("transfer"), D));
  }
  async getClaimTransaction(t, a, r) {
    return this.erc721.getClaimTransaction(t, a, r);
  }
  async prepare(t, a, r) {
    return B.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: a,
      overrides: r,
    });
  }
  async call(t, a, r) {
    return this.contractWrapper.call(t, a, r);
  }
};
o(h, "contractRoles", W);
let u = h;
export { u as SignatureDrop };
