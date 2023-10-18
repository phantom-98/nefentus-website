var L = Object.defineProperty;
var q = (y, s, t) =>
  s in y
    ? L(y, s, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (y[s] = t);
var l = (y, s, t) => (q(y, typeof s != "symbol" ? s + "" : s, t), t);
import {
  aA as x,
  af as U,
  k as R,
  A as F,
  l as $,
  aB as N,
  n as _,
  o as V,
  p as D,
  t as z,
  G as K,
  s as S,
  v as B,
  x as G,
  y as Q,
  a5 as v,
  a6 as C,
  z as w,
  S as Y,
  $ as T,
  B as f,
  ag as j,
  aC as I,
  aD as H,
  M as E,
  aE as J,
  aF as Z,
  ap as X,
  aG as tt,
  aH as g,
  aI as et,
  aJ as O,
  aK as at,
} from "./index-c70ad044.js";
import { S as rt } from "./erc-1155-standard-ab2417d3.browser.esm-7d3533bf.js";
import { z as k } from "./index-35d0d874.js";
import { h as nt } from "./hasERC20Allowance-2a342c3f.browser.esm-7c39a30d.js";
import { P as st, k as h } from "./index-aff6404b.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
const ot = [
    {
      inputs: [
        { internalType: "string", name: "name_", type: "string" },
        { internalType: "string", name: "symbol_", type: "string" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: !0,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: !1,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: "address", name: "from", type: "address" },
        { indexed: !0, internalType: "address", name: "to", type: "address" },
        {
          indexed: !1,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  W = k.object({ contractAddress: at }),
  ct = W.extend({ quantity: O }),
  dt = W.extend({ tokenId: g }),
  it = W.extend({ tokenId: g, quantity: g }),
  pt = ct.omit({ quantity: !0 }).extend({ quantityPerReward: O }),
  ut = dt,
  lt = it.omit({ quantity: !0 }).extend({ quantityPerReward: g }),
  mt = (() => pt.extend({ totalRewards: g.default("1") }))(),
  ht = ut,
  gt = (() => lt.extend({ totalRewards: g.default("1") }))(),
  M = (() =>
    k.object({
      erc20Rewards: k.array(mt).default([]),
      erc721Rewards: k.array(ht).default([]),
      erc1155Rewards: k.array(gt).default([]),
    }))(),
  yt = (() =>
    M.extend({
      packMetadata: tt,
      rewardsPerPack: g.default("1"),
      openStartTime: et.default(new Date()),
    }))();
class wt {
  constructor(s, t, r, n, e) {
    l(this, "featureName", I.name);
    l(
      this,
      "open",
      w(
        (() => {
          var s = this;
          return async function (t) {
            let r =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : 1,
              n =
                arguments.length > 2 && arguments[2] !== void 0
                  ? arguments[2]
                  : 5e5;
            return f.fromContractWrapper({
              contractWrapper: s.contractWrapper,
              method: "openPack",
              args: [t, r],
              overrides: { gasLimit: n },
              parse: (e) => {
                let o = h.from(0);
                try {
                  o = s.contractWrapper.parseLogs(
                    "PackOpenRequested",
                    e == null ? void 0 : e.logs,
                  )[0].args.requestId;
                } catch {}
                return { receipt: e, id: o };
              },
            });
          };
        })(),
      ),
    );
    l(
      this,
      "claimRewards",
      w(
        (() => {
          var s = this;
          return async function () {
            let t =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : 5e5;
            return f.fromContractWrapper({
              contractWrapper: s.contractWrapper,
              method: "claimRewards",
              args: [],
              overrides: { gasLimit: t },
              parse: async (r) => {
                const n = s.contractWrapper.parseLogs(
                  "PackOpened",
                  r == null ? void 0 : r.logs,
                );
                if (n.length === 0)
                  throw new Error("PackOpened event not found");
                const e = n[0].args.rewardUnitsDistributed;
                return await s.parseRewards(e);
              },
            });
          };
        })(),
      ),
    );
    let o =
      arguments.length > 5 && arguments[5] !== void 0
        ? arguments[5]
        : new R(s, t, H, n, r);
    (this.contractWrapper = o),
      (this.storage = r),
      (this.chainId = e),
      (this.events = new S(this.contractWrapper));
  }
  onNetworkUpdated(s) {
    this.contractWrapper.updateSignerOrProvider(s);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async parseRewards(s) {
    const t = [],
      r = [],
      n = [];
    for (const e of s)
      switch (e.tokenType) {
        case 0: {
          const o = await v(
            this.contractWrapper.getProvider(),
            e.assetContract,
          );
          t.push({
            contractAddress: e.assetContract,
            quantityPerReward: C(e.totalAmount, o.decimals).toString(),
          });
          break;
        }
        case 1: {
          r.push({
            contractAddress: e.assetContract,
            tokenId: e.tokenId.toString(),
          });
          break;
        }
        case 2: {
          n.push({
            contractAddress: e.assetContract,
            tokenId: e.tokenId.toString(),
            quantityPerReward: e.totalAmount.toString(),
          });
          break;
        }
      }
    return { erc20Rewards: t, erc721Rewards: r, erc1155Rewards: n };
  }
  async addPackOpenEventListener(s) {
    return this.events.addEventListener("PackOpened", async (t) => {
      s(
        t.data.packId.toString(),
        t.data.opener,
        await this.parseRewards(t.data.rewardUnitsDistributed),
      );
    });
  }
  async canClaimRewards(s) {
    const t = await E(s || (await this.contractWrapper.getSignerAddress()));
    return await this.contractWrapper.readContract.canClaimRewards(t);
  }
  async openAndClaim(s) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1,
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5e5;
    const n = await this.contractWrapper.sendTransaction(
      "openPackAndClaimRewards",
      [s, t, r],
      { gasLimit: h.from(5e5) },
    );
    let e = h.from(0);
    try {
      e = this.contractWrapper.parseLogs(
        "PackOpenRequested",
        n == null ? void 0 : n.logs,
      )[0].args.requestId;
    } catch {}
    return { receipt: n, id: e };
  }
  async getLinkBalance() {
    return this.getLinkContract().balanceOf(
      this.contractWrapper.readContract.address,
    );
  }
  async transferLink(s) {
    await this.getLinkContract().transfer(
      this.contractWrapper.readContract.address,
      s,
    );
  }
  getLinkContract() {
    const s = J[this.chainId];
    if (!s)
      throw new Error(
        `No LINK token address found for chainId ${this.chainId}`,
      );
    const t = new R(
      this.contractWrapper.getSignerOrProvider(),
      s,
      ot,
      this.contractWrapper.options,
      this.storage,
    );
    return new Z(t, this.storage, this.chainId);
  }
}
const A = class A extends rt {
  constructor(t, r, n) {
    let e = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      o = arguments.length > 4 ? arguments[4] : void 0,
      p = arguments.length > 5 ? arguments[5] : void 0,
      i =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new R(
              t,
              r,
              o,
              e.gasless && "openzeppelin" in e.gasless
                ? {
                    ...e,
                    gasless: {
                      ...e.gasless,
                      openzeppelin: {
                        ...e.gasless.openzeppelin,
                        useEOAForwarder: !0,
                      },
                    },
                  }
                : e,
              n,
            );
    super(i, n, p);
    l(
      this,
      "create",
      w(async (t) => {
        const r = await this.contractWrapper.getSignerAddress();
        return this.createTo.prepare(r, t);
      }),
    );
    l(
      this,
      "addPackContents",
      w(async (t, r) => {
        const n = await this.contractWrapper.getSignerAddress(),
          e = await M.parseAsync(r),
          { contents: o, numOfRewardUnits: p } =
            await this.toPackContentArgs(e);
        return f.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "addPackContents",
          args: [t, o, p, n],
          parse: (i) => {
            const c = this.contractWrapper.parseLogs(
              "PackUpdated",
              i == null ? void 0 : i.logs,
            );
            if (c.length === 0) throw new Error("PackUpdated event not found");
            const a = c[0].args.packId;
            return { id: a, receipt: i, data: () => this.erc1155.get(a) };
          },
        });
      }),
    );
    l(
      this,
      "createTo",
      w(async (t, r) => {
        const n = await X(r.packMetadata, this.storage),
          e = await yt.parseAsync(r),
          { erc20Rewards: o, erc721Rewards: p, erc1155Rewards: i } = e,
          c = { erc20Rewards: o, erc721Rewards: p, erc1155Rewards: i },
          { contents: a, numOfRewardUnits: u } =
            await this.toPackContentArgs(c);
        return f.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "createPack",
          args: [a, u, n, e.openStartTime, e.rewardsPerPack, await E(t)],
          parse: (d) => {
            const m = this.contractWrapper.parseLogs(
              "PackCreated",
              d == null ? void 0 : d.logs,
            );
            if (m.length === 0) throw new Error("PackCreated event not found");
            const b = m[0].args.packId;
            return { id: b, receipt: d, data: () => this.erc1155.get(b) };
          },
        });
      }),
    );
    l(
      this,
      "open",
      w(
        (() => {
          var t = this;
          return async function (r) {
            let n =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : 1,
              e =
                arguments.length > 2 && arguments[2] !== void 0
                  ? arguments[2]
                  : 5e5;
            if (t._vrf)
              throw new Error(
                "This contract is using Chainlink VRF, use `contract.vrf.open()` or `contract.vrf.openAndClaim()` instead",
              );
            return f.fromContractWrapper({
              contractWrapper: t.contractWrapper,
              method: "openPack",
              args: [r, n],
              overrides: { gasLimit: e },
              parse: async (o) => {
                const p = t.contractWrapper.parseLogs(
                  "PackOpened",
                  o == null ? void 0 : o.logs,
                );
                if (p.length === 0)
                  throw new Error("PackOpened event not found");
                const i = p[0].args.rewardUnitsDistributed,
                  c = [],
                  a = [],
                  u = [];
                for (const d of i)
                  switch (d.tokenType) {
                    case 0: {
                      const m = await v(
                        t.contractWrapper.getProvider(),
                        d.assetContract,
                      );
                      c.push({
                        contractAddress: d.assetContract,
                        quantityPerReward: C(
                          d.totalAmount,
                          m.decimals,
                        ).toString(),
                      });
                      break;
                    }
                    case 1: {
                      a.push({
                        contractAddress: d.assetContract,
                        tokenId: d.tokenId.toString(),
                      });
                      break;
                    }
                    case 2: {
                      u.push({
                        contractAddress: d.assetContract,
                        tokenId: d.tokenId.toString(),
                        quantityPerReward: d.totalAmount.toString(),
                      });
                      break;
                    }
                  }
                return { erc20Rewards: c, erc721Rewards: a, erc1155Rewards: u };
              },
            });
          };
        })(),
      ),
    );
    (this.abi = F.parse(o || [])),
      (this.metadata = new $(this.contractWrapper, N, this.storage)),
      (this.app = new _(this.contractWrapper, this.metadata, this.storage)),
      (this.roles = new V(this.contractWrapper, A.contractRoles)),
      (this.royalties = new D(this.contractWrapper, this.metadata)),
      (this.encoder = new z(this.contractWrapper)),
      (this.estimator = new K(this.contractWrapper)),
      (this.events = new S(this.contractWrapper)),
      (this.interceptor = new B(this.contractWrapper)),
      (this.owner = new G(this.contractWrapper)),
      (this._vrf = this.detectVrf());
  }
  get vrf() {
    return U(this._vrf, I);
  }
  onNetworkUpdated(t) {
    var r;
    this.contractWrapper.updateSignerOrProvider(t),
      (r = this._vrf) == null || r.onNetworkUpdated(t);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async get(t) {
    return this.erc1155.get(t);
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
    return !(await this.contractWrapper.readContract.hasRole(
      Q("transfer"),
      st,
    ));
  }
  async getPackContents(t) {
    const { contents: r, perUnitAmounts: n } =
        await this.contractWrapper.readContract.getPackContents(t),
      e = [],
      o = [],
      p = [];
    for (let i = 0; i < r.length; i++) {
      const c = r[i],
        a = n[i];
      switch (c.tokenType) {
        case 0: {
          const u = await v(
              this.contractWrapper.getProvider(),
              c.assetContract,
            ),
            d = C(a, u.decimals),
            m = C(h.from(c.totalAmount).div(a), u.decimals);
          e.push({
            contractAddress: c.assetContract,
            quantityPerReward: d,
            totalRewards: m,
          });
          break;
        }
        case 1: {
          o.push({
            contractAddress: c.assetContract,
            tokenId: c.tokenId.toString(),
          });
          break;
        }
        case 2: {
          p.push({
            contractAddress: c.assetContract,
            tokenId: c.tokenId.toString(),
            quantityPerReward: a.toString(),
            totalRewards: h.from(c.totalAmount).div(a).toString(),
          });
          break;
        }
      }
    }
    return { erc20Rewards: e, erc721Rewards: o, erc1155Rewards: p };
  }
  async toPackContentArgs(t) {
    const r = [],
      n = [],
      { erc20Rewards: e, erc721Rewards: o, erc1155Rewards: p } = t,
      i = this.contractWrapper.getProvider(),
      c = await this.contractWrapper.getSignerAddress();
    for (const a of e) {
      const d = (await Y(i, a.quantityPerReward, a.contractAddress)).mul(
        a.totalRewards,
      );
      if (!(await nt(this.contractWrapper, a.contractAddress, d)))
        throw new Error(`ERC20 token with contract address "${
          a.contractAddress
        }" does not have enough allowance to transfer.

You can set allowance to the multiwrap contract to transfer these tokens by running:

await sdk.getToken("${
          a.contractAddress
        }").setAllowance("${this.getAddress()}", ${d});

`);
      n.push(a.totalRewards),
        r.push({
          assetContract: a.contractAddress,
          tokenType: 0,
          totalAmount: d,
          tokenId: 0,
        });
    }
    for (const a of o) {
      if (
        !(await T(
          this.contractWrapper.getProvider(),
          this.getAddress(),
          a.contractAddress,
          a.tokenId,
          c,
        ))
      )
        throw new Error(`ERC721 token "${a.tokenId}" with contract address "${
          a.contractAddress
        }" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getNFTCollection("${
          a.contractAddress
        }").setApprovalForToken("${this.getAddress()}", ${a.tokenId});

`);
      n.push("1"),
        r.push({
          assetContract: a.contractAddress,
          tokenType: 1,
          totalAmount: 1,
          tokenId: a.tokenId,
        });
    }
    for (const a of p) {
      if (
        !(await T(
          this.contractWrapper.getProvider(),
          this.getAddress(),
          a.contractAddress,
          a.tokenId,
          c,
        ))
      )
        throw new Error(`ERC1155 token "${a.tokenId}" with contract address "${
          a.contractAddress
        }" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getEdition("${
          a.contractAddress
        }").setApprovalForAll("${this.getAddress()}", true);

`);
      n.push(a.totalRewards),
        r.push({
          assetContract: a.contractAddress,
          tokenType: 2,
          totalAmount: h.from(a.quantityPerReward).mul(h.from(a.totalRewards)),
          tokenId: a.tokenId,
        });
    }
    return { contents: r, numOfRewardUnits: n };
  }
  async prepare(t, r, n) {
    return f.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: r,
      overrides: n,
    });
  }
  async call(t, r, n) {
    return this.contractWrapper.call(t, r, n);
  }
  detectVrf() {
    if (j(this.contractWrapper, "PackVRF"))
      return new wt(
        this.contractWrapper.getSignerOrProvider(),
        this.contractWrapper.readContract.address,
        this.storage,
        this.contractWrapper.options,
        this.chainId,
      );
  }
};
l(A, "contractRoles", x);
let P = A;
export { P as Pack };
