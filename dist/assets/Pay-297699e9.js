import { j as e, r as c, i as d, b as p } from "./index-aff6404b.js";
import { H as l } from "./Helmet-bfad690c.js";
import { R as m, T as x, a as y, m as f } from "./index-c70ad044.js";
import "./index-35d0d874.js";
import "./constants-ed7a1b25.js";
import "./hoist-non-react-statics.cjs-434f601a.js";
const I = "_body_1172w_1",
  j = "_price_1172w_5",
  u = "_stock_1172w_6",
  b = "_payInfo_1172w_18",
  n = { body: I, price: j, stock: u, payInfo: b },
  h = ({ invoice: s }) =>
    e.jsx(m, {
      priceUSD: s.price,
      userId: s.user ? s.user.id : null,
      transInfoArg: { invoiceId: s.id },
      info: e.jsx(e.Fragment, {
        children: e.jsx("div", {
          className: `card ${n.payInfo}`,
          children: e.jsxs("div", {
            className: n.body,
            children: [
              e.jsx(x, { title: "Invoice", description: "Pay an invoice" }),
              e.jsxs("p", {
                className: n.price,
                children: [
                  e.jsx("span", { children: "Price:" }),
                  " ",
                  e.jsxs("span", { children: [s.price, " USD"] }),
                ],
              }),
            ],
          }),
        }),
      }),
    }),
  E = () => {
    const [s, t] = c.useState({}),
      o = d().payLink,
      r = new p();
    async function i() {
      const a = await r.getInvoice(o);
      a && t(a), console.log(a);
    }
    return (
      c.useEffect(() => {
        i();
      }, []),
      e.jsxs("div", {
        className: "container",
        children: [
          e.jsx(l, {
            children: e.jsx("title", { children: "Pay invoice | Nefentus" }),
          }),
          e.jsx(y, {
            activeChain: "ethereum",
            supportedWallets: [f()],
            clientId: "639eea2ebcabed7eab90b56aceeed08b",
            children: e.jsx(h, { invoice: s }),
          }),
        ],
      })
    );
  };
export { E as default };
