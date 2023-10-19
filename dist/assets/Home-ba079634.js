import {
  r as l,
  j as e,
  u as h,
  s as x,
  B as p,
  b as f,
} from "./index-dd74b233.js";
import { H as N, L as j } from "./headingCenter-d59ac750.js";
import { H as y } from "./Helmet-4c7ebf64.js";
import "./paymentCards.module-17b8ff80.js";
import { c as w } from "./constants-ac5fb9cc.js";
const C = "_logos_18h10_1",
  $ = "_logoImage_18h10_33",
  k = "_line1_18h10_37",
  P = "_line2_18h10_44",
  z = "_line_18h10_37",
  L = "_messagecontainer_18h10_91",
  d = {
    logos: C,
    logoImage: $,
    line1: k,
    line2: P,
    line: z,
    messagecontainer: L,
  },
  I = "/nefentus/assets/logo1-e3fd3c1d.svg",
  T = "/nefentus/assets/logo2-ecaa46a8.svg",
  S = "/nefentus/assets/logo3-c3a753b5.svg",
  R = "/nefentus/assets/logo4-42c17800.svg",
  E = "/nefentus/assets/logo5-580d7f36.svg",
  W = "/nefentus/assets/logo6-4d444143.svg",
  b = "/nefentus/assets/line-37bee2f5.svg",
  v = [I, T, S, R, E, W],
  q = () => (
    l.useEffect(() => {
      const s = document.querySelector(".line1"),
        a = document.querySelector(".line2");
      setTimeout(() => {
        s.classList.add("move1"), a.classList.add("move2");
      }, 1e3);
    }, []),
    e.jsxs("div", {
      className: ` ${d.logos}`,
      children: [
        e.jsx("div", {
          className: d.line,
          children: e.jsx("img", { src: b, alt: "line" }),
        }),
        e.jsxs("div", {
          className: d.logoImage,
          children: [
            e.jsx("div", {
              className: `${d.line1} line1`,
              children: v.map((s, a) =>
                e.jsx("img", { src: s, alt: "crypto logo" }, a),
              ),
            }),
            e.jsx("div", {
              className: `${d.line2} line2`,
              children: v.map((s, a) =>
                e.jsx("img", { src: s, alt: "crypto logo" }, a),
              ),
            }),
          ],
        }),
        e.jsx("div", {
          className: d.line,
          children: e.jsx("img", { src: b, alt: "line" }),
        }),
      ],
    })
  ),
  B = "_cards_qx8qk_1",
  F = "_card_qx8qk_1",
  H = "_headerSpace_qx8qk_44",
  u = { cards: B, card: F, headerSpace: H },
  A = "/nefentus/assets/phone-0778c3f9.mp4",
  D = "/nefentus/assets/chart-0c0d7a4a.mp4",
  V = "/nefentus/assets/target-1d824c17.mp4",
  G = [{ video: A }, { video: D }, { video: V }],
  J = () => {
    const { t: s } = h(),
      a = s("home.cardList", { returnObjects: !0 }),
      c = l.useRef(null),
      n = [l.useRef(null), l.useRef(null), l.useRef(null)],
      g = (i) => {
        if (!(window.innerWidth > 900) && i.current) {
          const o = i.current.play();
          o !== void 0 &&
            o
              .then(() => {})
              .catch((m) => {
                console.log("Playback prevented by browser");
              });
        }
      };
    return (
      l.useEffect(() => {
        const i = (o) => {
          const m = window.innerHeight * 0.4;
          window.innerHeight - c.current.getBoundingClientRect().top > m &&
            ((c.current.children[0].style.transform = "scale(1)"),
            (c.current.children[0].style.opacity = 1),
            setTimeout(() => {
              (c.current.children[1].style.transform = "scale(1)"),
                (c.current.children[1].style.opacity = 1),
                setTimeout(() => {
                  (c.current.children[2].style.transform = "scale(1)"),
                    (c.current.children[2].style.opacity = 1);
                }, 250);
            }, 250));
        };
        return (
          window.addEventListener("scroll", i),
          () => window.removeEventListener("scroll", i)
        );
      }, []),
      e.jsxs("div", {
        className: `container break ${u.section}`,
        children: [
          e.jsx(N, {
            subtitle: s("home.cardSubtitle"),
            title: e.jsxs(e.Fragment, {
              children: [
                s("home.cardTitleP1"),
                " ",
                e.jsx("br", { className: u.headerSpace }),
                s("home.cardTitleP2"),
              ],
            }),
          }),
          e.jsx("div", {
            className: u.cards,
            ref: c,
            children: G.map((i, o) =>
              e.jsxs(
                "div",
                {
                  className: `${u.card} card`,
                  children: [
                    e.jsx("video", {
                      ref: n[o],
                      className: "cardVideo",
                      autoPlay: !0,
                      playsInline: !0,
                      muted: !0,
                      loop: !0,
                      onLoadedData: () => g(n[o]),
                      children: e.jsx("source", {
                        src: i.video,
                        type: "video/mp4",
                      }),
                    }),
                    e.jsx("p", { children: x(a[o].title) }),
                    e.jsx("p", {
                      className: "standard",
                      children: a[o].description,
                    }),
                  ],
                },
                o,
              ),
            ),
          }),
        ],
      })
    );
  },
  M = "_section_14kuv_1",
  O = "_bg_14kuv_5",
  U = "_card_14kuv_19",
  K = "_horizontalCard_14kuv_49",
  Q = "_horizontalImg_14kuv_72",
  X = "_cardRow_14kuv_82",
  Y = "_verticalCard_14kuv_88",
  Z = "_verticalImg_14kuv_96",
  ee = "_content_14kuv_111",
  se = "_button_14kuv_119",
  te = "_description_14kuv_149",
  t = {
    section: M,
    bg: O,
    card: U,
    horizontalCard: K,
    horizontalImg: Q,
    cardRow: X,
    verticalCard: Y,
    verticalImg: Z,
    content: ee,
    button: se,
    description: te,
  },
  ae = "/nefentus/assets/graphic4-0703dec9.svg",
  ne = "/nefentus/assets/graphic2-6b11949d.svg",
  ce = "/nefentus/assets/graphic3-d2cab426.svg",
  _ = "/nefentus/assets/arrow-a67f115f.svg",
  re = "_sectionWrapper_1a2k0_1",
  ie = { sectionWrapper: re },
  oe = ({ className: s }) => {
    const { t: a } = h();
    return e.jsx("div", {
      className: ie.sectionWrapper,
      children: e.jsxs("div", {
        className: `container scroll card ${s}`,
        children: [
          e.jsx("p", { className: "subtitle", children: a("reward.subtitle") }),
          e.jsxs("h3", {
            children: [
              a("reward.title1"),
              " ",
              e.jsx("span", {
                className: "gradient",
                children: a("reward.gradient"),
              }),
              " ",
              a("reward.title2"),
            ],
          }),
          e.jsx(p, { link: "/signup", children: a("reward.button") }),
        ],
      }),
    });
  },
  le = () => {
    const { t: s } = h();
    return e.jsxs("div", {
      className: t.section,
      children: [
        e.jsxs("div", {
          className: "container",
          children: [
            e.jsxs("div", {
              className: `${t.card} ${t.horizontalCard} card scroll`,
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx("p", {
                      className: `subtitle ${t.subtitle}`,
                      children: s("home.aboutCard1Subtitle"),
                    }),
                    e.jsxs("h3", {
                      children: [
                        x(s("home.aboutCard1Title")),
                        e.jsx("div", {
                          className: "gradient",
                          children: s("home.aboutCard1TitleGradient"),
                        }),
                      ],
                    }),
                    e.jsx("p", {
                      className: "standard",
                      children: s("home.aboutCard1Description"),
                    }),
                    e.jsx("div", {
                      className: t.button,
                      children: e.jsxs(p, {
                        link: "/",
                        color: "white",
                        children: [
                          e.jsx("p", { children: s("home.aboutCardButton") }),
                          e.jsx("img", { src: _, alt: "Arrow" }),
                        ],
                      }),
                    }),
                  ],
                }),
                e.jsx("img", {
                  className: t.horizontalImg,
                  src: ae,
                  alt: "cryptocurrency graphics",
                }),
              ],
            }),
            e.jsxs("div", {
              className: `${t.cardRow}`,
              children: [
                e.jsxs("div", {
                  className: `${t.card} ${t.verticalCard} slide-right card`,
                  children: [
                    e.jsx("img", {
                      className: t.verticalImg,
                      src: ne,
                      alt: "tracking graphics",
                    }),
                    e.jsxs("div", {
                      className: t.content,
                      children: [
                        e.jsx("p", {
                          className: `subtitle ${t.subtitle}`,
                          children: s("home.aboutCard2Subtitle"),
                        }),
                        e.jsxs("h3", {
                          children: [
                            s("home.aboutCard2TitleP1"),
                            e.jsx("br", {}),
                            s("home.aboutCard2TitleP2"),
                          ],
                        }),
                        e.jsxs("p", {
                          className: "standard",
                          children: [" ", s("home.aboutCard2Description")],
                        }),
                        e.jsx("div", {
                          className: t.button,
                          children: e.jsxs(p, {
                            link: "/",
                            color: "white",
                            children: [
                              e.jsx("p", {
                                children: s("home.aboutCardButton"),
                              }),
                              e.jsx("img", { src: _, alt: "arrow" }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: `${t.card} ${t.verticalCard} slide-left card`,
                  children: [
                    e.jsx("img", {
                      className: t.verticalImg,
                      src: ce,
                      alt: "integrating logos",
                    }),
                    e.jsxs("div", {
                      className: t.content,
                      children: [
                        e.jsx("p", {
                          className: `subtitle ${t.subtitle}`,
                          children: s("home.aboutCard3Subtitle"),
                        }),
                        e.jsxs("h3", {
                          children: [
                            s("home.aboutCard3TitleP1"),
                            e.jsx("br", {}),
                            x(s("home.aboutCard3TitleP2")),
                          ],
                        }),
                        e.jsx("p", {
                          className: "standard",
                          children: s("home.aboutCard3Description"),
                        }),
                        e.jsx("div", {
                          className: t.button,
                          children: e.jsxs(p, {
                            link: "/",
                            color: "white",
                            children: [
                              e.jsx("p", {
                                children: s("home.aboutCardButton"),
                              }),
                              e.jsx("img", { src: _, alt: "arrow" }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e.jsx(oe, { className: `${t.card}` }),
          ],
        }),
        e.jsx("div", { className: t.bg }),
      ],
    });
  },
  de = "/nefentus/assets/paymentHome-cd983f9d.webp",
  me = "/nefentus/assets/main-5bab8834.svg",
  he = "_container_z9b23_1",
  ue = "_priceCard_z9b23_8",
  pe = "_price_box_z9b23_53",
  ge = "_main_info_z9b23_65",
  _e = "_logo_z9b23_71",
  xe = "_currency_z9b23_77",
  je = "_abbr_z9b23_82",
  be = "_change_z9b23_83",
  ve = "_positive_z9b23_99",
  fe = "_negative_z9b23_103",
  Ne = "_descriptionWrapper_z9b23_107",
  ye = "_description_z9b23_107",
  r = {
    container: he,
    priceCard: ue,
    price_box: pe,
    main_info: ge,
    logo: _e,
    currency: xe,
    abbr: je,
    change: be,
    positive: ve,
    negative: fe,
    descriptionWrapper: Ne,
    description: ye,
  },
  we = () => {
    const [s, a] = l.useState([]),
      { t: c } = h();
    return (
      l.useEffect(() => {
        (async () => {
          const g = await Promise.all(
            w.map(async (i) => {
              const m = await (
                await fetch(`https://api.coingecko.com/api/v3/coins/${i.url}`)
              ).json();
              return {
                ...i,
                price: m.market_data.current_price.usd,
                priceChange: m.market_data.price_change_percentage_24h,
              };
            }),
          );
          a(g);
        })();
      }, []),
      s &&
        e.jsxs("div", {
          className: `card ${r.priceCard}`,
          children: [
            e.jsx("h2", { children: "Latest Price" }),
            e.jsxs("div", {
              className: r.container,
              children: [
                s == null
                  ? void 0
                  : s.map((n) =>
                      e.jsxs("div", {
                        className: r.price_box,
                        children: [
                          e.jsxs("div", {
                            className: r.main_info,
                            children: [
                              e.jsx("img", {
                                src: n.icon,
                                alt: n.name,
                                className: r.logo,
                              }),
                              e.jsxs("p", {
                                className: r.currency,
                                children: [
                                  e.jsx("span", {
                                    className: r.abbr,
                                    children: n.abbr,
                                  }),
                                  " ",
                                  n.name,
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("span", {
                            className: r.abbr,
                            children: ["$", n.price.toFixed(2)],
                          }),
                          e.jsxs("span", {
                            className: `${r.change} ${
                              n.priceChange >= 0 ? r.positive : r.negative
                            }`,
                            children: [n.priceChange.toFixed(2), "%"],
                          }),
                        ],
                      }),
                    ),
                e.jsx("div", {
                  className: r.descriptionWrapper,
                  children: e.jsx("span", {
                    className: r.description,
                    children: c("home.priceChange"),
                  }),
                }),
              ],
            }),
          ],
        })
    );
  },
  Ie = () => {
    const { t: s } = h(),
      a = new f();
    return (
      l.useEffect(() => {
        const c = new URLSearchParams(window.location.search);
        if (c.has("affiliate")) {
          const n = c.get("affiliate");
          localStorage.setItem("affiliateJoined", n), a.countAffiliate(n);
        }
      }, []),
      e.jsxs(e.Fragment, {
        children: [
          e.jsx(y, {
            children: e.jsx("title", {
              children: "Nefentus | Accept Crypto Payments Risk Free",
            }),
          }),
          e.jsx(j, {
            heading: e.jsxs(e.Fragment, {
              children: [
                s("home.heroTitle"),
                e.jsxs("div", {
                  className: "gradient",
                  children: [" ", s("home.heroTitleGradient")],
                }),
              ],
            }),
            description: e.jsx(e.Fragment, {
              children: s("home.heroDescription"),
            }),
            button: e.jsx(e.Fragment, {
              children: e.jsx("p", { children: s("home.heroButton") }),
            }),
            home: !0,
            image: me,
            full: !0,
            store: !0,
            children: e.jsx(we, {}),
          }),
          e.jsx(q, {}),
          e.jsx(J, {}),
          e.jsx(j, {
            subtitle: s("home.simplifySubtitle"),
            title: s("home.simplifyTitle"),
            description: s("home.simplifyDescription"),
            button: s("home.layoutButton"),
            image: de,
          }),
          e.jsx(le, {}),
        ],
      })
    );
  };
export { Ie as default };
