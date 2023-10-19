import { u as o, j as e, B as l, r as f, d } from "./index-80ad4a2a.js";
import { H as p, s as c, L as h } from "./separate-752296ad.js";
import { W as x } from "./why-d028dc9b.js";
import { H as m } from "./Helmet-3728875c.js";
const j = "/nefentus/assets/affiliate-efc64fbf.svg",
  u = "/nefentus/assets/affiliate2-abb4b2f5.png",
  g = "_section_lxe2k_1",
  _ = "_wrapper_lxe2k_7",
  b = "_top_lxe2k_37",
  v = "_card_lxe2k_55",
  y = "_sectionHeader_lxe2k_61",
  N = "_sectionWrapper_lxe2k_65",
  k = "_bgImage_lxe2k_70",
  n = {
    section: g,
    wrapper: _,
    top: b,
    card: v,
    sectionHeader: y,
    sectionWrapper: N,
    bgImage: k,
  },
  H = "/nefentus/assets/pros-f4e2fb1c.svg",
  T = "/nefentus/assets/cons-13df38a2.svg",
  w = () => {
    const { t } = o(),
      s = t("affiliate.compareContent", { returnObjects: !0 });
    return e.jsxs("div", {
      className: n.sectionWrapper,
      children: [
        e.jsx("div", { className: n.bgImage }),
        e.jsxs("div", {
          className: "container",
          children: [
            e.jsx("div", {
              className: `${n.sectionHeader}`,
              children: e.jsx(p, {
                subtitle: t("affiliate.compareSubtitle"),
                title: e.jsx(e.Fragment, {
                  children: c(t("affiliate.compareTitle")),
                }),
              }),
            }),
            e.jsx("div", {
              className: `${n.section} `,
              children: s.map((a, r) =>
                e.jsx(
                  C,
                  { type: a.type, title: a.title, description: a.description },
                  r,
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
      className: `${n.card} scroll`,
      children: e.jsxs("div", {
        className: `${n.wrapper} card`,
        children: [
          e.jsxs("div", {
            className: n.top,
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
    f.useEffect(() => {
      t();
    }, []);
    const t = async () => {
        const r = d.getItem("token");
        if (!r) return;
        new Headers().append("Content-Type", "application/json"),
          fetch("http://localhost:8080/api/test/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${r}`,
            },
          })
            .then((i) => {
              console.log(i);
            })
            .catch((i) => {
              console.error(i);
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
