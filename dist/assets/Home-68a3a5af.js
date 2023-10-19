import { r as l, j as e, u as h, B as g, b as f } from "./index-80ad4a2a.js";
import { H as y, s as x, L as j } from "./separate-752296ad.js";
import { H as N } from "./Helmet-3728875c.js";
import "./paymentCards.module-17b8ff80.js";
import { c as k } from "./constants-56ba4a3d.js";
const w = "_logos_18h10_1",
  C = "_logoImage_18h10_33",
  $ = "_line1_18h10_37",
  P = "_line2_18h10_44",
  L = "_line_18h10_37",
  I = "_messagecontainer_18h10_91",
  d = {
    logos: w,
    logoImage: C,
    line1: $,
    line2: P,
    line: L,
    messagecontainer: I,
  },
  T = "/nefentus/assets/logo1-e3fd3c1d.svg",
  S = "/nefentus/assets/logo2-ecaa46a8.svg",
  R = "/nefentus/assets/logo3-c3a753b5.svg",
  E = "/nefentus/assets/logo4-42c17800.svg",
  W = "/nefentus/assets/logo5-580d7f36.svg",
  q = "/nefentus/assets/logo6-4d444143.svg",
  v = "/nefentus/assets/line-37bee2f5.svg",
  b = [T, S, R, E, W, q],
  z = () => (
    l.useEffect(() => {
      const s = document.querySelector(".line1"),
        n = document.querySelector(".line2");
      setTimeout(() => {
        s.classList.add("move1"), n.classList.add("move2");
      }, 1e3);
    }, []),
    e.jsxs("div", {
      className: ` ${d.logos}`,
      children: [
        e.jsx("div", {
          className: d.line,
          children: e.jsx("img", { src: v, alt: "line" }),
        }),
        e.jsxs("div", {
          className: d.logoImage,
          children: [
            e.jsx("div", {
              className: `${d.line1} line1`,
              children: b.map((s, n) =>
                e.jsx("img", { src: s, alt: "crypto logo" }, n),
              ),
            }),
            e.jsx("div", {
              className: `${d.line2} line2`,
              children: b.map((s, n) =>
                e.jsx("img", { src: s, alt: "crypto logo" }, n),
              ),
            }),
          ],
        }),
        e.jsx("div", {
          className: d.line,
          children: e.jsx("img", { src: v, alt: "line" }),
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
      n = s("home.cardList", { returnObjects: !0 }),
      c = l.useRef(null),
      a = [l.useRef(null), l.useRef(null), l.useRef(null)],
      p = (i) => {
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
          e.jsx(y, {
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
                      ref: a[o],
                      className: "cardVideo",
                      autoPlay: !0,
                      playsInline: !0,
                      muted: !0,
                      loop: !0,
                      onLoadedData: () => p(a[o]),
                      children: e.jsx("source", {
                        src: i.video,
                        type: "video/mp4",
                      }),
                    }),
                    e.jsx("p", { children: x(n[o].title) }),
                    e.jsx("p", {
                      className: "standard",
                      children: n[o].description,
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
  ne = "/nefentus/assets/graphic4-0703dec9.svg",
  ae = "/nefentus/assets/graphic2-6b11949d.svg",
  ce = "/nefentus/assets/graphic3-d2cab426.svg",
  _ = "/nefentus/assets/arrow-a67f115f.svg",
  re = "_sectionWrapper_1a2k0_1",
  ie = { sectionWrapper: re },
  oe = ({ className: s }) => {
    const { t: n } = h();
    return e.jsx("div", {
      className: ie.sectionWrapper,
      children: e.jsxs("div", {
        className: `container scroll card ${s}`,
        children: [
          e.jsx("p", { className: "subtitle", children: n("reward.subtitle") }),
          e.jsxs("h3", {
            children: [
              n("reward.title1"),
              " ",
              e.jsx("span", {
                className: "gradient",
                children: n("reward.gradient"),
              }),
              " ",
              n("reward.title2"),
            ],
          }),
          e.jsx(g, { link: "/signup", children: n("reward.button") }),
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
                      children: e.jsxs(g, {
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
                  src: ne,
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
                      src: ae,
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
                          children: e.jsxs(g, {
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
                          children: e.jsxs(g, {
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
  he = "_container_1gkny_1",
  ue = "_priceCard_1gkny_8",
  ge = "_price_box_1gkny_19",
  pe = "_main_info_1gkny_31",
  _e = "_logo_1gkny_37",
  xe = "_currency_1gkny_43",
  je = "_abbr_1gkny_48",
  ve = "_change_1gkny_49",
  be = "_positive_1gkny_65",
  fe = "_negative_1gkny_69",
  ye = "_descriptionWrapper_1gkny_73",
  Ne = "_description_1gkny_73",
  r = {
    container: he,
    priceCard: ue,
    price_box: ge,
    main_info: pe,
    logo: _e,
    currency: xe,
    abbr: je,
    change: ve,
    positive: be,
    negative: fe,
    descriptionWrapper: ye,
    description: Ne,
  },
  ke = () => {
    const [s, n] = l.useState([]),
      { t: c } = h();
    return (
      l.useEffect(() => {
        (async () => {
          const p = await Promise.all(
            k.map(async (i) => {
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
          n(p);
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
                  : s.map((a) =>
                      e.jsxs("div", {
                        className: r.price_box,
                        children: [
                          e.jsxs("div", {
                            className: r.main_info,
                            children: [
                              e.jsx("img", {
                                src: a.icon,
                                alt: a.name,
                                className: r.logo,
                              }),
                              e.jsxs("p", {
                                className: r.currency,
                                children: [
                                  e.jsx("span", {
                                    className: r.abbr,
                                    children: a.abbr,
                                  }),
                                  " ",
                                  a.name,
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("span", {
                            className: r.abbr,
                            children: ["$", a.price.toFixed(2)],
                          }),
                          e.jsxs("span", {
                            className: `${r.change} ${
                              a.priceChange >= 0 ? r.positive : r.negative
                            }`,
                            children: [a.priceChange.toFixed(2), "%"],
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
  Te = () => {
    const { t: s } = h(),
      n = new f();
    return (
      l.useEffect(() => {
        const c = new URLSearchParams(window.location.search);
        if (c.has("affiliate")) {
          const a = c.get("affiliate");
          localStorage.setItem("affiliateJoined", a), n.countAffiliate(a);
        }
      }, []),
      e.jsxs(e.Fragment, {
        children: [
          e.jsx(N, {
            children: e.jsx("title", {
              children: "Nefentus | Accept Crypto Payments Risk Free",
            }),
          }),
          e.jsx(j, {
            heading: e.jsxs(e.Fragment, {
              children: [
                e.jsxs("span", {
                  className: "gradient",
                  children: [s("home.heroTitleGradient"), " "],
                }),
                s("home.heroTitle"),
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
            children: e.jsx(ke, {}),
          }),
          e.jsx(z, {}),
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
export { Te as default };
