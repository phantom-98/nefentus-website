import { u as y, r as N, j as s, B as j, Q as z } from "./index-aff6404b.js";
const k = "_layout_5v4zs_1",
  $ = "_hero_5v4zs_9",
  C = "_bgImage_5v4zs_16",
  B = "_full_5v4zs_33",
  H = "_buttonWrapper_5v4zs_37",
  L = "_button_5v4zs_37",
  I = "_imgWrapper_5v4zs_67",
  P = "_description_5v4zs_84",
  R = "_inputHero_5v4zs_88",
  w = "_inputWrapper_5v4zs_96",
  D = "_connectWrapper_5v4zs_113",
  E = "_connect_5v4zs_113",
  M = "_iconWrapper_5v4zs_124",
  A = "_iconBox_5v4zs_130",
  O = "_store_5v4zs_150",
  Q = "_list_5v4zs_173",
  T = "_buttonWrapperMob_5v4zs_240",
  F = "_connect2_5v4zs_264",
  e = {
    layout: k,
    hero: $,
    bgImage: C,
    full: B,
    buttonWrapper: H,
    button: L,
    imgWrapper: I,
    description: P,
    inputHero: R,
    inputWrapper: w,
    connectWrapper: D,
    connect: E,
    iconWrapper: M,
    iconBox: A,
    store: O,
    list: Q,
    buttonWrapperMob: T,
    connect2: F,
  },
  G = "/assets/google-fa279740.svg",
  q = "/assets/apple2-1dffdf27.svg",
  J = "/assets/dummy-918cf24b.webp",
  p = "/assets/singleCheckmark-e5e72a83.svg",
  ss = ({
    heading: t,
    home: r,
    title: c,
    load: n = !1,
    description: u,
    button: l,
    button2: U,
    image: g = J,
    store: V,
    subtitle: x,
    reverse: o,
    video: d,
    list: b,
    full: h,
    children: a,
  }) => {
    const { t: f } = y(),
      i = f("affiliate.affiliateList", { returnObjects: !0 }),
      _ = N.useRef(null),
      W = (X) => {
        if (_.current) {
          const m = _.current.play();
          m !== void 0 &&
            m
              .then(() => {})
              .catch((Y) => {
                console.log("Playback prevented by browser");
              });
        }
      };
    return s.jsxs("div", {
      className: `${e.layout} ${t ? e.hero : ""} ${
        t || n ? "load hero" : ""
      } container`,
      children: [
        s.jsxs("div", {
          className: t || n ? "" : "scroll",
          style: { order: o ? 2 : 1 },
          children: [
            x &&
              s.jsx("p", { className: `${e.subtitle} subtitle`, children: x }),
            t && s.jsx("h1", { children: t }),
            c && s.jsx("h3", { children: c }),
            u &&
              s.jsx("p", {
                className: `standard ${e.description}`,
                children: u,
              }),
            r &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("div", {
                    className: e.inputHero,
                    children: [
                      s.jsx("div", {
                        className: e.inputWrapper,
                        children: s.jsx("input", {
                          type: "text",
                          placeholder: "Email/Phone number",
                        }),
                      }),
                      l && s.jsx(j, { link: "/signup", children: l }),
                    ],
                  }),
                  s.jsxs("div", {
                    className: e.connectWrapper,
                    children: [
                      s.jsxs("div", {
                        className: e.connect,
                        children: [
                          s.jsx("p", { children: "Or Connect With" }),
                          s.jsxs("div", {
                            className: e.iconWrapper,
                            children: [
                              s.jsx("div", {
                                className: e.iconBox,
                                children: s.jsx("img", { src: G, alt: "" }),
                              }),
                              s.jsx("div", {
                                className: e.iconBox,
                                children: s.jsx("img", { src: q, alt: "" }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: `${e.connect} ${e.connect2}`,
                        children: [
                          s.jsx("p", { children: "App Download" }),
                          s.jsx("div", {
                            className: e.iconWrapper,
                            children: s.jsx("div", {
                              className: e.iconBox,
                              children: s.jsx("img", { src: z, alt: "" }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            b &&
              s.jsxs("div", {
                className: e.list,
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: i[0] }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: i[1] }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: i[2] }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: i[3] }),
                    ],
                  }),
                ],
              }),
            !r &&
              l &&
              s.jsx("div", {
                className: e.buttonWrapper,
                children: s.jsx(j, { link: "/signup", children: l }),
              }),
          ],
        }),
        !d &&
          !a &&
          s.jsx("img", {
            className: `${t || n ? "" : o ? "slide-right" : "slide-left"} ${
              h ? e.full : ""
            }`,
            src: g,
            alt: "nefentus graphics",
            style: { order: o ? 1 : 2 },
          }),
        d &&
          !a &&
          s.jsx("video", {
            onLoadedData: W,
            ref: _,
            style: { order: o ? 1 : 2 },
            className: "",
            controls: !1,
            autoPlay: !0,
            playsInline: !0,
            muted: !0,
            loop: !0,
            children: s.jsx("source", { src: d, type: "video/mp4" }),
          }),
        a &&
          s.jsx("div", {
            className: `${
              t || n ? "load hero" : o ? "slide-right" : "slide-left"
            } ${h ? e.full : ""}`,
            style: { order: o ? 1 : 2 },
            children: a,
          }),
      ],
    });
  },
  K = "_heading_1lsrr_1",
  S = "_subtitle_1lsrr_13",
  v = { heading: K, subtitle: S },
  es = ({ subtitle: t, title: r, noScroll: c }) =>
    s.jsxs("div", {
      className: `${c ? "" : "scroll"} ${v.heading}`,
      children: [
        s.jsx("div", { className: v.subtitle, children: t }),
        s.jsx("h2", { children: r }),
      ],
    }),
  ts = (t) => {
    let r = t.split(`
`),
      c = [];
    for (let n = 0; n < r.length; n++)
      c.push(r[n]), n < r.length - 1 && c.push(s.jsx("br", {}));
    return c;
  };
export { p as C, es as H, ss as L, ts as s };
