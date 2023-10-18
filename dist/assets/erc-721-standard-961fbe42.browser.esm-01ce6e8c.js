var o = Object.defineProperty;
var i = (e, r, t) =>
  r in e
    ? o(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (e[r] = t);
var a = (e, r, t) => (i(e, typeof r != "symbol" ? r + "" : r, t), t);
import { au as p, M as n, z as c, B as h } from "./index-c70ad044.js";
class y {
  constructor(r, t, s) {
    a(
      this,
      "transfer",
      c(async (r, t) => this.erc721.transfer.prepare(r, t)),
    );
    a(
      this,
      "setApprovalForAll",
      c(async (r, t) => this.erc721.setApprovalForAll.prepare(r, t)),
    );
    a(
      this,
      "setApprovalForToken",
      c(async (r, t) =>
        h.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "approve",
          args: [await n(r), t],
        }),
      ),
    );
    (this.contractWrapper = r),
      (this.storage = t),
      (this.erc721 = new p(this.contractWrapper, this.storage, s)),
      (this._chainId = s);
  }
  get chainId() {
    return this._chainId;
  }
  onNetworkUpdated(r) {
    this.contractWrapper.updateSignerOrProvider(r);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async getAll(r) {
    return this.erc721.getAll(r);
  }
  async getOwned(r) {
    return r && (r = await n(r)), this.erc721.getOwned(r);
  }
  async getOwnedTokenIds(r) {
    return r && (r = await n(r)), this.erc721.getOwnedTokenIds(r);
  }
  async totalSupply() {
    return this.erc721.totalCirculatingSupply();
  }
  async get(r) {
    return this.erc721.get(r);
  }
  async ownerOf(r) {
    return this.erc721.ownerOf(r);
  }
  async balanceOf(r) {
    return this.erc721.balanceOf(r);
  }
  async balance() {
    return this.erc721.balance();
  }
  async isApproved(r, t) {
    return this.erc721.isApproved(r, t);
  }
}
export { y as S };
