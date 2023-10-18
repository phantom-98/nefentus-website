import { j as s, B as r } from "./index-aff6404b.js";
const o = "_section_1jg7r_1",
  d = "_item_1jg7r_14",
  m = "_content_1jg7r_17",
  e = { section: o, item: d, content: m },
  h = ({ title: i, content: n, image: c = Image, button: l }) =>
    s.jsxs("div", {
      className: `container break ${e.section}`,
      children: [
        s.jsx("img", {
          className: "slide-right",
          src: c,
          alt: "table/testimonials",
        }),
        s.jsxs("div", {
          className: `${e.content}`,
          children: [
            s.jsx("h3", { className: "slide-left", children: i }),
            n.map((t, a) =>
              s.jsxs(
                "div",
                {
                  className: `${e.item} slide-left`,
                  children: [
                    s.jsx("h4", { children: t.title }),
                    s.jsx("p", { children: t.description }),
                  ],
                },
                a,
              ),
            ),
            s.jsx("div", {
              className: "slide-left",
              children: s.jsx(r, { link: "/", children: l }),
            }),
          ],
        }),
      ],
    });
export { h as W };
