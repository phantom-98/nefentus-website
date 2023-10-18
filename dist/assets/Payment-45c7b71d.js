import { u as p, j as s, B as j, r as y } from "./index-aff6404b.js";
import { H as u, s as _, C as w, L as N } from "./separate-81f85f03.js";
import { W as $ } from "./why-e495bfb9.js";
import { s as o } from "./paymentCards.module-17b8ff80.js";
import { C as v } from "./whiteCheckmark-8b4305a9.js";
import { H as k } from "./Helmet-bfad690c.js";
const C = () => {
    const { t } = p(),
      e = t("payment.paymentCard1", { returnObjects: !0 }),
      i = t("payment.paymentCard2", { returnObjects: !0 });
    return s.jsx("div", {
      className: o.sectionWrapper,
      children: s.jsxs("div", {
        className: "container scroll ",
        children: [
          s.jsx(u, {
            noScroll: !0,
            title: s.jsx(s.Fragment, {
              children: _(t("payment.paymentTitle")),
            }),
            subtitle: t("payment.paymentSubtitle"),
          }),
          s.jsxs("div", {
            className: o.body,
            children: [
              s.jsxs("div", {
                className: `${o.lightCard} card ${o.card}`,
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsxs("div", {
                        className: o.top,
                        children: [
                          s.jsx("h5", {
                            children: t("payment.paymentCard1Title"),
                          }),
                          s.jsx("p", {
                            children: t("payment.paymentCard1Description"),
                          }),
                        ],
                      }),
                      s.jsx("div", {
                        className: o.list,
                        children: e.map((n, c) =>
                          s.jsxs(
                            "div",
                            {
                              children: [
                                s.jsx("img", { src: v, alt: "checkmark" }),
                                s.jsx("p", { children: n }),
                              ],
                            },
                            c,
                          ),
                        ),
                      }),
                    ],
                  }),
                  s.jsx(j, {
                    link: "/signup",
                    color: "white",
                    children: t("payment.paymentButton"),
                  }),
                ],
              }),
              s.jsxs("div", {
                className: `${o.boldCard} card ${o.card}`,
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsxs("div", {
                        className: o.top,
                        children: [
                          s.jsx("h5", {
                            children: t("payment.paymentCard2Title"),
                          }),
                          s.jsx("p", {
                            children: t("payment.paymentCard2Description"),
                          }),
                        ],
                      }),
                      s.jsx("div", {
                        className: o.list,
                        children: i.map((n, c) =>
                          s.jsxs(
                            "div",
                            {
                              children: [
                                s.jsx("img", { src: v, alt: "checkmark" }),
                                s.jsx("p", { children: n }),
                              ],
                            },
                            c,
                          ),
                        ),
                      }),
                    ],
                  }),
                  s.jsx(j, {
                    link: "/signup",
                    children: t("payment.paymentButton"),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  f = "/assets/grow4-4c40538d.svg",
  L = "/assets/grow5-d9169e89.svg",
  P = "/assets/grow3-30802574.svg",
  I = "_wrapper_1xtmz_1",
  H = "_icon_1xtmz_30",
  T = "_number_1xtmz_35",
  B = "_title_1xtmz_49",
  z = "_description_1xtmz_55",
  E = "_image_1xtmz_64",
  S = "_button_1xtmz_75",
  a = {
    wrapper: I,
    icon: H,
    number: T,
    title: B,
    description: z,
    image: E,
    button: S,
  },
  g = ({
    title: t,
    description1: e,
    description2: i,
    image: n,
    num: c,
    button: r,
  }) =>
    s.jsx("div", {
      className: `${a.card} scroll `,
      children: s.jsxs("div", {
        className: `${a.wrapper} card`,
        children: [
          s.jsx("div", { className: a.title, children: t }),
          s.jsxs("div", {
            className: a.description,
            children: [
              e,
              s.jsx("div", { style: { marginTop: 10 }, children: i }),
            ],
          }),
          s.jsx("div", {
            className: a.button,
            children: s.jsx(j, {
              link: "/",
              color: "white",
              children: s.jsx("p", { children: r }),
            }),
          }),
          s.jsx("div", {
            className: a.image,
            children: s.jsx("img", { src: n, alt: "grow graphics" }),
          }),
        ],
      }),
    }),
  W = "_body_18xtk_1",
  D = "_left_18xtk_7",
  F = "_right_18xtk_13",
  O = "_section_18xtk_17",
  m = { body: W, left: D, right: F, section: O },
  x = [{ image: f }, { image: L }, { image: P }],
  R = () => {
    const { t } = p(),
      e = t("payment.growContent", { returnObjects: !0 });
    return s.jsxs("div", {
      className: " container break",
      children: [
        s.jsx("div", {
          className: `${m.section}`,
          children: s.jsx(u, {
            subtitle: t("payment.growSubtitle"),
            title: s.jsxs(s.Fragment, {
              children: [
                _(t("payment.growTitle")),
                s.jsx("br", {}),
                t("payment.growTitle2"),
              ],
            }),
          }),
        }),
        s.jsxs("div", {
          className: m.body,
          children: [
            s.jsxs("div", {
              className: m.left,
              children: [
                s.jsx(g, {
                  num: 1,
                  title: e[0].title,
                  description1: e[0].descriptionP1,
                  description2: e[0].descriptionP2,
                  image: x[0].image,
                  button: e[0].button,
                }),
                s.jsx(g, {
                  num: window.innerWidth > 900 ? 3 : 2,
                  title: e[2].title,
                  description1: e[2].descriptionP1,
                  description2: e[2].descriptionP2,
                  image: x[2].image,
                  button: e[2].button,
                }),
              ],
            }),
            s.jsx("div", {
              className: m.right,
              children: s.jsx(g, {
                num: window.innerWidth > 900 ? 2 : 3,
                title: e[1].title,
                description1: e[1].descriptionP1,
                description2: e[1].descriptionP2,
                image: x[1].image,
                button: e[1].button,
              }),
            }),
          ],
        }),
      ],
    });
  },
  G = "_section_aox6v_1",
  V = "_description_aox6v_5",
  q = "_logos_aox6v_15",
  h = { section: G, description: V, logos: q },
  A = ({ subtitle: t, title: e, description: i, list: n }) => {
    const c = y.useRef(null);
    return (
      y.useEffect(() => {
        const r = (d) => {
          const b = window.innerHeight * 0.2;
          window.innerHeight - c.current.getBoundingClientRect().top > b &&
            c.current.classList.add("cryptoIconShow");
        };
        return (
          window.addEventListener("scroll", r),
          () => window.removeEventListener("scroll", r)
        );
      }, []),
      s.jsxs("div", {
        className: `container break ${h.section}`,
        children: [
          s.jsxs("div", {
            className: "scroll",
            children: [
              s.jsx(u, { noScroll: !0, subtitle: t, title: e }),
              s.jsx("p", { className: `${h.description}`, children: i }),
            ],
          }),
          s.jsx("div", {
            className: `${h.logos}`,
            ref: c,
            children: n.map((r, d) =>
              s.jsx(
                "div",
                { children: s.jsx("img", { src: r, alt: "partner logo" }) },
                d,
              ),
            ),
          }),
        ],
      })
    );
  },
  J = "_section_1b8k0_1",
  K = "_wrapper_1b8k0_22",
  M = "_top_1b8k0_53",
  Q = "_description_1b8k0_69",
  U = "_list_1b8k0_76",
  l = { section: J, wrapper: K, top: M, description: Q, list: U },
  X = "/assets/commision-2cbfd3b9.svg",
  Y = "/assets/analytics-c4d38282.svg",
  Z = "/assets/automatons-87e6c62b.svg",
  ss = "/assets/products-800e8b52.svg",
  ts = [{ icon: X }, { icon: Y }, { icon: Z }, { icon: ss }],
  es = () => {
    const { t } = p(),
      e = t("payment.dataContent", { returnObjects: !0 });
    return s.jsx("div", {
      className: `container break ${l.section}`,
      children: e.map((i, n) =>
        s.jsx(
          ns,
          {
            side: n % 2 ? "slide-left" : "slide-right",
            image: ts[n].icon,
            title: i.title,
            list: i.list,
            description: i.description,
          },
          n,
        ),
      ),
    });
  },
  ns = ({ image: t, title: e, description: i, list: n, side: c }) =>
    s.jsx("div", {
      className: `${l.card} ${c}`,
      children: s.jsxs("div", {
        className: `${l.wrapper} card`,
        children: [
          s.jsxs("div", {
            className: l.top,
            children: [
              s.jsx("img", { src: t, alt: "data symbol icon" }),
              s.jsx("h4", { children: e }),
            ],
          }),
          s.jsx("p", { className: l.description, children: i }),
          s.jsx("div", {
            className: l.list,
            children: n.map((r, d) =>
              s.jsxs(
                "div",
                {
                  children: [
                    s.jsx("img", { src: w, alt: "checkmark" }),
                    s.jsx("p", { children: r }),
                  ],
                },
                d,
              ),
            ),
          }),
        ],
      }),
    }),
  is = "/assets/logo1-bc5824e0.svg",
  cs = "/assets/logo2-0c3b6071.svg",
  os = "/assets/logo3-f6945577.svg",
  rs = "/assets/logo4-0a3b3bce.svg",
  as = "/assets/logo5-dc00add1.svg",
  ls = "/assets/logo6-91f483c3.svg",
  ds = "/assets/logo7-6109aba0.svg",
  ms = "/assets/paymentHero-2bb4719a.png",
  ps = "/assets/whyNew-0d729389.png",
  gs = [is, cs, os, rs, as, ls, ds],
  bs = () => {
    const { t } = p(),
      e = t("payment.whyContent", { returnObjects: !0 });
    return s.jsxs("div", {
      children: [
        s.jsx(k, {
          children: s.jsx("title", { children: "Nefentus | Payment" }),
        }),
        s.jsx(N, {
          heading: s.jsxs(s.Fragment, {
            children: [
              s.jsxs("div", {
                className: "gradient",
                children: [" ", t("payment.heroHeadingGradient")],
              }),
              t("payment.heroHeading"),
            ],
          }),
          description: t("payment.heroDescription"),
          button: s.jsx(s.Fragment, {
            children: s.jsx("p", { children: t("payment.heroButton") }),
          }),
          image: ms,
        }),
        s.jsx(R, {}),
        s.jsx(A, {
          subtitle: t("payment.iconSubtitle"),
          title: s.jsx(s.Fragment, { children: t("payment.iconTitleP1") }),
          description: t("payment.iconDescription"),
          list: gs,
        }),
        s.jsx($, {
          title: t("payment.whyTitle"),
          content: e,
          image: ps,
          button: t("payment.whyButton"),
        }),
        s.jsx(es, {}),
        s.jsx(C, {}),
      ],
    });
  };
export { bs as default };
