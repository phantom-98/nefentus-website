var d = Object.defineProperty;
var w = (s, e, t) =>
  e in s
    ? d(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (s[e] = t);
var n = (s, e, t) => (w(s, typeof e != "symbol" ? e + "" : e, t), t);
import {
  aN as C,
  k as W,
  A as f,
  l as y,
  aO as R,
  n as A,
  o as T,
  t as E,
  G as O,
  s as S,
  q as b,
  u as v,
  v as F,
  ax as V,
  M as p,
  y as B,
  z as c,
  B as l,
} from "./index-c70ad044.js";
import { S as D } from "./erc-20-standard-4ea47ba3.browser.esm-a05127e0.js";
import { P } from "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const o = class o extends D {
  constructor(t, a, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      h = arguments.length > 4 ? arguments[4] : void 0,
      m = arguments.length > 5 ? arguments[5] : void 0,
      g =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new W(t, a, h, i, r);
    super(g, r, m);
    n(
      this,
      "claim",
      c(
        (() => {
          var t = this;
          return async function (a) {
            let r =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : !0;
            return t.claimTo.prepare(
              await t.contractWrapper.getSignerAddress(),
              a,
              r,
            );
          };
        })(),
      ),
    );
    n(
      this,
      "claimTo",
      c(
        (() => {
          var t = this;
          return async function (a, r) {
            let i =
              arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : !0;
            return t.erc20.claimTo.prepare(a, r, { checkERC20Allowance: i });
          };
        })(),
      ),
    );
    n(
      this,
      "delegateTo",
      c(async (t) =>
        l.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "delegate",
          args: [await p(t)],
        }),
      ),
    );
    n(
      this,
      "burnTokens",
      c(async (t) => this.erc20.burn.prepare(t)),
    );
    n(
      this,
      "burnFrom",
      c(async (t, a) => this.erc20.burnFrom.prepare(t, a)),
    );
    (this.abi = f.parse(h || [])),
      (this.metadata = new y(this.contractWrapper, R, this.storage)),
      (this.app = new A(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new T(this.contractWrapper, o.contractRoles)),
      (this.encoder = new E(this.contractWrapper)),
      (this.estimator = new O(this.contractWrapper)),
      (this.events = new S(this.contractWrapper)),
      (this.sales = new b(this.contractWrapper)),
      (this.platformFees = new v(this.contractWrapper)),
      (this.interceptor = new F(this.contractWrapper)),
      (this.claimConditions = new V(
        this.contractWrapper,
        this.metadata,
        this.storage,
      ));
  }
  async getVoteBalance() {
    return await this.getVoteBalanceOf(
      await this.contractWrapper.getSignerAddress(),
    );
  }
  async getVoteBalanceOf(t) {
    return await this.erc20.getValue(
      await this.contractWrapper.readContract.getVotes(await p(t)),
    );
  }
  async getDelegation() {
    return await this.getDelegationOf(
      await this.contractWrapper.getSignerAddress(),
    );
  }
  async getDelegationOf(t) {
    return await this.contractWrapper.readContract.delegates(await p(t));
  }
  async isTransferRestricted() {
    return !(await this.contractWrapper.readContract.hasRole(B("transfer"), P));
  }
  async prepare(t, a, r) {
    return l.fromContractWrapper({
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
n(o, "contractRoles", C);
let u = o;
export { u as TokenDrop };
