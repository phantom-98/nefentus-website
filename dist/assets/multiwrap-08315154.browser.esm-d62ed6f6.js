var A = Object.defineProperty;
var f = (i, c, r) =>
  c in i
    ? A(i, c, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (i[c] = r);
var p = (i, c, r) => (f(i, typeof c != "symbol" ? c + "" : c, r), r);
import {
  an as W,
  k as C,
  A as T,
  l as v,
  ao as y,
  n as I,
  o as E,
  t as $,
  G as R,
  s as S,
  p as b,
  x as P,
  a5 as q,
  a6 as F,
  z as k,
  S as L,
  $ as w,
  B as h,
  ap as O,
  M as g,
} from "./index-c70ad044.js";
import { S as x } from "./erc-721-standard-961fbe42.browser.esm-01ce6e8c.js";
import { h as M } from "./hasERC20Allowance-2a342c3f.browser.esm-7c39a30d.js";
import "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const d = class d extends x {
  constructor(r, e, n) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      t = arguments.length > 4 ? arguments[4] : void 0,
      a = arguments.length > 5 ? arguments[5] : void 0,
      s =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new C(r, e, t, o, n);
    super(s, n, a);
    p(
      this,
      "wrap",
      k(async (r, e, n) => {
        const o = await O(e, this.storage),
          t = await g(n || (await this.contractWrapper.getSignerAddress())),
          a = await this.toTokenStructList(r);
        return h.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "wrap",
          args: [a, o, t],
          parse: (s) => {
            const u = this.contractWrapper.parseLogs(
              "TokensWrapped",
              s == null ? void 0 : s.logs,
            );
            if (u.length === 0)
              throw new Error("TokensWrapped event not found");
            const l = u[0].args.tokenIdOfWrappedToken;
            return { id: l, receipt: s, data: () => this.get(l) };
          },
        });
      }),
    );
    p(
      this,
      "unwrap",
      k(async (r, e) => {
        const n = await g(e || (await this.contractWrapper.getSignerAddress()));
        return h.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "unwrap",
          args: [r, n],
        });
      }),
    );
    (this.abi = T.parse(t || [])),
      (this.metadata = new v(this.contractWrapper, y, this.storage)),
      (this.app = new I(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new E(this.contractWrapper, d.contractRoles)),
      (this.encoder = new $(this.contractWrapper)),
      (this.estimator = new R(this.contractWrapper)),
      (this.events = new S(this.contractWrapper)),
      (this.royalties = new b(this.contractWrapper, this.metadata)),
      (this.owner = new P(this.contractWrapper));
  }
  async getWrappedContents(r) {
    const e = await this.contractWrapper.readContract.getWrappedContents(r),
      n = [],
      o = [],
      t = [];
    for (const a of e)
      switch (a.tokenType) {
        case 0: {
          const s = await q(
            this.contractWrapper.getProvider(),
            a.assetContract,
          );
          n.push({
            contractAddress: a.assetContract,
            quantity: F(a.totalAmount, s.decimals),
          });
          break;
        }
        case 1: {
          o.push({ contractAddress: a.assetContract, tokenId: a.tokenId });
          break;
        }
        case 2: {
          t.push({
            contractAddress: a.assetContract,
            tokenId: a.tokenId,
            quantity: a.totalAmount.toString(),
          });
          break;
        }
      }
    return { erc20Tokens: n, erc721Tokens: o, erc1155Tokens: t };
  }
  async toTokenStructList(r) {
    const e = [],
      n = this.contractWrapper.getProvider(),
      o = await this.contractWrapper.getSignerAddress();
    if (r.erc20Tokens)
      for (const t of r.erc20Tokens) {
        const a = await L(n, t.quantity, t.contractAddress);
        if (!(await M(this.contractWrapper, t.contractAddress, a)))
          throw new Error(`ERC20 token with contract address "${
            t.contractAddress
          }" does not have enough allowance to transfer.

You can set allowance to the multiwrap contract to transfer these tokens by running:

await sdk.getToken("${
            t.contractAddress
          }").setAllowance("${this.getAddress()}", ${t.quantity});

`);
        e.push({
          assetContract: t.contractAddress,
          totalAmount: a,
          tokenId: 0,
          tokenType: 0,
        });
      }
    if (r.erc721Tokens)
      for (const t of r.erc721Tokens) {
        if (
          !(await w(
            this.contractWrapper.getProvider(),
            this.getAddress(),
            t.contractAddress,
            t.tokenId,
            o,
          ))
        )
          throw new Error(`ERC721 token "${t.tokenId}" with contract address "${
            t.contractAddress
          }" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getNFTCollection("${
            t.contractAddress
          }").setApprovalForToken("${this.getAddress()}", ${t.tokenId});

`);
        e.push({
          assetContract: t.contractAddress,
          totalAmount: 0,
          tokenId: t.tokenId,
          tokenType: 1,
        });
      }
    if (r.erc1155Tokens)
      for (const t of r.erc1155Tokens) {
        if (
          !(await w(
            this.contractWrapper.getProvider(),
            this.getAddress(),
            t.contractAddress,
            t.tokenId,
            o,
          ))
        )
          throw new Error(`ERC1155 token "${
            t.tokenId
          }" with contract address "${
            t.contractAddress
          }" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getEdition("${
            t.contractAddress
          }").setApprovalForAll("${this.getAddress()}", true);

`);
        e.push({
          assetContract: t.contractAddress,
          totalAmount: t.quantity,
          tokenId: t.tokenId,
          tokenType: 2,
        });
      }
    return e;
  }
  async prepare(r, e, n) {
    return h.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: r,
      args: e,
      overrides: n,
    });
  }
  async call(r, e, n) {
    return this.contractWrapper.call(r, e, n);
  }
};
p(d, "contractRoles", W);
let m = d;
export { m as Multiwrap };
