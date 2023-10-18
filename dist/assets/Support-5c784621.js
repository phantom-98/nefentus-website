import { r as p, u as o, j as s, a as u } from "./index-aff6404b.js";
import { H as h } from "./Helmet-bfad690c.js";
const m = "_section_2mshu_1",
  _ = "_blueBG_2mshu_8",
  x = "_body_2mshu_27",
  j = "_leftContent_2mshu_39",
  v = "_description_2mshu_45",
  b = "_baner_2mshu_46",
  N = "_left_2mshu_39",
  f = "_right_2mshu_69",
  y = "_list_2mshu_73",
  B = "_card_2mshu_78",
  g = "_active_2mshu_106",
  C = "_contact_2mshu_119",
  w = "_cards_2mshu_127",
  E = "_label_2mshu_138",
  G = "_info_2mshu_144",
  S = "_mobBody_2mshu_149",
  T = "_content_2mshu_193",
  t = {
    section: m,
    blueBG: _,
    body: x,
    leftContent: j,
    description: v,
    baner: b,
    left: N,
    right: f,
    list: y,
    card: B,
    active: g,
    contact: C,
    cards: w,
    label: E,
    info: G,
    mobBody: S,
    content: T,
  },
  $ = "/assets/introduction-3c6932ac.mp4",
  k = () => {
    const [c, a] = p.useState(0),
      { t: i } = o(),
      d = i("support.sideBar", { returnObjects: !0 }),
      l = (e) => {
        a(e);
        const n = document.getElementById("content");
        n && window.scrollTo({ top: n.offsetTop - 100, behavior: "smooth" });
      };
    return s.jsxs("div", {
      className: ` ${t.section}`,
      children: [
        s.jsxs("div", {
          className: "container",
          children: [
            s.jsx("h2", { children: i("support.title") }),
            s.jsxs("div", {
              className: `${t.body}`,
              children: [
                s.jsxs("div", {
                  className: t.left,
                  id: "content",
                  children: [c === 0 && s.jsx(D, {}), s.jsx(r, {})],
                }),
                s.jsx("div", {
                  className: t.right,
                  children: s.jsx("div", {
                    className: t.list,
                    children: d.map((e, n) =>
                      s.jsx(
                        "div",
                        {
                          onClick: () => l(n),
                          className: `card ${t.card} ${
                            c === n ? t.active : ""
                          }`,
                          children: s.jsx("p", { children: e }),
                        },
                        n,
                      ),
                    ),
                  }),
                }),
              ],
            }),
            s.jsx("div", { className: t.mobBody, children: s.jsx(r, {}) }),
          ],
        }),
        s.jsx("div", { className: t.blueBG }),
      ],
    });
  },
  D = () => {
    const { t: c } = o();
    return s.jsxs("div", {
      className: t.content,
      children: [
        s.jsx("h3", { children: c("support.introduction.title") }),
        s.jsxs("div", {
          className: t.leftContent,
          children: [
            s.jsx("p", {
              className: t.description,
              children: c("support.introduction.mainDescription"),
            }),
            s.jsx("video", {
              controls: !0,
              children: s.jsx("source", { src: $, type: "video/mp4" }),
            }),
            s.jsx("p", {
              className: t.baner,
              children: c("support.introduction.banner"),
            }),
            s.jsx("p", {
              className: t.description,
              children: c("support.introduction.description1"),
            }),
            s.jsx("p", {
              className: t.description,
              children: c("support.introduction.description2"),
            }),
            s.jsx("p", {
              className: t.description,
              children: c("support.introduction.description3"),
            }),
            s.jsx("p", {
              className: t.description,
              children: c("support.introduction.description4"),
            }),
          ],
        }),
      ],
    });
  },
  r = () => {
    const { t: c } = o();
    return s.jsxs("div", {
      className: t.contact,
      children: [
        s.jsx("h3", { children: c("support.contact.title") }),
        s.jsx("p", {
          className: t.description,
          children: c("support.contact.description"),
        }),
        s.jsxs("div", {
          className: t.cards,
          children: [
            s.jsxs("div", {
              className: "card",
              children: [
                s.jsx("div", {
                  className: t.label,
                  children: s.jsxs(u, {
                    to: "https://www.instagram.com/helpdesk.nefentus/",
                    children: [c("support.contact.button1Text"), " "],
                  }),
                }),
                s.jsxs("div", {
                  className: t.info,
                  children: [c("support.contact.button1Description"), " "],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "card",
              children: [
                s.jsx("div", {
                  className: t.label,
                  children: "support@nefentus.com",
                }),
                s.jsx("div", {
                  className: t.info,
                  children: c("support.contact.button2Description"),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  A = () =>
    s.jsxs("div", {
      children: [
        s.jsx(h, {
          children: s.jsx("title", { children: "Nefentus | Support" }),
        }),
        s.jsx(k, {}),
      ],
    });
export { A as default };
