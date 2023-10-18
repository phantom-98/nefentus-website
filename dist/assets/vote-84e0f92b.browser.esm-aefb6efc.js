var g = Object.defineProperty;
var m = (s, t, a) =>
  t in s
    ? g(s, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
    : (s[t] = a);
var i = (s, t, a) => (m(s, typeof t != "symbol" ? t + "" : t, a), a);
import {
  k as W,
  A as v,
  l as w,
  aR as C,
  n as f,
  t as A,
  G as y,
  s as b,
  v as k,
  M as h,
  aS as u,
  a6 as P,
  j as x,
  av as V,
  Y as E,
  a5 as S,
  z as d,
  B as p,
} from "./index-c70ad044.js";
import { k as T } from "./index-aff6404b.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
import "./Helmet-bfad690c.js";
let l = (function (s) {
  return (
    (s[(s.Against = 0)] = "Against"),
    (s[(s.For = 1)] = "For"),
    (s[(s.Abstain = 2)] = "Abstain"),
    s
  );
})({});
class O {
  constructor(t, a, r) {
    i(
      this,
      "propose",
      d(async (t, a) => {
        a ||
          (a = [
            {
              toAddress: this.contractWrapper.readContract.address,
              nativeTokenValue: 0,
              transactionData: "0x",
            },
          ]);
        const r = a.map((e) => e.toAddress),
          o = a.map((e) => e.nativeTokenValue),
          c = a.map((e) => e.transactionData);
        return p.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "propose",
          args: [r, o, c, t],
          parse: (e) => ({
            id: this.contractWrapper.parseLogs(
              "ProposalCreated",
              e == null ? void 0 : e.logs,
            )[0].args.proposalId,
            receipt: e,
          }),
        });
      }),
    );
    i(
      this,
      "vote",
      d(
        (() => {
          var t = this;
          return async function (a, r) {
            let o =
              arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : "";
            return (
              await t.ensureExists(a),
              p.fromContractWrapper({
                contractWrapper: t.contractWrapper,
                method: "castVoteWithReason",
                args: [a, r, o],
              })
            );
          };
        })(),
      ),
    );
    i(
      this,
      "execute",
      d(async (t) => {
        await this.ensureExists(t);
        const a = await this.get(t),
          r = a.executions.map((n) => n.toAddress),
          o = a.executions.map((n) => n.nativeTokenValue),
          c = a.executions.map((n) => n.transactionData),
          e = u(a.description);
        return p.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "execute",
          args: [r, o, c, e],
        });
      }),
    );
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
      c = arguments.length > 4 ? arguments[4] : void 0,
      e = arguments.length > 5 ? arguments[5] : void 0,
      n =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : new W(t, a, c, o, r);
    (this._chainId = e),
      (this.abi = v.parse(c || [])),
      (this.contractWrapper = n),
      (this.storage = r),
      (this.metadata = new w(this.contractWrapper, C, this.storage)),
      (this.app = new f(this.contractWrapper, this.metadata, this.storage)),
      (this.encoder = new A(this.contractWrapper)),
      (this.estimator = new y(this.contractWrapper)),
      (this.events = new b(this.contractWrapper)),
      (this.interceptor = new k(this.contractWrapper));
  }
  get chainId() {
    return this._chainId;
  }
  onNetworkUpdated(t) {
    this.contractWrapper.updateSignerOrProvider(t);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async get(t) {
    const r = (await this.getAll()).filter((o) => o.proposalId.eq(T.from(t)));
    if (r.length === 0) throw new Error("proposal not found");
    return r[0];
  }
  async getAll() {
    return Promise.all(
      (await this.contractWrapper.readContract.getAllProposals()).map(
        async (t) => ({
          proposalId: t.proposalId,
          proposer: t.proposer,
          description: t.description,
          startBlock: t.startBlock,
          endBlock: t.endBlock,
          state: await this.contractWrapper.readContract.state(t.proposalId),
          votes: await this.getProposalVotes(t.proposalId),
          executions: t[3].map((a, r) => ({
            toAddress: t.targets[r],
            nativeTokenValue: a,
            transactionData: t.calldatas[r],
          })),
        }),
      ),
    );
  }
  async getProposalVotes(t) {
    const a = await this.contractWrapper.readContract.proposalVotes(t);
    return [
      { type: l.Against, label: "Against", count: a.againstVotes },
      { type: l.For, label: "For", count: a.forVotes },
      { type: l.Abstain, label: "Abstain", count: a.abstainVotes },
    ];
  }
  async hasVoted(t, a) {
    return (
      a || (a = await this.contractWrapper.getSignerAddress()),
      this.contractWrapper.readContract.hasVoted(t, await h(a))
    );
  }
  async canExecute(t) {
    await this.ensureExists(t);
    const a = await this.get(t),
      r = a.executions.map((n) => n.toAddress),
      o = a.executions.map((n) => n.nativeTokenValue),
      c = a.executions.map((n) => n.transactionData),
      e = u(a.description);
    try {
      return await this.contractWrapper.callStatic().execute(r, o, c, e), !0;
    } catch {
      return !1;
    }
  }
  async balance() {
    const t = await this.contractWrapper.readContract.provider.getBalance(
      this.contractWrapper.readContract.address,
    );
    return {
      name: "",
      symbol: "",
      decimals: 18,
      value: t,
      displayValue: P(t, 18),
    };
  }
  async balanceOfToken(t) {
    const a = new x(await h(t), V, this.contractWrapper.getProvider());
    return await E(
      this.contractWrapper.getProvider(),
      t,
      await a.balanceOf(this.contractWrapper.readContract.address),
    );
  }
  async ensureExists(t) {
    try {
      await this.contractWrapper.readContract.state(t);
    } catch {
      throw Error(`Proposal ${t} not found`);
    }
  }
  async settings() {
    const [t, a, r, o, c] = await Promise.all([
        this.contractWrapper.readContract.votingDelay(),
        this.contractWrapper.readContract.votingPeriod(),
        this.contractWrapper.readContract.token(),
        this.contractWrapper.readContract["quorumNumerator()"](),
        this.contractWrapper.readContract.proposalThreshold(),
      ]),
      e = await S(this.contractWrapper.getProvider(), r);
    return {
      votingDelay: t.toString(),
      votingPeriod: a.toString(),
      votingTokenAddress: r,
      votingTokenMetadata: e,
      votingQuorumFraction: o.toString(),
      proposalTokenThreshold: c.toString(),
    };
  }
  async prepare(t, a, r) {
    return p.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method: t,
      args: a,
      overrides: r,
    });
  }
  async call(t, a, r) {
    return this.contractWrapper.call(t, a, r);
  }
}
export { O as Vote };
