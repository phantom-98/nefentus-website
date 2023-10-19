import { b as m, r as t, j as a, k as l } from "./index-dd74b233.js";
import { H as p } from "./Helmet-4c7ebf64.js";
import { R as u, T as _, a as g, m as x } from "./index-0b7da92f.js";
import "./index-e5cf03ca.js";
import "./constants-ac5fb9cc.js";
import "./hoist-non-react-statics.cjs-41d71acf.js";
const b = "_productWrapper_oaacb_1",
  f = "_productInfo_oaacb_15",
  j = "_productImage_oaacb_20",
  h = "_imageWrapper_oaacb_25",
  I = "_body_oaacb_34",
  k = "_image_oaacb_25",
  P = "_price_oaacb_44",
  y = "_stock_oaacb_45",
  s = {
    productWrapper: b,
    productInfo: f,
    productImage: j,
    imageWrapper: h,
    body: I,
    image: k,
    price: P,
    stock: y,
  },
  N = ({ product: e }) => {
    const r = new m(),
      [o, n] = t.useState(null);
    async function i() {
      if (e.s3Key) {
        console.log("Fetch image");
        const c = await r.getProductImage(e.link);
        c && n(c);
      }
    }
    return (
      t.useEffect(() => {
        e && i();
      }, [e]),
      a.jsx(u, {
        priceUSD: e.price,
        userId: e.user ? e.user.id : null,
        transInfoArg: { productId: e.id },
        disabled: e.stock === 0,
        info: a.jsxs("div", {
          className: s.productWrapper,
          children: [
            a.jsx("div", {
              className: `card ${s.productInfo}`,
              children: a.jsxs("div", {
                className: s.body,
                children: [
                  a.jsx(_, {
                    title: e.name ? e.name : "",
                    description: e.description,
                  }),
                  a.jsxs("p", {
                    className: s.price,
                    children: [
                      a.jsx("span", { children: "Price:" }),
                      " ",
                      a.jsxs("span", { children: [e.price, " USD"] }),
                    ],
                  }),
                  a.jsxs("p", {
                    className: s.stock,
                    children: [
                      a.jsx("span", { children: "Stock:" }),
                      " ",
                      a.jsx("span", {
                        children: e.stock >= 0 ? e.stock : "Unlimited",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            a.jsx("div", {
              className: `card ${s.productImage}`,
              children: a.jsx("div", {
                className: s.imageWrapper,
                children:
                  o &&
                  a.jsx("img", { src: o, alt: e.title, className: s.image }),
              }),
            }),
          ],
        }),
      })
    );
  },
  R = () => {
    const [e, r] = t.useState({}),
      n = l().productLink,
      i = new m();
    async function c() {
      const d = await i.getProduct(n);
      d && r(d), console.log(d);
    }
    return (
      t.useEffect(() => {
        c();
      }, []),
      a.jsxs("div", {
        className: "container",
        children: [
          a.jsx(p, {
            children: a.jsxs("title", {
              children: [e.name ? e.name : "", " | Nefentus"],
            }),
          }),
          a.jsx(g, {
            activeChain: "ethereum",
            supportedWallets: [x()],
            clientId: "639eea2ebcabed7eab90b56aceeed08b",
            children: a.jsx(N, { product: e }),
          }),
        ],
      })
    );
  };
export { R as default };
