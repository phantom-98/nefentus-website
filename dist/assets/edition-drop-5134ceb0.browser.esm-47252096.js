var m = Object.defineProperty;
var d = (s, a, t) =>
  a in s
    ? m(s, a, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (s[a] = t);
var o = (s, a, t) => (d(s, typeof a != "symbol" ? a + "" : a, t), t);
import {
  N as g,
  k as C,
  A as w,
  l as f,
  D as y,
  n as W,
  o as A,
  p as T,
  q as R,
  r as k,
  s as E,
  t as v,
  G as S,
  u as b,
  v as N,
  x as O,
  y as P,
  z as i,
  B,
} from "./index-c70ad044.js";
import { k as I, P as F } from "./index-aff6404b.js";
import { S as x } from "./erc-1155-standard-ab2417d3.browser.esm-7d3533bf.js";
import { P as _ } from "./thirdweb-checkout-fbd7e98d.browser.esm-ef219347.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
class q {
  constructor(a) {
    this.events = a;
  }
  async getAllClaimerAddresses(a) {
    const t = (await this.events.getEvents("TokensClaimed")).filter((r) =>
      r.data && I.isBigNumber(r.data.tokenId) ? r.data.tokenId.eq(a) : !1,
    );
    return Array.from(
      new Set(
        t
          .filter((r) => {
            var e;
            return (
              typeof ((e = r.data) == null ? void 0 : e.claimer) == "string"
            );
          })
          .map((r) => r.data.claimer),
      ),
    );
  }
}
const p = class p extends x {
  constructor(t, r, e) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      c = arguments.length > 4 ? arguments[4] : void 0,
      l = arguments.length > 5 ? arguments[5] : void 0,
      u =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new C(t, r, c, n, e);
    super(u, e, l);
    o(
      this,
      "createBatch",
      i(async (t, r) => this.erc1155.lazyMint.prepare(t, r)),
    );
    o(
      this,
      "claimTo",
      i(
        (() => {
          var t = this;
          return async function (r, e, n) {
            let c =
              arguments.length > 3 && arguments[3] !== void 0
                ? arguments[3]
                : !0;
            return t.erc1155.claimTo.prepare(r, e, n, {
              checkERC20Allowance: c,
            });
          };
        })(),
      ),
    );
    o(
      this,
      "claim",
      i(
        (() => {
          var t = this;
          return async function (r, e) {
            let n =
              arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : !0;
            const c = await t.contractWrapper.getSignerAddress();
            return t.claimTo.prepare(c, r, e, n);
          };
        })(),
      ),
    );
    o(
      this,
      "burnTokens",
      i(async (t, r) => this.erc1155.burn.prepare(t, r)),
    );
    (this.abi = w.parse(c)),
      (this.metadata = new f(this.contractWrapper, y, this.storage)),
      (this.app = new W(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new A(this.contractWrapper, p.contractRoles)),
      (this.royalties = new T(this.contractWrapper, this.metadata)),
      (this.sales = new R(this.contractWrapper)),
      (this.claimConditions = new k(
        this.contractWrapper,
        this.metadata,
        this.storage,
      )),
      (this.events = new E(this.contractWrapper)),
      (this.history = new q(this.events)),
      (this.encoder = new v(this.contractWrapper)),
      (this.estimator = new S(this.contractWrapper)),
      (this.platformFees = new b(this.contractWrapper)),
      (this.interceptor = new N(this.contractWrapper)),
      (this.checkout = new _(this.contractWrapper)),
      (this.owner = new O(this.contractWrapper));
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
    return !(await this.contractWrapper.readContract.hasRole(P("transfer"), F));
  }
  async getClaimTransaction(t, r, e) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0;
    return this.erc1155.getClaimTransaction(t, r, e, {
      checkERC20Allowance: n,
    });
  }
  async prepare(t, r, e) {
    return B.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: r,
      overrides: e,
    });
  }
  async call(t, r, e) {
    return this.contractWrapper.call(t, r, e);
  }
};
o(p, "contractRoles", g);
let h = p;
export { h as EditionDrop };
