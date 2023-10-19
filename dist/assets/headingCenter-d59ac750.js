import { u as N, r as y, j as s, B as j, Q as k } from "./index-dd74b233.js";
const $ = "_layout_1877n_1",
  C = "_hero_1877n_9",
  B = "_bgImage_1877n_16",
  H = "_full_1877n_33",
  L = "_buttonWrapper_1877n_37",
  I = "_button_1877n_37",
  P = "_imgWrapper_1877n_67",
  R = "_description_1877n_84",
  w = "_descriptionWrapper_1877n_88",
  D = "_inputHero_1877n_104",
  E = "_inputWrapper_1877n_113",
  M = "_connectWrapper_1877n_128",
  A = "_connect_1877n_128",
  G = "_iconWrapper_1877n_139",
  O = "_iconBox_1877n_145",
  Q = "_store_1877n_165",
  F = "_list_1877n_188",
  T = "_buttonWrapperMob_1877n_255",
  q = "_connect2_1877n_279",
  e = {
    layout: $,
    hero: C,
    bgImage: B,
    full: H,
    buttonWrapper: L,
    button: I,
    imgWrapper: P,
    description: R,
    descriptionWrapper: w,
    inputHero: D,
    inputWrapper: E,
    connectWrapper: M,
    connect: A,
    iconWrapper: G,
    iconBox: O,
    store: Q,
    list: F,
    buttonWrapperMob: T,
    connect2: q,
  },
  z = "/nefentus/assets/google-fa279740.svg",
  J = "/nefentus/assets/apple2-1dffdf27.svg",
  K = "/nefentus/assets/gift-4ab16771.svg",
  S = "/nefentus/assets/dummy-918cf24b.webp",
  p = "/nefentus/assets/singleCheckmark-e5e72a83.svg",
  ns = ({
    heading: n,
    home: r,
    title: c,
    load: o = !1,
    description: u,
    button: a,
    button2: X,
    image: f = S,
    store: Y,
    subtitle: x,
    reverse: t,
    video: d,
    list: W,
    full: m,
    children: i,
  }) => {
    const { t: b } = N(),
      l = b("affiliate.affiliateList", { returnObjects: !0 }),
      _ = y.useRef(null),
      v = (Z) => {
        if (_.current) {
          const h = _.current.play();
          h !== void 0 &&
            h
              .then(() => {})
              .catch((ss) => {
                console.log("Playback prevented by browser");
              });
        }
      };
    return s.jsxs("div", {
      className: `${e.layout} ${n ? e.hero : ""} ${
        n || o ? "load hero" : ""
      } container`,
      children: [
        s.jsxs("div", {
          className: n || o ? "" : "scroll",
          style: { order: t ? 2 : 1 },
          children: [
            x &&
              s.jsx("p", { className: `${e.subtitle} subtitle`, children: x }),
            n && s.jsx("h1", { children: n }),
            c && s.jsx("h3", { children: c }),
            u &&
              s.jsxs("div", {
                className: e.descriptionWrapper,
                children: [
                  r && s.jsx("img", { src: K, alt: "" }),
                  s.jsx("p", {
                    className: `standard ${e.description}`,
                    children: u,
                  }),
                ],
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
                      a && s.jsx(j, { link: "/signup", children: a }),
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
                                children: s.jsx("img", { src: z, alt: "" }),
                              }),
                              s.jsx("div", {
                                className: e.iconBox,
                                children: s.jsx("img", { src: J, alt: "" }),
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
                              children: s.jsx("img", { src: k, alt: "" }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            W &&
              s.jsxs("div", {
                className: e.list,
                children: [
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: l[0] }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: l[1] }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: l[2] }),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("img", { src: p, alt: "Checkmark" }),
                      s.jsx("p", { children: l[3] }),
                    ],
                  }),
                ],
              }),
            !r &&
              a &&
              s.jsx("div", {
                className: e.buttonWrapper,
                children: s.jsx(j, { link: "/signup", children: a }),
              }),
          ],
        }),
        !d &&
          !i &&
          s.jsx("img", {
            className: `${n || o ? "" : t ? "slide-right" : "slide-left"} ${
              m ? e.full : ""
            }`,
            src: f,
            alt: "nefentus graphics",
            style: { order: t ? 1 : 2 },
          }),
        d &&
          !i &&
          s.jsx("video", {
            onLoadedData: v,
            ref: _,
            style: { order: t ? 1 : 2 },
            className: "",
            controls: !1,
            autoPlay: !0,
            playsInline: !0,
            muted: !0,
            loop: !0,
            children: s.jsx("source", { src: d, type: "video/mp4" }),
          }),
        i &&
          s.jsx("div", {
            className: `${
              n || o ? "load hero" : t ? "slide-right" : "slide-left"
            } ${m ? e.full : ""}`,
            style: { order: t ? 1 : 2 },
            children: i,
          }),
      ],
    });
  },
  U = "_heading_1lsrr_1",
  V = "_subtitle_1lsrr_13",
  g = { heading: U, subtitle: V },
  ts = ({ subtitle: n, title: r, noScroll: c }) =>
    s.jsxs("div", {
      className: `${c ? "" : "scroll"} ${g.heading}`,
      children: [
        s.jsx("div", { className: g.subtitle, children: n }),
        s.jsx("h2", { children: r }),
      ],
    });
export { p as C, ts as H, ns as L };
