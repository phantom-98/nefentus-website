import { u as c, j as s, B as o } from "./index-aff6404b.js";
import { s as t } from "./contact.module-78a09ef5.js";
const r = ({ affiliate: n }) => {
  const { t: a } = c();
  return s.jsxs("div", {
    className: `${t.contact}`,
    children: [
      s.jsx("div", { className: t.bgImage }),
      s.jsxs("div", {
        className: "container scroll",
        children: [
          !1,
          s.jsx("div", {
            className: t.buttonWrapper,
            children: s.jsx(o, {
              link: n ? "https://calendly.com/nefentus/consulting" : "/signup",
              children: a(n ? "contact.button2" : "contact.button"),
            }),
          }),
        ],
      }),
    ],
  });
};
export { r as default };
