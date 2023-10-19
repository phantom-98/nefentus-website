var g = Object.defineProperty;
var l = (a, t, r) =>
  t in a
    ? g(a, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (a[t] = r);
var o = (a, t, r) => (l(a, typeof t != "symbol" ? t + "" : t, r), r);
import {
  ab as m,
  af as n,
  k as f,
  A as W,
  l as E,
  ac as C,
  n as A,
  o as w,
  t as R,
  G as I,
  s as T,
  u as L,
  v as O,
  B as S,
  ag as c,
  ah as F,
  ai as _,
  aj as U,
  ak as b,
  al as k,
  am as D,
} from "./index-0b7da92f.js";
import "./index-dd74b233.js";
import "./index-e5cf03ca.js";
import "./constants-ac5fb9cc.js";
import "./hoist-non-react-statics.cjs-41d71acf.js";
import "./Helmet-4c7ebf64.js";
const s = class s {
  get directListings() {
    return n(this.detectDirectListings(), b);
  }
  get englishAuctions() {
    return n(this.detectEnglishAuctions(), k);
  }
  get offers() {
    return n(this.detectOffers(), D);
  }
  get chainId() {
    return this._chainId;
  }
  constructor(t, r, e) {
    let h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      i = arguments.length > 4 ? arguments[4] : void 0,
      d = arguments.length > 5 ? arguments[5] : void 0,
      u =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new f(t, r, i, h, e);
    (this._chainId = d),
      (this.abi = W.parse(i || [])),
      (this.contractWrapper = u),
      (this.storage = e),
      (this.metadata = new E(this.contractWrapper, C, this.storage)),
      (this.app = new A(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new w(this.contractWrapper, s.contractRoles)),
      (this.encoder = new R(this.contractWrapper)),
      (this.estimator = new I(this.contractWrapper)),
      (this.events = new T(this.contractWrapper)),
      (this.platformFees = new L(this.contractWrapper)),
      (this.interceptor = new O(this.contractWrapper));
  }
  onNetworkUpdated(t) {
    this.contractWrapper.updateSignerOrProvider(t);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async prepare(t, r, e) {
    return S.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: r,
      overrides: e,
    });
  }
  async call(t, r, e) {
    return this.contractWrapper.call(t, r, e);
  }
  detectDirectListings() {
    if (c(this.contractWrapper, "DirectListings"))
      return new F(this.contractWrapper, this.storage);
  }
  detectEnglishAuctions() {
    if (c(this.contractWrapper, "EnglishAuctions"))
      return new _(this.contractWrapper, this.storage);
  }
  detectOffers() {
    if (c(this.contractWrapper, "Offers"))
      return new U(this.contractWrapper, this.storage);
  }
};
o(s, "contractRoles", m);
let p = s;
export { p as MarketplaceV3 };
