import { u as o, j as e, B as l, r as d, d as p } from "./index-aff6404b.js";
import { H as f, s as c, L as h } from "./separate-81f85f03.js";
import { W as x } from "./why-e495bfb9.js";
import { H as m } from "./Helmet-bfad690c.js";
const j = "/assets/affiliate-efc64fbf.svg",
  u = "/assets/affiliate2-abb4b2f5.png",
  g = "_section_lxe2k_1",
  _ = "_wrapper_lxe2k_7",
  b = "_top_lxe2k_37",
  v = "_card_lxe2k_55",
  y = "_sectionHeader_lxe2k_61",
  N = "_sectionWrapper_lxe2k_65",
  k = "_bgImage_lxe2k_70",
  r = {
    section: g,
    wrapper: _,
    top: b,
    card: v,
    sectionHeader: y,
    sectionWrapper: N,
    bgImage: k,
  },
  H = "/assets/pros-f4e2fb1c.svg",
  T = "/assets/cons-13df38a2.svg",
  w = () => {
    const { t } = o(),
      s = t("affiliate.compareContent", { returnObjects: !0 });
    return e.jsxs("div", {
      className: r.sectionWrapper,
      children: [
        e.jsx("div", { className: r.bgImage }),
        e.jsxs("div", {
          className: "container",
          children: [
            e.jsx("div", {
              className: `${r.sectionHeader}`,
              children: e.jsx(f, {
                subtitle: t("affiliate.compareSubtitle"),
                title: e.jsx(e.Fragment, {
                  children: c(t("affiliate.compareTitle")),
                }),
              }),
            }),
            e.jsx("div", {
              className: `${r.section} `,
              children: s.map((a, i) =>
                e.jsx(
                  C,
                  { type: a.type, title: a.title, description: a.description },
                  i,
                ),
              ),
            }),
          ],
        }),
      ],
    });
  },
  C = ({ type: t, title: s, description: a }) =>
    e.jsx("div", {
      className: `${r.card} scroll`,
      children: e.jsxs("div", {
        className: `${r.wrapper} card`,
        children: [
          e.jsxs("div", {
            className: r.top,
            children: [
              e.jsx("img", {
                src: t === "cons" ? T : H,
                alt: "compare symbol",
              }),
              e.jsxs("h4", {
                children: [
                  s.split(`
`)[0],
                  e.jsx("br", {}),
                  s.split(`
`)[1],
                ],
              }),
            ],
          }),
          e.jsx("p", { children: a }),
        ],
      }),
    }),
  I = "_hero_1jur2_1",
  $ = { hero: I },
  P = () => {
    const { t } = o();
    return e.jsx("div", {
      className: `${$.hero} container load hero`,
      children: e.jsxs("div", {
        className: "scroll",
        children: [
          e.jsxs("h1", {
            children: [
              c(t("affiliate.heroTitleP1")),
              " ",
              e.jsx("span", {
                className: "gradient",
                children: t("affiliate.heroGradient"),
              }),
              e.jsx("br", {}),
              " ",
              t("affiliate.heroTitleP2"),
            ],
          }),
          e.jsx(l, { link: "/", children: t("affiliate.heroButton") }),
        ],
      }),
    });
  },
  G = () => {
    d.useEffect(() => {
      t();
    }, []);
    const t = async () => {
        const i = p.getItem("token");
        if (!i) return;
        new Headers().append("Content-Type", "application/json"),
          fetch("http://localhost:8080/api/test/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${i}`,
            },
          })
            .then((n) => {
              console.log(n);
            })
            .catch((n) => {
              console.error(n);
            });
      },
      { t: s } = o(),
      a = s("affiliate.whyContent", { returnObjects: !0 });
    return e.jsxs("div", {
      children: [
        e.jsx(m, {
          children: e.jsx("title", { children: "Nefentus | Affiliate" }),
        }),
        e.jsx(P, {}),
        e.jsx(h, {
          subtitle: s("affiliate.heroSubtitle"),
          title: s("affiliate.heroHeading"),
          description: s("affiliate.heroDescription"),
          image: j,
          list: !0,
          load: !0,
        }),
        e.jsx(x, {
          title: e.jsxs(e.Fragment, {
            children: [
              s("affiliate.whyTitleP1"),
              e.jsx("br", {}),
              s("affiliate.whyTitleP2"),
            ],
          }),
          button: s("affiliate.whyButton"),
          content: a,
          image: u,
        }),
        e.jsx(w, {}),
      ],
    });
  };
export { G as default };
