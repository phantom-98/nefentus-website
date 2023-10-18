import { E as u, i as d, b as n } from "./index-c70ad044.js";
class l extends u {
  constructor(r) {
    let { chains: e = d, options: s } = r;
    super(), (this.chains = e), (this.options = s);
  }
  getBlockExplorerUrls(r) {
    var s;
    const e = ((s = r.explorers) == null ? void 0 : s.map((t) => t.url)) ?? [];
    return e.length > 0 ? e : void 0;
  }
  isChainUnsupported(r) {
    return !this.chains.some((e) => e.chainId === r);
  }
  updateChains(r) {
    this.chains = r;
  }
}
class c extends Error {
  constructor(r, e) {
    const { cause: s, code: t, data: a } = e;
    if (!Number.isInteger(t)) throw new Error('"code" must be an integer.');
    if (!r || typeof r != "string")
      throw new Error('"message" must be a nonempty string.');
    super(`${r}. Cause: ${JSON.stringify(s)}`),
      (this.cause = s),
      (this.code = t),
      (this.data = a);
  }
}
class i extends c {
  constructor(r, e) {
    const { cause: s, code: t, data: a } = e;
    if (!(Number.isInteger(t) && t >= 1e3 && t <= 4999))
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999',
      );
    super(r, { cause: s, code: t, data: a });
  }
}
class p extends Error {
  constructor() {
    super(...arguments),
      n(this, "name", "AddChainError"),
      n(this, "message", "Error adding chain");
  }
}
class E extends Error {
  constructor(r) {
    let { chainId: e, connectorId: s } = r;
    super(`Chain "${e}" not configured for connector "${s}".`),
      n(this, "name", "ChainNotConfigured");
  }
}
class m extends Error {
  constructor() {
    super(...arguments),
      n(this, "name", "ConnectorNotFoundError"),
      n(this, "message", "Connector not found");
  }
}
class g extends c {
  constructor(r) {
    super("Resource unavailable", { cause: r, code: -32002 }),
      n(this, "name", "ResourceUnavailable");
  }
}
class C extends i {
  constructor(r) {
    super("Error switching chain", { cause: r, code: 4902 }),
      n(this, "name", "SwitchChainError");
  }
}
class f extends i {
  constructor(r) {
    super("User rejected request", { cause: r, code: 4001 }),
      n(this, "name", "UserRejectedRequestError");
  }
}
export { p as A, m as C, g as R, C as S, f as U, l as W, E as a };
